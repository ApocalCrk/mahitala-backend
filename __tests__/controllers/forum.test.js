const {
  getForumTerakhir,
  getAllForum,
  getForumTerbaru,
  getForumTopDiskusi,
  getForumByKategori,
  getForumByKeyword,
  getForumById,
  createForum,
  deleteForum,
  createReply,
  deleteFirstReply,
  deleteSecondReply,
  checkHargaKomoditasProdusen,
} = require('../../src/controllers/forum');
const ForumModel = require('../../src/models/forumModel');


jest.mock('../../src/models/forumModel');


const mockPosts = [{
    id_diskusi: 1,
    username: 'testuser',
    tgl_dibuat: '2023-01-01',
    judul: 'Test Post',
    isi: 'This is a test.',
    jumlah_pembaca: 10,
    id_kategori: 1,
    nama_kategori: 'General'
}];


const mockMainReplies = [{ id_interact: 101, username: 'replier', isi: 'Main reply' }];
const mockSubReplies = [{ id_reply: 201, username: 'sub-replier', isi: 'Sub reply' }];


describe('Forum Controller', () => {
    let req, res;

    beforeEach(() => {
        
        jest.clearAllMocks();

        
        req = {
            body: {},
            user: { user_id: 1 }, 
            params: {},
            query: {},
            file: null,
        };
        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };

        
        ForumModel.getMainReplies.mockResolvedValue(mockMainReplies);
        ForumModel.getSubReplies.mockResolvedValue(mockSubReplies);
    });
    
    
    const setupAttachRepliesMocks = () => {
        ForumModel.getMainReplies.mockResolvedValue(mockMainReplies);
        ForumModel.getSubReplies.mockResolvedValue(mockSubReplies);
    };

    
    describe('getAllForum', () => {
        it('should fetch all forums with their replies and return them', async () => {
            ForumModel.getAllForumDiskusi.mockResolvedValue(mockPosts);
            setupAttachRepliesMocks();

            await getAllForum(req, res);

            expect(ForumModel.getAllForumDiskusi).toHaveBeenCalledTimes(1);
            expect(ForumModel.getMainReplies).toHaveBeenCalledWith(mockPosts[0].id_diskusi);
            expect(ForumModel.getSubReplies).toHaveBeenCalledWith(mockMainReplies[0].id_interact);
            expect(res.json).toHaveBeenCalledWith(expect.any(Array));
            const result = res.json.mock.calls[0][0][0];
            expect(result.jumlah_replies).toBe(2); 
        });

        it('should return 500 on server error', async () => {
            ForumModel.getAllForumDiskusi.mockRejectedValue(new Error('DB Error'));
            await getAllForum(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Server error' }));
        });
    });

    
    describe('getForumById', () => {
        it('should fetch a single forum, update view count, and return it', async () => {
            req.params.id = 1;
            ForumModel.getForumById.mockResolvedValue(mockPosts);
            ForumModel.updateViewCount.mockResolvedValue(); 
            setupAttachRepliesMocks();

            await getForumById(req, res);

            expect(ForumModel.getForumById).toHaveBeenCalledWith(1);
            expect(ForumModel.updateViewCount).toHaveBeenCalledWith(1);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                id_diskusi: 1,
                jumlah_pembaca: 11 
            }));
        });
        
        it('should return 404 if forum is not found', async () => {
            req.params.id = 99;
            ForumModel.getForumById.mockResolvedValue([]);
            await getForumById(req, res);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Forum not found" });
        });
    });

    
    describe('createForum', () => {
        it('should create a forum without an image', async () => {
            req.body = { judul: 'New Title', isi: 'New Content', id_kategori: 1 };
            ForumModel.createForum.mockResolvedValue({ insertId: 123 });

            await createForum(req, res);

            expect(ForumModel.createForum).toHaveBeenCalledWith(1, null, 'New Title', 'New Content', 1);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                message: "Diskusi added successfully",
                id_diskusi: 123
            });
        });
        
         it('should create a forum with an image', async () => {
            req.body = { judul: 'New Title', isi: 'New Content', id_kategori: 1 };
            req.file = { path: 'public/images/test.jpg' };
            ForumModel.createForum.mockResolvedValue({ insertId: 124 });

            await createForum(req, res);

            expect(ForumModel.createForum).toHaveBeenCalledWith(1, '/images/test.jpg', 'New Title', 'New Content', 1);
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });
    
    
    describe('createReply', () => {
        it('should create a main reply when id_interact is null', async () => {
            req.body = { id_reply: null, id_diskusi: 1, id_interact: null, isi: 'A main reply' };
            ForumModel.createReply.mockResolvedValue();

            await createReply(req, res);

            expect(ForumModel.createReply).toHaveBeenCalledWith(null, 1, 1, 'A main reply');
            expect(ForumModel.createSubReply).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Reply added successfully" });
        });

        it('should create a sub-reply when id_interact is provided', async () => {
            req.body = { id_reply: null, id_diskusi: 1, id_interact: 101, isi: 'A sub-reply' };
            ForumModel.createSubReply.mockResolvedValue();

            await createReply(req, res);

            expect(ForumModel.createSubReply).toHaveBeenCalledWith(null, 101, 1, 'A sub-reply');
            expect(ForumModel.createReply).not.toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
        });
    });
    
     
    describe('deleteFirstReply', () => {
        it('should delete reply content if it has child replies', async () => {
            req.params.id = 101;
            ForumModel.checkChildReplies.mockResolvedValue([ {id: 201} ]); 
            ForumModel.updateFirstReplyToDeleted.mockResolvedValue();

            await deleteFirstReply(req, res);
            
            expect(ForumModel.updateFirstReplyToDeleted).toHaveBeenCalledWith(101);
            expect(ForumModel.deleteFirstReply).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: 'Reply has children, content set to [deleted]' });
        });
        
         it('should permanently delete reply if it has no children', async () => {
            req.params.id = 101;
            ForumModel.checkChildReplies.mockResolvedValue([]); 
            ForumModel.deleteFirstReply.mockResolvedValue();

            await deleteFirstReply(req, res);

            expect(ForumModel.deleteFirstReply).toHaveBeenCalledWith(101);
            expect(ForumModel.updateFirstReplyToDeleted).not.toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith({ message: 'Reply deleted successfully' });
        });
    });
    
    
    describe('checkHargaKomoditasProdusen', () => {
        it('should return commodity prices successfully', async () => {
            const mockPrices = [{ komoditas: 'Beras', harga: 12000 }];
            ForumModel.checkKomoditasHargaPasar.mockResolvedValue(mockPrices);

            await checkHargaKomoditasProdusen(req, res);

            expect(ForumModel.checkKomoditasHargaPasar).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(mockPrices);
        });

        it('should return 500 on error', async () => {
            ForumModel.checkKomoditasHargaPasar.mockRejectedValue(new Error('Fetch error'));
            await checkHargaKomoditasProdusen(req, res);
            expect(res.status).toHaveBeenCalledWith(500);
        });
    });
});

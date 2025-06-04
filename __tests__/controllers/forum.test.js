const forumController = require('../../src/controllers/forum');
const ForumModel = require('../../src/models/forumModel');
const db = require('../../src/config/db/setup'); // Assuming db is mocked too

jest.mock('../../src/models/forumModel', () => ({
  getForumDiskusiByID: jest.fn(),
  getAllForumDiskusi: jest.fn(),
  getMainReplies: jest.fn(),
  getSubReplies: jest.fn(),
  getForumTopDiskusi: jest.fn(),
  getForumByKategori: jest.fn(),
  searchForumByKeyword: jest.fn(),
  getForumById: jest.fn(),
  updateViewCount: jest.fn(),
  createForum: jest.fn(),
  deleteForum: jest.fn(),
  createReply: jest.fn(),
  createSubReply: jest.fn(),
  checkChildReplies: jest.fn(),
  updateFirstReplyToDeleted: jest.fn(),
  deleteFirstReply: jest.fn(),
  deleteSecondReply: jest.fn(),
  checkKomoditasHargaPasar: jest.fn(),
}));

jest.mock('../../src/config/db/setup', () => ({
  query: jest.fn(),
}));

const mockRequest = (body = {}, params = {}, query = {}, user = {}, file = null) => ({
  body,
  params,
  query,
  user,
  file,
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

describe('Forum Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getForumTerakhir', () => {
    test('should return user specific forum data successfully', async () => {
      const req = mockRequest({}, {}, {}, { user_id: 1 });
      const res = mockResponse();
      const mockForumResult = [
        {
          id_diskusi: 1,
          username: 'user1',
          tgl_dibuat: '2023-01-01',
          judul: 'Title 1',
          isi: 'Content 1',
          jumlah_pembaca: 10,
          id_kategori: 1,
          nama_kategori: 'Category A',
        },
      ];
      const mockMainReplies = [{ id_interact: 101, username: 'replyUser1', tanggal: '2023-01-02', isi: 'Main reply 1' }];
      const mockSubReplies = [{ id_reply: 201, username: 'subReplyUser1', tanggal: '2023-01-03', isi: 'Sub reply 1' }];

      ForumModel.getForumDiskusiByID.mockImplementationOnce((userId, callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies.mockImplementationOnce((idDiskusi, callback) => {
        callback(null, mockMainReplies);
      });
      ForumModel.getSubReplies.mockImplementationOnce((idInteract, callback) => {
        callback(null, mockSubReplies);
      });

      await forumController.getForumTerakhir(req, res);

      expect(ForumModel.getForumDiskusiByID).toHaveBeenCalledWith(1, expect.any(Function));
      expect(ForumModel.getMainReplies).toHaveBeenCalledWith(1, expect.any(Function));
      expect(ForumModel.getSubReplies).toHaveBeenCalledWith(101, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id_diskusi: 1,
          username: 'user1',
          jumlah_replies: 2, // 1 main + 1 sub
          main_replies: [
            expect.objectContaining({
              id_interact: 101,
              username: 'replyUser1',
              sub_replies: [
                expect.objectContaining({
                  id_reply: 201,
                  username: 'subReplyUser1',
                }),
              ],
            }),
          ],
        }),
      ]);
    });

    test('should return 500 if getForumDiskusiByID fails', async () => {
      const req = mockRequest({}, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.getForumDiskusiByID.mockImplementationOnce((userId, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.getForumTerakhir(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });

    test('should return 500 if getMainReplies fails', async () => {
      const req = mockRequest({}, {}, {}, { user_id: 1 });
      const res = mockResponse();
      const mockForumResult = [{ id_diskusi: 1, /* ... */ }];

      ForumModel.getForumDiskusiByID.mockImplementationOnce((userId, callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies.mockImplementationOnce((idDiskusi, callback) => {
        callback(new Error('Main reply error'), null);
      });

      await forumController.getForumTerakhir(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getAllForum', () => {
    test('should return all forum data successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockForumResult = [
        {
          id_diskusi: 1,
          username: 'user1',
          tgl_dibuat: '2023-01-01',
          judul: 'Title 1',
          isi: 'Content 1',
          jumlah_pembaca: 10,
          id_kategori: 1,
          nama_kategori: 'Category A',
        },
      ];
      const mockMainReplies = [{ id_interact: 101, username: 'replyUser1', tanggal: '2023-01-02', isi: 'Main reply 1' }];
      const mockSubReplies = [{ id_reply: 201, username: 'subReplyUser1', tanggal: '2023-01-03', isi: 'Sub reply 1' }];

      ForumModel.getAllForumDiskusi.mockImplementationOnce((callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies.mockImplementationOnce((idDiskusi, callback) => {
        callback(null, mockMainReplies);
      });
      ForumModel.getSubReplies.mockImplementationOnce((idInteract, callback) => {
        callback(null, mockSubReplies);
      });

      await forumController.getAllForum(req, res);

      expect(ForumModel.getAllForumDiskusi).toHaveBeenCalledWith(expect.any(Function));
      expect(ForumModel.getMainReplies).toHaveBeenCalledWith(1, expect.any(Function));
      expect(ForumModel.getSubReplies).toHaveBeenCalledWith(101, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id_diskusi: 1,
          username: 'user1',
          jumlah_replies: 2,
        }),
      ]);
    });

    test('should return 500 if getAllForumDiskusi fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      ForumModel.getAllForumDiskusi.mockImplementationOnce((callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.getAllForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getForumTerbaru', () => {
    test('should return latest forum data successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockForumResult = [
        {
          id_diskusi: 1,
          username: 'user1',
          tgl_dibuat: '2023-01-01',
          judul: 'Title 1',
          isi: 'Content 1',
          jumlah_pembaca: 10,
          id_kategori: 1,
          nama_kategori: 'Category A',
        },
      ];
      const mockMainReplies = [{ id_interact: 101, username: 'replyUser1', tanggal: '2023-01-02', isi: 'Main reply 1' }];
      const mockSubReplies = [{ id_reply: 201, username: 'subReplyUser1', tanggal: '2023-01-03', isi: 'Sub reply 1' }];

      db.query.mockImplementation((sql, params, callback) => {
        if (sql.includes('ORDER BY tgl_dibuat DESC')) {
          callback(null, mockForumResult);
        } else if (sql.includes('user_in_diskusi')) {
          callback(null, mockMainReplies);
        } else if (sql.includes('user_reply_diskusi')) {
          callback(null, mockSubReplies);
        }
      });

      await forumController.getForumTerbaru(req, res);

      expect(db.query).toHaveBeenCalledTimes(3); // 1 for forum, 1 for main replies, 1 for sub replies
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id_diskusi: 1,
          username: 'user1',
          jumlah_replies: 2,
        }),
      ]);
    });

    test('should return 500 if initial query fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      db.query.mockImplementationOnce((sql, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.getForumTerbaru(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('getForumTopDiskusi', () => {
    test('should return top forum discussions sorted by score', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockForumResult = [
        { id_diskusi: 1, username: 'u1', jumlah_pembaca: 50, id_kategori: 1, nama_kategori: 'CatA', tgl_dibuat: '2023-01-01', judul: 'T1', isi: 'I1' },
        { id_diskusi: 2, username: 'u2', jumlah_pembaca: 30, id_kategori: 1, nama_kategori: 'CatA', tgl_dibuat: '2023-01-01', judul: 'T2', isi: 'I2' },
      ];
      const mockMainReplies1 = [{ id_interact: 101, username: 'r1', tanggal: '2023-01-02', isi: 'Main reply 1' }]; // +1 reply
      const mockSubReplies1 = [{ id_reply: 201, username: 'sr1', tanggal: '2023-01-03', isi: 'Sub reply 1' }]; // +1 reply
      const mockMainReplies2 = [{ id_interact: 102, username: 'r2', tanggal: '2023-01-02', isi: 'Main reply 2' }, { id_interact: 103, username: 'r3', tanggal: '2023-01-02', isi: 'Main reply 3' }]; // +2 replies
      const mockSubReplies2 = []; // +0 replies

      ForumModel.getForumTopDiskusi.mockImplementationOnce((callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies
        .mockImplementationOnce((idDiskusi, callback) => { // for id_diskusi 1
          callback(null, mockMainReplies1);
        })
        .mockImplementationOnce((idDiskusi, callback) => { // for id_diskusi 2
          callback(null, mockMainReplies2);
        });
      ForumModel.getSubReplies
        .mockImplementationOnce((idInteract, callback) => { // for id_interact 101
          callback(null, mockSubReplies1);
        })
        .mockImplementationOnce((idInteract, callback) => { // for id_interact 102
          callback(null, mockSubReplies2);
        })
        .mockImplementationOnce((idInteract, callback) => { // for id_interact 103
          callback(null, mockSubReplies2);
        });

      await forumController.getForumTopDiskusi(req, res);

      // Expected scores:
      // Diskusi 1: 50 (pembaca) + 2 (replies) = 52
      // Diskusi 2: 30 (pembaca) + 2 (replies) = 32
      // So, Diskusi 1 should come before Diskusi 2
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith([
        expect.objectContaining({ id_diskusi: 1, jumlah_replies: 2 }),
        expect.objectContaining({ id_diskusi: 2, jumlah_replies: 2 }),
      ]);
    });
  });

  describe('getForumByKategori', () => {
    test('should return forum data filtered by category', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();
      const mockForumResult = [{ id_diskusi: 1, id_kategori: 1, username: 'user1', nama_kategori: 'Category A', tgl_dibuat: '2023-01-01', judul: 'Title 1', isi: 'Content 1', jumlah_pembaca: 10 }];

      ForumModel.getForumByKategori.mockImplementationOnce((categoryId, callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies.mockImplementation((idDiskusi, callback) => callback(null, []));
      ForumModel.getSubReplies.mockImplementation((idInteract, callback) => callback(null, []));

      await forumController.getForumByKategori(req, res);

      expect(ForumModel.getForumByKategori).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id_diskusi: 1,
          kategori: { id_kategori: 1, nama: 'Category A' },
        }),
      ]);
    });
  });

  describe('getForumByKeyword', () => {
    test('should return forum data filtered by keyword', async () => {
      const req = mockRequest({}, { search: 'keyword' });
      const res = mockResponse();
      const mockForumResult = [{ id_diskusi: 1, judul: 'Forum with keyword', username: 'user1', id_kategori: 1, nama_kategori: 'Category A', tgl_dibuat: '2023-01-01', isi: 'Content 1', jumlah_pembaca: 10 }];

      ForumModel.searchForumByKeyword.mockImplementationOnce((keyword, callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.getMainReplies.mockImplementation((idDiskusi, callback) => callback(null, []));
      ForumModel.getSubReplies.mockImplementation((idInteract, callback) => callback(null, []));

      await forumController.getForumByKeyword(req, res);

      expect(ForumModel.searchForumByKeyword).toHaveBeenCalledWith('%keyword%', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({
          id_diskusi: 1,
          judul: 'Forum with keyword',
        }),
      ]);
    });
  });

  describe('getForumById', () => {
    test('should return a specific forum and update view count', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();
      const mockForumResult = [{ id_diskusi: 1, username: 'user1', gambar: 'img.jpg', judul: 'Title', isi: 'Content', jumlah_pembaca: 10, id_kategori: 1, nama_kategori: 'CatA', tgl_dibuat: '2023-01-01' }];

      ForumModel.getForumById.mockImplementationOnce((id, callback) => {
        callback(null, mockForumResult);
      });
      ForumModel.updateViewCount.mockImplementationOnce((id, callback) => {
        callback(null);
      });
      ForumModel.getMainReplies.mockImplementation((idDiskusi, callback) => callback(null, []));
      ForumModel.getSubReplies.mockImplementation((idInteract, callback) => callback(null, []));

      await forumController.getForumById(req, res);

      expect(ForumModel.getForumById).toHaveBeenCalledWith(1, expect.any(Function));
      expect(ForumModel.updateViewCount).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith([
        expect.objectContaining({ id_diskusi: 1 }),
      ]);
    });
  });

  describe('createForum', () => {
    test('should create a new forum successfully without image', async () => {
      const req = mockRequest({ judul: 'New Forum', isi: 'Content', id_kategori: 1 }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.createForum.mockImplementationOnce((userId, gambar, judul, isi, idKategori, callback) => {
        callback(null, { insertId: 5 });
      });

      await forumController.createForum(req, res);

      expect(ForumModel.createForum).toHaveBeenCalledWith(1, null, 'New Forum', 'Content', 1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Diskusi added successfully', id_diskusi: 5 });
    });

    test('should create a new forum successfully with image', async () => {
      const req = mockRequest(
        { judul: 'New Forum', isi: 'Content', id_kategori: 1 },
        {},
        {},
        { user_id: 1 },
        { path: 'public/uploads/image.jpg' }
      );
      const res = mockResponse();

      ForumModel.createForum.mockImplementationOnce((userId, gambar, judul, isi, idKategori, callback) => {
        callback(null, { insertId: 5 });
      });

      await forumController.createForum(req, res);

      expect(ForumModel.createForum).toHaveBeenCalledWith(1, '/uploads/image.jpg', 'New Forum', 'Content', 1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Diskusi added successfully', id_diskusi: 5 });
    });

    test('should return 500 if createForum fails', async () => {
      const req = mockRequest({ judul: 'New Forum', isi: 'Content', id_kategori: 1 }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.createForum.mockImplementationOnce((userId, gambar, judul, isi, idKategori, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.createForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });

  describe('deleteForum', () => {
    test('should delete a forum successfully', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();

      ForumModel.deleteForum.mockImplementationOnce((id, callback) => {
        callback(null, {});
      });

      await forumController.deleteForum(req, res);

      expect(ForumModel.deleteForum).toHaveBeenCalledWith(1, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Diskusi deleted successfully' });
    });

    test('should return 500 if deleteForum fails', async () => {
      const req = mockRequest({}, { id: 1 });
      const res = mockResponse();

      ForumModel.deleteForum.mockImplementationOnce((id, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.deleteForum(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });

  describe('createReply', () => {
    test('should create a main reply successfully', async () => {
      const req = mockRequest({ id_diskusi: 1, id_interact: null, isi: 'Main reply content' }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.createReply.mockImplementationOnce((idReply, idDiskusi, userId, isi, callback) => {
        callback(null, {});
      });

      await forumController.createReply(req, res);

      expect(ForumModel.createReply).toHaveBeenCalledWith(undefined, 1, 1, 'Main reply content', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Reply added successfully' });
    });

    test('should create a sub reply successfully', async () => {
      const req = mockRequest({ id_interact: 101, isi: 'Sub reply content' }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.createSubReply.mockImplementationOnce((idReply, idInteract, userId, isi, callback) => {
        callback(null, {});
      });

      await forumController.createReply(req, res);

      expect(ForumModel.createSubReply).toHaveBeenCalledWith(undefined, 101, 1, 'Sub reply content', expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Reply added successfully' });
    });

    test('should return 500 if createReply fails', async () => {
      const req = mockRequest({ id_diskusi: 1, id_interact: null, isi: 'Main reply content' }, {}, {}, { user_id: 1 });
      const res = mockResponse();

      ForumModel.createReply.mockImplementationOnce((idReply, idDiskusi, userId, isi, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.createReply(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });

  describe('deleteFirstReply', () => {
    test('should update first reply to deleted if it has child replies', async () => {
      const req = mockRequest({}, { id: 101 });
      const res = mockResponse();

      ForumModel.checkChildReplies.mockImplementationOnce((id, callback) => {
        callback(null, [{ id_reply: 201 }]); // Has child replies
      });
      ForumModel.updateFirstReplyToDeleted.mockImplementationOnce((id, callback) => {
        callback(null, {});
      });

      await forumController.deleteFirstReply(req, res);

      expect(ForumModel.checkChildReplies).toHaveBeenCalledWith(101, expect.any(Function));
      expect(ForumModel.updateFirstReplyToDeleted).toHaveBeenCalledWith(101, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Reply deleted successfully (first reply updated)' });
    });

    test('should delete first reply directly if it has no child replies', async () => {
      const req = mockRequest({}, { id: 101 });
      const res = mockResponse();

      ForumModel.checkChildReplies.mockImplementationOnce((id, callback) => {
        callback(null, []); // No child replies
      });
      ForumModel.deleteFirstReply.mockImplementationOnce((id, callback) => {
        callback(null, {});
      });

      await forumController.deleteFirstReply(req, res);

      expect(ForumModel.checkChildReplies).toHaveBeenCalledWith(101, expect.any(Function));
      expect(ForumModel.deleteFirstReply).toHaveBeenCalledWith(101, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Reply deleted successfully (first reply removed)' });
    });

    test('should return 500 if checkChildReplies fails', async () => {
      const req = mockRequest({}, { id: 101 });
      const res = mockResponse();

      ForumModel.checkChildReplies.mockImplementationOnce((id, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.deleteFirstReply(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });

  describe('deleteSecondReply', () => {
    test('should delete a second reply successfully', async () => {
      const req = mockRequest({}, { id: 201 });
      const res = mockResponse();

      ForumModel.deleteSecondReply.mockImplementationOnce((id, callback) => {
        callback(null, {});
      });

      await forumController.deleteSecondReply(req, res);

      expect(ForumModel.deleteSecondReply).toHaveBeenCalledWith(201, expect.any(Function));
      expect(res.json).toHaveBeenCalledWith({ message: 'Reply deleted successfully' });
    });

    test('should return 500 if deleteSecondReply fails', async () => {
      const req = mockRequest({}, { id: 201 });
      const res = mockResponse();

      ForumModel.deleteSecondReply.mockImplementationOnce((id, callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.deleteSecondReply(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });

  describe('checkHargaKomoditasProdusen', () => {
    test('should return commodity price data successfully', async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockResult = [{ item: 'Rice', price: 10000 }];

      ForumModel.checkKomoditasHargaPasar.mockImplementationOnce((callback) => {
        callback(null, mockResult);
      });

      await forumController.checkHargaKomoditasProdusen(req, res);

      expect(ForumModel.checkKomoditasHargaPasar).toHaveBeenCalledWith(expect.any(Function));
      expect(res.json).toHaveBeenCalledWith(mockResult);
    });

    test('should return 500 if checkKomoditasHargaPasar fails', async () => {
      const req = mockRequest();
      const res = mockResponse();

      ForumModel.checkKomoditasHargaPasar.mockImplementationOnce((callback) => {
        callback(new Error('DB error'), null);
      });

      await forumController.checkHargaKomoditasProdusen(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: 'Database error', error: expect.any(Error) });
    });
  });
});
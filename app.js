const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cors());

const cuacaRouter = require('./routes/cuaca');
const forumRouter = require('./routes/forum');
const kategoriRouter = require('./routes/kategori');
const authRouter = require('./routes/auth');

app.use('/api', [cuacaRouter, forumRouter, kategoriRouter, authRouter]);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
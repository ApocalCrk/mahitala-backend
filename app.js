const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({ origin: 'http://localhost:3000' }));

const cuacaRouter = require('./routes/cuaca');
app.use('/api', cuacaRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
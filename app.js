const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(cors());

app.use('/api', [...routes]);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
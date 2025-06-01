const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(cors());

app.use('/api', [...routes]);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
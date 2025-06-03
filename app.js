const express = require('express');
const cors = require('cors');
const path = require('path');
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))

const allowedOrigins = [
  'https://mahitala-re.vercel.app',
  'http://localhost:3321'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', [...routes]);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://mahitala-re.vercel.app',
      'https://mahitala.noturmine.my.id',
      'http://localhost:3321',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('Origin')}`);
  next();
});
app.use("/api", routes);

app.options('*', cors(corsOptions));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
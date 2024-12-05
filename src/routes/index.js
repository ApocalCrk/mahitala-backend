const express = require("express");

const router = express.Router();
const authRoute = require("./auth/route");
const forumRoute = require("./forum/route");
const kategoriRoute = require("./kategori/route");
const cuacaRoute = require("./cuaca/route");

module.exports = [
  authRoute,
  forumRoute,
  kategoriRoute,
  cuacaRoute
];
const express = require("express");

const authRoute = require("./auth/route");
const forumRoute = require("./forum/route");
const kategoriRoute = require("./kategori/route");
const cuacaRoute = require("./cuaca/route");
const fieldRoute = require("./field/route");
const notificationRoute = require("./notification/route");

module.exports = [
  authRoute,
  forumRoute,
  kategoriRoute,
  cuacaRoute,
  fieldRoute,
  notificationRoute
];
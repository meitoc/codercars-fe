const { sendResponse, AppError}=require("../helpers/utils.js")
var express = require('express');
var router = express.Router();

const carRouter = require("./car.api.js")
router.use("/cars",carRouter)


const { createProxyMiddleware } = require('http-proxy-middleware');
router.use(
  '/',
  createProxyMiddleware({
    target: process.env.REACT_APP_FRONTEND,
    changeOrigin: true,
  })
);

module.exports = router;

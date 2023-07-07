var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();

UserRouter.post("/adminapi/user/login",UserController.login)//登录接口
UserRouter.post("/adminapi/user/upload",UserController.upload)//登录接口

module.exports = UserRouter;
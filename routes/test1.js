var express = require('express');
var router = express.Router();
const UserModel = require("../models/UserModel")




const UserService = {
    // 登录校验
    login:async({username,password})=>{
        return UserModel.find({//联通数据库对比用户信息
            username,
            password
        })
    },
}

const UserController = {
    // 登录接口
    login: async (req, res) => {
        // console.log('前端传过来的用户数据:', req.body)
        //req.body 
        var result = await UserService.login(req.body)

        // 登录校验
        if (result.length === 0) {
            res.send({
                code: "-1",//返回信息
                error: "用户名密码不匹配"
            })
        }else{
        res.send({
            ActionType:"OK"
        })
     }
    }
}
/* GET home page. */
router.post("/adminapi/user/login", UserController.login);
module.exports = router;

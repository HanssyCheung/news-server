const UserModel = require("../../models/UserModel")


const UserService = {
    // 登录校验
    login:async({username,password})=>{
        return UserModel.find({//联通数据库对比用户信息
            username,
            password
        })
    },
}
module.exports = UserService

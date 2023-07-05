const UserService = require("../../services/admin/UserService")
const JWT = require("../../utils/JWT")

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
        } else {
            //生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "10s")
            res.header("Authorization", token)
            console.log("result",result)
            res.send({
                ActionType: "OK",
                data: {
                    result:result,
                    username: result[0].username,
                    gender: result[0].gender?result[0].gender:0,//性别，0，1，2
                    introduction: result[0].introduction, //简介
                    avatar: result[0].avatar,
                    role: result[0].role //管理员1，编辑2
                }
            })
        }
    }
}


module.exports = UserController

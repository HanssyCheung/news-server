var mongoose = require('mongoose') 

mongoose.connect('mongodb://127.0.0.1:27017/company-system')
    .then(()=>{console.log("数据库连接成功");})
    .catch((err)=>{console.log(err);});

    (async()=>{
        await dbPromise;
        console.log("请继续下一步")
    })

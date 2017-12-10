let express = require('express')
let path = require('path')
let serveStatic = require('serve-static')
let bodyParser = require('body-parser')
let session = require('express-session') //注意：要把session定义在mongoose前面
let cookieParser = require('cookie-parser') //从cookie中获取sessionid
let mongoose = require('mongoose')
let mongoStore = require('connect-mongo')(session) //session持久化，将session存在mongo中
let morgan = require('morgan')
let port = process.env.PORT || 3000
let app = express()
let fs = require('fs')
let dbUrl = 'mongodb://localhost/douban-movie'

mongoose.connect(dbUrl)
    //let userCenter = require('./app/controllers/userCenter');
    /*
    test
    // models loading

    var models_path = __dirname + '/app/models'
    var walk = function(path) {
        fs
            .readdirSync(path)
            .forEach(function(file) {
                var newPath = path + '/' + file
                var stat = fs.statSync(newPath)

                if (stat.isFile()) {
                    if (/(.*)\.(js|coffee)/.test(file)) {
                        require(newPath)
                    }
                }
                else if (stat.isDirectory()) {
                    walk(newPath)
                }
            })
    }
    walk(models_path)
    */
    //app.set('/views','./views/pages')
app.set('views', path.join(__dirname, './app/views/pages'));
app.set('view engine', 'jade')
app.use(bodyParser.urlencoded())
app.use(cookieParser())
app.use(require('connect-multiparty')()); // 多种类型form表单上传，这里是为了可以上传自定义海报文件 admin.jade
app.use(session({
    secret: 'movie',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}))

//本地的开发环境下的配置
if ('development' === app.get('env')) {
    app.set('showStackError', true); //打印错误信息
    app.use(morgan(':method :url :status')); // 查看请求状态
    app.locals.pretty = true; //格式化显示代码，不要让全部html显示在一行
    mongoose.set('debug', true)
}
//获得config路由入口
require('./config/routes')(app)

app.use(express.static(path.join(__dirname, 'public')))
app.locals.moment = require('moment')
app.listen(port)

console.log('start on port ' + port)
    //app.use('/', userCenter);
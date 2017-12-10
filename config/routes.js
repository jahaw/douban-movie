//控制转发路由，进行控制转发处理请求跳转
let Index=require('../app/controllers/index')
let User=require('../app/controllers/user')
let Movie=require('../app/controllers/movie')
let Comment=require('../app/controllers/comment')
let Category=require('../app/controllers/category')
multipart = require('connect-multiparty'),											  // 处理文件上传中间件
multipartMiddleware = multipart();

module.exports=function(app){
    //pre handle user 将session中保存的用户名存储到本地变量中
    app.use((req, res, next) => {
        // console.log("user in session:"+req.session.user)
        var _user = req.session.user;
        if(_user){
            res.locals.user = _user;
        }
        next();
    })

//index
app.get('/',Index.index)

//user
app.post('/user/signup',User.signup)
app.post('/user/signin',User.signin)
app.get('/signup',User.showSignup)
app.get('/signin',User.showSignin)
app.get('/logout',User.logout)
app.route('/admin/user/list')
    .get(User.signinRequired,User.adminRequired,User.list)
    .delete(User.del);

//movie
app.get('/movie/:id',Movie.detail)
app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)
app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save)
app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)

//comment
app.post('/admin/movie/movieComment',User.signinRequired,Comment.save)
app.delete('/movie/:id',Comment.del)

//app.post('/user/comment',User.signinRequired,Comment.save)

//category
app.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new)
app.post('/admin/category',User.signinRequired,User.adminRequired,Category.save)
app.route('/admin/category/list')
    .get(User.signinRequired,User.adminRequired,Category.list)
    .delete(Category.del);
//results
app.get('/results',Index.search)

}
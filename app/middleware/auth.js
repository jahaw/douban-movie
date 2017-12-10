// 权限中间件
var requiredLogin = function(req,res,next){
    let user = req.session.user;

    if(!user){
        return res.redirect('/signin')
    }

    next();
}
var requiredAdmin = (req, res, next) => {
    var _user = res.locals.user
    if (_user.role < 10 || _user.role === 'undefined') {
        console.log("没有权限");
        res.locals.admin = false;
        return res.redirect("/signIn");
    }
    next();
}


module.exports = {
    requiredLogin,
    requiredAdmin
}
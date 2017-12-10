let User=require('../models/user')

//show signup page
exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	})
}

//show signin page
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登录页面'
	})
}

//signup page
exports.signup = function(req,res){
	let _user=req.body.user;

	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err)
		}

		if(user){
			return res.redirect('/signin')
		}else{
			let user_=new User(_user);
			user_.firstSave = true
			user_.save(function(err,user){
				if(err){
					console.log(err);
				}

				res.redirect('/')
		    })
		}
	})
}

//signin page
exports.signin = function(req,res){
	let _user=req.body.user;
	let name=_user.name;
	let password=_user.password;

	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err)
		}

		if(!user){
			return res.redirect('/signup')
		}

		//对比密码是否正确
		user.comparePassword(password,function(err,isMatch){
			if(err){
				console.log(err);
			}

			if(isMatch){
				//将用户登录信息存入session中
				req.session.user=user;

				return res.redirect('/')
			}else{

				return res.redirect('/signin')
			}
		})
	})
}

//logout 登出
exports.logout = function(req,res){
	delete req.session.user;

	res.redirect('/')
}

//userlist page
exports.list = function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}

		res.render('userlist',{
			title:'用户列表页面',
			users:users
		})
	})
}

//midware for user 中间件约束用户权限
exports.signinRequired = function(req,res,next){
	let user = req.session.user;

	if(!user){
		return res.redirect('/signin')
	}

	next();
}

exports.adminRequired = function(req,res,next){
	let user = req.session.user;

	if(user.role<=10){
		return res.redirect('/signin')
	}

	next();
}

//list delete user
exports.del = function(req,res){
    // 获取客户端Ajax发送的URL值中的id值
    let id=req.query.id

    if(id){
        User.remove({_id:id},function(err,movie){
            if(err){
                console.log(err)
            }else{
                res.json({success:1})
            }
        })
    }
}

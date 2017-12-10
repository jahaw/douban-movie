let mongoose = require('mongoose')//引入mongoose这个建模模块
let bcrypt = require('bcryptjs');// 加盐，增加字典和暴力攻击破密码的时间复杂度，在原始密码中加入一些数据，再hash
let ObjectId = mongoose.Schema.Types.ObjectId
const SALT_WORK_FACTOR=10;

//schema模型，数据类型
let UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password:{
	    type: String
    },
	// 0: normal user
	// 1: verified user 通过邮箱注册激活的用户
	// 2: professional user 资料完整的用户
	// >10: admin
	// >50: super admin 开发时的超级管理员
	role:{
		type:Number,
		default:0
	},
    sex:{
        type: String,
        default: '男'
    },
    img:String,
    email:String,
    tel:Number,
    firstSave: {
	    type: Boolean,
        default: false
    },
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
})

//每次存储数据之前都调用这个方法 pre save
UserSchema.pre('save',function(next){
	let user=this;
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}

    if(this.firstSave){
        bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt,function (err, hash){
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    }else{
        next();
    }
})

//实例方法
UserSchema.methods={
	comparePassword:function(_password,cb){
		//调用bcrypt的compare方法，对比经处理后的密码与当前输入的密码是否一致
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err){
				return cb(err);
			}else{
				cb(null,isMatch);
			}
		})
	}
}


//静态方法，在model层可使用这个方法，不需要new 实例化
UserSchema.statics={
	fetch:function(cb){
		return this
		      .find({})
		      .sort('meta.updateAt')
		      .exec(cb)//执行callback
	},
	findById:function(id,cb){
		return this
		      .findOne({_id:id})
		      .exec(cb)//执行callback
	}
}

module.exports=UserSchema

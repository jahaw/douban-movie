let mongoose = require('mongoose')
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

//schema模型，数据类型
let CommentSchema = new Schema({
	movie:{
		type:ObjectId,
		ref:'Movie'
	},
	from:{type:ObjectId,ref:'User'},
    reply:[{							 											// 对评论人的回复
        from:{
            type:ObjectId,
            ref: 'User'
        },
        to:{																			// 被评论人
            type: ObjectId,
            ref: 'User'
        },
        content: String,
        meta: {
            createAt: {
                type: Date,
                default: Date.now()
            }
        }
    }],
	content:String,
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

// 模式保存前执行下面函数,如果当前数据是新创建，则创建时间和更新时间都是当前时间，否则更新时间是当前时间
CommentSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt=this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}

	next()
})


//静态方法，只有经过模型实例化model后才有这个方法
CommentSchema.statics={
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

module.exports=CommentSchema
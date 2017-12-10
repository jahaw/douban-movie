let Movie=require('../models/movie')
let Category=require('../models/category')
let User = require('../models/user')
let Comment = require('../models/comment')

//index page
exports.index = function(req,res){
	Category
	.find({})
	.populate({path:'movies',options:{limit:6}})
	//path:类型：String或Object。
　　//String类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。
　　//Object类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。下面的例子中将会实现。
    .exec(function(err,categories){
		if(err){
					console.log(err)
				}
				res.render('index',{
				title:'豆瓣电影',
				categories:categories
			})
    })	
}

//搜索、分页 page
exports.search = function(req,res){
	let catId = req.query.cat //分类
	let q = req.query.q // 搜索电影关键字
	let page = parseInt(req.query.p,10) || 0 //页数
	let count = 4 //每页显示数据个数
	let index = page * count //每页开始数据的索引

    // 分页
	if(catId){
		Category
			.find({_id:catId})
			.populate({
			   path:'movies',
			   select:'title poster'
			})//path:类型：String或Object。
		　　//String类型的时， 指定要填充的关联字段，要填充多个关联字段可以以空格分隔。
		　　//Object类型的时，就是把 populate 的参数封装到一个对象里。当然也可以是个数组。下面的例子中将会实现。
		    .exec(function(err,categories){
				if(err){
					console.log(err)
				}

				let category = categories[0] || {}
				let movies = category.movies || []
				let results = movies.slice(index,index+count)

				res.render('results',{
					title:'结果列表页面',
					keyword:category.name,
					query:'cat='+catId,
					currentPage:page+1,
					totalPage:Math.ceil(movies.length/count),
					movies:results
				})
		    })
	}// 搜索
	else{
		Movie
		  .find({title:new RegExp(q+'.*','i')})
		  .exec(function(err,movies){
		  	if(err){
					console.log(err)
				}

				let results = movies.slice(index,index+count)

				res.render('results',{
					title:'结果列表页面',
					keyword:q,
					query:'q='+q,
					currentPage:page+1,
					totalPage:Math.ceil(movies.length/count),
					movies:results
				})
		  })
	}

		
}

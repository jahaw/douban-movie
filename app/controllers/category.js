let Category=require('../models/category')

//admin new page
exports.new = function(req,res){
	res.render('category-admin',{
		title:'后台电影分类录入页面',
		category:{}
	})
}

//admin post movie
exports.save = function(req,res){
	let _category=req.body.category
	let category=new Category(_category)

	category.save(function(err,category){
		if(err){
			console.log(err)
		}

		res.redirect('/admin/category/list')
	})
}

//list page
exports.list = function(req,res){
	Category.fetch(function(err,categories){
		if(err){
			console.log(err)
		}

		res.render('categorylist',{
			title:'电影分类列表页面',
			categories:categories
		})
	})
}

//list delete movieCategory
exports.del = function(req,res) {
    // 获取客户端Ajax发送的URL值中的id值
    let id  = req.query.id;
    if(id) {
        // 如果id存在则服务器中将该条数据删除并返回删除成功的json数据
        Category.remove({_id:id},function(err) {
            if(err) {
                console.log(err);
            }
            res.json({success:1});
        });
    }
};

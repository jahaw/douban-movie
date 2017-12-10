

# NodeJs+MongoDB+jQuery+Bootstrap 搭建的豆瓣电影网站


### 基于Nodejs的练手项目
> 技术栈 Node.js + Express + MongoDB + Jade + Bootstrap + jQuery + gulp


####   项目前端搭建:
* 使用jQuery和Bootsrap完成网站前端JS脚本和样式处理；
* 前后端的数据请求交互通过Ajax完成；
* 引入了Moment.js格式化前端页面显示时间；
#### 项目后端搭建:
* 使用NodeJs的express框架完成电影网站后端搭建；
* 使用mongodb完成数据存储，通过mongoose模块完成对mongodb数据的构建；
* 使用jade模板引擎完成页面创建渲染；
* 使用Moment.js格式化电影存储时间；
#### 本地开发环境搭建:
* 使用gulp集成jshint对JS语法检查，加入browser-sync与nodemon，实现实时刷新及服务器的自动重启等功能。
#### 网站整体功能:
网站正常访问无需管理员权限，对电影的评论，需要用户登录，对网站数据的修改添加删除需要管理员的权限(role > 10)，具体功能如下：
* 实现了用户的基本注册，登录，登出及管理功能；
* 实现了搜索功能，模糊关键字可搜索电影名字及电影类别下的电影；
* 用户登录做session处理；
* 用户可以对电影进行评论；
* 电影添加分类及录入，数据可以同步豆瓣ID；
* 对电影数据作分页处理，分页查询数据库数据；
* 管理员可以对网站数据进行增加删除修改；
* 管理员可从后台查看所有的电影、用户、评论、访问量等数据；

###项目页面
当使用管理员账号（chenjun,123456）登录时，在网站右上角会出现下拉菜单，通过点击菜单可以进入各个页面，如果自己注册的账号，默认为普通用户（role为0），普通用户有权限限制，是无法进入到电影的列表、录入、分类、用户等管理页面的！当然，可自行修改数据库里的当前账号的role值，当role大于10的时候，就有管理员权限了！基本的界面路由如下：
基本页面：
* 首页：localhost:3000/
* 详情页：localhost:3000/movie/:id
* 当前电影分页类别页：localhost:3000/movie/category/result?cat=id&pageSize=1

用户关联：

* 用户注册：localhost:3000/signUp
* 用户登录：localhost:3000/signIn
* 用户个人中心：localhost:3000/user/center?userId=id

后台管理：

* 当前电影列表：localhost:3000/admin/movie/list
* 电影录入：localhost:3000/admin/movie/add
* 电影数据修改：localhost:3000/admin/movie/update/:id
* 电影分类列表：localhost:3000/admin/category/list
* 电影分类修改：localhost:3000/admin/category/update/:id
* 电影分类新增：localhost:3000/admin/category/new
* 用户列表：localhost:3000/admin/user/list

### 运行环境
```javascript
git clone git@github.com:mowangchuzhong/douban-movie.git
cd douban-movie
```

> $ bower install

> $ npm install

> $ gulp


### 项目结构
``` bash
├─app
│  ├─controllers
│  ├─middleware
│  ├─models
│  ├─schemas
│  └─views
│      ├─includes
│      └─pages
├─config
├─public
│  ├─js
│  ├─libs
│  │  ├─css
│  │  │  ├─include
│  │  │  └─movie
│  │  ├─images
│  │  │  ├─includes
│  │  │  └─movie
│  │  └─scripts
│  │      └─js
│  │          ├─include
│  │          ├─movie
│  │          └─user
│  ├─sass
│  │  ├─.sass-cache
│  │  │  ├─07f2acd7c6896fe42d4498c5cc289a2d62daba74
│  │  │  ├─3a7bc1cae12d57c9fe265cae17c70ffa9f3515d8
│  │  │  ├─702ebcbe7156983bcb6a0ccee58b359ec4906e65
│  │  │  └─d865922842592340a08ca21fab8235f88832aa1c
│  │  ├─include
│  │  └─movie
│  └─upload
│      ├─movie
│      └─music
└─test
    └─user
```


// 添加路由规则

var crypto = require( 'crypto' );		// 用来生成散列值来加密密码
var User = require( '../models/user.js' );
var Post = require( '../models/post.js' );

module.exports = function( app ) {
	
	app.get( '/', function( req, res ) {
		// 判断是否是第一页，并把请求的页数转换成number类型
		var page = req.query.p ? parseInt( req.query.p ) : 1;		// 转换成数字的形式使用
		// 查询并返回第page页的10篇文章
		Post.getTen( null, page, function( err, posts, total ) {		// 函数位于post.js
			if ( err ) {
				posts = [];
			}
			res.render( 'index', {
			 title: 'tracy木子-首页',
			 user: req.session.user,
			 posts: posts,
			 page: page,
			 isFirstPage: ( page - 1 ) == 0,		// 第一页
			 isLastPage: ( ( page - 1 ) * 10 + posts.length ) == total,		// 最后一页
			 user: req.session.user,
			 success: req.flash( 'success' ).toString(),		// 将成功的信息赋值给变量 success
			 error: req.flash( 'error' ).toString()
			 });		// 参数1：模板名称 参数2：传递给模板的数据对象
		});		
	});

	// 登录
	app.get( '/login', checkNotLogin );
	app.get( '/login', function( req, res ) {
		res.render( 'login', {
		 title: 'tracy木子-登录',
		 user: req.session.user,
		 success: req.flash( 'success' ).toString(),
		 error: req.flash( 'error' ).toString()
		});
	});
	app.post( '/login', checkNotLogin );
	app.post( '/login', function( req, res ) {
		// 生成密码的md5值
		var md5 = crypto.createHash( 'md5' );
		var password = md5.update( req.body.password ).digest( 'hex' );		// 转化成十进制
		
		// 检查用户是否存在
		User.get( req.body.name, function( err, user ) {
			if ( !user ) {
				req.flash( 'error', '用户不存在,请重新输入！' );
				return res.redirect( '/login' );		// 用户不存在则跳转到登录页
			}
			// 检查密码是否一致
			if ( user.password != password ) {
				req.flash( 'error', '密码错误！' );
				returnres.redirect( '/login' );
			}
			// 用户名密码都匹配后，将用户信息存入session
			req.session.user = user;
			req.flash( 'success', '登录成功！' );
			res.redirect( '/' );		// 登录后成功跳转主页
		});
	});

	// 登出
	app.get( '/logout', checkLogin );
	app.get( '/logout', function( req, res ) {
		req.session.user = null;		// 通过赋值为null，从而都掉session中的用户信息，实现用户的退出
		req.flash( 'success', '退出啦~~~' );
		res.redirect( '/' );		// 退出成功后跳转主页
	});

	// 分享
	app.get( '/share', checkLogin );
	app.get( '/share', function( req, res ) {
		res.render( 'share', {
		 title: 'tracy木子-分享',
		 local: '分享',
		 user: req.session.user,
		 success: req.flash( 'success' ).toString(),
		 error: req.flash( 'error' ).toString() 
		});
	});

	// 关于我
	app.get( '/about', checkLogin );
	app.get( '/about', function( req, res ) {
		res.render( 'about', {
		 title: 'tracy木子-关于我',
		 local: '关于我',
		 user: req.session.user,
		 success: req.flash( 'success' ).toString(),
		 error: req.flash( 'error' ).toString()
		});
	});

	// 发布文章
	app.get( '/post', checkLogin );
	app.get( '/post', function( req, res ) {
		res.render( 'post', {
		 title: 'tracy木子-发布文章',
		 local: '发布文章',
		 user: req.session.user,
		 success: req.flash( 'success' ).toString(),
		 error: req.flash( 'error' ).toString() 
		});
	});
	app.post( '/post', checkLogin );
	app.post( '/post', function( req, res ) {
		var currentUser = req.session.user;
		var post = new Post( currentUser.name, req.body.title, req.body.post );
		post.save( function( err ) {
			if ( err ) {
				req.flash( 'error', err );
				return res.redirect( '/' );
			}
			req.flash( 'success', '发布成功' );
			res.redirect( '/' );		// 发布成功跳转到主页—————————这个重定向之后要修改成跳转到新发布的文章的详情页
		});
	});

	// 上传图片
	app.get( '/uploadPic', checkLogin );		// 只有登录的用户才有权限上传文件
	app.get( '/uploadPic', function( req, res ) {
		res.render( 'uploadPic', {
		 title: 'tracy木子-上传图片',
		 local: '上传图片',
		 user: req.session.user,
		 success: req.flash( 'success' ).toString(),
		 error: req.flash( 'error' ).toString()
		});
	});
	// 添加对上传文件的支持
	app.post( '/uploadPic', checkLogin );
	app.post( '/uploadPic', function( req, res ) {
		req.flash( 'success', '图片上传成功~~' );
		res.redirect( '/uploadPic' );
	});

	// // 用户页面的路由规则
	// app.get( '/u/:name', function( req, res ) {		// 添加app.get( '/u/:name' )这个路由规则，用来处理用户页的请求，然后可以从数据库取得该用户的数据并渲染useruser.ejs模板，生成页面并显示给用户
	// 	// 检查用户是否存在
	// 	User.get( req.params.name, function( err, user ) {		// req.params用来处理/:***形式的请求
	// 		if ( !user ) {
	// 			req.flash( 'error', '用户不存现在！' );
	// 			return res.redirect( '/' );		// 用户不存在则跳转到主页
	// 		}
	// 		// 查询并返回该用户的所有文章
	// 		Post.getAll( user.name, function( err, posts ) {
	// 			if ( err ) {
	// 				req.flash( 'error', err );
	// 				return res.redirect( '/' );
	// 			}
	// 			res.render( 'user', {
	// 				title: user.name,
	// 				posts: posts,
	// 				user: req.flash( 'success' ).toString(),
	// 				error: req.flash( 'error' ).toString()
	// 			});
	// 		})；
	// 	});
	// });
	
	// 文章页的路由规则
	app.get( '/u/:name/:day/:title', function( req, res ) {
		Post.getOne( req.params.name, req.params.day, req.params.title, function( err, post ) {
			if ( err ) {
				req.flash( 'error', err );
				return res.redirect( '/' );
			}
			res.render( 'article', {
				title: req.params.title,
				local: '文章详情',
				post: post,
				user: req.session.user,
				success: req.flash( 'success' ).toString(),
				error: req.flash( 'error' ).toString()
			});
		});
	});

	// 修改文章的路由规则
	app.get( '/edit/:name/:day/:title', checkLogin );		// 登录状态下才能看到
	app.get( '/edit/:name/:day/:title', function( req, res ) {
		var currentUser = req.session.user;
		Post.edit( currentUser.name, req.params.day, req.params.title, function( err, post ) {
			if ( err ) {
				req.flash( 'error', err );
				return res.redirect( 'back' );
			}
			res.render( 'edit', {
				title: req.params.title,
				local: '编辑文章',
				post: post,
				user: req.session.user,
				success: req.flash( 'success' ).toString(),
				error: req.flash( 'error' ).toString()
			});
		});
	});
	app.post( '/edit/:name/:day/:title', checkLogin );
	app.post( '/edit/:name/:day/:title', function( req, res ) {
		var currentUser = req.session.user;
		Post.update( currentUser.name, req.params.day, req.params.title,  req.body.post, function( err ) {
			var url = encodeURI( '/u' + req.params.name + '/' + req.params.day + '/' + req.params.title);
			if ( err ) {
				req.flash( 'error', err );
				return res.redirect( url );		// 出错！返回文章页
			}
			req.flash( 'success', '修改成功~~' );
			res.redirect( url );		// 成功，返回文章页
		});
	});

	// 删除的路由规则
	app.get( '/remove/:name/:day/:title', checkLogin );
	app.get( '/remove/:name/:day/:title', function( req, res ) {
		var currentUser = req.session.user;
		Post.remove( currentUser.naem, req.params.day, req.params.title, function( err ) {
			if ( err ) {
				req.flash( 'error', err );
				return res.redirect( 'back' );
			}
			req.flash( 'success', '删除成功~~' );
			res.redirect( '/' );
		});
	});

	// 404的路由控制
	app.use( function( req, res ) {
		res.render( '404', {
		 title: '404', 
		 user: req.session.user,
		});
	});

	// 未登录
	function checkLogin( req, res, next ) {
		if ( !req.session.user ) {
			req.flash( 'error', '未登录！' );
			res.redirect( '/login' );
		}
		next();		// 通过next()可以转移控制权
	};

	// 已登录
	function checkNotLogin( req, res, next ) {
		if ( req.session.user ) {
			req.flash( 'error', '已登录~~' );
			res.redirect( 'back' );		// 返回之前的页面
		}
		next();
	};

};


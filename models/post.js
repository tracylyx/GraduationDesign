var mongodb = require('./db');		// Db对象
var markdown = require('markdown').markdown;

function Post(name, title, tags, post) {
	this.name = name;
	this.title = title;
	this.tags = tags;
	this.post = post;
};

module.exports = Post;

// 存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
	var date = new Date();
	// 存储各种时间格式，方便以后扩展
	var time = {
			date: date,
			year: date.getFullYear(),
			month: date.getFullYear() + "-" + (date.getMonth() + 1),
			day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
			minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
				date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
		}
		// 要存入数据库的文档
	var post = {
		name: this.name,
		time: time,
		title: this.title,
		tags: this.tags,
		post: this.post,
		pv: 0 // 记录pv数量
	};
	// 打开数据库
	mongodb.open(function(err, db) {	// open方法使用一个参数，这个参数为函数，用于指定执行数据库链接操作后返回的回调函数
		if (err) {	// 链接失败时抛出的错误  err
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 将文档插入posts集合
			collection.insert(post, {
				safe: true
			}, function(err) {
				mongodb.close();		// 当一个数据库不再使用的时候就要调用close()
				if (err) {
					return callback(err); // 失败！返回err
				}
				callback(null); // 返回err为null
			});
		});
	});
};

// // 获取所有文章，读取文章及其相关信息
// Post.getAll = function( name, callback ) {		// 在index.js中被调用
// 	// 打开数据库
// 	mongodb.open( function( err, db ) {
// 		if ( err ) {
// 			return callback( err );
// 		}
// 		// 读取posts集合
// 		db.collection( 'posts', function( err, collection ) {
// 			if ( err ) {
// 				mongodb.close();
// 				return callback( err );
// 			}
// 			var query = {};
// 			if ( name ) {
// 				query.name = name;
// 			}
// 			// 根据query对象查询文章
// 			collection.find( query ).sort({
// 				time: -1   // 降序
// 			}).toArray( function( err, docs ) {
// 				mongodb.close();
// 				if ( err ) {
// 					return callback( err );		// 失败！返回err
// 				}
// 				// 解析markdown为html
// 				docs.forEach( function( doc ) {
// 					doc.post = markdown.toHTML( doc.post );
// 				});
// 				callback( null, docs );		// 成功！以数组形式返回查询的结果
// 			});
// 		});
// 	});
// };

// 一次获取十篇文章
Post.getTen = function(name, page, callback) { // 在index.js中被调用
	// 打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (name) {
				query.name = name;
			}
			// 使用count返回特定查询的文档数total
			collection.count(query, function(err, total) {
				// 根据query对象查询，并跳过前（page-1）*10个结果，返回之后的10个结果
				collection.find(query, {
					skip: (page - 1) * 10,
					limit: 10
				}).sort({
					time: -1
				}).toArray(function(err, docs) {
					mongodb.close();
					if (err) {
						return callback(err);
					}
					// 解析markdown为html
					docs.forEach(function(doc) {
						doc.post = markdown.toHTML(doc.post);
					});
					callback(null, docs, total); // 成功！以数组形式返回查询的结果
				});

			});
		});
	});
};

// 获取一篇文章
Post.getOne = function(name, day, title, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、发表日期及文章名进行查询
			collection.findOne({
				'name': name,
				'time.day': day,
				'title': title
			}, function(err, doc) {
				if (err) {
					mongodb.close();
					return callback(err);
				}
				if (doc) {
					// 每访问1次，pv值增加1
					collection.update({
						'name': name,
						'time.day': day,
						'title': title
					}, {
						$inc: {
							'pv': 1
						}
					}, function(err) {
						mongodb.close();
						if (err) {
							return callback(err);
						}
					});
					// 解析markdown为html
					doc.post = markdown.toHTML(doc.post);
					callback(null, doc); // 返回查询的一篇文章
				}
			});
		});
	});
};

// 获取topFive
// Post.getTopFive = function(name, time, callback) {
// 	mongodb.open(function(err, db) {
// 		if (err) {
// 			return callback(err);
// 		}
// 		// 读取posts集合
// 		db.collection('posts', function(err, collection) {
// 			if (err) {
// 				mongodb.close();
// 				return callback();
// 			}
// 			// 根据用户名、发表日期及文章名进行查询
// 			collection.find({
// 				limit: 5
// 			}).sort({
// 				time: -1
// 			}).toArray(function(err, docs) {
// 				mongodb.close();
// 				if (err) {
// 					return callback(err);
// 				}
// 				callback(null, docs);
// 			});
// 		});
// 	});
// }

//返回原始发表的内容（markdown格式）
Post.edit = function(name, day, title, callback) {
	// 打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			// mongodb.close();
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、发表日期及文章进行查询
			collection.findOne({
				'name': name,
				'time.day': day,
				'title': title
			}, function(err, doc) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, doc); // 返回查询的一篇文章（markdown格式）
			});
		});
	});
};

// 更新一篇文章及其相关信息. 将修改好的文章提交到数据库中
Post.update = function(name, day, title, post, callback) {
	// 打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			// mongodb.close();
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 更新文章内容
			collection.update({
				'name': name,
				'time.day': day,
				'title': title
			}, {
				$set: {
					post: post
				}
			}, function(err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

// 删除一篇文章
Post.remove = function(name, day, title, callback) {
	// 打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 根据用户名、日期和标题查找并删除一篇文章
			collection.remove({
				'name': name,
				'time.day': day,
				'title': title
			}, {
				w: 1
			}, function(err) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null);
			});
		});
	});
};

// 返回通过标题关键字查询的所有文章信息
Post.search = function(key, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var pattern = new RegExp(key, 'i');
			collection.find({
				'title': pattern
			}, {
				'name': 1,
				'time': 1,
				'title': 1
			}).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, docs);
			});
		});
	});
};

// 返回所有文章存档信息
Post.getArchive = function(callback) {
	// 打开数据库
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		// 读取posts集合
		db.collection('posts', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			// 只返回包含name、time、title属性的文档组成的存档数组
			collection.find({}, {
				'name': 1,
				'time': 1,
				'title': 1
			}).sort({
				time: -1 		// 降序排列
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null,docs);
			});
		});
	});
};
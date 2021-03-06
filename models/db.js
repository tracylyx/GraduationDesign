var settings = require('../settings'),
	Db = require('mongodb').Db,
	Connection = require('mongodb').Connection,
	Server = require('mongodb').Server;
/// 设置数据库名、数据库地址和数据库端口创建了一个数据库连接实例，并通过module.exports导出实例，从而可以通过require这个文件来对数据库进行读写
module.exports = new Db(settings.db, new Server(settings.host, settings.port), {
	safe: true		// false为默认，true的时候表示该命令返回插入操作的执行结果
});
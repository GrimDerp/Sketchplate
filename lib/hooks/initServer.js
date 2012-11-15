//Initialize a static-file server using connect

var connect = require('connect'),
	http = require('http');

module.exports = function initServer( path, opts, callback ){
	//synchronous but supporting callbacks for consistency
	opts = opts || {};
	var app = connect()
		.use(connect.logger('dev'))
		.use(connect.static( path ))
		.use(connect.directory( path ))
		.use(function( req, res){
			res.end('Hello from Connect!\n');
		});

	var port = opts.port || 3000;
	http.createServer(app).listen( port );
	if( callback ){
		callback( null, app );
	}
	//add your own middleware on app w/ app.use
	return app;
};
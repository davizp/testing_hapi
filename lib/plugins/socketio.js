const Pckg = require('~/package.json');
const Path = require('path');


// Internals ====================================
const internals = {
	defaults: {
		connection:''
	}
};


// Exposing Plugin ==============================
exports.register = (plugin, options, next) => {
    const opts = Object.assign({}, internals.defaults, options);
    let io, listener;

    if(opts.connection !== '') {
    	if(typeof plugin.select(options.connection).connections[0] === 'undefined') {
    		return next('Connection label doesn\'t exist');
    	}
    	 listener = plugin.select(options.connection).connections[0].listener;
    } else {
        listener = plugin.connections[0].listener;
    }

    io = require('socket.io')(listener);
    //plugin.expose('io', io);

    io.on('connection', function (socket) {
    	console.log(`Socket: ${socket.id}`);
		socket.time_start = new Date().getTime();

		socket.on('disconnect', function () {
			io.emit('user disconnected');
			socket.time_end = new Date().getTime();


	    	console.log(`Socket '${socket.id}' has disconnected`);
			console.log (
				'Duration : ',
				(socket.time_end - socket.time_start) / 1000  ,
				'seconds'
			);
		});

		socket.on('log', function(data) {
			const input = `
				Event: ${data.eventType}
				Socket Id: ${socket.id}
				Time: ${new Date().toLocaleTimeString()}
				Target: ${data.target}
				Value: ${data.value}
			`;

			console.log(input);
		});

	});

    return next();
};


// Exposing Plugin Attributes ===================
exports.register.attributes = {
    name: 'socketio',
    version: Pckg.version
};
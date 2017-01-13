const Pckg = require('~/package.json');
const Path = require('path');


// Internals ====================================
// const internals = {
// 	defaults: {
// 		views: {
// 			engines: {
// 				html: {
// 					module: require('handlebars'),
// 					path: `${ __dirname }`
// 				}
// 			}
// 		}
// 	}
// };
const internals = {
	defaults: {
		views: {
			engines: {
				html: require('handlebars')
			},
			path: '/Users/dnunez/Documents/Git/skeleton/'
		}
	}
};

console.log(Path.join(__dirname, '../../'));



// Exposing Plugin ==============================
exports.register = (plugin, options, next) => {
    const opts = Object.assign({}, internals.defaults, options);

	plugin.dependency('vision', (server, done) => {
    // console.log(plugin);
		if (Object.keys(opts.views.engines).length) {
			server.views(opts.views);
			// server.views({
			// 	engines: {
			// 		html: require('handlebars')
			// 	},
			// 	path: Path.join(__dirname, '../../')
			// });
		}


		// console.log(server);
		console.log('This thing is working',Object.keys(opts.views));

		// done();
	});
	next(); // Move along
};


// Exposing Plugin Attributes ===================
exports.register.attributes = {
    name: 'hapivision',
    version: Pckg.version
};
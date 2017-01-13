// Deps =========================================
const Glue = require('glue');
const Hoek = require('hoek');
const os = require('os');

// Glue =========================================
exports.init = (manifest, options, next) => {

	console.log(manifest);

    Glue.compose(manifest, options, (err, server) => {

        Hoek.assert(!err, err);

  //       server.views({
		// 	engines: {
		// 		html: require('handlebars')
		// 	},
		// 	path: Path.join(__dirname, '../')
		// });


        //== Kickstart my heart
        server.start((_err) => {

            next(_err, server);
        });
    });
};

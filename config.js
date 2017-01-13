// Load Modules =================================
const Confidence = require('confidence');
const Pkg = require('~/package.json');
const Path = require('path');

// Internals ====================================
const internals = {
    defaults: {
        env: process.env.NODE_ENV || 'dev'
    },
    store: null
};

// Config =======================================
internals.config = {
    database: {
        mongodb: internals.mongo
    },
    manifest: {
        connections: [
            {
                routes: {
                    cors: true
                },
                port: {
                    $filter: 'env',
                    prd: 8080,
                    $default: 8085
                },
                host: {
                    $filter: 'env',
                    prd: '127.0.0.1',
                    $default: 'localhost'
                }
            }
        ],
        registrations: [
            {
                plugin: 'inert'
            },
            {
                plugin: 'vision'
            },
            {
                plugin: './plugins/router'
            },
            {
                plugin: './plugins/socketio'
            }
        ]
    }
};

// Creating confidence store ====================
internals.store = new Confidence.Store(internals.config);

// Exposing GET method fro retrieving conf ======
exports.get = (key, opts = {}) => {

    const criteria = Object.assign({}, internals.defaults, opts);

    return internals.store.get(key, criteria);
};


// ,
//             {
//                 plugin: './plugins/hapivision'
//             }
var config = require('getconfig');
var fs = require('fs');
var Hapi = require('hapi');
var less = require('less');
// var Moniker = require('moniker'); // fake segment names
var moonboots = require('moonboots_hapi');
// var path = require('path');

var appRoot = __dirname;
var server = new Hapi.Server(config.http.port);

server.views({
  engines: { html: require('handlebars') },
  path: __dirname
});

// server.route({
  // method: 'GET',
  // path: '/images/{image*}',
  // handler: {
    // directory: {
      // path: function(request) {
        // return '/images';
      // }
    // }
  // }
// });

// server.route({
  // method: 'GET',
  // path: '/modules/{module}/images/{image*}',
  // handler: {
    // directory: {
      // path: function(request) {
        // return 'modules/' + request.params.module + '/images';
      // }
    // }
  // }
// });


// Fallback on saturn for everthing that is not handled before
// connect middleware to this node app and the UI is fully functional now
server.route({
  method: 'GET',
  path: '/saturn/{path*}',
  handler: {
    proxy: {
      mapUri: function(request, callback) {
        var proxy = config.apiProxySettings[config.apiProxy];
        callback(null, 'http://' + proxy.domain + ':' + proxy.port + proxy.context + request.url.path.replace(/^\/saturn/, ''));
      },
      passThrough: true,
      redirects: config.apiProxySettings[config.apiProxy].redirects || 1
    }
  }
});

server.route({
  method: 'PUT',
  path: '/saturn/{path*}',
  handler: {
    proxy: {
      mapUri: function(request, callback) {
        var proxy = config.apiProxySettings[config.apiProxy];
        callback(null, 'http://' + proxy.domain + ':' + proxy.port + proxy.context + request.url.path.replace(/^\/saturn/, ''));
      },
      passThrough: true,
      redirects: 1
    }
  }
});

server.route({
  method: 'POST',
  path: '/saturn/{path*}',
  handler: {
    proxy: {
      mapUri: function(request, callback) {
        var proxy = config.apiProxySettings[config.apiProxy];
        callback(null, 'http://' + proxy.domain + ':' + proxy.port + proxy.context + request.url.path.replace(/^\/saturn/, ''));
      },
      passThrough: true,
      redirects: 1
    }
  }
});

server.route({
  method: 'DELETE',
  path: '/saturn/{path*}',
  handler: {
    proxy: {
      mapUri: function(request, callback) {
        var proxy = config.apiProxySettings[config.apiProxy];
        callback(null, 'http://' + proxy.domain + ':' + proxy.port + proxy.context + request.url.path.replace(/^\/saturn/, ''));
      },
      passThrough: true,
      redirects: 1
    }
  }
});

server.pack.register([{
    plugin: require('lout')
  },
  {
    plugin: require('good'),
    options: {
      subscribers: {
        'console': ['ops', 'log', 'error'] // request
      }
    }
  },
  {
    plugin: moonboots,
    options: [{
      appPath: '/{p*}',
      appTemplate: 'index.html',
      moonboots: {
        browserify: {
          debug: true,
          transforms: [
            'domthingify'
          ]
        },
        cache: (config.isDev) ? false : true,
        cssFileName: 'bundledCSS',
        developmentMode: config.isDev,
        jsFileName: 'bundledJS',
        main: appRoot + '/app.js',
        stylesheets: [
          appRoot + '/css/compiledStyles.css'
        ],
        beforeBuildCSS: function() {
          var configCSS = fs.readFileSync('_config.less', 'utf8');
          var parser = new (less.Parser)({
            paths: [appRoot + '/modules'],
            filename: 'styles.less' // Specify a filename, for better error messages
          });

          parser.parse(configCSS, function(err, tree) {
            if (err) {
              console.log(err);
            } else {
              var output = tree.toCSS({
                // Minify CSS output
                compress: false
              });
              fs.writeFileSync(appRoot + '/css/compiledStyles.css', output, 'utf8');
            }
          });
        }
      }
    }]
  }],
  function(err) {
    if (err) {
      throw err;
    }

    server.start(function() {
      console.log('Server running at:', server.info.uri);
    });
  });

module.exports = server;

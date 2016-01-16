'use strict';

const Hapi = require('hapi');
const Hoek = require('hoek');

const server = new Hapi.Server();

server.connection({host: 'localhost', port: 3000});

server.register([
  require('inert')
], (err) => {
  if (err) throw err;
  server.route([
    {
      method: 'GET',
      path: '/assets/{path*}',
      handler: {
        directory: {
          path: 'public',
          listing: false
        }
      }
    },
    {
      method: 'GET',
      path: '/',
      handler: (response, reply) => {
        reply.view('home');
      }
    }
  ])
});

server.register([
  require('vision')
], (err) => {
  Hoek.assert(!err, err);

  server.views({
    engines: {
      hbs: require('handlebars')
    },
    relativeTo: __dirname,
    path: './views',
    layout: true,
    layoutPath: './views/layouts'
    //partialsPath: './views/partials'
  })
});

server.start((err) => {
  Hoek.assert(!err, err);
  console.log('Server running at ', server.info.uri);
});

module.exports = server;


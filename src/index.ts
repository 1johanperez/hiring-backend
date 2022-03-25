import path from 'path';
import Fastify, { FastifyInstance } from 'fastify';
import autoload from 'fastify-autoload';

// Fastify plugin, (middleware)
// creates the server which is a fastify instance like express
const server: FastifyInstance = Fastify({
  logger: true,
});

// starts the server
const start = async () => {
  try {
    // Register services
    server.register(autoload, {
      dir: path.join(__dirname, 'services'),
      indexPattern: /.*service(\.ts|\.js|\.cjs|\.mjs)$/,
    });

    // Register routes
    server.register(autoload, {
      dir: path.join(__dirname, 'routes'),
      indexPattern: /.*routes(\.ts|\.js|\.cjs|\.mjs)$/,
    });

    // interface Querystring {
    //   breedName: string;
    // }

    await server.listen(3000);
    server.log.info(`I have started the server`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};
start();

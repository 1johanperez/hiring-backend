import { FastifyInstance } from 'fastify';

// TO GET TO THIS ROUTE, I have to hit the url /v1/health/ping

export default async function v1(fastify: FastifyInstance) {
  fastify.get('/ping', async (_req, reply) => {
    reply.send('pong');
  });
}

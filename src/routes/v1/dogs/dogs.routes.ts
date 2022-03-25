import { FastifyInstance } from 'fastify';

export default async function v1(fastify: FastifyInstance) {
  /**
   * Fetches all dogs
   */

  //v1/dogs/
  fastify.get('/', async (_req, reply) => {
    const dogs = await fastify.db.dogs.findAll();
    reply.send(dogs);
  });

  // TODO: Create a route that returns all dog breeds that include the requested query
  // Example:
  // db: ["apple", "banana", "coconut"]
  // query: "co"
  // return: ["coconut"]

  fastify.get('/:id', async (_req, reply) => {
    console.log('This is req', _req.query);
    const dogs = await fastify.db.dogs.findBreed('australian');
    reply.send(dogs);
  });

  // fastify.get<{ Querystring: IQueryString }>(
  //   '/',
  //   async (_req, reply) => {
  //     console.log('I am in the query route');
  //     const { breedName } = _req.query;
  //     const dogs = await fastify.db.dogs.findBreed(breedName);
  //   },
  // );

  // TODO: Create a route that inserts a new dog breed into the list
  // Validation: "Must be at least 5 characters"
  // Validation: "Must not already exist in the database"
  // - not case-sensitive

  // receive via req.headers / body
  // preValidation hook to ensure that it meets our criteria
  // pass it in to our addNewBreed method
  // addNewBreed will add it to our Dogs.json

  fastify.post('/', async (_req, reply) => {
    console.log('THIS IS _req.body', _req.body);
    await fastify.db.dogs.addNewBreed('GROUP', ['english']);
    const dogs = await fastify.db.dogs.findAll();
    console.log('THIS IS DOGS After', dogs);
    reply.send();
  });
}

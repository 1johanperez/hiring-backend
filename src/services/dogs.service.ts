import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';
import _dogs from '../db/dogs.json';
import queryString from 'querystring';
// Small type-cast to make the json friendlier to work with

// TYPESCRIPT CODE = let DogDB be a JSON OBJ
// where keys are always strings and the values are arrays of strings
type DogDB = {
  [breed: string]: string[];
};

const AllDogs = _dogs as DogDB;

// fastify instance that is being exported
// put our fastify get breed method on this instance
declare module 'fastify' {
  interface FastifyInstance {
    db: {
      dogs: {
        findAll: () => Promise<DogDB>;
        findBreed: (name: string) => Promise<DogDB>;
        addNewBreed: (
          breedName: string,
          breedType: string[],
        ) => Promise<DogDB>;
      };
    };
  }
}

async function DogsService(fastify: FastifyInstance) {
  async function findAll() {
    return AllDogs;
  }
  async function findBreed(breedType: string) {
    // would want to apply some type of filtering here
    // loop thru obj
    // @ every key, check if the breedType is in there
    // if so, push that key into an array...

    return AllDogs[breedType];
  }

  async function addNewBreed(newBreed: string, breedType: string[]) {
    // add the key/value pair to the Dogs Json obj
    return (AllDogs[newBreed] = breedType);
  }

  // used to add define a key on fastify instance....
  // then you can "decorate" that key & set it's value
  fastify.decorate('db', {
    dogs: { findAll, findBreed, addNewBreed },
  });
}

export default fp(DogsService);

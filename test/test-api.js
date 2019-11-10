const Ajv = require('ajv');
const fetch = require('node-fetch');
require('should');
const characterSchema = require('./json-schemas/character');
const peopleSchema = require('./json-schemas/people');
const filmSchema = require('./json-schemas/film');
const filmsSchema = require('./json-schemas/films');
const urlBase = 'https://swapi.co/api/';

const ajv = Ajv({
  allErrors: true,
  schemas: [characterSchema, filmSchema]
});

describe('A suite for testing "people" endpoint:\n', async () => {

  const peopleEndPoint = 'people/';

  it('Testing json scheme for all people', async () => {

    // Getting response json
    const response = await fetch(urlBase + peopleEndPoint);
    const responseJson = await response.json();

    // Validating the json schema
    const valid = ajv.validate(peopleSchema, responseJson);
    (valid).should.be.true('RESPONSE is not valid: ' + JSON.stringify(ajv.errors));
  });

  it('Testing json scheme for one character', async () => {

    // Getting response json
    const response = await fetch(urlBase + peopleEndPoint + 1);
    const responseJson = await response.json();

    // Validating the json schema
    const valid = ajv.validate(characterSchema, responseJson);
    (valid).should.be.true('RESPONSE is not valid: ' + JSON.stringify(ajv.errors));
    (responseJson.name).should.be.equal('Luke Skywalker');
  });

  it('404 test case', async () => {

    // Getting response json
    const response = await fetch(urlBase + peopleEndPoint + 100);
    const responseJson = await response.json();

    // Validating response
    (responseJson.detail).should.be.equal('Not found');
  });
});

describe('A suite for testing "films" endpoint :\n', async () => {

  const filmsEndPoint = 'films/';

  it('Testing json scheme for all films', async () => {

    // Getting response json
    const filmsResponse = await fetch(urlBase + filmsEndPoint);
    const filmsResponseJson = await filmsResponse.json();

    // Validating the json schema
    const valid = ajv.validate(filmsSchema, filmsResponseJson);
    (valid).should.be.true('RESPONSE is not valid: ' + JSON.stringify(ajv.errors));
  });

  it('Testing json scheme for one film', async () => {

    // Getting response json
    const filmResponse = await fetch(urlBase + filmsEndPoint + 1);
    const responseJson = await filmResponse.json();

    // Validating the json schema
    const valid = ajv.validate(filmSchema, responseJson);
    (valid).should.be.true('RESPONSE is not valid: ' + JSON.stringify(ajv.errors));
    (responseJson.title).should.be.equal('A New Hope');
  });

  it('Negative test case for films', async () => {

    // Getting response json
    const response = await fetch(urlBase + filmsEndPoint + 10);
    const responseJson = await response.json();

    // Validating response
    (responseJson.detail).should.be.equal('Not found');
  });
});




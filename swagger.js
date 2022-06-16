import swaggerAutogen from 'swagger-autogen';
import { readFile } from 'fs/promises';

const outputFile = JSON.parse(await readFile(new URL("./swagger/swagger_output.json", import.meta.url)));


const endpointsFiles = ['./src/routes/index.js', './src/controller/*.js'];


const doc = {
    info: {
      version: '',      // by default: '1.0.0'
      title: '',        // by default: 'REST API'
      description: '',  // by default: ''
    },
    host: '',      // by default: 'localhost:3000'
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
      {
        name: '',         // Tag name
        description: '',  // Tag description
      },
      // { ... }
    ],
    securityDefinitions: {},  // by default: empty object
    definitions: {},          // by default: empty object (Swagger 2.0)
    components: {}            // by default: empty object (OpenAPI 3.x)
  };

swaggerAutogen()(outputFile, endpointsFiles, doc);
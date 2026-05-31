'use strict';

const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

// En Windows path.join usa backslashes, que swagger-jsdoc no entiende.
// Forzamos forward slashes para que el glob funcione en cualquier OS.
const routerPath = path.join(__dirname, '..', 'router', '*.js').replace(/\\/g, '/');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adoption Project API',
      description: 'API REST para gestión de adopciones de mascotas. Permite administrar usuarios, mascotas y registros de adopción.',
      version: '1.0.0',
      contact: {
        name: 'Adoption Project'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor local de desarrollo'
      }
    ],
    components: {
      schemas: {
        Pet: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e1' },
            name: { type: 'string', example: 'Rex' },
            specie: { type: 'string', example: 'dog' },
            birthDate: { type: 'string', example: '2020-05-15' },
            adopted: { type: 'boolean', example: false },
            owner: { type: 'string', nullable: true, example: null },
            image: { type: 'string', nullable: true, example: null }
          }
        },
        PetInput: {
          type: 'object',
          required: ['name', 'specie'],
          properties: {
            name: { type: 'string', example: 'Rex' },
            specie: { type: 'string', example: 'dog' },
            birthDate: { type: 'string', example: '2020-05-15' }
          }
        },
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e2' },
            first_name: { type: 'string', example: 'Juan' },
            last_name: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' },
            pets: { type: 'array', items: { type: 'string' }, example: [] }
          }
        },
        UserInput: {
          type: 'object',
          required: ['first_name', 'last_name', 'email', 'password'],
          properties: {
            first_name: { type: 'string', example: 'Juan' },
            last_name: { type: 'string', example: 'Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            password: { type: 'string', example: 'secret123' },
            role: { type: 'string', enum: ['user', 'admin'], example: 'user' }
          }
        },
        Adoption: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '64a1b2c3d4e5f6a7b8c9d0e3' },
            owner: { '$ref': '#/components/schemas/User' },
            pet: { '$ref': '#/components/schemas/Pet' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            payload: { type: 'object' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            error: { type: 'string', example: 'Descripción del error' }
          }
        }
      }
    }
  },
  apis: [routerPath]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

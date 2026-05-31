'use strict';
 
const fs = require('fs');
const path = require('path');
 
process.chdir(path.resolve(__dirname, '..'));
 
const swaggerSpec = require('../src/config/swagger.config');
 
const outputPath = path.join(__dirname, '..', 'openapi.json');
 
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
 
console.log(`OpenAPI spec generada en: ${outputPath}`);
console.log(`Endpoints documentados: ${Object.keys(swaggerSpec.paths || {}).length}`);
console.log(`Version: ${swaggerSpec.info.version}`);
 
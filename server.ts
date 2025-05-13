import cors from 'cors';
import http from 'http';
import express, { json, urlencoded } from 'express';
import swaggerUi from 'swagger-ui-express';

import config from './src/config/config';
import routes from './src/api/routes';
import swaggerDocument from './swagger.json';
import { Services } from './src/services/services';

const app = express();
const server = http.createServer(app);

if (!config.validConfig()) {
  console.error('Invalid Config - make sure  DATABASE_TYPE and DATABASE_URL environmental variables are available');
}

// setup express
app.use(cors());
app.use(urlencoded({ limit: '10mb', extended: false }));
app.use(json({ limit: '10mb' }));

// setup express routes
app.use('/api', routes);

// setup documentation
const document = JSON.parse(JSON.stringify(swaggerDocument));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));

// host api
const port = config.port;
server.listen(port, () => console.log(`API listening on localhost:${port}`));

// initialize services 
Services.instance();

console.log('test');

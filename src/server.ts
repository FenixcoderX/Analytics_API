// The entry point for the application. It creates an express server and defines routes for the app.

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import productRoutes from './routes/routes';
import cors from 'cors';

// Create a new express server
const app: express.Application = express();
const address: string = '0.0.0.0:3001'; 

// CORS configuration 
const corsOptions = {
  origin: '*', // Name of the domain - "for all requests" (can be changed in the future)
  optionsSuccessStatus: 200, 
};

// Use CORS middleware
app.use(cors(corsOptions)); 

// Use body parser middleware. Body-parser extracts the entire body portion of an incoming request stream and exposes it on req.body
app.use(bodyParser.json()); 

// Define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('This is API');
});

// Start the Express server
app.listen(3001, () => {
  console.log(`starting app on: ${address}`);
});

// Define routes for the app
productRoutes(app);

export default app;

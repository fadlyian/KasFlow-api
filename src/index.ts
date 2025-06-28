import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! from TypeScript + Express! halloooo');
});

app.use(express.json());
app.use('/api', mainRouter)

// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

// ALL NETWORK
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});

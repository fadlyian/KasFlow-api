import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World! from TypeScript + Express!');
});

app.use(express.json());
app.use('/api', mainRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

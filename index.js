import express from 'express';
import { connectDB } from './db/db.js';
import { router } from './routes/routes.js';
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable set cookie
  }));
app.use('/api', router);


const PORT = 5000;

connectDB()
  .then(() => {
    // Database connection successful, start the server
    app.listen(PORT, () => {
      console.log(`Server connected to port ${PORT}`);
    }).on('error', (err) => {
      console.error(`Error starting the server: ${err.message}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to the database: ${err.message}`);
  });

// 58H7wOLug3sl74Ym password
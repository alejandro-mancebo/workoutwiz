import express from 'express';
import 'dotenv/config';


const app = express();

const PORT = process.env.SERVER_PORT || 5000;

app.listen(PORT, () => {
  console.log('Server is listening on port: ' + PORT);
})
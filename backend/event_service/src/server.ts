import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
}); 
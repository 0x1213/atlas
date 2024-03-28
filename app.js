import express from 'express';
import cors from 'cors';
import { generateProjectID, addToQueue } from './utils.js';
import { createProject } from './db.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post('/process', async (req, res) => {
  const id = generateProjectID();
  //   const dbRes = await createProject(id, req.body.url, req.body.lang, 'pending');
  //   addToQueue(id);
  res.status(201).json({
    // id: dbRes.id,
    // project_id: dbRes.project_id,
    // status: dbRes.status,
    jobId: id,
  });
});

app.get('/status', (req, res) => {
  res.json({ status: 'completed' });
});

app.get('/download', (req, res) => {
  res.json({
    downloads: {
      txt: 'http://localhost:3000/txt',
      csv: 'http://localhost:3000/csv',
      srt: 'http://localhost:3000/srt',
      json: 'http://localhost:3000/json',
      vtt: 'http://localhost:3000/vtt',
      tsv: 'http://localhost:3000/tsv',
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import { exec } from 'child_process';

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/status', (req, res) => {
  res.json({ status: 'API Running' });
});

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const filePath = path.join('uploads', req.file.filename);
  res.json({ message: 'File uploaded successfully', filename: req.file.originalname, filePath });
});

// 🔧 Endpoint faltante para iniciar el deploy
app.post('/deploy', (req, res) => {
  exec('git pull && docker-compose build --no-cache && docker-compose up -d', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ message: 'Deploy failed', error: stderr });
    }
    res.json({ message: 'Deploy successful', output: stdout });
  });
});


app.post('/shutdown', (req, res) => {
  exec('docker-compose down', (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ message: 'Shutdown failed', error: stderr });
    }
    res.json({ message: 'Containers stopped', output: stdout });
  });
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});

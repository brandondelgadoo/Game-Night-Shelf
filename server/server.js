import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gamesRouter from './routes/games.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/games', gamesRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, 'public/404.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Game Night Shelf is running at http://localhost:${PORT}`);
});

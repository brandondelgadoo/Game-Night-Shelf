import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import gameData from '../data/games.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json(gameData);
});

router.get('/:gameId', (req, res) => {
  const game = gameData.find(game => String(game.id) === req.params.gameId);

  if (game) {
    res.status(200).sendFile(path.resolve(__dirname, '../public/game.html'));
  } else {
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
  }
});

export default router;

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import GamesController from '../controllers/games.js';
import { pool } from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get('/', GamesController.getGames);

router.get('/:gameId', async (req, res) => {
  try {
    const results = await pool.query('SELECT * FROM games WHERE id = $1', [req.params.gameId]);

    if (results.rows.length > 0) {
      res.status(200).sendFile(path.resolve(__dirname, '../public/game.html'));
    } else {
      res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
    }
  } catch (error) {
    res.status(404).sendFile(path.resolve(__dirname, '../public/404.html'));
  }
});

export default router;

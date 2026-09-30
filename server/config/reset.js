import { pool } from './database.js';
import './dotenv.js';
import gameData from '../data/games.js';

const createGamesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS games;

    CREATE TABLE IF NOT EXISTS games (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      players VARCHAR(50) NOT NULL,
      playTime VARCHAR(50) NOT NULL,
      price VARCHAR(10) NOT NULL,
      image VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      submittedBy VARCHAR(255) NOT NULL
    )
  `;

  try {
    const res = await pool.query(createTableQuery);
    console.log('🎉 games table created successfully');
  } catch (err) {
    console.error('⚠️ error creating games table', err);
  }
};

const seedGamesTable = async () => {
  await createGamesTable();

  for (const game of gameData) {
    const insertQuery = {
      text: 'INSERT INTO games (name, category, players, playTime, price, image, description, submittedBy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
    };

    const values = [
      game.name,
      game.category,
      game.players,
      game.playTime,
      game.price,
      game.image,
      game.description,
      game.submittedBy
    ];

    try {
      await pool.query(insertQuery, values);
      console.log(`✅ ${game.name} added successfully`);
    } catch (err) {
      console.error('⚠️ error inserting game', err);
    }
  }
};

seedGamesTable();

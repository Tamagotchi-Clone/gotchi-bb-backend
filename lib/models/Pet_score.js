const pool = require('../utils/pool');

module.exports = class Pet_score {
  id;
  userId;
  hunger;
  play;
  cleanliness;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.hunger = row.hunger;
    this.play = row.play;
    this.cleanliness = row.cleanliness;
  }

  static async insert({ userId, hunger, play, cleanliness }) {
    const { rows } = await pool.query(
      'INSERT INTO pet_scores (user_id, hunger, play, cleanliness) VALUES ($1, $2, $3, $4) RETURNING *;',
      [userId, hunger, play, cleanliness]
    );
    return new Pet_score(rows[0]);
  }
};

const pool = require('../utils/pool');

module.exports = class PetScore {
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
    return new PetScore(rows[0]);
  }

  static async getAllScores() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      pet_scores
      `
    );
    return rows.map((row) => new PetScore(row));
  }

  static async getScoreById(id) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      pet_scores
      WHERE
      id=$1
      `,
      [id]
    );
    return new PetScore(rows[0]);
  }

  static async updateByScoreId(id, attributes) {
    const existingScore = await PetScore.getScoreById(id);
    const updatedScore = { ...existingScore, ...attributes };
    const { hunger, play, cleanliness } = updatedScore;
    const { rows } = await pool.query(
      `
      UPDATE
      pet_scores
      SET
      hunger=$1,
      play=$2,
      cleanliness=$3
      WHERE
      id=$4
      RETURNING
      *
      `,
      [hunger, play, cleanliness, id]
    );
    return new PetScore(rows[0]);
  }
};

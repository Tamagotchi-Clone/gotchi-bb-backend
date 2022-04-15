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
    this.user = row.user;
    this.pet = row.pet;
    this.fed = row.fed;
    this.played = row.played;
    this.cleaned = row.cleaned;
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
      SELECT users.username AS user, pet_scores.user_id AS id, COALESCE(user_pets.name, 'NONAME') AS pet, COALESCE(pet_scores.hunger, 0) AS fed, COALESCE(pet_scores.play, 0) AS played, COALESCE(pet_scores.cleanliness, 0) AS cleaned
      FROM users
      LEFT JOIN user_pets
      ON users.id = user_pets.user_id
      LEFT JOIN pet_scores
      ON pet_scores.user_id = user_pets.user_id
      ORDER BY pet_scores.user_id DESC
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

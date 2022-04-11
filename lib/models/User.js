const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
  }

  static async insert({ email }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email) VALUES ($1) RETURNING *',
      [email]
    );
    return new User(rows[0]);
  }

  static async findByUsername(username) {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      users
      WHERE
      username=$1
      `,
      [username]
    );

    if (!rows[0]) return null;
  }

  toJSON() {
    return { ...this };
  }
};

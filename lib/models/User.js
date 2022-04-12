const pool = require('../utils/pool');

module.exports = class User {
  id;
  email;
  username;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.username = row.username;
  }

  static async insert({ email, username }) {
    const { rows } = await pool.query(
      'INSERT INTO users (email, username) VALUES ($1, $2) RETURNING *',
      [email, username]
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

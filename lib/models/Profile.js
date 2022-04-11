const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  username;
  user_id;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
    this.user_id = row.user_id;
  }

  static async insert({ username, user_id }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
            profiles (username, user_id)
            VALUES
            ($1, $2)
            RETURNING
            *;

            `,
      [username, user_id]
    );
    return new Profile(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          profiles
          `
    );
    return rows.map((row) => new Profile(row));
  }
};

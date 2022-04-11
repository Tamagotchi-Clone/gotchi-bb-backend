const pool = require('../utils/pool');

module.exports = class Profile {
  id;
  user_id;
  name;

  constructor(row) {
    this.id = row.id;
    this.user_id = row.user_id;
    this.name = row.name;
  }

  static async insert({ user_id, name }) {
    const { rows } = await pool.query(
      `
            INSERT INTO
            profiles (user_id, name)
            VALUES
            ($1, $2)
            RETURNING
            *;

            `,
      [user_id, name]
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

  static async getProfileById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          profiles
          WHERE
          id=$1
          `,
      [id]
    );
    return new Profile(rows[0]);
  }

  static async updateProfileById(id, attributes) {
    const existingProfile = await Profile.getProfileById(id);
    const updatedProfile = { ...existingProfile, ...attributes };
    const { name } = updatedProfile;
    const { rows } = await pool.query(
      `
          UPDATE
          profiles
          SET
          name=$1
          WHERE
          id=$2
          RETURNING
          *
          `,
      [name, id]
    );
    return new Profile(rows[0]);
  }

  static async deleteProfileByid(id) {
    const { rows } = await pool.query(
      `
          DELETE FROM
          profiles
          WHERE
          id=$1
          RETURNING
          *
          `,
      [id]
    );
    return new Profile(rows[0]);
  }
};

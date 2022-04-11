const pool = require('../utils/pool');

module.exports = class Pet {
  id;
  species;
  image;

  constructor(row) {
    this.id = row.id;
    this.species = row.species;
    this.image = row.image;
  }

  static async getAllPets() {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          pets
          `
    );
    return rows.map((row) => new Pet(row));
  }

  static async getPetsById(id) {
    const { rows } = await pool.query(
      `
          SELECT
          *
          FROM
          pets
          WHERE
          id=$1
          `,
      [id]
    );
    return new Pet(rows[0]);
  }
};

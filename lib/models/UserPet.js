const pool = require('../utils/pool');

module.exports = class UserPet {
  id;
  profile_id;
  pet_id;
  name;
  hunger;
  play;
  cleanliness;

  constructor(row) {
    this.id = row.id;
    this.profile_id = row.profile_id;
    this.pet_id = row.pet_id;
    this.name = row.name;
    this.hunger = row.hunger;
    this.play = row.play;
    this.cleanliness = row.cleanliness;
  }

  static async insert({ profile_id, pet_id, name, hunger, play, cleanliness }) {
    const { rows } = await pool.query(
      ' INSERT INTO userPets (profile_id, pet_id, name, hunger, play, cleanliness) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;',
      [profile_id, pet_id, name, hunger, play, cleanliness]
    );
    return new UserPet(rows[0]);
  }

  static async getAllUserPets() {
    const { rows } = await pool.query('SELECT * FROM userPets');
    return rows.map((row) => new UserPet(row));
  }

  static async getUserPetById(id) {
    const { rows } = await pool.query('SELECT * FROM userPets WHERE id=$1', [
      id,
    ]);
    return new UserPet(rows[0]);
  }
};

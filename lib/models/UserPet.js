const pool = require('../utils/pool');

module.exports = class UserPet {
  id;
  userId;
  petId;
  name;
  hunger;
  play;
  cleanliness;

  constructor(row) {
    this.id = row.id;
    this.userId = row.user_id;
    this.petId = row.pet_id;
    this.name = row.name;
    this.hunger = row.hunger;
    this.play = row.play;
    this.cleanliness = row.cleanliness;
  }

  static async insert({ userId, petId, name }) {
    const { rows } = await pool.query(
      ' INSERT INTO user_pets (user_id, pet_id, name) VALUES ($1, $2, $3) RETURNING *;',
      [userId, petId, name]
    );
    return new UserPet(rows[0]);
  }

  static async getAllUserPets() {
    const { rows } = await pool.query('SELECT * FROM user_pets');
    return rows.map((row) => new UserPet(row));
  }

  static async getUserPetByUser(userId) {
    const { rows } = await pool.query(
      'SELECT * FROM user_pets WHERE user_id=$1',
      [userId]
    );
    return new UserPet(rows[0]);
  }
  static async getUserPetById(id) {
    const { rows } = await pool.query('SELECT * FROM user_pets WHERE id=$1', [
      id,
    ]);
    return new UserPet(rows[0]);
  }

  static async updateUserPetById(id, attributes) {
    const existingPet = await UserPet.getUserPetById(id);
    const updatedPet = { ...existingPet, ...attributes };
    const { name, hunger, play, cleanliness } = updatedPet;
    const { rows } = await pool.query(
      `
          UPDATE
          user_pets
          SET
          name=$1,
          hunger=$2,
          play=$3,
          cleanliness=$4
          WHERE
          id=$5
          RETURNING
          *
          `,
      [name, hunger, play, cleanliness, id]
    );
    return new UserPet(rows[0]);
  }

  static async deleteUserPetById(id) {
    const { rows } = await pool.query(
      'DELETE FROM user_pets WHERE id=$1 RETURNING *',
      [id]
    );
    return new UserPet(rows[0]);
  }
};

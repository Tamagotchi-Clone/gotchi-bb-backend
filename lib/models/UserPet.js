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
    this.image = row.image;
  }

  static async insert({ userId, petId, name }) {
    const { rows } = await pool.query(
      ' INSERT INTO user_pets (user_id, pet_id, name) VALUES ($1, $2, $3) RETURNING *;',
      [userId, petId, name]
    );
    console.log(rows);
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
    const { rows } = await pool.query(
      `
      SELECT 
        user_pets.id, 
        user_pets.user_id, 
        user_pets.pet_id, 
        name, 
        hunger, 
        play, 
        cleanliness,
        pets.image 
      FROM 
        user_pets 
      INNER JOIN 
        pets 
      ON 
        pets.id = user_pets.pet_id 
      WHERE 
        user_pets.id=$1`,
      [id]
    );
    return new UserPet(rows[0]);
  }

  static async updateUserPetById(id, userId, attributes) {
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
          AND
          user_id=$6
          RETURNING
          *
          `,
      [name, hunger, play, cleanliness, id, userId]
    );
    return new UserPet(rows[0]);
  }

  static async deleteUserPetById(id, userId) {
    const { rows } = await pool.query(
      'DELETE FROM user_pets WHERE id=$1 AND user_id=$2 RETURNING *',
      [id, userId]
    );
    return new UserPet(rows[0]);
  }
};

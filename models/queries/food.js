const pool = require('../../database/connection');

const insertFood = (imagePath, userId) => {
  const sql = `
    INSERT INTO foods (image_url, user_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  return pool.query(sql, [imagePath, userId]);
};

module.exports = { insertFood };

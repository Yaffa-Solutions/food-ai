const pool = require('../../database/connection');

const insertFood = (imagePath, userId) => {
  const sql = `
    INSERT INTO foods (image_url, user_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  return pool.query(sql, [imagePath, userId]);
};

const getfood=(userId)=>{
  const sql=`SELECT * FROM foods WHERE user_id = $1`
    return pool.query(sql, [userId]);

}

module.exports = { insertFood ,getfood };

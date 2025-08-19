const pool = require('../../database/connection');

const insertFood = (imagePath, userId) => {
  const sql = `
    INSERT INTO foods (image_url, user_id)
    VALUES ($1, $2)
    RETURNING *
  `;
  return pool.query(sql, [imagePath, userId]);
};
const GET_FOOD=`SELECT * FROM foods WHERE user_id = $1`


const getfood=(userId)=>{
    return pool.query(GET_FOOD, [userId]);

}

module.exports = { insertFood ,getfood };

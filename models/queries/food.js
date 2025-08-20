const pool = require('../../database/connection');

const insertFood = (imagePath, userId, name, description, calories) => {
  const sql = `
    INSERT INTO foods (image_url, user_id,name ,description, calories)
    VALUES ($1,$2,$3,$4,$5)
    RETURNING *
  `;
  return pool.query(sql, [imagePath, userId, name, description, calories]);
};

const getfood = (userId) => {
  const sql = `SELECT * FROM foods WHERE user_id = $1`;
  return pool.query(sql, [userId]);
};

const deleteByFoodId=(id)=>{
  const sql=`DELETE FROM foods WHERE id = $1`
  return pool.query(sql, [id]);

}

module.exports = { insertFood, getfood ,deleteByFoodId};

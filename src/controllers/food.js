const { insertFood } = require('../../models/queries/food');
const { uploadToS3 } = require('../services/s3');
const { getfood,deleteByFoodId } = require('../../models/queries/food');


const addFood = (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No image uploaded' });

  const fileType = file.mimetype.split('/')[1];

  uploadToS3(file.buffer, fileType)
    .then((imageUrl) => insertFood(imageUrl, userId))
    .then((result) =>
      res.json({ message: 'Food image added!', food: result.rows[0] })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
};

const getFoodUser = (req, res) => {
  const userId = req.user.id;
  getfood(userId)
    .then((result) => {
      res.json({ foods: result.rows });
    })
    .catch((err) => {
      console.error('Error fetching user foods:', err);
      res.status(500).json({ message: 'Server error' });
    });
};

const deleteFood=(req,res)=>{
  const {id}=req.params;
  deleteByFoodId(id)
  .then((result)=>{
        res.json({ success: true });
  })
  .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'failed to delete' });
    });

}

module.exports = { addFood, getFoodUser,deleteFood };

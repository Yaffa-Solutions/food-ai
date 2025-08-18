const fs = require('fs');
const path = require('path');
const { insertFood } = require('../../models/queries/food');

const addFood = (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  if (!file) return res.status(400).json({ error: 'No image uploaded' });

  const uploadDir = path.join(__dirname, '../../photos');
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

  const imagePath = path.join(uploadDir, `${Date.now()}-${file.originalname}`);

  fs.promises
    .writeFile(imagePath, file.buffer)
    .then(() => insertFood(imagePath, userId))
    .then((result) =>
      res.json({ message: 'Food image added!', food: result.rows[0] })
    )
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = { addFood };

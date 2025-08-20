const { uploadToS3 } = require('../services/s3');
const Groq = require('groq-sdk');
const { insertFood } = require('../../models/queries/food');

const groq = new Groq({ apiKey: process.env.API_KEY });

const addFoodWithAI = (req, res) => {
  const userId = req.user.id;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No image uploaded' });
  }

  uploadToS3(file.buffer, file.mimetype.split('/')[1])
    .then((imageUrl) => {
      const prompt = `
        This is an image of food at URL: ${imageUrl}. Analyze it and return a good descriptive name and description return the answer in JSON format  and return calories as integer:
        {
          "name": "...",
          "description": "...",
          "calories": "..."
        }
      `;

      return groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 1,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false,
        stop: null,
        response_format: { type: 'json_object' },
      }).then((chatCompletion) => ({ chatCompletion, imageUrl }));
    })
    .then(({ chatCompletion, imageUrl }) => {
      const content = chatCompletion.choices[0].message.content;
      const data = JSON.parse(content);

      return insertFood(
        imageUrl,
        userId,
        data.name,
        data.description,
        data.calories
      );
    })
    .then((result) => {
      res.json({ message: 'Food added with AI data!', food: result.rows[0] });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    });
};

module.exports = { addFoodWithAI };
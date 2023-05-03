const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  const options = {
    method: "POST",
    url: `${process.env.URL}`,
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": `${process.env.OPENAI_API_KEY}`,
      "X-RapidAPI-Host": `${process.env.HOST}`,
    },
    data: {
      conversation: [
        {
          role: "user",
          content: req.body.icerik,
        },
      ],
    },
  };
  try {
    const response = await axios.request(options);
    if (response.data.answer.content) {
      res.status(200).json({ message: response.data.answer.content });
    } else {
      res
        .status(400)
        .json({
          message:
          response.data.message,
        });
    }
  } catch (error) {
    res
        .status(400)
        .json({message:error})
    console.error(error);
  }
});

module.exports = router;

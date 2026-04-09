const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// Your Credly username
const USER = "tim-williams.e51205ae";

app.get("/api/credly-badges", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.credly.com/v1.1/users/${USER}/badges`
    );

    const badges = response.data.data.map(b => ({
      name: b.badge_template.name,
      image: b.badge_template.image_url,
      url: b.url
    }));

    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch badges" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));

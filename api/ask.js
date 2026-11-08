// Runs on Vercel, not in the browser. The key lives in the OPENROUTER_API_KEY
// environment variable you set in the Vercel dashboard, so it never reaches
// the page. Live Server and GitHub Pages cannot run this file.

// Change the model here. The class key only allows this one model; any other
// is refused by the course's OpenRouter guardrail.
const MODEL = 'deepseek/deepseek-v4.1-flash-1017';

module.exports = async (req, res) => {
  // The page sends POST. Anything else is a mistake, so say so and stop.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  // Vercel parses a JSON body for you, so req.body is already an object.
  const { prompt } = req.body || {};
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/responses', {
      method: 'POST',
      headers: {
        // The key is added here, on the server, where nobody can read it.
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ model: MODEL, input: prompt })
    });

    const data = await response.json();
    if (!response.ok) {
      // Pass the model's own complaint through, so the page shows a real reason.
      return res.status(response.status).json(data);
    }

    // Send the reply straight back. The page reads data.output.
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



const transcodeAudio = require('/functions/transcode')
const transcribeAudio = require('/functions/transcribe')

import express = require('express');

const PORT = Number(process.env.PORT) || 8080;
const app = express();

app.get('/', (_req, res) => {
    res.send('🎉 Hello TypeScript! 🎉');
});

app.post('/transcode', (req, res) => {
    transcodeAudio()
});

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});

module.exports = server;


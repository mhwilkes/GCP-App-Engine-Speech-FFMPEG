// Functions
const transcodeAudio = require('/functions/transcode')
const transcribeAudio = require('/functions/transcribe')

const fs = require('fs')
const express = require('express')
const Multer = require('multer')
const bodyParser = require('body-parser')

// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});


const PORT = Number(process.env.PORT) || 8080
const app = express()
app.use(bodyParser.json())

app.get('/', (_req, res) => {
    res.send('🎉 Hello TypeScript! 🎉')
})

app.post('/transcode', multer.single('file'), (req, res) => {
    // We wanna get file path, then use that path to modify
    fs.readSync(req.file)
    transcodeAudio(req.file.path)
    transcribeAudio(req.file).then((response) => {
        const transcript = response[0].results.map(
            result => result.alternatives[0].transcript).join('\n')
        res.send({transcript})
    })
})

const server = app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

module.exports = server;


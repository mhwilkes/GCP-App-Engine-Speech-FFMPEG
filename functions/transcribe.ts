const fs = require('fs')
const {promisify} = require('util')
const Speech = require('@google-cloud/speech')

const ENCODING = 'OPUS_OGG' // was 'LINEAR16'
const SAMPLE_RATE_HERTZ = 48000
const LANGUAGE = 'en-US'

const targetAudioConfig = {
    encoding: ENCODING,
    sampleRateHertz: SAMPLE_RATE_HERTZ,
    languageCode: LANGUAGE,
}

const transcribeAudio = (file, config) => {
    console.log('FILE:', JSON.stringify(file))
    const audio = {
        content: fs.readFileSync(file).toString('base64'),
    }
    console.log(audio.content)
    const request = {
        config,
        audio,
    }
    const speech = new Speech.SpeechClient()

    return speech.recognize(request).then((response) => {
        return response
    }).catch((error) => {
        console.log('SPEECH error:', error)
    })
}
module.exports = transcribeAudio
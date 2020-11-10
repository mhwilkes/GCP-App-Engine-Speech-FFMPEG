import { promisify } from 'util';

import fs = require('fs')
import Speech = require('@google-cloud/speech');

const ENCODING = 'OPUS_OGG'; // was 'LINEAR16'
const SAMPLE_RATE_HERTZ = 48000;
const LANGUAGE = 'en-US';

const targetAudioConfig = {
  encoding: ENCODING,
  sampleRateHertz: SAMPLE_RATE_HERTZ,
  languageCode: LANGUAGE,
};

const transcribeAudio = (audioPath: string) => {
  console.log('FILE:', JSON.stringify(audioPath));
  const audio = {
    content: fs.readFileSync(audioPath).toString('base64'),
  };
  console.log(audio.content);
  const request = {
    targetAudioConfig,
    audio,
  };
  const speech = new Speech.SpeechClient();

  return speech.recognize(request).then((response) => response).catch((error) => {
    console.log('SPEECH error:', error);
  });
};

export default transcribeAudio;

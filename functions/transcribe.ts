import * as Speech from '@google-cloud/speech';

const ENCODING = 'OGG_OPUS'; // was 'LINEAR16'
const SAMPLE_RATE_HERTZ = 48000;
const LANGUAGE = 'en-US';

const targetAudioConfig = {
  encoding: ENCODING,
  sampleRateHertz: SAMPLE_RATE_HERTZ,
  languageCode: LANGUAGE,
};

const transcribeAudioStream = (base64Data : string) => {
  const audio = {
    content: base64Data,
  };
  const request = {
    targetAudioConfig,
    audio,
  };
  const speech = new Speech.SpeechClient();

  return speech.recognize(request).then((response) => response).catch((error) => {
    console.log('SPEECH error:', error);
  });
};

export default transcribeAudioStream;

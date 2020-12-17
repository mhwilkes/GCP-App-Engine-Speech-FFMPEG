import * as Speech from '@google-cloud/speech';
import { google } from '@google-cloud/speech/build/protos/protos';
import * as protos from '@google-cloud/speech/build/protos/protos';
import IRecognizeRequest = google.cloud.speech.v1.IRecognizeRequest;
import IRecognitionConfig = google.cloud.speech.v1.IRecognitionConfig;
import IRecognitionAudio = google.cloud.speech.v1.IRecognitionAudio;

// Settings used for Transcription Configuration
const ENCODING = 'LINEAR16';
const SAMPLE_RATE_HERTZ = 16000;
const LANGUAGE = 'en-US';

// Recognition Config for Speech API
const config: IRecognitionConfig = {
  encoding: ENCODING,
  sampleRateHertz: SAMPLE_RATE_HERTZ,
  languageCode: LANGUAGE,
  audioChannelCount: 1,
};
/**
 * Takes a base64 encoded string containing the transcode voice data from the client,
 * and send to the Speech API to return a Promise containing the transcription.
 *
 * @param base64Data Base64 encoded string containing transcode voice data to spec
 * requested by Speech API
 */
const transcribeAudioStream = (base64Data : string) => {
  // Set RecognitionAudio Object content to base64Data
  const audio: IRecognitionAudio = {
    content: base64Data,
  };
  // Create a RecognizeRequest with config and audio
  const request: IRecognizeRequest = {
    config,
    audio,
  };
  // Setup Speech Client
  const speech = new Speech.SpeechClient();

  // Return Promise from Speech Client
  return speech.recognize(request).then((response) => response).catch((error) => {
    console.log('SPEECH error:', error);
  });
};

export default transcribeAudioStream;

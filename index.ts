import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as multer from 'multer';
import { Readable } from 'stream';

// eslint-disable-next-line import/extensions,import/no-unresolved
import transcodeAudioStream from './functions/transcode';
// eslint-disable-next-line import/extensions,import/no-unresolved
import transcribeAudioStream from './functions/transcribe';

/**
 * Creates a Readable Stream from the Buffer Provided by MemoryStorage through multer
 *
 * @param buffer Buffer containing entire File from MemoryStorage uploaded through multer.
 */
const bufferToReadableStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

// Port can be set through .env variable or to default 8080
const PORT = Number(process.env.PORT) || 8080;

const app = express();

// Using Dependencies bodyparser and cors
app.use(bodyParser.json());
app.use(cors());

// Default endpoint gives empty page
app.get('/', (_req, res) => {
  res.send('🎉 Hello TypeScript! 🎉');
});

/*
 Solution Endpoint for Transcription. Current upload limit is 5 MB but can be modified below Multer
 is used to handle file upload parsing
 */
app.post('/solution', multer({
  // Storage of file is entirely within memory in form of Buffer
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5 MB, you can change as needed.
  },
}).single('file'), (req, res) => {
  // Convert Buffer to Stream
  const inStream = bufferToReadableStream(req.file.buffer);

  // Transcoding Promise Function
  transcodeAudioStream(inStream).then(() => {
    // Function writes results currently to test.wav so we read result into base64 string
    const data = fs.readFileSync('./test.wav').toString('base64');
    // Pass base64 encoded string of transcode voice data for transcription
    transcribeAudioStream(data).then((response) => {
      // Response contains transcription from Google Cloud Speech API
      const transcript = response[0].results.map(
        (result) => result.alternatives[0].transcript,
      ).join('\n');
      // Remove temporary file
      fs.unlinkSync('./test.wav');

      // Send client transcription response
      res.send({ transcript });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Start app at http://localhost:${PORT}`);
});

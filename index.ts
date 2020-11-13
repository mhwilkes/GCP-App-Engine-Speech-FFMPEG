import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as cors from 'cors';
import * as fs from 'fs';
import { Readable, Writable } from 'stream';

import transcodeAudioStream from './functions/transcode';
import transcribeAudioStream from './functions/transcribe';

const bufferToReadableStream = (buffer: Buffer) => {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
};

const writeableStreamToBuffer = (inStream: Writable) => {
  // const outStream = new Readable();
  const data = [];

  inStream._write = (chunk) => {
    data.push(chunk);
  };

  const buffer = Buffer.concat(data);
  console.log(`Buffer ${buffer}`);
  return buffer;
};

const PORT = Number(process.env.PORT) || 8080;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.send('🎉 Hello TypeScript! 🎉');
});

app.post('/solution', multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
}).single('file'), (req, res) => {
  const inStream = bufferToReadableStream(req.file.buffer);

  let base64Data;

  transcodeAudioStream(inStream).then(() => {
    const data = fs.readFileSync('test.ogg').toString('base64');
    console.log(data);
    transcribeAudioStream(data).then((response) => {
      console.log(`BASE64 Starts here ${base64Data}`);
      const transcript = response[0].results.map(
        (result) => result.alternatives[0].transcript,
      ).join('\n');
      fs.unlinkSync('test.ogg');
      res.send({ transcript });
    });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Start app at http://localhost:${PORT}`);
});

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as cors from 'cors';

import transcodeAudio from './functions/transcode';
import transcribeAudio from './functions/transcribe';

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
  // We wanna get file path, then use that path to modify
  transcodeAudio(req.file.path);
  transcribeAudio(req.file.path).then((response) => {
    const transcript = response[0].results.map(
      (result) => result.alternatives[0].transcript,
    ).join('\n');
    res.send({ transcript });
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log(`Start app at http://localhost:${PORT}`);
});

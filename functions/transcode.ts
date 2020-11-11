import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import * as stream from 'stream';

const ffmpegPath = ffmpegInstaller.path;

const transcodeAudioStream = (audioStreamIn: stream.Readable): stream.Writable => {
  const audioStreamOut = new stream.Writable();

  // Transcode
  ffmpeg(audioStreamIn)
    .setFfmpegPath(ffmpegPath)
    .outputOptions(
      '-f', 'ogg', 
      '-ac', '1', 
      '-acodec', 'libopus', 
      '-b:a', '128k', 
      '-ar', '48000'
    )
    .on('start', (cmdLine) => {
      console.log('Started ffmpeg with command:', cmdLine);
    })
    .on('end', () => {
      console.log('Successfully re-encoded audio.');
    })
    .on('error', (err, stdout, stderr) => {
      console.error('An error occurred during encoding', err.message);
      console.error('stdout:', stdout);
      console.error('stderr:', stderr);
    })
    .output(audioStreamOut, { end: true });
  return audioStreamOut;
};
export default transcodeAudioStream;

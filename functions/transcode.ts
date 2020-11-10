import ffmpeg from 'fluent-ffmpeg';

import ffmpegInstaller = require('@ffmpeg-installer/ffmpeg')

const ffmpegPath = ffmpegInstaller.path;

const transcodeAudio = (audioPath: string) => {
  // Transcode
  ffmpeg()
    .setFfmpegPath(ffmpegPath)
    .input(audioPath)
    .audioChannels(1)
    .audioCodec('libopus')
    .audioBitrate(128)
    .audioFrequency(48000)
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
    .output('tmp/tp.ogg', { end: true }); // end: true, emit end event when readable stream ends
};
export default transcodeAudio;

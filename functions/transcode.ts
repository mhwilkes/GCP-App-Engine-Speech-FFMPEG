import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { Readable } from 'stream';

// Retrieve ffmpegPath from ffmpegInstaller
const ffmpegPath = ffmpegInstaller.path;

/**
 * Takes Readable Stream from server and passes to ffmpeg for transcoding. Currently saves audio
 * to a file for use in the transcribing step.
 *
 * @param audioStreamIn Readable Stream containing client Audio
 */
const transcodeAudioStream = async (audioStreamIn: Readable):
    Promise<void> => new Promise((resolve, reject) => {
  /*
  * Transcode using ffmpeg so that Speech API gets audio formatted as it needs regardless of source.
  *
  * Format: wav
  * Audio Channels: 1
  * Audio Codec: Pulse Code Modulated signed 16 bit little endian
  * Bitrate Audio: 128k
  * Audio Sampling Frequency: 16000
  *
  * Currently utilizes events for start, progress, error, and end for console watch
   */
  ffmpeg(audioStreamIn)
    .setFfmpegPath(ffmpegPath)
    .outputOptions(
      '-f', 'wav',
      '-ac', '1',
      '-acodec', 'pcm_s16le',
      '-b:a', '128k',
      '-ar', '16000',
    ).on('start', (cmdLine) => {
      console.log('Started ffmpeg with command:', cmdLine);
    })
    .on('progress', (progress) => {
      console.log(`[ffmpeg] ${JSON.stringify(progress)}`);
    })
    .on('error', (err) => {
      console.log(`[ffmpeg] error: ${err.message}`);
      reject(err);
    })
    .on('end', () => {
      console.log('[ffmpeg] finished');
      resolve();
    })
    .save('test.wav');
});

export default transcodeAudioStream;

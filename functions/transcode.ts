const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const { promisify } = require('util')

ffmpeg.setFfmpegPath(ffmpegPath);

const transcodeAudio = (audio) => {

// Transcode
    ffmpeg()
        .input(audio)
        .outputOptions('-c:v copy') // Change these options to whatever suits your needs
        .outputOptions('-c:a aac')
        .outputOptions('-b:a 160k')
        .outputOptions('-f mp4')
        .outputOptions('-preset fast')
        .outputOptions('-movflags frag_keyframe+empty_moov')
        // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg/issues/346#issuecomment-67299526
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
        .pipe(audio, {end: true}); // end: true, emit end event when readable stream ends
}

module.exports = transcodeAudio

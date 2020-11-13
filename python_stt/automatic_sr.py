import os

import speech_recognition as sr
import ffmpeg

def convert_stt(filename):
    recognizer = sr.Recognizer()

    output_filename = '.'.join(filename.split('.')[:-1]) + '.wav'

    stream = ffmpeg.input(filename)
    stream = ffmpeg.output(stream, output_filename)
    ffmpeg.run(stream)

    print("Successfully converted '{}' to '{}'.".format(filename, output_filename))

    with sr.AudioFile(output_filename) as source:

        audio_text = recognizer.listen(source)

        try:
            print("Converting audio to text")
            transcription = recognizer.recognize_google(audio_text)
            print('Transcription: "{}"'.format(transcription))

            os.remove(filename)
            os.remove(output_filename)

            return transcription

        except:
            print("Error transcribing text.")

    return None


if __name__ == "__main__":

    test = convert_stt("uploads/test.ogg")
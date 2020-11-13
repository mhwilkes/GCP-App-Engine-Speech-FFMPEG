import os

import speech_recognition as sr
import ffmpeg

def convert_stt(input_filename):

    '''
    input_filename: string representing the path to an audio recording file
    '''

    recognizer = sr.Recognizer()

    # target filename specifying the destination audio codec
    output_filename = '.'.join(input_filename.split('.')[:-1]) + '.wav'

    # convert from original to destination codec if applicable
    if input_filename != output_filename:
        stream = ffmpeg.input(input_filename)
        stream = ffmpeg.output(stream, output_filename)
        ffmpeg.run(stream)

        print("Successfully converted '{}' to '{}'.".format(input_filename, output_filename))

    with sr.AudioFile(output_filename) as source:

        audio_text = recognizer.listen(source)

        try:
            print("Converting audio to text")
            transcription = recognizer.recognize_google(audio_text)
            print('Transcription: "{}"'.format(transcription))

            # delete original and converted audio files
            if os.path.exists(input_filename):
                os.remove(input_filename)
            
            if os.path.exists(output_filename):
                os.remove(output_filename)

            return transcription

        except:
            print("Error transcribing text.")

    return None


if __name__ == "__main__":

    test = convert_stt("uploads/test.ogg")
    print(test)
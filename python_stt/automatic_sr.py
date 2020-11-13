import speech_recognition as sr
import ffmpeg

r = sr.Recognizer()
filename = 'test.ogg'

new_filename = 'test.wav'

stream = ffmpeg.input(filename)
stream = ffmpeg.output(stream, new_filename)
ffmpeg.run(stream)

with sr.AudioFile(new_filename) as source:

    audio_text = r.listen(source)

    try:
        text = r.recognize_google(audio_text)
        print("Converting audio transcripts to text...")
        print(text)

    except:
        print("Error. Try a different audio format or file")
# GCP-App-Engine-Speech-FFMPEG

---
## Simple Speech to Text Upload API
This project focuses on providing a simple API to send voice recordings to, and receive back a transcription.
An express server is run using ts-node.
---
# Setup

In order to deploy this project to the Cloud, you will need to consult the Google Cloud command-line tool [here](https://cloud.google.com/sdk/gcloud).
You must download, install, and initialize the command-line tool before being able to deploy it.

As soon as you have this properly setup, you can then run ...
```
yarn deploy
```
...which will deploy this application to the Google App Engine Ecosystem.

Local Deployment requires you to obtain authentication through *creds.json*, and then you can use...
```
yarn creds
```
... to set your credentials.

As long as "@ffmpeg-installer/ffmpeg" works locally for you, then you should be able to start the project locally using ...
```
yarn start
```

---
# Explanation

## Docker

[Dockerfile w/ Documentation](Dockerfile)

Docker is used to create a repeatable deployment process. Check the [Dockerfile](Dockerfile)

## Code

Code is done in TypeScript with strict typing. Currently, there is no scaling and audio files are saved only to a test.wav file.
Scaling would require a different file handling scheme, or 
utilizing [cloud pubsub](https://cloud.google.com/pubsub/docs/overview) to create a worker for each job.

###There are two portions to the transcription process:
* The transcoding portion: 
    * [transcode.ts](/functions/transcode.ts)     
* The transcription portion:
    * [transcribe.ts](/functions/transcribe.ts)



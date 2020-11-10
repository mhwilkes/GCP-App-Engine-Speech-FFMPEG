FROM gcr.io/google_appengine/nodejs

RUN apt-get update && apt-get install -y ffmpeg libav-tools

RUN yarn

CMD yarn start
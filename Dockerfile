FROM gcr.io/google_appengine/nodejs

RUN apt-get update && apt-get install -y ffmpeg

RUN yarn

CMD yarn start
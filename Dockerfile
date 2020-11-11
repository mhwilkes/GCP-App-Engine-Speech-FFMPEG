FROM gcr.io/google_appengine/nodejs

RUN apt-get update && apt-get install -y ffmpeg libav-tools

COPY . /app/

RUN yarn

CMD yarn start
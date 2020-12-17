#--- Docker Setup START ---#

# Use Google's Default nodejs container as a base
FROM gcr.io/google_appengine/nodejs
# Update installations & Install ffmpeg and dep.
RUN apt-get update && apt-get install -y ffmpeg libav-tools

#--- Docker Setup END ---#

#--- App Setup START ---#

# Copy everything into app folder
COPY . /app/
# Run yarn install
RUN yarn
# Start Command Call
CMD yarn start

#--- App Setup END ---#

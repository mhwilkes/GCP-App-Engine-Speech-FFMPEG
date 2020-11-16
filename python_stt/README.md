# Python Speech to Text

## Setup
Requires Python 3 (3.6+ recommended).

Also requires a version of `ffmpeg` to be installed on your machine (and ensure it is in your PATH).

```bash
sudo apt update
sudo apt install ffmpeg
```

Install the required packages with:

```bash
pip install -r requirements.txt

# if you have multiple version of python installed:
pip3 install -r requirements.txt
# or...
python3 -m pip install -r requirements.txt
```
Exact versions used in the current (working) tests are:

* `ffmpeg-python==0.2.0`
* `SpeechRecognition==3.8.1`

## Usage

Import the function from this file, then call it by passing in an audio file of spoken words.

```python
from automatic_sr import convert_stt

output = convert_stt("test.ogg")
```
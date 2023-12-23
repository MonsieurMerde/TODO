FROM python:3.10.6

RUN pip install --upgrade pip

COPY ./ ./

RUN pip install -r requirements.txt

RUN pip install gunicorn
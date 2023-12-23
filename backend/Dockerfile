FROM python:3.10.6

RUN pip install --upgrade pip

COPY ./ ./

RUN pip install -r requirements.txt
RUN chmod +x ./config/wait_for_postgres.sh

RUN pip install gunicorn
FROM debian

RUN apt-get -y install python3 python3-pip

RUN pip3 install sanic markdown

WORKDIR /app/
COPY a ./a
COPY markdown_files ./markdown_files
COPY static ./static
COPY httpd.py ./

EXPOSE 8000

CMD python3 httpd.py

FROM debian

RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && apt-get update

RUN apt-get -y install python3 python3-pip

RUN python3 -m pip install pip -U
RUN pip3 config set global.index-url https://mirrors.ustc.edu.cn/pypi/web/simple

RUN pip3 install sanic markdown

WORKDIR /app/
COPY a ./a
COPY markdown_files ./markdown_files
COPY static ./static
COPY httpd.py ./

EXPOSE 8000

CMD python3 httpd.py

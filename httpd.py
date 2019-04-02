import time
import sanic
import markdown
import os

from a.a_api import app as bp

app = sanic.Sanic()

app.blueprint(bp)


app.static('/s', './static')


@app.route('/', methods=['GET'])
async def get_info(request):
    return sanic.response.redirect('/s/index.html')

@app.route('/api', methods=['GET'])
async def get_info(request):
    return sanic.response.json({ 'version': '0.1' })

@app.route('/api/md', methods=['GET'])
async def get_x(request):
    files = os.listdir('markdown_files')
    return sanic.response.json(files)

@app.route('/api/md/<name>', methods=['GET'])
async def get_x(request, name):
    print(name)
    text = open('./markdown_files/' + name, 'r', encoding='utf8').read()
    html = markdown.markdown(text)
    return sanic.response.text(html)

app.run(host='0.0.0.0', port=8000)

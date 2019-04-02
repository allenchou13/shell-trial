import sanic,time


a_list = []


app = sanic.Blueprint(__name__, url_prefix="/api/a")


@app.route('/', methods=['POST'])
async def add_a(request):
    a_list.append('a-' + time.asctime())
    return sanic.response.text('')

@app.route('/', methods=['GET'])
async def get_a(request):
    return sanic.response.json(a_list)
    
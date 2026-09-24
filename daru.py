import os.path, sys
from sanic import Blueprint, response
from static import template, load_template
blu = Blueprint('daru_' + __name__)

@blu.get("/")
async def page(r, ): return await response.file(f"{os.path.dirname(__file__)}/templates{'' if '-d' in sys.argv else '/serv'}/Daru.html")
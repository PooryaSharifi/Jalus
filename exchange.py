from sanic import Blueprint, response
from static import template, load_template
blu = Blueprint('exchange_' + __name__)

@blu.get("/")
async def laziz_page(r, ): return response.html(await load_template(f'Exchange.html'))
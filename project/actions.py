from flask import request, redirect, url_for
from . import app
from project.db import db, User
import jinja2
import os

template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(template_dir), autoescape=True)


def render(template, **params):
   t = jinja_env.get_template(template)
   return t.render(params)


@app.route('/')
def hello_world():
    return render('index.html')


@app.route('/update_score', methods=['POST'])
def update_score():
    nick = eval(request.data)['nickname']
    k = 1
    person = User.query.filter_by(nickname=nick).first()
    if person:
        person.update_score(k)
    else:
        person = User(nick)
        person.update_score(k)
    db.session.add(person)
    db.session.commit()
    return 'Ok'


if __name__ == '__main__':
    app.run(debug=True)

from flask import request, jsonify, redirect, url_for
from . import app
from project.db import db, User, Question
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


@app.route('/get_leaderboard', methods=['GET'])
def get_leaderboard():
    req = User.query.all()
    res = []
    for user in req:
        res.append(tuple([user.nickname, user.score]))
    return dict(res)


@app.route('/update_score', methods=['POST'])
def update_score():
    nick = eval(request.data)['nickname']
    ite = eval(request.data)['iter']
    k = 10
    person = User.query.get(nick)
    if ite % 10 == 0:
        if person:
            person.update_score(k)
        else:
            person = User(nick)
            person.update_score(k)
    db.session.add(person)
    db.session.commit()
    return 'OK'


@app.route('/check_answer', methods=['POST'])
def check_answer():
    nickname = eval(request.data)['nickname']
    question_text = eval(request.data)['question']
    answer = eval(request.data)['answer']
    question = Question.query.get(question_text)
    user = User.query.get(nickname)
    if question and user and (question not in user.questions):
        if question.answer == answer:
            user.questions.append(question)
            user.update_score(question.score)
            db.session.add(user)
            db.session.commit()
            return 'OK'
        else:
            return 'ERROR'
    else:
        return 'ANSWERED'


@app.route('/questions', methods=['GET'])
def questions():
    nickname = request.args.get('nickname')
    user = User.query.get(nickname)
    qs = Question.query.all()
    d = dict()
    for q in qs:
        if user and (q in user.questions):
            d[q.text] = True
        else:
            d[q.text] = False
    return d

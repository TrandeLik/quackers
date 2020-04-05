from flask_sqlalchemy import SQLAlchemy
from . import app


db = SQLAlchemy(app)

questions = db.Table('questions',
    db.Column('question_id', db.String(80), db.ForeignKey('question.text'), primary_key=True),
    db.Column('user_id', db.String(1000), db.ForeignKey('user.nickname'), primary_key=True)
)


class User(db.Model):
    nickname = db.Column(db.String(80), primary_key=True)
    score = db.Column(db.Integer, nullable=False)
    questions = db.relationship('Question', secondary=questions, lazy='subquery',
        backref=db.backref('users', lazy=True))

    def __init__(self, nickname):
        self.nickname = nickname
        self.score = 0

    def __repr__(self):
        return str((self.nickname, self.score))

    def update_score(self, delta):
        self.score += delta


class Question(db.Model):
    text = db.Column(db.String(1000), primary_key=True)
    answer = db.Column(db.String(20), nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __init__(self, text, answer, score):
        self.text = text
        self.answer = answer
        self.score = score

    def __repr__(self):
        return str((self.text, self.answer, self.score))

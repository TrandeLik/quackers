from flask_sqlalchemy import SQLAlchemy
from . import app


db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), unique=True, nullable=False)
    score = db.Column(db.Integer, nullable=False)

    def __init__(self, nickname):
        self.nickname = nickname
        self.score = 0

    def __repr__(self):
        return str((self.nickname, self.score))

    def update_score(self, delta):
        self.score += delta

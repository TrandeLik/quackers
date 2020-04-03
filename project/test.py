from project.db import User
print(User.query.all())


def leaders():
    return User.query.order_by(User.score.desc()).all()


print(leaders())

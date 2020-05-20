from project.db import db, User, Question
question = Question(text='Кря?', answer='Quack', score=1000000)
db.session.add(question)
db.session.commit()
print(Question.query.all())

from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import TextAreaField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
  content = TextAreaField('content', validators=[DataRequired()])
  task_id = IntegerField('task_id', validators=[DataRequired()])

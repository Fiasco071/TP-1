from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from app.models import Task

class CreateTaskForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  due_date = DateTimeField('due_date', format='%Y-%m-%d')
  content = StringField('content')
  creator_id = IntegerField('creator_id', validators=[])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  project_id = IntegerField('project_id')

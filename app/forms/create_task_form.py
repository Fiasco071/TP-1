from wsgiref.validate import validator
from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from app.models import Task

class CreateTaskForm(FlaskForm):
  title = StringField('title', validators=[DataRequired()])
  due_date = DateTimeField('due_date')
  content = StringField('content')
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  user_id = IntegerField('user_id', validators=[DataRequired()])
  project_id = IntegerField('project_id')
  created_at = DateTimeField('created_at', validators=[DataRequired()])
  updated_at = DateTimeField('updated_at', validators=[DataRequired()])

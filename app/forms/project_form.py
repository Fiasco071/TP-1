from flask_wtf import FlaskForm
from wtforms import StringField, DateTimeField
from wtforms.validators import DataRequired

class ProjectForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    content = StringField('content')
    due_date = DateTimeField('due_date', format='%Y-%m-%d')

from sqlite3 import Date
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Task, db
from app.forms import CreateTaskForm

task_routes = Blueprint('tasks', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@task_routes.route('/')
@login_required
def tasks():
  """
  Pulls Tasks from DB
  """
  tasks = Task.query.\
    filter_by(creator_id=current_user.id).\
    filter_by(active=True)
  return {'tasks': [task.to_dict() for task in tasks]}

@task_routes.route('/new', methods=['POST'])
@login_required
def add_task():
  """
  Pulls task data from frontend and saves it to DB
  """
  form = CreateTaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    task = Task(
      title=form.data['title'],
      due_date=form.data['due_date'],
      content=form.data['content'],
      creator_id=form.data['creator_id'],
      user_id=form.data['user_id'],
      project_id=form.data['project_id']
    )
    db.session.add(task)
    db.session.commit()
        # login_user(user)
    return task.to_dict()
  return form.errors

@task_routes.route('/archive/<int:id>', methods=['PUT'])
# @login_required
def archive_task(id):
  """
  Archives a task and marks it INACTIVE
  """
  print('*/*/*/*/*/*/*/*/*/*/*/*-----------', id)
  task = Task.query.get(int(id))
  task.active = False
  db.session.add(task)
  db.session.commit()
  return task.to_dict()
  
@task_routes.route('/unarchive/<int:id>', methods=['PUT'])
# @login_required
def unarchive_task(id):
  """
  Unarchives a task and marks it ACTIVE
  """
  task = Task.query.get(int(id))
  task.active = True
  db.session.add(task)
  db.session.commit()
  return task.to_dict()  
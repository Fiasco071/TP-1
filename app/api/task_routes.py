from sqlite3 import Date
from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.forms.comment_form import CommentForm
from app.models import Task, Comment, db
from app.forms import CreateTaskForm
from app.models.track_task import TrackedTask

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

@task_routes.route('/<int:id>')
@login_required
def singleTask(id):
  """
  Pulls single task from DB
  """
  task = Task.query.get(id)
  return task.to_dict()


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
      project_id=form.data['project_id']
    )
    db.session.add(task)
    db.session.commit()
        # login_user(user)
    return task.to_dict()
  return form.errors

@task_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_task(id):
  """
  Pull Data from frontend and Update an existing entry
  """
  form = CreateTaskForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    
    task = Task.query.get(id)
    task.title=form.data['title'],
    task.due_date=form.data['due_date'],
    task.content=form.data['content'],
    task.creator_id=form.data['creator_id'],
    task.project_id=form.data['project_id']
    db.session.add(task)
    db.session.commit()
        # login_user(user)
    return task.to_dict()
  return form.errors


@task_routes.route('/archive/<int:id>', methods=['PUT'])
@login_required
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
@login_required
def unarchive_task(id):
  """
  Unarchives a task and marks it ACTIVE
  """
  task = Task.query.get(int(id))
  task.active = True
  db.session.add(task)
  db.session.commit()
  return task.to_dict()  


######################### comments

@task_routes.route('/<int:id>/comments')
@login_required
def comments_for_task(id):
  """
  Pulls Tasks from DB
  """
  comments = Comment.query.filter_by(task_id=id)
  return {'comments': [comment.to_dict() for comment in comments]}

@task_routes.route('/<int:id>/comments/new', methods=['POST'])
@login_required
def add_comment(id):
  """
  Pulls task data from frontend and saves it to DB
  """
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment(
      task_id=id,
      content=form.data['content'],
      user_id=current_user.id,
    )
    db.session.add(comment)
    db.session.commit()
        # login_user(user)
    return comment.to_dict()
  return form.errors

@task_routes.route('/comments/<int:id>', methods=['POST'])
@login_required
def update_comment(id):
  """
  Pulls task data from frontend and update it on DB
  """
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    comment = Comment.query.get(id)
    comment.content=form.data['content']
    db.session.add(comment)
    db.session.commit()
        # login_user(user)
    return comment.to_dict()
  return form.errors



# Tracking task routes here

@task_routes.route('/track')
@login_required
def tracked_tasks():
  """
  Pulls tracked tasks data from db
  """
  tracks = TrackedTask.query.filter_by(user_id=current_user.id)
  return {'tracks': [track.to_dict() for track in tracks]}

@task_routes.route('/track/<int:id>', methods=['POST'])
# @login_required
def track_a_task(id):
  """
  create a tracked task log in TrackedTask table
  """
  print('-=-=-=-=-=-=-=-=-=-=-=-=-===-=-', id)
  print('-=-=-=-=-=-=-=-=-=-=-=-=-===-=-', current_user.id)
  track = TrackedTask(
    task_id=id,
    user_id=current_user.id
  )
  db.session.add(track)
  db.session.commit()
  return track.to_dict()

@task_routes.route('/untrack/<int:id>', methods=['DELETE'])
# @login_required
def untrack_a_task(id):
  """
  delete a tracked task log in TrackedTask table
  """
  tracks = TrackedTask.query.\
    filter_by(task_id=id).\
    filter_by(user_id=current_user.id).all()
  
  for track in tracks:
    db.session.delete(track)
  db.session.commit()
  return { 'tracks' : [track.to_dict() for track in tracks] }


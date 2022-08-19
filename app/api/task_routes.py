from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Task

task_routes = Blueprint('tasks', __name__)

@task_routes.route('/')
def tasks():
  tasks = Task.query.all()
  return {'tasks': [task.to_dict() for task in tasks]}

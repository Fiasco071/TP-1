from crypt import methods
from app.models import db, Project
from flask import Blueprint, request
from flask_login import current_user
from app.forms.project_form import ProjectForm
project_routes = Blueprint('projects', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

"""
fetch('/api/projects/', {
  method: 'GET',
     headers: {
       "Content-Type": "application/json",
       "XSRF-TOKEN": `ImIyYTU3NWM2M2M3NmQ5ZjFjOGNlM2I5MzU1ZWVkNjg3OGFjNTllNmIi.YxD9Yw.Fh5QMQEtzkK6Hk1q7_KxhIki7O0`
     },
   }).then(res => res.json()).then(data => console.log(data));
"""

@project_routes.route("/")
def get_projects():
    projects = Project.query.filter(Project.user_id == current_user.id).all()
    project_list = [project.to_dict() for project in projects]
    return {'projects': project_list}

"""
fetch('/api/projects/new', {
  method: 'POST',
     headers: {
       "Content-Type": "application/json",
       "XSRF-TOKEN": `ImIyYTU3NWM2M2M3NmQ5ZjFjOGNlM2I5MzU1ZWVkNjg3OGFjNTllNmIi.YxD9Yw.Fh5QMQEtzkK6Hk1q7_KxhIki7O0`
     },
     body: JSON.stringify({title: "hello", content: "hello", due_date: "2022-09-01"})
   }).then(res => res.json()).then(data => console.log(data));
"""

@project_routes.route("/new", methods=["POST"])
def create_project():
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_project = Project(
            title = form.title.data,
            content = form.content.data,
            due_date = form.due_date.data,
            user_id = current_user.id
        )
        db.session.add(new_project)
        db.session.commit()
        return new_project.to_dict()
    else:
        print({'errors': validation_errors_to_error_messages(form.errors)}, "<<<<<<<<<<<<<<<<<<<<<<<<backend")
        return form.errors

@project_routes.route('/<int:id>/update', methods=["PUT"])
def update_project(id):
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    project = Project.query.get(id)

    if form.validate_on_submit():
        project.title = form.title.data
        project.content = form.content.data
        project.due_date = form.due_date.data

        db.session.commit()
        return project.to_dict()
    return form.errors


@project_routes.route('/<int:id>/complete', methods=["PUT"])
def complete_project(id):
    project = Project.query.get(int(id))
    project.complete = True
    db.session.add(project)
    db.session.commit()
    return project.to_dict()


@project_routes.route('/<int:id>/archive', methods=["PUT"])
def archive_project(id):
    project = Project.query.get(int(id))
    project.active = False
    db.session.add(project)
    db.session.commit()
    return project.to_dict()


@project_routes.route('/<int:id>/unarchive', methods=['PUT'])
def unarchive_project(id):
    project = Project.query.get(int(id))
    project.active = True
    db.session.add(project)
    db.session.commit()
    return project.to_dict()

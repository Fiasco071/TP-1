from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    clearance = db.Column(db.Integer, nullable=False)

    task = db.relationship('Task', back_populates='task_owner')
    projects = db.relationship('Project', back_populates="user")
    message = db.relationship('Message', back_populates='msg_owner')
    thread = db.relationship('Thread', back_populates='user')
    employee_assignment = db.relationship('EmployeeAssignment', back_populates='user')
    comments = db.relationship('Comment', back_populates='comment_owner')
    tracked = db.relationship('TrackedTask', back_populates='tt_owner')
    # direct_message = db.relationship('DirectMessage', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'clearance': self.clearance,
            'projects' : [proj.to_dict() for proj in self.projects]
        }

    def to_dict_username(self):
        return {
            'username': self.username
        }

    def all_users(self):
        pass

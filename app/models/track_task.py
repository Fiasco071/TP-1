from .db import db
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

class TrackedTask(db.Model):
    __tablename__= 'tracked_tasks'
    
    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, ForeignKey('tasks.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    
    task = db.relationship('Task', back_populates='tracked')
    tt_owner = db.relationship('User', back_populates='tracked')
    
    def to_dict(self):
        return {
            'id' : self.id,
            'task_id' : self.task_id,
            'task_detail' : self.task.to_dict()
        }
        
    def to_dict_task(self):
        return {
            'is_tracked' : True
        }
    
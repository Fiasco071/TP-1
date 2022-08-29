from .db import db
from sqlalchemy import ForeignKey
from sqlalchemy.sql import func

class Comment(db.Model):
    __tablename__= 'comments'
    
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(250), nullable=False)
    task_id = db.Column(db.Integer, ForeignKey('tasks.id'), nullable=False)
    user_id = db.Column(db.Integer, ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
    
    comment_owner = db.relationship('User', back_populates='comments')
    
    def to_dict_no_recipe(self):
        return {
            'id' : self.id,
            'content' : self.content,
            'task_id' : self.task_id,
            'user_id' :self.user_id,
            'created_at' : self.created_at,
            'comment_owner' : self.comment_owner.to_dict_username()
        }
    
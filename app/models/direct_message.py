from .db import db
from sqlalchemy.sql import func

class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(1000), nullable=True)
  sender = db.Column(db.Integer, nullable=False) # db.ForeignKey("users.id"),
  receiver = db.Column(db.Integer, nullable=False) # db.ForeignKey("users.id"),
  # read_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  # user = db.relationship("User", back_populates="direct_message")

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content,
      'sender': self.sender,
      'receiver': self.receiver,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      # 'users' : [usr.to_dict() for usr in self.users]
    }

  #def __repr__(self):
    # return r'<Update "%s" at %s>' % (self.content, self.timestamp)

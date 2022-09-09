from .db import db
from sqlalchemy.sql import func

class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(1000), nullable=True)
  room_id = db.Column(db.Integer, db.ForeignKey("rooms.id"), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  # read_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  room = db.relationship("Room", back_populates="direct_messages")
  user = db.relationship("User", back_populates="direct_messages")

  def to_dict(self):
    return {
      'id': self.id,
      'content': self.content,
      'room_id': self.room_id,
      'user_id': self.user_id,
      'created_at': self.created_at,
      'updated_at': self.updated_at
    }

  #def __repr__(self):
    # return r'<Update "%s" at %s>' % (self.content, self.timestamp)

from .db import db
from sqlalchemy.sql import func

class Room(db.Model):
  __tablename__ = 'rooms'

  id = db.Column(db.Integer, primary_key=True)
  user_1 = db.Column(db.Integer, nullable=True)
  user_2 = db.Column(db.Integer, nullable=True)
  user_3 = db.Column(db.Integer, nullable=True)
  user_4 = db.Column(db.Integer, nullable=True)
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

  direct_messages = db.relationship("DirectMessage", back_populates="room")

  def to_dict(self):
    return {
      'id': self.id,
      'user_1': self.user_1,
      'user_2': self.user_2,
      'user_3': self.user_3,
      'user_4': self.user_4,
      'created_at': self.created_at,
      'updated_at': self.updated_at,
      'direct_messages': [dm.to_dict() for dm in self.direct_messages]
    }


# room_users -> room_id 1, user 1, 

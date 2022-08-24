from asyncio import SendfileNotAvailableError
from .db import db
from sqlalchemy.sql import func

class DirectMessage(db.Model):
  __tablename__ = 'direct_messages'

  id = db.Column(db.Integer, primary_key=True)
  content = db.Column(db.String(1000), nullable=True)
  sender = db.Column(db.Integer, nullable=False)
  receiver = db.Column(db.Integer, nullable=False)
  # read_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  created_at = db.Column(db.DateTime(timezone=True), server_default=func.now())
  updated_at = db.Column(db.DateTime(timezone=True), server_default=func.now())

"""create message table

Revision ID: 54aae805a594
Revises: 52d3b44a8a32
Create Date: 2022-08-24 13:00:27.467735

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54aae805a594'
down_revision = '52d3b44a8a32'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('messages',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('content', sa.String(length=2000), nullable=True),
    sa.Column('thread_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('project_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('messages')
    # ### end Alembic commands ###

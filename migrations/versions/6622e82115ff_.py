"""empty message

Revision ID: 6622e82115ff
Revises: c6029ba74291
Create Date: 2022-08-26 15:55:32.179538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6622e82115ff'
down_revision = 'c6029ba74291'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('active', sa.Boolean(), nullable=False))
    op.drop_column('tasks', 'user_id')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('tasks', 'active')
    # ### end Alembic commands ###

from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        username='Demo', email='demo@aa.io', password='password', clearance=1
        )
    user_2 = User(
        username='Fiasco', email='steve@choi.com', password='password', clearance=1
        )

    for user in [user_1, user_2]:
        db.session.add(user)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()

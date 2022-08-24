from flask.cli import AppGroup
from .users import seed_users, undo_users
from .tasks import seed_tasks, undo_tasks
from .messages import seed_messages, undo_messages
from .projects import seed_projects, undo_projects
from .threads import seed_threads, undo_threads
from .direct_messages import seed_direct_messages, undo_direct_messages
from .employee_assignments import seed_employee_assignments, undo_employee_assignments


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # Add other seed functions here
    seed_users()
    seed_tasks()
    seed_messages()
    seed_projects()
    seed_threads()
    seed_direct_messages()
    seed_employee_assignments()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    # Add other undo functions here
    undo_users()
    undo_tasks()
    undo_messages()
    undo_projects()
    undo_threads()
    undo_direct_messages()
    undo_employee_assignments()

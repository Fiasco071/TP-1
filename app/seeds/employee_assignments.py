from app.models import db, EmployeeAssignment


def seed_employee_assignments():
    employee_assignment_1 = EmployeeAssignment(
        user_id=1, task_id=1, project_id=1
    )

    for employee_assignment in [employee_assignment_1]:
        db.session.add(employee_assignment)
    db.session.commit()



def undo_employee_assignments():
  db.session.execute('TRUNCATE employee_assignments RESTART IDENTITY CASCADE;')
  db.session.commit()

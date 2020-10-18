from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
import datetime
from flask_cors import CORS, cross_origin

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)
# Preventing the XMLHTTPRequest from being blocked by CORS policy
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# my classes 
class Project(db.Model):
  __tablename__ = 'project'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.now()

class Risk(db.Model):
  __tablename__ = 'risk'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "risks")

   # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "risk")

  def __init__(self, name, description, project_id, nestedAction_id):
    self.name = name
    self.description = description
    self.status = 0
    self.project_id = project_id
    self.nestedAction_id = nestedAction_id
    self.createdTimestamp = datetime.datetime.now()

class Issue(db.Model):
  __tablename__ = 'issue'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "issues")

   # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "issue")

  def __init__(self, name, description, project_id, nestedAction_id):
    self.name = name
    self.description = description
    self.status = 0
    self.project_id = project_id
    self.nestedAction_id = nestedAction_id
    self.createdTimestamp = datetime.datetime.now()

class Action(db.Model):
  __tablename__ = 'action'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "actions")

  # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "action")

  def __init__(self, name, description, project_id, nestedAction_id):
    self.name = name
    self.description = description
    self.status = 0
    self.project_id = project_id
    self.nestedAction_id = nestedAction_id
    self.createdTimestamp = datetime.datetime.now()

class NestedAction(db.Model):
  __tablename__ = 'nestedAction'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  parent_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'))
  parent = db.relationship("NestedAction", remote_side=[id])

  def __init__(self, name, description, parent_id = db.null()):
    self.name = name
    self.description = description
    self.status = 0
    self.parent_id = parent_id
    self.createdTimestamp = datetime.datetime.now()


# my Schemas
class ProjectSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Project
    include_fk = True
class RiskSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Risk
    include_fk = True
class IssueSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Issue
    include_fk = True
class ActionSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = Action
    include_fk = True
class NestedActionSchema(ma.SQLAlchemyAutoSchema):
  class Meta:
    model = NestedAction
    include_fk = True

# Init schema
project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)
risk_schema = RiskSchema()
risks_schema = RiskSchema(many=True)
issue_schema = IssueSchema()
issues_schema = IssueSchema(many=True)
action_schema = ActionSchema()
actions_schema = ActionSchema(many=True)
nestedAction_schema = NestedActionSchema()
nestedActions_schema = NestedActionSchema(many=True)

# Begin CRUD Operations

# Create a Project
@app.route('/project', methods=['POST'])
def add_project():
  name = request.json['name']
  description = request.json['description']

  new_project = Project(name, description)

  db.session.add(new_project)
  db.session.commit()

  return project_schema.jsonify(new_project)

# Get All Projects
@app.route('/projects', methods=['GET'])
def get_projects():
  all_projects = Project.query.all()
  result = projects_schema.dump(all_projects)
  return jsonify(result)

# Get Single Project
@app.route('/project', methods=['GET'])
def get_project():
  id = request.args.get('id')

  project = Project.query.get(id)
  return project_schema.jsonify(project)

# Update a Project
@app.route('/project', methods=['PUT'])
def update_project():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  status = request.json['status']
  
  project = Project.query.get(id)

  project.name = name
  project.description = description
  project.status = status

  db.session.commit()

  return project_schema.jsonify(project)

# Delete Project
@app.route('/project', methods=['DELETE'])
def delete_project():
  id = request.args.get('id')

  project = Project.query.get(id)
  db.session.delete(project)
  db.session.commit()

  return project_schema.jsonify(project)

# Create a Risk
@app.route('/risk', methods=['POST'])
def add_risk():
  name = request.json['name']
  description = request.json['description']
  project_id = request.json['project_id']

  # create nestedAction to allow starting of nestedActions
  new_nestedAction = NestedAction(name, description)
  db.session.add(new_nestedAction)
  db.session.commit()

  nestedAction_id = new_nestedAction.id

  new_risk = Risk(name, description, project_id, nestedAction_id)

  db.session.add(new_risk)
  db.session.commit()

  return risk_schema.jsonify(new_risk)

# Get All Risks
@app.route('/risks', methods=['GET'])
def get_risks():
  all_risks = Risk.query.all()
  result = risks_schema.dump(all_risks)
  return jsonify(result)

# Get Single Risk
@app.route('/risk', methods=['GET'])
def get_risk():
  id = request.args.get('id')

  risk = Risk.query.get(id)
  return risk_schema.jsonify(risk)

# Update a Risk
@app.route('/risk', methods=['PUT'])
def update_risk():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  status = request.json['status']
  
  risk = Risk.query.get(id)

  risk.name = name
  risk.description = description
  risk.status = status

  db.session.commit()

  return risk_schema.jsonify(risk)

# Delete Risk
@app.route('/risk', methods=['DELETE'])
def delete_risk():
  id = request.args.get('id')

  risk = Risk.query.get(id)
  db.session.delete(risk)
  db.session.commit()

  return risk_schema.jsonify(risk)

# Create a Issue
@app.route('/issue', methods=['POST'])
def add_issue():
  name = request.json['name']
  description = request.json['description']
  project_id = request.json['project_id']

  # create nestedAction to allow starting of nestedActions
  new_nestedAction = NestedAction(name, description)
  db.session.add(new_nestedAction)
  db.session.commit()

  nestedAction_id = new_nestedAction.id

  new_issue = Issue(name, description, project_id, nestedAction_id)

  db.session.add(new_issue)
  db.session.commit()

  return issue_schema.jsonify(new_issue)

# Get All Issues
@app.route('/issues', methods=['GET'])
def get_issues():
  all_issues = Issue.query.all()
  result = issues_schema.dump(all_issues)
  return jsonify(result)

# Get Single Issue
@app.route('/issue', methods=['GET'])
def get_issue():
  id = request.args.get('id')

  issue = Issue.query.get(id)
  return issue_schema.jsonify(issue)

# Update a Issue
@app.route('/issue', methods=['PUT'])
def update_issue():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  status = request.json['status']
  
  issue = Issue.query.get(id)

  issue.name = name
  issue.description = description
  issue.status = status

  db.session.commit()

  return issue_schema.jsonify(issue)

# Delete Issue
@app.route('/issue', methods=['DELETE'])
def delete_issue():
  id = request.args.get('id')

  issue = Issue.query.get(id)
  db.session.delete(issue)
  db.session.commit()

  return issue_schema.jsonify(issue)

# Create a Action
@app.route('/action', methods=['POST'])
def add_action():
  name = request.json['name']
  description = request.json['description']
  project_id = request.json['project_id']

  # create nestedAction to allow starting of nestedActions
  new_nestedAction = NestedAction(name, description)
  db.session.add(new_nestedAction)
  db.session.commit()

  nestedAction_id = new_nestedAction.id

  new_action = Action(name, description, project_id, nestedAction_id)

  db.session.add(new_action)
  db.session.commit()

  return action_schema.jsonify(new_action)

# Get All Actions
@app.route('/actions', methods=['GET'])
def get_actions():
  all_actions = Action.query.all()
  result = actions_schema.dump(all_actions)
  return jsonify(result)

# Get Single Action
@app.route('/action', methods=['GET'])
def get_action():
  id = request.args.get('id')

  action = Action.query.get(id)
  return action_schema.jsonify(action)

# Update a Action
@app.route('/action', methods=['PUT'])
def update_action():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  status = request.json['status']
  
  action = Action.query.get(id)

  action.name = name
  action.description = description
  action.status = status

  db.session.commit()

  return action_schema.jsonify(action)

# Delete Action
@app.route('/action', methods=['DELETE'])
def delete_action():
  id = request.args.get('id')

  action = Action.query.get(id)
  db.session.delete(action)
  db.session.commit()

  return action_schema.jsonify(action)

# Create a NestedAction
@app.route('/nestedAction', methods=['POST'])
def add_nestedAction():
  name = request.json['name']
  description = request.json['description']

  if ('parent_id' in request.json):
    parent_id = request.json['parent_id']
    new_nestedAction = NestedAction(name, description, parent_id)
  else:
    new_nestedAction = NestedAction(name, description)

  db.session.add(new_nestedAction)
  db.session.commit()

  return nestedAction_schema.jsonify(new_nestedAction)

# Get All NestedActions
@app.route('/nestedActions', methods=['GET'])
def get_nestedActions():
  all_nestedActions = NestedAction.query.all()
  result = nestedActions_schema.dump(all_nestedActions)
  return jsonify(result)

# Get Single NestedAction
@app.route('/nestedAction', methods=['GET'])
def get_nestedAction():
  id = request.args.get('id')

  nestedAction = NestedAction.query.get(id)
  return nestedAction_schema.jsonify(nestedAction)

# Update a NestedAction
@app.route('/nestedAction', methods=['PUT'])
def update_nestedAction():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  status = request.json['status']
  
  nestedAction = NestedAction.query.get(id)

  nestedAction.name = name
  nestedAction.description = description
  nestedAction.status = status

  db.session.commit()

  return nestedAction_schema.jsonify(nestedAction)

# Delete NestedAction
@app.route('/nestedAction', methods=['DELETE'])
def delete_nestedAction():
  id = request.args.get('id')

  nestedAction = NestedAction.query.get(id)
  db.session.delete(nestedAction)
  db.session.commit()

  return nestedAction_schema.jsonify(nestedAction)

# End CRUD Operations

# Run Server
if __name__ == '__main__':
  app.run(debug=True)
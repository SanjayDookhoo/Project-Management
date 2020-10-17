from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os

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

# my classes 
class Project(db.Model):
  __tablename__ = 'project'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.utcnow

class Risk(db.Model):
  __tablename__ = 'risk'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "risks")

   # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "risk")

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.utcnow

class Issue(db.Model):
  __tablename__ = 'issue'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "issues")

   # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "issue")

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.utcnow

class Action(db.Model):
  __tablename__ = 'action'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
  project = db.relationship("Project", backref = "actions")

  # creates 1 - 1 relation with NestedAction, where NestedAction can self reference to stack multiple times
  nestedAction_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'), nullable=False)
  nestedAction = db.relationship("NestedAction", backref = "action")

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.utcnow

class NestedAction(db.Model):
  __tablename__ = 'nestedAction'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), unique=True)
  description = db.Column(db.String(200))
  status = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  parent_id = db.Column(db.Integer, db.ForeignKey('nestedAction.id'))
  parent = db.relationship("NestedAction", backref = "children")

  def __init__(self, name, description):
    self.name = name
    self.description = description
    self.status = 0
    self.createdTimestamp = datetime.datetime.utcnow


# my Schemas
class ProjectSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'status', 'createdTimestamp')
class RiskSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'status', 'createdTimestamp')
class IssueSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'status', 'createdTimestamp')
class ActionSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'status', 'createdTimestamp')
class NestedActionSchema(ma.Schema):
  class Meta:
    fields = ('id', 'name', 'description', 'status', 'createdTimestamp')

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
  return jsonify(result.data)

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
  
  project = Project.query.get(id)

  project.name = name
  project.description = description

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

  new_risk = Risk(name, description)

  db.session.add(new_risk)
  db.session.commit()

  return risk_schema.jsonify(new_risk)

# Get All Risks
@app.route('/risks', methods=['GET'])
def get_risks():
  all_risks = Risk.query.all()
  result = risks_schema.dump(all_risks)
  return jsonify(result.data)

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
  
  risk = Risk.query.get(id)

  risk.name = name
  risk.description = description

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

  new_issue = Issue(name, description)

  db.session.add(new_issue)
  db.session.commit()

  return issue_schema.jsonify(new_issue)

# Get All Issues
@app.route('/issues', methods=['GET'])
def get_issues():
  all_issues = Issue.query.all()
  result = issues_schema.dump(all_issues)
  return jsonify(result.data)

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
  
  issue = Issue.query.get(id)

  issue.name = name
  issue.description = description

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

  new_action = Action(name, description)

  db.session.add(new_action)
  db.session.commit()

  return action_schema.jsonify(new_action)

# Get All Actions
@app.route('/actions', methods=['GET'])
def get_actions():
  all_actions = Action.query.all()
  result = actions_schema.dump(all_actions)
  return jsonify(result.data)

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
  
  action = Action.query.get(id)

  action.name = name
  action.description = description

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
@app.route('/nestedNestedAction', methods=['POST'])
def add_nestedNestedAction():
  name = request.json['name']
  description = request.json['description']

  new_nestedNestedAction = NestedAction(name, description)

  db.session.add(new_nestedNestedAction)
  db.session.commit()

  return nestedNestedAction_schema.jsonify(new_nestedNestedAction)

# Get All NestedActions
@app.route('/nestedNestedActions', methods=['GET'])
def get_nestedNestedActions():
  all_nestedNestedActions = NestedAction.query.all()
  result = nestedNestedActions_schema.dump(all_nestedNestedActions)
  return jsonify(result.data)

# Get Single NestedAction
@app.route('/nestedNestedAction', methods=['GET'])
def get_nestedNestedAction():
  id = request.args.get('id')

  nestedNestedAction = NestedAction.query.get(id)
  return nestedNestedAction_schema.jsonify(nestedNestedAction)

# Update a NestedAction
@app.route('/nestedNestedAction', methods=['PUT'])
def update_nestedNestedAction():
  id = request.json['id']
  name = request.json['name']
  description = request.json['description']
  
  nestedNestedAction = NestedAction.query.get(id)

  nestedNestedAction.name = name
  nestedNestedAction.description = description

  db.session.commit()

  return nestedNestedAction_schema.jsonify(nestedNestedAction)

# Delete NestedAction
@app.route('/nestedNestedAction', methods=['DELETE'])
def delete_nestedNestedAction():
  id = request.args.get('id')

  nestedNestedAction = NestedAction.query.get(id)
  db.session.delete(nestedNestedAction)
  db.session.commit()

  return nestedNestedAction_schema.jsonify(nestedNestedAction)

# End CRUD Operations

# Run Server
if __name__ == '__main__':
  app.run(debug=True)
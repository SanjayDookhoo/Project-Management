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
  budget = db.Column(db.Integer)
  createdTimestamp = db.Column(db.DateTime)

  def __init__(self, name, description, budget):
    self.name = name
    self.description = description
    self.budget = budget
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
    fields = ('id', 'name', 'description', 'budget', 'createdTimestamp')
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



# Run Server
if __name__ == '__main__':
  app.run(debug=True)
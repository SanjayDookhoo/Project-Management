# Project-Management

This is a project that was developed as part of the evaluation process of a job interview. The project itself was rather enjoyable, and I was able to fully meet my own expectations in the solution that I Imagined. There certainly are still lots of room for improvements, but, within the short space of time was used effectively to design a simple Project Management application that allowed me to demonstrate my expertise as a Full Stack Developer. 

Frontend: React & Redux
Backend: Python with Flask

## Context 
Companies invest millions of dollars in projects to achieve their objectives. However these projects can go awry for very many reasons, some of the most common reasons are actions ( a small task related to a project e.g. Purchase supplies ) are not completed on time, issues are not resolved/dealt with ( something that prevents the project from moving forward e.g. supply store closed down), and risks ( something that can go wrong) and not properly tracked and dealt with. Project managers exist to (as the name implies) manage these projects and the things related to them ( e.g. actions, issues, risks).

## Task
You are to build a project management web application where a user can create projects, and
add related actions, issues, and risks.
A project should at least consist of an identifier, name, budget and description ( you are
free/encouraged to add any other metrics you think should be useful)
Actions, Issues and Risks, should all have at least the following fields:
- Name
- Description
- Status
- Created date

You are again encouraged to think about what other fields each of these should have and add them in

## Objectives

- Project [CRUD]
- A list of all projects [View]
- Action [CRUD]
- Issue [CRUD]
- Risk [CRUD]
- A ‘project overview’ page that displays related information (actions, issues, risks) [View]
- Some aggregated visual of how the project is doing ( take this into consideration when
doing your data models)
- ...Anything else you would like to include

## Interpretation and Design Choice Justification

Since this was requested to be built on React & Redux, my goal was to maximize the potential of this project being built on that framework. The creation of reusable components would be the bread and butter of this project while utilizing Redux where possible to reduce re-renders and ensuring a easy to understand code and process flow.

With this is mind, my interpretation of the possible design was to have one singular CRUD component, that can be reused for Projects, Risks, Issues and Actions. This meant that minor changes would be made for the component based on where it was being used.

To start, I needed to differentiate what the difference between the categories were

Risk - A Risk is any event or situation that can POSSIBLY lead to the downfall of the project, it must be monitored and preventative measures must be put in place
Issue - A Issue is any event or situation that did in fact happen and is currently leading to the downfall of the project, it must be resolved quickly
Action - An Action is a task that is done with the full intention of pushing the project closer to completion.

From this new understanding, I attempted to create a project where; Projects, Risks, Issues and Actions would all have common fields that can interpreted differently, but essentially they are all one and the same

the process flow I saw working best was: 

- Project -> Risk -> Nested Action -> Nested Action ...
- Project -> Issue -> Nested Action -> Nested Action ...
- Project -> Action -> Nested Action -> Nested Action ...

A single project, would be associated with a list of Risks, Issues, and Actions. But these items can have Nested Actions, that have the same fields. This would allow for an infinitely stackable category, where all information and situation change can be documented as an Action to be handled.

The most relevant information for any Project Management Application was used as the basis for the designing of the tables and relations. 

Fields

- name
- description
- status (status was interpreted to be a percentage)
- budget (budget was interpreted as running costs, costs to get things done)
- dueTimestamp
- createdTimestamp

## To Begin

### Dependencies

These are the main software required to be installed on your PC to proceed with running the application. I can only guarantee that the software works as intended from my environment, which is the software versions specified below. Most likely version numbers close to what was mentioned should be sufficient.

- Python 3.9
- Node 12.13.1

### Download or Clone

Download or Clone this github repo to your desired location on your PC

### Backend

#### Backend with a newly created, clean database copy

Navigate to the directory, and open the command line/Terminal at that location
cd Project-Management/server
pip install pipenv
pipenv shell
pipenv install
python create_db.py 
python app.py

#### Backend with the provided example database to demo the application

copy examples/db.sqlite ./

Navigate to the directory, and open the command line/Terminal at that location
cd Project-Management/server
pip install pipenv
pipenv shell
pipenv install
python app.py

### Frontend

steps follows directly after the above steps are completed

cd ../client
npm install
npm start

#### Notes

By default, the API is supposed to start at http://127.0.0.1:5000/ or http://localhost:5000/
If this was not the case, please change the .env file contents to reflect what your endpoint it

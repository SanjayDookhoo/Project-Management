# Dependencies

These are the main software required to be installed on your PC to proceed with running the application. I can only guarantee that the software works as intended from my environment, which is the software versions specified below. Most likely version numbers close to what was mentioned should be sufficient.

- Python 3.9

# Backend

## Backend with a newly created, clean database copy

- Navigate to the directory, and open the command line/Terminal at that location
- cd Project-Management/server
- pip install pipenv
- pipenv shell
- pipenv install
- python create_db.py 
- python app.py

## Backend with the provided example database to demo the application

- Navigate to the directory, and open the command line/Terminal at that location
- cd Project-Management/server
- copy examples/db.sqlite ./
- pip install pipenv
- pipenv shell
- pipenv install
- python app.py
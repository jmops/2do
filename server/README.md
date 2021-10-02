### Work in progress

## To run the application
- npm run build
- npm run nodemon

## Working APIs
- path: localhost:8080/profile/new-user
- method: POST
- body:
{
    "name" : "name nameson",
    "password" : "heihei"
}

- path: localhost:8080/profile/login
- method: POST
- body:
{
    "name" : "name nameson",
    "password" : "heihei"
}

- path: localhost:8080/tasks/get-tasks
- method: GET

- path: localhost:8080/tasks/complete-task
- method: POST
- body:
{
    "taskid":"the _id of the task"
}
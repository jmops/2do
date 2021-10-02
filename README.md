# 2do
!!IN PROGRESS!!
A simpe todo web-app created with the MERN-stack. Currently not fit to be in production


## Instructions 

### Install mongoDB community edition (version 4.4.6)

wget https://repo.mongodb.org/apt/ubuntu/dists/focal/mongodb-org/4.4/multiverse/binary-amd64/mongodb-org-server_4.4.6_amd64.deb


sudo apt install ./mongodb-org-server_4.4.6_amd64.deb


sudo systemctl start mongod

### Start the server
- cd into /server
-  run the command "npm run br" which runs tsc and starts nodemon

## todo
- Authentication for the database (currently super duper insecure, no need for credentials)
- Using session cookies to retrieve the users tasks
- Frontend
- Make sure no endpoint reveal sensetive information from testing
- Use async/await with try/catch everywhere istead of promises.then().catch()

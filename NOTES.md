Required Environment variables to run the project
MONGO_URI = 'mongodb+srv://{usernamr}:{password}@cluster0.vvbvxq8.mongodb.net/{databaseName}'
SECRET_KEY = 'anyString'

Commands to run the project
path:- job-assignment-UmeshDesai123/server
commands:- 
  npm install
  node index.js

POSTMAN collection link:
https://api.postman.com/collections/34868095-5a2442e3-5806-4128-bbc8-3bff06b40dc4?access_key=PMAT-01J379FTT2JCNNKNKTS7X1EKCC


I have developed APIs for user registartion, login and logout.
Developed APIs for managing states.
I have implemented session based authorization, i.e. after hitting login APIs session cookies will get stored. After this you can access all State APIs.
After login any user can create states and can fetch all states.
For updating and deleting any state, the logged in user and the creator of the state should match.
Also attached swagger file in attachment folder. 

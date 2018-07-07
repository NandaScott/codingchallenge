# codingchallenge
Coding challenge for Passport.

challenge link: http://s3.amazonaws.com/passportmedia/passport_full_stack_programming_challenge.pdf

Important notes:

If you run the api with `npm run dev-api` it will start the mongodb server in the background. However, you need to run `sudo mongod --shutdown` after stopping the express server. Otherwise Mongo will complain about an already running server.
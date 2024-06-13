# URL-shortener
A simple project creates a URL shortener service, implementing a clean architecture and using Nestjs, Docker, PostgreSQL, and Redis.

## Create a .env.json file
This project uses an env file instead common .env file (to experiment with using more types, like array or embedded objects)
So you need to create a .env.json file before running the project, you could use the provided example:
```bash
$ cp .env.example.json .env.json
```

## Running the Development Environment
In `docker/dev`
```bash
$ docker-compose up
```

This application was built implementing Clean Architecture, each module represents a domain and each domain has its respective layers, it is also the reason why there is so much abstraction between layers.

The seeders will be automatically executed the first time the project is started.

The env vars are stored in `.env.json`, if you modify them maybe you need to modify some variable values in the docker-compose.

Also, you can check the swagger http://localhost:4000/api-docs/ to inspect the API contracts and execute the request (except the redirect one, to test that you need to execute it in the browser directly)

Do not hesitate to ask any questions you may have.

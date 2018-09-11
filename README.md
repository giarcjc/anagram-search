Anagram-Search API
=========

# An API that allows fast searches for [anagrams](https://en.wikipedia.org/wiki/Anagram).

# Install

```
  git clone git@github.com:giarcjc/anagram-search.git
```

## Running in Docker (recommended)

Pre-requisities:
  - Local install of [Docker](https://docs.docker.com/)
  - Local install of [Docker Compose](https://docs.docker.com/compose/install/)

```
  npm run docker
```

This command concatenates two scripts, `npm run docker-build` which builds the docker image, and `npm run dc-up` which uses the docker-compose file to spin up the Anagram-Search api with a linked Redis DB in it's own container.

The first time you run the docker command, the project will take fairly long time to build the image.  However after the initial image is built it should be cached so you can simply run `npm run dc-up` to spin the project up quickly.

Once the project is up and running you should see a log file resembling

```
anagram-search    | {"name":"Anagram-Search-Api","hostname":"1639c1de5348","pid":46,"level":30,"msg":"Express server bunyan listening on port 3000","time":"2018-09-07T04:29:36.715Z","v":0}
```

which lets you know the api is ready for your queries.

## Creating the Corpus

In order to verify that anagrams being returned for a given word are actual English words, we utilize a corpus.  The corpus is stored in Redis, which means we need to ingest a dictionary file (assumed to be dictionary.txt.gz) into the data store.

The corpus is created at startup by importing the dictionary into Redis.  If you accidentally (or intentionally) drop the database via the DELETE /words.json route, the db can be re-seeded with the dictionary file by running:

```
  npm run import
```

to run the import command which will unzip and import the dictionary.txt.gz located at the root level of the project.

Alternately you can seed the DB by sending a POST request to the `/seed` endpoint.

```
  curl -d {} localhost:3000/seed
```

As you can see no payload body is necessary when sending a POST request to `/seed`.


## Using the API

Ex:
```
  curl -i http://localhost:3000/anagrams/read.json
```

You can call the api via curl, postman, httpie, or whatever means you prefer, but requests must have a content type of `application/json`. Currently the app spins up on localhost port 3000.  There are 2 resources: anagrams and words. (See Documentation for full details of api endpoints).


## Documentation

```
  npm run docs
```

The API documentation can be viewed by opening the file at `docs/api/index.html` with the browser of your choice.  I included a convenience command which should launch it in Chrome if you're on a Mac (other OS/browser combos should just open the file directly).

The API documentation uses [API Blueprint](https://apiblueprint.org/) format and was generated via [cURL Trace Parser](https://github.com/apiaryio/curl-trace-parser) and [Aglio](https://github.com/danielgtaylor/aglio).


## Running Locally

Pre-requisities:
 - Local install of [node](https://nodejs.org/en/download/)
 - Local install of [redis](https://redis.io/topics/quickstart)

If you wish to run the project locally without using docker, you need to have node and redis installed locally.  The project was developed using Node v10.8.0 although any version of Node starting from v8.11.0 (LTS) should work ok.

First pull dependencies:

```
  npm i ` or `npm install
```

In a different bash shell, start the redis server

```
  redis-server
```

Then back in the project dir, start the api server:

```
  npm run start
```

## Tests

```
  npm run test
```

Runs unit tests written with Mocha Chai and Sinon.  It's better to run these without redis or the app running because otherwise you'll get conflicts between port numbers being in use.

```
  npm run test-ruby
```

This runs a suite of ruby smoke tests that were used to guide the development of the api.

## Building the project and local development

```
  npm run build
```

This project was developed using Typescript so if you modify any of the source code you'll need to compile the ts files to js.  If you're doing active development you can run `npm run build-dev` to watch for changes.  Similarly you can run `npm run start-dev` to start the app locally with [supervisor](https://github.com/petruisfan/node-supervisor) (requires local install of supervisor).


Anagram-Search API
=========

# An API that allows fast searches for [anagrams](https://en.wikipedia.org/wiki/Anagram).

# Install

`npm i anagram-search`

## Running in Docker (recommended)

Pre-requisities:
-- Local install of [Docker](https://docs.docker.com/)
-- Local install of [Docker Compose] (https://docs.docker.com/compose/install/)

`npm run docker`

This command simply concatenates two scripts, `npm run docker-build` which builds the docker image, and `npm run dc-up` which uses the docker-compose file to spin up the Anagram-Search api with a linked Redis DB in it's own container.

The first time you run the docker command, the project will take fairly long time to build the image.  However after the initial image is built it should be cached so you can simply run `npm run dc-up` to spin the project up quickly.

## Running Locally

Pre-requisities:
-- Local install of [node](https://nodejs.org/en/download/)
-- Local install of [redis](https://redis.io/topics/quickstart)

`npm run start-dev`

If you wish to run the project locally without using docker, you need to have node and redis installed locally.  The project was developed using Node v10.8.0 although any version of Node starting from v8.11.0 (LTS) should work ok.

## Documentation
Pre-requisities:
-- Local install of Google Chrome or similar browser

`npm run docs`

The API documentation can be viewed by opening the file at `docs/api/index.html` with the browser of your choice.  I included a convenience command which should launch it in Chrome if you're on a Mac (other OS/browser combos should just open the file directly).

The API documentation uses [API Blueprint](https://apiblueprint.org/) format and was generated via [cURL Trace Parser](https://github.com/apiaryio/curl-trace-parser) and [Aglio](https://github.com/danielgtaylor/aglio).

# Tests

`npm run test`

Runs unit tests written with Mocha Chai and Sinon.

`npm run test-ruby`

This runs a suite of ruby smoke tests that were used to guide the development of the api.


# Building the project and local development

`npm run build`

This project was developed using Typescript so if you modify any of the source code you'll need to compile the ts files to js.  If you're doing active development you can run `npm run build-dev` to watch for changes.  Similarly you can run `npm run start-dev` to start the app locally with [supervisor](https://github.com/petruisfan/node-supervisor) (requires local install of supervisor).




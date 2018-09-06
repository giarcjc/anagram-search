"use strict";
exports.__esModule = true;
var environment = {
    REDIS_HOST: {
        description: 'The Host to connect to Redis DB',
        required: true,
        value: '127.0.0.1'
    },
    REDIS_PORT: {
        desciption: 'The port to connect to Redis via',
        required: true,
        value: 6379
    }
};
exports["default"] = environment;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var redis_stream_1 = __importDefault(require("redis-stream"));
var zlib_1 = __importDefault(require("zlib"));
var key_service_1 = __importDefault(require("./db/key.service"));
var client = new redis_stream_1["default"](6379, '127.0.0.1');
var stream = client.stream();
var filePath = path_1["default"].join(__dirname, '../dictionary.txt.gz');
var gunzip = zlib_1["default"].createGunzip();
var command;
stream
    .pipe(fs_1["default"].createReadStream(filePath))
    .pipe(gunzip)
    .pipe(redis_stream_1["default"].es.split())
    .pipe(redis_stream_1["default"].es.map(function (word, cb) {
    console.log('word: ', word);
    command = ['sadd', key_service_1["default"](word), word];
    stream.redis.write(redis_stream_1["default"].parse(command));
    cb();
}))
    .on('error', function (err) { return console.error('Error reading file: ', err); })
    .on('end', function () {
    stream.end();
    console.log('end');
})
    .on('close', function () {
    console.log('close');
    process.exit();
});

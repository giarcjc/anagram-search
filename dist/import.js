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
var logger_1 = __importDefault(require("./logger"));
var client = new redis_stream_1["default"](6379, '127.0.0.1');
var stream = client.stream();
var filePath = path_1["default"].join(__dirname, '../dictionary.txt.gz');
var gunzip = zlib_1["default"].createGunzip();
var command;
logger_1["default"].info('Importing dictionary file to DB...please be patient');
stream
    .pipe(fs_1["default"].createReadStream(filePath))
    .pipe(gunzip)
    .pipe(redis_stream_1["default"].es.split())
    .pipe(redis_stream_1["default"].es.map(function (word, cb) {
    logger_1["default"].trace('word: ', word);
    command = ['sadd', key_service_1["default"](word), word];
    stream.redis.write(redis_stream_1["default"].parse(command));
    cb();
}))
    .on('error', function (err) { return logger_1["default"].trace('Error reading file: ', err); })
    .on('end', function () {
    stream.end();
    logger_1["default"].trace('end');
})
    .on('close', function () {
    logger_1["default"].info('Finished Importing Dictionary File.');
    process.exit();
});

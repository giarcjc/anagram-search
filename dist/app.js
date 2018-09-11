"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var body_parser_1 = __importDefault(require("body-parser"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var anagrams_1 = require("./api/anagrams");
var words_1 = require("./api/words");
var db_service_1 = require("./db/db.service");
var environment_1 = __importDefault(require("./environment"));
var errors_1 = __importDefault(require("./errors"));
var import_1 = require("./import");
var logger_1 = __importDefault(require("./logger"));
var middleware_1 = __importDefault(require("./middleware"));
var app = express_1["default"]();
var redisPort = environment_1["default"].REDIS_PORT ? +environment_1["default"].REDIS_PORT : 6379;
var redisHost = environment_1["default"].REDIS_HOST ? environment_1["default"].REDIS_HOST : '127.0.0.1';
db_service_1.dbService.connectToRedis(redisPort, redisHost);
var filePath = path_1["default"].join(__dirname, '../dictionary.txt.gz');
// build the corpus by importing dictionary into db
if (filePath) {
    import_1.importService.streamToRedis(redisPort, redisHost, filePath);
}
// middleware - just logging right now
// must go before routes
app.use(middleware_1["default"]);
app.use(body_parser_1["default"].urlencoded({ extended: false }));
app.use(body_parser_1["default"].json());
var port = process.env.PORT ? +process.env.PORT : 3000;
app.use('/words.json', words_1.words);
app.use('/words', words_1.words);
app.use('/anagrams', anagrams_1.anagrams);
// error logging - must go last
app.use(errors_1["default"]);
app.listen(port, function () { return logger_1["default"].info("Express server bunyan listening on port " + port); });

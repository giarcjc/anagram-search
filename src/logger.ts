import bunyan from 'bunyan';

const logger = bunyan.createLogger({
  name: 'Anagram-Search-Api'
});

export default logger;


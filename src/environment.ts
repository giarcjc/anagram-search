const environment = {
  REDIS_HOST: {
    description: 'The local env Host to connect to Redis DB',
    required: true,
    value: '127.0.0.1'
  },
  REDIS_PORT: {
    desciption: 'The port to connect to Redis via',
    required: true,
    value: 6379
  }
}

export default environment;
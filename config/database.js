const parse = require('pg-connection-string').parse;

const devConnections = function (env) {
  const config = parse(env("DATABASE_URL"));
  if(!env)
    return console.error("Underfind .env");
  return {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: config.host,
        port: config.port,
        database: config.database,
        username: config.user,
        password: config.password,
        ssl: { rejectUnauthorized: false }
      },
      options: {
        debug: false,
        useNullAsDefault: true,
        strict: true,
      },
    }
  }
}

const prodConnections = function (env) {
  if(!env)
    return console.error("Underfind .env");
  return {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: `/cloudsql/${env("INSTANCE_CONNECTION_NAME")}`,
        database: env("DATABASE_NAME"),
        username: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
      },
      options: {
        pool: {
          min: 0,
          max: 15,
          idleTimeoutMillis: 30000,
          createTimeoutMillis: 30000,
          acquireTimeoutMillis: 30000,
        },
      },
    }
  }
}

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: env('NODE_ENV') === 'development' ? devConnections(env) : prodConnections(env)
});



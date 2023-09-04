"use strict";
const Hapi = require("@hapi/hapi");
const Inert = require("@hapi/inert");
const Vision = require("@hapi/vision");
const HapiSwagger = require("hapi-swagger");
const Pack = require("./package");
const users = require("./users");
const server = Hapi.server({
  port: 3000,
  host: "localhost",
});
const swaggerOptions = {
  info: {
    title: "Test API Documentation",
    version: Pack.version,
  },
};

const consoleLogging = {
  plugin: require("good"),
  options: {
    ops: {
      interval: 1000,
    },
    reporters: {
      consoleReporter: [
        {
          module: "good-squeeze",
          name: "Squeeze",
          args: [{ response: "*", log: "*" }],
        },
        { module: "good-console" },
        "stdout",
      ],
    },
  },
};
const init = async () => {
  await server.register([
    Inert,
    Vision,
    consoleLogging,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
    {
      plugin: users,
      options: {},
    },
    
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});
init();

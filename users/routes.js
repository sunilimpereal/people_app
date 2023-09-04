const fs = require("fs");
const path = require("path");
const UsersHandler = require("./handler");
module.exports = [
  {
    method: "GET",
    path: "/users",
    options: {
      handler: UsersHandler.getUsers,
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/users",
    handler: UsersHandler.createUserhandler,
    options: {
      tags: ["api"],
    },
  },
  {
    method: "POST",
    path: "/users/csv",

    options: {
      handler: UsersHandler.createUserCsv,
      tags: ["api"],
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data", // Set the allowed content type for file uploads
        maxBytes: 104857600, // Set the maximum file size (in bytes) for this route
        multipart: true, // Enable multipart form data parsing
        uploads: path.join(__dirname, "uploads"), // Set the directory to store uploaded files
      },
    },
  },
];

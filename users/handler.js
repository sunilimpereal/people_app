const Models = require("../models/index");
const fs = require("fs");
const fastcsv = require("fast-csv");

class UserHandler {
  static getUsers = async (request, h) => {
    try {
      const data = await Models.User.findAll();
      return data;
    } catch (e) {
      return "error";
    }
  };

  static createUserhandler = async (request, h) => {
    try {
      const {
        UserId,
        FirstName,
        LastName,
        Sex,
        Email,
        Phone,
        DateOfBirth,
        JobTitle,
      } = request.payload;
      const user = await Models.User.create({
        UserId: UserId,
        FirstName: FirstName,
        LastName: LastName,
        Sex: Sex,
        Email: Email,
        Phone: Phone,
        DateOfBirth: DateOfBirth,
        JobTitle: JobTitle,
      });
      return {
        data: user,
        message: "User created",
      };
    } catch (e) {
      return h
        .response({
          error: error.message,
        })
        .code(500);
    }
  };

  static createUserCsv = async (request, h) => {
    const fileData = request.payload.file;

    if (!fileData) {
      return "No file uploaded.";
    }

    // Parse the CSV file using fast-csv
    const csvData = [];

    return new Promise((resolve, reject) => {
      const csvStream = fastcsv
        .parse()
        .on("data", (row) => {
          csvData.push(row);
        })
        .on("end", async () => {
          // Loop through the CSV data here
          csvData.shift();
          for (const row of csvData) {
            console.log(row);
            const [day, month, year] = row[7].split("/").map(Number);

            await Models.User.create({
              UserId: row[1],
              FirstName: row[2],
              LastName: row[3],
              Sex: row[4],
              Email: row[5],
              Phone: row[6],
              DateOfBirth: new Date(year, month - 1, day),
              JobTitle: row[8],
            });
          }
          resolve("CSV processing complete.");
        })
        .on("error", (error) => {
          reject(error);
        });

      fileData.pipe(csvStream);
    });
  };
}

module.exports = UserHandler;
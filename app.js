require('dotenv').config();

const server = require('./Web/server'),
      db = require('./DB/db-connect'),
      sendMailJob = require('./Email/cron');


(async function main(){

    console.log("Connecting to database.");
    await db();

    console.log("Starting server.");
    await server();

    console.log("Starting Cron Job.");
    await sendMailJob();

})();

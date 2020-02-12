const {CronJob}  = require('cron'),
      sendMail = require('./send-mail');

//Runs the cron-job to send emails to users.
module.exports = async function () {

    const config = {
        cronTime: '0 */24 * * *', //cron-time: Currently set to 24 hours
        onTick: () => sendMail(),
        runOnInit: true
    };

    const cron = new CronJob(config);
    cron.start();
}
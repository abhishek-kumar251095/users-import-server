const services = require("../Web/Services/user"),
      nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
        user: process.env.FROM_EMAIL,   //defined in .env file
        pass: process.env.FROM_PASSWORD //defined in .env file
    }
});

/* Responsible for sending emails to users.
*  The email is sent 10 users at a time. 
*  This module is used by cron-job to send
*  emails everyday.
*/
module.exports = function(){
    services
        .getUsersByMailStatus()
        .then((response) => {

            response.forEach(element => {

                let mailOptions = {
                    from: process.env.FROM_EMAIL, //defined in .env file
                    to: element.Email,
                    subject: 'User details confirmation', 
                    html: `<p>Hey ${element.FirstName}, </p><p>Kindly confirm whether the following details are correct:</p>
                            <p>Name: ${element.FirstName} ${element.LastName}</p>
                            <p>Email Id: ${element.Email} </p>
                            <p>Phone Number: ${element.Phone} </p>
                            <p>Address: ${element.Address} </p>
                            <p>Gender: ${element.Gender} </p>
                            <p>Regards,</p>
                            <p>${process.env.USERNAME}</p>` //defined in .env file
                };

                transporter.sendMail(mailOptions)
                .then(response => {
                    services.updateMailStatus(element.Email);
                })
                .then(() => {
                    console.log("Email sent!")
                })
                .catch(error => {
                    console.log(error);
                });

            });

        });
}
const express = require('express'),
      port = process.env.PORT || 4500,
      app = express(),
      bodyParser = require('body-parser'),
      cors = require('cors');
      
module.exports = async function() {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(cors()); //For cross-origin requests
    require('./Routes/user')(app);

    app.listen(port, function(err, resp){
        console.log("Server started on port: "+port);
    });
}
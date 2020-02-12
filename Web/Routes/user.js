const userUpload = require('../../CsvData/upload-file');

module.exports = function (app) {

    var controller = require('../Controller/user');
    
    app.route('/User')
        .get(controller.getUsers)
        .delete(controller.removeData);
    
    app.post('/user/upload', userUpload, function (req, res) {

        if (!req.file) {
            console.log("File not uploaded!");
            return res.send({
                success: false
            });

        } else {
            console.log('File uploaded!');
            controller.uploadUserData(req.file.filename);
            res.send({
                success:true
            })
        }
    });
};

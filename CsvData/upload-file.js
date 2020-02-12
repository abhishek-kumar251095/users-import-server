/*Configuration for Multer is set here.
* This module is used to define file-upload 
* path and the file names for the uploaded files. 
*/

const multer = require('multer');

const path = process.cwd()+"/users-import-server/CsvData/Upload";

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+'.csv')
    }
  });

  upload = multer({
    storage: storage
  });

  module.exports = upload.single('userdata');

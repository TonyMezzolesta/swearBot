var mongoose = require('mongoose');
var swearSchema = require('./swearSchema');


const getSwear = async (userId) => {
  return new Promise((resolve, reject) => {
    var query = swearSchema.find({});

    query.where("userId").equals(userId);

    query.exec(function (err, results) {
        if (err) {
          return reject("An error occurred saving the document: " + err);
        } else {
          return resolve(results);
        }
      }); 

  });
}

module.exports = Object.assign({}, { getSwear });
var mongoose = require('mongoose');
var swearSchema = require('./swearSchema');
var Swear = swearSchema;


const setSwear = async (swearObj) => {
  return new Promise((resolve, reject) => {
    if(swearObj._id === null){
        swearObj._id = mongoose.Types.ObjectId();
    }

    var newSwear = new Swear(swearObj)

    newSwear.save(function (err, results) {
        if (err) {
          return reject("An error occurred saving the document: " + err);
        } else {
          return resolve(results);
        }
      }); 

  });
}

module.exports = Object.assign({}, { setSwear });
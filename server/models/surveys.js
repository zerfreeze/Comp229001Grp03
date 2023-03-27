let mongoose = require('mongoose');

// create a model class
let Survey = mongoose.Schema({
    Title: String,
    Description: String,
    Author: String,
    KindSurvey: String,
    NumQuestion: Number,
    Question1: String,
    Option1: String,
    Option2: String,
    Option3: String,
    Question2: String,
    Option4: String,
    Option5: String,
    Option6: String,
    Question3: String,
    Option7: String,
    Option8: String,
    Option9: String,  
},
{
  collection: "surveys"
});

module.exports = mongoose.model('Survey', Survey);
//file survey.js
//Author's name: Group03
//StudentId:
//WebAppname: Survey

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the Survey model
let survey = require('../models/surveys');

/* GET surveys List page. READ */
router.get('/', (req, res, next) => {
  // find all surveys in the surveys collection
  survey.find( (err, surveys) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('surveys/index', {
        title: 'Surveys',
        surveys: surveys
      });
    }
  });

});

//  GET the Survey Details page in order to add a new Survey
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    res.render('surveys/details',{
      title:'Add Survey',
      surveys: '',
    })



});

// POST process the Survey Details page and create a new Survey - CREATE
router.post('/add', (req, res, next) => {
    //console.log("entro");
    /*****************
     * ADD CODE HERE *
     *****************/

let title = req.body.title;
let description = req.body.description;
let author = req.body.author;
let kindSurvey = req.body.kindsurvey;
let numQuestion = parseInt(req.body.numquestion);
let newSurvey = { 
  "Title": title,
  "Description": description,
  "Author": author,
  "KindSurvey": kindSurvey,
  "NumQuestion": numQuestion
};

if (numQuestion >= 1) {
  let question1 = req.body.question1;
  let option1 = req.body.option1;
  let option2 = req.body.option2;
  let option3 = req.body.option3;
  newSurvey.Question1 = question1;
  newSurvey.Option1 = option1;
  newSurvey.Option2 = option2;
  newSurvey.Option3 = option3;
}

if (numQuestion >= 2) {
  let question2 = req.body.question2;
  let option4 = req.body.option4;
  let option5 = req.body.option5;
  let option6 = req.body.option6;
  newSurvey.Question2 = question2;
  newSurvey.Option4 = option4;
  newSurvey.Option5 = option5;
  newSurvey.Option6 = option6;
}

if (numQuestion >= 3) {
  let question3 = req.body.question3;
  let option7 = req.body.option7;
  let option8 = req.body.option8;
  let option9 = req.body.option9;
  newSurvey.Question3 = question3;
  newSurvey.Option7 = option7;
  newSurvey.Option8 = option8;
  newSurvey.Option9 = option9;
}

let surveyData = survey(newSurvey);
surveyData.save((err, survey) => {
  if (err) {
    console.log(err);
    res.end(err);
  } else {
    res.redirect('/surveys');
  }
});





/*

  let newSurvey = survey({
      "Title": req.body.title,
      "Description":req.body.description,
      "Author":req.body.author,
      "KindSurvey": req.body.kindsurvey,      
      "NumQuestion":req.body.numquestion,
      "Question1":req.body.question1,
      "Option1":req.body.option1,
      "Option2":req.body.option2,
      "Option3":req.body.option3,
      "Question2":req.body.question2,
      "Option4":req.body.option4,
      "Option5":req.body.option5,
      "Option6":req.body.option6,
      "Question3":req.body.question3,
      "Option7":req.body.option7,
      "Option8":req.body.option8,
      "Option9":req.body.option9
  });
  survey.create(newSurvey,(err,survey)=>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
      res.redirect('/surveys');
      }
  });

*/
});


// GET the Survey Details page in order to edit an existing Survey
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    survey.findById(id,(err,surveyToEdit)=>{
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
          res.render('surveys/edit',{
            title:'Edit Survey', 
            surveys: surveyToEdit
          });
        }
            
    });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id
    console.log(req.body);
    let updatedSurvey = survey({
                "_id":id,
                "Title": req.body.title,
                "Description":req.body.description,      
                "Author":req.body.author,
                "KindSurvey": req.body.kindsurvey,
                "NumQuestion":req.body.numquestion,
                "Question1":req.body.question1,
                "Option1":req.body.option1,
                "Option2":req.body.option2,
                "Option3":req.body.option3,
                "Question2":req.body.question2,
                "Option4":req.body.option4,
                "Option5":req.body.option5,
                "Option6":req.body.option6,
                "Question3":req.body.question3,
                "Option7":req.body.option7,
                "Option8":req.body.option8,
                "Option9":req.body.option9
            });
    survey.updateOne({_id:id}, updatedSurvey,(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/surveys');
                }
            });



});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    survey.remove({_id:id},(err)=>{
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
              res.redirect('/surveys');
          }
                
            });

});


module.exports = router;

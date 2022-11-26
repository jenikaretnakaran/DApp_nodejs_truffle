var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/view', function(req, res, next) {
  data = {"courseName" : "<Course Name>", "certificateID" : "<Certificated ID>", "candidateName" : "<Candidate Name>", "grade" : "<Grade>", "date" : "<Date>"}
  res.render('viewCertificate', { data: data });
});

router.get('/issue', function(req, res, next) {
  res.render('issueCertificate', { formClass : '', messageClass : 'hidden', certificateID : '<Certificated ID>' });
});


//newly added

router.post('/issue', function(req, res, next) {
  data = req.body;
  console.log(data);
  MyContract.methods.newCertificate(data.certificateID, data.courseName, data.candidateName, data.grade, data.date)
  .send({from : accountAddress, gasLimit : "927000"}).then((txn) => {
    res.render('issueCertificate', {formClass : 'hidden', messageClass : '', certificateID : data.certificateID})
  })
});

router.post('/view', function(req, res, next) {
  data = req.body;
  console.log(data);
  // res.send(data)
  MyContract.methods.certificateDetails(data.certificateID)
    .call({from:accountAddress})
    .then((result) => {
        console.log(result);
        result.certificateID = data.certificateID;
        res.render('viewCertificate', {data : result});
    })
});



module.exports = router;

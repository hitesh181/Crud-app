var express = require('express');
var router = express.Router();
var db=require('../database');


router.get('/form', function(req, res, next) { 
res.render('users', { title: 'Registration form'}); 
});


//INSERTING THE DATA INTO TABLE
//this script to insert data from form into MySQL databse table
router.post('/create', function(req, res, next) {
  
  // store all the user input data
  const userDetails=req.body;
 
  // insert user data into users table
  var sql = 'INSERT INTO users SET ?';
  db.query(sql, userDetails,function (err, data) { 
      if (err) throw err;
         console.log("User data is inserted successfully ");
  });

 

 res.redirect('/users/form');  // redirect to user form page after inserting the data
}); 


//DISPLAYING THE DATABASE
// another routes also appear here
// this script to fetch data from MySQL databse table
router.get('/user-list', function(req, res, next) {
  var sql='SELECT * FROM users';
  db.query(sql, function (err, data, fields) {
  if (err) throw err;
  res.render('user-list', { title: 'User-List', message:"Following is the table of the Students", userData: data});
});
});


//DELETING ROWS FROM DATABASE
// this script to delete data from MySQL databse table
//You have to change the required address i.e ' router.get('/delete/:id'. Here id specifies the no passed by the user-list.ejs file
//The same will happen with edit.

router.get('/delete/:id', function(req, res, next) {
  //console.log(req.params, req.params.id);
  var id= req.params.id;
    var sql = 'DELETE FROM users WHERE S_No = ?';
    db.query(sql, [id], function (err, data) {
    if (err) throw err;
    console.log(data.affectedRows + " record(s) updated");
  });
  res.redirect('/users/user-list');
  
});

//UPDATING RECORDS IN THE DATABASE
// this script to update data in MySQL databse table
//NOTE ----- Read the comments at the "Deletion script"
// write here create & display data script
 
router.get('/edit/:id', function(req, res, next) {
  var UserId= req.params.id;

  console.log("USer Id is", UserId);
  var sql=`SELECT * FROM users WHERE S_No=${UserId}`;
  db.query(sql, function (err, data) {
    if (err) throw err;
   
    res.render('users-form', { title: 'Update Records', editData: data[0], message:"Update records"}) 
    console.log("Data is" , data, "Data 0 is", data[0]);
  });
});



router.post('/edit/:id', function(req, res, next) {
var id= req.params.id;
var updateData=req.body;
console.log(id, updateData)
var sql = `UPDATE users SET ? WHERE S_No= ?`;
db.query(sql, [updateData, id], function (err, data) {
if (err) throw err;
console.log(data.affectedRows + " record(s) updated");
});
res.redirect('/users/user-list');
});


module.exports = router;
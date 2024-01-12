const NodeMailer = require("nodemailer");
const mongoose = require("mongoose");
//const userModel = require("./schema"); //if you want to separate the schema
const express = require("express");
const app = express();

//mongo connection
mongoose.connect("mongodb://localhost:27017/testUser"); //change url

const userSchema = new mongoose.Schema({
  email: {type: String, required: true}
});
const userModel =  mongoose.model('user', userSchema);

//call and print query 
userModel.find({email: /@/i})
         .select('-_id')
         .then((result, err) =>{
          if( typeof result != 'undefined'){  
            //nodemailer trasnporter (what service or email is being used to send emails)
            var transporter = NodeMailer.createTransport({
              service: 'gmail',
              auth: {
                user: '...',
                pass: '...'
              }
            });

            //actual email to, from, subject, text, and attachments
            var mailOptions = {
              from: 'ourEmail',
              to: [result],  //result variable is all the emails found in the query//
              subject: 'Welcome to MAVIS!',
              text: 'FLOOD ALERT!\n\nHello USER,\nWe are reaching out to report our sensor XXX detecting a water rise above your threshold.\nThe water is currently XXX above threshold level.\n\nThe MAVIS sensors will update every XMINUTES to send new alerts based on water level.\n\nUnsubscribe/modify alerts here:\nLINK\n\nStay safe,\nMAVIS',
              attachments: [
                {
                  filename: 'attachments.docx',
                  path: 'attachments.docx'
                }
              ]
            };

            //this function actually sends the mailOptions email and if not will catch error
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          }
          if(err){
            console.log()
          }
         })

//Ensure mongo connects
app.listen(3000,()=>{
    console.log("on port 3000")
});

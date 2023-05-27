const express=require('express');
const app=express()
const path=require('path')
const nodemailer = require('nodemailer');
const PORT=3000;

if (!PORT) {
    throw new console.error('port is not defined');
}
app.use('/',express.static(__dirname+'/public'))

var transporter = nodemailer.createTransport({    
    host: "smtpout.secureserver.net",  
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers:'SSLv3'
    },
    requireTLS:true,
    port: 465,
    debug: true,
    auth: {
        user: "name@demo.com",
        pass: "" 
    }
});
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

app.get('/send_mail',(req,res)=>{
    let email=req.query.email;
    let title=req.query.title;
    let email_text=req.query.email_text;
    if(email,title,email_text){
       if(emailRegexp.test(email)){
          //send mail
          var mailOptions = {
            from: 'name@demo.com',
            to: email,
            subject: title,
            text: email_text
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
              res.redirect('/?err=send-err')
            } else {
              res.redirect('/?send=ok')
            }
          });

       }else{
         res.redirect('/?err=invalid')
       }
    }else{
        console.log(email,title,email_text)
        res.redirect('/?err=undefined');
    }
})
// listen at PORT
app.listen(PORT)
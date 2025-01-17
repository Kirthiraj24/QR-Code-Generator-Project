import nodemailer from 'nodemailer';

const sender = nodemailer.createTransport({

     service : "gmail",

     auth :{
        user : 'happyqrservice@gmail.com',
        pass : 'ulcl atje zrks nlca'
     }

})

const mail = {

     from : 'happyqrservice@gmail.com',
     to : 'skirthiraj24@gmail.com',
     subject : 'ThankYou for registering',
     text : "Hi, Kirthi raj S thank you for registering with us feel free to contact us \n for any more support"
}

sender.sendMail(mail,(error,res)=>{
    if(error)
        console.log(error);
    else
    console.log("mail sent successfully");
});

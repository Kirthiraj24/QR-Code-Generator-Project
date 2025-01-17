import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyparser from 'body-parser';
import pg from 'pg';
import bcrypt from 'bcrypt';
import fs from 'fs';
import qr from 'qr-image';
import nodemailer from 'nodemailer';


let __dirname = dirname(fileURLToPath(import.meta.url));

let app = express();
const port = 3000;
const saltRounds = 5;

app.use(express.static(__dirname +'/views')); 
app.use(express.static(__dirname +'/public'));
app.use(bodyparser.urlencoded({ extended: true })); 
app.use(express.static(__dirname));
app.use(express.json());

const transporter = nodemailer.createTransport({

    service : "gmail",

    auth :{
       user : 'happyqrservice@gmail.com',
       pass : 'ulcl atje zrks nlca'
    }

})

const db = new pg.Pool( 
    {
        host : "localhost",  
        user : "postgres", 
        password : "kirthi@24", 
        database : "QR_database", 
        port : 5432 
    }   
)  

db.connect();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html"); 
});


app.post("/register", async (req, res) => {
    let user = req.body.username;
    let password = req.body.password;
    let repeated = req.body.repeatedpassword;

    try {
        let hash = await bcrypt.hash(repeated, saltRounds); 
        await db.query("INSERT INTO happyqr_users (username, userpassword) VALUES ($1, $2)",
            [user, hash]
        );
        console.log("Inserted successfully!");

        const mail = {

            from : 'happyqrservice@gmail.com',
            to : `${user}`,
            subject : 'ThankYou for registering',
            text : `Hi, ${user} \n thank you for registering with us. \n Feel free to contact us for any further support \n wishing you a Good luck !`
       }

       transporter.sendMail(mail,(error,res)=>{
        if(error)
            console.log(error);
        else{
        console.log("mail sent successfully");
        }
    });

        res.sendFile(__dirname+"/public/generateQR.html")

    } catch (err) 
    {
        console.error("Error during registration:", err);
        res.status(500).send("An error occurred. Please try again.");
    }
});

app.post("/login", async (req, res) => {

    let loginname = req.body.username;
    let loginpassword = req.body.password;

    try {

        let result = await db.query("SELECT * FROM happyqr_users WHERE username = $1",
            [loginname]
        );

        if (result.rows.length === 0) {
            console.log("User not found");
            return res.sendFile(__dirname + "/public/register.html");
        }

        let storedrow = result.rows[0];
        let storedpassword = storedrow.userpassword;

        let match = await bcrypt.compare(loginpassword, storedpassword); 

        if (match) 
            {
            console.log("Login successful!");
            res.sendFile(__dirname+"/public/generateQR.html");
        } 
        else 
        {
            console.log("Incorrect password");
            res.status(500).send("Incorrect username or password.");
        }
    } 
    catch (error) 
    {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred. Please try again.");
    }
});


app.post("/generate" , (req,res) =>{

    let RequestFromTheUser = req.body.userEnteredUrl;
    console.log("recieved url : "+RequestFromTheUser)
   
    var qr_png = qr.image(RequestFromTheUser);
    qr_png.pipe(fs.createWriteStream('qr.png'));
    // res.json({ qrPath: './qr.png' });


})

app.post("/otp", (req, res) => {
    let randomGeneratedNumber = Math.ceil(Math.floor(Math.random()*9999))
    res.text("data send from server");
});
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});


   
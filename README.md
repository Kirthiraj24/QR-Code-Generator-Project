# QR-Code-Generator-Project
A project to learn and test my knowledge on the tech stacks that i have learned.

# QR Generator Website

A simple and professional web application to generate QR codes from URLs. This project also includes user sign-up and login functionality with email notifications upon sign-up.

## Features
- Input a URL to generate its QR code.
- User can download the QR code image in .png format.
- User authentication with sign-up and login functionality.
- Sends a welcome email to users upon successful sign-up using Nodemailer.
- Stores user data securely(5 rounds of salting) in a PostgreSQL database.
- Simple, neat, and responsive design.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Other Libraries:**
  - QR Code library
  - Nodemailer for email notifications

## Project Structure

📦 QR-Generator-Website
├── 📁 public
│   ├── 📁 css
│   │   └── styles.css
│   ├── 📁 js
│   │   └── script.js
│   └── 📁 images
├── 📁 views
│   ├── index.html
│   ├── signup.html
│   └── login.html
├── 📁 routes
│   ├── generator.js
│   ├── signup.js
│   └── login.js
├── 📁 config
│   └── db.js
├── app.js
├── package.json
└── README.md

Installation

1. Clone the repository:

git clone https://github.com/your-username/qr-generator-website.git
cd qr-generator-website
---------------------------------------------------------------------
2. Install dependencies:
   
npm install
---------------------------------------------------------------------
4. Set up PostgreSQL:
   
Create a new PostgreSQL database.
Update the connection details in config/db.js

const { Pool } = require('pg');
const pool = new Pool({
  user: 'your-username',
  host: 'localhost',
  database: 'your-database',
  password: 'your-password',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
---------------------------------------------------------------------
4. Configure Nodemailer:

Update your email service and credentials in the environment variables:
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-password
---------------------------------------------------------------------
5. Start the server

node app.js
---------------------------------------------------------------------
6. Open your browser and visit

http://localhost:3000
----------------------------------------------------------------------

Screenshots

home page
![image](https://github.com/user-attachments/assets/2de59ac9-6ff3-4624-85ab-2c5ad7abc31a)
![image](https://github.com/user-attachments/assets/65b34f80-2e2a-448b-9abf-ed341aacfce7)
![image](https://github.com/user-attachments/assets/191341f6-0d33-4300-a82b-b51d8b56c6f0)

Register page
![image](https://github.com/user-attachments/assets/040586a1-246d-453f-9d86-b7b4d50876b3)

login page
![image](https://github.com/user-attachments/assets/55e8803e-514d-4c56-98e4-0cacbcc8c814)

Generate qr page
![image](https://github.com/user-attachments/assets/69b268b3-dd44-4cc2-99e2-5cc301dcf8ee)
![image](https://github.com/user-attachments/assets/3aaf6ac7-914c-4a9b-9d76-1d36939c3fff)

How It Works

Sign-Up:
Users can sign up with their email and password.
Data is stored securely in the PostgreSQL database.
A welcome email is sent using Nodemailer.

Login:
Registered users can log in to access the QR generator.

QR Code Generation:
Users can input a URL to generate a QR code.
The generated QR code can be downloaded as an image.



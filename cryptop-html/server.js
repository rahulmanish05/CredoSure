const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000; // You can change the port if needed

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like your HTML and CSS)
app.use(express.static('public'));

// POST route to handle form submission
app.post('/send', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Setup Nodemailer transporter
    let transporter = nodemailer.createTransport({
        service: 'gmail', // You can use another email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password',  // Your email password
        }
    });

    // Email options
    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'destination-email@gmail.com', // Destination email
        subject: `New contact form submission from ${name}`,
        text: `You have a new message from:
               Name: ${name}
               Email: ${email}
               Phone: ${phone}
               Message: ${message}`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Something went wrong. Please try again later.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Message sent successfully!');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
git init

import nodemailer from 'nodemailer';

const sendEmailToAllUsers = async (message, users) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        users.forEach(user => {
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                // subject: 'Contest Reminder!',
                subject: 'Just Testing',
                text: message
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log('Error sending email:', error);
                }
                console.log('Email sent:', info.response);
            });

            console.log(`Sending email to ${user.email}: ${message}`);
        });
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendEmailToAllUsers;

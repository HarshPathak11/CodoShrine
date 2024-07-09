import axios from "axios";
import nodemailer from "nodemailer";
// import { User } from "../model/user.model";

// ye to codeChef ka ho gaya if time less than 60min then send email to all users
const getChefContests = async (req, res) => {
    const response = await axios.get(`https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all`);
    const contests = response.data.future_contests;
    console.log(contests[0]);
    const timeOfNextChefContest = new Date(contests[0].contest_start_date);
    const oneHourInMillis = 1 * 60 * 60 * 1000;
    const timeDifference = timeOfNextChefContest - Date.now();
    if (timeDifference > 0 && timeDifference < oneHourInMillis) {
        console.log('Contest starts within the next hour.');
        const message = `The ${contests[0].contest_name} contest on CodeChef starts within the next hour. Good luck!`;
        // const users = await User.find({ "platformProfiles.leetcode.isId": true });
        // console.log(users); ye log kerke check ker lenge ki users ka email hi jae sirf sendmail wale func me
        sendEmailToAllUsers(message, users);
    } else {
        console.log('No contests starting within the next hour.');
    }

    res.status(200).json({ contests: contests });
}

const getLeetContest = async (req, res) => {
    // Extract the weekly contest number
    const contestElement = $('a[href*="/contest/weekly-contest-"]').first();
    const contestUrl = contestElement.attr('href');
    const contestNumberMatch = contestUrl.match(/weekly-contest-(\d+)/);
    console.log(contestNumberMatch[1])

    const getNextSundayAt8AMIST = () => {
        const now = new Date();
        const dayOfWeek = now.getUTCDay();
        const daysUntilSunday = (7 - dayOfWeek) % 7;

        const nextSunday = new Date(now);
        nextSunday.setUTCDate(now.getUTCDate() + daysUntilSunday);
        nextSunday.setUTCHours(2, 30, 0, 0); // 8 AM IST is 2:30 AM UTC

        return nextSunday;
    };

    // Function to check if the contest starts within the next hour
    const checkContestTime = async () => {
        const nextSundayAt8AMIST = getNextSundayAt8AMIST();
        const oneHourInMillis = 1 * 60 * 60 * 1000;
        const timeDifference = nextSundayAt8AMIST - Date.now();

        if (timeDifference > 0 && timeDifference < oneHourInMillis) {
            const message = `The Weekly contest on Leetcode starts within the next hour. Good luck!`;
            const users = await User.find({ "platformProfiles.leetcode.isId": true });
            sendEmailToAllUsers(message, users);
            res.send('The Weekly Contest starts within the next hour.');
        } else {
            res.send('The Weekly Contest does not start within the next hour.');
        }
    };

    checkContestTime();
}


const sendEmailToAllUsers = async (message, users) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: true,
            port: 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        users.forEach(user => {
            let mailOptions = {
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: 'Contest Reminder!',
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


export { getChefContests, getLeetContest };
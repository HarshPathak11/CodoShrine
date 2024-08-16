import axios from 'axios';
import sendEmailToAllUsers from './email.service.js';
import { User } from '../model/user.model.js';

// const maxTime = 1 * 60 * 60 * 1000;
const maxTime = 60 * 60 * 1000;
const minTime = 55 * 60 * 1000; // minimum time difference to send the email

const initialBiweeklyDate = new Date('2024-07-20T20:00:00+05:30'); // 20th July 2024, 8:00 PM IST


const getChefContests = async () => {
    // const response = await axios.get(`https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all`);
    // console.log('CodeChef contests:', JSON.stringify(contests, null, 2));
    const contests = [
        {
            "contest_code": "START148",
            "contest_name": "Starters 148",
            "contest_start_date": "21 Aug 2024  20:00:00",
            "contest_end_date": "21 Aug 2024  22:00:00",
            "contest_start_date_iso": "2024-08-21T20:00:00+05:30",
            "contest_end_date_iso": "2024-08-21T22:00:00+05:30",
            "contest_duration": "120",
            "distinct_users": 0
        }
    ]

    const timeOfNextChefContest = new Date(contests[0].contest_start_date);
    let timeInMilliseconds = timeOfNextChefContest.getTime();
    timeInMilliseconds -= 19800000;
    // console.log("Time of next contest in milliseconds:", timeInMilliseconds);

    const timeToBeSub = Date.now();
    const difference = timeInMilliseconds - timeToBeSub;

    if (difference > minTime && difference < maxTime) {
        // console.log(true);
        // console.log("Sending mail");

        const message = `The ${contests[0].contest_name} contest on CodeChef starts within the next hour. Good luck!`;
        const users = await User.find({});
        await sendEmailToAllUsers(message, users);
    } else {
        console.log('No CodeChef contests starting within the next hour.');
    }

    return contests;
};

const getNextSundayAt8AMIST = () => {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;

    const nextSunday = new Date(now);
    nextSunday.setUTCDate(now.getUTCDate() + daysUntilSunday);
    nextSunday.setUTCHours(2, 30, 0, 0); // 8 AM IST is 2:30 AM UTC

    return nextSunday;
};

const getNextBiweeklyAt8PMIST = (startDate) => {
    const now = new Date();
    let nextBiweeklyDate = new Date(startDate);

    while (nextBiweeklyDate <= now) {
        nextBiweeklyDate.setUTCDate(nextBiweeklyDate.getUTCDate() + 14); // Add 14 days for biweekly interval
    }

    nextBiweeklyDate.setUTCHours(14, 30, 0, 0); // 8 PM IST is 2:30 PM UTC

    return nextBiweeklyDate;
};

const getLeetContest = async () => {
    try {
        const nextSundayAt8AMIST = getNextSundayAt8AMIST();
        // const nextSundayAt8AMIST = "2024-07-19T00:10:00.000Z";
        const formattedSundayDate = nextSundayAt8AMIST.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        }).replace(',', '');
        // console.log("sunday time of leetcode", formattedSundayDate);

        const timeOfNextWeekly = new Date(formattedSundayDate);
        let timeInMilliseconds = timeOfNextWeekly.getTime();
        timeInMilliseconds -= 19800000;
        // console.log("Time of next Weekly in milliseconds:", timeInMilliseconds);

        const timeToBeSub = Date.now();
        const difference = timeInMilliseconds - timeToBeSub;

        // // Difference in minutes
        const differenceInMinutes = difference / (1000 * 60);
        // console.log("Difference in milliseconds:", difference);
        // console.log("Difference in minutes:", differenceInMinutes);

        if (difference > minTime && difference < maxTime) {
            // console.log(true);
            // console.log("sending mail")
        } else {
            // console.log(false);
        }

        if (difference >= minTime && difference <= maxTime) {
            const message = `The Weekly contest on LeetCode starts within the next hour. Good luck!`;
            const users = await User.find({ "platformProfiles.leetcode.isId": true });
            await sendEmailToAllUsers(message, users);
        } else {
            console.log('No LeetCode weekly contests starting within the next hour.');
        }

        const nextBiweeklyAt8PMIST = getNextBiweeklyAt8PMIST(initialBiweeklyDate);
        const formattedSaturdayDate = nextBiweeklyAt8PMIST.toLocaleString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'Asia/Kolkata'
        }).replace(',', '');
        // console.log("saturday time of leetcode", formattedSaturdayDate);

        const timeOfNextBiweekly = new Date(formattedSaturdayDate);
        let timeInMillisecondsBi = timeOfNextBiweekly.getTime();
        timeInMillisecondsBi -= 19800000;
        // console.log("Time of next Weekly in milliseconds:", timeInMilliseconds);

        const differenceBi = timeInMillisecondsBi - timeToBeSub;

        // // Difference in minutes
        const differenceInMinutesBi = differenceBi / (1000 * 60);
        // console.log("Difference Bi in milliseconds:", differenceBi);
        // console.log("Difference Bi in minutes:", differenceInMinutesBi);

        if (differenceBi > minTime && differenceBi < maxTime) {
            // console.log(true, " Bi");
            // console.log("sending mail")
        } else {
            // console.log(false, " Bi");
        }

        if (differenceBi >= minTime && differenceBi <= maxTime) {
            const message = `The Biweekly contest on LeetCode starts within the next hour. Good luck!`;
            const users = await User.find({});
            await sendEmailToAllUsers(message, users);
        } else {
            console.log('No LeetCode biweekly contests starting within the next hour.');
        }

        //to change time formate to look good and can be understandable

        const formatDate = (date) => {
            return date.toLocaleString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(',', '');
        };

        const contests = [
            {
                contest_name: 'Weekly Contest',
                contest_start_date: formatDate(nextSundayAt8AMIST),
            },
            {
                contest_name: 'Biweekly Contest',
                contest_start_date: formatDate(nextBiweeklyAt8PMIST),
            },
        ];

        return contests;
    } catch (error) {
        console.error('Error fetching LeetCode contests:', error);
        throw error;
    }
};


export { getChefContests, getLeetContest };

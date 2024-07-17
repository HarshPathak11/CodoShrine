import axios from 'axios';
import sendEmailToAllUsers from './email.service.js';
import { User } from '../model/user.model.js';

const oneHourInMillis = 1 * 60 * 60 * 1000;
const maxTime = 35 * 60 * 1000;
const minTime = 30 * 60 * 1000; // minimum time difference to send the email

const initialBiweeklyDate = new Date('2024-07-20T20:00:00+05:30'); // 20th July 2024, 8:00 PM IST


const getChefContests = async () => {
    // const response = await axios.get(`https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all`);
    // const contests = response.data.future_contests;
    const contests = [
        {
            contest_code: 'START144',
            contest_name: 'Starters 144 ',
            contest_start_date: '17 Jul 2024  23:50:00',
            contest_end_date: '24 Jul 2024  22:00:00',
            contest_start_date_iso: '2024-07-24T20:00:00+05:30',
            contest_end_date_iso: '2024-07-24T22:00:00+05:30',
            contest_duration: '120',
            distinct_users: 0
        }
    ]
    // console.log('CodeChef contests:', contests);
    // Convert contest start date from IST to SGT
    const timeOfNextChefContestIST = new Date(contests[0].contest_start_date_iso);
    const timeDifferenceISTToSGT = 2.5 * 60 * 60 * 1000; // 2.5 hours in milliseconds
    const timeOfNextChefContestSGT = new Date(timeOfNextChefContestIST.getTime() + timeDifferenceISTToSGT);

    console.log('Contest start time in SGT:', timeOfNextChefContestSGT);
    console.log('Current time in SGT:', new Date());

    const timeDifference = timeOfNextChefContestSGT - Date.now();
    console.log('Time difference:', timeDifference);

    if (timeDifference > minTime && timeDifference < maxTime) {
        console.log(true);
    } else {
        console.log(false);
    }

    if (timeDifference >= minTime && timeDifference <= maxTime) {
        // const message = `The ${contests[0].contest_name} contest on CodeChef starts within the next hour. Good luck!`;
        const message = `testing sorry for bothering you!`;
        const users = await User.find({ "platformProfiles.codechef.isId": true });
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
        const nextBiweeklyAt8PMIST = getNextBiweeklyAt8PMIST(initialBiweeklyDate);

        const weeklyTimeDifference = nextSundayAt8AMIST - Date.now();
        const biweeklyTimeDifference = nextBiweeklyAt8PMIST - Date.now();

        if (weeklyTimeDifference > maxTime && weeklyTimeDifference < oneHourInMillis) {
            const message = `The Weekly contest on LeetCode starts within the next hour. Good luck!`;
            const users = await User.find({ "platformProfiles.leetcode.isId": true });
            await sendEmailToAllUsers(message, users);
        } else {
            console.log('No LeetCode weekly contests starting within the next hour.');
        }

        if (biweeklyTimeDifference > maxTime && biweeklyTimeDifference < oneHourInMillis) {
            const message = `The Biweekly contest on LeetCode starts within the next hour. Good luck!`;
            const users = await User.find({ "platformProfiles.leetcode.isId": true });
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

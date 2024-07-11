import axios from 'axios';
import sendEmailToAllUsers from './email.service.js';
import { User } from '../model/user.model.js';

const oneHourInMillis = 1 * 60 * 60 * 1000;

const initialBiweeklyDate = new Date('2024-07-20T20:00:00+05:30'); // 20th July 2024, 8:00 PM IST


const getChefContests = async () => {
    const response = await axios.get(`https://www.codechef.com/api/list/contests/all?sort_by=START&sorting_order=asc&offset=0&mode=all`);
    const contests = response.data.future_contests;
    const timeOfNextChefContest = new Date(contests[0].contest_start_date);
    const timeDifference = timeOfNextChefContest - Date.now();

    if (timeDifference > 0 && timeDifference < oneHourInMillis) {
        const message = `The ${contests[0].contest_name} contest on CodeChef starts within the next hour. Good luck!`;
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

        if (weeklyTimeDifference > 0 && weeklyTimeDifference < oneHourInMillis) {
            const message = `The Weekly contest on LeetCode starts within the next hour. Good luck!`;
            const users = await User.find({ "platformProfiles.leetcode.isId": true });
            await sendEmailToAllUsers(message, users);
        } else {
            console.log('No LeetCode weekly contests starting within the next hour.');
        }

        if (biweeklyTimeDifference > 0 && biweeklyTimeDifference < oneHourInMillis) {
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
import schedule from 'node-schedule';
import { getChefContests, getLeetContest } from '../services/contest.service.js';

const scheduleJobs = () => {
    schedule.scheduleJob('*/3 * * * *', async () => {
        console.log('Checking for upcoming contests...');
        await getChefContests();
        await getLeetContest();
    });
};

export default scheduleJobs;
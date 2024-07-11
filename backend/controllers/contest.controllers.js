import { getChefContests, getLeetContest } from "../services/contest.service.js";

const checkContests = async (req, res) => {
    try {
        const chefContests = await getChefContests();
        const leetContests = await getLeetContest();

        const contests = {
            codechef: chefContests,
            leetcode: leetContests,
        };

        res.status(200).json(contests);
    } catch (error) {
        res.status(500).send('Error checking contests');
    }
};

export default checkContests;
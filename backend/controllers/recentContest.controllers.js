import axios from "axios";
import { User } from "../model/user.model.js";

const getRecentContests = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.find({ username });
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        console.log(user)
        const recentContests = {
            leetcode: [],
            codechef: []
        };
        // get recent contests from chef
        if (user[0].platformProfiles.codechef.isId) {
            const platUserID = user[0].platformProfiles.codechef.platid;
            console.log(platUserID);
            const response = await axios.get(`https://codechef-api.vercel.app/${platUserID}`);
            const responseArr = response.data.ratingData;
            const length = responseArr.length;
            const correctArr = responseArr.slice(length - 5, length);
            console.log(correctArr);
            recentContests.codechef = correctArr;
            //uncomment next line if want to get reverse response
            // const correctArr = responseArr.slice(length-5, length).reverse();
        }

        // get recent contests from leetcode
        if (user[0].platformProfiles.leetcode.isId) {
            const platUserID = user[0].platformProfiles.leetcode.platid;
            const response = await axios.get(`https://alfa-leetcode-api.onrender.com/${platUserID}/contest`);
            const responseArr = response.data.contestParticipation;
            // console.log(responseArr)
            const length = responseArr.length;
            if(length>5){
                const correctArr = responseArr.slice(length - 5, length);
                recentContests.leetcode = correctArr;
            }else{
                recentContests.leetcode = responseArr;
            }
            //uncomment next line if want to get reverse response
            // const correctArr = responseArr.slice(length-5, length).reverse();
        }
        res.status(200).json(recentContests);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
}

export default getRecentContests;
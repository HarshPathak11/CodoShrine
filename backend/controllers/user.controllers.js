import { User } from "../model/user.model.js"
import axios from 'axios';
import cheerio from 'cheerio';
import fakeData from "../Data.js";


const userLogUp = async (req, res) => {
  const { username, email, password } = req.body
  if (!username || username === "")
    res.status(400).json({ "message": "Username is required" })
  if (!email || email === "")
    res.status(400).json({ "message": "Email is required" })
  if (!password || password === "")
    res.status(400).json({ "message": "Password is required" })

  const preuser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if (preuser) {
    res.status(400).json({ "message": "Username or email already taken" })
  }
  const user = await User.create({
    username: username,
    email: email,
    password: password
  })
  const createdUser = await User.findById(user._id).select(
    "--password --refreshToken"
  )
  if (!createdUser)
    throw new ApiError(500, "something went wrong while registering hte user")

  console.log(createdUser)
  return res.status(201).json(
    new ApiResponse(200, "User Registerd Successfully")
  )
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || email === "")
    res.status(400).json({ "message": "Email is required" })
  if (!password || password === "")
    res.status(400).json({ "message": "Password is required" })

  const user = User.findOne({
    $or: [{ email }]
  })

  if (!user)
    res.status(400).json({ "message": "Error could not find emailID" })

  const isPasswordOk = await user.isPasswordCorrect(password)
  if (!isPasswordOk)
    res.status(400).json({ "message": "Password Incorrect!" })
  res.status(200).json({ "message": "user logged in" })

}

// const getLeetData=async (req,res)=>{
//     const {username}=req.body
//     let data={}
//     let data2={}
//     const response= await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`,{
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json' // Corrected header name
//         }
//     })
//     if(response.ok)
//     {data=await response.json();
//      console.log(data)
//     }

//     const response2= await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`,{
//         method: 'GET',
//       headers: {
//         'Content-Type': 'application/json' // Corrected header name
//       }
//     })
//     if(response2.ok)
//        { data2=await response2.json();
//         console.log(data2)}


//      return res.status(200).json({"totalQuestionSolved":data.solvedProblems})
//     }
// const getLeetData = (req, res) => {
//   const { username } = req.body;
//   let data = {};
//   let data2 = {};

//   fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         // Handle error here (e.g., return an error response)
//       }
//     })
//     .then(fetchedData => {
//       data = fetchedData;
//       // console.log(data);
//       return fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
//     })
//     .then(response2 => {
//       if (response2.ok) {
//         return response2.json();
//       } else {
//         // Handle error here (e.g., return an error response)
//       }
//     })
//     .then(fetchedData2 => {
//       data2 = fetchedData2;
//       // console.log(data2);
//       const combinedData = { totalQuestionSolved: data.solvedProblem, ...data2 };
//       return res.status(200).json(combinedData);
//     })
//     .catch(error => {
//       console.error('Error fetching LeetCode data:', error);
//       // Return an error response or handle the error differently
//     });
// };

const getPlatformUserData = async (req, res) => {
  const userResponseData = {
    leetcode: {
      totalQuestionSolved: 0,
      totalContestsParticipated: 0,
      contestRating: 0
    },
    codechef: {
      totalQuestionSolved: 0,
      totalContestsParticipated: 0,
      highestRating: 0
    }
  };

  // Accessing the username of this user for different platforms
  const leetData = fakeData.platformProfiles["leetcode"];
  const chefData = fakeData.platformProfiles["codechef"];

  try {
    if (leetData.isId) {
      const username = leetData.username;

      const solvedResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (solvedResponse.ok) {
        const solvedData = await solvedResponse.json();
        userResponseData.leetcode.totalQuestionSolved = solvedData.solvedProblem;

        const contestResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (contestResponse.ok) {
          const contestData = await contestResponse.json();
          console.log(contestData.contestRating)
          userResponseData.leetcode.totalContestsParticipated = contestData.contestAttend;
          userResponseData.leetcode.contestRating = contestData.contestRating;
        } else {
          console.error('Error fetching contest data');
        }
      } else {
        console.error('Error fetching solved problems data');
      }
    }

    if (chefData.isId) {
      const getChefData = async () => {
        try {
          const username = chefData.username;
          const { data } = await axios.get(`https://www.codechef.com/users/${username}`);
          const $ = cheerio.load(data);

          const highestRating = $('small').filter(function () {
            return $(this).text().includes('Highest Rating');
          }).text().match(/\d+/)[0];

          const contestsParticipated = $('.contest-participated-count b').text().trim();
          const totalProblemsSolved = $('h3').filter(function () {
            return $(this).text().includes('Total Problems Solved');
          }).text().match(/\d+/)[0];

          userResponseData.codechef.totalQuestionSolved = parseInt(totalProblemsSolved);
          userResponseData.codechef.totalContestsParticipated = parseInt(contestsParticipated);
          userResponseData.codechef.highestRating = parseInt(highestRating);
        } catch (error) {
          console.error('Error fetching Chef data:', error);
        }
      };

      await getChefData();
    }

    return res.status(200).json(userResponseData);
  } catch (error) {
    console.error('Error fetching platform data:', error);
    return res.status(500).json({ error: 'An error occurred while fetching platform data' });
  }
};

export { userLogUp, userLogin, getPlatformUserData }





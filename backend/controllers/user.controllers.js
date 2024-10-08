import { User } from "../model/user.model.js"
import axios from 'axios';
import cheerio from 'cheerio';
import fakeData from "../Data.js";


const userLogUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || username === "")
      return res.status(400).json({ "message": "Username is required" });
    if (!email || email === "")
      return res.status(400).json({ "message": "Email is required" });
    if (!password || password === "")
      return res.status(400).json({ "message": "Password is required" });

    // Check if the username or email already exists
    const preuser = await User.findOne({
      $or: [{ username }, { email }]
    });

    if (preuser) {
      return res.status(400).json({ "message": "Username or email already taken" });
    }

    // Attempt to create a new user
    const user = await User.create({
      username: username,
      email: email,
      password: password
    });

    // Fetch and return the created user without password
    const createdUser = await User.findById(user._id).select("--password --refreshToken");

    if (!createdUser)
      return res.status(500).json({ "message": "Could not create user" });

    return res.status(201).json(createdUser);

  } catch (error) {
    console.error(error);

    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ "message": "Username or email already taken" });
    }

    // Handle other errors
    return res.status(500).json({ "message": "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body
  if (!email || email === "")
    res.status(400).json({ "message": "Email is required" })
  if (!password || password === "")
    res.status(400).json({ "message": "Password is required" })

  const user = await User.findOne({
    email: email
  })

  if (!user)
    res.status(400).json({ "message": "Error could not find emailID" })
  if (user) {
    const isPasswordOk = await user.isPasswordCorrect(password)
    if (!isPasswordOk)
      res.status(400).json({ "message": "Password Incorrect!" })
    res.status(200).json(user)
  }
};


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
  const { username } = req.body
  const userResponseData = {
    leetcode: {
      totalQuestionSolved: 0,
      totalContestsParticipated: 0,
      contestRating: 0
    },
    codechef: {
      totalQuestionSolved: 0,
      totalContestsParticipated: 0,
      contestRating: 0
    }
  };

  const user = await User.findOne({ username: username })
  if (!user)
    res.status(500).json({ "message": "Something went wrong" })

  console.log(user)

  // Accessing the username of this user for different platforms
  let leetData = user.platformProfiles.leetcode;
  let chefData = user.platformProfiles.codechef;

  // console.log(leetData)
  // console.log(chefData)

  if (leetData === undefined)
    leetData = { isId: false }
  if (chefData === undefined)
    chefData = { isId: false }

  try {
    if (leetData.isId) {
      const username = leetData.platid;

      const solvedResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (solvedResponse.ok) {
        const solvedData = await solvedResponse.json();
        // console.log(solvedData)
        if (solvedData.solvedProblem) {
          userResponseData.leetcode.totalQuestionSolved = solvedData.solvedProblem;
        } else {
          userResponseData.leetcode.totalQuestionSolved = 0;
        }

        const contestResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (contestResponse.ok) {
          const contestData = await contestResponse.json();
          if (contestData.contestParticipation.length) {
            userResponseData.leetcode.contestRating = contestData.contestRating;
            userResponseData.leetcode.totalContestsParticipated = contestData.contestAttend;
          } else {
            userResponseData.leetcode.contestRating = 0;
            userResponseData.leetcode.totalContestsParticipated = 0;
          }
        } else {
          console.error('Error fetching contest data');
        }
      } else {
        console.error('Error fetching solved problems data');
      }
    }
    // console.log(userResponseData)

    if (chefData.isId) {
      const getChefData = async () => {
        try {
          const username = chefData.platid;
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
          userResponseData.codechef.contestRating = parseInt(highestRating);
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


const addProfile = async (req, res) => {
  const { username, platform, platid } = req.body
  if (!username || !platform || !platid)
    res.status(400).json({ "message": "Did not receive all credentials" })

  const user = await User.findOneAndUpdate(
    { username: username },
    {
      $set: {
        [`platformProfiles.${platform}`]: {
          platid,
          isId: true
        }
      }
    },
    { new: true } // Return the updated user
  );
  // console.log(user)
  if (!user)
    res.status(500).json({ "message": "something went wrong" })
  res.status(200).json({ "message": "profile added successfully" })
}


const addLinks = async (req, res) => {
  const { username, insta, github, linkedIn } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with social media links if provided
    if (insta) {
      user.insta = insta;
    }
    if (github) {
      user.github = github;
    }
    if (linkedIn) {
      user.linkedIn = linkedIn;
    }

    // Save the updated user
    await user.save();

    // Respond with success message
    res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error adding links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addAbout = async (req, res) => {
  const { username, about } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user with social media links if provided
    if (about) {
      user.about = about;
    }

    // Save the updated user
    await user.save();

    // Respond with success message
    res.status(200).json({ user: user });
  } catch (error) {
    console.error("Error adding links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAbout = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user's about
    res.status(200).json({ about: user.about });
  } catch (error) {
    console.error("Error fetching about:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getLinks = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user's social media links
    res.status(200).json({ insta: user.insta, github: user.github, linkedIn: user.linkedIn });
  } catch (error) {
    console.error("Error fetching links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const getUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    // Find the user by username
    const user = await User.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user's social media links
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export { userLogUp, userLogin, getPlatformUserData, addProfile, addLinks, addAbout, getAbout, getLinks, getUser }





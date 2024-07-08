import { User } from "../model/user.model.js"

const userLogUp= async (req,res)=>{
    const {username,email,password}=req.body
    if(!username || username==="")
    res.status(400).json({"message":"Username is required"})
    if(!email || email==="")
    res.status(400).json({"message":"Email is required"})
    if(!password || password==="")
    res.status(400).json({"message":"Password is required"})

    const preuser=await User.findOne({
        $or:[{username},{email}]
})
    if(preuser){
        res.status(400).json({"message":"Username or email already taken"})
    }
    const user= await User.create({
        username:username,
        email:email,
        password:password
    })
    const createdUser= await User.findById(user._id).select(
        "--password --refreshToken"
     )
     if(!createdUser)
     throw new ApiError(500,"something went wrong while registering hte user")
     
     console.log(createdUser)
     return res.status(201).json(
        new ApiResponse(200,"User Registerd Successfully")
     )
}

const userLogin=async(req,res)=>{
    const {email, password}=req.body
    if(!email || email==="")
    res.status(400).json({"message":"Email is required"})
    if(!password || password==="")
    res.status(400).json({"message":"Password is required"})

    const user=User.findOne({
        $or:[{email}]
    })

    if(!user)
    res.status(400).json({"message":"Error could not find emailID"})

    const isPasswordOk= await user.isPasswordCorrect(password)
    if(!isPasswordOk)
        res.status(400).json({"message":"Password Incorrect!"})
    res.status(200).json({"message":"user logged in"})

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
const getLeetData = (req, res) => {
    const { username } = req.body;
    let data = {};
    let data2 = {};
  
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          // Handle error here (e.g., return an error response)
        }
      })
      .then(fetchedData => {
        data = fetchedData;
        // console.log(data);
        return fetch(`https://alfa-leetcode-api.onrender.com/${username}/contest`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
      })
      .then(response2 => {
        if (response2.ok) {
          return response2.json();
        } else {
          // Handle error here (e.g., return an error response)
        }
      })
      .then(fetchedData2 => {
        data2 = fetchedData2;
        // console.log(data2);
        const combinedData = { totalQuestionSolved: data.solvedProblem, ...data2 };
        return res.status(200).json(combinedData);
      })
      .catch(error => {
        console.error('Error fetching LeetCode data:', error);
        // Return an error response or handle the error differently
      });
  };


export {userLogUp,userLogin,getLeetData}
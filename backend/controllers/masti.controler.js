import { User } from "../model/user.model.js";


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getAllUsers };
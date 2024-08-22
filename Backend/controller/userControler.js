import User from "../models/userModel.js";

export const register = async (req,res) => {
    // Implement registration logic here
    try{
    const {username,email,password}=req.body;

    // Save user data to the database
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({msg: 'Email already exists'});
    }
    
    const newUser = new User({username,email,password})
    await newUser.save();
    res.status(200).send(newUser)
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
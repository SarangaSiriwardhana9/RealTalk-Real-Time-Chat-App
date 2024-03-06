import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';


export const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password does not match" });
        }
        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exists" });
        }
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //https://avatar.iran.liara.run/public/boy?username=Scott
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
        });

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });

    } catch (error) {
        console.log(error.message, "error in signup controller");
        res.status(500).json({ message: "Something went wrong" });

    }
}

export const login = (req, res) => {
    res.send('Login User');
    }

export const logout = (req, res) => {
    res.send('Logout User');
    }


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/users';
import {registerValidation, loginValidation} from '../validation'

exports.registerUser = async function (req, res) {
    //validating the data received before creating a new user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists');

    //HASH THE PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create  a new user
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.status(200).send({savedUser}); //returning the user
    } catch (err) {
        res.status(400).send(err);
    }
};

exports.loginUser = async function (req, res) {
    //validating the data received before creating a new user
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the email exists
    const user = await User.findOne({ email: req.body.email }); //getting the user already stored in the database
    if (!user) return res.status(400).send('Email is not found');

    //Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);  //adding our token to the header when a user login

    //res.send("logged in");
}

// getting a user with all todo list created by him
exports.getUser = async function (req, res) {
    try {
         await User.findOne({ _id: req.params.userId })
            .populate('todoList')
             .then(function(User) {
                res.json(User);
        })
    } catch (err) {
        res.status(500).json({ message: err });
    }
}

exports.getAllUser = async function (req, res) {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({message: err})
    }
}
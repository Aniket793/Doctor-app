const userModel = require('../Model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const loginController = async(req,res) => {
    try{
        const User = await userModel.findOne({email:req.body.email});
        if(!User){
            return res.status(200).send({message:"user not found"})
        }
        const passMatch = await bcrypt.compare(req.body.password,User.password)
        if(!passMatch){
            return res.status(200).send({message:"invalid email or password",success : false})
        }

        const token = jwt.sign({id:User._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.status(200).send({message:'Login success',success : true,token})
    }catch(err){
        console.log(err);
        res.status(500).send({message:`error in login ctrl ${err.message}`})
    }
};

const signupController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).send({ message: "User already exists", success: false });
        }

        const password = req.body.password;

        // Check if password is present and is a non-empty string
        if (!password || typeof password !== 'string' || password.trim() === '') {
            return res.status(400).send({ success: false, message: 'Invalid password' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update the password in req.body with the hashed password
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(200).send({ message: 'User created successfully', success: true });

    } catch (err) {
        console.error(err);
        res.status(500).send({ success: false, message: `Register controller ${err.message}` });
    }
};

const authCtrl = async(req,res) => {
    try{
        const user = await userModel.findOne({_id:req.body.UserId});
        if(!user){
            return res.status(200).send({message:"user does not exist",success:false}) 
        }
        else{
            res.status(200).send({
                success:true ,
                data:{
                    name:user.name,
                    email:user.email
                }})
        }
        
    }catch(err){
        console.log(err);
        res.status(500).send({message:"auth error",success:false})

    }
}



module.exports = { loginController, signupController,authCtrl };

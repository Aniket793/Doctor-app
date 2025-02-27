const jwt = require('jsonwebtoken')

module.exports = async (req,res,next) => {
   try{
    const token = req.headers['authorization'].split(" ")[1];
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(200).send({message:"authentication failed",success:false});
        }
        else{
           req.body.UserId = decode.id;
           next(); 
        }
    })
   }catch(err){
    console.log(err);
    res.status(500).send({message:"something went wrong",success:false})
   }

}
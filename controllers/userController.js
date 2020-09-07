const User = require('../model/user')

module.exports.create = async (req,res)=>{
    try{
        console.log(req.body)
        const user = await new User({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        })
        await user.save()
        res.status(201).send({user})
    } catch(e){
        console.log('Error in Create API: ',e)
        if(e.code = 11000){
            res.status(400).send({message:'USE ANOTHER EMAIL'})
        }
    }
}


module.exports.login = async (req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        res.send({user})
    } catch(e){
        console.log('Error In Login API: ',e)
        res.status(400).send({message:'UNABLE TO LOGIN'})
    }
}


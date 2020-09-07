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
        if(e.code = 11000){
            res.status(400).send()
        }
    }
}


import User from "../../models/User.model.js";
import BlogPost from '../../models/BlogPost.model.js'
const getUser = async (req,res) => {
    const {id} = req.params
    try{
        const user = await User.findById(id).select("-password -_id -otp -otpExpiry -otpSecret -encryptedTokenIv").populate("posts")
        if(!user)return res.status(404).json({message:"User not found"})
        res.status(200).json({
            message:"User found",
            user
        })
    }catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error",error:error?.message})
    }
}
const updateUser = async (req,res) => {
    const {id} = req.params
    try{
        const user = await User.findByIdAndUpdate(id,req.body)
        if(!user)return res.status(404).json({message:"User not found"})
        res.status(200).json({
            message:"User updated",
        })
    }catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error",error:error?.message})
    }
}
const deleteUser = async (req,res)=>{
    const {id} = req.params
    try{
      await User.findByIdAndDelete(id)
        res.status(200).json({
            message:"User deleted",
        })
    }catch (error) {
        console.error(error)
        res.status(500).json({message:"Internal server error",error:error?.message})
    }
}

export {getUser,updateUser,deleteUser}
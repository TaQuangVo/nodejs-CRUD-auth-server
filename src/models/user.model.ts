import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "config"

export interface UserDocument extends mongoose.Document {
    email:string,
    name:string,
    password:string,
    createdAt:Date,
    updatedAt: Date,
    comparePassword(canditatePassword:string):Promise<boolean>
}

const userSchema = new mongoose.Schema({
    email:{type:String, required: true, unique:true},
    name: {type:String, required: true},
    password: {type: String, required: true}
},{
    timestamps: true
})

userSchema.pre("save", async function(next){
    const user = this as UserDocument

    if(!user.isModified("password")){
        next()
    }

    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"))

    const hash = await bcrypt.hashSync(user.password, salt)

    user.password = hash
})

userSchema.methods.comparePassword = async function(canditatePassword: string):Promise<boolean>{
    const user = this as UserDocument

    return bcrypt.compare(canditatePassword, user.password).catch(e=> false)
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel
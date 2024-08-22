import mongoose from "mongoose";

const {Schema} = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min:3,
        set: (v) => v.toLowerCase()
    },
    email:{
        type: String,
        required: true,
        unique: true,
        set: (v) => v.toLowerCase(),
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: {
        type: String,
        required: true,
        min:8,
        set: (v) => v.toLowerCase()
    },
    // chatroom: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Chatroom'
    // },
    // friends: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // }]
},{
    timestamps:true,
  }
)
const User = mongoose.model('User', userSchema);
export default User;
import mongoose from 'mongoose';
const {Schema} =mongoose;

const userSchema=new Schema({

    Email: {type : String , required : true},
    Password:{type : String , required : true , minlength:8},
    Role: {type : String , required : true }

},
    {timestamps:true}
    );

    const User = mongoose.model('User',userSchema);

    export default User;
import mongoose from 'mongoose';
const {Schema} =mongoose;

const interestSchema=new Schema({

    Name: {type : String , required : true}

},
    {timestamps:true}
    );

    const Interest = mongoose.model('Interest',interestSchema);

    export default Interest;
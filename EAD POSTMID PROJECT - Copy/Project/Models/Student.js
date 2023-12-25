import mongoose from 'mongoose';
const {Schema} =mongoose;

const studentSchema=new Schema({
    FullName: { type : String , required : true },
    RollNo: { type : String , required : true },
    EmailAddress: { type : String , required : true },
    Gender: { type : String , enum: ['Male', 'Female'], required : true },
    DOB: { type : Date , required : true},
    City: { type : String , required : true},
    Interest: { type : mongoose.Schema.Types.ObjectId, ref : 'Interest' , required : true },
    Department: { type : String , required : true},
    DegreeTitle: {type : String , required : true},
    Subject: {type : String , required : true},
    StartDate: {type : String , required : true},
    EndDate: {type : String , required : true}



 
},
{timestamps:true}
);

const Student = mongoose.model('Student', studentSchema);

export default Student;
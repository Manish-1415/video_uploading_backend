import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        fullname : {
            type : String,
            required : true,
            trim : true,
        },

        email : {
            type : String,
            trim : true,
            unique : true,
            index : true,
            required : true,
            lowercase : true,
        },

        password : {
            type : String,
            required : true,
        },

        avatar : {
            public_id : {type : String},
            url : {type : String},
        },

        role : {
            type : String,
            enum : ["user" , "admin"],
            default : "user",
        },

        refreshToken : {
            type : String,
        }
    },

    { timestamps : true }
);


userSchema.pre("save" , async function(next) {
    if(!this.isModified("password")) return next(); // if pass is not modifying it means it is created
    // this will run on both , registering & on updating pass cause this !isModified will return false on both cases , like when we create & when we update pass so we will fall on this next step.
    this.password = await bcrypt.hash(this.password , 10);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password , this.password); // it will return boolean val
}

export const User = mongoose.model("User", userSchema);
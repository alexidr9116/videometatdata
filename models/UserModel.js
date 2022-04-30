const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
    mobile: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        default: "",
    },

});
class UserClass {
    static async findByAny(any) {
        const data = await this.findOne({$or:[{mobile:any},{username:any},{email:any}]});
        return data;
    }
    
}
UserSchema.loadClass(UserClass);
const Users = mongoose.model("User", UserSchema);
module.exports = Users;

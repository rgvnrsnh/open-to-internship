const mongoose = require("mongoose");

const college = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        fullName: {
            type: String,
            required: true
        },
        logoLink: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }
);

const intern = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase:true
        },
        mobile: {
            type: Number,
            required: true,
            unique: true,
            min: 10,
        },
        collegeId: {
            type: String,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false
        }
    }
);

const College = new mongoose.model("College", college);
const Intern = new mongoose.model("Intern", intern);

module.exports = { College, Intern };
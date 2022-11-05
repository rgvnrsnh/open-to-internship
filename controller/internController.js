const mongoose = require("mongoose");
const { College, Intern } = require("../models/schemas");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isemail");

const isValidRequest = function (data) {
    return Object.keys(data).length > 0;
};


const collegeInterns = async function (req, res) {
    try {
        const data = req.body;
        const { name, email, mobile, collegeId, isDeleted } = data;
    
        if (!isValidRequest(data)) {
            return res.status(400).send({
                status: false,
                message: "provide valid intern details"
            });
        };

        var regEx = /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/;
        if (!regEx.test(name)) {
            return res.status(400).send({
                status: false,
                message: "invalid or missing intern name"
            });
        };
        
        if (!validator.isEmail(email)) {
            return res.status(400).send({
                status: false,
                message: "invalid or missing intern email"
            });
        };
        
        if (!mobile) {
            return res.status(400).send({
                status: false,
                message: "invalid or missing intern mobile no."
            });
        };   
        
        if(!mongoose.isValidObjectId(collegeId)){
            return res.status(400).send({
                status: false,
                message: "invalid or missing collegeId"
            });
        }; 
        
        const collegedetails = await College.findOne({ _id: collegeId });
        
        if (!collegedetails) {
            return res.status(400).send({
                status: false,
                message: "no such college exists in database"
            });
        }
        
        if(isDeleted){
            return res.status(400).send({
                status: false,
                message: "isDeleted can't be true while initialisation"
            });
        }; 
        
        const internData = await Intern.findOne({ email: email });
    
        if (internData) {
            return res.status(400).send({
                status: false,
                message: "Intern already present in Database"
            });
        };
        
        const internCreated = await Intern.create(data);

        res.status(201).send({
            status: true,
            message: "Intern data saved successfully",
            data:internCreated
        });

    }
    catch (err) {
        res.status(503).send({
            message: err.message,
            error: err
        });
    };
}



module.exports.collegeInterns = collegeInterns;
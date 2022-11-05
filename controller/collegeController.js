const { College, Intern } = require("../models/schemas");
const validator = require("validator");
const mongoose = require("mongoose");

const isValidRequest = function (data) {
    return Object.keys(data).length > 0;
};

const createCollege = async function (req, res) {
     try {
         const data = req.body;
         const { name, fullName, logoLink} = data;

         if (!isValidRequest(data)) {
             return res.status(400).send({
                 status: false,
                 message: "provide valid college details"
             });
         };

         var regEx = /^[a-zA-Z\-]+$/;
         if (!regEx.test(name)) {
             return res.status(400).send({
                 status: false,
                 message: "invalid or missing college name"
             });
         };

         regEx = /[a-z]+/;
         if (!regEx.test(fullName)) {
             return res.status(400).send({
                 status: false,
                 message: "invalid or missing fullCollege name"
             });
         };

         regEx = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
         if (!regEx.test(logoLink)) {
             return res.status(400).send({
                 status: false,
                 message: "invalid or missing logolink"
             });
         };

         const collegeCheck = await College.findOne({ name: name });
         if (collegeCheck) {
             return res.status(400).send({
                 status: false,
                 message: "college already exists in database"
             });
         };

         const createdCollege = await College.create(data);

         return res.status(203).send({
             status: true,
             message: "college saved in database successfully",
             data:createdCollege
         }); 
     }
     catch (error) {
         res.status(503).send({
             err: error.message,
         });
    };
}

const getCollegeDetails = async function (req, res) {
    try {
        
    }
    catch (err) {
        res.status(503).send({
            message:err.message,
            error: err
        })    
    }
}

const collegeDetails = async function (req, res) {
    try {
        
        const { collegeName } = req.params;

        const collegedata = await College.findOne({ name: collegeName });
        
        if (!collegedata) {
            res.status(400).send({
                status: false,
                message: "invalid college name or such college not exists in database"
            });
        };

        console.log(collegedata);
        const collegeid = collegedata._id;

        const internsdata = await Intern.find({ collegeId: collegeid });

        if (!internsdata) {
            res.status(203).send({
                status: true,
                collegedetails: collegedata,
                interns: `no interns from ${collegeName} college`
            });
        }
        else {
            res.status(203).send({
                status: true,
                collegedetails: collegedata,
                interns: internsdata
            });
        }

    }
    catch (err) {
        res.status(503).send({
            message: err.message,
            error:err
        })
    }
}
    
module.exports.createCollege = createCollege;   
module.exports.CollegeDetails = collegeDetails;   
        
    




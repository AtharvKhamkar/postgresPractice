const pool = require("../../db");
const queries = require("./queries");

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById,[id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    })
}

const addStudent = (req, res) => {
    const { id,name, email, age, dob } = req.body;

    //check if email is already exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) throw error;
        if (results.rows.length) {
            res.send("Email already exists");
        }

        pool.query(queries.addStudent, [id,name, email, age, dob], (error, results) => {
            if (error) throw error;
            
            res.status(200).json("Student added successfully");
        })

    })
    
}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
            res.send("User does not exists");
        }
        pool.query(queries.removeStudent, [id], (error, result) => {
            if (error) throw error;
            res.status(200).json("Student deleted successfully");
        })
    })
}

const updateStudent = (req, res) => {
    //Check whether the student exists or not
    //get old student info
    //update the student info by values in req.body
    const id = parseInt(req.params.id);
    const name = req.body?.name;
    const email = req.body?.email;
    const age = req.body?.age;
    const dob = req.body?.dob;

    pool.query(queries.getStudentById,[id], (error, result) => {
        if (error) throw error;
        if (!result.rows.length) {
            res.send("User does not exists");
        }

        const oldName = result?.name;
        const oldEmail = result?.email;
        const oldAge = result?.age;
        const oldDob = result?.dob;

        pool.query(queries.updateStudent,
            [name ?? oldName, email ?? oldEmail, age ?? oldAge, dob ?? oldDob,id],
            (error, result) => {
                if (error) throw error;
                res.status(200).json("Student updated successfully");
            }
        
        )
    })
}

module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    removeStudent,
    updateStudent
}
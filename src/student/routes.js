const { Router } = require('express');
const controller = require("./controller")
const router = Router();

router.get('/', controller.getStudents);
router.post('/', controller.addStudent);
router.get('/:id', controller.getStudentById);
router.delete('/remove/:id', controller.removeStudent);
router.put('/update/:id', controller.updateStudent);

module.exports = router;
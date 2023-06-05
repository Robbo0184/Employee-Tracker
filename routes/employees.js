const express = require('express');
const router = express.Router();

const wrapAsync = require('../functions')


const {
    getEmployees,
    getNewEmployeeForm,
    createNewEmployee,
    getSpecificEmployee,
    renderEmployeeEditForm,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employees')


router.get('/', getEmployees)

router.get('/new', getNewEmployeeForm)

router.get('/search', searchEmployees)

router.post('/', createNewEmployee)

router.get('/:id', getSpecificEmployee)

router.get('/:id/edit', renderEmployeeEditForm)

router.put('/:id', updateEmployee)

router.delete('/:id', deleteEmployee)





module.exports = router


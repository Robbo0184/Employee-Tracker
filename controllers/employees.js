const {
    wrapAsync,
    handleValidationErr
} = require('../functions')

const Employee = require('../models/employee');

const getEmployees = wrapAsync(async (req, res, next) => {
    const employees = await Employee.find({});
    res.render('employees/index', { employees });
})

const getNewEmployeeForm = (req, res) => {
    res.render('employees/new');
}

const createNewEmployee = wrapAsync(async (req, res, next) => {
    req.body.isSupervisor = !!req.body.isSupervisor
    const newEmployee = new Employee(req.body);
    
    await newEmployee.save();
    res.redirect(`/employees/${newEmployee._id}`)
})

const getSpecificEmployee = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
        throw new AppError('Employee Not Found', 404);
    }
    res.render('employees/show', { employee });
})

const renderEmployeeEditForm = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
        throw new AppError('Employee Not Found', 404);
    }
    res.render('employees/edit', { employee });
})

const updateEmployee = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    req.body.isSupervisor = !!req.body.isSupervisor
    const employee = await Employee.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/employees/${employee._id}`);
})

const deleteEmployee = wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.redirect('/employees');
})


module.exports = {
    getEmployees,
    getNewEmployeeForm,
    createNewEmployee,
    getSpecificEmployee,
    renderEmployeeEditForm,
    updateEmployee,
    deleteEmployee
}
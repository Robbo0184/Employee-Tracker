const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const methodOverride = require('method-override');
 

const Employee = require('./models/employee');
const AppError = require('./AppError');

mongoose.connect('mongodb://localhost:27017/employeeData', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MONGO CONNECTION OPEN');
    })
    .catch(err => {
        console.log('MONGO CONNECTION ERROR');
        console.log(err);
    }) 




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}










app.get('/employees', wrapAsync(async (req, res, next) => {
        const employees = await Employee.find({});
        res.render('employees/index', { employees });
}))



app.get('/employees/new', (req, res) => {
        res.render('employees/new');
})



app.post('/employees', wrapAsync(async (req, res, next) => {
        req.body.isSupervisor = !!req.body.isSupervisor
        const newEmployee = new Employee(req.body);
        
        await newEmployee.save();
        res.redirect(`/employees/${newEmployee._id}`)
}))


app.get('/employees/:id', wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
        throw new AppError('Employee Not Found', 404);
    }
    res.render('employees/show', { employee });
}));

app.get('/employees/:id/edit', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            throw new AppError('Employee Not Found', 404);
        }
        res.render('employees/edit', { employee });
}))


app.put('/employees/:id', wrapAsync(async (req, res, next) => {
        const { id } = req.params;
        req.body.isSupervisor = !!req.body.isSupervisor
        const employee = await Employee.findByIdAndUpdate(id, req.body, { runValidators: true });
        res.redirect(`/employees/${employee._id}`);
}))


app.delete('/employees/:id', wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.redirect('/employees');
}))

const handleValidationErr = err => {
    
    return new AppError(`Validation error...${err.message}`, 400)
}

app.use((err, req, res, next) => {
    console.log(err.name)
    if (err.name === 'ValidationError') err = handleValidationErr(err)
    next(err);
})


app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).send(message)
})


app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})
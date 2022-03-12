const express = require('express')
const mongoose = require('mongoose')
const Intern = require('./models/data')
const Resume = require('./models/intern_form')
const app = express()
const router = express.Router()

// app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mongodb = 'mongodb+srv://bishant:mongo_bishant1234@hrc-cluster.ikeg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs')

//Render the Main landing page
app.get("/", (req, res) => {
    res.render('index')
})

// Render the page to initiate adding the data of interns
app.get("/provide-counts", (req, res) => {
    res.render('provide_counts', {intern: new Intern()})
})

// Show the Statistics of the data entered by the users.
app.get("/show-stats", async (req, res) => {
    const intern = await Intern.find()
    console.log(intern);
    res.render('show_stats', {intern: intern})
})

// Each intern data
app.get('/show_stats/:id', async (req, res) => {
    // const intern = await Intern.findById(req.params.id)
    const intern = await Intern.findById(req.params.id)
    .catch(err => {console.log("Error: ", err);})
    if (intern == null) res.redirect('/')
    res.render('show_stats_id', {intern: intern})
    // res.send(req.params.id)
})

// Each intern data
app.post('/show-stats/delete/', async (req, res) => {
    // const intern = await Intern.findById(req.params.id)
    console.log("id: ", req.body.id);
    const intern = await Intern.findById(req.body.id)
    .catch(err => {console.log("Error: ", err);})
    const _ = await intern.remove()
    .catch(err => {console.log("Error: ", err);})
    const new_interns = await Intern.find()
    res.render('show_stats', {intern: new_interns})
})

app.get("/show-resumes", (req, res) => {
    res.render('show_resumes')
})

app.get("/resume", (req, res) => {
    res.render('intern_resume')
})

app.post("/resume/submit/", async (req, res) => {
    let data = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        college: req.body.college, // This will be a dropdown with populated data of colleges names.
        degree: req.body.degree,
        year: req.body.year,
        resume: req.body.resume,
        gpa: req.body.gpa,
        criminal_record: true ? req.body.criminal_record == 1 : false
    }
    console.log(data);
    let resume = new Resume(data)
    const resume_id = await resume.save()
    .catch(err => {console.log("Error in Resume Submitting: ", err);})

    res.render('thankyou')
})



// Initial Phase come to the site and provide a college wide count of the interns
app.post("/provide-counts/add/", async (req, res) => {
    // console.log("Req: ", req.body);
    var data = {
        university: req.body.university,
        count: req.body.count,
    }
    let intern = new Intern(data)
    try {
        intern = await intern.save()
        res.redirect(`/show_stats/${intern.id}`)
    } catch (error) {
        console.log(error)
        res.render('provide_counts', {intern: intern})
    }
    // console.log("Data: ", data);
    res.render("index")
})

app.listen(5003)
console.log("Running Port at 5003");
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const router = express.Router()

// app.use(express.json())
app.use(express.urlencoded({extended:true}))

const mongodb = 'mongodb+srv://bishant:mongo_bishant1234@hrc-cluster.ikeg2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true});

app.set('view engine', 'ejs')

//Render the Main landing page
app.get("/", (req, res) => {
    res.render('index', {name: null, points: null})
})

// Render the page to initiate adding the data of interns
app.get("/provide-counts", (req, res) => {
    res.render('provide_counts', {intern: new Intern()})
})

// Show the Statistics of the data entered by the users.
app.get("/show-stats", async (req, res) => {
    var dummy_data = [
        {
            rows: 10,
            cols: 10,
            name: "John Doe",
            age: 20,
            resume_path: "/john-doe.pdf",
            email: "johndoe@gmil.com"
        },
        {
            rows: 10,
            cols: 10,
            name: "John Doe 2",
            age: 20,
            resume_path: "/john-doe2.pdf",
            email: "johndoe2@gmil.com"
        },

    ]
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

// Adding data to the database
const Intern = require('./models/data')
app.post("/provide-counts/add/", async (req, res) => {
    // console.log("Req: ", req.body);
    var data = {
        name: req.body.name,
        points: req.body.points,
    }
    let intern = new Intern(data)
    try {
        intern = await intern.save()
        res.redirect(`/show_stats/${intern.id}`)
    } catch (error) {
        console.log(error)
        res.render('provide_counts', {intern: intern})
    }
    console.log("Data: ", data);
    res.render("index", data)
})

app.listen(5003)
console.log("Running Port at 5003");
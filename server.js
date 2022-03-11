const express = require('express')
const app = express()
const router = express.Router()
// app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

//Render the Main landing page
app.get("/", (req, res) => {
    res.render('index', {name: null, points: null})
})

// Render the page to initiate adding the data of interns
app.get("/provide-counts", (req, res) => {
    res.render('provide_counts')
})

// Show the Statistics of the data entered by the users.
app.get("/show-stats", (req, res) => {
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
    res.render('show_stats', dummy_data)
})

// Adding data to the database 
app.post("/provide-counts/add/", (req, res) => {
    // console.log("Req: ", req.body);
    var data = {
        name: req.body.name,
        points: req.body.points,
    }
    console.log("Data: ", data);
    res.render("index", data)
})

app.listen(5003)
console.log("Running Port at 5003");
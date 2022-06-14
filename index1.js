require('dotenv').config()

const express = require('express');
// const fileUpload = require('express-fileupload');
const _ = require('lodash');


const multer  = require('multer')
// const upload = multer({ dest: 'uploads/' })


const app = express();
app.use(multer({dest:__dirname+'/file/uploads/'}).any());
// app.use(multer({dest:__dirname+'/file/uploads/'}).any());
// const storage = multer.diskStorage({
//     destination: './public/uploads/images',
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + 
//     path.extname(file.originalname));
//     }
// });
// const upload = multer({storage: storage});
// var bodyParser = require('body-parser')
// const session = require('express-session');
app.set('view engine', 'ejs');
// app.use(fileUpload());
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use('/favicon.ico', express.static('images/favicon.ico'));
app.use("/public", express.static('./public/'));
app.use(express.static("public"))


// app.use(bodyParser.urlencoded({ extended: false }))

// // parse application/json
// app.use(bodyParser.json())

const main = (req, res) => {
    res.render('index')
}

// const getPics = (req, res) => {
//     // const img = req.files.image
//     console.log(req.files)
//     res.redirect('/')
// } 

app.get('/', main)
app.post('/upload', function (req,res){
    console.log(req.files)
    res.redirect('/')
})

let port = process.env.PORT;
if (port == null || port == "") {
    port = 5000;
}

app.listen(port, function () {
    console.log('serwer is working on port 5000')
})
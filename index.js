import express from 'express';
import path from 'path';
import got from 'got';
import multer  from 'multer';
import fs from 'fs';
import FormData from 'form-data';
const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})
const upload = multer({ storage: storage });


app.use("/public", express.static('./public/'));
app.use(express.static("public"))
app.set('view engine', 'ejs');

const main = (req, res) => {
    res.render('index')
}

const photo = (req, res) => {
    const contex = {
        url: '/uploads/1655217284041.jpg'
    }
    res.render('photo', contex)
}

app.get('/', main)

app.get('/photo', photo)
app.post('/upload',upload.single('image'),function(req,res){
    const filePath = '/path/to/image.jpg';
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));
    // console.log(formData)
    console.log(req.file.path);
    const contex = {
        url: '/uploads/1655217284041.jpg'
    }
    res.redirect('/photo');

});


let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log('serwer is working on port 5000')
})
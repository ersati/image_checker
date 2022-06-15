import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'dev' });
import express from 'express';
import path from 'path';
import {fileURLToPath} from 'url';
import got from 'got';
import multer  from 'multer';
import fs from 'fs';
import FormData from 'form-data';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// import 'dotenv/config'
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
app.use(express.static('uploads'));
app.set('view engine', 'ejs');

const main = (req, res) => {
    res.render('index')
}

const photo = (req, res) => {
    const img = req.params.id
    const apiKey = "";
    const apiSecret = "";
    const filePath = path.join(__dirname, '/uploads', img);
    const formData = new FormData();
    // console.log(apiKey,apiSecret,formData)
    formData.append('image', fs.createReadStream(filePath));
    (async () => {
        try {
            const response = await got.post('https://api.imagga.com/v2/tags', {body: formData, username: apiKey, password: apiSecret});
            const obj = JSON.parse(response.body)
            const status = obj.status.type
            const tags = obj.result.tags.slice(0,5)
            console.log(obj.status);
            const contex = {
                status,
                tags 
            }
            res.render('photo', contex)
        } catch (error) {
            console.log(error);
        }
    })();

}

app.get('/', main)

app.get('/photo/:id', photo)
app.post('/upload',upload.single('image'),function(req,res){
    const filePath = '/path/to/image.jpg';
    const formData = new FormData();
    formData.append('image', fs.createReadStream(filePath));
    const imgName = req.file.filename
    console.log(req.file.filename);
    const contex = {
        url: '/uploads/1655217284041.jpg'
    }
    res.redirect(`/photo/${imgName}`);
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, function () {
    console.log('serwer is working on port 5000')
})
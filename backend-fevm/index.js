const app  = require('express')()
const multer = require('multer')
//const fileHandler = require('./uploadfile');
const createuser = require('./tasks/createuser');

createuser('0xC9F58a37fEa347683edBdD55d4Ca9CC51797fd84',"Mohammed","Aasim","mohdaasimc@gmail.com",1);

const upload = multer({})

// app.post('/upload-vid',upload.single('video'),(req, res, next) =>{
//     fileHandler(req.video);
// })

app.listen(5500, ()=> {
    console.log("Listening!!");
})
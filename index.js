const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const loginPage = path.join(__dirname, '/login.html');
const homePage = path.join(__dirname, '/home.html');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {

    // fs.appendFileSync(`${__dirname}/msg.txt`,req.body);
    res.sendFile(homePage, () => console.log('home page render'));
})
app.get('/login', (req, res) => {
    // if(req.body.message)
    // res.sendFile(`${__dirname}/msg.txt`,()=>console.log('message send'));
    // res.sendFile(`${__dirname}/msg.txt`,()=>console.log('message send'));
    res.sendFile(loginPage, () => console.log('login page render'));
})

app.post('/',(req,res,next)=>{
    console.log(req.body);
    const namearr=Object.keys(req.body);
    console.log(namearr);
    const name=namearr[0];
    console.log(name);
    if(req.body.message)
        fs.appendFileSync(`${__dirname}/msg.txt`,`${name}=${req.body}.${name} `);
    else
        fs.appendFileSync(`${__dirname}/msg.txt`,req.body.userName);
    res.sendFile(`${__dirname}/msg.txt`,()=>console.log('message send'));
    // res.sendFile(homePage, () => console.log('home page render'));
})

app.listen(3000, () => {
    console.log('listening on port 3000');
})
const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
    const data=fs.readFileSync(`${__dirname}/msg.txt`);
    res.send(`
    <div>
        ${data}
    </div>
    <form action="/" onsubmit="document.getElementById('user').value=localStorage.getItem('name')" method="post" >
    <input type="text" id="msg" placeholder="Please Enter the message" name="message">
    <input type='hidden' id="user" name="userName">
    <button type="submit">Send message</button>
    </form>`)
})
app.get('/login', (req, res) => {
    res.send(`
            <form onsubmit="localStorage.setItem('name',document.getElementById('msg').value)" action="/" method="post">
                <input type="text" name="userName" id="msg" placeholder="Enter the user name">
                <button id="btn" type="submit">Create</button>
            </form>
        `)
})

app.post('/',(req,res,next)=>{
    console.log(req.body);
    if(req.body.message )
    fs.appendFileSync(`${__dirname}/msg.txt`,` ${req.body.userName} = ${req.body.message},`);
    const data=fs.readFileSync(`${__dirname}/msg.txt`);
        res.send(`<div> 
                    ${data}
                </div>
        <form action="/" onsubmit="document.getElementById('user').value=localStorage.getItem('name')" method="post" >
        <input type="text" id="msg" placeholder="Please Enter the message" name="message">
        <input type="hidden" id="user" name="userName">
        <button type="submit">Send message</button>
        </form>
        `)
        req.body='';

});

app.listen(3000, () => {
    console.log('listening on port 3000');
})
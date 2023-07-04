const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const loginPage = path.join(__dirname, '/login.html');
const homePage = path.join(__dirname, '/home.html');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req, res) => {
    res.send(`<form action="/" method="post" >
    <input type="text" id="msg" placeholder="Please Enter the message" name="message">
    <button type="submit">Send message</button>
    </form>`)
})
app.get('/login', (req, res) => {
    res.send(`
            <form onsubmit="save()" action="/" method="post">
                <input type="text" name="userName" id="msg" placeholder="Enter the user name">
                <button id="btn" type="submit">Create</button>
            </form>
            <script>
                const btn=document.getElementById('btn');
                btn.addEventListener('click',(e)=>{
                    
                    const msg=document.getElementById('msg');
                    console.log('hi');
                    localStorage.setItem('name',msg.value);
                });
            </script>
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
        <form action="/" onsubmit="save()" method="post" >
        <input type="text" id="msg" placeholder="Please Enter the message" name="message">
        <button type="submit">Send message</button>
        <input type="text" id="user" style="visibility: hidden;" value=${req.body.userName} name="userName">
        </form>
        `)
        req.body='';

});

app.listen(3000, () => {
    console.log('listening on port 3000');
})
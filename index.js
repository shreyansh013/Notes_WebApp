const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>{
    fs.readdir('./files', (err, files)=>{
        res.render('index', {files: files});
    })
})

app.get('/file/:filename', (req,res)=>{
    const title = req.params.filename;
    fs.readFile(`./files/${title}`,'utf-8', (err,data)=>{
        res.render('show', {title:title, data:data});
    });
})

app.get('/edit/:filename', (req,res)=>{
    res.render('edit', {title:req.params.filename});
})

app.get('/remove/:filename', (req,res)=>{
    fs.unlink(`./files/${req.body.filename}`, (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log('File Removed');
            res.redirect('/');
        }
    })
})

app.post('/create', (req,res)=>{
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log('File Created Succesfully');
            res.redirect('/');
        }
    })
})

app.post('/update', (req,res)=>{
    // console.log(req.body);
    fs.writeFile(`./files/${req.body.title}`, req.body.details, (err)=>{
        if(err){
            console.error(err);
        }else{
            console.log('File Replaced');
            res.redirect('/');
        }
    })
})

app.listen(3000);
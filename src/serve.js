const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname+'/dist/bill-income'));
app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/dist/bill-income/index.html'));
});

app.listen(process.env.PORT || 3200);
const express= require('express'),
      path = require('path'),
      app =express();

// require('./startup/prod')(app);
app.use(express.static('./dist/demo1'));
app.get('/*', (req,res)=>{
res.sendFile(path.join(__dirname,'/dist/demo1/index.html')); 
});
const port = process.env.PORT;
app.listen(port || 4500, ()=> {
console.log(`Server started at ${4500}`);
});
    
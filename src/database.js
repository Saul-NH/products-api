const mongoose = require('mongoose');

mongoose.connect(
'mongodb://localhost/companydb'
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (error,db)=>{
    if(error){
        console.log('Error: ',error);
    }

    console.log('Database connected');
});
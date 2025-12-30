const mongoose= require('mongoose');

const mango= async ()=>{
try{await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongoose connected`)
}
catch(error){console.log(error)}
}

module.exports=mango;

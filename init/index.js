const mongoose=require('mongoose');
const listing=require('../models/listing');
const dataInitial=require('./data');
main().then(()=>{
    console.log('mongo')
}).catch((err)=>{
    console.log(err)
})
async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/Area51');
}

const initDB=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(dataInitial.data);
}

initDB().then(()=>{
    console.log('Data base initialized');
});
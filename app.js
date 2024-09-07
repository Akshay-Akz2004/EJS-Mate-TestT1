const express=require('express');
const app = express();
const mongoose=require('mongoose');
const Listing = require('./models/listing');
const path=require('path');
const ejsmate=require('ejs-mate');


app.set('view engine','ejs');
app.set("views",path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.engine('ejs',ejsmate);

main().then(()=>{
    console.log('Connected to MongoDB');
}).catch(err=>{
    console.log('error occurrred')
})

async function main(){
    mongoose.connect('mongodb://127.0.0.1:27017/Area51');
}
let port=3000;
app.listen(port,(req,res)=>{
    console.log(`Server is running on port ${port}`);
})

app.get('/',(req,res)=>{
    res.send('Hi');
})

//index route
app.get('/listing',async (req,res)=>{
    const allList=await Listing.find({});
    res.render('./listings/index.ejs',{allList});
})

//create new route

app.get('/listing/new',(req,res)=>{
    res.render('./listings/new.ejs');
})


app.get('/listing/:id/update',async (req,res)=>{
    const foundListing=await Listing.findById(req.params.id);
    res.render('./listings/update.ejs',{foundListing});
})

//show route

app.get('/listing/:id',async (req,res)=>{
    const foundListing=await Listing.findById(req.params.id);
    res.render('./listings/show.ejs',{foundListing});
})


app.post('/listing',async (req,res)=>{
    const newListing=new Listing(req.body);
    console.log(newListing);
    await newListing.save();
    res.redirect('/listing');
})

app.post('/listing/:id',async (req,res)=>{
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect('/listing');
})

app.post('/listing/:id/update',async(req,res)=>{
    const id=req.params.id;
    await Listing.findByIdAndUpdate(id,req.body,{new:true});
    res.redirect(`/listing/${id}`);
})





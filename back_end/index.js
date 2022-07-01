const { response } = require('express');
const express=require('express');
const mongoose = require('mongoose');
const app=express();
app.use(express.json());
main();

const UserSchema= new mongoose.Schema({
    username:String,
    passsword:String,
    email:String,
    name:String,
    mobile:String,
    favs:[Number]
});
const SellerSchema= new mongoose.Schema({
    email:String,
    password:String,
    username:String,
    mobile:Number,
    name:String,
    products:[Number]
});
const ProductSchema= new mongoose.Schema({
    name:String,
    minprice:Number,
    maxprice:Number,
    category:String,
    type:String,
    weight:Number,
    country:String,
    material:String,
    size:String,
    sellers:[Number]
});

app.get('/api/search',async function(req,res){


})
app.get('/api/login',async function(req,res){
    

})
app.post('/api/signup_customer',async function(req,res){
    

})
app.post('/api/signup_seller',async function(req,res){
    

})
app.post('/api/report',async function(req,res){
    

})
app.get('/api/product',async function(req,res){
    

})
app.get('/api/user/favs',async function(req,res){
    

})
app.post('/api/user/add_fav',async function(req,res){
    

})
app.post('/api/user/remove_fav',async function(req,res){
    

})
app.post('/api/user/add_shop',async function(req,res){
    

})
app.post('/api/user/change_info',async function(req,res){
    

})
app.post('/api/user/add_product/existing',async function(req,res){
    

})
app.post('/api/user/add_product/new',async function(req,res){
    

})
app.get('/api/user/reports',async function(req,res){
    

})
app.get('/api/user/shops',async function(req,res){
    

})




async function main() {
    await mongoose.connect('mongodb://localhost:27017/test');
}
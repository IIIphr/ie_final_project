const { response } = require('express');
const express=require('express');
const mongoose = require('mongoose');
const app=express();
app.use(express.json());
main();

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
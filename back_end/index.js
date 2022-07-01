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
var User=mongoose.model('User',UserSchema);
var Seller=mongoose.model('Seller',SellerSchema);
var Product=mongoose.model('Product',ProductSchema);
app.get('/api/search',async function(req,res){
    const{query,type,category}=req.body;
    const products=await Product.find({name:query});
    var result=[];
    for(let i=0;i<products.length;i++){
        for(let j=0;j<type.length;j++){
            if(products[i].type==type[j]){
                if(products[i].category==category[j]){
                    var sellers = [];
                for (const sid of products[i]['sellers']) {
                    var seller = Seller.find({ _id: sid });
                    sellers.push(seller[0]);
                }
                result.push({
                    "name":products[i].name,
                    "minprice":products[i].minprice,
                    "maxprice":products[i].maxprice,
                    "category":products[i].category,
                    "type":products[i].type,
                    "weight":products[i].weight,
                    "country":products[i].country,
                    "material":products[i].material,
                    "size":products[i].size,
                    "sellers":sellers
                });
                }
            }
        }
    }
    res.status(200).send(result);

})
app.get('/api/login',async function(req,res){
    const{username,password}=req.body;
    const user=await User.findOne({username:username});
    if(user){
        if(user.password==password){
            res.status(200).send({
                type:"user",
                user
            });
        }
        else{
            res.status(400).send({
                error: {
                    message : "wrong password"
                }});
            return;
        }
    }
    else{
        const seller=await Seller.findOne({username:username});
        if(seller){
            if(seller.password==password){
                res.send({
                    type:"seller",
                    seller
                });
            }
            else{
                res.status(400).send({
                    error: {
                        message : "wrong password"
                    }});
                return;
            }
        }
        else{
            res.status(400).send({
                error: {
                    message : "wrong username"
                }});
            return;
        }
    }

})
app.post('/api/signup_customer',async function(req,res){
    const{username,password,email,name,mobile}=req.body;
    const user=await User.findOne({username:username});
    if(user){
        res.status(400).send({
            error: {
                message : "username already exists!"
            }});
        return;
    }
    else{
        const seller=await Seller.findOne({username:username});
        if(seller){
            res.status(400).send({
                error: {
                    message : "username already exists!"
                }});
            return;
        }
        const user=new User({
            username:username,
            password:password,
            email:email,
            name:name,
            mobile:mobile,
            favs:[]
        });
        await user.save();
        res.status(200).send({
            code:200,
            message:"user created successfully"
        });
    }

})
app.post('/api/signup_seller',async function(req,res){
    const{username,password,email,name,mobile}=req.body;
    const seller=await Seller.findOne({username:username});
    if(seller){
        res.status(400).send({
            error: {
                message : "username already exists!"
            }});
        return;
    }
    else{
        const user=await User.findOne({username:username});
        if(user){
            res.status(400).send({
                error: {
                    message : "username already exists!"
                }});
            return;
        }
        else{
            const seller=new Seller({
                username:username,
                password:password,
                email:email,
                name:name,
                mobile:mobile,
                products:[]
            });
        }
    }
})
app.get('/api/product',async function(req,res){
  const{id}=req.body;
  const product=await Product.findOne({_id:id});
  if(product){
    res.status(200).send(product);
    return;
  }
  else{
    res.status(400).send({
      error: {
        message : "product not found"
      }});
      return;
  }

})
app.post('/api/report',async function(req,res){
    

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
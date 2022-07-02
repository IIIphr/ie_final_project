const { response } = require('express');
const express = require('express');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
main();

const UserSchema = new mongoose.Schema({
    username: String,
    pass: String,
    email: String,
    name: String,
    mobile: String,
    favs: [ObjectId]
});
const SellerSchema = new mongoose.Schema({
    email: String,
    pass: String,
    username: String,
    mobile: Number,
    name: String,
    shops: [ObjectId]
});
const ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    type: String,
    weight: Number,
    country: String,
    material: String,
    size: String,
    price: [Number],
    link: [String],
    shops: [ObjectId]
});
const ShopSchema = new mongoose.Schema({
    name: String,
    products: [ObjectId]
});
const ReportSchema = new mongoose.Schema({
    pid: String,
    sid: String,
    reason: Number
});
var User = mongoose.model('User', UserSchema);
var Seller = mongoose.model('Seller', SellerSchema);
var Product = mongoose.model('Product', ProductSchema);
var Report = mongoose.model('Report', ReportSchema);
var Shop = mongoose.model('Shop', ShopSchema);
app.post('/api/search', async function (req, res) {
    const { query, type, category } = req.body;
    var products = await Product.find({ name: query });
    if(!query || query == ""){
        products = await Product.find({});
    }
    var result = [];
    if (!type || type.length == 0) {
        for (let i = 0; i < products.length; i++) {
            var shops = [];
            for (const sid of products[i]['shops']) {
                var shop = await Shop.find({ _id: sid });
                shops.push(shop[0]);
            }

            result.push({
                "pid": products[i]['_id'],
                "name": products[i].name,
                "category": products[i].category,
                "type": products[i].type,
                "weight": products[i].weight,
                "country": products[i].country,
                "material": products[i].material,
                "size": products[i].size,
                "shops": shops,
                "prices": products[i].price,
                "links": products[i].link
            });
        }
    }
    else {
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < type.length; j++) {
                if (products[i].type == type[j]) {
                    if (products[i].category == category[j]) {
                        var shops = [];
                        for (const sid of products[i]['shops']) {
                            var shop = Shop.find({ _id: sid });
                            shops.push(shop[0]);
                        }

                        result.push({
                            "pid": products[i]['_id'],
                            "name": products[i].name,
                            "category": products[i].category,
                            "type": products[i].type,
                            "weight": products[i].weight,
                            "country": products[i].country,
                            "material": products[i].material,
                            "size": products[i].size,
                            "shops": shops,
                            "prices": products[i].price,
                            "links": products[i].link
                        });
                    }
                }
            }
        }
    }
    res.status(200).send(result);

})
app.post('/api/login', async function (req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
        if (user.pass == password) {
            res.status(200).send({
                type: "user",
                user
            });
        }
        else {
            res.status(400).send({
                error: {
                    message: "wrong password"
                }
            });
            return;
        }
    }
    else {
        const seller = await Seller.findOne({ username: username });
        if (seller) {
            if (seller.pass == password) {
                res.status(200).send({
                    type: "seller",
                    seller
                });
            }
            else {
                res.status(400).send({
                    error: {
                        message: "wrong password"
                    }
                });
                return;
            }
        }
        else {
            res.status(400).send({
                error: {
                    message: "wrong username"
                }
            });
            return;
        }
    }

})
app.post('/api/signup_customer', async function (req, res) {
    const { username, password, email, name, mobile } = req.body;
    const user = await User.findOne({ username: username });
    if (user) {
        res.status(400).send({
            error: {
                message: "username already exists!"
            }
        });
        return;
    }
    else {
        const seller = await Seller.findOne({ username: username });
        if (seller) {
            res.status(400).send({
                error: {
                    message: "username already exists!"
                }
            });
            return;
        }
        const user = new User({
            username: username,
            pass: password,
            email: email,
            name: name,
            mobile: mobile,
            favs: []
        });
        await user.save();
        res.status(200).send({
            code: 200,
            message: "user created successfully"
        });
    }

})
app.post('/api/signup_seller', async function (req, res) {
    const { username, password, email, name, mobile } = req.body;
    const seller = await Seller.findOne({ username: username });
    if (seller) {
        res.status(400).send({
            error: {
                message: "username already exists!"
            }
        });
        return;
    }
    else {
        const user = await User.findOne({ username: username });
        if (user) {
            res.status(400).send({
                error: {
                    message: "username already exists!"
                }
            });
            return;
        }
        else {
            const seller = new Seller({
                username: username,
                pass: password,
                email: email,
                name: name,
                mobile: mobile,
                shops: []
            });
            seller.save();
            res.status(200).send({
                code: 200,
                message: "seller created successfully"
            });
        }
    }
})
app.post('/api/product', async function (req, res) {
    const { id } = req.body;
    const product = await Product.findOne({ _id: id });
    if (product) {
        res.status(200).send(product);
        return;
    }
    else {
        res.status(400).send({
            error: {
                message: "product not found"
            }
        });
        return;
    }

})
app.post('/api/report', async function (req, res) {
    const { pid, sid, report_type } = req.body;
    const report = new Report({
        pid: pid,
        sid: sid,
        reason: report_type
    });
    res.status(200).send({
        code: 200,
        message: "report created successfully"
    });
    return;

})

app.post('/api/user/favs', async function (req, res) {
    const { uid } = req.body;
    const user = await User.findOne({ _id: uid });
    if (user) {
        var favorites = [];
        for (const fid of user['favs']) {
            var product = Product.find({ _id: fid });
            favorites.push(product[0]);
        }
        res.status(200).send(favorites);
        return;
    }
    else {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }

})
app.post('/api/user/add_fav', async function (req, res) {
    const { uid, pid } = req.body;
    const user = await User.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    else {
        const product = await Product.findOne({ _id: pid });
        if (!product) {
            res.status(400).send({
                error: {
                    message: "product not found"
                }
            });
            return;
        }
        else {
            user['favs'].push(pid);
            user.save();
            res.status(200).send({
                code: 200,
                message: "product added to favorites successfully"
            });
            return;
        }
    }

})
app.post('/api/user/remove_fav', async function (req, res) {
    const { uid, pid } = req.body;
    const user = await User.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    else {
        const product = await Product.findOne({ _id: pid });
        if (!product) {
            res.status(400).send({
                error: {
                    message: "product not found"
                }
            });
            return;
        }
        else {
            user['favs'].splice(user['favs'].indexOf(pid), 1);
            user.save();
            res.status(200).send({
                code: 200,
                message: "product removed from favorites successfully"
            });
            return;
        }
    }

})
app.post('/api/user/add_shop', async function (req, res) {
    const { sid, shop_name } = req.body;
    const seller = await Seller.findOne({ _id: sid });
    if (!seller) {
        res.status(400).send({
            error: {
                message: "seller not found"
            }
        });
        return;
    }
    else {
        const tshop = await Shop.findOne({ name: shop_name });
        if (tshop) {
            res.status(400).send({
                error: {
                    message: "shop already exists"
                }
            });
            return;
        }
        const shop = new Shop({
            name: shop_name,
            products: []
        });
        shop.save();
        seller['shops'].push(shop._id);
        seller.save();
        res.status(200).send({
            code: 200,
            message: "shop added successfully"
        });
    }

})
app.post('/api/user/change_info', async function (req, res) {
    const { user_id, phone, name, email } = req.body;
    const user = await Seller.findOne({ _id: user_id });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    else {
        user['mobile'] = phone;
        user['name'] = name;
        user['email'] = email;
        user.save();
        res.status(200).send({
            code: 200,
            message: "user info changed successfully"
        });
    }

})
app.post('/api/user/add_product/existing', async function (req, res) {
    const { uid, sid, pid, price, link } = req.body;
    const user = await Seller.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    else {
        if (!user['shops'].includes(sid)) {
            res.status(400).send({
                error: {
                    message: "shop not found"
                }
            });
            return;
        }
        else {
            const shop = await Shop.findOne({ _id: sid });
            if (shop['products'].includes(pid)) {
                res.status(400).send({
                    error: {
                        message: "product already exists"
                    }
                });
                return;
            }
            else {
                const product = await Product.findOne({ _id: pid });
                product.price.push(price);
                product.link.push(link);
                product.shops.push(sid);
                product.save();
                shop['products'].push(pid);
                shop.save();
                res.status(200).send({
                    code: 200,
                    message: "product added successfully"
                });
                return;
            }
        }
    }
})
app.post('/api/user/add_product/new', async function (req, res) {
    const { uid, sid, name, category, type, weight, country, material, size, price, link } = req.body;
    const user = await Seller.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    else {
        if (!user['shops'].includes(sid)) {
            res.status(400).send({
                error: {
                    message: "shop not found"
                }
            });
            return;
        }
        else {
            const shop = await Shop.findOne({ _id: sid });
            const product = await Product.findOne({ name: name });
            if (product) {
                res.status(400).send({
                    error: {
                        message: "product already exists"
                    }
                });
                return;
            }
            else {
                const newProduct = new Product({
                    name: name,
                    category: category,
                    type: type,
                    weight: weight,
                    country: country,
                    material: material,
                    size: size,
                    link: [],
                    shops: [],
                    price: []
                });
                newProduct.link.push(link);
                newProduct.shops.push(sid);
                newProduct.price.push(price);
                newProduct.save();
                shop['products'].push(newProduct._id);
                shop.save();
                res.status(200).send({
                    code: 200,
                    message: "product added successfully"
                });
                return;
            }
        }
    }
})
app.post('/api/user/reports', async function (req, res) {
    const { uid, sid } = req.body;
    const user = await Seller.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    if (!user['shops'].includes(sid)) {
        res.status(400).send({
            error: {
                message: "shop not found"
            }
        });
        return;
    }
    const reports = await Report.find({ sid: uid });

    const shop = await Shop.findOne({ _id: sid });
    const result = [];
    for (const report of reports) {
        if (shop['products'].includes(report.pid)) {
            result.push(report);
        }
    }
    res.status(200).send({
        data: result,
        code: 200,
        message: "reports fetched successfully"
    });


})
app.post('/api/user/shops', async function (req, res) {
    const { uid } = req.body;
    const user = await Seller.findOne({ _id: uid });
    if (!user) {
        res.status(400).send({
            error: {
                message: "user not found"
            }
        });
        return;
    }
    var result = [];
    for (const shop of user['shops']) {
        const shop_obj = await Shop.findOne({ _id: shop });
        result.push(shop_obj);
    }
    res.status(200).send({
        data: result,
        code: 200,
        message: "shops fetched successfully"
    });

})




async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    app.listen(3030, () => console.log("listening on port 3030"));
}
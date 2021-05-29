const { isNull } = require('lodash');
const User = require('../models/user.js');
const Order = require('../models/order.js');

exports.getUserById = (req, res, next, id) => {
    
    User.findById(id).exec((err, user) => {

        if (err || !user) {
            return res.status(400).json({
                error: "NO USER WAS FOUND IN DB"

            });
           
        }
         req.profile = user;
            next();
    });

};
exports.getUser = (req, res) => {

    // TODO: get back here for password 
    // req.profile.salt = "";          // salt is not showing in browser or postman or in userprofile not in daatabse
    req.profile.createdAt = undefined;
     req.profile.updatedAt = undefined;
    req.profile.salt = undefined;
     req.profile.encry_password = undefined; // same


    return res.json(req.profile); 

}

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(
        {_id: req.profile._id},
        {$set: req.body},
        {new: true, useFindAndModify: false},
        (err, user) =>{
            if(err){
                return res.status(400).json({
                    error: "You are Not authorized to update this user"
                })
            }
            user.salt = undefined;
            user.encry_password = undefined;
            res.json(user);
        }
        )
}

exports.userPurchaseList = (req, res) => {
    Order.find({user: req.profile._id})
    .populate("user", "_id name")
    .exec((err, order) => {
        if(err){
            return res.status(400).json({
                error: "No order found in this USer account"
            })
        }
        return res.json(order);
    })
}

exports.pushOrderInPurchaseList = (req, res, next) =>{

    let purchases = []

    req.body.order.products.forEach(product => {
        purchases.push({
            _id: product._id,
            name: product.name,
            description: product.description,
            category: product.category,
            quantity: product.quantity,
            amount: req.body.order.amount,
            transaction_id: req.body.order.transaction_id
        })
    })

    User.findOneAndUpdate(
        {_id: req.profile._id},
        {$push: {purchases: purchases}},
        {new: true},
        (err, purchases) => {
         if(err){
             return res.status(400).json({
                error: "Unable to save purchases list"
            });
         }   
         next();
        }
        
    )

   
}
//getall users controller
// exports.getAllUser = (req, res) => {
//     User.find().exec((err, users) => {
//         if(err || !users){
//             return res.status(400).json({
//                 error: "No users found"
//             })
//         }

//         res.json(users);
        
//     })
// }
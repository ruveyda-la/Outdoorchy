const Hike = require ("../models/hikes.model");
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
    createHike: (req,res) => {
        const user = jwt.verify(req.cookies.userToken, secret);
        Hike.create({...req.body, creator:user})
                .then(newHike => res.status(201).json(newHike))
                .catch (err => res.status(400).json({message:"Creating hike went wrong",error:err}));
            },
    getHikeById : (req,res) => {
        Hike.findOne({_id:req.params._id})
            .then((oneHike) => {res.json(oneHike)})
            .catch((err) => {res.status(400).json({message:'View one hike went wrong',error:err})});
            },

    getHikesByUser : (req,res) => {
        const user = jwt.verify(req.cookies.userToken, secret);
        Hike.find({creator:user._id})
            .populate('creator','firstName lastName')
            .then(err =>res.json(err))
            .catch(err => res.status(400).json({message:'Getting hikes by user went wrong',error:err}))
    },
    getAllHikes : (req,res) => {
        Hike.find()
            .populate('creator','firstName lastName')
            .then((allHikes) =>{res.json(allHikes)})
            .catch((err) => {res.status(400).json({message: 'Getting all hikes went wrong',error:err})});
            },
    updateHike : (req,res) => {
        Hike.findOneAndUpdate({_id:req.params._id},req.body,{new:true, runValidators:true})
            .then(updatedHike => {res.json(updatedHike)})
            .catch((err) => {res.status(400).json({message:'Updating hike went wrong',error:err})});
            },
    deleteHike : (req,res) => {
        Hike.deleteOne({_id:req.params._id})
            .then(result => {res.json(result)
                })
            .catch((err) => {
                    res.status(400).json({ message: 'Canceling hike went wrong', error: err })
                });
            }
}
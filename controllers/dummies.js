/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2013. 12. 29.
 * Time: 오후 3:38
 * To change this template use File | Settings | File Templates.
 */
var Dummy = require('../models/dummy.js');
exports.index = function(req, res){
    console.log('index dummy');
    Dummy.find({}).sort({_id: -1}).exec(function (err, docs) {
        if (err) {
            res.send({result: "FAIL", ERR: err});
        } else {
            console.log(docs);
            res.send({dummies: docs, result: "SUCCESS"});
        }
    });

};
exports.show = function(req, res){
    var id = req.params.id;
    Dummy.findOne({_id:id}).exec(function (err, doc) {
        if (err) {
            res.send({result: "FAIL", ERR: err});
        } else {
            res.send({dummy: doc, result: "SUCCESS"});
        }
    });
};
exports.create = function(req, res){
    var dummy =  req.body;
    var dummyObj  = new Dummy(dummy);
    dummyObj.save(function(err, data){
        if(err){
            res.send({result:"FAIL", ERR:err});
        }else{
            res.send({dummy: data, result: "SUCCESS"});
        }
    });
};
exports.update = function(req, res){
    var dummy =req.body;
    var dummyId = req.params.id;
    Dummy.update({_id:dummyId}, dummy, function(err){
        if(err){
            console.log(err);
            res.send({result:"FAIL", err:err});
        }else{
            res.send({result: "SUCCESS"});
        }
    });
};
exports.destroy = function(req, res){

};
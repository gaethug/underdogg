/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 13. 8. 18.
 * Time: 오후 9:04
 * To change this template use File | Settings | File Templates.
 */

var Post = require('../models/post.js');

exports.index = function(req, res){
    //console.log(req);
    /*var category = req.params.category;
    var options = {};
    console.log(category);
    if(category!= null && category !="ALL" ){
        options = {Category:category};
    }*/
    var perPage =req.query.perpage, page = req.query.page > 0 ? req.query.page : 0;

    Post.find().limit(perPage)
        .skip(perPage * page).sort({_id:-1}).exec(function(err, docs) {
            res.send({title:'Posts', posts:docs, result:"OK"});
        });
};

exports.show = function(req, res){
    var id = req.params.id;
    Post.findOne({_id:id}, function (err, data){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            console.log(data);
            res.send({title:'Post', post:data , result:"OK"});
            Post.update({_id:id},{$inc:{Hits:1}},function(){});
        }
    });


};
exports.create = function(req, res){
    //console.log(res);
    var user = {};
    if(req.user == null){
        res.send({result:"FAIL", err:"logged out"});
        return false;
    }else{
        user = req.user;
    }
    //req.body.Contents = sanitize(req.body.Contents).entityEncode();


    var post = {
        Title : req.body.Title,
        //Contents : sanitizer.sanitize(req.body.Contents),
        Contents : req.body.Contents,
        Tags : req.body.Tags,
        Category: req.body.Category,
        Rating: req.body.Rating,
        FirstWriter : {name : user.displayName, id : user.id, profileUrl: user.profileUrl}
        /*,
        LastWriter : {name : user.displayName, id : user.id, profileUrl: user.profileUrl}*/
    };
    var postObj = new Post(post);
    postObj.save(function(err,data){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            console.log(data);
            res.send({title:'AddedPost', post:data , result:"OK"});
        }
    });
};




exports.update = function(req, res){
    var user = {};
    if(req.user == null){
        res.send({result:"FAIL", err:"logged out"});
        return false;
    }else{
        user = req.user;
    }
    var id = req.params.id;
    console.log(id);
    var post = {
        Title : req.body.Title,
        Contents : req.body.Contents,
        Tags : req.body.Tags||[],
        Rating: req.body.Rating||-1,
        Category: req.body.Category
        /*,
        LastWriter : {name : user.displayName, id : user.id, profileUrl: user.profileUrl}*/

    }
    //var essayObj = new Essay(essay);
    Post.update({_id:id}, post, function(err){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            res.send({title:'UpdatePost', result:"OK"});
        }
    });
};
exports.destroy = function(req, res){
    var id = req.params.id;
    if(req.user == null){
        res.send({result:"FAIL", err:"logged out"});
        return false;
    }
    Post.remove({_id:id}, function(err){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            res.send({title:'DeletePost', result:"OK"});
        }
    });
};
exports.createComment = function(req, res){
    var user = {};
    if(req.user == null){
        /*res.send({result:"FAIL", err:"logged out"});
        return false;*/
        user = {displayName:"Unknown", profileUrl:"/images/icon.jpg"}
    }else{
        user = req.user;
    }
    var id = req.params.id;
    console.log(id);
    var comment = {
        '$push':{
            Comments:{
                name:user.displayName,
                id:user.id,
                text : req.body.Text,
                profileUrl: user.profileUrl
            }
        },
        ModifiedComment : new Date().toISOString()
    };
    //var essayObj = new Essay(essay);
    Post.update({_id:id}, comment, function(err){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            res.send({result:"OK"});
        }
    });
};
exports.destroyComment = function(req, res){
    var user = {};
    if(req.user == null){
        res.send({result:"FAIL", err:"logged out"});
        return false;
    }
    var id = req.params.id;
    var commentId = req.params.commentId;
    var comment = {"$pull":{"Comments":{"_id":commentId}},
        ModifiedComment : new Date().toISOString()};
    //var essayObj = new Essay(essay);
    Post.update({_id:id}, comment, function(err){
        if(err){
            res.send({result:"FAIL", err:err});
        }else{
            res.send({result:"OK"});
        }
    });
};
/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 3. 30.
 * Time: 오후 4:00
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Comments = new Schema({
    name: String,
    id: String,
    text:String,
    profileUrl:String,
    posted:{type: Date, default: Date.now}
});
var Post = new Schema({
    Title:String,
    Contents:String,
    Modified: { type: Date, default: Date.now },

    Tags:[String],
    Hits:{ type: Number , default:0 },
    FirstWriter:{name:String,id:String,profileUrl:String},
    Category:{type:String, default:"ETC"},
    Rating:{type:Number, default:-1},
    Comments : [Comments],
    ModifiedComment: { type: Date}
});

module.exports = mongoose.model('Post',Post);

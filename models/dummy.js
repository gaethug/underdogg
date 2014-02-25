/**
 * Created with JetBrains PhpStorm.
 * User: hoho
 * Date: 2014. 2. 3.
 * Time: 오후 4:13
 * To change this template use File | Settings | File Templates.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Dummy = new Schema({
    //"Title":String,
    "Content":String,
    "Modified": { type: Date, default: Date.now }
});

module.exports = mongoose.model('Dummy',Dummy);
/**
 * Created by riasatraihan on 3/31/2016.
 */

"use strict";

var mongoose = require('mongoose');
var Sequence = require('./models/sequenceModel');

// Create a sequence
exports.sequenceGenerator = function(name){

    return {
        next: function(callback){
            Sequence.find({"name":name},function(err, data){
                if(err){ throw(err); }

                if(data.length < 1){
                    // create if doesn't exist create and return first
                    Sequence.create({name:name,nextSeqNumber:1}, function(err, seq){
                        if(err) { throw(err); }

                        callback(seq.nextSeqNumber);
                    });
                } else {
                    // update sequence and return next
                    Sequence.findOneAndUpdate({"name": name}, { $inc: { nextSeqNumber: 1 } }, {new: true}, function(err, seq){
                        if(err) { throw(err); }
                        callback(seq.nextSeqNumber);
                    });
                }
            });
        }
    };
};
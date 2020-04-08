let mongoose = require('mongoose');
let appeal = mongoose.model('appeal');
let token = mongoose.model('token');
const h = require('../helpers/common');

module.exports.getAll = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    appeal.find({}, (err, appeals) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,200, appeals);
    });
};

module.exports.getOne = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    appeal.findById(req.params.id, (err, appeal) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,200, appeal);
    });
};

module.exports.create = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }



    appeal.create(req.body, (err, appeal) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,201, appeal);
    });
};

module.exports.update = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    appeal.findById(req.params.id, (err, appeal) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }

        if(req.body.FCS){
            appeal.FCS = req.body.FCS;
        }
        if(req.body.actualAddress){
            appeal.actualAddress = req.body.actualAddress;
        }
        if(req.body.phoneNumber){
            appeal.phoneNumber = req.body.phoneNumber;
        }
        if(req.body.service){
            appeal.service = req.body.service;
        }
        if(req.body.CheIndex){
            appeal.CheIndex = req.body.CheIndex;
        }
        if(req.body.dateFiling){
            appeal.dateFiling = req.body.dateFiling;
        }


        appeal.save((err, appeal) => {
            if(err){
                h.sendJsonResponse(res,400, err);
            }
            h.sendJsonResponse(res,200, appeal);
        });

    });

};

module.exports.delete = async (req, res, next) => {

    if(!await h.isValidToken(req.headers.token)){
        h.sendJsonResponse(res, 401, {error: 'unauthorized'});
        return;
    }

    appeal.findByIdAndRemove(req.params.id, (err) => {
        if(err){
            h.sendJsonResponse(res,400, err);
        }
        h.sendJsonResponse(res,204, null);
    });
};
let mongoose = require('mongoose');


module.exports.index = (req, res, next) => {




    res.render('index', {title: 'INFO: Смотрите закомментированный код в этом контроллере для изучения операций создания записей в коллекциях MongoDB'});

};
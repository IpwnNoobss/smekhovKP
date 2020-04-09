let mongoose = require( 'mongoose' );

let appealSchema = new mongoose.Schema({
    FCS: {type: String, required: true},
    actualAddress: {type: String, required: true, default: "Неизвестный руководитель"},
    phoneNumber: {type: String, required: true},
    service: {type: String, required: true},
    CheIndex: {type: String, required: true},
    dateFiling: {type: Date, required: true, default: Date.now},

});

// компиляция модели
mongoose.model('appeal', appealSchema );


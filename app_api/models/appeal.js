let mongoose = require( 'mongoose' );

let appealSchema = new mongoose.Schema({
    FCS: {type: String, required: true},
    actualAddress: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    service: {type: String, required: true},
    CheIndex: {type: String, required: true},
    dateFiling: {type: Date, required: true, default: Date.now},

    userId: {type: Number, required: false}
});

// компиляция модели
mongoose.model('appeal', appealSchema );


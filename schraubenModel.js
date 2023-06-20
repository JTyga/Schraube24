const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VerkaufSchema = new Schema({
    schrauben_typ: { type: String, required: true, maxLength: 30 },
    produkt_id: { type: String, required: true, maxLength: 10 },
    verkaufsdatum: { type: Date },
    preis_pro_einheit: { type: Number },
    menge: {type: Number}
});

// Virtuelles Attribut für den Gesamtpreis des Verkaufs
VerkaufSchema.virtual("gesamtpreis").get(function () {
    gesamtpreis = this.menge * this.preis_pro_einheit
    return Math.round(gesamtpreis, 2);
  });
  
//stehen lassen, sonst wird der Gesamtpreis nicht angezeigt im request
VerkaufSchema.set('toObject', { virtuals: true });
VerkaufSchema.set('toJSON', { virtuals: true });

const schraubenModel = mongoose.model('Schraube', VerkaufSchema, 'schrauben');

module.exports = schraubenModel;
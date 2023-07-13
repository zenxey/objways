const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    Handle: String,
    ḍTitle: String,
    Body: String,
    Vendor: String,
    Type: String,
    Tags: String,
    Option1Name: String,
    Option1Value: String,
    Option2Name: String,
    Option2Value: String,
    Option3Name: String,
    Option3Value: String,
    VariantSKU: String,
    VariantGrams: Schema.Types.Mixed,
    VariantInventoryTracker: String,
    VariantInventoryQty: Schema.Types.Mixed,
    VariantInventoryPolicy: String,
    VariantFulfillmentService: String,
    VariantPrice: Schema.Types.Mixed,
    VariantCompareAtPrice: Schema.Types.Mixed,
    ImageSrc: String,
});

module.exports = mongoose.model('prodData', productSchema, 'productData');
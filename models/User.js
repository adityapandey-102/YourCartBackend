const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wishlist: {

        wishlistItem: {
            type: [Schema.Types.Mixed],
            default: []
        },
        wishlistId: {
            type: Schema.Types.Mixed,
            default: {}
        }
    },
    cart: {
        cartItem: {
            type: [Schema.Types.Mixed],
            default: []
        },
        cartItemCount: {
            type: Schema.Types.Mixed,
            default: {}
        }
    },
});
const User = mongoose.model('user', userSchema)
module.exports = User;
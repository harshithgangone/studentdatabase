const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const passwordSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

passwordSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (error, salt) => {
        if (error) {
            return next(error);
        }

        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
                
            }

            user.password = hash;
            next();
        });
    });
});

const Password = mongoose.model('Password', passwordSchema);
module.exports = Password;

const { SchemaTypes, Schema, model } = require('mongoose');
const roles = require(`../../Roles`);

const player = Schema({
    uuid: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    role: {
        type: SchemaTypes.String,
        enum: roles.map(role => role.name),
        required: true,
        default: roles.find(role => role.name == `none`).name
    }
});

module.exports = model('players', player);

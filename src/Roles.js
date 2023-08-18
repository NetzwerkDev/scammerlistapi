/**
 * @typedef {Object} Role 
 * @property {string} name 
 * @property {string} display 
 * @property {string} color 
 * @property {number} limit 
 * @property {boolean} roles 
 * @property {boolean} prefix 
 */

/**
 * @type {Role[]}
 */

module.exports = [
    {
        name: `owner`,
        display: `OWNER`,
        color: `4`,
        limit: -1,
        prefix: true,
        roles: true
    },
    {
        name: `h_admin`,
        display: `H-ADMIN`,
        color: `4`,
        limit: -1,
        prefix: true,
        roles: true
    },
    {
        name: `admin`,
        display: `ADMIN`,
        color: `4`,
        limit: -1,
        prefix: true,
        roles: true
    },
    {
        name: `developer`,
        display: `DEVELOPER`,
        color: `b`,
        limit: -1,
        prefix: true,
        roles: false
    },
    {
        name: `staff`,
        display: `STAFF`,
        color: `9`,
        limit: -1,
        prefix: true,
        roles: false
    },
    {
        name: `partner`,
        display: `PARTNER`,
        color: `d`,
        limit: -1,
        prefix: true,
        roles: false
    },
    {
        name: `content`,
        display: `CONTENT`,
        color: `e`,
        limit: -1,
        prefix: true,
        roles: false
    },
    {
        name: `e_girl`,
        display: `E-GIRL`,
        color: `d`,
        limit: 1,
        prefix: true,
        roles: false
    },
    {
        name: `freund`,
        display: `FREUND`,
        color: `a`,
        limit: 10,
        prefix: true,
        roles: false
    },
    {
        name: `scammer`,
        display: `SCAMMER`,
        color: `c`,
        limit: -1,
        prefix: false,
        roles: false
    },
    {
        name: `none`,
        display: null,
        color: null,
        limit: -1,
        prefix: false,
        roles: false
    }
]
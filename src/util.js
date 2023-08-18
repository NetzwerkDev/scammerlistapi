const { Request, Response, NextFunction } = require('express');
const jwt = require(`jsonwebtoken`);

module.exports = {

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @param {NextFunction} next 
     */

    catchError(req, res, next) {
        res.status(404).send({
            error: `404: Not Found`
        });
    },

    /**
     * 
     * @param {string} sessionId 
     * @param {string} uuid 
     * @param {boolean} equal 
     */

    validJWTSession(token, uuid) {
        const tokenUuid = this.getUuidByJWT(token);
        return !!tokenUuid;
    },

    /**
     * 
     * @param {string} token 
     * @returns {string?}
     */

    getUuidByJWT(token) {
        const decodedToken = jwt.decode(token, { complete: true });
        if(!decodedToken) return null;
        if(decodedToken.payload.iss != `LabyConnect`) return null;
        
        try {
            const verifiedToken = jwt.verify(token, server.cfg.labyConnect);
    
            return verifiedToken.uuid?.replaceAll(`-`, ``);
        } catch(err) {
            return null;
        }
    },

    /**
     * 
     * @param {import('./Roles').Role} role 
     * @returns {string}
     */

    getRoleDisplay(role) {
        if(!role.display || !role.display) return null;
        return `${role.prefix ? `§f§lLabyUnity §8| ` : ``}§${role.color}§l${role.display}`;
    }
}

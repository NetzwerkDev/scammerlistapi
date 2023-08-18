const express = require(`express`);
const router = express.Router();
const Roles = require(`../Roles`);

router.route(`/:uuid`)
.get(async (req, res) => {
    const uuid = req.params.uuid.replaceAll(`-`, ``);
    const { authorization } = req.headers;
    const authenticated = authorization && server.util.validJWTSession(authorization, uuid);

    if(server.cfg.requireSessionIds && !authenticated) return res.status(401).send({ error: `You're not allowed to perform that request!` });

    const player = await server.db.players.findOne({ uuid });
    if(!player) return res.status(404).send({ error: `This player is not in our records!` });
    let role = Roles.find((role) => role.name == player.role?.toLowerCase());
    if(!role) role = Roles.find((role) => role.name == `none`);

    res.send({
        uuid: player.uuid,
        role: role.name,
        display: server.util.getRoleDisplay(role)
    });
}).post(async (req, res) => {
    const uuid = req.params.uuid.replaceAll(`-`, ``);
    const roleName = req.body.role.toLowerCase();
    const { authorization } = req.headers;
    const authenticated = authorization && server.util.validJWTSession(authorization, uuid);

    if(!authenticated) return res.status(401).send({ error: `You're not allowed to perform that request!` });
    const requester = await server.db.players.findOne({ uuid: server.util.getUuidByJWT(authorization) });
    if(!requester || !Roles.find((role) => role.name == requester.role)?.roles) return res.status(403).send({ error: `You're not allowed to perform that request!` });

    const role = Roles.find((role) => role.name == roleName);
    if(!role) return res.status(400).send({ error: `This role does not exist!` });
    if(role.limit > -1) {
        const limit = role.limit;
        const players = await server.db.players.find({ role: role.name });
        if(players.length >= limit) return res.status(400).send({ error: `This role already has ${players?.length}/${limit} players!` });
    }

    const player = await server.db.players.findOne({ uuid });
    
    if(!player) {
        await new server.db.players({
            uuid,
            role: role.name
        }).save();
        
        res.status(201).send({ message: `The user's role was successfully set!` });
    } else {
        if(player.role == role.name) return res.status(400).send({ error: `The user already has this role!` });

        player.role = role.name;
        await player.save();
        
        res.status(200).send({ message: `The user's role was successfully set!` });
    }
});

module.exports = router;

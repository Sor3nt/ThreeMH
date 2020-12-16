MANHUNT.entity.Hunter = function ( entity, model ) {

    var base = new MANHUNT.entity.abstract(entity, model.getLOD(0), model);

    return Object.assign(base, {
        speed: {
            walk: 350,
            crouch: 175,
        },

        animations: {
            move: ['PlayerAnims', 'BAT_MOVE_RUN_FORWARDS_ANIM'],
            idle: ['PlayerAnims', 'ASY_INMATE_IDLE_1'],
            crouchMove: ['PlayerAnims', 'BAT_MOVE_RUN_FORWARDS_ANIM'],
            crouchIdle: ['PlayerAnims', 'BAT_CROUCH_IDLE_ANIM'],
        }


    });
};
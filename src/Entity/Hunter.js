MANHUNT.entity.Hunter = function ( entity, model ) {

    var base = new MANHUNT.entity.abstract(entity, model.getLOD(0), model);


    var headRecordName = base.record.getValue("HEAD");
    if (headRecordName !== false && headRecordName !== "no_hed"){

        var headRecord = MANHUNT.level.getStorage('glg').find(headRecordName);
        var headModelName = headRecord.getValue("MODEL");

        var headModel = MANHUNT.level.getStorage('mdl').find(headModelName);
        var headObj = headModel.get();

        //TODO: WHY do i need this ?!
        headObj.traverse( function ( object ) {
            if ( object.isMesh ) object.scale.set(1,1,1);
        } );

        base.object.skeleton.bones.forEach(function (bone) {
            if (bone.name === "Bip01_Head") bone.add(headObj);
        });
    }

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
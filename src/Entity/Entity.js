MANHUNT.entity.abstract = function ( instEntity, object, model ) {


    object.name = instEntity.name;
    object.scale.set(MANHUNT.scale, MANHUNT.scale, MANHUNT.scale);

    var self = {
        name: instEntity.name,
        lod: model,
        record: MANHUNT.level.getStorage('glg').find(instEntity.glgRecord),
        settings: instEntity,
        object: object,


        getPosition: function(){
            return new THREE.Vector3(
                object.position.x / MANHUNT.scale,
                object.position.y / MANHUNT.scale,
                object.position.z / MANHUNT.scale
            )
        },

        setPosition: function (vec3) {
            object.position.set(
                vec3.x * MANHUNT.scale,
                vec3.y * MANHUNT.scale,
                vec3.z * MANHUNT.scale
            )
        },

        setRotation: function (vec4) {

            var quaternion = new THREE.Quaternion(vec4.x, vec4.z, -vec4.y, vec4.w * -1);

            var v = new THREE.Euler();
            v.setFromQuaternion(quaternion);

            object.rotation.copy(v );

        }

    };

    self.setPosition(instEntity.position);
    self.setRotation(instEntity.rotation);


    return self;

};
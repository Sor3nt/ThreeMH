MANHUNT.entity.construct = (function ( ) {

    var self = {
        byInstEntry: function (entry, model) {
            if (typeof model === "undefined"){

                return false;
                // const geometry = new THREE.BoxGeometry( 1 / 48, 1 / 48, 1 / 48 );
                // const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                // model = new THREE.Mesh( geometry, material );
            }

            switch (entry.entityClass) {

                // case 'Trigger_Inst':
                //     return new MANHUNT.entity.Trigger(entry, callback);
                case 'Player_Inst':
                    return new MANHUNT.entity.Player(entry, model);
                case 'Hunter_Inst':
                    return new MANHUNT.entity.Hunter(entry, model);
                // case 'Light_Inst':
                //     return new MANHUNT.entity.Light(entry, model);
                default:


                    // scene.add( cube );
                    // console.log(entry.entityClass);
                    return new MANHUNT.entity.Default(entry, model);
                    // return new MANHUNT.entity.Dummy(entry, callback);
                    // callback(false);
                    // console.log(
                    //     "[MANHUNT.entity.construct] Unknown class",
                    //     entry.entityClass
                    // );

                    return false;
            }
        }

    };

    return {
        byInstEntry: self.byInstEntry
    };

})();
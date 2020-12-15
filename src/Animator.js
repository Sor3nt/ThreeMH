MANHUNT.animator = (function () {

    var self = {

        _mixer: {},

        play: function( object, animationName){
            console.log(object);

            if (typeof self._mixer[object.uuid] === "undefined")
                self._mixer[object.uuid] = new THREE.AnimationMixer(object);

            MANHUNT.animation.getAnimationClip(animationName, function (anim) {

                console.log("FROM LOADER", anim[ 0 ]);
                var action = self._mixer[object.uuid].clipAction( anim[ 0 ] );
                action.play();
            });

        },

        addMixer: function(uuid, mixer){
            self._mixer[uuid] = mixer;
        },

        update: function (delta) {

            for(var i in self._mixer){
                // if (!self._mixer.hasOwnProperty(i)) continue;
                // console.log("update mixer", self._mixer[i]);
                self._mixer[i].update( delta );
            }

        }

    };

    return {
        addMixer: self.addMixer,
        play: self.play,
        update: self.update
    }
})();
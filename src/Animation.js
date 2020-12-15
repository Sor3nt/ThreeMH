MANHUNT.animation = (function () {

    var self = {

        _clips : {},

        getAnimationClip: function( name, callback ){

            if (typeof MANHUNT.config.animation[name] === "undefined"){
                console.log('[MANHUNT.animation] Animation not configured', name);
                return false;
            }

            if (typeof self._clips[name] !== "undefined") return callback(self._clips[name]);

            MANHUNT.loader.load('anim', MANHUNT.config.animation[name], function (anim) {
                self._clips[name] = anim;
                callback(self._clips[name]);
            });
        }

    };

    return {
        getAnimationClip: self.getAnimationClip
    }
})();
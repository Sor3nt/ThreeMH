
MANHUNT.storage.Model = function () {
    var self = {
        _data: {},

        _proxy : [],

        _cache: [],

        load: function(file, callback){
            MANHUNT.loader.load('mdl', file, function (proxy) {
                self._proxy.push(proxy);
                callback();
            });
        },


        find: function (name) {

            var found = false;
            // if (typeof self._cache[name] !== "undefined"){
            //     var copy = new new THREE.SkinnedMesh();
            //     // copy.copy(self._cache[name]);
            //     var clone = self._cache[name].clone(copy, true);
            //     // clone.geometry = self._cache[name].geometry.clone();
            //     // clone.material = self._cache[name].material.clone();
            //     return clone;
            // }

            self._proxy.forEach(function (proxy) {
                if (found !== false) return;

                found = proxy.find(name);
            });

            if (found === false){
                console.log('[MANHUNT.Storage.Model','] Unable to find model', name);
                return false;
            }

            // self._cache[name] = found;
            return {
                get: function () {
                    return found;
                },

                LODLength: found.children.length,

                enableLOD: function(lodIndex){
                    found.children[found.userData.LODIndex].visible = false;
                    found.userData.LODIndex = lodIndex;
                    found.children[found.userData.LODIndex].visible = true;
                },

                getLOD: function (lodIndex) {
                    return found.children[lodIndex];

                }
            };
        }

    };

    return {
        load: self.load,
        find: self.find
    }
};
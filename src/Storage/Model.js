
MANHUNT.storage.Model = function () {
    var self = {
        _data: {},

        _proxy : [],

        load: function(file, callback){
            MANHUNT.loader.load('mdl', file, function (proxy) {
                self._proxy.push(proxy);
                callback();
            });
        },

        find: function (name) {

            var found = false;

            self._proxy.forEach(function (proxy) {
                if (found !== false) return;

                found = proxy.find(name);
            });

            if (found === false){
                console.log('[MANHUNT.Storage.Model','] Unable to find model', name);
                return false;
            }

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
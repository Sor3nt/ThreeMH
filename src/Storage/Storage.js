
MANHUNT.storage.Storage = function (loader) {
    var self = {
        _data: {},

        load: function(file, callback){
            MANHUNT.loader.load(loader, file, function (entries) {
                entries.forEach(function (entry) {
                    self.add(entry);
                });

                callback();

            });
        },

        add: function (entry) {
            if (typeof entry.name === "undefined"){
                console.log('[MANHUNT.Storage.',loader,'] Error: Given data has no name property ', entry);
                return;
            }

            self._data[entry.name.toLowerCase()] = entry;
        },

        find: function (name) {
            if (name === false) return false;

            var data = self._data[name.toLowerCase()];

            if (typeof data === "undefined"){
                console.log('[MANHUNT.Storage.',loader,'] Unable to find data', name);
                return false;
            }

            return data;
        }

    };

    return {
        getData: function(){
            var result = [];

            for(var i in self._data){
                if (!self._data.hasOwnProperty(i)) continue;
                result.push(self._data[i]);
            }

            return result;
        },
        load: self.load,
        add: self.add,
        find: self.find
    }
};
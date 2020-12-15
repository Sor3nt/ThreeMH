
MANHUNT.loader = (function () {
    var self = {

        _loaders : {
            glg: new MANHUNT.fileLoader.GLG(),
            ifp: new MANHUNT.fileLoader.IFP(),
            mdl: new MANHUNT.fileLoader.MDL(),
            bsp: new MANHUNT.fileLoader.BSP(),
            tex: new MANHUNT.fileLoader.TEX(),
            mls: new MANHUNT.fileLoader.MLS(),
            tvp: new MANHUNT.fileLoader.TVP(),
            inst: new MANHUNT.fileLoader.INST()
        },

        get: function(loader){
            return self._loaders[loader];
        },

        load: function (loader, url, callback) {
            if (typeof self._loaders[loader] === "undefined"){
                console.log("[MANHUNT.loader] Loader unknown", loader);
                return;
            }

            self._loaders[loader].load(url, callback);
        }

    };

    return {
        get: self.get,
        load: self.load
    }
})();
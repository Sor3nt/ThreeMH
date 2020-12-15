MANHUNT.camera = (function () {

    var self = {

        _camera: {},
        _active : 'perpective',
        _lookAt: null,

        _init: function () {
            var aspect = window.innerWidth / window.innerHeight;
            self._camera.perpective = new THREE.PerspectiveCamera(MANHUNT.fov, aspect, 0.1, 1000);
            self._camera.perpective.updateProjectionMatrix();
            // self._camera.orthographic = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000 );
            // self._camera = new THREE.PerspectiveCamera(MANHUNT.fov, 640 / 480, 0.1, 10000);
            // self._camera.scale.set(MANHUNT.scale , MANHUNT.scale, MANHUNT.scale);
        },

        enableTVPCamera: function () {
            // self._active = "tvp";
        },

        update: function(){
            if (self._lookAt === null) return;
            if (MANHUNT.entityInteractive.isActive()) return;

            //
            // self._camera.position.x = -2149.107421874998;
            // self._camera.position.y = 94.08000004291529;
            // self._camera.position.z = 686.3491973876949;
            // return;

            // if (self._active === "orthographic") return;
            //
            // var player = MANHUNT.level.getEntity('player(player)');
            // if (typeof player === "undefined") return;

            var player = self._lookAt;

            var relativeCameraOffset = new THREE.Vector3(0,2,-3);

            //UPDATE PLAYER WORLD MATRIX FOR PERFECT CAMERA FOLLOW
            player.updateMatrixWorld();
            //Apply offset to player matrix
            var cameraOffset = relativeCameraOffset.applyMatrix4( player.matrixWorld );


            var camera = self.getCamera();
            camera.position.lerp(cameraOffset, 0.1);
            var look = player.position.clone();
            // look.y += 80;
            camera.lookAt( look );

        },

        setCameraType: function(type){
            self._active = type;
        },


        setPosition: function(vec){
            var camera = self.getCamera();
            camera.position.x = vec.x;
            camera.position.y = vec.y;
            camera.position.z = vec.z;
        },


        setLookAt: function(object){
            self._lookAt = object;
        },



        getCamera: function () {
            return self._camera[self._active];
        }
    };

    self._init();

    return {
        setPosition: self.setPosition,
        setLookAt: self.setLookAt,
        setCameraType: self.setCameraType,
        getCamera: self.getCamera,
        update: self.update,
        enableTVPCamera: self.enableTVPCamera
    }
})();
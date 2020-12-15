
MANHUNT.engine = (function () {

    var self = {

        renderer: {},
        scene: {},
        scene2: {},
        clock: {},

        init: function () {
            self.scene = self._createScene();
            self.renderer = self._createRenderer();
            self.clock = new THREE.Clock();

            var container = document.getElementById('container');
            container.appendChild(self.renderer.domElement);

            window.addEventListener('resize', self._onWindowResize, false);
        },

        _onWindowResize: function() {
            window.windowWidth = window.innerWidth;
            window.windowHeight = window.innerHeight;

            self.renderer.setSize(window.windowWidth, window.windowHeight);
        },

        _createRenderer: function () {
            var renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
            renderer.setSize(window.innerWidth, window.innerHeight);
            // renderer.outputEncoding = THREE.RGBADepthPacking;
            // renderer.logarithmicDepthBuffer = true;
            return renderer;
        },

        _createScene: function () {
            var scene = new THREE.Scene();
            var scene2 = new THREE.Scene();
            // scene.fog = new THREE.Fog(0x333333, 500, 3000);
            //
            // var hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
            // hemiLight.position.set( 0, 0, 0 );
            // scene.add( hemiLight );
            //

            // const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
            // scene.add( ambientLight );


            self.scene = scene;
            self.scene2 = scene2;

            scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );

            return scene;
        },


        render: function () {
            requestAnimationFrame(self.render);

            var delta = MANHUNT.engine.getClock().getDelta();

            // window.spotLightHelper.update();
            MANHUNT.camera.update();
            MANHUNT.control.update(delta);
            // MANHUNT.animator.update(delta);
            // MANHUNT.entityInteractive.update();

            // self.renderer.render(self.scene2, MANHUNT.camera.getCamera());
            self.renderer.render(self.scene, MANHUNT.camera.getCamera());
        },

        getRenderer: function () {
            return self.renderer;
        },

        getScene: function () {
            return self.scene;
        },

        getScene2: function () {
            return self.scene2;
        },

        getClock: function () {
            return self.clock;
        }

    };


    return {
        init: self.init,
        getRenderer: self.getRenderer,
        getClock: self.getClock,
        getScene: self.getScene,
        getScene2: self.getScene2,
        render: self.render
    }
})();
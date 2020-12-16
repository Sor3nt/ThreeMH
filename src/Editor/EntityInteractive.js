MANHUNT.entityInteractive = (function () {

    var self = {
        transformControl: {},
        orbitControls: {},

        _selected : null,

        init: function () {
            self.transformControl = new TransformControls( MANHUNT.camera.getCamera(), MANHUNT.engine.getRenderer().domElement );

            self.orbitControls = new OrbitControls( MANHUNT.camera.getCamera(), MANHUNT.engine.getRenderer().domElement );
            self.orbitControls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
            self.orbitControls.dampingFactor = 0.05;
            self.orbitControls.screenSpacePanning = false;
            self.orbitControls.minDistance = 100 ;
            self.orbitControls.maxDistance = 500 ;
            self.orbitControls.maxPolarAngle = Math.PI / 2;
            self.orbitControls.enabled = false;

            self.transformControl.addEventListener( 'dragging-changed', function ( event ) {
                self.orbitControls.enabled = ! event.value;
            } );


            self.transformControl.addEventListener( 'change', function ( event ) {
                if (self._selected === null) return;

                var section = MANHUNT.sidebar.menu.getSection('entity');
                section && section.getView('xyz').update();
            } );

            MANHUNT.engine.getScene().add( self.transformControl );
            MANHUNT.engine.getRenderer().domElement.addEventListener( 'click', self._onClick, true );


        },


        _onClick: function ( event ) {
            if (self._selected !== null) return;

            var camera = MANHUNT.camera.getCamera();
            var domElement = MANHUNT.engine.getRenderer().domElement;
            var scene = MANHUNT.engine.getScene();

            var _raycaster = new THREE.Raycaster();
            var _mouse = new THREE.Vector2();

            var rect = domElement.getBoundingClientRect();

            _mouse.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
            _mouse.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

            _raycaster.setFromCamera( _mouse, camera );

            var intersects = _raycaster.intersectObjects( scene.children );

            if (intersects.length === 1){
console.log(intersects[0].object);
                self.lookAtObject(intersects[0].object);

            }
        },

        lookAtObject: function(object){

            self._selected = object;

            self.orbitControls.enabled = true;
            self.orbitControls.target = self._selected.position.clone();

            self.transformControl.attach( object );

            //Update sidebar menu
            var entitySection = MANHUNT.sidebar.menu.getSection('entity');
            entitySection && entitySection.getView('xyz').setObject(object);

            MANHUNT.camera.setPosition(object.position);

            var relativeCameraOffset = new THREE.Vector3(0,2,-3);
            var cameraOffset = relativeCameraOffset.applyMatrix4( object.matrixWorld );

            var camera = MANHUNT.camera.getCamera();
            camera.position.lerp(cameraOffset, 0.1);

        },

        reset: function(){
            self._selected = null;
        },

        update: function () {
            if (self._selected === null) return;

            self.orbitControls.update();
        },

        isActive: function () {
            return self._selected !== null;
        }

    };

    return {
        lookAtObject: self.lookAtObject,
        reset: self.reset,
        isActive: self.isActive,
        init: self.init,
        update: self.update
    }
})();
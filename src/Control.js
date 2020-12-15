MANHUNT.control = (function () {

    var self = {

        walkSpeed: 350,
        crouchSpeed: 175,

        _controls: {
            moveForward: false,
            moveBackward: false,
            moveLeft: false,
            moveRight: false

        },

        _init: function () {
            document.addEventListener( 'keydown', self._onKeyDown, false );
            document.addEventListener( 'keyup', self._onKeyUp, false );
        },

        update: function( delta ){

            var entity = MANHUNT.level.getStorage('entity').find('player(player)');

            if (typeof entity === "undefined") return;

            var object = entity.object;

            var moveDistance = 1000 * delta;
            walking = false;

            // move forwards / backwards
            if ( self._controls.moveBackward )
                object.translateZ( -moveDistance );
            if ( self._controls.moveForward )
                object.translateZ(  moveDistance );
            // rotate left/right
            if ( self._controls.moveLeft )
                object.rotation.y += delta;
            if ( self._controls.moveRight )
                object.rotation.y -= delta;



            // MANHUNT.level.getEntity('player(player)').object.position.x += delta;

        },

        _onKeyDown: function (event) {

            switch (event.keyCode) {

                case 38: /*up*/
                case 87: /*W*/
                    self._controls.moveForward = true;
                    break;

                case 40: /*down*/
                case 83: /*S*/
                    self._controls.moveBackward = true;
                    break;

                case 37: /*left*/
                case 65: /*A*/
                    self._controls.moveLeft = true;
                    break;

                case 39: /*right*/
                case 68: /*D*/
                    self._controls.moveRight = true;
                    break;


            }

        },
        _onKeyUp: function (event) {

            switch (event.keyCode) {

                case 38: /*up*/
                case 87: /*W*/
                    self._controls.moveForward = false;
                    break;

                case 40: /*down*/
                case 83: /*S*/
                    self._controls.moveBackward = false;
                    break;

                case 37: /*left*/
                case 65: /*A*/
                    self._controls.moveLeft = false;
                    break;

                case 39: /*right*/
                case 68: /*D*/
                    self._controls.moveRight = false;
                    break;


            }

        }
    };

    self._init();

    return {
        update: self.update
    }
})();
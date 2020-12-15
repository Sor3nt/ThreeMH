MANHUNT.sidebar.view.Xyz = function () {
    var base = new MANHUNT.sidebar.view.construct();

    var self = Object.assign(base, {

        _elements: {
            container: {}
        },

        _position : false,
        _save : false,

        _object : false,
        _initialPosition : false,

        _init: function () {

            var template = "<h1 class='headline'>Nothing selected</h1>";

            var container = document.createElement('div');
            container.className = "view entity";
            container.innerHTML = template;
            self._elements.container = container;

            self._position = MANHUNT.sidebar.elements.InputGroup({
                x: 0,
                y: 0,
                z: 0
            });

            self._position.container.style.display = "none";
            container.appendChild(self._position.container);
            //
            // self._save = MANHUNT.sidebar.elements.Button("save");
            // self._save.setOnClickCallback(function () {
            //     alert("save todo");
            // });
            //
            // container.appendChild(self._save.container);

        },

        setObject: function( object ){
            self._object = object;
            self._initialPosition = object.position.clone();

            self._observeProperty('x', object.position, 'x');
            self._observeProperty('y', object.position, 'y');
            self._observeProperty('z', object.position, 'z');

            var headline = self._elements.container.getElementsByClassName('headline')[0];
            headline.innerHTML = object.name;

            self._position.container.style.display = "block";
        },

        _observeProperty: function(property, object, field){
            self._position.setOnChangeCallback(property, function (event) {
                object[field] = parseFloat(event.target.value);
            });

        },

        update: function () {
            if (self._object === false) return false;

            self._position.updateValue('x', self._object.position.x);
            self._position.updateValue('y', self._object.position.y);
            self._position.updateValue('z', self._object.position.z);
        },

    });


    self._init();

    return {
        setObject: self.setObject,
        hide: self.hide,
        show: self.show,
        container: self._elements.container,
        update: self.update
    }
};
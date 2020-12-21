MANHUNT.sidebar.view.SceneSelection = function () {
    var base = new MANHUNT.sidebar.view.construct();

    var self = Object.assign(base, {

        _elements: {
            container: {},
            scene: {}
        },

        _init: function () {

            var container = document.createElement('div');
            container.className = "view scene-selection";
            self._elements.container = container;


            self._elements.scene = MANHUNT.sidebar.elements.InputGroup({
                scene1: true,
                scene2: true,
                scene3: false
            }, 'checkbox');

            self._elements.scene.setOnChangeCallback('scene1', self.onSceneSelectionChanged);
            self._elements.scene.setOnChangeCallback('scene2', self.onSceneSelectionChanged);
            self._elements.scene.setOnChangeCallback('scene3', self.onSceneSelectionChanged);

            container.appendChild(self._elements.scene.container);
        },

        onSceneSelectionChanged: function(event){
            var sceneName = event.target.name;
            var enable = event.target.checked;

            MANHUNT.level.getStorage('bsp').find(sceneName).visible = enable;
        }

    });


    self._init();

    return {
        hide: self.hide,
        show: self.show,
        container: self._elements.container
    }
};
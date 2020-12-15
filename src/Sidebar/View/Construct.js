MANHUNT.sidebar.view.construct = function ( entry ) {

    var self = {

        _elements: {
            container: {}
        },

        hide: function () {
            self._elements.container.style.display = "none";
        },

        show: function () {
            self._elements.container.style.display = "block";
        },


    };

    return {
        hide: self.hide,
        show: self.show,
    };

};
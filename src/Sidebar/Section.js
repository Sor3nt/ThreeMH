MANHUNT.sidebar.Section = function (settings) {

    var self = {

        container: {},
        sectionButton: {},

        _view : {},

        _init: function () {
            self.container = document.createElement('div');
            self.container.className = "section";


            self.sectionButton = document.createElement('div');
            self.sectionButton.innerHTML = settings.icon;

            self.hide();
        },

        addView: function ( viewName ) {
            viewName = viewName.toLowerCase();

            var view = false;
            switch (viewName) {

                case 'xyz': view = new MANHUNT.sidebar.view.Xyz(); break;
                case 'entity-selection': view = new MANHUNT.sidebar.view.EntitySelection(); break;
                default:
                    console.log("[MANHUNT.sidebar.menu] View is unknown", view);
                    return;
            }

            self.container.appendChild(view.container);
            self._view[viewName] = view;
        },

        getView: function (viewName) {
            if (typeof self._view[viewName] === "undefined") return false;

            return self._view[viewName];
        },

        hide: function (view) {
            if (typeof view === "undefined") self.container.style.display = "none";
            else self._view[view].hide();
            self.sectionButton.className = "";
        },

        show: function (view) {
            if (typeof view === "undefined") self.container.style.display = "block";
            else self._view[view].show();
            self.sectionButton.className = "active";
        },

    };

    self._init();

    return {
        container: self.container,
        sectionButton: self.sectionButton,

        hide: self.hide,
        show: self.show,
        addView: self.addView,
        getView: self.getView
    }
};
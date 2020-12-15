MANHUNT.sidebar.menu = (function () {

    var self = {

        _elements: {
            sections: {},
            container: {},
            selections: {},
        },

        _section : {},
        _activeSection : false,

        init: function () {
            self._elements.container = document.getElementById('menu');
            self._elements.sections = document.getElementById('sections');
            self._elements.selections = document.getElementById('selection');

            self._createSections();

            self.showSection('entity');
        },

        _createSections: function(){
            self._section.entity = new MANHUNT.sidebar.Section({
                name: 'Entity',
                icon: 'ENTT'
            });

            self._section.entity.addView('entity-selection');
            self._section.entity.addView('xyz');


            self._section.trigger = new MANHUNT.sidebar.Section({
                name: 'Trigger',
                icon: '⚑'
            });


            self._section.tvp = new MANHUNT.sidebar.Section({
                name: 'Timed Vector Pair',
                icon: '🎥'
            });

            //Append all sections into the sidebar
            for(var i in self._section){
                if (!self._section.hasOwnProperty(i)) continue;
                self._elements.selections.appendChild(self._section[i].sectionButton);
                self._elements.sections.appendChild(self._section[i].container);

                (function(element, sectionIndex){
                    element.onclick = function () {
                        MANHUNT.sidebar.menu.showSection(sectionIndex);
                    }
                })(self._section[i].sectionButton, i);
            }
        },

        showSection: function(section){
            if(typeof self._section[section] === "undefined") return false;

            if (self._activeSection !== false) self._activeSection.hide();
            self._activeSection = self._section[section];

            self._activeSection.show();

        },

        getSection: function (section) {
            if(typeof self._section[section] === "undefined") return false;
            return self._section[section];
        }


    };


    return {
        init: self.init,
        showSection: self.showSection,
        getSection: self.getSection
    }
})();
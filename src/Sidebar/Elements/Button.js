MANHUNT.sidebar.elements.Button = function (label) {

    var self = {

        container: {},

        _button: {},

        _init: function () {

            var template =
                "<button>" + label + "</button>"
            ;

            var container = document.createElement('div');
            container.className = "element button";
            container.innerHTML = template;


            self._button = container.getElementsByTagName('button')[0];


            self.container = container;
        },


        setOnClickCallback: function(callback){
            self._button.onclick = callback;

        },

    };

    self._init();


    return {
        container: self.container,
        setOnClickCallback: self.setOnClickCallback,
    }
};
MANHUNT.sidebar.elements.Dropdown = function ( values ) {

    var self = {

        container: {},

        _init: function () {

            var container = document.createElement('select');
            container.className = "element dropdown";


            self.container = container;
        },

        setValues: function(values){
            self.container.innerHTML = "";

            values.forEach(function (value) {

                var option = document.createElement('option');
                option.value = value;
                option.innerHTML = value;

                self.container.appendChild(option);

            });

            $(self.container).select2();
        },


        onChangeCallback: function(callback){
            self.container.onchange = callback;
        }

    };

    self._init();


    return {
        container: self.container,
        setValues: self.setValues,
        onChangeCallback: self.onChangeCallback,
    }
};
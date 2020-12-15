MANHUNT.sidebar.elements.InputGroup = function (setting) {

    var self = {

        container: {},

        _fields: {},

        _init: function () {
            var container = document.createElement('div');
            container.className = "element input-group";

            for(var i in setting){
                if (!setting.hasOwnProperty(i)) continue;

                var field = self._createField(i, setting[i]);
                container.appendChild(field.container);
                self._fields[i] = field;

            }

            self.container = container;
        },

        updateValue: function(label, value) {
            self._fields[label].setValue(value);

        },

        setOnChangeCallback: function(label, callback){
            self._fields[label].onChange(callback);

        },

        _createField: function (label, value) {

            var template =
                "<label>" + label + "</label>" +
                "<input value='" + value + "'>"
            ;

            var container = document.createElement('div');
            container.className = "input label";
            container.innerHTML = template;

            var input = container.getElementsByTagName('input')[0];

            return {
                name: label,
                container: container,
                field: input,

                setValue: function (value) {
                    input.value = value;
                },

                onChange: function (callback) {
                    console.log("ADD CALLBACK", input, callback);
                    input.onblur = callback;
                }
            }

        }


    };

    self._init();


    return {
        container: self.container,
        updateValue: self.updateValue,
        setOnChangeCallback: self.setOnChangeCallback,
    }
};
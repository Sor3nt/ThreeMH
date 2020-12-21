MANHUNT.sidebar.elements.InputGroup = function (entries, type, callback) {

    type = type || 'text';

    var self = {

        container: {},

        _fields: {},

        _init: function () {
            var container = document.createElement('div');
            container.className = "element input-group";

            for(var i in entries){
                if (!entries.hasOwnProperty(i)) continue;

                var field = self._createField(i, entries[i]);
                container.appendChild(field.container);
                self._fields[i] = field;

                if (typeof callback === "function"){
                    self.setOnChangeCallback(i, callback);
                }

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
                "<label>" + label + "</label>"
            ;

            if (type === "checkbox"){
                template +=  "<input name='"+label+"' type='" + type + "' " + (value === true ? "checked='checked'" : '') + ">"
            }else{
                template +=  "<input name='"+label+"' type='" + type + "' value='" + value + "'>"
            }

            var container = document.createElement('div');
            container.className = "input label";
            container.innerHTML = template;

            var input = container.getElementsByTagName('input')[0];


            return {
                name: label,
                container: container,
                field: input,

                setValue: function (value) {
                    if (type === "checkbox"){
                        if (value) input.setAttribute('checked', true);
                        else input.removeAttribute('checked');
                    }else{
                        input.value = value;

                    }
                },

                onChange: function (callback) {
                    if (type === "text"){
                        input.onblur = callback;
                    }else{
                        input.onchange = callback;

                    }
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
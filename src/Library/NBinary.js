function NBinary( data){

    var current = 0;

    var self = {

        remain: function(){
            return data.byteLength - current;
        },


        consume: function (bytes, type) {
            var view = new DataView(data,current);

            current += bytes;

            if (type === 'int16') return view.getInt16(0, true);
            if (type === 'int32') return view.getInt32(0, true);
            if (type === 'uint32') return view.getUint32(0, true);
            if (type === 'float32') return view.getFloat32(0, true);
            if (type === 'uint16') return view.getUint16(0, true);
            if (type === 'int8') return view.getInt8(0, true);
            if (type === 'uint8') return view.getUint8(0, true);
            if (type === 'arraybuffer'){

                var buffer = new ArrayBuffer(bytes);
                var storeView = new DataView(buffer);

                var index = 0;
                while(bytes--){
                    storeView.setUint8(index, view.getUint8(index, true));
                    index++;
                }
                return buffer;
            }
            if (type === 'dataview'){

                var subview = new DataView(data,current - bytes, bytes);

                return subview;
            }
            if (type === 'string'){

                var str = "";
                var index = 0;
                while(bytes--){
                    str += String.fromCharCode(view.getUint8(index, true));
                    index++
                }

                return str;
            }
            console.log(type, "not known, error");

            return view;
        },

        getString: function (delimiter, doPadding) {
            var view = new DataView(data,current);

            var name = '';
            var nameIndex = 0;
            while(self.remain() > 0){
                var val = self.consume(1, 'uint8');
                if (val === delimiter) break;
                name += String.fromCharCode(val);
                nameIndex++;
            }

            if (doPadding === true){
                nameIndex++;

                if (4 - (nameIndex % 4) !== 4){
                    current += 4 - (nameIndex % 4);
                }

            }

            return name;
        },

        readXYZ: function () {
            return {
                x: self.consume(4, 'float32'),
                y: self.consume(4, 'float32'),
                z: self.consume(4, 'float32')
            };
        },

        readXYZW: function () {
            return {
                x: self.consume(4, 'float32'),
                y: self.consume(4, 'float32'),
                z: self.consume(4, 'float32'),
                w: self.consume(4, 'float32')
            };
        }

    };

    return {
        setCurrent: function(cur){
            current = cur;
        },
        current : function(){
            return current;
        },
        remain: self.remain,
        readXYZ: self.readXYZ,
        readXYZW: self.readXYZW,
        consume: self.consume,
        getString: self.getString
    }
}
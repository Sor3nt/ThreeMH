/**
 * BSP Reader based on the awesome work from Majest1c_R3
 */
MANHUNT.fileLoader.BSP = function () {

    var loader = new THREE.FileLoader();
    loader.setResponseType( 'arraybuffer' );

    return {
        load: function (file, callback ) {

            loader.load(
                file,
                function ( data ) {

                    var binary = new NBinary(data);

                    var fourCC = binary.consume(4, 'int32');

                    binary.setCurrent( 80);
                    var Materials_offset = binary.consume(4, 'int32');
                    var Materials_count = binary.consume(4, 'int32');

                    var material = [];
                    for(var i = 0; i < Materials_count; i++ ){
                        binary.setCurrent( Materials_offset + 12 * i);
                        var Tex_name_offset = binary.consume(4, 'int32');

                        binary.setCurrent(Tex_name_offset);
                        var TextureName = binary.getString(0, false);

                        var texture = MANHUNT.level.getStorage('tex').find(TextureName);

                        texture.wrapS =  THREE.RepeatWrapping;
                        texture.wrapT =  THREE.RepeatWrapping;
                        // texture.wrapS =  THREE.UVMapping;
                        // texture.wrapT =  THREE.UVMapping;
                        // texture.repeat(4);

                        // var mat = new THREE.MeshBasicMaterial( { color: 0xff55ff  } );
                        var mat = new THREE.MeshBasicMaterial( { map: texture  } );
                        // var mat = new THREE.MeshStandardMaterial( { map: texture,  transparent: true  } );
                        // mat.metalness = 0;
                        if (texture.format === THREE.RGBA_S3TC_DXT5_Format){
                            mat.transparent = true;
                        }else{
                            mat.transparent = false;
                        }

                        mat.vertexColors = THREE.VertexColors;
                        // if (file === "./data/levels/A01_Escape_Asylum/scene2_pc.bsp"){
                        //     // mat.depthTest = false;
                        //     mat.depthWrite = false;
                        //
                        // }

                        material.push( mat );
                    }

                    binary.setCurrent(16);
                    var mainfat_offset = binary.consume(4, 'int32');
                    var mainfat_cnt = binary.consume(4, 'int32');

                    binary.setCurrent(80);
                    var textures_offset = binary.consume(4, 'int32');
                    var textures_cnt = binary.consume(4, 'int32');


                    var fat_cntr = 0;
                    var geom_cntr = 0;
                    var meshRoot = new THREE.Mesh();
                    meshRoot.colorsNeedUpdate = true;

                    while( fat_cntr !== mainfat_cnt){

                        var geometry = new THREE.Geometry();
                        // geometry.vertexColors = [];

                        var FAT_OFFSET = mainfat_offset+4*fat_cntr;

                        binary.setCurrent(FAT_OFFSET);
                        var FAT_entry = binary.consume(4, 'int32');

                        binary.setCurrent(FAT_entry);
                        var Geom_offset = binary.consume(4, 'int32');

                        binary.setCurrent(Geom_offset);
                        var GeomIdent = binary.consume(4, 'int32');

                        if (GeomIdent === 0x0045D454) {
                            var normals = [];

                            var materialForFace = [];

                            geom_cntr += 1;

                            var model_size = binary.consume(4, 'int32');
                            var unknown = binary.consume(4, 'int32');
                            var materials_count = binary.consume(4, 'int32');
                            var fce_count = binary.consume(4, 'int32');
                            var float1 = binary.consume(4, 'float32');
                            var float2 = binary.consume(4, 'float32');
                            var float3 = binary.consume(4, 'float32');
                            var float4 = binary.consume(4, 'float32');
                            var ScaleX = binary.consume(4, 'float32');
                            var ScaleY = binary.consume(4, 'float32');
                            var ScaleZ = binary.consume(4, 'float32');
                            var vert_count = binary.consume(4, 'int32');
                            var verts_offset = Geom_offset + 148 + materials_count * 44 + fce_count * 2;
                            var faces_offset = Geom_offset + 148 + materials_count * 44;

                            for (i = 0; i < materials_count; i++){

                                binary.setCurrent(Geom_offset+148+24+i*44);

                                var cur_mat_faces = binary.consume(2, 'uint16');
                                var cur_texture = binary.consume(2, 'uint16');
                                var cur_faces_skip = binary.consume(2, 'uint16');

                                cur_mat_faces = cur_mat_faces / 3;
                                cur_faces_skip = cur_faces_skip / 3;

                                for (var k = cur_faces_skip; k < (cur_faces_skip+cur_mat_faces); k++) {
                                    materialForFace[k] = cur_texture;
                                }
                            }

                            binary.setCurrent(faces_offset);
                            for (i = 0; i < fce_count / 3; i++) {

                                var face3 = new THREE.Face3(
                                    binary.consume(2, 'int16'),
                                    binary.consume(2, 'int16'),
                                    binary.consume(2, 'int16')
                                );
                                face3.materialIndex = materialForFace[i];
                                geometry.faces.push(face3);
                            }


                            var uvArray = [];
                            var cpvArray = [];
                            binary.setCurrent(verts_offset);
                            for (i = 0; i < vert_count; i++) {

                                geometry.vertices.push(
                                    new THREE.Vector3(
                                        binary.consume(4, 'float32'),
                                        binary.consume(4, 'float32'),
                                        binary.consume(4, 'float32')
                                    )
                                );

                                var normal = {
                                    'x': binary.consume(2, 'int16') / 32768.0,
                                    'y': binary.consume(2, 'int16') / 32768.0,
                                    'z': binary.consume(2, 'int16') / 32768.0,
                                    'pad': binary.consume(2, 'int16'),
                                };

                                normals.push(new THREE.Vector3(normal.x, normal.y, normal.z));


                                // binary.setCurrent(binary.current() + 8);

                                var B = binary.consume(1, 'uint8')/ 255.0;
                                var G = binary.consume(1, 'uint8')/ 255.0;
                                var R = binary.consume(1, 'uint8')/ 255.0;
                                var A = binary.consume(1, 'uint8');
                                cpvArray.push(new THREE.Color( R, G, B ));


                                uvArray.push([
                                    binary.consume(4, 'float32'),
                                    binary.consume(4, 'float32')
                                ]);

                                binary.setCurrent(binary.current() + 8);
                            }

                            var uvForFaces = [];
                            geometry.faces.forEach(function (face, faceIndex) {

                                face.vertexNormals =[
                                    normals[face.a],
                                    normals[face.b],
                                    normals[face.c]
                                ];

                                face.vertexColors = [
                                    cpvArray[face.a],
                                    cpvArray[face.b],
                                    cpvArray[face.c]
                                ];

                                uvForFaces[faceIndex] = [
                                    new THREE.Vector2(
                                        uvArray[face.a][0],
                                        uvArray[face.a][1]
                                    ),
                                    new THREE.Vector2(
                                        uvArray[face.b][0],
                                        uvArray[face.b][1]
                                    ),
                                    new THREE.Vector2(
                                        uvArray[face.c][0],
                                        uvArray[face.c][1]
                                    )
                                ];
                            });

                            geometry.faceVertexUvs = [uvForFaces];
                            geometry.uvsNeedUpdate = true;


                            geometry.computeBoundingSphere();
                            // geometry.computeFaceNormals();
                            // geometry.computeVertexNormals();

                            var mesh = new THREE.Mesh( geometry, material );
                            mesh.scale.set(MANHUNT.scale, MANHUNT.scale, MANHUNT.scale);
                            mesh.alphaTest = 0.5;
                            mesh.colorsNeedUpdate = true;

                            meshRoot.children.push(mesh);
                        }

                        fat_cntr += 1;

                    }

                    meshRoot.rotation.y = 270 * (Math.PI/180); // convert vertical fov to radians
                    meshRoot.name = file.indexOf('scene1') !== -1 ? 'scene1' : 'scene2';
                    callback([meshRoot]);

                }
            );

        }
    };

};
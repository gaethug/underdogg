/**
 * Binds a TinyMCE widget to <textarea> elements.
 */
angular.module('ui.tinymce',[])
    .value('uiTinymceConfig', {
        convert_urls: false,
        relative_urls: false,
        menubar:false,
        skin:"light",
        statusbar: false,
        height: 300,
        plugins: "advlist, autolink, lists, link, code, table, image, textcolor, link ",
        toolbar: 'bold italic | forecolor | fontsizeselect | alignleft aligncenter alignright alignjustify  | removeformat | hr link | bullist numlist | table | qulkyimageuploadbutton | code | qulkyrejectbutton',
        //content_css: 'http://www.qulky.com/stylesheets/bootflat_qulky.css',
        textcolor_map: [
            "717171", "base",
            "d7d7d7", "default",
            "3e3191", "primary",
            "398500", "success",
            "279692", "info",
            "d79800", "warning",
            "bd1212", "danger",
            "0b0b0b", "inverse"
        ],
        textcolor_rows: 2,
        textcolor_cols: 4
    })
    .directive('uiTinymce', ['uiTinymceConfig','Modal', '$timeout', function (uiTinymceConfig, Modal) {
        uiTinymceConfig = uiTinymceConfig || {};
        var generatedIds = 0;
        return {
            priority: 10,
            require: 'ngModel',
            link: function (scope, elm, attrs, ngModel) {
                var expression, options, tinyInstance,
                    updateView = function () {
                        ngModel.$setViewValue(elm.val());
                        /*if (!scope.$root.$$phase) {
                            scope.$apply();
                        }*/
                    };
                // generate an ID if not present
                if (!attrs.id) {
                    attrs.$set('id', 'uiTinymce' + generatedIds++);
                }

                if (attrs.uiTinymce) {
                    expression = scope.$eval(attrs.uiTinymce);
                } else {
                    expression = {};
                }

                // make config'ed setup method available
                if (expression.setup) {
                    var configSetup = expression.setup;
                    delete expression.setup;
                }

                options = {
                    // Update model when calling setContent (such as from the source editor popup)
                    setup: function (ed) {
                        var args;
                        ed.on('init', function(args) {
                           // console.log("init");
                            ngModel.$render();
                            ngModel.$setPristine();
                        });
                        // Update model on button click
                        ed.on('ExecCommand', function (e) {
                            //console.log("ExecCommand");
                            ed.save();
                            updateView();
                        });
                        // Update model on keypress
                        ed.on('KeyUp', function (e) {
                           // console.log("KeyUp");
                            ed.save();
                            updateView();
                        });
                        // Update model on change, i.e. copy/pasted text, plugins altering content
                        ed.on('SetContent', function (e) {
                            if(!e.initial){
                              //  console.log("SetContent");
                                ed.save();
                                updateView();
                            }
                        });
                        ed.on('blur', function(e) {
                            elm.blur();
                        });
                        ed.on('ObjectResized', function (e) {
                            ed.save();
                            updateView();
                        });
                        if(expression && expression.reject){
                            ed.addButton('qulkyrejectbutton', {
                                title:'수신거부 링크를 추가합니다.',
                                text:'수신거부',
                                //icon: 'mce-ico mce-i-image',
                                onclick: function() {
                                    scope.$apply(function(){
                                        Modal.open({
                                            templateUrl:  '/modalpopup/email/addRejectLink',
                                            controller:'addRejectMsgCtrl'
                                        }, function(result){
                                            if(result!= null){
                                                ed.selection.setContent('<p>'+result.rejectMSG+'[<a href="http://www.qulky.com/rejectEmail">수신거부</a>]</p>');
                                            }
                                        });
                                    });

                                }
                            });
                        }
                        /*hslee 20131213 tinymce내에 커스텀 버튼 삽입*/
                        ed.addButton('qulkyimageuploadbutton', {
                            title:'Image Upload',
                            icon: 'mce-ico mce-i-image',
                            onclick: function() {
                                scope.$apply(function(){
                                    Modal.open({
                                        templateUrl:  '/modalpopup/common/uploadImage',
                                        controller:'imageUploadCtrl',
                                        resolve:{options:function(){return {aspectRatio:null, setSelect:null,maxFileSize:3000000, resize:null}}}
                                    }, function(result){
                                        if(result!= null){
                                            ed.selection.setContent('<p><img src="'+'http://'+location.host+result+'"></p>');
                                            //ed.setContent(ed.getContent()+'<p><img src="'+result+'"></p>');
                                            //ed.save();
                                            //updateView();
                                        }
                                    });
                                });

                            }
                        });
                        if (configSetup) {
                            configSetup(ed);
                        }
                    },
                    mode: 'exact',
                    elements: attrs.id
                };
                // extend options with initial uiTinymceConfig and options from directive attribute value
                angular.extend(options, uiTinymceConfig, expression);
                setTimeout(function () {
                    tinymce.init(options);
                });
                ngModel.$render = function() {
                    if (!tinyInstance) {
                        tinyInstance = tinymce.get(attrs.id);
                    }
                    if (tinyInstance) {
                        tinyInstance.setContent(ngModel.$viewValue || '');
                    }
                };

                scope.$on('$destroy', function() {
                    if (!tinyInstance) { tinyInstance = tinymce.get(attrs.id); }
                    if (tinyInstance) {
                        tinyInstance.remove();
                        tinyInstance = null;
                    }
                });
                /*setTimeout(function () {
                    tinymce.init(options);
                    ngModel.$render = function() {
                        //console.log("$render");
                        if (!tinyInstance) {
                            tinyInstance = tinymce.get(attrs.id);
                        }
                        if (tinyInstance) {
                            tinyInstance.setContent(ngModel.$viewValue || '');
                        }
                    };
                },0);
*/
            }
        };
    }]);
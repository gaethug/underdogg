underdoggApp.directive('penEditor', [ function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            var editor = null;
            var options = {
                editor: element[0],//document.body, // {DOM Element} [required]
                class: 'pen', // {String} class of the editor,
                debug: true, // {Boolean} false by default
                textarea: '<textarea name="content"></textarea>', // fallback for old browsers
                list: [
                    'blockquote', 'h2', 'h3', 'p', 'insertorderedlist', 'insertunorderedlist',
                    'indent', 'outdent', 'bold', 'italic', 'underline', 'createlink'
                ]
               // stay: true
            }

            var setModelValue = function(){
                scope.$apply(function() {
                    ngModel.$setViewValue(editor.config.editor.innerHTML);

                });
            };
            scope.$watch('somethingAttached', function(newVal){
                if(!!newVal){
                    if(newVal != ""){
                        editor.config.editor.innerHTML += newVal;
                    }
                }
            });
            setTimeout(function(){
                editor = new Pen(options);
                console.log(editor);
                editor.config.editor.innerHTML = ngModel.$viewValue || '';
                editor.config.editor.addEventListener('keypress', function(e) {
                    console.log('keypress');
                    setModelValue();
                });
                editor.config.editor.addEventListener('paste', function(e) {
                    console.log('paste');
                    setModelValue();
                });
            },0);

        }

    };

}]);
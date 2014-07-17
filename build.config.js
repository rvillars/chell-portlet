/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    /**
     * These are the dependencies needed for this module and their order
     */
    module_dependencies: [
        //jQuery
        'bower-components/jquery/dist/jquery.js',

        // AngularJS
        'bower-components/angular/angular.js',
        'bower-components/angular-mocks/angular-mocks.js',

        //AnglularUI
        'bower-components/angular-bootstrap/ui-bootstrap-tpls.js',
        'bower-components/angular-ui-utils/ui-utils.js',
        'bower-components/angular-ui-sortable/sortable.js',

        //jQuery UI
        'bower-components/jquery-ui/ui/jquery.ui.core.js',
        'bower-components/jquery-ui/ui/jquery.ui.widget.js',
        'bower-components/jquery-ui/ui/jquery.ui.mouse.js',
        'bower-components/jquery-ui/ui/jquery.ui.sortable.js',
        'bower-components/jquery-ui/ui/jquery.ui.draggable.js',
        'bower-components/jquery-ui/ui/jquery.ui.droppable.js',
        
        //Angular-Translate
        'bower-components/angular-translate/angular-translate.js'
    ],

    /**
     * These are the files needed for this module and their order
     */
    module_files: [
        'locale-en.js',
        'module.js',
        'directives.js',
        'controllers.js'
    ],

    module_adapters: [
        'adapters/*'
    ]
};
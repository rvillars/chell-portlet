'use strict';

var chellPortlet = angular.module('chell-portlet', ['templates-chell-portlet', 'ui.bootstrap', 'ui.sortable', 'ui.utils', 'pascalprecht.translate']);

chellPortlet.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);


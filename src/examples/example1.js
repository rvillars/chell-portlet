/*jshint globalstrict: true*/
'use strict';

var chellPortletExample1 = angular.module('chell-portlet-example1', [
    'chell-portlet'
]);

chellPortletExample1.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: '../i18n/locale-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);
'use strict';

var chellPortlet = angular.module('chell-portlet');

chellPortlet.controller('PortletController', function ($scope, $modal, $element, $attrs) {

    $scope.minimized = $scope.$eval($attrs.minimized);
    $scope.fullscreen = $scope.$eval($attrs.fullscreen);
    $scope.pinned = $scope.$eval($attrs.pinned);
    $scope.borderless = $scope.$eval($attrs.borderless);

    $scope.toggleMinimized = function () {
        $scope.minimized = !($scope.minimized);
    };

    $scope.toggleFullscreen = function () {
        $scope.fullscreen = !($scope.fullscreen);

    };

    $scope.close = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/portlet-confirm-dialog.tpl.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: 'PortletModalConfirmController',
            resolve: {
                message: function () {
                    return 'Remove the Portlet?';
                }
            }
        });

        $scope.modalInstance.result.then(function (confirmed) {
            if (confirmed) {
                $element.remove();
            }
        });
    };

    $scope.config = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/portlet-config-dialog.tpl.html',
            backdrop: 'static',
            keyboard: 'false',
            controller: 'PortletModalConfigController',
            resolve: {
                config: function () {
                    return {
                        borderless: $scope.borderless,
                        pinned: $scope.pinned
                    };
                }
            }
        });

        $scope.modalInstance.result.then(function (config) {
            $scope.borderless = config.borderless;
            $scope.pinned = config.pinned;
        });
    };
});

chellPortlet.controller('PortletModalConfigController', function ($scope, $modalInstance, config) {

    $scope.config = config;

    $scope.ok = function () {
        $modalInstance.close($scope.config);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

chellPortlet.controller('PortletModalConfirmController', function ($scope, $modalInstance, message) {

    $scope.message = message;

    $scope.ok = function () {
        $scope.confirmed = true;
        $modalInstance.close($scope.confirmed);
    };

    $scope.cancel = function () {
        $scope.confirmed = false;
        $modalInstance.dismiss($scope.confirmed);
    };
});

chellPortlet.controller('SortableController', function ($scope) {

    $scope.origPortlets = [
        {
            title: 'Test1',
            content: 'Content1'
        },
        {
            title: 'Test2',
            content: 'Content2'
        },
        {
            title: 'Test3',
            content: 'Content3'
        }
    ];

    $scope.portlets = $scope.origPortlets.slice();

    $scope.sortableOptions = {
        connectWith: '.portlet-container',
        iframeFix: false,
//        items: 'div.box',
        opacity: 0.8,
        helper: 'original',
        revert: true,
        cancel: '.portlet-pinned',
        forceHelperSize: true,
        placeholder: 'box-placeholder round-all',
        forcePlaceholderSize: true,
        tolerance: 'pointer'
    };

    $scope.reset = function() {
        $scope.portlets = $scope.origPortlets.slice();
    };
});

chellPortlet.controller('IframeController', function ($scope, $modal, $attrs, $sce) {

    $scope.config = {};
    $scope.config.src = $attrs.src;
    $scope.config.width = $attrs.width;
    $scope.config.height = $attrs.height;

    $scope.edit = function () {
        $scope.modalInstance = $modal.open({
            templateUrl: 'templates/iframe-config-dialog.tpl.html',
            backdrop: 'false',
            keyboard: 'true',
            controller: 'IframeConfigModalController',
            windowClass: 'modal-wide',
            resolve: {
                modalConfig: function () {
                    return angular.copy($scope.config);
                }
            }
        });
        $scope.modalInstance.result.then(function (modalConfig) {
            $scope.config = modalConfig;
        });
    };

    $scope.trustSrc = function(src) {
        return $sce.trustAsResourceUrl(src);
    };
});

chellPortlet.controller('IframeConfigModalController', function ($scope, $modalInstance, modalConfig) {

    $scope.modalConfig = modalConfig;

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.ok = function () {
        $modalInstance.close($scope.modalConfig);
    };

});

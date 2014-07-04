'use strict';

var chellPortlet = angular.module('chell-portlet');

chellPortlet.directive('chellPortlet', function () {
    return {
        restrict: 'E',
        transclude: true,
        scope: {
            title: '@title'
        },
        controller: 'PortletController',
        templateUrl: 'templates/portlet.tpl.html',
        link: function (scope, element, attrs) {
            scope.$watch('fullscreen', function(isFullscreen) {
                if (isFullscreen) {
                    $(element).find('.box-content').height($(window).height());
                } else {
                    $(element).find('.box-content').height('auto');
                }
            });
            scope.$watch('borderless', function(isBorderless) {
                if (isBorderless) {
                    $(element).find('.box').addClass('box-borderless');
                } else {
                    $(element).find('.box').removeClass('box-borderless');
                }
            });
            scope.$watch('pinned', function(isPinned) {
                if (isPinned) {
                    $(element).find('.box').addClass('portlet-pinned');
                } else {
                    $(element).find('.box').removeClass('portlet-pinned');
                }
            });
        }
    };
});

chellPortlet.directive('chellPortletContainer', function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            $('.column', element).sortable({
                connectWith: '.column',
                iframeFix: false,
                items: 'div.box',
                opacity: 0.8,
                helper: 'original',
                revert: true,
                cancel: '.portlet-pinned',
                forceHelperSize: true,
                placeholder: 'box-placeholder round-all',
                forcePlaceholderSize: true,
                tolerance: 'pointer',
                handle: '.box-header'
            });
        }
    };
});

chellPortlet.directive('chellIframe', function () {
    return {
        restrict: 'E',
        controller: 'IframeController',
//        scope: {
//            src:'@src',
//            height: '@height',
//            width: '@width'
//        },
        templateUrl: 'templates/iframe.tpl.html'
    };
});

chellPortlet.directive('chellPortletTemplate', function() {
    return {
        restrict: 'E',
        replace:true,
        transclude: true,
        scope: {
            name: '@name'
        },
        templateUrl: 'templates/portlet-template.tpl.html',
        link: function (scope, element, attrs) {
            element.draggable({
                revert: 'invalid',
                cursor: 'pointer',
                connectWith: '.dropme',
                helper: 'clone',
                opacity: 0.5,
                zIndex: 10
            });
        }
    };
});

chellPortlet.directive('uiDroppable', function() {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ngModel) {
            element.droppable({
                accept: '.portlet-template',
                activeClass: 'highlight',
                drop: function(event, ui) {
//                    if (ngModel) {
//                        ngModel.$modelValue.push({
//                            title: 'Test'+(ngModel.$modelValue.length+1),
//                            content: 'Content'+(ngModel.$modelValue.length+1)
//                        });
//
//                        scope.$apply(ngModel);
//                    }
                    $(element[0]).append(ui.draggable[0].children[1].firstElementChild);
                }
            });
        }
    };
});

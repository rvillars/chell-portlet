'use strict';
// Source: build/module.js
var chellPortlet = angular.module('chell-portlet', [
    'templates-chell-portlet',
    'ui.sortable',
    'ui.utils'
  ]);;// Source: build/directives.js
var chellPortlet = angular.module('chell-portlet');
chellPortlet.directive('chellPortlet', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: { title: '@title' },
    controller: 'PortletController',
    templateUrl: 'templates/portlet.tpl.html',
    link: function (scope, element, attrs) {
      scope.$watch('fullscreen', function (isFullscreen) {
        if (isFullscreen) {
          $(element).find('.box-content').height($(window).height());
        } else {
          $(element).find('.box-content').height('auto');
        }
      });
      scope.$watch('borderless', function (isBorderless) {
        if (isBorderless) {
          $(element).find('.box').addClass('box-borderless');
        } else {
          $(element).find('.box').removeClass('box-borderless');
        }
      });
      scope.$watch('pinned', function (isPinned) {
        if (isPinned) {
          $(element).find('.box').addClass('portlet-pinned');
        } else {
          $(element).find('.box').removeClass('portlet-pinned');
        }
      });
    }
  };
});
chellPortlet.directive('chellPortletContainer', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
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
chellPortlet.directive('chellPortletTemplate', function () {
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    scope: { name: '@name' },
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
chellPortlet.directive('uiDroppable', function () {
  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, element, attrs, ngModel) {
      element.droppable({
        accept: '.portlet-template',
        activeClass: 'highlight',
        drop: function (event, ui) {
          $(element[0]).append(ui.draggable[0].children[1].firstElementChild);
        }
      });
    }
  };
});;// Source: build/controllers.js
var chellPortlet = angular.module('chell-portlet');
chellPortlet.controller('PortletController', [
  '$scope',
  '$modal',
  '$element',
  '$attrs',
  function ($scope, $modal, $element, $attrs) {
    $scope.minimized = $scope.$eval($attrs.minimized);
    $scope.fullscreen = $scope.$eval($attrs.fullscreen);
    $scope.pinned = $scope.$eval($attrs.pinned);
    $scope.borderless = $scope.$eval($attrs.borderless);
    $scope.toggleMinimized = function () {
      $scope.minimized = !$scope.minimized;
    };
    $scope.toggleFullscreen = function () {
      $scope.fullscreen = !$scope.fullscreen;
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
  }
]);
chellPortlet.controller('PortletModalConfigController', [
  '$scope',
  '$modalInstance',
  'config',
  function ($scope, $modalInstance, config) {
    $scope.config = config;
    $scope.ok = function () {
      $modalInstance.close($scope.config);
    };
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }
]);
chellPortlet.controller('PortletModalConfirmController', [
  '$scope',
  '$modalInstance',
  'message',
  function ($scope, $modalInstance, message) {
    $scope.message = message;
    $scope.ok = function () {
      $scope.confirmed = true;
      $modalInstance.close($scope.confirmed);
    };
    $scope.cancel = function () {
      $scope.confirmed = false;
      $modalInstance.dismiss($scope.confirmed);
    };
  }
]);
chellPortlet.controller('SortableController', [
  '$scope',
  function ($scope) {
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
      opacity: 0.8,
      helper: 'original',
      revert: true,
      cancel: '.portlet-pinned',
      forceHelperSize: true,
      placeholder: 'box-placeholder round-all',
      forcePlaceholderSize: true,
      tolerance: 'pointer'
    };
    $scope.reset = function () {
      $scope.portlets = $scope.origPortlets.slice();
    };
  }
]);;// Source: build/templates.js
angular.module('templates-chell-portlet', ['templates/portlet-config-dialog.tpl.html', 'templates/portlet-confirm-dialog.tpl.html', 'templates/portlet-template.tpl.html', 'templates/portlet.tpl.html']);

angular.module("templates/portlet-config-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/portlet-config-dialog.tpl.html",
    "<!-- Dialog for the config button on the portlets-->\n" +
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <button class=\"close\" ng-click=\"cancel()\">×</button>\n" +
    "        <h3>Adjust widget</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        <tabset>\n" +
    "            <tab heading=\"Portlet Config\">\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"config.borderless\"> Borderless\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"checkbox\">\n" +
    "                    <label>\n" +
    "                        <input type=\"checkbox\" ng-model=\"config.pinned\"> Pinned\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </tab>\n" +
    "        </tabset>\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"ok()\">Save Changes</button>\n" +
    "        <button class=\"btn\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/portlet-confirm-dialog.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/portlet-confirm-dialog.tpl.html",
    "<!-- Dialog for the config button on the portlets-->\n" +
    "<div class=\"modal-content\">\n" +
    "    <div class=\"modal-header\">\n" +
    "        <button class=\"close\" ng-click=\"cancel()\">×</button>\n" +
    "        <h3>Are you sure?</h3>\n" +
    "    </div>\n" +
    "    <div class=\"modal-body\">\n" +
    "        {{message}}\n" +
    "    </div>\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"btn btn-primary\" ng-click=\"ok()\">Ok</button>\n" +
    "        <button class=\"btn\" ng-click=\"cancel()\">Cancel</button>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/portlet-template.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/portlet-template.tpl.html",
    "<div class=\"portlet-template\">\n" +
    "    <div class=\"btn btn-default\">{{name}}</div>\n" +
    "    <div style=\"display: none\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("templates/portlet.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/portlet.tpl.html",
    "<div class=\"box\" ng-class=\"{'portlet-fullscreen': fullscreen}\" moveable-role-id=\"101\">\n" +
    "\n" +
    "    <h4 class=\"box-header\" ng-class=\"{'round-all': minimized, 'round-top': !minimized}\">{{title}}\n" +
    "        <a class=\"box-btn btn-xs\" ng-click=\"close()\"><i class=\"glyphicon glyphicon-remove\"></i></a>\n" +
    "        <a class=\"box-btn btn-xs\" ng-click=\"toggleFullscreen()\"><i class=\"glyphicon\" ng-class=\"{'glyphicon-resize-full': !fullscreen, 'glyphicon-resize-small': fullscreen}\"></i></a>\n" +
    "        <a class=\"box-btn btn-xs\" ng-click=\"toggleMinimized()\"><i class=\"glyphicon\" ng-class=\"{'glyphicon-minus': !minimized, 'glyphicon-plus': minimized}\"></i></a>\n" +
    "        <a visibility-role-id=\"1\" class=\"box-btn btn-xs\" ng-click=\"config()\"><i class=\"glyphicon glyphicon-cog\"></i></a>\n" +
    "    </h4>\n" +
    "\n" +
    "    <div class=\"box-container-toggle\" ng-class=\"{'box-container-closed': minimized}\">\n" +
    "        <div class=\"box-content\">\n" +
    "            <div ng-transclude></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);
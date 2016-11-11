class ScrollAreaDirective {
  static ddo() {
    return {
      restrict: 'EA',
      link: (scope, element, attr, ctrl) => ctrl.element = element,
      controller: ScrollAreaDirective
    };
  }
}

/**
 * @ngdoc directive
 * @name scrollArea
 * @restrict EA
 */
angular
  .module('PagingScroller')
  .directive('scrollArea', ScrollAreaDirective.ddo);

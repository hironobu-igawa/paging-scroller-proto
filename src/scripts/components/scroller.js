class ScrollerComponent {
  constructor() {
  }
}

class ScrollerDDO {
  static link(scope, element, attr, component, transclude) {
    transclude(function(node, childScope) {
      childScope.scroller = component;
      element.append(node);
    });

    const areaElement = angular.element(window);

    ScrollerDDO.top(scope, areaElement, () => {
      component.index --;
      scope.$apply();

      areaElement.scrollTop(ScrollerDDO.getScrollHeight(areaElement) - element.height() - 1);
    });

    ScrollerDDO.bottom(scope, areaElement, () => {
      component.index ++;
      scope.$apply();

      areaElement.scrollTop(1);
    });
  }

  static top(scope, element, callback) {
    function scrollHandler(event) {
      if (element.scrollTop() !== 0) {
        return;
      }

      callback(event);
    }

    element.on('scroll', scrollHandler);
    scope.$on('$destroy', () => element.off('scroll', scrollHandler));
  }

  static bottom(scope, element, callback) {
    function scrollHandler(event) {
      const scrollHeight = ScrollerDDO.getScrollHeight(element);
      const scrollPosition = element.height() + element.scrollTop();
      if (scrollHeight - scrollPosition > 0) {
        return;
      }

      callback(event);
    }

    element.on('scroll', scrollHandler);
    scope.$on('$destroy', () => element.off('scroll', scrollHandler));
  };

  static getScrollHeight(element) {
    return element.get(0) === window
      ? angular.element(document).height()
      : element.get(0).scrollHeight;
  }

  static ddo() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      template: `
<div></div>
      `,
      scope: {
        index: '='
      },
      link: ScrollerDDO.link,
      controller: ScrollerComponent,
      controllerAs: 'scroller',
      bindToController: true
    };
  }
}

angular.module('PagingScroller').directive('scroller', ScrollerDDO.ddo);

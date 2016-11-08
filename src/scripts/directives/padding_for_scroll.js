class PaddingForScroll {
  static ddo() {
    return {
      restrict: 'E',
      link: (scope, element, attr, ctrl) => ctrl.link(scope, element),
      controller: PaddingForScroll
    };
  }

  link(scope, element) {
    this.element = element;
    this.scrollElement = angular.element(window);
    this.element.css('display', 'block');

    scope.$watch(() => {
      this.element.height(0);
      this.element.hide();

      if (this.scrollHeight > this.outerHeight) {
        console.log('Hide padding');
        return;
      }

      this.element.height(this.scrollHeight - this.innerHeight + 1);
      this.element.show();
      console.log(`Show padding.`);
    });
  }

  get scrollHeight() {
    return this.scrollElement.get(0) === window
      ? angular.element(document).height()
      : this.scrollElement.get(0).scrollHeight;
  }

  get outerHeight() {
    return this.scrollElement.height();
  }

  get innerHeight() {
    let element = this.scrollElement.get(0) === window
      ? angular.element('body')
      : this.scrollElement;

    return element.children().get()
      .map((d) => angular.element(d).outerHeight())
      .reduce((s, h) => s + h, 0);
  }
}

angular
  .module('PagingScroller')
  .directive('paddingForScroll', PaddingForScroll.ddo);

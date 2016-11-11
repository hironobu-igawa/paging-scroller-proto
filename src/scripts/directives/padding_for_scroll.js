class PaddingForScrollDirective {
  static ddo() {
    return {
      restrict: 'E',
      link: (scope, element, attr, ctrls) => ctrls[0].link(scope, element, ctrls),
      require: ['paddingForScroll', '?^scrollArea'],
      controller: PaddingForScrollDirective
    };
  }

  link(scope, element, ctrls) {
    this.element = element;
    this.scrollAreaDirective = ctrls[1];

    this.element.css('display', 'block');

    scope.$watch(() => {
      this.element.height(0);
      this.element.hide();

      if (this.scrollHeight > this.outerHeight) return;

      this.element.height(this.scrollHeight - this.innerHeight + 10);
      this.element.show();
    });
  }

  get scrollElement() {
    return this.scrollAreaDirective
      ? this.scrollAreaDirective.element
      : angular.element(window);
  }

  get scrollHeight() {
    return this.scrollElement.get(0) === window
      ? angular.element(document).height()
      : this.scrollElement.get(0).scrollHeight;
  }

  get outerHeight() {
    return this.scrollElement.innerHeight();
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

/**
 * @ngdoc directive
 * @name paddingForScroll
 * @restrict E
 */
angular
  .module('PagingScroller')
  .directive('paddingForScroll', PaddingForScrollDirective.ddo);

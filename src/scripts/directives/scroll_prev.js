class ScrollPrev {
  constructor($parse) {
    this.$parse = $parse;
  }

  static ddo() {
    return {
      restrict: 'A',
      link: (scope, element, attr, ctrl) => ctrl.link(scope, attr),
      controller: ScrollPrev
    };
  }

  link(scope, attr) {
    this.scrollElement = angular.element(window);

    let fn = this.$parse(attr.evScrollPrev, null, false);
    let deregistration = this.onPrev((event) => {
      let flg = fn(scope, event);
      scope.$apply();
      return flg;
    });

    scope.$on('$destroy', deregistration);
  }

  onPrev(callback) {
    let handler = _.throttle((event) => {
      if (this.scrollPosition > 0) return;
      if (callback(event) === false) return;

      this.scrollElement.scrollTop(this.scrollLength - 1);
    }, 200, {leading: true, trailing: true});

    this.scrollElement.on('scroll', handler);
    return () => this.scrollElement.off('scroll', handler);
  }

  get scrollLength() {
    let scrollHeight = this.scrollElement.get(0) === window
      ? angular.element(document).height()
      : this.scrollElement.get(0).scrollHeight;
    let elementHeight = this.scrollElement.height();

    return scrollHeight - elementHeight;
  }

  get scrollPosition() {
    return Math.round(this.scrollElement.scrollTop());
  }
}

angular
  .module('PagingScroller')
  .directive('evScrollPrev', [
    '$parse',
    ScrollPrev.ddo
  ]);

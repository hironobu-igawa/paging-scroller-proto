class ScrollNext {
  constructor($parse) {
    this.$parse = $parse;
  }

  static ddo() {
    return {
      restrict: 'A',
      link: (scope, element, attr, ctrl) => ctrl.link(scope, attr),
      controller: ScrollNext
    };
  }

  link(scope, attr) {
    this.scrollElement = angular.element(window);

    let fn = this.$parse(attr['evScrollNext'], null, false);
    let deregistration = this.onNext((event) => {
      let flg = fn(scope, event);
      scope.$apply();
      return flg;
    });

    scope.$on('$destroy', deregistration);
  }

  onNext(callback) {
    let handler = _.throttle((event) => {
      if (this.scrollPosition < this.scrollLength) return;
      if (callback(event) === false) return;

      this.scrollElement.scrollTop(1);
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
  .directive('evScrollNext', [
    '$parse',
    ScrollNext.ddo
  ]);

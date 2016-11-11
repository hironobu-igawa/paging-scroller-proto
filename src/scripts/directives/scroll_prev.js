class ScrollPrevDirective {
  constructor($parse) {
    this.$parse = $parse;
  }

  static ddo() {
    return {
      restrict: 'A',
      link: (scope, element, attr, ctrls) => ctrls[0].link(scope, attr, ctrls),
      require: ['evScrollPrev', '?^scrollArea'],
      controller: ScrollPrevDirective
    };
  }

  link(scope, attr, ctrls) {
    this.scrollElement = ctrls[1] ? ctrls[1].element : angular.element(window);

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
    return Math.ceil(this.scrollElement.scrollTop());
  }
}

/**
 * @ngdoc directive
 * @name evScrollPrev
 * @restrict A
 */
angular
  .module('PagingScroller')
  .directive('evScrollPrev', [
    '$parse',
    ScrollPrevDirective.ddo
  ]);

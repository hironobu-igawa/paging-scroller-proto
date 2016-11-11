class NormalComponent {
  constructor() {
    this.index = 1;
    this.min = 1;
    this.max = 10;
  }

  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'components/routes/normal.html',
      controller: NormalComponent,
      controllerAs: 'normal'
    };
  }

  prev() {
    if (!this.hasPrev()) return false;
    this.index --;
  }

  next() {
    if (!this.hasNext()) return false;
    this.index ++;
  }

  hasPrev() {
    return this.index > this.min;
  }

  hasNext() {
    return this.index < this.max;
  }
}

/**
 * @ngdoc component
 * @name normal
 */
angular
  .module('PagingScroller')
  .directive('normal', NormalComponent.ddo);

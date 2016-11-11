class MainComponent {
  constructor() {
    this.index = 1;
    this.min = 1;
    this.max = 10;
  }

  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'components/main.html',
      controller: MainComponent,
      controllerAs: 'main'
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
 * @name country
 */
angular
  .module('PagingScroller')
  .directive('main', MainComponent.ddo);

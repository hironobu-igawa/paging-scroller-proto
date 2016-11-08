class MainComponent {
  constructor() {
    this.index = 1;
    this.min = 1;
    this.max = 10;
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

class MainDDO {
  static ddo() {
    return {
      restrict: 'E',
      controller: MainComponent,
      controllerAs: 'main',
      templateUrl: 'main.html'
    }
  }
}

angular.module('PagingScroller').directive('main', MainDDO.ddo);

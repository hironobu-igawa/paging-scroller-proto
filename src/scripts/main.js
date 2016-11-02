class MainComponent {
  constructor() {
    this.index = 1;
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

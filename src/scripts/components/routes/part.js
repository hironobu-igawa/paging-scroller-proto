class PartComponent {
  constructor() {
    this.index = 1;
    this.min = 1;
    this.max = 10;
  }

  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'components/routes/part.html',
      controller: PartComponent,
      controllerAs: 'part'
    }
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

angular
  .module('PagingScroller')
  .directive('part', PartComponent.ddo);

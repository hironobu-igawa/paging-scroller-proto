class ModalComponent {
  constructor($uibModal) {
    this.$uibModal = $uibModal;
  }

  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'components/routes/modal.html',
      controller: ModalComponent,
      controllerAs: 'modal'
    };
  }

  open() {
    this.$uibModal.open({
      templateUrl: 'subModal.html',
      controller: SubModalComponent,
      controllerAs: 'subModal'
    });
  }
}

class SubModalComponent {
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

angular
  .module('PagingScroller')
  .directive('modal', ModalComponent.ddo);

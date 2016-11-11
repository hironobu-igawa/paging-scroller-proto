class CountryComponent {
  constructor() {
    this.names = [
      'USA',
      'China',
      'Japan',
      'Germany',
      'England',
      'France',
      'India',
      'Italy',
      'Brazil',
      'Canada'
    ];
  }

  static ddo() {
    return {
      restrict: 'E',
      templateUrl: 'components/parts/country.html',
      scope: {
        id: '=countryId'
      },
      controller: CountryComponent,
      controllerAs: 'country',
      bindToController: true
    };
  }

  get name() {
    return this.names[this.id - 1];
  }
}

/**
 * @ngdoc component
 * @name country
 * @param {string=} countryId
 */
angular
  .module('PagingScroller')
  .directive('country', CountryComponent.ddo);

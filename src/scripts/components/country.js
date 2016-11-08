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

  get name() {
    return this.names[this.id - 1];
  }
}

class CountryDDO {
  constructor() {
    this.restrict = 'E';

    this.template = `
<h3>{{country.name}}</h3>
<img ng-if="country.id >= 1" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 2" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 3" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 4" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 5" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 6" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 7" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 8" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 9" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
<img ng-if="country.id >= 10" ng-src="{{'country/' + country.name + '.gif'}}" style="display:block;">
    `;

    this.scope = {
      id: '=countryId'
    };
    this.controller = CountryComponent;
    this.controllerAs = 'country';
    this.bindToController = true;
  }

  static ddo() {
    return new CountryDDO();
  }
}

angular.module('PagingScroller').directive('country', CountryDDO.ddo);

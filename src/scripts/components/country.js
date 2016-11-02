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
    return this.names[this.countryId - 1];
  }
}

class CountryDDO {
  constructor() {
    this.restrict = 'E';

    this.template = `
<h3>{{country.name}}</h3>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}"><br>
<img ng-src="{{'country/' + country.name + '.gif'}}">
    `;

    this.scope = {
      countryId: '='
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

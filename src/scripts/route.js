class RouteConfig {
  static config($routeProvider) {
    $routeProvider
      .when('/normal', {
        template: `<normal>`
      })
      .when('/part', {
        template: `<part>`
      })
      .when('/modal', {
        template: `<modal>`
      })
      .otherwise('/normal');
  }
}

angular
  .module('PagingScroller')
  .config(['$routeProvider', RouteConfig.config]);

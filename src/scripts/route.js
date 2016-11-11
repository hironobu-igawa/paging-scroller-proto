class RouteConfig {
  static config($routeProvider) {
    $routeProvider
      .when('/normal', {
        template: `<normal>`
      })
      .when('/part', {
        template: `<part>`
      })
      .otherwise('/normal');
  }
}

angular
  .module('PagingScroller')
  .config(['$routeProvider', RouteConfig.config]);

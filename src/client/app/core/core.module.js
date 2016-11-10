(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize','ui.knob',
      'blocks.exception', 'blocks.logger', 'blocks.router',
      'ui.router', 'ngplus', 'ngMaterial', 'ngMdIcons','md.data.table','jsonFormatter','multiStepForm'
    ]);
})();

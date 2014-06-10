module.exports = function(config){
  config.set({

    basePath : '../',

    files : [
      'public/libs/angular/angular.js',
      'public/libs/angular-route/angular-route.js',
      'public/libs/angular-resource/angular-resource.js',
      'public/libs/angular-animate/angular-animate.js',
      'public/libs/angular-mocks/angular-mocks.js',
      'public/js/**/*.js',
      'test/unit/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
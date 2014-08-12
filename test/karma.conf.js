// Karma configuration
// Generated on Fri Aug 08 2014 18:56:11 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath : '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
        //IMPORTANT!!! do not glob all the js files together. If you do they will 
        //be auto alphabetized, not in the order you want, and you will feel much pain
        'public/bower_components/angular/angular.js',
        'public/bower_components/angular-ui-router/release/angular-ui-router.js',
        'public/bower_components/angular-resource/angular-resource.js',
        'public/bower_components/angular-bootstrap/ui-bootstrap.js',
        'public/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js',
        'public/bower_components/angular-animate/angular-animate.js',
        'public/bower_components/angular-mocks/angular-mocks.js',
        'public/bower_components/angular-local-storage/angular-local-storage.js',
        'public/js/app.js',

        // Top Level
        'public/js/core/state.js',
        'public/js/core/controllers/AppCtrl.js',
        'public/js/core/controllers/LoginCtrl.js',
        'public/js/core/controllers/ResetCtrl.js',
        'public/js/core/controllers/SendCtrl.js',

        'public/js/core/services/AuthService.js',
        'public/js/core/services/DialogueService.js',
        'public/js/core/services/generateGlyphs.js',

        // Models
        'public/js/core/services/AuthInterceptor.js',

        // Admin Models
        'public/js/admin/services/CompanyModel.js',
        'public/js/admin/services/CategoryModel.js',
        'public/js/admin/services/UserModel.js',
        'public/js/admin/services/TagModel.js',
        'public/js/admin/services/OpportunityModel.js',
        'public/js/admin/services/MessageModel.js',
        'public/js/admin/services/MatchModel.js',

        // User Models
        'public/js/users/services/UserCompanyModel.js',
        'public/js/users/services/UserOpportunityModel.js',
        'public/js/users/services/UserAccountModel.js',
        'public/js/users/services/UserTagModel.js',

        // users
        'public/js/users/state.js',
        'public/js/users/controllers/UsersCtrl.js',
        'public/js/users/controllers/UsersSidebarCtrl.js',

        'public/js/users/services/GuidanceService.js',

        // users.dashboard
        'public/js/users/subroutes/dashboard/state.js',
        'public/js/users/subroutes/dashboard/controllers/UsersDashboardCtrl.js',

        // users.account
        'public/js/users/subroutes/account/state.js',
        'public/js/users/subroutes/account/controllers/UsersAccountCtrl.js',

        // users.companies
        'public/js/users/subroutes/companies/state.js',
        'public/js/users/subroutes/companies/controllers/UsersCompaniesCtrl.js',

        // users.companies.detail
        'public/js/users/subroutes/companies/controllers/UsersCompaniesDetailCtrl.js',

        // users.opportunities
        'public/js/users/subroutes/opportunities/state.js',
        'public/js/users/subroutes/opportunities/controllers/UsersOpportunitiesCtrl.js',

        // users.opportunities.detail
        'public/js/users/subroutes/opportunities/controllers/UsersOpportunitiesDetailCtrl.js',

        // admin
        'public/js/admin/state.js',
        'public/js/admin/controllers/AdminCtrl.js',
        'public/js/admin/controllers/AdminSidebarCtrl.js',

        // admin.dashboard
        'public/js/admin/subroutes/dashboard/state.js',
        'public/js/admin/subroutes/dashboard/controllers/AdminDashboardCtrl.js',

        // admin.account
        'public/js/admin/subroutes/account/state.js',
        'public/js/admin/subroutes/account/controllers/AdminAccountCtrl.js',

        // admin.candidates
        'public/js/admin/subroutes/candidates/state.js',
        'public/js/admin/subroutes/candidates/controllers/AdminCandidatesCtrl.js',

        // admin.candidates.detail
        'public/js/admin/subroutes/candidates/controllers/AdminCandidatesDetailCtrl.js',

        // admin.candidates.new
        'public/js/admin/subroutes/candidates/controllers/AdminCandidatesNewCtrl.js',

        // admin.companies
        'public/js/admin/subroutes/companies/state.js',
        'public/js/admin/subroutes/companies/controllers/AdminCompaniesCtrl.js',

        // admin.companies.detail
        'public/js/admin/subroutes/companies/controllers/AdminCompaniesDetailCtrl.js',

        // admin.companies.new
        'public/js/admin/subroutes/companies/controllers/AdminCompaniesNewCtrl.js',

        // admin.matches
        'public/js/admin/subroutes/matches/state.js',
        'public/js/admin/subroutes/matches/controllers/AdminMatchesCtrl.js',
        'public/js/admin/subroutes/matches/controllers/AdminMatchesScheduleCtrl.js',
        'public/js/admin/subroutes/matches/services/SchedulerServ.js',

        // admin.messages
        'public/js/admin/subroutes/messages/state.js',
        'public/js/admin/subroutes/messages/controllers/AdminMessagesCtrl.js',

        // admin.messages.detail
        'public/js/admin/subroutes/messages/controllers/AdminMessagesDetailCtrl.js',

        // admin.messages.new
        'public/js/admin/subroutes/messages/controllers/AdminMessagesNewCtrl.js',

        // admin.opportunities
        'public/js/admin/subroutes/opportunities/state.js',
        'public/js/admin/subroutes/opportunities/controllers/AdminOpportunitiesCtrl.js',
        'public/js/admin/subroutes/opportunities/controllers/AdminOpportunitiesPreviewCtrl.js',

        // admin.opportunities.detail
        'public/js/admin/subroutes/opportunities/controllers/AdminOpportunitiesDetailCtrl.js',

        // admin.opportunities.new
        'public/js/admin/subroutes/opportunities/controllers/AdminOpportunitiesNewCtrl.js',

        // admin.scheduling
        'public/js/admin/subroutes/scheduling/state.js',
        'public/js/admin/subroutes/scheduling/controllers/AdminSchedulingCtrl.js',

        // admin.tags
        'public/js/admin/subroutes/tags/state.js',
        'public/js/admin/subroutes/tags/controllers/AdminTagsCtrl.js',
        'test/unit/**/*.js'

    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'unicorn'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

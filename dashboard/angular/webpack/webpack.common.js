const {
    setInferVersion,
    withModuleFederationPlugin,
    share
} = require('@angular-architects/module-federation/webpack');
setInferVersion(true);

module.exports = withModuleFederationPlugin({
    name: "_019499bf-874e-7dab-b2e8-43eeccaabd0b",
    //This section relates directly to the webRemote section of plugin.yml
    //The key is the exposedName for components or name for modules and the value is the path to the
    //respective Angular component or module in your web project. For other web frameworks, it is
    //usually the path to the web element exposing your component
    exposes: {
        'LineChart': './src/main/webapp/app/dashboard/line-chart.component.ts',
        'BarChart': './src/main/webapp/app/dashboard/grouped-barchart.component.ts',
    },
    shared: share({
        "@angular/core": {singleton: true, strictVersion: false},
        "@angular/common": {singleton: true, strictVersion: false},
        "@angular/common/http": {singleton: true, strictVersion: false},
        "@angular/router": {singleton: true, strictVersion: false},
        "@angular/forms": {singleton: true, strictVersion: false},
        "@angular/animations": {singleton: true, strictVersion: false},
        "@angular/material": {singleton: true, includeSecondaries: true, strictVersion: false},
        "@jsverse/transloco": {singleton: true, strictVersion: false},
        "@mattae/angular-shared": {singleton: true, strictVersion: false},
        "rxjs": {singleton: true, strictVersion: false},
    })
});

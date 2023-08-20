// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:{
    apiKey: "AIzaSyDsxm-6YPu_86LV_RbGZQORJdyRBVIfdxE",
    authDomain: "reviews-db-db0dd.firebaseapp.com",
    projectId: "reviews-db-db0dd",
    storageBucket: "reviews-db-db0dd.appspot.com",
    messagingSenderId: "703672544107",
    appId: "1:703672544107:web:6ff4f3ecd7fc1b67c4fa2e"
  },
  backendUrl: 'https://revapi.onrender.com/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

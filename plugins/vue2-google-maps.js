import Vue from 'vue'
import * as VueGoogleMaps from '~/node_modules/vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAsfMOtGmNtMl86llcmeVfv56WhBM4zEf8',
    libraries: 'places',
  },
})

<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <GmapMap
          ref="gmp"
          map-type-id="roadmap"
          :center="maplocation"
          :zoom="zoom"
          :style="styleMap"
          :options="mapOptions"
        >
          <GmapMarker
            v-for="(m, index) in markers"
            :key="index"
            :title="m.title"
            :position="m.position"
            :clickable="true"
            :draggable="false"
            :icon="m.pinicon"
            @click="onClickMarker(index, m)"
          />
          <GmapInfoWindow
            :options="infoOptions"
            :position="infoWindowPos"
            :opened="infoWinOpen"
            @closeclick="infoWinOpen = false"
          >
            <p style="color: #000">
              {{ marker.title }}
            </p>
          </GmapInfoWindow>
        </GmapMap>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data() {
    return {
      maplocation: { lat: 0, lng: 0 },
      zoom: 12,
      styleMap: {
        width: '100%',
        height: '400px',
      },
      mapOptions: {
        streetViewControl: false,
        styles: [],
      },
      infoOptions: {
        minWidth: 200,
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      marker: {
        title: '',
        position: { lat: 0, lng: 0 },
      },
      markers: [
        {
          title: '佐鳴湖',
          position: { lat: 34.7054595, lng: 137.6852776 },
        },
        {
          title: '浜名湖ガーデンパーク',
          position: { lat: 34.7140247, lng: 137.6032967 },
        },
      ],
    }
  },
  async mounted() {
    const currentPosTmp = await this.getCurrentPosition()
    const currentPos = {
      lat: currentPosTmp.coords.latitude,
      lng: currentPosTmp.coords.longitude,
    }
    this.maplocation = currentPos
  },
  methods: {
    getCurrentPosition() {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    },
    onClickMarker(index, marker) {
      this.$refs.gmp.panTo(marker.position)
      this.infoWindowPos = marker.position
      this.marker = marker
      this.srcImage = null
      this.infoWinOpen = true
    },
  },
}
</script>

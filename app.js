var { LMap, LTileLayer, LMarker, LTooltip, LPopup } = Vue2Leaflet;
var { latLng } = L;

var vm = new Vue({
    el: '#app',

    components: {
        LMap,
        LTileLayer,
        LMarker,
        LPopup,
        LTooltip
      },

    vuetify: new Vuetify(),
    data: {
        
        
        icons: [            
            'mdi-home',
            'mdi-email',
        ],
        
        loading: false,
        show: true,
        enableTooltip: true,
        center: [48, -1.219482],
        geojson: "geoinfo.js",
        fillColor: "#e4ce7f",
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        marker: latLng(47.41322, -1.219482),
     
    },

    computed: {
        options() {
          return {
            onEachFeature: this.onEachFeatureFunction
          };
        },
        styleFunction() {
          const fillColor = this.fillColor; // important! need touch fillColor in computed for re-calculate when change fillColor
          return () => {
            return {
              weight: 2,
              color: "#ECEFF1",
              opacity: 1,
              fillColor: fillColor,
              fillOpacity: 1
            };
          };
        },
        onEachFeatureFunction() {
          if (!this.enableTooltip) {
            return () => {};
          }
          return (feature, layer) => {
            layer.bindTooltip(
              "<div>code:" +
                feature.properties.code +
                "</div><div>nom: " +
                feature.properties.nom +
                "</div>",
              { permanent: false, sticky: true }
            );
          };
        }
      },
     

    

})


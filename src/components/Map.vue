<template>
  <v-container class="fill-height" fluid pa-0 ma-0>
    <l-map :zoom="zoom" :minZoom="7" :center="center" style="z-index: 0;">
      <l-tile-layer :url="url" :attribution="attribution"> </l-tile-layer>

      <l-geo-json
        v-if="showdesmata"
        :geojson="geojson_desmata"
        :options="desmatamentoStyle"
        :options-style="DesmatamentoColor"
      >
      </l-geo-json>
      <l-geo-json
        v-if="showe2015"
        :geojson="geojson_embargos2015"
        :options="embargosIcon"
      ></l-geo-json>
      <l-geo-json
        v-if="showe2016"
        :geojson="geojson_embargos2016"
        :options="embargosIcon"
      ></l-geo-json>
      <l-geo-json
        v-if="showe2017"
        :geojson="geojson_embargos2017"
        :options="embargosIcon"
      ></l-geo-json>
      <l-geo-json
        v-if="showe2018"
        :geojson="geojson_embargos2018"
        :options="embargosIcon"
      ></l-geo-json>
      <l-geo-json
        v-if="showe2019"
        :geojson="geojson_embargos2019"
        :options="embargosIcon"
      ></l-geo-json>
      <l-geo-json
        v-if="showqueimada"
        :geojson="geojson_queimada"
        :options="QueimadaMarker"
      ></l-geo-json>
    </l-map>
  </v-container>
</template>

<script>
import L from "leaflet";
import { LMap, LTileLayer, LGeoJson } from "vue2-leaflet";

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  props: {
    showdesmata: {
      type: Boolean,
      default: true
    },
    showqueimada: {
      type: Boolean,
      default: true
    },
    showe2015: {
      type: Boolean,
      default: true
    },
    showe2016: {
      type: Boolean,
      default: true
    },
    showe2017: {
      type: Boolean,
      default: true
    },
    showe2018: {
      type: Boolean,
      default: true
    },
    showe2019: {
      type: Boolean,
      default: true
    },
    eShowAll: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    show: true,
    enableTooltip: true,
    minZoom: 7,
    zoom: 6,
    center: [2.713, -60.601],
    geojson_queimada: null,
    geojson_desmata: null,
    geojson_embargos2015: null,
    geojson_embargos2016: null,
    geojson_embargos2017: null,
    geojson_embargos2018: null,
    geojson_embargos2019: null,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    message: false,
    hints: true
  }),
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },

    circleIcon() {
      var self = this;
      return {
        onEachFeature: this.onEachFeatureQueimadaLabel,
        pointToLayer: function(feature, latlng) {
          var inputDate = feature.properties.vigencia;

          var dates = inputDate.split("a").map(function(x) {
            return self.$moment(x, "DD/MM/YYYY");
          });
          var today = self.$moment({ hour: 0, minute: 0, seconds: 0 });
          var isBetweenDates = dates[0] <= today && today <= dates[1];

          var fillColor = "#ffd966";

          if (isBetweenDates) {
            fillColor = "#00ff00";
          }

          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: fillColor,
            color: "#fff",
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.5
          });
        }
      };
    },

    QueimadaMarker() {
      var self = this;
      return {
        onEachFeature: this.onEachFeatureQueimadaLabel,
        pointToLayer: function(feature, latlng) {
          var inputDate = feature.properties.vigencia;

          var dates = inputDate.split("a").map(function(x) {
            return self.$moment(x, "DD/MM/YYYY");
          });
          var today = self.$moment({ hour: 0, minute: 0, seconds: 0 });
          var isBetweenDates = dates[0] <= today && today <= dates[1];

          var fillColor = "#ffd966";

          if (isBetweenDates) {
            fillColor = "#00ff00";
          }

          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: fillColor,
            color: "#fff",
            weight: 1,
            opacity: 0.5,
            fillOpacity: 0.5
          });
        }
      };
    },

    embargosIcon() {
      return {
        onEachFeature: this.onEachFeatureEmbargoLabel,
        pointToLayer: function(feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 3,
            fillColor: "#e62e00",
            color: "#fff",
            weight: 1,
            opacity: 0.2,
            fillOpacity: 0.5
          });
        }
      };
    },

    desmatamentoStyle() {
      // var self = this;
      return {
        onEachFeature: this.onEachFeatureDesmatamentoLabel,
        pointToLayer: function() {
          return {
            weight: 2,
            color: "#00EFF1",
            opacity: 1,
            fillColor: "00EFF1",
            fillOpacity: 1
          };
        }
      };
    },

    dateToCircle() {
      return {
        onEachFeature: this.onEachFeatureFunction
        //TODO: terminar de fazer essa funcao:
        // pointToLayer: function(feature, latlng) {
        //   return feature => {
        //     var date = feature.properties.VALIDADE;

        //     layer.bindPopup(popupContent);
        //   };
        // }
      };
    },

    DesmatamentoColor() {
      return () => {
        return {
          weight: 2,
          color: "#ef6c00",
          opacity: 1,
          fillColor: "#ef6c00",
          fillOpacity: 0.6
        };
      };
    },

    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        var popupContent =
          ("Idetificação: " + feature.properties.field_3 ||
            feature.properties.CRIME ||
            feature.properties.NOME ||
            feature.properties.NUMEROAUT) +
          "  -  Data: " +
          (feature.properties.vigencia ||
            feature.properties.NUMEROAUT ||
            feature.properties.sigla ||
            feature.properties.DATA_AU ||
            feature.properties.VALIDADE);

        if (feature.properties && feature.properties.popupContent) {
          popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
      };
    },

    onEachFeatureQueimadaLabel() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        var popupContent =
          "<h3>Nome do autorizado</h3>" +
          feature.properties.NOME +
          "<h3>Vigência</h3>" +
          feature.properties.vigencia;

        if (feature.properties && feature.properties.popupContent) {
          popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
      };
    },

    onEachFeatureDesmatamentoLabel() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        var popupContent =
          "<h3>Número da autorização </h3>" +
          feature.properties.NUMEROAUT +
          "<br>" +
          "<h3>Vigência </h3>" +
          feature.properties.VALIDADE;

        if (feature.properties && feature.properties.popupContent) {
          popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
      };
    },

    onEachFeatureEmbargoLabel() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        var popupContent =
          "<h3>Infração </h3>" +
          feature.properties.CRIME +
          "<h3>Data da infração</h3>" +
          feature.properties.DATA_AU;

        if (feature.properties && feature.properties.popupContent) {
          popupContent += feature.properties.popupContent;
        }

        layer.bindPopup(popupContent);
      };
    },
  },

  methods: {
    outputDates() {
      var self = this;
      return this.inputDate.split(" a ").map(function(x) {
        return self.$moment(x, "DD/MM/YYYY");
      });
    },
    isBetween() {
      var today = this.$moment({ hour: 0, minute: 0, seconds: 0 });
      return this.outputDates[0] <= today && today <= this.outputDates[1];
    },

    async fetchQueimada() {
      const response = await fetch("queima.json");
      const data_queimada = await response.json();
      this.geojson_queimada = data_queimada;
    },

    async fetchDesmata() {
      const response = await fetch("desmatamento.json");
      const data_desmatamento = await response.json();
      this.geojson_desmata = data_desmatamento;
    },

    async fetchembargos2015() {
      const response = await fetch("embargos2015.json");
      const data_embargos2015 = await response.json();
      this.geojson_embargos2015 = data_embargos2015;
    },
    async fetchembargos2016() {
      const response = await fetch("embargos2016.json");
      const data_embargos2016 = await response.json();
      this.geojson_embargos2016 = data_embargos2016;
    },
    async fetchembargos2017() {
      const response = await fetch("embargos2017.json");
      const data_embargos2017 = await response.json();
      this.geojson_embargos2017 = data_embargos2017;
    },
    async fetchembargos2018() {
      const response = await fetch("embargos2018.json");
      const data_embargos2018 = await response.json();
      this.geojson_embargos2018 = data_embargos2018;
    },
    async fetchembargos2019() {
      const response = await fetch("embargos2019.json");
      const data_embargos2019 = await response.json();
      this.geojson_embargos2019 = data_embargos2019;
    }
  },

  async created() {
    var self = this;
    this.loading = true;
    Promise.all([
      this.fetchDesmata(),
      this.fetchQueimada(),
      this.fetchembargos2015(),
      this.fetchembargos2016(),
      this.fetchembargos2017(),
      this.fetchembargos2018(),
      this.fetchembargos2019()
    ]).then(function() {
      self.loading = false;
    });
  }
};
</script>

<style>
</style>
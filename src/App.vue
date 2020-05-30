<template>
  <v-app>
    <v-app-bar app color="green" dark clipped-right>
      <v-toolbar-title>S I G M A</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-progress-circular v-if="loading" indeterminate color="#ffffff">
      </v-progress-circular>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-navigation-drawer app clipped right width="400">
      <v-list expand>
        <v-subheader>Opções de exibição</v-subheader>
        <v-list-group v-model="showdesmata">
          <template v-slot:activator>
            <v-list-item-action>
              <v-switch
                value
                v-model="showdesmata"
                readonly
                color="orange darken-3"
              >
              </v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Autorização de desmatamento
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-divider></v-divider>

          <v-list-item ripple @click="showdesmata = !showdesmata">
            <v-list-item-action>
              <v-switch v-model="showdesmata" readonly color="orange darken-3">
              </v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2019</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-group>

        <v-list-group v-model="showqueimada">
          <template v-slot:activator>
            <v-list-item-action>
              <v-switch
                value
                v-model="showqueimada"
                readonly
                color="yellow darken-3"
              >
              </v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Autorização de queimada
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-divider></v-divider>

          <v-list-item ripple @click="showqueimada = !showqueimada">
            <v-list-item-action>
              <v-switch v-model="showqueimada" readonly color="yellow darken-3">
              </v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2019</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list-group>

        <v-list-group v-model="eShowAll">
          <template v-slot:activator>
            <v-list-item-action>
              <v-switch value v-model="eShowAll" readonly color="red darken-3">
              </v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                Embargos
              </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-divider></v-divider>

          <v-list-item ripple @click="showe2015 = !showe2015">
            <v-list-item-action>
              <v-switch
                v-model="showe2015"
                readonly
                color="red darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2015</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item ripple @click="showe2016 = !showe2016">
            <v-list-item-action>
              <v-switch
                v-model="showe2016"
                readonly
                color="red darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2016</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item ripple @click="showe2017 = !showe2017">
            <v-list-item-action>
              <v-switch
                v-model="showe2017"
                readonly
                color="red darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2017</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item ripple @click="showe2018 = !showe2018">
            <v-list-item-action>
              <v-switch
                v-model="showe2018"
                readonly
                color="red darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2018</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item ripple @click="showe2019 = !showe2019">
            <v-list-item-action>
              <v-switch
                v-model="showe2019"
                readonly
                color="red darken-3"
              ></v-switch>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>2019</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-content app>
      <Map
        :showdesmata="showdesmata"
        :showqueimada="showqueimada"
        :showe2015="showe2015"
        :showe2016="showe2016"
        :showe2017="showe2017"
        :showe2018="showe2018"
        :showe2019="showe2019"
        :eShowAll="eShowAll"
      >
      </Map>
    </v-content>

    <v-footer padless app class="hidden-sm-and-down">
      <v-card flat tile width="100%" class="green darken-2 text-center">
        <v-divider></v-divider>

        <v-card-text class="py-2">
          {{ new Date().getFullYear() }} —
          <strong>Pedro Daniel Gohl - CIACT / Miguel Felipe Lima - DMCA</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Map from "./components/Map";

export default {
  name: "App",
  components: {
    Map
  },
  data: () => ({
    colorMenu: false,
    loading: false,
    showdesmata: true,
    showqueimada: true,
    showe2015: true,
    showe2016: true,
    showe2017: true,
    showe2018: true,
    showe2019: true,
    eShowAll: true,
    show: true,
    enableTooltip: true,

    icons: ["mdi-home", "mdi-email"],

    fav: true,
    menu: false,
    message: false,
    hints: true,
    fillColor: "#ff0000"
  }),

  computed: {
    atLeastOneTrue() {
      return (
        this.showe2015 ||
        this.showe2016 ||
        this.showe2017 ||
        this.showe2018 ||
        this.showe2019
      );
    }
  },

  watch: {
    // This function is executed when "atLeastOneTrue changes value"
    atLeastOneTrue(value) {
      this.eShowAll = value;
    },
    // Watch when the "all" switch changes
    eShowAll(value) {
      // Only change all values if the "all" switch is set to false
      // or, if it's true, if all the other switches are false
      if (!value || !this.atLeastOneTrue) {
        // Use Array.fill to set all values
        [
          this.showe2015,
          this.showe2016,
          this.showe2017,
          this.showe2018,
          this.showe2019
        ] = Array(5).fill(value);
      }
    }
  }
};
</script>

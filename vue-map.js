
    var { LMap, LTileLayer, LGeoJson, LMarker } = Vue2Leaflet;
   
 
    new Vue({
        el: "#app",
        components: {
            LMap,
            LTileLayer,
            LGeoJson,
            LMarker
        },
        vuetify: new Vuetify(),
        data() {
            return {
                colorMenu: false,
                loading: false,
                showdesmata: true,
                showqueimada: true,
                show: true,
                enableTooltip: true,
                minZoom:7,
                zoom: 6,
                center: [2.713,-60.601],
                geojson_queimada: null,
                geojson_desmata: null,
                fillColor: "#f00",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
               
                icons: [            
                  'mdi-home',
                  'mdi-email',
                ],

                 fav: true,
                menu: false,
                message: false,
                hints: true,
            };
        },
        computed: {
            options() {
                return {
                    onEachFeature: this.onEachFeatureFunction
                };
            },

               circleIcon() {
                return {
                    onEachFeature: this.onEachFeatureFunction,
                    pointToLayer: function (feature, latlng) {
                
                        return L.circleMarker(latlng, {
                            radius: 5,
                            fillColor: "#ffc800",
                            color: "#000",
                            weight: 1,
                            opacity: 0.2,
                            fillOpacity: 0.5
                        });
                    }    
                }
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
                    return () => { };
                }
                return (feature, layer) => {
                    var popupContent = (feature.properties.NOME || feature.properties.VALIDADE || feature.properties.NUMEROAUT) + " - " +
                        (feature.properties.vigencia || feature.properties.NUMEROAUT || feature.properties.sigla);
    
                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }
    
                    layer.bindPopup(popupContent);
    
                };
            },
          
            
            swatchStyle() {
                const { fillColor, colorMenu } = this
                return {
                    backgroundColor: fillColor,
                    cursor: 'pointer',
                    height: '30px',
                    width: '30px',
                    borderRadius: colorMenu ? '50%' : '4px',
                    transition: 'border-radius 200ms ease-in-out',
                    border: '4px #fff solid'
                }
            }



        },

    
        methods:{
           
            async fetchQueimada(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/queima.json"
                );
                const data_queimada = await response.json();
                this.geojson_queimada = data_queimada;

            },

            async fetchDesmata(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/desmatamento.json"
                );
                const data_desmatamento = await response.json();
                this.geojson_desmata = data_desmatamento;

            },
        },
        
        async created() {
            var self = this;
            this.loading = true;
            Promise.all([
                this.fetchDesmata(),
                this.fetchQueimada()
            ]).then(function () {
                self.loading = false;
            });
        }

        





        
    });

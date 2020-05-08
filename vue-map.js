
    var { LMap, LTileLayer, LGeoJson, LMarker } = Vue2Leaflet;
    Vue.use(vueMoment);



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
                showe2015: true,
                showe2016: true,
                showe2017: true,
                showe2018: true,
                showe2019: true,
                show: true,
                enableTooltip: true,
                minZoom:7,
                zoom: 6,
                center: [2.713,-60.601],
                geojson_queimada: null,
                geojson_desmata: null,
                geojson_embargos2015: null,
                geojson_embargos2016: null,
                geojson_embargos2017: null,
                geojson_embargos2018: null,
                geojson_embargos2019: null,
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
               var self = this;
                return {
                    onEachFeature: this.onEachFeatureQueimadaLabel,
                    pointToLayer: function (feature, latlng) {
                        var inputDate = feature.properties.vigencia;

                        var dates = inputDate.split("a").map(function (x) { return self.$moment(x, "DD/MM/YYYY")});
                        var today = self.$moment({hour: 0, minute: 0, seconds: 0});
                        var isBetweenDates = dates[0] <= today && today <= dates[1];

                        var fillColor = "#ffd966";

                        if (isBetweenDates) {
                            fillColor = "#00ff00"
                            
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
                }
            },

            QueimadaMarker() {
                var self = this;
                 return {
                     onEachFeature: this.onEachFeatureQueimadaLabel,
                     pointToLayer: function (feature, latlng) {
                         var inputDate = feature.properties.vigencia;
 
                         var dates = inputDate.split("a").map(function (x) { return self.$moment(x, "DD/MM/YYYY")});
                         var today = self.$moment({hour: 0, minute: 0, seconds: 0});
                         var isBetweenDates = dates[0] <= today && today <= dates[1];
 
                         var fillColor = "#ffd966";
 
                         if (isBetweenDates) {
                             fillColor = "#00ff00"
                             
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
                 }
             },

            embargosIcon() {
                var self = this;
                 return {
                     onEachFeature: this.onEachFeatureEmbargoLabel,
                     pointToLayer: function (feature, latlng) {

                         return L.circleMarker(latlng, {
                             radius: 3,
                             fillColor: "#e62e00",
                             color: "#fff",
                             weight: 1,
                             opacity: 0.2,
                             fillOpacity: 0.5
                         });
                     }    
                 }
             },

             desmatamentoStyle() {
                var self = this;
                 return {
                     onEachFeature: this.onEachFeatureDesmatamentoLabel,
                     pointToLayer: function (feature, latlng) {

                        return {
                            weight: 2,
                            color: "#00EFF1",
                            opacity: 1,
                            fillColor: fillColor,
                            fillOpacity: 1
                        };
                     }    
                 }
             },

            dateToCircle() {
                return {
                    onEachFeature: this.onEachFeatureFunction,
                    pointToLayer: function (feature, latlng) {
                       
                        return (feature) => {
                            var date =  feature.properties.VALIDADE;
            
                            //terminar de fazer essa funcao
            
                            layer.bindPopup(popupContent);
                        }
                        
                        
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

            DesmatamentoColor() {
                return () => {
                    return {
                        weight: 2,
                        color: "#ECEFF1",
                        opacity: 0,
                        fillColor: "#ff9933",
                        fillOpacity: 100
                    };
                };
            },



            onEachFeatureFunction() {
                if (!this.enableTooltip) {
                    return () => { };
                }
                return (feature, layer) => {
                    var popupContent = ("Idetificação: " + feature.properties.field_3 || feature.properties.CRIME || feature.properties.NOME  || feature.properties.NUMEROAUT ) + "  -  Data: " +
                        (feature.properties.vigencia || feature.properties.NUMEROAUT || feature.properties.sigla || feature.properties.DATA_AU || feature.properties.VALIDADE);
    
                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }
    
                    layer.bindPopup(popupContent);
    
                };
            },

            onEachFeatureQueimadaLabel() {
                if (!this.enableTooltip) {
                    return () => { };
                }
                return (feature, layer) => {
 
                    var popupContent = ("<h3>Nome do autorizado</h3>" + feature.properties.NOME) + "<h3>Vigência</h3>" + (feature.properties.vigencia);

                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }
    
                    layer.bindPopup(popupContent);
    
                };
            },

            
            onEachFeatureDesmatamentoLabel() {
                if (!this.enableTooltip) {
                    return () => { };
                }
                return (feature, layer) => {
                    var popupContent = ("<h3>Número da autorização </h3>" + feature.properties.NUMEROAUT) + "<br>"+ "<h3>Vigência </h3>" + (feature.properties.vigencia);
    
                    if (feature.properties && feature.properties.popupContent) {
                        popupContent += feature.properties.popupContent;
                    }
    
                    layer.bindPopup(popupContent);
    
                };
            },

            onEachFeatureEmbargoLabel() {
                if (!this.enableTooltip) {
                    return () => { };
                }
                return (feature, layer) => {
                    var popupContent = ("<h3>Infração </h3>" + feature.properties.CRIME) + "<h3>Data da infração</h3>" + (feature.properties.DATA_AU);
    
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
           
            outputDates() {
                var self = this;
                return this.inputDate.split(" a ").map(function (x) { return self.$moment(x, "DD/MM/YYYY") });
            },
            isBetween() {
                var today = this.$moment({hour: 0, minute: 0, seconds: 0});
                return this.outputDates[0] <= today && today <= this.outputDates[1];
            },

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

            async fetchembargos2015(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/embargos2015.json"
                );
                const data_embargos2015 = await response.json();
                this.geojson_embargos2015 = data_embargos2015;

            },
            async fetchembargos2016(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/embargos2016.json"
                );
                const data_embargos2016 = await response.json();
                this.geojson_embargos2016 = data_embargos2016;

            },
            async fetchembargos2017(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/embargos2017.json"
                );
                const data_embargos2017 = await response.json();
                this.geojson_embargos2017 = data_embargos2017;

            },
            async fetchembargos2018(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/embargos2018.json"
                );
                const data_embargos2018 = await response.json();
                this.geojson_embargos2018 = data_embargos2018;

            },
            async fetchembargos2019(){
                const response = await fetch(
                    "https://raw.githubusercontent.com/danielgohl13/map-viewer-femarh/map-viewer-vue/embargos2019.json"
                );
                const data_embargos2019 = await response.json();
                this.geojson_embargos2019 = data_embargos2019;

            },
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
            ]).then(function () {
                self.loading = false;
            });
        }

        





        
    });

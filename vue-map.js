
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
                show: true,
                enableTooltip: true,
                minZoom:7,
                zoom: 6,
                center: [2.713,-60.601],
                geojson: null,
                fillColor: "#e4ce7f",
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                attribution:
                    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
               
                icons: [            
                  'mdi-home',
                  'mdi-email',
                ],
            };
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
                    return () => { };
                }
                return (feature, layer) => {
                    layer.bindTooltip(
                        "<div>code:" +
                        feature.properties.code +
                        "</div><div>nom: " +
                        feature.properties.nom +
                        "</div>",
                        {
                            permanent: false,
                            sticky: true
                        }
                    );
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
        
        async created() {
            this.loading = true;
            const response = await fetch(
                "https://rawgit.com/gregoiredavid/france-geojson/master/regions/pays-de-la-loire/communes-pays-de-la-loire.geojson"
            );
            const data = await response.json();
            this.geojson = data;
            this.loading = false;
        }
    });

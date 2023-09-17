<template>
    <div id="wrap">

        <v-container>
            <v-row>
                <v-col class="pa-0 ma-0">
                    <v-btn class="primary" dark fab small fixed icon app>
                    <v-icon>mdi-plus</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            <v-row class="pt-5 mt-5">
                <v-col>
                    {{ $plg.task.list }}

                </v-col>
            </v-row>
        </v-container>

    </div>
  </template>
  <script>
  export default {
    data: () => ({
    }),
    created() {
    },
    mounted() {
        this.$plg.task.initLoadFunction(
            ()=>{this.$forceUpdate()}
        )
    },
    methods: {
    },
  };
  </script>
  <style scoped></style>
  
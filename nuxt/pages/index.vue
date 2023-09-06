<template>
  <v-app>
    <v-main>
      <v-app-bar class="px-0" elevation="0" fixed>
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0 ma-0">
              <v-tabs small v-model="tab" color="primary" right>
                <v-tab>Task</v-tab>
                <v-tab>Result</v-tab>
                <v-tab>Graph</v-tab>
                <v-tab>Setting</v-tab>
              </v-tabs>
            </v-col>
          </v-row>
        </v-container>
      </v-app-bar>
      <v-container> </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    tab: 0,
  }),
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style scoped></style>

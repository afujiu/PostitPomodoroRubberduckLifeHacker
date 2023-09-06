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
      <v-container>
        <v-row>
          <v-col cols="12"></v-col>
          <v-col cols="12" class="pa-0 ma-0 my-5 py-5">
            <tabs-task v-if="tab == 0"></tabs-task>
            <tabs-result v-if="tab == 1"></tabs-result>
            <tabs-graph v-if="tab == 2"></tabs-graph>
          </v-col>
        </v-row>
      </v-container>
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

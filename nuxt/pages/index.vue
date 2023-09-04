<template>
    <v-app>
      <v-main>
        <v-card class="px-0" color="primary" elevation="0">
          <v-container>
            <v-row>
              <v-col cols="12" class="pa-0 ma-0">
                <v-tabs
                  v-model="tab"
                  color="primary"
                  class="px-0 mx-0"
                  right
                >
                  <v-tab value="1">Task</v-tab>
                  <v-tab value="2">Result</v-tab>
                  <v-tab value="3">Graph</v-tab>
                  <v-tab value="4">Graph</v-tab>
                </v-tabs>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-container>
          <v-row>
              <v-col class="pa-0 ma-0">
                <tabs-task></tabs-task>
              </v-col>
            </v-row>
        </v-container>
      </v-main>
    </v-app>
</template>
<script>
export default {
  data: () => ({
    tab:"one"
  }),
  created() {
  },
  mounted() {
    this.$db.task.initLoadFunction(
      ()=>{this.$forceUpdate()}
    )
  },
  methods: {
    async pushAddTask() {
      this.$db.task.add();
    },
  },
};
</script>
<style scoped>
</style>

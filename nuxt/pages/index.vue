<template>
  <div id="wrap" class="bg">
    <v-app>
      <v-app-bar color="primary" fixed max-height="80px">
        <v-btn class="primary" dark small fab icon 
          @click="pushAddTask">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-container class="ma-0 pa-0">
        </v-container>
      </v-app-bar>

      <v-main>
        <v-container class="px-1 mt-5 pt-5">
          <v-row><v-col class="mt-4"></v-col></v-row>
          <v-row>
            <v-col
              class="my-0 py-2"
              xm="12" sm="6" md="4" lg="4" cols="12"
              v-for="(val, idx) in $db.task.list"
              :key="idx"
            >
              <task-card :idx="idx"></task-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>
<script>
export default {
  data: () => ({
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
<style scoped></style>

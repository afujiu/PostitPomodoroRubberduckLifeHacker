<template>
  <div id="wrap">
    <v-container>
      <v-row>
        <v-col class="pa-0 ma-0 mb-2 pl-3">
          <v-btn
            class="primary"
            dark
            fab
            small
            fixed
            icon
            app
            @click="pushAddTask()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pt-5 mt-5"> </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({}),
  created() {},
  mounted() {
    this.$db.task.initLoadFunction(() => {
      this.$forceUpdate();
    });
  },
  methods: {
    pushAddTask() {
      this.$db.task.add();
    },
  },
};
</script>
<style scoped></style>

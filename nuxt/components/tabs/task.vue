<template>
  <div id="wrap">
    <v-container class="px-2 mx-0">
      <v-row>
        <v-col cols="2" class="py-2 my-2" align="left">
          <v-btn
            class="primary"
            dark
            fab
            small
            icon
            app
            @click="pushAddTask()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          </v-col>
          <v-col cols="8" class="py-2 my-2" ></v-col>
          <v-col cols="2" class="py-2 my-2"  align="right">
          <v-btn
            fab
            small
            right
            icon
            app
            @click="pushReset()"
          >
            <v-icon>mdi-dots-horizontal</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="pt-0 mt-0">
        <v-col
          class="my-0 mt-4"
          xm="12"
          sm="6"
          md="6"
          lg="4"
          cols="12"
          v-for="(val, idx) in $db.task.list"
          :key="idx"
        >
          <task-card :id="val.id"></task-card>
        </v-col>
      </v-row>
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
    pushReset() {
      this.$db.task.resetTask();
    },
  },
};
</script>
<style scoped></style>

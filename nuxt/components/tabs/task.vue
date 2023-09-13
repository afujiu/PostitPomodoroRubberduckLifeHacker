<template>
  <div id="wrap">
    <v-container class="px-2 mx-0">
      <v-row>
        <v-col cols="2" class="pb-5 mb-5" align="left">
          <v-btn
            class="primary"
            dark
            fab
            small
            icon
            app
            fixed
            @click="pushAddTask()"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="8" class="pb-5 mb-5"> </v-col>
        <!-- 右オプション-->
        <v-col cols="2" class="pb-5 mb-5" :class="{ 'active-top': isOption }">
          <v-speed-dial
            v-model="isOption"
            fixed
            direction="bottom"
            style="right: 20px"
          >
            <template v-slot:activator>
              <v-btn class="grey darken-1" dark fab small right icon
                ><v-icon>mdi-dots-horizontal</v-icon></v-btn
              >
            </template>
            <!--フィルター-->
            <v-btn fab x-small right @click="isFilterCard = true">
              <v-icon>mdi-filter-outline</v-icon>
            </v-btn>
            <!--全削除-->
            <v-btn
              fab
              x-small
              right
              class="white--text black"
              @click="pushReset()"
            >
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-speed-dial>
        </v-col>
      </v-row>
      <v-row class="pt-0 mt-0" v-if="isForceOption">
        <v-col
          class="my-0 mt-4"
          xm="12"
          sm="6"
          md="6"
          lg="4"
          cols="12"
          v-for="(val, idx) in $db.task.getParentList(null)"
          :key="idx"
        >
          <task-card :id="val.id" elevation="12"></task-card>
        </v-col>
      </v-row>
      <v-row>
        <v-card v-if="isFilterCard" class="filter-card">
          <v-container>
            <v-row>
              <v-col cols="12"> </v-col>
              <v-col cols="12">
                <v-select
                  label="Select"
                  v-model="stateFilter"
                  :items="[
                    'California',
                    'Colorado',
                    'Florida',
                    'Georgia',
                    'Texas',
                    'Wyoming',
                  ]"
                  multiple
                ></v-select>
              </v-col>
              <v-col cols="12">{{ stateFilter }}</v-col>
              <v-col cols="12">d</v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    isOption: false,
    isForceOption: true,
    isFilterCard: false,
    stateFilter: [],
  }),
  created() {},
  mounted() {
    this.$db.task.initLoadFunction(() => {
      this.$forceUpdate();
    });
    this.$db.task.initUploadFunction(() => {
      this.isForceOption = false;
      setInterval(() => {
        this.isForceOption = true;
      }, 10);
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
<style scoped>
.filter-card {
  position: fixed;
  margin: 1em;
  width: 95%;
  bottom: 0;
  z-index: 999;
}
</style>

<template>
  <div id="wrap">
    <v-card
      variant="outlined"
      elevation="2"
      class="pa-0 ma-0 rounded-0"
      :class="{ 'active-card': stateDial }"
    >
      <v-container class="pt-0">
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col cols="12" class="px-1 pt-0 pb-2">
                <v-text-field
                  v-model="task.title"
                  class="my-0 py-0"
                  dence
                  hide-details
                  :prepend-icon="isOpenOption ? 'mdi-menu-up' : 'mdi-menu-down'"
                  @click:prepend="isOpenOption = !isOpenOption"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pa-0 px-2">
                <span class="overline"> </span>
              </v-col>
              <v-col v-if="isOpenOption" cols="12" class="ma-0 pa-0 px-2">
                おぷしょん
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2" class="px-0 py-0" align="right"> </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    idx: {
      type: Number,
    },
  },
  data: () => ({
    task: null,
    stateDial: false,
    isOpenOption: false,
  }),
  async created() {
    this.task = this.$db.task.list[this.idx];
    console.log(this.task);
  },
  async mounted() {},
  methods: {
    /**
     * ステータス変更
     * @param {} state
     */
    changeState(state) {
      this.$db.task.changeState(this.idx, state);
    },
  },
};
</script>
<style scoped>
.v-text-field >>> input {
  padding: 0.2 !important;
}
.active-card {
  z-index: 999;
}
</style>

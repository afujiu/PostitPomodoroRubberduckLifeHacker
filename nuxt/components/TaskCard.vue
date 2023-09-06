<template>
  <div id="wrap">
    <v-card
      variant="outlined"
      elevation="2"
      class="pa-0 ma-0 rounded-0"
      :class="{ 'active-card': stateDial }"
    >
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

<template>
  <div id="wrap">
    <v-card variant="outlined" elevation="2" class="pa-0 ma-0 rounded-0" :class="{ 'active-card': stateDial }"
      v-if="task != null">
      <v-container class="pt-0">
        <v-row>
          <v-col cols="10">
            <v-row>
              <v-col cols="1" class="pl-0 pr-2 pt-0 pb-0">
                <v-btn fab x-small icon><v-icon small>mdi-plus</v-icon></v-btn>
              </v-col>
              <v-col cols="11" class="px-1 pt-0 pb-0">
                <v-text-field
                  v-model="task.title"
                  class="my-0 py-0"
                  dence hide-details
                  @change="$db.task.list=$db.task.list"
                  >
                </v-text-field>
              </v-col>
              <v-col cols="12" class="ma-0 pa-0 px-2">
                <span class="overline"> </span>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="2" class="px-0 py-0" align="right">
            <v-speed-dial v-model="stateDial" direction="bottom" style="width: 100%; height: 100%" class="overline">
              <template v-slot:activator>
                <v-btn elevation="0" class="rounded-0 overline" :class="$db.task.stateList[task.state].textColor"
                  :color="$db.task.stateList[task.state].color" style="width: 100%; height: 100%">
                  {{ $db.task.stateList[task.state].text }}
                </v-btn>
              </template>
              <span></span>
              <span v-for="(val, idx) in $db.task.stateList[task.state].next" :key="idx">
                <v-btn elevation="10" class="rounded-0 overline" :class="$db.task.stateList[val].textColor"
                  :color="$db.task.stateList[val].color" @click="changeState(val)">
                  {{ $db.task.stateList[val].text }}
                </v-btn>
              </span>
            </v-speed-dial>
          </v-col>
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
  },
  async mounted() {
    this.task = this.$db.task.list[this.idx];
  },
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
.v-text-field>>>input {
  font-size:0.7em;
  padding-bottom:0px;
}

.active-card {
  z-index: 999;
}
</style>

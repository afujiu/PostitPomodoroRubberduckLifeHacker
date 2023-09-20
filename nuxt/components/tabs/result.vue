<template>
  <div id="wrap">
    <v-container>
      <v-row>
        <v-col cols="11" class="pa-0 ma-0">
          <v-btn @click="isWrokTime = !isWrokTime"> 作業時間を表示 </v-btn>
        </v-col>
        <v-col cols="1" class="pa-0 ma-0">
          <v-btn
            class="white--text black"
            dark
            fab
            small
            icon
            app
            fixed
            @click="$plg.log.clearLog()"
          >
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5">
        <v-col cols="12">
          <p class="h6">今日の作業</p>
          <v-btn icon @click="reload()"><v-icon>mdi-reload</v-icon></v-btn>
        </v-col>
        <v-col cols="12">
          総作業時間
          <p>{{ $plg.util.msToHour(sumTime, false) }}:{{ sumTime }}</p>
        </v-col>
        <v-col class="my-0 mt-0" xm="12" sm="12" md="12" lg="12" cols="12">
          <div v-for="(val, uid) in list" :key="uid">
            <span v-if="$plg.task.getTask(uid) != null">
              <span>
                {{ $plg.task.getTask(uid).title }}
              </span>
              <span
                :class="`${$plg.task.stateList[val.endState].color} ${
                  $plg.task.stateList[val.endState].textColor
                }`"
              >
                {{ $plg.task.stateList[val.endState].text }}
                <span v-if="val.endState == 'comp'"
                  >({{ $plg.util.mm(val.compTime) }}/{{
                    $plg.util.dd(val.compTime)
                  }})</span
                >
              </span>
              <span v-if="isWrokTime">
                {{ $plg.util.msToHour(val.sumWorkTime, false) }}:{{
                  $plg.util.msToMinute(val.sumWorkTime)
                }}
              </span>
            </span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  data: () => ({
    list: [],
    sumTime: 0,
    isWrokTime: true,
  }),
  async created() {
    await this.reload();
  },
  async mounted() {
    this.$plg.task.initLoadFunction(() => {
      this.$forceUpdate();
    });
  },
  methods: {
    async reload() {
      this.list = await this.$plg.log.getToday();
      this.sumTime = 0;
      for (let val of this.list) {
        this.sumTime += val.sumWorkTime;
      }
    },
  },
};
</script>
<style scoped></style>

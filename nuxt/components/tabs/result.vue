<template>
  <div id="wrap">
    <v-container>
      <v-row>
        <v-col cols="11" class="pa-0 ma-0">
          <v-btn @click="isWrokTime = !isWrokTime"> 作業時間を表示 </v-btn>
          <v-text-field v-model="minusDay"></v-text-field>
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
        <v-col cols="4"> 今日の作業 </v-col>
        <v-col cols="2">
          <v-btn icon @click="reload()"><v-icon>mdi-reload</v-icon></v-btn>
        </v-col>
        <v-col cols="6">
          総作業時間
          <span
            >{{ $plg.util.msToHour(sumTime, false) }}:{{
              $plg.util.msToMinute(sumTime)
            }}</span
          >
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
    minusDay: 0,
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
      this.list = await this.$plg.log.getToday(this.minusDay);
      this.sumTime = 0;
      for (let key in this.list) {
        let val = this.list[key];
        this.sumTime += Number(val.sumWorkTime);
      }
    },
  },
};
</script>
<style scoped></style>

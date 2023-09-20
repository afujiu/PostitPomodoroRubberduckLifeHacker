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
        </v-col>
        <v-col class="my-0 mt-4" xm="12" sm="12" md="12" lg="12" cols="12">
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
                {{ $plg.util.msToMinute(val.sumWorkTime, false) }}:{{
                  $plg.util.msToSecond(val.sumWorkTime)
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
    isWrokTime: true,
  }),
  async created() {
    this.list = await this.$plg.log.getToday();
  },
  async mounted() {
    this.$plg.task.initLoadFunction(() => {
      this.$forceUpdate();
    });
  },
  methods: {},
};
</script>
<style scoped></style>

<template>
  <div id="wrap">
    <v-container class="px-2 mx-0" v-if="isForceOption">
      <v-row>
        <v-col cols="1" class="pb-5 mb-5" align="left">
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
        <v-col cols="10" class="pb-5 mt-2 mb-5 white" align="center" style="position:relative;">
            <v-card
              v-if="$plg.task.isWorking"
              style="width:75%;height:40px;position:fixed;z-index:999;background:white;"
              class="pa-2">
              <div class="grey lighten-4" style="width:100%;height:50%; position:relative;">
                <div class="red" 
                  :style="`width:${(Number($plg.util.offTime($plg.util.msToSecond(workTime,false),1500))/1500)*100}%;
                  display:block;
                  height:100%;
                  position:absolute;
                  z-index:10;
                  white-space: nowrap;`"> 
                </div>
              </div>

              <div class="str-dot" v-if="$plg.task.workTask!=null">
                {{$plg.util.msToMinute(workTime)}}:{{$plg.util.msToSecond(workTime)}}
                <a :href="`#${$plg.task.workTask.id}`">{{ $plg.task.workTask.title }}</a>
                </div>
          </v-card>
        </v-col>
        <!-- 右オプション-->
        <v-col cols="1" class="pb-5 mt-2 mb-5" :class="{ 'active-top': isOption }">
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
      <v-row class="pt-0 mt-0">
        <v-col
          class="my-0 mt-4"
          xm="12"
          sm="6"
          md="6"
          lg="4"
          cols="12"
          v-for="(val, idx) in $plg.task.getFilterList(null)"
          :key="idx"
        >
          <task-card :id="val.id" elevation="12"></task-card>
        </v-col>
      </v-row>
      <v-row>
      </v-row>
    </v-container>
        <!-- フィルターカード-->
        <v-card v-if="isFilterCard" class="filter-card px-0">
          <v-container>
            <v-row>
              <v-col cols="11" class="my-1 px-3 py-0 pt-2"></v-col>
              <v-col cols="1" class="my-1 pr-4 py-0 pt-2 align-right">
                <v-btn class="" icon small @click="()=>{$plg.task.changeFilter();isFilterCard = false}"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-col>
              <v-col cols="12" class="py-0">
                <div
                  v-for="(val, idx) in $plg.task.stateList"
                  :key="idx"
                  style="float: left"
                >
                  <v-checkbox
                    v-if="idx != 'delete'"
                    v-model="stateFilter"
                    :label="val.text"
                    :value="idx"
                    dence
                    hide-details
                  ></v-checkbox>
                </div>
              </v-col>
              <v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    isOption: false,
    isForceOption: true,
    isFilterCard: false,
    stateFilter: [],
    workTime:0

  }),
  created() {
    this.$plg.task.isWorkingTimeFunc=(ms)=>{
      this.workTime=ms
    }
  },
  mounted() {
    this.$plg.task.initLoadFunction(() => {
      this.$forceUpdate();
    });
    this.$plg.task.initUploadFunction(() => {
      this.isForceOption = false;
      setInterval(() => {
        this.isForceOption = true;
      }, 1);
    });

    this.stateFilter=this.$plg.task.filter.state
  },
  watch: {
    stateFilter (state) {
      this.$plg.task.filter.state=state
      this.$plg.task.initUpload()
   }
  },
  methods: {
    pushAddTask() {
      this.$plg.task.add();
    },
    pushReset() {
      this.$plg.task.resetTask();
    },
  },
};
</script>
<style scoped>
.filter-card {
  position: fixed;
  overflow:auto;
  right:1em;
  bottom: 0;
  height:200px;
  z-index: 999;
}
.str-dot {
    width:100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>


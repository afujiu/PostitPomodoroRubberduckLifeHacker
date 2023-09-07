<template>
  <div id="wrap">
    <span>
      <v-card
        variant="outlined"
        elevation="2"
        class="pa-0 ma-0 rounded-0"
        :class="{ 'active-card': isStateDial || isAddTaskDial }"
        v-if="task != null"
      >
        <v-container class="pt-0">
          <v-row>
            <v-col cols="10">
              <v-row>
                <v-col cols="1" class="pl-0 pr-2 pt-0 pb-0">
                  <!--　タスク追加ボタン-->
                  <v-speed-dial v-model="isAddTaskDial" direction="bottom">
                    <template v-slot:activator>
                      <v-btn fab x-small icon
                        ><v-icon small>mdi-plus</v-icon></v-btn
                      >
                    </template>
                    <v-btn elevation="10" @click="pushAddChild()"
                      ><v-icon>mdi-expand-all-outline</v-icon></v-btn
                    >
                    <v-btn elevation="10"
                      ><v-icon>mdi-content-copy</v-icon></v-btn
                    >
                  </v-speed-dial>
                </v-col>
                <!--タスク名-->
                <v-col cols="11" class="px-1 pt-0 pb-0">
                  <v-text-field
                    v-model="task.title"
                    class="my-0 py-0"
                    dence
                    hide-details
                    @change="$db.task.list = $db.task.list"
                  >
                  </v-text-field>
                </v-col>
                <!--コンテンツ-->
                <v-col v-for="(val,idx) in task.contents" cols="12" class="ma-0 pa-0 px-2">
                  <!--リンクコンテンツ-->
                  <v-container vif="val.type=='link'" class="py-2 my-0">
                    <v-row v-if="val.isEdit">
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn fab icon x-small @click="changeContents(val)"><v-icon>mdi-pen</v-icon></v-btn>
                      </v-col>
                      <v-col cols="5" class="pa-0 ma-0 pr-1"><v-text-field class="caption" v-model="val.value" dence hide-details label="URL"></v-text-field></v-col>
                      <v-col cols="5" class="pa-0 ma-0"><v-text-field class="caption" v-model="val.title" dence hide-details label="表示"></v-text-field></v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn fab icon x-small @click="deleteContents(idx)"><v-icon>mdi-close</v-icon></v-btn>
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn fab icon x-small @click="val.isEdit=!val.isEdit"><v-icon>mdi-pen</v-icon></v-btn>
                      </v-col>
                      <v-col cols="10" class="pa-0 ma-0 pl-5 caption"> <a target="_blank" :href="val.value">{{val.title}}</a></v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn fab icon x-small @click="deleteContents(idx)"><v-icon>mdi-close</v-icon></v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col cols="12" class="ma-0 pa-0">
                    <v-btn icon x-small @click="pushAddLink()"><v-icon>mdi-playlist-plus</v-icon></v-btn>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="2" class="px-0 py-0" align="right">
              <v-speed-dial
                v-model="isStateDial"
                direction="bottom"
                style="width: 100%; height: 100%"
                class="overline"
              >
                <template v-slot:activator>
                  <v-btn
                    elevation="0"
                    class="rounded-0 overline"
                    :class="$db.task.stateList[task.state].textColor"
                    :color="$db.task.stateList[task.state].color"
                    style="width: 100%; height: 100%"
                  >
                    {{ $db.task.stateList[task.state].text }}
                  </v-btn>
                </template>
                <span></span>
                <span
                  v-for="(val, idx) in $db.task.stateList[task.state].next"
                  :key="idx"
                >
                  <v-btn
                    elevation="10"
                    class="rounded-0 overline"
                    :class="$db.task.stateList[val].textColor"
                    :color="$db.task.stateList[val].color"
                    @click="changeState(val)"
                  >
                    {{ $db.task.stateList[val].text }}
                  </v-btn>
                </span>
              </v-speed-dial>
            </v-col>
          </v-row>
        </v-container>
      </v-card>

      <div
        class="my-3 py-2 pl-3 pr-0"
        v-for="(val, idx) in $db.task.getParentList(id)"
        :key="idx"
      >
        <task-card :id="val.id"></task-card>
      </div>
    </span>
  </div>
</template>
<script>
import TaskCard from "~/components/TaskCard";
export default {
  props: {
    id: {
      type: String,
    },
  },
  data: () => ({
    task: null,
    isStateDial: false,
    isAddTaskDial: false,
    isOpenOption: false,
  }),
  async created() {},
  async mounted() {
    this.task = this.$db.task.getTask(this.id);
  },
  methods: {
    /**
     * 子タスクを追加
     */
    pushAddChild() {
      this.$db.task.add("todo", this.id);
    },
    /**
     * コンテンツにリンクを追加
     */
    pushAddLink(){
      this.$db.task.addContents(this.id)
    },
    changeContents(val){
      val.isEdit=!val.isEdit
      this.$db.task.updateTask()
    },
    deleteContents(idx){
      this.task.contents.splice(idx,1)
      this.$db.task.updateTask()
    },
    /**
     * ステータス変更
     * @param {} state
     */
    changeState(state) {
      //削除の場合は
      if (state == "delete") {
        this.$db.task.delete(this.id);
        return;
      }
      this.$db.task.changeState(this.id, state);
    },
  },
};
</script>
<style scoped>
.v-text-field >>> input {
  font-size: 0.7em;
  padding-bottom: 0px;
}

.active-card {
  z-index: 999;
}
</style>

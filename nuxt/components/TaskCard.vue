<template>
  <div id="wrap">
    <span v-if="isLoad">
      <v-card
        variant="outlined"
        :elevation="elevation"
        class="pa-0 ma-0 rounded-0"
        :class="{ 'active-top': isStateDial || isAddTaskDial }"
        v-if="task != null"
        :id="task.id"
      >
        <v-container class="pt-0">
          <v-row>
            <v-col cols="10">
              <v-row>
                <!--タスク名-->
                <v-col cols="12" class="px-1 pt-0 pb-0">
                  <v-text-field
                    v-if="isTitleEdit"
                    ref="focusInput"
                    append-icon="mdi-check-circle-outline"
                    @click:append="confirmTitle()"
                    v-model="task.title"
                    class="my-0 py-0"
                    dence
                    hide-details
                    @change="confirmTitle()"
                    @blur="confirmTitle()"
                  >
                  </v-text-field>
                  <div v-else
                    class="pl-1 pt-2 card-title"
                    @click="editTitle()"
                  >{{task.title}}</div>
                </v-col>
                <v-col cols="6" class="ma-0 pa-0 py-1 pl-2" :class="{ 'active-top': isContentsDial || isContentsDial }">
                  <!--コンテンツ-->
                  <v-speed-dial absolute v-model="isContentsDial" direction="bottom">
                    <template v-slot:activator>
                      <v-btn icon x-small>
                        <v-icon>mdi-playlist-plus</v-icon>
                      </v-btn>
                    </template>
                    <!--リンクコンテンツ-->
                    <v-btn fab x-small  class="white--text blue darken-2 ml-2" elevation="10"
                      @click="pushAddLink('link')"
                      ><v-icon>mdi-link</v-icon></v-btn
                    >
                    <!--日付コンテンツ-->
                    <v-btn fab x-small  class="white--text blue darken-2 ml-2" elevation="10"
                      @click="pushAddLink('datetime')"
                      ><v-icon>mdi-clipboard-text-clock</v-icon></v-btn
                    >
                  </v-speed-dial>
                </v-col>
                <v-col cols="6" align="right" class="ma-0 pa-0 py-1 pr-2">
                  <!--子タスク作成-->
                    <v-btn x-small icon elevation="0"
                      color="primary"
                      @click="pushAddChild()">
                      <v-icon>mdi-expand-all-outline</v-icon>
                    </v-btn>
                  <!-- 子タスクの表示/非表示-->
                      <v-btn x-small icon elevation="0" @click="isOpenChildlen=!isOpenChildlen">
                        <v-icon v-if="isOpenChildlen">mdi-card-multiple</v-icon>
                        <v-icon v-else>mdi-card-multiple-outline</v-icon>
                      </v-btn>
                    <!--　タスク追加ボタン
                  <v-speed-dial v-model="isAddTaskDial" direction="bottom">
                    <template v-slot:activator>
                      <v-btn x-small icon
                        ><v-icon  dark color="blue darken-1">mdi-plus-circle</v-icon></v-btn
                      >
                    </template>
                  -->
                  </v-col>
                <v-col cols="10" class="ma-0 pa-0 pl-0">
                </v-col>
                <v-col cols="12" v-for="(val, idx) in task.contents" :key="idx" class="ma-0 pa-0 px-0">
                  <!--リンクコンテンツ------------------------------------------->
                  <!------------------------------------------------------------>
                  <v-container v-if="val.type == 'link'" class="py-2 my-0 mb-3">
                    <v-row v-if="val.isEdit">
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="changeContents(val, true)"
                          ><v-icon>mdi-check-circle-outline</v-icon></v-btn
                        >
                      </v-col>
                      <v-col cols="5" class="pa-0 ma-0 pr-1">
                        <input
                          type="text"
                          v-model="val.value"
                          placeholder="リンク"
                          style="width: 100%; border:solid 0.5px;height:100%;"
                          @change="changeContents(val)"
                        />
                      </v-col>
                      <v-col cols="5" class="pa-0 ma-0">
                        <input
                          type="text"
                          v-model="val.title"
                          placeholder="タイトル"
                          style="width: 100%; border: solid 0.5px;height:100%;"
                          @change="changeContents(val)"
                        />
                      </v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="deleteContents(idx)"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="val.isEdit = !val.isEdit"
                          ><v-icon>mdi-pen</v-icon></v-btn
                        >
                      </v-col>
                      <v-col cols="10" class="pa-0 ma-0 pr-1">
                        <a target="_blank" :href="val.value">{{val.title}}</a>
                      </v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="deleteContents(idx)"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                  <!------------------------------------------------------------>

                  <!--予定日コンテンツ------------------------------------------->
                  <!------------------------------------------------------------>
                  <v-container v-if="val.type == 'datetime'" class="py-2 my-0 mb-3">
                    <v-row v-if="val.isEdit">
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="changeContents(val, true)"
                          ><v-icon>mdi-check-circle-outline</v-icon></v-btn
                        >
                      </v-col>
                      <v-col cols="10" class="pa-0 ma-0">
                        <input
                          type="date"
                          v-model="val.date"
                          placeholder="日付"
                          style="border: solid 0.5px;height:100%;"
                        />
                        <input
                          type="time"
                          v-model="val.time"
                          placeholder="時間"
                          style="border: solid 0.5px;height:100%;"
                        />
                      </v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="deleteContents(idx)"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                    <v-row v-else>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="val.isEdit = !val.isEdit"
                          ><v-icon>mdi-pen</v-icon></v-btn
                        >
                      </v-col>
                      <v-col cols="10" class="pa-0 ma-0">
                        <input
                          type="date"
                          readonly
                          v-model="val.date"
                          placeholder="日付"
                          style="border: none 0.5px;height:100%;"
                        />
                        <input
                          type="time"
                          readonly
                          v-model="val.time"
                          placeholder="時間"
                          style="border: none 0.5px;height:100%;"
                        />
                      </v-col>
                      <v-col cols="1" class="pa-0 ma-0">
                        <v-btn icon x-small @click="deleteContents(idx)"
                          ><v-icon>mdi-close</v-icon></v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                  <!------------------------------------------------------------>

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
                    :class="$plg.task.stateList[task.state].textColor"
                    :color="$plg.task.stateList[task.state].color"
                    style="width: 100%; height: 100%"
                  >
                    {{ $plg.task.stateList[task.state].text }}
                  </v-btn>
                </template>
                <span>
                </span>
                <span
                  v-for="(val, idx) in $plg.task.stateList[task.state].next"
                  :key="idx"
                >
                  <v-btn
                    elevation="10"
                    class="rounded-0 overline"
                    :class="$plg.task.stateList[val].textColor"
                    :color="$plg.task.stateList[val].color"
                    @click="changeState(val)"
                  >
                    {{ $plg.task.stateList[val].text }}
                  </v-btn>
                </span>
              </v-speed-dial>
            </v-col>
          </v-row>
        </v-container>
      </v-card >
        <!-- 子タスク-->
        <span v-show="isOpenChildlen">
          <div
            class="my-3 py-2 pl-3 pr-0"
            v-for="(val, idx) in $plg.task.getFilterList(id)"
            :key="idx"
          >
            <task-card :id="val.id"
              :elevation=Math.round(elevation/2)
            ></task-card>
          </div>
        </span>
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
    elevation:{
    }
  },
  data: () => ({
    task: null,
    isTitleEdit:false,
    isStateDial: false,
    isAddTaskDial: false,
    isOpenOption: false,
    isContentsDial:false,
    isOpenChildlen:true,
    isLoad:true,
  }),
  async created() {},
  async mounted() {
    this.task = this.$plg.task.getTask(this.id);
  },
  methods: {
    /**
     * 子タスクを追加
     */
    pushAddChild() {
      this.isLoad=false
      this.$plg.task.add("todo", this.id)
      this.isLoad=true
      
    },
    /**
     * コンテンツ追加
     */
    pushAddLink(type) {
      this.$plg.task.addContents(this.id,type);
    },
    /**コンテンツ内容を変更
     * 
     * @param {*} val 
     * @param {*} isForce 
     */
    changeContents(val, isForce = false) {
      if (isForce) {
        val.isEdit = !val.isEdit;
        this.$plg.task.updateTask();
      } else {
        if (val.value != "" && val.title != "") {
          val.isEdit = !val.isEdit;
          this.$plg.task.updateTask();
        }
      }
    },
    /**
     * コンテンツ削除
     * @param {} idx 
     */
    deleteContents(idx) {
      this.task.contents.splice(idx, 1);
      this.$plg.task.updateTask();
    },
    /**
     * ステータス変更
     * @param {} state
     */
    changeState(state) {
      //削除の場合は
      if (state == "delete") {
        this.$plg.task.delete(this.id);
        return;
      }
      this.$plg.task.changeState(this.id, state);
    },
    /**
     * タイトル修正時
     */
    editTitle(){
      this.isTitleEdit=!this.isTitleEdit
      setTimeout(() => {
        this.$refs.focusInput.focus()
       }, 1)
    },
    /**
     * タイトル修正完了
     */
    confirmTitle(){
      this.$plg.task.list = this.$plg.task.list;
      this.isTitleEdit=!this.isTitleEdit
    }
    
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
.card-title{
  cursor:pointer;
  width:100%;
  min-height:32px;
  font-size:0.7em;
}
</style>

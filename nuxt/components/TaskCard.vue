<template>
    <div id="wrap">
        <v-card class="py-2" variant="outlined" elevation="4">
            <v-container>
                <v-row>
                    <v-col cols="12" class="pa-0 px-1">
                        <v-container ma-0 pa-0 class="py-0">
                            <v-row class="dense no-gutters">
                                <v-col cols="2" justify="left">
                                    <span v-if="task.parentId!=null">
                                        <v-btn icon
                                        ><v-icon>mdi-menu-up-outline</v-icon></v-btn>
                                    </span>
                                </v-col>
                                <v-col cols="10" justify="left">
                                    <v-text-field
                                        class="py-0 my-0"
                                        label="Task"
                                        hide-details="auto"
                                        v-model="task.title"
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="9" class="pt-0">
                                    <v-btn icon
                                    @click="addParent()"
                                    >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>

                                    <span class="caption" :class="$db.task.getStateColor(task.state,'--text')">{{ $db.task.getStateText(task.state) }}</span>

                                    <span v-if="task.state==0">
                                        <v-chip outlined label class="pa-1 py-0" size="x-small" 
                                            @click="changeState(1)" :color="$db.task.getStateColor(1)">
                                            {{ $db.task.getStateText(1) }}
                                        </v-chip>
                                    </span>
                                    <span v-if="task.state==1">
                                        <v-chip outlined label class="pa-1 py-0" size="x-small" 
                                            @click="changeState(2)" :color="$db.task.getStateColor(2)">
                                            {{ $db.task.getStateText(2) }}
                                        </v-chip>
                                        <v-chip outlined label class="pa-1 py-0" size="x-small" 
                                            @click="changeState(3)" :color="$db.task.getStateColor(3)">
                                            {{ $db.task.getStateText(3) }}
                                        </v-chip>
                                        <v-chip outlined label class="pa-1 py-0" size="x-small" 
                                            @click="changeState(4)" :color="$db.task.getStateColor(4)">
                                            {{ $db.task.getStateText(4) }}
                                        </v-chip>
                                    </span>
                                    <span v-if="task.state==2">
                                        <v-chip outlined label class="pa-1 py-0" size="x-small" 
                                            @click="changeState(1)" :color="$db.task.getStateColor(1)">
                                            {{ $db.task.getStateText(1) }}
                                        </v-chip>
                                    </span>
                                </v-col>
                                <v-col cols="3" class="pt-0">
                                    <v-btn icon><v-icon>mdi-dots-horizontal</v-icon></v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </div>
</template>
<script>
    export default {
        props:{
            taskId:{
                type:String
            }
        },
        data: () => ({
            task:null
        }),
        async created () {
            this.task=this.$db.task.list[this.taskId]
        },
        async mounted(){
        },
        methods:{
            /**
             * ステータス変更
             */
            changeState(state){
                this.task.state=state
            },
            /**
             * 子タスク作成
             */
            addParent(){
                this.$db.task.add(this.taskId)
            }
        }
    }
</script>
<style scoped>
.v-text-field >>> input {
  padding: 0.2 !important;
}
</style>
    
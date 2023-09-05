<template>
    <div id="wrap">
        <v-card
            variant="outlined"
            elevation="2"
            class="pa-0 ma-0 rounded-0"
            :class="{'active-card':stateDial}"
            >
            <v-container class="pt-0 ">
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
                                    @click:prepend="isOpenOption=!isOpenOption"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" class="ma-0 pa-0 px-2">
                                <span class="overline">
                                    <parts-date></parts-date>
                                </span>
                            </v-col>
                            <v-col v-if="isOpenOption" cols="12" class="ma-0 pa-0 px-2">
                                おぷしょん
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2" class="px-0 py-0" align="right">
                        <v-speed-dial
                            v-model="stateDial"
                            direction="bottom"
                            style="width:100%;height:100%;"
                            class="overline"
                        >
                            <template v-slot:activator>
                                <v-btn
                                    elevation="0"
                                    class="rounded-0 overline"
                                    :class="$db.task.stateList[task.state].textColor"
                                    :color="$db.task.stateList[task.state].color"
                                    style="width:100%;height:100%;"
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
                                    elevation="0"
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
    </div>
</template>
<script>
    export default {
        props:{
            idx:{
                type:Number
            }
        },
        data: () => ({
            task:null,
            stateDial:false,
            isOpenOption:false
        }),
        async created () {
            this.task=this.$db.task.list[this.idx]
            console.log(this.task)
        },
        async mounted(){
           
        },
        methods:{
            /**
             * ステータス変更
             * @param {} state 
             */
            changeState(state){
                this.$db.task.changeState(this.idx,state)
            },

        }
    }
</script>
<style scoped>
.v-text-field >>> input {
  padding: 0.2 !important;
}
.active-card{
    z-index:999;
}
</style>
    
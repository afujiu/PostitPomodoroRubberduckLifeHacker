<template>
    <div id="wrap">
        <task-card :taskId="taskId"></task-card>
        <v-container class="ma-0 pa-0 mt-5 pl-5 pr-0">
                <v-row>
                    <v-col class="ma-0 pa-0 px-2 pt-2">
                        <v-row>
                            <v-col cols="12"
                                v-for="(val,key) in $db.task.getChildrenList(taskId)" :key="key">
                                <task-card :taskId="key"></task-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
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
        }),
        async created () {
        },
        async mounted(){
        },
        methods:{}
    }
</script>
<style scoped>
</style>
    
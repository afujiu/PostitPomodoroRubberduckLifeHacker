<template>
    <div id="wrap" class="bg">
    <v-app>
        <v-app-bar color="primary" fixed max-height="80px">
            <v-btn class="primary"
            dark
            small
            fab
            icon
            fixed
            @click="pushAddTask"
        ><v-icon>mdi-plus</v-icon></v-btn>
            <v-container class="ma-0 pa-0">
                <v-row>
                    <v-col cols="1">
                    </v-col>
                    <v-col cols="11" class="py-2  my-2">
                        <v-container class="pa-0 ma-0">
                            <v-row class="dense no-gutters">
                                <v-col cols="6" class="pa-0 ma-0">
                                    <v-text-field
                                        color="white"
                                        class="white"
                                        hide-details
                                        label="Search"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" class="pa-0 ma-0"></v-col>
                            </v-row>
                        </v-container>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-main>
            <v-container v-if="isLoad">
                <v-row>
                    <v-col class="ma-2 pa-2 my-5">
                        </v-col>
                </v-row>
                <v-row>
                    <v-col class="ma-2 pa-2">
                        <v-row>
                            <v-col
                                class="my-0"
                                v-for="(val,key) in $db.task.getParentList()" :key="key"
                                xm="12" sm="6" md="4" lg="4" cols="12">
                                <one-task :taskId="key"></one-task>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
    </div>
</template>
<script>
    export default {
      data: () => ({
        isLoad:true
      }),
      async created () {
        this.$db.task.isLoadFunc=(isLoad)=>{
            setTimeout(() => {
                this.isLoad=isLoad    
            }, 5);
        }
      },
      async mounted(){
      },
      methods:{
        async pushAddTask(){
            this.$db.task.add()
        }
      }
    }
</script>
<style scoped>

</style>
    
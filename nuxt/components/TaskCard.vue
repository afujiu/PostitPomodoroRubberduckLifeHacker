<template>
    <div id="wrap">
        <v-card variant="outlined" elevation="4" class="pa-0 ma-0">
            <v-container class="pa-0 ma-0">
                <v-row>
                    <v-col cols="11" class="pa-0 ma-0">
                        <v-text-field
                            v-model="task.title"
                            class="pa-0 ma-0"
                            dence
                            hide-details
                            width="100%"
                        ></v-text-field>
                    </v-col>
                    <v-col col="1" class="pa-0 ma-0">

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
            task:null
        }),
        async created () {
            this.task=this.$db.task.list[this.idx]
            console.log(this.task)
        },
        async mounted(){
           
        },
        methods:{}
    }
</script>
<style scoped>
.v-text-field >>> input {
  padding: 0.2 !important;
}
</style>
    
<template>
    <div id="wrap">
        <v-card variant="outlined" elevation="4">
            <v-container>
                <v-row>
                    <v-col cols="12"></v-col>
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
    
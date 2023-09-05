<template>
    <span v-if="!readonly">
        <input type="date" v-model="valueDate">
        <input type="time" v-model="valueTime">
</span>
<span v-else>

</span>
  </template>
  <script>
  export default {
    name: "parts-date",
    model: {
      prop: "input",
      event: "input",
    },
    props: {
      input: {
        required: false,
      },
      label: {
        type: String,
        required: false,
        default: "",
      },
      readonly: {
        type: Boolean,
        required: false,
        default: false,
      },
      outlined: {
        type: Boolean,
        required: false,
        default: false,
      },
    },
    data: () => ({
      model: null,
      dateObj:{y:0,m:0,d:0,w:0,h:0,mi:0,s:0,ms:0}
    }),
    async created() {},
    computed: {
      valueDate: {
        //テキストボックスへ値をセット
        get() {
            let date=(this.input!=null)?this.input: new Date()
            const dayname = ['日','月','火','水','木','金','土']
            this.dateObj.y = date.getFullYear();
            this.dateObj.m = date.getMonth() + 1
            this.dateObj.d = date.getDate()
            this.dateObj.w = dayname[date.getDay()]
            this.dateObj.h = date.getHours()
            this.dateObj.mi =date.getMinutes()
            this.dateObj.s = date.getSeconds()
            this.dateObj.ms =date.getTime()

            return `${this.dateObj.y}-${this.$util.prePadding(this.dateObj.m,2,"0")}-${this.$util.prePadding(this.dateObj.d,2,"0")}`;
        },
        //テキストボックスから値を出力
        set(val) {
          this.$emit("input", val);
        },
      },
      valueTime: {
        //テキストボックスへ値をセット
        get() {
            let date=(this.input!=null)?this.input: new Date()
            const dayname = ['日','月','火','水','木','金','土']
            this.dateObj.y = date.getFullYear();
            this.dateObj.m = this.$util.prePadding(date.getMonth() + 1,2,"0")
            this.dateObj.d = this.$util.prePadding(date.getDate(),2,"0")
            this.dateObj.w = dayname[date.getDay()]
            this.dateObj.h =  this.$util.prePadding(date.getHours(),2,"0")
            this.dateObj.mi =  this.$util.prePadding(date.getMinutes(),2,"0")
            this.dateObj.s =  this.$util.prePadding(date.getSeconds(),2,"0")
            this.dateObj.ms =  date.getTime();
            return `${this.$util.prePadding(this.dateObj.h,2,"0")}:${this.$util.prePadding(this.dateObj.mi,2,"0")}`;

        },
        //テキストボックスから値を出力
        set(val) {
          this.$emit("input", val);
        },
      },
    },
    methods: {},
  };
  </script>
  <style scoped lang="scss">
  </style>
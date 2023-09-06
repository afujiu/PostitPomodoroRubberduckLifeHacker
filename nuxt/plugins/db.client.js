import Vue from 'vue'
/**
 * タスククラス
 */
class TaskClass {
    constructor() {
        this._taskList = []
        let taskList = localStorage.getItem("taskList")
        if (taskList != null) {
            this._taskList = JSON.parse(taskList)
        }
        this.isLoading = () => { }
    }
    initLoadFunction(func) {
        this.isLoading = func
    }
    /**
     * ステータス情報
     */
    get stateList() {
        return {
            "todo": { text: "未着", color: "white", textColor: "black--text", next: ["work", "wait", "plan", "loop", "cancel"] },
            "plan": { text: "予定", color: "deep-purple darken-1", textColor: "white--text", next: ["work", "stop", "cancel", "comp"] },
            "loop": { text: "定例", color: "green lighten-5", textColor: "black--text", next: ["cancel", "comp"] },
            "work": { text: "作業中", color: "green", textColor: "white--text", next: ["stop", "cancel", "comp"] },
            "wait": { text: "返信待", color: "brown", textColor: "white--text", next: ["cancel", "comp"] },
            "stop": { text: "停止", color: "blue-grey", textColor: "white--text", next: ["work", "cancel", "comp"] },
            "cancel": { text: "中止", color: "deep-orange lighten-5", textColor: "black--text", next: [] },
            "comp": { text: "完了", color: "light-blue lighten-5", textColor: "black--text", next: [] },
        }
    }

    /**
     * ユニークID取得
     */
    static get uid() {
        const time = new Date()
        const minSec = time.getTime()
        const rand = Math.floor(Math.random() * 100000000000)
        return minSec.toString(36) + "-" + rand.toString(36)
    }

    /**
     * タスクリスト取得
     */
    get list() {
        return this._taskList
    }
    set list(taskList) {
        this._taskList = taskList
        this.isLoading()
        localStorage.setItem("taskList", JSON.stringify(this._taskList))
    }
    resetTask() {
        localStorage.removeItem("taskList")
        this._taskList = []
        this.isLoading()
    }

    /**
     * タスク追加
     * @param {*} title 
     * @param {*} parentId 
     */
    add(state = "todo", parentId = null) {
        const uid = TaskClass.uid
        const startDateTime = new Date()
        let task = {
            id: uid,
            title: "",
            state: state,
            startDateTime: startDateTime,
            endDateTime: "",
            planTime: "",
            contents: [],
            parentId: parentId
        }
        let list = this.list
        list.push(task)
        this.list = list
    }
    /**
     * ステータス変更(作業中に変更した場合、ほかの作業中は停止)
     * @param {*} uid 
     * @param {*} state 
     */
    changeState(key, state) {
        if (state == 'work') {
            let task = this._taskList.find((v) => { v.state == 'work' })
            for (let idx in this._taskList) {
                if (this._taskList[idx].state == 'work') {
                    this.list[idx].state = 'stop'
                }
            }
        }
        this.list[key].state = state
        this.list = this.list
    }
}

Vue.prototype.$db = {
    task: new TaskClass(),
}


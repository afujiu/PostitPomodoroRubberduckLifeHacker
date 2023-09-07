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
            "todo": { text: "未着", color: "red lighten-5", textColor: "black--text", next: ["work", "wait", "plan", "loop", "cancel", "delete"] },
            "plan": { text: "予定", color: "amber lighten-2", textColor: "black--text", next: ["work", "stop", "cancel", "comp"] },
            "loop": { text: "定例", color: "green lighten-4", textColor: "black--text", next: ["cancel", "comp"] },
            "work": { text: "作業中", color: "red darken-2", textColor: "white--text", next: ["stop", "cancel", "comp"] },
            "wait": { text: "返信待", color: "orange darken-3", textColor: "white--text", next: ["cancel", "comp", "delete"] },
            "stop": { text: "停止", color: "blue-grey", textColor: "white--text", next: ["work", "plan", "wait", "cancel", "comp", "delete"] },
            "cancel": { text: "中止", color: "brown lighten-5", textColor: "black--text", next: [] },
            "comp": { text: "完了", color: "blue lighten-5", textColor: "black--text", next: [] },
            "delete": { text: "削除", color: "black", textColor: "white--text", next: [] },
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
    /**
     * タスク取得
     * @param {*} id 
     * @returns 
     */
    getTask(id) {
        let task = this.list.find((v) => v.id == id)
        if (task == undefined) {
            return null
        }
        return task
    }
    /**
     * タスクリセット
     */
    resetTask() {
        localStorage.removeItem("taskList")
        this._taskList = []
        this.isLoading()
    }
    /**
     * タスク削除
     * @param {*} id 
     * @returns 
     */
    delete(id) {
        let idx = this.list.findIndex((v) => v.id == id)
        this.list = this.list.splice(idx, 1)
    }

    /**
     * 子タスクを取得
     * @param {*} id 
     * @returns 
     */
    getParentList(id) {
        let list = this._taskList.filter((v) => v.parentId == id)

        if (list == undefined) {
            return []
        }
        return list
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
    changeState(id, state) {
        if (state == 'work') {
            let task = this._taskList.find((v) => { v.state == 'work' })
            for (let idx in this._taskList) {
                if (this._taskList[idx].state == 'work') {
                    this.list[idx].state = 'stop'
                }
            }
        }
        let task = this.getTask(id)
        task.state = state
        this.list = this.list
    }
}

Vue.prototype.$db = {
    task: new TaskClass(),
}


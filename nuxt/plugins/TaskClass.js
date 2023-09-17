import Vue from 'vue'
import { DexieClass } from "./DexieClass.js";
import { UtilClass } from "./UtilClass.js";
import { LoggingClass } from "./LoggingClass.js";

/**
 * タスククラス
 */
export class TaskClass {
    constructor() {
        this.logging = new LoggingClass()
        this.dexieTaskList = new DexieClass('dexieTask', 'json')
        this.dexieFilter = new DexieClass('dexieFilter', 'json')

        this._taskList = []
        this._filter = {
            state: ["todo", "plan", "loop", "work", "wait", "stop", "cancel", "cancel", "comp"],
            date: "",
        }
        this.isLoading = () => { }
        this.initUpload = () => { }
        const asyncInit = async () => {

            let taskList = await this.dexieTaskList.getJson()
            if (taskList != null) {
                this._taskList = taskList
            }
            let dexieFilter = await this.dexieFilter.getJson()
            if (dexieFilter != null) {
                this.filter = dexieFilter
            }
        }
        asyncInit()
    }

    initLoadFunction(func) {
        this.isLoading = func
    }
    /**
     * 強制的に画面更新
     * @param {} func 
     */
    initUploadFunction(func) {
        this.initUpload = func
    }
    updateTask() {
        this.list = this.list
    }
    /**
     * ステータス情報
     */
    get stateList() {
        return {
            "todo": { text: "未着", color: "red lighten-5", textColor: "black--text", next: ["work", "wait", "plan", "loop", "cancel", "delete"] },
            "plan": { text: "予定", color: "amber lighten-2", textColor: "black--text", next: ["work", "stop", "cancel", "comp"] },
            "loop": { text: "メモ", color: "green lighten-4", textColor: "black--text", next: ["cancel", "comp"] },
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
        this.dexieTaskList.putJson(this._taskList)
    }
    /**
     * フィルター
     */
    get filter() {
        return this._filter
    }
    set filter(filter) {
        this._filter = filter
    }
    changeFilter() {
        this.dexieFilter.putJson(this._filter)
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
    getTaskIdx(id) {
        let idx = this.list.findIndex((v) => v.id == id)
        if (idx == undefined) {
            return null
        }
        return idx
    }
    /**
     * タスクリセット
     */
    resetTask() {
        this.dexieTaskList.clearJson()
        this._taskList = []
        this.isLoading()
    }
    /**
     * タスク削除
     * @param {*} id 
     * @returns 
     */
    delete(id) {
        let idx = this._taskList.findIndex((v) => v.id == id)
        let task = this._taskList.find((v) => v.id == id)
        //削除タスクに子があったら、親を引き継がす
        let childTask = this.getParentList(id)
        if (childTask.length > 0) {
            //最上位の場合、子タスクのparentIDをnullにする
            if (task.parentId == null) {
                for (let i in childTask) {
                    this.list[this.getTaskIdx(childTask[i].id)].parentId = null
                }
            } else {
                for (let i in childTask) {
                    this.list[this.getTaskIdx(childTask[i].id)].parentId = task.parentId
                }
            }
        }
        this._taskList.splice(idx, 1)
        this.list = this.list
        this.initUpload()
    }

    /**
     * 子タスクを取得
     * @param {*} id 
     * @returns 
     */
    getParentList(id) {
        let list = this._taskList.filter((v) => {
            v.parentId == id
        })
        if (list == undefined) {
            return []
        }
        return list
    }
    getFilterList(parentId = null) {
        let list = this._taskList.filter((v) => {
            if (v.parentId != parentId) {
                return false
            }
            if (!this.filter.state.includes(v.state)) {
                return false
            }
            return true
        })
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
        const startDateTime = UtilClass.nowTime()
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
     * コンテンツを追加
     * @param {} id 
     */
    addContents(id, type) {
        let idx = this.getTaskIdx(id)
        let data = this.list[idx]
        switch (type) {
            case "link":
                data.contents.push({
                    type: "link",
                    isEdit: true,
                    value: "",
                    title: ""
                })
                break
            case "datetime":
                data.contents.push({
                    type: "datetime",
                    isEdit: true,
                    date: "",
                    time: ""
                })
                break
        }
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
        this.logging.addLog(id, state)
        this.list = this.list
        this.initUpload()
    }
}


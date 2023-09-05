import Vue from 'vue'
/**
 * タスククラス
 */
class TaskClass {
    constructor() {
        this._taskList = []
        this.isLoading=()=>{}
    }
    initLoadFunction(func){
        this.isLoading=func
    }
    /**
     * ステータス情報
     */
    get stateList(){
        return {
            "todo":{text:"未着",textColor:"secondary",color:"secondary--text"},
            "plan":{text:"予定",textColor:"secondary",color:"secondary--text"},
            "loop":{text:"定例",textColor:"secondary",color:"secondary--text"},
            "work":{text:"作業",textColor:"secondary",color:"secondary--text"},    
            "wait":{text:"返信待ち",textColor:"secondary",color:"secondary--text"},
            "stop":{text:"停止",textColor:"secondary",color:"secondary--text"},
            "cancel":{text:"中止",textColor:"secondary",color:"secondary--text"},
            "comp":{text:"完了",textColor:"secondary",color:"secondary--text"},
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
        console.log("aaa")
        this._taskList = taskList
        this.isLoading()
    }

    /**
     * タスク追加
     * @param {*} title 
     * @param {*} parentId 
     */
    add(state="todo",parentId = null) {
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
        let list=this.list
        list.push(task)
        this.list=list
    }
}

Vue.prototype.$db = {
    task: new TaskClass(),
}


import Vue from 'vue'
class TaskClass {
    constructor() {
        this._taskList = {}
        this._isLoadFunc = () => { }
        this._isCompShowFlg = true
    }
    /**
     * リスト更新フラグ
     */
    set isLoadFunc(isLoadFunction) {
        this._isLoadFunc = isLoadFunction
    }
    set isLoad(isLoad) {
        this._isLoadFunc(isLoad)
    }
    set isCompShowFlg(isCompShowFlg) {
        this.isLoad = false
        this._isCompShowFlg = isCompShowFlg
        this.isLoad = true

    }
    get isCompShowFlg() {
        return this._isCompShowFlg
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
    }

    /**
     * ステータス情報
     */
    getStateText(state) {
        switch (state) {
            case 0: return '未着'
            case 1: return '作業'
            case 2: return '停止'
            case 3: return '中止'
            case 4: return '完了'
        }
    }
    getStateColor(state, appendText = "") {
        switch (state) {
            case 0: return 'secondary' + appendText
            case 1: return 'green' + appendText
            case 2: return 'secondary' + appendText
            case 3: return 'red' + appendText
            case 4: return 'primary' + appendText
        }
    }
    getParentList() {
        let data = {}
        for (let key in this._taskList) {
            if (this._taskList[key].parentId == null) {
                //終了フラグが立っていたら終了分は非表示
                if (this._isCompShowFlg && (this._taskList[key].state == 3 || this._taskList[key].state == 4)) {
                    continue
                }
                data[key] = key
            }
        }
        return data
    }
    /**
     * 子コンポーネントを取得
     * @param {*} parentId 
     * @returns 
     */
    getChildrenList(parentId) {
        let data = {}
        for (let key in this._taskList) {
            if (this._taskList[key].parentId == parentId) {
                if (this._isCompShowFlg && (this._taskList[key].state == 3 || this._taskList[key].state == 4)) {
                    continue
                }
                data[key] = key
            }
        }
        return data
    }
    /**
     * タスク追加
     * @param {*} title 
     * @param {*} parentId 
     */
    add(parentId = null) {
        this.isLoad = false
        const uid = TaskClass.uid
        const startDateTime = new Date()
        let task = {
            id: uid,
            title: "",
            state: 0,
            startDateTime: startDateTime,
            endDateTime: "",
            planTime: "",
            log: [],
            contents: [],
            parentId: parentId
        }
        this._taskList[uid] = task
        this.isLoad = true
    }

}
Vue.prototype.$db = {
    task: new TaskClass(),

}


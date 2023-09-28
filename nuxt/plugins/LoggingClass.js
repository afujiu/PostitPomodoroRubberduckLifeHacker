import Vue from 'vue'
import { UtilClass } from "./UtilClass.js";
import { DexieClass } from "./DexieClass.js";

/**
 * ロギングクラス
 */
export class LoggingClass {
    constructor() {
        this.dexieLog = new DexieClass('dexieLog', '++id,time,uid,state')
        this._logList = []
        const asyncInit = async () => {
            let logList = await this.dexieLog.getAll()
            if (logList != null) {
                this._logList = logList
            }
        }
        asyncInit()
    }

    addLog(uid, state) {
        const time = UtilClass.nowTime()
        this.dexieLog.add({ uid: uid, state: state, time: time })
    }
    /**
     * 今日のログを取得
     */
    async getToday(minusDay = 0) {
        const func = () => {
            return new Promise((resolve) => {
                const today = UtilClass.todayZero(minusDay)
                const nextday = UtilClass.todayZero(minusDay + 1)
                console.log(minusDay)
                console.log(today)
                console.log(nextday)
                this.dexieLog.store.where("time").aboveOrEqual(today).belowOrEqual(nextday).toArray().then(
                    (result) => {
                        resolve(result)
                    })
            })
        }
        let data = await func()
        //タスクごとに時間と進捗を取得
        let taskList = {}
        for (let one of data) {
            if (taskList[one.uid] == undefined) {
                taskList[one.uid] = []
            }
            taskList[one.uid].push(one)
        }
        let result = {}
        //作業時間と最終進捗を入れる
        for (const uid in taskList) {
            let sumWorkTime = 0
            let endState = taskList[uid].state
            let beforeState = 'todo'
            let endTime = 0
            let compTime = 0
            for (const val of taskList[uid]) {
                endState = val.state
                //作業中の場合
                if (endState == 'work') {
                    endTime = val.time
                } else {
                    //作業中から作業以外になった場合
                    if (beforeState == 'work') {
                        sumWorkTime += val.time - endTime
                    }
                    compTime = val.time
                }
                beforeState = val.state
            }
            if (sumWorkTime > 0) {
                result[uid] = { compTime: compTime, sumWorkTime: sumWorkTime, endState: endState }
            }
        }

        return result
    }
    /**
     * ログを削除
     */
    clearLog() {
        this.dexieLog.claer()
    }
}



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
            console.log(logList)
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
    getAll() {
    }
}



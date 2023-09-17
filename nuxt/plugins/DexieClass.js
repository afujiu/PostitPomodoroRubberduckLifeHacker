import Vue from 'vue'
import Dexie from 'dexie';

/**
 * dexie制御
 */
export class DexieClass {
    /**
     * 
     * @param {*} tableName 
     * @param {*} columns  jsonの場合はjsonと書けば
     */
    constructor(tableName, columns) {
        this.tableName = tableName
        let table = {}
        if (columns == 'json') {
            table["json"] = '&name,json'
        } else {
            table[this.tableName] = columns
        }
        this.db = new Dexie(tableName)
        this.db.version(20).stores(table)
    }
    /**
     * 追加
     * @param {*} item 
     */
    add(item) {
        this.db[this.tableName].add(item)
    }

    /**
     * 
        .where("age")    // ageを対象
        .aboveOrEqual(22)        // 22以上
        .each((friend)=>{        // レコード数分繰り返す
            console.log(friend);
        })
     */
    get getWhere() {
        return this.db[this.tableName]
    }
    /**
     * データ
     */
    getAll() {
        return new Promise((resolve) => {
            this.db[this.tableName].toArray().then(
                (result) => {
                    resolve(result)
                }).catch(
                    (err) => {
                        console.log(err); resolve(null)
                    }
                )
        })
    }
    /**
     * 
     */
    claer() {
        this.db[this.tableName].clear()
    }
    /**
     * json形式の登録
     * @param {*} name 
     * @param {*} json 
     */
    async putJson(json) {
        await this.db.json.put({
            name: this.tableName,
            json: JSON.stringify(json)
        })
    }
    /**
     * json形式の取得
     * @returns 
     */
    getJson() {
        return new Promise((resolve) => {
            this.db.json.where({ name: this.tableName }).toArray().then((result) => {
                if (result.length > 0 && result != undefined) {
                    resolve(JSON.parse(result[0].json))
                }
                resolve(null)
            })
        })
    }
    /**
     * json形式クリア
     */
    clearJson() {
        this.db.json.clear()
    }
}
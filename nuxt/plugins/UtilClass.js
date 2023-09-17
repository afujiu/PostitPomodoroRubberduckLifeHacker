import Vue from 'vue'
/**
 * 汎用クラス
 */
export class UtilClass {
    /**
     * 現在日時のunixタイム取得
     */
    static nowTime() {
        const unixTime = new Date()
        return unixTime.getTime()
    }
    static yyyy(unixTime) {
        const dateTime = new Date(unixTime * 1000)
        let year = dateTime.getFullYear()
        return year
    }
    static mm(unixTime) {
        const dateTime = new Date(unixTime * 1000)
        let month = ('00' + (dateTime.getMonth() + 1)).slice(-2)
        return month
    }
    static m(unixTime) {
        const dateTime = new Date(unixTime * 1000)
        let month = (dateTime.getMonth() + 1)
        return month
    }

    static dd(unixTime) {
        const dateTime = new Date(unixTime * 1000)
        let day = ('00' + dateTime.getDate()).slice(-2)
        return day
    }
    static d(unixTime) {
        const dateTime = new Date(unixTime * 1000)
        let day = dateTime.getDate()
        return day
    }
    static ww(unixTime) {
        const week = ['日', '月', '火', '水', '木', '金', '土']
        const dateTime = new Date(unixTime * 1000)
        return `${week[dateTime.getDay()]}`
    }

    static hh(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getHours()).slice(-2)
    }
    static h(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getHours()
    }

    static mmi(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getMinutes()).slice(-2)
    }
    static mi(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getMinutes()
    }
    static ss(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getSeconds()).slice(-2)
    }
    static s(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getSeconds()
    }

    /**
     * 日付取得
     * @param {*} unixTime 
     * @param {*} separete 
     * @returns 
     */
    static getYYYYMMDD(unixTime, separete = '-') {
        const dateTime = new Date(unixTime * 1000)
        let year = dateTime.getFullYear()
        let month = ('00' + (dateTime.getMonth() + 1)).slice(-2)
        let day = ('00' + dateTime.getDate()).slice(-2)
        return `${year}${separete}${month}${separete}${day}`
    }


    /**
     * 時間取得
     * @param {*} unixTime 
     * @returns 
     */
    static getHimm(unixTime) {
        const dateTime = new Date(unixTime)
        let hour = ('00' + dateTime.getHours()).slice(-2)
        let minute = ('00' + dateTime.getMinutes()).slice(-2)
        let second = ('00' + dateTime.getSeconds()).slice(-2)
        return `${hour}:${minute}`
    }
}
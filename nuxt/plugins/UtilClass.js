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
    /**
     * 今日の0時から
     * @returns 
     */
    static todayZero(addDay = 0) {
        let date = new Date()
        let toDay = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
        toDay.setData(date.getDate() + addDay)
        return toDay.getTime()
    }
    static yyyy(unixTime) {
        const dateTime = new Date(unixTime)
        let year = dateTime.getFullYear()
        return year
    }
    yyyy(unitTime) {
        return UtilClass.yyyy(unitTime)
    }

    static mm(unixTime) {
        const dateTime = new Date(unixTime)
        let month = ('00' + (dateTime.getMonth() + 1)).slice(-2)
        return month
    }
    mm(unitTime) {
        return UtilClass.mm(unitTime)
    }
    static m(unixTime) {
        const dateTime = new Date(unixTime)
        let month = (dateTime.getMonth() + 1)
        return month
    }

    m(unitTime) {
        return UtilClass.m(unitTime)
    }

    static dd(unixTime) {
        const dateTime = new Date(unixTime)
        let day = ('00' + dateTime.getDate()).slice(-2)
        return day
    }
    dd(unitTime) {
        return UtilClass.dd(unitTime)
    }
    static d(unixTime) {
        const dateTime = new Date(unixTime)
        let day = dateTime.getDate()
        return day
    }
    d(unitTime) {
        return UtilClass.d(unitTime)
    }
    static ww(unixTime) {
        const week = ['日', '月', '火', '水', '木', '金', '土']
        const dateTime = new Date(unixTime)
        return `${week[dateTime.getDay()]}`
    }
    ww(unitTime) {
        return UtilClass.ww(unitTime)
    }
    static hh(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getHours()).slice(-2)
    }
    hh(unitTime) {
        return UtilClass.hh(unitTime)
    }
    static h(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getHours()
    }
    h(unitTime) {
        return UtilClass.h(unitTime)
    }

    static mmi(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getMinutes()).slice(-2)
    }
    mmi(unitTime) {
        return UtilClass.mmi(unitTime)
    }
    static mi(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getMinutes()
    }
    mi(unitTime) {
        return UtilClass.mi(unitTime)
    }
    static ss(unixTime) {
        const dateTime = new Date(unixTime)
        return ('00' + dateTime.getSeconds()).slice(-2)
    }
    ss(unitTime) {
        return UtilClass.ss(unitTime)
    }
    static s(unixTime) {
        const dateTime = new Date(unixTime)
        return dateTime.getSeconds()
    }
    s(unitTime) {
        return UtilClass.s(unitTime)
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
    getYYYYMMDD(unixTime, separete = '-') {
        return UtilClass.getYYYYMMDD(unixTime, separete)
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
    getHimm(unixTime) {
        return UtilClass.getHimm(unixTime)
    }
    /**
     * ミリ秒を分に変更
     * @param {*} ms 
     * @param {*} offHour trueの場合1時間後は0から
     * @returns 
     */
    static msToHour(ms, offDay = true) {
        let hour = Math.floor(ms / (1000 * 60 * 60))
        if (offDay) {
            return Number(hour - ((Math.floor(hour / 24)) * 24))
        }
        return Number(hour)
    }
    msToHour(ms, offDay = true) {
        return UtilClass.msToHour(ms, offDay)
    }

    /**
     * ミリ秒を分に変更
     * @param {*} ms 
     * @param {*} offHour trueの場合1時間後は0から
     * @returns 
     */
    static msToMinute(ms, offHour = true) {
        let minute = Math.floor(ms / (1000 * 60))
        if (offHour) {
            return Number(minute - ((Math.floor(minute / 60)) * 60))
        }
        return Number(minute)
    }
    msToMinute(ms, offHour = true) {
        return UtilClass.msToMinute(ms, offHour)
    }

    static offTime(time, offTime) {
        return Number(time - ((Math.floor(time / offTime)) * offTime))
    }
    offTime(time, offTime) {
        return UtilClass.offTime(time, offTime)
    }
    /**
     * ミリ秒を秒に変更
     * @param {*} ms 
     * @param {*} offMinute  trueの場合1分後は0から
     * @returns 
     */
    static msToSecond(ms, offMinute = true) {
        let second = Math.floor(ms / 1000)
        if (offMinute) {
            return Number(second - ((Math.floor(second / 60)) * 60))
        }
        return Number(second)
    }
    msToSecond(ms, offMinute = true) {
        return UtilClass.msToSecond(ms, offMinute)
    }
}
import Vue from 'vue'
Vue.prototype.$util = {
    /**
     * YYYYMMDD形式を区切り日付に変換
     * @param {*} value
     * @param {*} is_week
     * @returns
     */
    getDateFormat(value, separate, isWeek = false) {

        if (
            value == '' ||
            value == undefined ||
            value == null ||
            value.length < 8
        ) {
            return value
        }
        value = value.toString().replace(/-/g, '')
        let date = new Date(
            `${value.substr(0, 4)}-${value.substr(4, 2)}-${value.substr(6, 2)}`
        )
        let week = this.getWeekArray()
        let year = date.getFullYear()
        let month = ('00' + (date.getMonth() + 1)).slice(-2)
        let day = ('00' + date.getDate()).slice(-2)
        let weekstr = isWeek ? `(${week[date.getDay()]})` : ''
        return `${year}${separate}${month}${separate}${day}${weekstr}`
    },
    getWeekArray() {
        return ['日', '月', '火', '水', '木', '金', '土']
    },
    /**
     * 
     * @param {*} date yyyymmdd
     * @param {*} add 1 -1
     */
    calcDate(date, add) {
        if (date == null | date == '') {
            return date
        }
        let y = date.substr(0, 4)
        let m = date.substr(4, 2)
        let d = date.substr(6, 2)
        var dt = new Date(Number(y), Number(m) - 1, Number(d) + add, 0, 0, 0)
        y = dt.getFullYear()
        m = ('00' + (dt.getMonth() + 1)).slice(-2)
        d = ('00' + (dt.getDate() + add)).slice(-2)
        return y + m + d
    },
    /**
     * カンマフォーマット
     * @param {*} value 
     * @returns 
     */
    getCommaFormat(value) {
        if (value === '' || value == null || isNaN(Number(value))) {
            return ''
        }
        let num = Number(value)
        return num.toLocaleString()
    },

    /**
     * オブジェクトをディープコピー
     * 
     */
    deepCopy(obj) {
        return JSON.parse(JSON.stringify(obj))
    },
    /**
      *  前文字埋め
      */
    prePadding(value, length, paddingStr) {
        if (length === '' || length == null || isNaN(Number(length))) {
            return value
        }
        //最初から桁数以上の場合文字埋めしないで、前方桁数分を返す
        if (value.length >= Number(length)) {
            return value.substr(0, Number(length))
        }
        let str = ""
        for (let i = 0;i < length;i++) {
            str += paddingStr
        }
        return (str + value).slice(-1 * Number(length));
    },
    /**
     *  後文字埋め
     */
    postPadding(value, length, paddingStr) {
        if (value === '' || value == null || isNaN(Number(value))) {
            return value
        }
        let str = ""
        for (let i = 0;i < length;i++) {
            str += paddingStr
        }
        return (value + str).slice(0, Number(length));
    },
    /**
     * 対象文字列を先頭分以外カット
     * @param {*} str 
     * @param {*} substr 
     * @returns 
     */
    cutStringExceptFirst(str, substr) {
        if (str == null) {
            return str
        }
        const idx = str.indexOf(substr)
        if (idx == -1) {
            return str
        }
        //置換対象文字列を全てクリア
        let replace_str = str.replaceAll(substr, '')
        return replace_str.slice(0, idx) + substr + replace_str.slice(idx)
    },
    /**
     * 先頭以外の対象文字列カット
     * @param {*} str 
     * @param {*} substr 
     */
    cutStringExceptLead(str, substr) {
        if (str == null) {
            return str
        }
        const substr_size = substr.length
        let right_str = str.substr(substr_size)
        const replace_str = right_str.replaceAll(substr, '')
        return str.substr(0, substr_size) + replace_str

    },
    /**
     * num1とnum2を掛ける
     */
    multiplication(num1, num2) {
        var m = 0;
        var s1 = num1.toString();
        var s2 = num2.toString();
        // 単純に小数点同士をかけると、小数点以下の誤差が発生するのでその対応
        // 1.1 * 1.12 = (110 * 112)/3
        try { m += s1.split(".")[1].length; } catch (e) { }
        try { m += s2.split(".")[1].length; } catch (e) { }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    /**
     * num1をnum2で割る(正の方向に切り上げ) 
     * @param {*} num1 
     * @param {*} num2 
     * @returns 
     */
    divide(num1, num2) {
        //var m = 0;
        var s1 = num1.toString();
        var s2 = num2.toString();
        var rtn = Math.abs(Number(s1));
        if (this.isNum(s2) == false || Number(s2) == 0) {
            rtn = 0;
        } else {
            rtn = rtn / Number(s2);
        }
        // 切り上げ(ceil)を使用しないのは、負の値を切り上げした場合に減算されてしまうので、
        // 正の方向に加算するようにする為(-1.2をceilで切上げすると-2、この実装だと-1)
        rtn = rtn != Math.floor(rtn) ? Math.floor(rtn) + 1 : rtn;
        return rtn;
    },
    /**
     * 
     * @param {*} str 
     * @returns 
     */
    isNum(str) {
        str = str.trim();
        if (str.length == 0) {
            return false;
        }
        return !isNaN(str);
    }
}
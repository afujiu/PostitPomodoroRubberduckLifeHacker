import Vue from 'vue'
import { TaskClass } from "./TaskClass.js";
import { LoggingClass } from "./LoggingClass.js";
import { UtilClass } from "./UtilClass.js";

Vue.prototype.$plg = {
    task: new TaskClass(),
    log: new LoggingClass(),
    util: new UtilClass()
}


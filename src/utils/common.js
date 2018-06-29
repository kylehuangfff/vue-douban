import Constants from '@/maps/constants';
import moment from 'moment';

moment.locale('zh-CN');

// 简单执行队列
let Queue = (function () {

    let Queue = function () {
        this.queue = [];
    };
    
    // 往队列新增一个函数
    Queue.prototype.run = function (fn) {
        if (typeof fn === "function") {
            this.queue.push(fn);
        } else {
            throw new Error("参数错误，run只支持function作为参数");
        }
        return this;
    }
    
    // 执行队列中的下一个函数
    Queue.prototype.start = Queue.prototype.next = function () {
        this.queue.length > 0 && this.queue.shift().apply(null, arguments);
        return this;
    }
    
    return Queue;
})();

// 图片代理
let imgProxy = (url) => {
    return Constants.IMAGE_PROXY + '?image=' + url;
};

let nl2br = (str) => {
    if(typeof str !== 'string') {
        return str;
    }
    return str.replace(/\r?\n/g, '<br/>');
};

export default {
    Queue,
    imgProxy,
    moment,
    nl2br
};

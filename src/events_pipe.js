define(['jquery', './types'], function ($, Types) {
    function EventsPipe(){
        this.events = $('<div/>'); //事件核心对象
    }
    /**
     * 注意：domain声明的时候有优先级
     * @param event
     * @param domain
     * @returns {string}
     */
    function _domain(domain, eventType){
        eventType = eventType.split('|')[0];
        return eventType + '.' + domain;
    }
    /**
     * 参数合法性检查
     * @param domain
     * @param eventType
     * @throws string
     * @private
     */
    function _checkArgs(domain, eventType){
        var error;
        if(!Types.isString(domain)){
            error = '请指定事件作用域，字符串类型';
        }else if(!Types.isString(eventType)){
            error = '请指定事件类型，字符串类型';
        }
        if(error){
            console.error('错误提示：' + error);
            throw new Error(error);
        }
    }
    EventsPipe.prototype.subscribe = function(domain, eventType, handler){
        _checkArgs(domain, eventType);
        var lifeCycle = eventType.split('|')[1],
            domainEvent = _domain(domain, eventType.split('|')[0]);
        if('once' === lifeCycle){
            this.events.one(domainEvent, handler);
        }else{
            this.events.on(domainEvent, handler);
        }
    }
    EventsPipe.prototype.publish = function(domain, eventType, data){
        _checkArgs(domain, eventType);
        this.events.trigger(_domain(domain, eventType), data);
    }
    /**
     * 取消所有域订阅
     * @param domain
     * @param eventType
     * @param handler
     */
    EventsPipe.prototype.unsubscribe = function(domain, eventType, handler){
        if(arguments.length === 0){
            this.events.off(); //无论什么事件类型
        }else{
            _checkArgs(domain, eventType);
            this.events.off(domain, eventType, handler);
        }
    }

    /**
     * recycle需要保证事件唯一性，不然会把其它事件删除
     * @param event
     * @param lifeCycle
     */
    EventsPipe.prototype.recycle = function(domain, lifeCycle){
        //console.assert(lifeCycle.indexOf);
        //var lifeCycle = eventType.split('|')[1];
        //this.events.off(_domain(domain, eventType));
    }
    /**
     * 一组全局api
     * @param eventType
     * @param handler
     */
    EventsPipe.prototype.subscribeGlobal = function(eventType, handler){
        this.subscribe('global', eventType, handler);
    }
    EventsPipe.prototype.publishGlobal = function(eventType, data){
        this.publish('global', eventType, data);
    }
    EventsPipe.prototype.publishGlobal = function(eventType, data){
        this.unsubscribe('global', eventType, data);
    }
    return new EventsPipe();
})
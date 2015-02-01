define(function(){
    /**
     * seajs js对象类型判断工具类
     * @param type
     * @returns {Function}
     */
    function isType(type) {
        return function(obj) {
            return {}.toString.call(obj) === "[object " + type + "]"
        }
    }
    return {
        isObject: isType("Object"),
        isString: isType("String"),
        isArray: Array.isArray || isType("Array"),
        isFunction: isType("Function"),
        isUndefined: isType("Undefined")
    }
})
var Writer = /** @class */ (function () {
    function Writer(log, value) {
        this.log = log;
        this.value = value;
    }
    Writer.of = function (log, value) {
        return new Writer(log, value);
    };
    Writer.prototype.map = function (f) {
        return Writer.of('map', f(this.value));
    };
    return Writer;
}());
var m_toUpper = function (v) {
    return Writer.of("toUpper", v.toUpperCase());
};
var m_concat = function (v1, v2) {
    return Writer.of('m_concat', v1.concat(v2));
};
var m_length = function (v) {
    return Writer.of('m_length', v.length);
};
m_toUpper('test').map(function (x) { return m_length(x); });
// trace("test".toUpperCase().concat('case').length)
// pipe(toUpper, concat('case'),x=>x.length('test'))

/***

 MochiKit.Base 1.4

 See <http://mochikit.com/> for documentation, downloads, license, etc.

 (c) 2005 Bob Ippolito.  All rights Reserved.

 ***/
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Base");
}
if (typeof (MochiKit) == "undefined") {
    MochiKit = {};
}
if (typeof (MochiKit.Base) == "undefined") {
    MochiKit.Base = {};
}
MochiKit.Base.VERSION = "1.4";
MochiKit.Base.NAME = "MochiKit.Base";
MochiKit.Base.update = function (self, obj) {
    if (self === null) {
        self = {};
    }
    for (var i = 1; i < arguments.length; i++) {
        var o = arguments[i];
        if (typeof (o) != "undefined" && o !== null) {
            for (var k in o) {
                self[k] = o[k];
            }
        }
    }
    return self;
};
MochiKit.Base.update(MochiKit.Base, {
    __repr__: function () {
        return "[" + this.NAME + " " + this.VERSION + "]";
    }, toString: function () {
        return this.__repr__();
    }, camelize: function (selector) {
        var arr = selector.split("-");
        var cc = arr[0];
        for (var i = 1; i < arr.length; i++) {
            cc += arr[i].charAt(0).toUpperCase() + arr[i].substring(1);
        }
        return cc;
    }, counter: function (n) {
        if (arguments.length === 0) {
            n = 1;
        }
        return function () {
            return n++;
        };
    }, clone: function (obj) {
        var me = arguments.callee;
        if (arguments.length == 1) {
            me.prototype = obj;
            return new me();
        }
    }, _flattenArray: function (res, lst) {
        for (var i = 0; i < lst.length; i++) {
            var o = lst[i];
            if (o instanceof Array) {
                arguments.callee(res, o);
            } else {
                res.push(o);
            }
        }
        return res;
    }, flattenArray: function (lst) {
        return MochiKit.Base._flattenArray([], lst);
    }, flattenArguments: function (lst) {
        var res = [];
        var m = MochiKit.Base;
        var args = m.extend(null, arguments);
        while (args.length) {
            var o = args.shift();
            if (o && typeof (o) == "object" && typeof (o.length) == "number") {
                for (var i = o.length - 1; i >= 0; i--) {
                    args.unshift(o[i]);
                }
            } else {
                res.push(o);
            }
        }
        return res;
    }, extend: function (self, obj, skip) {
        if (!skip) {
            skip = 0;
        }
        if (obj) {
            var l = obj.length;
            if (typeof (l) != "number") {
                if (typeof (MochiKit.Iter) != "undefined") {
                    obj = MochiKit.Iter.list(obj);
                    l = obj.length;
                } else {
                    throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                }
            }
            if (!self) {
                self = [];
            }
            for (var i = skip; i < l; i++) {
                self.push(obj[i]);
            }
        }
        return self;
    }, updatetree: function (self, obj) {
        if (self === null) {
            self = {};
        }
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (typeof (o) != "undefined" && o !== null) {
                for (var k in o) {
                    var v = o[k];
                    if (typeof (self[k]) == "object" && typeof (v) == "object") {
                        arguments.callee(self[k], v);
                    } else {
                        self[k] = v;
                    }
                }
            }
        }
        return self;
    }, setdefault: function (self, obj) {
        if (self === null) {
            self = {};
        }
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            for (var k in o) {
                if (!(k in self)) {
                    self[k] = o[k];
                }
            }
        }
        return self;
    }, keys: function (obj) {
        var rval = [];
        for (var prop in obj) {
            rval.push(prop);
        }
        return rval;
    }, items: function (obj) {
        var rval = [];
        var e;
        for (var prop in obj) {
            var v;
            try {
                v = obj[prop];
            } catch (e) {
                continue;
            }
            rval.push([prop, v]);
        }
        return rval;
    }, _newNamedError: function (module, name, func) {
        func.prototype = new MochiKit.Base.NamedError(module.NAME + "." + name);
        module[name] = func;
    }, operator: {
        truth: function (a) {
            return !!a;
        }, lognot: function (a) {
            return !a;
        }, identity: function (a) {
            return a;
        }, not: function (a) {
            return ~a;
        }, neg: function (a) {
            return -a;
        }, add: function (a, b) {
            return a + b;
        }, sub: function (a, b) {
            return a - b;
        }, div: function (a, b) {
            return a / b;
        }, mod: function (a, b) {
            return a % b;
        }, mul: function (a, b) {
            return a * b;
        }, and: function (a, b) {
            return a & b;
        }, or: function (a, b) {
            return a | b;
        }, xor: function (a, b) {
            return a ^ b;
        }, lshift: function (a, b) {
            return a << b;
        }, rshift: function (a, b) {
            return a >> b;
        }, zrshift: function (a, b) {
            return a >>> b;
        }, eq: function (a, b) {
            return a == b;
        }, ne: function (a, b) {
            return a != b;
        }, gt: function (a, b) {
            return a > b;
        }, ge: function (a, b) {
            return a >= b;
        }, lt: function (a, b) {
            return a < b;
        }, le: function (a, b) {
            return a <= b;
        }, seq: function (a, b) {
            return a === b;
        }, sne: function (a, b) {
            return a !== b;
        }, ceq: function (a, b) {
            return MochiKit.Base.compare(a, b) === 0;
        }, cne: function (a, b) {
            return MochiKit.Base.compare(a, b) !== 0;
        }, cgt: function (a, b) {
            return MochiKit.Base.compare(a, b) == 1;
        }, cge: function (a, b) {
            return MochiKit.Base.compare(a, b) != -1;
        }, clt: function (a, b) {
            return MochiKit.Base.compare(a, b) == -1;
        }, cle: function (a, b) {
            return MochiKit.Base.compare(a, b) != 1;
        }, logand: function (a, b) {
            return a && b;
        }, logor: function (a, b) {
            return a || b;
        }, contains: function (a, b) {
            return b in a;
        }
    }, forwardCall: function (func) {
        return function () {
            return this[func].apply(this, arguments);
        };
    }, itemgetter: function (func) {
        return function (arg) {
            return arg[func];
        };
    }, typeMatcher: function () {
        var types = {};
        for (var i = 0; i < arguments.length; i++) {
            var typ = arguments[i];
            types[typ] = typ;
        }
        return function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!(typeof (arguments[i]) in types)) {
                    return false;
                }
            }
            return true;
        };
    }, isNull: function () {
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] !== null) {
                return false;
            }
        }
        return true;
    }, isUndefinedOrNull: function () {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            if (!(typeof (o) == "undefined" || o === null)) {
                return false;
            }
        }
        return true;
    }, isEmpty: function (obj) {
        return !MochiKit.Base.isNotEmpty.apply(this, arguments);
    }, isNotEmpty: function (obj) {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            if (!(o && o.length)) {
                return false;
            }
        }
        return true;
    }, isArrayLike: function () {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            var typ = typeof (o);
            if ((typ != "object" && !(typ == "function" && typeof (o.item) == "function")) || o === null || typeof (o.length) != "number" || o.nodeType === 3) {
                return false;
            }
        }
        return true;
    }, isDateLike: function () {
        for (var i = 0; i < arguments.length; i++) {
            var o = arguments[i];
            if (typeof (o) != "object" || o === null || typeof (o.getTime) != "function") {
                return false;
            }
        }
        return true;
    }, xmap: function (fn) {
        if (fn === null) {
            return MochiKit.Base.extend(null, arguments, 1);
        }
        var rval = [];
        for (var i = 1; i < arguments.length; i++) {
            rval.push(fn(arguments[i]));
        }
        return rval;
    }, map: function (fn, lst) {
        var m = MochiKit.Base;
        var itr = MochiKit.Iter;
        var isArrayLike = m.isArrayLike;
        if (arguments.length <= 2) {
            if (!isArrayLike(lst)) {
                if (itr) {
                    lst = itr.list(lst);
                    if (fn === null) {
                        return lst;
                    }
                } else {
                    throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                }
            }
            if (fn === null) {
                return m.extend(null, lst);
            }
            var rval = [];
            for (var i = 0; i < lst.length; i++) {
                rval.push(fn(lst[i]));
            }
            return rval;
        } else {
            if (fn === null) {
                fn = Array;
            }
            var length = null;
            for (i = 1; i < arguments.length; i++) {
                if (!isArrayLike(arguments[i])) {
                    if (itr) {
                        return itr.list(itr.imap.apply(null, arguments));
                    } else {
                        throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
                    }
                }
                var l = arguments[i].length;
                if (length === null || length > l) {
                    length = l;
                }
            }
            rval = [];
            for (i = 0; i < length; i++) {
                var args = [];
                for (var j = 1; j < arguments.length; j++) {
                    args.push(arguments[j][i]);
                }
                rval.push(fn.apply(this, args));
            }
            return rval;
        }
    }, xfilter: function (fn) {
        var rval = [];
        if (fn === null) {
            fn = MochiKit.Base.operator.truth;
        }
        for (var i = 1; i < arguments.length; i++) {
            var o = arguments[i];
            if (fn(o)) {
                rval.push(o);
            }
        }
        return rval;
    }, filter: function (fn, lst, self) {
        var rval = [];
        var m = MochiKit.Base;
        if (!m.isArrayLike(lst)) {
            if (MochiKit.Iter) {
                lst = MochiKit.Iter.list(lst);
            } else {
                throw new TypeError("Argument not an array-like and MochiKit.Iter not present");
            }
        }
        if (fn === null) {
            fn = m.operator.truth;
        }
        if (typeof (Array.prototype.filter) == "function") {
            return Array.prototype.filter.call(lst, fn, self);
        } else {
            if (typeof (self) == "undefined" || self === null) {
                for (var i = 0; i < lst.length; i++) {
                    var o = lst[i];
                    if (fn(o)) {
                        rval.push(o);
                    }
                }
            } else {
                for (i = 0; i < lst.length; i++) {
                    o = lst[i];
                    if (fn.call(self, o)) {
                        rval.push(o);
                    }
                }
            }
        }
        return rval;
    }, _wrapDumbFunction: function (func) {
        return function () {
            switch (arguments.length) {
                case 0:
                    return func();
                case 1:
                    return func(arguments[0]);
                case 2:
                    return func(arguments[0], arguments[1]);
                case 3:
                    return func(arguments[0], arguments[1], arguments[2]);
            }
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push("arguments[" + i + "]");
            }
            return eval("(func(" + args.join(",") + "))");
        };
    }, methodcaller: function (func) {
        var args = MochiKit.Base.extend(null, arguments, 1);
        if (typeof (func) == "function") {
            return function (obj) {
                return func.apply(obj, args);
            };
        } else {
            return function (obj) {
                return obj[func].apply(obj, args);
            };
        }
    }, method: function (self, func) {
        var m = MochiKit.Base;
        return m.bind.apply(this, m.extend([func, self], arguments, 2));
    }, compose: function (f1, f2) {
        var fnlist = [];
        var m = MochiKit.Base;
        if (arguments.length === 0) {
            throw new TypeError("compose() requires at least one argument");
        }
        for (var i = 0; i < arguments.length; i++) {
            var fn = arguments[i];
            if (typeof (fn) != "function") {
                throw new TypeError(repr(fn) + " is not a function");
            }
            fnlist.push(fn);
        }
        return function () {
            var args = arguments;
            for (var i = fnlist.length - 1; i >= 0; i--) {
                args = [fnlist[i].apply(this, args)];
            }
            return args[0];
        };
    }, bind: function (func, self) {
        if (typeof (func) == "string") {
            func = self[func];
        }
        var im_func = func.im_func;
        var im_preargs = func.im_preargs;
        var im_self = func.im_self;
        var m = MochiKit.Base;
        if (typeof (func) == "function" && typeof (func.apply) == "undefined") {
            func = m._wrapDumbFunction(func);
        }
        if (typeof (im_func) != "function") {
            im_func = func;
        }
        if (typeof (self) != "undefined") {
            im_self = self;
        }
        if (typeof (im_preargs) == "undefined") {
            im_preargs = [];
        } else {
            im_preargs = im_preargs.slice();
        }
        m.extend(im_preargs, arguments, 2);
        var newfunc = function () {
            var args = arguments;
            var me = arguments.callee;
            if (me.im_preargs.length > 0) {
                args = m.concat(me.im_preargs, args);
            }
            var self = me.im_self;
            if (!self) {
                self = this;
            }
            return me.im_func.apply(self, args);
        };
        newfunc.im_self = im_self;
        newfunc.im_func = im_func;
        newfunc.im_preargs = im_preargs;
        return newfunc;
    }, bindMethods: function (self) {
        var bind = MochiKit.Base.bind;
        for (var k in self) {
            var func = self[k];
            if (typeof (func) == "function") {
                self[k] = bind(func, self);
            }
        }
    }, registerComparator: function (name, check, comparator, override) {
        MochiKit.Base.comparatorRegistry.register(name, check, comparator, override);
    }, _primitives: {"boolean": true, "string": true, "number": true}, compare: function (a, b) {
        if (a == b) {
            return 0;
        }
        var aIsNull = (typeof (a) == "undefined" || a === null);
        var bIsNull = (typeof (b) == "undefined" || b === null);
        if (aIsNull && bIsNull) {
            return 0;
        } else {
            if (aIsNull) {
                return -1;
            } else {
                if (bIsNull) {
                    return 1;
                }
            }
        }
        var m = MochiKit.Base;
        var prim = m._primitives;
        if (!(typeof (a) in prim && typeof (b) in prim)) {
            try {
                return m.comparatorRegistry.match(a, b);
            } catch (e) {
                if (e != m.NotFound) {
                    throw e;
                }
            }
        }
        if (a < b) {
            return -1;
        } else {
            if (a > b) {
                return 1;
            }
        }
        var repr = m.repr;
        throw new TypeError(repr(a) + " and " + repr(b) + " can not be compared");
    }, compareDateLike: function (a, b) {
        return MochiKit.Base.compare(a.getTime(), b.getTime());
    }, compareArrayLike: function (a, b) {
        var compare = MochiKit.Base.compare;
        var count = a.length;
        var rval = 0;
        if (count > b.length) {
            rval = 1;
            count = b.length;
        } else {
            if (count < b.length) {
                rval = -1;
            }
        }
        for (var i = 0; i < count; i++) {
            var cmp = compare(a[i], b[i]);
            if (cmp) {
                return cmp;
            }
        }
        return rval;
    }, registerRepr: function (name, check, wrap, override) {
        MochiKit.Base.reprRegistry.register(name, check, wrap, override);
    }, repr: function (o) {
        if (typeof (o) == "undefined") {
            return "undefined";
        } else {
            if (o === null) {
                return "null";
            }
        }
        try {
            if (typeof (o.__repr__) == "function") {
                return o.__repr__();
            } else {
                if (typeof (o.repr) == "function" && o.repr != arguments.callee) {
                    return o.repr();
                }
            }
            return MochiKit.Base.reprRegistry.match(o);
        } catch (e) {
            if (typeof (o.NAME) == "string" && (o.toString == Function.prototype.toString || o.toString == Object.prototype.toString)) {
                return o.NAME;
            }
        }
        try {
            var ostring = (o + "");
        } catch (e) {
            return "[" + typeof (o) + "]";
        }
        if (typeof (o) == "function") {
            o = ostring.replace(/^\s+/, "");
            var idx = o.indexOf("{");
            if (idx != -1) {
                o = o.substr(0, idx) + "{...}";
            }
        }
        return ostring;
    }, reprArrayLike: function (o) {
        var m = MochiKit.Base;
        return "[" + m.map(m.repr, o).join(", ") + "]";
    }, reprString: function (o) {
        return ('"' + o.replace(/(["\\])/g, "\\$1") + '"').replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
    }, reprNumber: function (o) {
        return o + "";
    }, registerJSON: function (name, check, wrap, override) {
        MochiKit.Base.jsonRegistry.register(name, check, wrap, override);
    }, evalJSON: function () {
        return eval("(" + arguments[0] + ")");
    }, serializeJSON: function (o) {
        var objtype = typeof (o);
        if (objtype == "undefined") {
            return "undefined";
        } else {
            if (objtype == "number" || objtype == "boolean") {
                return o + "";
            } else {
                if (o === null) {
                    return "null";
                }
            }
        }
        var m = MochiKit.Base;
        var reprString = m.reprString;
        if (objtype == "string") {
            return reprString(o);
        }
        var me = arguments.callee;
        var newObj;
        if (typeof (o.__json__) == "function") {
            newObj = o.__json__();
            if (o !== newObj) {
                return me(newObj);
            }
        }
        if (typeof (o.json) == "function") {
            newObj = o.json();
            if (o !== newObj) {
                return me(newObj);
            }
        }
        if (objtype != "function" && typeof (o.length) == "number") {
            var res = [];
            for (var i = 0; i < o.length; i++) {
                var val = me(o[i]);
                if (typeof (val) != "string") {
                    val = "undefined";
                }
                res.push(val);
            }
            return "[" + res.join(", ") + "]";
        }
        try {
            newObj = m.jsonRegistry.match(o);
            if (o !== newObj) {
                return me(newObj);
            }
        } catch (e) {
            if (e != m.NotFound) {
                throw e;
            }
        }
        if (objtype == "function") {
            return null;
        }
        res = [];
        for (var k in o) {
            var useKey;
            if (typeof (k) == "number") {
                useKey = '"' + k + '"';
            } else {
                if (typeof (k) == "string") {
                    useKey = reprString(k);
                } else {
                    continue;
                }
            }
            val = me(o[k]);
            if (typeof (val) != "string") {
                continue;
            }
            res.push(useKey + ":" + val);
        }
        return "{" + res.join(", ") + "}";
    }, objEqual: function (a, b) {
        return (MochiKit.Base.compare(a, b) === 0);
    }, arrayEqual: function (self, arr) {
        if (self.length != arr.length) {
            return false;
        }
        return (MochiKit.Base.compare(self, arr) === 0);
    }, concat: function () {
        var rval = [];
        var extend = MochiKit.Base.extend;
        for (var i = 0; i < arguments.length; i++) {
            extend(rval, arguments[i]);
        }
        return rval;
    }, keyComparator: function (key) {
        var m = MochiKit.Base;
        var compare = m.compare;
        if (arguments.length == 1) {
            return function (a, b) {
                return compare(a[key], b[key]);
            };
        }
        var compareKeys = m.extend(null, arguments);
        return function (a, b) {
            var rval = 0;
            for (var i = 0; (rval === 0) && (i < compareKeys.length); i++) {
                var key = compareKeys[i];
                rval = compare(a[key], b[key]);
            }
            return rval;
        };
    }, reverseKeyComparator: function (key) {
        var comparator = MochiKit.Base.keyComparator.apply(this, arguments);
        return function (a, b) {
            return comparator(b, a);
        };
    }, partial: function (func) {
        var m = MochiKit.Base;
        return m.bind.apply(this, m.extend([func, undefined], arguments, 1));
    }, listMinMax: function (which, lst) {
        if (lst.length === 0) {
            return null;
        }
        var cur = lst[0];
        var compare = MochiKit.Base.compare;
        for (var i = 1; i < lst.length; i++) {
            var o = lst[i];
            if (compare(o, cur) == which) {
                cur = o;
            }
        }
        return cur;
    }, objMax: function () {
        return MochiKit.Base.listMinMax(1, arguments);
    }, objMin: function () {
        return MochiKit.Base.listMinMax(-1, arguments);
    }, findIdentical: function (lst, value, start, end) {
        if (typeof (end) == "undefined" || end === null) {
            end = lst.length;
        }
        if (typeof (start) == "undefined" || start === null) {
            start = 0;
        }
        for (var i = start; i < end; i++) {
            if (lst[i] === value) {
                return i;
            }
        }
        return -1;
    }, mean: function () {
        var sum = 0;
        var m = MochiKit.Base;
        var args = m.extend(null, arguments);
        var count = args.length;
        while (args.length) {
            var o = args.shift();
            if (o && typeof (o) == "object" && typeof (o.length) == "number") {
                count += o.length - 1;
                for (var i = o.length - 1; i >= 0; i--) {
                    sum += o[i];
                }
            } else {
                sum += o;
            }
        }
        if (count <= 0) {
            throw new TypeError("mean() requires at least one argument");
        }
        return sum / count;
    }, median: function () {
        var data = MochiKit.Base.flattenArguments(arguments);
        if (data.length === 0) {
            throw new TypeError("median() requires at least one argument");
        }
        data.sort(compare);
        if (data.length % 2 == 0) {
            var upper = data.length / 2;
            return (data[upper] + data[upper - 1]) / 2;
        } else {
            return data[(data.length - 1) / 2];
        }
    }, findValue: function (lst, value, start, end) {
        if (typeof (end) == "undefined" || end === null) {
            end = lst.length;
        }
        if (typeof (start) == "undefined" || start === null) {
            start = 0;
        }
        var cmp = MochiKit.Base.compare;
        for (var i = start; i < end; i++) {
            if (cmp(lst[i], value) === 0) {
                return i;
            }
        }
        return -1;
    }, nodeWalk: function (node, visitor) {
        var nodes = [node];
        var extend = MochiKit.Base.extend;
        while (nodes.length) {
            var res = visitor(nodes.shift());
            if (res) {
                extend(nodes, res);
            }
        }
    }, nameFunctions: function (namespace) {
        var base = namespace.NAME;
        if (typeof (base) == "undefined") {
            base = "";
        } else {
            base = base + ".";
        }
        for (var name in namespace) {
            var o = namespace[name];
            if (typeof (o) == "function" && typeof (o.NAME) == "undefined") {
                try {
                    o.NAME = base + name;
                } catch (e) {
                }
            }
        }
    }, queryString: function (names, values) {
        if (typeof (MochiKit.DOM) != "undefined" && arguments.length == 1 && (typeof (names) == "string" || (typeof (names.nodeType) != "undefined" && names.nodeType > 0))) {
            var kv = MochiKit.DOM.formContents(names);
            names = kv[0];
            values = kv[1];
        } else {
            if (arguments.length == 1) {
                var o = names;
                names = [];
                values = [];
                for (var k in o) {
                    var v = o[k];
                    if (typeof (v) != "function") {
                        names.push(k);
                        values.push(v);
                    }
                }
            }
        }
        var rval = [];
        var len = Math.min(names.length, values.length);
        var urlEncode = MochiKit.Base.urlEncode;
        for (var i = 0; i < len; i++) {
            v = values[i];
            if (typeof (v) != "undefined" && v !== null) {
                rval.push(urlEncode(names[i]) + "=" + urlEncode(v));
            }
        }
        return rval.join("&");
    }, parseQueryString: function (encodedString, useArrays) {
        var pairs = encodedString.replace(/\+/g, "%20").split("&");
        var o = {};
        var decode;
        if (typeof (decodeURIComponent) != "undefined") {
            decode = decodeURIComponent;
        } else {
            decode = unescape;
        }
        if (useArrays) {
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                var name = decode(pair[0]);
                var arr = o[name];
                if (!(arr instanceof Array)) {
                    arr = [];
                    o[name] = arr;
                }
                arr.push(decode(pair[1]));
            }
        } else {
            for (i = 0; i < pairs.length; i++) {
                pair = pairs[i].split("=");
                o[decode(pair[0])] = decode(pair[1]);
            }
        }
        return o;
    }
});
MochiKit.Base.AdapterRegistry = function () {
    this.pairs = [];
};
MochiKit.Base.AdapterRegistry.prototype = {
    register: function (name, check, wrap, override) {
        if (override) {
            this.pairs.unshift([name, check, wrap]);
        } else {
            this.pairs.push([name, check, wrap]);
        }
    }, match: function () {
        for (var i = 0; i < this.pairs.length; i++) {
            var pair = this.pairs[i];
            if (pair[1].apply(this, arguments)) {
                return pair[2].apply(this, arguments);
            }
        }
        throw MochiKit.Base.NotFound;
    }, unregister: function (name) {
        for (var i = 0; i < this.pairs.length; i++) {
            var pair = this.pairs[i];
            if (pair[0] == name) {
                this.pairs.splice(i, 1);
                return true;
            }
        }
        return false;
    }
};
MochiKit.Base.EXPORT = ["flattenArray", "noop", "camelize", "counter", "clone", "extend", "update", "updatetree", "setdefault", "keys", "items", "NamedError", "operator", "forwardCall", "itemgetter", "typeMatcher", "isCallable", "isUndefined", "isUndefinedOrNull", "isNull", "isEmpty", "isNotEmpty", "isArrayLike", "isDateLike", "xmap", "map", "xfilter", "filter", "methodcaller", "compose", "bind", "bindMethods", "NotFound", "AdapterRegistry", "registerComparator", "compare", "registerRepr", "repr", "objEqual", "arrayEqual", "concat", "keyComparator", "reverseKeyComparator", "partial", "merge", "listMinMax", "listMax", "listMin", "objMax", "objMin", "nodeWalk", "zip", "urlEncode", "queryString", "serializeJSON", "registerJSON", "evalJSON", "parseQueryString", "findValue", "findIdentical", "flattenArguments", "method", "average", "mean", "median"];
MochiKit.Base.EXPORT_OK = ["nameFunctions", "comparatorRegistry", "reprRegistry", "jsonRegistry", "compareDateLike", "compareArrayLike", "reprArrayLike", "reprString", "reprNumber"];
MochiKit.Base._exportSymbols = function (globals, module) {
    if (typeof (MochiKit.__export__) == "undefined") {
        MochiKit.__export__ = (MochiKit.__compat__ || (typeof (JSAN) == "undefined" && typeof (dojo) == "undefined"));
    }
    if (!MochiKit.__export__) {
        return;
    }
    var all = module.EXPORT_TAGS[":all"];
    for (var i = 0; i < all.length; i++) {
        globals[all[i]] = module[all[i]];
    }
};
MochiKit.Base.__new__ = function () {
    var m = this;
    m.noop = m.operator.identity;
    m.forward = m.forwardCall;
    m.find = m.findValue;
    if (typeof (encodeURIComponent) != "undefined") {
        m.urlEncode = function (unencoded) {
            return encodeURIComponent(unencoded).replace(/\'/g, "%27");
        };
    } else {
        m.urlEncode = function (unencoded) {
            return escape(unencoded).replace(/\+/g, "%2B").replace(/\"/g, "%22").rval.replace(/\'/g, "%27");
        };
    }
    m.NamedError = function (name) {
        this.message = name;
        this.name = name;
    };
    m.NamedError.prototype = new Error();
    m.update(m.NamedError.prototype, {
        repr: function () {
            if (this.message && this.message != this.name) {
                return this.name + "(" + m.repr(this.message) + ")";
            } else {
                return this.name + "()";
            }
        }, toString: m.forwardCall("repr")
    });
    m.NotFound = new m.NamedError("MochiKit.Base.NotFound");
    m.listMax = m.partial(m.listMinMax, 1);
    m.listMin = m.partial(m.listMinMax, -1);
    m.isCallable = m.typeMatcher("function");
    m.isUndefined = m.typeMatcher("undefined");
    m.merge = m.partial(m.update, null);
    m.zip = m.partial(m.map, null);
    m.average = m.mean;
    m.comparatorRegistry = new m.AdapterRegistry();
    m.registerComparator("dateLike", m.isDateLike, m.compareDateLike);
    m.registerComparator("arrayLike", m.isArrayLike, m.compareArrayLike);
    m.reprRegistry = new m.AdapterRegistry();
    m.registerRepr("arrayLike", m.isArrayLike, m.reprArrayLike);
    m.registerRepr("string", m.typeMatcher("string"), m.reprString);
    m.registerRepr("numbers", m.typeMatcher("number", "boolean"), m.reprNumber);
    m.jsonRegistry = new m.AdapterRegistry();
    var all = m.concat(m.EXPORT, m.EXPORT_OK);
    m.EXPORT_TAGS = {":common": m.concat(m.EXPORT_OK), ":all": all};
    m.nameFunctions(this);
};
MochiKit.Base.__new__();
if (MochiKit.__export__) {
    compare = MochiKit.Base.compare;
}
MochiKit.Base._exportSymbols(this, MochiKit.Base);
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Async");
    dojo.require("MochiKit.Base");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Async depends on MochiKit.Base!";
}
if (typeof (MochiKit.Async) == "undefined") {
    MochiKit.Async = {};
}
MochiKit.Async.NAME = "MochiKit.Async";
MochiKit.Async.VERSION = "1.4";
MochiKit.Async.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.Async.toString = function () {
    return this.__repr__();
};
MochiKit.Async.Deferred = function (canceller) {
    this.chain = [];
    this.id = this._nextId();
    this.fired = -1;
    this.paused = 0;
    this.results = [null, null];
    this.canceller = canceller;
    this.silentlyCancelled = false;
    this.chained = false;
};
MochiKit.Async.Deferred.prototype = {
    repr: function () {
        var state;
        if (this.fired == -1) {
            state = "unfired";
        } else {
            if (this.fired === 0) {
                state = "success";
            } else {
                state = "error";
            }
        }
        return "Deferred(" + this.id + ", " + state + ")";
    }, toString: MochiKit.Base.forwardCall("repr"), _nextId: MochiKit.Base.counter(), cancel: function () {
        var self = MochiKit.Async;
        if (this.fired == -1) {
            if (this.canceller) {
                this.canceller(this);
            } else {
                this.silentlyCancelled = true;
            }
            if (this.fired == -1) {
                this.errback(new self.CancelledError(this));
            }
        } else {
            if ((this.fired === 0) && (this.results[0] instanceof self.Deferred)) {
                this.results[0].cancel();
            }
        }
    }, _resback: function (res) {
        this.fired = ((res instanceof Error) ? 1 : 0);
        this.results[this.fired] = res;
        this._fire();
    }, _check: function () {
        if (this.fired != -1) {
            if (!this.silentlyCancelled) {
                throw new MochiKit.Async.AlreadyCalledError(this);
            }
            this.silentlyCancelled = false;
            return;
        }
    }, callback: function (res) {
        this._check();
        if (res instanceof MochiKit.Async.Deferred) {
            throw new Error("Deferred instances can only be chained if they are the result of a callback");
        }
        this._resback(res);
    }, errback: function (res) {
        this._check();
        var self = MochiKit.Async;
        if (res instanceof self.Deferred) {
            throw new Error("Deferred instances can only be chained if they are the result of a callback");
        }
        if (!(res instanceof Error)) {
            res = new self.GenericError(res);
        }
        this._resback(res);
    }, addBoth: function (fn) {
        if (arguments.length > 1) {
            fn = MochiKit.Base.partial.apply(null, arguments);
        }
        return this.addCallbacks(fn, fn);
    }, addCallback: function (fn) {
        if (arguments.length > 1) {
            fn = MochiKit.Base.partial.apply(null, arguments);
        }
        return this.addCallbacks(fn, null);
    }, addErrback: function (fn) {
        if (arguments.length > 1) {
            fn = MochiKit.Base.partial.apply(null, arguments);
        }
        return this.addCallbacks(null, fn);
    }, addCallbacks: function (cb, eb) {
        if (this.chained) {
            throw new Error("Chained Deferreds can not be re-used");
        }
        this.chain.push([cb, eb]);
        if (this.fired >= 0) {
            this._fire();
        }
        return this;
    }, _fire: function () {
        var chain = this.chain;
        var fired = this.fired;
        var res = this.results[fired];
        var self = this;
        var cb = null;
        while (chain.length > 0 && this.paused === 0) {
            var pair = chain.shift();
            var f = pair[fired];
            if (f === null) {
                continue;
            }
            try {
                res = f(res);
                fired = ((res instanceof Error) ? 1 : 0);
                if (res instanceof MochiKit.Async.Deferred) {
                    cb = function (res) {
                        self._resback(res);
                        self.paused--;
                        if ((self.paused === 0) && (self.fired >= 0)) {
                            self._fire();
                        }
                    };
                    this.paused++;
                }
            } catch (err) {
                fired = 1;
                if (!(err instanceof Error)) {
                    err = new MochiKit.Async.GenericError(err);
                }
                res = err;
            }
        }
        this.fired = fired;
        this.results[fired] = res;
        if (cb && this.paused) {
            res.addBoth(cb);
            res.chained = true;
        }
    }
};
MochiKit.Base.update(MochiKit.Async, {
    evalJSONRequest: function () {
        return eval("(" + arguments[0].responseText + ")");
    }, succeed: function (result) {
        var d = new MochiKit.Async.Deferred();
        d.callback.apply(d, arguments);
        return d;
    }, fail: function (result) {
        var d = new MochiKit.Async.Deferred();
        d.errback.apply(d, arguments);
        return d;
    }, getXMLHttpRequest: function () {
        var self = arguments.callee;
        if (!self.XMLHttpRequest) {
            var tryThese = [function () {
                return new XMLHttpRequest();
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP");
            }, function () {
                return new ActiveXObject("Microsoft.XMLHTTP");
            }, function () {
                return new ActiveXObject("Msxml2.XMLHTTP.4.0");
            }, function () {
                throw new MochiKit.Async.BrowserComplianceError("Browser does not support XMLHttpRequest");
            }];
            for (var i = 0; i < tryThese.length; i++) {
                var func = tryThese[i];
                try {
                    self.XMLHttpRequest = func;
                    return func();
                } catch (e) {
                }
            }
        }
        return self.XMLHttpRequest();
    }, _xhr_onreadystatechange: function (d) {
        var m = MochiKit.Base;
        if (this.readyState == 4) {
            try {
                this.onreadystatechange = null;
            } catch (e) {
                try {
                    this.onreadystatechange = m.noop;
                } catch (e) {
                }
            }
            var status = null;
            try {
                status = this.status;
                if (!status && m.isNotEmpty(this.responseText)) {
                    status = 304;
                }
            } catch (e) {
            }
            if (status == 200 || status == 304) {
                d.callback(this);
            } else {
                var err = new MochiKit.Async.XMLHttpRequestError(this, "Request failed");
                if (err.number) {
                    d.errback(err);
                } else {
                    d.errback(err);
                }
            }
        }
    }, _xhr_canceller: function (req) {
        try {
            req.onreadystatechange = null;
        } catch (e) {
            try {
                req.onreadystatechange = MochiKit.Base.noop;
            } catch (e) {
            }
        }
        req.abort();
    }, sendXMLHttpRequest: function (req, sendContent) {
        if (typeof (sendContent) == "undefined" || sendContent === null) {
            sendContent = "";
        }
        var m = MochiKit.Base;
        var self = MochiKit.Async;
        var d = new self.Deferred(m.partial(self._xhr_canceller, req));
        try {
            req.onreadystatechange = m.bind(self._xhr_onreadystatechange, req, d);
            req.send(sendContent);
        } catch (e) {
            try {
                req.onreadystatechange = null;
            } catch (ignore) {
            }
            d.errback(e);
        }
        return d;
    }, doSimpleXMLHttpRequest: function (url) {
        var self = MochiKit.Async;
        var req = self.getXMLHttpRequest();
        if (arguments.length > 1) {
            var m = MochiKit.Base;
            var qs = m.queryString.apply(null, m.extend(null, arguments, 1));
            if (qs) {
                url += "?" + qs;
            }
        }
        req.open("GET", url, true);
        return self.sendXMLHttpRequest(req);
    }, loadJSONDoc: function (url) {
        var self = MochiKit.Async;
        var d = self.doSimpleXMLHttpRequest.apply(self, arguments);
        d = d.addCallback(self.evalJSONRequest);
        return d;
    }, wait: function (seconds, value) {
        var d = new MochiKit.Async.Deferred();
        var m = MochiKit.Base;
        if (typeof (value) != "undefined") {
            d.addCallback(function () {
                return value;
            });
        }
        var timeout = setTimeout(m.bind("callback", d), Math.floor(seconds * 1000));
        d.canceller = function () {
            try {
                clearTimeout(timeout);
            } catch (e) {
            }
        };
        return d;
    }, callLater: function (seconds, func) {
        var m = MochiKit.Base;
        var pfunc = m.partial.apply(m, m.extend(null, arguments, 1));
        return MochiKit.Async.wait(seconds).addCallback(function (res) {
            return pfunc();
        });
    }
});
MochiKit.Async.DeferredLock = function () {
    this.waiting = [];
    this.locked = false;
    this.id = this._nextId();
};
MochiKit.Async.DeferredLock.prototype = {
    __class__: MochiKit.Async.DeferredLock, acquire: function () {
        d = new MochiKit.Async.Deferred();
        if (this.locked) {
            this.waiting.push(d);
        } else {
            this.locked = true;
            d.callback(this);
        }
        return d;
    }, release: function () {
        if (!this.locked) {
            throw TypeError("Tried to release an unlocked DeferredLock");
        }
        this.locked = false;
        if (this.waiting.length > 0) {
            this.locked = true;
            this.waiting.shift().callback(this);
        }
    }, _nextId: MochiKit.Base.counter(), repr: function () {
        var state;
        if (this.locked) {
            state = "locked, " + this.waiting.length + " waiting";
        } else {
            state = "unlocked";
        }
        return "DeferredLock(" + this.id + ", " + state + ")";
    }, toString: MochiKit.Base.forwardCall("repr")
};
MochiKit.Async.DeferredList = function (list, fireOnOneCallback, fireOnOneErrback, consumeErrors, canceller) {
    MochiKit.Async.Deferred.apply(this, [canceller]);
    this.list = list;
    var resultList = [];
    this.resultList = resultList;
    this.finishedCount = 0;
    this.fireOnOneCallback = fireOnOneCallback;
    this.fireOnOneErrback = fireOnOneErrback;
    this.consumeErrors = consumeErrors;
    var cb = MochiKit.Base.bind(this._cbDeferred, this);
    for (var i = 0; i < list.length; i++) {
        var d = list[i];
        resultList.push(undefined);
        d.addCallback(cb, i, true);
        d.addErrback(cb, i, false);
    }
    if (list.length === 0 && !fireOnOneCallback) {
        this.callback(this.resultList);
    }
};
MochiKit.Async.DeferredList.prototype = new MochiKit.Async.Deferred();
MochiKit.Async.DeferredList.prototype._cbDeferred = function (index, succeeded, result) {
    this.resultList[index] = [succeeded, result];
    this.finishedCount += 1;
    if (this.fired !== 0) {
        if (succeeded && this.fireOnOneCallback) {
            this.callback([index, result]);
        } else {
            if (!succeeded && this.fireOnOneErrback) {
                this.errback(result);
            } else {
                if (this.finishedCount == this.list.length) {
                    this.callback(this.resultList);
                }
            }
        }
    }
    if (!succeeded && this.consumeErrors) {
        result = null;
    }
    return result;
};
MochiKit.Async.gatherResults = function (deferredList) {
    var d = new MochiKit.Async.DeferredList(deferredList, false, true, false);
    d.addCallback(function (results) {
        var ret = [];
        for (var i = 0; i < results.length; i++) {
            ret.push(results[i][1]);
        }
        return ret;
    });
    return d;
};
MochiKit.Async.maybeDeferred = function (func) {
    var self = MochiKit.Async;
    var result;
    try {
        var r = func.apply(null, MochiKit.Base.extend([], arguments, 1));
        if (r instanceof self.Deferred) {
            result = r;
        } else {
            if (r instanceof Error) {
                result = self.fail(r);
            } else {
                result = self.succeed(r);
            }
        }
    } catch (e) {
        result = self.fail(e);
    }
    return result;
};
MochiKit.Async.EXPORT = ["AlreadyCalledError", "CancelledError", "BrowserComplianceError", "GenericError", "XMLHttpRequestError", "Deferred", "succeed", "fail", "getXMLHttpRequest", "doSimpleXMLHttpRequest", "loadJSONDoc", "wait", "callLater", "sendXMLHttpRequest", "DeferredLock", "DeferredList", "gatherResults", "maybeDeferred"];
MochiKit.Async.EXPORT_OK = ["evalJSONRequest"];
MochiKit.Async.__new__ = function () {
    var m = MochiKit.Base;
    var ne = m.partial(m._newNamedError, this);
    ne("AlreadyCalledError", function (deferred) {
        this.deferred = deferred;
    });
    ne("CancelledError", function (deferred) {
        this.deferred = deferred;
    });
    ne("BrowserComplianceError", function (msg) {
        this.message = msg;
    });
    ne("GenericError", function (msg) {
        this.message = msg;
    });
    ne("XMLHttpRequestError", function (req, msg) {
        this.req = req;
        this.message = msg;
        try {
            this.number = req.status;
        } catch (e) {
        }
    });
    this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
    m.nameFunctions(this);
};
MochiKit.Async.__new__();
MochiKit.Base._exportSymbols(this, MochiKit.Async);
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.DOM");
    dojo.require("MochiKit.Base");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.DOM depends on MochiKit.Base!";
}
if (typeof (MochiKit.DOM) == "undefined") {
    MochiKit.DOM = {};
}
MochiKit.DOM.NAME = "MochiKit.DOM";
MochiKit.DOM.VERSION = "1.4";
MochiKit.DOM.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.DOM.toString = function () {
    return this.__repr__();
};
MochiKit.DOM.EXPORT = ["removeEmptyTextNodes", "formContents", "currentWindow", "currentDocument", "withWindow", "withDocument", "registerDOMConverter", "coerceToDOM", "createDOM", "createDOMFunc", "getNodeAttribute", "setNodeAttribute", "updateNodeAttributes", "appendChildNodes", "replaceChildNodes", "removeElement", "swapDOM", "BUTTON", "TT", "PRE", "H1", "H2", "H3", "BR", "CANVAS", "HR", "LABEL", "TEXTAREA", "FORM", "STRONG", "SELECT", "OPTION", "OPTGROUP", "LEGEND", "FIELDSET", "P", "UL", "OL", "LI", "TD", "TR", "THEAD", "TBODY", "TFOOT", "TABLE", "TH", "INPUT", "SPAN", "A", "DIV", "IMG", "getElement", "$", "getElementsByTagAndClassName", "addToCallStack", "addLoadEvent", "focusOnLoad", "setElementClass", "toggleElementClass", "addElementClass", "removeElementClass", "swapElementClass", "hasElementClass", "escapeHTML", "toHTML", "emitHTML", "scrapeText"];
MochiKit.DOM.EXPORT_OK = ["domConverters"];
MochiKit.DOM.DEPRECATED = [["computedStyle", "MochiKit.Style.computedStyle", "1.4"], ["elementDimensions", "MochiKit.Style.getElementDimensions", "1.4"], ["elementPosition", "MochiKit.Style.getElementPosition", "1.4"], ["hideElement", "MochiKit.Style.hideElement", "1.4"], ["setElementDimensions", "MochiKit.Style.setElementDimensions", "1.4"], ["setElementPosition", "MochiKit.Style.setElementPosition", "1.4"], ["setDisplayForElement", "MochiKit.Style.setDisplayForElement", "1.4"], ["setOpacity", "MochiKit.Style.setOpacity", "1.4"], ["showElement", "MochiKit.Style.showElement", "1.4"], ["Coordinates", "MochiKit.Style.Coordinates", "1.4"], ["Dimensions", "MochiKit.Style.Dimensions", "1.4"]];
MochiKit.DOM.getViewportDimensions = new Function("" + 'if (!MochiKit["Style"]) {' + '    throw new Error("This function has been deprecated and depends on MochiKit.Style.");' + "}" + "return MochiKit.Style.getViewportDimensions.apply(this, arguments);");
MochiKit.Base.update(MochiKit.DOM, {
    currentWindow: function () {
        return MochiKit.DOM._window;
    }, currentDocument: function () {
        return MochiKit.DOM._document;
    }, withWindow: function (win, func) {
        var self = MochiKit.DOM;
        var oldDoc = self._document;
        var oldWin = self._win;
        var rval;
        try {
            self._window = win;
            self._document = win.document;
            rval = func();
        } catch (e) {
            self._window = oldWin;
            self._document = oldDoc;
            throw e;
        }
        self._window = oldWin;
        self._document = oldDoc;
        return rval;
    }, formContents: function (elem) {
        var names = [];
        var values = [];
        var m = MochiKit.Base;
        var self = MochiKit.DOM;
        if (typeof (elem) == "undefined" || elem === null) {
            elem = self._document;
        } else {
            elem = self.getElement(elem);
        }
        m.nodeWalk(elem, function (elem) {
            var name = elem.name;
            if (m.isNotEmpty(name)) {
                var tagName = elem.nodeName;
                if (tagName == "INPUT" && (elem.type == "radio" || elem.type == "checkbox") && !elem.checked) {
                    return null;
                }
                if (tagName == "SELECT") {
                    if (elem.type == "select-one") {
                        if (elem.selectedIndex >= 0) {
                            var opt = elem.options[elem.selectedIndex];
                            names.push(name);
                            values.push((opt.value) ? opt.value : opt.text);
                            return null;
                        }
                        names.push(name);
                        values.push("");
                        return null;
                    } else {
                        var opts = elem.options;
                        if (!opts.length) {
                            names.push(name);
                            values.push("");
                            return null;
                        }
                        for (var i = 0; i < opts.length; i++) {
                            var opt = opts[i];
                            if (!opt.selected) {
                                continue;
                            }
                            names.push(name);
                            values.push((opt.value) ? opt.value : opt.text);
                        }
                        return null;
                    }
                }
                if (tagName == "FORM" || tagName == "P" || tagName == "SPAN" || tagName == "DIV") {
                    return elem.childNodes;
                }
                names.push(name);
                values.push(elem.value || "");
                return null;
            }
            return elem.childNodes;
        });
        return [names, values];
    }, withDocument: function (doc, func) {
        var self = MochiKit.DOM;
        var oldDoc = self._document;
        var rval;
        try {
            self._document = doc;
            rval = func();
        } catch (e) {
            self._document = oldDoc;
            throw e;
        }
        self._document = oldDoc;
        return rval;
    }, registerDOMConverter: function (name, check, wrap, override) {
        MochiKit.DOM.domConverters.register(name, check, wrap, override);
    }, coerceToDOM: function (node, ctx) {
        var m = MochiKit.Base;
        var im = MochiKit.Iter;
        var self = MochiKit.DOM;
        if (im) {
            var iter = im.iter;
            var repeat = im.repeat;
            var map = m.map;
        }
        var domConverters = self.domConverters;
        var coerceToDOM = arguments.callee;
        var NotFound = m.NotFound;
        while (true) {
            if (typeof (node) == "undefined" || node === null) {
                return null;
            }
            if (typeof (node.nodeType) != "undefined" && node.nodeType > 0) {
                return node;
            }
            if (typeof (node) == "number" || typeof (node) == "boolean") {
                node = node.toString();
            }
            if (typeof (node) == "string") {
                return self._document.createTextNode(node);
            }
            if (typeof (node.__dom__) == "function") {
                node = node.__dom__(ctx);
                continue;
            }
            if (typeof (node.dom) == "function") {
                node = node.dom(ctx);
                continue;
            }
            if (typeof (node) == "function") {
                node = node.apply(ctx, [ctx]);
                continue;
            }
            if (im) {
                var iterNodes = null;
                try {
                    iterNodes = iter(node);
                } catch (e) {
                }
                if (iterNodes) {
                    return map(coerceToDOM, iterNodes, repeat(ctx));
                }
            }
            try {
                node = domConverters.match(node, ctx);
                continue;
            } catch (e) {
                if (e != NotFound) {
                    throw e;
                }
            }
            return self._document.createTextNode(node.toString());
        }
        return undefined;
    }, setNodeAttribute: function (node, attr, value) {
        var o = {};
        o[attr] = value;
        try {
            return MochiKit.DOM.updateNodeAttributes(node, o);
        } catch (e) {
        }
        return null;
    }, getNodeAttribute: function (node, attr) {
        var self = MochiKit.DOM;
        var rename = self.attributeArray.renames[attr];
        node = self.getElement(node);
        try {
            if (rename) {
                return node[rename];
            }
            return node.getAttribute(attr);
        } catch (e) {
        }
        return null;
    }, updateNodeAttributes: function (node, attrs) {
        var elem = node;
        var self = MochiKit.DOM;
        if (typeof (node) == "string") {
            elem = self.getElement(node);
        }
        if (attrs) {
            var updatetree = MochiKit.Base.updatetree;
            if (self.attributeArray.compliant) {
                for (var k in attrs) {
                    var v = attrs[k];
                    if (typeof (v) == "object" && typeof (elem[k]) == "object") {
                        updatetree(elem[k], v);
                    } else {
                        if (k.substring(0, 2) == "on") {
                            if (typeof (v) == "string") {
                                v = new Function(v);
                            }
                            elem[k] = v;
                        } else {
                            elem.setAttribute(k, v);
                        }
                    }
                }
            } else {
                var renames = self.attributeArray.renames;
                for (k in attrs) {
                    v = attrs[k];
                    var renamed = renames[k];
                    if (k == "style" && typeof (v) == "string") {
                        elem.style.cssText = v;
                    } else {
                        if (typeof (renamed) == "string") {
                            elem[renamed] = v;
                        } else {
                            if (typeof (elem[k]) == "object" && typeof (v) == "object") {
                                updatetree(elem[k], v);
                            } else {
                                if (k.substring(0, 2) == "on") {
                                    if (typeof (v) == "string") {
                                        v = new Function(v);
                                    }
                                    elem[k] = v;
                                } else {
                                    elem.setAttribute(k, v);
                                }
                            }
                        }
                    }
                }
            }
        }
        return elem;
    }, appendChildNodes: function (node) {
        var elem = node;
        var self = MochiKit.DOM;
        if (typeof (node) == "string") {
            elem = self.getElement(node);
        }
        var nodeStack = [self.coerceToDOM(MochiKit.Base.extend(null, arguments, 1), elem)];
        var concat = MochiKit.Base.concat;
        while (nodeStack.length) {
            var n = nodeStack.shift();
            if (typeof (n) == "undefined" || n === null) {
            } else {
                if (typeof (n.nodeType) == "number") {
                    elem.appendChild(n);
                } else {
                    nodeStack = concat(n, nodeStack);
                }
            }
        }
        return elem;
    }, replaceChildNodes: function (node) {
        var elem = node;
        var self = MochiKit.DOM;
        if (typeof (node) == "string") {
            elem = self.getElement(node);
            arguments[0] = elem;
        }
        var child;
        while ((child = elem.firstChild)) {
            elem.removeChild(child);
        }
        if (arguments.length < 2) {
            return elem;
        } else {
            return self.appendChildNodes.apply(this, arguments);
        }
    }, createDOM: function (name, attrs) {
        var elem;
        var self = MochiKit.DOM;
        var m = MochiKit.Base;
        if (typeof (attrs) == "string" || typeof (attrs) == "number") {
            var args = m.extend([name, null], arguments, 1);
            return arguments.callee.apply(this, args);
        }
        if (typeof (name) == "string") {
            if (attrs && !self.attributeArray.compliant) {
                var contents = "";
                if ("name" in attrs) {
                    contents += ' name="' + self.escapeHTML(attrs.name) + '"';
                }
                if (name == "input" && "type" in attrs) {
                    contents += ' type="' + self.escapeHTML(attrs.type) + '"';
                }
                if (contents) {
                    name = "<" + name + contents + ">";
                }
            }
            elem = self._document.createElement(name);
        } else {
            elem = name;
        }
        if (attrs) {
            self.updateNodeAttributes(elem, attrs);
        }
        if (arguments.length <= 2) {
            return elem;
        } else {
            var args = m.extend([elem], arguments, 2);
            return self.appendChildNodes.apply(this, args);
        }
    }, createDOMFunc: function () {
        var m = MochiKit.Base;
        return m.partial.apply(this, m.extend([MochiKit.DOM.createDOM], arguments));
    }, removeElement: function (elem) {
        var e = MochiKit.DOM.getElement(elem);
        e.parentNode.removeChild(e);
        return e;
    }, swapDOM: function (dest, src) {
        var self = MochiKit.DOM;
        dest = self.getElement(dest);
        var parent = dest.parentNode;
        if (src) {
            src = self.getElement(src);
            parent.replaceChild(src, dest);
        } else {
            parent.removeChild(dest);
        }
        return src;
    }, getElement: function (id) {
        var self = MochiKit.DOM;
        if (arguments.length == 1) {
            return ((typeof (id) == "string") ? self._document.getElementById(id) : id);
        } else {
            return MochiKit.Base.map(self.getElement, arguments);
        }
    }, getElementsByTagAndClassName: function (tagName, className, parent) {
        var self = MochiKit.DOM;
        if (typeof (tagName) == "undefined" || tagName === null) {
            tagName = "*";
        }
        if (typeof (parent) == "undefined" || parent === null) {
            parent = self._document;
        }
        parent = self.getElement(parent);
        var children = (parent.getElementsByTagName(tagName) || self._document.all);
        if (typeof (className) == "undefined" || className === null) {
            return MochiKit.Base.extend(null, children);
        }
        var elements = [];
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(" ");
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    elements.push(child);
                    break;
                }
            }
        }
        return elements;
    }, _newCallStack: function (path, once) {
        var rval = function () {
            var callStack = arguments.callee.callStack;
            for (var i = 0; i < callStack.length; i++) {
                if (callStack[i].apply(this, arguments) === false) {
                    break;
                }
            }
            if (once) {
                try {
                    this[path] = null;
                } catch (e) {
                }
            }
        };
        rval.callStack = [];
        return rval;
    }, addToCallStack: function (target, path, func, once) {
        var self = MochiKit.DOM;
        var existing = target[path];
        var regfunc = existing;
        if (!(typeof (existing) == "function" && typeof (existing.callStack) == "object" && existing.callStack !== null)) {
            regfunc = self._newCallStack(path, once);
            if (typeof (existing) == "function") {
                regfunc.callStack.push(existing);
            }
            target[path] = regfunc;
        }
        regfunc.callStack.push(func);
    }, addLoadEvent: function (func) {
        var self = MochiKit.DOM;
        self.addToCallStack(self._window, "onload", func, true);
    }, focusOnLoad: function (element) {
        var self = MochiKit.DOM;
        self.addLoadEvent(function () {
            element = self.getElement(element);
            if (element) {
                element.focus();
            }
        });
    }, setElementClass: function (element, className) {
        var self = MochiKit.DOM;
        var obj = self.getElement(element);
        if (self.attributeArray.compliant) {
            obj.setAttribute("class", className);
        } else {
            obj.setAttribute("className", className);
        }
    }, toggleElementClass: function (className) {
        var self = MochiKit.DOM;
        for (var i = 1; i < arguments.length; i++) {
            var obj = self.getElement(arguments[i]);
            if (!self.addElementClass(obj, className)) {
                self.removeElementClass(obj, className);
            }
        }
    }, addElementClass: function (element, className) {
        var self = MochiKit.DOM;
        var obj = self.getElement(element);
        var cls = obj.className;
        if (cls.length === 0) {
            self.setElementClass(obj, className);
            return true;
        }
        if (cls == className) {
            return false;
        }
        var classes = obj.className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == className) {
                return false;
            }
        }
        self.setElementClass(obj, cls + " " + className);
        return true;
    }, removeElementClass: function (element, className) {
        var self = MochiKit.DOM;
        var obj = self.getElement(element);
        var cls = obj.className;
        if (cls.length === 0) {
            return false;
        }
        if (cls == className) {
            self.setElementClass(obj, "");
            return true;
        }
        var classes = obj.className.split(" ");
        for (var i = 0; i < classes.length; i++) {
            if (classes[i] == className) {
                classes.splice(i, 1);
                self.setElementClass(obj, classes.join(" "));
                return true;
            }
        }
        return false;
    }, swapElementClass: function (element, fromClass, toClass) {
        var obj = MochiKit.DOM.getElement(element);
        var res = MochiKit.DOM.removeElementClass(obj, fromClass);
        if (res) {
            MochiKit.DOM.addElementClass(obj, toClass);
        }
        return res;
    }, hasElementClass: function (element, className) {
        var obj = MochiKit.DOM.getElement(element);
        var classes = obj.className.split(" ");
        for (var i = 1; i < arguments.length; i++) {
            var good = false;
            for (var j = 0; j < classes.length; j++) {
                if (classes[j] == arguments[i]) {
                    good = true;
                    break;
                }
            }
            if (!good) {
                return false;
            }
        }
        return true;
    }, escapeHTML: function (s) {
        return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }, toHTML: function (dom) {
        return MochiKit.DOM.emitHTML(dom).join("");
    }, emitHTML: function (dom, lst) {
        if (typeof (lst) == "undefined" || lst === null) {
            lst = [];
        }
        var queue = [dom];
        var self = MochiKit.DOM;
        var escapeHTML = self.escapeHTML;
        var attributeArray = self.attributeArray;
        while (queue.length) {
            dom = queue.pop();
            if (typeof (dom) == "string") {
                lst.push(dom);
            } else {
                if (dom.nodeType == 1) {
                    lst.push("<" + dom.nodeName.toLowerCase());
                    var attributes = [];
                    var domAttr = attributeArray(dom);
                    for (var i = 0; i < domAttr.length; i++) {
                        var a = domAttr[i];
                        attributes.push([" ", a.name, '="', escapeHTML(a.value), '"']);
                    }
                    attributes.sort();
                    for (i = 0; i < attributes.length; i++) {
                        var attrs = attributes[i];
                        for (var j = 0; j < attrs.length; j++) {
                            lst.push(attrs[j]);
                        }
                    }
                    if (dom.hasChildNodes()) {
                        lst.push(">");
                        queue.push("</" + dom.nodeName.toLowerCase() + ">");
                        var cnodes = dom.childNodes;
                        for (i = cnodes.length - 1; i >= 0; i--) {
                            queue.push(cnodes[i]);
                        }
                    } else {
                        lst.push("/>");
                    }
                } else {
                    if (dom.nodeType == 3) {
                        lst.push(escapeHTML(dom.nodeValue));
                    }
                }
            }
        }
        return lst;
    }, scrapeText: function (node, asArray) {
        var rval = [];
        (function (node) {
            var cn = node.childNodes;
            if (cn) {
                for (var i = 0; i < cn.length; i++) {
                    arguments.callee.call(this, cn[i]);
                }
            }
            var nodeValue = node.nodeValue;
            if (typeof (nodeValue) == "string") {
                rval.push(nodeValue);
            }
        })(MochiKit.DOM.getElement(node));
        if (asArray) {
            return rval;
        } else {
            return rval.join("");
        }
    }, removeEmptyTextNodes: function (element) {
        element = MochiKit.DOM.getElement(element);
        for (var i = 0; i < element.childNodes.length; i++) {
            var node = element.childNodes[i];
            if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
                node.parentNode.removeChild(node);
            }
        }
    }, __new__: function (win) {
        var m = MochiKit.Base;
        if (typeof (document) != "undefined") {
            this._document = document;
        } else {
            if (MochiKit.MockDOM) {
                this._document = MochiKit.MockDOM.document;
            }
        }
        this._window = win;
        this.domConverters = new m.AdapterRegistry();
        var __tmpElement = this._document.createElement("span");
        var attributeArray;
        if (__tmpElement && __tmpElement.attributes && __tmpElement.attributes.length > 0) {
            var filter = m.filter;
            attributeArray = function (node) {
                return filter(attributeArray.ignoreAttrFilter, node.attributes);
            };
            attributeArray.ignoreAttr = {};
            var attrs = __tmpElement.attributes;
            var ignoreAttr = attributeArray.ignoreAttr;
            for (var i = 0; i < attrs.length; i++) {
                var a = attrs[i];
                ignoreAttr[a.name] = a.value;
            }
            attributeArray.ignoreAttrFilter = function (a) {
                return (attributeArray.ignoreAttr[a.name] != a.value);
            };
            attributeArray.compliant = false;
            attributeArray.renames = {
                "class": "className",
                "checked": "defaultChecked",
                "usemap": "useMap",
                "for": "htmlFor",
                "readonly": "readOnly"
            };
        } else {
            attributeArray = function (node) {
                return node.attributes;
            };
            attributeArray.compliant = true;
            attributeArray.renames = {};
        }
        this.attributeArray = attributeArray;
        var _deprecated = function (fromModule, arr) {
            var modules = arr[1].split(".");
            var str = "";
            var obj = {};
            str += "if (!MochiKit." + modules[1] + ') { throw new Error("';
            str += "This function has been deprecated and depends on MochiKit.";
            str += modules[1] + '.");}';
            str += "return MochiKit." + modules[1] + "." + arr[0];
            str += ".apply(this, arguments);";
            obj[modules[2]] = new Function(str);
            MochiKit.Base.update(MochiKit[fromModule], obj);
        };
        for (var i; i < MochiKit.DOM.DEPRECATED.length; i++) {
            _deprecated("DOM", MochiKit.DOM.DEPRECATED[i]);
        }
        var createDOMFunc = this.createDOMFunc;
        this.UL = createDOMFunc("ul");
        this.OL = createDOMFunc("ol");
        this.LI = createDOMFunc("li");
        this.TD = createDOMFunc("td");
        this.TR = createDOMFunc("tr");
        this.TBODY = createDOMFunc("tbody");
        this.THEAD = createDOMFunc("thead");
        this.TFOOT = createDOMFunc("tfoot");
        this.TABLE = createDOMFunc("table");
        this.TH = createDOMFunc("th");
        this.INPUT = createDOMFunc("input");
        this.SPAN = createDOMFunc("span");
        this.A = createDOMFunc("a");
        this.DIV = createDOMFunc("div");
        this.IMG = createDOMFunc("img");
        this.BUTTON = createDOMFunc("button");
        this.TT = createDOMFunc("tt");
        this.PRE = createDOMFunc("pre");
        this.H1 = createDOMFunc("h1");
        this.H2 = createDOMFunc("h2");
        this.H3 = createDOMFunc("h3");
        this.BR = createDOMFunc("br");
        this.HR = createDOMFunc("hr");
        this.LABEL = createDOMFunc("label");
        this.TEXTAREA = createDOMFunc("textarea");
        this.FORM = createDOMFunc("form");
        this.P = createDOMFunc("p");
        this.SELECT = createDOMFunc("select");
        this.OPTION = createDOMFunc("option");
        this.OPTGROUP = createDOMFunc("optgroup");
        this.LEGEND = createDOMFunc("legend");
        this.FIELDSET = createDOMFunc("fieldset");
        this.STRONG = createDOMFunc("strong");
        this.CANVAS = createDOMFunc("canvas");
        this.$ = this.getElement;
        this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
        m.nameFunctions(this);
    }
});
MochiKit.DOM.__new__(((typeof (window) == "undefined") ? this : window));
if (MochiKit.__export__) {
    withWindow = MochiKit.DOM.withWindow;
    withDocument = MochiKit.DOM.withDocument;
}
MochiKit.Base._exportSymbols(this, MochiKit.DOM);
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Style");
    dojo.require("MochiKit.Base");
    dojo.require("MochiKit.DOM");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Style depends on MochiKit.Base!";
}
try {
    if (typeof (MochiKit.DOM) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Style depends on MochiKit.DOM!";
}
if (typeof (MochiKit.Style) == "undefined") {
    MochiKit.Style = {};
}
MochiKit.Style.NAME = "MochiKit.Style";
MochiKit.Style.VERSION = "1.4";
MochiKit.Style.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.Style.toString = function () {
    return this.__repr__();
};
MochiKit.Style.EXPORT_OK = [];
MochiKit.Style.EXPORT = ["setOpacity", "computedStyle", "getElementDimensions", "elementDimensions", "setElementDimensions", "getElementPosition", "elementPosition", "setElementPosition", "setDisplayForElement", "hideElement", "showElement", "getViewportDimensions", "Dimensions", "Coordinates"];
MochiKit.Style.Dimensions = function (w, h) {
    this.w = w;
    this.h = h;
};
MochiKit.Style.Dimensions.prototype.__repr__ = function () {
    var repr = MochiKit.Base.repr;
    return "{w: " + repr(this.w) + ", h: " + repr(this.h) + "}";
};
MochiKit.Style.Dimensions.prototype.toString = function () {
    return this.__repr__();
};
MochiKit.Style.Coordinates = function (x, y) {
    this.x = x;
    this.y = y;
};
MochiKit.Style.Coordinates.prototype.__repr__ = function () {
    var repr = MochiKit.Base.repr;
    return "{x: " + repr(this.x) + ", y: " + repr(this.y) + "}";
};
MochiKit.Style.Coordinates.prototype.toString = function () {
    return this.__repr__();
};
MochiKit.Base.update(MochiKit.Style, {
    computedStyle: function (elem, cssProperty) {
        var dom = MochiKit.DOM;
        var d = dom._document;
        elem = dom.getElement(elem);
        cssProperty = MochiKit.Base.camelize(cssProperty);
        if (!elem || elem == d) {
            return undefined;
        }
        if (cssProperty == "opacity" && elem.filters) {
            try {
                return elem.filters.item("DXImageTransform.Microsoft.Alpha").opacity / 100;
            } catch (e) {
                try {
                    return elem.filters.item("alpha").opacity / 100;
                } catch (e) {
                }
            }
        }
        if (elem.currentStyle) {
            return elem.currentStyle[cssProperty];
        }
        if (typeof (d.defaultView) == "undefined") {
            return undefined;
        }
        if (d.defaultView === null) {
            return undefined;
        }
        var style = d.defaultView.getComputedStyle(elem, null);
        if (typeof (style) == "undefined" || style === null) {
            return undefined;
        }
        var selectorCase = cssProperty.replace(/([A-Z])/g, "-$1").toLowerCase();
        return style.getPropertyValue(selectorCase);
    }, setOpacity: function (elem, o) {
        elem = MochiKit.DOM.getElement(elem);
        MochiKit.DOM.updateNodeAttributes(elem, {
            "style": {
                "opacity": o,
                "-moz-opacity": o,
                "-khtml-opacity": o,
                "filter": " alpha(opacity=" + (o * 100) + ")"
            }
        });
    }, getElementPosition: function (elem, relativeTo) {
        var self = MochiKit.Style;
        var dom = MochiKit.DOM;
        elem = dom.getElement(elem);
        if (!elem || (!(elem.x && elem.y) && (!elem.parentNode == null || self.computedStyle(elem, "display") == "none"))) {
            return undefined;
        }
        var c = new self.Coordinates(0, 0);
        var box = null;
        var parent = null;
        var d = MochiKit.DOM._document;
        var de = d.documentElement;
        var b = d.body;
        if (!elem.parentNode && elem.x && elem.y) {
            c.x += elem.x || 0;
            c.y += elem.y || 0;
        } else {
            if (elem.getBoundingClientRect) {
                box = elem.getBoundingClientRect();
                c.x += box.left + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
                c.y += box.top + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
            } else {
                if (elem.offsetParent) {
                    c.x += elem.offsetLeft;
                    c.y += elem.offsetTop;
                    parent = elem.offsetParent;
                    if (parent != elem) {
                        while (parent) {
                            c.x += parent.offsetLeft;
                            c.y += parent.offsetTop;
                            parent = parent.offsetParent;
                        }
                    }
                    var ua = navigator.userAgent.toLowerCase();
                    if ((typeof (opera) != "undefined" && parseFloat(opera.version()) < 9) || (ua.indexOf("safari") != -1 && self.computedStyle(elem, "position") == "absolute")) {
                        c.x -= b.offsetLeft;
                        c.y -= b.offsetTop;
                    }
                }
            }
        }
        if (typeof (relativeTo) != "undefined") {
            relativeTo = arguments.callee(relativeTo);
            if (relativeTo) {
                c.x -= (relativeTo.x || 0);
                c.y -= (relativeTo.y || 0);
            }
        }
        if (elem.parentNode) {
            parent = elem.parentNode;
        } else {
            parent = null;
        }
        while (parent && parent.tagName != "BODY" && parent.tagName != "HTML") {
            c.x -= parent.scrollLeft;
            c.y -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            } else {
                parent = null;
            }
        }
        return c;
    }, setElementPosition: function (elem, newPos, units) {
        elem = MochiKit.DOM.getElement(elem);
        if (typeof (units) == "undefined") {
            units = "px";
        }
        MochiKit.DOM.updateNodeAttributes(elem, {"style": {"left": newPos.x + units, "top": newPos.y + units}});
    }, getElementDimensions: function (elem) {
        var self = MochiKit.Style;
        var dom = MochiKit.DOM;
        if (typeof (elem.w) == "number" || typeof (elem.h) == "number") {
            return new self.Dimensions(elem.w || 0, elem.h || 0);
        }
        elem = dom.getElement(elem);
        if (!elem) {
            return undefined;
        }
        if (self.computedStyle(elem, "display") != "none") {
            return new self.Dimensions(elem.offsetWidth || 0, elem.offsetHeight || 0);
        }
        var s = elem.style;
        var originalVisibility = s.visibility;
        var originalPosition = s.position;
        s.visibility = "hidden";
        s.position = "absolute";
        s.display = "";
        var originalWidth = elem.offsetWidth;
        var originalHeight = elem.offsetHeight;
        s.display = "none";
        s.position = originalPosition;
        s.visibility = originalVisibility;
        return new self.Dimensions(originalWidth, originalHeight);
    }, setElementDimensions: function (elem, newSize, units) {
        elem = MochiKit.DOM.getElement(elem);
        if (typeof (units) == "undefined") {
            units = "px";
        }
        MochiKit.DOM.updateNodeAttributes(elem, {"style": {"width": newSize.w + units, "height": newSize.h + units}});
    }, setDisplayForElement: function (display, element) {
        var elements = MochiKit.Base.extend(null, arguments, 1);
        var getElement = MochiKit.DOM.getElement;
        for (var i = 0; i < elements.length; i++) {
            var element = getElement(elements[i]);
            if (element) {
                element.style.display = display;
            }
        }
    }, getViewportDimensions: function () {
        var d = new MochiKit.Style.Dimensions();
        var w = MochiKit.DOM._window;
        var b = MochiKit.DOM._document.body;
        if (w.innerWidth) {
            d.w = w.innerWidth;
            d.h = w.innerHeight;
        } else {
            if (b.parentElement.clientWidth) {
                d.w = b.parentElement.clientWidth;
                d.h = b.parentElement.clientHeight;
            } else {
                if (b && b.clientWidth) {
                    d.w = b.clientWidth;
                    d.h = b.clientHeight;
                }
            }
        }
        return d;
    }, __new__: function () {
        var m = MochiKit.Base;
        this.elementPosition = this.getElementPosition;
        this.elementDimensions = this.getElementDimensions;
        this.hideElement = m.partial(this.setDisplayForElement, "none");
        this.showElement = m.partial(this.setDisplayForElement, "block");
        this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
        m.nameFunctions(this);
    }
});
MochiKit.Style.__new__();
MochiKit.Base._exportSymbols(this, MochiKit.Style);
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Signal");
    dojo.require("MochiKit.Base");
    dojo.require("MochiKit.DOM");
    dojo.require("MochiKit.Style");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
    JSAN.use("MochiKit.DOM", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Signal depends on MochiKit.Base!";
}
try {
    if (typeof (MochiKit.DOM) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Signal depends on MochiKit.DOM!";
}
try {
    if (typeof (MochiKit.Style) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Signal depends on MochiKit.Style!";
}
if (typeof (MochiKit.Signal) == "undefined") {
    MochiKit.Signal = {};
}
MochiKit.Signal.NAME = "MochiKit.Signal";
MochiKit.Signal.VERSION = "1.4";
MochiKit.Signal._observers = [];
MochiKit.Signal.Event = function (src, e) {
    this._event = e || window.event;
    this._src = src;
};
MochiKit.Base.update(MochiKit.Signal.Event.prototype, {
    __repr__: function () {
        var repr = MochiKit.Base.repr;
        var str = "{event(): " + repr(this.event()) + ", src(): " + repr(this.src()) + ", type(): " + repr(this.type()) + ", target(): " + repr(this.target()) + ", modifier(): " + "{alt: " + repr(this.modifier().alt) + ", ctrl: " + repr(this.modifier().ctrl) + ", meta: " + repr(this.modifier().meta) + ", shift: " + repr(this.modifier().shift) + ", any: " + repr(this.modifier().any) + "}";
        if (this.type() && this.type().indexOf("key") === 0) {
            str += ", key(): {code: " + repr(this.key().code) + ", string: " + repr(this.key().string) + "}";
        }
        if (this.type() && (this.type().indexOf("mouse") === 0 || this.type().indexOf("click") != -1 || this.type() == "contextmenu")) {
            str += ", mouse(): {page: " + repr(this.mouse().page) + ", client: " + repr(this.mouse().client);
            if (this.type() != "mousemove") {
                str += ", button: {left: " + repr(this.mouse().button.left) + ", middle: " + repr(this.mouse().button.middle) + ", right: " + repr(this.mouse().button.right) + "}}";
            } else {
                str += "}";
            }
        }
        if (this.type() == "mouseover" || this.type() == "mouseout") {
            str += ", relatedTarget(): " + repr(this.relatedTarget());
        }
        str += "}";
        return str;
    }, toString: function () {
        return this.__repr__();
    }, src: function () {
        return this._src;
    }, event: function () {
        return this._event;
    }, type: function () {
        return this._event.type || undefined;
    }, target: function () {
        return this._event.target || this._event.srcElement;
    }, _relatedTarget: null, relatedTarget: function () {
        if (this._relatedTarget !== null) {
            return this._relatedTarget;
        }
        var elem = null;
        if (this.type() == "mouseover") {
            elem = (this._event.relatedTarget || this._event.fromElement);
        } else {
            if (this.type() == "mouseout") {
                elem = (this._event.relatedTarget || this._event.toElement);
            }
        }
        if (elem !== null) {
            this._relatedTarget = elem;
            return elem;
        }
        return undefined;
    }, _modifier: null, modifier: function () {
        if (this._modifier !== null) {
            return this._modifier;
        }
        var m = {};
        m.alt = this._event.altKey;
        m.ctrl = this._event.ctrlKey;
        m.meta = this._event.metaKey || false;
        m.shift = this._event.shiftKey;
        m.any = m.alt || m.ctrl || m.shift || m.meta;
        this._modifier = m;
        return m;
    }, _key: null, key: function () {
        if (this._key !== null) {
            return this._key;
        }
        var k = {};
        if (this.type() && this.type().indexOf("key") === 0) {
            if (this.type() == "keydown" || this.type() == "keyup") {
                k.code = this._event.keyCode;
                k.string = (MochiKit.Signal._specialKeys[k.code] || "KEY_UNKNOWN");
                this._key = k;
                return k;
            } else {
                if (this.type() == "keypress") {
                    k.code = 0;
                    k.string = "";
                    if (typeof (this._event.charCode) != "undefined" && this._event.charCode !== 0 && !MochiKit.Signal._specialMacKeys[this._event.charCode]) {
                        k.code = this._event.charCode;
                        k.string = String.fromCharCode(k.code);
                    } else {
                        if (this._event.keyCode && typeof (this._event.charCode) == "undefined") {
                            k.code = this._event.keyCode;
                            k.string = String.fromCharCode(k.code);
                        }
                    }
                    this._key = k;
                    return k;
                }
            }
        }
        return undefined;
    }, _mouse: null, mouse: function () {
        if (this._mouse !== null) {
            return this._mouse;
        }
        var m = {};
        var e = this._event;
        if (this.type() && (this.type().indexOf("mouse") === 0 || this.type().indexOf("click") != -1 || this.type() == "contextmenu")) {
            m.client = new MochiKit.Style.Coordinates(0, 0);
            if (e.clientX || e.clientY) {
                m.client.x = (!e.clientX || e.clientX < 0) ? 0 : e.clientX;
                m.client.y = (!e.clientY || e.clientY < 0) ? 0 : e.clientY;
            }
            m.page = new MochiKit.Style.Coordinates(0, 0);
            if (e.pageX || e.pageY) {
                m.page.x = (!e.pageX || e.pageX < 0) ? 0 : e.pageX;
                m.page.y = (!e.pageY || e.pageY < 0) ? 0 : e.pageY;
            } else {
                var de = MochiKit.DOM._document.documentElement;
                var b = MochiKit.DOM._document.body;
                m.page.x = e.clientX + (de.scrollLeft || b.scrollLeft) - (de.clientLeft || 0);
                m.page.y = e.clientY + (de.scrollTop || b.scrollTop) - (de.clientTop || 0);
            }
            if (this.type() != "mousemove") {
                m.button = {};
                m.button.left = false;
                m.button.right = false;
                m.button.middle = false;
                if (e.which) {
                    m.button.left = (e.which == 1);
                    m.button.middle = (e.which == 2);
                    m.button.right = (e.which == 3);
                } else {
                    m.button.left = !!(e.button & 1);
                    m.button.right = !!(e.button & 2);
                    m.button.middle = !!(e.button & 4);
                }
            }
            this._mouse = m;
            return m;
        }
        return undefined;
    }, stop: function () {
        this.stopPropagation();
        this.preventDefault();
    }, stopPropagation: function () {
        if (this._event.stopPropagation) {
            this._event.stopPropagation();
        } else {
            this._event.cancelBubble = true;
        }
    }, preventDefault: function () {
        if (this._event.preventDefault) {
            this._event.preventDefault();
        } else {
            if (this._confirmUnload === null) {
                this._event.returnValue = false;
            }
        }
    }, _confirmUnload: null, confirmUnload: function (msg) {
        if (this.type() == "beforeunload") {
            this._confirmUnload = msg;
            this._event.returnValue = msg;
        }
    }
});
MochiKit.Signal._specialMacKeys = {
    3: "KEY_ENTER",
    63289: "KEY_NUM_PAD_CLEAR",
    63276: "KEY_PAGE_UP",
    63277: "KEY_PAGE_DOWN",
    63275: "KEY_END",
    63273: "KEY_HOME",
    63234: "KEY_ARROW_LEFT",
    63232: "KEY_ARROW_UP",
    63235: "KEY_ARROW_RIGHT",
    63233: "KEY_ARROW_DOWN",
    63302: "KEY_INSERT",
    63272: "KEY_DELETE"
};
for (i = 63236; i <= 63242; i++) {
    MochiKit.Signal._specialMacKeys[i] = "KEY_F" + (i - 63236 + 1);
}
MochiKit.Signal._specialKeys = {
    8: "KEY_BACKSPACE",
    9: "KEY_TAB",
    12: "KEY_NUM_PAD_CLEAR",
    13: "KEY_ENTER",
    16: "KEY_SHIFT",
    17: "KEY_CTRL",
    18: "KEY_ALT",
    19: "KEY_PAUSE",
    20: "KEY_CAPS_LOCK",
    27: "KEY_ESCAPE",
    32: "KEY_SPACEBAR",
    33: "KEY_PAGE_UP",
    34: "KEY_PAGE_DOWN",
    35: "KEY_END",
    36: "KEY_HOME",
    37: "KEY_ARROW_LEFT",
    38: "KEY_ARROW_UP",
    39: "KEY_ARROW_RIGHT",
    40: "KEY_ARROW_DOWN",
    44: "KEY_PRINT_SCREEN",
    45: "KEY_INSERT",
    46: "KEY_DELETE",
    59: "KEY_SEMICOLON",
    91: "KEY_WINDOWS_LEFT",
    92: "KEY_WINDOWS_RIGHT",
    93: "KEY_SELECT",
    106: "KEY_NUM_PAD_ASTERISK",
    107: "KEY_NUM_PAD_PLUS_SIGN",
    109: "KEY_NUM_PAD_HYPHEN-MINUS",
    110: "KEY_NUM_PAD_FULL_STOP",
    111: "KEY_NUM_PAD_SOLIDUS",
    144: "KEY_NUM_LOCK",
    145: "KEY_SCROLL_LOCK",
    186: "KEY_SEMICOLON",
    187: "KEY_EQUALS_SIGN",
    188: "KEY_COMMA",
    189: "KEY_HYPHEN-MINUS",
    190: "KEY_FULL_STOP",
    191: "KEY_SOLIDUS",
    192: "KEY_GRAVE_ACCENT",
    219: "KEY_LEFT_SQUARE_BRACKET",
    220: "KEY_REVERSE_SOLIDUS",
    221: "KEY_RIGHT_SQUARE_BRACKET",
    222: "KEY_APOSTROPHE"
};
for (var i = 48; i <= 57; i++) {
    MochiKit.Signal._specialKeys[i] = "KEY_" + (i - 48);
}
for (i = 65; i <= 90; i++) {
    MochiKit.Signal._specialKeys[i] = "KEY_" + String.fromCharCode(i);
}
for (i = 96; i <= 105; i++) {
    MochiKit.Signal._specialKeys[i] = "KEY_NUM_PAD_" + (i - 96);
}
for (i = 112; i <= 123; i++) {
    MochiKit.Signal._specialKeys[i] = "KEY_F" + (i - 112 + 1);
}
MochiKit.Base.update(MochiKit.Signal, {
    __repr__: function () {
        return "[" + this.NAME + " " + this.VERSION + "]";
    }, toString: function () {
        return this.__repr__();
    }, _unloadCache: function () {
        var self = MochiKit.Signal;
        var observers = self._observers;
        for (var i = 0; i < observers.length; i++) {
            self._disconnect(observers[i]);
        }
        delete self._observers;
        try {
            window.onload = undefined;
        } catch (e) {
        }
        try {
            window.onunload = undefined;
        } catch (e) {
        }
    }, _listener: function (src, func, obj, isDOM) {
        var E = MochiKit.Signal.Event;
        if (!isDOM) {
            return MochiKit.Base.bind(func, obj);
        }
        obj = obj || src;
        if (typeof (func) == "string") {
            return function (nativeEvent) {
                obj[func].apply(obj, [new E(src, nativeEvent)]);
            };
        } else {
            return function (nativeEvent) {
                func.apply(obj, [new E(src, nativeEvent)]);
            };
        }
    }, connect: function (src, sig, objOrFunc, funcOrStr) {
        src = MochiKit.DOM.getElement(src);
        var self = MochiKit.Signal;
        if (typeof (sig) != "string") {
            throw new Error("'sig' must be a string");
        }
        var obj = null;
        var func = null;
        if (typeof (funcOrStr) != "undefined") {
            obj = objOrFunc;
            func = funcOrStr;
            if (typeof (funcOrStr) == "string") {
                if (typeof (objOrFunc[funcOrStr]) != "function") {
                    throw new Error("'funcOrStr' must be a function on 'objOrFunc'");
                }
            } else {
                if (typeof (funcOrStr) != "function") {
                    throw new Error("'funcOrStr' must be a function or string");
                }
            }
        } else {
            if (typeof (objOrFunc) != "function") {
                throw new Error("'objOrFunc' must be a function if 'funcOrStr' is not given");
            } else {
                func = objOrFunc;
            }
        }
        if (typeof (obj) == "undefined" || obj === null) {
            obj = src;
        }
        var isDOM = !!(src.addEventListener || src.attachEvent);
        var listener = self._listener(src, func, obj, isDOM);
        if (src.addEventListener) {
            src.addEventListener(sig.substr(2), listener, false);
        } else {
            if (src.attachEvent) {
                src.attachEvent(sig, listener);
            }
        }
        var ident = [src, sig, listener, isDOM, objOrFunc, funcOrStr];
        self._observers.push(ident);
        return ident;
    }, _disconnect: function (ident) {
        if (!ident[3]) {
            return;
        }
        var src = ident[0];
        var sig = ident[1];
        var listener = ident[2];
        if (src.removeEventListener) {
            src.removeEventListener(sig.substr(2), listener, false);
        } else {
            if (src.detachEvent) {
                src.detachEvent(sig, listener);
            } else {
                throw new Error("'src' must be a DOM element");
            }
        }
    }, disconnect: function (ident) {
        var self = MochiKit.Signal;
        var observers = self._observers;
        var m = MochiKit.Base;
        if (arguments.length > 1) {
            var src = MochiKit.DOM.getElement(arguments[0]);
            var sig = arguments[1];
            var obj = arguments[2];
            var func = arguments[3];
            for (var i = observers.length - 1; i >= 0; i--) {
                var o = observers[i];
                if (o[0] === src && o[1] === sig && o[4] === obj && o[5] === func) {
                    self._disconnect(o);
                    observers.splice(i, 1);
                    return true;
                }
            }
        } else {
            var idx = m.findIdentical(observers, ident);
            if (idx >= 0) {
                self._disconnect(ident);
                observers.splice(idx, 1);
                return true;
            }
        }
        return false;
    }, disconnectAll: function (src, sig) {
        src = MochiKit.DOM.getElement(src);
        var m = MochiKit.Base;
        var signals = m.flattenArguments(m.extend(null, arguments, 1));
        var self = MochiKit.Signal;
        var disconnect = self._disconnect;
        var observers = self._observers;
        if (signals.length === 0) {
            for (var i = observers.length - 1; i >= 0; i--) {
                var ident = observers[i];
                if (ident[0] === src) {
                    disconnect(ident);
                    observers.splice(i, 1);
                }
            }
        } else {
            var sigs = {};
            for (var i = 0; i < signals.length; i++) {
                sigs[signals[i]] = true;
            }
            for (var i = observers.length - 1; i >= 0; i--) {
                var ident = observers[i];
                if (ident[0] === src && ident[1] in sigs) {
                    disconnect(ident);
                    observers.splice(i, 1);
                }
            }
        }
    }, signal: function (src, sig) {
        var observers = MochiKit.Signal._observers;
        src = MochiKit.DOM.getElement(src);
        var args = MochiKit.Base.extend(null, arguments, 2);
        var errors = [];
        for (var i = 0; i < observers.length; i++) {
            var ident = observers[i];
            if (ident[0] === src && ident[1] === sig) {
                try {
                    ident[2].apply(src, args);
                } catch (e) {
                    errors.push(e);
                }
            }
        }
        if (errors.length == 1) {
            throw errors[0];
        } else {
            if (errors.length > 1) {
                var e = new Error("Multiple errors thrown in handling 'sig', see errors property");
                e.errors = errors;
                throw e;
            }
        }
    }
});
MochiKit.Signal.EXPORT_OK = [];
MochiKit.Signal.EXPORT = ["connect", "disconnect", "signal", "disconnectAll"];
MochiKit.Signal.__new__ = function (win) {
    var m = MochiKit.Base;
    this._document = document;
    this._window = win;
    try {
        this.connect(window, "onunload", this._unloadCache);
    } catch (e) {
    }
    this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
    m.nameFunctions(this);
};
MochiKit.Signal.__new__(this);
if (MochiKit.__export__) {
    connect = MochiKit.Signal.connect;
    disconnect = MochiKit.Signal.disconnect;
    disconnectAll = MochiKit.Signal.disconnectAll;
    signal = MochiKit.Signal.signal;
}
MochiKit.Base._exportSymbols(this, MochiKit.Signal);
MochiKit.Base.update(MochiKit.Base, {
    isIE: function () {
        return /MSIE/.test(navigator.userAgent);
    }, isGecko: function () {
        return /Gecko/.test(navigator.userAgent);
    }, isKHTML: function () {
        return /Konqueror|Safari|KHTML/.test(navigator.userAgent);
    }, isSafari: function () {
        return /AppleWebKit'/.test(navigator.appVersion);
    }, isOpera: function () {
        return /Opera/.test(navigator.userAgent);
    }
});
MochiKit.Base.update(MochiKit.DOM, {
    getStyle: function (element, style) {
        element = MochiKit.DOM.getElement(element);
        var value = element.style[MochiKit.Base.camelize(style)];
        if (!value) {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                var css = document.defaultView.getComputedStyle(element, null);
                value = css ? css.getPropertyValue(style) : null;
            } else {
                if (element.currentStyle) {
                    value = element.currentStyle[MochiKit.Base.camelize(style)];
                }
            }
        }
        if (MochiKit.Base.isOpera() && (MochiKit.Base.find(["left", "top", "right", "bottom"], style))) {
            if (MochiKit.DOM.getStyle(element, "position") == "static") {
                value = "auto";
            }
        }
        return value == "auto" ? null : value;
    }, setStyle: function (element, style) {
        element = MochiKit.DOM.getElement(element);
        for (name in style) {
            element.style[MochiKit.Base.camelize(name)] = style[name];
        }
    }, getOpacity: function (element) {
        var opacity;
        if (opacity = MochiKit.DOM.getStyle(element, "opacity")) {
            return parseFloat(opacity);
        }
        if (opacity = (MochiKit.DOM.getStyle(element, "filter") || "").match(/alpha\(opacity=(.*)\)/)) {
            if (opacity[1]) {
                return parseFloat(opacity[1]) / 100;
            }
        }
        return 1;
    }, getInlineOpacity: function (element) {
        return MochiKit.DOM.getElement(element).style.opacity || "";
    }, setOpacity: function (element, value) {
        element = MochiKit.DOM.getElement(element);
        if (value == 1) {
            MochiKit.DOM.setStyle(element, {opacity: (MochiKit.Base.isGecko() && !MochiKit.Base.isKHTML()) ? 0.999999 : null});
            if (MochiKit.Base.isIE()) {
                MochiKit.DOM.setStyle(element, {filter: MochiKit.DOM.getStyle(element, "filter").replace(/alpha\([^\)]*\)/gi, "")});
            }
        } else {
            if (value < 0.00001) {
                value = 0;
            }
            MochiKit.DOM.setStyle(element, {opacity: value});
            if (MochiKit.Base.isIE()) {
                MochiKit.DOM.setStyle(element, {filter: MochiKit.DOM.getStyle(element, "filter").replace(/alpha\([^\)]*\)/gi, "") + "alpha(opacity=" + value * 100 + ")"});
            }
        }
    }, isVisible: function (element) {
        return MochiKit.DOM.getElement(element).style.display != "none";
    }, makeClipping: function (element) {
        element = MochiKit.DOM.getElement(element);
        if (element._overflow) {
            return;
        }
        element._overflow = element.style.overflow;
        if ((MochiKit.DOM.getStyle(element, "overflow") || "visible") != "hidden") {
            element.style.overflow = "hidden";
        }
    }, undoClipping: function (element) {
        element = MochiKit.DOM.getElement(element);
        if (!element._overflow) {
            return;
        }
        element.style.overflow = element._overflow;
        element._overflow = undefined;
    }, makePositioned: function (element) {
        element = MochiKit.DOM.getElement(element);
        var pos = MochiKit.DOM.getStyle(element, "position");
        if ((pos == "static" || !pos) && !element._madePositioned) {
            element._madePositioned = true;
            element.style.position = "relative";
            if (MochiKit.Base.isOpera()) {
                element.style.top = 0;
                element.style.left = 0;
            }
        }
    }, undoPositioned: function (element) {
        element = MochiKit.DOM.getElement(element);
        if (element._madePositioned) {
            element._madePositioned = undefined;
            element.style.position = element.style.top = element.style.left = element.style.bottom = element.style.right = "";
        }
    }, getFirstElementByTagAndClassName: function (tagName, className, parent) {
        var self = MochiKit.DOM;
        if (typeof (tagName) == "undefined" || tagName === null) {
            tagName = "*";
        }
        if (typeof (parent) == "undefined" || parent === null) {
            parent = self._document;
        }
        parent = self.getElement(parent);
        var children = (parent.getElementsByTagName(tagName) || self._document.all);
        if (typeof (className) == "undefined" || className === null) {
            return MochiKit.Base.extend(null, children);
        }
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            var classNames = child.className.split(" ");
            for (var j = 0; j < classNames.length; j++) {
                if (classNames[j] == className) {
                    return child;
                }
            }
        }
    }, isParent: function (child, element) {
        if (!child.parentNode || child == element) {
            return false;
        }
        if (child.parentNode == element) {
            return true;
        }
        return MochiKit.DOM.isParent(child.parentNode, element);
    }
});
MochiKit.Position = {
    includeScrollOffsets: false, prepare: function () {
        var deltaX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        var deltaY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        this.windowOffset = new MochiKit.Style.Coordinates(deltaX, deltaY);
    }, cumulativeOffset: function (element) {
        var valueT = 0;
        var valueL = 0;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            element = element.offsetParent;
        } while (element);
        return new MochiKit.Style.Coordinates(valueL, valueT);
    }, realOffset: function (element) {
        var valueT = 0;
        var valueL = 0;
        do {
            valueT += element.scrollTop || 0;
            valueL += element.scrollLeft || 0;
            element = element.parentNode;
        } while (element);
        return new MochiKit.Style.Coordinates(valueL, valueT);
    }, within: function (element, x, y) {
        if (this.includeScrollOffsets) {
            return this.withinIncludingScrolloffsets(element, x, y);
        }
        this.xcomp = x;
        this.ycomp = y;
        this.offset = this.cumulativeOffset(element);
        if (element.style.position == "fixed") {
            this.offset.x += this.windowOffset.x;
            this.offset.y += this.windowOffset.y;
        }
        return (y >= this.offset.y && y < this.offset.y + element.offsetHeight && x >= this.offset.x && x < this.offset.x + element.offsetWidth);
    }, withinIncludingScrolloffsets: function (element, x, y) {
        var offsetcache = this.realOffset(element);
        this.xcomp = x + offsetcache.x - this.windowOffset.x;
        this.ycomp = y + offsetcache.y - this.windowOffset.y;
        this.offset = this.cumulativeOffset(element);
        return (this.ycomp >= this.offset.y && this.ycomp < this.offset.y + element.offsetHeight && this.xcomp >= this.offset.x && this.xcomp < this.offset.x + element.offsetWidth);
    }, overlap: function (mode, element) {
        if (!mode) {
            return 0;
        }
        if (mode == "vertical") {
            return ((this.offset.y + element.offsetHeight) - this.ycomp) / element.offsetHeight;
        }
        if (mode == "horizontal") {
            return ((this.offset.x + element.offsetWidth) - this.xcomp) / element.offsetWidth;
        }
    }, absolutize: function (element) {
        element = MochiKit.DOM.getElement(element);
        if (element.style.position == "absolute") {
            return;
        }
        MochiKit.Position.prepare();
        var offsets = MochiKit.Position.positionedOffset(element);
        var width = element.clientWidth;
        var height = element.clientHeight;
        var oldStyle = {
            "position": element.style.position,
            "left": offsets.x - parseFloat(element.style.left || 0),
            "top": offsets.y - parseFloat(element.style.top || 0),
            "width": element.style.width,
            "height": element.style.height
        };
        element.style.position = "absolute";
        element.style.top = offsets.y + "px";
        element.style.left = offsets.x + "px";
        element.style.width = width + "px";
        element.style.height = height + "px";
        return oldStyle;
    }, positionedOffset: function (element) {
        var valueT = 0, valueL = 0;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            element = element.offsetParent;
            if (element) {
                p = MochiKit.DOM.getStyle(element, "position");
                if (p == "relative" || p == "absolute") {
                    break;
                }
            }
        } while (element);
        return new MochiKit.Style.Coordinates(valueL, valueT);
    }, relativize: function (element, oldPos) {
        element = MochiKit.DOM.getElement(element);
        if (element.style.position == "relative") {
            return;
        }
        MochiKit.Position.prepare();
        var top = parseFloat(element.style.top || 0) - (oldPos["top"] || 0);
        var left = parseFloat(element.style.left || 0) - (oldPos["left"] || 0);
        element.style.position = oldPos["position"];
        element.style.top = top + "px";
        element.style.left = left + "px";
        element.style.width = oldPos["width"];
        element.style.height = oldPos["height"];
    }, clone: function (source, target) {
        source = MochiKit.DOM.getElement(source);
        target = MochiKit.DOM.getElement(target);
        target.style.position = "absolute";
        var offsets = this.cumulativeOffset(source);
        target.style.top = offsets.y + "px";
        target.style.left = offsets.x + "px";
        target.style.width = source.offsetWidth + "px";
        target.style.height = source.offsetHeight + "px";
    }, page: function (forElement) {
        var valueT = 0;
        var valueL = 0;
        var element = forElement;
        do {
            valueT += element.offsetTop || 0;
            valueL += element.offsetLeft || 0;
            if (element.offsetParent == document.body && MochiKit.DOM.getStyle(element, "position") == "absolute") {
                break;
            }
        } while (element = element.offsetParent);
        element = forElement;
        do {
            valueT -= element.scrollTop || 0;
            valueL -= element.scrollLeft || 0;
        } while (element = element.parentNode);
        return new MochiKit.Style.Coordinates(valueL, valueT);
    }
};
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Color");
    dojo.require("MochiKit.Base");
    dojo.require("MochiKit.DOM");
    dojo.require("MochiKit.Style");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
    JSAN.use("MochiKit.DOM", []);
    JSAN.use("MochiKit.Style", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Color depends on MochiKit.Base";
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Color depends on MochiKit.DOM";
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Color depends on MochiKit.Style";
}
if (typeof (MochiKit.Color) == "undefined") {
    MochiKit.Color = {};
}
MochiKit.Color.NAME = "MochiKit.Color";
MochiKit.Color.VERSION = "1.4";
MochiKit.Color.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.Color.toString = function () {
    return this.__repr__();
};
MochiKit.Color.Color = function (red, green, blue, alpha) {
    if (typeof (alpha) == "undefined" || alpha === null) {
        alpha = 1;
    }
    this.rgb = {r: red, g: green, b: blue, a: alpha};
};
MochiKit.Color.Color.prototype = {
    __class__: MochiKit.Color.Color, colorWithAlpha: function (alpha) {
        var rgb = this.rgb;
        var m = MochiKit.Color;
        return m.Color.fromRGB(rgb.r, rgb.g, rgb.b, alpha);
    }, colorWithHue: function (hue) {
        var hsl = this.asHSL();
        hsl.h = hue;
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    }, colorWithSaturation: function (saturation) {
        var hsl = this.asHSL();
        hsl.s = saturation;
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    }, colorWithLightness: function (lightness) {
        var hsl = this.asHSL();
        hsl.l = lightness;
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    }, darkerColorWithLevel: function (level) {
        var hsl = this.asHSL();
        hsl.l = Math.max(hsl.l - level, 0);
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    }, lighterColorWithLevel: function (level) {
        var hsl = this.asHSL();
        hsl.l = Math.min(hsl.l + level, 1);
        var m = MochiKit.Color;
        return m.Color.fromHSL(hsl);
    }, blendedColor: function (other, fraction) {
        if (typeof (fraction) == "undefined" || fraction === null) {
            fraction = 0.5;
        }
        var sf = 1 - fraction;
        var s = this.rgb;
        var d = other.rgb;
        var df = fraction;
        return MochiKit.Color.Color.fromRGB((s.r * sf) + (d.r * df), (s.g * sf) + (d.g * df), (s.b * sf) + (d.b * df), (s.a * sf) + (d.a * df));
    }, compareRGB: function (other) {
        var a = this.asRGB();
        var b = other.asRGB();
        return MochiKit.Base.compare([a.r, a.g, a.b, a.a], [b.r, b.g, b.b, b.a]);
    }, isLight: function () {
        return this.asHSL().b > 0.5;
    }, isDark: function () {
        return (!this.isLight());
    }, toHSLString: function () {
        var c = this.asHSL();
        var ccc = MochiKit.Color.clampColorComponent;
        var rval = this._hslString;
        if (!rval) {
            var mid = (ccc(c.h, 360).toFixed(0) + "," + ccc(c.s, 100).toPrecision(4) + "%" + "," + ccc(c.l, 100).toPrecision(4) + "%");
            var a = c.a;
            if (a >= 1) {
                a = 1;
                rval = "hsl(" + mid + ")";
            } else {
                if (a <= 0) {
                    a = 0;
                }
                rval = "hsla(" + mid + "," + a + ")";
            }
            this._hslString = rval;
        }
        return rval;
    }, toRGBString: function () {
        var c = this.rgb;
        var ccc = MochiKit.Color.clampColorComponent;
        var rval = this._rgbString;
        if (!rval) {
            var mid = (ccc(c.r, 255).toFixed(0) + "," + ccc(c.g, 255).toFixed(0) + "," + ccc(c.b, 255).toFixed(0));
            if (c.a != 1) {
                rval = "rgba(" + mid + "," + c.a + ")";
            } else {
                rval = "rgb(" + mid + ")";
            }
            this._rgbString = rval;
        }
        return rval;
    }, asRGB: function () {
        return MochiKit.Base.clone(this.rgb);
    }, toHexString: function () {
        var m = MochiKit.Color;
        var c = this.rgb;
        var ccc = MochiKit.Color.clampColorComponent;
        var rval = this._hexString;
        if (!rval) {
            rval = ("#" + m.toColorPart(ccc(c.r, 255)) + m.toColorPart(ccc(c.g, 255)) + m.toColorPart(ccc(c.b, 255)));
            this._hexString = rval;
        }
        return rval;
    }, asHSV: function () {
        var hsv = this.hsv;
        var c = this.rgb;
        if (typeof (hsv) == "undefined" || hsv === null) {
            hsv = MochiKit.Color.rgbToHSV(this.rgb);
            this.hsv = hsv;
        }
        return MochiKit.Base.clone(hsv);
    }, asHSL: function () {
        var hsl = this.hsl;
        var c = this.rgb;
        if (typeof (hsl) == "undefined" || hsl === null) {
            hsl = MochiKit.Color.rgbToHSL(this.rgb);
            this.hsl = hsl;
        }
        return MochiKit.Base.clone(hsl);
    }, toString: function () {
        return this.toRGBString();
    }, repr: function () {
        var c = this.rgb;
        var col = [c.r, c.g, c.b, c.a];
        return this.__class__.NAME + "(" + col.join(", ") + ")";
    }
};
MochiKit.Base.update(MochiKit.Color.Color, {
    fromRGB: function (red, green, blue, alpha) {
        var Color = MochiKit.Color.Color;
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            if (typeof (rgb.a) == "undefined") {
                alpha = undefined;
            } else {
                alpha = rgb.a;
            }
        }
        return new Color(red, green, blue, alpha);
    }, fromHSL: function (hue, saturation, lightness, alpha) {
        var m = MochiKit.Color;
        return m.Color.fromRGB(m.hslToRGB.apply(m, arguments));
    }, fromHSV: function (hue, saturation, value, alpha) {
        var m = MochiKit.Color;
        return m.Color.fromRGB(m.hsvToRGB.apply(m, arguments));
    }, fromName: function (name) {
        var Color = MochiKit.Color.Color;
        if (name.charAt(0) == '"') {
            name = name.substr(1, name.length - 2);
        }
        var htmlColor = Color._namedColors[name.toLowerCase()];
        if (typeof (htmlColor) == "string") {
            return Color.fromHexString(htmlColor);
        } else {
            if (name == "transparent") {
                return Color.transparentColor();
            }
        }
        return null;
    }, fromString: function (colorString) {
        var self = MochiKit.Color.Color;
        var three = colorString.substr(0, 3);
        if (three == "rgb") {
            return self.fromRGBString(colorString);
        } else {
            if (three == "hsl") {
                return self.fromHSLString(colorString);
            } else {
                if (colorString.charAt(0) == "#") {
                    return self.fromHexString(colorString);
                }
            }
        }
        return self.fromName(colorString);
    }, fromHexString: function (hexCode) {
        if (hexCode.charAt(0) == "#") {
            hexCode = hexCode.substring(1);
        }
        var components = [];
        var i, hex;
        if (hexCode.length == 3) {
            for (i = 0; i < 3; i++) {
                hex = hexCode.substr(i, 1);
                components.push(parseInt(hex + hex, 16) / 255);
            }
        } else {
            for (i = 0; i < 6; i += 2) {
                hex = hexCode.substr(i, 2);
                components.push(parseInt(hex, 16) / 255);
            }
        }
        var Color = MochiKit.Color.Color;
        return Color.fromRGB.apply(Color, components);
    }, _fromColorString: function (pre, method, scales, colorCode) {
        if (colorCode.indexOf(pre) === 0) {
            colorCode = colorCode.substring(colorCode.indexOf("(", 3) + 1, colorCode.length - 1);
        }
        var colorChunks = colorCode.split(/\s*,\s*/);
        var colorFloats = [];
        for (var i = 0; i < colorChunks.length; i++) {
            var c = colorChunks[i];
            var val;
            var three = c.substring(c.length - 3);
            if (c.charAt(c.length - 1) == "%") {
                val = 0.01 * parseFloat(c.substring(0, c.length - 1));
            } else {
                if (three == "deg") {
                    val = parseFloat(c) / 360;
                } else {
                    if (three == "rad") {
                        val = parseFloat(c) / (Math.PI * 2);
                    } else {
                        val = scales[i] * parseFloat(c);
                    }
                }
            }
            colorFloats.push(val);
        }
        return this[method].apply(this, colorFloats);
    }, fromComputedStyle: function (elem, style) {
        var d = MochiKit.DOM;
        var cls = MochiKit.Color.Color;
        for (elem = d.getElement(elem); elem; elem = elem.parentNode) {
            var actualColor = MochiKit.Style.computedStyle.apply(d, arguments);
            if (!actualColor) {
                continue;
            }
            var color = cls.fromString(actualColor);
            if (!color) {
                break;
            }
            if (color.asRGB().a > 0) {
                return color;
            }
        }
        return null;
    }, fromBackground: function (elem) {
        var cls = MochiKit.Color.Color;
        return cls.fromComputedStyle(elem, "backgroundColor", "background-color") || cls.whiteColor();
    }, fromText: function (elem) {
        var cls = MochiKit.Color.Color;
        return cls.fromComputedStyle(elem, "color", "color") || cls.blackColor();
    }, namedColors: function () {
        return MochiKit.Base.clone(MochiKit.Color.Color._namedColors);
    }
});
MochiKit.Base.update(MochiKit.Color, {
    clampColorComponent: function (v, scale) {
        v *= scale;
        if (v < 0) {
            return 0;
        } else {
            if (v > scale) {
                return scale;
            } else {
                return v;
            }
        }
    }, _hslValue: function (n1, n2, hue) {
        if (hue > 6) {
            hue -= 6;
        } else {
            if (hue < 0) {
                hue += 6;
            }
        }
        var val;
        if (hue < 1) {
            val = n1 + (n2 - n1) * hue;
        } else {
            if (hue < 3) {
                val = n2;
            } else {
                if (hue < 4) {
                    val = n1 + (n2 - n1) * (4 - hue);
                } else {
                    val = n1;
                }
            }
        }
        return val;
    }, hsvToRGB: function (hue, saturation, value, alpha) {
        if (arguments.length == 1) {
            var hsv = hue;
            hue = hsv.h;
            saturation = hsv.s;
            value = hsv.v;
            alpha = hsv.a;
        }
        var red;
        var green;
        var blue;
        if (saturation === 0) {
            red = 0;
            green = 0;
            blue = 0;
        } else {
            var i = Math.floor(hue * 6);
            var f = (hue * 6) - i;
            var p = value * (1 - saturation);
            var q = value * (1 - (saturation * f));
            var t = value * (1 - (saturation * (1 - f)));
            switch (i) {
                case 1:
                    red = q;
                    green = value;
                    blue = p;
                    break;
                case 2:
                    red = p;
                    green = value;
                    blue = t;
                    break;
                case 3:
                    red = p;
                    green = q;
                    blue = value;
                    break;
                case 4:
                    red = t;
                    green = p;
                    blue = value;
                    break;
                case 5:
                    red = value;
                    green = p;
                    blue = q;
                    break;
                case 6:
                case 0:
                    red = value;
                    green = t;
                    blue = p;
                    break;
            }
        }
        return {r: red, g: green, b: blue, a: alpha};
    }, hslToRGB: function (hue, saturation, lightness, alpha) {
        if (arguments.length == 1) {
            var hsl = hue;
            hue = hsl.h;
            saturation = hsl.s;
            lightness = hsl.l;
            alpha = hsl.a;
        }
        var red;
        var green;
        var blue;
        if (saturation === 0) {
            red = lightness;
            green = lightness;
            blue = lightness;
        } else {
            var m2;
            if (lightness <= 0.5) {
                m2 = lightness * (1 + saturation);
            } else {
                m2 = lightness + saturation - (lightness * saturation);
            }
            var m1 = (2 * lightness) - m2;
            var f = MochiKit.Color._hslValue;
            var h6 = hue * 6;
            red = f(m1, m2, h6 + 2);
            green = f(m1, m2, h6);
            blue = f(m1, m2, h6 - 2);
        }
        return {r: red, g: green, b: blue, a: alpha};
    }, rgbToHSV: function (red, green, blue, alpha) {
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            alpha = rgb.a;
        }
        var max = Math.max(Math.max(red, green), blue);
        var min = Math.min(Math.min(red, green), blue);
        var hue;
        var saturation;
        var value = max;
        if (min == max) {
            hue = 0;
            saturation = 0;
        } else {
            var delta = (max - min);
            saturation = delta / max;
            if (red == max) {
                hue = (green - blue) / delta;
            } else {
                if (green == max) {
                    hue = 2 + ((blue - red) / delta);
                } else {
                    hue = 4 + ((red - green) / delta);
                }
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {h: hue, s: saturation, v: value, a: alpha};
    }, rgbToHSL: function (red, green, blue, alpha) {
        if (arguments.length == 1) {
            var rgb = red;
            red = rgb.r;
            green = rgb.g;
            blue = rgb.b;
            alpha = rgb.a;
        }
        var max = Math.max(red, Math.max(green, blue));
        var min = Math.min(red, Math.min(green, blue));
        var hue;
        var saturation;
        var lightness = (max + min) / 2;
        var delta = max - min;
        if (delta === 0) {
            hue = 0;
            saturation = 0;
        } else {
            if (lightness <= 0.5) {
                saturation = delta / (max + min);
            } else {
                saturation = delta / (2 - max - min);
            }
            if (red == max) {
                hue = (green - blue) / delta;
            } else {
                if (green == max) {
                    hue = 2 + ((blue - red) / delta);
                } else {
                    hue = 4 + ((red - green) / delta);
                }
            }
            hue /= 6;
            if (hue < 0) {
                hue += 1;
            }
            if (hue > 1) {
                hue -= 1;
            }
        }
        return {h: hue, s: saturation, l: lightness, a: alpha};
    }, toColorPart: function (num) {
        num = Math.round(num);
        var digits = num.toString(16);
        if (num < 16) {
            return "0" + digits;
        }
        return digits;
    }, __new__: function () {
        var m = MochiKit.Base;
        this.Color.fromRGBString = m.bind(this.Color._fromColorString, this.Color, "rgb", "fromRGB", [1 / 255, 1 / 255, 1 / 255, 1]);
        this.Color.fromHSLString = m.bind(this.Color._fromColorString, this.Color, "hsl", "fromHSL", [1 / 360, 0.01, 0.01, 1]);
        var third = 1 / 3;
        var colors = {
            black: [0, 0, 0],
            blue: [0, 0, 1],
            brown: [0.6, 0.4, 0.2],
            cyan: [0, 1, 1],
            darkGray: [third, third, third],
            gray: [0.5, 0.5, 0.5],
            green: [0, 1, 0],
            lightGray: [2 * third, 2 * third, 2 * third],
            magenta: [1, 0, 1],
            orange: [1, 0.5, 0],
            purple: [0.5, 0, 0.5],
            red: [1, 0, 0],
            transparent: [0, 0, 0, 0],
            white: [1, 1, 1],
            yellow: [1, 1, 0]
        };
        var makeColor = function (name, r, g, b, a) {
            var rval = this.fromRGB(r, g, b, a);
            this[name] = function () {
                return rval;
            };
            return rval;
        };
        for (var k in colors) {
            var name = k + "Color";
            var bindArgs = m.concat([makeColor, this.Color, name], colors[k]);
            this.Color[name] = m.bind.apply(null, bindArgs);
        }
        var isColor = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!(arguments[i] instanceof Color)) {
                    return false;
                }
            }
            return true;
        };
        var compareColor = function (a, b) {
            return a.compareRGB(b);
        };
        m.nameFunctions(this);
        m.registerComparator(this.Color.NAME, isColor, compareColor);
        this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
    }
});
MochiKit.Color.EXPORT = ["Color"];
MochiKit.Color.EXPORT_OK = ["clampColorComponent", "rgbToHSL", "hslToRGB", "rgbToHSV", "hsvToRGB", "toColorPart"];
MochiKit.Color.__new__();
MochiKit.Base._exportSymbols(this, MochiKit.Color);
MochiKit.Color.Color._namedColors = {
    aliceblue: "#f0f8ff",
    antiquewhite: "#faebd7",
    aqua: "#00ffff",
    aquamarine: "#7fffd4",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    bisque: "#ffe4c4",
    black: "#000000",
    blanchedalmond: "#ffebcd",
    blue: "#0000ff",
    blueviolet: "#8a2be2",
    brown: "#a52a2a",
    burlywood: "#deb887",
    cadetblue: "#5f9ea0",
    chartreuse: "#7fff00",
    chocolate: "#d2691e",
    coral: "#ff7f50",
    cornflowerblue: "#6495ed",
    cornsilk: "#fff8dc",
    crimson: "#dc143c",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgoldenrod: "#b8860b",
    darkgray: "#a9a9a9",
    darkgreen: "#006400",
    darkgrey: "#a9a9a9",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkseagreen: "#8fbc8f",
    darkslateblue: "#483d8b",
    darkslategray: "#2f4f4f",
    darkslategrey: "#2f4f4f",
    darkturquoise: "#00ced1",
    darkviolet: "#9400d3",
    deeppink: "#ff1493",
    deepskyblue: "#00bfff",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1e90ff",
    firebrick: "#b22222",
    floralwhite: "#fffaf0",
    forestgreen: "#228b22",
    fuchsia: "#ff00ff",
    gainsboro: "#dcdcdc",
    ghostwhite: "#f8f8ff",
    gold: "#ffd700",
    goldenrod: "#daa520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#adff2f",
    grey: "#808080",
    honeydew: "#f0fff0",
    hotpink: "#ff69b4",
    indianred: "#cd5c5c",
    indigo: "#4b0082",
    ivory: "#fffff0",
    khaki: "#f0e68c",
    lavender: "#e6e6fa",
    lavenderblush: "#fff0f5",
    lawngreen: "#7cfc00",
    lemonchiffon: "#fffacd",
    lightblue: "#add8e6",
    lightcoral: "#f08080",
    lightcyan: "#e0ffff",
    lightgoldenrodyellow: "#fafad2",
    lightgray: "#d3d3d3",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightsalmon: "#ffa07a",
    lightseagreen: "#20b2aa",
    lightskyblue: "#87cefa",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#b0c4de",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    limegreen: "#32cd32",
    linen: "#faf0e6",
    magenta: "#ff00ff",
    maroon: "#800000",
    mediumaquamarine: "#66cdaa",
    mediumblue: "#0000cd",
    mediumorchid: "#ba55d3",
    mediumpurple: "#9370db",
    mediumseagreen: "#3cb371",
    mediumslateblue: "#7b68ee",
    mediumspringgreen: "#00fa9a",
    mediumturquoise: "#48d1cc",
    mediumvioletred: "#c71585",
    midnightblue: "#191970",
    mintcream: "#f5fffa",
    mistyrose: "#ffe4e1",
    moccasin: "#ffe4b5",
    navajowhite: "#ffdead",
    navy: "#000080",
    oldlace: "#fdf5e6",
    olive: "#808000",
    olivedrab: "#6b8e23",
    orange: "#ffa500",
    orangered: "#ff4500",
    orchid: "#da70d6",
    palegoldenrod: "#eee8aa",
    palegreen: "#98fb98",
    paleturquoise: "#afeeee",
    palevioletred: "#db7093",
    papayawhip: "#ffefd5",
    peachpuff: "#ffdab9",
    peru: "#cd853f",
    pink: "#ffc0cb",
    plum: "#dda0dd",
    powderblue: "#b0e0e6",
    purple: "#800080",
    red: "#ff0000",
    rosybrown: "#bc8f8f",
    royalblue: "#4169e1",
    saddlebrown: "#8b4513",
    salmon: "#fa8072",
    sandybrown: "#f4a460",
    seagreen: "#2e8b57",
    seashell: "#fff5ee",
    sienna: "#a0522d",
    silver: "#c0c0c0",
    skyblue: "#87ceeb",
    slateblue: "#6a5acd",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#fffafa",
    springgreen: "#00ff7f",
    steelblue: "#4682b4",
    tan: "#d2b48c",
    teal: "#008080",
    thistle: "#d8bfd8",
    tomato: "#ff6347",
    turquoise: "#40e0d0",
    violet: "#ee82ee",
    wheat: "#f5deb3",
    white: "#ffffff",
    whitesmoke: "#f5f5f5",
    yellow: "#ffff00",
    yellowgreen: "#9acd32"
};
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Iter");
    dojo.require("MochiKit.Base");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
}
try {
    if (typeof (MochiKit.Base) == "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Iter depends on MochiKit.Base!";
}
if (typeof (MochiKit.Iter) == "undefined") {
    MochiKit.Iter = {};
}
MochiKit.Iter.NAME = "MochiKit.Iter";
MochiKit.Iter.VERSION = "1.4";
MochiKit.Base.update(MochiKit.Iter, {
    __repr__: function () {
        return "[" + this.NAME + " " + this.VERSION + "]";
    }, toString: function () {
        return this.__repr__();
    }, registerIteratorFactory: function (name, check, iterfactory, override) {
        MochiKit.Iter.iteratorRegistry.register(name, check, iterfactory, override);
    }, iter: function (iterable, sentinel) {
        var self = MochiKit.Iter;
        if (arguments.length == 2) {
            return self.takewhile(function (a) {
                return a != sentinel;
            }, iterable);
        }
        if (typeof (iterable.next) == "function") {
            return iterable;
        } else {
            if (typeof (iterable.iter) == "function") {
                return iterable.iter();
            }
        }
        try {
            return self.iteratorRegistry.match(iterable);
        } catch (e) {
            var m = MochiKit.Base;
            if (e == m.NotFound) {
                e = new TypeError(typeof (iterable) + ": " + m.repr(iterable) + " is not iterable");
            }
            throw e;
        }
    }, count: function (n) {
        if (!n) {
            n = 0;
        }
        var m = MochiKit.Base;
        return {
            repr: function () {
                return "count(" + n + ")";
            }, toString: m.forwardCall("repr"), next: m.counter(n)
        };
    }, cycle: function (p) {
        var self = MochiKit.Iter;
        var m = MochiKit.Base;
        var lst = [];
        var iterator = self.iter(p);
        return {
            repr: function () {
                return "cycle(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                try {
                    var rval = iterator.next();
                    lst.push(rval);
                    return rval;
                } catch (e) {
                    if (e != self.StopIteration) {
                        throw e;
                    }
                    if (lst.length === 0) {
                        this.next = function () {
                            throw self.StopIteration;
                        };
                    } else {
                        var i = -1;
                        this.next = function () {
                            i = (i + 1) % lst.length;
                            return lst[i];
                        };
                    }
                    return this.next();
                }
            }
        };
    }, repeat: function (elem, n) {
        var m = MochiKit.Base;
        if (typeof (n) == "undefined") {
            return {
                repr: function () {
                    return "repeat(" + m.repr(elem) + ")";
                }, toString: m.forwardCall("repr"), next: function () {
                    return elem;
                }
            };
        }
        return {
            repr: function () {
                return "repeat(" + m.repr(elem) + ", " + n + ")";
            }, toString: m.forwardCall("repr"), next: function () {
                if (n <= 0) {
                    throw MochiKit.Iter.StopIteration;
                }
                n -= 1;
                return elem;
            }
        };
    }, next: function (iterator) {
        return iterator.next();
    }, izip: function (p, q) {
        var m = MochiKit.Base;
        var self = MochiKit.Iter;
        var next = self.next;
        var iterables = m.map(self.iter, arguments);
        return {
            repr: function () {
                return "izip(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                return m.map(next, iterables);
            }
        };
    }, ifilter: function (pred, seq) {
        var m = MochiKit.Base;
        seq = MochiKit.Iter.iter(seq);
        if (pred === null) {
            pred = m.operator.truth;
        }
        return {
            repr: function () {
                return "ifilter(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                while (true) {
                    var rval = seq.next();
                    if (pred(rval)) {
                        return rval;
                    }
                }
                return undefined;
            }
        };
    }, ifilterfalse: function (pred, seq) {
        var m = MochiKit.Base;
        seq = MochiKit.Iter.iter(seq);
        if (pred === null) {
            pred = m.operator.truth;
        }
        return {
            repr: function () {
                return "ifilterfalse(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                while (true) {
                    var rval = seq.next();
                    if (!pred(rval)) {
                        return rval;
                    }
                }
                return undefined;
            }
        };
    }, islice: function (seq) {
        var self = MochiKit.Iter;
        var m = MochiKit.Base;
        seq = self.iter(seq);
        var start = 0;
        var stop = 0;
        var step = 1;
        var i = -1;
        if (arguments.length == 2) {
            stop = arguments[1];
        } else {
            if (arguments.length == 3) {
                start = arguments[1];
                stop = arguments[2];
            } else {
                start = arguments[1];
                stop = arguments[2];
                step = arguments[3];
            }
        }
        return {
            repr: function () {
                return "islice(" + ["...", start, stop, step].join(", ") + ")";
            }, toString: m.forwardCall("repr"), next: function () {
                var rval;
                while (i < start) {
                    rval = seq.next();
                    i++;
                }
                if (start >= stop) {
                    throw self.StopIteration;
                }
                start += step;
                return rval;
            }
        };
    }, imap: function (fun, p, q) {
        var m = MochiKit.Base;
        var self = MochiKit.Iter;
        var iterables = m.map(self.iter, m.extend(null, arguments, 1));
        var map = m.map;
        var next = self.next;
        return {
            repr: function () {
                return "imap(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                return fun.apply(this, map(next, iterables));
            }
        };
    }, applymap: function (fun, seq, self) {
        seq = MochiKit.Iter.iter(seq);
        var m = MochiKit.Base;
        return {
            repr: function () {
                return "applymap(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                return fun.apply(self, seq.next());
            }
        };
    }, chain: function (p, q) {
        var self = MochiKit.Iter;
        var m = MochiKit.Base;
        if (arguments.length == 1) {
            return self.iter(arguments[0]);
        }
        var argiter = m.map(self.iter, arguments);
        return {
            repr: function () {
                return "chain(...)";
            }, toString: m.forwardCall("repr"), next: function () {
                while (argiter.length > 1) {
                    try {
                        return argiter[0].next();
                    } catch (e) {
                        if (e != self.StopIteration) {
                            throw e;
                        }
                        argiter.shift();
                    }
                }
                if (argiter.length == 1) {
                    var arg = argiter.shift();
                    this.next = m.bind("next", arg);
                    return this.next();
                }
                throw self.StopIteration;
            }
        };
    }, takewhile: function (pred, seq) {
        var self = MochiKit.Iter;
        seq = self.iter(seq);
        return {
            repr: function () {
                return "takewhile(...)";
            }, toString: MochiKit.Base.forwardCall("repr"), next: function () {
                var rval = seq.next();
                if (!pred(rval)) {
                    this.next = function () {
                        throw self.StopIteration;
                    };
                    this.next();
                }
                return rval;
            }
        };
    }, dropwhile: function (pred, seq) {
        seq = MochiKit.Iter.iter(seq);
        var m = MochiKit.Base;
        var bind = m.bind;
        return {
            "repr": function () {
                return "dropwhile(...)";
            }, "toString": m.forwardCall("repr"), "next": function () {
                while (true) {
                    var rval = seq.next();
                    if (!pred(rval)) {
                        break;
                    }
                }
                this.next = bind("next", seq);
                return rval;
            }
        };
    }, _tee: function (ident, sync, iterable) {
        sync.pos[ident] = -1;
        var m = MochiKit.Base;
        var listMin = m.listMin;
        return {
            repr: function () {
                return "tee(" + ident + ", ...)";
            }, toString: m.forwardCall("repr"), next: function () {
                var rval;
                var i = sync.pos[ident];
                if (i == sync.max) {
                    rval = iterable.next();
                    sync.deque.push(rval);
                    sync.max += 1;
                    sync.pos[ident] += 1;
                } else {
                    rval = sync.deque[i - sync.min];
                    sync.pos[ident] += 1;
                    if (i == sync.min && listMin(sync.pos) != sync.min) {
                        sync.min += 1;
                        sync.deque.shift();
                    }
                }
                return rval;
            }
        };
    }, tee: function (iterable, n) {
        var rval = [];
        var sync = {"pos": [], "deque": [], "max": -1, "min": -1};
        if (arguments.length == 1 || typeof (n) == "undefined" || n === null) {
            n = 2;
        }
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        var _tee = self._tee;
        for (var i = 0; i < n; i++) {
            rval.push(_tee(i, sync, iterable));
        }
        return rval;
    }, list: function (iterable) {
        var m = MochiKit.Base;
        if (typeof (iterable.slice) == "function") {
            return iterable.slice();
        } else {
            if (m.isArrayLike(iterable)) {
                return m.concat(iterable);
            }
        }
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        var rval = [];
        try {
            while (true) {
                rval.push(iterable.next());
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
            return rval;
        }
        return undefined;
    }, reduce: function (fn, iterable, initial) {
        var i = 0;
        var x = initial;
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        if (arguments.length < 3) {
            try {
                x = iterable.next();
            } catch (e) {
                if (e == self.StopIteration) {
                    e = new TypeError("reduce() of empty sequence with no initial value");
                }
                throw e;
            }
            i++;
        }
        try {
            while (true) {
                x = fn(x, iterable.next());
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
        }
        return x;
    }, range: function () {
        var start = 0;
        var stop = 0;
        var step = 1;
        if (arguments.length == 1) {
            stop = arguments[0];
        } else {
            if (arguments.length == 2) {
                start = arguments[0];
                stop = arguments[1];
            } else {
                if (arguments.length == 3) {
                    start = arguments[0];
                    stop = arguments[1];
                    step = arguments[2];
                } else {
                    throw new TypeError("range() takes 1, 2, or 3 arguments!");
                }
            }
        }
        if (step === 0) {
            throw new TypeError("range() step must not be 0");
        }
        return {
            next: function () {
                if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
                    throw MochiKit.Iter.StopIteration;
                }
                var rval = start;
                start += step;
                return rval;
            }, repr: function () {
                return "range(" + [start, stop, step].join(", ") + ")";
            }, toString: MochiKit.Base.forwardCall("repr")
        };
    }, sum: function (iterable, start) {
        if (typeof (start) == "undefined" || start === null) {
            start = 0;
        }
        var x = start;
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        try {
            while (true) {
                x += iterable.next();
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
        }
        return x;
    }, exhaust: function (iterable) {
        var self = MochiKit.Iter;
        iterable = self.iter(iterable);
        try {
            while (true) {
                iterable.next();
            }
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
        }
    }, forEach: function (iterable, func, self) {
        var m = MochiKit.Base;
        if (arguments.length > 2) {
            func = m.bind(func, self);
        }
        if (m.isArrayLike(iterable)) {
            try {
                for (var i = 0; i < iterable.length; i++) {
                    func(iterable[i]);
                }
            } catch (e) {
                if (e != MochiKit.Iter.StopIteration) {
                    throw e;
                }
            }
        } else {
            self = MochiKit.Iter;
            self.exhaust(self.imap(func, iterable));
        }
    }, every: function (iterable, func) {
        var self = MochiKit.Iter;
        try {
            self.ifilterfalse(func, iterable).next();
            return false;
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
            return true;
        }
    }, sorted: function (iterable, cmp) {
        var rval = MochiKit.Iter.list(iterable);
        if (arguments.length == 1) {
            cmp = MochiKit.Base.compare;
        }
        rval.sort(cmp);
        return rval;
    }, reversed: function (iterable) {
        var rval = MochiKit.Iter.list(iterable);
        rval.reverse();
        return rval;
    }, some: function (iterable, func) {
        var self = MochiKit.Iter;
        try {
            self.ifilter(func, iterable).next();
            return true;
        } catch (e) {
            if (e != self.StopIteration) {
                throw e;
            }
            return false;
        }
    }, iextend: function (lst, iterable) {
        if (MochiKit.Base.isArrayLike(iterable)) {
            for (var i = 0; i < iterable.length; i++) {
                lst.push(iterable[i]);
            }
        } else {
            var self = MochiKit.Iter;
            iterable = self.iter(iterable);
            try {
                while (true) {
                    lst.push(iterable.next());
                }
            } catch (e) {
                if (e != self.StopIteration) {
                    throw e;
                }
            }
        }
        return lst;
    }, groupby: function (iterable, keyfunc) {
        var m = MochiKit.Base;
        var self = MochiKit.Iter;
        if (arguments.length < 2) {
            keyfunc = m.operator.identity;
        }
        iterable = self.iter(iterable);
        var pk = undefined;
        var k = undefined;
        var v;

        function fetch() {
            v = iterable.next();
            k = keyfunc(v);
        }

        function eat() {
            var ret = v;
            v = undefined;
            return ret;
        }

        var first = true;
        return {
            repr: function () {
                return "groupby(...)";
            }, next: function () {
                while (k == pk) {
                    fetch();
                    if (first) {
                        first = false;
                        break;
                    }
                }
                pk = k;
                return [k, {
                    next: function () {
                        if (v == undefined) {
                            fetch();
                        }
                        if (k != pk) {
                            throw self.StopIteration;
                        }
                        return eat();
                    }
                }];
            }
        };
    }, groupby_as_array: function (iterable, keyfunc) {
        var m = MochiKit.Base;
        var self = MochiKit.Iter;
        if (arguments.length < 2) {
            keyfunc = m.operator.identity;
        }
        iterable = self.iter(iterable);
        var result = [];
        var first = true;
        var prev_key;
        while (true) {
            try {
                var value = iterable.next();
                var key = keyfunc(value);
            } catch (e) {
                if (e == self.StopIteration) {
                    break;
                }
                throw e;
            }
            if (first || key != prev_key) {
                var values = [];
                result.push([key, values]);
            }
            values.push(value);
            first = false;
            prev_key = key;
        }
        return result;
    }, arrayLikeIter: function (iterable) {
        var i = 0;
        return {
            repr: function () {
                return "arrayLikeIter(...)";
            }, toString: MochiKit.Base.forwardCall("repr"), next: function () {
                if (i >= iterable.length) {
                    throw MochiKit.Iter.StopIteration;
                }
                return iterable[i++];
            }
        };
    }, hasIterateNext: function (iterable) {
        return (iterable && typeof (iterable.iterateNext) == "function");
    }, iterateNextIter: function (iterable) {
        return {
            repr: function () {
                return "iterateNextIter(...)";
            }, toString: MochiKit.Base.forwardCall("repr"), next: function () {
                var rval = iterable.iterateNext();
                if (rval === null || rval === undefined) {
                    throw MochiKit.Iter.StopIteration;
                }
                return rval;
            }
        };
    }
});
MochiKit.Iter.EXPORT_OK = ["iteratorRegistry", "arrayLikeIter", "hasIterateNext", "iterateNextIter",];
MochiKit.Iter.EXPORT = ["StopIteration", "registerIteratorFactory", "iter", "count", "cycle", "repeat", "next", "izip", "ifilter", "ifilterfalse", "islice", "imap", "applymap", "chain", "takewhile", "dropwhile", "tee", "list", "reduce", "range", "sum", "exhaust", "forEach", "every", "sorted", "reversed", "some", "iextend", "groupby", "groupby_as_array"];
MochiKit.Iter.__new__ = function () {
    var m = MochiKit.Base;
    if (typeof (StopIteration) != "undefined") {
        this.StopIteration = StopIteration;
    } else {
        this.StopIteration = new m.NamedError("StopIteration");
    }
    this.iteratorRegistry = new m.AdapterRegistry();
    this.registerIteratorFactory("arrayLike", m.isArrayLike, this.arrayLikeIter);
    this.registerIteratorFactory("iterateNext", this.hasIterateNext, this.iterateNextIter);
    this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
    m.nameFunctions(this);
};
MochiKit.Iter.__new__();
if (MochiKit.__export__) {
    reduce = MochiKit.Iter.reduce;
}
MochiKit.Base._exportSymbols(this, MochiKit.Iter);
if (typeof (dojo) != "undefined") {
    dojo.provide("MochiKit.Visual");
    dojo.require("MochiKit.Base");
    dojo.require("MochiKit.DOM");
    dojo.require("MochiKit.Style");
    dojo.require("MochiKit.Color");
    dojo.require("MochiKit.Iter");
}
if (typeof (JSAN) != "undefined") {
    JSAN.use("MochiKit.Base", []);
    JSAN.use("MochiKit.DOM", []);
    JSAN.use("MochiKit.Style", []);
    JSAN.use("MochiKit.Color", []);
    JSAN.use("MochiKit.Iter", []);
}
try {
    if (typeof (MochiKit.Base) === "undefined" || typeof (MochiKit.DOM) === "undefined" || typeof (MochiKit.Style) === "undefined" || typeof (MochiKit.Color) === "undefined" || typeof (MochiKit.Iter) === "undefined") {
        throw"";
    }
} catch (e) {
    throw"MochiKit.Visual depends on MochiKit.Base, MochiKit.DOM, MochiKit.Style, MochiKit.Color and MochiKit.Iter!";
}
if (typeof (MochiKit.Visual) == "undefined") {
    MochiKit.Visual = {};
}
MochiKit.Visual.NAME = "MochiKit.Visual";
MochiKit.Visual.VERSION = "1.4";
MochiKit.Visual.__repr__ = function () {
    return "[" + this.NAME + " " + this.VERSION + "]";
};
MochiKit.Visual.toString = function () {
    return this.__repr__();
};
MochiKit.Visual._RoundCorners = function (e, options) {
    e = MochiKit.DOM.getElement(e);
    this._setOptions(options);
    if (this.options.__unstable__wrapElement) {
        e = this._doWrap(e);
    }
    var color = this.options.color;
    var C = MochiKit.Color.Color;
    if (this.options.color === "fromElement") {
        color = C.fromBackground(e);
    } else {
        if (!(color instanceof C)) {
            color = C.fromString(color);
        }
    }
    this.isTransparent = (color.asRGB().a <= 0);
    var bgColor = this.options.bgColor;
    if (this.options.bgColor === "fromParent") {
        bgColor = C.fromBackground(e.offsetParent);
    } else {
        if (!(bgColor instanceof C)) {
            bgColor = C.fromString(bgColor);
        }
    }
    this._roundCornersImpl(e, color, bgColor);
};
MochiKit.Visual._RoundCorners.prototype = {
    _doWrap: function (e) {
        var parent = e.parentNode;
        var doc = MochiKit.DOM.currentDocument();
        if (typeof (doc.defaultView) === "undefined" || doc.defaultView === null) {
            return e;
        }
        var style = doc.defaultView.getComputedStyle(e, null);
        if (typeof (style) === "undefined" || style === null) {
            return e;
        }
        var wrapper = MochiKit.DOM.DIV({
            "style": {
                display: "block",
                marginTop: style.getPropertyValue("padding-top"),
                marginRight: style.getPropertyValue("padding-right"),
                marginBottom: style.getPropertyValue("padding-bottom"),
                marginLeft: style.getPropertyValue("padding-left"),
                padding: "0px"
            }
        });
        wrapper.innerHTML = e.innerHTML;
        e.innerHTML = "";
        e.appendChild(wrapper);
        return e;
    }, _roundCornersImpl: function (e, color, bgColor) {
        if (this.options.border) {
            this._renderBorder(e, bgColor);
        }
        if (this._isTopRounded()) {
            this._roundTopCorners(e, color, bgColor);
        }
        if (this._isBottomRounded()) {
            this._roundBottomCorners(e, color, bgColor);
        }
    }, _renderBorder: function (el, bgColor) {
        var borderValue = "1px solid " + this._borderColor(bgColor);
        var borderL = "border-left: " + borderValue;
        var borderR = "border-right: " + borderValue;
        var style = "style='" + borderL + ";" + borderR + "'";
        el.innerHTML = "<div " + style + ">" + el.innerHTML + "</div>";
    }, _roundTopCorners: function (el, color, bgColor) {
        var corner = this._createCorner(bgColor);
        for (var i = 0; i < this.options.numSlices; i++) {
            corner.appendChild(this._createCornerSlice(color, bgColor, i, "top"));
        }
        el.style.paddingTop = 0;
        el.insertBefore(corner, el.firstChild);
    }, _roundBottomCorners: function (el, color, bgColor) {
        var corner = this._createCorner(bgColor);
        for (var i = (this.options.numSlices - 1); i >= 0; i--) {
            corner.appendChild(this._createCornerSlice(color, bgColor, i, "bottom"));
        }
        el.style.paddingBottom = 0;
        el.appendChild(corner);
    }, _createCorner: function (bgColor) {
        var dom = MochiKit.DOM;
        return dom.DIV({style: {backgroundColor: bgColor.toString()}});
    }, _createCornerSlice: function (color, bgColor, n, position) {
        var slice = MochiKit.DOM.SPAN();
        var inStyle = slice.style;
        inStyle.backgroundColor = color.toString();
        inStyle.display = "block";
        inStyle.height = "1px";
        inStyle.overflow = "hidden";
        inStyle.fontSize = "1px";
        var borderColor = this._borderColor(color, bgColor);
        if (this.options.border && n === 0) {
            inStyle.borderTopStyle = "solid";
            inStyle.borderTopWidth = "1px";
            inStyle.borderLeftWidth = "0px";
            inStyle.borderRightWidth = "0px";
            inStyle.borderBottomWidth = "0px";
            inStyle.height = "0px";
            inStyle.borderColor = borderColor.toString();
        } else {
            if (borderColor) {
                inStyle.borderColor = borderColor.toString();
                inStyle.borderStyle = "solid";
                inStyle.borderWidth = "0px 1px";
            }
        }
        if (!this.options.compact && (n == (this.options.numSlices - 1))) {
            inStyle.height = "2px";
        }
        this._setMargin(slice, n, position);
        this._setBorder(slice, n, position);
        return slice;
    }, _setOptions: function (options) {
        this.options = {
            corners: "all",
            color: "fromElement",
            bgColor: "fromParent",
            blend: true,
            border: false,
            compact: false,
            __unstable__wrapElement: false
        };
        MochiKit.Base.update(this.options, options);
        this.options.numSlices = (this.options.compact ? 2 : 4);
    }, _whichSideTop: function () {
        var corners = this.options.corners;
        if (this._hasString(corners, "all", "top")) {
            return "";
        }
        var has_tl = (corners.indexOf("tl") != -1);
        var has_tr = (corners.indexOf("tr") != -1);
        if (has_tl && has_tr) {
            return "";
        }
        if (has_tl) {
            return "left";
        }
        if (has_tr) {
            return "right";
        }
        return "";
    }, _whichSideBottom: function () {
        var corners = this.options.corners;
        if (this._hasString(corners, "all", "bottom")) {
            return "";
        }
        var has_bl = (corners.indexOf("bl") != -1);
        var has_br = (corners.indexOf("br") != -1);
        if (has_bl && has_br) {
            return "";
        }
        if (has_bl) {
            return "left";
        }
        if (has_br) {
            return "right";
        }
        return "";
    }, _borderColor: function (color, bgColor) {
        if (color == "transparent") {
            return bgColor;
        } else {
            if (this.options.border) {
                return this.options.border;
            } else {
                if (this.options.blend) {
                    return bgColor.blendedColor(color);
                }
            }
        }
        return "";
    }, _setMargin: function (el, n, corners) {
        var marginSize = this._marginSize(n) + "px";
        var whichSide = (corners == "top" ? this._whichSideTop() : this._whichSideBottom());
        var style = el.style;
        if (whichSide == "left") {
            style.marginLeft = marginSize;
            style.marginRight = "0px";
        } else {
            if (whichSide == "right") {
                style.marginRight = marginSize;
                style.marginLeft = "0px";
            } else {
                style.marginLeft = marginSize;
                style.marginRight = marginSize;
            }
        }
    }, _setBorder: function (el, n, corners) {
        var borderSize = this._borderSize(n) + "px";
        var whichSide = (corners == "top" ? this._whichSideTop() : this._whichSideBottom());
        var style = el.style;
        if (whichSide == "left") {
            style.borderLeftWidth = borderSize;
            style.borderRightWidth = "0px";
        } else {
            if (whichSide == "right") {
                style.borderRightWidth = borderSize;
                style.borderLeftWidth = "0px";
            } else {
                style.borderLeftWidth = borderSize;
                style.borderRightWidth = borderSize;
            }
        }
    }, _marginSize: function (n) {
        if (this.isTransparent) {
            return 0;
        }
        var o = this.options;
        if (o.compact && o.blend) {
            var smBlendedMarginSizes = [1, 0];
            return smBlendedMarginSizes[n];
        } else {
            if (o.compact) {
                var compactMarginSizes = [2, 1];
                return compactMarginSizes[n];
            } else {
                if (o.blend) {
                    var blendedMarginSizes = [3, 2, 1, 0];
                    return blendedMarginSizes[n];
                } else {
                    var marginSizes = [5, 3, 2, 1];
                    return marginSizes[n];
                }
            }
        }
    }, _borderSize: function (n) {
        var o = this.options;
        var borderSizes;
        if (o.compact && (o.blend || this.isTransparent)) {
            return 1;
        } else {
            if (o.compact) {
                borderSizes = [1, 0];
            } else {
                if (o.blend) {
                    borderSizes = [2, 1, 1, 1];
                } else {
                    if (o.border) {
                        borderSizes = [0, 2, 0, 0];
                    } else {
                        if (this.isTransparent) {
                            borderSizes = [5, 3, 2, 1];
                        } else {
                            return 0;
                        }
                    }
                }
            }
        }
        return borderSizes[n];
    }, _hasString: function (str) {
        for (var i = 1; i < arguments.length; i++) {
            if (str.indexOf(arguments[i]) != -1) {
                return true;
            }
        }
        return false;
    }, _isTopRounded: function () {
        return this._hasString(this.options.corners, "all", "top", "tl", "tr");
    }, _isBottomRounded: function () {
        return this._hasString(this.options.corners, "all", "bottom", "bl", "br");
    }, _hasSingleTextChild: function (el) {
        return (el.childNodes.length == 1 && el.childNodes[0].nodeType == 3);
    }
};
MochiKit.Visual.roundElement = function (e, options) {
    new MochiKit.Visual._RoundCorners(e, options);
};
MochiKit.Visual.roundClass = function (tagName, className, options) {
    var elements = MochiKit.DOM.getElementsByTagAndClassName(tagName, className);
    for (var i = 0; i < elements.length; i++) {
        MochiKit.Visual.roundElement(elements[i], options);
    }
};
MochiKit.Visual.tagifyText = function (element, tagifyStyle) {
    var tagifyStyle = tagifyStyle || "position:relative";
    if (MochiKit.Base.isIE()) {
        tagifyStyle += ";zoom:1";
    }
    element = MochiKit.DOM.getElement(element);
    var fe = MochiKit.Iter.forEach;
    fe(element.childNodes, function (child) {
        if (child.nodeType == 3) {
            fe(child.nodeValue.split(""), function (character) {
                element.insertBefore(MochiKit.DOM.SPAN({style: tagifyStyle}, character == " " ? String.fromCharCode(160) : character), child);
            });
            MochiKit.DOM.removeElement(child);
        }
    });
};
MochiKit.Visual.forceRerendering = function (element) {
    try {
        element = MochiKit.DOM.getElement(element);
        var n = document.createTextNode(" ");
        element.appendChild(n);
        element.removeChild(n);
    } catch (e) {
    }
};
MochiKit.Visual.multiple = function (elements, effect, options) {
    options = MochiKit.Base.update({speed: 0.1, delay: 0}, options || {});
    var masterDelay = options.delay;
    var index = 0;
    MochiKit.Iter.forEach(elements, function (innerelement) {
        options.delay = index * options.speed + masterDelay;
        new effect(innerelement, options);
        index += 1;
    });
};
MochiKit.Visual.PAIRS = {
    "slide": ["slideDown", "slideUp"],
    "blind": ["blindDown", "blindUp"],
    "appear": ["appear", "fade"],
    "size": ["grow", "shrink"]
};
MochiKit.Visual.toggle = function (element, effect, options) {
    element = MochiKit.DOM.getElement(element);
    effect = (effect || "appear").toLowerCase();
    options = MochiKit.Base.update({
        queue: {
            position: "end",
            scope: (element.id || "global"),
            limit: 1
        }
    }, options || {});
    var v = MochiKit.Visual;
    v[MochiKit.DOM.isVisible(element) ? v.PAIRS[effect][1] : v.PAIRS[effect][0]](element, options);
};
MochiKit.Visual.Transitions = {};
MochiKit.Visual.Transitions.linear = function (pos) {
    return pos;
};
MochiKit.Visual.Transitions.sinoidal = function (pos) {
    return (-Math.cos(pos * Math.PI) / 2) + 0.5;
};
MochiKit.Visual.Transitions.reverse = function (pos) {
    return 1 - pos;
};
MochiKit.Visual.Transitions.flicker = function (pos) {
    return ((-Math.cos(pos * Math.PI) / 4) + 0.75) + Math.random() / 4;
};
MochiKit.Visual.Transitions.wobble = function (pos) {
    return (-Math.cos(pos * Math.PI * (9 * pos)) / 2) + 0.5;
};
MochiKit.Visual.Transitions.pulse = function (pos) {
    return (Math.floor(pos * 10) % 2 == 0 ? (pos * 10 - Math.floor(pos * 10)) : 1 - (pos * 10 - Math.floor(pos * 10)));
};
MochiKit.Visual.Transitions.none = function (pos) {
    return 0;
};
MochiKit.Visual.Transitions.full = function (pos) {
    return 1;
};
MochiKit.Visual.ScopedQueue = function () {
    this.__init__();
};
MochiKit.Base.update(MochiKit.Visual.ScopedQueue.prototype, {
    __init__: function () {
        this.effects = [];
        this.interval = null;
    }, add: function (effect) {
        var timestamp = new Date().getTime();
        var position = (typeof (effect.options.queue) == "string") ? effect.options.queue : effect.options.queue.position;
        var fe = MochiKit.Iter.forEach;
        switch (position) {
            case"front":
                fe(this.effects, function (e) {
                    if (e.state == "idle") {
                        e.startOn += effect.finishOn;
                        e.finishOn += effect.finishOn;
                    }
                });
                break;
            case"end":
                var finish;
                fe(this.effects, function (e) {
                    var i = e.finishOn;
                    if (i >= (finish || i)) {
                        finish = i;
                    }
                });
                timestamp = finish || timestamp;
                break;
        }
        effect.startOn += timestamp;
        effect.finishOn += timestamp;
        if (!effect.options.queue.limit || this.effects.length < effect.options.queue.limit) {
            this.effects.push(effect);
        }
        if (!this.interval) {
            this.interval = setInterval(MochiKit.Base.bind(this.loop, this), 40);
        }
    }, remove: function (effect) {
        this.effects = MochiKit.Base.filter(function (e) {
            return e != effect;
        }, this.effects);
        if (this.effects.length == 0) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }, loop: function () {
        var timePos = new Date().getTime();
        MochiKit.Iter.forEach(this.effects, function (effect) {
            effect.loop(timePos);
        });
    }
});
MochiKit.Visual.Queues = {
    instances: {}, get: function (queueName) {
        if (typeof (queueName) != "string") {
            return queueName;
        }
        if (!this.instances[queueName]) {
            this.instances[queueName] = new MochiKit.Visual.ScopedQueue();
        }
        return this.instances[queueName];
    }
};
MochiKit.Visual.Queue = MochiKit.Visual.Queues.get("global");
MochiKit.Visual.DefaultOptions = {
    transition: MochiKit.Visual.Transitions.sinoidal,
    duration: 1,
    fps: 25,
    sync: false,
    from: 0,
    to: 1,
    delay: 0,
    queue: "parallel"
};
MochiKit.Visual.Base = function () {
};
MochiKit.Visual.Base.prototype = {
    __class__: MochiKit.Visual.Base, start: function (options) {
        var v = MochiKit.Visual;
        this.options = MochiKit.Base.setdefault(options || {}, v.DefaultOptions);
        this.currentFrame = 0;
        this.state = "idle";
        this.startOn = this.options.delay * 1000;
        this.finishOn = this.startOn + (this.options.duration * 1000);
        this.event("beforeStart");
        if (!this.options.sync) {
            v.Queues.get(typeof (this.options.queue) == "string" ? "global" : this.options.queue.scope).add(this);
        }
    }, loop: function (timePos) {
        if (timePos >= this.startOn) {
            if (timePos >= this.finishOn) {
                this.render(1);
                this.cancel();
                this.event("beforeFinish");
                this.finish();
                this.event("afterFinish");
                return;
            }
            var pos = (timePos - this.startOn) / (this.finishOn - this.startOn);
            var frame = Math.round(pos * this.options.fps * this.options.duration);
            if (frame > this.currentFrame) {
                this.render(pos);
                this.currentFrame = frame;
            }
        }
    }, render: function (pos) {
        if (this.state == "idle") {
            this.state = "running";
            this.event("beforeSetup");
            this.setup();
            this.event("afterSetup");
        }
        if (this.state == "running") {
            if (this.options.transition) {
                pos = this.options.transition(pos);
            }
            pos *= (this.options.to - this.options.from);
            pos += this.options.from;
            this.event("beforeUpdate");
            this.update(pos);
            this.event("afterUpdate");
        }
    }, cancel: function () {
        if (!this.options.sync) {
            MochiKit.Visual.Queues.get(typeof (this.options.queue) == "string" ? "global" : this.options.queue.scope).remove(this);
        }
        this.state = "finished";
    }, setup: function () {
    }, finish: function () {
    }, update: function (position) {
    }, event: function (eventName) {
        if (this.options[eventName + "Internal"]) {
            this.options[eventName + "Internal"](this);
        }
        if (this.options[eventName]) {
            this.options[eventName](this);
        }
    }, repr: function () {
        return "[" + this.__class__.NAME + ", options:" + MochiKit.Base.repr(this.options) + "]";
    }
};
MochiKit.Visual.Parallel = function (effects, options) {
    this.__init__(effects, options);
};
MochiKit.Visual.Parallel.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.Parallel.prototype, {
    __init__: function (effects, options) {
        this.effects = effects || [];
        this.start(options);
    }, update: function (position) {
        MochiKit.Iter.forEach(this.effects, function (effect) {
            effect.render(position);
        });
    }, finish: function () {
        MochiKit.Iter.forEach(this.effects, function (effect) {
            effect.render(1);
            effect.cancel();
            effect.event("beforeFinish");
            effect.finish();
            effect.event("afterFinish");
        });
    }
});
MochiKit.Visual.Opacity = function (element, options) {
    this.__init__(element, options);
};
MochiKit.Visual.Opacity.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.Opacity.prototype, {
    __init__: function (element, options) {
        var b = MochiKit.Base;
        var d = MochiKit.DOM;
        this.element = d.getElement(element);
        if (b.isIE() && (!this.element.currentStyle.hasLayout)) {
            d.setStyle(this.element, {zoom: 1});
        }
        options = b.update({from: d.getOpacity(this.element) || 0, to: 1}, options || {});
        this.start(options);
    }, update: function (position) {
        MochiKit.DOM.setOpacity(this.element, position);
    }
});
MochiKit.Visual.Move = function (element, options) {
    this.__init__(element, options);
};
MochiKit.Visual.Move.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.Move.prototype, {
    __init__: function (element, options) {
        this.element = MochiKit.DOM.getElement(element);
        options = MochiKit.Base.update({x: 0, y: 0, mode: "relative"}, options || {});
        this.start(options);
    }, setup: function () {
        var d = MochiKit.DOM;
        d.makePositioned(this.element);
        var s = this.element.style;
        var originalVisibility = s.visibility;
        var originalDisplay = s.display;
        if (originalDisplay == "none") {
            s.visibility = "hidden";
            s.display = "";
        }
        this.originalLeft = parseFloat(d.getStyle(this.element, "left") || "0");
        this.originalTop = parseFloat(d.getStyle(this.element, "top") || "0");
        if (this.options.mode == "absolute") {
            this.options.x -= this.originalLeft;
            this.options.y -= this.originalTop;
        }
        if (originalDisplay == "none") {
            s.visibility = originalVisibility;
            s.display = originalDisplay;
        }
    }, update: function (position) {
        MochiKit.DOM.setStyle(this.element, {
            left: Math.round(this.options.x * position + this.originalLeft) + "px",
            top: Math.round(this.options.y * position + this.originalTop) + "px"
        });
    }
});
MochiKit.Visual.Scale = function (element, percent, options) {
    this.__init__(element, percent, options);
};
MochiKit.Visual.Scale.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.Scale.prototype, {
    __init__: function (element, percent, options) {
        this.element = MochiKit.DOM.getElement(element);
        options = MochiKit.Base.update({
            scaleX: true,
            scaleY: true,
            scaleContent: true,
            scaleFromCenter: false,
            scaleMode: "box",
            scaleFrom: 100,
            scaleTo: percent
        }, options || {});
        this.start(options);
    }, setup: function () {
        this.restoreAfterFinish = this.options.restoreAfterFinish || false;
        this.elementPositioning = MochiKit.DOM.getStyle(this.element, "position");
        var fe = MochiKit.Iter.forEach;
        var b = MochiKit.Base.bind;
        this.originalStyle = {};
        fe(["top", "left", "width", "height", "fontSize"], b(function (k) {
            this.originalStyle[k] = this.element.style[k];
        }, this));
        this.originalTop = this.element.offsetTop;
        this.originalLeft = this.element.offsetLeft;
        var fontSize = MochiKit.DOM.getStyle(this.element, "font-size") || "100%";
        fe(["em", "px", "%"], b(function (fontSizeType) {
            if (fontSize.indexOf(fontSizeType) > 0) {
                this.fontSize = parseFloat(fontSize);
                this.fontSizeType = fontSizeType;
            }
        }, this));
        this.factor = (this.options.scaleTo - this.options.scaleFrom) / 100;
        if (/^content/.test(this.options.scaleMode)) {
            this.dims = [this.element.scrollHeight, this.element.scrollWidth];
        } else {
            if (this.options.scaleMode == "box") {
                this.dims = [this.element.offsetHeight, this.element.offsetWidth];
            } else {
                this.dims = [this.options.scaleMode.originalHeight, this.options.scaleMode.originalWidth];
            }
        }
    }, update: function (position) {
        var currentScale = (this.options.scaleFrom / 100) + (this.factor * position);
        if (this.options.scaleContent && this.fontSize) {
            MochiKit.DOM.setStyle(this.element, {fontSize: this.fontSize * currentScale + this.fontSizeType});
        }
        this.setDimensions(this.dims[0] * currentScale, this.dims[1] * currentScale);
    }, finish: function () {
        if (this.restoreAfterFinish) {
            MochiKit.DOM.setStyle(this.element, this.originalStyle);
        }
    }, setDimensions: function (height, width) {
        var d = {};
        if (this.options.scaleX) {
            d.width = Math.round(width) + "px";
        }
        if (this.options.scaleY) {
            d.height = Math.round(height) + "px";
        }
        if (this.options.scaleFromCenter) {
            var topd = (height - this.dims[0]) / 2;
            var leftd = (width - this.dims[1]) / 2;
            if (this.elementPositioning == "absolute") {
                if (this.options.scaleY) {
                    d.top = this.originalTop - topd + "px";
                }
                if (this.options.scaleX) {
                    d.left = this.originalLeft - leftd + "px";
                }
            } else {
                if (this.options.scaleY) {
                    d.top = -topd + "px";
                }
                if (this.options.scaleX) {
                    d.left = -leftd + "px";
                }
            }
        }
        MochiKit.DOM.setStyle(this.element, d);
    }
});
MochiKit.Visual.Highlight = function (element, options) {
    this.__init__(element, options);
};
MochiKit.Visual.Highlight.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.Highlight.prototype, {
    __init__: function (element, options) {
        this.element = MochiKit.DOM.getElement(element);
        options = MochiKit.Base.update({startcolor: "#ffff99"}, options || {});
        this.start(options);
    }, setup: function () {
        var d = MochiKit.DOM;
        var b = MochiKit.Base;
        if (d.getStyle(this.element, "display") == "none") {
            this.cancel();
            return;
        }
        this.oldStyle = {backgroundImage: d.getStyle(this.element, "background-image")};
        d.setStyle(this.element, {backgroundImage: "none"});
        if (!this.options.endcolor) {
            this.options.endcolor = MochiKit.Color.Color.fromBackground(this.element).toHexString();
        }
        if (!this.options.restorecolor) {
            this.options.restorecolor = d.getStyle(this.element, "background-color");
        }
        this._base = b.map(b.bind(function (i) {
            return parseInt(this.options.startcolor.slice(i * 2 + 1, i * 2 + 3), 16);
        }, this), [0, 1, 2]);
        this._delta = b.map(b.bind(function (i) {
            return parseInt(this.options.endcolor.slice(i * 2 + 1, i * 2 + 3), 16) - this._base[i];
        }, this), [0, 1, 2]);
    }, update: function (position) {
        var m = "#";
        MochiKit.Iter.forEach([0, 1, 2], MochiKit.Base.bind(function (i) {
            m += MochiKit.Color.toColorPart(Math.round(this._base[i] + this._delta[i] * position));
        }, this));
        MochiKit.DOM.setStyle(this.element, {backgroundColor: m});
    }, finish: function () {
        MochiKit.DOM.setStyle(this.element, MochiKit.Base.update(this.oldStyle, {backgroundColor: this.options.endcolor}));
    }
});
MochiKit.Visual.ScrollTo = function (element, options) {
    this.__init__(element, options);
};
MochiKit.Visual.ScrollTo.prototype = new MochiKit.Visual.Base();
MochiKit.Base.update(MochiKit.Visual.ScrollTo.prototype, {
    __init__: function (element, options) {
        this.element = MochiKit.DOM.getElement(element);
        this.start(options || {});
    }, setup: function () {
        var p = MochiKit.Position;
        p.prepare();
        var offsets = p.cumulativeOffset(this.element);
        if (this.options.offset) {
            offsets.y += this.options.offset;
        }
        var max;
        if (window.innerHeight) {
            max = window.innerHeight - window.height;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) {
                max = document.documentElement.clientHeight - document.body.scrollHeight;
            } else {
                if (document.body) {
                    max = document.body.clientHeight - document.body.scrollHeight;
                }
            }
        }
        this.scrollStart = p.windowOffset.y;
        this.delta = (offsets.y > max ? max : offsets.y) - this.scrollStart;
    }, update: function (position) {
        var p = MochiKit.Position;
        p.prepare();
        window.scrollTo(p.windowOffset.x, this.scrollStart + (position * this.delta));
    }
});
MochiKit.Visual.fade = function (element, options) {
    var d = MochiKit.DOM;
    var oldOpacity = d.getInlineOpacity(element);
    options = MochiKit.Base.update({
        from: d.getOpacity(element) || 1, to: 0, afterFinishInternal: function (effect) {
            if (effect.options.to !== 0) {
                return;
            }
            MochiKit.Style.hideElement(effect.element);
            d.setStyle(effect.element, {opacity: oldOpacity});
        }
    }, options || {});
    return new MochiKit.Visual.Opacity(element, options);
};
MochiKit.Visual.appear = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    options = MochiKit.Base.update({
        from: (d.getStyle(element, "display") == "none" ? 0 : d.getOpacity(element) || 0),
        to: 1,
        afterFinishInternal: function (effect) {
            v.forceRerendering(effect.element);
        },
        beforeSetupInternal: function (effect) {
            d.setOpacity(effect.element, effect.options.from);
            MochiKit.Style.showElement(effect.element);
        }
    }, options || {});
    return new v.Opacity(element, options);
};
MochiKit.Visual.puff = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    element = d.getElement(element);
    var oldStyle = {opacity: d.getInlineOpacity(element), position: d.getStyle(element, "position")};
    options = MochiKit.Base.update({
        beforeSetupInternal: function (effect) {
            d.setStyle(effect.effects[0].element, {position: "absolute"});
        }, afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.effects[0].element);
            d.setStyle(effect.effects[0].element, oldStyle);
        }
    }, options || {});
    return new v.Parallel([new v.Scale(element, 200, {
        sync: true,
        scaleFromCenter: true,
        scaleContent: true,
        restoreAfterFinish: true
    }), new v.Opacity(element, {sync: true, to: 0})], options);
};
MochiKit.Visual.blindUp = function (element, options) {
    var d = MochiKit.DOM;
    element = d.getElement(element);
    d.makeClipping(element);
    options = MochiKit.Base.update({
        scaleContent: false,
        scaleX: false,
        restoreAfterFinish: true,
        afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.element);
            d.undoClipping(effect.element);
        }
    }, options || {});
    return new MochiKit.Visual.Scale(element, 0, options);
};
MochiKit.Visual.blindDown = function (element, options) {
    var d = MochiKit.DOM;
    element = d.getElement(element);
    var elementDimensions = MochiKit.Style.getElementDimensions(element);
    options = MochiKit.Base.update({
        scaleContent: false,
        scaleX: false,
        scaleFrom: 0,
        scaleMode: {originalHeight: elementDimensions.h, originalWidth: elementDimensions.w},
        restoreAfterFinish: true,
        afterSetupInternal: function (effect) {
            d.makeClipping(effect.element);
            d.setStyle(effect.element, {height: "0px"});
            MochiKit.Style.showElement(effect.element);
        },
        afterFinishInternal: function (effect) {
            d.undoClipping(effect.element);
        }
    }, options || {});
    return new MochiKit.Visual.Scale(element, 100, options);
};
MochiKit.Visual.switchOff = function (element, options) {
    var d = MochiKit.DOM;
    element = d.getElement(element);
    var oldOpacity = d.getInlineOpacity(element);
    var options = MochiKit.Base.update({
        duration: 0.3,
        scaleFromCenter: true,
        scaleX: false,
        scaleContent: false,
        restoreAfterFinish: true,
        beforeSetupInternal: function (effect) {
            d.makePositioned(effect.element);
            d.makeClipping(effect.element);
        },
        afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.element);
            d.undoClipping(effect.element);
            d.undoPositioned(effect.element);
            d.setStyle(effect.element, {opacity: oldOpacity});
        }
    }, options || {});
    var v = MochiKit.Visual;
    return new v.appear(element, {
        duration: 0.4,
        from: 0,
        transition: v.Transitions.flicker,
        afterFinishInternal: function (effect) {
            new v.Scale(effect.element, 1, options);
        }
    });
};
MochiKit.Visual.dropOut = function (element, options) {
    var d = MochiKit.DOM;
    element = d.getElement(element);
    var oldStyle = {
        top: d.getStyle(element, "top"),
        left: d.getStyle(element, "left"),
        opacity: d.getInlineOpacity(element)
    };
    options = MochiKit.Base.update({
        duration: 0.5, beforeSetupInternal: function (effect) {
            d.makePositioned(effect.effects[0].element);
        }, afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.effects[0].element);
            d.undoPositioned(effect.effects[0].element);
            d.setStyle(effect.effects[0].element, oldStyle);
        }
    }, options || {});
    var v = MochiKit.Visual;
    return new v.Parallel([new v.Move(element, {x: 0, y: 100, sync: true}), new v.Opacity(element, {
        sync: true,
        to: 0
    })], options);
};
MochiKit.Visual.shake = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    element = d.getElement(element);
    options = MochiKit.Base.update({
        x: -20, y: 0, duration: 0.05, afterFinishInternal: function (effect) {
            d.undoPositioned(effect.element);
            d.setStyle(effect.element, oldStyle);
        }
    }, options || {});
    var oldStyle = {top: d.getStyle(element, "top"), left: d.getStyle(element, "left")};
    return new v.Move(element, {
        x: 20, y: 0, duration: 0.05, afterFinishInternal: function (effect) {
            new v.Move(effect.element, {
                x: -40, y: 0, duration: 0.1, afterFinishInternal: function (effect) {
                    new v.Move(effect.element, {
                        x: 40, y: 0, duration: 0.1, afterFinishInternal: function (effect) {
                            new v.Move(effect.element, {
                                x: -40,
                                y: 0,
                                duration: 0.1,
                                afterFinishInternal: function (effect) {
                                    new v.Move(effect.element, {
                                        x: 40,
                                        y: 0,
                                        duration: 0.1,
                                        afterFinishInternal: function (effect) {
                                            new v.Move(effect.element, options);
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
};
MochiKit.Visual.slideDown = function (element, options) {
    var d = MochiKit.DOM;
    var b = MochiKit.Base;
    element = d.getElement(element);
    if (!element.firstChild) {
        throw"MochiKit.Visual.slideDown must be used on a element with a child";
    }
    d.removeEmptyTextNodes(element);
    var oldInnerBottom = d.getStyle(element.firstChild, "bottom") || 0;
    var elementDimensions = MochiKit.Style.getElementDimensions(element);
    options = b.update({
        scaleContent: false,
        scaleX: false,
        scaleFrom: 0,
        scaleMode: {originalHeight: elementDimensions.h, originalWidth: elementDimensions.w},
        restoreAfterFinish: true,
        afterSetupInternal: function (effect) {
            d.makePositioned(effect.element);
            d.makePositioned(effect.element.firstChild);
            if (b.isOpera()) {
                d.setStyle(effect.element, {top: ""});
            }
            d.makeClipping(effect.element);
            d.setStyle(effect.element, {height: "0px"});
            MochiKit.Style.showElement(effect.element);
        },
        afterUpdateInternal: function (effect) {
            d.setStyle(effect.element.firstChild, {bottom: (effect.dims[0] - effect.element.clientHeight) + "px"});
        },
        afterFinishInternal: function (effect) {
            d.undoClipping(effect.element);
            if (b.isIE()) {
                d.undoPositioned(effect.element);
                d.undoPositioned(effect.element.firstChild);
            } else {
                d.undoPositioned(effect.element.firstChild);
                d.undoPositioned(effect.element);
            }
            d.setStyle(effect.element.firstChild, {bottom: oldInnerBottom});
        }
    }, options || {});
    return new MochiKit.Visual.Scale(element, 100, options);
};
MochiKit.Visual.slideUp = function (element, options) {
    var d = MochiKit.DOM;
    var b = MochiKit.Base;
    element = d.getElement(element);
    if (!element.firstChild) {
        throw"MochiKit.Visual.slideUp must be used on a element with a child";
    }
    d.removeEmptyTextNodes(element);
    var oldInnerBottom = d.getStyle(element.firstChild, "bottom");
    options = b.update({
        scaleContent: false,
        scaleX: false,
        scaleMode: "box",
        scaleFrom: 100,
        restoreAfterFinish: true,
        beforeStartInternal: function (effect) {
            d.makePositioned(effect.element);
            d.makePositioned(effect.element.firstChild);
            if (b.isOpera()) {
                d.setStyle(effect.element, {top: ""});
            }
            d.makeClipping(effect.element);
            MochiKit.Style.showElement(effect.element);
        },
        afterUpdateInternal: function (effect) {
            d.setStyle(effect.element.firstChild, {bottom: (effect.dims[0] - effect.element.clientHeight) + "px"});
        },
        afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.element);
            d.undoClipping(effect.element);
            d.undoPositioned(effect.element.firstChild);
            d.undoPositioned(effect.element);
            d.setStyle(effect.element.firstChild, {bottom: oldInnerBottom});
        }
    }, options || {});
    return new MochiKit.Visual.Scale(element, 0, options);
};
MochiKit.Visual.squish = function (element, options) {
    var d = MochiKit.DOM;
    var b = MochiKit.Base;
    options = b.update({
        restoreAfterFinish: true, beforeSetupInternal: function (effect) {
            d.makeClipping(effect.element);
        }, afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.element);
            d.undoClipping(effect.element);
        }
    }, options || {});
    return new MochiKit.Visual.Scale(element, b.isOpera() ? 1 : 0, options);
};
MochiKit.Visual.grow = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    element = d.getElement(element);
    options = MochiKit.Base.update({
        direction: "center",
        moveTransition: v.Transitions.sinoidal,
        scaleTransition: v.Transitions.sinoidal,
        opacityTransition: v.Transitions.full
    }, options || {});
    var oldStyle = {
        top: element.style.top,
        left: element.style.left,
        height: element.style.height,
        width: element.style.width,
        opacity: d.getInlineOpacity(element)
    };
    var dims = MochiKit.Style.getElementDimensions(element);
    var initialMoveX, initialMoveY;
    var moveX, moveY;
    switch (options.direction) {
        case"top-left":
            initialMoveX = initialMoveY = moveX = moveY = 0;
            break;
        case"top-right":
            initialMoveX = dims.w;
            initialMoveY = moveY = 0;
            moveX = -dims.w;
            break;
        case"bottom-left":
            initialMoveX = moveX = 0;
            initialMoveY = dims.h;
            moveY = -dims.h;
            break;
        case"bottom-right":
            initialMoveX = dims.w;
            initialMoveY = dims.h;
            moveX = -dims.w;
            moveY = -dims.h;
            break;
        case"center":
            initialMoveX = dims.w / 2;
            initialMoveY = dims.h / 2;
            moveX = -dims.w / 2;
            moveY = -dims.h / 2;
            break;
    }
    var optionsParallel = MochiKit.Base.update({
        beforeSetupInternal: function (effect) {
            d.setStyle(effect.effects[0].element, {height: "0px"});
            MochiKit.Style.showElement(effect.effects[0].element);
        }, afterFinishInternal: function (effect) {
            d.undoClipping(effect.effects[0].element);
            d.undoPositioned(effect.effects[0].element);
            d.setStyle(effect.effects[0].element, oldStyle);
        }
    }, options || {});
    return new v.Move(element, {
        x: initialMoveX,
        y: initialMoveY,
        duration: 0.01,
        beforeSetupInternal: function (effect) {
            MochiKit.Style.hideElement(effect.element);
            d.makeClipping(effect.element);
            d.makePositioned(effect.element);
        },
        afterFinishInternal: function (effect) {
            new v.Parallel([new v.Opacity(effect.element, {
                sync: true,
                to: 1,
                from: 0,
                transition: options.opacityTransition
            }), new v.Move(effect.element, {
                x: moveX,
                y: moveY,
                sync: true,
                transition: options.moveTransition
            }), new v.Scale(effect.element, 100, {
                scaleMode: {originalHeight: dims.h, originalWidth: dims.w},
                sync: true,
                scaleFrom: MochiKit.Base.isOpera() ? 1 : 0,
                transition: options.scaleTransition,
                restoreAfterFinish: true
            })], optionsParallel);
        }
    });
};
MochiKit.Visual.shrink = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    element = d.getElement(element);
    options = MochiKit.Base.update({
        direction: "center",
        moveTransition: v.Transitions.sinoidal,
        scaleTransition: v.Transitions.sinoidal,
        opacityTransition: v.Transitions.none
    }, options || {});
    var oldStyle = {
        top: element.style.top,
        left: element.style.left,
        height: element.style.height,
        width: element.style.width,
        opacity: d.getInlineOpacity(element)
    };
    var dims = MochiKit.Style.getElementDimensions(element);
    var moveX, moveY;
    switch (options.direction) {
        case"top-left":
            moveX = moveY = 0;
            break;
        case"top-right":
            moveX = dims.w;
            moveY = 0;
            break;
        case"bottom-left":
            moveX = 0;
            moveY = dims.h;
            break;
        case"bottom-right":
            moveX = dims.w;
            moveY = dims.h;
            break;
        case"center":
            moveX = dims.w / 2;
            moveY = dims.h / 2;
            break;
    }
    var optionsParallel = MochiKit.Base.update({
        beforeStartInternal: function (effect) {
            d.makePositioned(effect.effects[0].element);
            d.makeClipping(effect.effects[0].element);
        }, afterFinishInternal: function (effect) {
            MochiKit.Style.hideElement(effect.effects[0].element);
            d.undoClipping(effect.effects[0].element);
            d.undoPositioned(effect.effects[0].element);
            d.setStyle(effect.effects[0].element, oldStyle);
        }
    }, options || {});
    return new v.Parallel([new v.Opacity(element, {
        sync: true,
        to: 0,
        from: 1,
        transition: options.opacityTransition
    }), new v.Scale(element, MochiKit.Base.isOpera() ? 1 : 0, {
        sync: true,
        transition: options.scaleTransition,
        restoreAfterFinish: true
    }), new v.Move(element, {x: moveX, y: moveY, sync: true, transition: options.moveTransition})], optionsParallel);
};
MochiKit.Visual.pulsate = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    var b = MochiKit.Base;
    element = d.getElement(element);
    var oldOpacity = d.getInlineOpacity(element);
    options = b.update({
        duration: 3, from: 0, afterFinishInternal: function (effect) {
            d.setStyle(effect.element, {opacity: oldOpacity});
        }
    }, options || {});
    var transition = options.transition || v.Transitions.sinoidal;
    var reverser = b.bind(function (pos) {
        return transition(1 - v.Transitions.pulse(pos));
    }, transition);
    b.bind(reverser, transition);
    return new v.Opacity(element, b.update({transition: reverser}, options));
};
MochiKit.Visual.fold = function (element, options) {
    var d = MochiKit.DOM;
    var v = MochiKit.Visual;
    element = d.getElement(element);
    var oldStyle = {
        top: element.style.top,
        left: element.style.left,
        width: element.style.width,
        height: element.style.height
    };
    d.makeClipping(element);
    options = MochiKit.Base.update({
        scaleContent: false, scaleX: false, afterFinishInternal: function (effect) {
            new v.Scale(element, 1, {
                scaleContent: false, scaleY: false, afterFinishInternal: function (effect) {
                    MochiKit.Style.hideElement(effect.element);
                    d.undoClipping(effect.element);
                    d.setStyle(effect.element, oldStyle);
                }
            });
        }
    }, options || {});
    return new v.Scale(element, 5, options);
};
MochiKit.Visual.Color = MochiKit.Color.Color;
MochiKit.Visual.getElementsComputedStyle = MochiKit.DOM.computedStyle;
MochiKit.Visual.__new__ = function () {
    var m = MochiKit.Base;
    m.nameFunctions(this);
    this.EXPORT_TAGS = {":common": this.EXPORT, ":all": m.concat(this.EXPORT, this.EXPORT_OK)};
};
MochiKit.Visual.EXPORT = ["roundElement", "roundClass", "tagifyText", "multiple", "toggle", "Base", "Parallel", "Opacity", "Move", "Scale", "Highlight", "ScrollTo", "fade", "appear", "puff", "blindUp", "blindDown", "switchOff", "dropOut", "shake", "slideDown", "slideUp", "squish", "grow", "shrink", "pulsate", "fold"];
MochiKit.Visual.EXPORT_OK = ["PAIRS"];
MochiKit.Visual.__new__();
MochiKit.Base._exportSymbols(this, MochiKit.Visual);
var log4javascript;
(function () {
    function ff() {
        return function () {
        };
    }

    function copy(obj, props) {
        for (var i in props) {
            obj[i] = props[i];
        }
    }

    var f = ff();
    var Logger = ff();
    copy(Logger.prototype, {
        addAppender: f,
        removeAppender: f,
        removeAllAppenders: f,
        log: f,
        setLevel: f,
        getLevel: f,
        trace: f,
        debug: f,
        info: f,
        warn: f,
        error: f,
        fatal: f
    });
    var getLogger = function () {
        return new Logger();
    };
    log4javascript = {
        isStub: true,
        version: "dummy",
        logLog: {setQuietMode: f, setAlertAllErrors: f, debug: f, warn: f, error: f},
        addErrorListener: f,
        removeErrorListener: f,
        setEnabled: f,
        setShowStackTraces: f,
        isEnabled: f,
        evalInScope: f,
        getLogger: getLogger,
        getDefaultLogger: getLogger,
        getNullLogger: getLogger,
        Level: ff(),
        LoggingEvent: ff(),
        Layout: ff(),
        Appender: ff()
    };
    log4javascript.LoggingEvent.prototype = {getThrowableStrRep: f};
    log4javascript.Level.prototype = {toString: f, equals: f, isGreaterOrEqual: f};
    var level = new log4javascript.Level();
    copy(log4javascript.Level, {
        ALL: level,
        TRACE: level,
        DEBUG: level,
        INFO: level,
        WARN: level,
        ERROR: level,
        FATAL: level,
        OFF: level
    });
    log4javascript.Layout.prototype = {
        defaults: {},
        format: f,
        ignoresThrowable: f,
        getContentType: f,
        allowBatching: f,
        getDataValues: f,
        setKeys: f,
        setCustomField: f,
        hasCustomFields: f
    };
    log4javascript.SimpleLayout = ff();
    log4javascript.SimpleLayout.prototype = new log4javascript.Layout();
    log4javascript.XmlLayout = ff();
    log4javascript.XmlLayout.prototype = new log4javascript.Layout();
    log4javascript.XmlLayout.prototype.escapeCdata = f;
    log4javascript.JsonLayout = ff();
    log4javascript.JsonLayout.prototype = new log4javascript.Layout();
    copy(log4javascript.JsonLayout.prototype, {setReadable: f, isReadable: f});
    log4javascript.HttpPostDataLayout = ff();
    log4javascript.HttpPostDataLayout.prototype = new log4javascript.Layout();
    log4javascript.PatternLayout = ff();
    log4javascript.PatternLayout.prototype = new log4javascript.Layout();
    log4javascript.NullLayout = ff();
    log4javascript.NullLayout.prototype = new log4javascript.Layout();
    log4javascript.Appender = ff();
    log4javascript.Appender.prototype = {
        layout: new log4javascript.PatternLayout(),
        threshold: log4javascript.Level.ALL,
        doAppend: f,
        append: f,
        setLayout: f,
        getLayout: f,
        setThreshold: f,
        getThreshold: f,
        toString: f
    };
    log4javascript.AlertAppender = ff();
    log4javascript.AlertAppender.prototype = new log4javascript.Appender();
    log4javascript.ArrayAppender = ff();
    log4javascript.ArrayAppender.prototype = new log4javascript.Appender();
    log4javascript.AjaxAppender = ff();
    log4javascript.AjaxAppender.prototype = new log4javascript.Appender();
    copy(log4javascript.AjaxAppender.prototype, {
        isTimed: f,
        setTimed: f,
        getTimerInterval: f,
        setTimerInterval: f,
        isWaitForResponse: f,
        setWaitForResponse: f,
        getBatchSize: f,
        setBatchSize: f,
        setRequestSuccessCallback: f,
        setFailCallback: f,
        sendAll: f,
        defaults: {requestSuccessCallback: null, failCallback: null}
    });

    function ConsoleAppender() {
    }

    ConsoleAppender.prototype = new log4javascript.Appender();
    copy(ConsoleAppender.prototype, {
        create: f,
        isNewestMessageAtTop: f,
        setNewestMessageAtTop: f,
        isScrollToLatestMessage: f,
        setScrollToLatestMessage: f,
        getWidth: f,
        setWidth: f,
        getHeight: f,
        setHeight: f,
        getMaxMessages: f,
        setMaxMessages: f
    });
    log4javascript.InPageAppender = ff();
    log4javascript.InPageAppender.prototype = new ConsoleAppender();
    copy(log4javascript.InPageAppender.prototype, {
        isInitiallyMinimized: f,
        setInitiallyMinimized: f,
        hide: f,
        show: f,
        isVisible: f,
        close: f,
        defaults: {layout: new log4javascript.PatternLayout(), maxMessages: null}
    });
    log4javascript.InlineAppender = log4javascript.InPageAppender;
    log4javascript.PopUpAppender = ff();
    log4javascript.PopUpAppender.prototype = new ConsoleAppender();
    copy(log4javascript.PopUpAppender.prototype, {
        isUseOldPopUp: f,
        setUseOldPopUp: f,
        isComplainAboutPopUpBlocking: f,
        setComplainAboutPopUpBlocking: f,
        isFocusPopUp: f,
        setFocusPopUp: f,
        isReopenWhenClosed: f,
        setReopenWhenClosed: f,
        close: f,
        defaults: {layout: new log4javascript.PatternLayout(), maxMessages: null}
    });
    log4javascript.BrowserConsoleAppender = ff();
    log4javascript.BrowserConsoleAppender.prototype = new log4javascript.Appender();
})();
var log4javascript_dummy = log4javascript;
if (typeof bobj == "undefined") {
    bobj = {};
}
if (typeof bobj.external == "undefined") {
    bobj.external = {};
}
if (typeof bobj.external.date == "undefined") {
    bobj.external.date = {};
}
bobj.external.date.MONTH_NAMES = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
bobj.external.date.DAY_NAMES = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat");
bobj.external.date.LZ = function (x) {
    return (x < 0 || x > 9 ? "" : "0") + x;
};
bobj.external.date.isDate = function (val, format) {
    var date = bobj.external.date.getDateFromFormat(val, format);
    if (!date) {
        return false;
    }
    return true;
};
bobj.external.date.compareDates = function (date1, dateformat1, date2, dateformat2) {
    var d1 = bobj.external.date.getDateFromFormat(date1, dateformat1);
    var d2 = bobj.external.date.getDateFromFormat(date2, dateformat2);
    if (!d1 || !d2) {
        return -1;
    } else {
        if (d1.getTime() > d2.getTime()) {
            return 1;
        }
    }
    return 0;
};
bobj.external.date.formatDate = function (date, format) {
    format = format + "";
    var result = "";
    var i_format = 0;
    var c = "";
    var token = "";
    var y = date.getFullYear() + "";
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var E = date.getDay();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
    var value = new Object();
    while (y.length < 4) {
        y = "0" + y;
    }
    value["y"] = "" + y;
    value["yyyy"] = y;
    value["yy"] = y.substring(2, 4);
    value["Y"] = value["y"];
    value["YY"] = value["yy"];
    value["YYYY"] = value["yyyy"];
    value["M"] = M;
    value["MM"] = bobj.external.date.LZ(M);
    value["MMM"] = bobj.external.date.MONTH_NAMES[M - 1];
    value["NNN"] = bobj.external.date.MONTH_NAMES[M + 11];
    value["d"] = d;
    value["dd"] = bobj.external.date.LZ(d);
    value["D"] = value["d"];
    value["DD"] = value["dd"];
    value["E"] = bobj.external.date.DAY_NAMES[E + 7];
    value["EE"] = bobj.external.date.DAY_NAMES[E];
    value["H"] = H;
    value["HH"] = bobj.external.date.LZ(H);
    if (H == 0) {
        value["h"] = 12;
    } else {
        if (H > 12) {
            value["h"] = H - 12;
        } else {
            value["h"] = H;
        }
    }
    value["hh"] = bobj.external.date.LZ(value["h"]);
    if (H > 11) {
        value["K"] = H - 12;
    } else {
        value["K"] = H;
    }
    value["k"] = H + 1;
    value["KK"] = bobj.external.date.LZ(value["K"]);
    value["kk"] = bobj.external.date.LZ(value["k"]);
    if (H > 11) {
        value["a"] = "PM";
    } else {
        value["a"] = "AM";
    }
    value["m"] = m;
    value["mm"] = bobj.external.date.LZ(m);
    value["s"] = s;
    value["ss"] = bobj.external.date.LZ(s);
    while (i_format < format.length) {
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        if (value[token] != null) {
            result = result + value[token];
        } else {
            result = result + token;
        }
    }
    return result;
};
bobj.external.date._isInteger = function (val) {
    var digits = "1234567890";
    for (var i = 0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i)) == -1) {
            return false;
        }
    }
    return true;
};
bobj.external.date._getInt = function (str, i, minlength, maxlength) {
    for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (token.length < minlength) {
            return null;
        }
        if (bobj.external.date._isInteger(token)) {
            return token;
        }
    }
    return null;
};
bobj.external.date.getDateFromFormat = function (val, format) {
    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var token2 = "";
    var x, y;
    var year = null;
    var month = null;
    var date = null;
    var hh = null;
    var mm = null;
    var ss = null;
    var ampm = "";
    while (i_format < format.length) {
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        if (token == "yyyy" || token == "YYYY" || token == "yy" || token == "YY" || token == "y" || token == "Y") {
            if (token == "yyyy" || token == "YYYY") {
                x = 4;
                y = 4;
            }
            if (token == "yy" || token == "YY") {
                x = 2;
                y = 2;
            }
            if (token == "y" || token == "Y") {
                x = 2;
                y = 4;
            }
            year = bobj.external.date._getInt(val, i_val, x, y);
            if (year == null) {
                return null;
            }
            i_val += year.length;
            if (year.length == 2) {
                if (year > 70) {
                    year = 1900 + (year - 0);
                } else {
                    year = 2000 + (year - 0);
                }
            }
        } else {
            if (token == "MMM" || token == "NNN") {
                month = 0;
                for (var i = 0; i < bobj.external.date.MONTH_NAMES.length; i++) {
                    var month_name = bobj.external.date.MONTH_NAMES[i];
                    if (val.substring(i_val, i_val + month_name.length).toLowerCase() == month_name.toLowerCase()) {
                        if (token == "MMM" || (token == "NNN" && i > 11)) {
                            month = i + 1;
                            if (month > 12) {
                                month -= 12;
                            }
                            i_val += month_name.length;
                            break;
                        }
                    }
                }
                if ((month < 1) || (month > 12)) {
                    return null;
                }
            } else {
                if (token == "EE" || token == "E") {
                    for (var i = 0; i < bobj.external.date.DAY_NAMES.length; i++) {
                        var day_name = bobj.external.date.DAY_NAMES[i];
                        if (val.substring(i_val, i_val + day_name.length).toLowerCase() == day_name.toLowerCase()) {
                            i_val += day_name.length;
                            break;
                        }
                    }
                } else {
                    if (token == "MM" || token == "M") {
                        month = bobj.external.date._getInt(val, i_val, token.length, 2);
                        if (month == null || (month < 1) || (month > 12)) {
                            return null;
                        }
                        i_val += month.length;
                    } else {
                        if (token == "dd" || token == "DD" || token == "d" || token == "D") {
                            date = bobj.external.date._getInt(val, i_val, token.length, 2);
                            if (date == null || (date < 1) || (date > 31)) {
                                return null;
                            }
                            i_val += date.length;
                        } else {
                            if (token == "hh" || token == "h") {
                                hh = bobj.external.date._getInt(val, i_val, token.length, 2);
                                if (hh == null || (hh < 1) || (hh > 12)) {
                                    return null;
                                }
                                i_val += hh.length;
                            } else {
                                if (token == "HH" || token == "H") {
                                    hh = bobj.external.date._getInt(val, i_val, token.length, 2);
                                    if (hh == null || (hh < 0) || (hh > 23)) {
                                        return null;
                                    }
                                    i_val += hh.length;
                                } else {
                                    if (token == "KK" || token == "K") {
                                        hh = bobj.external.date._getInt(val, i_val, token.length, 2);
                                        if (hh == null || (hh < 0) || (hh > 11)) {
                                            return null;
                                        }
                                        i_val += hh.length;
                                    } else {
                                        if (token == "kk" || token == "k") {
                                            hh = bobj.external.date._getInt(val, i_val, token.length, 2);
                                            if (hh == null || (hh < 1) || (hh > 24)) {
                                                return null;
                                            }
                                            i_val += hh.length;
                                            hh--;
                                        } else {
                                            if (token == "mm" || token == "m") {
                                                mm = bobj.external.date._getInt(val, i_val, token.length, 2);
                                                if (mm == null || (mm < 0) || (mm > 59)) {
                                                    return null;
                                                }
                                                i_val += mm.length;
                                            } else {
                                                if (token == "ss" || token == "s") {
                                                    ss = bobj.external.date._getInt(val, i_val, token.length, 2);
                                                    if (ss == null || (ss < 0) || (ss > 59)) {
                                                        return null;
                                                    }
                                                    i_val += ss.length;
                                                } else {
                                                    if (token == "a") {
                                                        if (val.substring(i_val, i_val + 2).toLowerCase() == "am") {
                                                            ampm = "AM";
                                                        } else {
                                                            if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") {
                                                                ampm = "PM";
                                                            } else {
                                                                return null;
                                                            }
                                                        }
                                                        i_val += 2;
                                                    } else {
                                                        if (val.substring(i_val, i_val + token.length) != token) {
                                                            return null;
                                                        } else {
                                                            i_val += token.length;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (i_val != val.length) {
        return null;
    }
    if (month == 2) {
        if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
            if (date > 29) {
                return null;
            }
        } else {
            if (date > 28) {
                return null;
            }
        }
    }
    if ((month == 4) || (month == 6) || (month == 9) || (month == 11)) {
        if (date > 30) {
            return null;
        }
    }
    if (hh !== null) {
        if (hh < 12 && ampm == "PM") {
            hh = hh - 0 + 12;
        } else {
            if (hh > 11 && ampm == "AM") {
                hh -= 12;
            }
        }
    }
    var newDate = new Date(year, month - 1, date, hh, mm, ss);
    newDate.setFullYear(year);
    return newDate;
};
if (typeof bobj == "undefined") {
    bobj = {};
}
if (typeof bobj.external == "undefined") {
    bobj.external = {};
}
if (typeof bobj.external.json_parse == "undefined") {
    bobj.external.json_parse = {};
}
var at, ch, escapee = {'"': '"', "\\": "\\", "/": "/", b: "\b", f: "\f", n: "\n", r: "\r", t: "\t"}, text;
var error = function (m) {
    throw {name: "SyntaxError", message: m, at: at, text: text};
};
var next = function (c) {
    if (c && c !== ch) {
        error("Expected '" + c + "' instead of '" + ch + "'");
    }
    ch = text.charAt(at);
    at += 1;
    return ch;
};
var number = function () {
    var number, string = "";
    if (ch === "-") {
        string = "-";
        next("-");
    }
    while (ch >= "0" && ch <= "9") {
        string += ch;
        next();
    }
    if (ch === ".") {
        string += ".";
        while (next() && ch >= "0" && ch <= "9") {
            string += ch;
        }
    }
    if (ch === "e" || ch === "E") {
        string += ch;
        next();
        if (ch === "-" || ch === "+") {
            string += ch;
            next();
        }
        while (ch >= "0" && ch <= "9") {
            string += ch;
            next();
        }
    }
    number = +string;
    if (!isFinite(number)) {
        error("Bad number");
    } else {
        return number;
    }
};
var string = function () {
    var hex, i, string = "", uffff;
    if (ch === '"') {
        while (next()) {
            if (ch === '"') {
                next();
                return string;
            }
            if (ch === "\\") {
                next();
                if (ch === "u") {
                    uffff = 0;
                    for (i = 0; i < 4; i += 1) {
                        hex = parseInt(next(), 16);
                        if (!isFinite(hex)) {
                            break;
                        }
                        uffff = uffff * 16 + hex;
                    }
                    string += String.fromCharCode(uffff);
                } else {
                    if (typeof escapee[ch] === "string") {
                        string += escapee[ch];
                    } else {
                        break;
                    }
                }
            } else {
                string += ch;
            }
        }
    }
    error("Bad string");
};
var white = function () {
    while (ch && ch <= " ") {
        next();
    }
};
var word = function () {
    switch (ch) {
        case"t":
            next("t");
            next("r");
            next("u");
            next("e");
            return true;
        case"f":
            next("f");
            next("a");
            next("l");
            next("s");
            next("e");
            return false;
        case"n":
            next("n");
            next("u");
            next("l");
            next("l");
            return null;
    }
    error("Unexpected '" + ch + "'");
};
var value;
var array = function () {
    var array = [];
    if (ch === "[") {
        next("[");
        white();
        if (ch === "]") {
            next("]");
            return array;
        }
        while (ch) {
            array.push(value());
            white();
            if (ch === "]") {
                next("]");
                return array;
            }
            next(",");
            white();
        }
    }
    error("Bad array");
};
var object = function () {
    var key, object = {};
    if (ch === "{") {
        next("{");
        white();
        if (ch === "}") {
            next("}");
            return object;
        }
        while (ch) {
            key = string();
            white();
            next(":");
            if (Object.hasOwnProperty.call(object, key)) {
                error('Duplicate key "' + key + '"');
            }
            object[key] = value();
            white();
            if (ch === "}") {
                next("}");
                return object;
            }
            next(",");
            white();
        }
    }
    error("Bad object");
};
var value = function () {
    white();
    switch (ch) {
        case"{":
            return object();
        case"[":
            return array();
        case'"':
            return string();
        case"-":
            return number();
        default:
            return ch >= "0" && ch <= "9" ? number() : word();
    }
};
bobj.external.json_parse.parseJSONRequest = function (source) {
    var result;
    text = source.responseText;
    at = 0;
    ch = " ";
    result = value();
    white();
    if (ch) {
        error("Syntax error");
    }
    return result;
};
_ie = (document.all != null) ? true : false;
_dom = (document.getElementById != null) ? true : false;
_isQuirksMode = (document.compatMode != "CSS1Compat");
_show = "visible";
_hide = "hidden";
_hand = _ie ? "hand" : "pointer";
_appVer = navigator.appVersion.toLowerCase();
_mac = (_appVer.indexOf("macintosh") >= 0) || (_appVer.indexOf("macos") >= 0);
_userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : null;
_ctrl = 0;
_shift = 1;
_alt = 2;
_ie6 = _ie && (_appVer.indexOf("msie 5") < 0);
var docMode = document.documentMode;
var _ie9Up = (docMode >= 9);
var _ie11Up = (docMode >= 11);
_moz = _dom && !_ie && !_ie11Up;
_saf = _moz && (_userAgent.indexOf("safari") >= 0);
_small = (screen.height <= 600);
_curDoc = document;
_curWin = self;
_tooltipWin = self;
_tooltipDx = 0;
_tooltipDy = 0;
_codeWinName = "_CW";
_leftBtn = (_ie || _saf) ? 1 : 0;
_preloadArr = new Array;
_widgets = new Array;
_resizeW = _ie6 ? "col-resize" : "E-resize";
_resizeH = _ie6 ? "row-resize" : "S-resize";
_ddData = new Array;
_dontNeedEncoding = null;
_thex = null;

function initDom(skin, style, lang, curWin, codeUniqueName) {
    _skin = skin;
    _lang = lang;
    _style = style;
    if (curWin) {
        _curWin = curWin;
        _curDoc = curWin.document;
    }
    _tooltipWin = _curWin;
    if (codeUniqueName) {
        _codeWinName = "_CW" + codeUniqueName;
    }
    _curWin[_codeWinName] = self;
}

function styleSheet() {
    includeCSS("style");
}

function isLayerDisplayed(lyr) {
    var css = lyr ? lyr.style : null;
    if (css) {
        if (css.display == "none" || css.visibility == "hidden") {
            return false;
        } else {
            var par = lyr.parentNode;
            if (par != null) {
                return isLayerDisplayed(par);
            } else {
                return true;
            }
        }
    } else {
        return true;
    }
}

function safeSetFocus(lyr) {
    if (lyr && lyr.focus && isLayerDisplayed(lyr)) {
        lyr.focus();
    }
}

function newWidget(id) {
    var o = new Object;
    o.id = id;
    o.layer = null;
    o.css = null;
    o.getHTML = Widget_getHTML;
    o.beginHTML = Widget_getHTML;
    o.endHTML = Widget_getHTML;
    o.write = Widget_write;
    o.begin = Widget_begin;
    o.end = Widget_end;
    o.init = Widget_init;
    o.move = Widget_move;
    o.resize = Widget_resize;
    o.setBgColor = Widget_setBgColor;
    o.show = Widget_show;
    o.getWidth = Widget_getWidth;
    o.getHeight = Widget_getHeight;
    o.setHTML = Widget_setHTML;
    o.setDisabled = Widget_setDisabled;
    o.focus = Widget_focus;
    o.setDisplay = Widget_setDisplay;
    o.isDisplayed = Widget_isDisplayed;
    o.appendHTML = Widget_appendHTML;
    o.setTooltip = Widget_setTooltip;
    o.initialized = Widget_initialized;
    o.widx = _widgets.length;
    _widgets[o.widx] = o;
    return o;
}

function Widget_appendHTML() {
    append(_curDoc.body, this.getHTML());
}

function Widget_getHTML() {
    return "";
}

function Widget_write(i) {
    _curDoc.write(this.getHTML(i));
}

function Widget_begin() {
    _curDoc.write(this.beginHTML());
}

function Widget_end() {
    _curDoc.write(this.endHTML());
}

function Widget_init() {
    var o = this;
    o.layer = getLayer(o.id);
    o.css = o.layer.style;
    o.layer._widget = o.widx;
    if (o.initialHTML) {
        o.setHTML(o.initialHTML);
    }
}

function Widget_move(x, y) {
    var c = this.css;
    if (x != null) {
        if (_moz) {
            c.left = "" + x + "px";
        } else {
            c.pixelLeft = x;
        }
    }
    if (y != null) {
        if (_moz) {
            c.top = "" + y + "px";
        } else {
            c.pixelTop = y;
        }
    }
}

function Widget_focus() {
    safeSetFocus(this.layer);
}

function Widget_setBgColor(c) {
    this.css.backgroundColor = c;
}

function Widget_show(show) {
    this.css.visibility = show ? _show : _hide;
}

function Widget_getWidth() {
    return this.layer.offsetWidth;
}

function Widget_getHeight() {
    return this.layer.offsetHeight;
}

function Widget_setHTML(s) {
    var o = this;
    if (o.layer) {
        o.layer.innerHTML = s;
    } else {
        o.initialHTML = s;
    }
}

function Widget_setDisplay(d) {
    if (this.css) {
        this.css.display = d ? "" : "none";
    }
}

function Widget_isDisplayed() {
    if (this.css.display == "none") {
        return false;
    } else {
        return true;
    }
}

function Widget_setDisabled(d) {
    if (this.layer) {
        this.layer.disabled = d;
    }
}

function Widget_resize(w, h) {
    if (w != null) {
        this.css.width = "" + (Math.max(0, w)) + "px";
    }
    if (h != null) {
        this.css.height = "" + (Math.max(0, h)) + "px";
    }
}

function Widget_setTooltip(tooltip) {
    this.layer.title = tooltip;
}

function Widget_initialized() {
    return this.layer != null;
}

function newGrabberWidget(id, resizeCB, x, y, w, h, isHori, buttonCB, tooltip) {
    o = newWidget(id);
    o.resizeCB = resizeCB;
    o.x = x;
    o.y = y;
    o.w = w;
    o.h = h;
    o.dx = 0;
    o.dy = 0;
    o.min = null;
    o.max = null;
    o.isHori = isHori;
    o.preloaded = new Image;
    o.preloaded.src = _skin + "../resizepattern.gif";
    o.buttonCB = buttonCB;
    o.allowGrab = true;
    o.collapsed = false;
    o.isFromButton = false;
    o.showGrab = GrabberWidget_showGrab;
    o.setCollapsed = GrabberWidget_setCollapsed;
    o.tooltipButton = tooltip;
    o.getHTML = GrabberWidget_getHTML;
    o.enableGrab = GrabberWidget_enableGrab;
    o.setMinMax = GrabberWidget_setMinMax;
    if (window._allGrabbers == null) {
        window._allGrabbers = new Array;
    }
    o.index = _allGrabbers.length;
    _allGrabbers[o.index] = o;
    o.buttonLyr = null;
    o.setButtonImage = GrabberWidget_setButtonImage;
    o.getImgOffset = GrabberWidget_getImgOffset;
    return o;
}

function GrabberWidget_setCollapsed(collapsed, tooltip) {
    this.collapsed = collapsed;
    this.setButtonImage(false, tooltip);
}

function GrabberWidget_getImgOffset(isRollover) {
    var o = this;
    if (o.isHori) {
        o.dx = (o.collapsed ? 12 : 0) + (isRollover ? 6 : 0);
        o.dy = 0;
    } else {
        o.dy = (o.collapsed ? 12 : 0) + (isRollover ? 6 : 0);
        o.dx = 0;
    }
}

function GrabberWidget_setButtonImage(isRollover, tooltip) {
    var o = this;
    o.getImgOffset(isRollover);
    o.tooltipButton = tooltip;
    if (o.layer) {
        if (o.buttonLyr == null) {
            o.buttonLyr = getLayer("grabImg_" + o.id);
        }
        if (o.buttonLyr) {
            changeSimpleOffset(o.buttonLyr, o.dx, o.dy, null, tooltip);
        }
    }
}

function GrabberWidget_enableGrab(bEnable) {
    var o = this;
    o.allowGrab = bEnable;
    if (o.css) {
        o.css.cursor = o.allowGrab ? (o.isHori ? _resizeW : _resizeH) : "default";
    }
}

function GrabberWidget_getHTML() {
    var o = this, ho = o.isHori;
    var cr = o.allowGrab ? (ho ? _resizeW : _resizeH) : "default";
    var moveableCb = 'onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + ".GrabberWidget_down(event,'" + o.index + "',this);return false;\"";
    var imgG = _ie ? ('<img onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0" src="' + _skin + '../transp.gif" id="modal_' + o.id + '" style="z-index:10000;display:none;position:absolute;top:0px;left:0px;width:1px;height:1px;cursor:' + cr + '">') : ('<div onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0" id="modal_' + o.id + '" style="z-index:10000;display:none;position:absolute;top:0px;left:0px;width:1px;height:1px;cursor:' + cr + '"></div>');
    var button = o.buttonCB ? (_skin + (ho ? "h" : "v") + "grab.gif") : "";
    if (button) {
        button = simpleImgOffset(button, ho ? 6 : 50, ho ? 50 : 6, o.dx, o.dy, "grabImg_" + o.id, 'onmouseover="' + _codeWinName + ".GrabberWidget_buttonover(event,'" + o.index + '\',this);return false;" onmouseout="' + _codeWinName + ".GrabberWidget_buttonout(event,'" + o.index + '\',this);return false;" onmousedown="' + _codeWinName + ".GrabberWidget_button(event,'" + o.index + "',this);return false;\"", o.tooltipButton, "cursor:" + _hand + ";");
    }
    return getBGIframe("grabIframe_" + o.id) + imgG + '<table cellpadding="0" cellspacing="0" border="0" ' + moveableCb + ' id="' + o.id + '" style="overflow:hidden;position:absolute;left:' + o.x + "px;top:" + o.y + "px;width:" + o.w + "px;height:" + o.h + "px;cursor:" + cr + '"><tr><td align="center" valign="middle">' + button + "</td></table>";
}

function GrabberWidget_setMinMax(min, max) {
    this.min = min;
    this.max = max;
}

function GrabberWidget_button(e, index, lyr) {
    var o = _allGrabbers[index];
    o.isFromButton = true;
    lyr.onmouseup = eval("_curWin." + _codeWinName + ".GrabberWidget_buttonup");
}

function GrabberWidget_buttonover(e, index, lyr) {
    var o = _allGrabbers[index];
    o.setButtonImage(true);
}

function GrabberWidget_buttonout(e, index, lyr) {
    var o = _allGrabbers[index];
    o.setButtonImage(false);
}

function GrabberWidget_buttonup(e) {
    GrabberWidget_up(e);
}

function GrabberWidget_showGrab() {
    var o = this, mod = o.mod, ifr = o.iframe, stl = o.layer.style, st = mod.style;
    ifr.setDisplay(true);
}

function GrabberWidget_down(e, index, lyr) {
    var o = _allGrabbers[index];
    window._theGrabber = o;
    if (o.mod == null) {
        o.mod = getLayer("modal_" + o.id);
        o.iframe = newWidget("grabIframe_" + o.id);
        o.iframe.init();
    }
    o.mod.onmousemove = eval("_curWin." + _codeWinName + ".GrabberWidget_move");
    o.mod.onmouseup = eval("_curWin." + _codeWinName + ".GrabberWidget_up");
    o.grabStartPosx = parseInt(lyr.style.left);
    o.grabStartPosy = parseInt(lyr.style.top);
    o.grabStartx = eventGetX(e);
    o.grabStarty = eventGetY(e);
    var mod = o.mod, ifr = o.iframe, stl = o.layer.style, st = mod.style;
    stl.backgroundImage = "url('" + _skin + "../resizepattern.gif')";
    o.prevZ = stl.zIndex;
    stl.zIndex = 9999;
    ifr.css.zIndex = 9998;
    st.width = "100%";
    st.height = "100%";
    mod.style.display = "block";
    var p = getPos(o.layer);
    ifr.move(p.x, p.y);
    ifr.resize(o.getWidth(), o.getHeight());
    if (!o.isFromButton) {
        o.showGrab();
    }
    return false;
}

function GrabberWidget_move(e) {
    var o = _theGrabber, lyr = o.layer, mod = o.mod;
    if (o.isFromButton) {
        if (o.isHori) {
            var x = eventGetX(e), ox = o.grabStartx;
            if ((x < ox - 3) || (x > ox + 3)) {
                o.isFromButton = false;
            }
        } else {
            var Y = eventGetY(e), oy = o.grabStarty;
            if ((y < oy - 3) || (y > oy + 3)) {
                o.isFromButton = false;
            }
        }
        if (!o.isFromButton) {
            o.showGrab();
        }
    }
    if (!o.isFromButton) {
        if (o.allowGrab) {
            var x = o.isHori ? Math.max(0, o.grabStartPosx - o.grabStartx + eventGetX(e)) : null;
            var y = o.isHori ? null : Math.max(0, o.grabStartPosy - o.grabStarty + eventGetY(e));
            if (o.isHori) {
                if (o.min != null) {
                    x = Math.max(x, o.min);
                }
                if (o.max != null) {
                    x = Math.min(x, o.max);
                }
            } else {
                if (o.min != null) {
                    y = Math.max(y, o.min);
                }
                if (o.max != null) {
                    y = Math.min(y, o.max);
                }
            }
            eventCancelBubble(e);
            o.move(x, y);
            getPos(o.layer);
            if (o.buttonCB) {
                var bCss = o.buttonLyr.style;
                if (bCss.display != "none") {
                    bCss.display = "none";
                }
            }
            o.iframe.move(x, y);
        }
    }
}

function GrabberWidget_up(e) {
    var o = _theGrabber, lyr = o.layer, mod = o.mod, stl = lyr.style;
    stl.backgroundImage = "";
    stl.zIndex = o.prevZ;
    var ifr = o.iframe;
    ifr.move(-100, -100);
    ifr.resize(1, 1);
    ifr.setDisplay(false);
    eventCancelBubble(e);
    var st = mod.style;
    st.display = "none";
    st.width = "0px";
    st.height = "0px";
    if (o.buttonCB) {
        o.buttonLyr.style.display = "";
    }
    if (o && (o.isFromButton)) {
        if (o.buttonCB) {
            o.buttonCB();
        }
        o.isFromButton = false;
    }
    if (o.allowGrab && (!o.isFromButton)) {
        if (o.resizeCB) {
            o.resizeCB(parseInt(lyr.style.left), parseInt(lyr.style.top));
        }
    }
}

function newButtonWidget(id, label, cb, width, hlp, tooltip, tabIndex, margin, url, w, h, dx, dy, imgRight, disDx, disDy) {
    var o = newWidget(id);
    o.label = label;
    o.cb = cb;
    o.width = width;
    o.hlp = hlp;
    o.tooltip = tooltip;
    o.tabIndex = tabIndex;
    o.isGray = false;
    o.isDefault = false;
    o.txt = null;
    o.icn = null;
    o.margin = margin ? margin : 0;
    o.extraStyle = "";
    if (url) {
        o.url = url;
        o.w = w;
        o.h = h;
        o.dx = dx;
        o.dy = dy;
        o.disDx = (disDx != null) ? disDx : dx;
        o.disDy = (disDy != null) ? disDy : dy;
        o.imgRight = imgRight ? true : false;
    }
    o.getHTML = ButtonWidget_getHTML;
    o.setDisabled = ButtonWidget_setDisabled;
    o.setText = ButtonWidget_setText;
    o.changeImg = ButtonWidget_changeImg;
    o.oldInit = o.init;
    o.init = ButtonWidget_init;
    o.isDisabled = ButtonWidget_isDisabled;
    o.setDefaultButton = ButtonWidget_setDefaultButton;
    o.executeCB = ButtonWidget_executeCB;
    o.setTooltip = ButtonWidget_setTooltip;
    o.instIndex = ButtonWidget_currInst;
    ButtonWidget_inst[ButtonWidget_currInst++] = o;
    return o;
}

ButtonWidget_inst = new Array;
ButtonWidget_currInst = 0;

function ButtonWidget_getHTML() {
    with (this) {
        var clk = _codeWinName + ".ButtonWidget_clickCB(" + this.instIndex + ');return false;"';
        var clcbs = 'onclick="' + clk + '" ';
        if (_ie) {
            clcbs += 'ondblclick="' + clk + '" ';
        }
        var isDefaultSty = (this.isDefault && !this.isGray);
        clcbs += 'onkeydown=" return ' + _codeWinName + ".ButtonWidget_keydownCB(event," + this.instIndex + ');" ';
        var url1 = _skin + "button.gif",
            addPar = ' style="' + extraStyle + "cursor:" + _hand + ";margin-left:" + margin + "px; margin-right:" + margin + 'px; "' + clcbs + " ",
            tip = attr("title", tooltip), idText = "theBttn" + id, idIcon = "theBttnIcon" + id;
        var bg = backImgOffset(url1, 0, isDefaultSty ? 105 : 42);
        var lnkB = "<a " + attr("id", idText) + " " + tip + " " + attr("tabindex", tabIndex) + ' href="javascript:void(0)" class="wizbutton">';
        var l = (label != null);
        var im = (this.url ? ('<td align="' + (l ? (this.imgRight ? "right" : "left") : "center") + '" style="' + bg + '" width="' + (!l && (width != null) ? width + 6 : w + 6) + '">' + (l ? "" : lnkB) + simpleImgOffset(url, w, h, this.isGray ? disDs : dx, this.isGray ? disDy : dy, idIcon, null, (l ? "" : tooltip), "cursor:" + _hand) + (l ? "" : "</a>") + "</td>") : "");
        return '<table onmouseover="return true" ' + attr("id", id) + " " + addPar + ' border="0" cellspacing="0" cellpadding="0"><tr valign="middle">' + '<td height="21" width="5" style="' + backImgOffset(url1, 0, isDefaultSty ? 63 : 0) + '"></td>' + (this.imgRight ? "" : im) + (l ? ("<td " + attr("width", width) + attr("id", "theBttnCenterImg" + id) + ' align="center" class="' + (this.isGray ? "wizbuttongray" : "wizbutton") + '" style="padding-left:3px;padding-right:3px;' + bg + '"><nobr>' + lnkB + label + "</a></nobr></td>") : "") + (this.imgRight ? im : "") + '<td height="21" width="5" style="' + backImgOffset(url1, 0, isDefaultSty ? 84 : 21) + '"></td></tr></table>';
    }
}

function ButtonWidget_setDisabled(d) {
    var o = this, newCur = d ? "default" : _hand;
    o.isGray = d;
    if (o.layer) {
        var newClassName = d ? "wizbuttongray" : "wizbutton";
        if (o.txt.className != newClassName) {
            o.txt.className = newClassName;
            o.txt.style.cursor = newCur;
            o.css.cursor = newCur;
            if (o.icn) {
                changeSimpleOffset(o.icn, o.isGray ? o.disDx : o.dx, o.isGray ? o.disDy : o.dy);
                o.icn.style.cursor = newCur;
            }
            if (o.isDefault) {
                var isDefaultSty = !d, url = _skin + "button.gif";
                changeSimpleOffset(o.leftImg, 0, isDefaultSty ? 63 : 0, url);
                changeOffset(o.centerImg, 0, isDefaultSty ? 105 : 42, url);
                changeSimpleOffset(o.rightImg, 0, isDefaultSty ? 84 : 21, url);
            }
        }
    }
}

function ButtonWidget_setDefaultButton() {
    var o = this;
    if (o.layer) {
        var isDefaultSty = !o.isGray, url = _skin + "button.gif";
        changeSimpleOffset(o.leftImg, 0, isDefaultSty ? 63 : 0, url);
        changeOffset(o.centerImg, 0, isDefaultSty ? 105 : 42, url);
        changeSimpleOffset(o.rightImg, 0, isDefaultSty ? 84 : 21, url);
    }
    o.isDefault = true;
}

function ButtonWidget_isDisabled() {
    return this.isGray;
}

function ButtonWidget_setText(str) {
    this.txt.innerHTML = convStr(str);
}

function ButtonWidget_setTooltip(tooltip) {
    var o = this;
    o.tooltip = tooltip;
    o.layer.title = tooltip;
    if (o.txt) {
        o.txt.title = tooltip;
    }
    if (o.icn) {
        o.icn.title = tooltip;
    }
}

function ButtonWidget_init() {
    var o = this;
    o.oldInit();
    o.txt = getLayer("theBttn" + this.id);
    o.icn = getLayer("theBttnIcon" + this.id);
    o.leftImg = getLayer("theBttnLeftImg" + this.id);
    o.centerImg = getLayer("theBttnCenterImg" + this.id);
    o.rightImg = getLayer("theBttnRightImg" + this.id);
    var newClassName = o.isGray ? "wizbuttongray" : "wizbutton";
    if (o.txt.className != newClassName) {
        o.setDisabled(o.isGray);
    }
}

function ButtonWidget_changeImg(dx, dy, disDx, disDy, url, tooltip) {
    var o = this;
    if (url) {
        o.url = url;
    }
    if (dx != null) {
        o.dx = dx;
    }
    if (dy != null) {
        o.dy = dy;
    }
    if (disDx != null) {
        o.disDx = disDx;
    }
    if (disDy != null) {
        o.disDy = disDy;
    }
    if (tooltip != null) {
        o.tooltip = tooltip;
    }
    if (o.icn) {
        changeSimpleOffset(o.icn, o.isGray ? o.disDx : o.dx, o.isGray ? o.disDy : o.dy, o.url, o.tooltip);
    }
}

function ButtonWidget_clickCB(index) {
    var btn = ButtonWidget_inst[index];
    if (btn && !btn.isGray) {
        setTimeout("ButtonWidget_delayClickCB(" + index + ")", 1);
    }
}

function ButtonWidget_delayClickCB(index) {
    var btn = ButtonWidget_inst[index];
    btn.executeCB();
}

function ButtonWidget_executeCB() {
    var o = this;
    if (o.cb) {
        if (typeof o.cb != "string") {
            o.cb();
        } else {
            eval(o.cb);
        }
    }
}

function ButtonWidget_keydownCB(e, index) {
    var k = eventGetKey(e);
    var btn = ButtonWidget_inst[index];
    if (k == 13 && btn.cb) {
        eventCancelBubble(e);
    }
    return true;
}

function newScrolledZoneWidget(id, borderW, padding, w, h, bgClass) {
    var o = newWidget(id);
    o.borderW = borderW;
    o.padding = padding;
    o.w = w;
    o.h = h;
    o.oldResize = o.resize;
    o.beginHTML = ScrolledZoneWidget_beginHTML;
    o.endHTML = ScrolledZoneWidget_endHTML;
    o.resize = ScrolledZoneWidget_resize;
    o.bgClass = (bgClass) ? bgClass : "insetBorder";
    return o;
}

function ScrolledZoneWidget_beginHTML() {
    var w = this.w, h = this.h;
    var ofs = _moz ? 2 * (this.borderW + this.padding) : 0;
    if (typeof (w) == "number") {
        if (_moz) {
            w = Math.max(0, w - ofs);
        }
        w = "" + w + "px";
    }
    if (typeof (h) == "number") {
        if (_moz) {
            h = Math.max(0, h - ofs);
        }
        h = "" + h + "px";
    }
    return '<div align="left" onselectstart="return false" class="' + this.bgClass + '" id="' + this.id + '" style="border-width:' + this.borderW + "px;padding:" + this.padding + "px;" + sty("width", w) + sty("height", h) + 'overflow:auto">';
}

function ScrolledZoneWidget_endHTML() {
    return "</div>";
}

function ScrolledZoneWidget_resize(w, h) {
    if (_moz) {
        var ofs = 2 * (this.borderW + this.padding);
        if (w != null) {
            w = Math.max(0, w - ofs);
        }
        if (h != null) {
            h = Math.max(0, h - ofs);
        }
    }
    this.oldResize(w, h);
}

function newComboWidget(id, changeCB, noMargin, width, tooltip) {
    var o = newWidget(id);
    o.tooltip = tooltip;
    o.size = 1;
    o.getHTML = ComboWidget_getHTML;
    o.beginHTML = ComboWidget_beginHTML;
    o.endHTML = ComboWidget_endHTML;
    o.changeCB = changeCB;
    o.noMargin = noMargin;
    o.width = width == null ? null : "" + width + "px";
    o.add = ComboWidget_add;
    o.del = ComboWidget_del;
    o.getSelection = ComboWidget_getSelection;
    o.select = ComboWidget_select;
    o.valueSelect = ComboWidget_valueSelect;
    o.getCount = ComboWidget_getCount;
    o.oldSetDisabled = o.setDisabled;
    o.setDisabled = ComboWidget_setDisabled;
    o.setUndefined = ComboWidget_setUndefined;
    o.delByID = ComboWidget_delByID;
    o.move = ComboWidget_move;
    o.findByValue = ComboWidget_findByValue;
    o.findByText = ComboWidget_findByText;
    o.getValue = ComboWidget_getValue;
    o.isGrayed = ComboWidget_isGrayed;
    o.isDisabled = false;
    o.multi = false;
    o.undef = false;
    o.isCombo = true;
    o.undefId = o.id + "__undef";
    o.disabledId = o.id + "__disabled";
    return o;
}

_extrCmbS = (_moz ? "font-size:12px;" : "");

function ComboWidget_beginHTML() {
    var o = this, _extrCmbS = ((_moz && !o.isCombo) ? "font-size:12px;" : "");
    return "<select " + (o.multi ? "multiple" : "") + " " + (o.noMargin ? 'style="' + sty("width", o.width) + _extrCmbS + '"' : 'style="' + sty("width", o.width) + "margin-left:10px;" + _extrCmbS + '"') + ' class="listinputs" ' + attr("onchange", _codeWinName + ".ComboWidget_changeCB(event,this)") + attr("onclick", _codeWinName + ".ComboWidget_clickCB(event,this)") + attr("ondblclick", _codeWinName + ".ComboWidget_dblClickCB(event,this)") + attr("onkeyup", _codeWinName + ".ComboWidget_keyUpCB(event,this)") + attr("onkeydown", _codeWinName + ".ComboWidget_keyDownCB(event,this)") + attr("id", o.id) + attr("name", o.id) + attr("title", o.tooltip) + 'size="' + o.size + '">';
}

function ComboWidget_endHTML() {
    return "</select>";
}

function ComboWidget_getHTML(inner) {
    return this.beginHTML() + (inner ? inner : "") + this.endHTML();
}

function ComboWidget_add(s, val, sel, id, grayed) {
    var e = this.layer, opt = _curDoc.createElement("option");
    if (_ie) {
        e.options.add(opt);
    } else {
        e.appendChild(opt);
    }
    if (opt.innerText != null) {
        opt.innerText = s;
    } else {
        opt.innerHTML = convStr(s);
    }
    opt.value = val;
    if (id != null) {
        opt.id = id;
    }
    if (sel) {
        opt.selected = true;
    }
    if (grayed) {
        opt.style.color = "gray";
    }
    return opt;
}

function ComboWidget_move(delta) {
    var e = this.layer, i = e.selectedIndex, len = e.options.length - 1, newI = i + delta;
    if ((i == -1) || (newI < 0) || (newI > len)) {
        return false;
    }
    var oldOpt = e.options[i], newOpt = e.options[newI];
    var oldVal = oldOpt.value, oldHTML = oldOpt.innerHTML, oldID = oldOpt.id, newID = newOpt.id,
        oldColor = oldOpt.style.color, newColor = newOpt.style.color;
    oldOpt.value = newOpt.value;
    oldOpt.innerHTML = newOpt.innerHTML;
    newOpt.id = null;
    oldOpt.id = newOpt.id;
    oldOpt.style.color = newColor;
    newOpt.value = oldVal;
    newOpt.innerHTML = oldHTML;
    newOpt.id = oldID;
    newOpt.style.color = oldColor;
    e.selectedIndex = newI;
    return true;
}

function ComboWidget_getSelection() {
    var e = this.layer, i = e.selectedIndex;
    if (i < 0) {
        return null;
    }
    var ret = new Object;
    ret.index = i;
    ret.value = e.options[i].value;
    ret.text = e.options[i].text;
    return ret;
}

function ComboWidget_select(i) {
    var o = this, e = o.layer, len = e.options.length;
    if (i == null) {
        e.selectedIndex = -1;
    }
    if ((i < 0) || (i >= len)) {
        i = len - 1;
    }
    if (i >= 0) {
        e.selectedIndex = i;
    }
    o.setUndefined(false);
}

function ComboWidget_valueSelect(v) {
    var o = this, e = o.layer, opts = e.options, len = opts.length;
    for (var i = 0; i < len; i++) {
        if (opts[i].value == v) {
            opts[i].selected = true;
            o.setUndefined(false);
            break;
        }
    }
}

function ComboWidget_del(i) {
    var e = this.layer;
    if (i == null) {
        e.options.length = 0;
    } else {
        if (_ie) {
            e.remove(i);
        } else {
            e.options[i] = null;
        }
        this.select(i);
    }
}

function ComboWidget_changeCB(e, l) {
    var o = getWidget(l);
    if (o.changeCB) {
        o.changeCB(e);
    }
}

function ComboWidget_clickCB(e, l) {
    var o = getWidget(l);
    if (o.clickCB) {
        o.clickCB(e);
    }
}

function ComboWidget_dblClickCB(e, l) {
    var o = getWidget(l);
    if (o.dblClickCB) {
        o.dblClickCB(e);
    }
}

function ComboWidget_keyUpCB(e, l) {
    var o = getWidget(l);
    if (o.keyUpCB) {
        o.keyUpCB(e);
    }
}

function ComboWidget_keyDownCB(e, l) {
    var k = eventGetKey(e);
    var o = getWidget(l);
    if (o.isCombo && (k == 27 || k == 13)) {
        eventCancelBubble(e);
    } else {
        if (k == 13 && o.keyUpCB) {
            eventCancelBubble(e);
        }
    }
}

function ComboWidget_getCount() {
    return this.layer.options.length;
}

function ComboWidget_delByID(id) {
    var opt = getLayer(id);
    if (opt != null) {
        this.del(opt.index);
    }
    opt = null;
}

function ComboWidget_setDisabled(d, addEmptyElt) {
    var o = this;
    o.oldSetDisabled(d);
    o.isDisabled = d;
    if (d == true) {
        var old = getLayer(o.disabledId);
        if (old == null) {
            o.add("", "", true, o.disabledId);
        } else {
            o.layer.selectedIndex = old.index;
        }
    } else {
        o.delByID(o.disabledId);
    }
}

function ComboWidget_setUndefined(u) {
    var o = this;
    o.undef = u;
    if (u == true) {
        var old = getLayer(o.undefId);
        if (old == null) {
            o.add("", "", true, o.undefId);
        } else {
            o.layer.selectedIndex = old.index;
        }
    } else {
        o.delByID(o.undefId);
    }
}

function ComboWidget_findByValue(val) {
    var o = this, e = o.layer, opts = e.options, len = opts.length;
    for (var i = 0; i < len; i++) {
        if (opts[i].value == val) {
            var ret = new Object;
            ret.index = i;
            ret.value = e.options[i].value;
            ret.text = e.options[i].text;
            return ret;
        }
    }
    return null;
}

function ComboWidget_findByText(txt) {
    var o = this, e = o.layer, opts = e.options, len = opts.length;
    for (var i = 0; i < len; i++) {
        if (opts[i].text == txt) {
            var ret = new Object;
            ret.index = i;
            ret.value = e.options[i].value;
            ret.text = e.options[i].text;
            return ret;
        }
    }
    return null;
}

function ComboWidget_getValue(i) {
    var o = this, e = o.layer, opts = e.options, len = opts.length;
    if (i == null || i < 0 || i > len) {
        return null;
    }
    var ret = new Object;
    ret.index = i;
    ret.value = e.options[i].value;
    return ret;
}

function ComboWidget_isGrayed(i) {
    var o = this, e = o.layer, opts = e.options, len = opts.length;
    if (i == null || i < 0 || i > len) {
        return false;
    }
    return (e.options[i].style.color == "gray");
}

function newListWidget(id, changeCB, multi, width, lines, tooltip, dblClickCB, keyUpCB, clickCB) {
    var o = newComboWidget(id, changeCB, true, width, tooltip);
    o.clickCB = clickCB;
    o.dblClickCB = dblClickCB;
    o.keyUpCB = keyUpCB;
    o.size = lines;
    o.multi = multi;
    o.getMultiSelection = ListWidget_getMultiSelection;
    o.setUndefined = ListWidget_setUndefined;
    o.isUndefined = ListWidget_isUndefined;
    o.change = ListWidget_change;
    o.isCombo = false;
    return o;
}

function ListWidget_setUndefined(u) {
    var o = this;
    o.undef = u;
    if (u == true) {
        o.layer.selectedIndex = -1;
    }
}

function ListWidget_isUndefined() {
    return (this.layer.selectedIndex == -1);
}

function ListWidget_getMultiSelection() {
    var e = this.layer, rets = new Array, len = e.options.length;
    for (var i = 0; i < len; i++) {
        var opt = e.options[i];
        if (opt.selected) {
            var ret = new Object;
            ret.index = i;
            ret.value = opt.value;
            ret.text = opt.text;
            rets[rets.length] = ret;
        }
    }
    return rets;
}

function ListWidget_change(multi, lines) {
    var o = this;
    if (multi != null) {
        o.multi = multi;
        o.layer.multiple = multi;
    }
    if (lines != null) {
        o.size = lines;
        o.layer.size = lines;
    }
}

function newInfoWidget(id, title, boldTitle, text, height) {
    var o = newWidget(id);
    o.title = title ? title : "";
    o.boldTitle = boldTitle ? boldTitle : "";
    o.text = text ? text : "";
    o.height = (height != null) ? height : 55;
    o.getHTML = InfoWidget_getHTML;
    o.setText = InfoWidget_setText;
    o.setTitle = InfoWidget_setTitle;
    o.setTitleBold = InfoWidget_setTitleBold;
    o.oldResize = o.resize;
    o.resize = InfoWidget_resize;
    o.textLayer = null;
    return o;
}

function InfoWidget_setText(text, isHTML) {
    var o = this;
    text = text ? text : "";
    o.text = text;
    if (o.layer) {
        var l = o.textLayer;
        if (l == null) {
            l = o.textLayer = getLayer("infozone_" + o.id);
        }
        if (l) {
            l.innerHTML = isHTML ? text : convStr(text, false, true);
        }
    }
}

function InfoWidget_setTitle(text) {
    var o = this;
    text = text ? text : "";
    o.title = text;
    if (o.layer) {
        var l = o.titleLayer;
        if (l == null) {
            l = o.titleLayer = getLayer("infotitle_" + o.id);
        }
        if (l) {
            l.innerHTML = convStr(text);
        }
    }
}

function InfoWidget_setTitleBold(text) {
    var o = this;
    text = text ? text : "";
    o.boldTitle = text;
    if (o.layer) {
        var l = o.titleLayerBold;
        if (l == null) {
            l = o.titleLayerBold = getLayer("infotitlebold_" + o.id);
        }
        if (l) {
            l.innerHTML = convStr(text);
        }
    }
}

function InfoWidget_getHTML() {
    var o = this;
    return '<div class="dialogzone" align="left" style="overflow:hidden;' + sty("width", o.width) + sty("height", "" + o.height + "px") + '" id="' + o.id + '">' + "<nobr>" + img(_skin + "../help.gif", 16, 16, "top", null, _helpLab) + '<span class="dialogzone" style="padding-left:5px" id="infotitle_' + o.id + '">' + convStr(o.title) + '</span><span style="padding-left:5px" class="dialogzonebold" id="infotitlebold_' + o.id + '">' + convStr(o.boldTitle) + "</span></nobr>" + "<br>" + getSpace(1, 2) + '<div class="infozone" align="left" id="infozone_' + o.id + '" style="height:' + (o.height - 18 - (_moz ? 10 : 0)) + "px;overflow" + (_ie ? "-y" : "") + ':auto">' + convStr(o.text, false, true) + "</div>" + "</div>";
}

function InfoWidget_resize(w, h) {
    var o = this;
    if (w != null) {
        o.w = w;
    }
    if (h != null) {
        o.h = h;
    }
    o.oldResize(w, h);
    if (o.layer) {
        var l = o.textLayer;
        if (l == null) {
            l = o.textLayer = getLayer("infozone_" + o.id);
        }
        if (l) {
            if (o.h != null) {
                l.style.height = "" + Math.max(0, o.h - (_ie ? 18 : 28)) + "px";
            }
        }
    }
}

function newCheckWidget(id, text, changeCB, bold, imgUrl, imgW, imgH, bconvtext) {
    var o = newWidget(id);
    o.text = text;
    o.convText = bconvtext;
    o.changeCB = changeCB;
    o.idCheckbox = "check_" + id;
    o.checkbox = null;
    o.kind = "checkbox";
    o.name = o.idCheckbox;
    o.bold = bold;
    o.imgUrl = imgUrl;
    o.imgW = imgW;
    o.imgH = imgH;
    o.getHTML = CheckWidget_getHTML;
    o.setText = CheckWidget_setText;
    o.parentInit = Widget_init;
    o.init = CheckWidget_init;
    o.check = CheckWidget_check;
    o.isChecked = CheckWidget_isChecked;
    o.setDisabled = CheckWidget_setDisabled;
    o.isDisabled = CheckWidget_isDisabled;
    o.uncheckOthers = CheckWidget_uncheckOthers;
    o.isIndeterminate = CheckWidget_isIndeterminate;
    o.setIndeterminate = CheckWidget_setIndeterminate;
    o.layerClass = ("dialogzone" + (o.bold ? "bold" : ""));
    o.nobr = true;
    return o;
}

function CheckWidget_getHTML() {
    var o = this, cls = o.layerClass;
    return '<table border="0" onselectstart="return false" cellspacing="0" cellpadding="0" class="' + cls + '"' + attr("id", o.id) + ">" + '<tr valign="middle">' + '<td style="height:20px;width:21px"><input style="margin:' + (_moz ? 3 : 0) + 'px" onclick="' + _codeWinName + '.CheckWidget_changeCB(event,this)" ' + 'type="' + o.kind + '"' + attr("id", o.idCheckbox) + attr("name", o.name) + ">" + "</td>" + (o.imgUrl ? '<td><label style="padding-left:2px" for="' + o.idCheckbox + '">' + img(o.imgUrl, o.imgW, o.imgH) + "</label></td>" : "") + "<td>" + (o.nobr ? "<nobr>" : "") + '<label style="padding-left:' + (o.imgUrl ? 4 : 2) + 'px" id="label_' + o.id + '" for="' + o.idCheckbox + '">' + (o.convText ? convStr(o.text) : o.text) + "</label>" + (o.nobr ? "</nobr>" : "") + "</td>" + "</tr></table>";
}

function CheckWidget_setText(s) {
    var o = this;
    o.text = s;
    if (o.layer) {
        if (o.labelLyr == null) {
            o.labelLyr = getLayer("label_" + o.id);
        }
        o.labelLyr.innerHTML = o.convText ? convStr(s) : s;
    }
}

function CheckWidget_init() {
    this.parentInit();
    this.checkbox = getLayer(this.idCheckbox);
}

function CheckWidget_check(c) {
    this.checkbox.checked = c;
    if (c) {
        this.uncheckOthers();
    }
}

function CheckWidget_isChecked() {
    return this.checkbox.checked;
}

function CheckWidget_changeCB(e, l) {
    var o = getWidget(l);
    o.uncheckOthers();
    if (o.changeCB) {
        o.changeCB(e);
    }
}

function CheckWidget_setDisabled(d) {
    this.checkbox.disabled = d;
    if (_moz) {
        this.checkbox.className = (d ? "dialogzone" : "");
    }
}

function CheckWidget_isDisabled() {
    return this.checkbox.disabled;
}

function CheckWidget_uncheckOthers() {
}

function CheckWidget_isIndeterminate() {
    return this.checkbox.indeterminate;
}

function CheckWidget_setIndeterminate(b) {
    this.checkbox.indeterminate = b;
}

function newRadioWidget(id, group, text, changeCB, bold, imgUrl, imgW, imgH, bconvtext) {
    var o = newCheckWidget(id, text, changeCB, bold, imgUrl, imgW, imgH, bconvtext);
    o.kind = "radio";
    o.name = group;
    if (_RadioWidget_groups[group] == null) {
        _RadioWidget_groups[group] = new Array;
    }
    o.groupInstance = _RadioWidget_groups[group];
    var g = o.groupInstance;
    o.groupIdx = g.length;
    g[g.length] = o;
    o.uncheckOthers = RadioWidget_uncheckOthers;
    return o;
}

var _RadioWidget_groups = new Array;

function RadioWidget_uncheckOthers() {
    var g = this.groupInstance, idx = this.groupIdx, len = g.length;
    for (var i = 0; i < len; i++) {
        if (i != idx) {
            var c = g[i].checkbox;
            if (c) {
                c.checked = false;
            }
        }
    }
}

function newTextFieldWidget(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width, focusCB, blurCB) {
    var o = newWidget(id);
    o.tooltip = tooltip;
    o.changeCB = changeCB;
    o.maxChar = maxChar;
    o.keyUpCB = keyUpCB;
    o.enterCB = enterCB;
    o.noMargin = noMargin;
    o.width = width == null ? null : "" + width + "px";
    o.focusCB = focusCB;
    o.blurCB = blurCB;
    o.disabled = false;
    o.getHTML = TextFieldWidget_getHTML;
    o.getValue = TextFieldWidget_getValue;
    o.setValue = TextFieldWidget_setValue;
    o.intValue = TextFieldWidget_intValue;
    o.intPosValue = TextFieldWidget_intPosValue;
    o.select = TextFieldWidget_select;
    o.setDisabled = TextFieldWidget_setDisabled;
    o.beforeChange = null;
    o.wInit = o.init;
    o.init = TextFieldWidget_init;
    o.oldValue = "";
    o.helpTxt = "";
    o.isHelpTxt = false;
    o.setHelpTxt = TextFieldWidget_setHelpTxt;
    o.eraseHelpTxt = TextFieldWidget_eraseHelpTxt;
    o.enterCancelBubble = true;
    return o;
}

function TextFieldWidget_setDisabled(d) {
    var o = this;
    o.disabled = d;
    if (o.layer) {
        o.layer.disabled = d;
    }
}

function TextFieldWidget_init() {
    var o = this;
    o.wInit();
    o.layer.value = "" + (o.oldValue != "") ? o.oldValue : "";
    if (o.helpTxt && !o.oldValue) {
        o.setHelpTxt(o.helpTxt);
    }
}

function TextFieldWidget_getHTML() {
    var o = this;
    return "<input" + (o.disabled ? " disabled" : "") + ' oncontextmenu="event.cancelBubble=true;return true" style="' + sty("width", this.width) + (_moz ? "margin-top:1px;margin-bottom:1px;padding-left:2px;padding-right:2px;" : "") + (_isQuirksMode ? "height:18px;" : "height:14px;") + "margin-left:" + (this.noMargin ? 0 : 10) + 'px" onfocus="' + _codeWinName + '.TextFieldWidget_focus(this)" onblur="' + _codeWinName + '.TextFieldWidget_blur(this)" onchange="' + _codeWinName + '.TextFieldWidget_changeCB(event,this)" onkeydown=" return ' + _codeWinName + '.TextFieldWidget_keyDownCB(event,this);" onkeyup=" return ' + _codeWinName + '.TextFieldWidget_keyUpCB(event,this);" onkeypress=" return ' + _codeWinName + '.TextFieldWidget_keyPressCB(event,this);" type="text" ' + attr("maxLength", this.maxChar) + ' ondragstart="event.cancelBubble=true;return true" onselectstart="event.cancelBubble=true;return true" class="textinputs" id="' + this.id + '" name="' + this.id + '"' + attr("title", this.tooltip) + ' value="">';
}

function TextFieldWidget_getValue() {
    var o = this;
    if (o.isHelpTxt) {
        return "";
    } else {
        return o.layer ? o.layer.value : o.oldValue;
    }
}

function TextFieldWidget_setValue(s) {
    var o = this;
    if (o.layer) {
        o.eraseHelpTxt();
        o.layer.value = "" + s;
    } else {
        o.oldValue = s;
    }
}

function TextFieldWidget_changeCB(e, l) {
    var o = getWidget(l);
    o.eraseHelpTxt();
    if (o.beforeChange) {
        o.beforeChange();
    }
    if (o.changeCB) {
        o.changeCB(e);
    }
}

function TextFieldWidget_keyPressCB(e, l) {
    var o = getWidget(l);
    if (eventGetKey(e) == 13) {
        o.enterKeyPressed = true;
        return false;
    } else {
        o.enterKeyPressed = false;
    }
    return true;
}

function TextFieldWidget_keyUpCB(e, l) {
    var o = getWidget(l);
    o.eraseHelpTxt();
    if (eventGetKey(e) == 13 && o.enterKeyPressed) {
        if (o.beforeChange) {
            o.beforeChange();
        }
        if (o.enterCB) {
            if (o.enterCancelBubble) {
                eventCancelBubble(e);
            }
            o.enterCB(e);
        }
        return false;
    } else {
        if (o.keyUpCB) {
            o.keyUpCB(e);
        }
    }
    o.enterKeyPressed = false;
    return true;
}

function TextFieldWidget_keyDownCB(e, l) {
    var o = getWidget(l);
    o.eraseHelpTxt();
    o.enterKeyPressed = false;
    if (eventGetKey(e) == 13) {
        return true;
    } else {
        if (eventGetKey(e) == 8) {
            eventCancelBubble(e);
        }
    }
    return true;
}

function TextFieldWidget_eraseHelpTxt() {
    var o = this;
    if (o.isHelpTxt) {
        o.layer.value = "";
    }
    o.isHelpTxt = false;
    o.layer.style.color = "black";
}

function TextFieldWidget_focus(l) {
    var o = getWidget(l);
    o.eraseHelpTxt();
    if (o.focusCB) {
        o.focusCB();
    }
}

function TextFieldWidget_blur(l) {
    var o = getWidget(l);
    if (o.beforeChange) {
        o.beforeChange();
    }
    if (o.blurCB) {
        o.blurCB();
    }
}

function TextFieldWidget_intValue(nanValue) {
    var n = parseInt(this.getValue());
    return isNaN(n) ? nanValue : n;
}

function TextFieldWidget_intPosValue(nanValue) {
    var n = this.intValue(nanValue);
    return (n < 0) ? nanValue : n;
}

function TextFieldWidget_select() {
    this.layer.select();
}

function TextFieldWidget_setHelpTxt(h) {
    var o = this;
    o.helpTxt = h;
    if (o.layer && (o.layer.value == "")) {
        o.isHelpTxt = true;
        o.layer.value = h;
        o.layer.style.color = "#808080";
    }
}

function newIntFieldWidget(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width, customCheckCB) {
    var o = newTextFieldWidget(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width);
    o.min = -Number.MAX_VALUE;
    o.max = Number.MAX_VALUE;
    o.customCheckCB = customCheckCB;
    o.setMin = IntFieldWidget_setMin;
    o.setMax = IntFieldWidget_setMax;
    o.setValue = IntFieldWidget_setValue;
    o.beforeChange = IntFieldWidget_checkChangeCB;
    o.value = "";
    return o;
}

function IntFieldWidget_setMin(min) {
    if (!isNaN(min)) {
        this.min = min;
    }
}

function IntFieldWidget_setMax(max) {
    if (!isNaN(max)) {
        this.max = max;
    }
}

function IntFieldWidget_setValue(s) {
    var o = this, l = o.layer;
    s = "" + s;
    if (s == "") {
        if (l) {
            l.value = "";
        }
        o.oldValue = "";
        return;
    }
    var n = parseInt(s);
    value = "";
    if (!isNaN(n) && (n >= o.min) && (n <= o.max) && ((o.customCheckCB == null) || o.customCheckCB(n))) {
        value = n;
        o.oldValue = value;
    } else {
        if (o.oldValue) {
            value = o.oldValue;
        }
    }
    if (l) {
        l.value = "" + value;
    }
}

function IntFieldWidget_checkChangeCB() {
    var o = this;
    o.setValue(o.layer.value);
}

function newFrameZoneWidget(id, w, h, reverse) {
    var o = newWidget(id);
    o.w = (w != null) ? "" + Math.max(0, w - 10) + "px" : null;
    o.h = (h != null) ? "" + Math.max(0, h - 10) + "px" : null;
    o.reverse = (reverse != null) ? reverse : false;
    o.cont = null;
    o.beginHTML = FrameZoneWidget_beginHTML;
    o.endHTML = FrameZoneWidget_endHTML;
    o.oldResize = o.resize;
    o.resize = FrameZoneWidget_resize;
    return o;
}

function FrameZoneWidget_resize(w, h) {
    var o = this;
    var d = o.layer.display != "none";
    if (d & _moz && !_saf) {
        o.setDisplay(false);
    }
    o.oldResize(w, h);
    if (d & _moz && !_saf) {
        o.setDisplay(true);
    }
}

function FrameZoneWidget_beginHTML() {
    var o = this;
    return '<table  style="' + sty("width", o.w) + sty("height", o.h) + '" id="' + o.id + '" cellspacing="0" cellpadding="0" border="0"><tbody>' + '<tr height="5">' + '<td width="5">' + imgOffset(_skin + "dialogframe.gif", 5, 5, o.reverse ? 10 : 0, 0) + "</td>" + '<td style="' + backImgOffset(_skin + "dialogframetopbottom.gif", 0, o.reverse ? 10 : 0) + '"></td>' + '<td width="5">' + imgOffset(_skin + "dialogframe.gif", 5, 5, o.reverse ? 15 : 5, 0) + "</td>" + "</tr>" + '<tr><td style="' + backImgOffset(_skin + "dialogframeleftright.gif", o.reverse ? 10 : 0, 0) + '"></td><td valign="top" class="dialogzone" id="frame_cont_' + o.id + '">';
}

function FrameZoneWidget_endHTML() {
    var o = this;
    return '</td><td style="' + backImgOffset(_skin + "dialogframeleftright.gif", o.reverse ? 15 : 5, 0) + '"></td></tr>' + '<tr height="5">' + "<td>" + imgOffset(_skin + "dialogframe.gif", 5, 5, o.reverse ? 10 : 0, 5) + "</td>" + '<td style="' + backImgOffset(_skin + "dialogframetopbottom.gif", 0, o.reverse ? 15 : 5) + '"></td>' + "<td>" + imgOffset(_skin + "dialogframe.gif", 5, 5, o.reverse ? 15 : 5, 5) + "</td>" + "</tr>" + "</tbody></table>";
}

function arrayAdd(obj, fieldName, item, idx) {
    var array = obj[fieldName], len = array.length;
    if ((idx == null) || (typeof idx != "number")) {
        idx = -1;
    }
    if ((idx < 0) || (idx > len)) {
        idx = len;
    }
    if (idx != len) {
        var end = array.slice(idx);
        array.length = idx + 1;
        array[idx] = item;
        array = array.concat(end);
    } else {
        array[idx] = item;
    }
    obj[fieldName] = array;
    return idx;
}

function arrayRemove(obj, fieldName, idx) {
    var array = obj[fieldName], last = array.length - 1;
    if (idx == null) {
        array.length = 0;
        obj[fieldName] = array;
        return -1;
    }
    if ((idx < 0) || (idx > last)) {
        return -1;
    }
    if (idx == last) {
        array.length = last;
    } else {
        var end = array.slice(idx + 1);
        array.length = idx;
        array = array.concat(end);
    }
    obj[fieldName] = array;
    return idx;
}

function arrayMove(obj, fieldName, i, j) {
    var array = obj[fieldName], len = array.length;
    if ((i < 0) || (i >= len) || (j < 0) || (j >= len)) {
        return false;
    }
    var old = array[i];
    arrayRemove(obj, fieldName, i);
    arrayAdd(obj, fieldName, old, j);
    return true;
}

function arrayGetCopy(arr) {
    var o = new Array, len = arr.length;
    for (var i = 0; i < len; i++) {
        o[i] = arr[i];
    }
    return o;
}

function arrayFind(obj, fieldName, v, subfield) {
    var array = obj[fieldName], len = array.length;
    for (var i = 0; i < len; i++) {
        if (subfield) {
            if (array[i][subfield] == v) {
                return i;
            }
        } else {
            if (array[i] == v) {
                return i;
            }
        }
    }
    return -1;
}

function getFrame(name, par) {
    if (par == null) {
        par = self;
    }
    var frames = par.frames, w = eval("frames." + name);
    if (w == null) {
        return w;
    }
    var l = frames.length;
    for (var i = 0; i < l; i++) {
        w = frames[i];
        try {
            if (w.name == name) {
                return w;
            }
        } catch (exc) {
        }
    }
    return null;
}

function frameNav(name, url, fillHistory, par, noRefreshDrillBar) {
    var fr = null;
    if (noRefreshDrillBar & name == "Report") {
        var topfs = getTopFrameset();
        fr = topfs.getReportFrame();
    } else {
        fr = getFrame(name, par);
    }
    if (fr) {
        var l = fr.location;
        if (fillHistory) {
            l.href = url;
        } else {
            l.replace(url);
        }
    } else {
        var lay = document.getElementById(name);
        if (lay) {
            lay.src = url;
        }
    }
}

function frameGetUrl(win) {
    return win.location.href;
}

function frameReload(win) {
    var loc = win.location;
    loc.replace(loc.href);
}

function setTopFrameset() {
    _curWin._topfs = "topfs";
}

function getTopFrameset(f) {
    if (f == null) {
        f = self;
    }
    if (f._topfs == "topfs") {
        return f;
    } else {
        if (f != top) {
            return getTopFrameset(f.parent);
        } else {
            return null;
        }
    }
}

function convStr(s, nbsp, br) {
    s = "" + s;
    var ret = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    if (nbsp) {
        ret = ret.replace(/ /g, "&nbsp;");
    }
    if (br) {
        ret = ret.replace(/\n/g, "<br>");
    }
    return ret;
}

function escapeCR(s) {
    s = "" + s;
    var ret = s.replace(/\r/g, "").replace(/\n/g, "\\n");
    return ret;
}

function addDblClickCB(l, cb) {
    if (l.addEventListener && !_saf) {
        l.addEventListener("dblclick", cb, false);
    } else {
        l.ondblclick = cb;
    }
}

function img(src, w, h, align, att, alt) {
    att = (att ? att : "");
    if (alt == null) {
        alt = "";
    }
    return "<img" + attr("width", w) + attr("height", h) + attr("src", src) + attr("alt", alt) + attr("align", align) + ' border="0" hspace="0" vspace="0" ' + (att ? att : "") + ">";
}

function imgOffset(url, w, h, dx, dy, id, att, alt, st, align) {
    return img(_skin + "../transp.gif", w, h, align, (att ? att : "") + " " + attr("id", id) + ' style="float:left;' + backImgOffset(url, dx, dy) + (st ? st : "") + '"', alt);
}

function simpleImgOffset(url, w, h, dx, dy, id, att, alt, st, align) {
    if (_ie) {
        if (dx == null) {
            dx = 0;
        }
        if (dy == null) {
            dy = 0;
        }
        return "<div " + (att ? att : "") + " " + attr("id", id) + ' style="position:relative;padding:0px;width:' + w + "px;height:" + h + "px;overflow:hidden;" + (st ? st : "") + '">' + img(url, null, null, (align ? align : "top"), 'style="margin:0px;position:relative;top:' + (-dy) + "px;left:" + (-dx) + 'px"', alt) + "</div>";
    } else {
        return imgOffset(url, w, h, dx, dy, id, att, alt, st, align);
    }
}

function changeSimpleOffset(lyr, dx, dy, url, alt) {
    if (_ie) {
        lyr = lyr.childNodes[0];
        var st = lyr.style;
        if ((url != null) && (url != lyr.src)) {
            lyr.src = url;
        }
        if (dx != null) {
            st.left = "" + (-dx) + "px";
        }
        if (dy != null) {
            st.top = "" + (-dy) + "px";
        }
        if (alt != null) {
            lyr.title = alt;
            lyr.alt = alt;
        }
    } else {
        changeOffset(lyr, dx, dy, url, alt);
    }
}

function backImgOffset(url, dx, dy) {
    return "background-image:url('" + url + "');background-position:" + (-dx) + "px " + (-dy) + "px;";
}

function changeOffset(lyr, dx, dy, url, alt) {
    var st = lyr.style;
    if (st) {
        if ((dx != null) && (dy != null)) {
            st.backgroundPosition = "" + (-dx) + "px " + (-dy) + "px";
        }
        if (url) {
            st.backgroundImage = "url('" + url + "')";
        }
    }
    if (alt) {
        lyr.title = alt;
    }
}

function includeScript(url) {
    document.write("<scr" + 'ipt language="javascript" charset="UTF-8" src="' + url + '"></scr' + "ipt>");
}

function includeCSS(css, noskin) {
    if (typeof (_style) == "string" && _style != "") {
        var url = "";
        if (noskin) {
            url = _style + "../" + css;
        } else {
            url = _style + css;
        }
        url += ".css";
        _curDoc.write("<li" + 'nk rel="stylesheet" type="text/css" href="' + url + '">');
    }
}

function getLayer(id) {
    return _curDoc.getElementById(id);
}

function setLayerTransp(lyr, percent) {
    if (_ie) {
        lyr.style.filter = (percent == null) ? "" : "progid:DXImageTransform.Microsoft.Alpha( style=0,opacity=" + percent + ")";
    } else {
        lyr.style.MozOpacity = (percent == null) ? 1 : percent / 100;
    }
}

function getPos(el, relTo) {
    relTo = relTo ? relTo : null;
    for (var lx = 0, ly = 0; (el != null) && (el != relTo); lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) {
    }
    return {x: lx, y: ly};
}

function getPos2(el, relTo) {
    var relTo = relTo ? relTo : null;
    var posX = 0;
    var posY = 0;
    while (el.parentNode || el.offsetParent) {
        if (el.offsetParent) {
            posX += el.offsetLeft;
            posY += el.offsetTop;
            el = el.offsetParent;
        } else {
            if (el.parentNode) {
                if (el.style) {
                    if (el.style.left) {
                        posX += el.style.left;
                    }
                    if (el.style.top) {
                        posY += el.style.top;
                    }
                }
                el = el.parentNode;
            } else {
                break;
            }
        }
    }
    if (relTo) {
        relToCord = getPos2(relTo);
        posX -= relToCord.x;
        posY -= relToCord.y;
    }
    return {x: posX, y: posY};
}

function getPosScrolled(el, relTo) {
    relTo = relTo ? relTo : null;
    if (_ie) {
        for (var lx = 0, ly = 0; (el != null) && (el != relTo); lx += el.offsetLeft - el.scrollLeft, ly += el.offsetTop - el.scrollTop, el = el.offsetParent) {
        }
    } else {
        var oldEl = el;
        for (var lx = 0, ly = 0; (el != null) && (el != relTo); lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) {
        }
        for (el = oldEl; (el != null) && (el != relTo); el = el.parentNode) {
            if (el.scrollLeft != null) {
                lx -= el.scrollLeft;
                ly -= el.scrollTop;
            }
        }
    }
    lx += getScrollX();
    ly += getScrollY();
    return {x: lx, y: ly};
}

function getWidget(layer) {
    if (layer == null) {
        return null;
    }
    var w = layer._widget;
    if (w != null) {
        return _widgets[w];
    } else {
        return getWidget(layer.parentNode);
    }
}

function getWidgetFromID(id) {
    if (id == null) {
        return null;
    }
    var l = getLayer(id);
    return getWidget(l);
}

function attr(key, val) {
    return (val != null ? " " + key + '="' + val + '" ' : "");
}

function sty(key, val) {
    return (val != null ? key + ":" + val + ";" : "");
}

function getSep(marg, solid) {
    if (marg == null) {
        marg = 0;
    }
    var spc = marg > 0 ? '<td width="' + marg + '">' + getSpace(marg, 1) + "</td>" : "";
    return '<table style="margin-top:5px;margin-bottom:5px;" width="100%" cellspacing="0" cellpadding="0"><tr>' + spc + '<td background="' + _skin + "sep" + (solid ? "_solid" : "") + '.gif" class="smalltxt"><img alt="" src="' + _skin + '../transp.gif" width="10" height="2"></td>' + spc + "</tr></table>";
}

function writeSep(marg, solid) {
    _curDoc.write(getSep(marg, solid));
}

function getSpace(w, h) {
    return '<table height="' + h + '" border="0" cellspacing="0" cellpadding="0"><tr><td>' + img(_skin + "../transp.gif", w, h) + "</td></tr></table>";
}

function writeSpace(w, h) {
    _curDoc.write(getSpace(w, h));
}

function documentWidth(win) {
    var win = win ? win : _curWin;
    var width = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
    width = Math.max(width, document.body.scrollWidth);
    return width;
}

function documentHeight(win) {
    var win = win ? win : _curWin;
    var height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    height = Math.max(height, document.body.scrollHeight);
    return height;
}

function winWidth(win) {
    var width;
    var win = win ? win : _curWin;
    if (_ie) {
        if (_isQuirksMode) {
            width = win.document.body.clientWidth;
        } else {
            width = win.document.documentElement.clientWidth;
        }
    } else {
        width = win.innerWidth;
    }
    return width;
}

function winHeight(win) {
    var win = win ? win : _curWin;
    var height;
    if (_ie) {
        if (_isQuirksMode) {
            height = document.body.clientHeight;
        } else {
            height = document.documentElement.clientHeight;
        }
    } else {
        height = win.innerHeight;
    }
    return height;
}

function getScrollX(win) {
    var scrollLeft = 0;
    var win = win ? win : _curWin;
    if (typeof (win.scrollX) == "number") {
        scrollLeft = win.scrollX;
    } else {
        scrollLeft = Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);
    }
    return scrollLeft;
}

function getScrollY(win) {
    var scrollTop = 0;
    var win = win ? win : _curWin;
    if (typeof (win.scrollY) == "number") {
        scrollTop = window.scrollY;
    } else {
        scrollTop = Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
    }
    return scrollTop;
}

function winScrollTo(x, y, win) {
    win = win ? win : _curWin;
    win.scrollTo(x, y);
}

function eventGetKey(e, win) {
    win = win ? win : _curWin;
    return _ie ? win.event.keyCode : e.keyCode;
}

function eventGetX(e) {
    return _ie ? _curWin.event.clientX : e.clientX ? e.clientX : e.pageX;
}

function eventGetY(e) {
    return _ie ? _curWin.event.clientY : e.clientY ? e.clientY : e.pageY;
}

function xpos(o, e, doc, zoom) {
    if ((zoom == null) || (!_ie)) {
        zoom = 1;
    }
    return ((e.clientX / zoom) - getPos(o).x) + getScrollX();
}

function ypos(o, e, doc, zoom) {
    if ((zoom == null) || (!_ie)) {
        zoom = 1;
    }
    return ((e.clientY / zoom) - getPos(o).y) + (_ie ? doc.body.scrollTop : 0);
}

function absxpos(e, zoom) {
    if ((zoom == null) || (!_ie)) {
        return e.clientX;
    } else {
        return e.clientX / zoom;
    }
}

function absypos(e, zoom) {
    if ((zoom == null) || (!_ie)) {
        return e.clientY;
    } else {
        return e.clientY / zoom;
    }
}

function eventCancelBubble(e, win) {
    win = win ? win : _curWin;
    var ev = _ie ? win.event : e;
    if (ev) {
        ev.cancelBubble = true;
        if (ev.stopPropagation) {
            ev.stopPropagation();
        }
    }
}

function isHidden(lyr) {
    if ((lyr == null) || (lyr.tagName == "BODY")) {
        return false;
    }
    var sty = lyr.style;
    if ((sty == null) || (sty.visibility == _hide) || (sty.display == "none")) {
        return true;
    }
    return isHidden(lyr.parentNode);
}

function opt(val, txt, sel) {
    return '<option value="' + val + '" ' + (sel ? "selected" : "") + ">" + convStr("" + txt) + "</option>";
}

function lnk(inner, clickCB, cls, id, att, dblClickCB) {
    if (clickCB == null) {
        clickCB = "return false";
    }
    att = att ? att : "";
    return "<a" + attr("class", cls) + attr("id", id) + attr("href", "javascript:void(0)") + attr("onclick", clickCB) + attr("ondblclick", dblClickCB) + att + ">" + inner + "</a>";
}

_oldErrHandler = null;

function localErrHandler() {
    return true;
}

function canScanFrames(w) {
    var ex = true, d = null;
    if (_moz) {
        _oldErrHandler = window.onerror;
        window.onerror = localErrHandler;
    }
    try {
        d = w.document;
        ex = false;
    } catch (expt) {
    }
    if (_moz) {
        window.onerror = _oldErrHandler;
    }
    return (!ex && (d != null));
}

function restoreAllInputs(win, level) {
    if (_ie && _curWin._inptStackLevel != null) {
        win = win ? win : _curWin;
        if (canScanFrames(win)) {
            if (level == null) {
                level = --_curWin._inptStackLevel;
            }
            var b = win.document.body, arr = b ? b.getElementsByTagName("SELECT") : null, len = arr ? arr.length : 0;
            for (var i = 0; i < len; i++) {
                var inpt = arr[i];
                if (inpt._boHideLevel == level) {
                    inpt.style.visibility = inpt._boOldVis;
                    inpt._boHideLevel = null;
                }
            }
            var frames = win.frames, flen = frames.length;
            for (var k = 0; k < flen; k++) {
                restoreAllInputs(frames[k], level);
            }
        }
    }
}

function hideAllInputs(x, y, w, h, win, level) {
    if (_ie) {
        win = win ? win : _curWin;
        if (canScanFrames(win)) {
            var b = win.document.body, arr = b ? b.getElementsByTagName("SELECT") : null, len = arr ? arr.length : 0;
            if (level == null) {
                if (_curWin._inptStackLevel == null) {
                    _curWin._inptStackLevel = 0;
                }
                level = _curWin._inptStackLevel++;
            }
            for (var i = 0; i < len; i++) {
                var inpt = arr[i], css = inpt.style;
                var inter = (x == null) || isLayerIntersectRect(inpt, x, y, w, h);
                if (!isHidden(inpt) && inter) {
                    inpt._boHideLevel = level;
                    inpt._boOldVis = css.visibility;
                    css.visibility = _hide;
                }
            }
            var frames = win.frames, flen = frames.length;
            for (var k = 0; k < flen; k++) {
                hideAllInputs(null, null, null, null, frames[k], level);
            }
        }
    }
}

function getBGIframe(id) {
    return '<iframe id="' + id + '" name="' + id + '" style="display:none;left:0px;position:absolute;top:0px" src="' + _skin + "../../empty.html" + '" frameBorder="0" scrolling="no"></iframe>';
}

function getDynamicBGIFrameLayer() {
    var recycle = false;
    if (_curWin.BGIFramePool) {
        BGIFrames = _curWin.BGIFramePool.split(",");
        BGIFCount = BGIFrames.length;
        for (var id = 0; id < BGIFCount; id++) {
            if (BGIFrames[id] != "1") {
                recycle = true;
                break;
            }
        }
    } else {
        id = 0;
        BGIFrames = new Array;
    }
    BGIFrames[id] = "1";
    _curWin.BGIFramePool = BGIFrames.join(",");
    if (!recycle) {
        targetApp(getBGIframe("BGIFramePool_" + id));
    }
    return getLayer("BGIFramePool_" + id);
}

function holdBGIFrame(layerId) {
    var l = getLayer(layerId);
    if (l) {
        l.style.display = "";
    }
    id = parseInt(layerId.split("_")[1]);
    BGIFrames = _curWin.BGIFramePool.split(",");
    BGIFrames[id] = 1;
    _curWin.BGIFramePool = BGIFrames.join(",");
}

function releaseBGIFrame(layerId) {
    var l = getLayer(layerId);
    if (l) {
        l.style.display = "none";
    }
    id = parseInt(layerId.split("_")[1]);
    BGIFrames = _curWin.BGIFramePool.split(",");
    BGIFrames[id] = 0;
    _curWin.BGIFramePool = BGIFrames.join(",");
}

function append(e, s, c) {
    if (_ie) {
        e.insertAdjacentHTML("BeforeEnd", s);
    } else {
        var curDoc = c ? c : _curDoc;
        var r = curDoc.createRange();
        r.setStartBefore(e);
        var frag = r.createContextualFragment(s);
        e.appendChild(frag);
    }
}

function append2(e, s, c) {
    if (_ie) {
        e.insertAdjacentHTML("afterBegin", s);
    } else {
        var curDoc = c ? c : _curDoc;
        var r = curDoc.createRange();
        r.setStartBefore(e);
        var frag = r.createContextualFragment(s);
        e.appendChild(frag);
    }
}

function insBefore(e, s, c) {
    if (_ie) {
        e.insertAdjacentHTML("BeforeBegin", s);
    } else {
        var curDoc = c ? c : _curDoc;
        var r = _curDoc.createRange();
        r.setEndBefore(e);
        var frag = r.createContextualFragment(s);
        e.parentNode.insertBefore(frag, e);
    }
}

function insBefore2(e, s, c) {
    if (_ie) {
        e.insertAdjacentHTML("BeforeBegin", s);
    } else {
        var curDoc = c ? c : _curDoc;
        var r = _curDoc.createRange();
        r.setStartBefore(e);
        var frag = r.createContextualFragment(s);
        e.parentNode.insertBefore(frag, e);
    }
}

function targetApp(s) {
    append(_curDoc.body, s);
}

function getBasePath() {
    var url = document.location.href, last1 = url.lastIndexOf("?");
    if (last1 >= 0) {
        url = url.slice(0, last1);
    }
    var last = url.lastIndexOf("/");
    return (last >= 0) ? url.slice(0, last + 1) : url;
}

function isLayerIntersectRect(l, x1, y1, w, h) {
    var xl1 = getPos(l).x, yl1 = getPos(l).y, xl2 = xl1 + l.offsetWidth, yl2 = yl1 + l.offsetHeight, x2 = x1 + w,
        y2 = y1 + h;
    return ((x1 > xl1) || (x2 > xl1)) && ((x1 < xl2) || (x2 < xl2)) && ((y1 > yl1) || (y2 > yl1)) && ((y1 < yl2) || (y2 < yl2));
}

function preloadImg(url) {
    var img = _preloadArr[_preloadArr.length] = new Image;
    img.src = url;
}

function convURL(str) {
    if (_dontNeedEncoding == null) {
        _dontNeedEncoding = new Array(256);
        for (var i = 0; i < 256; i++) {
            _dontNeedEncoding[i] = false;
        }
        for (var i = (new String("a")).charCodeAt(0); i <= (new String("z")).charCodeAt(0); i++) {
            _dontNeedEncoding[i] = true;
        }
        for (var i = (new String("A")).charCodeAt(0); i <= (new String("Z")).charCodeAt(0); i++) {
            _dontNeedEncoding[i] = true;
        }
        for (var i = (new String("0")).charCodeAt(0); i <= (new String("9")).charCodeAt(0); i++) {
            _dontNeedEncoding[i] = true;
        }
        _dontNeedEncoding[(new String(" ")).charCodeAt(0)] = true;
        _dontNeedEncoding[(new String("-")).charCodeAt(0)] = true;
        _dontNeedEncoding[(new String("_")).charCodeAt(0)] = true;
        _dontNeedEncoding[(new String(".")).charCodeAt(0)] = true;
        _dontNeedEncoding[(new String("*")).charCodeAt(0)] = true;
        _thex = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    }
    var encstr = "";
    for (var i = 0; i < str.length; i++) {
        encstr += URLEncodeUTF8Char(str.charAt(i));
    }
    return encstr;
}

function URLEncodeUTF8Char(c) {
    var unicodeval = c.charCodeAt(0);
    if (unicodeval < 128) {
        if (_dontNeedEncoding[unicodeval]) {
            return (c == " " ? "+" : c);
        } else {
            return ("%" + _thex[unicodeval >> 4] + _thex[unicodeval & 15]);
        }
    } else {
        if (unicodeval < 2048) {
            return ("%" + _thex[(unicodeval >> 10) | 12] + _thex[(unicodeval >> 6) & 15] + "%" + _thex[(unicodeval >> 4) & 3 | 8] + _thex[unicodeval & 15]);
        } else {
            return ("%" + _thex[14] + _thex[unicodeval >> 12] + "%" + _thex[(unicodeval >> 10) & 3 | 8] + _thex[(unicodeval >> 6) & 15] + "%" + _thex[(unicodeval >> 4) & 3 | 8] + _thex[unicodeval & 15]);
        }
    }
}

function encString(s) {
    var res = "";
    if (s != null) {
        var len = s.length;
        for (var i = 0; i < len; i++) {
            var c = s.charAt(i);
            switch (c) {
                case"$":
                    res += "$3";
                    break;
                case",":
                    res += "$4";
                    break;
                case"[":
                    res += "$5";
                    break;
                case"]":
                    res += "$6";
                    break;
                default:
                    res += c;
                    break;
            }
        }
    }
    return res;
}

function enc() {
    var args = enc.arguments, len = args.length, s = "[";
    if (len > 0) {
        s += args[0];
    }
    for (var i = 1; i < len; i++) {
        s += "," + args[i];
    }
    return s + "]";
}

function remSpaceAround(s) {
    var len = s.length;
    if (len <= 0) {
        return "";
    }
    var start = 0, end = len;
    var c = s.substr(start, 1);
    while (c == " " && start < len) {
        start++;
        c = s.substr(start, 1);
    }
    if (start < len) {
        c = s.substr(end - 1, 1);
        while (c == " ") {
            end--;
            c = s.substr(end - 1, 1);
        }
    }
    var sub = s.substring(start, end);
    return sub;
}

function getArrows(upCb, downCB, hori, newNode, newNodeCB) {
    if (hori == null) {
        hori = false;
    }
    var s = "";
    if (hori) {
        s += "<nobr>";
    }
    s += lnk(img(_skin + (hori ? "left.gif" : "up.gif"), 12, 12, "top", null, hori ? "_LEFT ARROW" : "_UP ARROW"), upCb, null, null, null, (_moz ? null : upCb));
    s += (hori ? "" : img(_skin + "../transp.gif", 1, 5) + "<br>");
    s += lnk(img(_skin + (hori ? "right.gif" : "down.gif"), hori ? 11 : 12, hori ? 12 : 11, "top", null, hori ? "_RIGHT ARROW" : "_LEFT ARROW"), downCB, null, null, null, (_moz ? null : downCB));
    if (newNode) {
        s += img(_skin + "../transp.gif", 1, 5) + "<br>";
        s += lnk(img(_skin + ("node.gif"), 12, 12, "top", null, "_NEW NODE"), newNodeCB, null, null, null, (_moz ? null : newNodeCB));
    }
    if (hori) {
        s += "</nobr>";
    }
    return s;
}

_staticUnicBlockWhileWaitWidgetID = "staticUnicBlockWhileWaitWidgetID";

function hideBlockWhileWaitWidget() {
    var lyr = getLayer(_staticUnicBlockWhileWaitWidgetID);
    if (lyr) {
        lyr.style.display = "none";
    }
}

function newBlockWhileWaitWidget(urlImg) {
    if (window._BlockWhileWaitWidget != null) {
        return window._BlockWhileWaitWidget;
    }
    var o = newWidget(_staticUnicBlockWhileWaitWidgetID);
    o.getPrivateHTML = BlockWhileWaitWidget_getPrivateHTML;
    o.init = BlockWhileWaitWidget_init;
    o.show = BlockWhileWaitWidget_show;
    window._BlockWhileWaitWidget = o;
    return o;
}

function BlockWhileWaitWidget_init() {
}

function BlockWhileWaitWidget_getPrivateHTML() {
    return '<div id="' + this.id + '" onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0"  style="background-image:url(' + _skin + '../transp.gif);z-index:5000;cursor:wait;position:absolute;top:0px;left:0px;width:100%;height:100%"></div>';
}

function BlockWhileWaitWidget_show(show) {
    var o = this;
    if (o.layer == null) {
        o.layer = getLayer(o.id);
        if (o.layer == null) {
            targetApp(o.getPrivateHTML());
            o.layer = getLayer(o.id);
            o.css = o.layer.style;
        } else {
            o.css = o.layer.style;
        }
    }
    o.setDisplay(show);
}

var regLang = /^[a-zA-Z]{2}$|^[a-zA-Z]{2}_[a-zA-Z]{2}$/, regIntPos = /^\d+$/, regYes = /^yes$/,
    regPath = /^[\w|\/|:|.|-]+$/, regAlphanumDot = /^\w+\.+\w+$/, regAlphanumDotEx = /^\w+\.*\w+\.*\w+$/;
var paramRegs = new Array();
paramRegs["ID"] = regAlphanumDot;
paramRegs["allTableCells"] = regYes;
paramRegs["gotoPivot"] = regYes;
paramRegs["reportIndex"] = regIntPos;
paramRegs["fromLPane"] = regYes;
paramRegs["skin"] = regPath;
paramRegs["lang"] = regLang;
paramRegs["noGrabber"] = regYes;
paramRegs["isFormulaEdit"] = regYes;
paramRegs["fromQuery"] = regYes;
paramRegs["isFromHyperlinkEditor"] = regYes;
paramRegs["iAction"] = regIntPos;
paramRegs["callback"] = regAlphanumDotEx;
paramRegs["callbackin"] = regAlphanumDotEx;
paramRegs["callbackout"] = regAlphanumDotEx;

function requestQueryString(win, par) {
    params = win.location.search.substr(1).split("&");
    for (i = 0; i < params.length; i++) {
        var param = params[i].split("="), key = param[0], val = param[1];
        if (key == par) {
            var reg = new RegExp(paramRegs[key]);
            if ((val == "") || (reg.test(val))) {
                return val;
            } else {
                var tpfs = getTopFrameset();
                if (tpfs != null) {
                    tpfs._dontCloseDoc = true;
                    tpfs.document.location.replace(tpfs._root + "html/badparamserror.html");
                } else {
                    tpfs = getTopFrameset(window.opener);
                    if (tpfs != null) {
                        document.location.replace(tpfs._skin + "../../../html/badparamserror.html");
                    }
                }
            }
        }
    }
}

function trim(strString) {
    if (strString != null) {
        var iLength = strString.length;
        var i;
        for (i = 0; i < iLength; i++) {
            if (strString.charAt(i) != " ") {
                break;
            }
        }
        strString = strString.substring(i);
        iLength = strString.length;
        for (i = iLength; i > 0; i--) {
            if (strString.charAt(i - 1) != " ") {
                break;
            }
        }
        strString = strString.substring(0, i);
    }
    return strString;
}

function startsWithIgnoreCase(strString, strToFind) {
    var blnRet = false;
    if (strToFind != null) {
        var strVar = strString.substring(0, strToFind.length);
        if (strVar.toLowerCase() == strToFind.toLowerCase()) {
            blnRet = true;
        }
    }
    return blnRet;
}

function endsWithIgnoreCase(strString, strToFind) {
    var blnRet = false;
    if (strToFind != null) {
        var iRight = strString.length - strToFind.length;
        if (iRight >= 0) {
            var strVar = strString.substring(iRight);
            if (strVar.toLowerCase() == strToFind.toLowerCase()) {
                blnRet = true;
            }
        }
    }
    return blnRet;
}

function isTextInput(ev) {
    var source = _ie ? ev.srcElement : ev.target;
    var isText = false;
    if (source.tagName == "TEXTAREA") {
        isText = true;
    }
    if ((source.tagName == "INPUT") && (source.type.toLowerCase() == "text")) {
        isText = true;
    }
    return isText;
}

function isTextArea(ev) {
    var source = _ie ? ev.srcElement : ev.target;
    if (source.tagName == "TEXTAREA") {
        return true;
    } else {
        return false;
    }
}

function shrinkTooltip(t, n) {
    var n = n ? n : 360;
    return (t.length < n) ? t : (t.substring(0, n) + "...");
}

function setDateValue(strDateValue, strInputFormat) {
    var strRet = ",,";
    var strYear = "";
    var strMonth = "";
    var strDay = "";
    var length = strInputFormat.length;
    var sep = "";
    for (var i = 0; i < length; i++) {
        var c = strInputFormat.charAt(i);
        switch (c) {
            case"/":
            case"-":
            case".":
            case",":
            case'"':
                sep = c;
                break;
        }
        if (sep != "") {
            break;
        }
    }
    if (sep != "") {
        var arrInputFormat = strInputFormat.split(sep);
        var arrDateValue = strDateValue.split(sep);
        for (var i = 0; i < arrDateValue.length; i++) {
            if (arrInputFormat[i] != null && typeof (arrInputFormat[i]) != "undefined") {
                if (arrInputFormat[i].indexOf("y") >= 0) {
                    var iPosA = arrInputFormat[i].indexOf("y");
                    var iPosB = arrInputFormat[i].lastIndexOf("y");
                    if (iPosB >= 0) {
                        strYear = arrInputFormat[i].substring(iPosA, iPosB + 1);
                        if (strYear.length >= arrDateValue[i].length) {
                            strYear = arrDateValue[i];
                        } else {
                            iPosB = iPosA;
                            for (var j = iPosA; j < arrDateValue[i].length; j++) {
                                var c = arrDateValue[i].charAt(j);
                                if (c < "0" || c > "9") {
                                    break;
                                } else {
                                    iPosB = j + 1;
                                }
                            }
                            strYear = arrDateValue[i].substring(iPosA, iPosB);
                            if (strYear.length <= 2) {
                                var iYear = parseInt(strYear);
                                if (iYear >= 70) {
                                    iYear += 1900;
                                } else {
                                    iYear += 2000;
                                }
                                strYear = iYear.toString();
                            }
                        }
                    } else {
                        return strRet;
                    }
                } else {
                    if (arrInputFormat[i].indexOf("M") >= 0) {
                        var iPosA = arrInputFormat[i].indexOf("M");
                        var iPosB = arrInputFormat[i].lastIndexOf("M");
                        if (iPosB >= 0) {
                            strMonth = arrInputFormat[i].substring(iPosA, iPosB + 1);
                            if (strMonth.length >= arrDateValue[i].length) {
                                strMonth = arrDateValue[i];
                            } else {
                                iPosB = iPosA;
                                for (var j = iPosA; j < arrDateValue[i].length; j++) {
                                    var c = arrDateValue[i].charAt(j);
                                    if (c < "0" || c > "9") {
                                        break;
                                    } else {
                                        iPosB = j + 1;
                                    }
                                }
                                strMonth = arrDateValue[i].substring(iPosA, iPosB);
                            }
                        } else {
                            return strRet;
                        }
                    } else {
                        if (arrInputFormat[i].indexOf("d") >= 0) {
                            var iPosA = arrInputFormat[i].indexOf("d");
                            var iPosB = arrInputFormat[i].lastIndexOf("d");
                            if (iPosB >= 0) {
                                strDay = arrInputFormat[i].substring(iPosA, iPosB + 1);
                                if (strDay.length >= arrDateValue[i].length) {
                                    strDay = arrDateValue[i];
                                } else {
                                    iPosB = iPosA;
                                    for (var j = iPosA; j < arrDateValue[i].length; j++) {
                                        var c = arrDateValue[i].charAt(j);
                                        if (c < "0" || c > "9") {
                                            break;
                                        } else {
                                            iPosB = j + 1;
                                        }
                                    }
                                    strDay = arrDateValue[i].substring(iPosA, iPosB);
                                }
                            } else {
                                return strRet;
                            }
                        }
                    }
                }
            }
        }
        if (strMonth != "" && strDay != "" && strYear != "" && !(isNaN(strMonth) || isNaN(strDay) || isNaN(strYear))) {
            strRet = strMonth + "," + strDay + "," + strYear;
        }
    }
    return strRet;
}

function LZ(x) {
    return (x < 0 || x > 9 ? "" : "0") + x;
}

function formatDate(date, format) {
    var format = format + "";
    var result = "";
    var i_format = 0;
    var c = "";
    var token = "";
    var y = date.getFullYear() + "";
    var M = date.getMonth() + 1;
    var d = date.getDate();
    var E = date.getDay();
    var H = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var yyyy, yy, MMM, MM, dd, hh, h, mm, ss, ampm, HH, H, KK, K, kk, k;
    var value = new Object();
    if (y.length == 2) {
        if (y - 0 >= 70) {
            y = "" + (y - 0 + 1900);
        } else {
            y = "" + (y - 0 + 2000);
        }
    }
    value["y"] = "" + y;
    value["yyyy"] = y;
    value["yy"] = y.substring(2, 4);
    value["M"] = M;
    value["MM"] = LZ(M);
    value["MMM"] = _month[M - 1];
    value["NNN"] = _month[M + 11];
    value["d"] = d;
    value["dd"] = LZ(d);
    value["E"] = _day[E + 7];
    value["EE"] = _day[E];
    value["H"] = H;
    value["HH"] = LZ(H);
    if (H == 0) {
        value["h"] = 12;
    } else {
        if (H > 12) {
            value["h"] = H - 12;
        } else {
            value["h"] = H;
        }
    }
    value["hh"] = LZ(value["h"]);
    if (H > 11) {
        value["K"] = H - 12;
    } else {
        value["K"] = H;
    }
    value["k"] = H + 1;
    value["KK"] = LZ(value["K"]);
    value["kk"] = LZ(value["k"]);
    if (H > 11) {
        value["a"] = _PM;
        value["aa"] = _PM;
    } else {
        value["a"] = _AM;
        value["aa"] = _AM;
    }
    value["m"] = m;
    value["mm"] = LZ(m);
    value["s"] = s;
    value["ss"] = LZ(s);
    while (i_format < format.length) {
        c = format.charAt(i_format);
        token = "";
        while ((format.charAt(i_format) == c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        if (value[token] != null) {
            result = result + value[token];
        } else {
            result = result + token;
        }
    }
    return result;
}

function newSearchWidget(id, w, searchCB, helpText) {
    var o = newWidget(id);
    o.bMatchCase = false;
    o.searchField = newTextFieldWidget(id + "_searchVal", null, 50, SearchWidget_keyUpCB, SearchWidget_searchCB, true, _lovSearchFieldLab, w ? (w - 40) : null);
    o.searchField.par = o;
    o.searchField.setHelpTxt(helpText ? helpText : _lovSearchFieldLab);
    o.searchIcn = newIconMenuWidget(id + "_searchIcn", _skin + "../lov.gif", SearchWidget_searchCB, null, _lovSearchLab, 16, 16, 0, 0, 0, 0);
    o.searchIcn.par = o;
    o.searchMenu = o.searchIcn.getMenu();
    o.normal = o.searchMenu.addCheck(id + "normal", _lovNormalLab, SearchWidget_normalClickCB);
    o.matchCase = o.searchMenu.addCheck(id + "matchCase", _lovMatchCase, SearchWidget_matchCaseClickCB);
    o.oldInit = o.init;
    o.searchCB = searchCB;
    o.init = SearchWidget_init;
    o.getHTML = SearchWidget_getHTML;
    o.setCaseSensitive = SearchWidget_setCaseSensitive;
    o.isCaseSensitive = SearchWidget_isCaseSensitive;
    o.updateMatchCase = SearchWidget_updateMatchCase;
    o.getSearchValue = SearchWidget_getSearchValue;
    o.setSearchValue = SearchWidget_setSearchValue;
    o.resize = SearchWidget_resize;
    return o;
}

function SearchWidget_getHTML() {
    var o = this, s = "";
    s = '<table id="' + o.id + '" border="0" cellspacing="0" cellpadding="0"><tbody>' + "<tr>" + "<td>" + o.searchField.getHTML() + "</td>" + "<td>" + o.searchIcn.getHTML() + "</td>" + "</tr>" + "</tbody></table>";
    return s;
}

function SearchWidget_resize(w, h) {
    var o = this;
    o.searchField.resize(w - 40, h);
}

function SearchWidget_init() {
    var o = this;
    o.oldInit();
    o.searchField.init();
    o.searchIcn.init();
    o.searchIcn.setDisabled((o.searchField.getValue() == ""));
    o.updateMatchCase(o.bMatchCase);
}

function SearchWidget_isCaseSensitive() {
    return this.bMatchCase;
}

function SearchWidget_setCaseSensitive(b) {
    var o = this;
    if (o.bMatchCase != b) {
        o.updateMatchCase(b);
        o.bMatchCase = b;
    }
}

function SearchWidget_updateMatchCase(b) {
    var o = this;
    o.normal.check(!b);
    o.matchCase.check(b);
    if (b) {
        o.searchIcn.icon.changeImg(55, 0);
    } else {
        o.searchIcn.icon.changeImg(0, 0);
    }
}

function SearchWidget_normalClickCB() {
    var o = this.par.parIcon.par;
    if (o.bMatchCase) {
        o.bMatchCase = false;
    }
    o.updateMatchCase(o.bMatchCase);
}

function SearchWidget_matchCaseClickCB() {
    var o = this.par.parIcon.par;
    if (!o.bMatchCase) {
        o.bMatchCase = true;
    }
    o.updateMatchCase(o.bMatchCase);
}

function SearchWidget_keyUpCB() {
    var p = this.par;
    p.searchIcn.setDisabled((this.getValue() == ""));
}

function SearchWidget_searchCB() {
    var p = this.par;
    if (p.searchCB != null) {
        p.searchCB();
    }
}

function SearchWidget_getSearchValue() {
    var o = this;
    return o.searchField.getValue();
}

function SearchWidget_setSearchValue(s) {
    var o = this;
    o.searchField.setValue(s);
}

if (bobj.crv.config.isDebug) {
    localErrHandler = null;
}
initDom(bobj.crvUri("../dhtmllib/images/") + bobj.crv.config.skin + "/", "", bobj.crv.config.lang);
styleSheet();
_allBOIcons = new Array;
_allBOIconsMenus = new Array;
_menuType_simple = 0;
_menuType_color = 1;
_menuType_border = 2;

function NewLabelWidget(id, text, convBlanks) {
    var o = newWidget(id);
    o.text = text;
    o.convBlanks = convBlanks;
    o.getHTML = LabelWidget_getHTML;
    o.setDisabled = LabelWidget_setDisabled;
    o.dis = false;
    return o;
}

function LabelWidget_setDisabled(dis) {
    var o = this;
    if (o.dis != dis) {
        o.dis = dis;
        if (o.layer) {
            o.layer.className = "iconText" + (dis ? "Dis" : "");
        }
    }
}

function LabelWidget_getHTML() {
    var o = this;
    return '<div id="' + o.id + '" class="icontext' + (o.dis ? "Dis" : "") + '" style="white-space:nowrap;margin-right:4px;margin-left:4px;cursor:default">' + convStr(o.text, o.convBlanks) + "</div>";
}

function newIconWidget(id, src, clickCB, text, alt, w, h, dx, dy, disDx, disDy) {
    var o = newWidget(id);
    o.src = src;
    o.clickCB = clickCB;
    o.text = text;
    o.alt = alt;
    o.width = null;
    o.txtAlign = "left";
    o.border = 4;
    o.txtNoPadding = false;
    o.allowDblClick = false;
    if (src) {
        o.w = (w != null) ? w : 16;
        o.h = (h != null) ? h : 16;
        o.dx = (dx != null) ? dx : 0;
        o.dy = (dy != null) ? dy : 0;
        o.disDx = (disDx != null) ? disDx : 0;
        o.disDy = (disDy != null) ? disDy : 0;
    } else {
        o.w = 1;
        o.h = 16;
    }
    o.dis = false;
    o.disp = true;
    o.margin = 1;
    o.extraHTML = "";
    o.imgLayer = null;
    o.txtLayer = null;
    o.overCB = "IconWidget_overCB";
    o.outCB = "IconWidget_outCB";
    o.isDisplayed = IconWidget_isDisplayed;
    o.setDisplay = IconWidget_setDisplay;
    o.getHTML = IconWidget_getHTML;
    o.getTxtWidth = IconWidget_getTxtWidth;
    o.index = _allBOIcons.length++;
    o.nocheckClass = "iconnocheck";
    o.hoverClass = "iconhover";
    o.checkClass = "iconcheck";
    o.checkhoverClass = "iconcheckhover";
    o.currentClass = o.nocheckClass;
    o.currentHoverClass = o.hoverClass;
    o.setClasses = IconWidget_setClasses;
    o.internalUpCB = null;
    o.internalDownCB = IconWidget_internalDownCB;
    o.internalUpCB = IconWidget_internalUpCB;
    o.isHover = false;
    o.changeTooltip = IconWidget_changeTooltip;
    o.changeText = IconWidget_changeText;
    o.changeImg = IconWidget_changeImg;
    o.setDisabled = IconWidget_setDisabled;
    o.isDisabled = IconWidget_isDisabled;
    o.acceptClick = IconWidget_acceptClick;
    _allBOIcons[o.index] = o;
    o.outEnable = true;
    o.setCrs = IconWidget_setCrs;
    o.oldRes = o.resize;
    o.resize = IconWidget_resize;
    o.iconOldInit = o.init;
    o.init = IconWidget_init;
    return o;
}

function newIconMenuWidget(id, src, clickCB, text, alt, w, h, dx, dy, disDx, disDy, isColor, beforeShowCB, menuType) {
    var o = newWidget(id);
    if (typeof (menuType) == "undefined") {
        menuType = isColor ? _menuType_color : _menuType_simple;
    }
    o.menuItemType = isColor ? _isColor : _isNotColor;
    o.icon = newIconWidget("iconMenu_icon_" + id, src, IconMenuWidget_iconClickCB, text, alt, w, h, dx, dy, disDx, disDy);
    o.arrow = newIconWidget("iconMenu_arrow_" + id, _skin + "menus.gif", IconMenuWidget_arrowClickCB, null, (_openMenuPart1 + (text ? text : (alt ? alt : "")) + _openMenuPart2), 7, 16, 0, 81, 0, 97);
    switch (menuType) {
        case _menuType_color:
            o.menu = newMenuColorWidget("iconMenu_menu_" + id, IconMenuWidget_hideCB);
            break;
        case _menuType_border:
            o.menu = newMenuBordersWidget("iconMenu_menu_" + id, IconMenuWidget_hideCB, beforeShowCB, IconBordersMenuWidget_internalClickCB);
            break;
        default:
        case _menuType_simple:
            o.menu = newMenuWidget("iconMenu_menu_" + id, IconMenuWidget_hideCB, beforeShowCB);
            break;
    }
    o.icon.par = o;
    o.arrow.par = o;
    o.menu.parIcon = o;
    o.icon.margin = 0;
    o.arrow.margin = 0;
    o.icon.overCB = "IconWidget_none";
    o.icon.outCB = "IconWidget_none";
    o.arrow.overCB = "IconWidget_none";
    o.arrow.outCB = "IconWidget_none";
    o.margin = 1;
    o.spc = 0;
    o.getHTML = IconMenuWidget_getHTML;
    o.clickCB = clickCB;
    o.getMenu = IconMenuWidget_getMenu;
    o.menIcnOldInit = o.init;
    o.init = IconMenuWidget_init;
    o.index = _allBOIconsMenus.length++;
    _allBOIconsMenus[o.index] = o;
    o.setDisabled = IconMenuWidget_setDisabled;
    o.isDisabled = IconMenuWidget_isDisabled;
    o.disableMenu = IconMenuWidget_disableMenu;
    o.changeText = IconMenuWidget_changeText;
    o.imwpResize = o.resize;
    o.resize = IconMenuWidget_resize;
    o.focus = IconMenuWidget_focus;
    o.changeArrowTooltip = IconMenuWidget_changeArrowTooltip;
    o.disp = true;
    o.isDisplayed = IconWidget_isDisplayed;
    o.setDisplay = IconWidget_setDisplay;
    return o;
}

function IconMenuWidget_changeText(s) {
    this.icon.changeText(s);
}

function IconMenuWidget_changeArrowTooltip(tooltip) {
    this.arrow.changeTooltip(tooltip, false);
}

function IconMenuWidget_resize(w, h) {
    var o = this;
    if (w != null) {
        w = Math.max(0, w - 2 * o.margin);
    }
    var d = o.layer.display != "none";
    if (d & _moz && !_saf) {
        o.setDisplay(false);
    }
    o.imwpResize(w, h);
    if (w != null) {
        o.icon.resize(Math.max(0, w - 13 - o.spc));
    }
    if (d & _moz && !_saf) {
        o.setDisplay(true);
    }
}

function IconMenuWidget_setDisabled(dis) {
    var o = this;
    if (dis) {
        if (o.menu.isShown()) {
            o.menu.show(false);
        }
        IconMenuWidgetOutCB(o.index);
    }
    o.icon.setDisabled(dis);
    o.arrow.setDisabled(dis);
}

function IconMenuWidget_isDisabled() {
    return (this.icon.dis == true);
}

function IconMenuWidget_internalCB() {
    var o = this, col = null;
    if (o.id != null) {
        col = (o.menuItemType != _isLastUsedColor) ? o.id.slice(6) : o.color;
    }
    var icon = o.par.parIcon;
    icon.oldColor = icon.curColor;
    icon.curColor = col;
    if (icon.curColor != null) {
        icon.showSample();
    }
    if (icon.clickColor) {
        icon.clickColor();
    }
}

function IconMenuWidget_focus() {
    var o = this;
    o.arrow.focus();
}

function IconMenuWidget_disableMenu(b) {
    var o = this;
    o.arrow.setDisabled(b);
    o.menu.setDisabled(b);
}

function IconMenuWidget_getMenu() {
    return this.menu;
}

function IconWidget_none() {
}

function IconMenuWidget_init() {
    var o = this;
    o.menIcnOldInit();
    o.icon.init();
    o.arrow.init();
    o.menu.init();
    var l = o.layer;
    l.onmouseover = IconMenuWidget_OverCB;
    l.onmouseout = IconMenuWidget_OutCB;
}

function IconMenuWidget_getHTML() {
    var o = this, d = o.disp ? "" : "display:none;";
    return '<table id="' + o.id + '" cellspacing="0" cellpadding="0" border="0" style="' + d + "margin:" + o.margin + 'px"><tr><td>' + o.icon.getHTML() + '</td><td style="padding-left:' + o.spc + 'px" width="' + (13 + o.spc) + '">' + o.arrow.getHTML() + "</td></table>";
}

function IconMenuWidget_OverCB() {
    IconMenuWidgetOverCB(getWidget(this).index);
    return true;
}

function IconMenuWidget_OutCB() {
    IconMenuWidgetOutCB(getWidget(this).index);
}

function IconMenuWidgetOverCB(i) {
    o = _allBOIconsMenus[i];
    IconWidget_overCB(o.icon.index);
    IconWidget_overCB(o.arrow.index);
}

function IconMenuWidgetOutCB(i) {
    o = _allBOIconsMenus[i];
    if (!o.menu.isShown()) {
        IconWidget_outCB(o.icon.index);
        IconWidget_outCB(o.arrow.index);
    } else {
        IconWidget_overCB(o.icon.index);
        IconWidget_overCB(o.arrow.index);
    }
}

function IconMenuWidget_iconClickCB() {
    var o = this.par;
    if (o.clickCB == null) {
        var l = o.layer;
        var position = getPos2(l);
        o.menu.show(!o.menu.isShown(), position.x, position.y + o.getHeight() + 1, null, null, o);
        IconMenuWidgetOverCB(o.index);
    } else {
        o.clickCB();
    }
}

function IconMenuWidget_arrowClickCB() {
    var o = this.par, l = o.layer;
    var position = getPos2(l);
    o.menu.show(!o.menu.isShown(), position.x, position.y + o.getHeight() + 1, null, null, o);
    IconMenuWidgetOverCB(o.index);
}

function IconMenuWidget_hideCB() {
    var o = this.parIcon;
    if (o.arrow) {
        o.arrow.focus();
    }
    IconMenuWidgetOutCB(o.index);
}

function newIconCheckWidget(id, src, clickCB, text, alt, w, h, dx, dy, disDx, disDy) {
    var o = newIconWidget(id, src, clickCB, text, alt, w, h, dx, dy, disDx, disDy);
    o.checked = false;
    o.internalUpCB = IconCheckWidget_internalUpCB;
    o.internalDownCB = IconCheckWidget_internalDownCB;
    o.check = IconCheckWidget_check;
    o.isChecked = IconCheckWidget_isChecked;
    o.oldInit = o.init;
    o.init = IconCheckWidget_init;
    o.isRadio = false;
    return o;
}

function newPaletteContainerWidget(id, contextMenu, margin) {
    var o = newWidget(id);
    o.beginHTML = PaletteContainerWidget_beginHTML;
    o.endHTML = PaletteContainerWidget_endHTML;
    o.add = PaletteContainerWidget_add;
    o.palettes = new Array;
    o.contextMenu = contextMenu;
    o.margin = (margin != null) ? margin : 4;
    return o;
}

function newPaletteWidget(id, height) {
    var o = newWidget(id);
    o.getHTML = PaletteWidget_getHTML;
    o.add = PaletteWidget_add;
    o.disableChildren = PaletteWidget_disableChildren;
    o.items = new Array;
    o.oldInit = o.init;
    o.init = PaletteWidget_init;
    o.beginRightZone = PaletteWidget_beginRightZone;
    o.height = height;
    o.rightZoneIndex = -1;
    o.sepCount = 0;
    o.vertPadding = 4;
    return o;
}

function newPaletteSepWidget(id) {
    var o = newWidget(id);
    o.getHTML = PaletteSepWidget_getHTML;
    o.isSeparator = true;
    return o;
}

function newPaletteVerticalSepWidget(id) {
    var o = newWidget(id);
    o.getHTML = PaletteVerticalSepWidget_getHTML;
    o.isSeparator = true;
    return o;
}

function PaletteVerticalSepWidget_getHTML() {
    return img(_skin + "iconsep.gif", 6, 22, null, ' id="' + this.id + '" ');
}

function getPaletteSep() {
    return img(_skin + "iconsep.gif", 6, 22);
}

function IconRadioWidget_uncheckOthers() {
    var g = this.groupInstance, idx = this.groupIdx, len = g.length;
    for (var i = 0; i < len; i++) {
        if (i != idx) {
            var c = g[i];
            if (c) {
                c.check(false);
            }
        }
    }
}

function PaletteWidget_beginRightZone() {
    this.rightZoneIndex = this.items.length;
}

function PaletteSepWidget_getHTML() {
    return '<div style="background-image:url(' + _skin + 'sep.gif);height:2px;padding:0px;margin-top:0px;margin-bottom:0px;margin-left:4px;margin-right:4px">' + getSpace(1, 2) + "</div>";
}

function PaletteContainerWidget_beginHTML() {
    var o = this;
    var cm = o.contextMenu ? ('oncontextmenu="' + _codeWinName + '.PaletteContainerWidget_contextMenu(this,event);return false"') : "";
    return "<div " + cm + 'class="palette" style="overflow:hidden;margin:' + o.margin + 'px;" id="' + o.id + '">';
}

_delayedMenu = null;

function PaletteContainerWidget_contextMenu(o, e) {
    if (_ie) {
        e = _curWin.event;
    }
    _delayedMenu = getWidget(o).contextMenu;
    setTimeout("_delayedMenu.par=null;_delayedMenu.show(true," + absxpos(e) + "," + absypos(e) + ")", 1);
}

function PaletteContainerWidget_endHTML() {
    return "</div>";
}

function PaletteContainerWidget_add(palette) {
    this.palettes[this.palettes.length] = palette;
    return palette;
}

function PaletteWidget_getHTML() {
    var o = this, items = o.items, len = items.length, fields = new Array;
    j = 0;
    fields[j++] = '<table style="position:relative;overflow:hidden" id="' + o.id + '" ' + attr("height", o.height) + ' cellspacing="0" cellpadding="0" ' + (_ie ? "" : 'width="100%"') + '><tbody><tr valign="middle">';
    fields[j++] = '<td align="left" style="padding-left:' + o.vertPadding + 'px;padding-right:4px"><table cellspacing="0" cellpadding="0"><tbody><tr valign="middle">';
    var haveRightZone = false;
    for (var i = 0; i < len; i++) {
        if (i == o.rightZoneIndex) {
            fields[j++] = '</tr></tbody></table></td><td width="100%" align="right" style="padding-right:' + o.vertPadding + 'px"><table cellspacing="0" cellpadding="0"><tbody><tr valign="middle">';
            haveRightZone = true;
        }
        var it = items[i];
        fields[j++] = "<td>" + it.getHTML() + "</td>";
    }
    if (!haveRightZone) {
        fields[j++] = '</tr></tbody></table></td><td width="100%" align="right" style="padding-right:4px"><table cellspacing="0" cellpadding="0"><tbody><tr valign="middle"><td></td>';
    }
    fields[j++] = "</tr></tbody></table></td></tr></tbody></table>";
    return fields.join("");
}

function PaletteWidget_add(item) {
    if (item == null) {
        item = newPaletteVerticalSepWidget(this.id + "_palettesep_" + (this.sepCount++));
    }
    this.items[this.items.length] = item;
    return item;
}

function PaletteWidget_disableChildren(dis) {
    var items = this.items;
    for (var i in items) {
        var item = items[i];
        if (item && (item.isSep != true)) {
            item.setDisabled(dis);
        }
    }
}

function PaletteWidget_init() {
    this.oldInit();
    var items = this.items;
    for (var i in items) {
        var item = items[i];
        if (item) {
            item.init();
        }
    }
}

function IconWidget_isDisplayed() {
    return this.disp;
}

function IconWidget_setDisplay(d) {
    var o = this;
    if (o.css) {
        var ds = d ? "block" : "none";
        if (o.css.display != ds) {
            o.css.display = ds;
        }
    }
    o.disp = d;
}

function IconWidget_getTxtWidth() {
    var o = this, w = o.width;
    if (w != null) {
        w = w - (o.margin * 2);
        w = w - (o.src ? o.w + o.border : 1);
        w = w - (o.txtNoPadding ? 0 : ((o.src ? 4 : 2) + 2));
        if (_ie) {
            w -= 2;
        } else {
            w -= 2;
        }
        return Math.max(0, w);
    } else {
        return -1;
    }
}

function IconWidget_init() {
    var o = this, dblClick = false;
    o.iconOldInit();
    var l = o.layer;
    l.tabIndex = o.dis ? -1 : 0;
    l.title = (o.alt ? o.alt : (o.text ? o.text : ""));
    if (o.clickCB) {
        l.onclick = IconWidget_upCB;
        l.onmousedown = IconWidget_downCB;
        if (o.allowDblClick && (_ie || _saf)) {
            dblClick = true;
            addDblClickCB(l, IconWidget_upCB);
        }
        l.onkeydown = IconWidget_keydownCB;
        l.onmouseover = IconWidget_realOverCB;
        l.onmouseout = IconWidget_realOutCB;
    }
    if (!dblClick) {
        addDblClickCB(l, IconWidget_retFalse);
    }
    l.onselectstart = IconWidget_retFalse;
    var d = o.disp ? "block" : "none";
    if (o.css.display != d) {
        o.css.display = d;
    }
}

function IconWidget_getHTML() {
    var o = this,
        imgCode = o.src ? '<div style="overflow:hidden;height:' + (o.h + o.border) + "px;width:" + (o.w + o.border) + 'px;">' + simpleImgOffset(o.src, o.w, o.h, o.dis ? o.disDx : o.dx, o.dis ? o.disDy : o.dy, "IconImg_" + o.id, null, o.alt, "margin:2px;cursor:" + (o.clickCB ? (!o.acceptClick() ? "default" : _hand) : "default")) + o.extraHTML + "</div>" : '<div class="icontext" style="width:1px;height:' + (o.h + o.border) + 'px"></div>';
    var txtAtt = 'style="white-space:nowrap;', txtW = o.getTxtWidth();
    if (txtW >= 0) {
        txtAtt += "text-overflow:ellipsis;overflow:hidden;width:" + txtW + "px";
    }
    txtAtt += '"';
    var d = o.disp ? "" : "display:none;";
    return '<table style="' + d + "height:" + (o.h + o.border + (_moz ? 2 : 0)) + "px;" + (o.width != null ? "width:" + o.width + "px;" : "") + "margin:" + o.margin + 'px" id="' + o.id + '" class="' + o.nocheckClass + '" cellspacing="0" cellpadding="0" border="0"><tr valign="middle">' + "<td>" + ((o.clickCB && _ie) ? lnk(imgCode, null, null, null, ' tabIndex="-1"') : imgCode) + "</td>" + (o.text ? '<td align="' + o.txtAlign + '" style="padding-left:' + (o.txtNoPadding ? 0 : (o.src ? 4 : 2)) + "px;padding-right:" + (o.txtNoPadding ? 0 : 2) + 'px"><div id="IconImg_Txt_' + o.id + '" class="icontext' + (o.dis ? "Dis" : "") + '" ' + txtAtt + ">" + convStr(o.text) + "</div></td>" : "") + "</tr></table>";
}

function IconWidget_realOutCB() {
    var o = getWidget(this);
    eval(o.outCB + "(" + o.index + ")");
}

function IconWidget_realOverCB() {
    var o = getWidget(this);
    eval(o.overCB + "(" + o.index + ")");
    return true;
}

function IconWidget_retFalse() {
    return false;
}

function IconWidget_resize(w, h) {
    var o = this;
    if (o.layer) {
        o.oldRes(w, h);
    }
    if (o.txtLayer == null) {
        o.txtLayer = getLayer("IconImg_Txt_" + o.id);
    }
    if (w != null) {
        o.width = w;
        var txtW = o.getTxtWidth();
        if (o.txtLayer && (txtW >= 0)) {
            o.txtLayer.style.width = "" + txtW + "px";
        }
    }
    if (h != null) {
        o.h = h ? (h - o.border) : o.h;
        if (o.txtLayer && (o.h >= 0)) {
            o.txtLayer.style.height = "" + o.h + "px";
        }
    }
}

function IconWidget_changeTooltip(s, isTemporary) {
    var o = this;
    if (s == null) {
        return;
    }
    if (!isTemporary) {
        o.alt = s;
    }
    if (o.layer) {
        o.layer.title = s;
    }
    if (o.imgLayer == null) {
        o.imgLayer = getLayer("IconImg_" + this.id);
    }
    if (o.imgLayer) {
        changeSimpleOffset(o.imgLayer, null, null, null, s);
    }
}

function IconWidget_changeText(s) {
    var o = this;
    o.text = s;
    if (o.layer) {
        if (o.txtLayer == null) {
            o.txtLayer = getLayer("IconImg_Txt_" + o.id);
        }
        o.txtLayer.innerHTML = convStr(s);
    }
}

function IconWidget_changeImg(dx, dy, src) {
    var o = this;
    if (src) {
        o.src = src;
    }
    if (dx != null) {
        o.dx = dx;
    }
    if (dy != null) {
        o.dy = dy;
    }
    if (o.layer && (o.imgLayer == null)) {
        o.imgLayer = getLayer("IconImg_" + this.id);
    }
    if (o.imgLayer) {
        changeSimpleOffset(o.imgLayer, dx, dy, o.src);
    }
}

function IconWidget_internalDownCB() {
    if (!this.dis) {
        this.currentHoverClass = this.checkhoverClass;
    }
}

function IconWidget_internalUpCB() {
    if (!this.dis) {
        this.currentHoverClass = this.hoverClass;
    }
}

function IconWidget_setCrs() {
    var o = this, crs = (o.clickCB ? (!o.acceptClick() ? "default" : _hand) : "default");
    o.css.cursor = crs;
    if (o.src) {
        if (o.imgLayer == null) {
            o.imgLayer = getLayer("IconImg_" + o.id);
        }
        if (o.imgLayer) {
            o.imgLayer.style.cursor = crs;
        }
    }
}

function IconWidget_downCB() {
    var o = getWidget(this);
    if ((o.layer) && (o.acceptClick())) {
        o.internalDownCB();
        o.layer.className = o.currentHoverClass;
    }
    if (_ie || _saf) {
        return false;
    }
}

function IconWidget_upCB() {
    var o = getWidget(this);
    if ((o.layer) && (o.acceptClick())) {
        o.internalUpCB();
        o.layer.className = o.isHover ? o.currentHoverClass : o.currentClass;
        o.setCrs();
        setTimeout("delayedClickCB(" + o.index + ")", 1);
    }
}

function IconWidget_keydownCB(e) {
    if (eventGetKey(e) == 13) {
        var o = getWidget(this);
        if ((o.layer) && (o.acceptClick())) {
            o.internalUpCB();
            o.layer.className = o.isHover ? o.currentHoverClass : o.currentClass;
            o.setCrs();
            setTimeout("delayedClickCB(" + o.index + ")", 1);
        }
        eventCancelBubble(e);
    }
}

function delayedClickCB(index) {
    var o = _allBOIcons[index];
    if (o.beforeClickCB) {
        o.beforeClickCB();
    }
    if (o.clickCB) {
        o.clickCB();
    }
}

function IconWidget_overCB(index) {
    var o = _allBOIcons[index];
    o.setCrs();
    if ((o.layer) && (!o.dis) && !(o.par && o.par.checked)) {
        o.isHover = true;
        o.layer.className = o.currentHoverClass;
    }
}

function IconWidget_outCB(index) {
    var o = _allBOIcons[index];
    if ((o.layer) && (o.outEnable) && !(o.par && o.par.checked)) {
        o.isHover = false;
        o.layer.className = o.currentClass;
    }
}

function IconCheckWidget_init() {
    var o = this;
    o.oldInit();
    o.check(o.checked, true);
}

function IconCheckWidget_internalDownCB() {
    var o = this;
    if (o.acceptClick()) {
        o.currentHoverClass = o.checked ? o.hoverClass : o.checkhoverClass;
    }
}

function IconCheckWidget_internalUpCB() {
    var o = this;
    if (o.acceptClick()) {
        o.checked = o.isRadio ? true : !o.checked;
        o.currentClass = o.checked ? this.checkClass : this.nocheckClass;
        o.currentHoverClass = o.checked ? this.checkhoverClass : this.hoverClass;
    }
}

function IconCheckWidget_check(checked, force) {
    var o = this;
    if ((o.checked != checked) || force) {
        o.checked = checked;
        if (o.layer) {
            o.layer.className = o.currentClass = o.checked ? this.checkClass : this.nocheckClass;
            o.currentHoverClass = o.checked ? this.checkhoverClass : this.hoverClass;
        }
    }
    if (o.checked && o.beforeClickCB) {
        if (o.layer) {
            o.beforeClickCB();
        }
    }
}

function IconCheckWidget_isChecked() {
    return this.checked;
}

function IconWidget_setClasses(nocheck, check, hover, checkhover) {
    var o = this;
    o.nocheckClass = nocheck;
    o.checkClass = check;
    o.hoverClass = hover;
    o.checkhoverClass = checkhover;
    o.currentClass = o.nocheckClass;
    o.currentHoverClass = o.hoverClass;
}

function IconWidget_setDisabled(dis) {
    var o = this;
    if (o.dis != dis) {
        o.dis = dis;
        if (o.layer) {
            o.setCrs();
            if (o.src) {
                if (o.imgLayer == null) {
                    o.imgLayer = getLayer("IconImg_" + this.id);
                }
                changeSimpleOffset(o.imgLayer, dis ? o.disDx : o.dx, dis ? o.disDy : o.dy);
            }
            if (o.text) {
                if (o.txtLayer == null) {
                    o.txtLayer = getLayer("IconImg_Txt_" + o.id);
                }
                o.txtLayer.className = "iconText" + (dis ? "Dis" : "");
                if (dis) {
                    o.layer.className = o.currentClass;
                }
            }
            o.layer.tabIndex = o.dis ? -1 : 0;
        }
    }
}

function IconWidget_isDisabled() {
    return this.dis ? this.dis : false;
}

function IconWidget_acceptClick() {
    var o = this;
    if (o.isDisabled()) {
        return false;
    }
    if (o.isRadio && o.checked) {
        return false;
    }
    return true;
}

function newCustomCombo(id, changeCB, noMargin, width, tooltip, url, w, h, dx, dy, disDx, disDy) {
    var o = newIconMenuWidget(id, url, null, " ", tooltip, w, h, dx, dy, disDx, disDy);
    o.icon.width = width != null ? Math.max(0, width - 13) : 50 - (2 * o.margin);
    o.icon.setClasses("combonocheck", "combocheck", "combohover", "combocheck");
    o.icon.clip;
    o.arrow.setClasses("iconnocheck", "combobtnhover", "combobtnhover", "combobtnhover");
    o.spc = 0;
    o.margin = 2;
    if (url == null) {
        o.icon.h = 12;
        o.arrow.h = 12;
        o.arrow.dy += 2;
        o.arrow.disDy += 2;
    }
    o.counter = 0;
    o.changeCB = changeCB;
    o.selectedItem = null;
    o.setOldDid = o.setDisabled;
    o.disabled = false;
    o.ccomboOldInit = o.init;
    o.init = CustomCombo_init;
    o.add = CustomCombo_add;
    o.addSeparator = CustomCombo_addSeparator;
    o.addMenuItem = CustomCombo_addMenuItem;
    o.select = CustomCombo_select;
    o.getSelection = CustomCombo_getSelection;
    o.valueShow = CustomCombo_valueShow;
    o.valueSelect = CustomCombo_valueSelect;
    o.setUndefined = CustomCombo_setUndefined;
    o.setDisabled = CustomCombo_setDisabled;
    o.getVisibleItemsCount = CustomCombo_getVisibleItemsCount;
    o.selectItem = CustomCombo_selectItem;
    o.getItemByIndex = CustomCombo_getItemByIndex;
    o.getItemIndex = CustomCombo_getItemIndex;
    o.setItemDisabled = CustomCombo_setItemDisabled;
    return o;
}

function CustomCombo_init() {
    var o = this;
    o.ccomboOldInit();
    if (o.disabled) {
        o.icon.changeTooltip(o.icon.alt ? o.icon.alt : "", true);
    }
    o.arrow.changeTooltip(_openMenuPart1 + (o.icon.alt ? o.icon.alt : "") + _openMenuPart2);
}

function CustomCombo_add(s, val, selected) {
    var o = this;
    var item = o.menu.addCheck(o.id + "_it_" + (o.counter++), s, CustomCombo_internalCB);
    item.val = "" + val;
    item.parCombo = o;
    item.isComboVal = true;
    if ((o.selectedItem == null) || selected) {
        o.selectItem(item);
    }
}

function CustomCombo_addSeparator() {
    this.menu.addSeparator();
}

function CustomCombo_addMenuItem(id, text, cb, icon, dx, dy, disabled, disDx, disDy) {
    this.menu.add(id, text, cb, icon, dx, dy, disabled, disDx, disDy);
}

function CustomCombo_internalCB() {
    var o = this, c = o.parCombo;
    c.selectItem(o);
    if (c.changeCB) {
        c.changeCB();
    }
}

function CustomCombo_getItemByIndex(idx) {
    var items = this.menu.items;
    return ((idx >= 0) && (idx < items.length)) ? items[idx] : null;
}

function CustomCombo_getItemIndex(item) {
    var items = this.menu.items, len = items.length, j = 0;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if (it.isComboVal) {
            if (it.id == item.id) {
                return j;
            }
            j++;
        }
    }
    return -1;
}

function CustomCombo_selectItem(item) {
    var o = this;
    if (o.selectedItem) {
        o.selectedItem.check(false);
    }
    if (item) {
        o.val = item.val;
        o.icon.changeText(o.disabled ? "" : item.text);
        o.selectedItem = item;
        item.check(true);
        if (o.disabled) {
            o.icon.changeTooltip(o.icon.alt ? o.icon.alt : "", true);
        } else {
            o.icon.changeTooltip(o.icon.alt ? (o.icon.alt + " (" + item.text) + ")" : (item.text), true);
        }
    } else {
        o.val = null;
        o.icon.changeText("");
        o.icon.changeTooltip(o.icon.alt ? o.icon.alt : "", true);
        o.selectedItem = null;
    }
}

function CustomCombo_setDisabled(d) {
    var o = this;
    if (o.selectedItem) {
        o.icon.changeText(d ? "" : o.selectedItem.text);
    }
    o.disabled = d;
    o.setOldDid(d);
    if (d) {
        o.icon.changeTooltip(o.icon.alt ? o.icon.alt : "", true);
    }
}

function CustomCombo_select(idx) {
    var o = this, item = o.getItemByIndex(idx);
    if (item) {
        o.selectItem(item);
    }
}

function CustomCombo_setItemDisabled(idx, disabled) {
    var o = this, item = o.getItemByIndex(idx);
    if (item) {
        item.setDisabled(disabled);
    }
}

function CustomCombo_getSelection() {
    var o = this, it = o.selectedItem;
    if (it) {
        return {index: o.getItemIndex(it), value: it.val};
    } else {
        return null;
    }
}

function CustomCombo_valueSelect(v) {
    v = "" + v;
    var o = this, items = o.menu.items, len = items.length;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if ((it.isComboVal) && (it.val == v) && (it.isShown)) {
            o.selectItem(it);
            return true;
        }
    }
    return false;
}

function CustomCombo_valueShow(v, show) {
    v = "" + v;
    var o = this, items = o.menu.items, len = items.length;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if ((it.isComboVal) && (it.val == v)) {
            it.show(show);
            return;
        }
    }
}

function CustomCombo_setUndefined(u) {
    var o = this;
    if (u) {
        o.selectItem(null);
    }
}

function CustomCombo_getVisibleItemsCount() {
    var o = this, items = o.menu.items, len = items.length, n = 0;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if ((it.isComboVal) && (it.isShown)) {
            n++;
        }
    }
    return n;
}

function newComboTextFieldWidget(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width, focusCB, blurCB) {
    var o = newTextFieldWidget(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width, focusCB, blurCB);
    o.par = null;
    o.oldInit = o.init;
    o.init = ComboTextFieldWidget_init;
    o.setContentEditable = ComboTextFieldWidget_setContentEditable;
    o.isContentEditable = ComboTextFieldWidget_isContentEditable;
    o.getHTML = ComboTextFieldWidget_getHTML;
    o.oldSetDisabled = o.setDisabled;
    o.setDisabled = ComboTextFieldWidget_setDisabled;
    return o;
}

function ComboTextFieldWidget_init() {
    var o = this;
    o.oldInit();
    var l = o.layer;
    if (l != null) {
        o.setContentEditable(true);
        l.onclick = ComboTextFieldWidget_onClick;
    }
}

function ComboTextFieldWidget_setContentEditable(d) {
    var o = this, l = o.layer;
    o.contentEditable = d;
    if (l) {
        l.contentEditable = d;
        l.style.cursor = d ? "text" : _hand;
        l.className = d ? "comboEditable" : "combo";
    }
}

function ComboTextFieldWidget_isContentEditable() {
    var o = this;
    return o.contentEditable;
}

function ComboTextFieldWidget_onClick() {
    var o = getWidget(this);
    if (o.contentEditable) {
        return;
    }
    if (o.par != null) {
        o.par.clickCB();
    }
}

function ComboTextFieldWidget_getHTML() {
    var o = this;
    return "<input" + (o.disabled ? " disabled" : "") + ' oncontextmenu="event.cancelBubble=true;return true" style="' + sty("width", this.width) + (_moz ? "margin-top:1px;margin-bottom:1px;padding-left:2px;padding-right:2px;" : "") + (_isQuirksMode ? "height:18px;" : "height:14px;") + "margin-left:" + (this.noMargin ? 0 : 10) + 'px" onfocus="' + _codeWinName + '.TextFieldWidget_focus(this)" onblur="' + _codeWinName + '.TextFieldWidget_blur(this)" onchange="' + _codeWinName + '.TextFieldWidget_changeCB(event,this)" onkeydown=" return ' + _codeWinName + '.TextFieldWidget_keyDownCB(event,this);" onkeyup=" return ' + _codeWinName + '.TextFieldWidget_keyUpCB(event,this);" onkeypress=" return ' + _codeWinName + '.TextFieldWidget_keyPressCB(event,this);" type="text" ' + attr("maxLength", this.maxChar) + ' ondragstart="event.cancelBubble=true;return true" onselectstart="event.cancelBubble=true;return true" class="combo" id="' + this.id + '" name="' + this.id + '"' + attr("title", this.tooltip) + ' value="">';
}

function ComboTextFieldWidget_setDisabled(d) {
    var o = this;
    o.oldSetDisabled(d);
}

function newTextComboWidget(id, maxChar, tooltip, w, changeCB, checkCB, beforeShowCB, formName) {
    var o = newWidget(id);
    o.text = newComboTextFieldWidget((formName ? formName : "text_" + id), TextComboWidget_checkCB, maxChar, null, TextComboWidget_enterCB, true, tooltip, w - 13);
    o.arrow = newIconWidget("arrow_" + id, _skin + "menus.gif", TextComboWidget_arrowClickCB, null, (_openMenuPart1 + (tooltip ? tooltip : "") + _openMenuPart2), 7, 16, 0, 81, 0, 97);
    o.menu = newMenuWidget("menu_" + id, TextComboWidget_hideCB, beforeShowCB);
    o.arrow.setClasses("iconnocheck", "combobtnhover", "combobtnhover", "combobtnhover");
    o.text.par = o;
    o.arrow.par = o;
    o.menu.parIcon = o;
    o.arrow.margin = 0;
    o.arrow.overCB = "IconWidget_none";
    o.arrow.outCB = "IconWidget_none";
    o.margin = 0;
    o.spc = 0;
    o.counter = 0;
    o.arrow.h = 12;
    o.arrow.dy += 2;
    o.arrow.disDy += 2;
    o.index = _allBOIconsMenus.length++;
    _allBOIconsMenus[o.index] = o;
    o.menIcnOldInit = o.init;
    o.init = TextComboWidget_init;
    o.imwpResize = o.resize;
    o.resize = TextComboWidget_resize;
    o.getHTML = TextComboWidget_getHTML;
    o.setDisabled = TextComboWidget_setDisabled;
    o.isDisabled = TextComboWidget_isDisabled;
    o.add = TextComboWidget_add;
    o.addSeparator = TextComboWidget_addSeparator;
    o.addMenuItem = TextComboWidget_addMenuItem;
    o.select = TextComboWidget_select;
    o.getSelection = TextComboWidget_getSelection;
    o.valueShow = TextComboWidget_valueShow;
    o.valueSelect = TextComboWidget_valueSelect;
    o.setUndefined = TextComboWidget_setUndefined;
    o.setContentEditable = TextComboWidget_setContentEditable;
    o.isContentEditable = TextComboWidget_isContentEditable;
    o.changeCB = changeCB;
    o.checkCB = checkCB;
    o.clickCB = TextComboWidget_clickCB;
    o.selectItem = TextComboWidget_selectItem;
    o.getItemByIndex = TextComboWidget_getItemByIndex;
    o.getItemIndex = TextComboWidget_getItemIndex;
    o.setItemDisabled = TextComboWidget_setItemDisabled;
    o.text.enterCancelBubble = false;
    return o;
}

function TextComboWidget_init() {
    var o = this;
    o.menIcnOldInit();
    o.text.init();
    o.arrow.init();
    o.menu.init();
    var l = o.layer;
    l.onmouseover = TextCombo_OverCB;
    l.onmouseout = TextCombo_OutCB;
}

function TextComboWidget_getHTML() {
    var o = this, s = "";
    s += '<table id="' + o.id + '" cellspacing="0" cellpadding="0" border="0" style="cursor:default;margin:' + o.margin + 'px"><tbody><tr>';
    s += "<td>" + o.text.getHTML() + "</td>";
    s += '<td style="padding-left:' + o.spc + 'px" width="' + (13 + o.spc) + '">' + o.arrow.getHTML() + "</td>";
    s += "</tr></tbody></table>";
    return s;
}

function TextComboWidget_resize(w, h) {
    var o = this;
    if (w != null) {
        w = Math.max(0, w - 2 * o.margin);
    }
    var d = o.layer.display != "none";
    if (d & _moz && !_saf) {
        o.setDisplay(false);
    }
    o.imwpResize(w, h);
    if (d & _moz && !_saf) {
        o.setDisplay(true);
    }
}

function TextComboWidget_add(s, val, selected) {
    var o = this;
    var item = o.menu.addCheck(o.id + "_it_" + (o.counter++), s, TextComboWidget_internalCB);
    item.val = "" + val;
    item.parCombo = o;
    item.isComboVal = true;
    if ((o.selectedItem == null) || selected) {
        o.selectItem(item);
    }
}

function TextComboWidget_addSeparator() {
    this.menu.addSeparator();
}

function TextComboWidget_addMenuItem(id, text, cb, icon, dx, dy, disabled, disDx, disDy) {
    this.menu.add(id, text, cb, icon, dx, dy, disabled, disDx, disDy);
}

function TextComboWidget_setDisabled(d) {
    var o = this;
    o.text.setDisabled(d);
    o.arrow.setDisabled(d);
    o.menu.setDisabled(d);
    o.disabled = d;
}

function TextComboWidget_isDisabled() {
    var o = this;
    return o.disabled;
}

function TextComboWidget_select(idx) {
    var o = this, item = o.getItemByIndex(idx);
    if (item) {
        o.selectItem(item);
    }
}

function TextComboWidget_setItemDisabled(idx, disabled) {
    var o = this, item = o.getItemByIndex(idx);
    if (item) {
        item.setDisabled(disabled);
    }
}

function TextComboWidget_getSelection() {
    var o = this, it = o.selectedItem;
    var txt = o.text.getValue();
    if (it) {
        return {index: o.getItemIndex(it), value: it.val};
    } else {
        return {index: -1, value: txt};
    }
}

function TextComboWidget_valueSelect(v) {
    v = "" + v;
    var o = this, items = o.menu.items, len = items.length;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if ((it.isComboVal) && (it.val == v)) {
            o.selectItem(it);
            return;
        }
    }
    o.text.setValue(v);
}

function TextComboWidget_valueShow(v, show) {
    v = "" + v;
    var o = this, items = o.menu.items, len = items.length;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if ((it.isComboVal) && (it.val == v)) {
            it.show(show);
            return;
        }
    }
    o.text.setValue(v);
    o.text.show(show);
}

function TextComboWidget_setUndefined(u) {
    var o = this;
    if (u) {
        o.selectItem(null);
    }
}

function TextComboWidget_setContentEditable(d) {
    var o = this;
    o.text.setContentEditable(d);
}

function TextComboWidget_isContentEditable() {
    var o = this;
    return o.text.isContentEditable();
}

function TextComboWidget_selectItem(item) {
    var o = this;
    if (o.selectedItem) {
        o.selectedItem.check(false);
    }
    if (item) {
        o.val = item.val;
        o.text.setValue(item.text);
        o.selectedItem = item;
        item.check(true);
    } else {
        o.val = null;
        o.text.setValue("");
        o.selectedItem = null;
    }
}

function TextComboWidget_getItemByIndex(idx) {
    var items = this.menu.items;
    return ((idx >= 0) && (idx < items.length)) ? items[idx] : null;
}

function TextComboWidget_getItemIndex(item) {
    var items = this.menu.items, len = items.length, j = 0;
    for (var i = 0; i < len; i++) {
        var it = items[i];
        if (it.isComboVal) {
            if (it.id == item.id) {
                return j;
            }
            j++;
        }
    }
    return -1;
}

function TextComboWidget_changeCB() {
    var p = this.par;
    var b = true;
    if (p.checkCB) {
        b = p.checkCB();
    }
    if (!b) {
        return;
    }
    if (p.changeCB) {
        p.changeCB();
    }
}

function TextComboWidget_enterCB() {
    var p = this.par;
    if (p.selectedItem) {
        p.selectedItem.check(false);
        p.selectedItem = null;
    }
    var b = true;
    if (p.checkCB) {
        b = p.checkCB();
    }
    if (!b) {
        return;
    }
    if (p.changeCB) {
        p.changeCB();
    }
}

function TextComboWidget_checkCB() {
    var p = this.par;
    if (p.checkCB) {
        p.checkCB();
    }
}

function TextComboWidget_hideCB() {
    var o = this.parIcon;
    if (o.arrow) {
        o.arrow.focus();
    }
    TextComboOutCB(o.index);
}

function TextComboWidget_arrowClickCB() {
    this.par.clickCB();
}

function TextComboWidget_clickCB() {
    var o = this, l = o.layer;
    o.menu.show(!o.menu.isShown(), getPosScrolled(l).x, getPosScrolled(l).y + o.getHeight() + 1, null, null, o);
    TextComboOverCB(o.index);
}

function TextCombo_OverCB() {
    TextComboOverCB(getWidget(this).index);
    return true;
}

function TextComboOverCB(i) {
    var o = _allBOIconsMenus[i];
    IconWidget_overCB(o.arrow.index);
}

function TextCombo_OutCB(i) {
    TextComboOutCB(getWidget(this).index);
}

function TextComboOutCB(i) {
    var o = _allBOIconsMenus[i];
    if (!o.menu.isShown()) {
        IconWidget_outCB(o.arrow.index);
    } else {
        IconWidget_overCB(o.arrow.index);
    }
}

function TextComboWidget_internalCB() {
    var o = this, c = o.parCombo;
    c.selectItem(o);
    if (c.changeCB) {
        c.changeCB();
    }
}

function TextComboWidget_keyUpCB() {
}

_menusZIndex = 2000;
_menusItems = new Array;
_globMenuCaptured = null;
_isColor = 0;
_isLastUsedColor = 1;
_isNotColor = 2;
_currentFocus = null;
_mitemH = 22;

function newMenuWidget(id, hideCB, beforeShowCB) {
    var o = newWidget(id);
    o.items = new Array;
    o.par = null;
    o.container = null;
    o.currentSub = -1;
    o.nextSub = -1;
    o.zIndex = _menusZIndex;
    o.hideCB = hideCB;
    o.beforeShowCB = beforeShowCB;
    o.init = MenuWidget_init;
    o.justInTimeInit = MenuWidget_justInTimeInit;
    o.getHTML = MenuWidget_getHTML;
    o.show = MenuWidget_show;
    o.internalAdd = o.add = MenuWidget_add;
    o.addCheck = MenuWidget_addCheck;
    o.addSeparator = MenuWidget_addSeparator;
    o.insert = MenuWidget_insert;
    o.insertCheck = MenuWidget_insertCheck;
    o.insertSeparator = MenuWidget_insertSeparator;
    o.getItem = MenuWidget_getItem;
    o.getItemByID = MenuWidget_getItemByID;
    o.isShown = MenuWidget_isShown;
    o.remove = MenuWidget_remove;
    o.removeByID = MenuWidget_removeByID;
    o.showSub = MenuWidget_showSub;
    o.captureClicks = MenuWidget_captureClicks;
    o.releaseClicks = MenuWidget_releaseClicks;
    o.focus = MenuWidget_focus;
    o.restoreFocus = MenuWidget_restoreFocus;
    o.hasVisibleItem = MenuWidget_hasVisibleItem;
    o.updateIndex = MenuWidget_updateIndex;
    o.clickCB = new Array;
    o.clickCBDocs = new Array;
    o.write = MenuWidget_write;
    o.alignLeft = false;
    o.sepCount = 0;
    return o;
}

function MenuWidget_captureClicks(w) {
    var o = this;
    if (o.par == null) {
        if (w == null) {
            _globMenuCaptured = o;
            o.clickCB.length = 0;
            o.clickCBDocs.length = 0;
            w = _curWin;
        }
        if (canScanFrames(w)) {
            if (_moz) {
                _oldErrHandler = window.onerror;
                window.onerror = localErrHandler;
            }
            try {
                d = w.document;
                o.clickCB[o.clickCB.length] = d.onmousedown;
                o.clickCBDocs[o.clickCBDocs.length] = d;
                d.onmousedown = MenuWidget_globalClick;
                var fr = w.frames, len = fr.length;
                for (var i = 0; i < len; i++) {
                    o.captureClicks(fr[i]);
                }
            } catch (expt) {
            }
            if (_moz) {
                window.onerror = _oldErrHandler;
            }
        }
    }
}

function MenuWidget_releaseClicks() {
    var o = this;
    if (o.par == null) {
        var len = o.clickCB.length;
        for (var i = 0; i < len; i++) {
            try {
                o.clickCBDocs[i].onmousedown = o.clickCB[i];
            } catch (expt) {
            }
            o.clickCB[i] = null;
            o.clickCBDocs[i] = null;
        }
        o.clickCB.length = 0;
        o.clickCBDocs.length = 0;
    }
}

_menuItem = null;

function MenuWidget_focus() {
    var o = this, items = o.items, len = items.length;
    for (var i = 0; i < len; i++) {
        if (items[i].isShown && !items[i].isSeparator) {
            _menuItem = items[i];
            setTimeout("_menuItem.focus()", 1);
            if (o.endLink) {
                o.endLink.show(true);
            }
            if (o.startLink) {
                o.startLink.show(true);
            }
            break;
        }
    }
}

function MenuWidget_keepFocus(id) {
    var o = getWidget(getLayer(id));
    if (o) {
        o.focus();
    }
}

function MenuWidget_restoreFocus() {
    var o = this;
    if (o.endLink) {
        o.endLink.show(false);
    }
    if (o.startLink) {
        o.startLink.show(false);
    }
    if (o.parIcon) {
        o.parIcon.focus();
    } else {
        if (o.par) {
            o.par.focus();
        } else {
            if (o.parCalendar) {
                o.parCalendar.focus();
            }
        }
    }
}

function MenuWidget_keyDown(id, e) {
    var o = getWidget(getLayer(id));
    var key = eventGetKey(e);
    if (key == 27 && o) {
        o.restoreFocus();
        o.show(false);
        if (o.par && o.par.par) {
            o.par.par.currentSub = -1;
        }
        o.currentSub = -1;
        eventCancelBubble(e);
    } else {
        if (o && (key == 109 || key == 37)) {
            if (o.par && o.par.par) {
                o.restoreFocus();
                o.show(false);
                o.par.par.currentSub = -1;
                o.currentSub = -1;
            }
        } else {
            if (key == 13) {
                eventCancelBubble(e);
            }
        }
    }
}

function MenuWidget_globalClick() {
    var o = _globMenuCaptured;
    if (o != null) {
        _globMenuCaptured = null;
        o.releaseClicks();
        o.show(false);
    }
}

function MenuWidget_add(id, text, cb, icon, dx, dy, disabled, disDx, disDy, alt) {
    var o = this, i = o.items.length;
    var ret = o.items[i] = newMenuItem(o, id, text, cb, icon, dx, dy, disabled, disDx, disDy, false, alt);
    ret.menuIndex = i;
    ret.dynHTML();
    return ret;
}

function MenuWidget_addCheck(id, text, cb, icon, dx, dy, disabled, disDx, disDy, alt) {
    var o = this, i = o.items.length;
    var ret = o.items[i] = newMenuItem(o, id, text, cb, icon, dx, dy, disabled, disDx, disDy, true, alt);
    ret.menuIndex = i;
    ret.dynHTML();
    return ret;
}

function MenuWidget_addSeparator() {
    var s = this.internalAdd("_menusep_" + (this.sepCount++));
    s.isSeparator = true;
    return s;
}

function MenuWidget_insert(index, id, text, cb, icon, dx, dy, disabled, disDx, disDy, alt) {
    var o = this, item = newMenuItem(o, id, text, cb, icon, dx, dy, disabled, disDx, disDy, false, alt);
    arrayAdd(o, "items", item, index);
    o.updateIndex();
    item.dynHTML();
    return item;
}

function MenuWidget_insertCheck(index, id, text, cb, icon, dx, dy, disabled, disDx, disDy, alt) {
    var o = this, item = newMenuItem(o, id, text, cb, icon, dx, dy, disabled, disDx, disDy, true, alt);
    arrayAdd(o, "items", item, index);
    o.updateIndex();
    item.dynHTML();
    return item;
}

function MenuWidget_insertSeparator(index) {
    var item = newMenuItem(this, "_menusep_" + (this.sepCount++));
    item.isSeparator = true;
    arrayAdd(this, "items", item, index);
    this.updateIndex();
    item.dynHTML();
    return item;
}

function MenuWidget_init() {
}

function MenuWidget_getItem(index) {
    var o = this, items = o.items;
    if ((index >= 0) && (index < items.length)) {
        return items[index];
    }
    return null;
}

function MenuWidget_getItemByID(id) {
    var o = this, items = o.items;
    for (var i in items) {
        if (items[i].id == id) {
            return items[i];
        }
    }
    return null;
}

function MenuWidget_removeByID(id) {
    var o = this;
    var item = o.getItemByID(id);
    if (item) {
        arrayRemove(o, "items", item.menuIndex);
        o.updateIndex();
        if (o.layer == null) {
            return;
        }
        var tbody = o.layer.childNodes[0];
        tbody.deleteRow(item.menuIndex);
    }
}

function MenuWidget_remove(index) {
    var o = this;
    if (index != null) {
        arrayRemove(o, "items", index);
        o.updateIndex();
    } else {
        o.items.length = 0;
    }
    if (o.layer == null) {
        return;
    }
    if (index != null) {
        var tbody = o.layer.childNodes[0];
        tbody.deleteRow(index);
    }
}

function MenuWidget_updateIndex() {
    var items = this.items, len = items.length;
    for (var i = 0; i < len; i++) {
        items[i].menuIndex = i;
    }
}

function MenuWidget_showSub() {
    var o = this;
    if (o.nextSub != -1) {
        if (o.nextSub != o.currentSub) {
            var currentItem = o.items[o.currentSub];
            if (currentItem && currentItem.sub) {
                currentItem.sub.show(false);
                o.currentSub = -1;
            }
            var nextItem = o.items[o.nextSub];
            if (nextItem && nextItem.sub) {
                var lyr = nextItem.layer;
                var x = parseInt(o.css.left);
                var y = parseInt(o.css.top);
                for (var i = 0; i < o.nextSub; i++) {
                    var item = o.items[i];
                    if (item.isShown) {
                        if ((item.icon != null) || (item.text != null)) {
                            y += _mitemH;
                        } else {
                            y += 3;
                        }
                    }
                }
                var w = o.getWidth();
                x = x + w - 4;
                nextItem.attachSubMenu(nextItem.sub);
                nextItem.sub.show(true, x, y, false, w);
                o.currentSub = o.nextSub;
            }
        }
    } else {
        if (o.currentSub != -1) {
            var currentItem = o.items[o.currentSub];
            if (currentItem && currentItem.sub) {
                currentItem.sub.show(false);
                o.currentSub = -1;
            }
        }
    }
}

function MenuWidget_write() {
}

function MenuWidget_justInTimeInit() {
    var o = this;
    o.layer = getLayer(o.id);
    if (o.layer == null) {
        targetApp(o.getHTML());
        o.layer = getLayer(o.id);
    }
    o.layer._widget = o.widx;
    o.css = o.layer.style;
    o.endLink = newWidget("endLink_" + o.id);
    o.endLink.init();
    o.startLink = newWidget("startLink_" + o.id);
    o.startLink.init();
    var items = o.items;
    for (var i in items) {
        items[i].init();
    }
}

function MenuWidget_getHTML() {
    var o = this, items = o.items;
    var keysCbs = ' onkeydown="' + _codeWinName + ".MenuWidget_keyDown('" + o.id + "',event);return true\" ";
    var s = '<a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="startLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + '\');return false;" ></a><table style="display:none;" class="menuFrame" id="' + o.id + '" cellspacing="0" cellpadding="0" border="0" ' + keysCbs + ' dir="ltr"><tbody>';
    for (var i in items) {
        s += items[i].getHTML();
    }
    s += '</tbody></table><a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="endLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + "');return false;\" ></a>";
    return s;
}

function MenuWidget_show(show, x, y, parentPropagate, parentMenuW, buttonFrom) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    var css = o.css;
    if (show) {
        o.iframeLyr = getDynamicBGIFrameLayer();
        o.iframeCss = o.iframeLyr.style;
        if (o.beforeShowCB) {
            o.beforeShowCB();
        }
        if (!o.hasVisibleItem()) {
            return;
        }
        o.captureClicks();
        css.display = "block";
        css.zIndex = (o.zIndex + 1);
        css.visibility = "hidden";
        css.left = "-1000px";
        css.top = "-1000px";
        var w = o.getWidth();
        var h = o.getHeight();
        if (o.alignLeft) {
            x -= w;
        }
        if (buttonFrom) {
            var buttonW = buttonFrom.getWidth();
            if (buttonW > w) {
                x = x + buttonW - w;
            }
        }
        var x2 = x + w + 4, y2 = y + h + 4;
        if (x2 - getScrollX() > winWidth()) {
            if (buttonFrom) {
                x = Math.max(0, winWidth() - w);
            } else {
                x = Math.max(0, x - 4 - (w + ((parentMenuW != null) ? parentMenuW - 12 : 0)));
            }
        }
        if (y2 - getScrollY() > winHeight()) {
            y = Math.max(0, y - 4 - h + (parentMenuW != null ? 30 : 0));
        }
        css.left = "" + x + "px";
        css.top = "" + y + "px";
        css.visibility = "visible";
        iCss = o.iframeCss;
        iCss.left = "" + x + "px";
        iCss.top = "" + y + "px";
        iCss.width = "" + w + "px";
        iCss.height = "" + h + "px";
        iCss.zIndex = o.zIndex - 1;
        iCss.display = "block";
        if (_ie) {
            y -= 2;
            x -= 2;
        }
        o.nextSub = -1;
        o.showSub();
        o.focus();
    } else {
        if (parentPropagate && o.par && o.par.par) {
            o.par.par.show(show, x, y, parentPropagate);
        }
        if (o.iframeLyr) {
            releaseBGIFrame(o.iframeLyr.id);
        }
        css.display = "none";
        if (o.iframeCss) {
            o.iframeCss.display = "none";
        }
        o.nextSub = -1;
        o.showSub();
        if (o.hideCB) {
            o.hideCB();
        }
        o.releaseClicks();
    }
}

function MenuWidget_isShown() {
    var o = this;
    if (o.layer == null) {
        return false;
    } else {
        return (o.css.display == "block");
    }
}

function MenuWidget_hasVisibleItem() {
    var o = this;
    if (o.isMenuColor || o.isCalendar) {
        return true;
    }
    var items = o.items;
    for (var i in items) {
        var item = items[i];
        if (item && !(item.isSeparator == true) && item.isShown) {
            return true;
        }
    }
    return false;
}

function newMenuItem(par, id, text, cb, icon, dx, dy, disabled, disDx, disDy, isCheck, alt) {
    var o = new Object;
    o.par = par;
    o.id = id;
    o.text = text;
    o.cb = cb;
    o.icon = icon;
    o.dx = (dx == null) ? 0 : dx;
    o.dy = (dy == null) ? 0 : dy;
    o.disDx = (disDx == null) ? o.dx : disDx;
    o.disDy = (disDy == null) ? o.dy : disDy;
    o.sub = null;
    o.layer = null;
    o.iconTDLayer = null;
    o.iconLayer = null;
    o.textLayer = null;
    o.textOnlyLayer = null;
    o.accel = null;
    o.accelLayer = null;
    o.hasNoLayer = false;
    o.isSeparator = false;
    o.disabled = (disabled != null) ? disabled : false;
    o.isShown = true;
    o.alt = alt;
    o.index = _menusItems.length;
    _menusItems[o.index] = o;
    o.menuIndex = -1;
    o.isCheck = isCheck;
    o.checked = false;
    o.menuItemType = _isNotColor;
    o.init = MenuItem_init;
    o.leftZoneClass = "menuLeftPart";
    o.leftZoneSelClass = "menuLeftPartSel";
    o.attachSubMenu = MenuItem_attachSubMenu;
    o.getHTML = MenuItem_getHTML;
    o.getHTMLPart = MenuItem_getHTMLPart;
    o.dynHTML = MenuItem_dynHTML;
    o.setDisabled = MenuItem_setDisabled;
    o.check = MenuItem_check;
    o.isChecked = MenuItem_isChecked;
    o.show = MenuItem_show;
    o.setText = MenuItem_setText;
    o.setIcon = MenuItem_setIcon;
    o.setAccelerator = MenuItem_setAccelerator;
    o.focus = MenuItem_focus;
    return o;
}

function MenuItem_init() {
    if (!this.hasNoLayer) {
        var o = this, id = o.par.id;
        o.layer = getLayer(id + "_item_" + o.id);
        o.layer._boIndex = o.index;
        if (!o.isSeparator) {
            if ((o.icon != null) || (o.isCheck)) {
                o.iconLayer = getLayer(id + "_item_icon_" + o.id);
                o.iconTDLayer = getLayer(id + "_item_td_" + o.id);
            }
            o.textLayer = getLayer(id + "_text_" + o.id);
            o.textOnlyLayer = getLayer(id + "_span_text_" + o.id);
            o.accelLayer = getLayer(id + "_accel_" + o.id);
            if (o.textOnlyLayer) {
                o.textOnlyLayer.title = o.checked ? o.textOnlyLayer.innerText + " " + _menuCheckLab : "";
                if (o.disabled) {
                    o.textOnlyLayer.title += " " + _menuDisableLab;
                }
            }
        }
        if (o.isCheck) {
            o.check(o.checked, true);
        }
    }
}

function MenuItem_attachSubMenu(menu) {
    var o = this;
    o.sub = menu;
    menu.par = o;
    menu.zIndex = o.par.zIndex + 2;
    if (o.layer) {
        if (o.arrowLayer == null) {
            o.arrowLayer = getLayer(o.par.id + "_item_arrow_" + o.id);
        }
        var dis = o.disabled;
        changeSimpleOffset(o.arrowLayer, dis ? 7 : 0, dis ? 81 : 64);
    }
    return menu;
}

function MenuItem_check(check, force) {
    var o = this;
    if ((o.checked != check) || force) {
        o.checked = check;
        if (o.par.layer) {
            var lyr = o.layer;
            if (lyr) {
                if (o.icon == null) {
                    changeSimpleOffset(o.iconLayer, 0, (o.checked ? 48 : 0), null, (o.checked ? _menuCheckLab : ""));
                }
                changeOffset(o.iconTDLayer, 0, (o.checked ? 96 : 0));
                if (o.checkFrame == null) {
                    o.checkFrame = getLayer(o.par.id + "_item_check_" + o.id);
                }
                o.checkFrame.className = "menuIcon" + (o.checked ? "Check" : "");
                if (o.textOnlyLayer) {
                    o.textOnlyLayer.title = o.checked ? o.textOnlyLayer.innerText + " " + _menuCheckLab : "";
                }
            }
        }
    }
}

function MenuItem_setDisabled(dis) {
    var o = this;
    if (o.disabled != dis) {
        o.disabled = dis;
        if (o.par.layer) {
            var lyr = o.layer;
            if (lyr) {
                lyr.style.cursor = dis ? "default" : _hand;
                if (o.icon) {
                    changeSimpleOffset(o.iconLayer, dis ? o.disDx : o.dx, dis ? o.disDy : o.dy);
                }
                var cn = "menuTextPart" + (o.disabled ? "Disabled" : "");
                if (cn != o.textLayer.className) {
                    o.textLayer.className = cn;
                }
                if (o.accel && (cn != o.accelLayer.className)) {
                    o.accelLayer.className = cn;
                }
                if (o.sub) {
                    if (o.arrowLayer == null) {
                        o.arrowLayer = getLayer(o.par.id + "_item_arrow_" + o.id);
                    }
                    changeSimpleOffset(o.arrowLayer, dis ? 7 : 0, dis ? 81 : 64);
                }
                if (o.textOnlyLayer) {
                    o.textOnlyLayer.title = o.disabled ? o.textOnlyLayer.innerText + " " + _menuDisableLab : "";
                }
            }
        }
    }
}

function _mii(lyr, inv) {
    var c = lyr.childNodes, y = 0, len = c.length, idx = lyr._boIndex;
    var o = _menusItems[idx];
    if (o.disabled) {
        inv = 0;
    } else {
        if (inv) {
            o.par.nextSub = o.menuIndex;
            MenuItem_callShowSub(idx, true);
            if (o.par.par) {
                if (o.par.par.par) {
                    o.par.par.par.nextSub = o.par.par.menuIndex;
                }
            }
        }
    }
    var realPart = 0;
    for (var i = 0; i < len; i++) {
        var ce = c[i];
        if (ce.tagName != null) {
            if (realPart == 0) {
                ce.className = inv ? o.leftZoneSelClass : o.leftZoneClass;
            } else {
                if (realPart == 1) {
                    ce.className = "menuTextPart" + (inv ? "Sel" : "") + (o.disabled ? "Disabled" : "");
                } else {
                    if (o.accel && (realPart == 2)) {
                        ce.className = "menuTextPart" + (inv ? "Sel" : "") + (o.disabled ? "Disabled" : "");
                        break;
                    } else {
                        ce.className = "menuRightPart" + (inv ? "Sel" : "");
                    }
                }
            }
            realPart++;
        }
    }
}

function MenuItem_getHTMLPart(part) {
    var o = this;
    switch (part) {
        case 0:
            var im = null, className = ' class="menuIcon' + (o.checked ? "Check" : "") + '"';
            if (o.isCheck && (o.icon == null)) {
                im = simpleImgOffset(_skin + "menus.gif", 16, 16, 0, o.checked ? 48 : 0, (o.par.id + "_item_icon_" + o.id), null, (o.checked ? _menuCheckLab : ""));
            } else {
                im = o.icon ? simpleImgOffset(o.icon, 16, 16, o.disabled ? o.disDx : o.dx, o.disabled ? o.disDy : o.dy, (o.par.id + "_item_icon_" + o.id), null, o.alt ? o.alt : "") : (getSpace(16, 16));
            }
            if (o.isCheck) {
                var size = _ie ? 18 : 16;
                im = '<div id="' + o.par.id + "_item_check_" + o.id + '" class="menuIcon' + (o.checked ? "Check" : "") + '" style="width:' + size + "px;height:" + size + 'px;padding:1px">' + im + "</div>";
            }
            return im;
        case 1:
            var div1 = _saf ? '<div style="height:19px;padding-top:5px">' : "", div2 = _saf ? "</div>" : "";
            return div1 + '<span id="' + (o.par.id + "_span_text_" + o.id) + '" tabIndex="0">' + convStr(o.text) + "</span>" + div2;
        case 2:
            return simpleImgOffset(_skin + "menus.gif", 16, 16, o.sub ? (o.disabled ? 7 : 0) : 0, o.sub ? (o.disabled ? 81 : 64) : 0, o.par.id + "_item_arrow_" + o.id, null, null, null, "right");
        case 3:
            return '<table width="100%" height="3" cellpadding="0" cellspacing="0" border="0" style="' + backImgOffset(_skin + "menus.gif", 0, 80) + ';"><tbody><tr><td></td></tr></tbody></table>';
        case 4:
            return convStr(o.accel);
    }
}

function MenuItem_getHTML() {
    var o = this;
    if ((o.icon != null) || (o.text != null)) {
        var invertCbs = ' onclick="' + _codeWinName + '._micl(this,event);return true" oncontextmenu="' + _codeWinName + '._micl(this,event);return false" onmouseover="' + _codeWinName + '._mii(this,1)" onmouseout="' + _codeWinName + '._mii(this,0);" ';
        var keysCbs = ' onkeydown="' + _codeWinName + '._mikd(this,event);return true" ';
        var ar = new Array(), i = 0;
        ar[i++] = '<tr onmousedown="' + _codeWinName + '._minb(event)" onmouseup="' + _codeWinName + '._minb(event)" id="' + (o.par.id + "_item_" + o.id) + '" style="' + (!o.isShown ? "display:none;" : "") + "height:" + _mitemH + "px;width:24px;cursor:" + (o.disabled ? "default" : _hand) + '" ' + invertCbs + keysCbs + ' valign="middle">';
        ar[i++] = '<td id="' + (o.par.id + "_item_td_" + o.id) + '" style="width:23px;height:' + _mitemH + 'px;" align="center" class="' + o.leftZoneClass + '">';
        ar[i++] = o.getHTMLPart(0);
        ar[i++] = "</td>";
        ar[i++] = "<td " + (o.centered ? ' align="center" ' : "") + ' style="height:' + _mitemH + 'px" id="' + (o.par.id + "_text_" + o.id) + '" class="menuTextPart' + (o.disabled ? "Disabled" : "") + '">';
        ar[i++] = o.getHTMLPart(1);
        ar[i++] = "</td>";
        if (o.accel != null) {
            ar[i++] = '<td class="menuTextPart' + (o.disabled ? "Disabled" : "") + '" id="' + (o.par.id + "_accel_" + o.id) + '" align="right"' + ' style="height:' + _mitemH + 'px"  tabIndex="-1">';
            ar[i++] = o.getHTMLPart(4);
            ar[i++] = "</td>";
        } else {
            ar[i++] = '<td class="menuRightPart" align="right" style="width:40px;height:' + _mitemH + 'px;" >';
            ar[i++] = o.getHTMLPart(2);
            ar[i++] = "</td>";
        }
        ar[i++] = "</tr>";
        return ar.join("");
    } else {
        return '<tr onmousedown="' + _codeWinName + '._minb(event)" onclick="' + _codeWinName + '._minb(event)" id="' + (o.par.id + "_item_" + o.id) + '" onmouseup="' + _codeWinName + '._minb(event)" style="height:3px">' + '<td class="' + o.leftZoneClass + '" style="width:24px;height:3px;border:0px"></td>' + '<td colspan="2" style="padding-left:5px;padding-right:5px;border:0px">' + o.getHTMLPart(3) + "</td></tr>";
    }
}

function MenuItem_dynHTML() {
    var o = this;
    if (o.par.layer == null) {
        return;
    }
    var tbody = o.par.layer.childNodes[0], tr = tbody.insertRow(o.menuIndex), st = tr.style;
    tr.onmousedown = _minb;
    tr.onmouseup = _minb;
    tr.id = (o.par.id + "_item_" + o.id);
    if ((o.icon != null) || (o.text != null)) {
        var td1 = tr.insertCell(0), td2 = tr.insertCell(1), td3 = tr.insertCell(2), st1 = td1.style, st2 = td2.style,
            st3 = td3.style;
        tr.onclick = MenuItem_clickCallTrue;
        tr.oncontextmenu = MenuItem_clickCallFalse;
        tr.onmouseover = MenuItem_invertCall1;
        tr.onmouseout = MenuItem_invertCall0;
        st.height = "" + _mitemH + "px";
        st.width = "24px";
        st.cursor = (o.disabled ? "default" : _hand);
        td1.id = (o.par.id + "_item_td_" + o.id);
        st1.width = "23px";
        st1.height = "" + _mitemH + "px";
        td1.innerHTML = o.getHTMLPart(0);
        td1.align = "center";
        td1.className = o.leftZoneClass;
        if (o.centered) {
            td2.align = "center";
        }
        st2.height = "" + _mitemH + "px";
        td2.id = (o.par.id + "_text_" + o.id);
        td2.className = "menuTextPart" + (o.disabled ? "Disabled" : "");
        td2.innerHTML = o.getHTMLPart(1);
        if (o.accel) {
            td3.className = "menuTextPart" + (o.disabled ? "Disabled" : "");
            td3.align = "right";
            st3.height = "" + _mitemH + "px";
            td3.innerHTML = o.getHTMLPart(4);
        } else {
            td3.className = "menuRightPart";
            td3.align = "right";
            st3.width = "40px";
            st3.height = "" + _mitemH + "px";
            changeOffset(td3, 0, 0, _skin + "menus.gif");
            td3.innerHTML = o.getHTMLPart(2);
        }
        o.init();
    } else {
        tr.onclick = _minb;
        tr.style.height = "3px";
        var td1 = tr.insertCell(0), td2 = tr.insertCell(1), st1 = td1.style, st2 = td2.style;
        td1.className = o.leftZoneClass;
        st1.width = "24px";
        st1.height = "3px";
        st1.border = "0px";
        td2.colSpan = "2";
        st2.paddingLeft = "5px";
        st2.paddingRight = "5px";
        td2.innerHTML = o.getHTMLPart(3);
    }
}

function MenuItem_isChecked() {
    return this.checked;
}

function MenuItem_setText(s) {
    var o = this, id = o.par.id;
    o.text = s;
    if (o.textLayer) {
        o.textLayer.innerHTML = o.getHTMLPart(1);
        o.textOnlyLayer = getLayer(id + "_span_text_" + o.id);
    }
}

function MenuItem_setAccelerator(keystroke, modifier) {
    var o = this, id = o.par.id;
    o.accel = ((modifier != null) ? _modifiers[modifier] : "") + keystroke;
    if (o.accelLayer) {
        o.accelLayer.innerHTML = o.getHTMLPart(4);
    }
}

function MenuItem_setIcon(dx, dy, disDx, disDy, url) {
    var o = this;
    o.url = url ? url : o.url;
    o.dx = (dx != null) ? dx : o.dx;
    o.dy = (dy != null) ? dy : o.dy;
    o.disDx = (disDx != null) ? disDx : o.disDx;
    o.disDy = (disDy != null) ? disDy : o.disDy;
    if (o.icon && o.iconLayer) {
        changeSimpleOffset(o.iconLayer, o.disabled ? o.disDx : o.dx, o.disabled ? o.disDy : o.dy, o.url);
    }
}

function MenuItem_show(sh) {
    var o = this;
    o.isShown = sh;
    if (o.layer != null) {
        o.layer.style.display = sh ? "" : "none";
    }
}

function _micl(lyr, e) {
    eventCancelBubble(e);
    var idx = lyr._boIndex, o = _menusItems[idx];
    o.layer = lyr;
    if (!o.disabled) {
        if (o.sub) {
            o.par.nextSub = o.menuIndex;
            MenuItem_callShowSub(idx);
        } else {
            o.par.show(false, 0, 0, true);
            if (o.isCheck) {
                if (o.par.uncheckAll) {
                    o.par.uncheckAll();
                }
                o.check(!o.checked);
            }
            if (o.par.container && o.par.container.updateButton) {
                o.par.container.updateButton(idx);
            }
            _mii(lyr, 0, idx);
            o.par.nextSub = -1;
            if (o.cb) {
                setTimeout("MenuItem_delayedClick(" + idx + ")", 1);
            }
        }
    }
}

function _mikd(lyr, e) {
    var idx = lyr._boIndex, o = _menusItems[idx];
    o.layer = lyr;
    var k = eventGetKey(e);
    switch (k) {
        case 13:
            _micl(lyr, e);
            break;
        case 107:
        case 39:
            if (!o.disabled && o.sub) {
                _micl(lyr, e);
            }
            break;
        case 109:
        case 37:
            break;
        case 40:
            var items = o.par.items, len = items.length;
            for (var i = o.menuIndex + 1; i < len; i++) {
                if (items[i].isShown && !items[i].isSeparator) {
                    items[i].focus();
                    break;
                }
            }
            break;
        case 38:
            var items = o.par.items, len = items.length;
            for (var i = o.menuIndex - 1; i >= 0; i--) {
                if (items[i].isShown && !items[i].isSeparator) {
                    items[i].focus();
                    break;
                }
            }
            break;
    }
}

function MenuItem_callShowSub(idx, delayed) {
    var o = _menusItems[idx];
    if (delayed) {
        setTimeout("MenuItem_delayedShowSub(" + idx + ")", 500);
    } else {
        MenuItem_delayedShowSub(idx);
    }
}

function MenuItem_delayedShowSub(idx) {
    var o = _menusItems[idx];
    o.par.showSub();
}

function _minb(e) {
    eventCancelBubble(e);
}

function MenuItem_delayedClick(idx) {
    var item = _menusItems[idx];
    if (item.cb) {
        item.cb();
    }
}

function MenuItem_clickCallTrue(event) {
    _micl(this, event);
    return true;
}

function MenuItem_clickCallFalse(event) {
    _micl(this, event);
    return false;
}

function MenuItem_invertCall0(event) {
    _mii(this, 0);
}

function MenuItem_invertCall1(event) {
    _mii(this, 1);
}

function MenuItem_focus() {
    var o = this;
    if (isLayerDisplayed(o.layer) && o.textOnlyLayer && o.textOnlyLayer.focus) {
        o.textOnlyLayer.focus();
    }
}

function newMenuColorWidget(id, hideCB) {
    var o = newMenuWidget(id, hideCB);
    o.addSeparator = null;
    o.lastUsedTxt = "";
    o.lastUsedColorsAr = null;
    o.addColor = MenuColorWidget_addColor;
    o.addLastUsed = MenuColorWidget_addLastUsed;
    o.getHTML = MenuColorWidget_getHTML;
    o.uncheckAll = MenuColorWidget_uncheckAll;
    o.isMenuColor = true;
    return o;
}

function MenuColorWidget_addColor(tooltip, color, cb) {
    var o = this, i = o.items.length;
    var ret = o.items[i] = newColorMenuItem(o, color, tooltip, cb);
    ret.menuIndex = i;
    return ret;
}

function MenuColorWidget_addLastUsed(text, lastUsedColorsAr, cb, beforeShowCB) {
    var o = this;
    o.lastUsedTxt = text;
    o.lastUsedColorsAr = lastUsedColorsAr;
    o.beforeShowCB = MenuColorWidget_beforeShowCB;
    colorsMax = 8;
    len = o.items.length;
    var it = null;
    for (var c = 0; c < colorsMax; c++) {
        it = newLastUsedColorMenuItem(o, c, lastUsedColorsAr[c], "", cb);
        it.isLast = (c == colorsMax - 1) ? true : false;
        o.items[len + c] = it;
    }
}

function MenuColorWidget_getHTML() {
    var o = this, items = o.items;
    var j = 0;
    var keysCbs = ' onkeydown="' + _codeWinName + ".MenuWidget_keyDown('" + o.id + "',event);return true\" ";
    var s = new Array;
    s[j++] = '<a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="startLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + "');return false;\" ></a>";
    s[j++] = '<table style="display:none;" class="menuFrame" id="' + o.id + '" cellspacing="0" cellpadding="0" border="0"' + keysCbs + "><tbody>";
    var sep = '<tr style="height:3px"><td colspan="8" style="padding-left:5px;padding-right:5px;"><table width="100%" height="3" cellpadding="0" cellspacing="0" border="0" style="' + backImgOffset(_skin + "menus.gif", 0, 80) + ';"><tbody><tr><td></td></tr></tbody></table></td></tr>';
    var len = items.length;
    lastUsedCol = "";
    lastUsedColIconsNb = 0;
    lastUsedColIconsMaxLine = 3;
    for (var i in items) {
        var item = items[i];
        switch (item.menuItemType) {
            case _isColor:
                s[j++] = item.getHTML();
                break;
            case _isLastUsedColor:
                lastUsedCol += item.getHTML();
                lastUsedCol += (lastUsedColIconsNb++ == lastUsedColIconsMaxLine) ? "</tr><tr>" : "";
                if (item.isLast) {
                    s[j++] = sep;
                    s[j++] = '<tr><td colspan="8">';
                    s[j++] = '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr>';
                    s[j++] = '<td width="50%" class="menuTextPart">' + convStr(o.lastUsedTxt) + "</td>";
                    s[j++] = '<td><table border="0" cellspacing="0" cellpadding="0"><tbody><tr>';
                    s[j++] = lastUsedCol;
                    s[j++] = "</tr></tbody></table></td>";
                    s[j++] = "</tr></tbody></table>";
                    s[j++] = "</td></tr>";
                    s[j++] = sep;
                }
                break;
            case _isNotColor:
                item.leftZoneClass = "menuLeftPartColor";
                item.leftZoneSelClass = "menuLeftPartSel";
                item.centered = true;
                s[j++] = '<tr><td colspan="8"><table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr>' + item.getHTML() + "</tr></tbody></table></td></tr>";
                s[j++] = (i == 0) ? sep : "";
        }
    }
    s[j++] = '</tbody></table><a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="endLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + "');return false;\" ></a>";
    return s.join("");
}

function MenuColorWidget_beforeShowCB() {
    var o = this, j = 0;
    lenLastUsed = o.lastUsedColorsAr.length;
    if ((lenLastUsed == 1) && ((o.lastUsedColorsAr[0].length == 0) || (o.lastUsedColorsAr[0] == "null"))) {
        lenLastUsed = 0;
        o.lastUsedColorsAr.length = 0;
    }
    for (var i in o.items) {
        var item = o.items[i];
        if (item.menuItemType == _isLastUsedColor) {
            if (j < lenLastUsed) {
                item.init();
                var c = o.lastUsedColorsAr[j++];
                item.color = c;
                item.layer.childNodes[0].childNodes[0].style.backgroundColor = "rgb(" + c + ")";
                var t = _colorsArr["" + c + ""];
                item.text = (t) ? t : (_RGBTxtBegin + c + _RGBTxtEnd);
                item.layer.childNodes[0].childNodes[0].childNodes[0].title = item.text;
                item.show(true);
            } else {
                item.show(false);
            }
        }
    }
}

function MenuColor_invert(lyr, inv) {
    var o = _menusItems[lyr._boIndex];
    if (o && o.checked) {
        inv = 1;
    }
    lyr.childNodes[0].className = "menuColor" + (inv ? "sel" : "");
}

function MenuColor_out() {
    MenuColor_invert(this, 0);
}

function _Mcov(l) {
    l.onmouseout = MenuColor_out;
    MenuColor_invert(l, 1);
}

function MenuColorWidget_uncheckAll() {
    var o = this, items = o.items;
    for (var i in items) {
        var item = items[i];
        if (item.checked) {
            item.check(false);
        }
    }
}

function _mcc(lyr, e) {
    eventCancelBubble(e);
    var idx = lyr._boIndex, o = _menusItems[idx];
    o.par.uncheckAll();
    MenuColor_invert(lyr, 1, idx);
    o.checked = true;
    o.par.show(false, 0, 0, true);
    if (o.cb) {
        setTimeout("MenuItem_delayedClick(" + idx + ")", 1);
    }
}

function newColorMenuItem(par, color, text, cb) {
    var o = newMenuItem(par, "color_" + color, text, cb);
    o.color = color;
    o.attachSubMenu = null;
    o.getHTML = ColorMenuItem_getHTML;
    o.check = ColorMenuItem_check;
    o.menuItemType = _isColor;
    return o;
}

function ColorMenuItem_check(check) {
    var o = this;
    if (o.checked != check) {
        o.checked = check;
        if (o.layer) {
            MenuColor_invert(o.layer, o.checked ? 1 : 0);
        }
    }
}

function ColorMenuItem_getHTML() {
    var o = this, s = "", d = _moz ? 10 : 12, lenTotal = o.par.items.length, index = o.menuIndex - 1;
    col = index % 8;
    var len = 0;
    for (var i = 0; i < lenTotal; i++) {
        if (o.par.items[i].menuItemType == _isColor) {
            len++;
        }
    }
    var first = (col == 0);
    var last = (col == 7);
    var firstL = (index < 8);
    var lastL = (index >= (Math.floor((len - 1) / 8) * 8));
    var cbs = ' onclick="' + _codeWinName + '._mcc(this,event);return true" oncontextmenu="' + _codeWinName + '._mcc(this,event);return false" onmousedown="' + _codeWinName + '._minb(event)" onmouseup="' + _codeWinName + '._minb(event)" onmouseover="' + _codeWinName + '._Mcov(this)" ';
    if (first) {
        s += '<tr valign="middle" align="center">';
    }
    s += '<td id="' + (o.par.id + "_item_" + o.id) + '" ' + cbs + ' style="padding-top:' + (firstL ? 2 : 0) + "px;padding-bottom:" + (lastL ? 2 : 0) + "px;padding-left:" + (first ? 3 : 1) + "px;padding-right:" + (last ? 3 : 1) + 'px"><div class="menuColor' + (o.checked ? "Sel" : "") + '"><div style="cursor:' + _hand + ";border:1px solid #4A657B;width:" + d + "px;height:" + d + "px;background-color:rgb(" + o.color + ');">' + img(_skin + "../transp.gif", 10, 10, null, null, o.text) + "</div></div></td>";
    if (last) {
        s += "</tr>";
    }
    return s;
}

function newLastUsedColorMenuItem(par, idx, color, text, cb) {
    var o = newMenuItem(par, "color_" + idx, text, cb);
    o.idx = idx;
    o.color = color;
    o.menuItemType = _isLastUsedColor;
    o.attachSubMenu = null;
    o.check = ColorMenuItem_check;
    o.getHTML = LastUsedColorMenuItem_getHTML;
    o.init = LastUsedColorMenuItem_init;
    return o;
}

function LastUsedColorMenuItem_getHTML() {
    var o = this, s = "", d = _moz ? 10 : 12;
    var cbs = ' onclick="' + _codeWinName + '._mcc(this,event);return true" oncontextmenu="' + _codeWinName + '._mcc(this,event);return false" onmousedown="' + _codeWinName + '._minb(event)" onmouseup="' + _codeWinName + '._minb(event)" onmouseover="' + _codeWinName + '._Mcov(this)" ';
    s += '<td id="' + (o.par.id + "_item_" + o.id) + '" width="18" ' + cbs + ' style="padding-top:0px;padding-bottom:0px;padding-left:1px;padding-right:1px"><div class="menuColor' + (o.checked ? "sel" : "") + '"><div style="cursor:' + _hand + ";border:1px solid #4A657B;width:" + d + "px;height:" + d + "px;background-color:rgb(" + o.color + ');">' + img(_skin + "../transp.gif", 10, 10, null, null, o.text) + "</div></div></td>";
    return s;
}

function LastUsedColorMenuItem_init() {
    if (!this.hasNoLayer) {
        var o = this, id = o.par.id;
        o.layer = getLayer(id + "_item_" + o.id);
        o.layer._boIndex = o.index;
        if (o.isCheck) {
            o.check(o.checked, true);
        }
    }
}

function newScrollMenuWidget(id, changeCB, multi, width, lines, tooltip, dblClickCB, keyUpCB, showLabel, label, convBlanks, beforeShowCB, menuClickCB) {
    var o = newWidget(id);
    o.list = newListWidget("list_" + id, ScrollMenuWidget_changeCB, multi, width, lines, tooltip, ScrollMenuWidget_dblClickCB, ScrollMenuWidget_keyUpCB, ScrollMenuWidget_clickCB);
    o.list.par = o;
    o.label = NewLabelWidget("label_" + id, label, convBlanks);
    o.showLabel = showLabel;
    o.changeCB = changeCB;
    o.menuClickCB = menuClickCB;
    o.dblClickCB = dblClickCB;
    o.keyUpCB = keyUpCB;
    o.beforeShowCB = beforeShowCB;
    o.zIndex = _menusZIndex;
    o.init = ScrollMenuWidget_init;
    o.justInTimeInit = ScrollMenuWidget_justInTimeInit;
    o.setDisabled = ScrollMenuWidget_setDisabled;
    o.write = ScrollMenuWidget_write;
    o.getHTML = ScrollMenuWidget_getHTML;
    o.show = ScrollMenuWidget_show;
    o.add = ScrollMenuWidget_add;
    o.del = ScrollMenuWidget_del;
    o.getSelection = ScrollMenuWidget_getSelection;
    o.select = ScrollMenuWidget_select;
    o.valueSelect = ScrollMenuWidget_valueSelect;
    o.getCount = ScrollMenuWidget_getCount;
    o.isShown = MenuWidget_isShown;
    o.captureClicks = MenuWidget_captureClicks;
    o.releaseClicks = MenuWidget_releaseClicks;
    o.clickCB = new Array;
    o.clickCBDocs = new Array;
    return o;
}

function ScrollMenuWidget_init() {
}

function ScrollMenuWidget_justInTimeInit() {
    var o = this;
    o.layer = getLayer(o.id);
    if (o.layer == null) {
        append2(_curDoc.body, o.getHTML());
        o.layer = getLayer(o.id);
    }
    o.layer._widget = o.widx;
    o.css = o.layer.style;
    o.css.visibility = "hidden";
    o.list.init();
    o.label.init();
}

function ScrollMenuWidget_setDisabled() {
}

function ScrollMenuWidget_write() {
}

function ScrollMenuWidget_getHTML() {
    var o = this;
    var s = "";
    s += '<table dir="ltr" onmousedown="event.cancelBubble=true" id="' + o.id + '" style="display:none;" class="menuFrame" cellspacing="0" cellpadding="0" border="0"><tbody>';
    s += '<tr><td align="center">' + o.list.getHTML() + "</td></tr>";
    s += '<tr><td align="center">' + o.label.getHTML() + "</td></tr>";
    s += "</tbody></table>";
    return s;
}

function ScrollMenuWidget_show(show, x, y) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    var css = o.css;
    if (show) {
        if (o.beforeShowCB) {
            o.beforeShowCB();
        }
        o.captureClicks();
        css.display = "block";
        css.zIndex = (o.zIndex + 1);
        css.visibility = "hidden";
        css.left = "-1000px";
        css.top = "-1000px";
        var w = o.getWidth();
        var h = o.getHeight();
        if (o.alignLeft) {
            x -= w;
        }
        var x2 = x + w + 4, y2 = y + h + 4;
        if (x2 > winWidth()) {
            x = Math.max(0, x - 4 - w);
        }
        if (y2 > winHeight()) {
            y = Math.max(0, y - 4 - h);
        }
        css.left = "" + x + "px";
        css.top = "" + y + "px";
        css.visibility = "visible";
        o.iframeLyr = getDynamicBGIFrameLayer();
        o.iframeCss = o.iframeLyr.style;
        iCss = o.iframeCss;
        iCss.left = "" + x + "px";
        iCss.top = "" + y + "px";
        iCss.width = "" + w + "px";
        iCss.height = "" + h + "px";
        iCss.zIndex = o.zIndex - 1;
        iCss.display = "block";
        if (_ie) {
            y -= 2;
            x -= 2;
        }
    } else {
        releaseBGIFrame(o.iframeLyr.id);
        css.display = "none";
        iCss.display = "none";
        o.releaseClicks();
    }
}

function ScrollMenuWidget_add(s, val, sel, id) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    o.list.add(s, val, sel, id);
}

function ScrollMenuWidget_del(i) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    o.list.del(i);
}

function ScrollMenuWidget_getSelection() {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    return o.list.getSelection();
}

function ScrollMenuWidget_select(i) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    o.list.select(i);
}

function ScrollMenuWidget_valueSelect(v) {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    o.list.valueSelect(v);
}

function ScrollMenuWidget_getCount() {
    var o = this;
    if (o.layer == null) {
        o.justInTimeInit();
    }
    return o.list.getCount();
}

function ScrollMenuWidget_changeCB() {
    var o = this;
    if (o.par.changeCB) {
        o.par.changeCB();
    }
}

function ScrollMenuWidget_clickCB() {
    var o = this;
    o.par.show(false);
    if (o.par.menuClickCB) {
        o.par.menuClickCB();
    }
}

function ScrollMenuWidget_dblClickCB() {
    var o = this;
    o.par.show(false);
    if (o.par.dblClickCB) {
        o.par.dblClickCB();
    }
}

function ScrollMenuWidget_keyUpCB(e) {
    var ENTER = 13, ESCAPE = 27;
    var o = this;
    var k = eventGetKey(e);
    if (k == ENTER || k == ESCAPE) {
        o.par.show(false);
    }
    if (o.par.keyUpCB) {
        o.par.keyUpCB();
    }
}

function newButtonScrollMenuWidget(id, label, buttonWidth, buttonTooltip, tabIndex, changeCB, multi, menuWidth, lines, menuTooltip, dblClickCB, keyUpCB, showMenuLabel, menuLabel, convBlanks, beforeShowCB) {
    var o = newButtonWidget(id, label, ButtonScrollMenuWidget_clickCB, buttonWidth, null, buttonTooltip, tabIndex, 0, _skin + "menus.gif", 7, 16, 0, 81, true, 0, 97);
    o.menu = newScrollMenuWidget("scrollMenu_menu_" + id, changeCB, multi, menuWidth, lines, menuTooltip, dblClickCB, keyUpCB, showMenuLabel, menuLabel, convBlanks, beforeShowCB);
    o.getMenu = IconMenuWidget_getMenu;
    o.add = ButtonScrollMenuWidget_add;
    return o;
}

function ButtonScrollMenuWidget_clickCB() {
    var o = this, l = o.layer;
    o.menu.show(!o.menu.isShown(), getPosScrolled(l).x, getPosScrolled(l).y + o.getHeight(), null, null, o);
}

function ButtonScrollMenuWidget_add(s, val, sel, id) {
    this.menu.add(s, val, sel, id);
}

function newBorderMenuItem(par, idx, cb, isLabel, label) {
    var o = newMenuItem(par, "border_" + idx, null, cb);
    o.idx = idx;
    o.isLabel = isLabel ? isLabel : false;
    o.label = label ? label : null;
    o.attachSubMenu = null;
    o.getHTML = BorderMenuItem_getHTML;
    o.check = BorderMenuItem_check;
    o.menuItemType = _isNotColor;
    return o;
}

function BorderMenuItem_check(check) {
    var o = this;
    if (o.checked != check) {
        o.checked = check;
        if (o.layer) {
            BorderMenuItem_invert(o.layer, o.checked ? 1 : 0);
        }
    }
}

function BorderMenuItem_getHTML() {
    var o = this, s = "", d = _moz ? 10 : 12, lenTotal = o.par.items.length, index = o.menuIndex - 1;
    col = index % 8;
    var cbs = ' onclick="' + _codeWinName + '.MenuBordersWidget_onclickCB(this,event);return true" oncontextmenu="' + _codeWinName + '.MenuBordersWidget_onclickCB(this,event);return false" onmousedown="' + _codeWinName + '._minb(event)" onmouseup="' + _codeWinName + '._minb(event)" onmouseover="' + _codeWinName + '.MenuBordersWidget_onmouseOverCB(this)" ';
    var cspan = (o.isLabel ? ' colspan="4"' : "");
    var cls = "menuiconborders" + (o.checked ? "Sel" : "");
    s += "<td " + cspan + ' id="' + (o.par.id + "_item_" + o.id) + '" ' + cbs + ' align="center"><div class="' + cls + '">';
    s += o.isLabel ? convStr(o.label) : simpleImgOffset(_skin + "../borders.gif", 16, 16, 16 * o.idx, 0, "IconImg_" + o.id, null, _bordersTooltip[o.idx], "margin:2px;cursor:default");
    s += "</div></td>";
    return s;
}

function BorderMenuItem_invert(lyr, inv) {
    var o = _menusItems[lyr._boIndex];
    if (o && o.checked) {
        inv = 1;
    }
    lyr.childNodes[0].className = "menuiconborders" + (inv ? "Sel" : "");
}

function newMenuBordersWidget(id, hideCB, beforeShowCB, clickCB) {
    var o = newMenuWidget(id, hideCB, beforeShowCB);
    o.items = new Array;
    for (var i = 0; i < 12; i++) {
        o.items[i] = newBorderMenuItem(o, i, clickCB);
    }
    var len = o.items.length;
    o.items[len] = newBorderMenuItem(o, 12, clickCB, true, _bordersMoreColorsLabel);
    o.clickCB = clickCB;
    o.getHTML = MenuBordersWidget_getHTML;
    o.hasVisibleItem = MenuBordersWidget_hasVisibleItem;
    o.uncheckAll = MenuBordersWidget_uncheckAll;
    return o;
}

function MenuBordersWidget_getHTML() {
    var o = this, items = o.items;
    var keysCbs = ' onkeydown="' + _codeWinName + ".MenuWidget_keyDown('" + o.id + "',event);return true\" ";
    var s = '<a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="startLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + "');return false;\" ></a>";
    s += '<table style="display:none;" class="menuFrame" id="' + o.id + '" cellspacing="0" cellpadding="0" border="0" ' + keysCbs + "><tbody>";
    s += "<tr>";
    for (var i = 0; i <= 3; i++) {
        s += items[i].getHTML();
    }
    s += "</tr>";
    s += "<tr>";
    for (var i = 4; i <= 7; i++) {
        s += items[i].getHTML();
    }
    s += "</tr>";
    s += "<tr>";
    for (var i = 8; i <= 11; i++) {
        s += items[i].getHTML();
    }
    s += "</tr>";
    s += "<tr>" + items[12].getHTML() + "</tr>";
    s += '</tbody></table><a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="endLink_' + o.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".MenuWidget_keepFocus('" + o.id + "');return false;\" ></a>";
    return s;
}

function MenuBordersWidget_hasVisibleItem() {
    return true;
}

function MenuBordersWidget_uncheckAll() {
    var o = this, items = o.items;
    for (var i in items) {
        var item = items[i];
        if (item.checked) {
            item.check(false);
        }
    }
}

function MenuBordersWidget_onclickCB(lyr, e) {
    eventCancelBubble(e);
    var idx = lyr._boIndex, o = _menusItems[idx];
    o.par.uncheckAll();
    BorderMenuItem_invert(lyr, 1, idx);
    o.checked = true;
    o.par.show(false, 0, 0, true);
    if (o.cb) {
        setTimeout("MenuItem_delayedClick(" + idx + ")", 1);
    }
}

function MenuBordersWidget_out() {
    BorderMenuItem_invert(this, 0);
}

function MenuBordersWidget_onmouseOverCB(l) {
    l.onmouseout = MenuBordersWidget_out;
    BorderMenuItem_invert(l, 1);
}

_boAllTabs = new Array;

function newTabWidget(id, isTop, name, cb, value, icon, iconW, iconH, iconOffX, iconOffY, dblclick, alt) {
    var o = newWidget(id);
    o.isTop = isTop;
    o.isSelected = false;
    o.lnkLayer = null;
    o.leftImgLayer = null;
    o.rightImgLayer = null;
    o.midImgLayer = null;
    o.imgImgLayer = null;
    o.iconLayer = null;
    o.tabBar = null;
    o.getHTML = TabWidget_getHTML;
    o.select = TabWidget_select;
    o.change = TabWidget_change;
    o.changeContent = TabWidget_changeContent;
    o.change(name, cb, value, icon, iconW, iconH, iconOffX, iconOffY, dblclick, alt);
    _boAllTabs[id] = o;
    return o;
}

function TabWidget_getHTML() {
    var o = this;
    var y = o.isSelected ? 0 : 72;
    if (!o.isTop) {
        y += 144;
    }
    var cls = "thumbtxt" + (o.isSelected ? "sel" : "");
    var cb = _codeWinName + ".TabWidget_clickCB('" + o.id + "');return false";
    var dblcb = _codeWinName + ".TabWidget_dblclickCB('" + o.id + "');return false";
    var keycb = _codeWinName + ".TabWidget_keyDownCB('" + o.id + "',event);";
    var menu = _codeWinName + ".TabWidget_contextMenuCB('" + o.id + "',event);return false";
    var icon = o.icon ? o.icon : _skin + "../transp.gif";
    var iconTDWidth = o.icon ? 3 : 0;
    return '<table onmouseover="return true" onclick="' + cb + '" id="' + this.id + '" ondblclick="' + dblcb + '" onkeydown="' + keycb + '" oncontextmenu="' + menu + '" id="' + this.id + '" style="cursor:' + _hand + '" cellspacing="0" cellpadding="0" border="0"><tbody><tr valign="middle" height="24">' + '<td width="15">' + imgOffset(_skin + "tabs.gif", 15, 24, 0, y, "tabWidgetLeft_" + o.id) + "</td>" + '<td id="tabWidgetImg_' + o.id + '" style="' + (o.isTop ? "padding-top:2px;" : "padding-bottom:2px;") + " padding-right:" + iconTDWidth + "px; " + backImgOffset(_skin + "tabs.gif", 0, y + 24) + '" width="' + (o.iconW + iconTDWidth) + '" align="left">' + imgOffset(icon, o.iconW, o.iconH, o.iconOffX, o.iconOffY, "tabWidgetIcon_" + o.id, null, o.iconAlt) + "</td>" + '<td  width="50" id="tabWidgetMid_' + o.id + '" style="' + (o.isTop ? "padding-top:3px;" : "padding-bottom:3px;") + backImgOffset(_skin + "tabs.gif", 0, y + 24) + '"><span style="white-space:nowrap">' + lnk(convStr(o.name, true), null, cls, "tabWidgetLnk_" + o.id) + "</span></td>" + '<td width="15">' + imgOffset(_skin + "tabs.gif", 15, 24, 0, y + 48, "tabWidgetRight_" + o.id) + "</td>" + "</tr></tbody></table>";
}

function TabWidget_clickCB(id) {
    setTimeout("TabWidget_delayedClickCB('" + id + "')", 1);
}

function TabWidget_dblclickCB(id) {
    setTimeout("TabWidget_delayedDblClickCB('" + id + "')", 1);
}

function TabWidget_keyDownCB(id, e) {
    var k = eventGetKey(e);
    if (eventGetKey(e) == 13) {
        eventCancelBubble(e);
    }
}

function TabWidget_contextMenuCB(id, e) {
    if (_ie) {
        e = _curWin.event;
    }
    var tab = _boAllTabs[id], tabbar = tab.tabBar;
    if ((tab) && (tab.cb)) {
        tab.cb();
    }
    if ((tabbar) && (tabbar.showMenu)) {
        tabbar.showMenu(e);
    }
}

function TabWidget_delayedClickCB(id) {
    var tab = _boAllTabs[id];
    if ((tab) && (tab.cb)) {
        tab.cb();
    }
}

function TabWidget_delayedDblClickCB(id) {
    var tab = _boAllTabs[id];
    if ((tab) && (tab.dblclick)) {
        tab.dblclick();
    }
}

function TabWidget_changeContent(changeOnlySelection) {
    var o = this;
    if (o.lnkLayer == null) {
        o.lnkLayer = getLayer("tabWidgetLnk_" + o.id);
        o.leftImgLayer = getLayer("tabWidgetLeft_" + o.id);
        o.rightImgLayer = getLayer("tabWidgetRight_" + o.id);
        o.midImgLayer = getLayer("tabWidgetMid_" + o.id);
        o.imgImgLayer = getLayer("tabWidgetImg_" + o.id);
        o.iconLayer = getLayer("tabWidgetIcon_" + o.id);
    }
    if (!changeOnlySelection) {
        o.lnkLayer.innerHTML = convStr(o.name, true);
        changeOffset(o.iconLayer, o.iconOffX, o.iconOffY, o.icon ? o.icon : _skin + "../transp.gif");
        o.iconLayer.alt = o.iconAlt;
        o.iconLayer.style.width = "" + o.iconW + "px";
        o.iconLayer.style.height = "" + o.iconH + "px";
        var iconTDWidth = o.icon ? 3 : 0, imgL = o.imgImgLayer;
        imgL.style.paddingRight = "" + iconTDWidth + "px";
        imgL.style.width = "" + (iconTDWidth + (((o.icon != null) && (o.iconW != null)) ? o.iconW : 0)) + "px";
        if (_moz && !_saf) {
            imgL.width = (iconTDWidth + (((o.icon != null) && (o.iconW != null)) ? o.iconW : 0));
        }
    }
    var y = o.isSelected ? 0 : 72;
    if (!o.isTop) {
        y += 144;
    }
    changeOffset(o.leftImgLayer, 0, y);
    changeOffset(o.midImgLayer, 0, y + 24);
    changeOffset(o.imgImgLayer, 0, y + 24);
    changeOffset(o.rightImgLayer, 0, y + 48);
    o.lnkLayer.className = "thumbtxt" + (o.isSelected ? "sel" : "");
}

function TabWidget_select(sel) {
    var o = this;
    o.isSelected = sel;
    if (o.layer != null) {
        o.changeContent(true);
    }
}

function TabWidget_change(name, cb, value, icon, iconW, iconH, iconOffX, iconOffY, dblclick, alt) {
    var o = this;
    if (name != null) {
        o.name = name;
    }
    if (cb != null) {
        o.cb = cb;
    }
    if (dblclick != null) {
        o.dblclick = dblclick;
    }
    if (value != null) {
        o.value = value;
    }
    if (icon != null) {
        o.icon = icon;
    }
    o.iconW = iconW ? iconW : 0;
    o.iconH = iconH ? iconH : 0;
    o.iconOffX = iconOffX ? iconOffX : 0;
    o.iconOffY = iconOffY ? iconOffY : 0;
    if (alt != null) {
        o.iconAlt = alt;
    }
    if (o.layer != null) {
        o.changeContent(false);
    }
}

function newTabBarWidget(id, isTop, cb, st, dblclick, beforeShowMenu, showIcn) {
    var o = newWidget(id);
    var t;
    o.isTop = isTop;
    o.cb = cb;
    o.dblclick = dblclick;
    o.menu = newMenuWidget("menu_" + id, null, beforeShowMenu);
    o.st = st;
    o.counter = 0;
    o.items = new Array;
    o.selIndex = -1;
    o.leftLimit = 0;
    o.trLayer = null;
    o.showIcn = showIcn == null ? false : showIcn;
    t = o.firstIcn = newIconWidget("firstIcn_" + id, _skin + "scroll_icon.gif", TabBarWidget_firstCB, null, _scroll_first_tab, 5, 8, 0, 0, 0, 8);
    t.par = o;
    t.margin = 0;
    t.allowDblClick = true;
    t = o.previousIcn = newIconWidget("previousIcn_" + id, _skin + "scroll_icon.gif", TabBarWidget_prevCB, null, _scroll_previous_tab, 5, 8, 7, 0, 7, 8);
    t.par = o;
    t.margin = 0;
    t.allowDblClick = true;
    t = o.nextIcn = newIconWidget("nextIcn_" + id, _skin + "scroll_icon.gif", TabBarWidget_nextCB, null, _scroll_next_tab, 5, 8, 13, 0, 13, 8);
    t.par = o;
    t.margin = 0;
    t.allowDblClick = true;
    t = o.lastIcn = newIconWidget("lastIcn_" + id, _skin + "scroll_icon.gif", TabBarWidget_lastCB, null, _scroll_last_tab, 5, 8, 21, 0, 21, 8);
    t.par = o;
    t.margin = 0;
    t.allowDblClick = true;
    o.showContextMenuAllowed = true;
    o.oldInit = o.init;
    o.init = TabBarWidget_init;
    o.getHTML = TabBarWidget_getHTML;
    o.add = TabBarWidget_add;
    o.remove = TabBarWidget_remove;
    o.removeAll = TabBarWidget_removeAll;
    o.select = TabBarWidget_select;
    o.getSelection = TabBarWidget_getSelection;
    o.getMenu = TabBarWidget_getMenu;
    o.showMenu = TabBarWidget_showMenu;
    o.showTab = TabBarWidget_showTab;
    o.getCount = TabBarWidget_getCount;
    o.oldResize = o.resize;
    o.resize = TabBarWidget_resize;
    o.getItemXPos = TabBarWidget_getItemXPos;
    o.scroll = TabBarWidget_scroll;
    o.setIconState = TabBarWidget_setIconState;
    o.setShowContextMenuAllowed = TabBarWidget_setShowContextMenuAllowed;
    return o;
}

function TabBarWidget_init() {
    var o = this, items = o.items;
    o.oldInit();
    if (o.showIcn) {
        o.firstIcn.init();
        o.previousIcn.init();
        o.nextIcn.init();
        o.lastIcn.init();
    }
    o.trLayer = getLayer("tr_" + o.id);
    o.tabsLayer = getLayer("tabs_" + o.id);
    for (var i in items) {
        var it = items[i];
        it.init();
        it.select(i == o.selIndex);
    }
}

function TabBarWidget_getSelection() {
    var o = this, index = o.selIndex;
    if (index >= 0) {
        var obj = new Object;
        obj.index = index;
        obj.valueOf = o.items[index].value;
        obj.name = o.items[index].name;
        return obj;
    } else {
        return null;
    }
}

function TabBarWidget_getHTML() {
    var o = this, items = o.items, len = items.length;
    var s = '<div id="' + this.id + '" style="height:24px;overflow:hidden;' + (o.st ? o.st : "") + '">';
    s += '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr valign="top" height="24">';
    if (o.showIcn) {
        s += '<td><table class="palette" cellspacing="0" cellpadding="0" border="0"><tbody><tr>';
        s += "<td>" + o.firstIcn.getHTML() + "</td>";
        s += "<td>" + o.previousIcn.getHTML() + "</td>";
        s += "<td>" + o.nextIcn.getHTML() + "</td>";
        s += "<td>" + o.lastIcn.getHTML() + "</td>";
        s += "</tr></tbody></table></td>";
    }
    s += '<td><div style="overflow:' + (true ? "hidden" : "scroll") + '" id="tabs_' + this.id + '"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr id="tr_' + this.id + '">';
    for (var i in items) {
        s += "<td>" + items[i].getHTML() + "</td>";
    }
    s += "</tr></tbody></table></div></td>";
    s += "</tr></tbody></table></div>";
    return s;
}

function TabBarWidget_select(index) {
    var o = this, items = o.items, len = items.length;
    if (index == -1) {
        index = len - 1;
    }
    if ((index >= 0) && (index < len)) {
        if ((o.selIndex >= 0) && (o.selIndex != index) && (o.selIndex < len)) {
            items[o.selIndex].select(false);
        }
        o.selIndex = index;
        items[index].select(true);
        o.scroll(o.selIndex);
    }
}

function TabBarWidget_resize(w, h) {
    var o = this;
    var d = isHidden(o.layer);
    if (d & _moz && !_saf) {
        o.setDisplay(false);
    }
    o.oldResize(w, h);
    if (w != null) {
        o.tabsLayer.style.width = "" + Math.max(0, w - 54);
    }
    if (d & _moz && !_saf) {
        o.setDisplay(true);
    }
    o.setIconState();
}

function TabBarWidget_showTab(index, show) {
    var o = this, items = o.items, len = items.length;
    if ((index >= 0) || (index < len)) {
        items[index].setDisplay(show);
    }
}

function TabBarWidget_add(name, value, idx, icon, iconW, iconH, iconOffX, iconOffY, alt) {
    var o = this, counter = o.counter++;
    var obj = newTabWidget(o.id + "_tab" + counter, o.isTop, name, TabBarWidget_itemClick, value, icon, iconW, iconH, iconOffX, iconOffY, TabBarWidget_itemDblClick, alt);
    obj.tabBar = o;
    obj.idx = counter;
    arrayAdd(o, "items", obj, idx);
    var l = o.trLayer;
    if (l != null) {
        var node = document.createElement("td");
        node.innerHTML = obj.getHTML();
        l.appendChild(node);
        obj.init();
    }
    return obj;
}

function TabBarWidget_remove(idx) {
    var o = this, items = o.items, len = items.length;
    if ((idx >= 0) && (idx < len)) {
        var elem = items[idx];
        var l = elem.layer;
        arrayRemove(o, "items", idx);
        items = o.items;
        len = items.length;
        if (l != null) {
            l = l.parentNode;
            l.parentNode.removeChild(l);
        }
        if (o.selIndex > idx) {
            o.select(o.selIndex - 1);
        } else {
            if ((o.selIndex == idx) && (len > 0)) {
                o.select(Math.min(idx, len - 1));
            }
        }
    }
}

function TabBarWidget_removeAll() {
    var o = this, items = o.items, len = items.length;
    for (var i = len - 1; i >= 0; i--) {
        o.remove(i);
    }
}

function TabBarWidget_itemClick() {
    var o = this.tabBar, items = o.items, len = items.length, index = -1;
    for (var i = 0; i < len; i++) {
        if (items[i].idx == this.idx) {
            o.select(i);
            index = i;
            break;
        }
    }
    if (o.cb) {
        o.cb(index);
    }
}

function TabBarWidget_itemDblClick() {
    var o = this.tabBar, items = o.items, len = items.length, index = -1;
    for (var i = 0; i < len; i++) {
        if (items[i].idx == this.idx) {
            index = i;
            break;
        }
    }
    if (o.dblclick) {
        o.dblclick(index);
    }
}

function TabBarWidget_getMenu() {
    return this.menu;
}

function TabBarWidget_setShowContextMenuAllowed(b) {
    this.showContextMenuAllowed = b;
}

function TabBarWidget_showMenu(e) {
    if (this.showContextMenuAllowed == false) {
        return;
    }
    if (_ie) {
        e = event;
    }
    this.menu.show(true, eventGetX(e), eventGetY(e));
}

function TabBarWidget_getCount() {
    return this.items.length;
}

function TabBarWidget_scroll(step, destItem) {
    var o = this;
    if (o.tabsLayer == null) {
        return;
    }
    var tabsl = o.tabsLayer;
    var tabsSL = tabsl.scrollLeft, tabsOW = tabsl.offsetWidth, tabsSW = tabsl.scrollWidth, SLMax = tabsSW - tabsOW;
    if (step == "first") {
        tabsl.scrollLeft = tabsSL = 0;
        o.leftLimit = 0;
    }
    if (step == "previous") {
        o.leftLimit = o.leftLimit - 1;
        var x = o.getItemXPos(o.leftLimit);
        tabsl.scrollLeft = tabsSL = x;
    }
    if (step == "next") {
        if (o.leftLimit > o.getCount() - 1) {
            return;
        }
        o.leftLimit += 1;
        var x = o.getItemXPos(o.leftLimit);
        if (x < SLMax) {
            tabsl.scrollLeft = tabsSL = x;
        } else {
            tabsl.scrollLeft = tabsSL = SLMax;
        }
    }
    if (step == "last") {
        for (var i = 0; i < o.getCount(); i++) {
            var x = o.getItemXPos(i);
            if (x > SLMax) {
                break;
            }
        }
        tabsl.scrollLeft = tabsSL = Math.max(0, SLMax);
        o.leftLimit = i;
    }
    if (step == null) {
        var x = getItemXPos(destItem);
        if (x < SLMax) {
            tabsl.scrollLeft = tabsSL = x;
        } else {
            tabsl.scrollLeft = tabsSL = SLMax;
        }
        for (var i = 0; i < o.getCount(); i++) {
            var x = o.getItemXPos(i);
            if (x > SLMax) {
                break;
            }
        }
        o.leftLimit = i;
    }
    o.setIconState();
}

function TabBarWidget_getItemXPos(index) {
    var o = this;
    var x = 0;
    for (var i = 0; i < index; i++) {
        x += parseInt(o.items[i].getWidth());
    }
    return x;
}

function TabBarWidget_setIconState() {
    var o = this;
    if (o.tabsLayer == null) {
        return;
    }
    var tabsl = o.tabsLayer;
    var tabsSL = tabsl.scrollLeft, tabsOW = tabsl.offsetWidth, tabsSW = tabsl.scrollWidth, SLMax = tabsSW - tabsOW;
    if (tabsSL == SLMax) {
        o.nextIcn.setDisabled(true);
        o.lastIcn.setDisabled(true);
    } else {
        o.nextIcn.setDisabled(false);
        o.lastIcn.setDisabled(false);
    }
    if (tabsSL == 0) {
        o.firstIcn.setDisabled(true);
        o.previousIcn.setDisabled(true);
    } else {
        o.firstIcn.setDisabled(false);
        o.previousIcn.setDisabled(false);
    }
}

function TabBarWidget_firstCB() {
    var p = this.par;
    p.scroll("first");
}

function TabBarWidget_prevCB() {
    var p = this.par;
    p.scroll("previous");
}

function TabBarWidget_nextCB() {
    var p = this.par;
    p.scroll("next");
}

function TabBarWidget_lastCB() {
    var p = this.par;
    p.scroll("last");
}

function newTabbedZone(id, cb, w, h) {
    var o = newFrameZoneWidget(id, w, h);
    o.w = w;
    o.h = h;
    o.cb = cb;
    o.zoneLayers = new Array;
    o.oldIndex = -1;
    o.tzOldInit = o.init;
    o.add = TabbedZoneWidget_add;
    o.select = TabbedZoneWidget_select;
    o.getTabCSS = TabbedZoneWidget_getTabCSS;
    o.init = TabbedZoneWidget_init;
    o.beginHTML = TabbedZoneWidget_beginHTML;
    o.oldFrameZoneEndHTML = o.endHTML;
    o.endHTML = TabbedZoneWidget_endHTML;
    o.tabs = newTabBarWidget("tzone_tabs_" + id, true, TabbedZone_itemClick);
    o.tabs.parentTabbedZone = o;
    o.beginTabHTML = TabbedZoneWidget_beginTabHTML;
    o.endTabHTML = TabbedZoneWidget_endTabHTML;
    o.beginTab = TabbedZoneWidget_beginTab;
    o.endTab = TabbedZoneWidget_endTab;
    o.showTab = TabbedZoneWidget_showTab;
    o.tzOldResize = o.resize;
    o.resize = TabbedZoneWidget_resize;
    return o;
}

function TabbedZone_itemClick() {
    var o = this.parentTabbedZone, i = this.getSelection().index;
    o.select(i);
    if (o.cb) {
        o.cb(i);
    }
}

function TabbedZoneWidget_add(name, value, icon, iconW, iconH, iconOffX, iconOffY) {
    var o = this;
    o.tabs.add(name, value, -1, icon, iconW, iconH, iconOffX, iconOffY);
    o.zoneLayers[o.zoneLayers.length] = null;
}

function TabbedZoneWidget_init() {
    var o = this;
    o.tzOldInit();
    o.tabs.init();
    o.select(0);
}

function TabbedZoneWidget_getTabCSS(index) {
    var o = this, ls = o.zoneLayers, l = ls[index];
    if (l == null) {
        l = ls[index] = getLayer("tzone_tab_" + index + "_" + o.id);
    }
    return l ? l.style : null;
}

function TabbedZoneWidget_showTab(index, show) {
    var tab = this.tabs.items[index];
    if (tab) {
        tab.setDisplay(show);
    }
}

function TabbedZoneWidget_select(index) {
    var o = this, tabs = o.tabs, sel = tabs.getSelection(), oldIndex = o.oldIndex, c;
    o.tabs.select(index);
    if (oldIndex != -1) {
        c = o.getTabCSS(oldIndex);
        if (c) {
            c.display = "none";
        }
    } else {
        var len = o.zoneLayers.length;
        for (var i = 0; i < len; i++) {
            c = o.getTabCSS(i);
            if (c) {
                c.display = "none";
            }
        }
    }
    o.oldIndex = index;
    c = o.getTabCSS(index);
    if (c) {
        c.display = "";
        o.resize(o.w, o.h);
    }
}

function TabbedZoneWidget_beginHTML() {
    var o = this;
    return '<table id="' + this.id + '" cellspacing="0" cellpadding="0" border="0"><tbody><tr valign="bottom" height="28">' + "<td>" + imgOffset(_skin + "dialogframe.gif", 5, 5, 0, 0) + "</td>" + '<td valign="top" align="left" style="' + backImgOffset(_skin + "tabs.gif", 0, 288) + '">' + o.tabs.getHTML() + "</td>" + "<td>" + imgOffset(_skin + "dialogframe.gif", 5, 5, 5, 0) + "</td></tr>" + '<tr><td style="' + backImgOffset(_skin + "dialogframeleftright.gif", 0, 0) + '"></td><td class="dialogzone"><div id="' + o.id + "_container" + '" style="' + sty("width", o.w) + sty("height", o.h) + '">';
}

function TabbedZoneWidget_endHTML() {
    return "</div>" + this.oldFrameZoneEndHTML();
}

function TabbedZoneWidget_beginTabHTML(index) {
    var o = this;
    return '<div id="tzone_tab_' + index + "_" + o.id + '" style="display:none;' + sty("width", o.w) + sty("height", o.h) + '">';
}

function TabbedZoneWidget_endTabHTML() {
    return "</div>";
}

function TabbedZoneWidget_beginTab(index) {
    _curDoc.write(this.beginTabHTML(index));
}

function TabbedZoneWidget_endTab() {
    _curDoc.write(this.endTabHTML());
}

function TabbedZoneWidget_resize(w, h) {
    var o = this;
    if (w != null) {
        o.w = w;
        w = w + 10;
    }
    if (h != null) {
        o.h = h;
        h = h + 33;
    }
    o.tzOldResize(w, h);
    var container = getLayer(o.id + "_container");
    if (container) {
        container.style.width = o.w + "px";
        container.style.height = o.h + "px";
    }
    if (o.oldIndex != null) {
        var tab = getLayer("tzone_tab_" + o.oldIndex + "_" + o.id);
        if (tab) {
            tab.style.width = o.w + "px";
            tab.style.height = o.h + "px";
        }
    }
}

_trIndent = 18;

function newTreeWidget(id, w, h, icns, clickCB, doubleClickCB, bgClass, expandCB, collapseCB, deleteCB, minIcon, plusIcon) {
    var o = newScrolledZoneWidget(id, 2, 4, w, h, bgClass);
    o.icns = icns;
    o.sub = new Array;
    o.clickCB = clickCB;
    o.doubleClickCB = doubleClickCB;
    o.expandCB = expandCB;
    o.collapseCB = collapseCB;
    o.deleteCB = deleteCB;
    o.minIcon = minIcon;
    o.plusIcon = plusIcon;
    o.mouseOverCB = null;
    o.rightClickMenuCB = null;
    o.mouseOverTooltip = false;
    o.dragDrop = null;
    o.oldInit = o.init;
    o.init = TreeWidget_init;
    o.getHTML = TreeWidget_getHTML;
    o.getSelections = TreeWidget_getSelections;
    o.getSelectedItem = TreeWidget_getSelectedItem;
    o.getSelectedItems = TreeWidget_getSelectedItems;
    o.getCheckedItems = TreeWidget_getCheckedItems;
    o.setDragDrop = TreeWidget_setDragDrop;
    o.setFocus = TreeWidget_setFocus;
    o.add = TreeWidget_add;
    o.setRightClickMenuCB = TreeWidget_setRightClickMenuCB;
    o.findByData = TreeWidget_findByData;
    o.findById = TreeWidget_findById;
    o.findInName = TreeWidget_findInName;
    o.selectByData = TreeWidget_selectByData;
    o.selectById = TreeWidget_selectById;
    o.unselect = TreeWidget_unselect;
    o.search = TreeWidget_search;
    o.treeLyr = null;
    o.elems = new Array;
    o.elemCount = 0;
    o.selId = -1;
    o.selIds = new Array;
    o.multiSelection = false;
    o.hlPath = false;
    o.hlElems = new Array;
    o.iconOrientVertical = true;
    o.deleteAll = TreeWidget_deleteAll;
    o.rebuildHTML = TreeWidget_rebuildHTML;
    o.iconW = 16;
    o.iconH = 16;
    o.initialIndent = 0;
    o.buildElems = TreeWidget_buildElems;
    o.getCount = TreeWidget_getCount;
    if (window._TreeWidgetElemInstances == null) {
        window._TreeWidgetElemInstances = new Array;
    }
    o.dispIcnFuncName = "dispIcn";
    o.setTooltipOnMouseOver = TreeWidget_setTooltipOnMouseOver;
    o.setMouseOverCB = TreeWidget_setMouseOverCB;
    o.setMultiSelection = TreeWidget_setMultiSelection;
    o.setHighlightPath = TreeWidget_setHighlightPath;
    o.highlightPath = TreeWidget_highlightPath;
    o.unhlPath = TreeWidget_unhlPath;
    return o;
}

function TreeWidget_unselect() {
    var o = this;
    if (o.selId >= 0) {
        var prev = _TreeWidgetElemInstances[o.selId];
        prev.unselect();
        o.selId = -1;
    }
    if (o.multiSelection) {
        var len = o.selIds.length, id;
        for (var i = len - 1; i >= 0; i--) {
            var prev = _TreeWidgetElemInstances[o.selIds[i]];
            if (prev) {
                prev.unselect();
            }
        }
        o.selIds.length = 0;
        o.layer._BOselIds = "";
    }
    o.unhlPath();
}

function TreeWidget_selectByData(data, setFocus) {
    var o = this, item = o.findByData(data);
    if (item) {
        item.select(setFocus);
    }
}

function TreeWidget_selectById(id, setFocus) {
    var o = this, item = o.findById(id);
    if (item) {
        item.select(setFocus);
    }
}

function TreeWidget_findByData(data) {
    var o = this, sub = o.sub, item = null;
    for (var i in sub) {
        item = sub[i].findByData(data);
        if (item) {
            return item;
        }
    }
    return null;
}

function TreeWidget_findById(id) {
    var o = this, sub = o.sub, item = null;
    for (var i in sub) {
        item = sub[i].findById(id);
        if (item) {
            return item;
        }
    }
    return null;
}

function TreeWidget_findInName(text, matchCase, matchWholeW, startFrom, next, starWith, visible) {
    if (text == "" || text == null) {
        return null;
    }
    var o = this, item = null, elem = null, hidden = false;
    var startPos = 0, newPos = 0;
    var bMatchCase = matchCase ? matchCase : false;
    var bMatchWW = matchWholeW ? matchWholeW : false;
    var bNext = (!next) ? next : true;
    var bVisible = visible ? visible : false;
    var len = o.elems.length;
    if (len == 0) {
        o.buildElems();
        len = o.elems.length;
        if (len == 0) {
            return;
        }
    }
    var arr = o.getSelections();
    if (arr.length > 0) {
        startPos = arr[0].elemPos + (bNext ? 1 : -1);
        if ((startPos < 0) && !bNext) {
            startPos = len - 1;
        }
        if ((startPos == len) && bNext) {
            startPos = 0;
        }
    } else {
        if (startFrom == "begin") {
            startPos = 0;
        } else {
            if (startFrom == "end") {
                startPos = len - 1;
            }
        }
    }
    newPos = startPos;
    while ((newPos >= 0) && (newPos < len)) {
        elem = o.elems[newPos];
        hidden = elem.getHiddenParent();
        if ((bVisible && !hidden) || (!bVisible)) {
            item = elem.findInName(text, bMatchCase, bMatchWW, bNext, starWith);
        }
        if (item != null) {
            break;
        }
        newPos = newPos + (bNext ? 1 : -1);
        if ((newPos < 0) && !bNext) {
            newPos = len - 1;
        }
        if ((newPos == len) && bNext) {
            newPos = 0;
        }
        if (newPos == startPos) {
            break;
        }
    }
    return item;
}

function TreeWidget_search(text, matchCase, matchWholeW, startFrom, next, notFoundCB, starWith, visible, setFocus) {
    var o = this, item = null;
    if (text == "" || text == null) {
        return;
    }
    item = o.findInName(text, matchCase, matchWholeW, startFrom, next, starWith, visible);
    if (item) {
        o.unselect();
        item.select(setFocus);
    } else {
        if (notFoundCB) {
            notFoundCB();
        }
    }
}

function TreeWidget_add(elem, extraIndent) {
    var o = this, sub = o.sub, len = sub.length;
    elem.treeView = o;
    sub[len] = elem;
    elem.expanded = (len == 0);
    if (extraIndent) {
        elem.extraIndent = extraIndent;
    }
    return elem;
}

function TreeWidget_getHTML() {
    var o = this, sub = o.sub, len = sub.length, a = new Array(len + 3), j = 0;
    a[j++] = o.beginHTML() + '<span id="treeCont_' + o.id + '" onkeydown="return ' + _codeWinName + '.TreeWidget_keyDownCB(this,event)" >';
    for (var i in sub) {
        a[j++] = sub[i].getHTML(o.initialIndent, i == 0);
    }
    a[j++] = "</span>" + o.endHTML();
    return a.join("");
}

function TreeWidget_deleteAll() {
    var sub = this.sub;
    for (var i in sub) {
        sub[i].deleteAll();
        sub[i] = null;
    }
    sub.length = 0;
    if (this.elems) {
        this.elems.length = 0;
    }
}

function TreeWidget_rebuildHTML() {
    var o = this, sub = o.sub, len = sub.length, a = new Array(len), j = 0, idt = o.initialIndent;
    for (var i in sub) {
        a[j++] = sub[i].getHTML(idt, i == 0);
    }
    o.treeLyr.innerHTML = a.join("");
    o.selId = -1;
    o.layer._BOselId = -1;
    o.selIds.length = 0;
    o.layer._BOselIds = "";
    this.buildElems();
}

function TreeWidget_init() {
    this.oldInit();
    var l = this.treeLyr = getLayer("treeCont_" + this.id);
    if (this.dragDrop) {
        this.dragDrop.attachCallbacks(this.layer);
    }
    var oldSel = this.layer._BOselId;
    if (oldSel != null) {
        this.selId = oldSel;
    }
    var oldArraySel = this.layer._BOselIds;
    if (oldArraySel != null && oldArraySel != "") {
        this.selIds.length = 0;
        this.selIds = oldArraySel.split(";");
    }
    var sub = this.sub;
}

function TreeWidget_buildElems(elem) {
    with (this) {
        if (elem == null) {
            elem = this;
        } else {
            var pos = elems.length;
            elems[pos] = elem;
            elem.elemPos = pos;
        }
        var subArr = elem.sub, len = subArr.length;
        for (var i = 0; i < len; i++) {
            buildElems(subArr[i]);
        }
    }
}

function TreeWidget_getSelectedItem() {
    var id = this.selId;
    return (id >= 0) ? _TreeWidgetElemInstances[id] : null;
}

function TreeWidget_getSelections() {
    var o = this;
    if (o.multiSelection) {
        return o.getSelectedItems();
    } else {
        var sel = o.getSelectedItem(), arrSel = new Array;
        if (sel != null) {
            arrSel[0] = sel;
        }
        return arrSel;
    }
}

function TreeWidget_setFocus(index) {
    var elem = _TreeWidgetElemInstances[index];
    if (elem != null) {
        elem.init();
        safeSetFocus(elem.domElem);
    }
}

function TreeWidget_keyPressCB(lay, e) {
    if (getWidget(lay).multiSelection) {
        return TreeWidget_multiSelKeyPress(lay, e);
    }
    var id = getWidget(lay).selId;
    if (id >= 0) {
        var elem = _TreeWidgetElemInstances[id];
        var treeView = elem.treeView;
        var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
        var k = eventGetKey(e), ctrl = _ie ? _curWin.event.ctrlKey : e.ctrlKey;
        if (k == 13) {
            if (source != id) {
                TreeWidget_clickCB(source, false, null);
                TreeWidgetElem_UpdateTooltip(source, true);
            } else {
                if ((source == id) && (treeView.doubleClickCB)) {
                    treeView.doubleClickCB(elem.userData);
                }
            }
        }
        if ((k == 10) && ctrl && (source == _codeWinName + "trLstElt" + id)) {
            if (elem.sub.length > 0) {
                TreeWidget_toggleCB(id);
                TreeWidgetElem_UpdateTooltip(source);
            }
            if (elem.isIncomplete && elem.querycompleteCB) {
                elem.querycompleteCB();
                TreeWidgetElem_UpdateTooltip(source);
            }
            return false;
        }
    } else {
        var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
        var k = eventGetKey(e);
        if (k == 13) {
            TreeWidget_clickCB(source, false, null);
            TreeWidgetElem_UpdateTooltip(source, true);
        }
    }
}

function TreeWidget_multiSelKeyPress(o, e) {
    var treeView = getWidget(o);
    var len = treeView.selIds.length;
    if (len > 0) {
        var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
        var k = eventGetKey(e), ctrl = _ie ? _curWin.event.ctrlKey : e.ctrlKey;
        var elem = null;
        for (var i = 0; i < len; i++) {
            var id = treeView.selIds[i];
            if (source == id) {
                elem = _TreeWidgetElemInstances[id];
                break;
            }
        }
        if (k == 13) {
            if (elem == null) {
                TreeWidget_clickCB(source, false, _ie ? _curWin.event : e);
                TreeWidgetElem_UpdateTooltip(source, true);
            } else {
                if (elem && (treeView.doubleClickCB)) {
                    treeView.doubleClickCB(elem.userData);
                }
            }
        }
        if ((k == 10) && ctrl && elem) {
            if (elem.sub.length > 0) {
                TreeWidget_toggleCB(id);
                TreeWidgetElem_UpdateTooltip(source);
            }
            if (elem.isIncomplete && elem.querycompleteCB) {
                elem.querycompleteCB();
                TreeWidgetElem_UpdateTooltip(source);
            }
            return false;
        }
    } else {
        var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
        var k = eventGetKey(e);
        if (k == 13) {
            TreeWidget_clickCB(source, false, null);
            TreeWidgetElem_UpdateTooltip(source, true);
        }
    }
    return true;
}

t = 0;

function TreeWidget_keyDownCB(lay, e) {
    if (getWidget(lay).multiSelection) {
        return TreeWidget_multiSelKeyDown(lay, e);
    }
    var id = getWidget(lay).selId;
    var k = eventGetKey(e);
    if (id >= 0) {
        var elem = _TreeWidgetElemInstances[id];
        if (elem != null) {
            var treeView = elem.treeView;
            var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
            switch (k) {
                case 107:
                case 39:
                    if ((elem.sub.length > 0) && (!elem.expanded)) {
                        TreeWidget_toggleCB(id);
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    if (elem.isIncomplete && elem.querycompleteCB) {
                        elem.querycompleteCB();
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    break;
                case 109:
                case 37:
                    if ((elem.sub.length > 0) && (elem.expanded)) {
                        TreeWidget_toggleCB(id);
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    break;
                case 40:
                case 38:
                    var nElt = elem.getNextPrev(k == 40 ? 1 : -1);
                    if (nElt != null) {
                        nElt.select(null, null, null, true);
                        safeSetFocus(nElt.domElem);
                    }
                    return false;
                    break;
                case 46:
                    if (treeView.deleteCB) {
                        treeView.deleteCB(elem.userData);
                    }
                    break;
                default:
                    var c = String.fromCharCode(k);
                    if (c) {
                        treeView.search(c, false, false, null, true, null, true, true, true);
                    }
                    break;
            }
        }
    }
    if (k == 13) {
        eventCancelBubble(e);
    }
}

function TreeWidget_multiSelKeyDown(o, e) {
    var treeView = getWidget(o);
    var len = treeView.selIds.length;
    var k = eventGetKey(e);
    if (len > 0) {
        var ctrl = _ie ? _curWin.event.ctrlKey : e.ctrlKey;
        var shift = _ie ? _curWin.event.shiftKey : e.shiftKey;
        var source = TreeIdToIdx(_ie ? _curWin.event.srcElement : e.target);
        var elem = null, id;
        for (var i = 0; i < len; i++) {
            id = treeView.selIds[i];
            if (source == id) {
                elem = _TreeWidgetElemInstances[id];
                break;
            }
        }
        if (elem) {
            switch (k) {
                case 107:
                case 39:
                    if ((elem.sub.length > 0) && (!elem.expanded)) {
                        TreeWidget_toggleCB(id);
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    if (elem.isIncomplete && elem.querycompleteCB) {
                        elem.querycompleteCB();
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    break;
                case 109:
                case 37:
                    if ((elem.sub.length > 0) && (elem.expanded)) {
                        TreeWidget_toggleCB(id);
                        TreeWidgetElem_UpdateTooltip(source);
                    }
                    break;
                case 40:
                case 38:
                    var nElt = elem.getNextPrev(k == 40 ? 1 : -1);
                    if (nElt != null) {
                        nElt.select(null, _ie ? _curWin.event : e, null, true);
                        safeSetFocus(nElt.domElem);
                    }
                    return false;
                    break;
                case 46:
                    if (treeView.deleteCB) {
                        treeView.deleteCB(elem.userData);
                    }
                    break;
                default:
                    var c = String.fromCharCode(k);
                    if (c) {
                        treeView.search(c, false, false, null, true, null, true, true, true);
                    }
                    break;
            }
        }
    }
    if (k == 13) {
        eventCancelBubble(e);
    }
}

function TreeWidget_setDragDrop(dragCB, acceptDropCB, dropCB, dragEndCB) {
    this.dragCB = dragCB;
    this.acceptDropCB = acceptDropCB;
    this.dropCB = dropCB;
    this.dragEndCB = dragEndCB;
    this.dragDrop = newDragDropData(this, TreeWidget_dragStartCB, TreeWidget_dragCB, TreeWidget_dragEndCB, TreeWidget_acceptDropCB, TreeWidget_leaveDropCB, TreeWidget_dropCB);
}

function TreeWidget_dragStartCB(src) {
    var items = src.getSelections(), vert = src.iconOrientVertical;
    src.dragCB(src);
    if (items && items.length == 1) {
        var item = items[0];
        var idx = item.iconId;
        newTooltipWidget().show(true, item.getDragTooltip(), idx >= 0 ? src.icns : null, src.iconW, src.iconH, vert ? 0 : src.iconW * idx, vert ? src.iconH * idx : 0);
    }
}

function TreeWidget_setRightClickMenuCB(rightClickMenuCB) {
    this.rightClickMenuCB = rightClickMenuCB;
}

function TreeWidget_getCount() {
    var o = this;
    if (o.sub != null) {
        return o.sub.length;
    } else {
        return 0;
    }
}

function TreeWidget_setTooltipOnMouseOver(catchMouseOver) {
    this.mouseOverTooltip = catchMouseOver;
}

function TreeWidget_setMouseOverCB(mouseOverCB) {
    this.mouseOverCB = mouseOverCB;
}

function TreeWidget_dragCB(src) {
    newTooltipWidget().setPos();
}

function TreeWidget_dragEndCB(src) {
    newTooltipWidget().show(false);
    if (src.dragEndCB) {
        src.dragEndCB();
    }
}

function TreeWidget_dragOverEnterCB(lyr, elemId) {
    var e = _TreeWidgetElemInstances[elemId];
    if (lyr.ondrop == null) {
        e.treeView.dragDrop.attachCallbacks(lyr, true);
        lyr.domEltID = elemId;
    }
    var o = _ddData[lyr._dragDropData], e = _curWin.event;
    e.dataTransfer.dropEffect = e.ctrlKey ? "copy" : "move";
    if (o.acceptDropCB(window._globalDDD, o.widget, e.ctrlKey, e.ctrlKey ? false : e.shiftKey, lyr, false)) {
        e.returnValue = false;
    }
    e.cancelBubble = true;
}

function TreeWidget_acceptDropCB(src, target, ctrl, shift, layer) {
    return target.acceptDropCB(src, target, ctrl, shift, layer);
}

function TreeWidget_leaveDropCB(src, target, ctrl, shift) {
    if (target.dropWidget && target.dropWidget.layer) {
        if (target.dropWidget.layer.className != target.dropWidget.nonselectedClass) {
            target.dropWidget.layer.className = target.dropWidget.nonselectedClass;
        }
    }
}

function TreeWidget_dropCB(src, target, ctrl, shift, layer, enter) {
    newTooltipWidget().show(false);
    target.dropCB(src, target, ctrl, shift);
}

function TreeWidget_setMultiSelection(multi) {
    if ((!this.multiSelection && multi) || (this.multiSelection && !multi)) {
        this.unselect();
    }
    this.multiSelection = multi;
}

function TreeWidget_getSelectedItems() {
    var arrSel = new Array;
    var len = this.selIds.length, id, cpt = 0;
    for (var i = 0; i < len; i++) {
        id = this.selIds[i];
        if (id >= 0) {
            arrSel[cpt] = _TreeWidgetElemInstances[id];
            cpt++;
        }
    }
    return arrSel;
}

function TreeWidget_getCheckedItems() {
    var arrChecked = new Array;
    var len = _TreeWidgetElemInstances.length, cpt = 0;
    for (var i = 0; i < len; i++) {
        elem = _TreeWidgetElemInstances[i];
        if (elem.isChecked()) {
            arrChecked[cpt] = elem;
            cpt++;
        }
    }
    return arrChecked;
}

function TreeWidget_setHighlightPath(hl) {
    this.hlPath = hl;
    if (!hl) {
        this.unhlPath();
    }
}

function TreeWidget_unhlPath() {
    var o = this, len = o.hlElems.length;
    var elem, de;
    if (len > 0) {
        for (var i = 0; i < len; i++) {
            elem = o.hlElems[i];
            elem.init();
            de = elem.domElem;
            if (de == null) {
                return;
            }
            if (elem.isSelected()) {
                de.className = elem.selectedClass;
            } else {
                de.className = elem.nonselectedClass;
            }
        }
        o.hlElems.length = 0;
    }
}

function TreeWidget_highlightPath(elemId) {
    var o = this;
    if (!o.hlPath) {
        return;
    }
    o.unhlPath();
    var elem = _TreeWidgetElemInstances[elemId];
    o.hlElems[o.hlElems.length] = elem;
    elem.domElem.className = elem.selectedClass;
    if (elem.elemPos == -1) {
        o.buildElems();
    }
    var papa = elem.par;
    while (papa) {
        papa.init();
        papa.domElem.className = papa.hlClass;
        o.hlElems[o.hlElems.length] = papa;
        papa = papa.par;
    }
    if (elem.isNode()) {
        hlVisibleChildren(elem, o.hlElems);
    }
}

function hlVisibleChildren(node, arr) {
    if (node.expanded && !node.isIncomplete) {
        var len = node.sub.length;
        for (var i = 0; i < len; i++) {
            var sub = node.sub[i];
            arr[arr.length] = sub;
            sub.init();
            sub.domElem.className = sub.hlClass;
            if (sub.isNode()) {
                hlVisibleChildren(sub, arr);
            }
        }
    }
}

function newTreeWidgetElem(iconId, name, userData, help, iconSelId, tooltip, iconAlt, textClass, textSelectedClass) {
    var o = new Object;
    o.elemPos = -1;
    if (window._TreeWidgetElemInstances == null) {
        window._TreeWidgetElemInstances = new Array;
    }
    o.expanded = false;
    o.generated = false;
    o.iconId = iconId;
    o.iconSelId = iconSelId ? iconSelId : iconId;
    o.tooltip = tooltip;
    o.customTooltip = false;
    o.iconAlt = iconAlt;
    o.isHTML = false;
    o.isCheck = false;
    o.checked = false;
    o.check = TreeWidgetElem_check;
    o.isChecked = TreeWidgetElem_isChecked;
    o.checkCB = null;
    o.name = name;
    o.par = null;
    o.userData = userData;
    o.sub = new Array;
    o.treeView = null;
    o.id = _TreeWidgetElemInstances.length;
    o.layer = null;
    o.plusLyr = null;
    o.icnLyr = null;
    o.checkElem = null;
    o.domElem = null;
    o.toggleLyr = null;
    o.blackTxt = (textClass) ? textClass : "treeNormal";
    o.grayTxt = "treeGray";
    o.selectedClass = (textSelectedClass) ? textSelectedClass : "treeSelected";
    o.nonselectedClass = o.blackTxt;
    o.feedbackDDClass = "treeFeedbackDD";
    o.hlClass = "treeHL";
    o.help = help;
    _TreeWidgetElemInstances[o.id] = o;
    o.getHTML = TreeWidgetElem_getHTML;
    o.init = TreeWidgetElem_init;
    o.add = TreeWidgetElem_add;
    o.select = TreeWidgetElem_select;
    o.unselect = TreeWidgetElem_unselect;
    o.getNextPrev = TreeWidgetElem_getNextPrev;
    o.getHiddenParent = TreeWidgetElem_getHiddenParent;
    o.nodeIndent = 0;
    o.getTooltip = TreeWidgetElem_getTooltip;
    o.getDragTooltip = TreeWidgetElem_getDragTooltip;
    o.change = TreeWidgetElem_change;
    o.deleteAll = TreeWidget_deleteAll;
    o.setGrayStyle = TreeWidgetElem_setGrayStyle;
    o.isGrayStyle = TreeWidgetElem_isGrayStyle;
    o.findByData = TreeWidgetElem_findByData;
    o.findById = TreeWidgetElem_findById;
    o.findInName = TreeWidgetElem_findInName;
    o.isIncomplete = false;
    o.querycompleteCB = null;
    o.setIncomplete = TreeWidgetElem_setIncomplete;
    o.finishComplete = TreeWidgetElem_finishComplete;
    o.setEditable = TreeWidgetElem_setEditable;
    o.showEditInput = TreeWidgetElem_showEditInput;
    o.isLeaf = TreeWidgetElem_isLeaf;
    o.isNode = TreeWidgetElem_isNode;
    o.isSelected = TreeWidgetElem_isSelected;
    o.htmlWritten = false;
    o.showCustomTooltipCB = null;
    o.hideCustomTooltipCB = null;
    return o;
}

function TreeWidgetElem_checkCB(elem, id) {
    var o = _TreeWidgetElemInstances[id];
    o.checked = elem.checked;
    if (o.checkCB) {
        o.checkCB(o, id);
    }
}

function TreeWidgetElem_isChecked() {
    var o = this;
    return (o.isCheck ? o.checked : false);
}

function TreeWidgetElem_check(checked) {
    var o = this;
    if (o.isCheck) {
        o.checked = checked;
        if (o.htmlWritten) {
            o.init();
            o.checkElem.checked = checked;
        }
    }
}

function TreeWidgetElem_EditNormalBehaviour(e) {
    eventCancelBubble(e);
    return true;
}

function TreeWidgetElem_EditBlurCB() {
    setTimeout("TreeWidgetElem_EditKeyCancel(" + this.widID + ")", 1);
}

_globTreeTxtvalue = "";

function TreeWidgetElem_EditKeyDown(e) {
    eventCancelBubble(e);
    var k = eventGetKey(e), o = _TreeWidgetElemInstances[this.widID];
    if (k == 27) {
        setTimeout("TreeWidgetElem_EditKeyCancel(" + this.widID + ")", 1);
    } else {
        if (k == 13) {
            _globTreeTxtvalue = this.value;
            setTimeout("TreeWidgetElem_EditKeyAccept(" + this.widID + ")", 1);
        }
    }
}

function TreeWidgetElem_EditKeyCancel(id) {
    var o = _TreeWidgetElemInstances[id];
    o.showEditInput(false);
}

function TreeWidgetElem_EditKeyAccept(id) {
    var o = _TreeWidgetElemInstances[id];
    if (o.validChangeNameCB) {
        if (o.validChangeNameCB(_globTreeTxtvalue) == false) {
            return;
        }
    }
    o.change(null, _globTreeTxtvalue);
    o.showEditInput(false);
    if (o.changeNameCB) {
        o.changeNameCB();
    }
}

_globTreeTxt = null;

function TreeWidgetElem_showEditInput(show) {
    var o = this;
    o.init();
    var lyr = o.domElem, css = lyr.style;
    if (show && (css.display != "none")) {
        var par = lyr.parentNode, w = lyr.offsetWidth, h = lyr.offsetHeight;
        css.display = "none";
        var tl = _globTreeTxt = _curDoc.createElement("INPUT");
        tl.type = "text";
        tl.className = "textinputs";
        tl.value = o.name;
        tl.ondragstart = TreeWidgetElem_EditNormalBehaviour;
        tl.onselectstart = TreeWidgetElem_EditNormalBehaviour;
        tl.onblur = TreeWidgetElem_EditBlurCB;
        tl.onkeydown = TreeWidgetElem_EditKeyDown;
        tl.widID = o.id;
        var tc = tl.style;
        tc.width = "" + (w + 20) + "px";
        par.appendChild(tl);
        tl.focus();
        tl.select();
    }
    if ((show != true) && (css.display == "none")) {
        var tl = _globTreeTxt;
        if (tl) {
            tl.parentNode.removeChild(tl);
            css.display = "";
            _globTreeTxt = null;
        }
    }
}

function TreeWidgetElem_setEditable(isEditable, changeNameCB, validChangeNameCB) {
    var o = this;
    if (isEditable) {
        o.changeNameCB = changeNameCB;
        o.validChangeNameCB = validChangeNameCB;
    }
    o.isEditable = isEditable;
}

function TreeWidgetElem_triggerDD() {
    var o = _treeWClickedW, e = _curWin.event;
    if (o && (o.clicked) && (e.button == _leftBtn)) {
        if (o.initialX != null) {
            var x = eventGetX(e), y = eventGetY(e), threshold = 3;
            if ((x < (o.initialX - threshold)) || (x > (o.initialX + threshold)) || (y < (o.initialY - threshold)) || (y > (o.initialY + threshold))) {
                this.dragDrop();
                o.clicked = false;
            }
        }
    }
}

function TreeWidgetElem_mouseUp() {
    var o = _treeWClickedW, ev = _curWin.event;
    o.select(null, ev);
    o.domElem.onmouseup = null;
}

function TreeWidgetElem_init() {
    var o = this;
    if (o.layer == null) {
        var sub = o.sub, len = sub.length, exp = (len > 0) || o.isIncomplete;
        o.layer = getLayer(_codeWinName + "TWe_" + o.id);
        if (o.layer == null) {
            return;
        }
        var cNodes = o.layer.childNodes, cLen = cNodes.length;
        o.plusLyr = exp ? cNodes[0].childNodes[1] : null;
        o.icnLyr = (o.iconId > -1) ? cNodes[exp ? 1 : 0] : null;
        o.checkElem = o.isCheck ? cNodes[cLen - 2] : null;
        o.domElem = cNodes[cLen - 1];
        o.toggleLyr = getLayer(_codeWinName + "trTog" + o.id);
        if (o.treeView.mouseOverTooltip || o.treeView.mouseOverCB) {
            o.domElem.onmouseout = TreeFuncMouseout;
        }
        if (exp) {
            addDblClickCB(o.plusLyr, _tpdb);
        }
        if (exp && o.generated) {
            for (var i in sub) {
                sub[i].init();
            }
        }
        addDblClickCB(o.domElem, _tpdb);
    }
}

function TreeIdToIdx(l) {
    if (l) {
        var id = l.id;
        if (id) {
            var idx = id.lastIndexOf("TWe_");
            if (idx >= 0) {
                return parseInt(id.slice(idx + 4));
            } else {
                return -1;
            }
        } else {
            return TreeIdToIdx(l.parentNode);
        }
    }
    return -1;
}

function TreeFuncMouseout(e) {
    _tmoc(this, TreeIdToIdx(this), false, e);
}

function _tmvc(l, ev) {
    _tmoc(l, TreeIdToIdx(l), true, ev);
}

function _tpl(l, event) {
    TreeWidget_clickCB(TreeIdToIdx(l), true, event, true);
    return false;
}

function _tkl(l, event) {
    var k = eventGetKey(event);
    if (k == 13) {
        return _tpl(l, event);
    }
}

function _tkt(l, event) {
    var k = eventGetKey(event);
    if (k == 13) {
        return _tpt(l, event);
    }
}

function _tpt(l, event) {
    TreeWidget_clickCB(TreeIdToIdx(l), false, event, true);
    return false;
}

function _tpdb(e) {
    treeDblClickCB(TreeIdToIdx(this), _ie ? event : e);
    return false;
}

function _tfcc(l, e) {
    treeFCCB(l, TreeIdToIdx(l), true, e);
    l.onblur = _tblc;
}

function _tblc(e) {
    treeFCCB(this, TreeIdToIdx(this), false, e);
}

function TreeWidgetElem_getHTML(indent, isFirst) {
    var s = "";
    with (this) {
        htmlWritten = true, isRoot = (par == null);
        var len = sub.length, exp = (len > 0) || isIncomplete, a = new Array, i = 0;
        if (this.extraIndent) {
            indent += _trIndent * extraIndent;
        }
        var keyCB = 'onkeydown=" return ' + _codeWinName + '._tkt(this,event)" ';
        var mouseCB = 'onfocus="' + _codeWinName + '._tfcc(this,event)" onclick="return ' + _codeWinName + '._tpt(this,event)" ';
        if (treeView.mouseOverTooltip || treeView.mouseOverCB) {
            mouseCB += 'onmouseover="' + _codeWinName + '._tmvc(this,event)" ';
        }
        var contextMenu = "";
        if (treeView.rightClickMenuCB != null) {
            contextMenu = ' oncontextmenu="' + _codeWinName + ".treeContextMenuCB('" + id + "', event);return false\" ";
        }
        var acceptDD = "";
        if ((treeView.acceptDropCB != null) && (_ie)) {
            acceptDD = ' ondragenter="' + _codeWinName + ".TreeWidget_dragOverEnterCB(this,'" + id + "');\" ";
            acceptDD += ' ondragover="' + _codeWinName + ".TreeWidget_dragOverEnterCB(this,'" + id + "');\" ";
        }
        a[i++] = '<div id="' + _codeWinName + "TWe_" + id + '"' + contextMenu + " class=trElt>";
        var onkeydown = 'onkeydown="return ' + _codeWinName + '._tkl(this,event)" ';
        var onclick = 'onclick="return ' + _codeWinName + '._tpl(this,event)" ';
        if (exp) {
            var expIcon;
            var iconTooltip;
            if (expanded) {
                if (treeView.minIcon != null) {
                    expIcon = treeView.minIcon;
                } else {
                    expIcon = _skin + "../min.gif";
                }
                iconTooltip = _collapseNode.replace("%1", name);
            } else {
                if (treeView.plusIcon != null) {
                    expIcon = treeView.plusIcon;
                } else {
                    expIcon = _skin + "../plus.gif";
                }
                iconTooltip = _expandNode.replace("%1", name);
            }
            a[i++] = "<a tabindex=1 " + onclick + " " + onkeydown + ' href="javascript:doNothing();"><span style="display:none">' + iconTooltip + '</span><img class=trPlus src="' + expIcon + '"/></a>';
        }
        if (iconId > -1) {
            a[i++] = "<img tabindex=1 " + mouseCB + " " + keyCB + "class=trIcn" + (exp || isRoot ? "Plus" : "") + " " + attr("src", _skin + "../transp.gif") + attr("alt", iconAlt) + ' align=top style="' + backImgOffset(treeView.icns, (treeView.iconOrientVertical ? 0 : treeView.iconW * (expanded ? iconSelId : iconId)), (treeView.iconOrientVertical ? treeView.iconH * (expanded ? iconSelId : iconId) : 0)) + '" >';
        } else {
            if (!exp && !isRoot) {
                a[i++] = "<img tabindex=1 class=trSep " + attr("src", _skin + "../transp.gif") + ">";
            }
        }
        if (isCheck) {
            a[i++] = '<input type=checkbox style="margin:0px;" onclick="' + _codeWinName + ".TreeWidgetElem_checkCB(this,'" + id + "')\"" + (this.checked ? " checked" : "") + ">";
        }
        a[i++] = '<a href="javascript:doNothing();" ' + mouseCB + " " + keyCB + " tabindex=1 " + acceptDD + " class=" + nonselectedClass + ">";
        a[i++] = (isHTML ? name : convStr(name));
        a[i++] = "</a>";
        a[i++] = "</div>";
        if (exp) {
            a[i++] = '<div id="' + _codeWinName + "trTog" + id + '" style="margin-left:18px;display:' + (expanded ? "" : "none") + '">';
        }
        if (expanded) {
            generated = true;
            for (var j = 0; j < len; j++) {
                a[i++] = sub[j].getHTML(0, j == 0);
            }
        }
        if (exp) {
            nodeIndent = indent;
            a[i++] = "</div>";
        }
    }
    return a.join("");
}

function TreeWidgetElem_setGrayStyle(isGray) {
    var o = this, cls = isGray ? o.grayTxt : o.blackTxt;
    if (cls != o.nonselectedClass) {
        o.nonselectedClass = cls;
        o.init();
        if (o.domElem && (o.domElem.className != o.selectedClass)) {
            o.domElem.className = cls;
        }
    }
}

function TreeWidgetElem_isGrayStyle() {
    return this.nonselectedClass == this.grayTxt;
}

function TreeWidgetElem_setIncomplete(querycompleteCB) {
    this.isIncomplete = true;
    this.querycompleteCB = querycompleteCB;
}

function TreeWidgetElem_finishComplete() {
    this.isIncomplete = false;
    TreeWidget_toggleCB(this.id);
    this.treeView.buildElems();
}

function TreeWidgetElem_findByData(data) {
    var o = this;
    if (o.userData == data) {
        return o;
    }
    var sub = o.sub;
    for (var i in sub) {
        var item = sub[i].findByData(data);
        if (item != null) {
            return item;
        }
    }
    return null;
}

function TreeWidgetElem_findInName(text, matchCase, matchWholeW, next, starWith) {
    var o = this, name = o.name;
    if (text == "" || text == null) {
        return;
    }
    if (!matchCase || (matchCase == null)) {
        name = name.toLowerCase();
        text = text.toLowerCase();
    }
    if (matchWholeW) {
        var arrWords = name.split(" ");
        for (var i = 0; i < arrWords.length; i++) {
            if (arrWords[i] == text) {
                return o;
            }
        }
    } else {
        var idx = name.indexOf(text);
        if (starWith == true) {
            if (idx == 0) {
                return o;
            }
        } else {
            if (idx > -1) {
                return o;
            }
        }
    }
    return null;
}

function TreeWidgetElem_findById(id) {
    var o = this;
    if (o.id == id) {
        return o;
    }
    var sub = o.sub;
    for (var i in sub) {
        var item = sub[i].findById(id);
        if (item != null) {
            return item;
        }
    }
    return null;
}

function TreeWidgetElem_change(iconId, name, userData, help, iconSelId, tooltip) {
    var o = this, treeView = o.treeView;
    if (iconId != null) {
        o.iconId = iconId;
    }
    if (name != null) {
        o.name = name;
    }
    o.userData = userData;
    if (help != null) {
        o.help = help;
    }
    o.iconSelId = (iconSelId != null) ? iconSelId : o.iconId;
    if (tooltip != null) {
        o.tooltip = tooltip;
    }
    o.init();
    if (o.domElem) {
        o.domElem.innerHTML = convStr(o.name);
    }
    if (o.icnLyr) {
        if (o.icnLyr.childNodes.length > 0) {
            var iconL = o.icnLyr.childNodes[o.sub.length > 0 ? 1 : 0];
            changeOffset(iconL, treeView.iconOrientVertical ? 0 : o.treeView.iconW * (o.expanded ? o.iconSelId : o.iconId), treeView.iconOrientVertical ? o.treeView.iconH * (o.expanded ? o.iconSelId : o.iconId) : 0);
        }
    }
}

function treeInitDropFunc(lyr, elemId) {
    var e = _TreeWidgetElemInstances[elemId];
    if (lyr.ondrop == null) {
        e.treeView.dragDrop.attachCallbacks(lyr, true);
        lyr.domEltID = elemId;
    }
}

function TreeWidget_toggleCB(elemId, noTimeOut) {
    var elem = _TreeWidgetElemInstances[elemId];
    if (elem.sub.length == 0) {
        elem.plusLyr.style.visibility = "hidden";
        return;
    }
    elem.expanded = !elem.expanded;
    elem.init();
    if (noTimeOut) {
        dispIcn(elemId);
    } else {
        setTimeout(elem.treeView.dispIcnFuncName + "(" + elemId + ")", 1);
    }
    var tree = elem.treeView;
    if (elem.expanded && tree.expandCB) {
        tree.expandCB(elem.userData);
    }
    if (!elem.expanded && tree.collapseCB) {
        tree.collapseCB(elem.userData);
    }
}

function dispIcn(eId) {
    var e = _TreeWidgetElemInstances[eId];
    with (e) {
        if (expanded && !generated) {
            generated = true;
            var a = new Array, i = 0, len = sub.length, newInd = nodeIndent + _trIndent;
            for (var j = 0; j < len; j++) {
                a[i++] = sub[j].getHTML(newInd, j == 0);
            }
            toggleLyr.innerHTML = a.join("");
        }
        toggleLyr.style.display = expanded ? "block" : "none";
        if (expanded) {
            if (treeView.minIcon != null) {
                plusLyr.src = treeView.minIcon;
            } else {
                plusLyr.src = _skin + "../min.gif";
            }
        } else {
            if (treeView.plusIcon != null) {
                plusLyr.src = treeView.plusIcon;
            } else {
                plusLyr.src = _skin + "../plus.gif";
            }
        }
        plusLyr.title = expanded ? _expandedLab : _collapsedLab;
        if (icnLyr && icnLyr.childNodes && icnLyr.childNodes.length > 1) {
            var iconL = icnLyr.childNodes[1];
            changeOffset(iconL, treeView.iconOrientVertical ? 0 : treeView.iconW * (expanded ? iconSelId : iconId), treeView.iconOrientVertical ? treeView.iconH * (expanded ? iconSelId : iconId) : 0);
        }
    }
}

function TreeWidgetElem_add(elem) {
    with (this) {
        elem.treeView = treeView;
        elem.par = this;
        sub[sub.length] = elem;
    }
    return elem;
}

function TreeWidgetElem_getHiddenParent() {
    var par = this.par;
    if (par == null) {
        return null;
    }
    if (!par.expanded) {
        return par;
    }
    return;
    par.getHiddenParent();
}

function TreeWidgetElem_getNextPrev(delta) {
    with (this) {
        if (elemPos == -1) {
            treeView.buildElems();
        }
        var newPos = elemPos + delta;
        if ((newPos >= 0) && (newPos < treeView.elems.length)) {
            var ret = treeView.elems[newPos];
            var hidden = ret.getHiddenParent();
            if (hidden != null) {
                return ret.getNextPrev(delta);
            } else {
                return ret;
            }
        } else {
            return null;
        }
    }
}

function TreeWidgetElem_scroll(elemLyr, treeLyr) {
    var scrollH = Math.max(0, treeLyr.offsetHeight - 20), scrollY = treeLyr.scrollTop;
    var elPos = getPos(elemLyr, treeLyr);
    var y = elPos.offsetTop, h = elemLyr.offsetHeight;
    if ((y - scrollY + h) > scrollH) {
        treeLyr.scrollTop = y + h - scrollH;
    }
    if ((y - scrollY) < 0) {
        treeLyr.scrollTop = y;
    }
}

function TreeWidgetElem_unselect() {
    var o = this;
    with (o) {
        init();
        if (domElem) {
            domElem.className = o.nonselectedClass;
        }
        treeView.selId = -1;
        if (treeView.multiSelection) {
            var idx = arrayFind(treeView, "selIds", id);
            if (idx > -1) {
                arrayRemove(treeView, "selIds", idx);
                treeView.layer._BOselIds = "";
                var len = treeView.selIds.length;
                for (var i = 0; i < len; i++) {
                    if (treeView.layer._BOselIds == "") {
                        treeView.layer._BOselIds = "" + treeView.selIds[i];
                    } else {
                        treeView.layer._BOselIds += ";" + treeView.selIds[i];
                    }
                }
            }
        }
    }
}

function TreeWidgetElem_select(setFocus, ev, noSendClickCB, isFromKeybArrow) {
    var coll = new Array;
    var par = this.par;
    while (par) {
        if (!par.expanded) {
            coll[coll.length] = par;
        }
        par = par.par;
    }
    var cLen = coll.length;
    for (var i = cLen - 1; i >= 0; i--) {
        TreeWidget_toggleCB(coll[i].id, true);
    }
    if (cLen > 0) {
        this.select(setFocus, ev, noSendClickCB, isFromKeybArrow);
    }
    if (this.treeView.multiSelection) {
        TreeWidgetElem_multiSelect(this, setFocus, ev, noSendClickCB, isFromKeybArrow);
        return;
    }
    if (noSendClickCB == null) {
        noSendClickCB = false;
    }
    with (this) {
        if (treeView.selId != id) {
            if (treeView.selId >= 0) {
                var prev = _TreeWidgetElemInstances[treeView.selId];
                prev.init();
                if (prev.domElem) {
                    prev.domElem.className = prev.nonselectedClass;
                }
            }
            treeView.selId = id;
            init();
            treeView.layer._BOselId = id;
            var de = domElem;
            if (de == null) {
                return;
            }
            if (treeView.hlPath) {
                treeView.highlightPath(id);
            } else {
                de.className = selectedClass;
            }
            if (setFocus) {
                safeSetFocus(de);
            }
            TreeWidgetElem_scroll(de, treeView.layer);
        }
        if ((treeView.clickCB) && (!noSendClickCB)) {
            treeView.clickCB(userData, isFromKeybArrow != null ? isFromKeybArrow : false);
        }
    }
}

_startShift = null;

function TreeWidgetElem_multiSelect(o, setFocus, ev, noSendClickCB, isFromKeybArrow) {
    if (noSendClickCB == null) {
        noSendClickCB = false;
    }
    with (o) {
        init();
        var de = domElem;
        if (de == null) {
            return;
        }
        if (treeView.hlPath) {
            treeView.unhlPath();
        }
        if (ev == null) {
            var idx = arrayFind(treeView, "selIds", id);
            if (idx == -1) {
                treeView.selIds[treeView.selIds.length] = id;
                if (treeView.layer._BOselIds == "") {
                    treeView.layer._BOselIds = "" + id;
                } else {
                    treeView.layer._BOselIds += ";" + id;
                }
                de.className = selectedClass;
            }
            _startShift = null;
        } else {
            var idx = arrayFind(treeView, "selIds", id);
            var ctrl = _ie ? _curWin.event.ctrlKey : ev.ctrlKey;
            var shift = _ie ? _curWin.event.shiftKey : ev.shiftKey;
            var typeEvt = _ie ? _curWin.event.type : ev.type;
            if (ctrl && !shift) {
                if (idx == -1) {
                    treeView.selIds[treeView.selIds.length] = id;
                    if (treeView.layer._BOselIds == "") {
                        treeView.layer._BOselIds = "" + id;
                    } else {
                        treeView.layer._BOselIds += ";" + id;
                    }
                    de.className = selectedClass;
                } else {
                    unselect();
                }
                _startShift = o;
            }
            if (shift) {
                var lastSelId = -1, lastSel = null;
                if (treeView.selIds.length > 0) {
                    lastSelId = treeView.selIds[treeView.selIds.length - 1];
                    lastSel = _TreeWidgetElemInstances[lastSelId];
                    if (_startShift == null) {
                        _startShift = lastSel;
                    }
                    if (!ctrl) {
                        treeView.unselect();
                    }
                    TreeWidgetElem_multiSelectShift(_startShift.id, id);
                } else {
                    treeView.unselect();
                    treeView.selIds[0] = id;
                    treeView.layer._BOselIds = "" + id;
                    if (treeView.hlPath) {
                        treeView.highlightPath(id);
                    } else {
                        de.className = selectedClass;
                    }
                    _startShift = null;
                }
            }
            if (!ctrl && !shift) {
                var idx = arrayFind(treeView, "selIds", id);
                if (_ie && typeEvt == "mousedown" && idx > -1) {
                    window._treeWClickedW = o;
                    de.onmouseup = TreeWidgetElem_mouseUp;
                } else {
                    treeView.unselect();
                    treeView.selIds[0] = id;
                    treeView.layer._BOselIds = "" + id;
                    if (treeView.hlPath) {
                        treeView.highlightPath(id);
                    } else {
                        de.className = selectedClass;
                    }
                    _startShift = null;
                }
            }
        }
        if (setFocus) {
            safeSetFocus(de);
        }
        TreeWidgetElem_scroll(de, treeView.layer);
        if ((treeView.clickCB) && (!noSendClickCB)) {
            treeView.clickCB(userData, isFromKeybArrow != null ? isFromKeybArrow : false);
        }
    }
}

function TreeWidgetElem_multiSelectCtrl() {
}

function TreeWidgetElem_multiSelectShift(id1, id2) {
    var elem1 = _TreeWidgetElemInstances[id1];
    var elem2 = _TreeWidgetElemInstances[id2];
    var treeView = elem1 ? elem1.treeView : null;
    if (treeView == null) {
        return;
    }
    if (elem1.elemPos == -1 || elem2.elemPos == -1) {
        treeView.buildElems();
    }
    var startPos = (elem1.elemPos < elem2.elemPos) ? elem1.elemPos : elem2.elemPos;
    var endPos = (elem1.elemPos > elem2.elemPos) ? elem1.elemPos : elem2.elemPos;
    if ((startPos >= 0) && (endPos < treeView.elems.length)) {
        for (var j = startPos; j <= endPos; j++) {
            var elem = treeView.elems[j];
            var hidden = elem.getHiddenParent();
            if ((hidden == null) && (arrayFind(treeView, "selIds", elem.id) == -1)) {
                treeView.selIds[treeView.selIds.length] = elem.id;
                if (treeView.layer._BOselIds == "") {
                    treeView.layer._BOselIds = "" + elem.id;
                } else {
                    treeView.layer._BOselIds += ";" + elem.id;
                }
                elem.init();
                if (elem.domElem) {
                    elem.domElem.className = elem.selectedClass;
                }
            }
        }
    }
}

function TreeWidget_clickCB(elemId, isIcon, ev, isDown) {
    eventCancelBubble(ev);
    var e = _TreeWidgetElemInstances[elemId];
    if (e == null) {
        return;
    }
    e.init();
    if (isIcon && (e.sub.length > 0)) {
        TreeWidget_toggleCB(elemId);
    } else {
        if (isIcon && e.isIncomplete && e.querycompleteCB) {
            e.querycompleteCB();
        } else {
            e.select(null, ev);
        }
    }
    if (_curDoc.onmousedown) {
        _curDoc.onmousedown(ev);
    }
    if (isDown && _ie) {
        window._treeWClickedW = e;
        e.init();
        e.clicked = true;
        e.initialX = eventGetX(ev);
        e.initialY = eventGetY(ev);
        if (_ie && e.domElem) {
            e.domElem.onmousemove = TreeWidgetElem_triggerDD;
        }
    }
    if (_moz && e.domElem) {
        setTimeout("_TreeWidgetElemInstances[" + elemId + "].domElem.focus()", 1);
    }
    return false;
}

function treeDblClickCB(elemId, ev) {
    eventCancelBubble(ev);
    var e = _TreeWidgetElemInstances[elemId], treeView = e.treeView;
    if (e.sub.length > 0) {
        TreeWidget_toggleCB(elemId);
    } else {
        if (e.isIncomplete && e.querycompleteCB) {
            e.querycompleteCB();
            return;
        }
    }
    if (e.isEditable) {
        e.showEditInput(true);
    } else {
        if (treeView.doubleClickCB) {
            treeView.doubleClickCB(e.userData);
        }
    }
}

function TreeWidgetElem_UpdateTooltip(newId, forceSelect) {
    var elem = _TreeWidgetElemInstances[newId];
    if (elem) {
        elem.init();
        if (elem.domElem != null) {
            elem.domElem.title = elem.getTooltip(forceSelect);
        }
    }
}

function TreeWidgetElem_getDragTooltip() {
    var o = this;
    if (o.obj && o.obj.getDragTooltip) {
        return o.obj.getDragTooltip();
    }
    return o.name;
}

function TreeWidgetElem_getTooltip(forceSelect) {
    var tooltip = "", o = this;
    var itemSelected = false;
    if (o.treeView.multiSelection) {
        itemSelected = (arrayFind(o.treeView, "selIds", o.id) > -1);
    } else {
        itemSelected = (o.treeView.selId == o.id);
    }
    if (forceSelect || itemSelected) {
        tooltip = _selectedLab + " ";
    }
    tooltip += o.name;
    if ((o.sub.length > 0) || (o.isIncomplete)) {
        if (o.expanded) {
            tooltip += " " + _expandedLab + " ";
        } else {
            tooltip += " " + _collapsedLab + " ";
        }
    }
    if (o.advTooltip) {
        tooltip += " (" + o.advTooltip + ")";
    }
    return tooltip;
}

function treeFCCB(e, elemId, focus, ev) {
    var elem = _TreeWidgetElemInstances[elemId];
    if ((elem == null) || elem.treeView.mouseOverTooltip) {
        return;
    }
    if (focus) {
        if (elem.customTooltip && elem.showCustomTooltipCB) {
            elem.showCustomTooltipCB(elem.userData, ev);
            elem.init();
        } else {
            e.title = elem.getTooltip();
        }
    } else {
        if (elem.customTooltip && elem.hideCustomTooltipCB) {
            elem.hideCustomTooltipCB();
        } else {
            e.title = "";
        }
    }
}

function _tmoc(e, elemId, over, ev) {
    e.style.cursor = _hand;
    var elem = _TreeWidgetElemInstances[elemId];
    if (elem == null) {
        return;
    }
    if (elem.treeView.mouseOverTooltip) {
        if (over) {
            if (elem.customTooltip && elem.showCustomTooltipCB) {
                elem.showCustomTooltipCB(elem.userData, ev);
                elem.init();
            } else {
                e.title = elem.tooltip ? elem.tooltip : "";
            }
        } else {
            if (elem.customTooltip && elem.hideCustomTooltipCB) {
                elem.hideCustomTooltipCB();
            } else {
                e.title = "";
            }
        }
    }
    if (elem.treeView.mouseOverCB) {
        elem.treeView.mouseOverCB(elem);
    }
}

function treeContextMenuCB(elemId, ev) {
    var elem = _TreeWidgetElemInstances[elemId];
    if (elem) {
        elem.treeView.rightClickMenuCB(elemId, _ie ? _curWin.event : ev);
    }
}

function TreeWidgetElem_isLeaf() {
    return (this.sub.length == 0 && !this.isIncomplete);
}

function TreeWidgetElem_isNode() {
    return (!this.isLeaf());
}

function TreeWidgetElem_isSelected() {
    var o = this;
    if (o.treeView.multi) {
        var idx = arrayFind(o.treeView, "selIds", o.id);
        return (idx >= 0);
    } else {
        return (o.id == o.treeView.selId);
    }
}

DialogBoxWidget_modals = new Array;
DialogBoxWidget_instances = new Array;
DialogBoxWidget_current = null;
_promptDlgInfo = 0;
_promptDlgWarning = 1;
_promptDlgCritical = 2;

function newDialogBoxWidget(id, title, width, height, defaultCB, cancelCB, noCloseButton) {
    var o = newWidget(id);
    o.title = title;
    o.width = width;
    o.height = height;
    o.defaultCB = defaultCB;
    o.cancelCB = cancelCB;
    o.noCloseButton = noCloseButton ? noCloseButton : false;
    o.resizeable = false;
    o.oldMouseDown = null;
    o.oldCurrent = null;
    o.modal = null;
    o.hiddenVis = new Array;
    o.lastLink = null;
    o.firstLink = null;
    o.titleLayer = null;
    o.defaultBtn = null;
    o.divLayer = null;
    o.oldInit = o.init;
    o.oldShow = o.show;
    o.init = DialogBoxWidget_init;
    o.setResize = DialogBoxWidget_setResize;
    o.beginHTML = DialogBoxWidget_beginHTML;
    o.endHTML = DialogBoxWidget_endHTML;
    o.show = DialogBoxWidget_Show;
    o.center = DialogBoxWidget_center;
    o.focus = DialogBoxWidget_focus;
    o.setTitle = DialogBoxWidget_setTitle;
    o.getContainerWidth = DialogBoxWidget_getContainerWidth;
    o.getContainerHeight = DialogBoxWidget_getContainerHeight;
    DialogBoxWidget_instances[id] = o;
    o.modal = newWidget("modal_" + id);
    o.placeIframe = DialogBoxWidget_placeIframe;
    o.oldResize = o.resize;
    o.resize = DialogBoxWidget_resize;
    o.attachDefaultButton = DialogBoxWidget_attachDefaultButton;
    o.unload = DialogBoxWidget_unload;
    if (!_ie) {
        if (o.width != null) {
            o.width = Math.max(0, width + 4);
        }
        if (o.height != null) {
            o.height = Math.max(0, height + 4);
        }
    }
    return o;
}

function DialogBoxWidget_setResize(resizeCB, minWidth, minHeight, noResizeW, noResizeH) {
    var o = this;
    o.resizeable = true;
    o.resizeCB = resizeCB;
    o.minWidth = minWidth ? minWidth : 50;
    o.minHeight = minHeight ? minHeight : 50;
    o.noResizeW = noResizeW;
    o.noResizeH = noResizeH;
}

function DialogBoxWidget_setTitle(title) {
    var o = this;
    o.title = title;
    if (o.titleLayer == null) {
        o.titleLayer = getLayer("titledialog_" + this.id);
    }
    o.titleLayer.innerHTML = convStr(title);
}

function DialogBoxWidget_setCloseIcon(lyr, isActive) {
    changeOffset(lyr, 0, (isActive == 1 ? 0 : 18));
}

function DialogBoxWidget_beginHTML() {
    with (this) {
        var moveableCb = ' onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + ".DialogBoxWidget_down(event,'" + id + "',this,false);return false;\" ";
        var mdl = '<div onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0" src="' + _skin + '../transp.gif" id="modal_' + id + '" style="position:absolute;top:0px;left:0px;width:1px;height:1px">' + (_ie ? img(_skin + "../transp.gif", "100%", "100%", null) : "") + "</div>";
        var titleBG = "background-image:url(" + _skin + "dialogtitle.gif)";
        return mdl + '<a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="firstLink_' + this.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".DialogBoxWidget_keepFocus('" + this.id + "');return false;\" ></a>" + '<table dir="ltr" border="0" cellspacing="0" cellpadding="2" id="' + id + '" style="display:none;padding:0px;visibility:' + _hide + ";position:absolute;" + sty("width", width ? ("" + width + "px") : null) + sty("height", height ? ("" + height + "px") : null) + '"><tr><td id="td_dialog_' + id + '" onresize="' + _codeWinName + ".DialogBoxWidget_resizeIframeCB('" + id + '\',this)" class="dialogbox" valign="top">' + '<table width="100%" style="margin-bottom:4px" border="0" cellspacing="0" cellpadding="0"><tr valign="top">' + "<td " + moveableCb + ' style="cursor:move;' + titleBG + '" class="titlezone">' + getSpace(5, 18) + "</td>" + "<td " + moveableCb + ' style="cursor:move;' + titleBG + '" class="titlezone" width="100%" valign="middle" align="left"><nobr><span id="titledialog_' + id + '" tabIndex="0" class="titlezone">' + convStr(title) + "</span></nobr></td>" + '<td class="titlezone" style="' + titleBG + '">' + (noCloseButton ? "" : '<a href="javascript:void(0)" onclick="' + _codeWinName + ".DialogBoxWidget_close('" + id + '\');return false;" title="' + _closeDialog + '">' + imgOffset(_skin + "dialogelements.gif", 18, 18, 0, 18, "dialogClose_" + this.id, 'onmouseover="' + _codeWinName + '.DialogBoxWidget_setCloseIcon(this,1)" onmouseout="' + _codeWinName + '.DialogBoxWidget_setCloseIcon(this,0)" ', _closeDialog, "cursor:" + _hand) + "</a>") + "</td>" + '</tr></table><div id="div_dialog_' + id + '">';
    }
}

function DialogBoxWidget_endHTML() {
    return '</div></td></tr></table><a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="lastLink_' + this.id + '" href="javascript:void(0)" onfocus="' + _codeWinName + ".DialogBoxWidget_keepFocus('" + this.id + "');return false;\" ></a>";
}

function DialogBoxWidget_getContainerWidth() {
    var o = this;
    return o.width - (2 + 2);
}

function DialogBoxWidget_getContainerHeight() {
    var o = this;
    return o.height - (2 + 18 + 2 + 2 + 2);
}

function DialogBoxWidget_close(id) {
    var o = DialogBoxWidget_instances[id];
    if (o) {
        o.show(false);
        if (o.cancelCB != null) {
            o.cancelCB();
        }
    }
}

function DialogBoxWidget_resizeIframeCB(id, lyr) {
    DialogBoxWidget_instances[id].placeIframe();
}

function DialogBoxWidget_placeIframe() {
    var o = this;
    if (o.iframe) {
        var lyr = o.td_lyr;
        if (lyr == null) {
            o.td_lyr = lyr = getLayer("td_dialog_" + o.id);
        }
        o.iframe.resize(lyr.offsetWidth, lyr.offsetHeight);
        o.iframe.move(o.layer.offsetLeft, o.layer.offsetTop);
    }
}

function DialogBoxWidget_resize(w, h) {
    var o = this;
    o.oldResize(w, h);
    if (o.iframe) {
        o.iframe.resize(w, h);
    }
}

function DialogBoxWidget_init() {
    if (this.layer != null) {
        return;
    }
    var o = this;
    o.oldInit();
    o.modal.init();
    o.lastLink = newWidget("lastLink_" + o.id);
    o.firstLink = newWidget("firstLink_" + o.id);
    o.lastLink.init();
    o.firstLink.init();
    if (!o.noCloseButton) {
        o.closeButton = getLayer("dialogClose_" + o.id);
        DialogBoxWidget_setCloseIcon(o.closeButton, false);
    }
}

function DialogBoxWidget_attachDefaultButton(btn) {
    this.defaultBtn = btn;
    this.defaultBtn.setDefaultButton();
}

_theLYR = null;
_dlgResize = null;

function DialogBoxWidget_down(e, id, obj, isResize) {
    _dlgResize = isResize;
    var o = DialogBoxWidget_instances[id], lyr = o.layer, mod = o.modal.layer;
    lyr.onmousemove = mod.onmousemove = eval("_curWin." + _codeWinName + ".DialogBoxWidget_move");
    lyr.onmouseup = mod.onmouseup = eval("_curWin." + _codeWinName + ".DialogBoxWidget_up");
    lyr.dlgStartPosx = mod.dlgStartPosx = parseInt(lyr.style.left);
    lyr.dlgStartPosy = mod.dlgStartPosy = parseInt(lyr.style.top);
    lyr.dlgStartx = mod.dlgStartx = eventGetX(e);
    lyr.dlgStarty = mod.dlgStarty = eventGetY(e);
    lyr.dlgStartw = mod.dlgStartw = o.getWidth();
    lyr.dlgStarth = mod.dlgStarth = o.getHeight();
    lyr._widget = mod._widget = o.widx;
    _theLYR = lyr;
    eventCancelBubble(e);
    if (lyr.setCapture) {
        lyr.setCapture(true);
    }
}

function DialogBoxWidget_move(e) {
    var o = _theLYR, dlg = getWidget(o);
    if (_dlgResize) {
        var newW = Math.max(dlg.minWidth, o.dlgStartw + eventGetX(e) - o.dlgStartx);
        var newH = Math.max(dlg.minHeight, o.dlgStarth + eventGetY(e) - o.dlgStarty);
        dlg.resize(dlg.noResizeW ? null : newW, dlg.noResizeH ? null : newH);
        if (dlg.firstTR) {
            if (!dlg.noResizeW) {
                dlg.firstTR.style.width = newW - 4;
            }
            if (!dlg.noResizeH) {
                dlg.secondTR.style.height = newH - 44;
            }
        }
        if (dlg.resizeCB) {
            dlg.resizeCB(newW, newH);
        }
    } else {
        var x = Math.max(0, o.dlgStartPosx - o.dlgStartx + eventGetX(e));
        var y = Math.max(0, o.dlgStartPosy - o.dlgStarty + eventGetY(e));
        dlg.iframe.move(x, y);
        dlg.move(x, y);
    }
    eventCancelBubble(e);
    return false;
}

function DialogBoxWidget_up(e) {
    var o = getWidget(_theLYR), lyr = o.layer, mod = o.modal.layer;
    lyr.onmousemove = mod.onmousemove = null;
    lyr.onmouseup = mod.onmouseup = null;
    if (lyr.releaseCapture) {
        lyr.releaseCapture();
    }
    _theLYR = null;
}

function DialogBoxWidget_keypress(e) {
    eventCancelBubble(e);
    var dlg = DialogBoxWidget_current;
    if (dlg != null) {
        switch (eventGetKey(e)) {
            case 13:
                if (dlg.yes && !dlg.no) {
                    if (dlg.defaultCB) {
                        dlg.defaultCB();
                    }
                    return false;
                }
                if (isTextArea(_ie ? _curWin.event : e)) {
                    return true;
                }
                if (dlg.defaultBtn != null && !dlg.defaultBtn.isDisabled()) {
                    dlg.defaultBtn.executeCB();
                    return false;
                }
                break;
            case 27:
                dlg.show(false);
                hideBlockWhileWaitWidget();
                if (dlg.cancelCB != null) {
                    dlg.cancelCB();
                }
                return false;
                break;
            case 8:
                return isTextInput(_ie ? _curWin.event : e);
                break;
        }
    }
}

function DialogBoxWidgetResizeModals(e) {
    for (var i in DialogBoxWidget_modals) {
        m_sty = DialogBoxWidget_modals[i];
        m_sty.width = documentWidth() + "px";
        m_sty.height = documentHeight() + "px";
    }
}

function DialogBoxWidget_center() {
    var o = this;
    var defaults = {modalDisplay: o.modal.css.display, layerDisplay: o.css.display};
    o.modal.css.display = "none";
    o.css.display = "none";
    var scrY = getScrollY(), scrX = getScrollX();
    o.modal.css.display = defaults.modalDisplay;
    o.css.display = "block";
    var height = o.layer.offsetHeight, width = o.layer.offsetWidth;
    o.css.display = defaults.layerDisplay;
    var yOffset = (winHeight() - height) / 2;
    yOffset = (yOffset < 0) ? 0 : yOffset;
    var xOffset = (winWidth() - width) / 2;
    xOffset = (xOffset < 0) ? 0 : xOffset;
    o.move(Math.max(0, scrX + xOffset), Math.max(0, scrY + yOffset));
    o.placeIframe();
}

function DialogBoxWidget_Show(sh) {
    with (this) {
        m_sty = modal.css;
        l_sty = css;
        if (sh) {
            if (!this.iframe) {
                this.iframe = newWidget(getDynamicBGIFrameLayer().id);
                this.iframe.init();
            }
            oldCurrent = DialogBoxWidget_current;
            DialogBoxWidget_current = this;
            if (_ie) {
                layer.onkeydown = eval("_curWin." + _codeWinName + ".DialogBoxWidget_keypress");
                modal.layer.onkeydown = eval("_curWin." + _codeWinName + ".DialogBoxWidget_keypress");
            } else {
                _curDoc.addEventListener("keydown", eval("_curWin." + _codeWinName + ".DialogBoxWidget_keypress"), false);
            }
            oldMouseDown = _curDoc.onmousedown;
            _curDoc.onmousedown = null;
            hideBlockWhileWaitWidget();
        } else {
            DialogBoxWidget_current = oldCurrent;
            oldCurrent = null;
            if (_ie) {
                layer.onkeydown = null;
                modal.layer.onkeydown = null;
            } else {
                _curDoc.removeEventListener("keydown", eval("_curWin." + _codeWinName + ".DialogBoxWidget_keypress"), false);
            }
            _curDoc.onmousedown = oldMouseDown;
        }
        var sameState = (layer.isShown == sh);
        if (sameState) {
            return;
        }
        layer.isShown = sh;
        if (sh) {
            if (_curWin.DialogBoxWidget_zindex == null) {
                _curWin.DialogBoxWidget_zindex = 1000;
            }
            this.iframe.css.zIndex = _curWin.DialogBoxWidget_zindex++;
            m_sty.zIndex = _curWin.DialogBoxWidget_zindex++;
            l_sty.zIndex = _curWin.DialogBoxWidget_zindex++;
            DialogBoxWidget_modals[DialogBoxWidget_modals.length] = m_sty;
            m_sty.display = "";
            l_sty.display = "block";
            this.iframe.setDisplay(true);
            holdBGIFrame(this.iframe.id);
            DialogBoxWidgetResizeModals();
            this.height = layer.offsetHeight;
            this.width = layer.offsetWidth;
            if (_small && height) {
                if (divLayer == null) {
                    divLayer = getLayer("div_dialog_" + id);
                }
                if (divLayer) {
                    divLayer.style.overflow = "auto";
                    divLayer.style.height = (winHeight() < height) ? (winHeight() - 40) : getContainerHeight();
                    divLayer.style.width = (_moz ? width + 20 : getContainerWidth());
                }
                resize(null, ((winHeight() < height) ? (winHeight() - 10) : null));
            }
            if (isHidden(layer)) {
                this.center();
            }
            if (!_small && this.resizeCB) {
                this.resizeCB(width, height);
            }
        } else {
            var l = DialogBoxWidget_modals.length = Math.max(0, DialogBoxWidget_modals.length - 1);
            m_sty.width = "1px";
            m_sty.height = "1px";
            m_sty.display = "none";
            l_sty.display = "none";
            if (this.iframe != null) {
                this.iframe.setDisplay(false);
                releaseBGIFrame(this.iframe.id);
            }
        }
        modal.show(sh);
        firstLink.show(sh);
        lastLink.show(sh);
        oldShow(sh);
        if (DialogBoxWidget_current != null && sh == true) {
            DialogBoxWidget_current.focus();
        }
    }
}

function DialogBoxWidget_unload() {
    if (this.iframe) {
        releaseBGIFrame(this.iframe.id);
    }
}

function DialogBoxWidget_keepFocus(id) {
    var o = DialogBoxWidget_instances[id];
    if (o) {
        o.focus();
    }
}

function DialogBoxWidget_focus() {
    with (this) {
        if (titleLayer == null) {
            titleLayer = getLayer("titledialog_" + id);
        }
        if (titleLayer.focus) {
            titleLayer.focus();
        }
    }
}

function newPromptDialog(id, title, text, okLabel, cancelLabel, promptType, yesCB, noCB, noCloseButton) {
    var o = newDialogBoxWidget(id, title, 300, null, PromptDialog_defaultCB, PromptDialog_cancelCB, noCloseButton);
    o.text = text;
    o.getHTML = PromptDialog_getHTML;
    o.yes = okLabel ? newButtonWidget(id + "_yesBtn", okLabel, 'PromptDialog_yesCB("' + o.id + '")', 70) : null;
    o.no = cancelLabel ? newButtonWidget(id + "_noBtn", cancelLabel, 'PromptDialog_noCB("' + o.id + '")', 70) : null;
    o.yesCB = yesCB;
    o.noCB = noCB;
    o.promptType = promptType;
    o.txtLayer = null;
    o.imgLayer = null;
    o.setPromptType = PromptDialog_setPromptType;
    o.setText = PromptDialog_setText;
    if (o.yes) {
        o.attachDefaultButton(o.yes);
    } else {
        if (o.no) {
            o.attachDefaultButton(o.no);
        }
    }
    return o;
}

function PromptDialog_getimgPath(promptType) {
    var imgPath = _skin;
    switch (promptType) {
        case _promptDlgInfo:
            imgPath += "information_icon.gif";
            break;
        case _promptDlgWarning:
            imgPath += "warning_icon.gif";
            break;
        default:
            imgPath += "critical_icon.gif";
            break;
    }
    return imgPath;
}

function PromptDialog_getimgAlt(promptType) {
    var imgAlt = "";
    return imgAlt;
}

function PromptDialog_setPromptType(promptType) {
    var o = this;
    if (o.imgLayer == null) {
        o.imgLayer = getLayer("dlg_img_" + o.id);
    }
    o.imgLayer.src = PromptDialog_getimgPath(promptType);
    o.imgLayer.alt = PromptDialog_getimgAlt(promptType);
}

function PromptDialog_setText(text) {
    var o = this;
    o.text = text;
    if (o.txtLayer == null) {
        o.txtLayer = getLayer("dlg_txt_" + o.id);
    }
    o.txtLayer.innerHTML = convStr(text, false, true);
}

function PromptDialog_getHTML() {
    var o = this;
    var imgPath = PromptDialog_getimgPath(o.promptType);
    var imgAlt = PromptDialog_getimgAlt(o.promptType);
    return o.beginHTML() + '<table class="dialogzone" width="290" cellpadding="0" cellspacing="5" border="0">' + "<tr><td>" + '<table class="dialogzone" cellpadding="5" cellspacing="0" border="0">' + '<tr><td align="right" width="32" >' + img(imgPath, 32, 32, null, 'id="dlg_img_' + o.id + '"', imgAlt) + '</td><td></td><td id="dlg_txt_' + o.id + '" align="left" tabindex="0">' + convStr(o.text, false, true) + "</td></tr>" + "</table>" + "</td></tr>" + "<tr><td>" + getSep() + "</td></tr>" + '<tr><td align="right">' + '<table cellpadding="5" cellspacing="0" border="0">' + "<tr>" + (o.yes ? "<td>" + o.yes.getHTML() + "</td>" : "") + (o.no ? "<td>" + o.no.getHTML() + "</td>" : "") + "</tr>" + "</table>" + "</td></tr>" + "</table>" + o.endHTML();
}

function PromptDialog_defaultCB() {
    var o = this;
    if (o.yesCB) {
        if (typeof o.yesCB != "string") {
            o.yesCB();
        } else {
            eval(o.yesCB);
        }
    }
    this.show(false);
}

function PromptDialog_cancelCB() {
    var o = this;
    if (o.noCB) {
        if (typeof o.noCB != "string") {
            o.noCB();
        } else {
            eval(o.noCB);
        }
    }
    this.show(false);
}

function PromptDialog_yesCB(id) {
    DialogBoxWidget_instances[id].defaultCB();
}

function PromptDialog_noCB(id) {
    DialogBoxWidget_instances[id].cancelCB();
}

function newWaitDialogBoxWidget(id, w, h, title, bShowCancel, cancelCB, bShowLabel, text) {
    var minW = 250;
    var minH = 150;
    if (w < minW) {
        w = minW;
    }
    if (h < minH) {
        h = minH;
    }
    var o = newDialogBoxWidget(id, title, w, h, null, WaitDialogBoxWidget_cancelCB, false);
    o.pad = 5;
    var zoneW = o.getContainerWidth() - 10;
    var zoneH = o.getContainerHeight() - (2 * o.pad + 21 + 10);
    o.frZone = newFrameZoneWidget(id + "_frZone", zoneW, zoneH);
    o.frZone.beginHTML = WaitDialog_FrameZoneWidget_beginHTML;
    o.frZone.endHTML = WaitDialog_FrameZoneWidget_endHTML;
    o.showLabel = (bShowLabel != null) ? bShowLabel : false;
    o.showCancel = (bShowCancel != null) ? bShowCancel : false;
    o.label = newWidget(id + "_label");
    o.label.text = text;
    if (o.showCancel) {
        o.cancelButton = newButtonWidget(id + "_cancelButton", _cancelButtonLab, CancelButton_cancelCB);
        o.cancelButton.par = o;
    } else {
        o.cancelButton = {};
        o.cancelButton.init = function () {
        };
        o.cancelButton.setDisplay = function (x) {
        };
        o.cancelButton.setDisabled = function (x) {
        };
        o.cancelButton.getHTML = function () {
            return "";
        };
    }
    o.cancelCB = cancelCB;
    o.oldDialogBoxInit = o.init;
    o.init = WaitDialogBoxWidget_init;
    o.oldShow2 = o.show;
    o.show = WaitDialogBoxWidget_show;
    o.getHTML = WaitDialogBoxWidget_getHTML;
    o.setShowCancel = WaitDialogBoxWidget_setShowCancel;
    o.setShowLabel = WaitDialogBoxWidget_setShowLabel;
    return o;
}

function WaitDialogBoxWidget_init() {
    var o = this;
    o.oldDialogBoxInit();
    o.frZone.init();
    o.label.init();
    o.label.setDisplay(o.showLabel);
    o.cancelButton.init();
    o.cancelButton.setDisplay(o.showCancel);
}

function WaitDialogBoxWidget_getHTML() {
    var o = this, s = "";
    s += o.beginHTML();
    s += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody>';
    s += "<tr>" + '<td align="center" valign="top">' + o.frZone.beginHTML();
    s += '<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody>' + "<tr>" + '<td align="center" style="padding-top:5px;">' + img(_skin + "wait01.gif", 200, 40) + "</td>" + "</tr>" + "<tr>" + '<td align="left" style="padding-left:2px;padding-right:2px;padding-top:5px;">' + '<div id="' + o.label.id + '" class="icontext" style="wordWrap:break_word;">' + convStr(o.label.text, false, true) + "</div>" + "</td>" + "</tr>" + "</tbody></table>";
    s += o.frZone.endHTML() + "</td>" + "</tr>";
    s += "<tr>" + '<td align="center" valign="middle" style="padding-top:5px;">' + '<div id="cancelDiv' + o.id + '">' + o.cancelButton.getHTML() + "</div>" + "</td>" + "</tr>";
    s += "</tbody></table>";
    s += o.endHTML();
    return s;
}

function WaitDialog_FrameZoneWidget_beginHTML() {
    var o = this;
    return '<table class="waitdialogzone" style="' + sty("width", o.w) + sty("height", o.h) + '" id="' + o.id + '" cellspacing="0" cellpadding="0" border="0"><tbody>' + '<tr><td valign="top" class="dialogzone" id="frame_cont_' + o.id + '">';
}

function WaitDialog_FrameZoneWidget_endHTML() {
    var o = this;
    return "</td></tr></tbody></table>";
}

function WaitDialogBoxWidget_setShowCancel(show, cancelCB) {
    var o = this;
    o.showCancel = show;
    o.cancelButton.setDisabled(false);
    o.cancelButton.setDisplay(show);
    o.cancelCB = cancelCB;
}

function WaitDialogBoxWidget_setShowLabel(show, text) {
    var o = this;
    o.showLabel = show;
    o.label.text = text;
    o.label.setHTML(text);
    o.label.setDisplay(show);
}

function WaitDialogBoxWidget_cancelCB() {
    var o = this;
    if (o.cancelCB != null) {
        o.cancelCB();
        o.cancelButton.setDisabled(true);
    }
}

function CancelButton_cancelCB() {
    var o = this;
    if (o.par.cancelCB != null) {
        o.par.cancelCB();
        o.par.cancelButton.setDisabled(true);
    }
}

function WaitDialogBoxWidget_show(bShow) {
    var o = this;
    if (bShow) {
        if (o.showCancel) {
            o.frZone.resize(null, o.getContainerHeight() - (2 * o.pad + 21 + 10));
        } else {
            o.frZone.resize(null, o.getContainerHeight() - 10);
        }
    }
    o.oldShow2(bShow);
}

var swfobject = function () {
    var Z = "undefined", P = "object", B = "Shockwave Flash", h = "ShockwaveFlash.ShockwaveFlash",
        W = "application/x-shockwave-flash", K = "SWFObjectExprInst", G = window, g = document, N = navigator, f = [],
        H = [], Q = null, L = null, T = null, S = false, C = false;
    var a = function () {
        var l = typeof g.getElementById != Z && typeof g.getElementsByTagName != Z && typeof g.createElement != Z && typeof g.appendChild != Z && typeof g.replaceChild != Z && typeof g.removeChild != Z && typeof g.cloneNode != Z,
            t = [0, 0, 0], n = null;
        if (typeof N.plugins != Z && typeof N.plugins[B] == P) {
            n = N.plugins[B].description;
            if (n) {
                n = n.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
                t[0] = parseInt(n.replace(/^(.*)\..*$/, "$1"), 10);
                t[1] = parseInt(n.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
                t[2] = /r/.test(n) ? parseInt(n.replace(/^.*r(.*)$/, "$1"), 10) : 0;
            }
        } else {
            if (typeof G.ActiveXObject != Z) {
                var o = null, s = false;
                try {
                    o = new ActiveXObject(h + ".7");
                } catch (k) {
                    try {
                        o = new ActiveXObject(h + ".6");
                        t = [6, 0, 21];
                        o.AllowScriptAccess = "always";
                    } catch (k) {
                        if (t[0] == 6) {
                            s = true;
                        }
                    }
                    if (!s) {
                        try {
                            o = new ActiveXObject(h);
                        } catch (k) {
                        }
                    }
                }
                if (!s && o) {
                    try {
                        n = o.GetVariable("$version");
                        if (n) {
                            n = n.split(" ")[1].split(",");
                            t = [parseInt(n[0], 10), parseInt(n[1], 10), parseInt(n[2], 10)];
                        }
                    } catch (k) {
                    }
                }
            }
        }
        var v = N.userAgent.toLowerCase(), j = N.platform.toLowerCase(),
            r = /webkit/.test(v) ? parseFloat(v.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, i = false,
            q = j ? /win/.test(j) : /win/.test(v), m = j ? /mac/.test(j) : /mac/.test(v);
        /*@cc_on i=true;@if(@_win32)q=true;@elif(@_mac)m=true;@end@*/
        return {w3cdom: l, pv: t, webkit: r, ie: i, win: q, mac: m};
    }();
    var e = function () {
        if (!a.w3cdom) {
            return;
        }
        J(I);
        if (a.ie && a.win) {
            try {
                g.write("<script id=__ie_ondomload defer=true src=//:><\/script>");
                var i = c("__ie_ondomload");
                if (i) {
                    i.onreadystatechange = function () {
                        if (this.readyState == "complete") {
                            this.parentNode.removeChild(this);
                            V();
                        }
                    };
                }
            } catch (j) {
            }
        }
        if (a.webkit && typeof g.readyState != Z) {
            Q = setInterval(function () {
                if (/loaded|complete/.test(g.readyState)) {
                    V();
                }
            }, 10);
        }
        if (typeof g.addEventListener != Z) {
            g.addEventListener("DOMContentLoaded", V, null);
        }
        M(V);
    }();

    function V() {
        if (S) {
            return;
        }
        if (a.ie && a.win) {
            var m = Y("span");
            try {
                var l = g.getElementsByTagName("body")[0].appendChild(m);
                l.parentNode.removeChild(l);
            } catch (n) {
                return;
            }
        }
        S = true;
        if (Q) {
            clearInterval(Q);
            Q = null;
        }
        var j = f.length;
        for (var k = 0; k < j; k++) {
            f[k]();
        }
    }

    function J(i) {
        if (S) {
            i();
        } else {
            f[f.length] = i;
        }
    }

    function M(j) {
        if (typeof G.addEventListener != Z) {
            G.addEventListener("load", j, false);
        } else {
            if (typeof g.addEventListener != Z) {
                g.addEventListener("load", j, false);
            } else {
                if (typeof G.attachEvent != Z) {
                    G.attachEvent("onload", j);
                } else {
                    if (typeof G.onload == "function") {
                        var i = G.onload;
                        G.onload = function () {
                            i();
                            j();
                        };
                    } else {
                        G.onload = j;
                    }
                }
            }
        }
    }

    function I() {
        var l = H.length;
        for (var j = 0; j < l; j++) {
            var m = H[j].id;
            if (a.pv[0] > 0) {
                var k = c(m);
                if (k) {
                    H[j].width = k.getAttribute("width") ? k.getAttribute("width") : "0";
                    H[j].height = k.getAttribute("height") ? k.getAttribute("height") : "0";
                    if (O(H[j].swfVersion)) {
                        if (a.webkit && a.webkit < 312) {
                            U(k);
                        }
                        X(m, true);
                    } else {
                        if (H[j].expressInstall && !C && O("6.0.65") && (a.win || a.mac)) {
                            D(H[j]);
                        } else {
                            d(k);
                        }
                    }
                }
            } else {
                X(m, true);
            }
        }
    }

    function U(m) {
        var k = m.getElementsByTagName(P)[0];
        if (k) {
            var p = Y("embed"), r = k.attributes;
            if (r) {
                var o = r.length;
                for (var n = 0; n < o; n++) {
                    if (r[n].nodeName.toLowerCase() == "data") {
                        p.setAttribute("src", r[n].nodeValue);
                    } else {
                        p.setAttribute(r[n].nodeName, r[n].nodeValue);
                    }
                }
            }
            var q = k.childNodes;
            if (q) {
                var s = q.length;
                for (var l = 0; l < s; l++) {
                    if (q[l].nodeType == 1 && q[l].nodeName.toLowerCase() == "param") {
                        p.setAttribute(q[l].getAttribute("name"), q[l].getAttribute("value"));
                    }
                }
            }
            m.parentNode.replaceChild(p, m);
        }
    }

    function F(i) {
        if (a.ie && a.win && O("8.0.0")) {
            G.attachEvent("onunload", function () {
                var k = c(i);
                if (k) {
                    for (var j in k) {
                        if (typeof k[j] == "function") {
                            k[j] = function () {
                            };
                        }
                    }
                    k.parentNode.removeChild(k);
                }
            });
        }
    }

    function D(j) {
        C = true;
        var o = c(j.id);
        if (o) {
            if (j.altContentId) {
                var l = c(j.altContentId);
                if (l) {
                    L = l;
                    T = j.altContentId;
                }
            } else {
                L = b(o);
            }
            if (!(/%$/.test(j.width)) && parseInt(j.width, 10) < 310) {
                j.width = "310";
            }
            if (!(/%$/.test(j.height)) && parseInt(j.height, 10) < 137) {
                j.height = "137";
            }
            g.title = g.title.slice(0, 47) + " - Flash Player Installation";
            var n = a.ie && a.win ? "ActiveX" : "PlugIn", k = g.title,
                m = "MMredirectURL=" + G.location + "&MMplayerType=" + n + "&MMdoctitle=" + k, p = j.id;
            if (a.ie && a.win && o.readyState != 4) {
                var i = Y("div");
                p += "SWFObjectNew";
                i.setAttribute("id", p);
                o.parentNode.insertBefore(i, o);
                o.style.display = "none";
                G.attachEvent("onload", function () {
                    o.parentNode.removeChild(o);
                });
            }
            R({data: j.expressInstall, id: K, width: j.width, height: j.height}, {flashvars: m}, p);
        }
    }

    function d(j) {
        if (a.ie && a.win && j.readyState != 4) {
            var i = Y("div");
            j.parentNode.insertBefore(i, j);
            i.parentNode.replaceChild(b(j), i);
            j.style.display = "none";
            G.attachEvent("onload", function () {
                j.parentNode.removeChild(j);
            });
        } else {
            j.parentNode.replaceChild(b(j), j);
        }
    }

    function b(n) {
        var m = Y("div");
        if (a.win && a.ie) {
            m.innerHTML = n.innerHTML;
        } else {
            var k = n.getElementsByTagName(P)[0];
            if (k) {
                var o = k.childNodes;
                if (o) {
                    var j = o.length;
                    for (var l = 0; l < j; l++) {
                        if (!(o[l].nodeType == 1 && o[l].nodeName.toLowerCase() == "param") && !(o[l].nodeType == 8)) {
                            m.appendChild(o[l].cloneNode(true));
                        }
                    }
                }
            }
        }
        return m;
    }

    function R(AE, AC, q) {
        var p, t = c(q);
        if (typeof AE.id == Z) {
            AE.id = q;
        }
        if (a.ie && a.win) {
            var AD = "";
            for (var z in AE) {
                if (AE[z] != Object.prototype[z]) {
                    if (z == "data") {
                        AC.movie = AE[z];
                    } else {
                        if (z.toLowerCase() == "styleclass") {
                            AD += ' class="' + AE[z] + '"';
                        } else {
                            if (z != "classid") {
                                AD += " " + z + '="' + AE[z] + '"';
                            }
                        }
                    }
                }
            }
            var AB = "";
            for (var y in AC) {
                if (AC[y] != Object.prototype[y]) {
                    AB += '<param name="' + y + '" value="' + AC[y] + '" />';
                }
            }
            t.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + AD + ">" + AB + "</object>";
            F(AE.id);
            p = c(AE.id);
        } else {
            if (a.webkit && a.webkit < 312) {
                var AA = Y("embed");
                AA.setAttribute("type", W);
                for (var x in AE) {
                    if (AE[x] != Object.prototype[x]) {
                        if (x == "data") {
                            AA.setAttribute("src", AE[x]);
                        } else {
                            if (x.toLowerCase() == "styleclass") {
                                AA.setAttribute("class", AE[x]);
                            } else {
                                if (x != "classid") {
                                    AA.setAttribute(x, AE[x]);
                                }
                            }
                        }
                    }
                }
                for (var w in AC) {
                    if (AC[w] != Object.prototype[w]) {
                        if (w != "movie") {
                            AA.setAttribute(w, AC[w]);
                        }
                    }
                }
                t.parentNode.replaceChild(AA, t);
                p = AA;
            } else {
                var s = Y(P);
                s.setAttribute("type", W);
                for (var v in AE) {
                    if (AE[v] != Object.prototype[v]) {
                        if (v.toLowerCase() == "styleclass") {
                            s.setAttribute("class", AE[v]);
                        } else {
                            if (v != "classid") {
                                s.setAttribute(v, AE[v]);
                            }
                        }
                    }
                }
                for (var u in AC) {
                    if (AC[u] != Object.prototype[u] && u != "movie") {
                        E(s, u, AC[u]);
                    }
                }
                t.parentNode.replaceChild(s, t);
                p = s;
            }
        }
        return p;
    }

    function E(k, i, j) {
        var l = Y("param");
        l.setAttribute("name", i);
        l.setAttribute("value", j);
        k.appendChild(l);
    }

    function c(i) {
        return g.getElementById(i);
    }

    function Y(i) {
        return g.createElement(i);
    }

    function O(k) {
        var j = a.pv, i = k.split(".");
        i[0] = parseInt(i[0], 10);
        i[1] = parseInt(i[1], 10);
        i[2] = parseInt(i[2], 10);
        return (j[0] > i[0] || (j[0] == i[0] && j[1] > i[1]) || (j[0] == i[0] && j[1] == i[1] && j[2] >= i[2])) ? true : false;
    }

    function A(m, j) {
        if (a.ie && a.mac) {
            return;
        }
        var l = g.getElementsByTagName("head")[0], k = Y("style");
        k.setAttribute("type", "text/css");
        k.setAttribute("media", "screen");
        if (!(a.ie && a.win) && typeof g.createTextNode != Z) {
            k.appendChild(g.createTextNode(m + " {" + j + "}"));
        }
        l.appendChild(k);
        if (a.ie && a.win && typeof g.styleSheets != Z && g.styleSheets.length > 0) {
            var i = g.styleSheets[g.styleSheets.length - 1];
            if (typeof i.addRule == P) {
                i.addRule(m, j);
            }
        }
    }

    function X(k, i) {
        var j = i ? "visible" : "hidden";
        if (S) {
            c(k).style.visibility = j;
        } else {
            A("#" + k, "visibility:" + j);
        }
    }

    return {
        registerObject: function (l, i, k) {
            if (!a.w3cdom || !l || !i) {
                return;
            }
            var j = {};
            j.id = l;
            j.swfVersion = i;
            j.expressInstall = k ? k : false;
            H[H.length] = j;
            X(l, false);
        }, getObjectById: function (l) {
            var i = null;
            if (a.w3cdom && S) {
                var j = c(l);
                if (j) {
                    var k = j.getElementsByTagName(P)[0];
                    if (!k || (k && typeof j.SetVariable != Z)) {
                        i = j;
                    } else {
                        if (typeof k.SetVariable != Z) {
                            i = k;
                        }
                    }
                }
            }
            return i;
        }, embedSWF: function (n, u, r, t, j, m, k, p, s) {
            if (!a.w3cdom || !n || !u || !r || !t || !j) {
                return;
            }
            r += "";
            t += "";
            if (O(j)) {
                X(u, false);
                var q = (typeof s == P) ? s : {};
                q.data = n;
                q.width = r;
                q.height = t;
                var o = (typeof p == P) ? p : {};
                if (typeof k == P) {
                    for (var l in k) {
                        if (k[l] != Object.prototype[l]) {
                            if (typeof o.flashvars != Z) {
                                o.flashvars += "&" + l + "=" + k[l];
                            } else {
                                o.flashvars = l + "=" + k[l];
                            }
                        }
                    }
                }
                J(function () {
                    R(q, o, u);
                    if (q.id == u) {
                        X(u, true);
                    }
                });
            } else {
                if (m && !C && O("6.0.65") && (a.win || a.mac)) {
                    X(u, false);
                    J(function () {
                        var i = {};
                        i.id = i.altContentId = u;
                        i.width = r;
                        i.height = t;
                        i.expressInstall = m;
                        D(i);
                    });
                }
            }
        }, getFlashPlayerVersion: function () {
            return {major: a.pv[0], minor: a.pv[1], release: a.pv[2]};
        }, hasFlashPlayerVersion: O, createSWF: function (k, j, i) {
            if (a.w3cdom && S) {
                return R(k, j, i);
            } else {
                return undefined;
            }
        }, createCSS: function (j, i) {
            if (a.w3cdom) {
                A(j, i);
            }
        }, addDomLoadEvent: J, addLoadEvent: M, getQueryParamValue: function (m) {
            var l = g.location.search || g.location.hash;
            if (m == null) {
                return l;
            }
            if (l) {
                var k = l.substring(1).split("&");
                for (var j = 0; j < k.length; j++) {
                    if (k[j].substring(0, k[j].indexOf("=")) == m) {
                        return k[j].substring((k[j].indexOf("=") + 1));
                    }
                }
            }
            return "";
        }, expressInstallCallback: function () {
            if (C && L) {
                var i = c(K);
                if (i) {
                    i.parentNode.replaceChild(L, i);
                    if (T) {
                        X(T, true);
                        if (a.ie && a.win) {
                            L.style.display = "block";
                        }
                    }
                    L = null;
                    T = null;
                    C = false;
                }
            }
        }
    };
}();
if (typeof (bobj) == "undefined") {
    bobj = {};
}
if (typeof (bobj.crvUri) == "undefined") {
    bobj.crvUri = function (uri) {
        return "../crystalreportviewers/js/crviewer/" + uri;
    };
}
if (typeof (bobj.crv) == "undefined") {
    bobj.crv = {};
}
if (typeof (bobj.crv._loadJavaScriptEx) == "undefined") {
    bobj.crv._loadJavaScriptEx = function (jsonSpec) {
        if (jsonSpec && jsonSpec.src) {
            var scriptTag = '<script language="javascript" src="' + jsonSpec.src + '"';
            if (jsonSpec.props) {
                for (var key in jsonSpec.props) {
                    scriptTag += " " + key + '="' + jsonSpec.props[key] + '"';
                }
            }
            scriptTag += "><\/script>";
            document.write(scriptTag);
        }
    };
}

if (typeof (BILaunchpadApp) == "undefined") {
    var srcLoc;
    srcLoc = "https://sdk.openui5.org/resources/sap-ui-core.js ";
    bobj.crv._loadJavaScriptEx({
        src: bobj.nodeResources ? bobj.nodeResources : srcLoc,
        props: {
            "id": "sap-ui-bootstrap",
            "data-sap-ui-libs": "sap.ui.commons, sap.m, sap.ui.core",
            "data-sap-ui-theme": "sap_belize",
            "data-sap-ui-compatVersion-sapMDialogWithPadding": "edge"
        }
    });
}
if (typeof (bobj.crv.fiori) == "undefined") {
    bobj.crv.fiori = {};
    bobj.crv.fiori.config = {};
    bobj.crv.fiori.config.SIZE_LIMIT = 1000;
    bobj.crv.fiori.date = {};
    bobj.crv.fiori.date.DATE_PREFIX = "Date(";
    bobj.crv.fiori.date.DATETIME_PREFIX = "DateTime(";
    bobj.crv.fiori.date.TIME_PREFIX = "Time(";
    bobj.crv.fiori.date.DATE_SUFFIX = ")";
    bobj.crv.fiori.date.DATE_SEP = ",";
    bobj.crv.fiori.range = {};
    bobj.crv.fiori.range.START_PART = "start";
    bobj.crv.fiori.range.END_PART = "end";
    bobj.crv.fiori.range.CONDITION_VALUE = "rangeConditionValue";
    bobj.crv.fiori.range.RANGE_TOKEN = "rangetoken";
    bobj.crv.fiori.event = {};
    bobj.crv.fiori.event.VALIDATE_VALUE = "ValidateValue";
    bobj.crv.fiori.event.FETCH_LOV = "nextGenPromptingFetchLOV";
    bobj.crv.fiori.event.SEARCH_LOV = "nextGenPromptingSearchLOV";
    bobj.crv.fiori.event.SET_LOGON = "nextGenPromptingSetLogon";
    bobj.crv.fiori.event.FETCH_LOGON = "nextGenPromptingFetchLogon";
    bobj.crv.fiori.event.UI_CHANNEL = "promptUIChannel";
    bobj.crv.fiori.event.ON_FOCUS = "onFocus";
    bobj.crv.fiori.GetViewName = function (oPromptData) {
        var range = oPromptData.allowRangeValue;
        var multi = oPromptData.allowMultiValue;
        var discrete = oPromptData.allowDiscreteValue ? oPromptData.allowDiscreteValue : !range;
        var conditionRange = oPromptData.IsConditionRange;
        if (multi) {
            if (conditionRange) {
                return "ui5prompting.views.MultiConditionRange";
            } else {
                if (discrete && range) {
                    return "ui5prompting.views.MultiDiscreteRange";
                } else {
                    if (range) {
                        return "ui5prompting.views.MultiRange";
                    } else {
                        return "ui5prompting.views.MultiInput";
                    }
                }
            }
        } else {
            if (conditionRange) {
                return "ui5prompting.views.ConditionRangeInput";
            } else {
                if (range) {
                    return "ui5prompting.views.RangeInput";
                } else {
                    return "ui5prompting.views.DiscreteInput";
                }
            }
        }
    };
}
var PE_VALUE_DESC_SEPARATOR = " - ";
if (typeof (_pe) == "undefined") {
    _pe = new function () {
        var o = this;
        o._ie = (document.all != null) ? true : false;
        o._dom = (document.getElementById != null) ? true : false;
        o._isQuirksMode = (document.compatMode != "CSS1Compat");
        o._moz = o._dom && !o._ie;
        o._appVer = navigator.appVersion.toLowerCase();
        o._mac = (o._appVer.indexOf("macintosh") >= 0) || (o._appVer.indexOf("macos") >= 0);
        o._userAgent = navigator.userAgent ? navigator.userAgent.toLowerCase() : null;
        o._saf = o._moz && (o._userAgent.indexOf("safari") >= 0);
        o._ie6 = o._ie && (o._appVer.indexOf("msie 6") >= 0);
        o._root = "";
        o._images = o._root + "/images/";
        o._prompts = new Array;
        o._lovBS = 1000;
        o._st = "s";
        o._nm = "n";
        o._cy = "c";
        o._bo = "b";
        o._da = "d";
        o._tm = "t";
        o._dt = "dt";
        _BlockWaitWidgetID = "PEBlockWidgetID";
        o._theLYR = null;
        o._dlgResize = null;
        o._widgets = new Array;
        o.DlgBox_modals = new Array;
        o.DlgBox_instances = new Array;
        o.DlgBox_current = null;
        o._show = "visible";
        o._hide = "hidden";
        o._hand = o._ie ? "hand" : "pointer";
        o.init = PE_init;
        o.canSubmit = PE_canSubmit;
        o.beginBlocking = PE_beginBlocking;
        o.endBlocking = PE_endBlocking;
        o.setLOVMsg = PE_setLOVMsg;
    };
}

function PE_init(root, lovBS) {
    var o = this;
    if (root && root.length > 0) {
        if (root.charAt(root.length - 1) != "/") {
            root += "/";
        }
        o._root = root;
        o._images = root + "images/";
    } else {
        o._root = null;
        o._images = null;
    }
    if (lovBS > 0) {
        o._lovBS = lovBS;
    }
}

function PE_canSubmit() {
    return (this.DlgBox_current) ? false : true;
}

function PE_setLOVMsg(form, vid, pid) {
    var fl = document.getElementById(vid);
    var fv = fl.value;
    if (fv.length > 0) {
        fv += "&";
    }
    fv += "cmd=1&ap" + "=" + pid;
    fl.value = fv;
}

var DateTimeFormatSetting = {
    "datePattern": "Y-M-D",
    "isTwoDigitMonth": true,
    "isTwoDigitDay": true,
    "dateRegex": null,
    "dateTimeRegex": null
};

function promptengine_getDatePattern() {
    return DateTimeFormatSetting.datePattern;
}

function promptengine_setDatePattern(pattern) {
    DateTimeFormatSetting.datePattern = pattern;
}

function promptengine_getIsTwoDigitMonth() {
    return DateTimeFormatSetting.isTwoDigitMonth;
}

function promptengine_setIsTwoDigitMonth(isTwoDigitMonth) {
    DateTimeFormatSetting.isTwoDigitMonth = isTwoDigitMonth;
}

function promptengine_getIsTwoDigitDay() {
    return DateTimeFormatSetting.isTwoDigitDay;
}

function promptengine_setIsTwoDigitDay(isTwoDigitDay) {
    DateTimeFormatSetting.isTwoDigitDay = isTwoDigitDay;
}

function promptengine_getDateRegex() {
    return DateTimeFormatSetting.dateRegex;
}

function promptengine_setDateRegex(dateRegex) {
    DateTimeFormatSetting.dateRegex = dateRegex;
}

function promptengine_getDateTimeRegex() {
    return DateTimeFormatSetting.dateTineRegex;
}

function promptengine_setDateTimeRegex(dateTineRegex) {
    DateTimeFormatSetting.dateTineRegex = dateTineRegex;
}

function _convStr(s, nbsp, br) {
    s = "" + s;
    var ret = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    if (nbsp) {
        ret = ret.replace(/ /g, "&nbsp;");
    }
    if (br) {
        ret = ret.replace(/\n/g, "<br>");
    }
    return ret;
}

function _opt(val, txt, sel) {
    return '<option value="' + _convStr(val) + '" ' + (sel ? "selected" : "") + ">" + _convStr(txt) + "</option>";
}

function _canScanFrames(w) {
    var ex = true, d = null;
    if (_pe._moz) {
        _oldErrHandler = window.onerror;
        window.onerror = localErrHandler;
    }
    try {
        d = w.document;
        ex = false;
    } catch (expt) {
    }
    if (_pe._moz) {
        window.onerror = _oldErrHandler;
    }
    return (!ex && (d != null));
}

function _restoreAllDisabledInputs(win, level) {
    if (_pe._ie && window._peInputStackLevel != null) {
        win = win ? win : window;
        if (_canScanFrames(win)) {
            if (level == null) {
                level = --window._peInputStackLevel;
            }
            var b = win.document.body, arr = b ? b.getElementsByTagName("SELECT") : null, len = arr ? arr.length : 0;
            for (var i = 0; i < len; i++) {
                var inpt = arr[i];
                if (inpt._peDisableLevel == level) {
                    inpt.disabled = false;
                    inpt._peDisableLevel = null;
                }
            }
            var frames = win.frames, flen = frames.length;
            for (var k = 0; k < flen; k++) {
                _restoreAllDisabledInputs(frames[k], level);
            }
        }
    }
}

function _disableAllInputs(x, y, w, h, win, level) {
    if (_pe._ie) {
        win = win ? win : window;
        if (_canScanFrames(win)) {
            var b = win.document.body, arr = b ? b.getElementsByTagName("SELECT") : null, len = arr ? arr.length : 0;
            if (level == null) {
                if (window._peInputStackLevel == null) {
                    window._peInputStackLevel = 0;
                }
                level = window._peInputStackLevel++;
            }
            for (var i = 0; i < len; i++) {
                var inpt = arr[i];
                var inter = (x == null) || _isLayerIntersectRect(inpt, x, y, w, h);
                if (!inpt.disabled && inter) {
                    inpt._peDisableLevel = level;
                    inpt.disabled = true;
                }
            }
            var frames = win.frames, flen = frames.length;
            for (var k = 0; k < flen; k++) {
                _disableAllInputs(null, null, null, null, frames[k], level);
            }
        }
    }
}

function _getBGIframe(id) {
    return '<iframe id="' + id + '" style="display:none;left:0px;position:absolute;top:0px" src="' + _pe._images + "transp.gif" + '" frameBorder="0" scrolling="no"></iframe>';
}

function _eventCancelBubble(e, win) {
    win = win ? win : window;
    _pe._ie ? win.event.cancelBubble = true : e.cancelBubble = true;
}

function _append(e, s) {
    if (_pe._ie) {
        e.insertAdjacentHTML("BeforeEnd", s);
    } else {
        var curDoc = document;
        var r = curDoc.createRange();
        r.setStartBefore(e);
        var frag = r.createContextualFragment(s);
        e.appendChild(frag);
    }
}

function _targetApp(s) {
    _append(document.body, s);
}

function _isLayerIntersectRect(l, x1, y1, w, h) {
    var xl1 = _getPos(l).x, yl1 = _getPos(l).y, xl2 = xl1 + l.offsetWidth, yl2 = yl1 + l.offsetHeight, x2 = x1 + w,
        y2 = y1 + h;
    return ((x1 > xl1) || (x2 > xl1)) && ((x1 < xl2) || (x2 < xl2)) && ((y1 > yl1) || (y2 > yl1)) && ((y1 < yl2) || (y2 < yl2));
}

function _getPos(el, relTo) {
    relTo = relTo ? relTo : null;
    for (var lx = 0, ly = 0; (el != null) && (el != relTo); lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) {
    }
    return {x: lx, y: ly};
}

function _getLayer(id) {
    return document.getElementById(id);
}

function _getWidget(layer) {
    if (layer == null) {
        return null;
    }
    var w = layer._widget;
    if (w != null) {
        return _pe._widgets[w];
    } else {
        return _getWidget(layer.parentNode);
    }
}

function _isHidden(lyr) {
    if ((lyr == null) || (lyr.tagName == "BODY")) {
        return false;
    }
    var sty = lyr.style;
    if ((sty == null) || (sty.visibility == _pe._hide) || (sty.display == "none")) {
        return true;
    }
    return _isHidden(lyr.parentNode);
}

function _attr(key, val) {
    return (val != null ? " " + key + '="' + val + '" ' : "");
}

function _img(src, w, h, align, att, alt) {
    att = (att ? att : "");
    if (alt == null) {
        alt = "";
    }
    return "<img" + _attr("width", w) + _attr("height", h) + _attr("src", src) + _attr(_pe._ie ? "alt" : "title", alt) + _attr("align", align) + ' border="0" hspace="0" vspace="0" ' + (att ? att : "") + ">";
}

function _imgOffset(url, w, h, dx, dy, id, att, alt, st, align) {
    return _img(_pe._images + "transp.gif", w, h, align, (att ? att : "") + " " + _attr("id", id) + ' style="' + _backImgOffset(url, dx, dy) + (st ? st : "") + '"', alt);
}

function _changeOffset(lyr, dx, dy, url, alt) {
    var st = lyr.style;
    if (st) {
        if ((dx != null) && (dy != null)) {
            st.backgroundPosition = "" + (-dx) + "px " + (-dy) + "px";
        }
        if (url) {
            st.backgroundImage = "url('" + url + "')";
        }
    }
    if (alt) {
        lyr.alt = alt;
    }
}

function _simpleImgOffset(url, w, h, dx, dy, id, att, alt, st, align) {
    if (_pe._ie) {
        if (dx == null) {
            dx = 0;
        }
        if (dy == null) {
            dy = 0;
        }
        return "<div " + (att ? att : "") + " " + _attr("id", id) + ' style="position:relative;padding:0px;width:' + w + "px;height:" + h + "px;overflow:hidden;" + (st ? st : "") + '">' + _img(url, null, null, "top", 'style="margin:0px;position:relative;top:' + (-dy) + "px;left:" + (-dx) + 'px"', alt) + "</div>";
    } else {
        return _imgOffset(url, w, h, dx, dy, id, att, alt, st, align);
    }
}

function _changeSimpleOffset(lyr, dx, dy, url, alt) {
    if (_pe._ie) {
        lyr = lyr.childNodes[0];
        var st = lyr.style;
        if ((url != null) && (url != lyr.src)) {
            lyr.src = url;
        }
        if (dx != null) {
            st.left = "" + (-dx) + "px";
        }
        if (dy != null) {
            st.top = "" + (-dy) + "px";
        }
        if (alt != null) {
            lyr.alt = alt;
        }
    } else {
        _changeOffset(lyr, dx, dy, url, alt);
    }
}

function _backImgOffset(url, dx, dy) {
    return "background-image:url('" + url + "');background-position:" + (-dx) + "px " + (-dy) + "px;";
}

function _sty(key, val) {
    return (val != null ? key + ":" + val + ";" : "");
}

function _getSpace(w, h) {
    return '<table height="' + h + '" border="0" cellspacing="0" cellpadding="0"><tr><td>' + _img(_pe._images + "transp.gif", w, h) + "</td></tr></table>";
}

function _isTextInput(ev) {
    var source = _pe._ie ? ev.srcElement : ev.target;
    var isText = false;
    if (source.tagName == "TEXTAREA") {
        isText = true;
    }
    if ((source.tagName == "INPUT") && (source.type.toLowerCase() == "text")) {
        isText = true;
    }
    return isText;
}

function _documentWidth(win) {
    var win = win ? win : window;
    var width = Math.max(document.body.clientWidth, document.documentElement.clientWidth);
    width = Math.max(width, document.body.scrollWidth);
    return width;
}

function _documentHeight(win) {
    var win = win ? win : window;
    var height = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    height = Math.max(height, document.body.scrollHeight);
    return height;
}

function _winWidth(win) {
    var win = win ? win : window;
    var width;
    if (_pe._ie) {
        if (_pe._isQuirksMode) {
            width = win.document.body.clientWidth;
        } else {
            width = win.document.documentElement.clientWidth;
        }
    } else {
        width = win.innerWidth;
    }
    return width;
}

function _winHeight(win) {
    var win = win ? win : window;
    var height;
    if (_pe._ie) {
        if (_pe._isQuirksMode) {
            height = document.body.clientHeight;
        } else {
            height = document.documentElement.clientHeight;
        }
    } else {
        height = win.innerHeight;
    }
    return height;
}

function _getScrollX(win) {
    var scrollLeft = 0;
    var win = win ? win : window;
    if (typeof (win.scrollX) == "number") {
        scrollLeft = win.scrollX;
    } else {
        scrollLeft = Math.max(win.document.body.scrollLeft, win.document.documentElement.scrollLeft);
    }
    return scrollLeft;
}

function _getScrollY(win) {
    var scrollTop = 0;
    var win = win ? win : window;
    if (typeof (win.scrollY) == "number") {
        scrollTop = window.scrollY;
    } else {
        scrollTop = Math.max(win.document.body.scrollTop, win.document.documentElement.scrollTop);
    }
    return scrollTop;
}

function _eventGetX(e) {
    return _pe._ie ? window.event.clientX : e.clientX ? e.clientX : e.pageX;
}

function _eventGetY(e) {
    return _pe._ie ? window.event.clientY : e.clientY ? e.clientY : e.pageY;
}

function _eventGetKey(e, win) {
    win = win ? win : window;
    return _pe._ie ? win.event.keyCode : e.keyCode;
}

function _isLayerDisplayed(lyr) {
    var css = lyr ? lyr.style : null;
    if (css) {
        if (css.display == "none" || css.visibility == "hidden") {
            return false;
        } else {
            var par = lyr.parentNode;
            if (par != null) {
                return _isLayerDisplayed(par);
            } else {
                return true;
            }
        }
    } else {
        return true;
    }
}

function _safeSetFocus(lyr) {
    if (lyr && lyr.focus && _isLayerDisplayed(lyr) && !lyr.disabled) {
        lyr.focus();
    }
}

function PE_getLB(lyr) {
    var o = new Object;
    o.lyr = lyr;
    o.arr = new Array;
    o.size = 0;
    o.add = LB_add;
    o.update = LB_update;
    return o;
}

function LB_add(val, txt, sel) {
    var o = this;
    o.arr[++o.size] = _opt(val, txt, sel);
}

function LB_update() {
    var o = this;
    var a = o.arr;
    if (!o.lyr) {
        return;
    }
    var parent = o.lyr.parentNode;
    var oldHTML = parent.innerHTML;
    var bpos = oldHTML.indexOf(">");
    if (bpos == -1) {
        return;
    }
    var epos = oldHTML.lastIndexOf("<");
    if (epos <= bpos) {
        return;
    }
    a[0] = oldHTML.substring(0, bpos + 1);
    a[o.size + 1] = oldHTML.substr(epos);
    parent.innerHTML = a.join("");
}

function newUnits(num, idh) {
    var o = new Object;
    o.parr = new Array;
    if (idh) {
        o.idh = idh;
    } else {
        o.idh = "";
    }
    o.num = num;
    o.init = Units_init;
    o.show = Units_show;
    o.toggle = Units_toggle;
    o.updateForm = Units_updateForm;
    o.activate = Units_activate;
    o.addP = Units_addP;
    return o;
}

function Units_init(uid) {
    var o = this;
    o.toggle(uid);
}

function Units_show(uid, b) {
    var o = this;
    var l = document.getElementById(o.idh + uid + "_PU");
    if (l) {
        var css = l.style;
        if (b) {
            css.display = "";
        } else {
            css.display = "none";
        }
    }
}

function Units_activate(uid) {
    var o = this;
    var l = document.getElementById(o.idh + uid + "_PU");
    if (l) {
        var scrY = _getScrollY(), scrX = _getScrollX();
        var h = l.offsetHeight, winCY = _winHeight(), y = _getPos(l).y;
        if (y < scrY) {
            window.scrollTo(scrX, y);
        } else {
            if (y + h > scrY + winCY) {
                window.scrollTo(scrX, Math.max(y, y + h - winCY));
            }
        }
    }
}

function Units_toggle(uid) {
    var o = this, c = o.num;
    for (var i = 0; i < c; i++) {
        o.show(i, true);
    }
    o.activate(uid);
}

function Units_addP(p) {
    var o = this;
    var parr = o.parr;
    parr[parr.length] = p;
}

function Units_updateForm(form, vid, chk) {
    var o = this, parr = o.parr;
    for (var i in parr) {
        var p = parr[i];
        if (p) {
            if (!p.updateForm(form, vid, chk)) {
                o.toggle(p.uid);
                return false;
            }
        }
    }
    return true;
}

function P_updateForm(form, vid, chk) {
    var o = this, b = false;
    if (o.readonly == true) {
        return true;
    }
    if (o.mul) {
        b = promptengine_updateMultiValue(form, vid, o.id, o.vt, chk, o.valueRequired);
    } else {
        if (o.rn) {
            b = promptengine_updateRangeValue(form, vid, o.id, o.vt, chk, o.valueRequired);
        } else {
            b = promptengine_updateDiscreteValue(form, vid, o.id, o.vt, chk, o.valueRequired);
        }
    }
    return b;
}

function P_addV(v, d) {
    var o = this;
    if (o.vl == null) {
        o.vl = new Array;
        if (d) {
            o.dl = new Array;
        }
    }
    var len = o.vl.length;
    o.vl[len] = v;
    if (o.dl) {
        o.dl[len] = d;
    }
}

function P_findBatch(wty, tv) {
    if (!tv) {
        return (-1);
    }
    var o = this;
    var vl = o.vl;
    if (wty) {
        var lov = o.lov[wty];
        if (lov && lov.vl) {
            vl = lov.vl;
        }
    }
    if (vl) {
        for (var i in vl) {
            var v = vl[i];
            if (v && v == tv) {
                return (Math.floor(i / _pe._lovBS));
            }
        }
    }
    return (-1);
}

function P_updateLOVNB(wty, b) {
    var o = this;
    var pid = o.id;
    var nav = document.getElementById(pid + wty + "Batch");
    if (!nav) {
        return;
    }
    var lov = o.lov[wty];
    if (b) {
        var opts = nav.options;
        opts.length = 0;
        var vl = o.vl, i = 0;
        if (lov.vl) {
            vl = lov.vl;
        }
        var len = Math.ceil(vl.length / _pe._lovBS);
        while (i < len) {
            var d = i + 1;
            if (lov.sidx == i) {
                d += "*";
            }
            opts[opts.length] = new Option(d, i, false, false);
            i++;
        }
    }
    if (lov.bidx >= 0) {
        nav.selectedIndex = lov.bidx;
    }
}

function P_updateLOV(wty, bi) {
    var o = this;
    var pid = o.id;
    var wid = pid + wty;
    var l = document.getElementById(wid);
    if (!l) {
        return;
    }
    var lov = o.lov[wty];
    var sel = null;
    var vl = o.vl;
    var dl = o.dl;
    var si = -1;
    if (lov) {
        sel = lov.sel;
        if (lov.vl) {
            vl = lov.vl;
            dl = lov.dl;
        }
    }
    var lbCtl = PE_getLB(l);
    if (bi) {
        lbCtl.add("", "...");
    }
    var sidx = lov.sidx;
    if (lov.bidx < 0) {
        lov.sidx = o.findBatch(wty, sel);
        if (lov.sidx >= 0) {
            lov.bidx = lov.sidx;
        } else {
            lov.bidx = 0;
        }
        sidx = -2;
    }
    var bidx = lov.bidx;
    var i = bidx * _pe._lovBS, len = vl.length, j = 0;
    while (i < len) {
        if (j >= _pe._lovBS) {
            break;
        }
        var v = vl[i];
        var d = null;
        if (dl) {
            d = dl[i];
            if (d == "") {
                d = v;
            } else {
                if (o.dop == 0) {
                    d = v + PE_VALUE_DESC_SEPARATOR + d;
                }
            }
        } else {
            d = v;
        }
        if (sel && sel == v) {
            si = j;
            o.sidx = bidx;
        }
        lbCtl.add(v, d);
        i++;
        j++;
    }
    lbCtl.update();
    l = document.getElementById(wid);
    if (si != -1) {
        if (bi) {
            si++;
        }
        l.selectedIndex = si;
    }
    o.updateLOVNB(wty, sidx != lov.sidx);
}

function P_getDesc(v) {
    if (!v) {
        return null;
    }
    var o = this;
    var vl = o.vl;
    var dl = o.dl;
    if (!dl) {
        return null;
    }
    var j = -1;
    for (var i in vl) {
        if (vl[i] == v) {
            j = i;
            break;
        }
    }
    if (j >= 0) {
        return dl[j];
    }
    return null;
}

function P_updateSLOV() {
    var o = this;
    var pid = o.id;
    var lyr = document.getElementById(pid + "ListBox");
    if (!lyr) {
        return;
    }
    var sel = o.sl;
    if (typeof (sel) != "object") {
        return;
    }
    var lbCtl = PE_getLB(lyr);
    var vl = o.vl;
    var dl = o.dl;
    for (var i in sel) {
        var v = sel[i];
        if (typeof (v) == "string") {
            var d = o.getDesc(v);
            var txt;
            if (d && d != "") {
                if (o.dop) {
                    txt = d;
                } else {
                    txt = v + PE_VALUE_DESC_SEPARATOR + d;
                }
            } else {
                txt = v;
            }
            lbCtl.add(v, txt, false);
        } else {
            var lo = v.l;
            var up = v.u;
            var lt = v.lt;
            var ut = v.ut;
            var val = null;
            var txt = null;
            if (lt == 0 || lt == 1) {
                val = "(";
                txt = "(";
            } else {
                val = "[";
                txt = "[";
            }
            if (lt) {
                val += lo;
                var d = o.getDesc(lo);
                if (d && d != "") {
                    if (o.dop) {
                        txt += d;
                    } else {
                        txt += lo + PE_VALUE_DESC_SEPARATOR + d;
                    }
                } else {
                    txt += lo;
                }
            }
            val += "_crRANGE_";
            txt += "  ..  ";
            if (ut) {
                val += up;
                var d = o.getDesc(up);
                if (d && d != "") {
                    if (o.dop) {
                        txt += d;
                    } else {
                        txt += up + PE_VALUE_DESC_SEPARATOR + d;
                    }
                } else {
                    txt += up;
                }
            }
            if (ut == 0 || ut == 1) {
                val += ")";
                txt += ")";
            } else {
                val += "]";
                txt += "]";
            }
            lbCtl.add(val, txt, false);
        }
    }
    lbCtl.update();
}

function P_update(wty) {
    var o = this;
    if (wty) {
        if (wty == "AvailableList") {
            o.updateLOV(wty);
        } else {
            if (wty == "ListBox") {
                o.updateSLOV();
            } else {
                o.updateLOV(wty, true);
            }
        }
    } else {
        o.updateLOV("SelectValue", true);
        o.updateLOV("AvailableList");
        o.updateLOV("SelectLowerRangeValue", true);
        o.updateLOV("SelectUpperRangeValue", true);
        o.updateSLOV();
    }
}

function P_setLOV(vl, dl) {
    var o = this;
    o.vl = vl;
    if (vl) {
        if (!dl || vl.length != dl.length) {
            o.dl = null;
        } else {
            o.dl = dl;
        }
    } else {
        o.dl = null;
    }
}

function P_setInitSel(sel) {
    var o = this;
    var lov = o.lov["SelectValue"];
    lov.sel = sel;
}

function P_setInitSelList(sl) {
    this.sl = sl;
}

function P_setInitBound(lo, up) {
    var o = this;
    var loB = o.lov["SelectLowerRangeValue"];
    loB.sel = lo;
    var upB = o.lov["SelectUpperRangeValue"];
    upB.sel = up;
}

function P_back(wty) {
    var o = this;
    var lov = o.lov[wty];
    if (!lov) {
        return;
    }
    var bidx = lov.bidx;
    if (bidx > 0) {
        bidx--;
        if (bidx < 0) {
            bidx = 0;
        }
        lov.bidx = bidx;
        o.update(wty);
    }
}

function P_next(wty) {
    var o = this;
    var lov = o.lov[wty];
    if (!lov) {
        return;
    }
    var len = ((lov.vl) ? lov.vl.length : o.vl.length);
    var bidx = lov.bidx;
    if ((bidx + 1) * _pe._lovBS < len) {
        lov.bidx = bidx + 1;
        o.update(wty);
    }
}

function newLOV() {
    var o = new Object;
    o.bidx = -1;
    o.sidx = -1;
    o.sel = null;
    o.filter = null;
    o.vl = null;
    o.dl = null;
    return o;
}

function newP(units, uid, id, vt, mul, di, rn, dop, readonly, valueRequired) {
    var o = new Object;
    o.id = id;
    o.vt = vt;
    o.mul = mul;
    o.di = di;
    o.rn = rn;
    o.dop = dop;
    o.readonly = readonly;
    o.valueRequired = valueRequired;
    o.units = units;
    o.uid = uid;
    o.lov = new Array;
    o.lov["SelectValue"] = newLOV();
    o.lov["AvailableList"] = newLOV();
    o.lov["SelectLowerRangeValue"] = newLOV();
    o.lov["SelectUpperRangeValue"] = newLOV();
    o.vl = null;
    o.dl = null;
    o.sl = null;
    o.addV = P_addV;
    o.update = P_update;
    o.setLOV = P_setLOV;
    o.updateLOV = P_updateLOV;
    o.updateSLOV = P_updateSLOV;
    o.updateLOVNB = P_updateLOVNB;
    o.getDesc = P_getDesc;
    o.findBatch = P_findBatch;
    o.back = P_back;
    o.next = P_next;
    o.showFilter = P_showFilter;
    o.applyFilter = P_applyFilter;
    o.setInitSel = P_setInitSel;
    o.setInitBound = P_setInitBound;
    o.setInitSelList = P_setInitSelList;
    o.updateForm = P_updateForm;
    _pe._prompts[id] = o;
    if (units) {
        units.addP(o);
    }
    return o;
}

function P_navigateCB(fid, pid, wty, cmd) {
    var o = _pe._prompts[pid];
    if (!o) {
        return;
    }
    if (cmd == "p") {
        o.back(wty);
    } else {
        if (cmd == "n") {
            o.next(wty);
        }
    }
}

function P_selectCB(form, pid, wty, dty) {
    var o = _pe._prompts[pid];
    if (!o) {
        return;
    }
    var did = pid + dty;
    var wid = pid + wty;
    promptengine_selectValue(form, wid, did);
    var lov = o.lov[wty];
    lov.sel = document.getElementById(did).value;
    if (!lov.sel || lov.sel == "") {
        lov.sidx = -1;
        lov.sel = null;
    } else {
        if (lov.sidx != lov.bidx) {
            lov.sidx = lov.bidx;
        }
    }
    o.updateLOVNB(wty, true);
}

function P_batchCB(fid, pid, wty) {
    var o = _pe._prompts[pid];
    var el = document.getElementById(pid + wty + "Batch");
    if (!o || !el) {
        return;
    }
    var i = el.selectedIndex;
    if (i >= 0) {
        var lov = o.lov[wty];
        if (!lov) {
            return;
        }
        lov.bidx = i;
        o.update(wty);
    }
}

function P_applyFilter(wty, filter) {
    if (filter == null) {
        return;
    }
    var o = this;
    var vl = o.vl;
    var dl = o.dl;
    if (!vl || vl.constructor != Array || vl.length == 0) {
        return;
    }
    var dlExists = true;
    if (!dl || dl.constructor != Array) {
        dlExists = false;
    }
    var lov = o.lov[wty];
    if (!lov) {
        return;
    }
    var oldfilter = lov.filter;
    if (!oldfilter) {
        oldfilter = "";
    }
    if (filter == oldfilter) {
        return;
    }
    var wvl = null;
    var wdl = null;
    if (filter == "") {
        filter = null;
    } else {
        wvl = [];
        if (dlExists) {
            wdl = [];
        }
        filter = filter.replace(String.fromCharCode(160), " ");
        var j = 0;
        for (var i = 0, len = vl.length; i < len; i++) {
            var value = vl[i];
            var desc = (dlExists ? dl[i] : "");
            var stringToSearch = "";
            if (o.dop == 1) {
                if (desc == "") {
                    stringToSearch = value;
                } else {
                    stringToSearch = desc;
                }
            } else {
                stringToSearch = value;
                if (desc != "") {
                    stringToSearch += PE_VALUE_DESC_SEPARATOR;
                    stringToSearch += desc;
                }
            }
            stringToSearch = stringToSearch.replace(String.fromCharCode(160), " ");
            if (stringToSearch && stringToSearch.toLowerCase().indexOf(filter.toLowerCase()) != -1) {
                wvl[j] = value;
                if (dlExists) {
                    wdl[j] = dl[i];
                }
                j++;
            }
        }
    }
    lov.filter = filter;
    lov.vl = wvl;
    lov.dl = wdl;
    lov.bidx = -1;
    lov.sidx = -1;
    o.updateLOV(wty, true);
}

function P_promptFilter(pid, wty, e) {
    var o = _pe._prompts[pid];
    if (!o) {
        return;
    }
    var vl = o.vl;
    var dl = o.dl;
    if (!vl || vl.length == 0) {
        return;
    }
    var lov = o.lov[wty];
    if (!lov) {
        return;
    }
    var filter = lov.filter;
    if (!filter) {
        filter = "";
    }
    var filterIcon = e.target ? e.target : e.srcElement;
    var pos = _findPos(filterIcon);
    var x = pos.x + filterIcon.offsetWidth;
    var y = pos.y + filterIcon.offsetHeight;
    o.showFilter(wty, filter, x, y);
}

function P_promptClearFilter(pid, wty, e) {
    var o = _pe._prompts[pid];
    if (!o) {
        return;
    }
    if (o.filterDlg) {
        o.filterDlg.setValue("");
        o.applyFilter(wty, "");
    }
}

function P_showFilter(wty, v, x, y) {
    var o = this;
    if (!o.filterDlg) {
        o.filterDlg = newFilterDlg(o.id);
    }
    var dlg = o.filterDlg;
    dlg.wty = wty;
    dlg.setValue(v);
    dlg.show(true);
    dlg.initDlg(x, y);
}

function _findPos(el, relTo) {
    var relTo = relTo ? relTo : null;
    var posX = 0;
    var posY = 0;
    while (el.parentNode || el.offsetParent) {
        if (el.offsetParent) {
            posX += el.offsetLeft;
            posY += el.offsetTop;
            el = el.offsetParent;
        } else {
            if (el.parentNode) {
                if (el.style) {
                    if (el.style.left) {
                        posX += el.style.left;
                    }
                    if (el.style.top) {
                        posY += el.style.top;
                    }
                }
                el = el.parentNode;
            } else {
                break;
            }
        }
    }
    if (relTo) {
        relToCord = getPos2(relTo);
        posX -= relToCord.x;
        posY -= relToCord.y;
    }
    return {x: posX, y: posY};
}

function FilterDlg_okCB(dlgID) {
    var dlg = this;
    if (dlgID) {
        dlg = _getWidget(_getLayer(dlgID));
    }
    if (dlg) {
        var o = _pe._prompts[dlg.promptid];
        var filter = dlg.getValue();
        dlg.show(false);
        o.applyFilter(dlg.wty, filter);
    }
}

function FilterDlg_cancelCB(dlgID) {
    var dlg = this;
    if (dlgID) {
        dlg = _getWidget(_getLayer(dlgID));
    }
    if (dlg) {
        dlg.show(false);
    }
}

function FilterDlg_enterCB() {
}

function newFilterDlg(pid) {
    var buttonsWidth = 60;
    var buttonsHeight = 52;
    var dlgWidth = 300;
    var dlgHeight = 100;
    var textWidth = 0.9 * dlgWidth;
    var dlgID = "filterDlg" + pid;
    var o = newDlgBox(dlgID, L_SetFilter, dlgWidth, dlgHeight, FilterDlg_okCB, FilterDlg_cancelCB, false);
    o.promptid = pid;
    o.setValue = FilterDlg_setValue;
    o.getValue = FilterDlg_getValue;
    o.initDlg = FilterDlg_initDlg;
    var okButton = newBtn(dlgID + "_okBtn", L_OK, "FilterDlg_okCB('" + dlgID + "')", buttonsWidth, "OK", "OK", 0, 0);
    var cancelButton = newBtn(dlgID + "_cancelBtn", L_Cancel, "FilterDlg_cancelCB('" + dlgID + "')", buttonsWidth, "Cancel", "Cancel", 0, 0);
    var textField = newTextField(dlgID + "_textFld", null, null, null, FilterDlg_enterCB, true, null, textWidth);
    _targetApp(o.beginHTML() + '<table cellspacing="0" cellpadding="5" border="0"><tbody>' + "<tr>" + "<td>" + '<table cellspacing="0" cellpadding="0" border="0"><tbody>' + "<tr>" + '<td><div style="overflow:auto">' + textField.getHTML() + "</div></td>" + "</tr>" + "</tbody></table>" + "</td>" + "</tr>" + "<tr>" + '<td align="center" valign="right">' + "</td>" + "</tr>" + "<tr>" + '<td align="right" valign="center">' + '<table cellspacing="0" cellpadding="0" border="0"><tbody><tr>' + "<td>" + okButton.getHTML() + "</td>" + "<td>" + _getSpace(5, 1) + "</td>" + "<td>" + cancelButton.getHTML() + "</td>" + "</tr></tbody></table>" + "</td>" + "</tr>" + "</table>" + o.endHTML());
    o.init();
    okButton.init();
    cancelButton.init();
    textField.init();
    o.textField = textField;
    return o;
}

function FilterDlg_setValue(v) {
    var o = this;
    o.textField.setValue(v);
}

function FilterDlg_getValue() {
    var o = this;
    if (o.textField) {
        return o.textField.getValue();
    }
    return null;
}

function FilterDlg_initDlg(x, y) {
    var o = this;
    if (x + o.getWidth() > _winWidth() + _getScrollX()) {
        x = Math.max(0, _winWidth() + _getScrollX() - o.getWidth() - 10);
    }
    if (y + o.getHeight() > _winHeight() + _getScrollY()) {
        y = Math.max(0, _winHeight() + getScrollY() - o.getHeight() - 10);
    }
    o.move(x, y);
    o.placeIframe(true, true);
    var f = o.textField;
    f.select();
    f.focus();
}

function newCtl(id) {
    var o = new Object;
    o.id = id;
    o.layer = null;
    o.css = null;
    o.getHTML = Ctl_getHTML;
    o.beginHTML = Ctl_getHTML;
    o.endHTML = Ctl_getHTML;
    o.write = Ctl_write;
    o.begin = Ctl_begin;
    o.end = Ctl_end;
    o.init = Ctl_init;
    o.move = Ctl_move;
    o.resize = Ctl_resize;
    o.setBgColor = Ctl_setBgColor;
    o.show = Ctl_show;
    o.getWidth = Ctl_getWidth;
    o.getHeight = Ctl_getHeight;
    o.setHTML = Ctl_setHTML;
    o.setDisabled = Ctl_setDisabled;
    o.focus = Ctl_focus;
    o.setDisplay = Ctl_setDisplay;
    o.isDisplayed = Ctl_isDisplayed;
    o.setTooltip = Ctl_setTooltip;
    o.initialized = Ctl_initialized;
    o.widx = _pe._widgets.length;
    _pe._widgets[o.widx] = o;
    return o;
}

function Ctl_getHTML() {
    return "";
}

function Ctl_write(i) {
    var txt = this.getHTML(i);
    if (parent.writeSource) {
        parent.writeSource(txt);
    }
    document.write(txt);
}

function Ctl_begin() {
    document.write(this.beginHTML());
}

function Ctl_end() {
    document.write(this.endHTML());
}

function Ctl_init() {
    var o = this;
    o.layer = _getLayer(o.id);
    o.css = o.layer.style;
    o.layer._widget = o.widx;
    if (o.initialHTML) {
        o.setHTML(o.initialHTML);
    }
}

function Ctl_move(x, y) {
    c = this.css;
    if (x != null) {
        if (_pe._moz) {
            c.left = "" + x + "px";
        } else {
            c.pixelLeft = x;
        }
    }
    if (y != null) {
        if (_pe._moz) {
            c.top = "" + y + "px";
        } else {
            c.pixelTop = y;
        }
    }
}

function Ctl_focus() {
    _safeSetFocus(this.layer);
}

function Ctl_setBgColor(c) {
    this.css.backgroundColor = c;
}

function Ctl_show(show) {
    this.css.visibility = show ? _pe._show : _pe._hide;
}

function Ctl_getWidth() {
    return this.layer.offsetWidth;
}

function Ctl_getHeight() {
    return this.layer.offsetHeight;
}

function Ctl_setHTML(s) {
    var o = this;
    if (o.layer) {
        o.layer.innerHTML = s;
    } else {
        o.initialHTML = s;
    }
}

function Ctl_setDisplay(d) {
    this.css.display = d ? "" : "none";
}

function Ctl_isDisplayed() {
    if (this.css.display == "none") {
        return false;
    } else {
        return true;
    }
}

function Ctl_setDisabled(d) {
    if (this.layer) {
        this.layer.disabled = d;
    }
}

function Ctl_resize(w, h) {
    if (w != null) {
        this.css.width = "" + (Math.max(0, w)) + "px";
    }
    if (h != null) {
        this.css.height = "" + (Math.max(0, h)) + "px";
    }
}

function Ctl_setTooltip(tooltip) {
    this.layer.title = tooltip;
}

function Ctl_initialized() {
    return this.layer != null;
}

function PE_beginBlocking() {
    var w = newBlockWidget();
    w.show(true);
}

function PE_endBlocking() {
    var lyr = _getLayer(_BlockWaitWidgetID);
    if (lyr) {
        lyr.style.display = "none";
    }
}

function newBlockWidget() {
    if (window._PEBlockWidget != null) {
        return window._PEBlockWidget;
    }
    var o = newCtl(_BlockWaitWidgetID);
    o.getPrivateHTML = BlockWidget_getPrivateHTML;
    o.init = BlockWidget_init;
    o.show = BlockWidget_show;
    window._PEBlockWidget = o;
    return o;
}

function BlockWidget_init() {
}

function BlockWidget_getPrivateHTML() {
    return '<div id="' + this.id + '" onselectstart="return false" ondragstart="return false" onmousedown="' + '_eventCancelBubble(event)" border="0" hspace="0" vspace="0"  style="background-image:url(\'' + _pe._images + 'transp.gif\')";z-index:6000;cursor:wait;position:absolute;top:0px;left:0px;width:100%;height:100%"></div>';
}

function BlockWidget_show(show) {
    var o = this;
    if (o.layer == null) {
        o.layer = _getLayer(o.id);
        if (o.layer == null) {
            _targetApp(o.getPrivateHTML());
            o.layer = _getLayer(o.id);
            o.css = o.layer.style;
        } else {
            o.css = o.layer.style;
        }
    }
    o.setDisplay(show);
}

function newBtn(id, label, cb, width, hlp, tooltip, tabIndex, margin, url, w, h, dx, dy, imgRight, disDx, disDy) {
    var o = newCtl(id);
    o.label = label;
    o.cb = cb;
    o.width = width;
    o.hlp = hlp;
    o.tooltip = tooltip;
    o.tabIndex = tabIndex;
    o.isGray = false;
    o.txt = null;
    o.icn = null;
    o.margin = margin ? margin : 0;
    o.extraStyle = "";
    if (url) {
        o.url = url;
        o.w = w;
        o.h = h;
        o.dx = dx;
        o.dy = dy;
        o.disDx = (disDx != null) ? disDx : dx;
        o.disDy = (disDy != null) ? disDy : dy;
        o.imgRight = imgRight ? true : false;
    }
    o.getHTML = Btn_getHTML;
    o.setDisabled = Btn_setDisabled;
    o.setText = Btn_setText;
    o.changeImg = Btn_changeImg;
    o.oldInit = o.init;
    o.init = Btn_init;
    o.isDisabled = Btn_isDisabled;
    o.instIndex = Btn_currInst;
    Btn_inst[Btn_currInst++] = o;
    return o;
}

Btn_inst = new Array;
Btn_currInst = 0;

function Btn_getHTML() {
    with (this) {
        var clk = "Btn_clickCB(" + this.instIndex + ');return false;"';
        var clcbs = 'onclick="' + clk + '" ';
        if (_pe._ie) {
            clcbs += 'ondblclick="' + clk + '" ';
        }
        var url1 = _pe._images + "button.gif",
            addPar = ' style="' + extraStyle + "cursor:" + _pe._hand + ";margin-left:" + margin + "px; margin-right:" + margin + 'px; "' + clcbs + " ",
            tip = _attr("title", tooltip), idText = "theBttn" + id, bg = _backImgOffset(url1, 0, 42),
            idIcon = "theBttnIcon" + id;
        var lnkB = "<a " + _attr("id", idText) + " " + tip + " " + _attr("tabindex", tabIndex) + ' href="javascript:void(0)" class="wizbutton">';
        var l = (label != null);
        var im = (this.url ? ('<td align="' + (l ? (this.imgRight ? "right" : "left") : "center") + '" style="' + bg + '" width="' + (!l && (width != null) ? width + 6 : w + 6) + '">' + (l ? "" : lnkB) + _simpleImgOffset(url, w, h, this.isGray ? disDs : dx, this.isGray ? disDy : dy, idIcon, null, (l ? "" : tooltip), "cursor:" + _pe._hand) + (l ? "" : "</a>") + "</td>") : "");
        return "<table " + _attr("id", id) + " " + addPar + ' border="0" cellspacing="0" cellpadding="0"><tr valign="middle">' + '<td width="5">' + _simpleImgOffset(url1, 5, 21, 0, 0) + "</td>" + (this.imgRight ? "" : im) + (l ? ("<td " + _attr("width", width) + ' align="center" class="' + (this.isGray ? "wizbuttongray" : "wizbutton") + '" style="padding-left:3px;padding-right:3px;' + bg + '"><nobr>' + lnkB + label + "</a></nobr></td>") : "") + (this.imgRight ? im : "") + '<td width="5">' + _simpleImgOffset(url1, 5, 21, 0, 21) + "</td></tr></table>";
    }
}

function Btn_setDisabled(d) {
    var o = this, newCur = d ? "default" : _pe._hand;
    o.isGray = d;
    if (o.layer) {
        o.txt.className = d ? "wizbuttongray" : "wizbutton";
        o.txt.style.cursor = newCur;
        o.css.cursor = newCur;
        if (o.icn) {
            _changeSimpleOffset(o.icn, o.isGray ? o.disDx : o.dx, o.isGray ? o.disDy : o.dy);
            o.icn.style.cursor = newCur;
        }
    }
}

function Btn_isDisabled() {
    return this.isGray;
}

function Btn_setText(str) {
    this.txt.innerHTML = convStr(str);
}

function Btn_init() {
    var o = this;
    o.oldInit();
    o.txt = _getLayer("theBttn" + this.id);
    o.icn = _getLayer("theBttnIcon" + this.id);
    var className = o.isGray ? "wizbuttongray" : "wizbutton";
    if (o.txt.className != className) {
        o.txt.className = className;
    }
}

function Btn_changeImg(dx, dy, disDx, disDy, url, tooltip) {
    var o = this;
    if (url) {
        o.url = url;
    }
    if (dx != null) {
        o.dx = dx;
    }
    if (dy != null) {
        o.dy = dy;
    }
    if (disDx != null) {
        o.disDx = disDx;
    }
    if (disDy != null) {
        o.disDy = disDy;
    }
    if (tooltip != null) {
        o.tooltip = tooltip;
    }
    if (o.icn) {
        _changeSimpleOffset(o.icn, o.isGray ? o.disDx : o.dx, o.isGray ? o.disDy : o.dy, o.url, o.tooltip);
    }
}

function Btn_clickCB(index) {
    var btn = Btn_inst[index];
    if (btn && !btn.isGray) {
        setTimeout("Btn_delayClickCB(" + index + ")", 1);
    }
}

function Btn_delayClickCB(index) {
    var btn = Btn_inst[index];
    if (btn.cb) {
        if (typeof btn.cb != "string") {
            btn.cb();
        } else {
            eval(btn.cb);
        }
    }
}

function newTextField(id, changeCB, maxChar, keyUpCB, enterCB, noMargin, tooltip, width, focusCB, blurCB) {
    var o = newCtl(id);
    o.tooltip = tooltip;
    o.changeCB = changeCB;
    o.maxChar = maxChar;
    o.keyUpCB = keyUpCB;
    o.enterCB = enterCB;
    o.noMargin = noMargin;
    o.width = width == null ? null : "" + width + "px";
    o.focusCB = focusCB;
    o.blurCB = blurCB;
    o.getHTML = TextField_getHTML;
    o.getValue = TextField_getValue;
    o.setValue = TextField_setValue;
    o.intValue = TextField_intValue;
    o.intPosValue = TextField_intPosValue;
    o.select = TextField_select;
    o.beforeChange = null;
    o.wInit = o.init;
    o.init = TextField_init;
    o.oldValue = "";
    return o;
}

function TextField_init() {
    var o = this;
    o.wInit();
    o.layer.value = "" + o.oldValue;
}

function TextField_getHTML() {
    return '<input oncontextmenu="event.cancelBubble=true;return true" style="' + _sty("width", this.width) + (_pe._moz ? "padding-left:3px;padding-right:3px;" : "") + "margin-left:" + (this.noMargin ? 0 : 10) + 'px" onfocus="' + 'TextField_focus(this)" onblur="' + 'TextField_blur(this)" onchange="' + 'TextField_changeCB(event,this)" onkeyup="' + 'TextField_keyUpCB(event,this);return true" type="text" ' + _attr("maxLength", this.maxChar) + ' ondragstart="event.cancelBubble=true;return true" onselectstart="event.cancelBubble=true;return true" class="textinputs" id="' + this.id + '" name="' + this.id + '"' + _attr("title", this.tooltip) + ' value="">';
}

function TextField_getValue() {
    return this.layer.value;
}

function TextField_setValue(s) {
    if (this.layer) {
        this.layer.value = "" + s;
    } else {
        this.oldValue = s;
    }
}

function TextField_changeCB(e, l) {
    var o = _getWidget(l);
    if (o.beforeChange) {
        o.beforeChange();
    }
    if (o.changeCB) {
        o.changeCB(e);
    }
}

function TextField_keyUpCB(e, l) {
    var o = _getWidget(l);
    if (_eventGetKey(e) == 13) {
        if (o.beforeChange) {
            o.beforeChange();
        }
        if (o.enterCB) {
            o.enterCB(e);
        }
        return false;
    } else {
        if (o.keyUpCB) {
            o.keyUpCB(e);
            return true;
        }
    }
}

function TextField_focus(l) {
    var o = _getWidget(l);
    if (o.focusCB) {
        o.focusCB();
    }
}

function TextField_blur(l) {
    var o = _getWidget(l);
    if (o.beforeChange) {
        o.beforeChange();
    }
    if (o.blurCB) {
        o.blurCB();
    }
}

function TextField_intValue(nanValue) {
    var n = parseInt(this.getValue());
    return isNaN(n) ? nanValue : n;
}

function TextField_intPosValue(nanValue) {
    var n = this.intValue(nanValue);
    return (n < 0) ? nanValue : n;
}

function TextField_select() {
    this.layer.select();
}

function newDlgBox(id, title, width, height, defaultCB, cancelCB, noCloseButton) {
    var o = newCtl(id);
    o.title = title;
    o.width = width;
    o.height = height;
    o.defaultCB = defaultCB;
    o.cancelCB = cancelCB;
    o.noCloseButton = noCloseButton ? noCloseButton : false;
    o.resizeable = false;
    o.oldKeyPress = null;
    o.oldMouseDown = null;
    o.oldCurrent = null;
    o.modal = null;
    o.hiddenVis = new Array;
    o.lastLink = null;
    o.firstLink = null;
    o.titleLayer = null;
    o.oldInit = o.init;
    o.oldShow = o.show;
    o.init = DlgBox_init;
    o.setResize = DlgBox_setResize;
    o.beginHTML = DlgBox_beginHTML;
    o.endHTML = DlgBox_endHTML;
    o.show = DlgBox_Show;
    o.center = DlgBox_center;
    o.focus = DlgBox_focus;
    o.setTitle = DlgBox_setTitle;
    o.getContainerWidth = DlgBox_getContainerWidth;
    o.getContainerHeight = DlgBox_getContainerHeight;
    _pe.DlgBox_instances[id] = o;
    o.modal = newCtl("modal_" + id);
    o.placeIframe = DlgBox_placeIframe;
    o.oldResize = o.resize;
    o.resize = DlgBox_resize;
    return o;
}

function DlgBox_setResize(resizeCB, minWidth, minHeight, noResizeW, noResizeH) {
    var o = this;
    o.resizeable = true;
    o.resizeCB = resizeCB;
    o.minWidth = minWidth ? minWidth : 50;
    o.minHeight = minHeight ? minHeight : 50;
    o.noResizeW = noResizeW;
    o.noResizeH = noResizeH;
}

function DlgBox_setTitle(title) {
    var o = this;
    o.title = title;
    if (o.titleLayer == null) {
        o.titleLayer = _getLayer("titledialog_" + this.id);
    }
    o.titleLayer.innerHTML = _convStr(title);
}

function DlgBox_setCloseIcon(lyr, isActive) {
    _changeOffset(lyr, 0, (isActive == 1 ? 0 : 18));
}

function DlgBox_beginHTML() {
    with (this) {
        var moveableCb = ' onselectstart="return false" ondragstart="return false" onmousedown="' + "DlgBox_down(event,'" + id + "',this,false);return false;\" ";
        var mdl = _pe._ie ? ('<img onselectstart="return false" ondragstart="return false" onmousedown="' + '_eventCancelBubble(event)" border="0" hspace="0" vspace="0" src="' + _pe._images + 'transp.gif" id="modal_' + id + '" style="display:none;position:absolute;top:0px;left:0px;width:1px;height:1px">') : ('<div onselectstart="return false" ondragstart="return false" onmousedown="' + '_eventCancelBubble(event)" border="0" hspace="0" vspace="0" src="' + _pe._images + 'transp.gif" id="modal_' + id + '" style="position:absolute;top:0px;left:0px;width:1px;height:1px"></div>');
        var titleBG = "background-image:url('" + _pe._images + "dialogtitle.gif')";
        return mdl + '<a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="firstLink_' + this.id + '" href="javascript:void(0)" onfocus="' + "DlgBox_keepFocus('" + this.id + "');return false;\" ></a>" + _getBGIframe("dlgIF_" + id) + '<table  border="0" cellspacing="0" cellpadding="2" id="' + id + '" class="dialogbox" style="display:none;padding:0px;visibility:' + _pe._hide + ";position:absolute;top:-2000px;left:-2000px;" + _sty("width", width ? ("" + width + "px") : null) + _sty("height", height ? ("" + height + "px") : null) + '"><tr><td id="dlgFirstTr_' + id + '" valign="top">' + '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr valign="top">' + "<td " + moveableCb + ' style="cursor:move;' + titleBG + '" class="titlezone">' + _getSpace(5, 18) + "</td>" + "<td " + moveableCb + ' style="cursor:move;' + titleBG + '" class="titlezone" width="100%" valign="middle" align="left"><nobr><span id="titledialog_' + id + '" tabIndex="0" class="titlezone">' + _convStr(title) + "</span></nobr></td>" + '<td class="titlezone" style="' + titleBG + '">' + (noCloseButton ? "" : '<a href="javascript:void(0)" onclick="' + "DlgBox_close('" + id + '\');return false;" title="' + L_closeDialog + '">' + _imgOffset(_pe._images + "dialogelements.gif", 18, 18, 0, 18, "dialogClose_" + this.id, 'onmouseover="' + 'DlgBox_setCloseIcon(this,1)" onmouseout="' + 'DlgBox_setCloseIcon(this,0)" ', L_closeDialog, "cursor:" + _pe._hand) + "</a>") + "</td>" + '</tr></table></td></tr><tr valign="top" height="100%"><td id="dlgSecTr_' + id + '" >';
    }
}

function DlgBox_endHTML() {
    var moveableCb = ' onselectstart="return false" ondragstart="return false" onmousedown="' + "DlgBox_down(event,'" + this.id + "',this,true);return false;\" ";
    var resz = this.resizeable ? ('<tr  onselectstart="return false" height="18" valign="bottom" align="right"><td>' + _img(_pe._images + "resize.gif", 14, 14, null, moveableCb + ' style="cursor:NW-resize" ') + "</td></tr>") : "";
    return "</td></tr>" + resz + '</table><a style="position:absolute;left:-30px;top:-30px; visibility:hidden" id="lastLink_' + this.id + '" href="javascript:void(0)" onfocus="' + "DlgBox_keepFocus('" + this.id + "');return false;\" ></a>";
}

function DlgBox_getContainerWidth() {
    var o = this;
    return o.width - (2 + 2);
}

function DlgBox_getContainerHeight() {
    var o = this;
    return o.height - (2 + 18 + 2 + 2 + 2);
}

function DlgBox_close(id) {
    var o = _pe.DlgBox_instances[id];
    if (o) {
        o.show(false);
        if (o.cancelCB != null) {
            o.cancelCB();
        }
    }
}

function DlgBox_resizeIframeCB(id) {
    _pe.DlgBox_instances[id].placeIframe(true, false);
}

function DlgBox_placeIframe(bResize, bMove) {
    var o = this;
    if (o.iframe) {
        if (bResize) {
            o.iframe.resize(o.getWidth(), o.getHeight());
        }
        if (bMove) {
            o.iframe.move(o.layer.offsetLeft, o.layer.offsetTop);
        }
    }
}

function DlgBox_resize(w, h) {
    var o = this;
    o.oldResize(w, h);
    if (o.iframe) {
        o.iframe.resize(w, h);
        if (o.firstTR) {
            if (w != null) {
                o.firstTR.style.width = w - 4;
            }
            if (h != null) {
                o.secondTR.style.height = h - 44;
            }
        }
    }
}

function DlgBox_init() {
    if (this.layer != null) {
        return;
    }
    var o = this;
    o.oldInit();
    o.modal.init();
    o.lastLink = newCtl("lastLink_" + o.id);
    o.firstLink = newCtl("firstLink_" + o.id);
    o.lastLink.init();
    o.firstLink.init();
    if (!o.noCloseButton) {
        o.closeButton = _getLayer("dialogClose_" + o.id);
        DlgBox_setCloseIcon(o.closeButton, false);
    }
    if (_pe._moz && !_pe._saf) {
        o.firstTR = _getLayer("dlgFirstTr_" + o.id);
        o.secondTR = _getLayer("dlgSecTr_" + o.id);
    }
    o.iframe = newCtl("dlgIF_" + o.id);
    o.iframe.init();
}

function DlgBox_down(e, id, obj, isResize) {
    _pe._dlgResize = isResize;
    var o = _pe.DlgBox_instances[id], lyr = o.layer, mod = o.modal.layer;
    lyr.onmousemove = mod.onmousemove = eval("DlgBox_move");
    lyr.onmouseup = mod.onmouseup = eval("DlgBox_up");
    lyr.dlgStartPosx = mod.dlgStartPosx = parseInt(lyr.style.left);
    lyr.dlgStartPosy = mod.dlgStartPosy = parseInt(lyr.style.top);
    lyr.dlgStartx = mod.dlgStartx = _eventGetX(e);
    lyr.dlgStarty = mod.dlgStarty = _eventGetY(e);
    lyr.dlgStartw = mod.dlgStartw = o.getWidth();
    lyr.dlgStarth = mod.dlgStarth = o.getHeight();
    lyr._widget = mod._widget = o.widx;
    _pe._theLYR = lyr;
    _eventCancelBubble(e);
    if (lyr.setCapture) {
        lyr.setCapture(true);
    }
}

function DlgBox_move(e) {
    var o = _pe._theLYR, dlg = _getWidget(o);
    if (dlg) {
        if (_pe._dlgResize) {
            var newW = Math.max(dlg.minWidth, o.dlgStartw + _eventGetX(e) - o.dlgStartx);
            var newH = Math.max(dlg.minHeight, o.dlgStarth + _eventGetY(e) - o.dlgStarty);
            dlg.resize(dlg.noResizeW ? null : newW, dlg.noResizeH ? null : newH);
            if (dlg.firstTR) {
                if (!dlg.noResizeW) {
                    dlg.firstTR.style.width = newW - 4;
                }
                if (!dlg.noResizeH) {
                    dlg.secondTR.style.height = newH - 44;
                }
            }
            if (dlg.resizeCB) {
                dlg.resizeCB(newW, newH);
            }
        } else {
            var x = Math.max(0, o.dlgStartPosx - o.dlgStartx + _eventGetX(e));
            var y = Math.max(0, o.dlgStartPosy - o.dlgStarty + _eventGetY(e));
            x = Math.min(Math.max(10, _winWidth() - 10), x);
            y = Math.min(Math.max(10, _winHeight() - 18), y);
            dlg.iframe.move(x, y);
            dlg.move(x, y);
        }
    }
    _eventCancelBubble(e);
    return false;
}

function DlgBox_up(e) {
    var o = _getWidget(_pe._theLYR), lyr = o.layer, mod = o.modal.layer;
    lyr.onmousemove = mod.onmousemove = null;
    lyr.onmouseup = mod.onmouseup = null;
    if (lyr.releaseCapture) {
        lyr.releaseCapture();
    }
    _pe._theLYR = null;
}

function DlgBox_keypress(e) {
    var dlg = _pe.DlgBox_current;
    if (dlg != null) {
        switch (_eventGetKey(e)) {
            case 13:
                var sourceId = _pe._ie ? window.event.srcElement.id : e.target.id;
                if ((sourceId == "insRepText" || sourceId == "renRepText") && (dlg.defaultCB != null)) {
                    dlg.defaultCB();
                    return false;
                }
                if (dlg.yes && !dlg.no) {
                    dlg.defaultCB();
                    return false;
                }
                break;
            case 27:
                dlg.show(false);
                if (dlg.cancelCB != null) {
                    dlg.cancelCB();
                }
                return false;
                break;
            case 8:
                return _isTextInput(_pe._ie ? window.event : e);
                break;
        }
    }
}

function DlgBoxResizeModals(e) {
    for (var i in _pe.DlgBox_modals) {
        m_sty = _pe.DlgBox_modals[i];
        m_sty.width = _documentWidth();
        m_sty.height = _documentHeight();
    }
}

function DlgBox_center() {
    var o = this, scrY = _getScrollY(), scrX = _getScrollX();
    o.height = o.layer.offsetHeight;
    o.width = o.layer.offsetWidth;
    o.move(Math.max(0, scrX + (_winWidth() - o.width) / 2), Math.max(0, scrY + (_winHeight() - o.height) / 2));
    o.placeIframe(true, true);
}

function DlgBox_Show(sh) {
    with (this) {
        m_sty = modal.css;
        l_sty = css;
        if (sh) {
            oldCurrent = _pe.DlgBox_current;
            _pe.DlgBox_current = this;
            if (_pe._ie) {
                oldKeyPress = document.onkeydown;
                document.onkeydown = eval("window." + "DlgBox_keypress");
            } else {
                document.addEventListener("keydown", eval("window." + "DlgBox_keypress"), false);
            }
            oldMouseDown = document.onmousedown;
            document.onmousedown = null;
            _disableAllInputs();
        } else {
            _pe.DlgBox_current = oldCurrent;
            oldCurrent = null;
            if (_pe._ie) {
                document.onkeydown = oldKeyPress;
            } else {
                document.removeEventListener("keydown", eval("window." + "DlgBox_keypress"), false);
            }
            document.onmousedown = oldMouseDown;
            _restoreAllDisabledInputs();
        }
        var sameState = (layer.isShown == sh);
        if (sameState) {
            return;
        }
        layer.isShown = sh;
        if (sh) {
            if (window.DialogBoxWidget_zindex == null) {
                window.DialogBoxWidget_zindex = 1000;
            }
            this.iframe.css.zIndex = window.DialogBoxWidget_zindex++;
            m_sty.zIndex = window.DialogBoxWidget_zindex++;
            l_sty.zIndex = window.DialogBoxWidget_zindex++;
            _pe.DlgBox_modals[_pe.DlgBox_modals.length] = m_sty;
            m_sty.display = "";
            l_sty.display = "block";
            this.iframe.setDisplay(true);
            DlgBoxResizeModals();
            this.height = layer.offsetHeight;
            this.width = layer.offsetWidth;
            if (_isHidden(layer)) {
                this.center();
            }
            if (this.firstTR) {
                this.firstTR.style.width = this.getWidth() - 4;
                this.secondTR.style.height = this.getHeight() - 44;
            }
            if (this.resizeCB) {
                this.resizeCB(this.width, this.height);
            }
        } else {
            var l = _pe.DlgBox_modals.length = Math.max(0, _pe.DlgBox_modals.length - 1);
            m_sty.width = "1px";
            m_sty.height = "1px";
            m_sty.display = "none";
            l_sty.display = "none";
            move(-2000, -2000);
            this.iframe.setDisplay(false);
        }
        modal.show(sh);
        firstLink.show(sh);
        lastLink.show(sh);
        oldShow(sh);
        if (_pe.DlgBox_current != null && sh == true) {
            _pe.DlgBox_current.focus();
        }
    }
}

function DlgBox_keepFocus(id) {
    var o = _pe.DlgBox_instances[id];
    if (o) {
        o.focus();
    }
}

function DlgBox_focus() {
    with (this) {
        if (titleLayer == null) {
            titleLayer = _getLayer("titledialog_" + id);
        }
        if (titleLayer.focus) {
            titleLayer.focus();
        }
    }
}

var isJava = false;
var isNetscape = navigator.appName.indexOf("Netscape") != -1;
var LEFT_ARROW_KEY = 37;
var RIGHT_ARROW_KEY = 39;
var ENTER_KEY = 13;

function promptengine_encodePrompt(prompt) {
    if (isJava) {
        return encodeURIComponent(prompt);
    } else {
        return promptengine_urlEncode(prompt);
    }
}

function promptengine_addDiscreteValue(fid, type, pid) {
    var form = document.getElementById(fid);
    var sLyr = document.getElementById(pid + "DiscreteValue");
    var src = sLyr;
    var sLT = sLyr.type.toLowerCase();
    var fromLB = false;
    if (sLT != "text" && sLT != "hidden" && sLT != "password") {
        src = sLyr.options[sLyr.selectedIndex];
        fromLB = true;
    }
    var sval = src.value;
    if (!promptengine_checkValue(sval, type)) {
        _safeSetFocus(sLyr);
        return false;
    }
    var dLyr = document.getElementById(pid + "ListBox");
    PE_clearSel(dLyr);
    var si = promptengine_findOptionInList(dLyr, sval);
    if (si < 0) {
        si = dLyr.length;
        dLyr.options[si] = new Option(((src.text) ? src.text : sval), sval, false, false);
    }
    dLyr.options[si].selected = true;
    _safeSetFocus(sLyr);
    if (sLyr.select) {
        sLyr.select();
    }
    if (fromLB && sLyr.selectedIndex < sLyr.length - 1) {
        sLyr.selectedIndex = sLyr.selectedIndex + 1;
    }
}

function PE_clearSel(lb) {
    var i = 0, c = lb.length;
    if (lb.type == "select-one") {
        i = lb.selectedIndex;
        if (i < 0) {
            return;
        }
        c = i + 1;
    }
    while (i < c) {
        lb.options[i++].selected = false;
    }
}

function promptengine_addValueFromPickList(form, type, pid) {
    return PE_addValues(form, type, pid, false);
}

function promptengine_addAllValues(form, type, pid) {
    return PE_addValues(form, type, pid, true);
}

function PE_addValues(form, type, pid, all) {
    var alLyr = document.getElementById(pid + "AvailableList");
    var slLyr = document.getElementById(pid + "ListBox");
    var numOfAL = alLyr.length;
    if (numOfAL == 0) {
        return false;
    }
    var numOfSL = slLyr.length;
    var alOpts = alLyr.options;
    var slOpts = slLyr.options;
    var copyAL = new Array(numOfAL);
    var copySL = new Array(numOfSL);
    var redraw = false;
    var lastSI = -1;
    for (var i = 0; i < numOfAL; i++) {
        if (all || alOpts[i].selected) {
            var v = alOpts[i].value;
            var si = promptengine_findOptionInList(slLyr, v, alOpts[i].text);
            if (si < 0) {
                copyAL[i] = v;
            } else {
                copySL[si] = v;
            }
            redraw = true;
            if (!all) {
                lastSI = i;
            }
        }
    }
    if (!redraw) {
        return false;
    }
    var slCtl = PE_getLB(slLyr);
    for (var i = 0; i < numOfSL; i++) {
        var opt = slOpts[i];
        slCtl.add(opt.value, opt.text, copySL[i] != null);
    }
    var changed = false;
    for (var i = 0; i < numOfAL; i++) {
        if (copyAL[i]) {
            var opt = alOpts[i];
            slCtl.add(opt.value, opt.text, true);
            changed = true;
        }
    }
    slCtl.update();
    if (!all && lastSI >= 0 && lastSI + 1 < numOfAL) {
        PE_clearSel(alLyr);
        alOpts[lastSI + 1].selected = true;
    }
    return changed;
}

function promptengine_addRangeValue(form, type, promptID) {
    var lowerBoundPickList = document.getElementById(promptID + "SelectLowerRangeValue");
    var upperBoundPickList = document.getElementById(promptID + "SelectUpperRangeValue");
    lowerBound = document.getElementById(promptID + "LowerBound");
    upperBound = document.getElementById(promptID + "UpperBound");
    if (lowerBound.type.toLowerCase() != "text" && lowerBound.type.toLowerCase() != "hidden" && lowerBound.type.toLowerCase() != "password") {
        lowerBound = lowerBound.options[lowerBound.selectedIndex];
        upperBound = upperBound.options[upperBound.selectedIndex];
    }
    lowerUnBounded = document.getElementById(promptID + "NoLBoundCheck").checked;
    upperUnBounded = document.getElementById(promptID + "NoUBoundCheck").checked;
    lvalue = uvalue = "";
    if (!lowerUnBounded) {
        if (!promptengine_checkRangeBoundValue(lowerBound.value, type)) {
            if (lowerBound.focus && lowerBound.type.toLowerCase() != "hidden") {
                lowerBound.focus();
            }
            return false;
        }
        lvalue = lowerBound.value;
    }
    if (!upperUnBounded) {
        if (!promptengine_checkRangeBoundValue(upperBound.value, type)) {
            if (upperBound.focus && upperBound.type.toLowerCase() != "hidden") {
                upperBound.focus();
            }
            return false;
        }
        uvalue = upperBound.value;
    }
    var ldisplay = "";
    var udisplay = "";
    var found = false;
    if (lowerBoundPickList != null && lvalue != null && lvalue.length > 0) {
        var cItems = lowerBoundPickList.length;
        for (var item = 0; item < cItems; item++) {
            var value = lowerBoundPickList.options[item].value;
            if (value != null && value.length > 0 && value == lvalue) {
                ldisplay = lowerBoundPickList.options[item].text;
                found = true;
                break;
            }
        }
    }
    if (!found) {
        ldisplay = (lowerBound.text && !lowerUnBounded) ? lowerBound.text : lvalue;
    }
    found = false;
    if (upperBoundPickList != null && uvalue != null && uvalue.length > 0) {
        var cItems = upperBoundPickList.length;
        for (var item = 0; item < cItems; item++) {
            var value = upperBoundPickList.options[item].value;
            if (value != null && value == uvalue) {
                udisplay = upperBoundPickList.options[item].text;
                found = true;
                break;
            }
        }
    }
    if (!found) {
        udisplay = (upperBound.text && !upperUnBounded) ? upperBound.text : uvalue;
    }
    lowerChecked = document.getElementById(promptID + "LowerCheck").checked;
    upperChecked = document.getElementById(promptID + "UpperCheck").checked;
    value = (lowerChecked && !lowerUnBounded) ? "[" : "(";
    if (!lowerUnBounded) {
        value += (lvalue);
    }
    value += "_crRANGE_";
    if (!upperUnBounded) {
        value += (uvalue);
    }
    value += (upperChecked && !upperUnBounded) ? "]" : ")";
    display = (lowerChecked && !lowerUnBounded) ? "[" : "(";
    display += ldisplay;
    display += " .. ";
    display += udisplay;
    display += (upperChecked && !upperUnBounded) ? "]" : ")";
    promptEntry = new Option(display, value, false, false);
    theList = document.getElementById(promptID + "ListBox");
    var idx = promptengine_findOptionInList(theList, value);
    if (idx > -1) {
        theList.selectedIndex = idx;
    } else {
        theList.options[theList.length] = promptEntry;
    }
    return true;
}

function promptengine_findOptionInList(selectObj, val) {
    if (selectObj == null || val == null) {
        return -1;
    }
    var c = selectObj.length, opts = selectObj.options;
    for (var i = 0; i < c; i++) {
        if (opts[i].value == val) {
            return i;
        }
    }
    return -1;
}

function promptengine_onNoBoundCheckClicked(form, promptID, lowOrUpBound) {
    if (lowOrUpBound == 0) {
        if (document.getElementById(promptID + "NoLBoundCheck").checked) {
            document.getElementById(promptID + "NoUBoundCheck").disabled = true;
            document.getElementById(promptID + "LowerCheck").disabled = true;
            document.getElementById(promptID + "LowerBound").disabled = true;
            if (document.getElementById(promptID + "SelectLowerRangeValue") != null) {
                document.getElementById(promptID + "SelectLowerRangeValue").disabled = true;
            }
        } else {
            document.getElementById(promptID + "NoUBoundCheck").disabled = false;
            document.getElementById(promptID + "LowerCheck").disabled = false;
            document.getElementById(promptID + "LowerBound").disabled = false;
            if (document.getElementById(promptID + "SelectLowerRangeValue") != null) {
                document.getElementById(promptID + "SelectLowerRangeValue").disabled = false;
            }
        }
    } else {
        if (lowOrUpBound == 1) {
            if (document.getElementById(promptID + "NoUBoundCheck").checked) {
                document.getElementById(promptID + "NoLBoundCheck").disabled = true;
                document.getElementById(promptID + "UpperCheck").disabled = true;
                document.getElementById(promptID + "UpperBound").disabled = true;
                if (document.getElementById(promptID + "SelectUpperRangeValue") != null) {
                    document.getElementById(promptID + "SelectUpperRangeValue").disabled = true;
                }
            } else {
                document.getElementById(promptID + "NoLBoundCheck").disabled = false;
                document.getElementById(promptID + "UpperCheck").disabled = false;
                document.getElementById(promptID + "UpperBound").disabled = false;
                if (document.getElementById(promptID + "SelectUpperRangeValue") != null) {
                    document.getElementById(promptID + "SelectUpperRangeValue").disabled = false;
                }
            }
        }
    }
}

function promptengine_onSetNullCheckClicked(form, promptID) {
    if (document.getElementById(promptID + "NULL").checked) {
        if (document.getElementById(promptID + "DiscreteValue") != null) {
            document.getElementById(promptID + "DiscreteValue").disabled = true;
        }
        if (document.getElementById(promptID + "SelectValue") != null) {
            document.getElementById(promptID + "SelectValue").disabled = true;
        }
    } else {
        if (document.getElementById(promptID + "DiscreteValue") != null) {
            document.getElementById(promptID + "DiscreteValue").disabled = false;
        }
        if (document.getElementById(promptID + "SelectValue") != null) {
            document.getElementById(promptID + "SelectValue").disabled = false;
        }
    }
}

function promptengine_selectValue(form, selectCtrl, textCtrl) {
    if (document.getElementById(selectCtrl).selectedIndex < 0) {
        return false;
    }
    selectedOption = document.getElementById(selectCtrl).options[document.getElementById(selectCtrl).selectedIndex];
    if (selectedOption.value == null && document.getElementById(textCtrl).value == null) {
        return false;
    }
    var changed = true;
    if (selectedOption.value == document.getElementById(textCtrl).value) {
        changed = false;
    }
    document.getElementById(textCtrl).value = selectedOption.value;
    return changed;
}

function promptengine_hasValueInTextBox(form, textboxID) {
    if (document.getElementById(textboxID).value == null) {
        return false;
    }
    return true;
}

function promptengine_setCascadingPID(form, valueID, promptID) {
    valueField = document.getElementById(valueID);
    curVal = valueField.value;
    if (curVal.length > 0) {
        curVal += "&";
    }
    curVal += "cascadingPID" + "=" + promptID;
    valueField.value = curVal;
    return true;
}

function PE_removeValue(form, pid, all) {
    var lyr = document.getElementById(pid + "ListBox");
    var opts = lyr.options;
    var len = lyr.length;
    if (len == 0) {
        return false;
    }
    var changed = false;
    var lastSelected = -1;
    var lbCtl = PE_getLB(lyr);
    for (var i = 0; i < len; i++) {
        if (!all) {
            var opt = opts[i];
            if (!opt.selected) {
                lbCtl.add(opt.value, opt.text);
                continue;
            }
            lastSelected = i;
        }
        changed = true;
    }
    if (!changed) {
        return false;
    }
    lbCtl.update();
    if (lastSelected >= 0) {
        lyr = document.getElementById(pid + "ListBox");
        if (lastSelected < lyr.length) {
            lyr.options[lastSelected].selected = true;
        } else {
            if (lastSelected == lyr.length && lastSelected > 0) {
                lyr.options[lastSelected - 1].selected = true;
            }
        }
    }
    return true;
}

function promptengine_removeValue(form, pid) {
    return PE_removeValue(form, pid, false);
}

function promptengine_onRemoveValue(form, promptID) {
    promptengine_removeValue(form, promptID);
}

function promptengine_removeAllValues(form, pid) {
    return PE_removeValue(form, pid, true);
}

function promptengine_onRemoveAllValues(form, promptID) {
    promptengine_removeAllValues(form, promptID);
}

function promptengine_updateValueField(form, valueID, promptID, value) {
    valueField = document.getElementById(valueID);
    curVal = valueField.value;
    if (curVal.length > 0) {
        curVal += "&";
    }
    var encoded = promptengine_encodeValueField(value);
    curVal += promptID + "=" + encoded;
    valueField.value = curVal;
    return true;
}

function promptengine_resetValueField(form, valueID) {
    valueField = document.getElementById(valueID);
    valueField.value = "";
}

function promptengine_updateDiscreteValue(form, valueID, promptID, type, checkValue, valueRequired) {
    var value = "";
    if (document.getElementById(promptID + "NULL") != null && document.getElementById(promptID + "NULL").checked) {
        value = "_crNULL_";
    } else {
        valueField = document.getElementById(promptID + "DiscreteValue");
        if (valueField.type.toLowerCase() != "text" && valueField.type.toLowerCase() != "hidden" && valueField.type.toLowerCase() != "password") {
            value = valueField.options[valueField.selectedIndex].value;
        } else {
            value = valueField.value;
        }
        if (!valueRequired && (value == null || value.length == 0)) {
            return promptengine_updateValueField(form, valueID, promptID, "");
        }
        if (checkValue && !promptengine_checkValue(value, type)) {
            if (valueField.focus && valueField.type.toLowerCase() != "hidden") {
                valueField.focus();
            } else {
                var focusField = document.getElementById(promptID + "SelectValue");
                if (focusField != null && focusField.focus) {
                    focusField.focus();
                }
            }
            return false;
        }
    }
    return promptengine_updateValueField(form, valueID, promptID, value);
}

function promptengine_updateRangeValue(form, valueID, promptID, type, checkValue, valueRequired) {
    if (document.getElementById(promptID + "NULL") != null && document.getElementById(promptID + "NULL").checked) {
        value = "_crNULL_";
    } else {
        lowerBound = document.getElementById(promptID + "LowerBound");
        upperBound = document.getElementById(promptID + "UpperBound");
        if (lowerBound.type.toLowerCase() != "text" && lowerBound.type.toLowerCase() != "hidden" && lowerBound.type.toLowerCase() != "password") {
            lowerBound = lowerBound.options[lowerBound.selectedIndex];
            upperBound = upperBound.options[upperBound.selectedIndex];
        }
        lowerUnBounded = document.getElementById(promptID + "NoLBoundCheck").checked;
        upperUnBounded = document.getElementById(promptID + "NoUBoundCheck").checked;
        lowerChecked = document.getElementById(promptID + "LowerCheck").checked;
        upperChecked = document.getElementById(promptID + "UpperCheck").checked;
        uvalue = lvalue = "";
        if (!valueRequired && (lowerBound.value == null || lowerBound.value.length == 0 || lowerUnBounded) && (upperBound.value == null || upperBound.value.length == 0 || upperUnBounded)) {
            return promptengine_updateValueField(form, valueID, promptID, "");
        }
        if (!lowerUnBounded) {
            if (checkValue && !promptengine_checkRangeBoundValue(lowerBound.value, type)) {
                if (lowerBound.focus && lowerBound.type.toLowerCase() != "hidden") {
                    lowerBound.focus();
                } else {
                    var focusField = document.getElementById(promptID + "SelectLowerRangeValue");
                    if (focusField != null && focusField.focus) {
                        focusField.focus();
                    }
                }
                return false;
            }
            lvalue = lowerBound.value;
        }
        if (!upperUnBounded) {
            if (checkValue && !promptengine_checkRangeBoundValue(upperBound.value, type)) {
                if (upperBound.focus && upperBound.type.toLowerCase() != "hidden") {
                    upperBound.focus();
                } else {
                    var focusField = document.getElementById(promptID + "SelectUpperRangeValue");
                    if (focusField != null && focusField.focus) {
                        focusField.focus();
                    }
                }
                return false;
            }
            uvalue = upperBound.value;
        }
        value = (lowerChecked && !lowerUnBounded) ? "[" : "(";
        if (!lowerUnBounded) {
            value += lvalue;
        }
        value += "_crRANGE_";
        if (!upperUnBounded) {
            value += uvalue;
        }
        value += (upperChecked && !upperUnBounded) ? "]" : ")";
    }
    return promptengine_updateValueField(form, valueID, promptID, value);
}

function promptengine_updateMultiValue(form, valueID, promptID, type, checkValue, valueRequired) {
    values = document.getElementById(promptID + "ListBox").options;
    value = "";
    if (document.getElementById(promptID + "NULL") != null && document.getElementById(promptID + "NULL").checked) {
        value = "_crNULL_";
    } else {
        if (values.length == 0) {
            if (checkValue && valueRequired) {
                var focusField = document.getElementById(promptID + "ListBox");
                if (focusField != null && focusField.focus) {
                    focusField.focus();
                }
                return false;
            }
            value = "_crEMPTY_";
        } else {
            for (i = 0; i < values.length; i++) {
                if (i != 0) {
                    value += "_crMULT_";
                }
                value += values[i].value;
            }
        }
    }
    return promptengine_updateValueField(form, valueID, promptID, value);
}

var regNumber = /^(\+|-)?((\d+(\.|,|'| |\xA0)?\d*)+|(\d*(\.|,| |\xA0)?\d+)+)$/;
var regCurrency = regNumber;
var regDate = /^(D|d)(A|a)(T|t)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *\)$/;
var regDateTime = /^(D|d)(A|a)(T|t)(E|e)(T|t)(I|i)(M|m)(E|e) *\( *\d{4} *, *(0?[1-9]|1[0-2]) *, *((0?[1-9]|[1-2]\d)|3(0|1)) *, *([0-1]?\d|2[0-3]) *, *[0-5]?\d *, *[0-5]?\d *\)$/;
var regTime = /^(T|t)(I|i)(M|m)(E|e) *\( *([0-1]?\d|2[0-3]) *, *[0-5]?\d *, *[0-5]?\d *\)$/;
var regDateTimeHTML = /^ *\d{4} *- *(0?[1-9]|1[0-2]) *- *((0?[1-9]|[1-2]\d)|3(0|1)) *  *([0-1]?\d|2[0-3]) *: *[0-5]?\d *: *[0-5]?\d *$/;
var regDateHTML = /^ *\d{4} *- *(0?[1-9]|1[0-2]) *- *((0?[1-9]|[1-2]\d)|3(0|1)) *$/;
var regTimeHTML = /^ *([0-1]?\d|2[0-3]) *: *[0-5]?\d *: *[0-5]?\d *$/;

function promptengine_getDateSpec() {
    var datePattern = promptengine_getDatePattern();
    datePattern = datePattern.replace("Y", L_YYYY);
    datePattern = datePattern.replace("M", L_MM);
    datePattern = datePattern.replace("D", L_DD);
    return datePattern;
}

function promptengine_checkValue(value, type) {
    if (value == null) {
        return false;
    }
    if (value == "_crNULL_") {
        return true;
    }
    if (type == _pe._nm && !regNumber.test(value)) {
        if (value.length > 0) {
            alert(L_BadNumber);
        }
        return false;
    } else {
        if (type == _pe._cy && !regCurrency.test(value)) {
            if (value.length > 0) {
                alert(L_BadCurrency);
            }
            return false;
        } else {
            if (type == _pe._da) {
                var regex = promptengine_getDateRegex();
                if ((regex == null || !regex.test(value)) && !regDate.test(value) && !regDateHTML.test(value)) {
                    if (value.length > 0) {
                        var badDate = L_BadDate.replace("%1", promptengine_getDateSpec());
                        alert(badDate);
                    }
                    return false;
                }
            } else {
                if (type == _pe._dt) {
                    var regex = promptengine_getDateTimeRegex();
                    if ((regex == null || !regex.test(value)) && !regDateTime.test(value) && !regDateTimeHTML.test(value)) {
                        if (value.length > 0) {
                            var badDateTime = L_BadDateTime.replace("%1", promptengine_getDateSpec());
                            alert(badDateTime);
                        }
                        return false;
                    }
                } else {
                    if (type == _pe._tm && !regTime.test(value) && !regTimeHTML.test(value)) {
                        if (value.length > 0) {
                            alert(L_BadTime);
                        }
                        return false;
                    }
                }
            }
        }
    }
    return true;
}

function promptengine_checkRangeBoundValue(value, type) {
    if (value == null || value.length == 0) {
        return false;
    }
    return promptengine_checkValue(value, type);
}

function promptengine_isSubmitEvent(evt) {
    var b = false;
    if (isNetscape) {
        if (evt.which == ENTER_KEY && (evt.target.type == "text" || evt.target.type == "password")) {
            b = true;
        }
    } else {
        if (window.event.keyCode == ENTER_KEY && (window.event.srcElement.type == "text" || window.event.srcElement.type == "password")) {
            b = true;
        }
    }
    if (b) {
        _eventCancelBubble(evt);
    }
    return b;
}

function promptengine_isEnterKey(evt) {
    var b = false;
    if (isNetscape) {
        if (evt.which == ENTER_KEY && evt.target.tagName.toLowerCase() != "a") {
            b = true;
        }
    } else {
        if (window.event.keyCode == ENTER_KEY && window.event.srcElement.tagName.toLowerCase() != "a") {
            b = true;
        }
    }
    if (b) {
        _eventCancelBubble(evt);
    }
    return b;
}

function promptengine_urlEncode(strToBeEncoded) {
    var encodedString = new String("");
    for (var i = 0; i < strToBeEncoded.length; i++) {
        var nextChar = strToBeEncoded.charAt(i);
        switch (nextChar) {
            case"%":
                encodedString += "%25";
                break;
            case"+":
                encodedString += "%2B";
                break;
            case" ":
                encodedString += "%20";
                break;
            case"<":
                encodedString += "%3C";
                break;
            case">":
                encodedString += "%3E";
                break;
            case'"':
                encodedString += "%22";
                break;
            case"'":
                encodedString += "%27";
                break;
            case"#":
                encodedString += "%23";
                break;
            case"{":
                encodedString += "%7B";
                break;
            case"}":
                encodedString += "%7D";
                break;
            case"|":
                encodedString += "%7C";
                break;
            case"\\":
                encodedString += "%5C";
                break;
            case"^":
                encodedString += "%5E";
                break;
            case"~":
                encodedString += "%7E";
                break;
            case"`":
                encodedString += "%60";
                break;
            case"[":
                encodedString += "%5B";
                break;
            case"]":
                encodedString += "%5D";
                break;
            case";":
                encodedString += "%3B";
                break;
            case"/":
                encodedString += "%2F";
                break;
            case"?":
                encodedString += "%3F";
                break;
            case":":
                encodedString += "%3A";
                break;
            case"@":
                encodedString += "%40";
                break;
            case"=":
                encodedString += "%3D";
                break;
            case"&":
                encodedString += "%26";
                break;
            default:
                encodedString += nextChar;
                break;
        }
    }
    return encodedString;
}

function promptengine_CancelRightClick(evt) {
    if (isNetscape) {
        if (evt.target.type != "text" && evt.target.type != "textarea") {
            evt.preventDefault();
            evt.cancelBubble = true;
            return true;
        }
    } else {
        if (window.event.srcElement.type != "text" && window.event.srcElement.type != "textarea") {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
        }
    }
}

function promptengine_showHidePromptByKey(fieldSetId, imgId, currentImgPath, changeImgPath, evt) {
    var correctKey = false;
    var fieldSet = document.getElementById(fieldSetId);
    if (fieldSet == null) {
        return;
    }
    if (isNetscape) {
        if ((evt.which == LEFT_ARROW_KEY && fieldSet.style.display == "") || (evt.which == RIGHT_ARROW_KEY && fieldSet.style.display == "none")) {
            correctKey = true;
        }
    } else {
        if ((window.event.keyCode == LEFT_ARROW_KEY && fieldSet.style.display == "") || (window.event.keyCode == RIGHT_ARROW_KEY && fieldSet.style.display == "none")) {
            correctKey = true;
        }
    }
    if (correctKey == true) {
        promptengine_showHidePrompt(fieldSetId, imgId, currentImgPath, changeImgPath, evt);
    }
}

function promptengine_showHidePrompt(fieldSetId, imgId, currentImgPath, changeImgPath, evt) {
    var imgElem;
    imgElem = document.getElementById(imgId);
    if (imgElem != null && fieldSetId != null) {
        if (!imgElem.origImage) {
            imgElem.origImage = imgElem.src;
        }
        var fieldSet = document.getElementById(fieldSetId);
        if (fieldSet != null) {
            if (fieldSet.style.display == "") {
                fieldSet.style.display = "none";
            } else {
                fieldSet.style.display = "";
            }
            if (!imgElem.changed || imgElem.changed == false) {
                imgElem.src = changeImgPath;
                imgElem.changed = true;
            } else {
                imgElem.src = currentImgPath;
                imgElem.changed = false;
            }
        }
    }
}

function promptengine_scrollTo(elt) {
    if (!elt) {
        return;
    }
    var scrY = _getScrollY(), scrX = _getScrollX();
    var h = elt.offsetHeight, winCY = _winHeight(), y = _getPos(elt).y;
    if (y < scrY) {
        window.scrollTo(scrX, y);
    } else {
        if (y + h > scrY + winCY) {
            window.scrollTo(scrX, Math.max(y, y + h - winCY));
        }
    }
}

function doNothing() {
}

function promptengine_anchorOnKeyPress(e) {
    var evt = e ? e : window.event;
    var target = evt.srcElement ? evt.srcElement : evt.target;
    if (evt.keyCode == 13 && target.onclick) {
        target.onclick.apply(target, [e]);
    }
    return true;
}

function promptengine_encodeUTF8(string) {
    var arr = [];
    var strLen = string.length;
    for (var i = 0; i < strLen; i++) {
        var c = string.charCodeAt(i);
        if (c < 128) {
            arr.push(c);
        } else {
            if (c < 2048) {
                arr.push((c >> 6) | 192);
                arr.push(c & 63 | 128);
            } else {
                if (c < 55296 || c >= 57344) {
                    arr.push((c >> 12) | 224);
                    arr.push((c >> 6) & 63 | 128);
                    arr.push(c & 63 | 128);
                } else {
                    if (c < 56320) {
                        var c2 = string.charCodeAt(i + 1);
                        if (isNaN(c2) || c2 < 56320 || c2 >= 57344) {
                            arr.push(239, 191, 189);
                            continue;
                        }
                        i++;
                        val = ((c & 1023) << 10) | (c2 & 1023);
                        val += 65536;
                        arr.push((val >> 18) | 240);
                        arr.push((val >> 12) & 63 | 128);
                        arr.push((val >> 6) & 63 | 128);
                        arr.push(val & 63 | 128);
                    } else {
                        arr.push(239, 191, 189);
                    }
                }
            }
        }
    }
    return arr;
}

function promptengine_encodeBASE64(byteArray) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var arr = [];
    var c1, c2, c3, e1, e2, e3, e4;
    var i = 0, arrLen = byteArray.length;
    while (i < arrLen) {
        c1 = byteArray[i++];
        c2 = byteArray[i++];
        c3 = byteArray[i++];
        e1 = c1 >> 2;
        e2 = ((c1 & 3) << 4) | (c2 >> 4);
        e3 = ((c2 & 15) << 2) | (c3 >> 6);
        e4 = c3 & 63;
        if (isNaN(c2)) {
            e3 = e4 = 64;
        } else {
            if (isNaN(c3)) {
                e4 = 64;
            }
        }
        arr.push(keyStr.charAt(e1));
        arr.push(keyStr.charAt(e2));
        arr.push(keyStr.charAt(e3));
        arr.push(keyStr.charAt(e4));
    }
    return arr.join("");
}

function promptengine_encodeValueField(value) {
    return promptengine_encodePrompt(promptengine_encodeBASE64(promptengine_encodeUTF8(value)));
}

if (typeof (bobj) == "undefined") {
    bobj = {};
}
if (typeof (bobj.prompt) == "undefined") {
    bobj.prompt = {};
}
bobj.prompt.Calendar = function (formName, dateFormat, locale, promptJsFilePrefix) {
    this.locale = locale;
    this.crystalreportviewerPath = promptJsFilePrefix + "/../";
    this.loadFiles();
    this.formName = formName;
    this.dateFormat = dateFormat;
    this.dateTimeFormat = dateFormat + " " + "H:mm:ss";
    this.isDateTime = false;
};
bobj.prompt.Calendar.prototype = {
    show: function (e, inputName) {
        this.calendar = bobj.crv.Calendar.getInstance();
        this.input = document.getElementById(inputName);
        var srcElem = e.target ? e.target : e.srcElement;
        var pos = this._getPosition(srcElem);
        this._setValue(this.input.value);
        this._setSignals(true);
        this.calendar.setShowTime(this.isDateTime);
        this.calendar.show(true, pos.x, pos.y);
    }, setIsDateTime: function (isDateTime) {
        this.isDateTime = isDateTime;
    }, _getPosition: function (element) {
        return MochiKit.Style.getElementPosition(element);
    }, _setValue: function (value) {
        var date = this._getDateValue(value);
        if (!date) {
            date = new Date();
        }
        this.calendar.setDate(date);
    }, _onOkayClick: function (dateValue) {
        this._setFieldValue(dateValue);
    }, _setFieldValue: function (dateValue) {
        if (this.input) {
            this.input.value = this._getStringValue(dateValue);
        }
    }, _onHide: function () {
        this._removeSignals();
    }, _getStringValue: function (dateValue) {
        var format = this.isDateTime ? this.dateTimeFormat : this.dateFormat;
        return bobj.external.date.formatDate(dateValue, format);
    }, _getDateValue: function (stringValue) {
        var format = this.isDateTime ? this.dateTimeFormat : this.dateFormat;
        return bobj.external.date.getDateFromFormat(stringValue, format);
    }, _setSignals: function (isConnected) {
        var op = isConnected ? MochiKit.Signal.connect : MochiKit.Signal.disconnect;
        op(this.calendar, this.calendar.Signals.OK_CLICK, this, "_onOkayClick");
        op(this.calendar, this.calendar.Signals.ON_HIDE, this, "_onHide");
    }, _removeSignals: function () {
        this._setSignals(false);
    }, loadJsResources: function () {
        var resources = ["js/external/date.js", "js/MochiKit/Base.js", "js/MochiKit/DOM.js", "js/MochiKit/Style.js", "js/MochiKit/Signal.js", "js/dhtmllib/dom.js", "prompting/js/initDhtmlLib.js", "js/dhtmllib/palette.js", "js/dhtmllib/menu.js", "js/crviewer/html.js", "js/crviewer/common.js", "js/crviewer/Calendar.js"];
        for (var i = 0; i < resources.length; i++) {
            this.loadJsFile(resources[i]);
        }
    }, loadJsFile: function (uri) {
        document.write('<script src="' + this.crystalreportviewerPath + uri + '" language="javascript"><\/script>');
    }, loadLocaleStrings: function () {
        var localeFiles = ["js/dhtmllib/language/en/labels.js", "js/crviewer/strings_en.js"];
        var splitChar = "_";
        if (this.locale.indexOf("-") > 0) {
            splitChar = "-";
        }
        var lang = this.locale.split(splitChar);
        if (lang.length >= 1) {
            localeFiles.push("js/dhtmllib/language/" + lang[0] + "/labels.js");
            localeFiles.push("js/crviewer/strings_" + lang[0] + ".js");
        }
        if (lang.length >= 2) {
            localeFiles.push("js/dhtmllib/language/" + lang[0] + "_" + lang[1] + "/labels.js");
            localeFiles.push("js/crviewer/strings_" + lang[0] + "_" + lang[1] + ".js");
        }
        for (var i = 0; i < localeFiles.length; i++) {
            this.loadJsFile(localeFiles[i]);
        }
    }, loadFiles: function () {
        if (typeof (bobj.crv) == "undefined") {
            window["promptengine_skin"] = this.crystalreportviewerPath + "js/dhtmllib/images/skin_standard/";
            window["promptengine_style"] = this.crystalreportviewerPath + "js/crviewer/images/";
            window["promptengine_lang"] = this.locale;
            this.loadLocaleStrings();
            this.loadJsResources();
        }
    }
};
if (typeof bobj == "undefined") {
    bobj = {};
}
if (typeof bobj.constants == "undefined") {
    bobj.constants = {modalLayerIndex: 1000};
}
bobj.uniqueId = function () {
    return "bobjid_" + (++bobj.uniqueId._count);
};
if (typeof bobj.uniqueId._count == "undefined") {
    bobj.uniqueId._count = new Date().getTime();
}
bobj.updateIf = function (test, self, obj) {
    if (self === null) {
        self = {};
    }
    for (var i = 1, len = arguments.length; i < len; i++) {
        var o = arguments[i];
        if (typeof (o) != "undefined" && o !== null) {
            for (var k in o) {
                if (test(self, obj, k)) {
                    self[k] = o[k];
                }
            }
        }
    }
    return self;
};
bobj.fillIn = MochiKit.Base.partial(bobj.updateIf, function (self, obj, k) {
    return (typeof (self[k]) == "undefined");
});
bobj.isObject = function (obj) {
    return (obj && typeof obj == "object");
};
bobj.isArray = function (obj) {
    return (bobj.isObject(obj) && obj.constructor == Array);
};
bobj.isString = function (obj) {
    return (typeof (obj) == "string");
};
bobj.isNumber = function (obj) {
    return typeof (obj) == "number" && isFinite(obj);
};
bobj.isBoolean = function (obj) {
    return typeof obj == "boolean";
};
bobj.isFunction = function (obj) {
    return typeof (obj) == "function";
};
bobj.isBorderBoxModel = function () {
    if (typeof bobj.isBorderBoxModel._cachedValue == "undefined") {
        if (document.body) {
            var box = document.createElement("div");
            box.style.width = "10px";
            box.style.padding = "1px";
            box.style.position = "absolute";
            box.style.visibility = "hidden";
            document.body.appendChild(box);
            bobj.isBorderBoxModel._cachedValue = (box.offsetWidth == 10);
            document.body.removeChild(box);
        } else {
            return _ie && bobj.isQuirksMode();
        }
    }
    return bobj.isBorderBoxModel._cachedValue;
};
bobj.isQuirksMode = function () {
    return (document.compatMode != "CSS1Compat");
};
bobj.setVisualStyle = function (element, visualStyle) {
    if (element === null || visualStyle === null) {
        return;
    }
    var elemStyle = element.style;
    if (visualStyle.className) {
        element.className = visualStyle.className;
    }
    if (visualStyle.backgroundColor) {
        elemStyle.backgroundColor = visualStyle.backgroundColor;
    }
    if (visualStyle.borderWidth) {
        elemStyle.borderWidth = visualStyle.borderWidth;
    }
    if (visualStyle.borderStyle) {
        elemStyle.borderStyle = visualStyle.borderStyle;
    }
    if (visualStyle.borderColor) {
        elemStyle.borderColor = visualStyle.borderColor;
    }
    if (visualStyle.fontFamily) {
        elemStyle.fontFamily = visualStyle.fontFamily;
    }
    if (visualStyle.fontWeight) {
        elemStyle.fontWeight = visualStyle.fontWeight;
    }
    if (visualStyle.textDecoration) {
        elemStyle.textDecoration = visualStyle.textDecoration;
    }
    if (visualStyle.color) {
        elemStyle.color = visualStyle.color;
    }
    if (visualStyle.width) {
        elemStyle.width = visualStyle.width;
    }
    if (visualStyle.height) {
        elemStyle.height = visualStyle.height;
    }
    if (visualStyle.fontStyle) {
        elemStyle.fontStyle = visualStyle.fontStyle;
    }
    if (visualStyle.fontSize) {
        elemStyle.fontSize = visualStyle.fontSize;
    }
    if (visualStyle.left) {
        elemStyle.left = visualStyle.left;
    }
    if (visualStyle.top) {
        elemStyle.top = visualStyle.top;
    }
};
bobj.setOuterSize = function (node, w, h, excludeMargins) {
    var origStyle = null;
    var nodeStyle = node.style;
    if (nodeStyle.display == "none") {
        origStyle = {visibility: nodeStyle.visibility, position: nodeStyle.position, display: "none"};
        nodeStyle.visibility = "hidden";
        nodeStyle.position = "absolute";
        nodeStyle.display = "";
    }

    function pixels(selector) {
        var value = MochiKit.DOM.getStyle(node, selector);
        if (bobj.isString(value) && value.substring(value.length - 2 == "px")) {
            return (parseInt(value, 10) || 0);
        }
        return 0;
    }

    if (bobj.isNumber(w)) {
        if (!bobj.isBorderBoxModel()) {
            w -= pixels("border-left-width");
            w -= pixels("border-right-width");
            w -= pixels("padding-left");
            w -= pixels("padding-right");
            if (excludeMargins) {
                w -= pixels("margin-left");
                w -= pixels("margin-right");
            }
        }
        nodeStyle.width = Math.max(0, w) + "px";
    }
    if (bobj.isNumber(h)) {
        if (!bobj.isBorderBoxModel()) {
            if (excludeMargins) {
                h -= pixels("margin-top");
                h -= pixels("margin-bottom");
            }
            h -= pixels("border-top-width");
            h -= pixels("border-bottom-width");
            h -= pixels("padding-top");
            h -= pixels("padding-bottom");
        }
        nodeStyle.height = Math.max(0, h) + "px";
    }
    if (origStyle) {
        nodeStyle.display = origStyle.display;
        nodeStyle.position = origStyle.position;
        nodeStyle.visibility = origStyle.visibility;
    }
};
bobj.placeElement = function (elt, x, y, preferLeft, preferTop) {
    var eltStyle = elt.style;
    var oldVis = eltStyle.visibility || "visible";
    eltStyle.visibility = "hidden";
    eltStyle.position = "absolute";
    var oldDis = eltStyle.display;
    eltStyle.display = "";
    var eltX = x;
    var eltY = y;
    var eltW = elt.offsetWidth;
    var eltH = elt.offsetHeight;
    var wx1 = getScrollX();
    var wx2 = getScrollX() + winWidth();
    var wy1 = getScrollY();
    var wy2 = getScrollY() + winHeight();
    var isRightQ;
    if (preferLeft && ((x - wx1) > eltW)) {
        isRightQ = false;
    } else {
        if ((wx2 - x) > eltW) {
            isRightQ = true;
        } else {
            isRightQ = (wx2 - x) > (x - wx1);
        }
    }
    var isBottomQ;
    if (preferTop && ((y - wy1) > eltH)) {
        isBottomQ = false;
    } else {
        if ((wy2 - y) > eltH) {
            isBottomQ = true;
        } else {
            isBottomQ = (wy2 - y) > (y - wy1);
        }
    }
    if (!isRightQ) {
        eltX -= eltW;
    }
    if (!isBottomQ) {
        eltY -= eltH;
    }
    if ((eltX + eltW) > wx2) {
        eltX = wx2 - eltW;
    }
    if ((eltY + eltH) > wy2) {
        eltY = wy2 - eltH;
    }
    eltX = Math.max(wx1, eltX);
    eltY = Math.max(wy1, eltY);
    eltStyle.left = eltX + "px";
    eltStyle.top = eltY + "px";
    eltStyle.visibility = oldVis;
    eltStyle.display = oldDis;
};
bobj.getContainer = function (child) {
    if (child && child.layer) {
        return child.layer.parentNode;
    }
    return null;
};
bobj.checkParent = function (elem, parentTagName) {
    var foundParent = false;
    if (elem && parentTagName) {
        parentTagName = parentTagName.toUpperCase();
        var parent = elem.parentNode;
        while (parent) {
            if (parent.tagName == parentTagName) {
                foundParent = true;
                break;
            }
            parent = parent.parentNode;
        }
    }
    return foundParent;
};
bobj.slice = function (arrayLike, begin, end) {
    if (bobj.isArray(arrayLike)) {
        return arrayLike.slice(begin, end);
    } else {
        if (MochiKit.Base.isArrayLike(arrayLike)) {
            var retArray = [];
            var endIdx = arrayLike.length;
            if (bobj.isNumber(end) && end < endIdx) {
                endIdx = end;
            }
            begin = Math.max(begin, 0);
            for (var i = begin; i < endIdx; ++i) {
                retArray.push(arrayLike[i]);
            }
            return retArray;
        }
    }
    return null;
};
bobj.extractRange = function (list, start, end) {
    if (list && bobj.isNumber(start)) {
        if (!bobj.isNumber(end) || end > list.length) {
            end = list.length;
        }
        start = Math.max(0, start);
        if (start < end) {
            var s1 = 0, e1 = start;
            var s2 = end, e2 = list.length;
            if (list.substring) {
                return (list.substring(s1, e1) + list.substring(s2, e2));
            } else {
                return bobj.slice(list, s1, e1).concat(bobj.slice(list, s2, e2));
            }
        }
    }
    return list;
};
bobj.unitValue = function (val, unit) {
    if (bobj.isNumber(val)) {
        return val + (unit || "px");
    }
    return val;
};
bobj.evalInWindow = function (expression) {
    if (window.execScript) {
        return window.execScript(expression);
    } else {
        return MochiKit.Base.bind(eval, window, expression).call();
    }
};
bobj.trimLeft = function (str) {
    str = str || "";
    return str.replace(/^\s+/g, "");
};
bobj.trimRight = function (str) {
    str = str || "";
    return str.replace(/\s+$/g, "");
};
bobj.trim = function (str) {
    return bobj.trimLeft(bobj.trimRight(str));
};
bobj.equals = function (obj1, obj2) {
    if (typeof (obj1) != typeof (obj2)) {
        return false;
    }
    if (bobj.isObject(obj1)) {
        var same = true;
        for (var prop in obj1) {
            same = same && bobj.equals(obj1[prop], obj2[prop]);
        }
        return same;
    } else {
        return obj1 == obj2;
    }
};
bobj.includeLink = function (href) {
    var head = document.getElementsByTagName("head")[0];
    var body = document.body;
    var link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", href);
    if (head) {
        head.appendChild(link);
    } else {
        if (body) {
            body.appendChild(link);
        }
    }
};
bobj.addStyleSheet = function (stylesheet, id) {
    var style = document.createElement("style");
    style.setAttribute("type", "text/css");
    if (id) {
        style.setAttribute("id", id);
    }
    if (style.styleSheet) {
        style.styleSheet.cssText = stylesheet;
    } else {
        style.appendChild(document.createTextNode(stylesheet));
    }
    var head = document.getElementsByTagName("head");
    var body = document.getElementsByTagName("body");
    if (head && head[0]) {
        head[0].appendChild(style);
    } else {
        if (body && body[0]) {
            body[0].appendChild(style);
        }
    }
};
bobj.removeAllChildElements = function (elem) {
    if (elem) {
        while (elem.firstChild) {
            bobj.removeAllChildElements(elem.firstChild);
            elem.removeChild(elem.firstChild);
        }
    }
};
bobj.getValueHashCode = function (valueType, value) {
    var Types = bobj.crv.params.DataTypes;
    switch (valueType) {
        case Types.BOOLEAN:
        case Types.CURRENCY:
        case Types.NUMBER:
        case Types.STRING:
            return "" + value;
        case Types.TIME:
            return "" + value.h + "," + value.min + "," + value.s + "," + value.ms;
        case Types.DATE:
            return "" + value.y + "," + value.m + "," + value.d;
        case Types.DATE_TIME:
            return "" + value.y + "," + value.m + "," + value.d + "," + value.h + "," + value.min + "," + value.s + "," + value.ms;
    }
};
bobj.encodeUTF8 = function (string) {
    var arr = [];
    var strLen = string.length;
    for (var i = 0; i < strLen; i++) {
        var c = string.charCodeAt(i);
        if (c < 128) {
            arr.push(c);
        } else {
            if (c < 2048) {
                arr.push((c >> 6) | 192);
                arr.push(c & 63 | 128);
            } else {
                if (c < 55296 || c >= 57344) {
                    arr.push((c >> 12) | 224);
                    arr.push((c >> 6) & 63 | 128);
                    arr.push(c & 63 | 128);
                } else {
                    if (c < 56320) {
                        var c2 = string.charCodeAt(i + 1);
                        if (isNaN(c2) || c2 < 56320 || c2 >= 57344) {
                            arr.push(239, 191, 189);
                            continue;
                        }
                        i++;
                        val = ((c & 1023) << 10) | (c2 & 1023);
                        val += 65536;
                        arr.push((val >> 18) | 240);
                        arr.push((val >> 12) & 63 | 128);
                        arr.push((val >> 6) & 63 | 128);
                        arr.push(val & 63 | 128);
                    } else {
                        arr.push(239, 191, 189);
                    }
                }
            }
        }
    }
    return arr;
};
bobj.encodeBASE64 = function (byteArray) {
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var arr = [];
    var c1, c2, c3, e1, e2, e3, e4;
    var i = 0, arrLen = byteArray.length;
    while (i < arrLen) {
        c1 = byteArray[i++];
        c2 = byteArray[i++];
        c3 = byteArray[i++];
        e1 = c1 >> 2;
        e2 = ((c1 & 3) << 4) | (c2 >> 4);
        e3 = ((c2 & 15) << 2) | (c3 >> 6);
        e4 = c3 & 63;
        if (isNaN(c2)) {
            e3 = e4 = 64;
        } else {
            if (isNaN(c3)) {
                e4 = 64;
            }
        }
        arr.push(keyStr.charAt(e1));
        arr.push(keyStr.charAt(e2));
        arr.push(keyStr.charAt(e3));
        arr.push(keyStr.charAt(e4));
    }
    return arr.join("");
};
bobj.getElementByIdOrName = function (idOrName) {
    if (!idOrName) {
        return null;
    }
    var elem = document.getElementById(idOrName);
    if (elem) {
        return elem;
    }
    var elems = document.getElementsByName(idOrName);
    if (elems && elems.length > 0) {
        return elems[0];
    }
    return null;
};
bobj.getRect = function (top, right, bottom, left) {
    return "rect(" + top + "px, " + right + "px," + bottom + "px," + left + "px)";
};
bobj.getBodyScrollDimension = function () {
    var w = 0;
    var h = 0;
    var bodyTags = document.getElementsByTagName("Body");
    if (bodyTags && bodyTags[0]) {
        w = bodyTags[0].scrollWidth;
        h = bodyTags[0].scrollHeight;
    }
    return {w: w, h: h};
};
bobj.bindFunctionToObject = function (func, obj) {
    return function () {
        return func.apply(obj, arguments);
    };
};
if (typeof (bobj.html) == "undefined") {
    bobj.html = {};
}
bobj.html.openTag = function (tag, atts) {
    var html = "<" + tag;
    for (var i in atts) {
        if (i in Object.prototype) {
            continue;
        }
        html += " " + i + '="';
        var value = atts[i];
        if (bobj.isArray(value)) {
            value = value.join(" ");
        } else {
            if (bobj.isObject(value)) {
                var stringValue = "";
                for (var k in value) {
                    if (k in Object.prototype) {
                        continue;
                    }
                    stringValue += k + ":" + value[k] + ";";
                }
                value = stringValue;
            }
        }
        html += value + '"';
    }
    return html + ">";
};
bobj.html.closeTag = function (tag) {
    return "</" + tag + ">";
};
bobj.html.createHtml = function (tag, atts, innerHtml) {
    var html = bobj.html.openTag(tag, atts);
    for (var i = 2; i < arguments.length; ++i) {
        html += arguments[i];
    }
    html += bobj.html.closeTag(tag);
    return html;
};
bobj.html.TABLE = MochiKit.Base.partial(bobj.html.createHtml, "table");
bobj.html.UL = MochiKit.Base.partial(bobj.html.createHtml, "ul");
bobj.html.OL = MochiKit.Base.partial(bobj.html.createHtml, "ol");
bobj.html.LI = MochiKit.Base.partial(bobj.html.createHtml, "li");
bobj.html.TD = MochiKit.Base.partial(bobj.html.createHtml, "td");
bobj.html.TR = MochiKit.Base.partial(bobj.html.createHtml, "tr");
bobj.html.TBODY = MochiKit.Base.partial(bobj.html.createHtml, "tbody");
bobj.html.THEAD = MochiKit.Base.partial(bobj.html.createHtml, "thead");
bobj.html.TFOOT = MochiKit.Base.partial(bobj.html.createHtml, "tfoot");
bobj.html.TABLE = MochiKit.Base.partial(bobj.html.createHtml, "table");
bobj.html.TH = MochiKit.Base.partial(bobj.html.createHtml, "th");
bobj.html.INPUT = MochiKit.Base.partial(bobj.html.createHtml, "input");
bobj.html.SPAN = MochiKit.Base.partial(bobj.html.createHtml, "span");
bobj.html.A = MochiKit.Base.partial(bobj.html.createHtml, "a");
bobj.html.DIV = MochiKit.Base.partial(bobj.html.createHtml, "div");
bobj.html.IMG = MochiKit.Base.partial(bobj.html.createHtml, "img");
bobj.html.BUTTON = MochiKit.Base.partial(bobj.html.createHtml, "button");
bobj.html.TT = MochiKit.Base.partial(bobj.html.createHtml, "tt");
bobj.html.PRE = MochiKit.Base.partial(bobj.html.createHtml, "pre");
bobj.html.H1 = MochiKit.Base.partial(bobj.html.createHtml, "h1");
bobj.html.H2 = MochiKit.Base.partial(bobj.html.createHtml, "h2");
bobj.html.H3 = MochiKit.Base.partial(bobj.html.createHtml, "h3");
bobj.html.BR = MochiKit.Base.partial(bobj.html.createHtml, "br");
bobj.html.HR = MochiKit.Base.partial(bobj.html.createHtml, "hr");
bobj.html.LABEL = MochiKit.Base.partial(bobj.html.createHtml, "label");
bobj.html.TEXTAREA = MochiKit.Base.partial(bobj.html.createHtml, "textarea");
bobj.html.FORM = MochiKit.Base.partial(bobj.html.createHtml, "form");
bobj.html.P = MochiKit.Base.partial(bobj.html.createHtml, "p");
bobj.html.SELECT = MochiKit.Base.partial(bobj.html.createHtml, "select");
bobj.html.OPTION = MochiKit.Base.partial(bobj.html.createHtml, "option");
bobj.html.OPTGROUP = MochiKit.Base.partial(bobj.html.createHtml, "optgroup");
bobj.html.LEGEND = MochiKit.Base.partial(bobj.html.createHtml, "legend");
bobj.html.FIELDSET = MochiKit.Base.partial(bobj.html.createHtml, "fieldset");
bobj.html.STRONG = MochiKit.Base.partial(bobj.html.createHtml, "strong");
bobj.html.CANVAS = MochiKit.Base.partial(bobj.html.createHtml, "canvas");
bobj.html.IFRAME = MochiKit.Base.partial(bobj.html.createHtml, "iframe");
bobj.html.SCRIPT = MochiKit.Base.partial(bobj.html.createHtml, "script");
bobj.html.extractScripts = function (html) {
    var regexpScript = /(?:<script([^>]*)\/>|<script([^>]*)>([\s\S]*?)<\/script>)/i;
    var regexpSrc = /src=\"([^\"]*)\"/i;
    var scripts = [];
    var match = null;
    while (match = regexpScript.exec(html)) {
        var script = {src: null, text: null};
        var attributes = match[1] || match[2];
        if (attributes = regexpSrc.exec(attributes)) {
            script.src = attributes[1];
        }
        if (match[3]) {
            script.text = match[3];
        }
        scripts.push(script);
        html = bobj.extractRange(html, match.index, match.index + match[0].length);
    }
    return {scripts: scripts, html: html};
};
bobj.html.extractHtml = function (html) {
    var extScripts = bobj.html.extractScripts(html);
    var extLinks = bobj.html.extractLinks(extScripts.html);
    var extStyles = bobj.html.extractStyles(extLinks.html);
    return {scripts: extScripts.scripts, html: extStyles.html, links: extLinks.links, styles: extStyles.styles};
};
bobj.html.extractLinks = function (html) {
    var regexpLink = /<link([^>]*)>/i;
    var regexpHref = /href=\"([^\"]*)\"/i;
    var links = [];
    var match = null;
    while (match = regexpLink.exec(html)) {
        var href = regexpHref.exec(match);
        if (href && href.length > 0) {
            links.push(href[1]);
        }
        html = bobj.extractRange(html, match.index, match.index + match[0].length);
    }
    return {links: links, html: html};
};
bobj.html.extractStyles = function (html) {
    var regexpStyle = /<style([^>]*)>([\s\S]*?)<\/style>/i;
    var regexpType = /type=\"([^\"]*)\"/i;
    var regexpMedia = /media=\"([^\"]*)\"/i;
    var styles = [];
    var match = null;
    while (match = regexpStyle.exec(html)) {
        var style = {media: null, type: null, text: match[2]};
        var matchType = regexpType.exec(match[1]);
        if (matchType) {
            style.type = matchType[1];
        }
        var matchMedia = regexpMedia.exec(match[1]);
        if (matchMedia) {
            style.media = matchMedia[1];
        }
        styles.push(style);
        html = bobj.extractRange(html, match.index, match.index + match[0].length);
    }
    return {styles: styles, html: html};
};
if (typeof (bobj.crv.Toolbar) == "undefined") {
    bobj.crv.Toolbar = {};
}
if (typeof (bobj.crv.ToolbarButton) == "undefined") {
    bobj.crv.ToolbarButton = {};
}
if (typeof (bobj.crv.SelectPageControl) == "undefined") {
    bobj.crv.SelectPageControl = {};
}
if (typeof (bobj.crv.ZoomControl) == "undefined") {
    bobj.crv.ZoomControl = {};
}
if (typeof (bobj.crv.SearchTextControl) == "undefined") {
    bobj.crv.SearchTextControl = {};
}
bobj.crv.toolbarImageY = function (index) {
    return index * 22 + 3;
};
bobj.crv.exportIconIndex = 0;
bobj.crv.printIconIndex = 1;
bobj.crv.groupTreeIconIndex = 2;
bobj.crv.paramPanelIconIndex = 3;
bobj.crv.firstIconIndex = 4;
bobj.crv.prevIconIndex = 5;
bobj.crv.nextIconIndex = 6;
bobj.crv.lastIconIndex = 7;
bobj.crv.refreshIconIndex = 8;
bobj.crv.searchIconIndex = 9;
bobj.crv.newToolbar = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({
        id: bobj.uniqueId(),
        visualStyle: {
            className: null,
            backgroundColor: null,
            borderWidth: null,
            borderStyle: null,
            borderColor: null,
            fontFamily: null,
            fontWeight: null,
            textDecoration: null,
            color: null,
            width: null,
            height: null,
            fontStyle: null,
            fontSize: null
        }
    }, kwArgs);
    var o = newPaletteContainerWidget(kwArgs.id);
    o.margin = 0;
    bobj.fillIn(o, kwArgs);
    o._rightZoneWgts = [];
    o.widgetType = "Toolbar";
    o.initOld = o.init;
    UPDATE(o, bobj.crv.Toolbar);
    o.palette = newPaletteWidget(o.id + "_palette");
    o.add(o.palette);
    return o;
};
bobj.crv.Toolbar.addChild = function (widget) {
    var SIGNAL = MochiKit.Signal.signal;
    var PARTIAL = MochiKit.Base.partial;
    var BIND = MochiKit.Base.bind;
    switch (widget.widgetType) {
        case"ExportButton":
            this.exportButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "export");
            break;
        case"PrintButton":
            this.printButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "print");
            break;
        case"ParamPanelToggleButton":
            this.paramPanelToggleButton = widget;
            widget.toggleCB = BIND(this._onToggleButtonClick, this, widget);
            break;
        case"GroupPanelToggleButton":
            this.groupPanelToggleButton = widget;
            widget.toggleCB = BIND(this._onToggleButtonClick, this, widget);
            break;
        case"FirstPageButton":
            this.firstPageButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "firstPage");
            break;
        case"PrevPageButton":
            this.prevPageButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "prevPage");
            break;
        case"NextPageButton":
            this.nextPageButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "nextPage");
            break;
        case"LastPageButton":
            this.lastPageButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "lastPage");
            break;
        case"RefreshButton":
            this.refreshButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "refresh");
            break;
        case"ZoomControl":
            this.zoomControl = widget;
            widget.zoomCB = PARTIAL(SIGNAL, this, "zoom");
            break;
        case"SelectPageControl":
            this.selectPageControl = widget;
            widget.selectPageCB = PARTIAL(SIGNAL, this, "selectPage");
            break;
        case"SearchTextControl":
            this.searchTextControl = widget;
            widget.searchTextCB = PARTIAL(SIGNAL, this, "search");
            break;
        case"DrillUpButton":
            this.drillUpButton = widget;
            widget.clickCB = PARTIAL(SIGNAL, this, "drillUp");
            break;
        default:
            break;
    }
    if (widget.layoutAlign == "right") {
        this._rightZoneWgts.push(widget);
    } else {
        this.palette.add(widget);
    }
};
bobj.crv.Toolbar.init = function () {
    this.initOld();
    bobj.setVisualStyle(this.layer, this.visualStyle);
    this.palette.init();
    this._updateNavButtons();
};
bobj.crv.Toolbar.write = function () {
    this._addRightZone();
    this.begin();
    this.palette.write();
    this.end();
    document.write(bobj.crv.getInitHTML(this.widx));
};
bobj.crv.Toolbar.beginHTML = function () {
    return bobj.html.openTag("div", {
        id: this.id,
        "class": "dialogzone",
        style: {overflow: "hidden", margin: this.margin + "px"}
    });
};
bobj.crv.Toolbar.getHTML = function () {
    this._addRightZone();
    return (this.beginHTML() + this.palette.getHTML() + this.endHTML() + bobj.crv.getInitHTML(this.widx));
};
bobj.crv.Toolbar.getWidth = function () {
    var itemLayer;
    var width = 0;
    var items = this.palette.items;
    for (var i = 0, len = items.length; i < len; i++) {
        itemLayer = items[i].layer;
        if (itemLayer.offsetWidth) {
            width += itemLayer.offsetWidth;
        }
        if (itemLayer.offsetLeft) {
            width += (itemLayer.offsetLeft * 2);
        }
    }
    return width;
};
bobj.crv.Toolbar._addRightZone = function () {
    this.palette.beginRightZone();
    var w = null;
    while (w = this._rightZoneWgts.pop()) {
        this.palette.add(w);
    }
    delete this._rightZoneWgts;
};
bobj.crv.Toolbar._updateNavButtons = function () {
    if (this.selectPageControl) {
        var curPg = this.selectPageControl.getCurrentPage();
        if (this.firstPageButton) {
            this.firstPageButton.setDisabled(curPg == 1);
        }
        if (this.prevPageButton) {
            this.prevPageButton.setDisabled(curPg == 1);
        }
        var numPgsStr = this.selectPageControl.getNumPages();
        var lastPgKnown = numPgsStr.indexOf("+") == -1;
        var numPgs = parseInt(numPgsStr, 10);
        var fwdDisabled = lastPgKnown && numPgs == curPg;
        if (this.nextPageButton) {
            this.nextPageButton.setDisabled(fwdDisabled);
        }
        if (this.lastPageButton) {
            this.lastPageButton.setDisabled(fwdDisabled);
        }
    }
};
bobj.crv.Toolbar._onToggleButtonClick = function (button, isChecked) {
    var showOrHide = (isChecked ? L_bobj_crv_Hide : L_bobj_crv_Show);
    if (this.paramPanelToggleButton === button) {
        if (this.groupPanelToggleButton) {
            this.groupPanelToggleButton.check(false);
            this.groupPanelToggleButton.changeTooltip(L_bobj_crv_Show + " " + L_bobj_crv_GroupTree);
        }
        this.paramPanelToggleButton.changeTooltip(showOrHide + " " + L_bobj_crv_ParamPanel);
        MochiKit.Signal.signal(this, "showParamPanel", isChecked);
    } else {
        if (this.groupPanelToggleButton === button) {
            if (this.paramPanelToggleButton) {
                this.paramPanelToggleButton.check(false);
                this.paramPanelToggleButton.changeTooltip(L_bobj_crv_Show + " " + L_bobj_crv_ParamPanel);
            }
            this.groupPanelToggleButton.changeTooltip(showOrHide + " " + L_bobj_crv_GroupTree);
            MochiKit.Signal.signal(this, "showGroupTree", isChecked);
        }
    }
};
bobj.crv.Toolbar.setPageNumber = function (curPage, numPages) {
    if (this.selectPageControl) {
        if (curPage) {
            this.selectPageControl.setCurrentPage(curPage);
        }
        if (numPages) {
            this.selectPageControl.setNumPages(numPages);
        }
        this._updateNavButtons();
    }
};
bobj.crv.Toolbar.updateToolPanelButtons = function (panelType) {
    var Type = bobj.crv.ToolPanelType;
    var groupPanelButtonChecked = false;
    var paramPanelButtonChecked = false;
    if (Type.GroupTree == panelType) {
        groupPanelButtonChecked = true;
    } else {
        if (Type.ParameterPanel == panelType) {
            paramPanelButtonChecked = true;
        }
    }
    if (this.groupPanelToggleButton) {
        this.groupPanelToggleButton.check(groupPanelButtonChecked);
        var showOrHide = groupPanelButtonChecked ? L_bobj_crv_Hide : L_bobj_crv_Show;
        this.groupPanelToggleButton.changeTooltip(showOrHide + " " + L_bobj_crv_GroupTree);
    }
    if (this.paramPanelToggleButton) {
        this.paramPanelToggleButton.check(paramPanelButtonChecked);
        var showOrHide = paramPanelButtonChecked ? L_bobj_crv_Hide : L_bobj_crv_Show;
        this.paramPanelToggleButton.changeTooltip(showOrHide + " " + L_bobj_crv_ParamPanel);
    }
};
bobj.crv.Toolbar.update = function (update, updatePack) {
    if (update) {
        for (var childNum in update.children) {
            var child = update.children[childNum];
            if (child) {
                switch (child.cons) {
                    case"bobj.crv.newSelectPageControl":
                        if (this.selectPageControl) {
                            this.selectPageControl.update(child, updatePack);
                            this._updateNavButtons();
                        }
                        break;
                    case"bobj.crv.newSearchTextControl":
                        if (this.searchTextControl) {
                            this.searchTextControl.update(child, updatePack);
                        }
                        break;
                }
            }
        }
    }
};
bobj.crv.newToolbarButton = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        icon: null,
        tooltip: null,
        text: null,
        isDisabled: false,
        isToggleButton: false,
        isChecked: false,
        clickCB: null,
        width: 16,
        height: 16,
        dx: 3,
        dy: 3,
        disDx: 25,
        disDy: 3
    }, kwArgs);
    var cons = kwArgs.isToggleButton ? newIconCheckWidget : newIconWidget;
    var o = cons.call(null, kwArgs.id, kwArgs.icon, kwArgs.clickCB, kwArgs.text, kwArgs.tooltip, kwArgs.width, kwArgs.height, kwArgs.dx, kwArgs.dy, kwArgs.disDx, kwArgs.disDy);
    o._tbBtnOldInit = o.init;
    o._tbBtnKwArgs = kwArgs;
    MochiKit.Base.update(o, bobj.crv.ToolbarButton);
    return o;
};
bobj.crv.ToolbarButton.init = function () {
    this._tbBtnOldInit();
    var kwArgs = this._tbBtnKwArgs;
    this.setDisabled(kwArgs.isDisabled);
};
bobj.crv.newFirstPageButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_FirstPage,
        dy: bobj.crv.toolbarImageY(bobj.crv.firstIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.firstIconIndex)
    }, kwArgs));
    o.widgetType = "FirstPageButton";
    return o;
};
bobj.crv.newPrevPageButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_PrevPage,
        dy: bobj.crv.toolbarImageY(bobj.crv.prevIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.prevIconIndex)
    }, kwArgs));
    o.widgetType = "PrevPageButton";
    return o;
};
bobj.crv.newNextPageButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_NextPage,
        dy: bobj.crv.toolbarImageY(bobj.crv.nextIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.nextIconIndex)
    }, kwArgs));
    o.widgetType = "NextPageButton";
    return o;
};
bobj.crv.newLastPageButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_LastPage,
        dy: bobj.crv.toolbarImageY(bobj.crv.lastIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.lastIconIndex)
    }, kwArgs));
    o.widgetType = "LastPageButton";
    return o;
};
bobj.crv.newDrillUpButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/up.gif"),
        tooltip: L_bobj_crv_DrillUp
    }, kwArgs));
    o.widgetType = "DrillUpButton";
    return o;
};
bobj.crv.newPanelToggleButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        text: L_bobj_crv_Parameters,
        isToggleButton: true,
        clickCB: function () {
            if (this.toggleCB) {
                this.toggleCB(this.isChecked());
            }
        },
        dy: bobj.crv.toolbarImageY(bobj.crv.paramPanelIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.paramPanelIconIndex)
    }, kwArgs));
    o.widgetType = "ParamPanelToggleButton";
    return o;
};
bobj.crv.newGroupTreeToggleButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        text: L_bobj_crv_GroupTree,
        isToggleButton: true,
        clickCB: function () {
            if (this.toggleCB) {
                this.toggleCB(this.isChecked());
            }
        },
        dy: bobj.crv.toolbarImageY(bobj.crv.groupTreeIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.groupTreeIconIndex)
    }, kwArgs));
    o.widgetType = "GroupPanelToggleButton";
    return o;
};
bobj.crv.newRefreshButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_Refresh,
        dy: bobj.crv.toolbarImageY(bobj.crv.refreshIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.refreshIconIndex)
    }, kwArgs));
    o.widgetType = "RefreshButton";
    return o;
};
bobj.crv.newExportButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_Export,
        dy: bobj.crv.toolbarImageY(bobj.crv.exportIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.exportIconIndex)
    }, kwArgs));
    o.widgetType = "ExportButton";
    return o;
};
bobj.crv.newPrintButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/toolbar.gif"),
        tooltip: L_bobj_crv_Print,
        dy: bobj.crv.toolbarImageY(bobj.crv.printIconIndex),
        disDy: bobj.crv.toolbarImageY(bobj.crv.printIconIndex)
    }, kwArgs));
    o.widgetType = "PrintButton";
    return o;
};
bobj.crv.newLogoButton = function (kwArgs) {
    var o = bobj.crv.newToolbarButton(MochiKit.Base.update({
        icon: bobj.crvUri("images/logo.gif"),
        tooltip: "SAP Crystal Reports",
        clickCB: function () {
            window.location.href = "http://www.businessobjects.com/ipl/default.asp?destination=ViewerLogoLink&product=crystalreports&version=12.0";
        },
        width: 120,
        height: 20,
        dx: 0,
        dy: 0,
        disDx: 0,
        disDy: 0
    }, kwArgs));
    o.layoutAlign = "right";
    o.widgetType = "LogoButton";
    return o;
};
bobj.crv.newToolbarSeparator = function () {
    return newPaletteVerticalSepWidget(bobj.uniqueId());
};
bobj.crv.newZoomControl = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({initialZoom: "100%", id: bobj.uniqueId()}, kwArgs);
    if (bobj.isNumber(kwArgs.initialZoom)) {
        kwArgs.initialZoom = kwArgs.initialZoom + "%";
    }
    var o = newTextComboWidget(kwArgs.id, 5, L_bobj_crv_Zoom, 60, bobj.crv.ZoomControl._zoomChangeCB, null, null, null);
    var zoomList = ["400%", "300%", "200%", "150%", "125%", "100%", "75%", "50%", "25%"];
    for (var i = 0, len = zoomList.length; i < len; ++i) {
        var zoomLevel = zoomList[i];
        o.add(zoomLevel, zoomLevel, (zoomLevel == kwArgs.initialZoom));
    }
    o.text.setValue(kwArgs.initialZoom);
    o.zoomCB = null;
    o.widgetType = "ZoomControl";
    o.initOld = o.init;
    o._initZoom = kwArgs.initialZoom;
    UPDATE(o, bobj.crv.ZoomControl);
    return o;
};
bobj.crv.ZoomControl.init = function () {
    this.initOld();
    this.setZoom(this._initZoom);
};
bobj.crv.ZoomControl.setZoom = function (lvl) {
    var zoomVal = parseInt(lvl, 10);
    if (bobj.isNumber(zoomVal)) {
        zoomVal += "%";
        this.valueSelect(zoomVal);
        var si = this.selectedItem;
        if (si && si.val != zoomVal) {
            si.check(false);
            this.selectedItem = null;
        }
        this._lastValue = zoomVal;
        return true;
    }
    return false;
};
bobj.crv.ZoomControl._zoomChangeCB = function () {
    var zoomLvl = parseInt(this.text.getValue(), 10);
    if (bobj.isNumber(zoomLvl)) {
        if (zoomLvl < 10) {
            zoomLvl = 10;
        } else {
            if (zoomLvl > 400) {
                zoomLvl = 400;
            }
        }
    }
    if (!this.setZoom(zoomLvl)) {
        this.setZoom(this._lastValue);
    } else {
        if (this.zoomCB) {
            this.zoomCB(zoomLvl);
        }
    }
};
bobj.crv.newSelectPageControl = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({id: bobj.uniqueId()}, kwArgs);
    var o = newWidget(kwArgs.id);
    o.curPage = kwArgs.curPage;
    o.numPages = kwArgs.numPages;
    o.margin = 1;
    o.space = 0;
    o.fieldWidth = 30;
    o.labelWidth = 13 + o.space;
    o.intField = newIntFieldWidget(o.id + "_intField", null, null, null, function () {
        if (o.selectPageCB) {
            o.selectPageCB(o.getCurrentPage());
        }
    }, true, L_bobj_crv_SelectPage, o.fieldWidth);
    o.label = NewLabelWidget(o.id + "_label", " / " + o.numPages);
    o.initOld = o.init;
    o.selectPageCB = null;
    UPDATE(o, bobj.crv.SelectPageControl);
    o.widgetType = "SelectPageControl";
    return o;
};
bobj.crv.SelectPageControl.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newSelectPageControl") {
        this.setCurrentPage(update.args.curPage);
        this.setNumPages(update.args.numPages);
    }
};
bobj.crv.SelectPageControl.getHTML = function () {
    var h = bobj.html;
    var labelStyle = {cursor: "default", "padding-left": this.space + "px", width: this.labelWidth + "px"};
    return h.TABLE({
        id: this.id,
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        style: {margin: this.margin + "px"}
    }, h.TBODY(null, h.TR(null, h.TD(null, this.intField.getHTML()), h.TD({style: labelStyle}, this.label.getHTML()))));
};
bobj.crv.SelectPageControl.getCurrentPage = function () {
    return this.intField.getValue();
};
bobj.crv.SelectPageControl.setCurrentPage = function (val) {
    this.intField.setValue(val);
};
bobj.crv.SelectPageControl.getNumPages = function () {
    var text = this.label.text || "";
    return text.substring(3);
};
bobj.crv.SelectPageControl.setNumPages = function (val) {
    this.label.text = " / " + val;
    var labelNode = getLayer(this.label.id);
    labelNode.innerHTML = convStr(this.label.text, false);
};
bobj.crv.SelectPageControl.init = function () {
    this.initOld();
    this.intField.init();
    this.intField.setMin(1);
    this.intField.setValue(this.curPage);
    this.label.init();
};
bobj.crv.newSearchTextControl = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({id: bobj.uniqueId()}, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.textField = newTextFieldWidget(o.id + "_textField", null, null, null, MochiKit.Base.bind(bobj.crv.SearchTextControl._searchTextCB, o), true, L_bobj_crv_SearchText, 100);
    o.searchButton = newIconWidget(o.id + "_button", bobj.crvUri("images/toolbar.gif"), MochiKit.Base.bind(bobj.crv.SearchTextControl._searchTextCB, o), null, L_bobj_crv_SearchText, 16, 16, 3, bobj.crv.toolbarImageY(bobj.crv.searchIconIndex), bobj.crv.toolbarImageY(bobj.crv.searchIconIndex), 3);
    o.initOld = o.init;
    o.searchTextCB = null;
    UPDATE(o, bobj.crv.SearchTextControl);
    o.widgetType = "SearchTextControl";
    return o;
};
bobj.crv.SearchTextControl.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newSearchTextControl") {
        this.textField.setValue(update.args.searchText);
    }
};
bobj.crv.SearchTextControl.init = function () {
    this.initOld();
    this.textField.init();
    this.textField.setValue(this.searchText);
    this.searchButton.init();
};
bobj.crv.SearchTextControl.getHTML = function () {
    var h = bobj.html;
    var labelStyle = {cursor: "default", "padding-left": this.space + "px", width: this.labelWidth + "px"};
    return h.TABLE({
        id: this.id,
        cellspacing: 0,
        cellpadding: 0,
        border: 0,
        style: {margin: this.margin + "px"}
    }, h.TBODY(null, h.TR(null, h.TD(null, this.textField.getHTML()), h.TD(null, this.searchButton.getHTML()))));
};
bobj.crv.SearchTextControl._searchTextCB = function () {
    var text = this.textField.getValue();
    if ((text !== "" || this.searchText != text) && bobj.isFunction(this.searchTextCB)) {
        this.searchTextCB(text);
    }
};
if (typeof (bobj.crv.ToolPanel) == "undefined") {
    bobj.crv.ToolPanel = {};
}
if (typeof (bobj.crv.GroupTree) == "undefined") {
    bobj.crv.GroupTree = {};
}
if (typeof (bobj.crv.GroupTreeNode) == "undefined") {
    bobj.crv.GroupTreeNode = {};
}
bobj.crv.ToolPanelType = {None: "None", GroupTree: "GroupTree", ParameterPanel: "ParameterPanel"};
bobj.crv.newToolPanel = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId() + "_toolPanel",
        width: "300px",
        height: "100%",
        initialViewType: bobj.crv.ToolPanelType.None
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "ToolPanel";
    o._children = [];
    o._selectedChild = null;
    o.initOld = o.init;
    o.resizeOld = o.resize;
    MochiKit.Base.update(o, bobj.crv.ToolPanel);
    return o;
};
bobj.crv.ToolPanel.addChild = function (widget) {
    if (!widget) {
        return;
    }
    var connect = MochiKit.Signal.connect;
    var partial = MochiKit.Base.partial;
    var signal = MochiKit.Signal.signal;
    var Type = bobj.crv.ToolPanelType;
    if (widget.widgetType == "GroupTree") {
        this._groupTree = widget;
        connect(this._groupTree, "grpDrilldown", partial(signal, this, "grpDrilldown"));
        connect(this._groupTree, "grpNodeRetrieveChildren", partial(signal, this, "grpNodeRetrieveChildren"));
        connect(this._groupTree, "grpNodeCollapse", partial(signal, this, "grpNodeCollapse"));
        connect(this._groupTree, "grpNodeExpand", partial(signal, this, "grpNodeExpand"));
        if (this.initialViewType == Type.GroupTree) {
            this._selectedChild = widget;
        }
    } else {
        if (widget.widgetType == "ParameterPanel") {
            this._paramPanel = widget;
            if (this.initialViewType == Type.ParameterPanel) {
                this._selectedChild = widget;
            }
        }
    }
    this._children.push(widget);
};
bobj.crv.ToolPanel.setView = function (panelType) {
    if (this._selectedChild) {
        bobj.getContainer(this._selectedChild).style.display = "none";
    }
    var Type = bobj.crv.ToolPanelType;
    if (Type.GroupTree == panelType) {
        this._selectedChild = this._groupTree;
    } else {
        if (Type.ParameterPanel == panelType) {
            this._selectedChild = this._paramPanel;
        } else {
            this._selectedChild = null;
        }
    }
    var container = bobj.getContainer(this._selectedChild);
    if (container) {
        container.style.display = "";
    }
    this._doLayout();
};
bobj.crv.ToolPanel.getHTML = function () {
    var h = bobj.html;
    var content = "";
    var children = this._children;
    for (var i = 0, len = children.length; i < len; ++i) {
        var child = children[i];
        var display = child === this._selectedChild ? "" : "none";
        content += h.DIV({style: {display: display}}, child.getHTML());
    }
    var isDisplayed = (bobj.crv.ToolPanelType.None !== this.initialViewType);
    var layerAtt = {
        id: this.id,
        "class": "palette",
        style: {
            position: "absolute",
            margin: "0",
            width: this.width,
            height: this.height,
            overflow: "hidden",
            display: isDisplayed ? "" : "none"
        }
    };
    var html = h.DIV(layerAtt, content);
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.ToolPanel.init = function () {
    this.initOld();
    var children = this._children;
    for (var i = 0, len = children.length; i < len; ++i) {
        children[i].init();
    }
};
bobj.crv.ToolPanel.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newToolPanel") {
        for (var childVar in update.children) {
            var child = update.children[childVar];
            if (child) {
                switch (child.cons) {
                    case"bobj.crv.newGroupTree":
                        if (this._groupTree && updatePack.updateGroupTree()) {
                            this._groupTree.update(child, updatePack);
                        }
                        break;
                    case"bobj.crv.newParameterPanel":
                        break;
                }
            }
        }
    }
};
bobj.crv.ToolPanel._doLayout = function () {
    var innerWidth = this.layer.clientWidth;
    var contentHeight = this.layer.clientHeight;
    if (this._selectedChild) {
        this._selectedChild.setDisplay(true);
        this._selectedChild.resize(innerWidth, contentHeight);
    }
};
bobj.crv.ToolPanel.resize = function (w, h) {
    bobj.setOuterSize(this.layer, w, h);
    this._doLayout();
    MochiKit.Signal.signal(this, "resize", this.layer.offsetWidth, this.layer.offsetHeight);
};
bobj.crv.ToolPanel.getParameterPanel = function () {
    return this._paramPanel;
};
bobj.crv.newGroupTree = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({
        id: bobj.uniqueId(),
        visualStyle: {
            className: null,
            backgroundColor: null,
            borderWidth: null,
            borderStyle: null,
            borderColor: null,
            fontFamily: null,
            fontWeight: null,
            textDecoration: null,
            color: null,
            width: null,
            height: null,
            fontStyle: null,
            fontSize: null
        },
        icns: bobj.crvUri("images/magnify.gif"),
        minIcon: bobj.crvUri("images/min.gif"),
        plusIcon: bobj.crvUri("images/plus.gif")
    }, kwArgs);
    var o = newTreeWidget(kwArgs.id + "_tree", "100%", "100%", kwArgs.icns, null, null, null, bobj.crv.GroupTree._expand, bobj.crv.GroupTree._collapse, null, kwArgs.minIcon, kwArgs.plusIcon);
    o._children = [];
    bobj.fillIn(o, kwArgs);
    o.widgetType = "GroupTree";
    o.initOld = o.init;
    UPDATE(o, bobj.crv.GroupTree);
    return o;
};
bobj.crv.GroupTree.addChild = function (widget) {
    var CONNECT = MochiKit.Signal.connect;
    widget.expandPath = this._children.length + "";
    this._children.push(widget);
    widget._updateProperty(this.enableDrilldown, this.enableNavigation);
    this.add(widget);
    widget.delayedAddChild(this.enableDrilldown, this.enableNavigation);
    CONNECT(widget, "grpDrilldown", MochiKit.Base.partial(MochiKit.Signal.signal, this, "grpDrilldown"));
    CONNECT(widget, "grpNodeRetrieveChildren", MochiKit.Base.partial(MochiKit.Signal.signal, this, "grpNodeRetrieveChildren"));
};
bobj.crv.GroupTree.init = function () {
    this.initOld();
    bobj.setVisualStyle(this.layer, this.visualStyle);
    var children = this._children;
    for (var i = 0, len = children.length; i < len; i++) {
        children[i].init();
    }
};
bobj.crv.GroupTree.update = function (update, updatePack) {
    if (update && updatePack) {
        var updatePath = updatePack.groupTreePath();
        if (updatePath.length > 0) {
            var pathArray = updatePath.split("-");
            var updateNode = update;
            var treeNode = this;
            for (var i = 0, end = pathArray.length; i < end; i++) {
                if (updateNode && treeNode) {
                    updateNode = updateNode.children[0];
                    treeNode = treeNode._children[parseInt(pathArray[i])];
                }
            }
            if (updateNode && treeNode && updateNode.args.groupPath == treeNode.groupPath) {
                if (treeNode._children && treeNode._children.length == 0) {
                    this.updateNode(updateNode, treeNode);
                    treeNode.delayedAddChild(update.args.enableDrilldown, update.args.enableNavigation);
                }
                treeNode.expand();
            }
        }
    }
};
bobj.crv.GroupTree.updateNode = function (updateNode, treeNode) {
    if (updateNode && treeNode) {
        for (var nodeNum in updateNode.children) {
            var node = bobj.crv.createWidget(updateNode.children[nodeNum]);
            treeNode.addChild(node);
        }
    }
};
bobj.crv.GroupTree._collapse = function (expandPath) {
    MochiKit.Signal.signal(this, "grpNodeCollapse", expandPath);
};
bobj.crv.GroupTree._expand = function (expandPath) {
    MochiKit.Signal.signal(this, "grpNodeExpand", expandPath);
};
bobj.crv.GroupTree.resize = function (width, height) {
    bobj.setOuterSize(this.layer, width, height);
};
bobj.crv.newGroupTreeNode = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({id: bobj.uniqueId()}, kwArgs);
    var iconAlt = null;
    var iconId = -1;
    if (!kwArgs.isVisible) {
        iconId = 0;
        iconAlt = L_bobj_crv_Tree_Drilldown_Node.replace("%1", kwArgs.groupName);
    }
    var o = newTreeWidgetElem(iconId, kwArgs.groupName, kwArgs.groupPath, null, null, null, iconAlt);
    o._children = [];
    bobj.fillIn(o, kwArgs);
    o.widgetType = "GroupTreeNode";
    o.initOld = o.init;
    o.selectOld = o.select;
    o.select = bobj.crv.GroupTreeNode._drilldown;
    UPDATE(o, bobj.crv.GroupTreeNode);
    return o;
};
bobj.crv.GroupTreeNode.init = function () {
    this.initOld();
    this._setVisualStyle();
    if (this.isStatic) {
        var spans = MochiKit.DOM.getElementsByTagAndClassName("span", "treeNormal", this.layer);
        if (spans && spans.length > 0) {
            spans[0].style.cursor = "text";
        }
    }
};
bobj.crv.GroupTreeNode.expand = function () {
    var elemId = TreeIdToIdx(this.layer);
    _TreeWidgetElemInstances[elemId].expanded = false;
    TreeWidget_toggleCB(elemId);
};
bobj.crv.GroupTreeNode.collapse = function () {
    var elemId = TreeIdToIdx(this.layer);
    _TreeWidgetElemInstances[elemId].expanded = true;
    TreeWidget_toggleCB(elemId);
};
bobj.crv.GroupTreeNode._setVisualStyle = function () {
    try {
        var textNode = this.layer.lastChild;
        var parentNode = this.treeView;
    } catch (err) {
        return;
    }
    var pvStyle = parentNode.visualStyle;
    var tStyle = textNode.style;
    if (pvStyle.fontFamily) {
        tStyle.fontFamily = pvStyle.fontFamily;
    }
    if (pvStyle.fontWeight) {
        tStyle.fontWeight = pvStyle.fontWeight;
    }
    if (pvStyle.textDecoration) {
        tStyle.textDecoration = pvStyle.textDecoration;
    }
    if (pvStyle.color) {
        tStyle.color = pvStyle.color;
    }
    if (pvStyle.fontStyle) {
        tStyle.fontStyle = pvStyle.fontStyle;
    }
    if (pvStyle.fontSize) {
        tStyle.fontSize = pvStyle.fontSize;
    }
};
bobj.crv.GroupTreeNode.delayedAddChild = function (enableDrilldown, enableNavigation) {
    var CONNECT = MochiKit.Signal.connect;
    var SIGNAL = MochiKit.Signal.signal;
    var PARTIAL = MochiKit.Base.partial;
    var childCount = this._children.length;
    if (childCount > 0) {
        this.expanded = true;
    } else {
        this.expanded = false;
        if (!this.leaf) {
            this.setIncomplete(bobj.crv.GroupTreeNode._getChildren);
        }
    }
    var children = this._children;
    for (var i = 0; i < childCount; i++) {
        var childNode = children[i];
        childNode.expandPath = this.expandPath + "-" + i;
        childNode._updateProperty(enableDrilldown, enableNavigation);
        this.add(childNode);
        CONNECT(childNode, "grpDrilldown", PARTIAL(SIGNAL, this, "grpDrilldown"));
        CONNECT(childNode, "grpNodeRetrieveChildren", PARTIAL(SIGNAL, this, "grpNodeRetrieveChildren"));
        childNode.delayedAddChild(enableDrilldown, enableNavigation);
    }
};
bobj.crv.GroupTreeNode.addChild = function (widget) {
    this._children.push(widget);
};
bobj.crv.GroupTreeNode._drilldown = function () {
    this.selectOld();
    MochiKit.Signal.signal(this, "grpDrilldown", this.groupName, this.groupPath, this.isVisible);
};
bobj.crv.GroupTreeNode._getChildren = function () {
    this.plusLyr.src = _skin + "../loading.gif";
    MochiKit.Signal.signal(this, "grpNodeRetrieveChildren", this.expandPath);
};
bobj.crv.GroupTreeNode._updateProperty = function (enableDrilldown, enableNavigation) {
    var isStatic = false;
    if (this.isVisible && !enableNavigation) {
        isStatic = true;
    } else {
        if (!this.isVisible && !enableDrilldown) {
            isStatic = true;
        }
    }
    if (isStatic) {
        this.select = function () {
        };
    }
    this.isStatic = isStatic;
};
if (typeof (bobj.crv.ReportPage) == "undefined") {
    bobj.crv.ReportPage = {};
}
bobj.crv.ReportPage.DocumentView = {WEB_LAYOUT: "weblayout", PRINT_LAYOUT: "printlayout"};
bobj.crv.newReportPage = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        bgColor: "#FFFFFF",
        width: 720,
        height: 984,
        topMargin: 0,
        rightMargin: 0,
        leftMargin: 0,
        bottomMargin: 0,
        documentView: bobj.crv.ReportPage.DocumentView.PRINT_LAYOUT
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "ReportPage";
    bobj.fillIn(o, kwArgs);
    o.initOld = o.init;
    o.resizeOld = o.resize;
    MochiKit.Base.update(o, bobj.crv.ReportPage);
    return o;
};
bobj.crv.ReportPage.setHTML = function (content) {
    var pageNode = this._pageNode;
    bobj.removeAllChildElements(pageNode);
    if (bobj.isString(content)) {
        pageNode.innerHTML = content;
    } else {
        if (bobj.isObject(content)) {
            pageNode.appendChild(content);
            var contentStyle = content.style;
            contentStyle.display = "block";
            contentStyle.visibility = "visible";
        }
    }
};
bobj.crv.ReportPage.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newReportPage") {
        this.updateSize({
            width: update.args.width,
            height: update.args.height,
            leftMargin: update.args.leftMargin,
            rightMargin: update.args.rightMargin,
            topMargin: update.args.topMargin,
            bottomMargin: update.args.bottomMargin
        });
        this.updateHTML(update.args.content);
        this.layer.scrollLeft = 0;
        this.layer.scrollTop = 0;
    }
};
bobj.crv.ReportPage.loadContent = function () {
    if (this.content) {
        this.updateHTML(this.content);
    }
};
bobj.crv.ReportPage.updateHTML = function (content) {
    var cssID = this.id + "_stylesheet";
    var prevStyle = getLayer(cssID);
    var styleText = "";
    if (content) {
        var ext = bobj.html.extractHtml(content);
        var links = ext.links;
        for (var iLinks = 0, linksLen = links.length; iLinks < linksLen; ++iLinks) {
            bobj.includeLink(links[iLinks]);
        }
        var styleText = "";
        for (var i = 0, len = ext.styles.length; i < len; i++) {
            styleText += ext.styles[i].text + "\n";
        }
        if (prevStyle) {
            MochiKit.DOM.removeElement(prevStyle);
        }
        bobj.addStyleSheet(styleText, cssID);
        this.setHTML(ext.html);
        var scripts = ext.scripts;
        for (var iScripts = 0, scriptsLen = scripts.length; iScripts < scriptsLen; ++iScripts) {
            var script = scripts[iScripts];
            if (!script) {
                continue;
            }
            if (script.text) {
                try {
                    bobj.evalInWindow(script.text);
                } catch (err) {
                }
            }
        }
        var divs = this._pageNode.getElementsByTagName("div");
        if (divs && divs[0]) {
            divs[0].style.position = "relative";
            divs[0].style.visibility = "visible";
        }
    }
};
bobj.crv.ReportPage.updateSize = function (sizeObject) {
    if (sizeObject) {
        this.width = (sizeObject.width != undefined) ? sizeObject.width : this.width;
        this.height = (sizeObject.height != undefined) ? sizeObject.height : this.height;
        this.leftMargin = (sizeObject.leftMargin != undefined) ? sizeObject.leftMargin : this.leftMargin;
        this.rightMargin = (sizeObject.rightMargin != undefined) ? sizeObject.rightMargin : this.rightMargin;
        this.topMargin = (sizeObject.topMargin != undefined) ? sizeObject.topMargin : this.topMargin;
        this.bottomMargin = (sizeObject.bottomMargin != undefined) ? sizeObject.bottomMargin : this.bottomMargin;
    }
    var isBorderBoxModel = bobj.isBorderBoxModel();
    var pageOuterHeight = this.height + this.topMargin + this.bottomMargin;
    var pageOuterWidth = this.width + this.leftMargin + this.rightMargin;
    var contentHeight = isBorderBoxModel ? pageOuterHeight : this.height;
    var contentWidth = isBorderBoxModel ? pageOuterWidth : this.width;
    if (this._pageCtnNode) {
        this._pageCtnNode.style.width = pageOuterWidth + "px";
        this._pageCtnNode.style.height = pageOuterHeight + "px";
    }
    if (this._pageNode) {
        this._pageNode.style.width = contentWidth + "px";
        this._pageNode.style.height = contentHeight + "px";
        this._pageNode.style.paddingTop = this.topMargin + "px";
        this._pageNode.style.paddingRight = this.rightMargin + "px";
        this._pageNode.style.paddingLeft = this.leftMargin + "px";
        this._pageNode.style.paddingBottom = this.bottomMargin + "px";
    }
    if (this._shadowNode) {
        this._shadowNode.style.width = pageOuterWidth + "px";
        this._shadowNode.style.height = pageOuterHeight + "px";
    }
};
bobj.crv.ReportPage.getHTML = function () {
    var h = bobj.html;
    var isBorderBoxModel = bobj.isBorderBoxModel();
    var layerStyle = {width: "100%", height: "100%", overflow: "auto", position: "absolute"};
    var pageOuterHeight = this.height + this.topMargin + this.bottomMargin;
    var pageOuterWidth = this.width + this.leftMargin + this.rightMargin;
    var contentHeight = isBorderBoxModel ? pageOuterHeight : this.height;
    var contentWidth = isBorderBoxModel ? pageOuterWidth : this.width;
    var positionStyle = {
        left: "4px",
        width: pageOuterWidth + "px",
        height: pageOuterHeight + "px",
        "text-align": "left",
        top: "4px",
        overflow: "visible",
        position: "relative"
    };
    if (_saf) {
        positionStyle["display"] = "table";
    }
    var pageStyle = {
        position: "relative",
        width: contentWidth + "px",
        height: contentHeight + "px",
        "z-index": 1,
        "border-width": "1px",
        "border-style": "solid",
        "background-color": this.bgColor,
        "padding-top": this.topMargin + "px",
        "padding-right": this.rightMargin + "px",
        "padding-left": this.leftMargin + "px",
        "padding-bottom": this.bottomMargin + "px"
    };
    var shadowStyle = {
        position: "absolute",
        filter: "progid:DXImageTransform.Microsoft.Blur(PixelRadius='2', MakeShadow='false', ShadowOpacity='0.75')",
        "z-index": 0,
        width: pageOuterWidth + "px",
        height: pageOuterHeight + "px",
        margin: "0 auto",
        left: (isBorderBoxModel ? 2 : 6) + "px",
        top: (isBorderBoxModel ? 2 : 6) + "px"
    };
    var shadowHTML = "";
    if (this.documentView.toLowerCase() == bobj.crv.ReportPage.DocumentView.PRINT_LAYOUT) {
        layerStyle["background-color"] = "#8E8E8E";
        pageStyle["border-color"] = "#000000";
        shadowStyle["background-color"] = "#737373";
        shadowHTML = h.DIV({id: this.id + "_shadow", "class": "menuShadow", style: shadowStyle});
        layerStyle["text-align"] = "center";
        positionStyle["margin"] = "0 auto";
    } else {
        layerStyle["background-color"] = "#FFFFFF";
        pageStyle["border-color"] = "#FFFFFF";
        positionStyle["margin"] = "0";
    }
    var html = h.DIV({id: this.id, style: layerStyle, "class": "insetBorder"}, h.DIV({
        id: this.id + "_pageCtn",
        style: positionStyle
    }, h.DIV({id: this.id + "_page", style: pageStyle}), shadowHTML));
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.ReportPage.init = function () {
    this._pageCtnNode = getLayer(this.id + "_pageCtn");
    this._pageNode = getLayer(this.id + "_page");
    this._shadowNode = getLayer(this.id + "_shadow");
    this.initOld();
};
bobj.crv.ReportPage.resize = function (w, h) {
    bobj.setOuterSize(this.layer, w, h);
    if (_moz) {
        this.css.clip = bobj.getRect(0, w, h, 0);
    }
};
bobj.crv.ReportPage.getBestFitSize = function () {
    var page = this._pageNode;
    return {width: page.offsetWidth + 30, height: page.offsetHeight + 30};
};
if (typeof (bobj.crv.ReportView) == "undefined") {
    bobj.crv.ReportView = {};
}
bobj.crv.newReportView = function (kwArgs) {
    kwArgs = MochiKit.Base.update({id: bobj.uniqueId(), viewStateId: null, isMainReport: false}, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "ReportView";
    o.toolPanel = null;
    o.reportPage = null;
    o.grabber = null;
    o._lastPanelWidth = null;
    o.initOld = o.init;
    o.isMainReportFlag = o.isMainReport;
    o.setDisplayOld = o.setDisplay;
    MochiKit.Base.update(o, bobj.crv.ReportView);
    return o;
};
bobj.crv.ReportView.init = function () {
    var connect = MochiKit.Signal.connect;
    var signal = MochiKit.Signal.signal;
    var partial = MochiKit.Base.partial;
    this.initOld();
    if (this.toolPanel) {
        connect(this.toolPanel, "grpDrilldown", partial(signal, this, "grpDrilldown"));
        connect(this.toolPanel, "grpNodeRetrieveChildren", partial(signal, this, "grpNodeRetrieveChildren"));
        connect(this.toolPanel, "grpNodeCollapse", partial(signal, this, "grpNodeCollapse"));
        connect(this.toolPanel, "grpNodeExpand", partial(signal, this, "grpNodeExpand"));
        connect(this.toolPanel, "paramAdvanced", partial(signal, this, "paramAdvanced"));
        connect(this.toolPanel, "paramApply", partial(signal, this, "paramApply"));
    }
    if (this.grabber) {
        this.grabber.init();
        if (!this.toolPanel.isDisplayed()) {
            this.grabber.setDisplay(false);
        }
    }
};
bobj.crv.ReportView.addChild = function (widget) {
    var mb = MochiKit.Base;
    var ms = MochiKit.Signal;
    if (widget.widgetType == "ToolPanel") {
        this.toolPanel = widget;
        ms.connect(this.toolPanel, "resize", mb.partial(ms.signal, this, "resizeToolPanel"));
    } else {
        if (widget.widgetType == "ReportPage") {
            this.reportPage = widget;
        }
    }
};
bobj.crv.ReportView.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newReportView") {
        for (var childVar in update.children) {
            var child = update.children[childVar];
            if (child) {
                switch (child.cons) {
                    case"bobj.crv.newToolPanel":
                        if (this.toolPanel && updatePack.updateToolPanel()) {
                            this.toolPanel.update(child, updatePack);
                        }
                        break;
                    case"bobj.crv.newReportPage":
                        if (this.reportPage && updatePack.updateReportPage()) {
                            this.reportPage.update(child, updatePack);
                        }
                        break;
                }
            }
        }
    }
};
bobj.crv.ReportView.getHTML = function () {
    var h = bobj.html;
    if (this.toolPanel && this.reportPage) {
        this.grabber = newGrabberWidget(this.id + "_grabber", MochiKit.Base.bind(bobj.crv.ReportView._grabberCB, this), 0, 0, 4, 1, true);
    }
    var layerStyle = {width: "100%", height: "100%", overflow: "hidden", position: "relative"};
    var html = h.DIV({
        id: this.id,
        style: layerStyle
    }, this.toolPanel ? this.toolPanel.getHTML() : "", this.grabber ? this.grabber.getHTML() : "", this.reportPage ? this.reportPage.getHTML() : "");
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.ReportView._doLayout = function () {
    if (!this.isDisplayed()) {
        return;
    }
    var panelW = this.toolPanel && this.toolPanel.isDisplayed() ? this.toolPanel.getWidth() : 0;
    var grabberW = this.grabber && this.grabber.isDisplayed() ? this.grabber.getWidth() : 0;
    var innerHeight = this.getHeight();
    if (this.reportPage) {
        this.reportPage.resize(this.getWidth() - panelW - grabberW, innerHeight);
        this.reportPage.move(panelW + grabberW, 0);
    }
    if (this.grabber && this.grabber.isDisplayed()) {
        this.grabber.resize(null, innerHeight);
        this.grabber.move(panelW, 0);
    }
    if (this.toolPanel && this.toolPanel.isDisplayed()) {
        this.toolPanel.resize(null, innerHeight);
    }
};
bobj.crv.ReportView.isMainReport = function () {
    return this.isMainReportFlag;
};
bobj.crv.ReportView._grabberCB = function (x, y) {
    this.toolPanel.resize(x);
    this._doLayout();
};
bobj.crv.ReportView.setDisplay = function (isDisplayed) {
    this.setDisplayOld(isDisplayed);
    if (isDisplayed) {
        this._doLayout();
    }
};
bobj.crv.ReportView.resize = function () {
    this._doLayout();
};
bobj.crv.ReportView.getBestFitSize = function () {
    var w = 0;
    var h = 0;
    var pageSize = this.reportPage ? this.reportPage.getBestFitSize() : null;
    if (pageSize) {
        w += pageSize.width;
        h += pageSize.height;
    } else {
        if (this.toolPanel) {
            h += this.toolPanel.getHeight();
        }
    }
    if (this.toolPanel) {
        w += this.toolPanel.getWidth();
    }
    if (this.grabber) {
        w += this.grabber.getWidth();
    }
    return {width: w, height: h};
};
bobj.crv.ReportView.setDisplayToolPanel = function (disp) {
    if (this.toolPanel) {
        this.toolPanel.setDisplay(disp);
        if (this.grabber) {
            this.grabber.setDisplay(disp);
        }
        this._doLayout();
        MochiKit.Signal.signal(this, disp ? "showToolPanel" : "hideToolPanel");
    }
};
bobj.crv.ReportView.hasContent = function () {
    return this.toolPanel || this.reportPage;
};

function GrabberWidget_getHTML() {
    var o = this;
    var cr = o.isHori ? _resizeW : _resizeH;
    var moveableCb = 'onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + ".GrabberWidget_down(event,'" + o.index + "',this);return false;\"";
    var imgG = _ie ? ('<img onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0" src="' + _skin + '../transp.gif" id="modal_' + o.id + '" style="z-index:10000;display:none;position:absolute;top:0px;left:0px;width:1px;height:1px;cursor:' + cr + '">') : ('<div onselectstart="return false" ondragstart="return false" onmousedown="' + _codeWinName + '.eventCancelBubble(event)" border="0" hspace="0" vspace="0" id="modal_' + o.id + '" style="z-index:10000;display:none;position:absolute;top:0px;left:0px;width:1px;height:1px;cursor:' + cr + '"></div>');
    return getBGIframe("grabIframe_" + o.id) + imgG + '<table cellpadding="0" cellspacing="0" border="0" ' + moveableCb + ' id="' + o.id + '" style="overflow:hidden;position:absolute;left:' + o.x + "px;top:" + o.y + "px;width:" + o.w + "px;height:" + o.h + "px;cursor:" + cr + '"><tr><td></td></tr></table>';
}

if (typeof (bobj.crv.ReportAlbum) == "undefined") {
    bobj.crv.ReportAlbum = {};
}
if (typeof (bobj.crv.Tab) == "undefined") {
    bobj.crv.Tab = {};
}
if (typeof (bobj.crv.TabBar) == "undefined") {
    bobj.crv.TabBar = {};
}
if (typeof (bobj.crv.ButtonList) == "undefined") {
    bobj.crv.ButtonList = {};
}
bobj.crv.newReportAlbum = function (kwArgs) {
    var mb = MochiKit.Base;
    var UPDATE = mb.update;
    var BIND = mb.bind;
    var ALBUM = bobj.crv.ReportAlbum;
    kwArgs = UPDATE({id: bobj.uniqueId(), initTabIdx: 0, width: 800, height: 500, displayDrilldownTab: true}, kwArgs);
    var o = newTabbedZone(kwArgs.id, null, kwArgs.width, kwArgs.height);
    o.tabs = bobj.crv.newTabBar({displayDrilldownTab: kwArgs.displayDrilldownTab});
    o.tabs.removeCB = BIND(ALBUM._onCloseTab, o);
    o.tabs.selectCB = BIND(ALBUM._onSelectTab, o);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "ReportAlbum";
    o._children = [];
    o._curView = null;
    o._curSigs = [];
    o.selectOld = o.select;
    UPDATE(o, ALBUM);
    return o;
};
bobj.crv.ReportAlbum.init = function () {
    var connect = MochiKit.Signal.connect;
    var signal = MochiKit.Signal.signal;
    var partial = MochiKit.Base.partial;
    this.tzOldInit();
    this.tabs.init();
    if (this._children.length) {
        if (this.initTabIdx < 0 || this.initTabIdx >= this._children.length) {
            this.initTabIdx = 0;
        }
        this.select(this.initTabIdx);
        connect(this._curView, "grpDrilldown", partial(signal, this, "grpDrilldown"));
        connect(this._curView, "grpNodeRetrieveChildren", partial(signal, this, "grpNodeRetrieveChildren"));
        connect(this._curView, "grpNodeCollapse", partial(signal, this, "grpNodeCollapse"));
        connect(this._curView, "grpNodeExpand", partial(signal, this, "grpNodeExpand"));
        connect(this._curView, "paramAdvanced", partial(signal, this, "paramAdvanced"));
        connect(this._curView, "paramApply", partial(signal, this, "paramApply"));
    }
};
bobj.crv.ReportAlbum.update = function (update, updatePack) {
    if (update && update.cons == "bobj.crv.newReportAlbum" && this.getSelectedView()) {
        var update_activeView = update.children[update.args.initTabIdx];
        if (update_activeView) {
            if (update_activeView.args.viewStateId == this.getSelectedView().viewStateId) {
                this.getSelectedView().update(update_activeView, updatePack);
            }
        }
    }
};
bobj.crv.ReportAlbum.addChild = function (widget) {
    if (widget) {
        this._children.push(widget);
        this.add(widget.label, widget.tooltip);
    }
};
bobj.crv.ReportAlbum.getHTML = function () {
    var html = this.beginHTML();
    var children = this._children;
    for (var i = 0, len = children.length; i < len; ++i) {
        html += this.beginTabHTML(i);
        html += children[i].getHTML();
        html += this.endTabHTML();
    }
    html += this.endHTML();
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.ReportAlbum.resizeOuter = function (w, h) {
    var ISNUMBER = bobj.isNumber;
    if (ISNUMBER(w)) {
        w = Math.max(0, w - 10);
    }
    if (ISNUMBER(h)) {
        h = Math.max(0, h - 33);
    }
    this.resize(w, h);
    this.tabs.resize(w);
    if (this._curView) {
        this._curView.resize();
    }
};
bobj.crv.ReportAlbum.getBestFitSize = function () {
    var w = 10;
    var h = 33;
    if (this._curView) {
        var viewSize = this._curView.getBestFitSize();
        w += viewSize.width;
        h += viewSize.height;
    }
    return {width: w, height: h};
};
bobj.crv.ReportAlbum.beginTabHTML = function (index) {
    return bobj.html.openTag("div", {
        id: "tzone_tab_" + index + "_" + this.id,
        style: {display: "none", width: this.w + "px", height: this.h + "px", position: "relative"}
    });
};
bobj.crv.ReportAlbum.getSelectedView = function () {
    return this._curView;
};
bobj.crv.ReportAlbum.isToolPanelDisplayed = function () {
    return this._curView && this._curView.toolPanel && this._curView.toolPanel.isDisplayed();
};
bobj.crv.ReportAlbum.setDisplayToolPanel = function (disp) {
    if (this._curView) {
        this._curView.setDisplayToolPanel(disp);
    }
};
bobj.crv.ReportAlbum.select = function (index) {
    var ms = MochiKit.Signal;
    var DISCONNECT = ms.disconnect;
    var CONNECT = ms.connect;
    var SIGNAL = ms.signal;
    if (index >= 0 && index < this._children.length) {
        var curSigs = this._curSigs;
        while (curSigs.length) {
            DISCONNECT(curSigs.pop());
        }
        this._curView = this._children[index];
        var _self = this;
        curSigs.push(CONNECT(this._curView, "hideToolPanel", function () {
            SIGNAL(_self, "hideToolPanel");
        }));
        curSigs.push(CONNECT(this._curView, "resizeToolPanel", function (width) {
            SIGNAL(_self, "resizeToolPanel", width);
        }));
        this.selectOld(index);
    }
};
bobj.crv.ReportAlbum.remove = function (index) {
    var viewCtnr = this.zoneLayers[index];
    if (viewCtnr && viewCtnr.parentNode) {
        viewCtnr.parentNode.removeChild(viewCtnr);
    }
    arrayRemove(this, "zoneLayers", index);
    arrayRemove(this, "_children", index);
    var newIdx = this.tabs.getSelection();
    if (newIdx >= 0) {
        this.select(newIdx);
    }
};
bobj.crv.ReportAlbum._onCloseTab = function (tab, index) {
    var SIGNAL = MochiKit.Signal.signal;
    var view = this._children[index];
    this.remove(index);
    SIGNAL(this, "removeView", view);
    SIGNAL(this, "selectView", this._curView);
};
bobj.crv.ReportAlbum._onSelectTab = function (tab, index) {
    this.select(index);
    MochiKit.Signal.signal(this, "selectView", this._curView);
};
bobj.crv.newTab = function (kwArgs) {
    var update = MochiKit.Base.update;
    kwArgs = update({id: bobj.uniqueId(), hasCloseBtn: true, closeCB: null, tabWidth: 50}, kwArgs);
    kwArgs.isTop = true;
    var o = newTabWidget(kwArgs.id, kwArgs.isTop, kwArgs.label, kwArgs.clickCB, kwArgs.value, kwArgs.icon, kwArgs.iconW, kwArgs.iconH, kwArgs.iconOffX, kwArgs.iconOffY, kwArgs.dblClickCB, kwArgs.alt);
    o._crvTabOldInit = o.init;
    o._closeBtn = null;
    bobj.fillIn(o, kwArgs);
    update(o, bobj.crv.Tab);
    return o;
};
bobj.crv.Tab._imageOffsets = {
    closeBtn: {normal: {x: 0, y: 18, w: 18, h: 18}, mouseOver: {x: 0, y: 0, w: 18, h: 18}},
    tab: {
        top: {
            selected: {
                left: {x: 0, y: 0, w: 15, h: 24},
                middle: {x: 0, y: 24},
                right: {normal: {x: 0, y: 48, w: 15, h: 24}, narrow: {x: 10, y: 48, w: 5, h: 24}}
            },
            unselected: {
                left: {x: 0, y: 72, w: 15, h: 24},
                middle: {x: 0, y: 96},
                right: {normal: {x: 0, y: 120, w: 15, h: 24}, narrow: {x: 10, y: 120, w: 5, h: 24}}
            }
        }
    }
};
bobj.crv.Tab.init = function () {
    var bind = MochiKit.Base.bind;
    var TAB = bobj.crv.Tab;
    this._crvTabOldInit();
    var closeBtn = getLayer("tabWidgetCloseBtn_" + this.id);
    if (closeBtn) {
        closeBtn.onmouseover = bind(TAB._onCloseBtnMouseOver, this);
        closeBtn.onmouseout = bind(TAB._onCloseBtnMouseOut, this);
        closeBtn.parentNode.onclick = bind(TAB._onCloseBtnClick, this);
    }
    this._closeBtn = closeBtn;
};
bobj.crv.Tab._onCloseBtnMouseOver = function () {
    var off = this._imageOffsets.closeBtn.mouseOver;
    changeOffset(this._closeBtn, off.x, off.y);
};
bobj.crv.Tab._onCloseBtnMouseOut = function () {
    var off = this._imageOffsets.closeBtn.normal;
    changeOffset(this._closeBtn, off.x, off.y);
};
bobj.crv.Tab._onCloseBtnClick = function () {
    if (this.closeCB) {
        this.closeCB();
    }
};
bobj.crv.Tab.getHTML = function () {
    var o = this;
    var update = MochiKit.Base.update;
    var h = bobj.html;
    var off = this._imageOffsets;
    var cls = "thumbtxt" + (o.isSelected ? "sel" : "");
    var cb = _codeWinName + ".TabWidget_clickCB('" + o.id + "');return false";
    var dblcb = _codeWinName + ".TabWidget_dblclickCB('" + o.id + "');return false";
    var keycb = _codeWinName + ".TabWidget_keyDownCB('" + o.id + "',event);";
    var menu = _codeWinName + ".TabWidget_contextMenuCB('" + o.id + "',event);return false";
    var icon = o.icon ? o.icon : _skin + "../transp.gif";
    var iconTDWidth = o.icon ? 3 : 0;
    var tabOff = off.tab[this.isTop ? "top" : "bottom"];
    tabOff = tabOff[this.selected ? "selected" : "unselected"];
    var lOff = tabOff.left;
    var rOff = tabOff.right[this.hasCloseBtn ? "narrow" : "normal"];
    var mOff = tabOff.middle;
    var cBtOff = off.closeBtn.normal;
    var widgetAtts = {
        onmouseover: "return true;",
        onclick: cb,
        id: this.id,
        ondblclick: dblcb,
        onkeydown: keycb,
        oncontextmenu: menu,
        style: {cursor: _hand},
        cellspacing: "0",
        cellpadding: "0",
        border: "0"
    };
    var midCellStyle = {
        "background-image": "url('" + _skin + "tabs.gif')",
        "background-position": (-mOff.x) + "px " + (-mOff.y) + "px"
    };
    if (this.isTop) {
        midCellStyle["padding-top"] = "1px";
    } else {
        midCellStyle["padding-bottom"] = "3px";
    }
    var imgCellStyle = update({
        "padding-right:": iconTDWidth + "px",
        "width": (this.iconW + iconTDWidth),
        "align": "left"
    }, midCellStyle);
    if (this.isTop) {
        imgCellStyle["padding-top"] = "1px";
    } else {
        imgCellStyle["padding-bottom"] = "2px";
    }
    var closeCellStyle = update({display: this.hasCloseBtn ? "" : "none"}, midCellStyle);
    var html = h.TABLE(widgetAtts, h.TBODY(null, h.TR({
        valign: "middle",
        height: lOff.h
    }, h.TD({width: lOff.w}, imgOffset(_skin + "tabs.gif", lOff.w, lOff.h, lOff.x, lOff.y, "tabWidgetLeft_" + o.id)), h.TD({
        id: "tabWidgetImg_" + o.id,
        style: imgCellStyle
    }, imgOffset(icon, o.iconW, o.iconH, o.iconOffX, o.iconOffY, "tabWidgetIcon_" + o.id, null, o.iconAlt)), h.TD({
        width: o.tabWidth,
        id: "tabWidgetMid_" + this.id,
        style: midCellStyle
    }, h.SPAN({style: {"white-space": "nowrap"}}, lnk(convStr(o.name, true), null, cls, "tabWidgetLnk_" + o.id))), h.TD({
        width: cBtOff.w,
        id: "tabWidgetClose_" + o.id,
        style: closeCellStyle
    }, h.A({
        href: "javascript:void(0)",
        title: L_bobj_crv_Close
    }, imgOffset(_skin + "dialogelements.gif", cBtOff.w, cBtOff.h, cBtOff.x, cBtOff.y, "tabWidgetCloseBtn_" + o.id))), h.TD({width: rOff.w}, imgOffset(_skin + "tabs.gif", rOff.w, rOff.h, rOff.x, rOff.y, "tabWidgetRight_" + o.id)))));
    return html;
};
bobj.crv.Tab.changeContent = function (changeOnlySelection) {
    var o = this;
    if (!o.lnkLayer) {
        o.lnkLayer = getLayer("tabWidgetLnk_" + o.id);
        o.leftImgLayer = getLayer("tabWidgetLeft_" + o.id);
        o.rightImgLayer = getLayer("tabWidgetRight_" + o.id);
        o.midImgLayer = getLayer("tabWidgetMid_" + o.id);
        o.imgImgLayer = getLayer("tabWidgetImg_" + o.id);
        o.closeImgLayer = getLayer("tabWidgetClose_" + o.id);
        o.iconLayer = getLayer("tabWidgetIcon_" + o.id);
    }
    if (!changeOnlySelection) {
        o.lnkLayer.innerHTML = convStr(o.name, true);
        var iconLayer = o.iconLayer;
        changeOffset(iconLayer, o.iconOffX, o.iconOffY, o.icon ? o.icon : _skin + "../transp.gif");
        iconLayer.alt = o.iconAlt;
        iconLayer.style.width = "" + o.iconW + "px";
        iconLayer.style.height = "" + o.iconH + "px";
        var iconTDWidth = o.icon ? 3 : 0;
        var imgL = o.imgImgLayer;
        imgL.style.paddingRight = "" + iconTDWidth + "px";
        imgL.style.width = "" + (iconTDWidth + ((o.icon && bobj.isNumber(o.iconW)) ? o.iconW : 0)) + "px";
        if (_moz && !_saf) {
            imgL.width = (iconTDWidth + ((o.icon && bobj.isNumber(o.iconW)) ? o.iconW : 0));
        }
    }
    var off = this._imageOffsets;
    var tabOff = off.tab[this.isTop ? "top" : "bottom"];
    tabOff = tabOff[this.isSelected ? "selected" : "unselected"];
    var lOff = tabOff.left;
    var rOff = tabOff.right[this.hasCloseBtn ? "narrow" : "normal"];
    var mOff = tabOff.middle;
    changeOffset(o.leftImgLayer, lOff.x, lOff.y);
    changeOffset(o.midImgLayer, mOff.x, mOff.y);
    changeOffset(o.closeImgLayer, mOff.x, mOff.y);
    changeOffset(o.imgImgLayer, mOff.x, mOff.y);
    changeOffset(o.rightImgLayer, rOff.x, rOff.y);
    o.lnkLayer.className = "thumbtxt" + (o.isSelected ? "sel" : "");
};
bobj.crv.newTabBar = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({id: bobj.uniqueId(), removeCB: null, selectCB: null, displayDrilldownTab: true}, kwArgs);
    kwArgs.isTop = true;
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "TabBar";
    o._tabs = [];
    o._tabRowLayer = null;
    o._tabBarLayer = null;
    o._selIndex = 0;
    o._tabBarOldInit = o.init;
    o._tabBarOldResize = o.resize;
    o._selTabXOffset = 0;
    o._menuBtnWidth = 24;
    var bind = MochiKit.Base.bind;
    o._tabMenuBtn = bobj.crv.newButtonList({
        id: o.id + "_sel",
        buttonWidth: o._menuBtnWidth,
        changeCB: bind(bobj.crv.TabBar._onMenuChange, o)
    });
    UPDATE(o, bobj.crv.TabBar);
    return o;
};
bobj.crv.TabBar.init = function () {
    this._tabBarOldInit();
    if (this._tabMenuBtn) {
        this._tabMenuBtn.init();
    }
    if (this.displayDrilldownTab === false) {
        this.hide();
    }
    this._tabRowLayer = getLayer(this.id + "_tabRow");
    this._tabBarLayer = getLayer(this.id + "_tabBar");
    this._tabCtnLayer = this._tabBarLayer.parentNode;
    this._tabSelLayer = getLayer(this.id + "_tabSel");
    for (var i = 0; i < this._tabs.length; ++i) {
        var tab = this._tabs[i];
        tab.init();
        tab.select(i == this._selIndex);
    }
    setTimeout(MochiKit.Base.bind(this._setMenuVis, this), 0);
};
bobj.crv.TabBar.add = function (label, value, idx, icon, iconW, iconH, iconOffX, iconOffY, alt, hasCloseBtn) {
    var kwArgs = {
        label: label,
        value: value,
        idx: idx,
        icon: icon,
        iconW: iconW,
        iconH: iconH,
        iconOffX: iconOffX,
        iconOffY: iconOffY,
        alt: alt,
        isTop: this.isTop
    };
    if (bobj.isBoolean(hasCloseBtn)) {
        kwArgs.hasCloseBtn = hasCloseBtn;
    } else {
        kwArgs.hasCloseBtn = (this._tabs.length ? true : false);
    }
    return this.kwAdd(kwArgs);
};
bobj.crv.TabBar.kwAdd = function (kwArgs) {
    var bind = MochiKit.Base.bind;
    kwArgs.id = bobj.uniqueId();
    var tab = bobj.crv.newTab(kwArgs);
    tab.cb = bind(this._onTabClick, this, tab);
    tab.closeCB = bind(this._onTabCloseBtnClick, this, tab);
    this._tabs.push(tab);
    this._tabMenuBtn.add(kwArgs.label);
    return tab;
};
bobj.crv.TabBar.remove = function (tab) {
    var o = this;
    var items = o._tabs;
    var len = items.length;
    var idx = bobj.isNumber(tab) ? tab : this.getIndex(tab);
    if (idx >= 0 && idx < len) {
        var elem = items[idx];
        var l = elem.layer;
        arrayRemove(o, "_tabs", idx);
        o._tabMenuBtn.getMenu().del(idx);
        items = o._tabs;
        len = items.length;
        if (l) {
            l.parentNode.style.display = "none";
        }
        o._setMenuVis();
        if (o._selIndex > idx) {
            o.select(o._selIndex - 1);
        } else {
            if (o._selIndex == idx && len > 0) {
                o.select(Math.min(idx, len - 1));
            } else {
                o.select(o._selIndex);
            }
        }
    }
};
bobj.crv.TabBar.hide = function () {
    try {
        var parent1 = this.layer.parentNode;
        var parent2 = parent1.parentNode;
        parent2.style.display = "none";
    } catch (ex) {
        if (bobj.crv.config.isDebug) {
            throw ex;
        }
    }
};
bobj.crv.TabBar.getIndex = function (tab) {
    return MochiKit.Base.findIdentical(this._tabs, tab);
};
bobj.crv.TabBar.getSelection = function () {
    return this._selIndex;
};
bobj.crv.TabBar.getCount = function () {
    return this._tabs.length;
};
bobj.crv.TabBar.getTabAt = function (index) {
    return this._tabs[index];
};
bobj.crv.TabBar.select = function (tab) {
    if (!bobj.isNumber(tab)) {
        tab = this.getIndex(tab);
    }
    if (bobj.isNumber(tab)) {
        var index = tab;
        var len = this._tabs.length;
        if (index == -1) {
            if (this._selIndex >= 0 && this._selIndex < len) {
                return;
            }
            index = 0;
        }
        if (index >= 0 && index < len) {
            if (this._selIndex >= 0 && this._selIndex != index && this._selIndex < len) {
                this._tabs[this._selIndex].select(false);
            }
            this._selIndex = index;
            this._tabs[index].select(true);
            if (this._tabMenuBtn) {
                this._tabMenuBtn.getMenu().select(index);
            }
            this.scroll(null, this._selIndex);
        }
    }
};
bobj.crv.TabBar.resize = function (w, h) {
    this._tabBarOldResize(w, h);
    if (bobj.isNumber(w) && this._tabBarLayer) {
        this._tabCtnLayer.style.width = Math.max(0, w) + "px";
        this._setMenuVis();
        this.scroll(this._selIndex);
    }
};
bobj.crv.TabBar._setMenuVis = function () {
    var bar = this._tabBarLayer;
    var ctn = this._tabCtnLayer;
    var sel = this._tabSelLayer;
    if (bar && ctn && sel) {
        if (ctn.offsetWidth < bar.offsetWidth) {
            sel.style.display = "";
        } else {
            sel.style.display = "none";
        }
    }
};
bobj.crv.TabBar.scroll = function (tab, idx) {
    if (!this._tabBarLayer) {
        return;
    }
    idx = bobj.isNumber(idx) ? idx : -1;
    if (bobj.isString(tab)) {
        if (tab == "first") {
            idx = 0;
        } else {
            if (tab == "previous") {
                idx = this._selIndex - 1;
            } else {
                if (tab == "next") {
                    idx = this._selIndex + 1;
                } else {
                    if (tab == "last") {
                        idx = this.getCount() - 1;
                    }
                }
            }
        }
    } else {
        if (bobj.isNumber(tab)) {
            idx = tab;
        } else {
            if (tab) {
                idx = this.getIndex(tab);
            }
        }
    }
    if (idx >= 0 && idx < this.getCount()) {
        var bar = this._tabBarLayer;
        var barCtn = bar.parentNode;
        var barStyle = bar.style;
        var barLeftX = parseInt(barStyle.left, 10) || 0;
        var barRightX = barLeftX + bar.offsetWidth;
        var tabLeftX = this._getItemXPos(idx) + barLeftX;
        var tabRightX = tabLeftX + this.getTabAt(idx).getWidth();
        var visAreaW = barCtn.offsetWidth - this._tabMenuBtn.getWidth();
        var scroll = 0;
        if (tabLeftX < 0) {
            scroll = (-1 * tabLeftX);
        } else {
            if (tabRightX > visAreaW) {
                scroll = -(tabRightX - visAreaW);
            } else {
                if (barRightX < visAreaW && barLeftX < 0) {
                    scroll = Math.min(visAreaW - barRightX, -barLeftX);
                }
            }
        }
        if (scroll) {
            barStyle.left = (barLeftX + scroll) + "px";
        }
    }
};
bobj.crv.TabBar.getHTML = function () {
    var h = bobj.html;
    var barHeight = 24;
    var wgtStyle = {height: barHeight + "px", overflow: "hidden", width: "100%", position: "relative"};
    var barStyle = {position: "relative"};
    var selDivStyle = {
        width: this._menuBtnWidth + "px",
        height: barHeight + "px",
        display: "none",
        position: "absolute",
        top: "0px",
        right: "0px",
        "padding-top": "3px"
    };
    var tabsHtml = "";
    for (var i = 0; i < this._tabs.length; ++i) {
        tabsHtml += h.TD(null, this._tabs[i].getHTML());
    }
    var widgetHtml = h.DIV({id: this.id, style: wgtStyle}, h.TABLE({
        cellspacing: "0",
        cellpadding: "0",
        border: "0",
        style: {width: "100%"}
    }, h.TBODY(null, h.TR({valign: "bottom", height: barHeight}, h.TD(null, h.DIV({
        style: {
            overflow: "hidden",
            position: "relative"
        }
    }, h.TABLE({
        id: this.id + "_tabBar",
        style: barStyle,
        cellspacing: "0",
        cellpadding: "0",
        border: "0"
    }, h.TBODY(null, h.TR({id: this.id + "_tabRow"}, tabsHtml)))))))), h.DIV({
        id: this.id + "_tabSel",
        "class": "panelzone",
        style: selDivStyle
    }, this._tabMenuBtn.getHTML()));
    return widgetHtml;
};
bobj.crv.TabBar._onTabClick = function (tab) {
    var idx = this.getIndex(tab);
    if (idx < 0) {
        return;
    }
    this.select(idx);
    if (this.selectCB) {
        this.selectCB(tab, idx);
    }
};
bobj.crv.TabBar._onTabCloseBtnClick = function (tab) {
    var idx = this.getIndex(tab);
    this.remove(idx);
    if (this.removeCB) {
        this.removeCB(tab, idx);
    }
};
bobj.crv.TabBar._onMenuChange = function () {
    var menu = this._tabMenuBtn.getMenu();
    if (menu) {
        var selected = menu.getSelection();
        if (selected) {
            this.select(selected.index);
            if (this.selectCB) {
                this.selectCB(this.getTabAt(selected.index), selected.index);
            }
        }
    }
};
bobj.crv.TabBar._getItemXPos = function (index) {
    var x = 0;
    for (var i = 0; i < index; i++) {
        x += parseInt(this._tabs[i].getWidth(), 10);
    }
    return x;
};
bobj.crv.newButtonList = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        numLines: null,
        buttonWidth: 24,
        buttonTooltip: L_bobj_crv_TabList,
        changeCB: null,
        label: null,
        tabIndex: 0,
        multiSelect: false,
        menuWidth: null,
        menuTooltip: null
    }, kwArgs);
    var o = newButtonWidget(kwArgs.id, kwArgs.label, bobj.crv.ButtonList._onClick, kwArgs.buttonWidth, null, kwArgs.buttonTooltip, kwArgs.tabIndex, 0, _skin + "menus.gif", 7, 16, 0, 81, true, 0, 97);
    o._menu = newListWidget(kwArgs.id + "_menu", MochiKit.Base.bind(bobj.crv.ButtonList._onChange, o), kwArgs.multiSelect, kwArgs.menuWidth, kwArgs.numLines || 2, kwArgs.menuTooltip, null, null);
    o._listItems = [];
    o._blOldInit = o.init;
    o._blOldGetHTML = o.getHTML;
    o._menuDiv = null;
    o._captureClicks = MenuWidget_captureClicks;
    o._releaseClicks = MenuWidget_releaseClicks;
    bobj.fillIn(o, kwArgs);
    o.widgetType = "ButtonList";
    MochiKit.Base.update(o, bobj.crv.ButtonList);
    return o;
};
bobj.crv.ButtonList.getMenu = function () {
    return this._menu;
};
bobj.crv.ButtonList.add = function (label, value, isSelected, id) {
    if (this._menu && this._menu.layer) {
        this._menu.add(label, value, isSelected, id);
    } else {
        this._listItems.push({lbl: label, val: value, sel: isSelected, id: id});
    }
};
bobj.crv.ButtonList.init = function () {
    var menu = this._menu;
    this._blOldInit();
    menu.init();
    this._menuDiv = getLayer(this.id + "_menuDiv");
    var listItems = this._listItems;
    for (var i = 0, len = listItems.length; i < len; ++i) {
        var it = listItems[i];
        menu.add(it.lbl, it.val, it.sel, it.id);
    }
    this._listItems = [];
};
bobj.crv.ButtonList.getHTML = function () {
    var h = bobj.html;
    var menuDivAtts = {
        id: this.id + "_menuDiv",
        onmousedown: "event.cancelBubble=true",
        "class": "menuFrame",
        style: {visibility: "hidden", position: "absolute", "z-index": 5000}
    };
    return this._blOldGetHTML() + h.DIV(menuDivAtts, this._menu.getHTML());
};
bobj.crv.ButtonList.isMenuShowing = function () {
    return this._menuDiv && this._menuDiv.style.visibility != "hidden";
};
bobj.crv.ButtonList.hideMenu = function () {
    if (this._menuDiv) {
        this._menuDiv.style.visibility = "hidden";
    }
};
bobj.crv.ButtonList.showMenu = function () {
    if (this._menuDiv) {
        this._captureClicks();
        var body = document.body;
        if (this._menuDiv.parentNode !== body) {
            body.appendChild(this._menuDiv);
        }
        var divStyle = this._menuDiv.style;
        divStyle.left = "-1000px";
        divStyle.top = "-1000px";
        divStyle.visibility = "visible";
        var winDim = MochiKit.Style.getViewportDimensions();
        var w = this._menu.layer.offsetWidth;
        var h = this._menu.getHeight();
        if (!this.numLines) {
            h = Math.min(this._menu.layer.scrollHeight + 10, winDim.h - 10);
            this._menu.resize(null, h);
        }
        var btnPos = getPosScrolled(this.layer);
        var x = btnPos.x;
        var y = btnPos.y + this.getHeight();
        var xRight = x + w + 4;
        var yBottom = y + h + 4;
        var xMax = winDim.w + body.scrollLeft - Math.max(0, (winDim.w - body.offsetWidth));
        if (xRight > xMax) {
            x = Math.max(0, x - (xRight - xMax));
        }
        var yMax = winDim.h + body.scrollTop;
        if (yBottom > yMax) {
            y = Math.max(0, y - (yBottom - yMax));
        }
        divStyle.left = x + "px";
        divStyle.top = y + "px";
    }
};
bobj.crv.ButtonList._captureClicks = function () {
    var BIND = MochiKit.Base.bind;
    try {
        this.layer.onmousedown = BIND(this._onCaptureClick, this, true);
        this._oldMousedown = document.onmousedown;
        document.onmousedown = BIND(this._onCaptureClick, this, false);
    } catch (ex) {
        if (bobj.crv.config.isDebug) {
            throw ex;
        }
    }
};
bobj.crv.ButtonList._releaseClicks = function () {
    if (this.layer.onmousedown) {
        this.layer.onmousedown = null;
        document.onmousedown = this._oldMousedown;
    }
};
bobj.crv.ButtonList._onClick = function () {
    if (!this._cancelNextClick) {
        this.showMenu();
    }
    this._cancelNextClick = false;
};
bobj.crv.ButtonList._onChange = function () {
    this._releaseClicks();
    this.hideMenu();
    if (this.changeCB) {
        this.changeCB();
    }
};
bobj.crv.ButtonList._onCaptureClick = function (cancelNext, e) {
    this._cancelNextClick = cancelNext;
    eventCancelBubble(e);
    this.hideMenu();
    this._releaseClicks();
};
if (typeof (bobj.crv.Separator) == "undefined") {
    bobj.crv.Separator = {};
}
bobj.crv.newSeparator = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({id: bobj.uniqueId(), marginLeft: 4, marginRight: 4, marginTop: 0, marginBottom: 2}, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "Separator";
    UPDATE(o, bobj.crv.Separator);
    return o;
};
bobj.crv.Separator.getHTML = function () {
    var HTML = bobj.html;
    var htmlStr = "";
    if (bobj.isBorderBoxModel()) {
        htmlStr = HTML.IMG({
            id: this.id,
            src: bobj.skinUri("sep.gif"),
            style: {
                "height": 2 + "px",
                "width": "100%",
                "margin-left": this.marginLeft + "px",
                "margin-right": this.marginRight + "px",
                "margin-top": this.marginTop + "px",
                "margin-bottom": this.marginBottom + "px"
            }
        });
    } else {
        htmlStr = HTML.DIV({
            id: this.id,
            style: {
                "height": 2 + "px",
                "margin-left": this.marginLeft + "px",
                "margin-right": this.marginRight + "px",
                "margin-top": this.marginTop + "px",
                "margin-bottom": this.marginBottom + "px",
                "background-image": "url(" + bobj.skinUri("sep.gif") + ")",
                "background-repeat": "repeat-x",
                "overflow": "hidden"
            }
        });
    }
    return htmlStr + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.Separator.getHeight = function () {
    return this.layer.offsetHeight + this.marginTop + this.marginBottom;
};
if (typeof (bobj.crv.Viewer) == "undefined") {
    bobj.crv.Viewer = {};
}
bobj.crv.Viewer.LayoutTypes = {FIXED: "fixed", CLIENT: "client", FITREPORT: "fitreport"};
bobj.crv.Viewer.PromptingTypes = {HTML: "html", FLEX: "flex", UI5: "ui5"};
bobj.crv.newViewer = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        promptingType: bobj.crv.Viewer.LayoutTypes.HTML,
        layoutType: bobj.crv.Viewer.LayoutTypes.FIXED,
        visualStyle: {
            className: null,
            backgroundColor: null,
            borderWidth: null,
            borderStyle: null,
            borderColor: null,
            fontFamily: null,
            fontWeight: null,
            textDecoration: null,
            color: null,
            width: "800px",
            height: "600px",
            fontStyle: null,
            fontSize: null,
            top: "0px",
            left: "0px"
        }
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "Viewer";
    o._topToolbar = null;
    o._botToolbar = null;
    o._reportAlbum = null;
    o._separator = null;
    o._print = null;
    o._export = null;
    o._promptDlg = null;
    o._reportProcessing = null;
    o._eventListeners = [];
    o.initOld = o.init;
    o.boundaryControl = new bobj.crv.BoundaryControl(kwArgs.id + "_bc");
    o._modalBackground = new bobj.crv.ModalBackground(kwArgs.id + "_mb", bobj.bindFunctionToObject(bobj.crv.Viewer.keepFocus, o));
    MochiKit.Base.update(o, bobj.crv.Viewer);
    return o;
};
bobj.crv.Viewer.addChild = function (widget) {
    if (widget.widgetType == "ReportAlbum") {
        this._reportAlbum = widget;
    } else {
        if (widget.widgetType == "Toolbar") {
            if (widget.layoutAlign == "bottom") {
                this._botToolbar = widget;
            } else {
                this._topToolbar = widget;
                this._separator = bobj.crv.newSeparator();
            }
        } else {
            if (widget.widgetType == "PrintUI") {
                this._print = widget;
            } else {
                if (widget.widgetType == "ExportUI") {
                    this._export = widget;
                } else {
                    if (widget.widgetType == "ReportProcessingUI") {
                        this._reportProcessing = widget;
                    }
                }
            }
        }
    }
};
bobj.crv.Viewer.removeFlashActivations = function () {
    if (_ie && this.layer && this.layer.getElementsByTagName) {
        var flashObjects = this.layer.getElementsByTagName("object");
        for (var i = 0; i < flashObjects.length; i++) {
            var flashObject = flashObjects[i];
            var flashObjectClone = flashObject.cloneNode(true);
            var flashObjectParent = flashObject.parentNode;
            var flashObjectSibling = flashObject.nextSibling;
            if (flashObjectParent && flashObjectClone) {
                flashObjectParent.removeChild(flashObject);
                flashObjectParent.insertBefore(flashObjectClone, flashObjectSibling);
                flashObjectClone.outerHTML = flashObjectClone.outerHTML;
            }
        }
    }
};
bobj.crv.Viewer.getHTML = function () {
    var h = bobj.html;
    var layerStyle = {overflow: "hidden", position: "relative", left: this.visualStyle.left, top: this.visualStyle.top};
    var html = h.DIV({
        dir: "ltr",
        id: this.id,
        style: layerStyle,
        "class": "dialogzone"
    }, this._topToolbar ? this._topToolbar.getHTML() : "", this._separator ? this._separator.getHTML() : "", this._reportAlbum ? this._reportAlbum.getHTML() : "", this._botToolbar ? this._botToolbar.getHTML() : "");
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.Viewer._onWindowResize = function () {
    if (this._currWinSize.w != winWidth() || this._currWinSize.h != winHeight()) {
        this._doLayout();
        this._currWinSize.w = winWidth();
        this._currWinSize.h = winHeight();
    }
};
bobj.crv.Viewer.init = function () {
    this.initOld();
    bobj.setVisualStyle(this.layer, this.visualStyle);
    this._currWinSize = {w: winWidth(), h: winHeight()};
    var connect = MochiKit.Signal.connect;
    var signal = MochiKit.Signal.signal;
    var partial = MochiKit.Base.partial;
    if (this.layoutType.toLowerCase() == bobj.crv.Viewer.LayoutTypes.CLIENT) {
        connect(window, "onresize", this, "_onWindowResize");
    }
    if (this.layer && _ie && bobj.checkParent(this.layer, "TABLE")) {
        connect(window, "onload", this, "_doLayoutOnLoad");
        this._oldCssVisibility = this.css.visibility;
        this.css.visibility = "hidden";
    } else {
        this._doLayout();
    }
    if (this._topToolbar) {
        connect(this._topToolbar, "showGroupTree", this, "_onShowGroupTreeClick");
        connect(this._topToolbar, "showParamPanel", this, "_onShowParamPanelClick");
        connect(this._topToolbar, "zoom", partial(signal, this, "zoom"));
        connect(this._topToolbar, "drillUp", partial(signal, this, "drillUp"));
        connect(this._topToolbar, "firstPage", partial(signal, this, "firstPage"));
        connect(this._topToolbar, "prevPage", partial(signal, this, "prevPage"));
        connect(this._topToolbar, "nextPage", partial(signal, this, "nextPage"));
        connect(this._topToolbar, "lastPage", partial(signal, this, "lastPage"));
        connect(this._topToolbar, "selectPage", partial(signal, this, "selectPage"));
        connect(this._topToolbar, "refresh", partial(signal, this, "refresh"));
        connect(this._topToolbar, "search", partial(signal, this, "search"));
        connect(this._topToolbar, "export", partial(signal, this, "export"));
        connect(this._topToolbar, "print", partial(signal, this, "print"));
    }
    if (this._reportAlbum) {
        connect(this._reportAlbum, "resizeToolPanel", partial(signal, this, "resizeToolPanel"));
        connect(this._reportAlbum, "selectView", this, "_onSelectView");
        connect(this._reportAlbum, "removeView", this, "_onRemoveView");
        connect(this._reportAlbum, "grpDrilldown", partial(signal, this, "grpDrilldown"));
        connect(this._reportAlbum, "grpNodeRetrieveChildren", partial(signal, this, "grpNodeRetrieveChildren"));
        connect(this._reportAlbum, "grpNodeCollapse", partial(signal, this, "grpNodeCollapse"));
        connect(this._reportAlbum, "grpNodeExpand", partial(signal, this, "grpNodeExpand"));
        if (this._topToolbar) {
            var panelType = this._reportAlbum._curView.toolPanel.initialViewType;
            this._topToolbar.updateToolPanelButtons(panelType);
        }
    }
    if (this._print) {
        connect(this._print, "printSubmitted", partial(signal, this, "printSubmitted"));
    }
    if (this._export) {
        connect(this._export, "exportSubmitted", partial(signal, this, "exportSubmitted"));
    }
    this._updateRefreshButton();
    this._loadReportPageContent();
    this.scrollToHighlighted();
    connect(window, "onload", this, "removeFlashActivations");
    signal(this, "initialized");
};
bobj.crv.Viewer._updateRefreshButton = function () {
    if (this._reportAlbum) {
        var currentView = this._reportAlbum.getSelectedView();
        if (currentView) {
            if (!currentView.isMainReport()) {
                this.disableRefreshButton(true);
            }
        }
    }
};
bobj.crv.Viewer._loadReportPageContent = function () {
    var reportPage = this.getReportPage();
    if (reportPage) {
        reportPage.loadContent();
    }
};
bobj.crv.Viewer._doLayoutOnLoad = function () {
    this.css.visibility = this._oldCssVisibility;
    this._doLayout();
};
bobj.crv.Viewer._doLayout = function () {
    var topToolbarH = this._topToolbar ? this._topToolbar.getHeight() : 0;
    var topToolbarW = this._topToolbar ? this._topToolbar.getWidth() : 0;
    var botToolbarH = this._botToolbar ? this._botToolbar.getHeight() : 0;
    var separatorH = this._separator ? this._separator.getHeight() : 0;
    var layout = this.layoutType.toLowerCase();
    if (bobj.crv.Viewer.LayoutTypes.CLIENT == layout) {
        this.css.width = "100%";
        this.css.height = "100%";
    } else {
        if (bobj.crv.Viewer.LayoutTypes.FITREPORT == layout) {
            var albumSize = this._reportAlbum.getBestFitSize();
            var viewerWidth = (albumSize.width < topToolbarW) ? topToolbarW : albumSize.width;
            var viewerHeight = (albumSize.height + topToolbarH + botToolbarH + separatorH);
            this.css.height = viewerHeight + "px";
            this.css.width = viewerWidth + "px";
        } else {
            this.css.width = this.visualStyle.width;
            this.css.height = this.visualStyle.height;
        }
    }
    var innerW = this.getWidth();
    var innerH = this.getHeight();
    var albumH = Math.max(0, innerH - topToolbarH - botToolbarH - separatorH);
    if (this._reportAlbum) {
        this._reportAlbum.resizeOuter(innerW, albumH);
    }
    if (this._botToolbar) {
        this._botToolbar.move(0, topToolbarH + separatorH + albumH);
    }
    if (this._print && this._print.layer) {
        this._print.center();
    }
    if (this._export && this._export.layer) {
        this._export.center();
    }
    if (this._reportProcessing && this._reportProcessing.layer) {
        this._reportProcessing.center();
    }
    var viewerP = MochiKit.Style.getElementPosition(this.layer);
    var viewerD = MochiKit.Style.getElementDimensions(this.layer);
    if (this._modalBackground) {
        this._modalBackground.updateBoundary(viewerD.w, viewerD.h, viewerP.x, viewerP.y);
    }
    var bodyD = bobj.getBodyScrollDimension();
    var isViewerCutOff = ((viewerP.x + viewerD.w) >= bodyD.w) || ((viewerP.y + viewerD.h) >= bodyD.h);
    if (isViewerCutOff && (layout != bobj.crv.Viewer.LayoutTypes.CLIENT)) {
        this.boundaryControl.updateBoundary(viewerD.w, viewerD.h, viewerP.x, viewerP.y);
    } else {
        this.boundaryControl.updateBoundary(0, 0, 0, 0);
    }
    this._adjustWindowScrollBars();
};
bobj.crv.Viewer._onShowGroupTreeClick = function (isChecked) {
    var panelType = isChecked ? bobj.crv.ToolPanelType.GroupTree : bobj.crv.ToolPanelType.None;
    this.selectToolPanel(panelType);
};
bobj.crv.Viewer._onShowParamPanelClick = function (isChecked) {
    var panelType = isChecked ? bobj.crv.ToolPanelType.ParameterPanel : bobj.crv.ToolPanelType.None;
    this.selectToolPanel(panelType);
};
bobj.crv.Viewer.selectToolPanel = function (panelType) {
    var Type = bobj.crv.ToolPanelType;
    if (this._reportAlbum) {
        this._reportAlbum._curView.toolPanel.setView(panelType);
        this._reportAlbum._curView.setDisplayToolPanel(Type.None !== panelType);
    }
    if (Type.GroupTree == panelType) {
        MochiKit.Signal.signal(this, "showGroupTree");
    } else {
        if (Type.ParameterPanel == panelType) {
            MochiKit.Signal.signal(this, "showParamPanel");
        } else {
            if (Type.None == panelType) {
                MochiKit.Signal.signal(this, "hideToolPanel");
            }
        }
    }
};
bobj.crv.Viewer._onSelectView = function (view) {
    MochiKit.Signal.signal(this, "selectView", view);
};
bobj.crv.Viewer._onRemoveView = function (view) {
    MochiKit.Signal.signal(this, "removeView", view);
};
bobj.crv.Viewer.resize = function (w, h) {
    if (bobj.isNumber(w)) {
        w = w + "px";
    }
    if (bobj.isNumber(h)) {
        h = h + "px";
    }
    this.visualStyle.width = w;
    this.visualStyle.height = h;
    this._doLayout();
};
bobj.crv.Viewer.disableRefreshButton = function (isDisabled) {
    if (this._topToolbar) {
        var refreshButton = this._topToolbar.refreshButton;
        if (refreshButton) {
            refreshButton.setDisabled(isDisabled);
        }
    }
    if (this._botToolbar) {
        var refreshButton = this._botToolbar.refreshButton;
        if (refreshButton) {
            refreshButton.setDisabled(isDisabled);
        }
    }
};
bobj.crv.Viewer.setPageNumber = function (curPageNum, numPages) {
    if (this._topToolbar) {
        this._topToolbar.setPageNumber(curPageNum, numPages);
    }
    if (this._botToolbar) {
        this._botToolbar.setPageNumber(curPageNum, numPages);
    }
};
bobj.crv.Viewer.showPromptDialog = function (html) {
    html = html || "";
    if (!this._promptDlg) {
        var promptDialog_ShowCB = MochiKit.Base.bind(this._onShowPromptDialog, this);
        var promptDialog_HideCB = MochiKit.Base.bind(this._onHidePromptDialog, this);
        this._promptDlg = bobj.crv.params.newParameterDialog({
            id: this.id + "_promptDlg",
            showCB: promptDialog_ShowCB,
            hideCB: promptDialog_HideCB
        });
    }
    if (this._promptDlg.isVisible()) {
        this.hidePromptDialog();
    }
    this._originalDocumentOnKeyPress = document.onkeypress;
    this._promptDlg.setPromptHTML(html);
    setTimeout(MochiKit.Base.bind(this._promptDlg.show, this._promptDlg, true), 1);
};
bobj.crv.Viewer.showAdaptedPromptDialog = function (servletURL, closeCB, isInitializing, promptingType, viewerType, promptType) {
    var UIBridge = bobj.crv.params.ParameterBridge;
    var UIAdapter = bobj.crv.params.ViewerParameterAdapter;
    if (promptingType == this.PromptingTypes.FLEX) {
        if (!UIBridge.checkFlashPlayer()) {
            var msg = L_bobj_crv_FlashRequired;
            this.showError(msg.substr(0, msg.indexOf("{0}")), UIBridge.getInstallHTML());
            return;
        }
    }
    isInitializing = typeof (isInitializing) !== "undefined" ? isInitializing : false;
    UIAdapter.setViewerLayoutType(this.id, this.layoutType);
    if (!this._promptDlg) {
        this._promptDlg = document.createElement("div");
        this._promptDlg.id = this.id + "_promptDlg";
        this._promptDlg.closeCB = closeCB;
        var PROMPT_STYLE = this._promptDlg.style;
        PROMPT_STYLE.border = "1px";
        PROMPT_STYLE.borderStyle = "solid";
        PROMPT_STYLE.borderColor = "#000000";
        PROMPT_STYLE.position = "absolute";
        PROMPT_STYLE.zIndex = bobj.constants.modalLayerIndex;
        var divID = bobj.uniqueId();
        this._promptDlg.innerHTML = '<div id="' + divID + '" name="' + divID + '"></div>';
        var onfocusCB = bobj.bindFunctionToObject(bobj.crv.Viewer.keepFocus, this);
        var firstLink = MochiKit.DOM.createDOM("BUTTON", {
            id: this._promptDlg.id + "_firstLink",
            onfocus: onfocusCB,
            style: {width: "0px", height: "0px", position: "absolute", left: "-30px", top: "-30px"}
        });
        var lastLink = MochiKit.DOM.createDOM("BUTTON", {
            id: this._promptDlg.id + "_lastLink",
            onfocus: onfocusCB,
            style: {width: "0px", height: "0px", position: "absolute", left: "-30px", top: "-30px"}
        });
        document.body.appendChild(firstLink);
        document.body.appendChild(this._promptDlg);
        document.body.appendChild(lastLink);
        var state = bobj.crv.stateManager.getComponentState(this.id);
        var sessionID = state.common.reportSourceSessionID;
        var lang = bobj.crv.getLangCode();
        var isRTL = bobj.crv.config.isRTL;
        UIBridge.setMasterCallBack(this.id, UIAdapter);
        UIBridge.createDomObj(this.id, divID, servletURL, true, lang, sessionID, isRTL, isInitializing, promptingType, viewerType, promptType);
    } else {
        this._promptDlg.closeCB = closeCB;
        this._promptDlg.style.display = "";
        UIBridge.initViewer(this.id, promptingType);
    }
    this.setDisplayModalBackground(true);
};
bobj.crv.Viewer.getPromptingType = function () {
    return this.promptingType;
};
bobj.crv.Viewer.showFlexPromptDialog = function (paramCtrl, param, servletURL) {
    var FLEXUI = bobj.crv.params.FlexParameterUI;
    if (!FLEXUI.checkFlashPlayer()) {
        var msg = L_bobj_crv_FlashRequired;
        this.showError(msg.substr(0, msg.indexOf("{0}")), FLEXUI.getInstallHTML());
        return;
    }
    FLEXUI.setCurrentIParamInfo(this.id, paramCtrl, param);
    FLEXUI.setViewerLayoutType(this.id, this.layoutType);
    FLEXUI.setCloseDialogCallBack(this.id, MochiKit.Base.bind(this.hideFlexPromptDialog, this));
    if (!this._promptDlg) {
        this._modalBackground = document.createElement("div");
        this._modalBackground.id = bobj.uniqueId();
        var vPos = MochiKit.Style.getElementPosition(this.layer);
        var vDim = MochiKit.Style.getElementDimensions(this.layer);
        var MODAL_STYLE = this._modalBackground.style;
        MODAL_STYLE.top = vPos.y;
        MODAL_STYLE.left = vPos.x;
        MODAL_STYLE.width = vDim.w;
        MODAL_STYLE.height = vDim.h;
        MODAL_STYLE.backgroundColor = "#888888";
        MODAL_STYLE.position = "absolute";
        MODAL_STYLE.opacity = 0.3;
        MODAL_STYLE.filter = "alpha(opacity=30)";
        MODAL_STYLE.zIndex = bobj.constants.modalLayerIndex - 2;
        document.body.appendChild(this._modalBackground);
        this._promptDlg = document.createElement("div");
        this._promptDlg.id = this.id + "_promptDlg";
        var PROMPT_STYLE = this._promptDlg.style;
        PROMPT_STYLE.border = "1px";
        PROMPT_STYLE.borderStyle = "solid";
        PROMPT_STYLE.borderColor = "#000000";
        PROMPT_STYLE.position = "absolute";
        PROMPT_STYLE.zIndex = bobj.constants.modalLayerIndex;
        var divID = bobj.uniqueId();
        this._promptDlg.innerHTML = '<div id="' + divID + '" name="' + divID + '"></div>';
        document.body.appendChild(this._promptDlg);
        FLEXUI.createSWF(this.id, divID, servletURL, true);
    } else {
        this._promptDlg.style.display = "";
        FLEXUI.init(this.id);
    }
    this._modalBackground.style.visibility = "visible";
};
bobj.crv.Viewer.setDisplayModalBackground = function (isDisplay, showWaitCursor, opacity, filterOpacity) {
    isDisplay = this.isDisplayModalBG || isDisplay;
    if (this._modalBackground) {
        this._modalBackground.show(isDisplay, showWaitCursor, opacity, filterOpacity);
    }
}, bobj.crv.Viewer._onShowPromptDialog = function () {
    this._adjustWindowScrollBars();
};
bobj.crv.Viewer._onHidePromptDialog = function () {
    this._adjustWindowScrollBars();
    document.onkeypress = this._originalDocumentOnKeyPress;
};
bobj.crv.Viewer.hidePromptDialog = function () {
    if (this._promptDlg && this._promptDlg.isVisible()) {
        this._promptDlg.show(false);
    }
};
bobj.crv.Viewer.hideNextGenPromptDialog = function () {
    if (this._promptDlg) {
        if (_ie || _ie9Up) {
            if (this._promptDlg.style.display != "none") {
                this._promptDlg.focus();
            }
        }
        this._promptDlg.style.visibility = "hidden";
        this._promptDlg.style.display = "none";
        this.setDisplayModalBackground(false);
        if (this._promptDlg.closeCB) {
            this._promptDlg.closeCB();
        }
    }
};
bobj.crv.Viewer.hideFlexPromptDialog = function () {
    if (this._promptDlg) {
        if (_ie) {
            this._promptDlg.focus();
        }
        this._promptDlg.style.visibility = "hidden";
        this._promptDlg.style.display = "none";
        this._modalBackground.style.visibility = "hidden";
    }
};
bobj.crv.Viewer._adjustWindowScrollBars = function () {
    if (_ie && this.layoutType == bobj.crv.Viewer.LayoutTypes.CLIENT && this._promptDlg && this._promptDlg.layer && MochiKit.DOM.currentDocument().body) {
        var bodyOverFlow, pageOverFlow;
        var body = MochiKit.DOM.currentDocument().body;
        var promptDlgLayer = this._promptDlg.layer;
        if (this.getReportPage() && this.getReportPage().layer) {
            var reportPageLayer = this.getReportPage().layer;
        }
        if (!window["bodyOverFlow"]) {
            window["bodyOverFlow"] = MochiKit.DOM.getStyle(body, "overflow");
        }
        if (body.offsetHeight < (promptDlgLayer.offsetTop + promptDlgLayer.offsetHeight)) {
            if (window["bodyOverFlow"] == "hidden") {
                bodyOverFlow = "scroll";
            }
            pageOverFlow = "hidden";
        } else {
            bodyOverFlow = window["bodyOverFlow"];
            pageOverFlow = "auto";
        }
        body.style.overflow = bodyOverFlow;
        if (reportPageLayer) {
            reportPageLayer.style.overflow = pageOverFlow;
        }
    }
};
bobj.crv.Viewer.showError = function (text, details) {
    var dlg = bobj.crv.ErrorDialog.getInstance();
    dlg.setText(text, details);
    dlg.setTitle(L_bobj_crv_Error);
    dlg.show(true);
};
bobj.crv.Viewer.update = function (update, updatePack) {
    if (!update) {
        return;
    }
    for (var childNum in update.children) {
        var child = update.children[childNum];
        if (child) {
            switch (child.cons) {
                case"bobj.crv.newReportAlbum":
                    if (this._reportAlbum && updatePack.updateReportAlbum()) {
                        this._reportAlbum.update(child, updatePack);
                    }
                    break;
                case"bobj.crv.newToolbar":
                    if (this._topToolbar && updatePack.updateToolbar()) {
                        this._topToolbar.update(child, updatePack);
                    }
                    break;
            }
        }
    }
    if (updatePack.refreshLayout()) {
        this._doLayout();
    }
    if (updatePack.requiresScrolling()) {
        this.scrollToHighlighted();
    }
};
bobj.crv.Viewer.getParameterPanel = function () {
    if (this._reportAlbum) {
        var view = this._reportAlbum.getSelectedView();
        if (view && view.toolPanel) {
            return view.toolPanel.getParameterPanel();
        }
    }
};
bobj.crv.Viewer.getReportPage = function () {
    if (this._reportAlbum) {
        var view = this._reportAlbum.getSelectedView();
        if (view && view.toolPanel) {
            return view.reportPage;
        }
    }
};
bobj.crv.Viewer.scrollToHighlighted = function () {
    var currentView = this._reportAlbum.getSelectedView();
    var reportPage = getLayer(currentView.reportPage.id);
    var crystalHighlighted = getLayer("CrystalHighLighted");
    if (!crystalHighlighted || !reportPage) {
        return;
    }
    if (MochiKit.DOM.isParent(crystalHighlighted, reportPage)) {
        var layoutType = this.layoutType.toLowerCase();
        var position;
        if (layoutType == bobj.crv.Viewer.LayoutTypes.FITREPORT) {
            position = MochiKit.Style.getElementPosition(crystalHighlighted);
            window.scrollTo(position.x, position.y);
        } else {
            position = MochiKit.Style.getElementPosition(crystalHighlighted, reportPage);
            reportPage.scrollLeft = position.x;
            reportPage.scrollTop = position.y;
        }
    }
};
bobj.crv.Viewer.addViewerEventListener = function (e, l) {
    var ls = this._eventListeners[e];
    if (!ls) {
        this._eventListeners[e] = [l];
        return;
    }
    ls[ls.length] = l;
};
bobj.crv.Viewer.removeViewerEventListener = function (e, l) {
    var ls = this._eventListeners[e];
    if (ls) {
        for (var i = 0, lsLen = ls.length; i < lsLen; i++) {
            if (ls[i] == l) {
                ls.splice(i, 1);
                return;
            }
        }
    }
};
bobj.crv.Viewer.getEventListeners = function (e) {
    return this._eventListeners[e];
};
bobj.crv.BoundaryControl = function (id) {
    this.id = id;
    return this;
};
bobj.crv.BoundaryControl.prototype = {
    updateBoundary: function (width, height, left, top) {
        if (!this.layer) {
            this._init();
        }
        if (this.layer) {
            this.layer.style.width = width;
            this.layer.style.height = height;
            this.layer.style.left = left;
            this.layer.style.top = top;
        }
    }, _init: function () {
        var style = {display: "block", visibility: "hidden", position: "absolute"};
        if (!this.layer) {
            var html = bobj.html.DIV({id: this.id, style: style});
            append2(_curDoc.body, html);
            this.layer = getLayer(this.id);
        }
    }
};
bobj.crv.ModalBackground = function (id, mouseupCB) {
    this.id = id;
    this.mouseupCB = mouseupCB;
};
bobj.crv.ModalBackground.prototype = new bobj.crv.BoundaryControl();
MochiKit.Base.update(bobj.crv.ModalBackground.prototype, {
    _getStyle: function () {
        return {
            "background-color": "#888888",
            position: "absolute",
            opacity: 0.3,
            display: "block",
            filter: "alpha(opacity=30);",
            "z-index": bobj.constants.modalLayerIndex - 2,
            visibility: "hidden",
            cursor: "auto"
        };
    }, show: function (show, showWaitCursor, opacity, filterOpacity) {
        if (!this.layer) {
            this._init();
        }
        this.layer.style.visibility = show ? "visible" : "hidden";
        this.layer.style.cursor = show && showWaitCursor ? "wait" : "auto";
        this.layer.style.opacity = show && opacity != undefined ? opacity : 0.3;
        if (this.layer.style.filter) {
            this.layer.style.filter = show && filterOpacity ? filterOpacity : "alpha(opacity=30);";
        }
    }
});
if (typeof (bobj.crv.Async) == "undefined") {
    bobj.crv.Async = {};
}
bobj.crv.Async.UpdatePack = function () {
    this.viewer = {
        refreshLayout: false,
        requiresScrolling: false,
        toolbar: {requiresUpdate: false},
        reportAlbum: {
            updateTabs: false,
            reportView: {
                reportPage: {requiresUpdate: false},
                toolPanel: {groupTree: {requiresUpdate: false, path: ""}, paramPanel: {requiresUpdate: false}}
            }
        }
    };
};
bobj.crv.Async.UpdatePack.prototype = {
    setUpdateGroupTree: function (doUpdate) {
        this.viewer.reportAlbum.reportView.toolPanel.groupTree.requiresUpdate = doUpdate;
    }, setRequiresScrolling: function (scroll) {
        this.viewer.requiresScrolling = scroll;
    }, requiresScrolling: function () {
        return this.viewer.requiresScrolling;
    }, setGroupTreePath: function (path) {
        this.viewer.reportAlbum.reportView.toolPanel.groupTree.path = path;
    }, updateGroupTree: function () {
        return this.viewer.reportAlbum.reportView.toolPanel.groupTree.requiresUpdate;
    }, groupTreePath: function () {
        return this.viewer.reportAlbum.reportView.toolPanel.groupTree.path;
    }, setUpdateReportPage: function (doUpdate) {
        this.viewer.reportAlbum.reportView.reportPage.requiresUpdate = doUpdate;
    }, updateReportPage: function () {
        return this.viewer.reportAlbum.reportView.reportPage.requiresUpdate;
    }, setUpdateParamPanel: function (doUpdate) {
        return this.viewer.reportAlbum.reportView.toolPanel.paramPanel.requiresUpdate;
    }, updateParamPanel: function () {
        return this.viewer.reportAlbum.reportView.toolPanel.paramPanel.requiresUpdate;
    }, updateToolPanel: function () {
        return this.updateGroupTree() || this.updateParamPanel();
    }, updateReportAlbum: function () {
        return this.updateReportView() || this.viewer.reportAlbum.updateTabs;
    }, updateReportView: function () {
        return this.updateToolPanel() || this.updateReportPage();
    }, setUpdateToolbar: function (doUpdate) {
        this.viewer.toolbar.requiresUpdate = doUpdate;
    }, updateToolbar: function () {
        return this.viewer.toolbar.requiresUpdate;
    }, setUpdateTabs: function (doUpdate) {
        this.viewer.reportAlbum.updateTabs = doUpdate;
    }, updateTabs: function () {
        return this.viewer.reportAlbum.updateTabs;
    }, refreshLayout: function () {
        return this.viewer.refreshLayout;
    }, setRefreshLayout: function (refresh) {
        this.viewer.refreshLayout = refresh;
    }
};
bobj.crv.ViewerListener = function (viewerName, ioHandler) {
    this._name = viewerName;
    this._viewer = null;
    this._promptPage = null;
    this._paramCtrl = null;
    this._ioHandler = ioHandler;
    this._reportProcessing = null;
    var connect = MochiKit.Signal.connect;
    var subscribe = bobj.event.subscribe;
    var bind = MochiKit.Base.bind;
    var widget = getWidgetFromID(viewerName);
    if (widget) {
        if (widget.widgetType == "Viewer") {
            this._viewer = widget;
            this._reportProcessing = this._viewer._reportProcessing;
        } else {
            if (widget.widgetType == "PromptPage") {
                this._promptPage = widget;
                this._reportProcessing = this._promptPage._reportProcessing;
            }
        }
    }
    if (this._viewer) {
        connect(this._viewer, "selectView", this, "_onSelectView");
        connect(this._viewer, "removeView", this, "_onRemoveView");
        connect(this._viewer, "firstPage", this, "_onFirstPage");
        connect(this._viewer, "prevPage", this, "_onPrevPage");
        connect(this._viewer, "nextPage", this, "_onNextPage");
        connect(this._viewer, "lastPage", this, "_onLastPage");
        connect(this._viewer, "selectPage", this, "_onSelectPage");
        connect(this._viewer, "zoom", this, "_onZoom");
        connect(this._viewer, "drillUp", this, "_onDrillUp");
        connect(this._viewer, "refresh", this, "_onRefresh");
        connect(this._viewer, "search", this, "_onSearch");
        connect(this._viewer, "export", this, "_onExport");
        connect(this._viewer, "print", this, "_onPrint");
        connect(this._viewer, "resizeToolPanel", this, "_onResizeToolPanel");
        connect(this._viewer, "hideToolPanel", this, "_onHideToolPanel");
        connect(this._viewer, "grpDrilldown", this, "_onDrilldownGroupTree");
        connect(this._viewer, "grpNodeRetrieveChildren", this, "_onRetrieveGroupTreeNodeChildren");
        connect(this._viewer, "grpNodeCollapse", this, "_onCollapseGroupTreeNode");
        connect(this._viewer, "grpNodeExpand", this, "_onExpandGroupTreeNode");
        connect(this._viewer, "showParamPanel", this, "_onShowParamPanel");
        connect(this._viewer, "showGroupTree", this, "_onShowGroupTree");
        connect(this._viewer, "printSubmitted", this, "_onSubmitExport");
        connect(this._viewer, "exportSubmitted", this, "_onSubmitExport");
        this._setInteractiveParams();
    }
    subscribe("drilldown", this._forwardTo("_onDrilldown"));
    subscribe("drilldownGraph", this._forwardTo("_onDrilldownGraph"));
    subscribe("drilldownSubreport", this._forwardTo("_onDrilldownSubreport"));
    subscribe("sort", this._forwardTo("_onSort"));
    subscribe("hyperlinkClicked", this._forwardTo("_onHyperlinkClicked"));
    subscribe("crprompt_param", this._forwardTo("_onSubmitStaticPrompts"));
    subscribe("crprompt_pmtEngine", this._forwardTo("_onSubmitPromptEnginePrompts"));
    subscribe("crprompt_logon", this._forwardTo("_onSubmitDBLogon"));
    subscribe("crprompt_cancel", this._forwardTo("_onCancelParamDlg"));
    subscribe("crprompt_flexparam", this._forwardTo("_onFlexParam"));
    subscribe("crprompt_flexlogon", this._forwardTo("_onFlexLogon"));
    subscribe("crprompt_ngparam", this._forwardTo("_onNextGenParam"));
    subscribe("crprompt_nglogon", this._forwardTo("_onNextGenLogon"));
    subscribe("pnav", this._forwardTo("_onNavigateReportPart"));
    subscribe("navbookmark", this._forwardTo("_onNavigateBookmark"));
    subscribe("saveViewState", bind(this._onSaveViewState, this));
    var viewerListener = this;
    var doLoad = function () {
        if (widget != undefined && widget.initialPromptData != null) {
            var UI = bobj.crv.params.ParameterBridge;
            if (typeof (UI._isInitializing) == "undefined") {
                var UIAdapter = bobj.crv.params.ViewerParameterAdapter;
                UIAdapter.setPromptData(widget.id, widget.initialPromptData, false);
                var promptType = "parameter";
                if (widget.initialPromptData.indexOf("logons") != -1) {
                    promptType = "logon";
                }
                widget.showAdaptedPromptDialog(this.getServletURI(), null, true, viewerListener.getPromptingType(), null, promptType);
                widget.initialPromptData = null;
            }
        }
    };
    doLoad = MochiKit.Base.bind(doLoad, this);
    if (this._isPromptingTypeUI5()) {
        doLoad();
    }
};
bobj.crv.ViewerListener.prototype = {
    getCurrentView: function () {
        if (this._viewer && this._viewer._reportAlbum) {
            return this._viewer._reportAlbum.getSelectedView();
        }
        return null;
    }, getPromptingType: function () {
        return this._getCommonProperty("promptingType");
    }, getViewerType: function () {
        return this._getCommonProperty("viewerType");
    }, _forwardTo: function (handlerName) {
        return MochiKit.Base.bind(function (target) {
            if (target == this._name) {
                var args = bobj.slice(arguments, 1);
                this[handlerName].apply(this, args);
            }
        }, this);
    }, _onSaveViewState: function () {
        this._saveViewState();
    }, _onSelectView: function (view) {
        if (view) {
            bobj.crv.logger.info("UIAction View.Select");
            if (view.hasContent()) {
                this._updateUIState();
            } else {
                var state = bobj.crv.stateManager.getComponentState(this._name);
                if (state) {
                    state.curViewId = view.viewStateId;
                    this._request({selectView: view.viewStateId}, false);
                }
            }
        }
    }, _onRemoveView: function (view) {
        if (view) {
            bobj.crv.logger.info("UIAction View.Remove");
            var viewerState = bobj.crv.stateManager.getComponentState(this._name);
            if (viewerState) {
                delete viewerState[view.viewStateId];
            }
            var commonState = this._getCommonState();
            if (commonState) {
                var idx = MochiKit.Base.findValue(commonState.rptAlbumOrder, view.viewStateId);
                if (idx != -1) {
                    arrayRemove(commonState, "rptAlbumOrder", idx);
                }
            }
        }
    }, _getPageNavigationUpdatePack: function () {
        var updatePack = new bobj.crv.Async.UpdatePack();
        updatePack.setUpdateReportPage(true);
        updatePack.setUpdateToolbar(true);
        updatePack.setRefreshLayout(true);
        return updatePack;
    }, _onFirstPage: function () {
        bobj.crv.logger.info("UIAction Toolbar.FirstPage");
        this._request({tb: "first"}, bobj.crv.config.useAsync, true, this._getPageNavigationUpdatePack());
    }, _onPrevPage: function () {
        bobj.crv.logger.info("UIAction Toolbar.PrevPage");
        this._request({tb: "prev"}, bobj.crv.config.useAsync, true, this._getPageNavigationUpdatePack());
    }, _onNextPage: function () {
        bobj.crv.logger.info("UIAction Toolbar.NextPage");
        this._request({tb: "next"}, bobj.crv.config.useAsync, true, this._getPageNavigationUpdatePack());
    }, _onLastPage: function () {
        bobj.crv.logger.info("UIAction Toolbar.LastPage");
        this._request({tb: "last"}, bobj.crv.config.useAsync, true, this._getPageNavigationUpdatePack());
    }, _onDrillUp: function () {
        bobj.crv.logger.info("UIAction Toolbar.DrillUp");
        this._request({tb: "drillUp"}, false);
    }, _onSelectPage: function (pgTxt) {
        bobj.crv.logger.info("UIAction Toolbar.SelectPage " + pgTxt);
        this._request({
            tb: "gototext",
            text: pgTxt
        }, bobj.crv.config.useAsync, true, this._getPageNavigationUpdatePack());
    }, _onZoom: function (zoomTxt) {
        bobj.crv.logger.info("UIAction Toolbar.Zoom " + zoomTxt);
        var updatePack = new bobj.crv.Async.UpdatePack();
        updatePack.setUpdateReportPage(true);
        updatePack.setRefreshLayout(true);
        this._request({tb: "zoom", value: zoomTxt}, bobj.crv.config.useAsync, true, updatePack);
    }, _onExport: function () {
        if (this._viewer._export) {
            bobj.crv.logger.info("UIAction Toolbar.Export");
            this._viewer._export.show(true);
        }
    }, _onPrint: function () {
        var printComponent = this._viewer._print;
        if (printComponent) {
            if (printComponent.isActxPrinting) {
                bobj.crv.logger.info("UIAction Toolbar.Print ActiveX");
                var pageState = bobj.crv.stateManager.getCompositeState();
                var postBackData = this._ioHandler.getPostDataForPrinting(pageState, this._name);
                this._viewer._print.show(true, postBackData);
            } else {
                bobj.crv.logger.info("UIAction Toolbar.Print PDF");
                this._viewer._print.show(true);
            }
        }
    }, _onResizeToolPanel: function (width) {
        this._setCommonProperty("toolPanelWidth", width);
        this._setCommonProperty("toolPanelWidthUnit", "px");
    }, _onHideToolPanel: function () {
        bobj.crv.logger.info("UIAction Toolbar.HideToolPanel");
        this._setCommonProperty("toolPanelType", bobj.crv.ToolPanelType.None);
    }, _onShowParamPanel: function () {
        bobj.crv.logger.info("UIAction Toolbar.ShowParamPanel");
        this._setCommonProperty("toolPanelType", bobj.crv.ToolPanelType.ParameterPanel);
    }, _onShowGroupTree: function () {
        bobj.crv.logger.info("UIAction Toolbar.ShowGroupTree");
        this._setCommonProperty("toolPanelType", bobj.crv.ToolPanelType.GroupTree);
    }, _onDrilldown: function (drillargs) {
        bobj.crv.logger.info("UIAction Report.Drilldown");
        this._request(drillargs, false);
    }, _onDrilldownSubreport: function (drillargs) {
        bobj.crv.logger.info("UIAction Report.DrilldownSubreport");
        this._request(drillargs, false);
    }, _onDrilldownGraph: function (event, graphName, branch, offsetX, offsetY, pageNumber, nextpart, twipsPerPixel) {
        if (event) {
            bobj.crv.logger.info("UIAction Report.DrilldownGraph");
            var mouseX, mouseY;
            if (_ie11Up || _ie || _saf) {
                mouseX = event.offsetX;
                mouseY = event.offsetY;
            } else {
                mouseX = event.layerX;
                mouseY = event.layerY;
            }
            var zoomFactor = parseInt(this._getCommonProperty("zoom"), 10);
            zoomFactor = (isNaN(zoomFactor) ? 1 : zoomFactor / 100);
            this._request({
                name: encodeURIComponent(graphName),
                brch: branch,
                coord: (mouseX * twipsPerPixel / zoomFactor + parseInt(offsetX, 10)) + "-" + (mouseY * twipsPerPixel / zoomFactor + parseInt(offsetY, 10)),
                pagenumber: pageNumber,
                nextpart: encodeURIComponent(nextpart)
            }, false);
        }
    }, _onDrilldownGroupTree: function (groupName, groupPath, isVisible) {
        bobj.crv.logger.info("UIAction GroupTree.Drilldown");
        var encodedGroupName = encodeURIComponent(groupName);
        if (!isVisible) {
            this._request({brch: groupPath, drillname: encodedGroupName}, false);
        } else {
            var updatePack = new bobj.crv.Async.UpdatePack();
            updatePack.setUpdateReportPage(true);
            updatePack.setRequiresScrolling(true);
            updatePack.setUpdateToolbar(true);
            this._request({grp: groupPath, drillname: encodedGroupName}, bobj.crv.config.useAsync, true, updatePack);
        }
    }, _onRetrieveGroupTreeNodeChildren: function (groupPath) {
        var updatePack = new bobj.crv.Async.UpdatePack();
        updatePack.setUpdateGroupTree(true);
        updatePack.setGroupTreePath(groupPath);
        this._request({grow: groupPath}, bobj.crv.config.useAsync, true, updatePack);
    }, _onCollapseGroupTreeNode: function (groupPath) {
        bobj.crv.logger.info("UIAction GroupTree.CollapseNode");
        var expPathPointer = this.getCurrentExpandedPaths();
        var groupPathArray = groupPath.split("-");
        for (var i = 0, end = groupPathArray.length - 1; i <= end; i++) {
            var nodeID = groupPathArray[i];
            if (expPathPointer[nodeID]) {
                if (i == end) {
                    delete expPathPointer[nodeID];
                    return;
                }
                expPathPointer = expPathPointer[nodeID];
            } else {
                return;
            }
        }
    }, _onExpandGroupTreeNode: function (groupPath) {
        bobj.crv.logger.info("UIAction GroupTree.ExpandNode");
        var expPathPointer = this.getCurrentExpandedPaths();
        var groupPathArray = groupPath.split("-");
        for (var i = 0, end = groupPathArray.length; i < end; i++) {
            var nodeID = groupPathArray[i];
            if (!expPathPointer[nodeID]) {
                expPathPointer[nodeID] = {};
            }
            expPathPointer = expPathPointer[nodeID];
        }
    }, _onRefresh: function () {
        bobj.crv.logger.info("UIAction Toolbar.Refresh");
        this._request({tb: "refresh"}, false);
    }, _onSearch: function (searchText) {
        bobj.crv.logger.info("UIAction Toolbar.Search");
        var updatePack = new bobj.crv.Async.UpdatePack();
        updatePack.setUpdateReportPage(true);
        updatePack.setUpdateToolbar(true);
        updatePack.setRequiresScrolling(true);
        this._request({tb: "search", text: encodeURIComponent(searchText)}, bobj.crv.config.useAsync, true, updatePack);
    }, _onFlexParam: function (paramData) {
        this._request({"crprompt": "flexPromptingSetValues", "paramList": paramData}, false);
    }, _onFlexLogon: function (logonData) {
        for (var i = 0, len = logonData.length; i < len; i++) {
            this._addRequestField(logonData[i].field, logonData[i].value);
        }
        this._request({"crprompt": "logon"}, false);
    }, _canUseAsync: function () {
        return this._viewer != null && bobj.crv.config.useAsync;
    }, _onNextGenParam: function (paramData) {
        var updatePack = new bobj.crv.Async.UpdatePack();
        updatePack.setUpdateReportPage(true);
        updatePack.setRefreshLayout(true);
        updatePack.setUpdateToolbar(true);
        this._request({
            "crprompt": "nextGenPromptingSetValues",
            "paramList": paramData,
            "isFullPrompt": true
        }, false, true, updatePack);
    }, _onNextGenLogon: function (logonData) {
        this._request({"crprompt": "nextGenLogon", "logons": logonData}, false, true);
    }, _onSubmitPromptEnginePrompts: function (formName) {
        var isPromptDialogVisible = (this._viewer && this._viewer._promptDlg && this._viewer._promptDlg.isVisible());
        var useAsync = isPromptDialogVisible;
        var valueIDKey = "ValueID" + this._name;
        var contextIDKey = "ContextID" + this._name;
        var contextHandleIDKey = "ContextHandleID" + this._name;
        var valueID = document.getElementById(valueIDKey);
        if (valueID) {
            this._addRequestField(valueIDKey, valueID.value);
        }
        var contextID = document.getElementById(contextIDKey);
        if (contextID) {
            this._addRequestField(contextIDKey, contextID.value);
        }
        var contextHandleID = document.getElementById(contextHandleIDKey);
        if (contextHandleID) {
            this._addRequestField(contextHandleIDKey, contextHandleID.value);
        }
        this._request({"crprompt": "pmtEngine", "isAdvancedDialog": isPromptDialogVisible}, useAsync);
        this._removeRequestField(valueIDKey);
        this._removeRequestField(contextIDKey);
        this._removeRequestField(contextHandleIDKey);
    }, _onSubmitStaticPrompts: function (formName) {
        this._addRequestFields(formName);
        this._request({"crprompt": "param"}, false);
    }, _onSubmitDBLogon: function (formName) {
        this._addRequestFieldsFromContent(this._promptPage.contentId);
        this._request({"crprompt": "logon"}, false);
    }, _onSubmitExport: function (start, end, format) {
        var isRange = true;
        if (!start && !end) {
            isRange = false;
        }
        if (!format) {
            format = "PDF";
        }
        var reqObj = {tb: "crexport", text: format, range: isRange + ""};
        if (isRange) {
            reqObj["from"] = start + "";
            reqObj["to"] = end + "";
        }
        bobj.crv.logger.info("UIAction Export.Submit " + format);
        if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
            this._ioHandler.redirectToServlet();
            this._ioHandler.addRequestField("ServletTask", "Export");
        }
        var callback = null;
        this._request(reqObj, false, false);
    }, _onCancelParamDlg: function () {
        bobj.crv.logger.info("UIAction PromptDialog.Cancel");
        this._viewer.hidePromptDialog();
    }, _onReceiveParamDlg: function (html) {
        this._viewer.showPromptDialog(html);
    }, _onSort: function (sortArgs) {
        bobj.crv.logger.info("UIAction Report.Sort");
        this._request(sortArgs, false);
    }, _onNavigateReportPart: function (navArgs) {
        bobj.crv.logger.info("UIAction ReportPart.Navigate");
        this._request(navArgs, false);
    }, _onNavigateBookmark: function (navArgs) {
        bobj.crv.logger.info("UIAction Report.Navigate");
        this._request(navArgs, false);
    }, getCurrentExpandedPaths: function () {
        var viewState = this._getViewState();
        if (viewState) {
            return viewState.gpTreeCurrentExpandedPaths;
        }
        return {};
    }, applyParams: function (params) {
        if (params) {
            bobj.crv.logger.info("UIAction ParameterPanel.Apply");
            if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
                params = this._encodeParameters(params);
            }
            this._request({crprompt: "paramPanel", paramList: params});
        }
    }, getServletURI: function () {
        var servletURL = "";
        if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
            servletURL = this._ioHandler._servletUrl;
        }
        return servletURL;
    }, showAdvancedParamDialog: function (paramController) {
        if (!paramController) {
            return;
        }
        var param = paramController._findParam(paramController._selected);
        if (!param) {
            return;
        }
        this._focusedParamName = param.paramName;
        if (this._viewer.getPromptingType().toLowerCase() == bobj.crv.Viewer.PromptingTypes.FLEX) {
            var servletURL = "";
            if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
                servletURL = this._ioHandler._servletUrl;
            }
            this._viewer.showFlexPromptDialog(paramController, param, servletURL);
        } else {
            if (this._isPromptingTypeUI5) {
                var adapter = bobj.crv.params.ViewerParameterAdapter;
                adapter.setCurrentIParamInfo(this._name, paramController, param);
                if (!adapter.hasIParamPromptUnitData(this._name)) {
                    this._request({promptDlg: this._cloneParameter(param)}, true, true);
                } else {
                    if (param.allowMultiValue && param.allowRangeValue && param.modifiedValue.length > 5) {
                        if (this._reportProcessing) {
                            this._reportProcessing.Show();
                        }
                    }
                    this._viewer.showAdaptedPromptDialog(this.getServletURI(), null, false, this.getPromptingType());
                }
            } else {
                var clonedParam = MochiKit.Base.clone(param);
                clonedParam.defaultValues = null;
                if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
                    clonedParam.value = MochiKit.Base.clone(param.value);
                    clonedParam = this._encodeParameter(clonedParam);
                }
                this._request({promptDlg: clonedParam}, true);
            }
        }
    }, _encodeParameters: function (params) {
        if (params) {
            for (var i = 0, len = params.length; i < len; i++) {
                params[i] = this._encodeParameter(params[i]);
            }
        }
        return params;
    }, _cloneParameter: function (param) {
        var clonedParam = MochiKit.Base.clone(param);
        clonedParam.defaultValues = null;
        clonedParam.modifiedValue = null;
        if (this._ioHandler instanceof bobj.crv.ServletAdapter || this._ioHandler instanceof bobj.crv.FacesAdapter) {
            clonedParam.value = MochiKit.Base.clone(param.value);
        }
        return clonedParam;
    }, _encodeParameter: function (p) {
        if (p) {
            if (p.value && p.valueDataType == bobj.crv.params.DataTypes.STRING) {
                for (var i = 0, valuesLen = p.value.length; i < valuesLen; i++) {
                    if (bobj.isString(p.value[i])) {
                        p.value[i] = encodeURIComponent(p.value[i]);
                    } else {
                        if (bobj.isObject(p.value[i])) {
                            if (p.value[i].beginValue) {
                                p.value[i].beginValue = encodeURIComponent(p.value[i].beginValue);
                            }
                            if (p.value[i].endValue) {
                                p.value[i].endValue = encodeURIComponent(p.value[i].endValue);
                            }
                        }
                    }
                }
            }
            if (p.paramName) {
                p.paramName = encodeURIComponent(p.paramName);
            }
            if (p.reportName) {
                p.reportName = encodeURIComponent(p.reportName);
            }
        }
        return p;
    }, _setViewProperty: function (propName, propValue) {
        var viewState = this._getViewState();
        if (viewState) {
            viewState[propName] = propValue;
        }
    }, _getViewProperty: function (propName) {
        var viewState = this._getViewState();
        if (viewState) {
            return viewState[propName];
        }
        return null;
    }, _setCommonProperty: function (propName, propValue) {
        var state = this._getCommonState();
        if (state) {
            state[propName] = propValue;
        }
    }, _getCommonProperty: function (propName) {
        var state = this._getCommonState();
        if (state) {
            return state[propName];
        }
        return null;
    }, _updateUIState: function (viewId) {
    }, _getViewState: function () {
        var compState = bobj.crv.stateManager.getComponentState(this._name);
        if (compState && compState.curViewId) {
            return compState[compState.curViewId];
        }
        return null;
    }, _getCommonState: function () {
        var compState = bobj.crv.stateManager.getComponentState(this._name);
        if (compState) {
            return compState.common;
        }
        return null;
    }, _setInteractiveParams: function (paramList) {
        if (!this._ioHandler.canUseAjax()) {
            var paramPanel = this._viewer.getParameterPanel();
            if (paramPanel) {
                paramPanel.showError(L_bobj_crv_InteractiveParam_NoAjax);
            }
            return;
        }
        if (!paramList) {
            var stateParamList = this._getCommonProperty("iactParams");
            if (stateParamList) {
                var Parameter = bobj.crv.params.Parameter;
                var paramList = [];
                for (var i = 0; i < stateParamList.length; ++i) {
                    paramList.push(new Parameter(stateParamList[i]));
                }
            }
        }
        if (paramList && paramList.length) {
            var paramPanel = this._viewer.getParameterPanel();
            if (paramPanel) {
                var paramOpts = this._getCommonProperty("paramOpts");
                this._paramCtrl = new bobj.crv.params.ParameterController(paramPanel, this, paramOpts);
                this._paramCtrl.setParameters(paramList);
            }
        }
    }, _isPromptingTypeUI5: function () {
        var type = this.getPromptingType();
        return (type && type.toLowerCase() == bobj.crv.Viewer.PromptingTypes.UI5);
    }, _getPromptDialogCloseCB: function () {
        var closeCB = null;
        if (this._paramCtrl && this._focusedParamName) {
            closeCB = this._paramCtrl.getFocusAdvButtonCB(this._focusedParamName);
            this._focusedParamName = null;
        }
        return closeCB;
    }, _updateInteractiveParams: function (update) {
        if (update.resolvedFields) {
            this._viewer.hidePromptDialog();
            for (var i = 0; i < update.resolvedFields.length; i++) {
                var param = new bobj.crv.params.Parameter(update.resolvedFields[i]);
                this._paramCtrl.updateParameter(param.paramName, param.getValue());
            }
            this._paramCtrl._updateToolbar();
        } else {
            if (this._isPromptingTypeUI5()) {
                if (update.script) {
                    bobj.evalInWindow(update.script);
                    this._viewer.showAdaptedPromptDialog(this.getServletURI(), null, false, this.getPromptingType(), this.getViewerType());
                }
            } else {
                this._viewer.showPromptDialog(update.html);
            }
        }
    }, _request: function (evArgs, allowAsynch, showIndicator, updatePack) {
        var pageState = bobj.crv.stateManager.getCompositeState();
        var bind = MochiKit.Base.bind;
        var defaultCallback = bind(this._onResponse, this, updatePack, evArgs);
        var defaultErrCallback = bind(this._onIOError, this);
        if (!bobj.isBoolean(showIndicator)) {
            showIndicator = true;
        }
        if (this._reportProcessing && showIndicator) {
            this._reportProcessing.delayedShow(false);
        }
        var deferred = this._ioHandler.request(pageState, this._name, evArgs, allowAsynch, defaultCallback, defaultErrCallback);
        if (deferred) {
            if (this._reportProcessing && showIndicator) {
                this._reportProcessing.setDeferred(deferred);
            }
            deferred.addCallback(defaultCallback);
            deferred.addErrback(defaultErrCallback);
        }
    }, _onResponse: function (updatePack, evArgs, response) {
        var json = null;
        if (bobj.isString(response)) {
            json = MochiKit.Base.evalJSON(response);
        } else {
            json = MochiKit.Async.evalJSONRequest(response);
        }
        if (json) {
            if (json.needsReload) {
                this._request(evArgs, false, true, updatePack);
                return;
            }
            if (json.status && this._viewer && (json.status.errorMessage || json.status.debug)) {
                var errorMessage = json.status.errorMessage || L_bobj_crv_RequestError;
                this._viewer.showError(errorMessage, json.status.debug);
            }
            if (json.state) {
                var jsonState = json.state;
                if (bobj.isString(jsonState)) {
                    jsonState = MochiKit.Base.evalJSON(jsonState);
                }
                bobj.crv.stateManager.setComponentState(this._name, jsonState);
            }
            if (json.update && json.update.promptDlg) {
                this._updateInteractiveParams(json.update.promptDlg);
                bobj.crv.logger.info("Update InteractiveParams");
            }
            if (json.update && this._viewer && updatePack) {
                this._viewer.update(json.update, updatePack);
                this._setInteractiveParams();
                bobj.crv.logger.info("Update Viewer");
            }
        }
        if (this._reportProcessing) {
            this._reportProcessing.cancelShow();
        }
    }, _onIOError: function (response) {
        if (this._reportProcessing.wasCancelled() == true) {
            return;
        }
        if (this._viewer) {
            var error = this._ioHandler.processError(response);
            var detailText = "";
            if (bobj.isString(error)) {
                detailText = error;
            } else {
                for (var i in error) {
                    if (bobj.isString(error[i]) || bobj.isNumber(error[i])) {
                        detailText += i + ": " + error[i] + "\n";
                    }
                }
            }
            this._viewer.showError(L_bobj_crv_RequestError, detailText);
        }
        if (this._reportProcessing) {
            this._reportProcessing.cancelShow();
        }
    }, _saveViewState: function () {
        var pageState = bobj.crv.stateManager.getCompositeState();
        this._ioHandler.saveViewState(pageState, this._name);
    }, _addRequestFields: function (formName) {
        var frm = document.getElementById(formName);
        if (frm) {
            for (var i in frm) {
                var frmElem = frm[i];
                if (frmElem && frmElem.name && frmElem.value) {
                    this._addRequestField(frmElem.name, frmElem.value);
                }
            }
        }
    }, _addRequestFieldsFromContent: function (contentId) {
        var parent = document.getElementById(contentId);
        if (!parent) {
            return;
        }
        var elements = MochiKit.DOM.getElementsByTagAndClassName("input", null, parent);
        for (var i in elements) {
            var inputElement = elements[i];
            if (inputElement && inputElement.name && inputElement.value) {
                this._addRequestField(inputElement.name, inputElement.value);
            }
        }
    }, _addRequestField: function (fldName, fldValue) {
        this._ioHandler.addRequestField(fldName, fldValue);
    }, _removeRequestField: function (fldName) {
        this._ioHandler.removeRequestField(fldName);
    }, _onHyperlinkClicked: function (args) {
        args = MochiKit.Base.parseQueryString(args);
        var ls = this._viewer.getEventListeners("hyperlinkClicked");
        var handled = false;
        if (ls) {
            for (var i = 0, lsLen = ls.length; i < lsLen; i++) {
                if (ls[i](args) == true) {
                    handled = true;
                }
            }
        }
        if (handled) {
            return;
        }
        var w = window;
        if (args.target && args.target != "_self") {
            w.open(args.url, args.target);
        } else {
            w.location = args.url;
        }
    }
};
bobj.crv.StateManager = function () {
    this._state = {};
};
bobj.crv.StateManager.prototype = {
    setViewState: function (viewerName, stateName, viewState) {
        var state = this._state;
        if (!state[viewerName]) {
            state[viewerName] = {};
        }
        state[viewerName][stateName] = viewState;
    }, getViewState: function (viewerName, stateName) {
        var state = this._state;
        if (!state[viewerName]) {
            return null;
        }
        return state[viewerName][stateName];
    }, setComponentState: function (viewerName, state) {
        this._state[viewerName] = state;
    }, getComponentState: function (viewerName) {
        return this._state[viewerName];
    }, getCompositeState: function () {
        return this._state;
    }
};
if (typeof bobj.crv.viewerState == "undefined") {
    bobj.crv.stateManager = new bobj.crv.StateManager();
}
bobj.crv.IOAdapterBase = {
    request: function () {
    }, addRequestField: function (fldName, fldValue) {
    }, removeRequestField: function (fldName) {
    }, saveViewState: function (pageState, viewerName) {
    }, getPostDataForPrinting: function (pageState, viewerName) {
    }, processError: function (response) {
        return response;
    }, canUseAjax: function () {
        try {
            return (MochiKit.Async.getXMLHttpRequest() !== null);
        } catch (e) {
            return false;
        }
    }
};
bobj.crv.ServletAdapter = function (pageUrl, servletUrl) {
    this._pageUrl = pageUrl;
    this._servletUrl = servletUrl;
    this._form = null;
};
bobj.crv.ServletAdapter._requestParams = {
    STATE: "CRVCompositeViewState",
    TARGET: "CRVEventTarget",
    ARGUMENT: "CRVEventArgument"
};
bobj.crv.ServletAdapter.prototype = MochiKit.Base.merge(bobj.crv.IOAdapterBase, {
    request: function (pageState, viewerName, eventArgs, allowAsync) {
        if (!this._form) {
            this._createForm();
        }
        var rp = bobj.crv.ServletAdapter._requestParams;
        var toJSON = MochiKit.Base.serializeJSON;
        this._form[rp.STATE].value = encodeURIComponent(toJSON(pageState));
        this._form[rp.TARGET].value = encodeURIComponent(viewerName);
        this._form[rp.ARGUMENT].value = encodeURIComponent(toJSON(eventArgs));
        var deferred = null;
        if (allowAsync && this._servletUrl) {
            var req = MochiKit.Async.getXMLHttpRequest();
            req.open("POST", this._servletUrl, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Accept", "application/json");
            deferred = MochiKit.Async.sendXMLHttpRequest(req, MochiKit.Base.queryString(this._form));
        } else {
            this._form.submit();
        }
        this._form = null;
        return deferred;
    }, redirectToServlet: function () {
        if (!this._form) {
            this._createForm();
        }
        this._form.action = this._servletUrl;
    }, _createForm: function () {
        var d = MochiKit.DOM;
        var rp = bobj.crv.ServletAdapter._requestParams;
        this._form = d.FORM({
            name: bobj.uniqueId(),
            style: "display:none",
            method: "POST",
            enctype: "application/x-www-form-urlencoded;charset=utf-8",
            action: this._pageUrl
        }, d.INPUT({type: "hidden", name: rp.STATE}), d.INPUT({
            type: "hidden",
            name: rp.TARGET
        }), d.INPUT({type: "hidden", name: rp.ARGUMENT}));
        document.body.appendChild(this._form);
    }, addRequestField: function (fldName, fldValue) {
        if (fldName && fldValue) {
            if (!this._form) {
                this._createForm();
            }
            var existingElem = this._form[fldName];
            if (existingElem) {
                existingElem.value = fldValue;
            } else {
                this._form.appendChild(MochiKit.DOM.INPUT({type: "hidden", name: fldName, value: fldValue}));
            }
        }
    }, removeRequestField: function (fldName) {
        if (fldName) {
            var form = this._form;
            if (form) {
                var existingElem = form[fldName];
                if (existingElem) {
                    MochiKit.DOM.removeElement(existingElem);
                    if (form[fldName]) {
                        form[fldName] = null;
                    }
                }
                existingElem = null;
            }
        }
    }, getPostDataForPrinting: function (pageState, viewerName) {
        var toJSON = MochiKit.Base.serializeJSON;
        var rp = bobj.crv.ServletAdapter._requestParams;
        var state = toJSON(pageState);
        var postData = rp.STATE;
        postData += "=";
        postData += encodeURIComponent(state);
        postData += "&";
        postData += rp.TARGET;
        postData += "=";
        postData += encodeURIComponent(viewerName);
        postData += "&";
        postData += rp.ARGUMENT;
        postData += "=";
        postData += encodeURIComponent('"axprint="');
        if (document.getElementById("com.sun.faces.VIEW")) {
            postData += "&com.sun.faces.VIEW=" + encodeURIComponent(document.getElementById("com.sun.faces.VIEW").value);
        }
        return postData;
    }, processError: function (response) {
        if (!(typeof (response.number) == "undefined") && response.number == 404) {
            return L_bobj_crv_ServletMissing;
        }
        return response;
    }
});
bobj.crv.AspDotNetAdapter = function (postbackEventReference, replacementParameter, stateID, callbackEventReference) {
    this._postbackEventReference = postbackEventReference;
    this._replacementParameter = replacementParameter;
    this._stateID = stateID;
    this._form = null;
    this._callbackEventReference = callbackEventReference;
    this._additionalReqFlds = null;
    var tmpState = bobj.getElementByIdOrName(this._stateID);
    if (tmpState) {
        this._form = tmpState.form;
    }
};
bobj.crv.AspDotNetAdapter.prototype = MochiKit.Base.merge(bobj.crv.IOAdapterBase, {
    request: function (pageState, viewerName, eventArgs, allowAsync, callbackHandler, errbackHandler) {
        var toJSON = MochiKit.Base.serializeJSON;
        if (eventArgs && this._additionalReqFlds) {
            eventArgs = MochiKit.Base.update(eventArgs, this._additionalReqFlds);
        }
        this._additionalReqFlds = null;
        var jsonEventArgs = toJSON(eventArgs);
        if (allowAsync) {
            this.saveViewState(pageState, viewerName);
            if (typeof WebForm_InitCallback == "function") {
                __theFormPostData = "";
                __theFormPostCollection = [];
                WebForm_InitCallback();
            }
            var callback = this._callbackEventReference.replace("'arg'", "jsonEventArgs");
            callback = callback.replace("'cb'", "callbackHandler");
            callback = callback.replace("'errcb'", "errbackHandler");
            callback = callback.replace("'frmID'", "this._form.id");
            return eval(callback);
        } else {
            var postbackCall;
            if (this._postbackEventReference.indexOf("'" + this._replacementParameter + "'") >= 0) {
                postbackCall = this._postbackEventReference.replace("'" + this._replacementParameter + "'", "jsonEventArgs");
            } else {
                postbackCall = this._postbackEventReference.replace('"' + this._replacementParameter + '"', "jsonEventArgs");
            }
            eval(postbackCall);
            this._clearEventFields();
        }
    }, saveViewState: function (pageState, viewerName) {
        var toJSON = MochiKit.Base.serializeJSON;
        var viewState = pageState[viewerName];
        var state = bobj.getElementByIdOrName(this._stateID);
        if (state) {
            state.value = toJSON(viewState);
        }
    }, getPostDataForPrinting: function (pageState, viewerName) {
        var nv = MochiKit.DOM.formContents(this.form);
        var names = nv[0];
        var values = nv[1];
        names.push("crprint");
        values.push(viewerName);
        var queryString = MochiKit.Base.queryString(names, values);
        return queryString;
    }, addRequestField: function (fldName, fldValue) {
        if (!this._additionalReqFlds) {
            this._additionalReqFlds = {};
        }
        this._additionalReqFlds[fldName] = fldValue;
    }, _clearRequestField: function (fldName) {
        if (fldName) {
            if (this._form) {
                var existingElem = this._form[fldName];
                if (existingElem) {
                    existingElem.value = "";
                }
            }
        }
    }, _clearEventFields: function () {
        this._clearRequestField("__EVENTTARGET");
        this._clearRequestField("__EVENTARGUMENT");
    }
});
bobj.crv.FacesAdapter = function (formName, servletUrl) {
    this._formName = formName;
    this._servletUrl = servletUrl;
    this._useServlet = false;
    if (!bobj.crv.FacesAdapter._hasInterceptedSubmit) {
        this._interceptSubmit();
        bobj.crv.FacesAdapter._hasInterceptedSubmit = true;
    }
};
bobj.crv.FacesAdapter._requestParams = {
    STATE: "CRVCompositeViewState",
    TARGET: "CRVEventTarget",
    ARGUMENT: "CRVEventArgument"
};
bobj.crv.FacesAdapter.prototype = MochiKit.Base.merge(bobj.crv.IOAdapterBase, {
    request: function (pageState, viewerName, eventArgs, allowAsync) {
        var rp = bobj.crv.FacesAdapter._requestParams;
        var toJSON = MochiKit.Base.serializeJSON;
        var INPUT = MochiKit.DOM.INPUT;
        var deferred = null;
        var form = this._getForm();
        if (!form) {
            return;
        }
        if (!form[rp.TARGET]) {
            form.appendChild(INPUT({type: "hidden", name: rp.TARGET}));
        }
        form[rp.TARGET].value = encodeURIComponent(viewerName);
        if (!form[rp.ARGUMENT]) {
            form.appendChild(INPUT({type: "hidden", name: rp.ARGUMENT}));
        }
        form[rp.ARGUMENT].value = encodeURIComponent(toJSON(eventArgs));
        if (!form[rp.STATE]) {
            form.appendChild(INPUT({type: "hidden", name: rp.STATE}));
        }
        form[rp.STATE].value = encodeURIComponent(toJSON(pageState));
        if (allowAsync && this._servletUrl) {
            var req = MochiKit.Async.getXMLHttpRequest();
            req.open("POST", this._servletUrl, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Accept", "application/json");
            deferred = MochiKit.Async.sendXMLHttpRequest(req, MochiKit.Base.queryString(form));
        } else {
            var pageUrl = form.action;
            if (this._useServlet === true) {
                form.action = this._servletUrl;
            }
            form.submit();
            form.action = pageUrl;
            this._useServlet = false;
        }
        form[rp.TARGET].value = "";
        form[rp.ARGUMENT].value = "";
        form[rp.STATE].value = "";
        this.removeRequestField("ServletTask");
        return deferred;
    }, redirectToServlet: function () {
        this._useServlet = true;
    }, addRequestField: function (fldName, fldValue) {
        if (fldName && fldValue) {
            var form = this._getForm();
            if (form) {
                var existingElem = form[fldName];
                if (existingElem) {
                    existingElem.value = fldValue;
                } else {
                    form.appendChild(MochiKit.DOM.INPUT({type: "hidden", name: fldName, value: fldValue}));
                }
            }
        }
    }, removeRequestField: function (fldName) {
        if (fldName) {
            var form = this._getForm();
            if (form) {
                var existingElem = form[fldName];
                if (existingElem) {
                    MochiKit.DOM.removeElement(existingElem);
                    if (form[fldName]) {
                        form[fldName] = null;
                    }
                }
                existingElem = null;
            }
        }
    }, saveViewState: function (pageState, viewerName) {
        if (!bobj.crv.FacesAdapter._isStateSaved) {
            var form = this._getForm();
            if (form) {
                var rp = bobj.crv.FacesAdapter._requestParams;
                var toJSON = MochiKit.Base.serializeJSON;
                var INPUT = MochiKit.DOM.INPUT;
                if (!form[rp.STATE]) {
                    form.appendChild(INPUT({type: "hidden", name: rp.STATE}));
                }
                form[rp.STATE].value = encodeURIComponent(toJSON(pageState));
            }
            bobj.crv.FacesAdapter._isStateSaved = true;
        }
    }, _getForm: function () {
        return document.forms[this._formName];
    }, _interceptSubmit: function () {
        var form = this._getForm();
        if (form) {
            var oldSubmit = form.submit;
            form.submit = function () {
                bobj.event.publish("saveViewState");
                form.submit = oldSubmit;
                form.submit();
            };
        }
    }, getPostDataForPrinting: function (pageState, viewerName) {
        var toJSON = MochiKit.Base.serializeJSON;
        var rp = bobj.crv.ServletAdapter._requestParams;
        var state = toJSON(pageState);
        var postData = rp.STATE;
        postData += "=";
        postData += encodeURIComponent(state);
        postData += "&";
        postData += rp.TARGET;
        postData += "=";
        postData += encodeURIComponent(viewerName);
        postData += "&";
        postData += rp.ARGUMENT;
        postData += "=";
        postData += encodeURIComponent('"axprint="');
        if (document.getElementById("com.sun.faces.VIEW")) {
            postData += "&com.sun.faces.VIEW=" + encodeURIComponent(document.getElementById("com.sun.faces.VIEW").value);
        }
        return postData;
    }, processError: function (response) {
        if (!(typeof (response.number) == "undefined") && response.number == 404) {
            return L_bobj_crv_ServletMissing;
        }
        return response;
    }
});
if (typeof bobj == "undefined") {
    bobj = {};
}
bobj.ArgumentNormalizer = function () {
    this._rules = [];
};
bobj.ArgumentNormalizer.prototype = {
    addRule: function () {
        this._rules.push(arguments);
    }, normalize: function () {
        for (var rIdx = 0, nRules = this._rules.length; rIdx < nRules; ++rIdx) {
            var rule = this._rules[rIdx];
            if (rule.length == arguments.length) {
                var normalArgs = {};
                for (var aIdx = 0, nArgs = rule.length; aIdx < nArgs; ++aIdx) {
                    var argVal = arguments[aIdx];
                    var element = rule[aIdx];
                    if (bobj.isString(element)) {
                        var argTest = null;
                        var argName = element;
                        var argXform = null;
                    } else {
                        if (bobj.isArray(element)) {
                            var argTest = element[0];
                            var argName = element[1];
                            var argXform = element[2];
                        } else {
                            var argTest = element.test;
                            var argName = element.name;
                            var argXform = element.xform;
                        }
                    }
                    if (!argTest || argTest(argVal)) {
                        normalArgs[argName] = argXform ? argXform(argVal) : argVal;
                        if (aIdx + 1 == nArgs) {
                            return normalArgs;
                        }
                    } else {
                        break;
                    }
                }
            }
        }
        return null;
    }, normalizeArray: function (argsArray) {
        return this.normalize.apply(this, argsArray);
    }
};
if (typeof bobj == "undefined") {
    bobj = {};
}
if (typeof bobj.event == "undefined") {
    bobj.event = {};
    bobj.event._topicSubscriptions = {};
    bobj.event._globalSubscriptions = [];
}
bobj.event.publish = function (topic) {
    var args = bobj.slice(arguments, 1);
    var topicSubs = bobj.event._topicSubscriptions[topic];
    if (topicSubs) {
        for (var i = 0; i < topicSubs.length; ++i) {
            topicSubs[i]._notify.apply(null, args);
        }
    }
    var globalSubs = bobj.event._globalSubscriptions;
    for (var j = 0; j < globalSubs.length; ++j) {
        globalSubs[j]._notify.apply(null, args);
    }
};
bobj.event.subscribe = function () {
    var nmlr = bobj.event.subscribe._normalizer;
    if (!nmlr) {
        nmlr = bobj.event.subscribe._normalizer = new bobj.ArgumentNormalizer();
        nmlr.addRule("topic", "target", "methName");
        nmlr.addRule([bobj.isString, "topic"], "callback");
        nmlr.addRule("target", "methName");
        nmlr.addRule("callback");
    }
    return bobj.event.kwSubscribe(nmlr.normalizeArray(arguments));
};
bobj.event.kwSubscribe = function (kwArgs) {
    var bind = MochiKit.Base.bind;
    var subscription = {};
    if (kwArgs.callback) {
        subscription._notify = kwArgs.callback;
    } else {
        subscription._notify = bind(kwArgs.target[kwArgs.methName], kwArgs.target);
    }
    if (kwArgs.topic) {
        subscription.topic = kwArgs.topic;
        var subs = bobj.event._topicSubscriptions;
        if (!subs[kwArgs.topic]) {
            subs[kwArgs.topic] = [];
        }
        subs[kwArgs.topic].push(subscription);
    } else {
        bobj.event._globalSubscriptions.push(subscription);
    }
    return subscription;
};
bobj.event.unsubscribe = function (subscription) {
    var subsList = bobj.event._globalSubscriptions;
    if (subscription.topic) {
        subsList = bobj.event._topicSubscriptions[subscription.topic];
    }
    if (subsList) {
        var idx = MochiKit.Base.findIdentical(subsList, subscription);
        if (idx != -1) {
            subsList.splice(idx, 1);
            delete subscription._notify;
        }
    }
};
if (typeof (bobj.crv.PromptPage) == "undefined") {
    bobj.crv.PromptPage = {};
}
bobj.crv.newPromptPage = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        layoutType: "fixed",
        width: 800,
        height: 600,
        padding: 5,
        top: 0,
        left: 0
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "PromptPage";
    o._reportProcessing = null;
    bobj.fillIn(o, kwArgs);
    o.initOld = o.init;
    MochiKit.Base.update(o, bobj.crv.PromptPage);
    return o;
};
bobj.crv.PromptPage.setHTML = function (content) {
    var pageNode = this._pageNode;
    if (bobj.isString(content)) {
        pageNode.innerHTML = content;
    } else {
        if (bobj.isObject(content)) {
            pageNode.innerHTML = "";
            pageNode.appendChild(content);
            var contentStyle = content.style;
            contentStyle.display = "block";
            contentStyle.visibility = "visible";
        }
    }
};
bobj.crv.PromptPage.getHTML = function () {
    var h = bobj.html;
    var isBorderBoxModel = bobj.isBorderBoxModel();
    var pageOuterHeight = this.height + this.topMargin + this.bottomMargin;
    var pageOuterWidth = this.width + this.leftMargin + this.rightMargin;
    var contentHeight = isBorderBoxModel ? pageOuterHeight : this.height;
    var contentWidth = isBorderBoxModel ? pageOuterWidth : this.width;
    var layerStyle = {
        position: "relative",
        width: contentWidth + "px",
        height: contentHeight + "px",
        top: this.top + "px",
        left: this.left + "px",
        border: "none",
        "z-index": 1,
        "background-color": this.bgColor
    };
    if (this.layoutType == "fixed") {
        layerStyle.overflow = "auto";
    }
    var pageStyle = {"padding": this.padding + "px"};
    var html = h.DIV({id: this.id, style: layerStyle}, h.DIV({id: this.id + "_page", style: pageStyle}));
    return html + bobj.crv.getInitHTML(this.widx);
};
bobj.crv.PromptPage.init = function () {
    this._pageNode = document.getElementById(this.id + "_page");
    this.initOld();
    if (this.contentId) {
        var content = document.getElementById(this.contentId);
        if (content) {
            this.setHTML(content);
        }
    }
    var connect = MochiKit.Signal.connect;
    if (this.layoutType.toLowerCase() == "client") {
        connect(window, "onresize", this, "_doLayout");
    }
    this._doLayout();
};
bobj.crv.PromptPage._doLayout = function () {
    var layout = this.layoutType.toLowerCase();
    if ("client" == layout) {
        this.css.width = "100%";
        this.css.height = "100%";
    } else {
        if ("fitreport" == layout) {
            this.css.width = "100%";
            this.css.height = "100%";
        } else {
            this.css.width = this.width + "px";
            this.css.height = this.height + "px";
        }
    }
    var rptProcessing = this._reportProcessing;
    if (rptProcessing && rptProcessing.layer) {
        rptProcessing.center();
    }
};
bobj.crv.PromptPage.addChild = function (widget) {
    if (widget.widgetType == "ReportProcessingUI") {
        this._reportProcessing = widget;
    }
};
if (typeof (bobj.crv.FlexPromptPage) == "undefined") {
    bobj.crv.FlexPromptPage = {};
}
bobj.crv.newFlexPromptPage = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        layoutType: "fixed",
        width: 800,
        height: 600,
        padding: 5,
        top: 0,
        left: 0
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "FlexPromptPage";
    o._reportProcessing = null;
    bobj.fillIn(o, kwArgs);
    o.initOld = o.init;
    MochiKit.Base.update(o, bobj.crv.FlexPromptPage);
    return o;
};
bobj.crv.FlexPromptPage.setHTML = function (content) {
};
bobj.crv.FlexPromptPage.getHTML = function () {
    var isBorderBoxModel = bobj.isBorderBoxModel();
    var pageOuterHeight = this.height + this.topMargin + this.bottomMargin;
    var pageOuterWidth = this.width + this.leftMargin + this.rightMargin;
    var contentHeight = isBorderBoxModel ? pageOuterHeight : this.height;
    var contentWidth = isBorderBoxModel ? pageOuterWidth : this.width;
    var useSize = this.layoutType.toLowerCase() == bobj.crv.Viewer.LayoutTypes.FIXED;
    var layerStyle = {
        position: "relative",
        width: useSize ? contentWidth + "px" : "100%",
        height: useSize ? contentHeight + "px" : "100%",
        top: this.top + "px",
        left: this.left + "px",
        border: "none",
        "z-index": 1,
        "background-color": this.bgColor
    };
    var pageStyle = {"padding": this.padding + "px", position: "absolute"};
    bobj.crv.params.FlexParameterUI.setViewerLayoutType(this.id, this.layoutType);
    var h = bobj.html;
    return h.DIV({id: this.id, style: layerStyle}, h.DIV({
        id: this.id + "_page",
        style: pageStyle
    }, h.DIV({id: this.contentId})));
};
bobj.crv.FlexPromptPage.init = function () {
    var connect = MochiKit.Signal.connect;
    if (this.layoutType.toLowerCase() == "client") {
        connect(window, "onresize", this, "_doLayout");
    }
    this._doLayout();
};
bobj.crv.FlexPromptPage._doLayout = function () {
    var rptProcessing = this._reportProcessing;
    if (rptProcessing && rptProcessing.layer) {
        rptProcessing.center();
    }
};
bobj.crv.FlexPromptPage.addChild = function (widget) {
    if (widget.widgetType == "ReportProcessingUI") {
        this._reportProcessing = widget;
    }
};
if (typeof bobj.crv.PrintUI == "undefined") {
    bobj.crv.PrintUI = {};
}
if (typeof bobj.crv.ExportUI == "undefined") {
    bobj.crv.ExportUI = {};
}
if (typeof bobj.crv.ErrorDialog == "undefined") {
    bobj.crv.ErrorDialog = {};
}
if (typeof bobj.crv.ReportProcessingUI == "undefined") {
    bobj.crv.ReportProcessingUI = {};
}
bobj.crv.newPrintUI = function (kwArgs) {
    if (!kwArgs.id) {
        kwArgs = MochiKit.Base.update({id: bobj.uniqueId()}, kwArgs);
    }
    var lbl = kwArgs.submitBtnLabel;
    if (!lbl) {
        lbl = L_bobj_crv_submitBtnLbl;
    }
    var infoTitle = kwArgs.infoTitle;
    if (!infoTitle) {
        infoTitle = L_bobj_crv_PrintInfoTitle;
    }
    var dialogTitle = kwArgs.dialogTitle;
    if (!dialogTitle) {
        if (kwArgs.isActxPrinting) {
            dialogTitle = L_bobj_crv_ActiveXPrintDialogTitle;
        } else {
            dialogTitle = L_bobj_crv_PDFPrintDialogTitle;
        }
    }
    var infoMsg = kwArgs.infoMsg;
    if (!infoMsg) {
        infoMsg = L_bobj_crv_PrintInfo1;
        infoMsg += "\n";
        infoMsg += L_bobj_crv_PrintInfo2;
    }
    var o = newDialogBoxWidget(kwArgs.id + "_dialog", dialogTitle, 250, 100, null, bobj.crv.PrintUI._cancel, false);
    o.actxId = o.id + "_actx";
    o.actxContainerId = o.id + "_actxdiv";
    o._processingPrinting = false;
    o._initOld = o.init;
    o._showOld = o.show;
    if (!kwArgs.isActxPrinting) {
        o._fromBox = newIntFieldWidget(o.id + "_fromBox", null, null, null, null, true, "", 50);
        o._fromBox.setDisabled = bobj.crv.PrintUI.disabledTextFieldWidget;
        o._toBox = newIntFieldWidget(o.id + "_toBox", null, null, null, null, true, "", 50);
        o._toBox.setDisabled = bobj.crv.PrintUI.disabledTextFieldWidget;
        o._submitBtn = newButtonWidget(o.id + "_submitBtn", lbl, MochiKit.Base.bind(bobj.crv.PrintUI._submitBtnCB, o));
        o._allRadio = newRadioWidget(o.id + "_allRadio", o.id + "_grp", L_bobj_crv_PrintAllLbl, MochiKit.Base.bind(bobj.crv.PrintUI.disabledPageRange, o, true));
        o._rangeRadio = newRadioWidget(o.id + "_rangeRadio", o.id + "_grp", L_bobj_crv_PrintPagesLbl, MochiKit.Base.bind(bobj.crv.PrintUI.disabledPageRange, o, false));
        o._optionsFrame = newFrameZoneWidget(o.id + "_optionsFrame", 250);
        if (!kwArgs.isExporting) {
            o._info = newInfoWidget(o.id + "_info", infoTitle, null, infoMsg, 100);
        }
    }
    o.widgetType = "PrintUI";
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.PrintUI);
    return o;
};
bobj.crv.PrintUI.disabledTextFieldWidget = function (disabled) {
    TextFieldWidget_setDisabled.call(this, disabled);
    if (disabled) {
        MochiKit.DOM.addElementClass(this.layer, "textDisabled");
    } else {
        MochiKit.DOM.removeElementClass(this.layer, "textDisabled");
    }
};
bobj.crv.PrintUI.disabledPageRange = function (bool) {
    if (this._fromBox && this._toBox) {
        this._fromBox.setDisabled(bool);
        this._toBox.setDisabled(bool);
    }
};
bobj.crv.PrintUI._submitBtnCB = function () {
    var start = null;
    var end = null;
    if (this._rangeRadio.isChecked()) {
        start = parseInt(this._fromBox.getValue(), 10);
        end = parseInt(this._toBox.getValue(), 10);
        if (!start || !end || (start < 0) || (start > end)) {
            alert(L_bobj_crv_PrintPageRangeError);
            return;
        }
    }
    if (this.widgetType == "PrintUI") {
        MochiKit.Signal.signal(this, "printSubmitted", start, end);
    } else {
        MochiKit.Signal.signal(this, "exportSubmitted", start, end, this._comboBox.getSelection().value);
    }
    this.show(false);
};
bobj.crv.PrintUI._getRPSafeURL = function (url) {
    if (!url) {
        return;
    }
    if (url.indexOf("/") === 0) {
        return url;
    }
    var winLoc = window.location.href;
    var lPos = winLoc.lastIndexOf("/");
    if (lPos < 0) {
        return url;
    }
    winLoc = winLoc.substring(0, lPos);
    return winLoc + "/" + url;
};
bobj.crv.PrintUI._getObjectTag = function (postData) {
    var oa = [];
    oa.push('<OBJECT width="0" height="0" ID="');
    oa.push(this.actxId);
    oa.push('" CLASSID="CLSID:');
    oa.push(bobj.crv.ActxPrintControl_CLSID);
    oa.push('" CODEBASE="');
    oa.push(this._getRPSafeURL(this.codeBase));
    oa.push("#Version=");
    oa.push(bobj.crv.ActxPrintControl_Version);
    oa.push('" VIEWASTEXT>');
    oa.push('<PARAM NAME="PostBackData" VALUE="');
    oa.push(postData);
    oa.push('">');
    oa.push('<PARAM NAME="ServerResourceVersion" VALUE="');
    oa.push(bobj.crv.ActxPrintControl_Version);
    oa.push('">');
    if (this.lcid) {
        oa.push('<PARAM NAME="LocaleID" VALUE="');
        oa.push(this.lcid);
        oa.push('">');
    }
    if (this.url) {
        oa.push('<PARAM NAME="URL" VALUE="');
        oa.push(this._getRPSafeURL(this.url));
        oa.push('">');
    }
    if (this.title) {
        oa.push('<PARAM NAME="Title" VALUE="');
        oa.push(this.title);
        oa.push('">');
    }
    if (this.maxPage) {
        oa.push('<PARAM NAME="MaxPageNumber" VALUE="');
        oa.push(this.maxPage);
        oa.push('">');
    }
    if (this.paperOrientation) {
        oa.push('<PARAM NAME="PageOrientation" VALUE="');
        oa.push(this.paperOrientation);
        oa.push('">');
    }
    if (this.paperSize) {
        oa.push('<PARAM NAME="PaperSize" VALUE="');
        oa.push(this.paperSize);
        oa.push('">');
    }
    if (this.paperWidth) {
        oa.push('<PARAM NAME="PaperWidth" VALUE="');
        oa.push(this.paperWidth);
        oa.push('">');
    }
    if (this.paperLength) {
        oa.push('<PARAM NAME="PaperLength" VALUE="');
        oa.push(this.paperLength);
        oa.push('">');
    }
    if (this.driverName) {
        oa.push('<PARAM NAME="PrinterDriverName" VALUE="');
        oa.push(this.driverName);
        oa.push('">');
    }
    if (this.useDefPrinter) {
        oa.push('<PARAM NAME="UseDefaultPrinter" VALUE="');
        oa.push(this.useDefPrinter);
        oa.push('">');
    }
    if (this.useDefPrinterSettings) {
        oa.push('<PARAM NAME="UseDefaultPrinterSettings" VALUE="');
        oa.push(this.useDefPrinterSettings);
        oa.push('">');
    }
    if (this.sendPostDataOnce) {
        oa.push('<PARAM NAME="SendPostDataOnce" VALUE="');
        oa.push(this.sendPostDataOnce);
        oa.push('">');
    }
    oa.push("</OBJECT>");
    oa.push('<table id="');
    oa.push(this.actxId);
    oa.push('_wait" border="0" cellspacing="0" cellpadding="0" width="100%" ><tbody>');
    oa.push('<tr><td align="center" valign="top">');
    var o = this;
    var zoneW = o.getContainerWidth() - 10;
    var zoneH = o.getContainerHeight() - (2 * o.pad + 21 + 10);
    oa.push('<table class="waitdialogzone" style="');
    oa.push(sty("width", zoneW));
    oa.push(sty("height", zoneH));
    oa.push('" id="frame_table_');
    oa.push(o.id);
    oa.push('" cellspacing="0" cellpadding="0" border="0"><tbody><tr><td valign="top" class="dialogzone" id="frame_cont_');
    oa.push(o.id);
    oa.push('">');
    oa.push('<table border="0" cellspacing="0" cellpadding="0" width="100%"><tbody>');
    oa.push('<tr><td align="center" style="padding-top:5px;">');
    oa.push(img(_skin + "wait01.gif", 200, 40));
    oa.push("</td></tr>");
    oa.push('<tr><td align="left" style="padding-left:2px;padding-right:2px;padding-top:5px;">');
    oa.push('<div class="icontext" style="wordWrap:break_word;">');
    oa.push(convStr(L_bobj_crv_PrintControlProcessingMessage, false, true));
    oa.push("</div></td></tr></tbody></table>");
    oa.push("</td></tr></tbody></table>");
    oa.push("</td></tr></tbody></table>");
    return oa.join("");
};
bobj.crv.PrintUI._cancel = function () {
    if (this.isActxPrinting) {
        document.getElementById(this.actxContainerId).innerHTML = "";
        this._processingPrinting = false;
    }
};
bobj.crv.PrintUI._processPrinting = function () {
    if (!this._processingPrinting) {
        var o = document.getElementById(this.actxId);
        var w = document.getElementById(this.actxId + "_wait");
        if (o && w) {
            o.width = "100%";
            o.height = "100%";
            w.style.display = "none";
        }
        this._processingPrinting = true;
    }
};
bobj.crv.PrintUI.show = function (visible, postBackData) {
    this._processingPrinting = false;
    if (visible) {
        if (!this.layer) {
            targetApp(this.getHTML());
            this.init();
        }
        if (this.isActxPrinting) {
            document.getElementById(this.actxContainerId).innerHTML = this._getObjectTag(postBackData);
        }
        this._showOld(true);
    } else {
        if (this.layer) {
            this._showOld(false);
        }
    }
};
bobj.crv.PrintUI.init = function () {
    this._initOld();
    if (!this.isActxPrinting) {
        this._fromBox.init();
        this._toBox.init();
        this._submitBtn.init();
        this._optionsFrame.init();
        this._allRadio.init();
        this._rangeRadio.init();
        if (!this.isExporting) {
            this._info.init();
        }
        this._allRadio.check(true);
        this._toBox.setDisabled(true);
        this._fromBox.setDisabled(true);
        if (this.widgetType == "ExportUI") {
            this._initExportList();
        }
    }
};
bobj.crv.PrintUI.getHTML = function () {
    var h = bobj.html;
    var o = this;
    var strArr = [];
    strArr.push(o.beginHTML());
    if (!this.isActxPrinting) {
        strArr.push('<table class="dialogzone" border=0 cellpadding=0 cellspacing=2>');
        strArr.push("<tr>");
        strArr.push('  <td style="padding-top:4px;">');
        strArr.push(o._optionsFrame.beginHTML());
        if (this.widgetType == "ExportUI") {
            strArr.push(this._getExportList());
        }
        if (_ie) {
            strArr.push('<label tabIndex="0">' + L_bobj_crv_PrintRangeLbl + "</label>");
        } else {
            strArr.push(L_bobj_crv_PrintRangeLbl);
        }
        strArr.push(o._allRadio.getHTML());
        strArr.push(o._rangeRadio.getHTML());
        strArr.push('<span style="padding-left:20px">' + L_bobj_crv_PrintFromLbl + "</span>");
        strArr.push(o._fromBox.getHTML());
        strArr.push('<span style="padding-left:4px">' + L_bobj_crv_PrintToLbl + "</span>");
        strArr.push(o._toBox.getHTML());
        strArr.push(o._optionsFrame.endHTML());
        strArr.push("  </td>");
        strArr.push("</tr><tr>");
        if (!this.isExporting) {
            strArr.push('  <td style="padding-top:8px;">');
            strArr.push(o._info.getHTML());
            strArr.push("  </td>");
            strArr.push("</tr><tr>");
        }
        strArr.push('  <td align="right" style="padding-top:4px;">');
        strArr.push(o._submitBtn.getHTML());
        strArr.push("  </td>");
        strArr.push("</tr></table>");
    } else {
        strArr.push(h.DIV({id: this.actxContainerId}));
        strArr.push('<script for="' + this.actxId + '" EVENT="Finished(status, statusText)" language="javascript">');
        strArr.push('getWidgetFromID("' + this.id + '").show(false);');
        strArr.push("<\/script>");
        strArr.push('<script for="' + this.actxId + '" EVENT="PrintingProgress(pageNumber)" language="javascript">');
        strArr.push('getWidgetFromID("' + this.id + '")._processPrinting();');
        strArr.push("<\/script>");
    }
    strArr.push(o.endHTML());
    strArr.push(bobj.crv.getInitHTML(this.widx));
    return strArr.join("");
};
bobj.crv.newExportUI = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        submitBtnLabel: L_bobj_crv_ExportBtnLbl,
        dialogTitle: L_bobj_crv_ExportDialogTitle,
        infoTitle: L_bobj_crv_ExportInfoTitle,
        infoMsg: L_bobj_crv_PrintInfo1,
        isExporting: true
    }, kwArgs);
    var o = bobj.crv.newPrintUI(kwArgs);
    o._comboBox = newCustomCombo(o.id + "_combo", MochiKit.Base.bind(bobj.crv.ExportUI._onSelectFormat, o), false, 270, L_bobj_crv_ExportFormatLbl, _skin + "../transp.gif", 0, 14);
    if (o._comboBox) {
        o._comboBox.icon.border = 0;
        o._comboBox.icon.h = 14;
        o._comboBox.arrow.h = 12;
        o._comboBox.arrow.dy += 2;
        o._comboBox.arrow.disDy += 2;
    }
    o.availableFormats = (o.availableFormats ? eval(o.availableFormats) : null);
    var itemsCount = (bobj.isArray(o.availableFormats) ? o.availableFormats.length : 0);
    for (var i = 0; i < itemsCount; i++) {
        var item = o.availableFormats[i];
        o._comboBox.add(item.name, item.value, item.isSelected);
    }
    o.widgetType = "ExportUI";
    MochiKit.Base.update(o, bobj.crv.ExportUI);
    return o;
};
bobj.crv.ExportUI._onSelectFormat = function () {
    var format = this._comboBox.getSelection().value;
    if (format == "CrystalReports" || format == "RecordToMSExcel" || format == "CharacterSeparatedValues" || format == "XML") {
        this._fromBox.setDisabled(true);
        this._toBox.setDisabled(true);
        this._rangeRadio.check(false);
        this._rangeRadio.setDisabled(true);
        this._allRadio.check(true);
    } else {
        this._rangeRadio.setDisabled(false);
    }
};
bobj.crv.ExportUI._initExportList = function () {
    if (!this._comboBox.initialized()) {
        this._comboBox.init();
        var item0 = this._comboBox.getItemByIndex(0);
        if (item0 != null) {
            this._comboBox.selectItem(item0);
        }
    }
    this._onSelectFormat();
};
bobj.crv.ExportUI._getExportList = function () {
    var exportLabel = L_bobj_crv_ExportFormatLbl;
    if (_ie) {
        exportLabel = '<label tabIndex="0">' + L_bobj_crv_ExportFormatLbl + "</label>";
    }
    return exportLabel + this._comboBox.getHTML();
};
bobj.crv.ErrorDialog.getInstance = function () {
    if (!bobj.crv.ErrorDialog.__instance) {
        bobj.crv.ErrorDialog.__instance = bobj.crv.newErrorDialog();
    }
    return bobj.crv.ErrorDialog.__instance;
};
bobj.crv.newErrorDialog = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        title: L_bobj_crv_Error,
        text: null,
        detailText: null,
        okLabel: L_bobj_crv_OK,
        promptType: _promptDlgCritical
    }, kwArgs);
    var o = newPromptDialog(kwArgs.id, kwArgs.title, kwArgs.text, kwArgs.okLabel, null, kwArgs.promptType, null, null, true);
    o.widgetType = "ErrorDialog";
    bobj.fillIn(o, kwArgs);
    o._promptDlgInit = o.init;
    o._promptDialogSetText = o.setText;
    o._promptDialogShow = o.show;
    o._promptDialogSetTitle = o.setTitle;
    o._promptDialogSetPromptType = o.setPromptType;
    MochiKit.Base.update(o, bobj.crv.ErrorDialog);
    o.noCB = MochiKit.Base.bind(o._onClose, o);
    o.yesCB = o.noCB;
    o._detailBtn = newIconWidget(o.id + "_detailBtn", bobj.skinUri("../help.gif"), MochiKit.Base.bind(bobj.crv.ErrorDialog._onDetailBtnClick, o), L_bobj_crv_showDetails, null, 16, 16, 0, 0, 22, 0);
    return o;
};
bobj.crv.ErrorDialog.init = function () {
    this._promptDlgInit();
    this._detailBtn.init();
    this._detailRow = document.getElementById(this.id + "_detRow");
    this._detailArea = document.getElementById(this.id + "_detArea");
    if (!this.detailText) {
        this._detailBtn.show(false);
    }
};
bobj.crv.ErrorDialog.getHTML = function () {
    var TABLE = bobj.html.TABLE;
    var TBODY = bobj.html.TBODY;
    var TR = bobj.html.TR;
    var TD = bobj.html.TD;
    var PRE = bobj.html.PRE;
    var DIV = bobj.html.DIV;
    var imgPath = PromptDialog_getimgPath(this.promptType);
    var imgAlt = PromptDialog_getimgAlt(this.promptType);
    var width = "320";
    var detailWidth = "300px";
    var detailHeight = "100px";
    var contentHTML = TABLE({
        "class": "dialogzone",
        width: width,
        cellpadding: "0",
        cellspacing: "5",
        border: "0"
    }, TBODY(null, TR(null, TD(null, TABLE({
        "class": "dialogzone",
        cellpadding: "5",
        cellspacing: "0",
        border: "0"
    }, TBODY(null, TR(null, TD({
        align: "right",
        width: "32"
    }, img(imgPath, 32, 32, null, 'id="dlg_img_' + this.id + '"', imgAlt)), TD(), TD({
        id: "dlg_txt_" + this.id,
        align: "left",
        tabindex: "0"
    }, convStr(this.text, false, true))))))), TR({
        id: this.id + "_detRow",
        style: {display: "none"}
    }, TD(null, DIV({
        "class": "infozone",
        style: {width: detailWidth, "height": detailHeight, overflow: "auto"}
    }, PRE({id: this.id + "_detArea"}, this.detailText)))), TR(null, TD(null, getSep())), TR(null, TD(null, TABLE({
        cellpadding: "5",
        cellspacing: "0",
        border: "0",
        width: "100%"
    }, TBODY(null, TR(null, TD({align: "left"}, this._detailBtn.getHTML()), TD({align: "right"}, this.yes.getHTML()))))))));
    return this.beginHTML() + contentHTML + this.endHTML();
};
bobj.crv.ErrorDialog.setText = function (text, detailText) {
    this.text = text;
    this.detailText = detailText;
    if (this.layer) {
        this._promptDialogSetText(text || "");
        if (this._detailArea) {
            this._detailArea.innerHTML = detailText || "";
        }
        var showDetails = detailText ? true : false;
        this._detailBtn.show(showDetails);
        if (!showDetails) {
            this.showDetails(false);
        }
    }
};
bobj.crv.ErrorDialog.setTitle = function (title) {
    this.title = title;
    if (this.layer) {
        this._promptDialogSetTitle(title || "");
    }
};
bobj.crv.ErrorDialog.setPromptType = function (promptType) {
    this.promptType = promptType;
    if (this.layer) {
        this._promptDialogSetPromptType(promptType);
    }
};
bobj.crv.ErrorDialog.show = function (isShow, closeCB) {
    if (typeof isShow == "undefined") {
        isShow = true;
    }
    if (isShow) {
        this._closeCB = closeCB;
        if (!this.layer) {
            targetApp(this.getHTML());
            this.init();
        }
        this.layer.onkeyup = DialogBoxWidget_keypress;
        DialogBoxWidget_keypress = MochiKit.Base.noop;
        this._promptDialogShow(true);
    } else {
        if (this.layer) {
            this._closeCB = null;
            this._promptDialogShow(false);
        }
    }
};
bobj.crv.ErrorDialog.showDetails = function (isShow) {
    if (typeof isShow == "undefined") {
        isShow = true;
    }
    if (this._detailRow && this._detailBtn) {
        if (isShow) {
            this._detailRow.style.display = "";
            this._detailBtn.changeText(L_bobj_crv_hideDetails);
        } else {
            this._detailRow.style.display = "none";
            this._detailBtn.changeText(L_bobj_crv_showDetails);
        }
    }
};
bobj.crv.ErrorDialog._onDetailBtnClick = function () {
    if (this._detailRow) {
        this.showDetails(this._detailRow.style.display == "none");
    }
};
bobj.crv.ErrorDialog._onClose = function () {
    if (this._closeCB) {
        this._closeCB();
        this._closeCB = null;
    }
    DialogBoxWidget_keypress = this.layer.onkeyup;
    this.layer.onkeyup = null;
};
bobj.crv.newReportProcessingUI = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        delay: 3000,
        message: L_bobj_crv_ReportProcessingMessage
    }, kwArgs);
    var d = document.createElement("div");
    d.style.visibility = "hidden";
    d.innerHTML = kwArgs.message;
    var newMsg = d.innerHTML;
    d = null;
    var o = newWaitDialogBoxWidget(kwArgs.id, 0, 0, "", true, bobj.crv.ReportProcessingUI.cancelCB, true, newMsg);
    o.widgetType = "ReportProcessingUI";
    o.delay = kwArgs.delay;
    MochiKit.Base.update(o, bobj.crv.ReportProcessingUI);
    return o;
};
bobj.crv.reportProcessingDialog = null;
bobj.crv.timerID = null;
bobj.crv.ReportProcessingUI.cancelCB = function () {
    bobj.crv.reportProcessingDialog.cancelled = true;
    if (bobj.crv.reportProcessingDialog.deferred !== null) {
        bobj.crv.reportProcessingDialog.deferred.cancel();
    }
    bobj.crv.reportProcessingDialog.cancelShow();
};
bobj.crv.ReportProcessingUI.wasCancelled = function () {
    return bobj.crv.reportProcessingDialog.cancelled;
};
bobj.crv.ReportProcessingUI.delayedShow = function (showCancel) {
    if (bobj.crv.reportProcessingDialog !== null) {
        bobj.crv.reportProcessingDialog.cancelShow();
    }
    if (!this.layer) {
        targetApp(this.getHTML());
        this.init();
    }
    this.cancelled = false;
    this.deferred = null;
    this.setShowCancel(showCancel, showCancel ? this.cancelCB : null);
    bobj.crv.reportProcessingDialog = this;
    bobj.crv.timerID = setTimeout("bobj.crv._showReportProcessingDialog ()", bobj.crv.reportProcessingDialog.delay);
};
bobj.crv.ReportProcessingUI.cancelShow = function () {
    if (bobj.crv.timerID) {
        clearTimeout(bobj.crv.timerID);
    }
    if (bobj.crv.reportProcessingDialog) {
        bobj.crv.reportProcessingDialog.show(false);
    }
    bobj.crv.reportProcessingDialog = null;
    bobj.crv.timerID = null;
};
bobj.crv.ReportProcessingUI.setDeferred = function (deferred) {
    bobj.crv.reportProcessingDialog.deferred = deferred;
    if (bobj.crv.reportProcessingDialog.wasCancelled() === true) {
        deferred.cancel();
    }
};
bobj.crv._showReportProcessingDialog = function () {
    if (bobj.crv.reportProcessingDialog && bobj.crv.reportProcessingDialog.delay !== 0) {
        bobj.crv.logger.info("ShowReportProcessingDialog");
        bobj.crv.reportProcessingDialog.show(true);
    }
};
if (typeof (bobj.crv.StackedPanel) == "undefined") {
    bobj.crv.StackedPanel = {};
}
if (typeof (bobj.crv.StackedTab) == "undefined") {
    bobj.crv.StackedTab = {};
}
bobj.crv.newStackedPanel = function (kwArgs) {
    var mb = MochiKit.Base;
    var UPDATE = mb.update;
    var BIND = mb.bind;
    kwArgs = UPDATE({id: bobj.uniqueId(), width: null, height: null, isAnimated: true}, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "StackedPanel";
    bobj.fillIn(o, kwArgs);
    o._tabs = [];
    o._initWidget = o.init;
    o._resizeWidget = o.resize;
    UPDATE(o, bobj.crv.StackedPanel);
    o._onTabCollapse = BIND(o._onTabCollapse, o);
    o._onTabExpand = BIND(o._onTabExpand, o);
    return o;
};
bobj.crv.StackedPanel.init = function () {
    this._initWidget();
    var tabs = this._tabs;
    var index = this._numTabsWritten;
    while (index < tabs.length) {
        append(this.layer, tabs[index].getHTML(), document);
        index++;
    }
    for (var i = 0, len = tabs.length; i < len; ++i) {
        tabs[i].init();
    }
};
bobj.crv.StackedPanel.getHTML = function () {
    var DIV = bobj.html.DIV;
    var layerStyle = {overflow: "auto", position: "relative"};
    if (this.height) {
        layerStyle.height = bobj.unitValue(this.height);
    }
    if (this.width) {
        layerStyle.width = bobj.unitValue(this.width);
    }
    return DIV({id: this.id, style: layerStyle, tabIndex: "-1"}, this._getTabsHTML());
};
bobj.crv.StackedPanel._getTabsHTML = function () {
    var tabsHTML = "";
    var tabs = this._tabs;
    var tabsLen = tabs.length;
    for (var i = 0; i < tabsLen; ++i) {
        tabsHTML += tabs[i].getHTML();
    }
    this._numTabsWritten = tabsLen;
    return tabsHTML;
};
bobj.crv.StackedPanel.addTab = function (tab) {
    if (tab) {
        tab.collapseCB = this._onTabCollapse;
        tab.expandCB = this._onTabExpand;
        this._tabs.push(tab);
        if (this.layer) {
            append(this.layer, tab.getHTML());
            tab.init();
        }
    }
};
bobj.crv.StackedPanel.getNumTabs = function () {
    return this._tabs.length;
};
bobj.crv.StackedPanel.getTab = function (index) {
    return this._tabs[index];
};
bobj.crv.StackedPanel.removeTab = function (index) {
    if (index >= 0 && index < this._tabs.length) {
        var tab = this._tabs[index];
        this._tabs.splice(index, 1);
        delete _widgets[this._tabs.widx];
        if (tab.layer) {
            tab.layer.parentNode.removeChild(tab.layer);
        }
    }
};
bobj.crv.StackedPanel.resize = function (w, h) {
    var excludeMargins = !_saf;
    bobj.setOuterSize(this.layer, w, h, excludeMargins);
    var tabs = this._tabs;
    var tabsLen = tabs.length;
    if (tabsLen) {
        var tabWidth = this.layer.clientWidth;
        tabs[0].resize(tabWidth);
        if (tabWidth != this.layer.clientWidth) {
            tabWidth = this.layer.clientWidth;
            tabs[0].resize(tabWidth);
        }
        for (var i = 1; i < tabsLen; ++i) {
            tabs[i].resize(tabWidth);
        }
    }
};
bobj.crv.StackedPanel._onTabCollapse = function (tab) {
    this.resize();
};
bobj.crv.StackedPanel._onTabExpand = function (tab) {
    this.resize();
};
bobj.crv.newStackedTab = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({
        id: bobj.uniqueId(),
        label: "",
        width: 300,
        height: null,
        isAnimated: true,
        expandCB: null,
        openAdvCB: null,
        selectCB: null,
        collapseCB: null,
        expandImgPos: "right"
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "StackedTab";
    bobj.fillIn(o, kwArgs);
    o._content = null;
    o._leftIcons = [];
    o._rightIcons = [];
    o._IMG_WIDTH = 16;
    o._IMG_HEIGHT = 16;
    o._ICON_WIDTH = 20;
    o._initWidget = o.init;
    o._resizeWidget = o.resize;
    UPDATE(o, bobj.crv.StackedTab);
    return o;
};
bobj.crv.StackedTab.init = function () {
    var CONNECT = MochiKit.Signal.connect;
    this._initWidget();
    if (this._content) {
        this._content.init();
    }
    this._labelCtn = document.getElementById(this.id + "_labelCtn");
    this._textCtn = document.getElementById(this.id + "_textCtn");
    this._expandCtn = document.getElementById(this.id + "_expandCtn");
    this._expandImg = document.getElementById(this.id + "_expand");
    this._contentCtn = document.getElementById(this.id + "_contentCtn");
    if (this.openAdvCB) {
        CONNECT(this._labelCtn, "ondblclick", this.openAdvCB);
    }
    if (this.selectCB) {
        CONNECT(this._labelCtn, "onclick", this.selectCB);
    }
    this.setMinMaxIconToolTip();
};
bobj.crv.StackedTab.getHTML = function () {
    var DIV = bobj.html.DIV;
    var ctnStyle = {width: this.width + "px", overflow: "hidden"};
    var labelCtnAtt = {id: this.id + "_labelCtn", "class": "stackedTabLabel crvnoselect thumbtxt "};
    var expandCtnAtt = {
        id: this.id + "_expandCtn",
        onclick: "bobj.crv.StackedTab._onExpandClick('" + this.id + "')",
        "class": "stackedTabIconCtn",
        style: {cursor: "pointer"}
    };
    if (this.expandImgPos === "left") {
        expandCtnAtt.style.left = "0px";
    } else {
        expandCtnAtt.style.right = "-1px";
    }
    var contentHTML = this._content ? this._content.getHTML() : "";
    var imgW = this._IMG_WIDTH;
    var imgH = this._IMG_HEIGHT;
    var html = DIV({
        id: this.id,
        style: ctnStyle
    }, DIV(labelCtnAtt, DIV(expandCtnAtt, imgOffset(bobj.crvUri("images/param_panel.gif"), imgW, imgH, imgW, 16, this.id + "_expand")), DIV({
        "class": "stackedTabText",
        style: this._getTextCtnStyle(),
        id: this.id + "_textCtn"
    }, this.label), this._getIconsHtml(this._leftIcons, true) + this._getIconsHtml(this._rightIcons, false)), DIV({id: this.id + "_contentCtn"}, contentHTML));
    return html;
};
bobj.crv.StackedTab.setMinMaxIconToolTip = function () {
    var rightIcons = this._rightIcons;
    for (var i = 0, len = rightIcons.length; i < len; i++) {
        var iconID = rightIcons[i].id;
        var icontooltip = rightIcons[i].tooltip;
        if (iconID.indexOf("_icnInfo") >= 0) {
            var icon = getLayer(iconID);
            this._setIconTooltip(icon, icontooltip);
        }
    }
};
bobj.crv.StackedTab._setIconTooltip = function (icon, tooltip) {
    if (icon !== null && tooltip !== null) {
        bobj.crv.Tooltip.setElementTooltip(icon, tooltip);
    }
};
bobj.crv.StackedTab._getIconsHtml = function (icons, isLeftAligned) {
    var DIV = bobj.html.DIV;
    var iconsHtml = "";
    for (var i = 0, len = icons.length; i < len; ++i) {
        var icon = icons[i];
        var isInfoIcon = (icon.id.indexOf("_icnInfo") >= 0) ? true : false;
        iconsHtml += DIV({
            id: icon.id,
            "class": "stackedTabIconCtn",
            style: this._getIconCtnStyle(icon, isLeftAligned, i)
        }, imgOffset(icon.url, this._IMG_WIDTH, this._IMG_HEIGHT, icon.dx, icon.dy, null, null, (isInfoIcon ? null : icon.tooltip)));
    }
    return iconsHtml;
};
bobj.crv.StackedTab._countVisibleIcons = function (list) {
    var filteredList = MochiKit.Base.filter(function (icon) {
        return icon.isVisible;
    }, list);
    return filteredList.length;
};
bobj.crv.StackedTab._getIconCtnStyle = function (icon, isLeftAligned, index) {
    var list = isLeftAligned ? this._leftIcons : this._rightIcons;
    var xPos = this._countVisibleIcons(bobj.slice(list, 0, index)) * this._ICON_WIDTH - 1;
    var style = {display: icon.isVisible ? "block" : "none"};
    if (isLeftAligned) {
        if (this.expandImgPos === "left") {
            xPos += this._ICON_WIDTH;
        }
        style.left = xPos + "px";
    } else {
        if (this.expandImgPos === "right") {
            xPos += this._ICON_WIDTH;
        }
        style.right = xPos + "px";
    }
    return style;
};
bobj.crv.StackedTab._getTextCtnStyle = function (useCamelCase) {
    var lMarg = 0;
    var rMarg = 0;
    var iconW = this._ICON_WIDTH;
    if (this.expandImgPos === "left") {
        lMarg += iconW;
    } else {
        rMarg += iconW;
    }
    lMarg += this._countVisibleIcons(this._leftIcons) * iconW;
    rMarg += this._countVisibleIcons(this._rightIcons) * iconW;
    lMarg = Math.max(lMarg, 2);
    rMarg = Math.max(rMarg, 2);
    var textStyle = {};
    if (useCamelCase) {
        textStyle.marginLeft = lMarg + "px";
        textStyle.marginRight = rMarg + "px";
    } else {
        textStyle["margin-left"] = lMarg + "px";
        textStyle["margin-right"] = rMarg + "px";
    }
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        textStyle.width = "100%";
    }
    return textStyle;
};
bobj.crv.StackedTab.addIcon = function (url, dx, dy, tooltip, isLeftAligned, isVisible, id) {
    id = id || bobj.uniqueId();
    var iconInfo = {url: url, dx: dx, dy: dy, tooltip: tooltip, isVisible: isVisible, id: id};
    if (isLeftAligned) {
        this._leftIcons.push(iconInfo);
    } else {
        this._rightIcons.push(iconInfo);
    }
    return id;
};
bobj.crv.StackedTab._findIcon = function (id) {
    var list = this._leftIcons;
    do {
        for (var i = 0, len = list.length; i < len; ++i) {
            var icon = list[i];
            if (icon.id == id) {
                return icon;
            }
        }
        list = (list === this._leftIcons) ? this._rightIcons : null;
    } while (list);
    return null;
};
bobj.crv.StackedTab.showIcon = function (id) {
    var icon = this._findIcon(id);
    if (icon) {
        icon.isVisible = true;
        var dom = document.getElementById(id);
        if (dom) {
            var needPaint = dom.style.display != "block";
            dom.style.display = "block";
            if (needPaint) {
                this._paintLabel();
            }
        }
    }
};
bobj.crv.StackedTab.isIconShowing = function (id) {
    var icon = this._findIcon(id);
    if (icon) {
        return icon.isVisible;
    }
    return false;
};
bobj.crv.StackedTab.hideIcon = function (id) {
    var icon = this._findIcon(id);
    if (icon) {
        icon.isVisible = false;
        var dom = document.getElementById(id);
        if (dom) {
            var needPaint = dom.style.display != "none";
            dom.style.display = "none";
            if (needPaint) {
                this._paintLabel();
            }
        }
    }
};
bobj.crv.StackedTab.setIconTooltip = function (id, tooltip) {
    var icon = this._findIcon(id);
    if (icon) {
        icon.tooltip = tooltip;
        var dom = document.getElementById(id);
        if (dom) {
            dom.title = tooltip;
        }
    }
};
bobj.crv.StackedTab._paintLabel = function () {
    var list = this._leftIcons;
    do {
        for (var i = 0, len = list.length; i < len; ++i) {
            var icon = list[i];
            var dom = document.getElementById(icon.id);
            if (dom) {
                MochiKit.Base.update(dom.style, this._getIconCtnStyle(icon, list === this._leftIcons, i));
            }
        }
        list = (list === this._leftIcons) ? this._rightIcons : null;
    } while (list);
    MochiKit.Base.update(this._textCtn.style, this._getTextCtnStyle(true));
};
bobj.crv.StackedTab.resize = function (w) {
    if (this._labelCtn) {
        var excludeMargins = !_saf;
        bobj.setOuterSize(this._labelCtn, w, excludeMargins);
    }
    if (this._content) {
        this._content.resize(w);
    }
    bobj.setOuterSize(this.layer, w);
};
bobj.crv.StackedTab.setContent = function (widget) {
    this._content = widget;
};
bobj.crv.StackedTab.getContent = function () {
    return this._content;
};
bobj.crv.StackedTab.expand = function () {
    if (!this.isExpanded()) {
        changeOffset(this._expandImg, 16, 16);
        var cb = MochiKit.Base.partial(this.expandCB || MochiKit.Base.noop, this);
        if (this.isAnimated) {
            var options = {duration: 0.2, afterFinish: cb};
            if (MochiKit.Base.isIE()) {
                options.restoreAfterFinish = false;
                options.scaleContent = true;
            }
            MochiKit.Visual.blindDown(this._contentCtn, options);
            this.resize();
        } else {
            this._contentCtn.style.display = "";
            this.resize();
            cb();
        }
    }
};
bobj.crv.StackedTab.isExpanded = function () {
    return this._contentCtn.style.display != "none";
};
bobj.crv.StackedTab.collapse = function () {
    changeOffset(this._expandImg, 0, 16);
    var cb = MochiKit.Base.partial(this.collapseCB || MochiKit.Base.noop, this);
    if (this.isAnimated) {
        MochiKit.Visual.blindUp(this._contentCtn, {duration: 0.2, afterFinish: cb, scaleContent: true});
    } else {
        this._contentCtn.style.display = "none";
        cb();
    }
};
bobj.crv.StackedTab._onExpandClick = function (id) {
    var o = getWidgetFromID(id);
    if (o.isExpanded()) {
        o.collapse();
    } else {
        o.expand();
    }
};
bobj.crv.StackedTab._onMouseOver = function (id) {
    var o = getWidgetFromID(id);
    MochiKit.DOM.addElementClass(o._labelCtn, "stackedTabLabelHover");
};
bobj.crv.StackedTab._onMouseOut = function (id) {
    var o = getWidgetFromID(id);
    MochiKit.DOM.removeElementClass(o._labelCtn, "stackedTabLabelHover");
};
if (!MochiKit.Visual.Scale.prototype._crvSetDimensions) {
    MochiKit.Visual.Scale.prototype._crvSetDimensions = MochiKit.Visual.Scale.prototype.setDimensions;
    MochiKit.Visual.Scale.prototype.setDimensions = function (height, width) {
        height = Math.round(height) || 1;
        width = Math.round(width) || 1;
        MochiKit.Visual.Scale.prototype._crvSetDimensions.call(this, height, width);
    };
}
bobj.crv.Tooltip = {
    show: function (tipHtml, x, y, options) {
        options = MochiKit.Base.update({delay: 0.5, duration: 0.5, aspect: 2, wrapThreshold: 200}, options);
        this._options = options;
        this._tipHtml = tipHtml;
        this._x = x;
        this._y = y;
        if (!this._layer) {
            this._createLayer();
            this._delayedShow = MochiKit.Base.bind(this._delayedShow, this);
            this._delayedHide = MochiKit.Base.bind(this._delayedHide, this);
        }
        clearTimeout(this._timeoutId);
        this._timeoutId = setTimeout(this._delayedShow, options.delay * 1000);
    }, _delayedShow: function () {
        if (this._effect) {
            this._effect.cancel();
        }
        var style = this._layer.style;
        if (!this._options._fastShow) {
            if (bobj.isString(this._tipHtml)) {
                this._layer.firstChild.innerHTML = this._tipHtml;
            }
            this._resize();
            bobj.placeElement(this._layer, this._x, this._y, false, false);
        }
        style.visibility = "visible";
        this._effect = MochiKit.Visual.appear(this._layer, {duration: this._options.duration});
    }, hide: function (options) {
        if (this._layer) {
            this._options = MochiKit.Base.update(this._options, options);
            clearTimeout(this._timeoutId);
            this._timeoutId = setTimeout(this._delayedHide, this._options.delay * 1000);
        }
    }, _delayedHide: function () {
        if (this._effect) {
            this._effect.cancel();
        }
        var layer = this._layer;
        this._effect = MochiKit.Visual.fade(layer, {
            duration: this._options.duration, afterFinish: function () {
                layer.style.visibility = "hidden";
            }, afterFinishInternal: null
        });
    }, _elementConnections: {}, setElementTooltip: function (elt, tipHtml, options) {
        var CONNECT = MochiKit.Signal.connect;
        if (elt) {
            if (elt.bobj_crv_tooltip_id) {
                this.removeElementTooltip(elt);
            } else {
                elt.bobj_crv_tooltip_id = bobj.uniqueId();
            }
            var idents = [];
            this._elementConnections[elt.bobj_crv_tooltip_id] = idents;
            var over = function (e) {
                var p = e.mouse().page;
                bobj.crv.Tooltip.show(tipHtml, p.x, p.y, options);
            };
            var out = function (e) {
                bobj.crv.Tooltip.hide(options);
            };
            idents.push(CONNECT(elt, "onmouseover", over));
            idents.push(CONNECT(elt, "onmouseout", out));
        }
    }, removeElementTooltip: function (elt) {
        if (elt && elt.bobj_crv_tooltip_id) {
            var idents = this._elementConnections[elt.bobj_crv_tooltip_id];
            if (idents) {
                for (var i = 0, len = idents.length; i < len; ++i) {
                    MochiKit.Signal.disconnect(idents[i]);
                }
                delete this._elementConnections[elt.bobj_crv_tooltip_id];
            }
        }
    }, _createLayer: function () {
        var CONNECT = MochiKit.Signal.connect;
        var DIV = MochiKit.DOM.DIV;
        this._layer = DIV({
            "class": "crvTooltip",
            style: "visibility:hidden, position:absolute; display:block; top:0px; left:0px"
        }, DIV(null, "&nbsp;"));
        MochiKit.DOM.setOpacity(this._layer, 0);
        document.body.appendChild(this._layer);
        var over = function (e) {
            if (bobj.crv.Tooltip._effect) {
                bobj.crv.Tooltip.show(null, null, null, MochiKit.Base.update({_fastShow: true}, bobj.crv.Tooltip._options));
            }
        };
        var out = function (e) {
            bobj.crv.Tooltip.hide(bobj.crv.Tooltip._options);
        };
        CONNECT(this._layer, "onmouseover", over);
        CONNECT(this._layer, "onmouseout", out);
    }, _resize: function () {
        var layer = this._layer;
        var layerStyle = layer.style;
        var content = layer.firstChild;
        var aspect = this._options.aspect;
        var wrapThreshold = this._options.wrapThreshold;
        var oldLeft = layerStyle.left;
        layerStyle.visibility = "hidden";
        layerStyle.left = "-" + wrapThreshold + "px";
        layerStyle.width = null;
        layerStyle.height = null;
        if (content.offsetWidth > wrapThreshold) {
            var paddingY = parseInt(MochiKit.Style.computedStyle(layer, "padding-top"), 10) || 0;
            paddingY += parseInt(MochiKit.Style.computedStyle(layer, "padding-bottom"), 10) || 0;
            var paddingX = parseInt(MochiKit.Style.computedStyle(layer, "padding-left"), 10) || 0;
            paddingX += parseInt(MochiKit.Style.computedStyle(layer, "padding-right"), 10) || 0;
            layerStyle.width = "1px";
            layerStyle.width = (content.offsetWidth + paddingX) + "px";
            content.innerHTML += "";
            var contentArea = content.offsetWidth * content.offsetHeight;
            var height = Math.ceil(Math.sqrt(contentArea / aspect));
            var width = height * aspect;
            layerStyle.height = height + paddingY + "px";
            layerStyle.width = width + "px";
            while (content.offsetWidth > layer.clientWidth || content.offsetHeight > layer.clientHeight) {
                height += 5;
                width = height * aspect;
                layerStyle.height = height + "px";
                layerStyle.width = width + "px";
            }
        }
        layerStyle.left = oldLeft || null;
    }
};
if (typeof bobj.crv.params == "undefined") {
    bobj.crv.params = {};
    bobj.crv.params.DataTypes = {
        DATE: "d",
        DATE_TIME: "dt",
        TIME: "t",
        STRING: "s",
        NUMBER: "n",
        CURRENCY: "c",
        BOOLEAN: "b"
    };
    bobj.crv.params.RangeBoundTypes = {UNBOUNDED: 0, EXCLUSIVE: 1, INCLUSIVE: 2};
    bobj.crv.params.DefaultDisplayTypes = {Description: 0, DescriptionAndValue: 1};
    bobj.crv.params.CompareResults = {TOO_BIG: 1, TOO_SMALL: -1, EQUAL: 0};
}
bobj.crv.params.Parameter = function (paramInfo) {
    var PARAMS = bobj.crv.params;
    var displayTypes = PARAMS.DefaultDisplayTypes;
    MochiKit.Base.update(this, {
        paramName: null,
        reportName: null,
        description: null,
        valueDataType: null,
        value: null,
        modifiedValue: null,
        defaultValues: null,
        defaultDisplayType: displayTypes.DescriptionAndValue,
        maxValue: null,
        minValue: null,
        allowCustomValue: true,
        allowDiscreteValue: true,
        allowMultiValue: false,
        allowNullValue: false,
        allowRangeValue: false,
        editMask: null,
        isOptionalPrompt: false,
        isEditable: true,
        isHidden: false,
        isDataFetching: false,
        attributes: null
    }, paramInfo);
    this.valueCounter = new PARAMS.ValueCounter(this.value, this.valueDataType);
};
bobj.crv.params.Parameter.prototype = {
    getTitle: function () {
        return (this.description || this.paramName);
    }, hasLOV: function () {
        return (this.defaultValues && this.defaultValues.length);
    }, isPassword: function () {
        return (this.editMask !== null && this.editMask.toLowerCase() == "password");
    }, getValue: function () {
        this._initModifiedValue();
        return this.modifiedValue;
    }, removeValueAt: function (index) {
        this._initModifiedValue();
        var value = this.modifiedValue[index];
        this.modifiedValue.splice(index, 1);
        this.valueCounter.reduceCount(value);
    }, setValue: function (i, newValue) {
        this._initModifiedValue();
        if (arguments.length == 1 && bobj.isArray(arguments[0])) {
            var value = arguments[0];
            this.modifiedValue = value;
            this.valueCounter.resetValue(value);
        } else {
            if (arguments.length == 2) {
                var oldValue = this.modifiedValue[i];
                this.modifiedValue[i] = newValue;
                this.valueCounter.reduceCount(oldValue);
                this.valueCounter.addCount(newValue);
            }
        }
    }, clearValue: function () {
        this._initModifiedValue();
        this.modifiedValue = [];
    }, commitValue: function () {
        this._initModifiedValue();
        this.value = this.modifiedValue.slice(0);
    }, _initModifiedValue: function () {
        if (!this.modifiedValue) {
            if (bobj.isArray(this.value)) {
                this.modifiedValue = this.value.slice(0);
            } else {
                this.modifiedValue = [];
            }
        }
    }, addDuplicateValuesCB: function (hasDuplicateCB, hasNoDuplicateCB) {
        this.valueCounter.addCallBacks(hasDuplicateCB, hasNoDuplicateCB);
    }, isDCP: function () {
        if (this.attributes != null) {
            if (this.attributes["IsDCP"] === true) {
                return true;
            }
        }
        return false;
    }
};
bobj.crv.params.Validator = function () {
};
bobj.crv.params.Validator.ValueStatus = {
    OK: 0,
    ERROR: 1,
    VALUE_MISSING: 2,
    VALUE_INVALID_TYPE: 3,
    VALUE_TOO_LONG: 4,
    VALUE_TOO_SHORT: 5,
    VALUE_TOO_BIG: 6,
    VALUE_TOO_SMALL: 7,
    VALUE_DUPLICATE: 8
};
bobj.crv.params.Validator.getInstance = function () {
    if (!bobj.crv.params.Validator.__instance) {
        bobj.crv.params.Validator.__instance = new bobj.crv.params.Validator();
    }
    return bobj.crv.params.Validator.__instance;
};
bobj.crv.params.Validator.prototype = {
    validateParameter: function (param) {
        var PARAMS = bobj.crv.params;
        if (!param) {
            return null;
        }
        var Status = PARAMS.Validator.ValueStatus;
        if (!bobj.isArray(param.value) || !param.value.length) {
            return {isValid: false, reason: Status.VALUE_MISSING};
        }
        var isValid = true;
        var statusList = [];
        for (var i = 0, len = param.values.length; i < len; ++i) {
            var status = PARAMS.validateValue(param, i);
            statusList.push(status);
            isValid = isValid && (status === ValueStatus.OK);
        }
        return {isValid: isValid, statusList: statusList};
    }, validateValue: function (param, value) {
        var Status = bobj.crv.params.Validator.ValueStatus;
        if (!param || !bobj.isArray(param.value) || (value === undefined)) {
            return Status.ERROR;
        }
        var validatorFunc = this._getTypeValidatorFunc(param.valueDataType);
        if (!validatorFunc) {
            return Status.ERROR;
        }
        var actualValue = bobj.crv.params.getValue(value);
        return validatorFunc(param, actualValue);
    }, _getTypeValidatorFunc: function (type) {
        var Type = bobj.crv.params.DataTypes;
        switch (type) {
            case Type.STRING:
                return this._validateString;
            case Type.NUMBER:
            case Type.CURRENCY:
                return this._validateNumber;
            case Type.DATE:
            case Type.TIME:
            case Type.DATE_TIME:
                return this._validateDateTime;
            case Type.BOOLEAN:
                return this._validateBoolean;
            default:
                return null;
        }
    }, _validateString: function (param, value) {
        var Status = bobj.crv.params.Validator.ValueStatus;
        if (!bobj.isString(value)) {
            return Status.VALUE_INVALID_TYPE;
        }
        var maxValue = param.maxValue;
        var minValue = param.minValue;
        if (bobj.isString(maxValue) && regNumber.test(maxValue)) {
            maxValue = parseFloat(maxValue);
        }
        if (bobj.isString(minValue) && regNumber.test(minValue)) {
            minValue = parseFloat(minValue);
        }
        if (bobj.isNumber(maxValue) && value.length > maxValue) {
            return Status.VALUE_TOO_LONG;
        }
        if (bobj.isNumber(minValue) && value.length < minValue) {
            return Status.VALUE_TOO_SHORT;
        }
        return Status.OK;
    }, _validateNumber: function (param, value) {
        var Status = bobj.crv.params.Validator.ValueStatus;
        var regNumber = /^(\+|-)?(\d+(\.\d+)?|\.\d+)$/;
        if (bobj.isString(value) && regNumber.test(value)) {
            value = parseFloat(value);
        } else {
            if (!bobj.isNumber(value)) {
                return Status.VALUE_INVALID_TYPE;
            }
        }
        var maxValue = param.maxValue;
        var minValue = param.minValue;
        if (bobj.isString(maxValue) && regNumber.test(maxValue)) {
            maxValue = parseFloat(maxValue);
        }
        if (bobj.isString(minValue) && regNumber.test(minValue)) {
            minValue = parseFloat(minValue);
        }
        if (maxValue !== null && value > maxValue) {
            return Status.VALUE_TOO_BIG;
        } else {
            if (minValue !== null && value < minValue) {
                return Status.VALUE_TOO_SMALL;
            } else {
                return Status.OK;
            }
        }
    }, _validateDateTime: function (param, value) {
        var Result = bobj.crv.params.CompareResults;
        var Status = bobj.crv.params.Validator.ValueStatus;
        if (bobj.isObject(value)) {
            var isNumber = function (sel) {
                return bobj.isNumber(value[sel]);
            };
            if (MochiKit.Iter.every(["d", "m", "y", "h", "min", "s", "ms"], isNumber)) {
                var compareFunc = bobj.crv.params.getDateCompareFunc(param.valueDataType);
                if (param.minValue && compareFunc(param.minValue, value) == Result.TOO_BIG) {
                    return Status.VALUE_TOO_SMALL;
                } else {
                    if (param.maxValue && compareFunc(param.maxValue, value) == Result.TOO_SMALL) {
                        return Status.VALUE_TOO_BIG;
                    } else {
                        return Status.OK;
                    }
                }
            }
        }
        return Status.VALUE_INVALID_TYPE;
    }, _validateBoolean: function (param, value) {
        return bobj.crv.params.Validator.ValueStatus.OK;
    }
};
bobj.crv.params.dateToJson = function (date) {
    return {
        d: date.getDate(),
        m: date.getMonth(),
        y: date.getFullYear(),
        h: date.getHours(),
        min: date.getMinutes(),
        s: date.getSeconds(),
        ms: date.getMilliseconds()
    };
};
bobj.crv.params.getDateCompareFunc = function (type) {
    var PARAMS = bobj.crv.params;
    var Type = PARAMS.DataTypes;
    switch (type) {
        case Type.DATE:
            return PARAMS.compareDate;
        case Type.TIME:
            return PARAMS.compareTime;
        case Type.DATE_TIME:
            return PARAMS.compareDateTime;
        default:
            return null;
    }
};
bobj.crv.params.compareDateTime = function (dateTimeA, dateTimeB) {
    var PARAMS = bobj.crv.params;
    var Result = PARAMS.CompareResults;
    var dateResult = PARAMS.compareDate(dateTimeA, dateTimeB);
    var timeResult = PARAMS.compareTime(dateTimeA, dateTimeB);
    if (dateResult == Result.EQUAL && timeResult == Result.EQUAL) {
        return Result.EQUAL;
    }
    if (dateResult != Result.EQUAL) {
        return dateResult;
    } else {
        return timeResult;
    }
};
bobj.crv.params.compareDate = function (dateTimeA, dateTimeB) {
    var Result = bobj.crv.params.CompareResults;
    if (dateTimeA.d == dateTimeB.d && dateTimeA.m == dateTimeB.m && dateTimeA.y == dateTimeB.y) {
        return Result.EQUAL;
    }
    if (dateTimeA.y > dateTimeB.y) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.y < dateTimeB.y) {
            return Result.TOO_SMALL;
        }
    }
    if (dateTimeA.m > dateTimeB.m) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.m < dateTimeB.m) {
            return Result.TOO_SMALL;
        }
    }
    if (dateTimeA.d > dateTimeB.d) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.d < dateTimeB.d) {
            return Result.TOO_SMALL;
        }
    }
};
bobj.crv.params.compareTime = function (dateTimeA, dateTimeB) {
    var Result = bobj.crv.params.CompareResults;
    if (dateTimeA.h == dateTimeB.h && dateTimeA.min == dateTimeB.min && dateTimeA.s == dateTimeB.s && dateTimeA.ms == dateTimeB.ms) {
        return Result.EQUAL;
    }
    if (dateTimeA.h > dateTimeB.h) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.h < dateTimeB.h) {
            return Result.TOO_SMALL;
        }
    }
    if (dateTimeA.min > dateTimeB.min) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.min < dateTimeB.min) {
            return Result.TOO_SMALL;
        }
    }
    if (dateTimeA.s > dateTimeB.s) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.s < dateTimeB.s) {
            return Result.TOO_SMALL;
        }
    }
    if (dateTimeA.ms > dateTimeB.ms) {
        return Result.TOO_BIG;
    } else {
        if (dateTimeA.ms < dateTimeB.ms) {
            return Result.TOO_SMALL;
        }
    }
};
bobj.crv.params.jsonToDate = function (json) {
    var date = new Date();
    if (json) {
        date.setFullYear(json.y || 0, json.m || 0, json.d || 1);
        date.setHours(json.h || 0);
        date.setMinutes(json.min || 0);
        date.setSeconds(json.s || 0);
        date.setMilliseconds(json.ms || 0);
    }
    return date;
};
bobj.crv.params.getValue = function (pair) {
    if (pair === undefined || pair === null || pair.value === undefined) {
        return pair;
    }
    return pair.value;
};
bobj.crv.params.getDescription = function (pair) {
    if (pair === undefined || pair === null || pair.desc === undefined) {
        return null;
    }
    return pair.desc;
};
bobj.crv.params.ValueCounter = function (initialValue, valueDataType) {
    this.values = {};
    this.valueDataType = valueDataType;
    this.valueHasDupCB = null;
    this.valueNoDupCB = null;
    this.resetValue(initialValue);
};
bobj.crv.params.ValueCounter.prototype = {
    addCallBacks: function (valueHasDupCB, valueNoDupCB) {
        this.valueHasDupCB = valueHasDupCB;
        this.valueNoDupCB = valueNoDupCB;
    }, addCount: function (value) {
        var value = bobj.crv.params.getValue(value);
        if (value !== null && value !== undefined && value.beginValue === undefined) {
            var hashValue = bobj.getValueHashCode(this.valueDataType, value);
            if (this.values[hashValue] !== null && this.values[hashValue] !== undefined) {
                this.values[hashValue] += 1;
                if (this.valueHasDupCB && this.values[hashValue] > 1) {
                    this.valueHasDupCB(value);
                }
            } else {
                this.values[hashValue] = 1;
            }
        }
    }, reduceCount: function (value) {
        var value = bobj.crv.params.getValue(value);
        if (value !== null && value !== undefined && value.beginValue === undefined) {
            var hashValue = bobj.getValueHashCode(this.valueDataType, value);
            this.values[hashValue] -= 1;
            if (this.valueNoDupCB && this.values[hashValue] == 1) {
                this.valueNoDupCB(value);
            }
        }
    }, resetValue: function (value) {
        if (this.valueNoDupCB) {
            this.valueNoDupCB();
        }
        for (var k in this.values) {
            if (this.values[k] > 0) {
                this.values[k] = 0;
            }
        }
        if (bobj.isArray(value)) {
            for (var i = 0, len = value.length; i < len; i++) {
                this.addCount(value[i]);
            }
        } else {
            this.addCount(value);
        }
    }
};
bobj.crv.params.ParameterController = function (panel, viewerCtrl, paramOpts) {
    this._panel = panel;
    this._viewerCtrl = viewerCtrl;
    this._paramOpts = paramOpts;
    this._paramList = null;
    this._selected = null;
    this._selectedValueIdx = null;
    this._disablePanel = false;
    var delClickCB = MochiKit.Base.bind(this._onClickTbDeleteButton, this);
    var applyClickCB = MochiKit.Base.bind(this._onClickTbApplyButton, this);
    this._panel.setToolbarCallBacks(delClickCB, applyClickCB);
};
bobj.crv.params.ParameterController.prototype = {
    setParameters: function (paramList) {
        var Type = bobj.crv.params.DataTypes;
        var map = MochiKit.Base.map;
        var bind = MochiKit.Base.bind;
        this._deleteWidgets();
        this._paramList = paramList;
        this._selected = null;
        this._selectedValueIdx = null;
        for (var i = 0; i < paramList.length; ++i) {
            var param = paramList[i];
            var hasDuplicateValueCB = bind(this._onParamHasDupValue, this, param);
            var hasNoDuplicateValueCB = bind(this._onParamHasNoDupValue, this, param);
            param.addDuplicateValuesCB(hasDuplicateValueCB, hasNoDuplicateValueCB);
            var getDisplayText = bind(this._getDisplayText, this, param);
            var getDefaultValue = bind(this._getDefaultValue, this, param.valueDataType, param.defaultDisplayType);
            var panelCanChangeValues = this._canPanelChangeValues(param);
            var minMaxText = this._getMinMaxText(param.valueDataType, param.minValue, param.maxValue);
            var openAdvDialogCB = MochiKit.Base.bind(this._onClickTbAdvButton, this);
            var isReadOnly = !param.isEditable;
            var paramValue = param.getValue();
            var currentView = this._viewerCtrl.getCurrentView();
            if (currentView && !currentView.isMainReport()) {
                this._disablePanel = true;
                isReadOnly = true;
                panelCanChangeValues = false;
            }
            if (param.allowNullValue == true && paramValue != null && paramValue.length == 1 && paramValue[0] == null) {
                paramValue = [];
            }
            var paramWidget = bobj.crv.params.newParameterUI({
                values: map(getDisplayText, paramValue),
                canChangeOnPanel: panelCanChangeValues,
                allowCustom: param.allowCustomValue,
                canAddValues: param.allowMultiValue && panelCanChangeValues,
                isReadOnlyParam: isReadOnly,
                isPassword: param.isPassword(),
                valueRequired: (!param.isOptionalPrompt && !param.allowNullValue),
                defaultValues: map(getDefaultValue, param.defaultValues || []),
                hasRowButtons: param.allowCustomValue && panelCanChangeValues && (param.valueDataType === Type.DATE || param.valueDataType === Type.DATE_TIME),
                rowButtonsUrl: bobj.crvUri("images/calendar.gif"),
                openAdvDialogCB: openAdvDialogCB,
                maxNumParameterDefaultValues: this._paramOpts.maxNumParameterDefaultValues,
                tooltip: param.getTitle()
            });
            this._observeParamWidget(paramWidget);
            this._panel.addParameter({
                paramUI: paramWidget,
                label: param.getTitle(),
                isDataFetching: param.isDataFetching,
                isReadOnly: !param.isEditable,
                isDirty: false,
                selectCB: bind(this._onSelectValue, this, paramWidget, 0),
                openAdvCB: isReadOnly ? null : openAdvDialogCB,
                minMaxTooltip: minMaxText
            });
        }
        this._panel.resize();
    }, getParameters: function () {
        return this._paramList;
    }, updateParameter: function (paramName, paramValue) {
        if (paramName) {
            var index = -1;
            for (var i = 0; i < this._paramList.length; ++i) {
                if (this._paramList[i].paramName === paramName) {
                    this._paramList[i].setValue(paramValue);
                    index = i;
                    break;
                }
            }
            if (index != -1) {
                var paramUI = this._panel.getParameter(index);
                var getDisplayText = MochiKit.Base.bind(this._getDisplayText, this, this._paramList[index]);
                if (this._paramList[i].allowNullValue && paramValue.length == 1 && paramValue[0] == null) {
                    paramValue = [];
                }
                paramUI.setValues(MochiKit.Base.map(getDisplayText, paramValue));
                if (!paramUI.valueRequired && !paramUI.canAddValues) {
                    if (paramValue.length > 0) {
                        paramUI.showRowCreater(false);
                    } else {
                        paramUI.showRowCreater(true);
                    }
                }
                this._panel.setDirty(index, paramUI.isDirty());
            }
        }
    }, getFocusAdvButtonCB: function (paramName) {
        return MochiKit.Base.bind(this._focusAdvButton, this, paramName);
    }, _canPanelChangeValues: function (param) {
        return param && param.isEditable && !param.allowRangeValue && !param.editMask && !param.isDCP();
    }, _deleteWidgets: function () {
        var paramUI = this._panel.getParameter(0);
        while (paramUI) {
            delete _widgets[paramUI.widx];
            this._panel.removeParameter(0);
            paramUI = this._panel.getParameter(0);
        }
    }, _compareCustomDateObject: function (valA, valB) {
        if (valA.y != valB.y) {
            return false;
        }
        if (valA.m != valB.m) {
            return false;
        }
        if (valA.d != valB.d) {
            return false;
        }
        if (valA.h != valB.h) {
            return false;
        }
        if (valA.min != valB.min) {
            return false;
        }
        if (valA.s != valB.s) {
            return false;
        }
        if (valA.ms != valB.ms) {
            return false;
        }
        return true;
    }, _hasMinBound: function (type, minValue) {
        if (minValue == null) {
            return false;
        }
        var Type = bobj.crv.params.DataTypes;
        switch (type) {
            case Type.STRING:
                if (minValue == 0) {
                    return false;
                }
                return true;
            case Type.DATE:
            case Type.DATE_TIME:
                absoluteMin = {y: 1753, m: 0, d: 1, h: 0, min: 0, s: 0, ms: 0};
                return !this._compareCustomDateObject(absoluteMin, minValue);
            case Type.TIME:
                absoluteMin = {y: 1899, m: 11, d: 30, h: 0, min: 0, s: 0, ms: 0};
                return !this._compareCustomDateObject(absoluteMin, minValue);
            case Type.NUMBER:
            case Type.CURRENCY:
                if (minValue == -3.40282346638529e+38) {
                    return false;
                }
                return true;
        }
        return false;
    }, _hasMaxBound: function (type, maxValue) {
        if (maxValue == null) {
            return false;
        }
        var Type = bobj.crv.params.DataTypes;
        switch (type) {
            case Type.STRING:
                if (maxValue == 65534) {
                    return false;
                }
                return true;
            case Type.DATE:
                absoluteMax = {y: 9999, m: 11, d: 12, h: 0, min: 0, s: 0, ms: 0};
                return !this._compareCustomDateObject(absoluteMax, maxValue);
            case Type.TIME:
                absoluteMax = {y: 1899, m: 11, d: 30, h: 23, min: 59, s: 59, ms: 0};
                return !this._compareCustomDateObject(absoluteMax, maxValue);
            case Type.DATE_TIME:
                absoluteMax = {y: 9999, m: 11, d: 12, h: 23, min: 59, s: 59, ms: 0};
                return !this._compareCustomDateObject(absoluteMax, maxValue);
            case Type.NUMBER:
            case Type.CURRENCY:
                if (maxValue == 3.40282346638529e+38) {
                    return false;
                }
                return true;
        }
        return false;
    }, _getMinMaxText: function (type, minValue, maxValue) {
        var Type = bobj.crv.params.DataTypes;
        var maxValueDisplay, minValueDisplay;
        if (type == Type.STRING) {
            minValueDisplay = this._getValueText(Type.NUMBER, minValue);
            maxValueDisplay = this._getValueText(Type.NUMBER, maxValue);
        } else {
            minValueDisplay = this._getValueText(type, minValue);
            maxValueDisplay = this._getValueText(type, maxValue);
        }
        if (type == Type.BOOLEAN || (minValue == null && maxValue == null)) {
            return null;
        }
        var displayType, returnString;
        switch (type) {
            case Type.DATE:
                displayType = L_bobj_crv_Date;
                break;
            case Type.TIME:
                displayType = L_bobj_crv_Time;
                break;
            case Type.DATE_TIME:
                displayType = L_bobj_crv_DateTime;
                break;
            case Type.NUMBER:
                displayType = L_bobj_crv_Number;
                break;
            case Type.CURRENCY:
                displayType = L_bobj_crv_Number;
                break;
        }
        var hasMinBound = this._hasMinBound(type, minValue);
        var hasMaxBound = this._hasMaxBound(type, maxValue);
        switch (type) {
            case Type.STRING:
                if (hasMinBound && hasMaxBound) {
                    returnString = L_bobj_crv_ParamsStringMinAndMaxTooltip.replace("%1", minValueDisplay);
                    returnString = returnString.replace("%2", maxValueDisplay);
                } else {
                    if (hasMinBound) {
                        returnString = L_bobj_crv_ParamsStringMinOrMaxTooltip.replace("%1", L_bobj_crv_Minimum);
                        returnString = returnString.replace("%2", minValueDisplay);
                    } else {
                        if (hasMaxBound) {
                            returnString = L_bobj_crv_ParamsStringMinOrMaxTooltip.replace("%1", L_bobj_crv_Maximum);
                            returnString = returnString.replace("%2", maxValueDisplay);
                        }
                    }
                }
                break;
            default:
                if (hasMinBound && hasMaxBound) {
                    returnString = L_bobj_crv_ParamsMinAndMaxTooltip.replace("%1", displayType);
                    returnString = returnString.replace("%2", minValueDisplay);
                    returnString = returnString.replace("%3", maxValueDisplay);
                } else {
                    if (hasMinBound) {
                        returnString = L_bobj_crv_ParamsMinTooltip.replace("%1", displayType);
                        returnString = returnString.replace("%2", minValueDisplay);
                    } else {
                        if (hasMaxBound) {
                            returnString = L_bobj_crv_ParamsMaxTooltip.replace("%1", displayType);
                            returnString = returnString.replace("%2", maxValueDisplay);
                        }
                    }
                }
        }
        return returnString;
    }, _getDefaultValue: function (type, displayType, valueObj) {
        var displayTypes = bobj.crv.params.DefaultDisplayTypes;
        var valueText = this._getValueText(type, valueObj.value);
        var valueDesc;
        switch (displayType) {
            case displayTypes.Description:
                if (valueObj.desc != null && valueObj.desc.length > 0) {
                    valueDesc = valueObj.desc;
                } else {
                    valueDesc = valueText;
                }
                break;
            case displayTypes.DescriptionAndValue:
                valueDesc = valueText;
                if (valueObj.desc != null && valueObj.desc.length > 0) {
                    valueDesc += " - " + valueObj.desc;
                }
                break;
        }
        return valueDesc;
    }, _getValueTextFromDefValueDesc: function (param, desc) {
        if (param.defaultValues && bobj.isArray(param.defaultValues)) {
            for (var i = 0; i < param.defaultValues.length; i++) {
                var defValueDesc = this._getDefaultValue(param.valueDataType, param.defaultDisplayType, param.defaultValues[i]);
                if (defValueDesc == desc) {
                    return this._getValueText(param.valueDataType, param.defaultValues[i].value);
                }
            }
        }
        return null;
    }, _getValueText: function (type, value) {
        if (value === undefined) {
            return undefined;
        }
        value = bobj.crv.params.getValue(value);
        var Type = bobj.crv.params.DataTypes;
        switch (type) {
            case Type.DATE:
                return this._getDateTimeText(value, this._paramOpts.dateFormat);
            case Type.TIME:
                return this._getDateTimeText(value, this._paramOpts.timeFormat);
            case Type.DATE_TIME:
                return this._getDateTimeText(value, this._paramOpts.dateTimeFormat);
            case Type.NUMBER:
            case Type.CURRENCY:
                return this._getNumberText(value, this._paramOpts.numberFormat);
            case Type.BOOLEAN:
                return this._getBooleanText(value, this._paramOpts.booleanFormat);
            case Type.STRING:
            default:
                return "" + value;
        }
    }, _getBooleanText: function (value, booleanFormat) {
        return booleanFormat["" + value];
    }, _getNumberText: function (value, format) {
        var dcSeperator = format.decimalSeperator;
        var gpSeperator = format.groupSeperator;
        var valueSplitted = ("" + value).split(".");
        var leftVal, rightVal, formattedValue;
        var numberSign = null;
        leftVal = valueSplitted[0];
        if (leftVal.length > 0 && leftVal.slice(0, 1) == "-" || leftVal.slice(0, 1) == "+") {
            numberSign = leftVal.slice(0, 1);
            leftVal = leftVal.slice(1, leftVal.length);
        }
        rightVal = (valueSplitted.length == 2) ? valueSplitted[1] : null;
        formattedLeftVal = null;
        if (leftVal.length <= 3) {
            formattedLeftVal = leftVal;
        } else {
            var gp = null;
            var sliceIndex = null;
            while (leftVal.length > 0) {
                sliceIndex = (leftVal.length > 3) ? leftVal.length - 3 : 0;
                gp = leftVal.slice(sliceIndex, leftVal.length);
                leftVal = leftVal.slice(0, sliceIndex);
                formattedLeftVal = (formattedLeftVal == null) ? gp : gp + gpSeperator + formattedLeftVal;
            }
        }
        formattedValue = (rightVal != null) ? formattedLeftVal + dcSeperator + rightVal : formattedLeftVal;
        formattedValue = (numberSign != null) ? numberSign + formattedValue : formattedValue;
        return formattedValue;
    }, _getDateTimeText: function (value, format) {
        var date = bobj.crv.params.jsonToDate(value);
        if (date) {
            return bobj.external.date.formatDate(date, format);
        }
        return "";
    }, _getValueTextFromDefaultValue: function (param, value) {
        var desc = bobj.crv.params.getDescription(value);
        if (desc !== null) {
            return this._getDefaultValue(param.valueDataType, param.defaultDisplayType, value);
        }
        value = bobj.crv.params.getValue(value);
        if (bobj.isArray(param.defaultValues)) {
            var hashValue = bobj.getValueHashCode(param.valueDataType, value);
            for (var i = 0; i < param.defaultValues.length; i++) {
                if (hashValue == bobj.getValueHashCode(param.valueDataType, param.defaultValues[i].value)) {
                    return this._getDefaultValue(param.valueDataType, param.defaultDisplayType, param.defaultValues[i]);
                }
            }
        }
        return null;
    }, _getDisplayText: function (param, value) {
        if (value === undefined) {
            return undefined;
        }
        if (value.lowerBoundType !== undefined || value.upperBoundType !== undefined) {
            return this._getRangeDisplayText(param, value);
        }
        var valueText = this._getValueTextFromDefaultValue(param, value);
        if (valueText == null) {
            valueText = this._getValueText(param.valueDataType, value);
        }
        return valueText;
    }, _getRangeDisplayText: function (param, value) {
        var valString = "";
        if (value.lowerBoundType !== undefined || value.upperBoundType !== undefined) {
            var lbType = parseInt(value.lowerBoundType, 10);
            var ubType = parseInt(value.upperBoundType, 10);
            var lowerBound = "(";
            var upperBound = ")";
            if (lbType == bobj.crv.params.RangeBoundTypes.INCLUSIVE) {
                lowerBound = "[";
            }
            if (ubType == bobj.crv.params.RangeBoundTypes.INCLUSIVE) {
                upperBound = "]";
            }
            var beginValue = "";
            var endValue = "";
            if (lbType != bobj.crv.params.RangeBoundTypes.UNBOUNDED) {
                beginValue = this._getDisplayText(param, value.beginValue);
            }
            if (ubType != bobj.crv.params.RangeBoundTypes.UNBOUNDED) {
                endValue = this._getDisplayText(param, value.endValue);
            }
            valString = lowerBound + " " + beginValue;
            valString += " .. ";
            valString += endValue + " " + upperBound;
        } else {
            valString = this._getDisplayText(param, value);
        }
        return valString;
    }, _getParamValue: function (type, text) {
        if (type === undefined) {
            return undefined;
        }
        var Type = bobj.crv.params.DataTypes;
        switch (type) {
            case Type.DATE:
                return this._getDateTimeParamValue(text, this._paramOpts.dateFormat);
            case Type.TIME:
                return this._getDateTimeParamValue(text, this._paramOpts.timeFormat);
            case Type.DATE_TIME:
                return this._getDateTimeParamValue(text, this._paramOpts.dateTimeFormat);
            case Type.NUMBER:
            case Type.CURRENCY:
                return this._getNumberParamValue(text, this._paramOpts.numberFormat);
            case Type.BOOLEAN:
                return this._getBooleanParamValue(text, this._paramOpts.booleanFormat);
            case Type.STRING:
            default:
                return text;
        }
    }, _getBooleanParamValue: function (text, booleanFormat) {
        if (text != null && text.length != 0) {
            return booleanFormat["true"] == text;
        } else {
            return null;
        }
    }, _getNumberParamValue: function (text, format) {
        if (text == null) {
            return null;
        }
        var value = "";
        if (/[ \f\n\r\t\v\u00A0\u2028\u2029]/.test(format.groupSeperator)) {
            value = text.replace(/[ \f\n\r\t\v\u00A0\u2028\u2029]/g, "");
        } else {
            var gpRE = new RegExp("\\" + format.groupSeperator, "g");
            value = text.replace(gpRE, "");
        }
        return value.replace(format.decimalSeperator, ".");
    }, _getDateTimeParamValue: function (text, format) {
        var date = bobj.external.date.getDateFromFormat(text, format);
        if (date) {
            return bobj.crv.params.dateToJson(date);
        }
        return text;
    }, _observeParamWidget: function (widget) {
        if (widget) {
            var bind = MochiKit.Base.bind;
            widget.changeValueCB = bind(this._onChangeValue, this, widget);
            widget.addValueCB = bind(this._onAddValue, this, widget);
            widget.selectValueCB = bind(this._onSelectValue, this, widget);
            widget.enterPressCB = bind(this._onEnterPress, this, widget);
            widget.clickRowButtonCB = bind(this._onClickRowButton, this, widget);
        }
    }, _onParamHasDupValue: function (param, value) {
        var widget = this._findWidget(param);
        var displayText = this._getDisplayText(param, value);
        if (widget) {
            for (var i = 0; i < widget.getNumValues(); i++) {
                var widgetValue = widget.getValueAt(i);
                if (displayText == widgetValue) {
                    widget.setWarning(i, {
                        code: bobj.crv.params.Validator.ValueStatus.VALUE_DUPLICATE,
                        message: L_bobj_crv_ParamsDuplicateValue
                    });
                }
            }
        }
    }, _onParamHasNoDupValue: function (param, value) {
        var widget = this._findWidget(param);
        var displayText = this._getDisplayText(param, value);
        var duplicateCode = bobj.crv.params.Validator.ValueStatus.VALUE_DUPLICATE;
        if (widget) {
            for (var i = 0; i < widget.getNumValues(); i++) {
                var widgetValue = widget.getValueAt(i);
                if ((arguments.length == 1 || displayText == widgetValue) && widget.getWarning(i) != null && widget.getWarning(i).code == duplicateCode) {
                    widget.setWarning(i, null);
                }
            }
        }
    }, _onChangeValue: function (widget, valueIdx, newValue) {
        if (this._disablePanel) {
            return;
        }
        widget.setWarning(valueIdx, null);
        var isDirty = widget.isDirty();
        this._panel.setDirty(this._panel.getIndex(widget), isDirty);
        this._updateToolbar();
    }, _onAddValue: function (widget, newValue) {
        if (this._disablePanel) {
            return;
        }
        this._updateToolbar();
        this._panel.setDirty(this._panel.getIndex(widget), widget.isDirty());
    }, _onSelectValue: function (widget, valueIdx) {
        var lastWidget = this._selected;
        var lastValueIdx = this._selectedValueIdx;
        this._select(widget, valueIdx);
        if (lastWidget && bobj.isNumber(lastValueIdx)) {
            this._checkAndSetValue(lastWidget, lastValueIdx);
        }
    }, _onEnterPress: function (widget, valueIdx) {
        this._applyValues();
    }, _onClickRowButton: function (widget, valueIdx, x, y) {
        this._setConnectedToCalendar(true);
        var calendar = bobj.crv.Calendar.getInstance();
        var param = this._findParam(widget);
        var format = this._getDateTimeFormat(param.valueDataType);
        var date = bobj.external.date.getDateFromFormat(widget.getValueAt(widget.getSelectedIndex()), format);
        if (date) {
            calendar.setDate(date);
        }
        calendar.setShowTime(param.valueDataType === bobj.crv.params.DataTypes.DATE_TIME);
        calendar.show(true, x, y);
    }, _onClickCalendarOKButton: function (date) {
        this._setConnectedToCalendar(false);
        if (date && this._selected) {
            var param = this._findParam(this._selected);
            var valueIdx = this._selected.getSelectedIndex();
            var format = this._getDateTimeFormat(param.valueDataType);
            var strValue = bobj.external.date.formatDate(date, format);
            this._selected.setValueAt(valueIdx, strValue);
            var isDirty = this._selected.isDirty();
            this._selected.setWarning(valueIdx, null);
            this._panel.setDirty(this._panel.getIndex(this._selected), isDirty);
            this._updateToolbar();
        }
    }, _onClickCalendarCancelButton: function () {
        this._setConnectedToCalendar(false);
    }, _onHideCalendar: function () {
        this._setConnectedToCalendar(false);
    }, _onClickTbApplyButton: function () {
        this._applyValues();
    }, _onClickTbAdvButton: function () {
        if (this._selected) {
            this._viewerCtrl.showAdvancedParamDialog(this);
        }
    }, _onClickTbDeleteButton: function () {
        if (this._selected) {
            var index = this._selected.getSelectedIndex();
            this._selected.deleteValue(index);
            this._panel.setDirty(this._panel.getIndex(this._selected), this._selected.isDirty());
            this._updateToolbar();
            var param = this._findParam(this._selected);
            param.removeValueAt(index);
            index = Math.min(index, this._selected.getNumValues() - 1);
            this._selected.setSelected(index);
            if ((param.isOptionalPrompt || param.allowNullValue) && param.getValue().length == 0) {
                this._selected.showRowCreater(true);
            }
        }
    }, _select: function (widget, valueIdx) {
        this._selectedValueIdx = valueIdx;
        if (this._selected !== widget) {
            if (this._selected) {
                this._selected.deselect();
            }
            this._selected = widget;
            this._panel.setSelected(this._panel.getIndex(widget), true);
            this._updateToolbar();
        }
        if (bobj.isNumber(valueIdx)) {
            this._selected.setSelected(valueIdx);
        }
    }, _applyValues: function () {
        this._checkAndSetValue(this._selected, this._selectedValueIdx);
        var numParams = this._paramList.length;
        var badParamIdx = -1;
        var badValueIdx = -1;
        var warning = null;
        var paramUI = null;
        for (var i = 0; (i < numParams) && !warning; ++i) {
            paramUI = this._panel.getParameter(i);
            var numValues = paramUI.getNumValues();
            for (var j = 0; (j < numValues) && !warning; ++j) {
                warning = paramUI.getWarning(j);
                if (warning) {
                    badParamIdx = i;
                    badValueIdx = j;
                }
            }
        }
        if (warning) {
            paramUI = this._panel.getParameter(badParamIdx);
            this._onSelectValue(paramUI, badValueIdx);
            var dlg = bobj.crv.ErrorDialog.getInstance();
            dlg.setText(warning.message, null);
            dlg.setTitle(L_bobj_crv_ParamsInvalidTitle);
            dlg.setPromptType(_promptDlgWarning);
            dlg.show(true, function () {
                paramUI.setSelected(badValueIdx);
            });
        } else {
            for (var i = 0, c = this._paramList.length; i < c; i++) {
                this._paramList[i].commitValue();
            }
            this._viewerCtrl.applyParams(this._paramList);
        }
    }, _findParam: function (widget) {
        return this._paramList[this._panel.getIndex(widget)];
    }, _findWidget: function (param) {
        for (var i = 0; i < this._paramList.length; i++) {
            if (this._paramList[i].paramName == param.paramName) {
                return this._panel.getParameter(i);
            }
        }
        return null;
    }, _updateToolbar: function () {
        if (this._disablePanel) {
            return;
        }
        if (this._selected) {
            var param = this._findParam(this._selected);
            this._panel.setDeleteButtonEnabled(this._canPanelChangeValues(param) && (((param.isOptionalPrompt || param.allowNullValue) && this._selected.getValues().length > 0) || (param.allowMultiValue && this._selected.getValues().length > 1)));
        } else {
            this._panel.setDeleteButtonEnabled(false);
        }
        var isPanelDirty = false;
        for (var i = 0, len = this._paramList.length; i < len; i++) {
            if (this._panel.isDirty(i)) {
                isPanelDirty = true;
                break;
            }
        }
        this._panel.setApplyButtonEnabled(isPanelDirty);
    }, _getDateTimeFormat: function (dataType) {
        var Type = bobj.crv.params.DataTypes;
        switch (dataType) {
            case Type.DATE:
                return this._paramOpts.dateFormat;
            case Type.TIME:
                return this._paramOpts.timeFormat;
            case Type.DATE_TIME:
                return this._paramOpts.dateTimeFormat;
            default:
                return null;
        }
    }, _setConnectedToCalendar: function (isConnected) {
        var op = isConnected ? MochiKit.Signal.connect : MochiKit.Signal.disconnect;
        var calendar = bobj.crv.Calendar.getInstance();
        op(calendar, calendar.Signals.OK_CLICK, this, "_onClickCalendarOKButton");
        op(calendar, calendar.Signals.CANCEL_CLICK, this, "_onClickCalendarCancelButton");
        op(calendar, calendar.Signals.ON_HIDE, this, "_onHideCalendar");
    }, _checkAndSetValue: function (widget, valueIdx) {
        if (!widget.canChangeOnPanel) {
            return;
        }
        var parameter = this._findParam(widget);
        var valueText = widget.getValueAt(valueIdx);
        var defValue = this._getValueTextFromDefValueDesc(parameter, valueText);
        if (defValue != null) {
            valueText = defValue;
        }
        var paramValue = this._getParamValue(parameter.valueDataType, valueText);
        if (valueIdx == 0 && paramValue == null && parameter.getValue().length == 0) {
            if (parameter.allowNullValue) {
                parameter.setValue(0, null);
            }
            if (parameter.isOptionalPrompt || parameter.allowNullValue) {
                return;
            }
        }
        var Status = bobj.crv.params.Validator.ValueStatus;
        var code = Status.OK;
        var warningMsg = null;
        code = bobj.crv.params.Validator.getInstance().validateValue(parameter, paramValue);
        if (Status.OK === code) {
            var cText = this._getValueTextFromDefaultValue(parameter, paramValue);
            if (cText != null) {
                widget.setValueAt(valueIdx, cText);
            }
            widget.setWarning(valueIdx, null);
            parameter.setValue(valueIdx, paramValue);
        } else {
            warningMsg = this._getWarningText(parameter, code);
            widget.setWarning(valueIdx, {code: code, message: warningMsg});
        }
    }, _getWarningText: function (param, code) {
        var Type = bobj.crv.params.DataTypes;
        switch (param.valueDataType) {
            case Type.DATE:
            case Type.TIME:
            case Type.DATE_TIME:
                return this._getDateTimeWarning(param, code);
            case Type.STRING:
                return this._getStringWarning(param, code);
            case Type.NUMBER:
            case Type.CURRENCY:
                return this._getNumberWarning(param, code);
            default:
                return null;
        }
    }, _getDateTimeWarning: function (param, code) {
        var dataTypes = bobj.crv.params.DataTypes;
        var ValueStatus = bobj.crv.params.Validator.ValueStatus;
        var dateFormat = this._paramOpts.dateFormat;
        dateFormat = dateFormat.replace("yyyy", "%1");
        dateFormat = dateFormat.replace("M", "%2");
        dateFormat = dateFormat.replace("d", "%3");
        dateFormat = dateFormat.replace("%1", L_bobj_crv_ParamsYearToken);
        dateFormat = dateFormat.replace("%2", L_bobj_crv_ParamsMonthToken);
        dateFormat = dateFormat.replace("%3", L_bobj_crv_ParamsDayToken);
        if (code == ValueStatus.ERROR || code == ValueStatus.VALUE_INVALID_TYPE) {
            switch (param.valueDataType) {
                case dataTypes.DATE:
                    return L_bobj_crv_ParamsBadDate.replace("%1", dateFormat);
                case dataTypes.DATE_TIME:
                    return L_bobj_crv_ParamsBadDateTime.replace("%1", dateFormat);
                    break;
                case dataTypes.TIME:
                    return L_bobj_crv_ParamsBadTime;
                    break;
            }
        } else {
            if (code == ValueStatus.VALUE_TOO_BIG || code == ValueStatus.VALUE_TOO_SMALL) {
                return this._getMinMaxText(param.valueDataType, param.minValue, param.maxValue);
            }
        }
        return null;
    }, _getStringWarning: function (param, code) {
        var Status = bobj.crv.params.Validator.ValueStatus;
        if (Status.VALUE_TOO_LONG === code) {
            return L_bobj_crv_ParamsTooLong.replace("%1", param.maxValue);
        } else {
            if (Status.VALUE_TOO_SHORT === code) {
                return L_bobj_crv_ParamsTooShort.replace("%1", param.minValue);
            }
        }
        return null;
    }, _getNumberWarning: function (param, code) {
        var ValueStatus = bobj.crv.params.Validator.ValueStatus;
        var dataTypes = bobj.crv.params.DataTypes;
        switch (code) {
            case ValueStatus.ERROR:
            case ValueStatus.VALUE_INVALID_TYPE:
                if (param.valueDataType == dataTypes.NUMBER) {
                    return L_bobj_crv_ParamsBadNumber;
                } else {
                    if (param.valueDataType == dataTypes.CURRENCY) {
                        return L_bobj_crv_ParamsBadCurrency;
                    }
                }
            case ValueStatus.VALUE_TOO_BIG:
            case ValueStatus.VALUE_TOO_SMALL:
                return this._getMinMaxText(param.valueDataType, param.minValue, param.maxValue);
            default:
                return null;
        }
    }
};
if (typeof bobj.crv.params.ParameterUI == "undefined") {
    bobj.crv.params.ParameterUI = {};
    bobj.crv.params.ParameterValueRow = {};
    bobj.crv.params.ParamValueButton = {};
    bobj.crv.params.ParamRowCreator = {};
    bobj.crv.params.TextField = {};
    bobj.crv.params.TextCombo = {};
    bobj.crv.params.ScrollMenuWidget = {};
    bobj.crv.params.HelperRow = {};
}
bobj.crv.params.newParameterUI = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        canChangeOnPanel: false,
        allowCustom: false,
        canAddValues: false,
        isPassword: false,
        valueRequired: true,
        isReadOnlyParam: true,
        values: [],
        defaultValues: null,
        hasRowButtons: false,
        rowButtonsUrl: null,
        width: "200px",
        changeValueCB: null,
        addValueCB: null,
        selectValueCB: null,
        enterPressCB: null,
        clickRowButtonCB: null,
        openAdvDialogCB: null,
        maxNumParameterDefaultValues: 200,
        tooltip: null
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.params.ParameterUI);
    o._selectedRow = null;
    o._createMenu();
    o._rows = [];
    o._numRowsChanged = false;
    return o;
};
bobj.crv.params.ParameterUI._createMenu = function () {
    var dvLength = this.defaultValues.length;
    if (dvLength > 0) {
        var kwArgs = {originalValues: this.defaultValues};
        if (dvLength == this.maxNumParameterDefaultValues) {
            kwArgs.originalValues[this.maxNumParameterDefaultValues] = L_bobj_crv_ParamsMaxNumDefaultValues;
            MochiKit.Base.update(kwArgs, {
                openAdvDialogCB: this.openAdvDialogCB,
                maxNumParameterDefaultValues: this.maxNumParameterDefaultValues
            });
        }
        this._defaultValuesMenu = bobj.crv.params.newScrollMenuWidget(kwArgs);
    } else {
        this._defaultValuesMenu = null;
    }
};
bobj.crv.params.ParameterUI.init = function () {
    Widget_init.call(this);
    var rows = this._rows;
    for (var i = 0, len = rows.length; i < len; ++i) {
        rows[i].init();
    }
    if (this._rowCreator) {
        this._rowCreator.init();
    }
    if (this._helperRow) {
        this._helperRow.init();
    }
};
bobj.crv.params.ParameterUI.getHTML = function () {
    var rowsHtml = "";
    var values = this.values;
    var rows = this._rows;
    for (var i = 0, len = values.length; i < len; ++i) {
        rows.push(this._getRow(values[i], this._getBgColor(i)));
        rowsHtml += rows[i].getHTML();
    }
    var rowCreatorHtml = "";
    if (this._canAddRowCreater()) {
        this._rowCreator = this._getRowCreator();
        rowCreatorHtml = this._rowCreator.getHTML();
    }
    var helperRowHtml = "";
    if (this._canAddHelperRow()) {
        this._helperRow = bobj.crv.params.newHelperRow({message: L_bobj_crv_ParamsNoValue});
        helperRowHtml = this._helperRow.getHTML();
    }
    return bobj.html.DIV({
        id: this.id,
        style: {width: bobj.unitValue(this.width)}
    }, rowsHtml, helperRowHtml, rowCreatorHtml);
};
bobj.crv.params.ParameterUI._canAddRowCreater = function () {
    return (this.canAddValues || (!this.valueRequired && this.values.length === 0 && !this.isReadOnlyParam));
};
bobj.crv.params.ParameterUI._canAddHelperRow = function () {
    return (this.isReadOnlyParam && this.values.length === 0);
};
bobj.crv.params.ParameterUI._getRow = function (value, color) {
    var Colors = bobj.crv.params.BackgroundColor;
    var row = bobj.crv.params.newParameterValueRow({
        value: value,
        defaultValues: this.defaultValues,
        width: this.width,
        bgColor: color,
        isReadOnlyParam: this.isReadOnlyParam,
        canChangeOnPanel: this.canChangeOnPanel,
        allowCustom: this.allowCustom,
        isPassword: this.isPassword,
        hasButton: this.hasRowButtons,
        buttonUrl: this.rowButtonsUrl,
        openAdvDialogCB: this.openAdvDialogCB,
        defaultValuesMenu: this._defaultValuesMenu,
        tooltip: this.tooltip
    });
    var bind = MochiKit.Base.bind;
    row.changeCB = bind(this._onChangeValue, this, row);
    row.selectCB = bind(this._onSelectValue, this, row);
    row.enterCB = bind(this._onEnterValue, this, row);
    row.buttonClickCB = bind(this._onClickRowButton, this, row);
    return row;
};
bobj.crv.params.ParameterUI._addRow = function (value) {
    var row = this._getRow(value, this._getBgColor(this._rows.length));
    this._rows.push(row);
    this._numRowsChanged = true;
    if (this._rowCreator) {
        this._rowCreator.setBgColor(this._getBgColor(this._rows.length));
        insBefore2(this._rowCreator.layer, row.getHTML());
        row._valueWidget.setAlwaysDirty();
    } else {
        append(this.layer, row.getHTML());
    }
    row.init();
    row.setBgColor();
    return row;
};
bobj.crv.params.ParameterUI._onChangeValue = function (row) {
    if (this.changeValueCB) {
        this.changeValueCB(this._getRowIndex(row), row.getValue());
    }
};
bobj.crv.params.ParameterUI._onSelectValue = function (row) {
    if (this._selectedRow !== row) {
        this.deselect();
        this._selectedRow = row;
    }
    if (this.selectValueCB) {
        this.selectValueCB(this._getRowIndex(row));
    }
};
bobj.crv.params.ParameterUI._onEnterValue = function (row) {
    if (this.enterPressCB) {
        this.enterPressCB(this._getRowIndex(row));
    }
};
bobj.crv.params.ParameterUI._onClickRowButton = function (row, x, y) {
    if (this.clickRowButtonCB) {
        this.clickRowButtonCB(this._getRowIndex(row), x, y);
    }
};
bobj.crv.params.ParameterUI.showRowCreater = function (show) {
    if (!this._rowCreator && show) {
        this._rowCreator = this._getRowCreator();
        append(this.layer, this._rowCreator.getHTML());
        this._rowCreator.init();
    }
    if (this._rowCreator) {
        this._rowCreator.show(show);
    }
};
bobj.crv.params.ParameterUI.showHelperRow = function (show) {
    if (!this._helperRow && show) {
        this._helperRow = bobj.crv.params.newHelperRow({message: L_bobj_crv_ParamsNoValue});
        if (this._rowCreator) {
            insBefore2(this._rowCreator.layer, this._helperRow.getHTML());
        } else {
            append(this.layer, this._helperRow.getHTML());
        }
        this._helperRow.init();
    }
    if (this._helperRow) {
        this._helperRow.show(show);
    }
};
bobj.crv.params.ParameterUI._onCreateRow = function () {
    if ((!this.canChangeOnPanel) && (!this.isReadOnlyParam)) {
        this.selectValueCB(-1);
        this.openAdvDialogCB();
    } else {
        var val = "";
        if (!this.allowCustom && this.defaultValues.length > 0) {
            val = this.defaultValues[0];
        }
        var row = this._addRow(val);
        this.setSelected(this._rows.length - 1);
        this._onSelectValue(row);
        if (this.addValueCB) {
            this.addValueCB(row.getValue());
        }
        if (!this.canAddValues && !this.valueRequired) {
            this.showRowCreater(false);
        }
    }
};
bobj.crv.params.ParameterUI._getRowIndex = function (row) {
    if (row) {
        var rows = this._rows;
        for (var i = 0, len = rows.length; i < len; ++i) {
            if (rows[i] === row) {
                return i;
            }
        }
    }
    return -1;
};
bobj.crv.params.ParameterUI._getRowCreator = function () {
    var cb = MochiKit.Base.bind(this._onCreateRow, this);
    return bobj.crv.params.newParamRowCreator({activateCB: cb});
};
bobj.crv.params.ParameterUI._getBgColor = function (index) {
    var Colors = bobj.crv.params.BackgroundColor;
    var dirty = false;
    if (this._rows.length > index) {
        dirty = this._rows[index].isDirty();
    }
    if (dirty) {
        if (index % 2) {
            return Colors.dirtyAlternate;
        } else {
            return Colors.dirty;
        }
    } else {
        if (index % 2) {
            return Colors.alternate;
        } else {
            return Colors.standard;
        }
    }
    return Colors.standard;
};
bobj.crv.params.ParameterUI.isDirty = function () {
    if (this._numRowsChanged) {
        return true;
    }
    for (var i = 0, len = this._rows.length; i < len; ++i) {
        if (this._rows[i].isDirty()) {
            return true;
        }
    }
    return false;
};
bobj.crv.params.ParameterUI.getNumValues = function () {
    return this._rows.length;
};
bobj.crv.params.ParameterUI.getValueAt = function (index) {
    var row = this._rows[index];
    if (row) {
        return row.getValue();
    }
    return null;
};
bobj.crv.params.ParameterUI.getValues = function () {
    var values = [];
    for (var i = 0, len = this._rows.length; i < len; ++i) {
        values.push(this._rows[i].getValue());
    }
    return values;
};
bobj.crv.params.ParameterUI.getSelectedIndex = function () {
    return this._getRowIndex(this._selectedRow);
};
bobj.crv.params.ParameterUI.setValueAt = function (index, value) {
    var row = this._rows[index];
    if (row) {
        row.setValue(value);
    }
};
bobj.crv.params.ParameterUI.setValues = function (values) {
    if (!values) {
        return;
    }
    var valuesLen = values.length;
    var rowsLen = this._rows.length;
    for (var i = 0; i < valuesLen && i < rowsLen; ++i) {
        this._rows[i].setValue(values[i]);
    }
    if (rowsLen > valuesLen) {
        for (var i = rowsLen - 1; i >= valuesLen; --i) {
            this.deleteValue(i);
        }
    } else {
        if (valuesLen > rowsLen) {
            for (var i = rowsLen; i < valuesLen; ++i) {
                this._addRow(values[i]);
                this._rows[i]._valueWidget.setAlwaysDirty();
            }
        }
    }
};
bobj.crv.params.ParameterUI.setCleanValue = function (index, value) {
    var row = this._rows[index];
    if (row) {
        row.setCleanValue(value);
    }
};
bobj.crv.params.ParameterUI.setBgColor = function () {
    var rowsLen = this._rows.length;
    for (var i = 0; i < rowsLen; ++i) {
        this._rows[i].setBgColor(this._getBgColor(i));
    }
};
bobj.crv.params.ParameterUI.deleteValue = function (index) {
    if (index >= 0 && index < this._rows.length) {
        var row = this._rows[index];
        row.layer.parentNode.removeChild(row.layer);
        _widgets[row.widx] = null;
        this._rows.splice(index, 1);
        this._numRowsChanged = true;
        var rowsLen = this._rows.length;
        for (var i = index; i < rowsLen; ++i) {
            this._rows[i].setBgColor(this._getBgColor(i));
        }
        if (this._rowCreator) {
            this._rowCreator.setBgColor(this._getBgColor(rowsLen));
        }
    }
};
bobj.crv.params.ParameterUI.setWarning = function (index, warning) {
    var row = this._rows[index];
    if (row) {
        row.setWarning(warning);
    }
};
bobj.crv.params.ParameterUI.getWarning = function (index) {
    var row = this._rows[index];
    if (row) {
        return row.getWarning();
    }
};
bobj.crv.params.ParameterUI.setSelected = function (index) {
    var row = this._rows[index];
    if (row && this._selectedRow != row) {
        if (this._getRowIndex(this._selectedRow) != -1) {
            this.deselect();
        }
        this._selectedRow = row;
        row.select();
    }
};
bobj.crv.params.ParameterUI.deselect = function () {
    if (this._selectedRow) {
        this._selectedRow.deselect();
        this._selectedRow = null;
    }
};
bobj.crv.params.ParameterUI.resize = function (w) {
    if (w !== null) {
        this.width = w;
        if (this.layer) {
            bobj.setOuterSize(this.layer, w);
        }
    }
};
bobj.crv.params.BackgroundColor = {standard: 0, dirty: 1, alternate: 2, dirtyAlternate: 3};
bobj.crv.paramPanelIcon = bobj.crvUri("images/param_panel.gif");
bobj.crv.paramWarningIconYOffset = 0;
bobj.crv.paramAdvIconYOffset = 124;
bobj.crv.params.newParameterValueRow = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        value: "",
        defaultValues: null,
        bgColor: bobj.crv.params.BackgroundColor.standard,
        isReadOnlyParam: true,
        canChangeOnPanel: false,
        allowCustom: false,
        isPassword: false,
        hasButton: false,
        buttonUrl: null,
        changeCB: null,
        selectCB: null,
        enterCB: null,
        buttonClickCB: null,
        openAdvDialogCB: null,
        defaultValuesMenu: null,
        tooltip: null
    }, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "ParameterValueRow";
    o._prevValueString = kwArgs.value;
    o._warning = null;
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.params.ParameterValueRow);
    return o;
};
bobj.crv.params.ParameterValueRow.init = function () {
    Widget_init.call(this);
    this._valueWidget.init();
    if (this._button) {
        this._button.init();
    }
    this._valueCtn = getLayer(this.id + "_vc");
    this._rightCtn = getLayer(this.id + "_rc");
    this._icon = this._rightCtn.firstChild;
    this._btnCtn = getLayer(this.id + "_bc");
    this._valBtnCtn = getLayer(this.id + "_vab");
    this._advBtnCtn = getLayer(this.id + "_adv_ctn");
    if (this._advButton) {
        this._advButton.init();
    }
    if (MochiKit.Base.isIE()) {
        var marg = parseInt(MochiKit.Style.computedStyle(this._valueCtn, "margin-right"), 10);
        if (bobj.isNumber(marg)) {
            this._valueWidget.layer.style.marginRight = (-1 * marg) + "px";
        }
    }
    this.layer.onmousedown = MochiKit.Base.bind(this._onMouseDown, this);
};
bobj.crv.params.ParameterValueRow.getHTML = function () {
    if (!this._valueWidget) {
        this._valueWidget = this._getValueWidget();
    }
    if (this.hasButton && !this._button) {
        var clickCB = MochiKit.Base.bind(this._onButtonClick, this);
        this._button = bobj.crv.params.newParamValueButton({url: this.buttonUrl, clickCB: clickCB});
    }
    var DIV = bobj.html.DIV;
    var IMG = bobj.html.IMG;
    var cssClass = this._getBgColorClass(this.bgColor) + " iactParamRow";
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        cssClass += " " + "iactParamRowIE";
    }
    return DIV({
        id: this.id,
        "class": cssClass
    }, this.hasButton ? this._getValueAndButtonHTML() : this._getValueHTML(), DIV({
        id: this.id + "_rc",
        "class": "iactParamRight"
    }, imgOffset(bobj.crv.paramPanelIcon, 16, 16, 0, bobj.crv.paramWarningIconYOffset, this.id + "_icn", 'class="iactParamValueWarningIcon"', "", "display:none", ""), this._getAdvButtonHTML()));
};
bobj.crv.params.ParameterValueRow._getAdvButtonHTML = function () {
    this._advButton = bobj.crv.params.newParamValueButton({
        id: this.id + "_adv_icn",
        url: bobj.crv.paramPanelIcon,
        clickCB: this.openAdvDialogCB,
        tooltip: L_bobj_crv_ParamsAdvDlg,
        dx: 0,
        dy: bobj.crv.paramAdvIconYOffset
    });
    var DIV = bobj.html.DIV;
    return DIV({
        id: this.id + "_adv_ctn",
        style: {display: "none", position: "absolute", right: "0", top: "0", cursor: _hand}
    }, this._advButton.getHTML());
};
bobj.crv.params.ParameterValueRow._getValueHTML = function () {
    var DIV = bobj.html.DIV;
    var style = {};
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        style.position = "absolute";
        style.top = "0px";
        style.left = "0px";
    }
    return DIV({id: this.id + "_vc", "class": "iactParamValue", style: style}, this._valueWidget.getHTML());
};
bobj.crv.params.ParameterValueRow._getValueAndButtonHTML = function () {
    var style = {};
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        style.width = "100%";
    }
    var DIV = bobj.html.DIV;
    var html = DIV({
        id: this.id + "_vab",
        style: style,
        "class": "iactParamValueAndButton"
    }, this._getValueHTML(), DIV({
        id: this.id + "_bc",
        "class": "iactValueIcon",
        style: {position: "absolute", right: "0", top: "0", cursor: _hand}
    }, this._button.getHTML()));
    return html;
};
bobj.crv.params.ParameterValueRow._getValueWidget = function () {
    var showDefVals = this.defaultValuesMenu !== null && !this.isReadOnlyParam && this.canChangeOnPanel;
    var typeCons = showDefVals ? "newTextCombo" : "newTextField";
    var bind = MochiKit.Base.bind;
    var widget = bobj.crv.params[typeCons]({
        password: this.isPassword,
        cleanValue: this.value,
        editable: this.allowCustom && this.canChangeOnPanel,
        enterCB: bind(this._onEnterPress, this),
        keyUpCB: bind(this._onKeyUp, this),
        bgColor: this.bgColor,
        tooltip: this.tooltip
    });
    if (showDefVals) {
        widget.setMenu(this.defaultValuesMenu);
        widget.changeCB = bind(this._onChange, this);
    }
    return widget;
};
bobj.crv.params.ParameterValueRow.getValue = function () {
    if (this._valueWidget) {
        return this._valueWidget.getValue();
    }
    return this.value;
};
bobj.crv.params.ParameterValueRow.setValue = function (value) {
    if (this._valueWidget) {
        this._valueWidget.setValue(value);
    }
};
bobj.crv.params.ParameterValueRow.setCleanValue = function (value) {
    if (this._valueWidget) {
        this._valueWidget.setCleanValue(value);
    }
};
bobj.crv.params.ParameterValueRow.select = bobj.crv.params.ParameterValueRow.focus = function () {
    this._select(true);
    if (this._valueWidget.widgetType == "TextCombo") {
        this._valueWidget.text.focus();
    } else {
        this._valueWidget.focus();
    }
};
bobj.crv.params.ParameterValueRow.isSelected = function () {
    return this._isSelected;
};
bobj.crv.params.ParameterValueRow.deselect = function () {
    this._select(false);
};
bobj.crv.params.ParameterValueRow._select = function (select) {
    this._isSelected = select ? true : false;
    if (select) {
        var addClass = MochiKit.DOM.addElementClass;
        addClass(this._rightCtn, "iactParamRightSel");
        addClass(this.layer, "iactParamRowSel");
        if (this._valBtnCtn) {
            addClass(this._valBtnCtn, "iactParamValueAndButtonSel");
        } else {
            addClass(this._valueCtn, "iactParamValueSel");
        }
    } else {
        var removeClass = MochiKit.DOM.removeElementClass;
        removeClass(this._rightCtn, "iactParamRightSel");
        removeClass(this.layer, "iactParamRowSel");
        if (this._valBtnCtn) {
            removeClass(this._valBtnCtn, "iactParamValueAndButtonSel");
        } else {
            removeClass(this._valueCtn, "iactParamValueSel");
        }
    }
    if (this._valueWidget && this._valueWidget.setSelected) {
        this._valueWidget.setSelected(select);
    }
    this._showAdvButton(select);
};
bobj.crv.params.ParameterValueRow._showAdvButton = function (visible) {
    if (this.isReadOnlyParam) {
        return;
    }
    if (visible === true) {
        this._advBtnCtn.style.display = "";
    } else {
        this._advBtnCtn.style.display = "none";
    }
};
bobj.crv.params.ParameterValueRow.setWarning = function (warning) {
    if (warning) {
        bobj.crv.Tooltip.setElementTooltip(this._icon, warning.message);
        this._icon.style.display = "";
    } else {
        this._icon.style.display = "none";
    }
    this._warning = warning;
};
bobj.crv.params.ParameterValueRow.getWarning = function () {
    return this._warning;
};
bobj.crv.params.ParameterValueRow.resize = function (w, h) {
    bobj.setOuterSize(this.layer, w, h);
};
bobj.crv.params.ParameterValueRow.isDirty = function () {
    return this._valueWidget.isDirty();
};
bobj.crv.params.ParameterValueRow.setBgColor = function (color) {
    if (color !== this.bgColor) {
        if (this.layer) {
            var DOM = MochiKit.DOM;
            DOM.removeElementClass(this.layer, this._getBgColorClass(this.bgColor));
            DOM.addElementClass(this.layer, this._getBgColorClass(color));
        }
        this.bgColor = color;
        this._valueWidget.setBgColor(color);
    }
};
bobj.crv.params.ParameterValueRow._getBgColorClass = function (color) {
    var className = "iactParamRowBg";
    var Colors = bobj.crv.params.BackgroundColor;
    if (color === Colors.alternate || color === Colors.dirtyAlternate) {
        className += "Alt";
    }
    if (color === Colors.dirty || color === Colors.dirtyAlternate) {
        className += "Dirty";
    }
    return className;
};
bobj.crv.params.ParameterValueRow.deleteValue = function () {
    this._valueWidget.setValue("", true);
};
bobj.crv.params.ParameterValueRow._onSelect = function () {
    var wasSelected = this.isSelected();
    if (!wasSelected && this.selectCB) {
        this.selectCB();
    }
    this._select(true);
};
bobj.crv.params.ParameterValueRow._onKeyUp = function (e) {
    var event = new MochiKit.Signal.Event(src, e);
    var key = event.key().string;
    var newValueString = this._valueWidget.getValue();
    switch (key) {
        case"KEY_ESCAPE":
            this._valueWidget.setValue(this._valueWidget.cleanValue);
            if (this.changeCB) {
                this.changeCB();
            }
            this._onSelect();
            break;
        case"KEY_ARROW_LEFT":
        case"KEY_ARROW_RIGHT":
        case"KEY_HOME":
        case"KEY_END":
        case"KEY_TAB":
            this._onSelect();
            break;
        default:
            if (newValueString !== this._prevValueString) {
                this._onSelect();
                if (this.changeCB) {
                    this.changeCB();
                }
                this._prevValueString = newValueString;
            }
            break;
    }
};
bobj.crv.params.ParameterValueRow._onChange = function () {
    if (this.changeCB) {
        this.changeCB();
    }
};
bobj.crv.params.ParameterValueRow._onEnterPress = function () {
    if (this.isSelected() && this.enterCB) {
        this.enterCB();
    } else {
        this._onSelect();
    }
};
bobj.crv.params.ParameterValueRow._onMouseDown = function () {
    this._onSelect();
};
bobj.crv.params.ParameterValueRow._onButtonClick = function () {
    if (this.buttonClickCB) {
        var absPos = getPosScrolled(this._button.layer);
        var x = absPos.x + this._button.getWidth();
        var y = absPos.y + this._button.getHeight() + 1;
        this.buttonClickCB(x, y);
    }
};
bobj.crv.params.newParamValueButton = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        url: null,
        clickCB: null,
        tooltip: this.tooltip,
        dx: 0,
        dy: 0
    }, kwArgs);
    var o = newIconWidget(kwArgs.id, kwArgs.url, kwArgs.clickCB, null, kwArgs.tooltip, 14, 14, kwArgs.dx, kwArgs.dy, 0, 0);
    o.margin = 0;
    o.oldInit = o.init;
    MochiKit.Base.update(o, bobj.crv.params.ParamValueButton);
    return o;
};
bobj.crv.params.ParamValueButton.init = function () {
    this.oldInit();
    this.layer.onfocus = IconWidget_realOverCB;
    this.layer.onblur = IconWidget_realOutCB;
};
bobj.crv.params.ParamValueButton.getHTML = function () {
    var imgCode;
    var h = bobj.html;
    if (this.src) {
        imgCode = h.DIV({
            style: {
                overflow: "hidden",
                height: "16px",
                width: this.w + "px"
            }
        }, simpleImgOffset(this.src, this.w, this.h, this.dis ? this.disDx : this.dx, this.dis ? this.dixDy : this.dy, "IconImg_" + this.id, null, this.alt, "cursor:" + _hand), this.extraHTML);
    } else {
        imgCode = h.DIV({"class": "icontext", "style": {width: "1px", height: (this.h + this.border) + "px"}});
    }
    var divStyle = {margin: this.margin + "px", padding: "1px"};
    if (this.width) {
        divStyle.width = this.width + "px";
    }
    if (!this.disp) {
        divStyle.display = "none";
    }
    return h.DIV({
        style: divStyle,
        id: this.id,
        "class": this.nocheckClass
    }, (this.clickCB && _ie) ? lnk(imgCode, null, null, null, ' tabIndex="-1"') : imgCode);
};
bobj.crv.params.newParamRowCreator = function (kwArgs) {
    kwArgs = MochiKit.Base.update({id: bobj.uniqueId(), bgColor: null, activateCB: null}, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "ParamRowCreator";
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.params.ParamRowCreator);
    o._textField = o._createTextField();
    return o;
};
bobj.crv.params.ParamRowCreator.init = function () {
    Widget_init.call(this);
    this._textField.init();
    this.layer.onclick = MochiKit.Base.bind(this._onClick, this);
};
bobj.crv.params.ParamRowCreator.show = function (show) {
    if (show === false) {
        this.css.visibility = "hidden";
        this.css.display = "none";
    } else {
        this.css.visibility = "visible";
        this.css.display = "block";
    }
};
bobj.crv.params.ParamRowCreator.getHTML = function () {
    var DIV = bobj.html.DIV;
    cssClass = this._getBgColorClass() + " iactParamRow";
    ieCssClass = "iactParamRowIE";
    var valStyle = "";
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        cssClass += " " + ieCssClass;
        valStyle.width = "100%";
    }
    return DIV({id: this.id, "class": cssClass}, DIV({
        "class": "iactParamValue",
        style: valStyle
    }, this._textField.getHTML()), DIV({"class": "iactParamRight"}));
};
bobj.crv.params.ParamRowCreator._getBgColorClass = bobj.crv.params.ParameterValueRow._getBgColorClass;
bobj.crv.params.ParamRowCreator.setBgColor = function (color) {
    if (color !== this.bgColor) {
        if (this.layer) {
            MochiKit.DOM.removeElementClass(this.layer, this._getBgColorClass(this.bgColor));
            MochiKit.DOM.addElementClass(this.layer, this._getBgColorClass(color));
        }
        this.bgColor = color;
        this._textField.setBgColor(color);
    }
};
bobj.crv.params.ParamRowCreator._createTextField = function () {
    var text = bobj.crv.params.newTextField({
        cleanValue: L_bobj_crv_ParamsAddValue,
        editable: false,
        enterCB: MochiKit.Base.bind(this._onEnterPress, this)
    });
    return text;
};
bobj.crv.params.ParamRowCreator._onEnterPress = function () {
    if (this.activateCB) {
        this.activateCB();
    }
};
bobj.crv.params.ParamRowCreator._onClick = function () {
    if (this.activateCB) {
        this.activateCB();
    }
};
bobj.crv.params.ParamRowCreator.resize = function (w, h) {
    bobj.setOuterSize(this.layer, w, h);
};
bobj.crv.params.newTextField = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        cleanValue: "",
        width: "100%",
        maxChar: null,
        tooltip: null,
        disabled: false,
        editable: true,
        password: false,
        focusCB: null,
        blurCB: null,
        changeCB: null,
        keyUpCB: null,
        enterCB: null,
        bgColor: bobj.crv.params.BackgroundColor.standard,
        alwaysDirty: false
    }, kwArgs);
    var o = newTextFieldWidget(kwArgs.id, kwArgs.changeCB, kwArgs.maxChar, kwArgs.keyUpCB, kwArgs.enterCB, true, kwArgs.tooltip, null, kwArgs.focusCB, kwArgs.blurCB);
    o.widgetType = "TextField";
    bobj.fillIn(o, kwArgs);
    o.disabled = kwArgs.disabled;
    o.width = kwArgs.width;
    MochiKit.Base.update(o, bobj.crv.params.TextField);
    if (kwArgs.cleanValue) {
        o.setValue(kwArgs.cleanValue);
    }
    return o;
};
bobj.crv.params.TextField.setAlwaysDirty = function () {
    this.alwaysDirty = true;
};
bobj.crv.params.TextField.getHTML = function () {
    var style = {width: bobj.unitValue(this.width)};
    var isIE = MochiKit.Base.isIE();
    var className = this._getBgColorClass(this.bgColor) + " iactTextField";
    if (isIE && bobj.isQuirksMode()) {
        className += "IE";
    }
    var attributes = {
        type: this.password ? "password" : "text",
        name: this.id,
        id: this.id,
        maxLength: this.maxChar,
        style: style,
        "class": className,
        oncontextmenu: "event.cancelBubble=true;return true",
        onfocus: "TextFieldWidget_focus(this)",
        onblur: "TextFieldWidget_blur(this)",
        onchange: "TextFieldWidget_changeCB(event, this)",
        onkeydown: "return TextFieldWidget_keyDownCB(event, this);",
        onkeyup: "return TextFieldWidget_keyUpCB(event, this);",
        onkeypress: "return TextFieldWidget_keyPressCB(event, this);",
        ondragstart: "event.cancelBubble=true; return true;",
        onselectstart: "event.cancelBubble=true; return true;"
    };
    if (this.disabled) {
        attributes.disabled = "disabled";
    }
    if (!this.editable) {
        attributes.readonly = "readonly";
        if (isIE) {
            style.filter = "alpha(opacity=50)";
        } else {
            style.opacity = "0.5";
        }
    }
    if (this.tooltip) {
        attributes.title = this.tooltip;
    }
    return bobj.html.INPUT(attributes);
};
bobj.crv.params.TextField.setBgColor = function (color) {
    if (color !== this.bgColor) {
        if (this.layer) {
            var DOM = MochiKit.DOM;
            DOM.removeElementClass(this.layer, this._getBgColorClass(this.bgColor));
            DOM.addElementClass(this.layer, this._getBgColorClass(color));
        }
        this.bgColor = color;
    }
};
bobj.crv.params.TextField.isDirty = function () {
    return this.alwaysDirty === true || this.getValue() !== this.cleanValue;
};
bobj.crv.params.TextField.setValue = function (value) {
    TextFieldWidget_setValue.call(this, value);
};
bobj.crv.params.TextField.setCleanValue = function (value) {
    this.cleanValue = value;
};
bobj.crv.params.TextField._getBgColorClass = function (color) {
    var className = "iactTextFieldBg";
    var Colors = bobj.crv.params.BackgroundColor;
    if (color === Colors.alternate || color === Colors.dirtyAlternate) {
        className += "Alt";
    }
    if (color === Colors.dirty || color === Colors.dirtyAlternate) {
        className += "Dirty";
    }
    return className;
};
bobj.crv.params.newTextCombo = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    var PARAMS = bobj.crv.params;
    kwArgs = UPDATE({
        id: bobj.uniqueId(),
        width: "100%",
        maxChar: null,
        tooltip: null,
        disabled: false,
        editable: false,
        changeCB: null,
        enterCB: null,
        keyUpCB: null,
        selected: false,
        bgColor: PARAMS.BackgroundColor.standard
    }, kwArgs);
    var o = newTextComboWidget(kwArgs.id, kwArgs.maxChar, kwArgs.tooltip, null, kwArgs.changeCB, null, null, null);
    o.widgetType = "TextCombo";
    bobj.fillIn(o, kwArgs);
    o.width = kwArgs.width;
    o.init_TextCombo = o.init;
    UPDATE(o, PARAMS.TextCombo);
    o._createTextField();
    o._createArrow();
    o.arrow.dy += 2;
    o.arrow.disDy += 2;
    return o;
};
bobj.crv.params.TextCombo.setAlwaysDirty = function () {
    this.text.setAlwaysDirty();
};
bobj.crv.params.TextCombo.setMenu = function (menu) {
    this.menu = menu;
};
bobj.crv.params.TextCombo.init = function () {
    var BIND = MochiKit.Base.bind;
    this.init_TextCombo();
    this.arrowContainer = getLayer(this.id + "_arrowCtn");
    this.layer.onmouseover = BIND(this.showArrow, this, true);
    this.layer.onmouseout = BIND(this.onMouseOut, this);
    if (this.arrow) {
        this.arrow.layer.onfocus = IconWidget_realOverCB;
        this.arrow.layer.onblur = IconWidget_realOutCB;
    }
    this.text.setValue(this.cleanValue);
};
bobj.crv.params.TextCombo.onMouseOut = function () {
    if (this.selected === false) {
        this.showArrow(false);
    }
};
bobj.crv.params.TextCombo.setSelected = function (selected) {
    if (this.selected != selected) {
        this.selected = selected;
        this.showArrow(selected);
    }
};
bobj.crv.params.TextCombo.showArrow = function (show) {
    if (this.arrowContainer) {
        this.arrowContainer.style.visibility = show ? "visible" : "hidden";
    }
};
bobj.crv.params.TextCombo.showMenu = function () {
    var menu = this.menu;
    menu.parIcon = this;
    menu.show(true);
    menu.valueSelect(this.text.getValue() + "");
};
bobj.crv.params.TextCombo._createArrow = function () {
    this.arrow = newIconWidget(this.id + "arrow_", bobj.skinUri("menus.gif"), MochiKit.Base.bind(this.showMenu, this), null, (_openMenuPart1 + (this.tooltip ? this.tooltip : "") + _openMenuPart2), 7, 12, 0, 83, 0, 99);
    this.arrow.setClasses("iconnocheck", "combobtnhover", "combobtnhover", "combobtnhover");
    this.arrow.par = this;
};
bobj.crv.params.TextCombo._createTextField = function () {
    this.text = bobj.crv.params.newTextField({
        id: this.id + "_text",
        cleanValue: this.cleanValue,
        width: "100%",
        maxChar: null,
        tooltip: this.tooltip,
        disabled: false,
        editable: this.editable,
        password: false,
        focusCB: null,
        blurCB: null,
        keyUpCB: MochiKit.Base.bind(this._onKeyUp, this),
        enterCB: this.enterCB,
        alwaysDirty: false
    });
};
bobj.crv.params.TextCombo.getHTML = function () {
    var h = bobj.html;
    var className = this._getBgColorClass(this.bgColor);
    this.text.bgColor = this.bgColor;
    var arrowClassName = "iactTextComboArrow";
    var arrowStyle = {};
    arrowStyle.right = "0px";
    arrowStyle.visibility = "hidden";
    if (MochiKit.Base.isIE()) {
        arrowStyle.height = "18px";
        if (!bobj.isQuirksMode()) {
            arrowStyle.right = "5px";
        }
    } else {
        arrowStyle.height = "16px";
    }
    var html = h.DIV({
        id: this.id,
        "class": className,
        style: {width: "100%", position: "relative"}
    }, h.DIV({
        style: {position: "relative"},
        "class": "iactTextComboTextField"
    }, this.text.getHTML()), h.DIV({
        "class": arrowClassName,
        id: this.id + "_arrowCtn",
        style: arrowStyle
    }, this.arrow.getHTML()));
    return html;
};
bobj.crv.params.TextCombo.setValue = function (text) {
    this.text.setValue(text);
};
bobj.crv.params.TextCombo.setCleanValue = function (text) {
    this.text.setCleanValue(text);
};
bobj.crv.params.TextCombo.selectItem = function (item) {
    if (item) {
        this.val = item.value;
        this.text.setValue(item.value, true);
        this.menu.select(item.index);
    }
};
bobj.crv.params.TextCombo.getValue = function () {
    return this.text.getValue();
};
bobj.crv.params.TextCombo.setBgColor = function (color) {
    if (color !== this.bgColor) {
        if (this.layer) {
            var DOM = MochiKit.DOM;
            DOM.removeElementClass(this.layer, this._getBgColorClass(this.bgColor));
            DOM.addElementClass(this.layer, this._getBgColorClass(color));
        }
        this.bgColor = color;
    }
    if (this.text) {
        this.text.setBgColor(color);
    }
};
bobj.crv.params.TextCombo._onKeyUp = function (e) {
    var text = this.text.getValue();
    if (this.keyUpCB) {
        this.keyUpCB(e);
    }
};
bobj.crv.params.TextCombo.isDirty = function () {
    return this.text.isDirty();
};
bobj.crv.params.TextCombo._getBgColorClass = function (color) {
    var className = "iactTextComboBg";
    var Colors = bobj.crv.params.BackgroundColor;
    if (color === Colors.alternate || color === Colors.dirtyAlternate) {
        className += "Alt";
    }
    if (color === Colors.dirty || color === Colors.dirtyAlternate) {
        className += "Dirty";
    }
    return className;
};
bobj.crv.params.newScrollMenuWidget = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        originalValues: [],
        hasProperWidth: false,
        hasValueList: false,
        maxVisibleItems: 10,
        openAdvDialogCB: null,
        maxNumParameterDefaultValues: null
    }, kwArgs);
    var visibleLines = (kwArgs.originalValues.length >= kwArgs.maxVisibleItems) ? kwArgs.maxVisibleItems : kwArgs.originalValues.length;
    if (visibleLines === 1) {
        visibleLines++;
    }
    var o = newScrollMenuWidget("menu_" + kwArgs.id, bobj.crv.params.ScrollMenuWidget.onChange, false, null, visibleLines, null, null, null, false, "", "", null, null);
    o.oldShow = o.show;
    MochiKit.Base.update(o, kwArgs, bobj.crv.params.ScrollMenuWidget);
    return o;
};
bobj.crv.params.ScrollMenuWidget.onChange = function () {
    var o = this.parIcon;
    var item = this.getSelection();
    if (item) {
        if (this.maxNumParameterDefaultValues && item.index == this.maxNumParameterDefaultValues) {
            if (this.openAdvDialogCB) {
                this.openAdvDialogCB();
            }
        } else {
            o.val = item.value;
            o.text.setValue(item.value);
        }
    } else {
        o.val = null;
        o.text.setValue("");
    }
    if (o.changeCB) {
        o.changeCB();
    }
};
bobj.crv.params.ScrollMenuWidget.getPosition = function () {
    if (this.parIcon === null) {
        return;
    }
    var layer = this.parIcon.layer;
    var getDimensions = MochiKit.Style.getElementDimensions;
    var position = getPosScrolled(layer);
    var xPos = position.x + 2;
    var yPos = position.y + getDimensions(layer).h + 3;
    if (MochiKit.Base.isIE()) {
        xPos -= 1;
        if (bobj.isQuirksMode()) {
            yPos -= 2;
        }
    }
    return {x: xPos, y: yPos};
};
bobj.crv.params.ScrollMenuWidget.setProperWidth = function () {
    if (this.hasProperWidth === false) {
        this.css.display = "block";
        this.orginalWidth = this.layer.offsetWidth;
        this.css.display = "none";
        this.hasProperWidth = true;
    }
};
bobj.crv.params.ScrollMenuWidget.setValueList = function () {
    if (this.hasValueList === false) {
        this.hasValueList = true;
        var origValues = this.originalValues;
        for (var i = 0, len = origValues.length; i < len; i++) {
            this.add(origValues[i], origValues[i], false);
        }
    }
};
bobj.crv.params.ScrollMenuWidget.setFocus = function (focus) {
    if (focus) {
        var focusCB = MochiKit.Base.bind(this.list.focus, this.list);
        setTimeout(focusCB, 300);
    } else {
        if (this.parIcon.selected === true) {
            this.parIcon.arrow.focus();
        }
    }
};
bobj.crv.params.ScrollMenuWidget.show = function (show) {
    if (this.layer === null) {
        this.justInTimeInit();
    }
    if (this.hasValueList === false) {
        this.setValueList();
    }
    if (this.parIcon === null) {
        return;
    }
    if (this.hasProperWidth === false) {
        this.setProperWidth();
    }
    if (this.parIcon && this.parIcon.layer) {
        var layer = this.parIcon.layer;
        if (layer.clientWidth > this.orginalWidth) {
            this.css.width = layer.clientWidth + "px";
            this.list.css.width = layer.clientWidth + "px";
        } else {
            this.css.width = this.orginalWidth + "px";
            this.list.css.width = this.orginalWidth + "px";
        }
    }
    var pos = this.getPosition();
    this.oldShow(show, pos.x, pos.y);
    this.setFocus(show);
};
bobj.crv.params.newHelperRow = function (kwArgs) {
    kwArgs = MochiKit.Base.update({id: bobj.uniqueId(), message: ""}, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "HelperRow";
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.params.HelperRow);
    return o;
};
bobj.crv.params.HelperRow.show = function (show) {
    switch (show) {
        case false:
            this.css.visibility = "hidden";
            this.css.display = "none";
            break;
        case true:
            this.css.visibility = "visible";
            this.css.display = "block";
            break;
    }
};
bobj.crv.params.HelperRow.getHTML = function () {
    var DIV = bobj.html.DIV;
    cssClass = this._getBgColorClass() + " iactParamRow";
    ieCssClass = "iactParamRowIE";
    var valStyle = "";
    if (MochiKit.Base.isIE() && bobj.isQuirksMode()) {
        cssClass += " " + ieCssClass;
        valStyle.width = "100%";
    }
    return DIV({id: this.id, "class": cssClass}, DIV({
        "class": "iactParamValue",
        style: valStyle
    }, DIV({"class": "helperRowMessage"}, "[" + this.message + "]")), DIV({"class": "iactParamRight"}));
};
bobj.crv.params.HelperRow._getBgColorClass = bobj.crv.params.ParameterValueRow._getBgColorClass;
bobj.crv.params.HelperRow.resize = function (w, h) {
    bobj.setOuterSize(this.layer, w, h);
};
if (typeof bobj.crv.params.ParameterPanel == "undefined") {
    bobj.crv.params.ParameterPanel = {};
    bobj.crv.params.ParameterPanelToolbar = {};
    bobj.crv.params.ParameterTab = {};
    bobj.crv.params.ParameterDialog = {};
}
bobj.crv.params.newParameterPanel = function (kwArgs) {
    kwArgs = MochiKit.Base.update({id: bobj.uniqueId() + "_IPPanel"}, kwArgs);
    var o = newWidget(kwArgs.id);
    o.widgetType = "ParameterPanel";
    bobj.fillIn(o, kwArgs);
    MochiKit.Base.update(o, bobj.crv.params.ParameterPanel);
    o._tabPanel = bobj.crv.newStackedPanel({id: o.id + "_ParamtersStack"});
    o._selected = null;
    o._toolbar = bobj.crv.params.newParameterPanelToolbar({id: o.id + "_IPToolbar"});
    return o;
};
bobj.crv.params.ParameterPanel.setToolbarCallBacks = function (delClickCB, applyClickCB) {
    if (this._toolbar) {
        this._toolbar.delClickCB = delClickCB;
        this._toolbar.applyClickCB = applyClickCB;
    }
};
bobj.crv.params.ParameterPanel.init = function () {
    Widget_init.call(this);
    this._toolbar.init();
    if (this._tabPanel) {
        this._tabPanel.init();
    }
};
bobj.crv.params.ParameterPanel.getHTML = function () {
    var DIV = bobj.html.DIV;
    var layerStyle = this._getCommonLayerStyle();
    layerStyle.overflow = "hidden";
    var innerHTML = this._toolbar.getHTML();
    if (this._tabPanel) {
        innerHTML += this._tabPanel.getHTML();
    }
    return DIV({id: this.id, style: layerStyle}, innerHTML);
};
bobj.crv.params.ParameterPanel._getErrorMsgContent = function (errMsg) {
    var DIV = bobj.html.DIV;
    var layerStyle = this._getCommonLayerStyle();
    return DIV({id: this.id, style: layerStyle}, errMsg);
};
bobj.crv.params.ParameterPanel._getCommonLayerStyle = function () {
    var layerStyle = {};
    if (this.height) {
        layerStyle.height = bobj.unitValue(this.height);
    }
    if (this.width) {
        layerStyle.width = bobj.unitValue(this.width);
    }
    return layerStyle;
};
bobj.crv.params.ParameterPanel.showError = function (errMsg) {
    if (errMsg) {
        this.setHTML(this._getErrorMsgContent(errMsg));
    }
};
bobj.crv.params.ParameterPanel.resize = function (w, h) {
    Widget_resize.call(this, w, h);
    if (this._toolbar) {
        w = this.layer.clientWidth;
        this._toolbar.resize(w);
        if (this._tabPanel) {
            h = this.layer.clientHeight - this._toolbar.getHeight();
            this._tabPanel.resize(w, h);
        }
    }
};
bobj.crv.params.ParameterPanel.addParameter = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        paramUI: null,
        label: null,
        isDataFetching: false,
        isDirty: false,
        isReadOnly: false,
        selectCB: null,
        openAdvCB: null,
        minMaxTooltip: null,
        id: this._tabPanel.id + "_P" + (this._tabPanel.getNumTabs() + 1)
    }, kwArgs);
    if (kwArgs.paramUI) {
        var paramTab = bobj.crv.params.newParameterTab(kwArgs);
        paramTab.setContent(kwArgs.paramUI);
        this._tabPanel.addTab(paramTab);
    }
};
bobj.crv.params.ParameterPanel.removeParameter = function (index) {
    this._tabPanel.removeTab(index);
};
bobj.crv.params.ParameterPanel.getWidth = function () {
    if (this.layer) {
        return this.layer.offsetWidth;
    }
    return this.width;
};
bobj.crv.params.ParameterPanel.setDeleteButtonEnabled = function (isEnabled) {
    this._toolbar.delButton.setDisabled(!isEnabled);
};
bobj.crv.params.ParameterPanel.setApplyButtonEnabled = function (isEnabled) {
    this._toolbar.applyButton.setDisabled(!isEnabled);
};
bobj.crv.params.ParameterPanel.getIndex = function (paramUI) {
    var numTabs = this._tabPanel.getNumTabs();
    for (var idx = 0; idx < numTabs; ++idx) {
        var tab = this._tabPanel.getTab(idx);
        if (tab.getContent() === paramUI) {
            return idx;
        }
    }
    return -1;
};
bobj.crv.params.ParameterPanel.getParameter = function (index) {
    var tab = this._tabPanel.getTab(index);
    if (tab) {
        return tab.getContent();
    }
    return null;
};
bobj.crv.params.ParameterPanel.setDirty = function (index, isDirty) {
    var tab = this._tabPanel.getTab(index);
    if (tab) {
        tab.setDirty(isDirty);
        tab.getContent().setBgColor();
    }
};
bobj.crv.params.ParameterPanel.isDirty = function (index) {
    var tab = this._tabPanel.getTab(index);
    if (tab) {
        return tab.isDirty();
    }
    return false;
};
bobj.crv.params.ParameterPanel.setSelected = function (index, isSelected) {
    var tab = this._tabPanel.getTab(index);
    if (tab) {
        if (this._selected) {
            this._selected.setSelected(false);
        }
        tab.setSelected(isSelected);
        this._selected = tab;
    }
};
bobj.crv.params.ParameterPanel.expand = function (index) {
    var tab = this._tabPanel.getTab(index);
    if (tab) {
        tab.expand();
    }
};
bobj.crv.paramPanelIcon = bobj.crvUri("images/param_panel.gif");
bobj.crv.paramDataFetchingIconYOffset = 32;
bobj.crv.paramDirtyIconYOffset = 48;
bobj.crv.paramInfoIconYOffset = 64;
bobj.crv.paramsApplyIconYOffset = 80;
bobj.crv.paramsDeleteIconYOffset = 102;
bobj.crv.params.newParameterPanelToolbar = function (kwArgs) {
    kwArgs = MochiKit.Base.update({id: bobj.uniqueId()}, kwArgs);
    var o = newPaletteContainerWidget(kwArgs.id);
    bobj.fillIn(o, kwArgs);
    o.widgetType = "ParameterPanelToolbar";
    o._paletteContainerInit = o.init;
    MochiKit.Base.update(o, bobj.crv.params.ParameterPanelToolbar);
    o._palette = newPaletteWidget(o.id + "_palette");
    o.add(o._palette);
    var bind = MochiKit.Base.bind;
    o.delButton = newIconWidget(o.id + "_delBtn", bobj.crv.paramPanelIcon, bind(o._onDelClick, o), L_bobj_crv_ParamsDelete, L_bobj_crv_ParamsDeleteTooltip, 16, 16, 3, 3 + bobj.crv.paramsDeleteIconYOffset, 25, 3 + bobj.crv.paramsDeleteIconYOffset);
    o.applyButton = newIconWidget(o.id + "_applyBtn", bobj.crv.paramPanelIcon, bind(o._onApplyClick, o), L_bobj_crv_ParamsApply, L_bobj_crv_ParamsApplyTip, 16, 16, 3, 3 + bobj.crv.paramsApplyIconYOffset, 25, 3 + bobj.crv.paramsApplyIconYOffset);
    o._palette.add(o.applyButton);
    o._palette.add();
    o._palette.add(o.delButton);
    return o;
};
bobj.crv.params.ParameterPanelToolbar.init = function () {
    this._paletteContainerInit();
    this._palette.init();
    this.delButton.setDisabled(true);
    this.applyButton.setDisabled(true);
};
bobj.crv.params.ParameterPanelToolbar.beginHTML = function () {
    return bobj.html.openTag("div", {id: this.id, "class": "dialogzone", style: {overflow: "hidden", margin: "0"}});
};
bobj.crv.params.ParameterPanelToolbar.getHTML = function () {
    return (this.beginHTML() + this._palette.getHTML() + this.endHTML());
};
bobj.crv.params.ParameterPanelToolbar._onDelClick = function () {
    if (this.delClickCB) {
        bobj.crv.logger.info("UIAction ParameterPanel.Delete");
        this.delClickCB();
    }
};
bobj.crv.params.ParameterPanelToolbar._onApplyClick = function () {
    if (this.applyClickCB) {
        bobj.crv.logger.info("UIAction ParameterPanel.Apply");
        this.applyClickCB();
    }
};
bobj.crv.params.newParameterTab = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        label: null,
        isDataFetching: false,
        isDirty: false,
        isReadOnly: false,
        minMaxTooltip: null,
        openAdvCB: null,
        selectCB: null,
        id: null
    }, kwArgs);
    kwArgs.iconPos = "right";
    kwArgs.expandImgPos = "right";
    var o = bobj.crv.newStackedTab(kwArgs);
    bobj.fillIn(o, kwArgs);
    o._isDirtyInit = kwArgs.isDirty;
    MochiKit.Base.update(o, bobj.crv.params.ParameterTab);
    o._dirtyId = o.id + "_dirty";
    o.addIcon(bobj.crv.paramPanelIcon, 0, bobj.crv.paramDirtyIconYOffset, L_bobj_crv_ParamsDirtyTip, false, o._isDirtyInit, o._dirtyId);
    if (kwArgs.minMaxTooltip || kwArgs.isReadOnly) {
        var tooltip = "";
        if (kwArgs.isReadOnly && kwArgs.minMaxTooltip) {
            tooltip = L_bobj_crv_ParamsReadOnly + "<BR>" + kwArgs.minMaxTooltip;
        } else {
            if (kwArgs.minMaxTooltip) {
                tooltip = kwArgs.minMaxTooltip;
            } else {
                if (kwArgs.isReadOnly) {
                    tooltip = L_bobj_crv_ParamsReadOnly;
                }
            }
        }
        o.addIcon(bobj.crv.paramPanelIcon, 0, bobj.crv.paramInfoIconYOffset, tooltip, false, true, o.id + "_icnInfo");
    }
    if (o.isDataFetching) {
        o.addIcon(bobj.crv.paramPanelIcon, 0, bobj.crv.paramDataFetchingIconYOffset, L_bobj_crv_ParamsDataTip, true, true, null);
    }
    return o;
};
bobj.crv.params.ParameterTab.setDirty = function (isDirty) {
    if (isDirty) {
        this.showIcon.call(this, this._dirtyId);
    } else {
        this.hideIcon.call(this, this._dirtyId);
    }
};
bobj.crv.params.ParameterTab.isDirty = function () {
    if (this.layer) {
        return this.isIconShowing(this._dirtyId);
    } else {
        return this._isDirtyInit;
    }
};
bobj.crv.params.ParameterTab.isSelected = function () {
    return MochiKit.DOM.hasElementClass(this._labelCtn, "iactParamLabelSel");
};
bobj.crv.params.ParameterTab.setSelected = function (isSelected) {
    if (isSelected) {
        MochiKit.DOM.addElementClass(this._labelCtn, "iactParamLabelSel");
    } else {
        MochiKit.DOM.removeElementClass(this._labelCtn, "iactParamLabelSel");
    }
};
bobj.crv.params.newParameterDialog = function (kwArgs) {
    kwArgs = MochiKit.Base.update({
        id: bobj.uniqueId(),
        prompt: null,
        promptHTML: "",
        showCB: null,
        hideCB: null
    }, kwArgs);
    var o = newDialogBoxWidget(kwArgs.id, L_bobj_crv_ParamsDlgTitle, kwArgs.width, kwArgs.height);
    bobj.fillIn(o, kwArgs);
    o._showDialogBox = o.show;
    o._initDialogBox = o.init;
    MochiKit.Base.update(o, bobj.crv.params.ParameterDialog);
    return o;
};
bobj.crv.params.ParameterDialog.init = function () {
    this._initDialogBox();
    this._form = document.getElementById(this.id + "_form");
};
bobj.crv.params.ParameterDialog._checkInitialization = function () {
    if (!this.layer) {
        targetApp(this.getHTML());
        this.init();
    }
};
bobj.crv.params.ParameterDialog.show = function (show) {
    if (show) {
        this._checkInitialization();
        this.setResize(MochiKit.Base.noop);
        this._showDialogBox(true);
    } else {
        if (this.layer) {
            this._showDialogBox(false);
        }
    }
    if (show && this.showCB) {
        this.showCB();
    } else {
        if (!show && this.hideCB) {
            this.hideCB();
        }
    }
};
bobj.crv.params.ParameterDialog.isVisible = function () {
    return (this.initialized() && this.isDisplayed());
};
bobj.crv.params.ParameterDialog.setPromptHTML = function (html) {
    if (html) {
        this._checkInitialization();
        if (this.isDisplayed()) {
            this._showDialogBox(false);
        }
        this._deleteScripts();
        var ext = bobj.html.extractHtml(html);
        this.promptHTML = ext.html;
        if (this._form) {
            this._form.innerHTML = '<div style="overflow:auto">' + this.promptHTML + "</div>";
        }
        var links = ext.links;
        for (var iLinks = 0, linksLen = links.length; iLinks < linksLen; ++iLinks) {
            bobj.includeLink(links[iLinks]);
        }
        var winScroll_before = {x: getScrollX(), y: getScrollY()};
        var scripts = ext.scripts;
        for (var iScripts = 0, scriptsLen = scripts.length; iScripts < scriptsLen; ++iScripts) {
            var script = scripts[iScripts];
            if (!script) {
                continue;
            }
            if (script.text) {
                bobj.evalInWindow(script.text);
            }
        }
        var winScroll_after = {x: getScrollX(), y: getScrollY()};
        if (winScroll_before.x != winScroll_after.x || winScroll_before.y != winScroll_after.y) {
            _curWin.scrollTo(winScroll_before.x, winScroll_before.y);
        }
    }
};
bobj.crv.params.ParameterDialog._deleteScripts = function () {
    var form = this._form;
    if (form && form.ContextHandleID) {
        var prefix = form.ContextHandleID.value;
        for (var i in window) {
            if (i.indexOf(prefix) === 0) {
                delete window[i];
            }
        }
    }
};
bobj.crv.params.ParameterDialog.getHTML = function (html) {
    var FORM = bobj.html.FORM;
    var onsubmit = "eventCancelBubble(event);return false;";
    return this.beginHTML() + FORM({id: this.id + "_form", onsubmit: onsubmit}, this.promptHTML) + this.endHTML();
};

function bobj_WebForm_Callback(viewerID, callbackEventArgument, formID) {
    if (!viewerID || !formID) {
        return;
    }
    var frm = document.getElementById(formID);
    if (!frm) {
        return;
    }
    var strArr = [];
    for (var i = 0, itemCount = frm.elements.length; i < itemCount; i++) {
        var elem = frm.elements[i];
        if (elem.name && elem.value) {
            strArr.push(elem.name);
            strArr.push("=");
            strArr.push(encodeURIComponent(elem.value));
            strArr.push("&");
        }
    }
    strArr.push("__BOBJ_CALLBACK_EVENTTARGET=");
    strArr.push(encodeURIComponent(viewerID));
    strArr.push("&__BOBJ_CALLBACK_EVENTARGUMENT=");
    strArr.push(encodeURIComponent(callbackEventArgument));
    var qryString = strArr.join("");
    var req = MochiKit.Async.getXMLHttpRequest();
    req.open("POST", frm.action, true);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    return MochiKit.Async.sendXMLHttpRequest(req, qryString);
}

if (typeof bobj == "undefined") {
    bobj = {};
}
if (typeof bobj.crv == "undefined") {
    bobj.crv = {};
}
if (typeof bobj.crv.Calendar == "undefined") {
    bobj.crv.Calendar = {};
}
bobj.crv.Calendar.getInstance = function () {
    if (!bobj.crv.Calendar.__instance) {
        bobj.crv.Calendar.__instance = bobj.crv.newCalendar();
    }
    return bobj.crv.Calendar.__instance;
};
bobj.crv.Calendar.Signals = {OK_CLICK: "okClick", CANCEL_CLICK: "cancelClick", ON_HIDE: "onHide"};
bobj.crv.newCalendar = function (kwArgs) {
    var UPDATE = MochiKit.Base.update;
    kwArgs = UPDATE({
        id: bobj.uniqueId() + "_calendar",
        showTime: false,
        date: new Date(),
        timeFormats: ["HH:mm:ss", "H:mm:ss", "H:m:s", "HH:mm", "H:mm", "H:m", "h:mm:ss a", "h:m:s a", "h:mm:ssa", "h:m:sa", "h:mm a", "h:m a", "h:mma", "h:ma"]
    }, kwArgs);
    var o = newMenuWidget();
    o.widgetType = "Calendar";
    bobj.fillIn(o, kwArgs);
    o._menuJustInTimeInit = o.justInTimeInit;
    UPDATE(o, bobj.crv.Calendar);
    o._curTimeFormat = o.timeFormats[0];
    o._cells = [];
    o._firstDay = 0;
    o._numDays = 0;
    return o;
};
bobj.crv.Calendar._createHeaderButtons = function () {
    var w = 8;
    var h = 4;
    var dx = 46;
    var dyUp = 0;
    var dyDown = 12;
    var bind = MochiKit.Base.bind;
    this._prevMonthBtn = newIconWidget(this.id + "_pm", _skin + "../lov.gif", bind(this._onPrevMonthClick, this), "", _calendarPrevMonthLab, w, h, dx, dyDown);
    this._prevYearBtn = newIconWidget(this.id + "_py", _skin + "../lov.gif", bind(this._onPrevYearClick, this), "", _calendarPrevYearLab, w, h, dx, dyDown);
    this._nextMonthBtn = newIconWidget(this.id + "_nm", _skin + "../lov.gif", bind(this._onNextMonthClick, this), "", _calendarNextMonthLab, w, h, dx, dyUp);
    this._nextYearBtn = newIconWidget(this.id + "_ny", _skin + "../lov.gif", bind(this._onNextYearClick, this), "", _calendarNextYearLab, w, h, dx, dyUp);
    this._prevMonthBtn.allowDblClick = true;
    this._prevYearBtn.allowDblClick = true;
    this._nextMonthBtn.allowDblClick = true;
    this._nextYearBtn.allowDblClick = true;
};
bobj.crv.Calendar._createTimeTextField = function () {
    var bind = MochiKit.Base.bind;
    this._timeField = newTextFieldWidget(this.id + "_time", bind(this._onTimeChange, this), null, null, null, true, null, null, null, null);
};
bobj.crv.Calendar._createOKCancelButtons = function () {
    var bind = MochiKit.Base.bind;
    this._okBtn = newButtonWidget(this.id + "_ok", L_bobj_crv_OK, bind(this._onOKClick, this));
    this._cancelBtn = newButtonWidget(this.id + "_cancel", L_bobj_crv_Cancel, bind(this._onCancelClick, this));
};
bobj.crv.Calendar.justInTimeInit = function () {
    this._menuJustInTimeInit();
    this._prevMonthBtn.init();
    this._prevYearBtn.init();
    this._nextMonthBtn.init();
    this._nextYearBtn.init();
    this._okBtn.init();
    this._cancelBtn.init();
    this._timeField.init();
    this._timeField.layer.style.width = "100%";
    this._timeField.setValue(bobj.external.date.formatDate(this.date, this._curTimeFormat));
    this._timeRow = getLayer(this.id + "_timeRow");
    this._timeSep = getLayer(this.id + "_timeSep");
    this._month = getLayer(this.id + "_month");
    this._year = getLayer(this.id + "_year");
    var numCells = 6 * 7;
    for (var i = 0; i < numCells; i++) {
        this._cells[i] = getLayer(this.id + "_c" + i);
    }
    this._update();
};
bobj.crv.Calendar.getHTML = function () {
    var h = bobj.html;
    var TABLE = h.TABLE;
    var TBODY = h.TBODY;
    var TR = h.TR;
    var TD = h.TD;
    var DIV = h.DIV;
    var SPAN = h.SPAN;
    var A = h.A;
    this._createHeaderButtons();
    this._createTimeTextField();
    this._createOKCancelButtons();
    var onkeydown = "MenuWidget_keyDown('" + this.id + "', event); return true";
    var onmousedown = "eventCancelBubble(event)";
    var onmouseup = "eventCancelBubble(event)";
    var onkeypress = "eventCancelBubble(event)";
    var dayHeaderAtt = {"class": "calendarTextPart"};
    var html = TABLE({
        dir: "ltr",
        id: this.id,
        border: "0",
        cellpadding: "0",
        cellspacing: "0",
        onkeydown: onkeydown,
        onmousedown: onmousedown,
        onmouseup: onmouseup,
        onkeypress: onkeypress,
        "class": "menuFrame",
        style: {cursor: "default", visibility: "hidden", "z-index": 10000}
    }, TBODY(null, TR(null, TD(null, this._getMonthYearHTML())), TR(null, TD({align: "center"}, TABLE({
        border: "0",
        cellspacing: "0",
        cellpadding: "0",
        style: {margin: "2px", "margin-top": "6px"}
    }, TR({align: "center"}, TD(dayHeaderAtt, L_bobj_crv_SundayShort), TD(dayHeaderAtt, L_bobj_crv_MondayShort), TD(dayHeaderAtt, L_bobj_crv_TuesdayShort), TD(dayHeaderAtt, L_bobj_crv_WednesdayShort), TD(dayHeaderAtt, L_bobj_crv_ThursdayShort), TD(dayHeaderAtt, L_bobj_crv_FridayShort), TD(dayHeaderAtt, L_bobj_crv_SaturdayShort)), TR(null, TD({
        colspan: "7",
        style: {padding: "2px"}
    }, this._getSeparatorHTML())), this._getDaysHTML(), TR(null, TD({
        colspan: "7",
        style: {padding: "2px"}
    }, this._getSeparatorHTML())), TR({
        id: this.id + "_timeRow",
        style: {display: this.showTime ? "" : "none"}
    }, TD({
        colspan: "7",
        style: {"padding-top": "3px", "padding-bottom": "3px", "padding-right": "10px", "padding-left": "10px"}
    }, this._timeField.getHTML())), TR({
        id: this.id + "_timeSep",
        style: {display: this.showTime ? "" : "none"}
    }, TD({colspan: "7", style: {padding: "2px"}}, this._getSeparatorHTML())), TR(null, TD({
        colspan: "7",
        align: "right",
        style: {"padding-bottom": "3px", "padding-top": "3px"}
    }, TABLE(null, TBODY(null, TR(null, TD(null, this._okBtn.getHTML()), TD(null, this._cancelBtn.getHTML())))))))))));
    return this._getLinkHTML("startLink_" + this.id) + html + this._getLinkHTML("endLink_" + this.id);
};
bobj.crv.Calendar._getMonthYearHTML = function () {
    var h = bobj.html;
    var TABLE = h.TABLE;
    var TBODY = h.TBODY;
    var TR = h.TR;
    var TD = h.TD;
    var DIV = h.DIV;
    var SPAN = h.SPAN;
    return TABLE({
        "class": "dialogzone",
        width: "100%",
        cellpadding: "0",
        cellspacing: "0"
    }, TBODY(null, TR(null, TD({style: {"padding-top": "1px"}}, this._nextMonthBtn.getHTML()), TD({
        rowspan: "2",
        width: "100%",
        align: "center",
        "class": "dialogzone"
    }, SPAN({
        id: this.id + "_month",
        tabIndex: "0"
    }, _month[this.date.getMonth()]), "&nbsp;&nbsp;", SPAN({
        id: this.id + "_year",
        tabIndex: "0"
    }, this.date.getFullYear())), TD({style: {"pading-top": "1px"}}, this._nextYearBtn.getHTML())), TR({valign: "top"}, TD({style: {"padding-bottom": "1px"}}, this._prevMonthBtn.getHTML()), TD({style: {"padding-bottom": "1px"}}, this._prevYearBtn.getHTML()))));
};
bobj.crv.Calendar._getSeparatorHTML = function () {
    var h = bobj.html;
    var TABLE = h.TABLE;
    var TBODY = h.TBODY;
    var TR = h.TR;
    var TD = h.TD;
    return TABLE({
        width: "100%",
        height: "3",
        cellpadding: "0",
        cellspacing: "0",
        border: "0",
        style: backImgOffset(_skin + "menus.gif", 0, 80)
    }, TBODY(null, TR(null, TD())));
};
bobj.crv.Calendar._getLinkHTML = function (id) {
    return bobj.html.A({
        id: id,
        href: "javascript:void(0)",
        onfocus: "MenuWidget_keepFocus('" + this.id + "')",
        style: {visibility: "hidden", position: "absolute"}
    });
};
bobj.crv.Calendar._getDaysHTML = function () {
    var TD = bobj.html.TD;
    var DIV = bobj.html.DIV;
    var html = "";
    for (i = 0; i < 6; ++i) {
        html += '<tr align="right">';
        for (j = 0; j < 7; ++j) {
            var cellNum = j + (i * 7);
            var eventArgs = "(this," + cellNum + "," + "event);";
            html += TD({
                id: this.id + "_c" + (i * 7 + j),
                "class": "calendarTextPart",
                onmousedown: "bobj.crv.Calendar._onDayMouseDown" + eventArgs,
                onmouseover: "bobj.crv.Calendar._onDayMouseOver" + eventArgs,
                onmouseout: "bobj.crv.Calendar._onDayMouseOut" + eventArgs,
                ondblclick: "bobj.crv.Calendar._onDayDoubleClick" + eventArgs,
                onkeydown: "bobj.crv.Calendar._onDayKeyDown" + eventArgs
            }, DIV({"class": "menuCalendar"}));
        }
        html += "</tr>";
    }
    return html;
};
bobj.crv.Calendar._update = function () {
    var numCells = 6 * 7;
    var curDate = this.date.getDate();
    var info = this._getMonthInfo(this.date.getMonth(), this.date.getFullYear());
    var firstCellInMonth = info.firstDay;
    this._firstDay = info.firstDay;
    this._numDays = info.numDays;
    var year = "" + this.date.getFullYear();
    while (year.length < 4) {
        year = "0" + year;
    }
    this._year.innerHTML = year;
    this._month.innerHTML = _month[this.date.getMonth()];
    this._selectedDate = null;
    for (var cellNum = 0; cellNum < numCells; cellNum++) {
        var cell = this._cells[cellNum].firstChild;
        var cssClass = "menuCalendar";
        var cellDate = this._getDateFromCellNum(cellNum);
        if (cellDate < 1 || cellDate > info.numDays) {
            cell.innerHTML = "";
            cell.tabIndex = "-1";
        } else {
            cell.innerHTML = "" + cellDate;
            cell.tabIndex = "0";
            if (cellDate == curDate) {
                cssClass = "menuCalendarSel";
                this._selectedDay = cell;
            }
        }
        cell.className = cssClass;
    }
};
bobj.crv.Calendar._getMonthInfo = function (month, year) {
    var date = new Date();
    date.setDate(1);
    date.setFullYear(year);
    date.setMonth(month);
    var firstDay = date.getDay();
    date.setDate(28);
    var lastDate = 28;
    for (var i = 29; i < 32; i++) {
        date.setDate(i);
        if (date.getMonth() != month) {
            break;
        }
        lastDate = i;
    }
    return {firstDay: firstDay, numDays: lastDate};
};
bobj.crv.Calendar._setDayOfMonth = function (date) {
    if (date > 0 && date <= this._numDays) {
        var prevDate = this.date.getDate();
        if (date != prevDate) {
            var prevCell = this._getCellFromDate(prevDate);
            if (prevCell) {
                prevCell.firstChild.className = "menuCalendar";
            }
            this._getCellFromDate(date).firstChild.className = "menuCalendarSel";
            this.date.setDate(date);
        }
    }
};
bobj.crv.Calendar._getCellFromDate = function (date) {
    var cellNum = date + this._firstDay - 1;
    return this._cells[cellNum];
};
bobj.crv.Calendar._getDateFromCellNum = function (cellNum) {
    return cellNum - this._firstDay + 1;
};
bobj.crv.Calendar._onDayMouseOver = function (node, cellNum, event) {
    var o = getWidget(node);
    var div = node.firstChild;
    var date = cellNum - o._firstDay + 1;
    if (date < 1 || date > o._numDays) {
        div.className = "menuCalendar";
    } else {
        div.className = "menuCalendarSel";
    }
};
bobj.crv.Calendar._onDayMouseOut = function (node, cellNum, event) {
    var o = getWidget(node);
    var div = node.firstChild;
    var date = cellNum - o._firstDay + 1;
    if (date != o.date.getDate()) {
        div.className = "menuCalendar";
    }
};
bobj.crv.Calendar._onDayMouseDown = function (node, cellNum, event) {
    var o = getWidget(node);
    var date = cellNum - o._firstDay + 1;
    o._setDayOfMonth(date);
};
bobj.crv.Calendar._onDayDoubleClick = function (node, cellNum, event) {
    var o = getWidget(node);
    o._onOKClick();
};
bobj.crv.Calendar._onDayKeyDown = function (node, cellNum, event) {
    event = new MochiKit.Signal.Event(node, event);
    var key = event.key().string;
    if (key === "KEY_ENTER") {
        var o = getWidget(node);
        var date = cellNum - o._firstDay + 1;
        o._setDayOfMonth(date);
    }
};
bobj.crv.Calendar._onPrevMonthClick = function () {
    if (this.date.getMonth() === 0) {
        this.date.setYear(this.date.getFullYear() - 1);
        this.date.setMonth(11);
    } else {
        this.date.setMonth(this.date.getMonth() - 1);
    }
    this._update();
};
bobj.crv.Calendar._onPrevYearClick = function () {
    this.date.setFullYear(this.date.getFullYear() - 1);
    this._update();
};
bobj.crv.Calendar._onNextMonthClick = function () {
    this.date.setMonth(this.date.getMonth() + 1);
    this._update();
};
bobj.crv.Calendar._onNextYearClick = function () {
    this.date.setFullYear(this.date.getFullYear() + 1);
    this._update();
};
bobj.crv.Calendar._onOKClick = function () {
    this.restoreFocus();
    MochiKit.Signal.signal(this, this.Signals.OK_CLICK, this._copyDate(this.date));
    this.show(false);
};
bobj.crv.Calendar._copyDate = function (date) {
    if (date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
    }
    return new Date();
};
bobj.crv.Calendar._onCancelClick = function () {
    this.restoreFocus();
    this.show(false);
    MochiKit.Signal.signal(this, this.Signals.CANCEL_CLICK);
};
bobj.crv.Calendar._onTimeChange = function () {
    var text = this._timeField.getValue();
    var date = null;
    var format = null;
    for (var i = 0; i < this.timeFormats.length && date === null; ++i) {
        format = this.timeFormats[i];
        date = bobj.external.date.getDateFromFormat(text, format);
    }
    if (date) {
        this._curTimeFormat = format;
        this.date.setHours(date.getHours());
        this.date.setMinutes(date.getMinutes());
        this.date.setSeconds(date.getSeconds());
        this.date.setMilliseconds(date.getMilliseconds());
    } else {
        this._timeField.setValue(bobj.external.date.formatDate(this.date, this._curTimeFormat));
    }
};
bobj.crv.Calendar.setShowTime = function (isShow) {
    var disp = isShow ? "" : "none";
    this.showTime = isShow;
    if (this.layer) {
        this._timeRow.style.display = disp;
        this._timeSep.style.display = disp;
    }
};
bobj.crv.Calendar.setDate = function (date) {
    this.date = date;
    if (this.layer) {
        this._timeField.setValue(bobj.external.date.formatDate(this.date, this._curTimeFormat));
        this._update();
    }
};
bobj.crv.Calendar.show = function (isShow, x, y, isAlignRight, isAlignBottom) {
    ScrollMenuWidget_show.call(this, isShow, x, y);
    if (isShow) {
        this.focus();
    } else {
        MochiKit.Signal.signal(this, this.Signals.ON_HIDE);
    }
};
bobj.crv.Calendar.focus = function () {
    if (this._selectedDay) {
        this._selectedDay.focus();
    }
};
if (typeof bobj.crv.params.FlexParameterUI == "undefined") {
    bobj.crv.params.FlexParameterUI = {};
}
bobj.crv.params.FlexParameterUI = function () {
    var _swfID = [];
    var _swf = [];
    var _promptData = [];
    var _paramCtrl = [];
    var _currentIParam = [];
    var _closeDialogCallBack = [];
    var _viewerLayoutType = [];
    var _moveArea;
    var _iParamsPromptUnitData = [];
    var _iParamsParamData = [];
};
bobj.crv.params.FlexParameterUI.setViewerLayoutType = function (viewerName, layout) {
    if (!this._viewerLayoutType) {
        this._viewerLayoutType = [];
    }
    this._viewerLayoutType[viewerName] = layout;
};
bobj.crv.params.FlexParameterUI.setPromptData = function (viewerName, promptData) {
    if (!this._promptData) {
        this._promptData = [];
    }
    this._promptData[viewerName] = promptData;
};
bobj.crv.params.FlexParameterUI.setCurrentIParamInfo = function (viewerName, paramCtrl, param) {
    if (!this._paramCtrl) {
        this._paramCtrl = [];
    }
    if (!this._currentIParam) {
        this._currentIParam = [];
    }
    this._paramCtrl[viewerName] = paramCtrl;
    this._currentIParam[viewerName] = param;
};
bobj.crv.params.FlexParameterUI.setCloseDialogCallBack = function (viewerName, closeDialogCallBack) {
    if (!this._closeDialogCallBack) {
        this._closeDialogCallBack = [];
    }
    this._closeDialogCallBack[viewerName] = closeDialogCallBack;
};
bobj.crv.params.FlexParameterUI.addIParamPromptUnitData = function (viewerName, promptUnitID, paramNames, promptData) {
    if (!this._iParamsPromptUnitData) {
        this._iParamsPromptUnitData = [];
    }
    if (!this._iParamsPromptUnitData[viewerName]) {
        this._iParamsPromptUnitData[viewerName] = [];
    }
    if (!this._iParamsParamData) {
        this._iParamsParamData = [];
    }
    if (!this._iParamsParamData[viewerName]) {
        this._iParamsParamData[viewerName] = [];
    }
    this._iParamsPromptUnitData[viewerName][promptUnitID] = promptData;
    for (var i = 0, len = paramNames.length; i < len; i++) {
        var paramName = paramNames[i];
        this._iParamsParamData[viewerName][paramName] = promptUnitID;
    }
};
bobj.crv.params.FlexParameterUI.getSWF = function (viewerName) {
    if (!this._swfID || !this._swfID[viewerName]) {
        return;
    }
    if (!this._swf) {
        this._swf = [];
    }
    if (this._swf[viewerName]) {
        return this._swf[viewerName];
    } else {
        var swf = document.getElementById(this._swfID[viewerName]);
        if (!swf) {
            return;
        }
        this._swf[viewerName] = swf;
        return swf;
    }
};
bobj.crv.params.FlexParameterUI.getInstallHTML = function () {
    return L_bobj_crv_FlashRequired.replace("{0}", "<br><a href='http://www.adobe.com/go/getflash/' target='_blank'>") + "</a>";
};
bobj.crv.params.FlexParameterUI.checkFlashPlayer = function () {
    return swfobject.hasFlashPlayerVersion("9.0.0");
};
bobj.crv.params.FlexParameterUI.createSWF = function (viewerName, divID, servletURL, isIParamDialog) {
    if (!this._swfID) {
        this._swfID = [];
    }
    bobj.crv.logger.info("Create the SWF");
    if (this.checkFlashPlayer()) {
        var lang = bobj.crv.getLangCode();
        var swfBaseURL = bobj.crvUri("../../swf/");
        var swfPath = swfBaseURL + "prompting.swf";
        var swfID = bobj.uniqueId();
        var flashvars = {
            "eventTarget": viewerName,
            "locale": lang,
            "isIParamDialog": isIParamDialog,
            "baseURL": swfBaseURL,
            "servletURL": servletURL
        };
        var params = {menu: "false", wmode: "transparent", allowscriptaccess: "sameDomain"};
        var attributes = {id: swfID, name: swfID, style: "z-index:" + bobj.constants.modalLayerIndex};
        if (!(_ie || _ie11Up)) {
            document.getElementById(divID).parentNode.style.visibility = "hidden";
        }
        swfobject.embedSWF(swfPath, divID, "360", "50", "9.0.0", "", flashvars, params, attributes);
        this._swfID[viewerName] = swfID;
        var v = getWidgetFromID(viewerName);
        if (v && v._reportProcessing) {
            v._reportProcessing.delayedShow(false);
        }
    } else {
        document.getElementById(divID).innerHTML = "<p>" + this.getInstallHTML() + "</p>";
    }
};
bobj.crv.params.FlexParameterUI.init = function (viewerName) {
    if (!viewerName || !this._swfID || !this._swfID[viewerName]) {
        return;
    }
    bobj.crv.logger.info("Init the SWF");
    var swf = this.getSWF(viewerName);
    if (!swf) {
        return;
    }
    var v = getWidgetFromID(viewerName);
    if (v && v._reportProcessing) {
        v._reportProcessing.cancelShow();
    }
    if (swf.setStateInfo) {
        var toJSON = MochiKit.Base.serializeJSON;
        swf.setStateInfo(encodeURIComponent(toJSON(bobj.crv.stateManager.getCompositeState())));
    }
    if (swf.setIdealHeight) {
        var lTypes = bobj.crv.Viewer.LayoutTypes;
        var layout = lTypes.CLIENT;
        if (this._viewerLayoutType && this._viewerLayoutType[viewerName]) {
            layout = this._viewerLayoutType[viewerName];
        }
        var lDim = MochiKit.Style.getElementDimensions(getLayer(viewerName));
        var min = layout === lTypes.FIXED ? 0 : 400;
        swf.setIdealHeight(Math.max(min, lDim.h - 20));
    }
    if (this._currentIParam && this._currentIParam[viewerName]) {
        if (!this._iParamsParamData || !this._iParamsParamData[viewerName] || !this._iParamsPromptUnitData || !this._iParamsPromptUnitData[viewerName]) {
            this.setPromptData(viewerName, null);
        } else {
            var promptUUID = this._iParamsParamData[viewerName][this._currentIParam[viewerName].paramName];
            if (!promptUUID) {
                this.setPromptData(viewerName, null);
            }
            var promptData = this._iParamsPromptUnitData[viewerName][promptUUID];
            this.setPromptData(viewerName, promptData);
        }
    }
    if (this._promptData && this._promptData[viewerName] && swf.setPromptData) {
        swf.setPromptData(this._promptData[viewerName]);
    }
};
bobj.crv.params.FlexParameterUI.setIParamValues = function (viewerName, isCascading, vals, updatedXMLData) {
    if (!this._paramCtrl || !this._currentIParam || !this._iParamsParamData || !this._iParamsPromptUnitData) {
        return;
    }
    var cParam = this._currentIParam[viewerName];
    var pCtrl = this._paramCtrl[viewerName];
    var pData = this._iParamsParamData[viewerName];
    var pUnitData = this._iParamsPromptUnitData[viewerName];
    if (!cParam || !pCtrl || !pData || !pUnitData) {
        return;
    }
    var cParamName = cParam.paramName;
    if (isCascading) {
        for (var i = 0, len = vals.length; i < len; i++) {
            var value = vals[i];
            if (!value.name || !value.values) {
                continue;
            }
            pCtrl.updateParameter(value.name, value.values);
        }
    } else {
        pCtrl.updateParameter(cParamName, vals);
    }
    pCtrl._updateToolbar();
    var uid = pData[cParamName];
    if (uid) {
        pUnitData[uid] = updatedXMLData;
    }
    this.closeIParamDialog(viewerName);
};
bobj.crv.params.FlexParameterUI.closeIParamDialog = function (viewerName) {
    if (this._closeDialogCallBack && this._closeDialogCallBack[viewerName]) {
        this._closeDialogCallBack[viewerName]();
    }
};
bobj.crv.params.FlexParameterUI.resize = function (viewerName, height, width) {
    var swf = this.getSWF(viewerName);
    if (swf) {
        bobj.crv.logger.info("Resizing the SWF h:" + height + " w:" + width);
        swf.style.width = width + "px";
        swf.style.height = height + "px";
        var P_STYLE = swf.parentNode.style;
        P_STYLE.position = "absolute";
        P_STYLE.visibility = "visible";
    }
};
bobj.crv.params.FlexParameterUI.center = function (viewerName, wOnly) {
    var swf = this.getSWF(viewerName);
    if (swf) {
        var LOG = bobj.crv.logger;
        LOG.info("Centering the SWF");
        var l = getLayer(viewerName);
        if (!l) {
            LOG.error("Could not find the viewer:" + viewerName);
            return;
        }
        var vPos = MochiKit.Style.getElementPosition(l);
        var vDim = MochiKit.Style.getElementDimensions(l);
        var sDim = MochiKit.Style.getElementDimensions(swf);
        var P_STYLE = swf.parentNode.style;
        if (!wOnly) {
            P_STYLE.top = Math.max(vPos.y, vPos.y + (vDim.h / 2) - (sDim.h / 2)) + "px";
        } else {
            P_STYLE.top = (vPos.y + 10) + "px";
        }
        P_STYLE.left = Math.max(vPos.x, vPos.x + (vDim.w / 2) - (sDim.w / 2)) + "px";
        if (swf.focus != undefined) {
            swf.focus();
        }
    }
};
bobj.crv.params.FlexParameterUI.startMove = function (viewerName) {
    var swf = this.getSWF(viewerName);
    if (swf) {
        if (this._moveArea) {
            return;
        }
        this._moveArea = document.createElement("div");
        this._moveArea.id = bobj.uniqueId();
        MOVE_STYLE = this._moveArea.style;
        var STYLE = swf.style;
        var P_STYLE = swf.parentNode.style;
        MOVE_STYLE.top = P_STYLE.top;
        MOVE_STYLE.left = P_STYLE.left;
        MOVE_STYLE.width = STYLE.width;
        MOVE_STYLE.height = STYLE.height;
        MOVE_STYLE.border = "1px";
        MOVE_STYLE.borderStyle = "solid";
        MOVE_STYLE.borderColor = "#000000";
        MOVE_STYLE.backgroundColor = "#FFFFFF";
        MOVE_STYLE.position = "absolute";
        MOVE_STYLE.opacity = 0.5;
        MOVE_STYLE.filter = "alpha(opacity=50)";
        MOVE_STYLE.zIndex = bobj.constants.modalLayerIndex - 1;
        document.body.appendChild(this._moveArea);
        document.body.style.cursor = "move";
    }
};
bobj.crv.params.FlexParameterUI.stopMove = function (viewerName) {
    var swf = this.getSWF(viewerName);
    if (swf) {
        var pos = MochiKit.Style.getElementPosition(this._moveArea);
        MochiKit.Style.setElementPosition(swf.parentNode, pos);
        document.body.removeChild(this._moveArea);
        delete this._moveArea;
        document.body.style.cursor = "default";
    }
};
bobj.crv.params.FlexParameterUI.Move = function (viewerName, x, y) {
    var swf = this.getSWF(viewerName);
    if (swf) {
        var LOG = bobj.crv.logger;
        LOG.info("doMove Called viewer:" + viewerName + " x:" + x + " y:" + y);
        var l = getLayer(viewerName);
        if (!l) {
            LOG.error("Shifting SWF could not find the viewer:" + viewerName);
            return;
        }
        var m = this._moveArea;
        if (!m) {
            LOG.error("Unable to move SWF, no move area available");
            return;
        }
        var mX = m.offsetLeft;
        var mY = m.offsetTop;
        var mH = m.offsetHeight;
        var mW = m.offsetWidth;
        var vX = l.offsetLeft;
        var vY = l.offsetTop;
        var vH = l.offsetHeight;
        var vW = l.offsetWidth;
        var newX = mX + x;
        var newY = mY + y;
        if (newY < vY) {
            newY = vY;
        } else {
            if (newY + mH > vY + vH) {
                newY = vH - mH;
            }
        }
        if (newX < vX) {
            newX = vX;
        } else {
            if (newX + mW > vX + vW) {
                newX = vW - mW;
            }
        }
        m.style.top = newY + "px";
        m.style.left = newX + "px";
        LOG.info("Moved the SWF to x:" + newX + " y:" + newY);
    }
};
bobj.crv.params.FlexParameterUI.setParamValues = function (viewerName, paramData) {
    bobj.crv.logger.info("setting parameter values");
    bobj.event.publish("crprompt_flexparam", viewerName, paramData);
};
bobj.crv.params.FlexParameterUI.logon = function (viewerName, logonData) {
    bobj.crv.logger.info("logging on");
    bobj.event.publish("crprompt_flexlogon", viewerName, logonData);
};
bobj.crv.params.ViewerParameterAdapter = {
    _viewerLayoutType: [],
    _promptData: [],
    _paramCtrl: [],
    _iParam: [],
    _iPromptUnitData: [],
    _iParamData: [],
    _moveArea: null,
    setViewerLayoutType: function (id, l) {
        this._viewerLayoutType[id] = l;
    },
    setPromptData: function (id, d, forIParams) {
        if (!forIParams) {
            this._promptData[id] = d;
            this.clearIParamPromptUnitData(id);
        } else {
            for (var i = 0, l = d.length; i < l; i++) {
                var unit = d[i];
                this._addIParamPromptUnitData(id, unit.id, unit.names, unit.data);
            }
        }
    },
    setCurrentIParamInfo: function (id, c, p) {
        this._paramCtrl[id] = c;
        this._iParam[id] = p;
    },
    getShowMinUI: function (id) {
        return this.hasIParamPromptUnitData(id);
    },
    getWidth: function (id) {
        if (this.hasIParamPromptUnitData(id)) {
            return 300;
        } else {
            return this.getObjWidth(id);
        }
    },
    getHeight: function (id) {
        if (this.hasIParamPromptUnitData(id)) {
            return 315;
        } else {
            return this.getObjHeight(id);
        }
    },
    getScreenHeight: function (id) {
        var lDim = MochiKit.Style.getElementDimensions(getLayer(id));
        return lDim.h - 2;
    },
    getScreenWidth: function (id) {
        var lDim = MochiKit.Style.getElementDimensions(getLayer(id));
        return lDim.w - 2;
    },
    getObjHeight: function (id) {
        var lTypes = bobj.crv.Viewer.LayoutTypes;
        var layout = lTypes.CLIENT;
        if (this._viewerLayoutType[id]) {
            layout = this._viewerLayoutType[id];
        }
        var min = layout === lTypes.FIXED ? 0 : 480;
        var sH = this.getScreenHeight(id);
        return Math.max(min, sH - 200);
    },
    getObjWidth: function (id) {
        var sW = this.getScreenWidth(id);
        return Math.min(600, sW - 20);
    },
    getAllowFullScreen: function (id) {
        return !this.hasIParamPromptUnitData(id);
    },
    hasIParamPromptUnitData: function (id) {
        return (this._iPromptUnitData[id] != null) && (this._iParamData[id] != null) && (this._iParam[id] != null);
    },
    getDisableEncoding: function (id) {
        if (this.hasIParamPromptUnitData(id)) {
            return true;
        } else {
            return false;
        }
    },
    _addIParamPromptUnitData: function (id, unitID, names, data) {
        if (!this.hasIParamPromptUnitData(id)) {
            this._iPromptUnitData[id] = [];
            this._iParamData[id] = [];
        }
        this._iPromptUnitData[id][unitID] = data;
        for (var i = 0, len = names.length; i < len; i++) {
            this._iParamData[id][names[i]] = unitID;
        }
    },
    clearIParamPromptUnitData: function (id) {
        if (!this.hasIParamPromptUnitData(id)) {
            return;
        }
        delete this._iPromptUnitData[id];
        delete this._iParamData[id];
        delete this._iParam[id];
    },
    getPromptData: function (id) {
        if (this.hasIParamPromptUnitData(id)) {
            var promptUUID = this._iParamData[id][this._iParam[id].paramName];
            if (promptUUID) {
                return this._iPromptUnitData[id][promptUUID];
            }
        }
        return this._promptData[id];
    },
    startDrag: function (id) {
        var obj = bobj.crv.params.ParameterBridge.getDomObj(id);
        if (obj) {
            if (this._moveArea) {
                return;
            }
            this._moveArea = document.createElement("div");
            this._moveArea.id = bobj.uniqueId();
            MOVE_STYLE = this._moveArea.style;
            var STYLE = obj.style;
            var P_STYLE = obj.parentNode.style;
            MOVE_STYLE.top = P_STYLE.top;
            MOVE_STYLE.left = P_STYLE.left;
            MOVE_STYLE.width = STYLE.width ? STYLE.width : obj.width + "px";
            MOVE_STYLE.height = STYLE.height ? STYLE.height : obj.height + "px";
            MOVE_STYLE.border = "1px";
            MOVE_STYLE.borderStyle = "solid";
            MOVE_STYLE.borderColor = "#000000";
            MOVE_STYLE.backgroundColor = "#FFFFFF";
            MOVE_STYLE.position = "absolute";
            MOVE_STYLE.opacity = 0.5;
            MOVE_STYLE.filter = "alpha(opacity=50)";
            MOVE_STYLE.zIndex = bobj.constants.modalLayerIndex - 1;
            document.body.appendChild(this._moveArea);
            document.body.style.cursor = "move";
        }
    },
    stopDrag: function (id) {
        if (this._moveArea) {
            var p = MochiKit.Style.getElementPosition(this._moveArea);
            this.move(id, p.x, p.y);
            document.body.removeChild(this._moveArea);
            delete this._moveArea;
            document.body.style.cursor = "default";
        }
    },
    drag: function (id, x, y) {
        var LOG = bobj.crv.logger;
        LOG.info("doMove Called viewer:" + id + " x:" + x + " y:" + y);
        var l = getLayer(id);
        if (!l) {
            LOG.error("Shifting SWF could not find the viewer:" + id);
            return;
        }
        var m = this._moveArea;
        if (!m) {
            LOG.error("Unable to move SWF, no move area available");
            return;
        }
        var mX = m.offsetLeft;
        var mY = m.offsetTop;
        var mH = m.offsetHeight;
        var mW = m.offsetWidth;
        var vX = l.offsetLeft;
        var vY = l.offsetTop;
        var vH = l.offsetHeight;
        var vW = l.offsetWidth;
        var newX = mX + x;
        var newY = mY + y;
        if (newY < vY) {
            newY = vY;
        } else {
            if (newY + mH > vY + vH) {
                newY = vH - mH;
            }
        }
        if (newX < vX) {
            newX = vX;
        } else {
            if (newX + mW > vX + vW) {
                newX = vW - mW;
            }
        }
        m.style.top = newY + "px";
        m.style.left = newX + "px";
        LOG.info("Moved the SWF to x:" + newX + " y:" + newY);
    },
    move: function (id, x, y) {
        var obj = bobj.crv.params.ParameterBridge.getDomObj(id);
        if (obj) {
            var p = new MochiKit.Style.Coordinates(x, y);
            MochiKit.Style.setElementPosition(obj.parentNode, p);
        }
    },
    setParamValues: function (id, valueData) {
        bobj.crv.logger.info("setting parameter values");
        if (this.hasIParamPromptUnitData(id)) {
            this._setIParamValues(id, valueData);
        } else {
            this._setFullParamValues(id, valueData);
            this.closeDialog(id);
        }
    },
    _setFullParamValues: function (id, valueData) {
        bobj.event.publish("crprompt_ngparam", id, valueData);
    },
    _setIParamValues: function (id, valueData) {
        var param = this._iParam[id];
        var ctrl = this._paramCtrl[id];
        var data = this._iParamData[id];
        var unitData = this._iPromptUnitData[id];
        if (!param || !ctrl || !data || !unitData || valueData.length != 1) {
            return;
        }
        var vPromptUnit = valueData[0];
        var vPrompts = vPromptUnit.prompts;
        for (var i = 0, len = vPrompts.length; i < len; i++) {
            var vPrompt = vPrompts[i];
            if (!vPrompt || !vPrompt.name || !vPrompt.values) {
                continue;
            }
            ctrl.updateParameter(decodeURI(vPrompt.name), this._convertValues(vPrompt, param.valueDataType));
        }
        ctrl._updateToolbar();
        this._updatePromptData(id, vPromptUnit, param.valueDataType);
        this.closeDialog(id);
    },
    _updatePromptData: function (id, newUnitData, type) {
        var newPrompts = newUnitData.prompts;
        var data = this._iPromptUnitData[id][newUnitData.id];
        var unitData = data.promptUnits[0];
        var prompts = unitData.prompts;
        for (var i = 0, pLen = prompts.length; i < pLen; i++) {
            var prompt = prompts[i];
            for (var j = 0, npLen = newPrompts.length; j < npLen; j++) {
                var newPrompt = newPrompts[j];
                if (prompt.id == newPrompt.id) {
                    prompt.values = this._unescapeValues(newPrompt.values, type);
                    break;
                }
            }
        }
    },
    _unescapeValues: function (fValues, type) {
        if (type != bobj.crv.params.DataTypes.STRING && type != bobj.crv.params.DataTypes.MEMBER) {
            return fValues;
        }
        for (var i = 0, len = fValues.length; i < len; i++) {
            this._unescapeValue(fValues[i], type);
        }
        return fValues;
    },
    _unescapeValue: function (fValue, type) {
        if (type != bobj.crv.params.DataTypes.STRING && type != bobj.crv.params.DataTypes.MEMBER) {
            return;
        }
        var path = fValue.path;
        if (path !== undefined && path.values !== undefined) {
            for (var i = 0, valuesLen = path.values.length; i < valuesLen; i++) {
                var pathValue = path.values[i];
                if (pathValue !== undefined && pathValue.value !== undefined) {
                    pathValue.value = decodeURI(pathValue.value);
                    if (pathValue.labels !== undefined) {
                        for (var j = 0, labelsLen = pathValue.labels.length; j < labelsLen; j++) {
                            pathValue.labels[j] = decodeURI(pathValue.labels[j]);
                        }
                    }
                }
            }
        }
        if ((fValue.value !== undefined && fValue.value !== null)) {
            fValue.value = decodeURI(fValue.value);
            if (fValue.labels !== undefined && fValue.labels !== null) {
                for (var i = 0, len = fValue.labels.length; i < len; i++) {
                    fValue.labels[i] = decodeURI(fValue.labels[i]);
                }
            }
        } else {
            if (fValue.start) {
                this._unescapeValue(fValue.start, type);
            }
            if (fValue.end) {
                this._unescapeValue(fValue.end, type);
            }
        }
    },
    _getDescriptionIndex: function (prompt) {
        var vIndex = prompt.lovValueIndex;
        var types = prompt.lovFieldTypes;
        if (vIndex !== undefined && types !== undefined) {
            for (var i = 0, len = types.length; i < len; i++) {
                if (i != vIndex && types[i] == "s") {
                    return i;
                }
            }
        }
        return -1;
    },
    _convertValues: function (prompt, type) {
        var dIndex = this._getDescriptionIndex(prompt);
        var fValues = prompt.values;
        var jsValues = [];
        if (prompt.isNull) {
            jsValues.push(null);
        } else {
            for (var i = 0, len = fValues.length; i < len; i++) {
                jsValues.push(this._convertValue(fValues[i], type, dIndex));
            }
        }
        return jsValues;
    },
    _convertValue: function (fValue, type, dIndex) {
        var jsValue = {};
        if ((fValue.value !== undefined && fValue.value !== null)) {
            var Type = bobj.crv.params.DataTypes;
            switch (type) {
                case Type.DATE:
                case Type.TIME:
                case Type.DATE_TIME:
                    jsValue = this._convertDateTimeValue(fValue.value, type);
                    break;
                default:
                    jsValue = decodeURI(fValue.value);
                    break;
            }
        } else {
            if (fValue.start) {
                jsValue.lowerBoundType = fValue.start.inc == true ? 2 : 1;
                jsValue.beginValue = this._convertValue(fValue.start, type, -1);
            } else {
                jsValue.lowerBoundType = 0;
            }
            if (fValue.end) {
                jsValue.upperBoundType = fValue.end.inc == true ? 2 : 1;
                jsValue.endValue = this._convertValue(fValue.end, type, -1);
            } else {
                jsValue.upperBoundType = 0;
            }
        }
        return jsValue;
    },
    _convertDateTimeValue: function (fValue, type) {
        var Type = bobj.crv.params.DataTypes;
        var dValue = {};
        var parts = fValue.split(",");
        switch (type) {
            case Type.DATE:
                dValue.y = parseInt(parts[0].substring(5), 10);
                dValue.m = parseInt(parts[1], 10) - 1;
                dValue.d = parseInt(parts[2].substring(parts[2].length - 1, 0), 10);
                break;
            case Type.TIME:
                dValue.h = parseInt(parts[0].substring(5), 10);
                dValue.min = parseInt(parts[1], 10);
                dValue.s = parseInt(parts[2].substring(parts[2].length - 1, 0), 10);
                dValue.ms = 0;
                break;
            case Type.DATE_TIME:
                dValue.y = parseInt(parts[0].substring(9), 10);
                dValue.m = parseInt(parts[1], 10) - 1;
                dValue.d = parseInt(parts[2], 10);
                dValue.h = parseInt(parts[3], 10);
                dValue.min = parseInt(parts[4]);
                dValue.s = parseInt(parts[5].substring(parts[5].length - 1, 0), 10);
                dValue.ms = 0;
                break;
        }
        return dValue;
    },
    logon: function (id, logonData) {
        bobj.crv.logger.info("logging on");
        this.closeDialog(id);
        bobj.event.publish("crprompt_nglogon", id, logonData);
    },
    processingCancel: function (id) {
        var v = getWidgetFromID(id);
        if (v && v._reportProcessing) {
            v._reportProcessing.cancelShow();
        }
    },
    processingDelayedShow: function (id) {
        var v = getWidgetFromID(id);
        if (v && v._reportProcessing) {
            v._reportProcessing.delayedShow();
        }
    },
    logger: function (text) {
        bobj.crv.logger.info(text);
    },
    getSWFBaseURL: function () {
        return bobj.crvUri("../../swf/");
    },
    getDomId: function () {
        return bobj.uniqueId();
    },
    getZIndex: function () {
        return bobj.constants.modalLayerIndex;
    },
    getUseSavedData: function (id) {
        return this.hasIParamPromptUnitData(id);
    },
    closeDialog: function (id) {
        var v = getWidgetFromID(id);
        if (v) {
            v.hideNextGenPromptDialog();
        }
    },
    getUseOKCancelButtons: function (id) {
        return this.hasIParamPromptUnitData(id);
    },
    getIsDialog: function (id) {
        return true;
    },
    getShouldAutoResize: function (id) {
        return true;
    },
    setVisibility: function (id) {
        var obj = bobj.crv.params.ParameterBridge.getDomObj(id);
        if (obj) {
            var P_STYLE = obj.parentNode.style;
            P_STYLE.position = "absolute";
            P_STYLE.visibility = "visible";
            P_STYLE.borderStyle = "none";
            P_STYLE.opacity = 1;
            P_STYLE.backgroundColor = "#FFFFFF";
            if (obj.focus !== undefined) {
                obj.focus();
            }
        }
    },
    getReportStateInfo: function (id) {
        var s = bobj.crv.stateManager.getComponentState(id);
        if (s && s.common && s.common.reqCtx) {
            return MochiKit.Base.serializeJSON(s.common.reqCtx);
        }
    },
    setReportStateInfo: function (id, rsInfo) {
        var s = bobj.crv.stateManager.getComponentState(id);
        if (s && s.common && s.common.reqCtx) {
            s.common.reqCtx = MochiKit.Base.evalJSON(unescape(rsInfo));
        }
    },
    sendAsyncRequest: function (id, args) {
        bobj.event.publish("crprompt_asyncrequest", id, args);
    },
    readyToShow: function (id) {
        this.processingCancel(id);
    }
};
if (typeof (bobj) == "undefined") {
    bobj = {};
}
if (typeof (bobj.crv) == "undefined") {
    bobj.crv = {};
}
if (typeof (bobj.crv.params) == "undefined") {
    bobj.crv.params = {};
}
bobj.crv.params.ParameterBridge = {
    _domObjID: [],
    _domObj: [],
    _cb: [],
    _isRTL: false,
    _isInitializing: undefined,
    _promptData: [],
    _viewerType: "",
    setPromptData: function (id, d) {
        this._promptData[id] = d;
    },
    setMasterCallBack: function (viewerName, callBack) {
        this._cb[viewerName] = callBack;
    },
    getDomObj: function (viewerName) {
        if (this._domObj[viewerName]) {
            return this._domObj[viewerName];
        } else {
            var obj = document.getElementById(this._domObjID[viewerName]);
            this._domObj[viewerName] = obj;
            return obj;
        }
    },
    clearDomObj: function (viewerName) {
        if (this._domObj[viewerName]) {
            this._domObjID[viewerName] = null;
            this._domObj[viewerName] = null;
        }
    },
    getInstallHTML: function () {
        return L_bobj_crv_FlashRequired.replace("{0}", "<br><a href='http://www.adobe.com/go/getflash/' target='_blank'>") + "</a>";
    },
    checkFlashPlayer: function () {
        return swfobject.hasFlashPlayerVersion("11.0.0");
    },
    createDomObj: function (viewerName, divID, servletURL, showMinUI, locale, rptSrcKey, isRTL, isInitializing, promptingType, viewerType, promptType) {
        this._isRTL = isRTL;
        this._isInitializing = isInitializing;
        var cb = this._cb[viewerName];
        if (!cb) {
            return;
        }
        if (typeof (promptingType) == "undefined") {
            promptingType = "flex";
        }
        var domId = cb.getDomId();
        var useSavedData = cb.getUseSavedData ? cb.getUseSavedData(viewerName) : false;
        var useOKCancelButtons = cb.getUseOKCancelButtons ? cb.getUseOKCancelButtons(viewerName) : false;
        var isDialog = cb.getIsDialog ? cb.getIsDialog(viewerName) : false;
        var allowFullScreen = cb.getAllowFullScreen ? cb.getAllowFullScreen(viewerName) : false;
        var enforceRequiredPrompt = cb.getEnforceRequiredPrompt ? cb.getEnforceRequiredPrompt() : true;
        var shouldAutoResize = cb.getShouldAutoResize ? cb.getShouldAutoResize(viewerName) : false;
        var isIPIONT = viewerType == "dotnetcaf";
        if (promptingType == "flex") {
            if (cb.logger) {
                cb.logger("Create the SWF");
            }
            if (this.checkFlashPlayer()) {
                var swfBaseURL = cb.getSWFBaseURL();
                var swfPath = swfBaseURL + "prompting.swf";
                var flashvars = {
                    "eventTarget": viewerName,
                    "locale": locale,
                    "showMinUI": showMinUI,
                    "baseURL": swfBaseURL,
                    "servletURL": servletURL,
                    "reportSourceKey": rptSrcKey,
                    "useSavedData": useSavedData,
                    "useOKCancelButtons": useOKCancelButtons,
                    "isDialog": isDialog,
                    "allowFullScreen": allowFullScreen,
                    "enforceRequiredPrompt": enforceRequiredPrompt,
                    "shouldAutoResize": shouldAutoResize,
                    "isRTL": isRTL
                };
                var params = {menu: "false", wmode: "window", AllowScriptAccess: "always"};
                var attributes = {id: domId, name: domId, style: "z-index:" + cb.getZIndex()};
                if (cb.processingDelayedShow) {
                    cb.processingDelayedShow("hidden", divID);
                }
                var h = cb.getObjHeight ? cb.getObjHeight(viewerName) + "" : "600";
                var w = cb.getObjWidth ? cb.getObjWidth(viewerName) + "" : "800";
                swfobject.embedSWF(swfPath, divID, w, h, "11.0.0", "", flashvars, params, attributes);
                this._domObjID[viewerName] = domId;
                if (cb.processingDelayedShow) {
                    cb.processingDelayedShow();
                }
                this.resize(viewerName, 6, 6, false);
                this.move(viewerName, 1, 1);
            } else {
                document.getElementById(divID).innerHTML = "<p>" + cb.getInstallHTML() + "</p>";
            }
        } else {
            if (promptingType == "ui5") {
                this._viewerType = viewerType;
                sap.ui.getCore().attachInit(function () {
                    var loadPrompt = function () {
                        if (cb.logger) {
                            cb.logger("Create UI5 container");
                        }
                        var oI18nModel = new sap.ui.model.resource.ResourceModel({
                            bundleUrl: bobj.crvUri("../ui5prompting/resources/prompting.properties"),
                            bundleLocale: locale
                        });
                        var oResourceBundle = oI18nModel.getResourceBundle();
                        sap.ui.getCore().setModel(oResourceBundle, "ui5ResourceBundle");
                        sap.ui.getCore().getConfiguration().setRTL(this._isRTL);
                        sap.ui.getCore().getConfiguration().setLanguage(locale);
                        jQuery.sap.registerModulePath("ui5prompting", bobj.crvUri("../ui5prompting"));
                        jQuery.sap.require("sap.ui.core.Popup");
                        jQuery.sap.require("ui5prompting.utils.UI5Polyfill");
                        jQuery.sap.require("ui5prompting.views.PromptDialog");
                        jQuery.sap.require("ui5prompting.views.LogonDialog");
                        sap.ui.core.Popup.setInitialZIndex(cb.getZIndex());
                        if (cb.processingDelayedShow) {
                            cb.processingDelayedShow("hidden", divID);
                        }
                        var dialog;
                        if (promptType == "logon") {
                            dialog = new ui5prompting.views.LogonDialog(domId, {
                                adaptor: cb,
                                viewerName: viewerName,
                                viewerType: viewerType,
                                rptSrcKey: rptSrcKey,
                                servletURL: servletURL,
                                onCommit: function (viewerName, logonData) {
                                    this.logon(viewerName, logonData);
                                }.bind(this),
                                afterClose: function () {
                                    if (!isIPIONT) {
                                        this.closeDialog(viewerName);
                                    }
                                }.bind(this),
                                afterOpen: function () {
                                    var h = cb.getObjHeight ? cb.getObjHeight(viewerName) + "" : "600";
                                    var w = cb.getObjWidth ? cb.getScreenWidth(viewerName) + "" : "800";
                                    setTimeout(function () {
                                        this.resize(viewerName, h, w, true);
                                    }.bind(this), 200);
                                    if (!isDialog && isIPIONT) {
                                        dialog.parentNode.parentNode.style.height = h;
                                        dialog.parentNode.parentNode.style.width = w;
                                        dialog.parentNode.parentNode.style.position = "relative";
                                    }
                                }.bind(this)
                            });
                        } else {
                            dialog = new ui5prompting.views.PromptDialog(domId, {
                                adaptor: cb,
                                viewerName: viewerName,
                                viewerType: viewerType,
                                rptSrcKey: rptSrcKey,
                                servletURL: servletURL,
                                afterClose: function () {
                                    if (!isIPIONT) {
                                        this.closeDialog(viewerName);
                                    }
                                }.bind(this),
                                afterOpen: function () {
                                    var h = cb.getObjHeight ? cb.getObjHeight(viewerName) + "" : "600";
                                    var w = cb.getObjWidth ? cb.getScreenWidth(viewerName) + "" : "800";
                                    setTimeout(function () {
                                        this.resize(viewerName, h, w, true);
                                    }.bind(this), 200);
                                    if (!isDialog && isIPIONT) {
                                        dialog.parentNode.parentNode.style.height = h;
                                        dialog.parentNode.parentNode.style.width = w;
                                        dialog.parentNode.parentNode.style.position = "relative";
                                    }
                                }.bind(this)
                            });
                        }
                        dialog.parentNode = document.getElementById(divID);
                        this._domObjID[viewerName] = domId;
                        this._domObj[viewerName] = dialog;
                        if (cb.processingDelayedShow) {
                            cb.processingDelayedShow();
                        }
                        dialog.open();
                    };
                    if (bobj.crv.config.resources) {
                        bobj.loadJSResourceAndExecCallBack(bobj.crv.config.resources.ParameterControllerAndDeps, loadPrompt.bind(this));
                    } else {
                        jQuery.sap.registerModulePath("external", bobj.crvUri("../external"));
                        jQuery.sap.registerModulePath("crviewer", bobj.crvUri("../crviewer"));
                        jQuery.sap.registerModulePath("MochiKit", bobj.crvUri("../MochiKit"));
                        jQuery.sap.require("external.date");
                        jQuery.sap.require("crviewer.ParameterController");
                        jQuery.sap.require("crviewer.Parameter");
                        jQuery.sap.require("MochiKit.Iter");
                        loadPrompt.apply(this);
                    }
                }.bind(this));
            }
        }
    },
    initViewer: function (viewerName, promptingType) {
        this._isInitializing = false;
        this.init(viewerName, promptingType);
    },
    init: function (viewerName, promptingType) {
        if (!viewerName) {
            return;
        }
        var cb = this._cb[viewerName];
        var obj = this.getDomObj(viewerName);
        if (!obj || !cb) {
            return;
        }
        if (promptingType == "flex") {
            var swf = obj;
            if (cb.logger) {
                cb.logger("Init the SWF");
            }
            if (swf.setIsInitializing) {
                swf.setIsInitializing(this._isInitializing);
            }
            if (swf.setShowMinUI && cb.getShowMinUI) {
                swf.setShowMinUI(cb.getShowMinUI(viewerName));
            }
            if (swf.setUseSavedData && cb.getUseSavedData) {
                swf.setUseSavedData(cb.getUseSavedData(viewerName));
            }
            if (swf.setUseOKCancelButtons && cb.getUseOKCancelButtons) {
                swf.setUseOKCancelButtons(cb.getUseOKCancelButtons(viewerName));
            }
            if (swf.setAllowFullScreen && cb.getAllowFullScreen) {
                swf.setAllowFullScreen(cb.getAllowFullScreen(viewerName));
            }
            if (swf.setReportStateInfo && cb.getReportStateInfo) {
                swf.setReportStateInfo(cb.getReportStateInfo(viewerName));
            }
            if (swf.setPromptData) {
                if (cb.getPromptData && cb.getPromptData(viewerName)) {
                    swf.setPromptData(cb.getPromptData(viewerName));
                } else {
                    swf.setPromptData(this._promptData[viewerName]);
                }
            }
            if (cb.getShouldAutoResize && cb.getShouldAutoResize(viewerName)) {
                if (this._isInitializing == false) {
                    cb.setVisibility(viewerName);
                }
            } else {
                if (cb.getObjHeight && cb.getObjWidth) {
                    this.resize(viewerName, cb.getObjHeight(viewerName), cb.getObjWidth(viewerName), true);
                }
            }
        } else {
            if (promptingType == bobj.crv.Viewer.PromptingTypes.UI5) {
                sap.ui.getCore().attachInit(function () {
                    obj.open();
                }.bind(this));
            }
        }
    },
    closeDialog: function (viewerName) {
        var cb = this._cb[viewerName];
        if (cb && cb.closeDialog) {
            cb.closeDialog(viewerName);
        }
    },
    resize: function (viewerName, height, width, shouldCenter, fitToScreen) {
        var domObj = this.getDomObj(viewerName);
        var cb = this._cb[viewerName];
        if (domObj && cb) {
            cb.logger("Resizing the SWF h:" + height + " w:" + width);
            if (cb.getScreenHeight && cb.getScreenWidth) {
                var screenHeight = cb.getScreenHeight(viewerName);
                var screenWidth = cb.getScreenWidth(viewerName);
                var p = MochiKit.Style.getElementPosition(domObj.parentNode);
                if (width > screenWidth) {
                    width = screenWidth;
                }
                if (!shouldCenter && !fitToScreen) {
                    if (this._isRTL) {
                        var widthInc = width - domObj.parentNode.offsetWidth;
                        var x = p.x - widthInc;
                        var vX = 0;
                        if (getLayer) {
                            var l = getLayer(viewerName);
                            if (l) {
                                vX = l.offsetLeft;
                            }
                        }
                        if (x < vX) {
                            width += (x - vX);
                            x = vX;
                        }
                        if (x != p.x) {
                            domObj.parentNode.style.left = x + "px";
                        }
                    } else {
                        if ((p.x >= 0) && ((p.x + width) >= screenWidth)) {
                            width = screenWidth - p.x;
                        }
                    }
                }
                if ((p.y >= 0) && ((p.y + height) >= screenHeight) && !shouldCenter) {
                    height = screenHeight - p.y;
                } else {
                    if (height > screenHeight) {
                        height = screenHeight;
                    }
                }
                if (height < 0) {
                    height = 1;
                }
            }
            if (shouldCenter) {
                this.move(viewerName, ((screenWidth - width) / 2), ((screenHeight - height) / 2));
            }
            if (domObj.setWidth && domObj.setHeight) {
                domObj.setWidth(width);
                domObj.setHeight(height);
            }
            if (domObj.style) {
                domObj.style.width = width + "px";
                domObj.style.height = height + "px";
            }
            cb.setVisibility(viewerName);
            domObj._isMaximized = false;
            if (cb.resize) {
                cb.resize();
            }
        }
    },
    fitScreen: function (viewerName) {
        var domObj = this.getDomObj(viewerName);
        var cb = this._cb[viewerName];
        if (domObj && cb && cb.getScreenHeight && cb.getScreenWidth && domObj.setHeight && domObj.setWidth) {
            cb.logger("Fitting SWF to the screen");
            var h = cb.getScreenHeight(viewerName);
            var w = cb.getScreenWidth(viewerName);
            this.move(viewerName, 0, 0);
            this.resize(viewerName, h, w, false, true);
            domObj._isMaximized = true;
        }
    },
    startDrag: function (viewerName) {
        var cb = this._cb[viewerName];
        if (cb && cb.startDrag) {
            cb.startDrag(viewerName);
        }
    },
    stopDrag: function (viewerName) {
        var cb = this._cb[viewerName];
        if (cb && cb.stopDrag) {
            cb.stopDrag(viewerName);
        }
    },
    drag: function (viewerName, x, y) {
        var cb = this._cb[viewerName];
        if (cb && cb.drag) {
            cb.drag(viewerName, x, y);
        }
    },
    move: function (viewerName, x, y) {
        var cb = this._cb[viewerName];
        if (cb && cb.move) {
            cb.move(viewerName, x, y);
        }
    },
    setParamValues: function (viewerName, paramData) {
        var cb = this._cb[viewerName];
        if (cb && cb.setParamValues) {
            cb.setParamValues(viewerName, paramData);
        }
    },
    logon: function (viewerName, logonData) {
        var cb = this._cb[viewerName];
        if (cb && cb.logon) {
            cb.logon(viewerName, logonData);
        }
    },
    setReportStateInfo: function (viewerName, rsInfo) {
        var cb = this._cb[viewerName];
        if (cb && cb.setReportStateInfo) {
            cb.setReportStateInfo(viewerName, rsInfo);
        }
    },
    sendAsyncRequest: function (viewerName, args, dotnetCallBack) {
        var cb = this._cb[viewerName];
        if ("dotnet" == this._viewerType) {
            cb.dotnetCallBack = dotnetCallBack;
        }
        if (cb && cb.sendAsyncRequest) {
            cb.sendAsyncRequest(viewerName, args);
        }
    },
    handleAsyncResponse: function (viewerName, args) {
        if ("dotnet" == this._viewerType) {
            var cb = this._cb[viewerName];
            cb.dotnetCallBack(false, args.result);
        } else {
            var domObj = this.getDomObj(viewerName);
            if (domObj && domObj.handleAsyncResponse) {
                domObj.handleAsyncResponse(args);
            }
        }
    },
    readyToShow: function (viewerName) {
        var cb = this._cb[viewerName];
        if (cb && cb.readyToShow) {
            cb.readyToShow(viewerName);
        }
        this._isInitializing = false;
    }
};
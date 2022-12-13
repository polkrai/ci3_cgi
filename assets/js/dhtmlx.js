if (typeof (window.dhx) == "undefined") {

	window.dhx = window.dhx4 = {

		version : "5.1.0",

		skin : null,

		skinDetect : function(a) {

			var b = Math.floor(dhx4.readFromCss(a + "_skin_detect") / 10) * 10;

			return {

				10 : "dhx_skyblue",

				20 : "dhx_web",

				30 : "dhx_terrace",

				40 : "material"

			}[b] || null

		},

		readFromCss : function(c, e, g) {

			var b = document.createElement("DIV");

			b.className = c;

			if (document.body.firstChild != null) {

				document.body.insertBefore(b, document.body.firstChild)

			} else {

				document.body.appendChild(b)

			}

			if (typeof (g) == "string") {

				b.innerHTML = g

			}

			var a = b[e || "offsetWidth"];

			b.parentNode.removeChild(b);

			b = null;

			return a

		},

		lastId : 1,

		newId : function() {

			return this.lastId++

		},

		zim : {

			data : {},

			step : 5,

			first : function() {

				return 100

			},

			last : function() {

				var c = this.first();

				for ( var b in this.data) {

					c = Math.max(c, this.data[b])

				}

				return c

			},

			reserve : function(a) {

				this.data[a] = this.last() + this.step;

				return this.data[a]

			},

			clear : function(a) {

				if (this.data[a] != null) {

					this.data[a] = null;

					delete this.data[a]

				}

			}

		},

		s2b : function(a) {

			if (typeof (a) == "string") {

				a = a.toLowerCase()

			}

			return (a == true || a == 1 || a == "true" || a == "1"

					|| a == "yes" || a == "y" || a == "on")

		},

		s2j : function(s) {

			var obj = null;

			dhx4.temp = null;

			try {

				eval("dhx4.temp=" + s)

			} catch (e) {

				dhx4.temp = null

			}

			obj = dhx4.temp;

			dhx4.temp = null;

			return obj

		},

		absLeft : function(a) {

			if (typeof (a) == "string") {

				a = document.getElementById(a)

			}

			return this.getOffset(a).left

		},

		absTop : function(a) {

			if (typeof (a) == "string") {

				a = document.getElementById(a)

			}

			return this.getOffset(a).top

		},

		_aOfs : function(a) {

			var c = 0, b = 0;

			while (a) {

				c = c + parseInt(a.offsetTop);

				b = b + parseInt(a.offsetLeft);

				a = a.offsetParent

			}

			return {

				top : c,

				left : b

			}

		},

		_aOfsRect : function(e) {

			var j = e.getBoundingClientRect();

			var l = document.body;

			var b = document.documentElement;

			var a = window.pageYOffset || b.scrollTop || l.scrollTop;

			var g = window.pageXOffset || b.scrollLeft || l.scrollLeft;

			var h = b.clientTop || l.clientTop || 0;

			var m = b.clientLeft || l.clientLeft || 0;

			var n = j.top + a - h;

			var c = j.left + g - m;

			return {

				top : Math.round(n),

				left : Math.round(c)

			}

		},

		getOffset : function(a) {

			if (a.getBoundingClientRect) {

				return this._aOfsRect(a)

			} else {

				return this._aOfs(a)

			}

		},

		_isObj : function(a) {

			return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined")

		},

		_copyObj : function(e) {

			if (this._isObj(e)) {

				var c = {};

				for ( var b in e) {

					if (typeof (e[b]) == "object" && e[b] != null) {

						c[b] = this._copyObj(e[b])

					} else {

						c[b] = e[b]

					}

				}

			} else {

				var c = [];

				for (var b = 0; b < e.length; b++) {

					if (typeof (e[b]) == "object" && e[b] != null) {

						c[b] = this._copyObj(e[b])

					} else {

						c[b] = e[b]

					}

				}

			}

			return c

		},

		screenDim : function() {

			var a = (navigator.userAgent.indexOf("MSIE") >= 0);

			var b = {};

			b.left = document.body.scrollLeft;

			b.right = b.left + (window.innerWidth || document.body.clientWidth);

			b.top = Math.max((a ? document.documentElement : document

					.getElementsByTagName("html")[0]).scrollTop,

					document.body.scrollTop);

			b.bottom = b.top

					+ (a ? Math.max(document.documentElement.clientHeight || 0,

							document.documentElement.offsetHeight || 0)

							: window.innerHeight);

			return b

		},

		selectTextRange : function(g, j, b) {

			g = (typeof (g) == "string" ? document.getElementById(g) : g);

			var a = g.value.length;

			j = Math.max(Math.min(j, a), 0);

			b = Math.min(b, a);

			if (g.setSelectionRange) {

				try {

					g.setSelectionRange(j, b)

				} catch (h) {

				}

			} else {

				if (g.createTextRange) {

					var c = g.createTextRange();

					c.moveStart("character", j);

					c.moveEnd("character", b - a);

					try {

						c.select()

					} catch (h) {

					}

				}

			}

		},

		transData : null,

		transDetect : function() {

			if (this.transData == null) {

				this.transData = {

					transProp : false,

					transEv : null

				};

				var c = {

					MozTransition : "transitionend",

					WebkitTransition : "webkitTransitionEnd",

					OTransition : "oTransitionEnd",

					msTransition : "transitionend",

					transition : "transitionend"

				};

				for ( var b in c) {

					if (this.transData.transProp == false

							&& document.documentElement.style[b] != null) {

						this.transData.transProp = b;

						this.transData.transEv = c[b]

					}

				}

				c = null

			}

			return this.transData

		},

		_xmlNodeValue : function(a) {

			var c = "";

			for (var b = 0; b < a.childNodes.length; b++) {

				c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue

						.toString().replace(/^[\n\r\s]{0,}/, "").replace(

								/[\n\r\s]{0,}$/, "")

						: "")

			}

			return c

		}

	};

	window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent

			.indexOf("Trident") >= 0);

	window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent

			.indexOf("MSIE") >= 0);

	window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent

			.indexOf("Trident") < 0);

	window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent

			.indexOf("Trident") >= 0);

	window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent

			.indexOf("Trident") >= 0);

	window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0

			&& navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);

	window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);

	window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);

	window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);

	window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0)

			&& !window.dhx4.isEdge;

	window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent

			.indexOf("Konqueror") >= 0)

			&& !window.dhx4.isEdge;

	window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);

	window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);

	window.dhx4.dnd = {

		evs : {},

		p_en : ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)),

		_mTouch : function(a) {

			return (window.dhx4.isIE10

					&& a.pointerType == a.MSPOINTER_TYPE_MOUSE

					|| window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge

					&& a.pointerType == "mouse")

		},

		_touchOn : function(a) {

			if (a == null) {

				a = document.body

			}

			a.style.touchAction = a.style.msTouchAction = "";

			a = null

		},

		_touchOff : function(a) {

			if (a == null) {

				a = document.body

			}

			a.style.touchAction = a.style.msTouchAction = "none";

			a = null

		}

	};

	if (window.navigator.pointerEnabled == true) {

		window.dhx4.dnd.evs = {

			start : "pointerdown",

			move : "pointermove",

			end : "pointerup"

		}

	} else {

		if (window.navigator.msPointerEnabled == true) {

			window.dhx4.dnd.evs = {

				start : "MSPointerDown",

				move : "MSPointerMove",

				end : "MSPointerUp"

			}

		} else {

			if (typeof (window.addEventListener) != "undefined") {

				window.dhx4.dnd.evs = {

					start : "touchstart",

					move : "touchmove",

					end : "touchend"

				}

			}

		}

	}

}

if (typeof (window.dhx4.template) == "undefined") {

	window.dhx4.trim = function(a) {

		return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "")

	};

	window.dhx4.template = function(b, c, a) {

		return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function() {

			var j = arguments[1];

			var h = window.dhx4.trim(arguments[3]);

			var l = null;

			var g = [ c[j] ];

			if (h.length > 0) {

				h = h.split(":");

				var e = [];

				for (var m = 0; m < h.length; m++) {

					if (m > 0 && e[e.length - 1].match(/\\$/) != null) {

						e[e.length - 1] = e[e.length - 1].replace(/\\$/, "")

								+ ":" + h[m]

					} else {

						e.push(h[m])

					}

				}

				l = e[0];

				for (var m = 1; m < e.length; m++) {

					g.push(e[m])

				}

			}

			if (typeof (l) == "string"

					&& typeof (window.dhx4.template[l]) == "function") {

				return window.dhx4.template[l].apply(window.dhx4.template, g)

			}

			if (j.length > 0 && typeof (c[j]) != "undefined") {

				if (a == true) {

					return window.dhx4.trim(c[j])

				}

				return String(c[j])

			}

			return ""

		})

	};

	window.dhx4.template.date = function(a, b) {

		if (a != null) {

			if (a instanceof Date) {

				return window.dhx4.date2str(a, b)

			} else {

				a = a.toString();

				if (a.match(/^\d*$/) != null) {

					return window.dhx4.date2str(new Date(parseInt(a)), b)

				}

				return a

			}

		}

		return ""

	};

	window.dhx4.template.maxlength = function(b, a) {

		return String(b).substr(0, a)

	};

	window.dhx4.template.number_format = function(e, g, c, a) {

		var b = window.dhx4.template._parseFmt(g, c, a);

		if (b == false) {

			return e

		}

		return window.dhx4.template._getFmtValue(e, b)

	};

	window.dhx4.template.lowercase = function(a) {

		if (typeof (a) == "undefined" || a == null) {

			a = ""

		}

		return String(a).toLowerCase()

	};

	window.dhx4.template.uppercase = function(a) {

		if (typeof (a) == "undefined" || a == null) {

			a = ""

		}

		return String(a).toUpperCase()

	};

	window.dhx4.template._parseFmt = function(j, c, a) {

		var e = j.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);

		if (e == null || e.length != 4) {

			return false

		}

		var b = {

			i_len : false,

			i_sep : (typeof (c) == "string" ? c : ","),

			d_len : false,

			d_sep : (typeof (a) == "string" ? a : "."),

			s_bef : (typeof (e[1]) == "string" ? e[1] : ""),

			s_aft : (typeof (e[3]) == "string" ? e[3] : "")

		};

		var h = e[2].split(".");

		if (h[1] != null) {

			b.d_len = h[1].length

		}

		var g = h[0].split(",");

		if (g.length > 1) {

			b.i_len = g[g.length - 1].length

		}

		return b

	};

	window.dhx4.template._getFmtValue = function(value, fmt) {

		var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);

		if (r != null && r.length == 5) {

			var v0 = "";

			if (r[1] != null) {

				v0 += r[1]

			}

			v0 += fmt.s_bef;

			if (fmt.i_len !== false) {

				var i = 0;

				var v1 = "";

				for (var q = r[2].length - 1; q >= 0; q--) {

					v1 = "" + r[2].charAt(q) + v1;

					if (++i == fmt.i_len && q > 0) {

						v1 = fmt.i_sep + v1;

						i = 0

					}

				}

				v0 += v1

			} else {

				v0 += r[2]

			}

			if (fmt.d_len !== false) {

				if (r[4] == null) {

					r[4] = ""

				}

				while (r[4].length < fmt.d_len) {

					r[4] += "0"

				}

				eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");

				var t1 = (r[4]).match(dhx4.temp);

				if (t1 != null) {

					v0 += fmt.d_sep + t1

				}

				dhx4.temp = t1 = null

			}

			v0 += fmt.s_aft;

			return v0

		}

		return value

	}

}

if (typeof (window.dhx4.dateLang) == "undefined") {

	window.dhx4.dateLang = "en";

	window.dhx4.dateStrings = {

		en : {

			monthFullName : [ "January", "February", "March", "April", "May",

					"June", "July", "August", "September", "October",

					"November", "December" ],

			monthShortName : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",

					"Aug", "Sep", "Oct", "Nov", "Dec" ],

			dayFullName : [ "Sunday", "Monday", "Tuesday", "Wednesday",

					"Thursday", "Friday", "Saturday" ],

			dayShortName : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ]

		}

	};

	window.dhx4.dateFormat = {

		en : "%Y-%m-%d"

	};

	window.dhx4.date2str = function(h, e, a) {

		if (e == null || typeof (e) == "undefined") {

			e = window.dhx4.dateFormat[window.dhx4.dateLang]

		}

		if (a == null || typeof (a) == "undefined") {

			a = window.dhx4.dateStrings[window.dhx4.dateLang]

		}

		if (h instanceof Date) {

			var g = function(j) {

				return (String(j).length == 1 ? "0" + String(j) : j)

			};

			var b = function(l) {

				switch (l) {

				case "%d":

					return g(h.getDate());

				case "%j":

					return h.getDate();

				case "%D":

					return a.dayShortName[h.getDay()];

				case "%l":

					return a.dayFullName[h.getDay()];

				case "%m":

					return g(h.getMonth() + 1);

				case "%n":

					return h.getMonth() + 1;

				case "%M":

					return a.monthShortName[h.getMonth()];

				case "%F":

					return a.monthFullName[h.getMonth()];

				case "%y":

					return g(h.getYear() % 100);

				case "%Y":

					return h.getFullYear();

				case "%g":

					return (h.getHours() + 11) % 12 + 1;

				case "%h":

					return g((h.getHours() + 11) % 12 + 1);

				case "%G":

					return h.getHours();

				case "%H":

					return g(h.getHours());

				case "%i":

					return g(h.getMinutes());

				case "%s":

					return g(h.getSeconds());

				case "%a":

					return (h.getHours() > 11 ? "pm" : "am");

				case "%A":

					return (h.getHours() > 11 ? "PM" : "AM");

				case "%%":

					return "%";

				case "%u":

					return h.getMilliseconds();

				case "%P":

					if (window.dhx4.temp_calendar != null

							&& window.dhx4.temp_calendar.tz != null) {

						return window.dhx4.temp_calendar.tz

					}

					var o = h.getTimezoneOffset();

					var n = Math.abs(Math.floor(o / 60));

					var j = Math.abs(o) - n * 60;

					return (o > 0 ? "-" : "+") + g(n) + ":" + g(j);

				default:

					return l

				}

			};

			var c = String(e || window.dhx4.dateFormat)

					.replace(/%[a-zA-Z]/g, b)

		}

		return (c || String(h))

	};

	window.dhx4.str2date = function(h, u, z) {

		if (u == null || typeof (u) == "undefined") {

			u = window.dhx4.dateFormat[window.dhx4.dateLang]

		}

		if (z == null || typeof (z) == "undefined") {

			z = window.dhx4.dateStrings[window.dhx4.dateLang]

		}

		u = u.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g, "\\$&");

		var y = [];

		var m = [];

		u = u.replace(/%[a-z]/gi, function(e) {

			switch (e) {

			case "%d":

			case "%m":

			case "%y":

			case "%h":

			case "%H":

			case "%i":

			case "%s":

				m.push(e);

				return "(\\d{2})";

			case "%D":

			case "%l":

			case "%M":

			case "%F":

				m.push(e);

				return "([a-zéûä\u0430-\u044F\u0451]{1,})";

			case "%j":

			case "%n":

			case "%g":

			case "%G":

				m.push(e);

				return "(\\d{1,2})";

			case "%Y":

				m.push(e);

				return "(\\d{4})";

			case "%a":

				m.push(e);

				return "([a|p]m)";

			case "%A":

				m.push(e);

				return "([A|P]M)";

			case "%u":

				m.push(e);

				return "(\\d{1,6})";

			case "%P":

				m.push(e);

				return "([+-]\\d{1,2}:\\d{1,2})"

			}

			return e

		});

		var A = new RegExp(u, "i");

		var n = h.match(A);

		if (n == null || n.length - 1 != m.length) {

			return "Invalid Date"

		}

		for (var b = 1; b < n.length; b++) {

			y.push(n[b])

		}

		var c = {

			"%y" : 1,

			"%Y" : 1,

			"%n" : 2,

			"%m" : 2,

			"%M" : 2,

			"%F" : 2,

			"%d" : 3,

			"%j" : 3,

			"%a" : 4,

			"%A" : 4,

			"%H" : 5,

			"%G" : 5,

			"%h" : 5,

			"%g" : 5,

			"%i" : 6,

			"%s" : 7,

			"%u" : 7,

			"%P" : 7

		};

		var o = {};

		var l = {};

		for (var b = 0; b < m.length; b++) {

			if (typeof (c[m[b]]) != "undefined") {

				var g = c[m[b]];

				if (!o[g]) {

					o[g] = [];

					l[g] = []

				}

				o[g].push(y[b]);

				l[g].push(m[b])

			}

		}

		y = [];

		m = [];

		for (var b = 1; b <= 7; b++) {

			if (o[b] != null) {

				for (var t = 0; t < o[b].length; t++) {

					y.push(o[b][t]);

					m.push(l[b][t])

				}

			}

		}

		var a = new Date();

		a.setDate(1);

		a.setHours(0);

		a.setMinutes(0);

		a.setSeconds(0);

		a.setMilliseconds(0);

		var s = function(v, e) {

			for (var r = 0; r < e.length; r++) {

				if (e[r].toLowerCase() == v) {

					return r

				}

			}

			return -1

		};

		for (var b = 0; b < y.length; b++) {

			switch (m[b]) {

			case "%d":

			case "%j":

			case "%n":

			case "%m":

			case "%Y":

			case "%H":

			case "%G":

			case "%i":

			case "%s":

			case "%u":

				if (!isNaN(y[b])) {

					a[{

						"%d" : "setDate",

						"%j" : "setDate",

						"%n" : "setMonth",

						"%m" : "setMonth",

						"%Y" : "setFullYear",

						"%H" : "setHours",

						"%G" : "setHours",

						"%i" : "setMinutes",

						"%s" : "setSeconds",

						"%u" : "setMilliseconds"

					}[m[b]]](Number(y[b])

							+ (m[b] == "%m" || m[b] == "%n" ? -1 : 0))

				}

				break;

			case "%M":

			case "%F":

				var j = s(y[b].toLowerCase(), z[{

					"%M" : "monthShortName",

					"%F" : "monthFullName"

				}[m[b]]]);

				if (j >= 0) {

					a.setMonth(j)

				}

				break;

			case "%y":

				if (!isNaN(y[b])) {

					var x = Number(y[b]);

					a.setFullYear(x + (x > 50 ? 1900 : 2000))

				}

				break;

			case "%g":

			case "%h":

				if (!isNaN(y[b])) {

					var x = Number(y[b]);

					if (x <= 12 && x >= 0) {

						a.setHours(x

								+ (s("pm", y) >= 0 ? (x == 12 ? 0 : 12)

										: (x == 12 ? -12 : 0)))

					}

				}

				break;

			case "%P":

				if (window.dhx4.temp_calendar != null) {

					window.dhx4.temp_calendar.tz = y[b]

				}

				break

			}

		}

		return a

	}

}

if (typeof (window.dhx4.ajax) == "undefined") {

	window.dhx4.ajax = {

		cache : false,

		method : "get",

		parse : function(a) {

			if (typeof a !== "string") {

				return a

			}

			a = a.replace(/^[\s]+/, "");

			if (window.DOMParser && !dhx4.isIE) {

				var b = (new window.DOMParser()).parseFromString(a, "text/xml")

			} else {

				if (window.ActiveXObject !== window.undefined) {

					var b = new window.ActiveXObject("Microsoft.XMLDOM");

					b.async = "false";

					b.loadXML(a)

				}

			}

			return b

		},

		xmltop : function(a, g, c) {

			if (typeof g.status == "undefined" || g.status < 400) {

				xml = (!g.responseXML) ? dhx4.ajax.parse(g.responseText || g)

						: (g.responseXML || g);

				if (xml && xml.documentElement !== null) {

					try {

						if (!xml.getElementsByTagName("parsererror").length) {

							return xml.getElementsByTagName(a)[0]

						}

					} catch (b) {

					}

				}

			}

			if (c !== -1) {

				dhx4.callEvent("onLoadXMLError", [ "Incorrect XML",

						arguments[1], c ])

			}

			return document.createElement("DIV")

		},

		xpath : function(c, a) {

			if (!a.nodeName) {

				a = a.responseXML || a

			}

			if (dhx4.isIE) {

				try {

					return a.selectNodes(c) || []

				} catch (h) {

					return []

				}

			} else {

				var g = [];

				var j;

				var b = (a.ownerDocument || a).evaluate(c, a, null,

						XPathResult.ANY_TYPE, null);

				while (j = b.iterateNext()) {

					g.push(j)

				}

				return g

			}

		},

		query : function(a) {

			return dhx4.ajax._call((a.method || "GET"), a.url, a.data || "",

					(a.async || true), a.callback, null, a.headers)

		},

		get : function(a, b) {

			return this._call("GET", a, null, true, b)

		},

		getSync : function(a) {

			return this._call("GET", a, null, false)

		},

		put : function(b, a, c) {

			return this._call("PUT", b, a, true, c)

		},

		del : function(b, a, c) {

			return this._call("DELETE", b, a, true, c)

		},

		post : function(b, a, c) {

			if (arguments.length == 1) {

				a = ""

			} else {

				if (arguments.length == 2

						&& (typeof (a) == "function" || typeof (window[a]) == "function")) {

					c = a;

					a = ""

				} else {

					a = String(a)

				}

			}

			return this._call("POST", b, a, true, c)

		},

		postSync : function(b, a) {

			a = (a == null ? "" : String(a));

			return this._call("POST", b, a, false)

		},

		getLong : function(a, b) {

			this._call("GET", a, null, true, b, {

				url : a

			})

		},

		postLong : function(b, a, c) {

			if (arguments.length == 2

					&& (typeof (a) == "function" || typeof (window[a]))) {

				c = a;

				a = ""

			}

			this._call("POST", b, a, true, c, {

				url : b,

				postData : a

			})

		},

		_call : function(b, c, e, l, n, s, h) {

			if (typeof e === "object") {

				var j = [];

				for ( var o in e) {

					j.push(o + "=" + encodeURIComponent(e[o]))

				}

				e = j.join("&")

			}

			var g = dhx.promise.defer();

			var r = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest()

					: new ActiveXObject("Microsoft.XMLHTTP"));

			var m = (navigator.userAgent.match(/AppleWebKit/) != null

					&& navigator.userAgent.match(/Qt/) != null && navigator.userAgent

					.match(/Safari/) != null);

			if (l == true) {

				r.onreadystatechange = function() {

					if ((r.readyState == 4) || (m == true && r.readyState == 3)) {

						if (r.status != 200 || r.responseText == "") {

							g.reject(r);

							if (!dhx4.callEvent("onAjaxError", [ {

								xmlDoc : r,

								filePath : c,

								async : l

							} ])) {

								return

							}

						}

						window.setTimeout(function() {

							if (typeof (n) == "function") {

								try {

									n.apply(window, [ {

										xmlDoc : r,

										filePath : c,

										async : l

									} ])

								} catch (a) {

									g.reject(a)

								}

								g.resolve(r.responseText)

							}

							if (s != null) {

								if (typeof (s.postData) != "undefined") {

									dhx4.ajax.postLong(s.url, s.postData, n)

								} else {

									dhx4.ajax.getLong(s.url, n)

								}

							}

							n = null;

							r = null

						}, 1)

					}

				}

			}

			if (b == "GET") {

				c += this._dhxr(c)

			}

			r.open(b, c, l);

			if (h != null) {

				for ( var q in h) {

					r.setRequestHeader(q, h[q])

				}

			} else {

				if (b == "POST" || b == "PUT" || b == "DELETE") {

					r.setRequestHeader("Content-Type",

							"application/x-www-form-urlencoded")

				} else {

					if (b == "GET") {

						e = null

					}

				}

			}

			r.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			r.send(e);

			if (l != true) {

				if ((r.readyState == 4) || (m == true && r.readyState == 3)) {

					if (r.status != 200 || r.responseText == "") {

						dhx4.callEvent("onAjaxError", [ {

							xmlDoc : r,

							filePath : c,

							async : l

						} ])

					}

				}

			}

			g.xmlDoc = r;

			g.filePath = c;

			g.async = l;

			return g

		},

		_dhxr : function(a, b) {

			if (this.cache != true) {

				if (a.match(/^[\?\&]$/) == null) {

					a = (a.indexOf("?") >= 0 ? "&" : "?")

				}

				if (typeof (b) == "undefined") {

					b = true

				}

				return a + "dhxr" + new Date().getTime()

						+ (b == true ? "=1" : "")

			}

			return ""

		}

	}

}

if (typeof (window.dhx4._enableDataLoading) == "undefined") {

	window.dhx4._enableDataLoading = function(j, c, h, g, l) {

		if (l == "clear") {

			for ( var b in j._dhxdataload) {

				j._dhxdataload[b] = null;

				delete j._dhxdataload[b]

			}

			j._loadData = null;

			j._dhxdataload = null;

			j.load = null;

			j.loadStruct = null;

			j = null;

			return

		}

		j._dhxdataload = {

			initObj : c,

			xmlToJson : h,

			xmlRootTag : g,

			onBeforeXLS : null

		};

		j._loadData = function(r, s, u) {

			if (arguments.length == 2) {

				u = s;

				s = null

			}

			var q = null;

			if (arguments.length == 3) {

				u = arguments[2]

			}

			this.callEvent("onXLS", []);

			if (typeof (r) == "string") {

				var o = r.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");

				var x = new RegExp("^<" + this._dhxdataload.xmlRootTag);

				if (x.test(o.replace(/^<\?xml[^\?]*\?>\s*/, ""))) {

					q = dhx4.ajax.parse(r);

					if (q != null) {

						q = this[this._dhxdataload.xmlToJson]

								.apply(this, [ q ])

					}

				}

				if (q == null

						&& (o.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || o

								.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {

					q = dhx4.s2j(o)

				}

				if (q == null) {

					var n = [];

					if (typeof (this._dhxdataload.onBeforeXLS) == "function") {

						var o = this._dhxdataload.onBeforeXLS

								.apply(this, [ r ]);

						if (o != null && typeof (o) == "object") {

							if (o.url != null) {

								r = o.url

							}

							if (o.params != null) {

								for ( var v in o.params) {

									n.push(v + "="

											+ encodeURIComponent(o.params[v]))

								}

							}

						}

					}

					var w = this;

					var m = function(a) {

						var t = null;

						if ((a.xmlDoc.getResponseHeader("Content-Type") || "")

								.search(/xml/gi) >= 0

								|| (a.xmlDoc.responseText

										.replace(/^\s{1,}/, "")).match(/^</) != null) {

							t = w[w._dhxdataload.xmlToJson].apply(w,

									[ a.xmlDoc.responseXML ])

						} else {

							t = dhx4.s2j(a.xmlDoc.responseText)

						}

						if (t != null) {

							w[w._dhxdataload.initObj].apply(w, [ t, r ])

						}

						w.callEvent("onXLE", []);

						if (u != null) {

							if (typeof (u) == "function") {

								u.apply(w, [])

							} else {

								if (typeof (window[u]) == "function") {

									window[u].apply(w, [])

								}

							}

						}

						m = u = null;

						t = a = w = null

					};

					n = n.join("&") + (typeof (s) == "string" ? "&" + s : "");

					if (dhx4.ajax.method == "post") {

						return dhx4.ajax.post(r, n, m)

					} else {

						if (dhx4.ajax.method == "get") {

							return dhx4.ajax.get(r

									+ (n.length > 0 ? (r.indexOf("?") > 0 ? "&"

											: "?")

											+ n : ""), m)

						}

					}

					return

				}

			} else {

				if (typeof (r.documentElement) == "object"

						|| (typeof (r.tagName) != "undefined"

								&& typeof (r.getElementsByTagName) != "undefined" && r

								.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {

					q = this[this._dhxdataload.xmlToJson].apply(this, [ r ])

				} else {

					q = window.dhx4._copyObj(r)

				}

			}

			if (q != null) {

				this[this._dhxdataload.initObj].apply(this, [ q ])

			}

			this.callEvent("onXLE", []);

			if (u != null) {

				if (typeof (u) == "function") {

					u.apply(this, [])

				} else {

					if (typeof (window[u]) == "function") {

						window[u].apply(this, [])

					}

				}

				u = null

			}

		};

		if (l != null) {

			var e = {

				struct : "loadStruct",

				data : "load"

			};

			for ( var b in l) {

				if (l[b] == true) {

					j[e[b]] = function() {

						return this._loadData.apply(this, arguments)

					}

				}

			}

		}

		j = null

	}

}

if (typeof (window.dhx4._eventable) == "undefined") {

	window.dhx4._eventable = function(a, b) {

		if (b == "clear") {

			a.detachAllEvents();

			a.dhxevs = null;

			a.attachEvent = null;

			a.detachEvent = null;

			a.checkEvent = null;

			a.callEvent = null;

			a.detachAllEvents = null;

			a = null;

			return

		}

		a.dhxevs = {

			data : {}

		};

		a.attachEvent = function(c, g) {

			c = String(c).toLowerCase();

			if (!this.dhxevs.data[c]) {

				this.dhxevs.data[c] = {}

			}

			var e = window.dhx4.newId();

			this.dhxevs.data[c][e] = g;

			return e

		};

		a.detachEvent = function(h) {

			for ( var e in this.dhxevs.data) {

				var g = 0;

				for ( var c in this.dhxevs.data[e]) {

					if (c == h) {

						this.dhxevs.data[e][c] = null;

						delete this.dhxevs.data[e][c]

					} else {

						g++

					}

				}

				if (g == 0) {

					this.dhxevs.data[e] = null;

					delete this.dhxevs.data[e]

				}

			}

		};

		a.checkEvent = function(c) {

			c = String(c).toLowerCase();

			return (this.dhxevs.data[c] != null)

		};

		a.callEvent = function(e, h) {

			e = String(e).toLowerCase();

			if (this.dhxevs.data[e] == null) {

				return true

			}

			var g = true;

			for ( var c in this.dhxevs.data[e]) {

				g = this.dhxevs.data[e][c].apply(this, h) && g

			}

			return g

		};

		a.detachAllEvents = function() {

			for ( var e in this.dhxevs.data) {

				for ( var c in this.dhxevs.data[e]) {

					this.dhxevs.data[e][c] = null;

					delete this.dhxevs.data[e][c]

				}

				this.dhxevs.data[e] = null;

				delete this.dhxevs.data[e]

			}

		};

		a = null

	};

	dhx4._eventable(dhx4)

}

if (!window.dhtmlxValidation) {

	dhtmlxValidation = function() {

	};

	dhtmlxValidation.prototype = {

		isEmpty : function(a) {

			return a == ""

		},

		isNotEmpty : function(a) {

			return (a instanceof Array ? a.length > 0 : !a == "")

		},

		isValidBoolean : function(a) {

			return !!a.toString().match(/^(0|1|true|false)$/)

		},

		isValidEmail : function(a) {

			return !!a

					.toString()

					.match(

							/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i)

		},

		isValidInteger : function(a) {

			return !!a.toString().match(/(^-?\d+$)/)

		},

		isValidNumeric : function(a) {

			return !!a.toString().match(

					/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/)

		},

		isValidAplhaNumeric : function(a) {

			return !!a.toString().match(/^[_\-a-z0-9]+$/gi)

		},

		isValidDatetime : function(b) {

			var a = b.toString().match(

					/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);

			return a

					&& !!(a[1] <= 9999 && a[2] <= 12 && a[3] <= 31

							&& a[4] <= 59 && a[5] <= 59 && a[6] <= 59) || false

		},

		isValidDate : function(a) {

			var b = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);

			return b && !!(b[1] <= 9999 && b[2] <= 12 && b[3] <= 31) || false

		},

		isValidTime : function(b) {

			var a = b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);

			return a && !!(a[1] <= 24 && a[2] <= 59 && a[3] <= 59) || false

		},

		isValidIPv4 : function(a) {

			var b = a.toString().match(

					/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);

			return b

					&& !!(b[1] <= 255 && b[2] <= 255 && b[3] <= 255 && b[4] <= 255)

					|| false

		},

		isValidCurrency : function(a) {

			return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false

		},

		isValidSSN : function(a) {

			return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false

		},

		isValidSIN : function(a) {

			return a.toString().match(/^\d{9}$/) && true || false

		}

	};

	dhtmlxValidation = new dhtmlxValidation()

}

if (typeof (window.dhtmlx) == "undefined") {

	window.dhtmlx = {

		extend : function(e, c) {

			for ( var g in c) {

				if (!e[g]) {

					e[g] = c[g]

				}

			}

			return e

		},

		extend_api : function(a, e, c) {

			var b = window[a];

			if (!b) {

				return

			}

			window[a] = function(j) {

				if (j && typeof j == "object" && !j.tagName) {

					var h = b.apply(this, (e._init ? e._init(j) : arguments));

					for ( var g in dhtmlx) {

						if (e[g]) {

							this[e[g]](dhtmlx[g])

						}

					}

					for ( var g in j) {

						if (e[g]) {

							this[e[g]](j[g])

						} else {

							if (g.indexOf("on") === 0) {

								this.attachEvent(g, j[g])

							}

						}

					}

				} else {

					var h = b.apply(this, arguments)

				}

				if (e._patch) {

					e._patch(this)

				}

				return h || this

			};

			window[a].prototype = b.prototype;

			if (c) {

				dhtmlx.extend(window[a].prototype, c)

			}

		},

		url : function(a) {

			if (a.indexOf("?") != -1) {

				return "&"

			} else {

				return "?"

			}

		}

	}

}

function dhtmlDragAndDropObject() {

	if (window.dhtmlDragAndDrop) {

		return window.dhtmlDragAndDrop

	}

	this.lastLanding = 0;

	this.dragNode = 0;

	this.dragStartNode = 0;

	this.dragStartObject = 0;

	this.tempDOMU = null;

	this.tempDOMM = null;

	this.waitDrag = 0;

	window.dhtmlDragAndDrop = this;

	return this

}

dhtmlDragAndDropObject.prototype.removeDraggableItem = function(a) {

	a.onmousedown = null;

	a.dragStarter = null;

	a.dragLanding = null

};

dhtmlDragAndDropObject.prototype.addDraggableItem = function(a, b) {

	a.onmousedown = this.preCreateDragCopy;

	a.dragStarter = b;

	this.addDragLanding(a, b)

};

dhtmlDragAndDropObject.prototype.addDragLanding = function(a, b) {

	a.dragLanding = b

};

dhtmlDragAndDropObject.prototype.preCreateDragCopy = function(a) {

	if ((a || window.event) && (a || event).button == 2) {

		return

	}

	if (window.dhtmlDragAndDrop.waitDrag) {

		window.dhtmlDragAndDrop.waitDrag = 0;

		document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;

		document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;

		return false

	}

	if (window.dhtmlDragAndDrop.dragNode) {

		window.dhtmlDragAndDrop.stopDrag(a)

	}

	window.dhtmlDragAndDrop.waitDrag = 1;

	window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;

	window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;

	window.dhtmlDragAndDrop.dragStartNode = this;

	window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;

	document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;

	document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;

	window.dhtmlDragAndDrop.downtime = new Date().valueOf();

	if ((a) && (a.preventDefault)) {

		a.preventDefault();

		return false

	}

	return false

};

dhtmlDragAndDropObject.prototype.callDrag = function(c) {

	if (!c) {

		c = window.event

	}

	dragger = window.dhtmlDragAndDrop;

	if ((new Date()).valueOf() - dragger.downtime < 100) {

		return

	}

	if (!dragger.dragNode) {

		if (dragger.waitDrag) {

			dragger.dragNode = dragger.dragStartObject._createDragNode(

					dragger.dragStartNode, c);

			if (!dragger.dragNode) {

				return dragger.stopDrag()

			}

			dragger.dragNode.onselectstart = function() {

				return false

			};

			dragger.gldragNode = dragger.dragNode;

			document.body.appendChild(dragger.dragNode);

			document.body.onmouseup = dragger.stopDrag;

			dragger.waitDrag = 0;

			dragger.dragNode.pWindow = window;

			dragger.initFrameRoute()

		} else {

			return dragger.stopDrag(c, true)

		}

	}

	if (dragger.dragNode.parentNode != window.document.body

			&& dragger.gldragNode) {

		var a = dragger.gldragNode;

		if (dragger.gldragNode.old) {

			a = dragger.gldragNode.old

		}

		a.parentNode.removeChild(a);

		var b = dragger.dragNode.pWindow;

		if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding) {

			a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding

					._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)

		}

		if (_isIE) {

			var h = document.createElement("Div");

			h.innerHTML = dragger.dragNode.outerHTML;

			dragger.dragNode = h.childNodes[0]

		} else {

			dragger.dragNode = dragger.dragNode.cloneNode(true)

		}

		dragger.dragNode.pWindow = window;

		dragger.gldragNode.old = dragger.dragNode;

		document.body.appendChild(dragger.dragNode);

		b.dhtmlDragAndDrop.dragNode = dragger.dragNode

	}

	dragger.dragNode.style.left = c.clientX + 15

			+ (dragger.fx ? dragger.fx * (-1) : 0)

			+ (document.body.scrollLeft || document.documentElement.scrollLeft)

			+ "px";

	dragger.dragNode.style.top = c.clientY + 3

			+ (dragger.fy ? dragger.fy * (-1) : 0)

			+ (document.body.scrollTop || document.documentElement.scrollTop)

			+ "px";

	if (!c.srcElement) {

		var g = c.target

	} else {

		g = c.srcElement

	}

	dragger.checkLanding(g, c)

};

dhtmlDragAndDropObject.prototype.calculateFramePosition = function(g) {

	if (window.name) {

		var c = parent.frames[window.name].frameElement.offsetParent;

		var e = 0;

		var b = 0;

		while (c) {

			e += c.offsetLeft;

			b += c.offsetTop;

			c = c.offsetParent

		}

		if ((parent.dhtmlDragAndDrop)) {

			var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);

			e += a.split("_")[0] * 1;

			b += a.split("_")[1] * 1

		}

		if (g) {

			return e + "_" + b

		} else {

			this.fx = e

		}

		this.fy = b

	}

	return "0_0"

};

dhtmlDragAndDropObject.prototype.checkLanding = function(b, a) {

	if ((b) && (b.dragLanding)) {

		if (this.lastLanding) {

			this.lastLanding.dragLanding._dragOut(this.lastLanding)

		}

		this.lastLanding = b;

		this.lastLanding = this.lastLanding.dragLanding._dragIn(

				this.lastLanding, this.dragStartNode, a.clientX, a.clientY, a);

		this.lastLanding_scr = (_isIE ? a.srcElement : a.target)

	} else {

		if ((b) && (b.tagName != "BODY")) {

			this.checkLanding(b.parentNode, a)

		} else {

			if (this.lastLanding) {

				this.lastLanding.dragLanding._dragOut(this.lastLanding,

						a.clientX, a.clientY, a)

			}

			this.lastLanding = 0;

			if (this._onNotFound) {

				this._onNotFound()

			}

		}

	}

};

dhtmlDragAndDropObject.prototype.stopDrag = function(b, c) {

	dragger = window.dhtmlDragAndDrop;

	if (!c) {

		dragger.stopFrameRoute();

		var a = dragger.lastLanding;

		dragger.lastLanding = null;

		if (a) {

			a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject,

					a, (_isIE ? event.srcElement : b.target))

		}

	}

	dragger.lastLanding = null;

	if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {

		dragger.dragNode.parentNode.removeChild(dragger.dragNode)

	}

	dragger.dragNode = 0;

	dragger.gldragNode = 0;

	dragger.fx = 0;

	dragger.fy = 0;

	dragger.dragStartNode = 0;

	dragger.dragStartObject = 0;

	document.body.onmouseup = dragger.tempDOMU;

	document.body.onmousemove = dragger.tempDOMM;

	dragger.tempDOMU = null;

	dragger.tempDOMM = null;

	dragger.waitDrag = 0

};

dhtmlDragAndDropObject.prototype.stopFrameRoute = function(c) {

	if (c) {

		window.dhtmlDragAndDrop.stopDrag(1, 1)

	}

	for (var a = 0; a < window.frames.length; a++) {

		try {

			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {

				window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)

			}

		} catch (b) {

		}

	}

	try {

		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {

			parent.dhtmlDragAndDrop.stopFrameRoute(window)

		}

	} catch (b) {

	}

};

dhtmlDragAndDropObject.prototype.initFrameRoute = function(c, g) {

	if (c) {

		window.dhtmlDragAndDrop.preCreateDragCopy();

		window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;

		window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;

		window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;

		window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;

		window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;

		window.waitDrag = 0;

		if (((!_isIE) && (g)) && ((!_isFF) || (_FFrv < 1.8))) {

			window.dhtmlDragAndDrop.calculateFramePosition()

		}

	}

	try {

		if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {

			parent.dhtmlDragAndDrop.initFrameRoute(window)

		}

	} catch (b) {

	}

	for (var a = 0; a < window.frames.length; a++) {

		try {

			if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {

				window.frames[a].dhtmlDragAndDrop.initFrameRoute(window,

						((!c || g) ? 1 : 0))

			}

		} catch (b) {

		}

	}

};

_isFF = false;

_isIE = false;

_isOpera = false;

_isKHTML = false;

_isMacOS = false;

_isChrome = false;

_FFrv = false;

_KHTMLrv = false;

_OperaRv = false;

if (navigator.userAgent.indexOf("Macintosh") != -1) {

	_isMacOS = true

}

if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {

	_isChrome = true

}

if ((navigator.userAgent.indexOf("Safari") != -1)

		|| (navigator.userAgent.indexOf("Konqueror") != -1)) {

	_KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent

			.indexOf("Safari") + 7, 5));

	if (_KHTMLrv > 525) {

		_isFF = true;

		_FFrv = 1.9

	} else {

		_isKHTML = true

	}

} else {

	if (navigator.userAgent.indexOf("Opera") != -1) {

		_isOpera = true;

		_OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent

				.indexOf("Opera") + 6, 3))

	} else {

		if (navigator.appName.indexOf("Microsoft") != -1) {

			_isIE = true;

			if ((navigator.appVersion.indexOf("MSIE 8.0") != -1

					|| navigator.appVersion.indexOf("MSIE 9.0") != -1

					|| navigator.appVersion.indexOf("MSIE 10.0") != -1 || document.documentMode > 7)

					&& document.compatMode != "BackCompat") {

				_isIE = 8

			}

		} else {

			if (navigator.appName == "Netscape"

					&& navigator.userAgent.indexOf("Trident") != -1) {

				_isIE = 8

			} else {

				_isFF = true;

				_FFrv = parseFloat(navigator.userAgent.split("rv:")[1])

			}

		}

	}

}

if (typeof (window.dhtmlxEvent) == "undefined") {

	function dhtmlxEvent(b, c, a) {

		if (b.addEventListener) {

			b.addEventListener(c, a, false)

		} else {

			if (b.attachEvent) {

				b.attachEvent("on" + c, a)

			}

		}

	}

}

if (dhtmlxEvent.touchDelay == null) {

	dhtmlxEvent.touchDelay = 2000

}

if (typeof (dhtmlxEvent.initTouch) == "undefined") {

	dhtmlxEvent.initTouch = function() {

		var e;

		var g;

		var b, a;

		dhtmlxEvent(document.body, "touchstart", function(h) {

			g = h.touches[0].target;

			b = h.touches[0].clientX;

			a = h.touches[0].clientY;

			e = window.setTimeout(c, dhtmlxEvent.touchDelay)

		});

		function c() {

			if (g) {

				var h = document.createEvent("HTMLEvents");

				h.initEvent("dblclick", true, true);

				g.dispatchEvent(h);

				e = g = null

			}

		}

		dhtmlxEvent(document.body, "touchmove", function(h) {

			if (e) {

				if (Math.abs(h.touches[0].clientX - b) > 50

						|| Math.abs(h.touches[0].clientY - a) > 50) {

					window.clearTimeout(e);

					e = g = false

				}

			}

		});

		dhtmlxEvent(document.body, "touchend", function(h) {

			if (e) {

				window.clearTimeout(e);

				e = g = false

			}

		});

		dhtmlxEvent.initTouch = function() {

		}

	}

}

(function(b) {

	var c = typeof setImmediate !== "undefined" ? setImmediate : function(g) {

		setTimeout(g, 0)

	};

	function e(h, j) {

		var g = this;

		g.promise = g;

		g.state = "pending";

		g.val = null;

		g.fn = h || null;

		g.er = j || null;

		g.next = []

	}

	e.prototype.resolve = function(h) {

		var g = this;

		if (g.state === "pending") {

			g.val = h;

			g.state = "resolving";

			c(function() {

				g.fire()

			})

		}

	};

	e.prototype.reject = function(h) {

		var g = this;

		if (g.state === "pending") {

			g.val = h;

			g.state = "rejecting";

			c(function() {

				g.fire()

			})

		}

	};

	e.prototype.then = function(h, l) {

		var g = this;

		var j = new e(h, l);

		g.next.push(j);

		if (g.state === "resolved") {

			j.resolve(g.val)

		}

		if (g.state === "rejected") {

			j.reject(g.val)

		}

		return j

	};

	e.prototype.fail = function(g) {

		return this.then(null, g)

	};

	e.prototype.finish = function(j) {

		var g = this;

		g.state = j;

		if (g.state === "resolved") {

			for (var h = 0; h < g.next.length; h++) {

				g.next[h].resolve(g.val)

			}

		}

		if (g.state === "rejected") {

			for (var h = 0; h < g.next.length; h++) {

				g.next[h].reject(g.val)

			}

			if (!g.next.length) {

				throw (g.val)

			}

		}

	};

	e.prototype.thennable = function(m, g, j, q, o) {

		var h = this;

		o = o || h.val;

		if (typeof o === "object" && typeof m === "function") {

			try {

				var l = 0;

				m.call(o, function(r) {

					if (l++ !== 0) {

						return

					}

					g(r)

				}, function(r) {

					if (l++ !== 0) {

						return

					}

					j(r)

				})

			} catch (n) {

				j(n)

			}

		} else {

			q(o)

		}

	};

	e.prototype.fire = function() {

		var g = this;

		var h;

		try {

			h = g.val && g.val.then

		} catch (j) {

			g.val = j;

			g.state = "rejecting";

			return g.fire()

		}

		g.thennable(h, function(l) {

			g.val = l;

			g.state = "resolving";

			g.fire()

		}, function(l) {

			g.val = l;

			g.state = "rejecting";

			g.fire()

		}, function(l) {

			g.val = l;

			if (g.state === "resolving" && typeof g.fn === "function") {

				try {

					g.val = g.fn.call(undefined, g.val)

				} catch (m) {

					g.val = m;

					return g.finish("rejected")

				}

			}

			if (g.state === "rejecting" && typeof g.er === "function") {

				try {

					g.val = g.er.call(undefined, g.val);

					g.state = "resolving"

				} catch (m) {

					g.val = m;

					return g.finish("rejected")

				}

			}

			if (g.val === g) {

				g.val = TypeError();

				return g.finish("rejected")

			}

			g.thennable(h, function(n) {

				g.val = n;

				g.finish("resolved")

			}, function(n) {

				g.val = n;

				g.finish("rejected")

			}, function(n) {

				g.val = n;

				g.state === "resolving" ? g.finish("resolved") : g

						.finish("rejected")

			})

		})

	};

	e.prototype.done = function() {

		if (this.state = "rejected" && !this.next) {

			throw this.val

		}

		return null

	};

	e.prototype.nodeify = function(g) {

		if (typeof g === "function") {

			return this.then(function(j) {

				try {

					g(null, j)

				} catch (h) {

					setImmediate(function() {

						throw h

					})

				}

				return j

			}, function(j) {

				try {

					g(j)

				} catch (h) {

					setImmediate(function() {

						throw h

					})

				}

				return j

			})

		}

		return this

	};

	e.prototype.spread = function(g, h) {

		return this.all().then(function(j) {

			return typeof g === "function" && g.apply(null, j)

		}, h)

	};

	e.prototype.all = function() {

		var g = this;

		return this.then(function(t) {

			var h = new e();

			if (!(t instanceof Array)) {

				h.reject(TypeError);

				return h

			}

			var m = 0;

			var s = t.length;

			function o() {

				if (++m === s) {

					h.resolve(t)

				}

			}

			for (var q = 0, n = t.length; q < n; q++) {

				var u = t[q];

				var j;

				try {

					j = u && u.then

				} catch (r) {

					h.reject(r);

					break

				}

				(function(l) {

					g.thennable(j, function(v) {

						t[l] = v;

						o()

					}, function(v) {

						h.reject(v)

					}, function() {

						o()

					}, u)

				})(q)

			}

			return h

		})

	};

	var a = {

		all : function(g) {

			var h = new e(null, null);

			h.resolve(g);

			return h.all()

		},

		defer : function() {

			return new e(null, null)

		},

		fcall : function() {

			var j = new e();

			var g = Array.apply([], arguments);

			var h = g.shift();

			try {

				var m = h.apply(null, g);

				j.resolve(m)

			} catch (l) {

				j.reject(l)

			}

			return j

		},

		nfcall : function() {

			var j = new e();

			var g = Array.apply([], arguments);

			var h = g.shift();

			try {

				g.push(function(m, n) {

					if (m) {

						return j.reject(m)

					}

					return j.resolve(n)

				});

				h.apply(null, g)

			} catch (l) {

				j.reject(l)

			}

			return j

		}

	};

	b.promise = a

})(dhx);

if (!window.dhtmlx) {

	dhtmlx = {}

}

dhtmlx.assert = function(b, a) {

	if (!b) {

		dhtmlx.error(a)

	}

};

dhtmlx.assert_enabled = function() {

	return false

};

dhtmlx.assert_event = function(h, c) {

	if (!h._event_check) {

		h._event_check = {};

		h._event_check_size = {}

	}

	for ( var b in c) {

		h._event_check[b.toLowerCase()] = c[b];

		var g = -1;

		for ( var e in c[b]) {

			g++

		}

		h._event_check_size[b.toLowerCase()] = g

	}

};

dhtmlx.assert_method_info = function(g, b, e, h) {

	var a = [];

	for (var c = 0; c < h.length; c++) {

		a.push(h[c][0] + " : " + h[c][1] + "\n   " + h[c][2].describe()

				+ (h[c][3] ? "; optional" : ""))

	}

	return g.name + "." + b + "\n" + e + "\n Arguments:\n - " + a.join("\n - ")

};

dhtmlx.assert_method = function(c, a) {

	for ( var b in a) {

		dhtmlx.assert_method_process(c, b, a[b].descr, a[b].args,

				(a[b].min || 99), a[b].skip)

	}

};

dhtmlx.assert_method_process = function(h, b, g, j, c, e) {

	var a = h[b];

	if (!e) {

		h[b] = function() {

			if (arguments.length != j.length && arguments.length < c) {

				dhtmlx.log("warn", "Incorrect count of parameters\n"

						+ h[b].describe() + "\n\nExpecting " + j.length

						+ " but have only " + arguments.length)

			} else {

				for (var l = 0; l < j.length; l++) {

					if (!j[l][3] && !j[l][2](arguments[l])) {

						dhtmlx.log("warn", "Incorrect method call\n"

								+ h[b].describe() + "\n\nActual value of "

								+ (l + 1) + " parameter: {"

								+ (typeof arguments[l]) + "} " + arguments[l])

					}

				}

			}

			return a.apply(this, arguments)

		}

	}

	h[b].describe = function() {

		return dhtmlx.assert_method_info(h, b, g, j)

	}

};

dhtmlx.assert_event_call = function(c, b, a) {

	if (c._event_check) {

		if (!c._event_check[b]) {

			dhtmlx.log("warn", "Not expected event call :" + b)

		} else {

			if (dhtmlx.isNotDefined(a)) {

				dhtmlx.log("warn", "Event without parameters :" + b)

			} else {

				if (c._event_check_size[b] != a.length) {

					dhtmlx.log("warn", "Incorrect event call, expected "

							+ c._event_check_size[b]

							+ " parameter(s), but have " + a.length

							+ " parameter(s), for " + b + " event")

				}

			}

		}

	}

};

dhtmlx.assert_event_attach = function(b, a) {

	if (b._event_check && !b._event_check[a]) {

		dhtmlx.log("warn", "Unknown event name: " + a)

	}

};

dhtmlx.assert_property = function(b, a) {

	if (!b._settings_check) {

		b._settings_check = {}

	}

	dhtmlx.extend(b._settings_check, a)

};

dhtmlx.assert_check = function(c, b) {

	if (typeof c == "object") {

		for ( var a in c) {

			dhtmlx.assert_settings(a, c[a], b)

		}

	}

};

dhtmlx.assert_settings = function(l, g, e) {

	e = e || this._settings_check;

	if (e) {

		if (!e[l]) {

			return dhtmlx.log("warn", "Unknown propery: " + l)

		}

		var j = "";

		var b = "";

		var a = false;

		for (var c = 0; c < e[l].length; c++) {

			var h = e[l][c];

			if (typeof h == "string") {

				continue

			}

			if (typeof h == "function") {

				a = a || h(g)

			} else {

				if (typeof h == "object" && typeof h[1] == "function") {

					a = a || h[1](g);

					if (a && h[2]) {

						dhtmlx.assert_check(g, h[2])

					}

				}

			}

			if (a) {

				break

			}

		}

		if (!a) {

			dhtmlx.log("warn", "Invalid configuration\n"

					+ dhtmlx.assert_info(l, e) + "\nActual value: {"

					+ (typeof g) + "} " + g)

		}

	}

};

dhtmlx.assert_info = function(b, h) {

	var a = h[b];

	var g = "";

	var e = [];

	for (var c = 0; c < a.length; c++) {

		if (typeof rule == "string") {

			g = a[c]

		} else {

			if (a[c].describe) {

				e.push(a[c].describe())

			} else {

				if (a[c][1] && a[c][1].describe) {

					e.push(a[c][1].describe())

				}

			}

		}

	}

	return "Property: " + b + ", " + g + " \nExpected value: \n - "

			+ e.join("\n - ")

};

if (dhtmlx.assert_enabled()) {

	dhtmlx.assert_rule_color = function(a) {

		if (typeof a != "string") {

			return false

		}

		if (a.indexOf("#") !== 0) {

			return false

		}

		if (a.substr(1).replace(/[0-9A-F]/gi, "") !== "") {

			return false

		}

		return true

	};

	dhtmlx.assert_rule_color.describe = function() {

		return "{String} Value must start from # and contain hexadecimal code of color"

	};

	dhtmlx.assert_rule_template = function(a) {

		if (typeof a == "function") {

			return true

		}

		if (typeof a == "string") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_template.describe = function() {

		return "{Function},{String} Value must be a function which accepts data object and return text string, or a sting with optional template markers"

	};

	dhtmlx.assert_rule_boolean = function(a) {

		if (typeof a == "boolean") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_boolean.describe = function() {

		return "{Boolean} true or false"

	};

	dhtmlx.assert_rule_object = function(a, b) {

		if (typeof a == "object") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_object.describe = function() {

		return "{Object} Configuration object"

	};

	dhtmlx.assert_rule_string = function(a) {

		if (typeof a == "string") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_string.describe = function() {

		return "{String} Plain string"

	};

	dhtmlx.assert_rule_htmlpt = function(a) {

		return !!dhtmlx.toNode(a)

	};

	dhtmlx.assert_rule_htmlpt.describe = function() {

		return "{Object},{String} HTML node or ID of HTML Node"

	};

	dhtmlx.assert_rule_notdocumented = function(a) {

		return false

	};

	dhtmlx.assert_rule_notdocumented.describe = function() {

		return "This options wasn't documented"

	};

	dhtmlx.assert_rule_key = function(b) {

		var a = function(c) {

			return b[c]

		};

		a.describe = function() {

			var e = [];

			for ( var c in b) {

				e.push(c)

			}

			return "{String} can take one of next values: " + e.join(", ")

		};

		return a

	};

	dhtmlx.assert_rule_dimension = function(a) {

		if (a * 1 == a && !isNaN(a) && a >= 0) {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_dimension.describe = function() {

		return "{Integer} value must be a positive number"

	};

	dhtmlx.assert_rule_number = function(a) {

		if (typeof a == "number") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_number.describe = function() {

		return "{Integer} value must be a number"

	};

	dhtmlx.assert_rule_function = function(a) {

		if (typeof a == "function") {

			return true

		}

		return false

	};

	dhtmlx.assert_rule_function.describe = function() {

		return "{Function} value must be a custom function"

	};

	dhtmlx.assert_rule_any = function(a) {

		return true

	};

	dhtmlx.assert_rule_any.describe = function() {

		return "Any value"

	};

	dhtmlx.assert_rule_mix = function(e, c) {

		var g = function(a) {

			if (e(a) || c(a)) {

				return true

			}

			return false

		};

		g.describe = function() {

			return e.describe()

		};

		return g

	}

}

dhtmlx.codebase = "./";

dhtmlx.copy = function(b) {

	var a = dhtmlx.copy._function;

	a.prototype = b;

	return new a()

};

dhtmlx.copy._function = function() {

};

dhtmlx.extend = function(b, a) {

	for ( var c in a) {

		b[c] = a[c]

	}

	if (dhtmlx.assert_enabled() && a._assert) {

		b._assert();

		b._assert = null

	}

	dhtmlx.assert(b, "Invalid nesting target");

	dhtmlx.assert(a, "Invalid nesting source");

	if (a._init) {

		b._init()

	}

	return b

};

dhtmlx.proto_extend = function() {

	var h = arguments;

	var c = h[0];

	var b = [];

	for (var g = h.length - 1; g > 0; g--) {

		if (typeof h[g] == "function") {

			h[g] = h[g].prototype

		}

		for ( var e in h[g]) {

			if (e == "_init") {

				b.push(h[g][e])

			} else {

				if (!c[e]) {

					c[e] = h[g][e]

				}

			}

		}

	}

	if (h[0]._init) {

		b.push(h[0]._init)

	}

	c._init = function() {

		for (var j = 0; j < b.length; j++) {

			b[j].apply(this, arguments)

		}

	};

	c.base = h[1];

	var a = function(j) {

		this._init(j);

		if (this._parseSettings) {

			this._parseSettings(j, this.defaults)

		}

	};

	a.prototype = c;

	c = h = null;

	return a

};

dhtmlx.bind = function(b, a) {

	return function() {

		return b.apply(a, arguments)

	}

};

dhtmlx.require = function(a) {

	if (!dhtmlx._modules[a]) {

		dhtmlx.assert(dhtmlx.ajax, "load module is required");

		dhtmlx.exec(dhtmlx.ajax().sync().get(dhtmlx.codebase + a).responseText);

		dhtmlx._modules[a] = true

	}

};

dhtmlx._modules = {};

dhtmlx.exec = function(code) {

	if (window.execScript) {

		window.execScript(code)

	} else {

		window.eval(code)

	}

};

dhtmlx.methodPush = function(a, c, b) {

	return function() {

		var e = false;

		e = a[c].apply(a, arguments);

		return e

	}

};

dhtmlx.isNotDefined = function(b) {

	return typeof b == "undefined"

};

dhtmlx.delay = function(e, b, c, a) {

	setTimeout(function() {

		var g = e.apply(b, c);

		e = b = c = null;

		return g

	}, a || 1)

};

dhtmlx.uid = function() {

	if (!this._seed) {

		this._seed = (new Date).valueOf()

	}

	this._seed++;

	return this._seed

};

dhtmlx.toNode = function(a) {

	if (typeof a == "string") {

		return document.getElementById(a)

	}

	return a

};

dhtmlx.toArray = function(a) {

	return dhtmlx.extend((a || []), dhtmlx.PowerArray)

};

dhtmlx.toFunctor = function(str) {

	return (typeof (str) == "string") ? eval(str) : str

};

dhtmlx._events = {};

dhtmlx.event = function(e, c, a, b) {

	e = dhtmlx.toNode(e);

	var g = dhtmlx.uid();

	dhtmlx._events[g] = [ e, c, a ];

	if (b) {

		a = dhtmlx.bind(a, b)

	}

	if (e.addEventListener) {

		e.addEventListener(c, a, false)

	} else {

		if (e.attachEvent) {

			e.attachEvent("on" + c, a)

		}

	}

	return g

};

dhtmlx.eventRemove = function(b) {

	if (!b) {

		return

	}

	dhtmlx.assert(this._events[b], "Removing non-existing event");

	var a = dhtmlx._events[b];

	if (a[0].removeEventListener) {

		a[0].removeEventListener(a[1], a[2], false)

	} else {

		if (a[0].detachEvent) {

			a[0].detachEvent("on" + a[1], a[2])

		}

	}

	delete this._events[b]

};

dhtmlx.log = function(b, c, a) {

	if (window.console && console.log) {

		b = b.toLowerCase();

		if (window.console[b]) {

			window.console[b](c || "unknown error")

		} else {

			window.console.log(b + ": " + c)

		}

		if (a) {

			window.console.log(a)

		}

	}

};

dhtmlx.log_full_time = function(a) {

	dhtmlx._start_time_log = new Date();

	dhtmlx.log("Info", "Timing start [" + a + "]");

	window.setTimeout(function() {

		var b = new Date();

		dhtmlx

				.log("Info", "Timing end [" + a + "]:"

						+ (b.valueOf() - dhtmlx._start_time_log.valueOf())

						/ 1000 + "s")

	}, 1)

};

dhtmlx.log_time = function(a) {

	var c = "_start_time_log" + a;

	if (!dhtmlx[c]) {

		dhtmlx[c] = new Date();

		dhtmlx.log("Info", "Timing start [" + a + "]")

	} else {

		var b = new Date();

		dhtmlx.log("Info", "Timing end [" + a + "]:"

				+ (b.valueOf() - dhtmlx[c].valueOf()) / 1000 + "s");

		dhtmlx[c] = null

	}

};

dhtmlx.error = function(b, a) {

	dhtmlx.log("error", b, a)

};

dhtmlx.EventSystem = {

	_init : function() {

		this._events = {};

		this._handlers = {};

		this._map = {}

	},

	block : function() {

		this._events._block = true

	},

	unblock : function() {

		this._events._block = false

	},

	mapEvent : function(a) {

		dhtmlx.extend(this._map, a)

	},

	callEvent : function(c, g) {

		if (this._events._block) {

			return true

		}

		c = c.toLowerCase();

		dhtmlx.assert_event_call(this, c, g);

		var e = this._events[c.toLowerCase()];

		var a = true;

		if (dhtmlx.debug) {

			dhtmlx.log("info", "[" + this.name + "] event:" + c, g)

		}

		if (e) {

			for (var b = 0; b < e.length; b++) {

				if (e[b].apply(this, (g || [])) === false) {

					a = false

				}

			}

		}

		if (this._map[c] && !this._map[c].callEvent(c, g)) {

			a = false

		}

		return a

	},

	attachEvent : function(b, a, e) {

		b = b.toLowerCase();

		dhtmlx.assert_event_attach(this, b);

		e = e || dhtmlx.uid();

		a = dhtmlx.toFunctor(a);

		var c = this._events[b] || dhtmlx.toArray();

		c.push(a);

		this._events[b] = c;

		this._handlers[e] = {

			f : a,

			t : b

		};

		return e

	},

	detachEvent : function(e) {

		if (this._handlers[e]) {

			var b = this._handlers[e].t;

			var a = this._handlers[e].f;

			var c = this._events[b];

			c.remove(a);

			delete this._handlers[e]

		}

	}

};

dhtmlx.PowerArray = {

	removeAt : function(b, a) {

		if (b >= 0) {

			this.splice(b, (a || 1))

		}

	},

	remove : function(a) {

		this.removeAt(this.find(a))

	},

	insertAt : function(c, e) {

		if (!e && e !== 0) {

			this.push(c)

		} else {

			var a = this.splice(e, (this.length - e));

			this[e] = c;

			this.push.apply(this, a)

		}

	},

	find : function(a) {

		for (i = 0; i < this.length; i++) {

			if (a == this[i]) {

				return i

			}

		}

		return -1

	},

	each : function(a, c) {

		for (var b = 0; b < this.length; b++) {

			a.call((c || this), this[b])

		}

	},

	map : function(a, c) {

		for (var b = 0; b < this.length; b++) {

			this[b] = a.call((c || this), this[b])

		}

		return this

	}

};

dhtmlx.env = {};

if (navigator.userAgent.indexOf("Opera") != -1) {

	dhtmlx._isOpera = true

} else {

	dhtmlx._isIE = !!document.all;

	dhtmlx._isFF = !document.all;

	dhtmlx._isWebKit = (navigator.userAgent.indexOf("KHTML") != -1);

	if (navigator.appVersion.indexOf("MSIE 8.0") != -1

			&& document.compatMode != "BackCompat") {

		dhtmlx._isIE = 8

	}

	if (navigator.appVersion.indexOf("MSIE 9.0") != -1

			&& document.compatMode != "BackCompat") {

		dhtmlx._isIE = 9

	}

}

dhtmlx.env = {};

(function() {

	dhtmlx.env.transform = false;

	dhtmlx.env.transition = false;

	var a = {};

	a.names = [ "transform", "transition" ];

	a.transform = [ "transform", "WebkitTransform", "MozTransform",

			"oTransform", "msTransform" ];

	a.transition = [ "transition", "WebkitTransition", "MozTransition",

			"oTransition" ];

	var e = document.createElement("DIV");

	var c;

	for (var b = 0; b < a.names.length; b++) {

		while (p = a[a.names[b]].pop()) {

			if (typeof e.style[p] != "undefined") {

				dhtmlx.env[a.names[b]] = true

			}

		}

	}

})();

dhtmlx.env.transform_prefix = (function() {

	var a;

	if (dhtmlx._isOpera) {

		a = "-o-"

	} else {

		a = "";

		if (dhtmlx._isFF) {

			a = "-moz-"

		}

		if (dhtmlx._isWebKit) {

			a = "-webkit-"

		}

	}

	return a

})();

dhtmlx.env.svg = (function() {

	return document.implementation.hasFeature(

			"http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1")

})();

dhtmlx.zIndex = {

	drag : 10000

};

dhtmlx.html = {

	create : function(b, a, c) {

		a = a || {};

		var e = document.createElement(b);

		for ( var g in a) {

			e.setAttribute(g, a[g])

		}

		if (a.style) {

			e.style.cssText = a.style

		}

		if (a["class"]) {

			e.className = a["class"]

		}

		if (c) {

			e.innerHTML = c

		}

		return e

	},

	getValue : function(a) {

		a = dhtmlx.toNode(a);

		if (!a) {

			return ""

		}

		return dhtmlx.isNotDefined(a.value) ? a.innerHTML : a.value

	},

	remove : function(b) {

		if (b instanceof Array) {

			for (var a = 0; a < b.length; a++) {

				this.remove(b[a])

			}

		} else {

			if (b && b.parentNode) {

				b.parentNode.removeChild(b)

			}

		}

	},

	insertBefore : function(b, c, a) {

		if (!b) {

			return

		}

		if (c) {

			c.parentNode.insertBefore(b, c)

		} else {

			a.appendChild(b)

		}

	},

	locate : function(b, g) {

		b = b || event;

		var a = b.target || b.srcElement;

		while (a) {

			if (a.getAttribute) {

				var c = a.getAttribute(g);

				if (c) {

					return c

				}

			}

			a = a.parentNode

		}

		return null

	},

	offset : function(e) {

		if (e.getBoundingClientRect) {

			var j = e.getBoundingClientRect();

			var l = document.body;

			var b = document.documentElement;

			var a = window.pageYOffset || b.scrollTop || l.scrollTop;

			var g = window.pageXOffset || b.scrollLeft || l.scrollLeft;

			var h = b.clientTop || l.clientTop || 0;

			var m = b.clientLeft || l.clientLeft || 0;

			var n = j.top + a - h;

			var c = j.left + g - m;

			return {

				y : Math.round(n),

				x : Math.round(c)

			}

		} else {

			var n = 0, c = 0;

			while (e) {

				n = n + parseInt(e.offsetTop, 10);

				c = c + parseInt(e.offsetLeft, 10);

				e = e.offsetParent

			}

			return {

				y : n,

				x : c

			}

		}

	},

	pos : function(a) {

		a = a || event;

		if (a.pageX || a.pageY) {

			return {

				x : a.pageX,

				y : a.pageY

			}

		}

		var b = ((dhtmlx._isIE) && (document.compatMode != "BackCompat")) ? document.documentElement

				: document.body;

		return {

			x : a.clientX + b.scrollLeft - b.clientLeft,

			y : a.clientY + b.scrollTop - b.clientTop

		}

	},

	preventEvent : function(a) {

		if (a && a.preventDefault) {

			a.preventDefault()

		}

		dhtmlx.html.stopEvent(a)

	},

	stopEvent : function(a) {

		(a || event).cancelBubble = true;

		return false

	},

	addCss : function(b, a) {

		b.className += " " + a

	},

	removeCss : function(b, a) {

		b.className = b.className.replace(RegExp(a, "g"), "")

	}

};

(function() {

	var a = document.getElementsByTagName("SCRIPT");

	dhtmlx.assert(a.length, "Can't locate codebase");

	if (a.length) {

		a = (a[a.length - 1].getAttribute("src") || "").split("/");

		a.splice(a.length - 1, 1);

		dhtmlx.codebase = a.slice(0, a.length).join("/") + "/"

	}

})();

if (!dhtmlx.ui) {

	dhtmlx.ui = {}

}

dhtmlx.Destruction = {

	_init : function() {

		dhtmlx.destructors.push(this)

	},

	destructor : function(a) {

		this.destructor = function() {

		};

		this._htmlmap = null;

		this._htmlrows = null;

		if (this._html) {

			document.body.appendChild(this._html)

		}

		this._html = null;

		if (this._obj) {

			this._obj.innerHTML = "";

			this._obj._htmlmap = null

		}

		this._obj = this._dataobj = null;

		this.data = null;

		this._events = this._handlers = {};

		this.canvases = [];

		if (this.render) {

			this.render = function() {

			}

		}

	}

};

dhtmlx.destructors = [];

dhtmlx.event(window, "unload", function() {

	if (dhtmlx.destructors) {

		for (var c = 0; c < dhtmlx.destructors.length; c++) {

			dhtmlx.destructors[c].destructor(-1)

		}

		dhtmlx.destructors = []

	}

	for ( var b in dhtmlx._events) {

		var e = dhtmlx._events[b];

		if (e[0].removeEventListener) {

			e[0].removeEventListener(e[1], e[2], false)

		} else {

			if (e[0].detachEvent) {

				e[0].detachEvent("on" + e[1], e[2])

			}

		}

		delete dhtmlx._events[b]

	}

});

dhtmlx.ajax = function(a, b, c) {

	if (arguments.length !== 0) {

		var e = new dhtmlx.ajax();

		if (c) {

			e.master = c

		}

		e.get(a, null, b)

	}

	if (!this.getXHR) {

		return new dhtmlx.ajax()

	}

	return this

};

dhtmlx.ajax.prototype = {

	getXHR : function() {

		if (dhtmlx._isIE) {

			return new ActiveXObject("Microsoft.xmlHTTP")

		} else {

			return new XMLHttpRequest()

		}

	},

	send : function(g, m, j) {

		var b = this.getXHR();

		if (typeof j == "function") {

			j = [ j ]

		}

		if (typeof m == "object") {

			var h = [];

			for ( var c in m) {

				var l = m[c];

				if (l === null || l === dhtmlx.undefined) {

					l = ""

				}

				h.push(c + "=" + encodeURIComponent(l))

			}

			m = h.join("&")

		}

		if (m && !this.post) {

			g = g + (g.indexOf("?") != -1 ? "&" : "?") + m;

			m = null

		}

		b.open(this.post ? "POST" : "GET", g, !this._sync);

		if (this.post) {

			b.setRequestHeader("Content-type",

					"application/x-www-form-urlencoded")

		}

		var e = this;

		b.onreadystatechange = function() {

			if (!b.readyState || b.readyState == 4) {

				if (j && e) {

					for (var a = 0; a < j.length; a++) {

						if (j[a]) {

							j[a].call((e.master || e), b.responseText,

									b.responseXML, b)

						}

					}

				}

				e.master = null;

				j = e = null

			}

		};

		b.send(m || null);

		return b

	},

	get : function(a, c, b) {

		this.post = false;

		return this.send(a, c, b)

	},

	post : function(a, c, b) {

		this.post = true;

		return this.send(a, c, b)

	},

	sync : function() {

		this._sync = true;

		return this

	}

};

dhtmlx.AtomDataLoader = {

	_init : function(a) {

		this.data = {};

		if (a) {

			this._settings.datatype = a.datatype || "json";

			this._after_init.push(this._load_when_ready)

		}

	},

	_load_when_ready : function() {

		this._ready_for_data = true;

		if (this._settings.url) {

			this.url_setter(this._settings.url)

		}

		if (this._settings.data) {

			this.data_setter(this._settings.data)

		}

	},

	url_setter : function(a) {

		if (!this._ready_for_data) {

			return a

		}

		this.load(a, this._settings.datatype);

		return a

	},

	data_setter : function(a) {

		if (!this._ready_for_data) {

			return a

		}

		this.parse(a, this._settings.datatype);

		return true

	},

	load : function(a, b) {

		this.callEvent("onXLS", []);

		if (typeof b == "string") {

			this.data.driver = dhtmlx.DataDriver[b];

			b = arguments[2]

		} else {

			this.data.driver = dhtmlx.DataDriver[this._settings.datatype

					|| "xml"]

		}

		if (window.dhx4) {

			return dhx4.ajax.get(a, dhtmlx.bind(function(e) {

				var c = e.xmlDoc;

				var h = c.responseText;

				var g = c.responseXML;

				if (this._onLoad) {

					this._onLoad.call(this, h, g, c)

				}

				if (b) {

					b.call(this, h, g, c)

				}

			}, this))

		} else {

			dhtmlx.ajax(a, [ this._onLoad, b ], this)

		}

	},

	parse : function(b, a) {

		this.callEvent("onXLS", []);

		this.data.driver = dhtmlx.DataDriver[a || "xml"];

		this._onLoad(b, null)

	},

	_onLoad : function(g, b, a) {

		var c = this.data.driver;

		var e = c.getRecords(c.toObject(g, b))[0];

		this.data = (c ? c.getDetails(e) : g);

		this.callEvent("onXLE", [])

	},

	_check_data_feed : function(b) {

		if (!this._settings.dataFeed || this._ignore_feed || !b) {

			return true

		}

		var a = this._settings.dataFeed;

		if (typeof a == "function") {

			return a.call(this, (b.id || b), b)

		}

		a = a + (a.indexOf("?") == -1 ? "?" : "&") + "action=get&id="

				+ encodeURIComponent(b.id || b);

		this.callEvent("onXLS", []);

		dhtmlx.ajax(a, function(e, c) {

			this._ignore_feed = true;

			this.setValues(dhtmlx.DataDriver.json.toObject(e)[0]);

			this._ignore_feed = false;

			this.callEvent("onXLE", [])

		}, this);

		return false

	}

};

dhtmlx.DataDriver = {};

dhtmlx.DataDriver.json = {

	toObject : function(data) {

		if (!data) {

			data = "[]"

		}

		if (typeof data == "string") {

			eval("dhtmlx.temp=" + data);

			return dhtmlx.temp

		}

		return data

	},

	getRecords : function(a) {

		if (a && a.data) {

			a = a.data

		}

		if (a && !(a instanceof Array)) {

			return [ a ]

		}

		return a

	},

	getDetails : function(a) {

		return a

	},

	getInfo : function(a) {

		return {

			_size : (a.total_count || 0),

			_from : (a.pos || 0),

			_key : (a.dhx_security)

		}

	}

};

dhtmlx.DataDriver.json_ext = {

	toObject : function(data) {

		if (!data) {

			data = "[]"

		}

		if (typeof data == "string") {

			var temp;

			eval("temp=" + data);

			dhtmlx.temp = [];

			var header = temp.header;

			for (var i = 0; i < temp.data.length; i++) {

				var item = {};

				for (var j = 0; j < header.length; j++) {

					if (typeof (temp.data[i][j]) != "undefined") {

						item[header[j]] = temp.data[i][j]

					}

				}

				dhtmlx.temp.push(item)

			}

			return dhtmlx.temp

		}

		return data

	},

	getRecords : function(a) {

		if (a && !(a instanceof Array)) {

			return [ a ]

		}

		return a

	},

	getDetails : function(a) {

		return a

	},

	getInfo : function(a) {

		return {

			_size : (a.total_count || 0),

			_from : (a.pos || 0)

		}

	}

};

dhtmlx.DataDriver.html = {

	toObject : function(b) {

		if (typeof b == "string") {

			var a = null;

			if (b.indexOf("<") == -1) {

				a = dhtmlx.toNode(b)

			}

			if (!a) {

				a = document.createElement("DIV");

				a.innerHTML = b

			}

			return a.getElementsByTagName(this.tag)

		}

		return b

	},

	getRecords : function(a) {

		if (a.tagName) {

			return a.childNodes

		}

		return a

	},

	getDetails : function(a) {

		return dhtmlx.DataDriver.xml.tagToObject(a)

	},

	getInfo : function(a) {

		return {

			_size : 0,

			_from : 0

		}

	},

	tag : "LI"

};

dhtmlx.DataDriver.jsarray = {

	toObject : function(data) {

		if (typeof data == "string") {

			eval("dhtmlx.temp=" + data);

			return dhtmlx.temp

		}

		return data

	},

	getRecords : function(a) {

		return a

	},

	getDetails : function(c) {

		var a = {};

		for (var b = 0; b < c.length; b++) {

			a["data" + b] = c[b]

		}

		return a

	},

	getInfo : function(a) {

		return {

			_size : 0,

			_from : 0

		}

	}

};

dhtmlx.DataDriver.csv = {

	toObject : function(a) {

		return a

	},

	getRecords : function(a) {

		return a.split(this.row)

	},

	getDetails : function(c) {

		c = this.stringToArray(c);

		var a = {};

		for (var b = 0; b < c.length; b++) {

			a["data" + b] = c[b]

		}

		return a

	},

	getInfo : function(a) {

		return {

			_size : 0,

			_from : 0

		}

	},

	stringToArray : function(b) {

		b = b.split(this.cell);

		for (var a = 0; a < b.length; a++) {

			b[a] = b[a].replace(/^[ \t\n\r]*(\"|)/g, "").replace(

					/(\"|)[ \t\n\r]*$/g, "")

		}

		return b

	},

	row : "\n",

	cell : ","

};

dhtmlx.DataDriver.xml = {

	toObject : function(b, a) {

		if (a && (a = this.checkResponse(b, a))) {

			return a

		}

		if (typeof b == "string") {

			return this.fromString(b)

		}

		return b

	},

	getRecords : function(a) {

		return this.xpath(a, this.records)

	},

	records : "/*/item",

	getDetails : function(a) {

		return this.tagToObject(a, {})

	},

	getInfo : function(a) {

		return {

			_size : (a.documentElement.getAttribute("total_count") || 0),

			_from : (a.documentElement.getAttribute("pos") || 0),

			_key : (a.documentElement.getAttribute("dhx_security"))

		}

	},

	xpath : function(g, n) {

		if (window.XPathResult) {

			var c = g;

			if (g.nodeName.indexOf("document") == -1) {

				g = g.ownerDocument

			}

			var l = [];

			var b = g.evaluate(n, c, null, XPathResult.ANY_TYPE, null);

			var m = b.iterateNext();

			while (m) {

				l.push(m);

				m = b.iterateNext()

			}

			return l

		} else {

			var j = true;

			try {

				if (typeof (g.selectNodes) == "undefined") {

					j = false

				}

			} catch (h) {

			}

			if (j) {

				return g.selectNodes(n)

			} else {

				var a = n.split("/").pop();

				return g.getElementsByTagName(a)

			}

		}

	},

	tagToObject : function(e, n) {

		n = n || {};

		var h = false;

		var c = e.childNodes;

		var m = {};

		for (var l = 0; l < c.length; l++) {

			if (c[l].nodeType == 1) {

				var j = c[l].tagName;

				if (typeof n[j] != "undefined") {

					if (!(n[j] instanceof Array)) {

						n[j] = [ n[j] ]

					}

					n[j].push(this.tagToObject(c[l], {}))

				} else {

					n[c[l].tagName] = this.tagToObject(c[l], {})

				}

				h = true

			}

		}

		var g = e.attributes;

		if (g && g.length) {

			for (var l = 0; l < g.length; l++) {

				n[g[l].name] = g[l].value

			}

			h = true

		}

		if (!h) {

			return this.nodeValue(e)

		}

		n.value = this.nodeValue(e);

		return n

	},

	nodeValue : function(a) {

		if (a.firstChild) {

			return a.firstChild.wholeText || a.firstChild.data

		}

		return ""

	},

	fromString : function(b) {

		if (window.DOMParser && !dhtmlx._isIE) {

			return (new DOMParser()).parseFromString(b, "text/xml")

		}

		if (window.ActiveXObject) {

			var a = new ActiveXObject("Microsoft.xmlDOM");

			a.loadXML(b);

			return a

		}

		dhtmlx.error("Load from xml string is not supported")

	},

	checkResponse : function(e, c) {

		if (c && (c.firstChild && c.firstChild.tagName != "parsererror")) {

			return c

		}

		var b = this.fromString(e.replace(/^[\s]+/, ""));

		if (b) {

			return b

		}

		dhtmlx.error("xml can't be parsed", e)

	}

};

dhtmlx.DataLoader = {

	_init : function(a) {

		a = a || "";

		this.name = "DataStore";

		this.data = (a.datastore) || (new dhtmlx.DataStore());

		this._readyHandler = this.data.attachEvent("onStoreLoad", dhtmlx.bind(

				this._call_onready, this))

	},

	load : function(a, b) {

		dhtmlx.AtomDataLoader.load.apply(this, arguments);

		if (!this.data.feed) {

			this.data.feed = function(e, c) {

				if (this._load_count) {

					return this._load_count = [ e, c ]

				} else {

					this._load_count = true

				}

				this.load(a + ((a.indexOf("?") == -1) ? "?" : "&")

						+ "posStart=" + e + "&count=" + c, function() {

					var g = this._load_count;

					this._load_count = false;

					if (typeof g == "object") {

						this.data.feed.apply(this, g)

					}

				})

			}

		}

	},

	_onLoad : function(c, b, a) {

		this.data._parse(this.data.driver.toObject(c, b));

		this.callEvent("onXLE", []);

		if (this._readyHandler) {

			this.data.detachEvent(this._readyHandler);

			this._readyHandler = null

		}

	},

	dataFeed_setter : function(a) {

		this.data.attachEvent("onBeforeFilter", dhtmlx.bind(function(j, h) {

			if (this._settings.dataFeed) {

				var g = {};

				if (!j && !g) {

					return

				}

				if (typeof j == "function") {

					if (!h) {

						return

					}

					j(h, g)

				} else {

					g = {

						text : h

					}

				}

				this.clearAll();

				var b = this._settings.dataFeed;

				if (typeof b == "function") {

					return b.call(this, h, g)

				}

				var e = [];

				for ( var c in g) {

					e.push("dhx_filter[" + c + "]=" + encodeURIComponent(g[c]))

				}

				this.load(b + (b.indexOf("?") < 0 ? "?" : "&") + e.join("&"),

						this._settings.datatype);

				return false

			}

		}, this));

		return a

	},

	_call_onready : function() {

		if (this._settings.ready) {

			var a = dhtmlx.toFunctor(this._settings.ready);

			if (a && a.call) {

				a.apply(this, arguments)

			}

		}

	}

};

dhtmlx.DataStore = function() {

	this.name = "DataStore";

	dhtmlx.extend(this, dhtmlx.EventSystem);

	this.setDriver("xml");

	this.pull = {};

	this.order = dhtmlx.toArray()

};

dhtmlx.DataStore.prototype = {

	setDriver : function(a) {

		dhtmlx.assert(dhtmlx.DataDriver[a], "incorrect DataDriver");

		this.driver = dhtmlx.DataDriver[a]

	},

	_parse : function(g) {

		this.callEvent("onParse", [ this.driver, g ]);

		if (this._filter_order) {

			this.filter()

		}

		var h = this.driver.getInfo(g);

		if (h._key) {

			dhtmlx.security_key = h._key

		}

		var e = this.driver.getRecords(g);

		var m = (h._from || 0) * 1;

		if (m === 0 && this.order[0]) {

			m = this.order.length

		}

		var b = 0;

		for (var c = 0; c < e.length; c++) {

			var a = this.driver.getDetails(e[c]);

			var l = this.id(a);

			if (!this.pull[l]) {

				this.order[b + m] = l;

				b++

			}

			this.pull[l] = a;

			if (this.extraParser) {

				this.extraParser(a)

			}

			if (this._scheme) {

				if (this._scheme.$init) {

					this._scheme.$update(a)

				} else {

					if (this._scheme.$update) {

						this._scheme.$update(a)

					}

				}

			}

		}

		for (var c = 0; c < h._size; c++) {

			if (!this.order[c]) {

				var l = dhtmlx.uid();

				var a = {

					id : l,

					$template : "loading"

				};

				this.pull[l] = a;

				this.order[c] = l

			}

		}

		this.callEvent("onStoreLoad", [ this.driver, g ]);

		this.refresh()

	},

	id : function(a) {

		return a.id || (a.id = dhtmlx.uid())

	},

	changeId : function(b, a) {

		dhtmlx.assert(this.pull[b], "Can't change id, for non existing item: "

				+ b);

		this.pull[a] = this.pull[b];

		this.pull[a].id = a;

		this.order[this.order.find(b)] = a;

		if (this._filter_order) {

			this._filter_order[this._filter_order.find(b)] = a

		}

		this.callEvent("onIdChange", [ b, a ]);

		if (this._render_change_id) {

			this._render_change_id(b, a)

		}

	},

	get : function(a) {

		return this.item(a)

	},

	set : function(b, a) {

		return this.update(b, a)

	},

	item : function(a) {

		return this.pull[a]

	},

	update : function(b, a) {

		if (this._scheme && this._scheme.$update) {

			this._scheme.$update(a)

		}

		if (this.callEvent("onBeforeUpdate", [ b, a ]) === false) {

			return false

		}

		this.pull[b] = a;

		this.refresh(b)

	},

	refresh : function(a) {

		if (this._skip_refresh) {

			return

		}

		if (a) {

			this.callEvent("onStoreUpdated", [ a, this.pull[a], "update" ])

		} else {

			this.callEvent("onStoreUpdated", [ null, null, null ])

		}

	},

	silent : function(a) {

		this._skip_refresh = true;

		a.call(this);

		this._skip_refresh = false

	},

	getRange : function(e, c) {

		if (e) {

			e = this.indexById(e)

		} else {

			e = this.startOffset || 0

		}

		if (c) {

			c = this.indexById(c)

		} else {

			c = Math.min((this.endOffset || Infinity), (this.dataCount() - 1));

			if (c < 0) {

				c = 0

			}

		}

		if (this.min) {

			e = this.min

		}

		if (this.max) {

			c = this.max

		}

		if (e > c) {

			var b = c;

			c = e;

			e = b

		}

		return this.getIndexRange(e, c)

	},

	getIndexRange : function(e, c) {

		c = Math.min((c || Infinity), this.dataCount() - 1);

		var a = dhtmlx.toArray();

		for (var b = (e || 0); b <= c; b++) {

			a.push(this.item(this.order[b]))

		}

		return a

	},

	dataCount : function() {

		return this.order.length

	},

	exists : function(a) {

		return !!(this.pull[a])

	},

	move : function(a, e) {

		if (a < 0 || e < 0) {

			dhtmlx.error("DataStore::move", "Incorrect indexes");

			return

		}

		var c = this.idByIndex(a);

		var b = this.item(c);

		this.order.removeAt(a);

		this.order.insertAt(c, Math.min(this.order.length, e));

		this.callEvent("onStoreUpdated", [ c, b, "move" ])

	},

	scheme : function(a) {

		this._scheme = a

	},

	sync : function(g, e, a) {

		if (typeof e != "function") {

			a = e;

			e = null

		}

		if (dhtmlx.debug_bind) {

			this.debug_sync_master = g;

			dhtmlx.log("[sync] " + this.debug_bind_master.name + "@"

					+ this.debug_bind_master._settings.id + " <= "

					+ this.debug_sync_master.name + "@"

					+ this.debug_sync_master._settings.id)

		}

		var c = g;

		if (g.name != "DataStore") {

			g = g.data

		}

		var b = dhtmlx.bind(function(l, h, j) {

			if (j != "update" || e) {

				l = null

			}

			if (!l) {

				this.order = dhtmlx.toArray([].concat(g.order));

				this._filter_order = null;

				this.pull = g.pull;

				if (e) {

					this.silent(e)

				}

				if (this._on_sync) {

					this._on_sync()

				}

			}

			if (dhtmlx.debug_bind) {

				dhtmlx.log("[sync:request] " + this.debug_sync_master.name

						+ "@" + this.debug_sync_master._settings.id + " <= "

						+ this.debug_bind_master.name + "@"

						+ this.debug_bind_master._settings.id)

			}

			if (!a) {

				this.refresh(l)

			} else {

				a = false

			}

		}, this);

		g.attachEvent("onStoreUpdated", b);

		this.feed = function(j, h) {

			c.loadNext(h, j)

		};

		b()

	},

	add : function(g, a) {

		if (this._scheme) {

			g = g || {};

			for ( var b in this._scheme) {

				g[b] = g[b] || this._scheme[b]

			}

			if (this._scheme) {

				if (this._scheme.$init) {

					this._scheme.$update(g)

				} else {

					if (this._scheme.$update) {

						this._scheme.$update(g)

					}

				}

			}

		}

		var h = this.id(g);

		var e = this.dataCount();

		if (dhtmlx.isNotDefined(a) || a < 0) {

			a = e

		}

		if (a > e) {

			dhtmlx.log("Warning", "DataStore:add", "Index of out of bounds");

			a = Math.min(this.order.length, a)

		}

		if (this.callEvent("onBeforeAdd", [ h, g, a ]) === false) {

			return false

		}

		if (this.exists(h)) {

			return dhtmlx.error("Not unique ID")

		}

		this.pull[h] = g;

		this.order.insertAt(h, a);

		if (this._filter_order) {

			var c = this._filter_order.length;

			if (!a && this.order.length) {

				c = 0

			}

			this._filter_order.insertAt(h, c)

		}

		this.callEvent("onafterAdd", [ h, a ]);

		this.callEvent("onStoreUpdated", [ h, g, "add" ]);

		return h

	},

	remove : function(c) {

		if (c instanceof Array) {

			for (var a = 0; a < c.length; a++) {

				this.remove(c[a])

			}

			return

		}

		if (this.callEvent("onBeforeDelete", [ c ]) === false) {

			return false

		}

		if (!this.exists(c)) {

			return dhtmlx.error("Not existing ID", c)

		}

		var b = this.item(c);

		this.order.remove(c);

		if (this._filter_order) {

			this._filter_order.remove(c)

		}

		delete this.pull[c];

		this.callEvent("onafterdelete", [ c ]);

		this.callEvent("onStoreUpdated", [ c, b, "delete" ])

	},

	clearAll : function() {

		this.pull = {};

		this.order = dhtmlx.toArray();

		this.feed = null;

		this._filter_order = null;

		this.callEvent("onClearAll", []);

		this.refresh()

	},

	idByIndex : function(a) {

		if (a >= this.order.length || a < 0) {

			dhtmlx.log("Warning", "DataStore::idByIndex Incorrect index")

		}

		return this.order[a]

	},

	indexById : function(b) {

		var a = this.order.find(b);

		return a

	},

	next : function(b, a) {

		return this.order[this.indexById(b) + (a || 1)]

	},

	first : function() {

		return this.order[0]

	},

	last : function() {

		return this.order[this.order.length - 1]

	},

	previous : function(b, a) {

		return this.order[this.indexById(b) - (a || 1)]

	},

	sort : function(h, b, a) {

		var c = h;

		if (typeof h == "function") {

			c = {

				as : h,

				dir : b

			}

		} else {

			if (typeof h == "string") {

				c = {

					by : h,

					dir : b,

					as : a

				}

			}

		}

		var g = [ c.by, c.dir, c.as ];

		if (!this.callEvent("onbeforesort", g)) {

			return

		}

		if (this.order.length) {

			var j = dhtmlx.sort.create(c);

			var e = this.getRange(this.first(), this.last());

			e.sort(j);

			this.order = e.map(function(l) {

				return this.id(l)

			}, this)

		}

		this.refresh();

		this.callEvent("onaftersort", g)

	},

	filter : function(g, e) {

		if (!this.callEvent("onBeforeFilter", [ g, e ])) {

			return

		}

		if (this._filter_order) {

			this.order = this._filter_order;

			delete this._filter_order

		}

		if (!this.order.length) {

			return

		}

		if (g) {

			var b = g;

			e = e || "";

			if (typeof g == "string") {

				g = dhtmlx.Template.fromHTML(g);

				e = e.toString().toLowerCase();

				b = function(l, j) {

					return g(l).toLowerCase().indexOf(j) != -1

				}

			}

			var c = dhtmlx.toArray();

			for (var a = 0; a < this.order.length; a++) {

				var h = this.order[a];

				if (b(this.item(h), e)) {

					c.push(h)

				}

			}

			this._filter_order = this.order;

			this.order = c

		}

		this.refresh();

		this.callEvent("onAfterFilter", [])

	},

	each : function(c, b) {

		for (var a = 0; a < this.order.length; a++) {

			c.call((b || this), this.item(this.order[a]))

		}

	},

	provideApi : function(e, b) {

		this.debug_bind_master = e;

		if (b) {

			this.mapEvent({

				onbeforesort : e,

				onaftersort : e,

				onbeforeadd : e,

				onafteradd : e,

				onbeforedelete : e,

				onafterdelete : e,

				onbeforeupdate : e

			})

		}

		var c = [ "get", "set", "sort", "add", "remove", "exists", "idByIndex",

				"indexById", "item", "update", "refresh", "dataCount",

				"filter", "next", "previous", "clearAll", "first", "last",

				"serialize" ];

		for (var a = 0; a < c.length; a++) {

			e[c[a]] = dhtmlx.methodPush(this, c[a])

		}

		if (dhtmlx.assert_enabled()) {

			this.assert_event(e)

		}

	},

	serialize : function() {

		var c = this.order;

		var a = [];

		for (var b = 0; b < c.length; b++) {

			a.push(this.pull[c[b]])

		}

		return a

	}

};

dhtmlx.sort = {

	create : function(a) {

		return dhtmlx.sort.dir(a.dir, dhtmlx.sort.by(a.by, a.as))

	},

	as : {

		"int" : function(e, c) {

			e = e * 1;

			c = c * 1;

			return e > c ? 1 : (e < c ? -1 : 0)

		},

		string_strict : function(e, c) {

			e = e.toString();

			c = c.toString();

			return e > c ? 1 : (e < c ? -1 : 0)

		},

		string : function(e, c) {

			e = e.toString().toLowerCase();

			c = c.toString().toLowerCase();

			return e > c ? 1 : (e < c ? -1 : 0)

		}

	},

	by : function(b, a) {

		if (!b) {

			return a

		}

		if (typeof a != "function") {

			a = dhtmlx.sort.as[a || "string"]

		}

		b = dhtmlx.Template.fromHTML(b);

		return function(e, c) {

			return a(b(e), b(c))

		}

	},

	dir : function(b, a) {

		if (b == "asc") {

			return a

		}

		return function(e, c) {

			return a(e, c) * -1

		}

	}

};

dhtmlx.KeyEvents = {

	_init : function() {

		dhtmlx.event(this._obj, "keypress", this._onKeyPress, this)

	},

	_onKeyPress : function(b) {

		b = b || event;

		var a = b.which || b.keyCode;

		this.callEvent((this._edit_id ? "onEditKeyPress" : "onKeyPress"), [ a,

				b.ctrlKey, b.shiftKey, b ])

	}

};

dhtmlx.MouseEvents = {

	_init : function() {

		if (this.on_click) {

			dhtmlx.event(this._obj, "click", this._onClick, this);

			dhtmlx.event(this._obj, "contextmenu", this._onContext, this)

		}

		if (this.on_dblclick) {

			dhtmlx.event(this._obj, "dblclick", this._onDblClick, this)

		}

		if (this.on_mouse_move) {

			dhtmlx.event(this._obj, "mousemove", this._onMouse, this);

			dhtmlx.event(this._obj, (dhtmlx._isIE ? "mouseleave" : "mouseout"),

					this._onMouse, this)

		}

	},

	_onClick : function(a) {

		return this._mouseEvent(a, this.on_click, "ItemClick")

	},

	_onDblClick : function(a) {

		return this._mouseEvent(a, this.on_dblclick, "ItemDblClick")

	},

	_onContext : function(a) {

		var b = dhtmlx.html.locate(a, this._id);

		if (b && !this.callEvent("onBeforeContextMenu", [ b, a ])) {

			return dhtmlx.html.preventEvent(a)

		}

	},

	_onMouse : function(a) {

		if (dhtmlx._isIE) {

			a = document.createEventObject(event)

		}

		if (this._mouse_move_timer) {

			window.clearTimeout(this._mouse_move_timer)

		}

		this.callEvent("onMouseMoving", [ a ]);

		this._mouse_move_timer = window.setTimeout(dhtmlx.bind(function() {

			if (a.type == "mousemove") {

				this._onMouseMove(a)

			} else {

				this._onMouseOut(a)

			}

		}, this), 500)

	},

	_onMouseMove : function(a) {

		if (!this._mouseEvent(a, this.on_mouse_move, "MouseMove")) {

			this.callEvent("onMouseOut", [ a || event ])

		}

	},

	_onMouseOut : function(a) {

		this.callEvent("onMouseOut", [ a || event ])

	},

	_mouseEvent : function(j, h, b) {

		j = j || event;

		var a = j.target || j.srcElement;

		var c = "";

		var l = null;

		var g = false;

		while (a && a.parentNode) {

			if (!g && a.getAttribute) {

				l = a.getAttribute(this._id);

				if (l) {

					if (a.getAttribute("userdata")) {

						this.callEvent("onLocateData", [ l, a, j ])

					}

					if (!this.callEvent("on" + b, [ l, j, a ])) {

						return

					}

					g = true

				}

			}

			c = a.className;

			if (c) {

				c = c.split(" ");

				c = c[0] || c[1];

				if (h[c]) {

					return h[c].call(this, j, l

							|| dhtmlx.html.locate(j, this._id), a)

				}

			}

			a = a.parentNode

		}

		return g

	}

};

dhtmlx.Settings = {

	_init : function() {

		this._settings = this.config = {}

	},

	define : function(b, a) {

		if (typeof b == "object") {

			return this._parseSeetingColl(b)

		}

		return this._define(b, a)

	},

	_define : function(b, a) {

		dhtmlx.assert_settings.call(this, b, a);

		var c = this[b + "_setter"];

		return this._settings[b] = c ? c.call(this, a) : a

	},

	_parseSeetingColl : function(c) {

		if (c) {

			for ( var b in c) {

				this._define(b, c[b])

			}

		}

	},

	_parseSettings : function(c, a) {

		var b = dhtmlx.extend({}, a);

		if (typeof c == "object" && !c.tagName) {

			dhtmlx.extend(b, c)

		}

		this._parseSeetingColl(b)

	},

	_mergeSettings : function(a, c) {

		for ( var b in c) {

			switch (typeof a[b]) {

			case "object":

				a[b] = this._mergeSettings((a[b] || {}), c[b]);

				break;

			case "undefined":

				a[b] = c[b];

				break;

			default:

				break

			}

		}

		return a

	},

	_parseContainer : function(b, a, c) {

		if (typeof b == "object" && !b.tagName) {

			b = b.container

		}

		this._obj = this.$view = dhtmlx.toNode(b);

		if (!this._obj && c) {

			this._obj = c(b)

		}

		dhtmlx.assert(this._obj, "Incorrect html container");

		this._obj.className += " " + a;

		this._obj.onselectstart = function() {

			return false

		};

		this._dataobj = this._obj

	},

	_set_type : function(a) {

		if (typeof a == "object") {

			return this.type_setter(a)

		}

		dhtmlx.assert(this.types, "RenderStack :: Types are not defined");

		dhtmlx.assert(this.types[a], "RenderStack :: Inccorect type name", a);

		this.type = dhtmlx.extend({}, this.types[a]);

		this.customize()

	},

	customize : function(a) {

		if (a) {

			dhtmlx.extend(this.type, a)

		}

		this.type._item_start = dhtmlx.Template.fromHTML(this

				.template_item_start(this.type));

		this.type._item_end = this.template_item_end(this.type);

		this.render()

	},

	type_setter : function(a) {

		this._set_type(typeof a == "object" ? dhtmlx.Type.add(this, a) : a);

		return a

	},

	template_setter : function(a) {

		return this.type_setter({

			template : a

		})

	},

	css_setter : function(a) {

		this._obj.className += " " + a;

		return a

	}

};

dhtmlx.Template = {

	_cache : {},

	empty : function() {

		return ""

	},

	setter : function(a) {

		return dhtmlx.Template.fromHTML(a)

	},

	obj_setter : function(b) {

		var a = dhtmlx.Template.setter(b);

		var c = this;

		return function() {

			return a.apply(c, arguments)

		}

	},

	fromHTML : function(a) {

		if (typeof a == "function") {

			return a

		}

		if (this._cache[a]) {

			return this._cache[a]

		}

		a = (a || "").toString();

		a = a.replace(/[\r\n]+/g, "\\n");

		a = a.replace(/\{obj\.([^}?]+)\?([^:]*):([^}]*)\}/g,

				'"+(obj.$1?"$2":"$3")+"');

		a = a.replace(/\{common\.([^}\(]*)\}/g, '"+common.$1+"');

		a = a.replace(/\{common\.([^\}\(]*)\(\)\}/g,

				'"+(common.$1?common.$1(obj):"")+"');

		a = a.replace(/\{obj\.([^}]*)\}/g, '"+obj.$1+"');

		a = a.replace(/#([a-z0-9_]+)#/gi, '"+obj.$1+"');

		a = a.replace(/\{obj\}/g, '"+obj+"');

		a = a.replace(/\{-obj/g, "{obj");

		a = a.replace(/\{-common/g, "{common");

		a = 'return "' + a + '";';

		return this._cache[a] = Function("obj", "common", a)

	}

};

dhtmlx.Type = {

	add : function(c, b) {

		if (!c.types && c.prototype.types) {

			c = c.prototype

		}

		if (dhtmlx.assert_enabled()) {

			this.assert_event(b)

		}

		var a = b.name || "default";

		this._template(b);

		this._template(b, "edit");

		this._template(b, "loading");

		c.types[a] = dhtmlx.extend(dhtmlx.extend({},

				(c.types[a] || this._default)), b);

		return a

	},

	_default : {

		css : "default",

		template : function() {

			return ""

		},

		template_edit : function() {

			return ""

		},

		template_loading : function() {

			return "..."

		},

		width : 150,

		height : 80,

		margin : 5,

		padding : 0

	},

	_template : function(c, a) {

		a = "template" + (a ? ("_" + a) : "");

		var b = c[a];

		if (b && (typeof b == "string")) {

			if (b.indexOf("->") != -1) {

				b = b.split("->");

				switch (b[0]) {

				case "html":

					b = dhtmlx.html.getValue(b[1]).replace(/\"/g, '\\"');

					break;

				case "http":

					b = new dhtmlx.ajax().sync().get(b[1], {

						uid : (new Date()).valueOf()

					}).responseText;

					break;

				default:

					break

				}

			}

			c[a] = dhtmlx.Template.fromHTML(b)

		}

	}

};

dhtmlx.SingleRender = {

	_init : function() {

	},

	_toHTML : function(a) {

		return this.type._item_start(a, this.type)

				+ this.type.template(a, this.type) + this.type._item_end

	},

	render : function() {

		if (!this.callEvent || this.callEvent("onBeforeRender", [ this.data ])) {

			if (this.data) {

				this._dataobj.innerHTML = this._toHTML(this.data)

			}

			if (this.callEvent) {

				this.callEvent("onAfterRender", [])

			}

		}

	}

};

dhtmlx.ui.Tooltip = function(a) {

	this.name = "Tooltip";

	if (dhtmlx.assert_enabled()) {

		this._assert()

	}

	if (typeof a == "string") {

		a = {

			template : a

		}

	}

	dhtmlx.extend(this, dhtmlx.Settings);

	dhtmlx.extend(this, dhtmlx.SingleRender);

	this._parseSettings(a, {

		type : "default",

		dy : 0,

		dx : 20

	});

	this._dataobj = this._obj = document.createElement("DIV");

	this._obj.className = "dhx_tooltip";

	dhtmlx.html.insertBefore(this._obj, document.body.firstChild)

};

dhtmlx.ui.Tooltip.prototype = {

	show : function(a, b) {

		if (this._disabled) {

			return

		}

		if (this.data != a) {

			this.data = a;

			this.render(a)

		}

		this._obj.style.top = b.y + this._settings.dy + "px";

		this._obj.style.left = b.x + this._settings.dx + "px";

		this._obj.style.display = "block"

	},

	hide : function() {

		this.data = null;

		this._obj.style.display = "none"

	},

	disable : function() {

		this._disabled = true

	},

	enable : function() {

		this._disabled = false

	},

	types : {

		"default" : dhtmlx.Template.fromHTML("{obj.id}")

	},

	template_item_start : dhtmlx.Template.empty,

	template_item_end : dhtmlx.Template.empty

};

dhtmlx.AutoTooltip = {

	tooltip_setter : function(b) {

		var a = new dhtmlx.ui.Tooltip(b);

		this.attachEvent("onMouseMove", function(g, c) {

			a.show(this.get(g), dhtmlx.html.pos(c))

		});

		this.attachEvent("onMouseOut", function(g, c) {

			a.hide()

		});

		this.attachEvent("onMouseMoving", function(g, c) {

			a.hide()

		});

		return a

	}

};

dhtmlx.compat = function(a, b) {

	if (dhtmlx.compat[a]) {

		dhtmlx.compat[a](b)

	}

};

if (!dhtmlx.attaches) {

	dhtmlx.attaches = {}

}

dhtmlx.attaches.attachAbstract = function(b, a) {

	var g = document.createElement("DIV");

	g.id = "CustomObject_" + dhtmlx.uid();

	g.style.width = "100%";

	g.style.height = "100%";

	g.cmp = "grid";

	document.body.appendChild(g);

	this.attachObject(g.id);

	a.container = g.id;

	var e = this.vs[this.av];

	e.grid = new window[b](a);

	e.gridId = g.id;

	e.gridObj = g;

	e.grid.setSizes = function() {

		if (this.resize) {

			this.resize()

		} else {

			this.render()

		}

	};

	var c = "_viewRestore";

	return this.vs[this[c]()].grid

};

dhtmlx.attaches.attachDataView = function(a) {

	return this.attachAbstract("dhtmlXDataView", a)

};

dhtmlx.attaches.attachChart = function(a) {

	return this.attachAbstract("dhtmlXChart", a)

};

dhtmlx.compat.layout = function() {

};

function dhtmlXCellObject(c, a) {

	this.cell = document.createElement("DIV");

	this.cell.className = "dhx_cell" + (a || "");

	this._idd = c;

	this._isCell = true;

	this.conf = {

		borders : true,

		idx : {},

		css : a || "",

		idx_data : {

			cont : "dhx_cell_cont",

			pr1 : "dhx_cell_progress_bar",

			pr2 : "dhx_cell_progress_img",

			pr3 : "dhx_cell_progress_svg",

			menu : "dhx_cell_menu",

			toolbar : "dhx_cell_toolbar",

			ribbon : "dhx_cell_ribbon",

			sb : "dhx_cell_statusbar",

			cover : "dhx_cell_cover"

		},

		ofs_nodes : {

			t : {},

			b : {}

		}

	};

	this.dataNodes = {};

	this.views = {};

	var b = document.createElement("DIV");

	b.className = "dhx_cell_cont" + this.conf.css;

	this.cell.appendChild(b);

	b = null;

	this._updateIdx = function() {

		for ( var e in this.conf.idx) {

			this.conf.idx[e] = null;

			delete this.conf.idx[e]

		}

		for (var j = 0; j < this.cell.childNodes.length; j++) {

			var g = this.cell.childNodes[j].className;

			for ( var e in this.conf.idx_data) {

				var h = new RegExp(this.conf.idx_data[e]);

				if (g.match(h) != null) {

					this.conf.idx[e] = j

				}

			}

		}

		this.callEvent("_onIdxUpdated", [])

	};

	this._adjustAttached = function() {

		for ( var e in this.dataNodes) {

			if (this.dataNodes[e] != null

					&& typeof (this.dataNodes[e].setSizes) == "function") {

				this.dataNodes[e].setSizes()

			}

		}

		if (this.dataObj != null

				&& typeof (this.dataObj.setSizes) == "function") {

			if (this.dataType == "layout"

					&& typeof (window.dhtmlXLayoutCell) == "function"

					&& this instanceof window.dhtmlXLayoutCell

					&& this.dataObj._getMainInst() != this.layout

							._getMainInst()) {

				this.dataObj.setSizes();

				return

			}

			this.dataObj.setSizes.apply(this.dataObj, arguments)

		}

	};

	this._setSize = function(r, o, s, l, m, n, g, j) {

		if (this.conf.size == null) {

			this.conf.size = {}

		}

		if (j == null) {

			j = {}

		}

		var t = {

			left : "x",

			top : "y",

			width : "w",

			height : "h"

		};

		this.conf.size.x = r;

		this.conf.size.y = o;

		this.conf.size.w = Math.max(s, 0);

		this.conf.size.h = Math.max(l, 0);

		for ( var q in t) {

			var e = (j[q] || q);

			this.cell.style[e] = this.conf.size[t[q]] + "px"

		}

		this.callEvent("_onSetSize", []);

		if (n !== true) {

			this._adjustCont(m, g)

		} else {

			this._adjustAttached(m)

		}

		this._adjustProgress()

	};

	this._adjustCont = function(m, j) {

		var l = this.cell.childNodes[this.conf.idx.cont];

		if (typeof (window.dhtmlXLayoutCell) == "function"

				&& this instanceof window.dhtmlXLayoutCell

				&& this.conf.collapsed == true) {

			l.style.left = l.style.top = "0px";

			l.style.width = l.style.height = "200px";

			l = null;

			return

		}

		var h = 0;

		for ( var e in this.conf.ofs_nodes.t) {

			var g = this.conf.ofs_nodes.t[e];

			h += (g == "func" ? this[e]()

					: (g == true ? this.cell.childNodes[this.conf.idx[e]].offsetHeight

							: 0))

		}

		var n = 0;

		for ( var e in this.conf.ofs_nodes.b) {

			var g = this.conf.ofs_nodes.b[e];

			n += (g == "func" ? this[e]()

					: (g == true ? this.cell.childNodes[this.conf.idx[e]].offsetHeight

							: 0))

		}

		l.style.left = "0px";

		l.style.top = h + "px";

		if (this.conf.cells_cont == null) {

			this.conf.cells_cont = {};

			l.style.width = this.cell.offsetWidth + "px";

			l.style.height = Math.max(this.cell.offsetHeight - h - n, 0) + "px";

			this.conf.cells_cont.w = parseInt(l.style.width) - l.offsetWidth;

			this.conf.cells_cont.h = parseInt(l.style.height) - l.offsetHeight

		}

		l.style.left = "0px";

		l.style.top = h + "px";

		l.style.width = Math.max(

				this.cell.offsetWidth + this.conf.cells_cont.w, 0)

				+ "px";

		l.style.height = Math.max(this.conf.size.h - h - n

				+ this.conf.cells_cont.h, 0)

				+ "px";

		l = null;

		this._adjustAttached(m);

		if (j == "expand" && this.dataType == "editor" && this.dataObj != null) {

			this.dataObj._prepareContent(true)

		}

	};

	this._mtbUpdBorder = function() {

		var g = [ "menu", "toolbar", "ribbon" ];

		for (var j = 0; j < g.length; j++) {

			if (this.conf.idx[g[j]] != null) {

				var l = this.cell.childNodes[this.conf.idx[g[j]]];

				var h = "dhx_cell_" + g[j] + "_no_borders";

				var e = "dhx_cell_" + g[j] + "_def";

				l.className = l.className.replace(new RegExp(

						this.conf.borders ? h : e), this.conf.borders ? e : h);

				l = null

			}

		}

	};

	this._resetSizeState = function() {

		this.conf.cells_cont = null

	};

	this.conf.view = "def";

	this.conf.views_loaded = {};

	this.conf.views_loaded[this.conf.view] = true;

	this._viewSave = function(h) {

		this.views[h] = {

			borders : this.conf.borders,

			ofs_nodes : {

				t : {},

				b : {}

			},

			url_data : this.conf.url_data,

			dataType : this.dataType,

			dataObj : this.dataObj,

			cellCont : [],

			dataNodes : {},

			dataNodesCont : {}

		};

		var j = this.cell.childNodes[this.conf.idx.cont];

		while (j.childNodes.length > 0) {

			this.views[h].cellCont.push(j.firstChild);

			j.removeChild(j.firstChild)

		}

		j = null;

		this.dataType = null;

		this.dataObj = null;

		this.conf.url_data = null;

		for ( var g in this.dataNodes) {

			for ( var e in this.conf.ofs_nodes) {

				if (typeof (this.conf.ofs_nodes[e][g]) != "undefined") {

					this.views[h].ofs_nodes[e][g] = this.conf.ofs_nodes[e][g];

					this.conf.ofs_nodes[e][g] = null;

					delete this.conf.ofs_nodes[e][g]

				}

			}

			this.views[h].dataNodesCont[g] = this.cell.childNodes[this.conf.idx[g]];

			this.cell.removeChild(this.cell.childNodes[this.conf.idx[g]]);

			this.views[h].dataNodes[g] = this.dataNodes[g];

			this.dataNodes[g] = null;

			delete this.dataNodes[g];

			this._updateIdx()

		}

		this.callEvent("_onViewSave", [ h ])

	};

	this._viewRestore = function(h) {

		if (this.views[h] == null) {

			return

		}

		this.dataObj = this.views[h].dataObj;

		this.dataType = this.views[h].dataType;

		this.conf.url_data = this.views[h].url_data;

		for (var j = 0; j < this.views[h].cellCont.length; j++) {

			this.cell.childNodes[this.conf.idx.cont]

					.appendChild(this.views[h].cellCont[j])

		}

		for ( var g in this.views[h].dataNodes) {

			this.dataNodes[g] = this.views[h].dataNodes[g];

			if (g == "menu") {

				this.cell.insertBefore(this.views[h].dataNodesCont[g],

						this.cell.childNodes[this.conf.idx.toolbar

								|| this.conf.idx.cont])

			}

			if (g == "toolbar") {

				this.cell.insertBefore(this.views[h].dataNodesCont[g],

						this.cell.childNodes[this.conf.idx.cont])

			}

			if (g == "ribbon") {

				this.cell.insertBefore(this.views[h].dataNodesCont[g],

						this.cell.childNodes[this.conf.idx.cont])

			}

			if (g == "sb") {

				this.cell.appendChild(this.views[h].dataNodesCont[g])

			}

			this._updateIdx()

		}

		for ( var g in this.views[h].ofs_nodes) {

			for ( var e in this.views[h].ofs_nodes[g]) {

				this.conf.ofs_nodes[g][e] = this.views[h].ofs_nodes[g][e]

			}

		}

		if (this.conf.borders != this.views[h].borders) {

			this[this.views[h].borders ? "_showBorders" : "_hideBorders"](true)

		}

		if (this.dataType == "url" && this.conf.url_data != null

				&& this.conf.url_data.ajax == false

				&& this.conf.url_data.post_data != null) {

			this.reloadURL()

		}

		this.callEvent("_onViewRestore", [ h ]);

		this._viewDelete(h)

	};

	this._viewDelete = function(h) {

		if (this.views[h] == null) {

			return

		}

		this.views[h].borders = null;

		for ( var g in this.views[h].ofs_nodes) {

			for ( var e in this.views[h].ofs_nodes[g]) {

				this.views[h].ofs_nodes[g][e] = null

			}

			this.views[h].ofs_nodes[g] = null

		}

		this.views[h].dataType = null;

		this.views[h].dataObj = null;

		this.views[h].url_data = null;

		for (var j = 0; j < this.views[h].cellCont.length; j++) {

			this.views[h].cellCont[j] = null

		}

		this.views[h].cellCont = null;

		for ( var g in this.views[h].dataNodes) {

			this.views[h].dataNodes[g] = null;

			this.views[h].dataNodesCont[g] = null

		}

		this.views[h].dataNodes = this.views[h].dataNodesCont = null;

		this.views[h] = null;

		delete this.views[h]

	};

	window.dhx4._eventable(this);

	this._updateIdx();

	return this

}

dhtmlXCellObject.prototype.showView = function(a) {

	if (this.conf.view == a) {

		return false

	}

	this._viewSave(this.conf.view);

	this._viewRestore(a);

	this._updateIdx();

	this._adjustCont();

	this.conf.view = a;

	var b = (typeof (this.conf.views_loaded[this.conf.view]) == "undefined");

	this.conf.views_loaded[this.conf.view] = true;

	return b

};

dhtmlXCellObject.prototype.getViewName = function() {

	return this.conf.view

};

dhtmlXCellObject.prototype.unloadView = function(e) {

	if (e == this.conf.view) {

		var g = this.conf.unloading;

		this.conf.unloading = true;

		if (typeof (this.detachMenu) == "function") {

			this.detachMenu()

		}

		if (typeof (this.detachToolbar) == "function") {

			this.detachToolbar()

		}

		if (typeof (this.detachRibbon) == "function") {

			this.detachRibbon()

		}

		this.detachStatusBar();

		this._detachObject(null, true);

		this.conf.unloading = g;

		if (!this.conf.unloading) {

			this._adjustCont(this._idd)

		}

		return

	}

	if (this.views[e] == null) {

		return

	}

	var c = this.views[e];

	for ( var b in c.dataNodes) {

		if (typeof (c.dataNodes[b].unload) == "function") {

			c.dataNodes[b].unload()

		}

		c.dataNodes[b] = null;

		c.dataNodesCont[b] = null

	}

	if (c.dataType == "url") {

		if (c.cellCont != null && c.cellCont[0] != "null") {

			this._detachURLEvents(c.cellCont[0])

		}

	} else {

		if (c.dataObj != null) {

			if (typeof (c.dataObj.unload) == "function") {

				c.dataObj.unload()

			} else {

				if (typeof (c.dataObj.destructor) == "function") {

					c.dataObj.destructor()

				}

			}

			c.dataObj = null

		}

	}

	c = null;

	this._viewDelete(e);

	if (typeof (this.conf.views_loaded[e]) != "undefined") {

		delete this.conf.views_loaded[e]

	}

};

dhtmlXCellObject.prototype.getId = function() {

	return this._idd

};

dhtmlXCellObject.prototype.progressOn = function() {

	if (this.conf.progress == true) {

		return

	}

	this.conf.progress = true;

	var b = document.createElement("DIV");

	b.className = this.conf.idx_data.pr1;

	var a = document.createElement("DIV");

	if (this.conf.skin == "material"

			&& (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {

		a.className = this.conf.idx_data.pr3;

		a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'

	} else {

		a.className = this.conf.idx_data.pr2

	}

	if (this.conf.idx.cover != null) {

		this.cell.insertBefore(a, this.cell.childNodes[this.conf.idx.cover])

	} else {

		this.cell.appendChild(a)

	}

	this.cell.insertBefore(b, a);

	b = a = null;

	this._updateIdx();

	this._adjustProgress()

};

dhtmlXCellObject.prototype.progressOff = function() {

	if (this.conf.progress != true) {

		return

	}

	for ( var b in {

		pr3 : 3,

		pr2 : 2,

		pr1 : 1

	}) {

		var c = this.cell.childNodes[this.conf.idx[b]];

		if (c != null) {

			c.parentNode.removeChild(c)

		}

		c = null

	}

	this.conf.progress = false;

	this._updateIdx()

};

dhtmlXCellObject.prototype._adjustProgress = function() {

	if (this.conf.idx.pr1 == null) {

		return

	}

	if (!this.conf.pr) {

		this.conf.pr = {}

	}

	var b = this.cell.childNodes[this.conf.idx.pr1];

	var a = this.cell.childNodes[this.conf.idx.pr2]

			|| this.cell.childNodes[this.conf.idx.pr3];

	if (!this.conf.pr.ofs) {

		a.style.width = b.offsetWidth + "px";

		a.style.height = b.offsetHeight + "px";

		this.conf.pr.ofs = {

			w : a.offsetWidth - a.clientWidth,

			h : a.offsetHeight - a.clientHeight

		}

	}

	a.style.width = b.offsetWidth - this.conf.pr.ofs.w + "px";

	a.style.height = b.offsetHeight - this.conf.pr.ofs.h + "px";

	b = a = null

};

dhtmlXCellObject.prototype._showCellCover = function() {

	if (this.conf.cover == true) {

		return

	}

	this.conf.cover = true;

	var a = document.createElement("DIV");

	a.className = this.conf.idx_data.cover;

	this.cell.appendChild(a);

	a = null;

	this._updateIdx()

};

dhtmlXCellObject.prototype._hideCellCover = function() {

	if (this.conf.cover != true) {

		return

	}

	this.cell.removeChild(this.cell.childNodes[this.conf.idx.cover]);

	this._updateIdx();

	this.conf.cover = false

};

dhtmlXCellObject.prototype._showBorders = function(a) {

	if (this.conf.borders) {

		return

	}

	this.conf.borders = true;

	this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont"

			+ this.conf.css;

	this.conf.cells_cont = null;

	this._mtbUpdBorder();

	this.callEvent("_onBorderChange", [ true ]);

	if (a !== true) {

		this._adjustCont(this._idd)

	}

};

dhtmlXCellObject.prototype._hideBorders = function(a) {

	if (!this.conf.borders) {

		return

	}

	this.conf.borders = false;

	this.cell.childNodes[this.conf.idx.cont].className = "dhx_cell_cont"

			+ this.conf.css + " dhx_cell_cont_no_borders";

	this.conf.cells_cont = null;

	this._mtbUpdBorder();

	this.callEvent("_onBorderChange", [ false ]);

	if (a !== true) {

		this._adjustCont(this._idd)

	}

};

dhtmlXCellObject.prototype._getWidth = function() {

	return this.cell.offsetWidth

};

dhtmlXCellObject.prototype._getHeight = function() {

	return this.cell.offsetHeight

};

dhtmlXCellObject.prototype.showInnerScroll = function() {

	this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto"

};

dhtmlXCellObject.prototype._unload = function() {

	this.conf.unloading = true;

	this.callEvent("_onCellUnload", []);

	this.progressOff();

	this.unloadView(this.conf.view);

	this.dataNodes = null;

	this.cell.parentNode.removeChild(this.cell);

	this.cell = null;

	window.dhx4._eventable(this, "clear");

	for ( var b in this.views) {

		this.unloadView(b)

	}

	this.conf = null;

	for ( var b in this) {

		this[b] = null

	}

};

dhtmlXCellObject.prototype.attachObject = function(e, c) {

	if (window.dhx4.s2b(c)

			&& !(typeof (window.dhtmlXWindowsCell) == "function" && this instanceof window.dhtmlXWindowsCell)) {

		c = false

	}

	if (typeof (e) == "string") {

		e = document.getElementById(e)

	}

	if (e.parentNode == this.cell.childNodes[this.conf.idx.cont]) {

		e = null;

		return

	}

	if (c) {

		e.style.display = "";

		var a = e.offsetWidth;

		var b = e.offsetHeight

	}

	this._attachObject(e);

	this.dataType = "obj";

	e.style.display = "";

	e = null;

	if (c) {

		this._adjustByCont(a, b)

	}

};

dhtmlXCellObject.prototype.appendObject = function(a) {

	if (typeof (a) == "string") {

		a = document.getElementById(a)

	}

	if (a.parentNode == this.cell.childNodes[this.conf.idx.cont]) {

		a = null;

		return

	}

	if (!this.conf.append_mode) {

		this.cell.childNodes[this.conf.idx.cont].style.overflow = "auto";

		this.conf.append_mode = true

	}

	this._attachObject(a, null, null, true);

	this.dataType = "obj";

	a.style.display = "";

	a = null

};

dhtmlXCellObject.prototype.detachObject = function(b, a) {

	this._detachObject(null, b, a)

};

dhtmlXCellObject.prototype.getAttachedStatusBar = function() {

	return this.dataNodes.sb

};

dhtmlXCellObject.prototype.getAttachedObject = function() {

	if (this.dataType == "obj" || this.dataType == "url"

			|| this.dataType == "url-ajax") {

		return this.cell.childNodes[this.conf.idx.cont].firstChild

	} else {

		return this.dataObj

	}

};

dhtmlXCellObject.prototype.attachURL = function(b, q, c) {

	if (c == true) {

		c = {}

	}

	var g = (typeof (c) != "undefined" && c != false && c != null);

	if (this.conf.url_data == null) {

		this.conf.url_data = {}

	}

	this.conf.url_data.url = b;

	this.conf.url_data.ajax = (q == true);

	this.conf.url_data.post_data = (c == true ? {} : (c || null));

	if (this.conf.url_data.xml_doc != null) {

		try {

			this.conf.url_data.xml_doc.xmlDoc.abort()

		} catch (l) {

		}

		this.conf.url_data.xml_doc.xmlDoc = null;

		this.conf.url_data.xml_doc = null

	}

	if (q == true) {

		var o = this;

		if (g) {

			var h = "";

			for ( var n in c) {

				h += "&" + encodeURIComponent(n) + "="

						+ encodeURIComponent(c[n])

			}

			this.conf.url_data.xml_doc = dhx4.ajax

					.post(

							b,

							h,

							function(a) {

								if (o.attachHTMLString != null

										&& typeof (a.xmlDoc.responseText) == "string") {

									o

											.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>"

													+ a.xmlDoc.responseText

													+ "</div>");

									if (typeof (o._doOnFrameContentLoaded) == "function") {

										o._doOnFrameContentLoaded()

									}

									o.dataType = "url-ajax"

								}

								o = a = null

							})

		} else {

			this.conf.url_data.xml_doc = dhx4.ajax

					.get(

							b,

							function(a) {

								if (o.attachHTMLString != null

										&& typeof (a.xmlDoc.responseText) == "string") {

									o

											.attachHTMLString("<div style='position:relative;width:100%;height:100%;overflow:auto;'>"

													+ a.xmlDoc.responseText

													+ "</div>");

									if (typeof (o._doOnFrameContentLoaded) == "function") {

										o._doOnFrameContentLoaded()

									}

									o.dataType = "url-ajax"

								}

								o = a = null

							})

		}

	} else {

		if (this.dataType == "url") {

			var j = this.getFrame()

		} else {

			var j = document.createElement("IFRAME");

			j.frameBorder = 0;

			j.border = 0;

			j.style.width = "100%";

			j.style.height = "100%";

			j.style.position = "relative";

			this._attachObject(j);

			this.dataType = "url";

			this._attachURLEvents()

		}

		if (g) {

			var m = (typeof (this.conf.url_data.post_ifr) == "undefined");

			this.conf.url_data.post_ifr = true;

			if (m) {

				this._attachURLEvents()

			}

			j.src = "about:blank"

		} else {

			j.src = b + window.dhx4.ajax._dhxr(b)

		}

		j = null

	}

	j = null

};

dhtmlXCellObject.prototype.reloadURL = function() {

	if (!(this.dataType == "url" || this.dataType == "url-ajax")) {

		return

	}

	if (this.conf.url_data == null) {

		return

	}

	this.attachURL(this.conf.url_data.url, this.conf.url_data.ajax,

			this.conf.url_data.post_data)

};

dhtmlXCellObject.prototype.attachHTMLString = function(str) {

	this._attachObject(null, null, str);

	var z = str.match(/<script[^>]*>[^\f]*?<\/script>/g) || [];

	for (var i = 0; i < z.length; i++) {

		var s = z[i].replace(/<([\/]{0,1})script[^>]*>/gi, "");

		if (s) {

			if (window.execScript) {

				window.execScript(s)

			} else {

				window.eval(s)

			}

		}

	}

};

dhtmlXCellObject.prototype.attachScheduler = function(a, j, b, e) {

	e = e || window.scheduler;

	var g = false;

	if (b) {

		var h = document.getElementById(b);

		if (h) {

			g = true

		}

	}

	if (!g) {

		var c = b

				|| '<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div><div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div><div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>';

		var h = document.createElement("DIV");

		h.id = "dhxSchedObj_" + new Date().getTime();

		h.style.width = "100%";

		h.style.height = "100%";

		h.style.position = "relative";

		h.style.overflow = "hidden";

		h.className = "dhx_cal_container";

		h.innerHTML = '<div class="dhx_cal_navline"><div class="dhx_cal_prev_button">&nbsp;</div><div class="dhx_cal_next_button">&nbsp;</div><div class="dhx_cal_today_button"></div><div class="dhx_cal_date"></div>'

				+ c

				+ '</div><div class="dhx_cal_header"></div><div class="dhx_cal_data"></div>'

	}

	this._attachObject(h);

	this.dataType = "scheduler";

	this.dataObj = e;

	this.dataObj.setSizes = function() {

		this.update_view()

	};

	e.init(h.id, a, j);

	h = null;

	this.callEvent("_onContentAttach", []);

	return this.dataObj

};

dhtmlXCellObject.prototype.attachMap = function(a) {

	var b = document.createElement("DIV");

	b.style.width = "100%";

	b.style.height = "100%";

	b.style.position = "relative";

	b.style.overflow = "hidden";

	this._attachObject(b);

	if (!a) {

		a = {

			center : new google.maps.LatLng(40.719837, -73.992348),

			zoom : 11,

			mapTypeId : google.maps.MapTypeId.ROADMAP

		}

	}

	this.dataType = "maps";

	this.dataObj = new google.maps.Map(b, a);

	this.dataObj.setSizes = function() {

		google.maps.event.trigger(this, "resize")

	};

	b = null;

	this.callEvent("_onContentAttach", []);

	return this.dataObj

};

dhtmlXCellObject.prototype._createNode_sb = function(l, e, j, a, g) {

	if (typeof (g) != "undefined") {

		l = g

	} else {

		var b = e || {};

		var m = (typeof (b.text) == "string" && b.text.length > 0 ? b.text

				: "&nbsp;");

		var c = (typeof (b.height) == "number" ? b.height : false);

		var l = document.createElement("DIV");

		l.className = "dhx_cell_statusbar_def";

		l.innerHTML = "<div class='"

				+ (b.paging == true ? "dhx_cell_statusbar_paging"

						: "dhx_cell_statusbar_text") + "'>" + m + "</div>";

		if (c != false) {

			l.firstChild.style.height = l.firstChild.style.lineHeight = c

					+ "px"

		}

	}

	if (this.conf.idx.pr1 != null) {

		this.cell.insertBefore(l, this.cell.childNodes[this.conf.idx.pr1])

	} else {

		this.cell.appendChild(l)

	}

	this.conf.ofs_nodes.b.sb = true;

	this._updateIdx();

	this._adjustCont(this._idd);

	return l

};

dhtmlXCellObject.prototype.attachStatusBar = function(a) {

	if (this.dataNodes.sb) {

		return

	}

	if (a != null && window.dhx4.s2b(a.paging) == true) {

		a.height = null

	}

	if (this.conf.skin == "dhx_skyblue"

			&& typeof (window.dhtmlXWindowsCell) == "function"

			&& this instanceof window.dhtmlXWindowsCell) {

		this.cell.childNodes[this.conf.idx.cont].className += " dhx_cell_statusbar_attached"

	}

	this.dataNodes.sb = this._attachObject("sb", a);

	this.dataNodes.sb.setText = function(b) {

		this.childNodes[0].innerHTML = b

	};

	this.dataNodes.sb.getText = function() {

		return this.childNodes[0].innerHTML

	};

	this.dataNodes.sb.onselectstart = function(b) {

		return false

	};

	return this.dataNodes.sb

};

dhtmlXCellObject.prototype.detachStatusBar = function() {

	if (!this.dataNodes.sb) {

		return

	}

	if (this.conf.skin == "dhx_skyblue"

			&& typeof (window.dhtmlXWindowsCell) == "function"

			&& this instanceof window.dhtmlXWindowsCell) {

		this.cell.childNodes[this.conf.idx.cont].className = this.cell.childNodes[this.conf.idx.cont].className

				.replace(/\s{0,}dhx_cell_statusbar_attached/, "")

	}

	this.dataNodes.sb.setText = this.dataNodes.sb.getText = this.dataNodes.sb.onselectstart = null;

	this.dataNodes.sb = null;

	delete this.dataNodes.sb;

	this._detachObject("sb")

};

dhtmlXCellObject.prototype.showStatusBar = function() {

	this._mtbShowHide("sb", "")

};

dhtmlXCellObject.prototype.hideStatusBar = function() {

	this._mtbShowHide("sb", "none")

};

dhtmlXCellObject.prototype._mtbShowHide = function(b, a) {

	if (!this.dataNodes[b]) {

		return

	}

	this.cell.childNodes[this.conf.idx[b]].style.display = a;

	this._adjustCont()

};

dhtmlXCellObject.prototype.getFrame = dhtmlXCellObject.prototype._getFrame = function() {

	if (this.dataType != "url") {

		return null

	}

	return this.cell.childNodes[this.conf.idx.cont].firstChild

};

dhtmlXCellObject.prototype._attachURLEvents = function() {

	if (this.dataType != "url") {

		return

	}

	var c = this;

	var b = this._idd;

	var a = this.cell.childNodes[this.conf.idx.cont].firstChild;

	if (typeof (this._doOnFrameMouseDown) != "function") {

		this._doOnFrameMouseDown = function(g) {

			c.callEvent("_onContentMouseDown", [ b, g || event ])

		}

	}

	if (typeof (window.addEventListener) == "function") {

		a.onload = function() {

			try {

				if (typeof (c._doOnFrameMouseDown) == "function") {

					this.contentWindow.document.body.addEventListener(

							"mousedown", c._doOnFrameMouseDown, false)

				}

			} catch (g) {

			}

			try {

				if (typeof (c._doOnFrameContentLoaded) == "function") {

					c._doOnFrameContentLoaded()

				}

			} catch (g) {

			}

		}

	} else {

		a.onreadystatechange = function(g) {

			if (this.readyState == "complete") {

				try {

					if (typeof (c._doOnFrameMouseDown) == "function") {

						this.contentWindow.document.body.attachEvent(

								"onmousedown", c._doOnFrameMouseDown)

					}

				} catch (h) {

				}

				try {

					if (typeof (c._doOnFrameContentLoaded) == "function") {

						c._doOnFrameContentLoaded()

					}

				} catch (h) {

				}

			}

		}

	}

};

dhtmlXCellObject.prototype._doOnFrameContentLoaded = function() {

	if (this.conf.url_data.post_ifr == true) {

		var h = this.getFrame().contentWindow.document;

		var g = h.createElement("FORM");

		g.method = "POST";

		g.action = this.conf.url_data.url;

		h.body.appendChild(g);

		var c = {};

		if (window.dhx4.ajax.cache != true) {

			c["dhxr" + new Date().getTime()] = "1"

		}

		for ( var b in this.conf.url_data.post_data) {

			c[b] = this.conf.url_data.post_data[b]

		}

		for ( var b in c) {

			var e = h.createElement("INPUT");

			e.type = "hidden";

			e.name = b;

			e.value = c[b];

			g.appendChild(e);

			e = null

		}

		this.conf.url_data.post_ifr = false;

		g.submit()

	} else {

		this.callEvent("_onContentLoaded", [ this._idd ])

	}

};

dhtmlXCellObject.prototype._detachURLEvents = function(a) {

	if (a == null) {

		if (this.dataType != "url") {

			return

		}

		a = this.cell.childNodes[this.conf.idx.cont].firstChild

	}

	if (!a) {

		return

	}

	if (typeof (window.addEventListener) == "function") {

		a.onload = null;

		try {

			a.contentWindow.document.body.removeEventListener("mousedown",

					this._doOnFrameMouseDown, false)

		} catch (b) {

		}

	} else {

		a.onreadystatechange = null;

		try {

			a.contentWindow.document.body.detachEvent("onmousedown",

					this._doOnFrameMouseDown)

		} catch (b) {

		}

	}

	a = null

};

dhtmlXCellObject.prototype._attachObject = function(g, b, e, a, c) {

	if (typeof (g) == "string" && {

		menu : 1,

		toolbar : 1,

		ribbon : 1,

		sb : 1

	}[g] == 1) {

		return this["_createNode_" + g].apply(this, arguments)

	}

	if (a != true) {

		this._detachObject(null, true, null)

	}

	if (typeof (e) == "string") {

		this.cell.childNodes[this.conf.idx.cont].innerHTML = e

	} else {

		this.cell.childNodes[this.conf.idx.cont].appendChild(g)

	}

	g = null

};

dhtmlXCellObject.prototype._detachObject = function(j, b, a) {

	this.callEvent("_onBeforeContentDetach", []);

	if (j == "menu" || j == "toolbar" || j == "ribbon" || j == "sb") {

		var h = this.cell.childNodes[this.conf.idx[j]];

		h.parentNode.removeChild(h);

		h = null;

		this.conf.ofs_nodes[j == "sb" ? "b" : "t"][j] = false;

		this._updateIdx();

		if (!this.conf.unloading) {

			this._adjustCont(this._idd)

		}

		return

	}

	if (b == true) {

		a = false

	} else {

		if (typeof (a) == "undefined") {

			a = document.body

		} else {

			if (typeof (a) == "string") {

				a = document.getElementById(a)

			}

		}

	}

	if (a === false) {

		if (this.conf.unloading == true

				&& String(this.dataType).match(/ajax/) != null) {

			if (this.conf.url_data != null

					&& this.conf.url_data.xml_doc != null) {

				try {

					this.conf.url_data.xml_doc.xmlDoc.abort()

				} catch (g) {

				}

				this.conf.url_data.xml_doc.xmlDoc = null;

				this.conf.url_data.xml_doc = null

			}

		}

		if (this.dataType == "url") {

			this._detachURLEvents()

		} else {

			if (this.dataObj != null) {

				if (typeof (this.dataObj.unload) == "function") {

					this.dataObj.unload()

				} else {

					if (typeof (this.dataObj.destructor) == "function") {

						this.dataObj.destructor()

					}

				}

			}

		}

	}

	var h = this.cell.childNodes[this.conf.idx.cont];

	while (h.childNodes.length > 0) {

		if (a === false) {

			h.removeChild(h.lastChild)

		} else {

			h.firstChild.style.display = "none";

			a.appendChild(h.firstChild)

		}

	}

	if (this.conf.append_mode) {

		h.style.overflow = "";

		this.conf.append_mode = false

	}

	var c = (this.dataType == "tabbar");

	this.dataObj = null;

	this.dataType = null;

	a = h = null;

	if (this.conf.unloading != true && c) {

		this.showHeader(true);

		this._showBorders()

	}

};

dhtmlXCellObject.prototype._attachFromCell = function(b) {

	this.detachObject(true);

	var e = "layout";

	if (typeof (window.dhtmlXWindowsCell) == "function"

			&& this instanceof window.dhtmlXWindowsCell) {

		e = "window"

	}

	if (typeof (window.dhtmlXWindowsCell) == "function"

			&& b instanceof window.dhtmlXWindowsCell

			&& b.wins.w[b._idd].conf.parked == true) {

		b.wins._winCellSetOpacity(b._idd, "open", false)

	}

	if (typeof (window.dhtmlXAccordionCell) == "function"

			&& b instanceof window.dhtmlXAccordionCell

			&& b.conf.opened == false) {

		b._cellSetOpacity("open", false)

	}

	for ( var c in b.dataNodes) {

		this._attachObject(c, null, null, null,

				b.cell.childNodes[b.conf.idx[c]]);

		this.dataNodes[c] = b.dataNodes[c];

		b.dataNodes[c] = null;

		b.conf.ofs_nodes[c == "sb" ? "b" : "t"][c] = false;

		b._updateIdx()

	}

	this._mtbUpdBorder();

	if (b.dataType != null && b.dataObj != null) {

		this.dataType = b.dataType;

		this.dataObj = b.dataObj;

		while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {

			this.cell.childNodes[this.conf.idx.cont]

					.appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)

		}

		b.dataType = null;

		b.dataObj = null;

		if (this.dataType == "grid") {

			if (e == "window" && this.conf.skin == "dhx_skyblue") {

				this.dataObj.entBox.style.border = "1px solid #a4bed4";

				this.dataObj._sizeFix = 0

			} else {

				this.dataObj.entBox.style.border = "0px solid white";

				this.dataObj._sizeFix = 2

			}

		}

	} else {

		while (b.cell.childNodes[b.conf.idx.cont].childNodes.length > 0) {

			this.cell.childNodes[this.conf.idx.cont]

					.appendChild(b.cell.childNodes[b.conf.idx.cont].firstChild)

		}

	}

	this.conf.view = b.conf.view;

	b.conf.view = "def";

	for ( var c in b.views) {

		this.views[c] = b.views[c];

		b.views[c] = null;

		delete b.views[c]

	}

	b._updateIdx();

	b._adjustCont();

	this._updateIdx();

	this._adjustCont();

	if (b.conf.progress == true) {

		b.progressOff();

		this.progressOn()

	} else {

		this.progressOff()

	}

	if (e == "window" && this.wins.w[this._idd].conf.parked) {

		this.wins._winCellSetOpacity(this._idd, "close", false)

	}

};

function dhtmlXCellTop(g, b) {

	if (arguments.length == 0 || typeof (g) == "undefined") {

		return

	}

	var a = this;

	this.dataNodes = {};

	this.conf.ofs = {

		t : 0,

		b : 0,

		l : 0,

		r : 0

	};

	this.conf.ofs_nodes = {

		t : {},

		b : {}

	};

	this.conf.progress = false;

	this.conf.fs_mode = false;

	this.conf.fs_tm = null;

	this.conf.fs_resize = false;

	if (g == document.body) {

		this.conf.fs_mode = true;

		this.base = g;

		if (this.base == document.body) {

			var c = {

				dhx_skyblue : {

					t : 2,

					b : 2,

					l : 2,

					r : 2

				},

				dhx_web : {

					t : 8,

					b : 8,

					l : 8,

					r : 8

				},

				dhx_terrace : {

					t : 9,

					b : 9,

					l : 8,

					r : 8

				},

				material : {

					t : 9,

					b : 9,

					l : 8,

					r : 8

				}

			};

			this.conf.ofs = (c[this.conf.skin] != null ? c[this.conf.skin]

					: c.dhx_skyblue)

		}

	} else {

		this.base = (typeof (g) == "string" ? document.getElementById(g) : g)

	}

	this.base.className += " " + this.conf.css + "_base_" + this.conf.skin;

	this.cont = document.createElement("DIV");

	this.cont.className = this.conf.css + "_cont";

	this.base.appendChild(this.cont);

	if (b != null) {

		this.setOffsets(b, false)

	} else {

		if (this.base._ofs != null) {

			this.setOffsets(this.base._ofs, false);

			this.base._ofs = null;

			try {

				delete this.base._ofs

			} catch (h) {

			}

		}

	}

	this._adjustCont = function() {

		var l = this.conf.ofs.t;

		for ( var j in this.conf.ofs_nodes.t) {

			l += (this.conf.ofs_nodes.t[j] == true ? this.dataNodes[j].offsetHeight

					: 0)

		}

		var e = this.conf.ofs.b;

		for ( var j in this.conf.ofs_nodes.b) {

			e += (this.conf.ofs_nodes.b[j] == true ? this.dataNodes[j].offsetHeight

					: 0)

		}

		this.cont.style.left = this.conf.ofs.l + "px";

		this.cont.style.width = this.base.clientWidth - this.conf.ofs.l

				- this.conf.ofs.r + "px";

		this.cont.style.top = l + "px";

		this.cont.style.height = this.base.clientHeight - l - e + "px"

	};

	this._setBaseSkin = function(e) {

		this.base.className = this.base.className.replace(new RegExp(

				this.conf.css + "_base_" + this.conf.skin, "gi"), this.conf.css

				+ "_base_" + e)

	};

	this._initFSResize = function() {

		if (this.conf.fs_resize == true) {

			return

		}

		this._doOnResizeStart = function() {

			window.clearTimeout(a.conf.fs_tm);

			a.conf.fs_tm = window.setTimeout(a._doOnResizeEnd, 200)

		};

		this._doOnResizeEnd = function() {

			a.setSizes()

		};

		if (typeof (window.addEventListener) == "function") {

			window.addEventListener("resize", this._doOnResizeStart, false)

		} else {

			window.attachEvent("onresize", this._doOnResizeStart)

		}

		this.conf.fs_resize = true

	};

	if (this.conf.fs_mode == true) {

		this._initFSResize()

	}

	this._unloadTop = function() {

		this._mtbUnload();

		this.detachHeader();

		this.detachFooter();

		if (this.conf.fs_mode == true) {

			if (typeof (window.addEventListener) == "function") {

				window.removeEventListener("resize", this._doOnResizeStart,

						false)

			} else {

				window.detachEvent("onresize", this._doOnResizeStart)

			}

		}

		this.base.removeChild(this.cont);

		var e = new RegExp("s{0,}" + this.conf.css + "_base_" + this.conf.skin,

				"gi");

		this.base.className = this.base.className.replace(e, "");

		this.cont = this.base = null;

		a = null

	};

	g = null

}

dhtmlXCellTop.prototype.setOffsets = function(h, g) {

	var e = false;

	for ( var b in h) {

		var c = b.charAt(0);

		if (typeof (this.conf.ofs[c]) != "undefined" && !isNaN(h[b])) {

			this.conf.ofs[c] = parseInt(h[b]);

			e = true

		}

	}

	if (g !== false && typeof (this.setSizes) == "function" && e == true) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.attachMenu = function(a) {

	if (this.dataNodes.menu != null) {

		return

	}

	this.dataNodes.menuObj = document.createElement("DIV");

	this.dataNodes.menuObj.className = "dhxcelltop_menu";

	this.base.insertBefore(this.dataNodes.menuObj, this.dataNodes.toolbarObj

			|| this.dataNodes.ribbonObj || this.cont);

	if (typeof (a) != "object" || a == null) {

		a = {}

	}

	a.skin = this.conf.skin;

	a.parent = this.dataNodes.menuObj;

	this.dataNodes.menu = new dhtmlXMenuObject(a);

	this.dataNodes.menuEv = this

			.attachEvent(

					"_onSetSizes",

					function() {

						if (this.dataNodes.menuObj.style.display == "none") {

							return

						}

						if (this.conf.ofs_menu == null) {

							this.dataNodes.menuObj.style.width = this.base.offsetWidth

									- this.conf.ofs.l - this.conf.ofs.r + "px";

							this.conf.ofs_menu = {

								w : this.dataNodes.menuObj.offsetWidth

										- parseInt(this.dataNodes.menuObj.style.width)

							}

						}

						this.dataNodes.menuObj.style.left = this.conf.ofs.l

								+ "px";

						this.dataNodes.menuObj.style.marginTop = (this.dataNodes.haObj != null ? 0

								: this.conf.ofs.t)

								+ "px";

						this.dataNodes.menuObj.style.width = this.base.offsetWidth

								- this.conf.ofs.l

								- this.conf.ofs.r

								- this.conf.ofs_menu.w + "px"

					});

	this.conf.ofs_nodes.t.menuObj = true;

	this.setSizes();

	a.parnt = null;

	a = null;

	return this.dataNodes.menu

};

dhtmlXCellTop.prototype.detachMenu = function() {

	if (this.dataNodes.menu == null) {

		return

	}

	this.dataNodes.menu.unload();

	this.dataNodes.menu = null;

	this.dataNodes.menuObj.parentNode.removeChild(this.dataNodes.menuObj);

	this.dataNodes.menuObj = null;

	this.detachEvent(this.dataNodes.menuEv);

	this.dataNodes.menuEv = null;

	delete this.dataNodes.menu;

	delete this.dataNodes.menuObj;

	delete this.dataNodes.menuEv;

	this.conf.ofs_nodes.t.menuObj = false;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.attachToolbar = function(a) {

	if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {

		return

	}

	this.dataNodes.toolbarObj = document.createElement("DIV");

	this.dataNodes.toolbarObj.className = "dhxcelltop_toolbar";

	this.base.insertBefore(this.dataNodes.toolbarObj, this.cont);

	this.dataNodes.toolbarObj.appendChild(document.createElement("DIV"));

	if (typeof (a) != "object" || a == null) {

		a = {}

	}

	a.skin = this.conf.skin;

	a.parent = this.dataNodes.toolbarObj.firstChild;

	this.dataNodes.toolbar = new dhtmlXToolbarObject(a);

	this.dataNodes.toolbarEv = this

			.attachEvent(

					"_onSetSizes",

					function() {

						if (this.dataNodes.toolbarObj.style.display == "none") {

							return

						}

						this.dataNodes.toolbarObj.style.left = this.conf.ofs.l

								+ "px";

						this.dataNodes.toolbarObj.style.marginTop = (this.dataNodes.haObj != null

								|| this.dataNodes.menuObj != null ? 0

								: this.conf.ofs.t)

								+ "px";

						this.dataNodes.toolbarObj.style.width = this.base.offsetWidth

								- this.conf.ofs.l - this.conf.ofs.r + "px"

					});

	this.dataNodes.toolbar._masterCell = this;

	this.dataNodes.toolbar.attachEvent("_onIconSizeChange", function() {

		this._masterCell.setSizes()

	});

	this.conf.ofs_nodes.t.toolbarObj = true;

	this.setSizes();

	a.parnt = null;

	a = null;

	return this.dataNodes.toolbar

};

dhtmlXCellTop.prototype.detachToolbar = function() {

	if (this.dataNodes.toolbar == null) {

		return

	}

	this.dataNodes.toolbar._masterCell = null;

	this.dataNodes.toolbar.unload();

	this.dataNodes.toolbar = null;

	this.dataNodes.toolbarObj.parentNode.removeChild(this.dataNodes.toolbarObj);

	this.dataNodes.toolbarObj = null;

	this.detachEvent(this.dataNodes.toolbarEv);

	this.dataNodes.toolbarEv = null;

	this.conf.ofs_nodes.t.toolbarObj = false;

	delete this.dataNodes.toolbar;

	delete this.dataNodes.toolbarObj;

	delete this.dataNodes.toolbarEv;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.attachRibbon = function(a) {

	if (!(this.dataNodes.ribbon == null && this.dataNodes.toolbar == null)) {

		return

	}

	this.dataNodes.ribbonObj = document.createElement("DIV");

	this.dataNodes.ribbonObj.className = "dhxcelltop_ribbon";

	this.base.insertBefore(this.dataNodes.ribbonObj, this.cont);

	this.dataNodes.ribbonObj.appendChild(document.createElement("DIV"));

	if (typeof (a) != "object" || a == null) {

		a = {}

	}

	a.skin = this.conf.skin;

	a.parent = this.dataNodes.ribbonObj.firstChild;

	this.dataNodes.ribbon = new dhtmlXRibbon(a);

	this.dataNodes.ribbonEv = this

			.attachEvent(

					"_onSetSizes",

					function() {

						if (this.dataNodes.ribbonObj.style.display == "none") {

							return

						}

						this.dataNodes.ribbonObj.style.left = this.conf.ofs.l

								+ "px";

						this.dataNodes.ribbonObj.style.marginTop = (this.dataNodes.haObj != null

								|| this.dataNodes.menuObj != null ? 0

								: this.conf.ofs.t)

								+ "px";

						this.dataNodes.ribbonObj.style.width = this.base.offsetWidth

								- this.conf.ofs.l - this.conf.ofs.r + "px";

						this.dataNodes.ribbon.setSizes()

					});

	this.conf.ofs_nodes.t.ribbonObj = true;

	var b = this;

	this.dataNodes.ribbon.attachEvent("_onHeightChanged", function() {

		b.setSizes()

	});

	this.setSizes();

	a.parnt = null;

	a = null;

	return this.dataNodes.ribbon

};

dhtmlXCellTop.prototype.detachRibbon = function() {

	if (this.dataNodes.ribbon == null) {

		return

	}

	this.dataNodes.ribbon.unload();

	this.dataNodes.ribbon = null;

	this.dataNodes.ribbonObj.parentNode.removeChild(this.dataNodes.ribbonObj);

	this.dataNodes.ribbonObj = null;

	this.detachEvent(this.dataNodes.ribbonEv);

	this.dataNodes.ribbonEv = null;

	this.conf.ofs_nodes.t.ribbonObj = false;

	delete this.dataNodes.ribbon;

	delete this.dataNodes.ribbonObj;

	delete this.dataNodes.ribbonEv;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.attachStatusBar = function(a) {

	if (this.dataNodes.sbObj) {

		return

	}

	if (typeof (a) == "undefined") {

		a = {}

	}

	this.dataNodes.sbObj = document.createElement("DIV");

	this.dataNodes.sbObj.className = "dhxcelltop_statusbar";

	if (this.cont.nextSibling != null) {

		this.base.insertBefore(this.dataNodes.sbObj, this.cont.nextSibling)

	} else {

		this.base.appendChild(this.dataNodes.sbObj)

	}

	this.dataNodes.sbObj.innerHTML = "<div class='dhxcont_statusbar'>"

			+ (typeof (a.text) == "string" && a.text.length > 0 ? a.text

					: "&nbsp;") + "</div>";

	if (typeof (a.height) == "number") {

		this.dataNodes.sbObj.firstChild.style.height = this.dataNodes.sbObj.firstChild.style.lineHeight = a.height

				+ "px"

	}

	this.dataNodes.sbObj.setText = function(b) {

		this.childNodes[0].innerHTML = b

	};

	this.dataNodes.sbObj.getText = function() {

		return this.childNodes[0].innerHTML

	};

	this.dataNodes.sbObj.onselectstart = function(b) {

		return false

	};

	this.dataNodes.sbEv = this

			.attachEvent(

					"_onSetSizes",

					function() {

						if (this.dataNodes.sbObj.style.display == "none") {

							return

						}

						this.dataNodes.sbObj.style.left = this.conf.ofs.l

								+ "px";

						this.dataNodes.sbObj.style.bottom = (this.dataNodes.faObj != null ? this.dataNodes.faObj.offsetHeight

								: 0)

								+ this.conf.ofs.t + "px";

						this.dataNodes.sbObj.style.width = this.base.offsetWidth

								- this.conf.ofs.l - this.conf.ofs.r + "px"

					});

	this.conf.ofs_nodes.b.sbObj = true;

	this.setSizes();

	return this.dataNodes.sbObj

};

dhtmlXCellTop.prototype.detachStatusBar = function() {

	if (!this.dataNodes.sbObj) {

		return

	}

	this.dataNodes.sbObj.setText = this.dataNodes.sbObj.getText = this.dataNodes.sbObj.onselectstart = null;

	this.dataNodes.sbObj.parentNode.removeChild(this.dataNodes.sbObj);

	this.dataNodes.sbObj = null;

	this.detachEvent(this.dataNodes.sbEv);

	this.dataNodes.sbEv = null;

	this.conf.ofs_nodes.b.sbObj = false;

	delete this.dataNodes.sb;

	delete this.dataNodes.sbObj;

	delete this.dataNodes.sbEv;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.showMenu = function() {

	this._mtbShowHide("menuObj", "")

};

dhtmlXCellTop.prototype.hideMenu = function() {

	this._mtbShowHide("menuObj", "none")

};

dhtmlXCellTop.prototype.showToolbar = function() {

	this._mtbShowHide("toolbarObj", "")

};

dhtmlXCellTop.prototype.hideToolbar = function() {

	this._mtbShowHide("toolbarObj", "none")

};

dhtmlXCellTop.prototype.showRibbon = function() {

	this._mtbShowHide("ribbonObj", "")

};

dhtmlXCellTop.prototype.hideRibbon = function() {

	this._mtbShowHide("ribbonObj", "none")

};

dhtmlXCellTop.prototype.showStatusBar = function() {

	this._mtbShowHide("sbObj", "")

};

dhtmlXCellTop.prototype.hideStatusBar = function() {

	this._mtbShowHide("sbObj", "none")

};

dhtmlXCellTop.prototype._mtbShowHide = function(b, a) {

	if (this.dataNodes[b] == null) {

		return

	}

	this.dataNodes[b].style.display = a;

	this.setSizes()

};

dhtmlXCellTop.prototype._mtbUnload = function(b, a) {

	this.detachMenu();

	this.detachToolbar();

	this.detachStatusBar();

	this.detachRibbon()

};

dhtmlXCellTop.prototype.getAttachedMenu = function() {

	return this.dataNodes.menu

};

dhtmlXCellTop.prototype.getAttachedToolbar = function() {

	return this.dataNodes.toolbar

};

dhtmlXCellTop.prototype.getAttachedRibbon = function() {

	return this.dataNodes.ribbon

};

dhtmlXCellTop.prototype.getAttachedStatusBar = function() {

	return this.dataNodes.sbObj

};

dhtmlXCellTop.prototype.progressOn = function() {

	if (this.conf.progress) {

		return

	}

	this.conf.progress = true;

	var b = document.createElement("DIV");

	b.className = "dhxcelltop_progress";

	this.base.appendChild(b);

	var a = document.createElement("DIV");

	if (this.conf.skin == "material"

			&& (window.dhx4.isFF || window.dhx4.isChrome || window.dhx4.isOpera || window.dhx4.isEdge)) {

		a.className = "dhxcelltop_progress_svg";

		a.innerHTML = '<svg class="dhx_cell_prsvg" viewBox="25 25 50 50"><circle class="dhx_cell_prcircle" cx="50" cy="50" r="20"/></svg>'

	} else {

		var a = document.createElement("DIV");

		a.className = "dhxcelltop_progress_img"

	}

	this.base.appendChild(a);

	b = a = null

};

dhtmlXCellTop.prototype.progressOff = function() {

	if (!this.conf.progress) {

		return

	}

	var e = {

		dhxcelltop_progress : true,

		dhxcelltop_progress_img : true,

		dhxcelltop_progress_svg : true

	};

	for (var c = 0; c < this.base.childNodes.length; c++) {

		if (typeof (this.base.childNodes[c].className) != "undefined"

				&& e[this.base.childNodes[c].className] == true) {

			e[this.base.childNodes[c].className] = this.base.childNodes[c]

		}

	}

	for ( var b in e) {

		if (e[b] != true) {

			this.base.removeChild(e[b])

		}

		e[b] = null

	}

	this.conf.progress = false;

	e = null

};

dhtmlXCellTop.prototype.attachHeader = function(b, a) {

	if (this.dataNodes.haObj != null) {

		return

	}

	if (typeof (b) != "object") {

		b = document.getElementById(b)

	}

	this.dataNodes.haObj = document.createElement("DIV");

	this.dataNodes.haObj.className = "dhxcelltop_hdr";

	this.dataNodes.haObj.style.height = (a || b.offsetHeight) + "px";

	this.base.insertBefore(this.dataNodes.haObj, this.dataNodes.menuObj

			|| this.dataNodes.toolbarObj || this.cont);

	this.dataNodes.haObj.appendChild(b);

	b.style.visibility = "visible";

	b = null;

	this.dataNodes.haEv = this.attachEvent("_onSetSizes", function() {

		this.dataNodes.haObj.style.left = this.conf.ofs.l + "px";

		this.dataNodes.haObj.style.marginTop = this.conf.ofs.t + "px";

		this.dataNodes.haObj.style.width = this.base.offsetWidth

				- this.conf.ofs.l - this.conf.ofs.r + "px"

	});

	this.conf.ofs_nodes.t.haObj = true;

	this.setSizes()

};

dhtmlXCellTop.prototype.detachHeader = function() {

	if (!this.dataNodes.haObj) {

		return

	}

	while (this.dataNodes.haObj.childNodes.length > 0) {

		this.dataNodes.haObj.lastChild.style.visibility = "hidden";

		document.body.appendChild(this.dataNodes.haObj.lastChild)

	}

	this.dataNodes.haObj.parentNode.removeChild(this.dataNodes.haObj);

	this.dataNodes.haObj = null;

	this.detachEvent(this.dataNodes.haEv);

	this.dataNodes.haEv = null;

	this.conf.ofs_nodes.t.haObj = false;

	delete this.dataNodes.haEv;

	delete this.dataNodes.haObj;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

dhtmlXCellTop.prototype.attachFooter = function(c, a) {

	if (this.dataNodes.faObj != null) {

		return

	}

	if (typeof (c) != "object") {

		c = document.getElementById(c)

	}

	this.dataNodes.faObj = document.createElement("DIV");

	this.dataNodes.faObj.className = "dhxcelltop_ftr";

	this.dataNodes.faObj.style.height = (a || c.offsetHeight) + "px";

	var b = (this.dataNodes.sbObj || this.cont);

	if (this.base.lastChild == b) {

		this.base.appendChild(this.dataNodes.faObj)

	} else {

		this.base.insertBefore(this.dataNodes.faObj, b.nextSibling)

	}

	this.dataNodes.faEv = this.attachEvent("_onSetSizes", function() {

		this.dataNodes.faObj.style.left = this.conf.ofs.l + "px";

		this.dataNodes.faObj.style.bottom = this.conf.ofs.b + "px";

		this.dataNodes.faObj.style.width = this.base.offsetWidth

				- this.conf.ofs.l - this.conf.ofs.r + "px"

	});

	this.dataNodes.faObj.appendChild(c);

	c.style.visibility = "visible";

	b = c = null;

	this.conf.ofs_nodes.b.faObj = true;

	this.setSizes()

};

dhtmlXCellTop.prototype.detachFooter = function() {

	if (!this.dataNodes.faObj) {

		return

	}

	while (this.dataNodes.faObj.childNodes.length > 0) {

		this.dataNodes.faObj.lastChild.style.visibility = "hidden";

		document.body.appendChild(this.dataNodes.faObj.lastChild)

	}

	this.dataNodes.faObj.parentNode.removeChild(this.dataNodes.faObj);

	this.dataNodes.faObj = null;

	this.detachEvent(this.dataNodes.faEv);

	this.dataNodes.faEv = null;

	this.conf.ofs_nodes.b.faObj = false;

	delete this.dataNodes.faEv;

	delete this.dataNodes.faObj;

	if (!this.conf.unloading) {

		this.setSizes()

	}

};

function dhtmlXCalendarObject(h, o) {

	this.i = {};

	var c = null;

	if (typeof (h) == "string") {

		var e = document.getElementById(h)

	} else {

		var e = h

	}

	if (e && typeof (e) == "object" && e.tagName

			&& String(e.tagName).toLowerCase() != "input") {

		c = e

	}

	e = null;

	if (typeof (h) != "object" || !h.length) {

		h = [ h ]

	}

	for (var b = 0; b < h.length; b++) {

		if (typeof (h[b]) == "string") {

			h[b] = (document.getElementById(h[b]) || null)

		}

		if (h[b] != null && h[b].tagName

				&& String(h[b].tagName).toLowerCase() == "input") {

			this.i[window.dhx4.newId()] = {

				input : h[b]

			}

		} else {

			if (!(h[b] instanceof Array) && h[b] instanceof Object

					&& (h[b].input != null || h[b].button != null)) {

				if (h[b].input != null && typeof (h[b].input) == "string") {

					h[b].input = document.getElementById(h[b].input)

				}

				if (h[b].button != null && typeof (h[b].button) == "string") {

					h[b].button = document.getElementById(h[b].button)

				}

				this.i[window.dhx4.newId()] = h[b]

			}

		}

		h[b] = null

	}

	this.conf = {

		skin : (o || window.dhx4.skin

				|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

				|| window.dhx4.skinDetect("dhtmlxcalendar") || "material"),

		zi : window.dhx4.newId(),

		touch : !window.dhx4.isIE,

		time : true,

		today : false,

		ws_first : true

	};

	this.setSkin = function(q, a) {

		if (this.conf.skin == q && !a) {

			return

		}

		this.conf.skin = q;

		this.base.className = "dhtmlxcalendar_" + this.conf.skin;

		this._ifrSize()

	};

	this.base = document.createElement("DIV");

	this.base.style.display = "none";

	this.base.appendChild(document.createElement("DIV"));

	if (c != null) {

		this._hasParent = true;

		c.appendChild(this.base);

		c = null

	} else {

		document.body.appendChild(this.base)

	}

	this.setParent = function(a) {

		if (this._hasParent) {

			if (typeof (a) == "object") {

				a.appendChild(this.base)

			} else {

				if (typeof (a) == "string") {

					document.getElementById(a).appendChild(this.base)

				}

			}

		}

	};

	this.setSkin(this.conf.skin, true);

	this.base.onclick = function(a) {

		a = a || event;

		if (a.preventDefault) {

			a.preventDefault()

		}

		a.cancelBubble = true

	};

	this.base.onmousedown = function() {

		return false

	};

	if (this.conf.touch) {

		this.base.ontouchstart = this.base.onclick

	}

	this.loadUserLanguage = function(t) {

		if (!this.langData[t]) {

			return

		}

		this.lang = t;

		this.setWeekStartDay(this.langData[this.lang].weekstart);

		this.setDateFormat(this.langData[this.lang].dateformat || "%Y-%m-%d");

		if (this.msCont) {

			var s = 0;

			for (var r = 0; r < this.msCont.childNodes.length; r++) {

				for (var a = 0; a < this.msCont.childNodes[r].childNodes.length; a++) {

					this.msCont.childNodes[r].childNodes[a].innerHTML = this.langData[this.lang].monthesSNames[s++]

				}

			}

		}

		this.contTime.childNodes[0].childNodes[0].childNodes[5].innerHTML = this.langData[this.lang].today;

		this.contTime.childNodes[0].childNodes[0].childNodes[4].innerHTML = this.langData[this.lang].clear

	};

	this.contMonth = document.createElement("DIV");

	this.contMonth.className = "dhtmlxcalendar_month_cont";

	this.contMonth.onselectstart = function(a) {

		a = a || event;

		a.cancelBubble = true;

		if (a.preventDefault) {

			a.preventDefault()

		} else {

			a.returnValue = false

		}

		return false

	};

	this.base.firstChild.appendChild(this.contMonth);

	var j = document.createElement("UL");

	j.className = "dhtmlxcalendar_line";

	this.contMonth.appendChild(j);

	var n = document.createElement("LI");

	n.className = "dhtmlxcalendar_cell dhtmlxcalendar_month_hdr";

	n.innerHTML = "<div class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left\";'><div class='dhtmlxcalendar_week_arrow_left' onclick=\"wanting_week()\"> -W </div></div><span></span><div class='dhtmlxcalendar_week_arrow_right' onclick=\"sum_week()\"> +W </div><div class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right\";'></div>";

	//n.innerHTML = "<div class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_left\";'></div><span></span><div class='dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right' onmouseover='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right_hover\";' onmouseout='this.className=\"dhtmlxcalendar_month_arrow dhtmlxcalendar_month_arrow_right\";'></div>";

	j.appendChild(n);

	var g = this;

	n.onclick = function(s) {

		s = s || event;

		if (s.type == "touchstart" && s.preventDefault != null) {

			s.preventDefault()

		}

		var q = (s.target || s.srcElement);

		if (q.className

				&& q.className.indexOf("dhtmlxcalendar_month_arrow") === 0) {

			g._hideSelector();

			var r = (q.parentNode.firstChild == q ? -1 : 1);

			var a = new Date(g._activeMonth);

			g._drawMonth(new Date(g._activeMonth.getFullYear(), g._activeMonth

					.getMonth()

					+ r, 1, 0, 0, 0, 0));

			g._evOnArrowClick([ a, new Date(g._activeMonth) ]);

			return

		}

		if (q.className && q.className == "dhtmlxcalendar_month_label_month") {

			s.cancelBubble = true;

			g._showSelector("month", Math.round(q.offsetLeft + q.offsetWidth

					/ 2), q.offsetTop + q.offsetHeight + 2, "selector_month",

					true);

			return

		}

		if (q.className && q.className == "dhtmlxcalendar_month_label_year") {

			s.cancelBubble = true;

			g._showSelector("year", Math

					.round(q.offsetLeft + q.offsetWidth / 2), q.offsetTop

					+ q.offsetHeight + 2, "selector_year", true);

			return

		}

		g._hideSelector()

	};

	if (this.conf.touch == true) {

		n.ontouchstart = n.onclick

	}

	this.contDays = document.createElement("DIV");

	this.contDays.className = "dhtmlxcalendar_days_cont";

	this.base.firstChild.appendChild(this.contDays);

	this.setWeekStartDay = function(a) {

		if (a == 0) {

			a = 7

		}

		this._wStart = Math.min(Math.max((isNaN(a) ? 1 : a), 1), 7);

		this._drawDaysOfWeek()

	};

	this._drawDaysOfWeek = function() {

		if (this.contDays.childNodes.length == 0) {

			var t = document.createElement("UL");

			t.className = "dhtmlxcalendar_line";

			this.contDays.appendChild(t)

		} else {

			var t = this.contDays.firstChild

		}

		var r = this._wStart;

		var s = this.langData[this.lang].daysSNames;

		s.push(String(this.langData[this.lang].daysSNames[0]).valueOf());

		for (var u = 0; u < 8; u++) {

			if (t.childNodes[u] == null) {

				var a = document.createElement("LI");

				t.appendChild(a)

			} else {

				var a = t.childNodes[u]

			}

			if (u == 0) {

				a.className = "dhtmlxcalendar_cell_wn";

				a.innerHTML = "<div class='dhtmlxcalendar_label'>" + (this.langData[this.lang].weekname || "w") + "</div>"

			} else {

				a.className = "dhtmlxcalendar_cell"

						+ (r >= 6 ? " dhtmlxcalendar_day_weekday_cell" : "")

						+ (u == 1 ? "_first" : "");

				a.innerHTML = s[r];

				if (++r > 7) {

					r = 1

				}

			}

		}

		if (this._activeMonth != null) {

			this._drawMonth(this._activeMonth)

		}

	};

	this._wStart = this.langData[this.lang].weekstart;

	this.setWeekStartDay(this._wStart);

	this.contDates = document.createElement("DIV");

	this.contDates.className = "dhtmlxcalendar_dates_cont";

	this.base.firstChild.appendChild(this.contDates);

	this.contDates.onclick = function(v) {

		v = v || event;

		if (v.type == "touchstart" && v.preventDefault != null) {

			v.preventDefault()

		}

		var q = (v.target || v.srcElement);

		if (q.parentNode != null && q.parentNode._date != null) {

			q = q.parentNode

		}

		if (q._date != null && !q._css_dis) {

			var s = g._activeDate.getHours();

			var r = g._activeDate.getMinutes();

			var u = q._date;

			if (g.checkEvent("onBeforeChange")) {

				if (!g.callEvent("onBeforeChange", [ new Date(q._date

						.getFullYear(), q._date.getMonth(), q._date.getDate(),

						s, r) ])) {

					return

				}

			}

			if (g._activeDateCell != null) {

				g._activeDateCell._css_date = false;

				g._updateCellStyle(g._activeDateCell._q, g._activeDateCell._w)

			}

			var a = (g._activeDate.getFullYear() + "_"

					+ g._activeDate.getMonth() != u.getFullYear() + "_"

					+ u.getMonth());

			g._nullDate = false;

			g._activeDate = new Date(u.getFullYear(), u.getMonth(),

					u.getDate(), s, r);

			g._activeDateCell = q;

			g._activeDateCell._css_date = true;

			g._activeDateCell._css_hover = false;

			g._updateCellStyle(g._activeDateCell._q, g._activeDateCell._w);

			if (a) {

				g._drawMonth(g._activeDate)

			}

			g._updateInp();

			if (!g._hasParent) {

				if (v.type == "touchstart") {

					window.setTimeout(function() {

						g._hide()

					}, 400)

				} else {

					g._hide()

				}

			}

			g._evOnClick([ new Date(g._activeDate.getTime()) ]);

			g._doOnSelectorChange(true)

		}

	};

	if (this.conf.touch == true) {

		this.contDates.ontouchstart = this.contDates.onclick

	}

	this.contDates.onmouseover = function(q) {

		q = q || event;

		var a = (q.target || q.srcElement);

		if (a.parentNode != null && a.parentNode._date != null) {

			a = a.parentNode

		}

		if (a._date != null) {

			if (g._lastHover == a || a._css_hover) {

				return

			}

			a._css_hover = true;

			g._updateCellStyle(a._q, a._w);

			g._lastHover = a;

			g._evOnMouseOver([

					new Date(a._date.getFullYear(), a._date.getMonth(), a._date

							.getDate(), 0, 0, 0, 0), q ]);

			a = null

		}

	};

	this.contDates.onmouseout = function(a) {

		g._clearDayHover(a || event)

	};

	this._lastHover = null;

	this._clearDayHover = function(a) {

		if (!this._lastHover) {

			return

		}

		this._lastHover._css_hover = false;

		this._updateCellStyle(this._lastHover._q, this._lastHover._w);

		if (a != null) {

			g._evOnMouseOut([

					new Date(this._lastHover._date.getFullYear(),

							this._lastHover._date.getMonth(),

							this._lastHover._date.getDate(), 0, 0, 0, 0), a ])

		}

		this._lastHover = null

	};

	for (var b = 0; b < 6; b++) {

		var j = document.createElement("UL");

		j.className = "dhtmlxcalendar_line";

		this.contDates.appendChild(j);

		for (var m = 0; m <= 7; m++) {

			var n = document.createElement("LI");

			if (m == 0) {

				n.className = "dhtmlxcalendar_cell_wn"

			} else {

				n.className = "dhtmlxcalendar_cell"

			}

			j.appendChild(n)

		}

	}

	this.contTime = document.createElement("DIV");

	this.contTime.className = "dhtmlxcalendar_time_cont";

	this.contTime.style.display = "none";

	this.base.firstChild.appendChild(this.contTime);

	this.showTime = function() {

		if (this.conf.time != true) {

			this.conf.time = true;

			this._adjustTimeCont()

		}

	};

	this.hideTime = function() {

		if (this.conf.time == true) {

			this.conf.time = false;

			this._adjustTimeCont()

		}

	};

	this.showToday = function() {

		if (this.conf.today != true) {

			this.conf.today = true;

			this._adjustTimeCont()

		}

	};

	this.hideToday = function() {

		if (this.conf.today == true) {

			this.conf.today = false;

			this._adjustTimeCont()

		}

	};

	this._adjustTimeCont = function() {

		var a = "";

		if (this.conf.time == true) {

			a += "_time"

		}

		if (this.conf.today == true) {

			a += "_today"

		}

		if (a == "") {

			this.contTime.style.display = "none"

		} else {

			this.contTime.className = "dhtmlxcalendar_time_cont dhtmlxcalendar_mode"

					+ a;

			this.contTime.style.display = ""

		}

		this._ifrSize()

	};

	this._adjustTimeCont();

	var j = document.createElement("UL");

	j.className = "dhtmlxcalendar_line";

	this.contTime.appendChild(j);

	var n = document.createElement("LI");

	n.className = "dhtmlxcalendar_cell dhtmlxcalendar_time_hdr";

	n.innerHTML = "<div class='dhtmlxcalendar_time_img'></div><span class='dhtmlxcalendar_label_hours'></span><span class='dhtmlxcalendar_label_colon'>:</span><span class='dhtmlxcalendar_label_minutes'></span><span class='dhtmlxcalendar_label_clear'>" + this.langData[this.lang].clear + "</span><span class='dhtmlxcalendar_label_today'>" + this.langData[this.lang].today + "</span>";

	j.appendChild(n);

	n.onclick = function(r) {

		r = r || event;

		if (r.type == "touchstart" && r.preventDefault != null) {

			r.preventDefault()

		}

		var a = (r.target || r.srcElement);

		if (a.tagName != null && a.tagName.toLowerCase() == "span" && a._par == true && a.parentNode != null) {

			a = a.parentNode

		}

		if (a.className && a.className == "dhtmlxcalendar_label_hours") {

			r.cancelBubble = true;

			var q = g.contMonth.offsetHeight + g.contDays.offsetHeight

					+ g.contDates.offsetHeight + a.offsetTop;

			g._showSelector("hours", Math.round(a.offsetLeft + a.offsetWidth

					/ 2), q - 2, "selector_hours", true);

			return

		}

		if (a.className && a.className == "dhtmlxcalendar_label_minutes") {

			r.cancelBubble = true;

			if (g._minutesInterval == 1) {

				var s = g.getFormatedDate("%i");

				a.innerHTML = "<span class='dhtmlxcalendar_selected_date'>"

						+ s.charAt(0) + "</span>" + s.charAt(1);

				a.firstChild._par = true;

				g._selectorMode = 1

			}

			var q = g.contMonth.offsetHeight + g.contDays.offsetHeight

					+ g.contDates.offsetHeight + a.offsetTop;

			g._showSelector("minutes", Math.round(a.offsetLeft + a.offsetWidth

					/ 2), q - 2, "selector_minutes", true);

			return

		}

		g._hideSelector();

		if (a.className && a.className == "dhtmlxcalendar_label_today") {

			var s = new Date();

			s = new Date(s.getFullYear(), s.getMonth(), s.getDate(),

					g._activeDate.getHours(), g._activeDate.getMinutes(),

					g._activeDate.getSeconds(), g._activeDate.getMilliseconds());

			g.setDate(s);

			g._updateInp();

			g.callEvent("onButtonClick", [ s ])

		}

		if (a.className && a.className == "dhtmlxcalendar_label_clear") {

			g._nullDate = true;

			g._drawMonth(new Date());

			g._updateInp();

			g.callEvent("onButtonClick", [ null ])

		}

	};

	if (this.conf.touch == true) {

		n.ontouchstart = n.onclick

	}

	this._activeMonth = null;

	this._activeDate = new Date();

	this._activeDateCell = null;

	this.setDate = function(q) {

		window.dhx4.temp_calendar = {

			tz : null

		};

		this._nullDate = (typeof (q) == "undefined" || q === "" || !q);

		if (!(q instanceof Date)) {

			q = this._strToDate(String(q || ""));

			if (q == "Invalid Date") {

				q = new Date()

			} else {

				this.conf.tz = window.dhx4.temp_calendar.tz

			}

			window.dhx4.temp_calendar = null

		}

		if (this.conf.tz == null) {

			this.conf.tz = window.dhx4.date2str(q, "%P")

		}

		var a = q.getTime();

		if (this._isOutOfRange(a)) {

			return

		}

		this._activeDate = new Date(a);

		this._drawMonth(this._nullDate ? new Date() : this._activeDate);

		this._updateVisibleHours();

		this._updateVisibleMinutes()

	};

	this.getDate = function(r) {

		if (this._nullDate) {

			return null

		}

		var a = new Date(this._activeDate.getTime());

		if (r) {

			window.dhx4.temp_calendar = {

				tz : this.conf.tz

			};

			var q = this._dateToStr(a);

			window.dhx4.temp_calendar = null;

			return q

		}

		return a

	};

	this._drawMonth = function(A) {

		if (!(A instanceof Date)) {

			return

		}

		if (isNaN(A.getFullYear())) {

			A = new Date(this._activeMonth.getFullYear(), this._activeMonth

					.getMonth(), 1, 0, 0, 0, 0)

		}

		this._activeMonth = new Date(A.getFullYear(), A.getMonth(), 1, 0, 0, 0,

				0);

		this._activeDateCell = null;

		var y = new Date(this._activeMonth.getTime());

		var s = y.getDay();

		var E = s - this._wStart;

		if (E < 0) {

			E = E + 7

		}

		y.setDate(y.getDate() - E);

		var I = A.getMonth();

		var J = new Date(this._activeDate.getFullYear(), this._activeDate

				.getMonth(), this._activeDate.getDate(), 0, 0, 0, 0).getTime();

		var v = 0;

		for (var r = 0; r < 6; r++) {

			var z = this._wStart;

			for (var H = 0; H <= 7; H++) {

				if (H == 0) {

					var F = this.getWeekNumber(new Date(y.getFullYear(), y

							.getMonth(), y.getDate() + v, 0, 0, 0, 0));

					if (F >= 52 && this.conf.ws_first == true

							&& this._activeMonth.getMonth() == 0) {

						var u = this.getWeekNumber(new Date(y.getFullYear(), y

								.getMonth(), y.getDate() + v + 7, 0, 0, 0, 0));

						if (u < F && u > 1) {

							F = 1

						}

					} else {

						if (F > 52 && this._activeMonth.getMonth() == 11) {

							var u = this.getWeekNumber(new Date(

									y.getFullYear() + 1, 0, 1));

							if (u == 1) {

								F = 1

							}

						}

					}

					this.contDates.childNodes[r].childNodes[H].innerHTML = "<div class='dhtmlxcalendar_label'>"

							+ F + "</div>"

				} else {

					var a = new Date(y.getFullYear(), y.getMonth(), y.getDate()

							+ v, 0, 0, 0, 0);

					if (a.getHours() != 0) {

						var x = (a.getHours() > 12 ? 24 - a.getHours() : a

								.getHours());

						a.setTime(a.getTime() + 60 * 60 * 1000 * x)

					}

					var D = a.getDay();

					var t = a.getTime();

					var C = "dhtmlxcalendar_label";

					if (this._tipData[t] != null) {

						if (this._tipData[t].usePopup

								&& typeof (window.dhtmlXPopup) == "function") {

							this.contDates.childNodes[r].childNodes[H]

									.removeAttribute("title");

							this._initTooltipPopup()

						} else {

							this.contDates.childNodes[r].childNodes[H]

									.setAttribute("title",

											this._tipData[t].text)

						}

						if (this._tipData[t].showIcon) {

							C += " dhtmlxcalendar_label_title"

						}

					} else {

						this.contDates.childNodes[r].childNodes[H]

								.removeAttribute("title")

					}

					this.contDates.childNodes[r].childNodes[H].innerHTML = "<div class='"

							+ C + "'>" + a.getDate() + "</div>";

					this.contDates.childNodes[r].childNodes[H]._date = new Date(

							t);

					this.contDates.childNodes[r].childNodes[H]._q = r;

					this.contDates.childNodes[r].childNodes[H]._w = H;

					this.contDates.childNodes[r].childNodes[H]._css_month = (a

							.getMonth() == I);

					this.contDates.childNodes[r].childNodes[H]._css_date = (!this._nullDate && t == J);

					this.contDates.childNodes[r].childNodes[H]._css_weekend = (z >= 6);

					this.contDates.childNodes[r].childNodes[H]._css_dis = this

							._isOutOfRange(t);

					this.contDates.childNodes[r].childNodes[H]._css_holiday = (this._holidays[t] == true);

					this._updateCellStyle(r, H);

					if (t == J) {

						this._activeDateCell = this.contDates.childNodes[r].childNodes[H]

					}

					if (++z > 7) {

						z = 1

					}

					v++

				}

			}

		}

		this.contMonth.firstChild.firstChild.childNodes[1].innerHTML = this

				._buildMonthHdr(A)

	};

	this._updateCellStyle = function(v, a) {

		var u = this.contDates.childNodes[v].childNodes[a];

		var t = "dhtmlxcalendar_cell dhtmlxcalendar_cell";

		t += (u._css_month ? "_month" : "");

		t += (u._css_date ? "_date" : "");

		t += (u._css_weekend ? "_weekend" : "");

		t += (u._css_holiday ? "_holiday" : "");

		t += (u._css_dis ? "_dis" : "");

		t += (u._css_hover && !u._css_dis ? "_hover" : "");

		u.className = t;

		u = null

	};

	this._minutesInterval = 5;

	this._initSelector = function(y, t) {

		if (!this._selCover) {

			this._selCover = document.createElement("DIV");

			this._selCover.className = "dhtmlxcalendar_selector_cover";

			this.base.firstChild.appendChild(this._selCover)

		}

		if (!this._sel) {

			this._sel = document.createElement("DIV");

			this._sel.className = "dhtmlxcalendar_selector_obj";

			this.base.firstChild.appendChild(this._sel);

			this._sel.appendChild(document.createElement("TABLE"));

			this._sel.firstChild.className = "dhtmlxcalendar_selector_table";

			this._sel.firstChild.cellSpacing = 0;

			this._sel.firstChild.cellPadding = 0;

			this._sel.firstChild.border = 0;

			this._sel.firstChild.appendChild(document.createElement("TBODY"));

			this._sel.firstChild.firstChild.appendChild(document

					.createElement("TR"));

			this._sel.firstChild.firstChild.firstChild.appendChild(document

					.createElement("TD"));

			this._sel.firstChild.firstChild.firstChild.appendChild(document

					.createElement("TD"));

			this._sel.firstChild.firstChild.firstChild.appendChild(document

					.createElement("TD"));

			this._sel.firstChild.firstChild.firstChild.childNodes[0].className = "dhtmlxcalendar_selector_cell_left";

			this._sel.firstChild.firstChild.firstChild.childNodes[1].className = "dhtmlxcalendar_selector_cell_middle";

			this._sel.firstChild.firstChild.firstChild.childNodes[2].className = "dhtmlxcalendar_selector_cell_right";

			this._sel.firstChild.firstChild.firstChild.childNodes[0].innerHTML = "&nbsp;";

			this._sel.firstChild.firstChild.firstChild.childNodes[2].innerHTML = "&nbsp;";

			this._sel.firstChild.firstChild.firstChild.childNodes[0].onmouseover = function() {

				this.className = "dhtmlxcalendar_selector_cell_left dhtmlxcalendar_selector_cell_left_hover"

			};

			this._sel.firstChild.firstChild.firstChild.childNodes[0].onmouseout = function() {

				this.className = "dhtmlxcalendar_selector_cell_left"

			};

			this._sel.firstChild.firstChild.firstChild.childNodes[2].onmouseover = function() {

				this.className = "dhtmlxcalendar_selector_cell_right dhtmlxcalendar_selector_cell_right_hover"

			};

			this._sel.firstChild.firstChild.firstChild.childNodes[2].onmouseout = function() {

				this.className = "dhtmlxcalendar_selector_cell_right"

			};

			this._sel.onmouseover = function(w) {

				w = w || event;

				var q = (w.target || w.srcElement);

				if (q._cell === true) {

					if (g._selHover != q) {

						g._clearSelHover()

					}

					if (String(q.className).match(

							/^\s{0,}dhtmlxcalendar_selector_cell\s{0,}$/gi) != null) {

						q.className += " dhtmlxcalendar_selector_cell_hover";

						g._selHover = q

					}

				}

			};

			this._sel.onmouseout = function() {

				g._clearSelHover()

			};

			this._sel.firstChild.firstChild.firstChild.childNodes[0].onclick = function(

					q) {

				q = q || event;

				if (q.type == "touchstart" && q.preventDefault != null) {

					q.preventDefault()

				}

				q.cancelBubble = true;

				g._scrollYears(-1)

			};

			this._sel.firstChild.firstChild.firstChild.childNodes[2].onclick = function(

					q) {

				q = q || event;

				if (q.type == "touchstart" && q.preventDefault != null) {

					q.preventDefault()

				}

				q.cancelBubble = true;

				g._scrollYears(1)

			};

			if (this.conf.touch == true) {

				this._sel.firstChild.firstChild.firstChild.childNodes[0].ontouchstart = this._sel.firstChild.firstChild.firstChild.childNodes[0].onclick;

				this._sel.firstChild.firstChild.firstChild.childNodes[2].ontouchstart = this._sel.firstChild.firstChild.firstChild.childNodes[2].onclick

			}

			this._sel._ta = {};

			this._selHover = null;

			this._sel.appendChild(document.createElement("DIV"));

			this._sel.lastChild.className = "dhtmlxcalendar_selector_obj_arrow"

		}

		if (this._sel._ta[y] == true) {

			return

		}

		if (y == "month") {

			this._msCells = {};

			this.msCont = document.createElement("DIV");

			this.msCont.className = "dhtmlxcalendar_area_" + t;

			this._sel.firstChild.firstChild.firstChild.childNodes[1]

					.appendChild(this.msCont);

			var r = 0;

			for (var a = 0; a < 4; a++) {

				var x = document.createElement("UL");

				x.className = "dhtmlxcalendar_selector_line";

				this.msCont.appendChild(x);

				for (var z = 0; z < 3; z++) {

					var A = document.createElement("LI");

					A.innerHTML = this.langData[this.lang].monthesSNames[r];

					A.className = "dhtmlxcalendar_selector_cell";

					x.appendChild(A);

					A._month = r;

					A._cell = true;

					this._msCells[r++] = A

				}

			}

			this.msCont.onclick = function(w) {

				w = w || event;

				if (w.type == "touchstart" && w.preventDefault != null) {

					w.preventDefault()

				}

				w.cancelBubble = true;

				var q = (w.target || w.srcElement);

				if (q._month != null) {

					g._hideSelector();

					g._updateActiveMonth();

					g._drawMonth(new Date(g._activeMonth.getFullYear(),

							q._month, 1, 0, 0, 0, 0));

					g._doOnSelectorChange()

				}

			};

			if (this.conf.touch == true) {

				this.msCont.ontouchstart = this.msCont.onclick

			}

		}

		if (y == "year") {

			this._ysCells = {};

			this.ysCont = document.createElement("DIV");

			this.ysCont.className = "dhtmlxcalendar_area_" + t;

			this._sel.firstChild.firstChild.firstChild.childNodes[1]

					.appendChild(this.ysCont);

			for (var a = 0; a < 4; a++) {

				var x = document.createElement("UL");

				x.className = "dhtmlxcalendar_selector_line";

				this.ysCont.appendChild(x);

				for (var z = 0; z < 3; z++) {

					var A = document.createElement("LI");

					A.className = "dhtmlxcalendar_selector_cell";

					A._cell = true;

					x.appendChild(A)

				}

			}

			this.ysCont.onclick = function(w) {

				w = w || event;

				if (w.type == "touchstart" && w.preventDefault != null) {

					w.preventDefault()

				}

				w.cancelBubble = true;

				var q = (w.target || w.srcElement);

				if (q._year != null) {

					g._hideSelector();

					g._drawMonth(new Date(q._year, g._activeMonth.getMonth(),

							1, 0, 0, 0, 0));

					g._doOnSelectorChange()

				}

			};

			if (this.conf.touch == true) {

				this.ysCont.ontouchstart = this.ysCont.onclick

			}

		}

		if (y == "hours") {

			this._hsCells = {};

			this.hsCont = document.createElement("DIV");

			this.hsCont.className = "dhtmlxcalendar_area_" + t;

			this._sel.firstChild.firstChild.firstChild.childNodes[1]

					.appendChild(this.hsCont);

			var r = 0;

			for (var a = 0; a < 4; a++) {

				var x = document.createElement("UL");

				x.className = "dhtmlxcalendar_selector_line";

				this.hsCont.appendChild(x);

				for (var z = 0; z < 6; z++) {

					var A = document.createElement("LI");

					A.innerHTML = this._fixLength(r, 2);

					A.className = "dhtmlxcalendar_selector_cell";

					x.appendChild(A);

					A._hours = r;

					A._cell = true;

					this._hsCells[r++] = A

				}

			}

			this.hsCont.onclick = function(w) {

				w = w || event;

				if (w.type == "touchstart" && w.preventDefault != null) {

					w.preventDefault()

				}

				w.cancelBubble = true;

				var q = (w.target || w.srcElement);

				if (q._hours != null) {

					g._hideSelector();

					g._activeDate.setHours(q._hours);

					g._updateActiveHours();

					g._updateVisibleHours();

					g._doOnSelectorChange();

					g.callEvent("onTimeChange", [ new Date(g._activeDate

							.getTime()) ])

				}

			};

			if (this.conf.touch == true) {

				this.hsCont.ontouchstart = this.hsCont.onclick

			}

		}

		if (y == "minutes") {

			var v = 4;

			var s = 3;

			var u = 2;

			if (this._minutesInterval == 1) {

				if (this._selectorMode == 1) {

					v = 2;

					s = 3;

					u = 1

				} else {

					v = 2;

					s = 5;

					u = 1;

					t += "5"

				}

			}

			if (this._minutesInterval == 10) {

				v = 2

			}

			if (this._minutesInterval == 15) {

				v = 1;

				s = 4;

				t += "4"

			}

			this._rsCells = {};

			this.rsCont = document.createElement("DIV");

			this.rsCont.className = "dhtmlxcalendar_area_" + t;

			this._sel.firstChild.firstChild.firstChild.childNodes[1]

					.appendChild(this.rsCont);

			var r = 0;

			for (var a = 0; a < v; a++) {

				var x = document.createElement("UL");

				x.className = "dhtmlxcalendar_selector_line";

				this.rsCont.appendChild(x);

				for (var z = 0; z < s; z++) {

					var A = document.createElement("LI");

					A.innerHTML = (u > 1 ? this._fixLength(r, u) : r);

					A.className = "dhtmlxcalendar_selector_cell";

					x.appendChild(A);

					A._minutes = r;

					A._cell = true;

					this._rsCells[r] = A;

					r += this._minutesInterval

				}

			}

			this.rsCont.onclick = function(C) {

				C = C || event;

				if (C.type == "touchstart" && C.preventDefault != null) {

					C.preventDefault()

				}

				C.cancelBubble = true;

				var w = (C.target || C.srcElement);

				if (w._minutes != null) {

					if (g._minutesInterval == 1) {

						var q = g.getFormatedDate("%i");

						if (g._selectorMode == 1) {

							q = w._minutes.toString() + q.charAt(1)

						} else {

							q = q.charAt(0) + w._minutes.toString()

						}

						g._activeDate.setMinutes(Number(q));

						g.callEvent("onTimeChange", [ new Date(g._activeDate

								.getTime()) ]);

						g._hideSelector();

						if (g._selectorMode == 1) {

							g._updateVisibleMinutes(true);

							g._selectorMode = 2;

							g._showSelector("minutes", g._sel._x, g._sel._y,

									"selector_minutes", true);

							g._updateActiveMinutes();

							return

						} else {

							g._selectorMode = 1

						}

					} else {

						g._hideSelector();

						g._activeDate.setMinutes(w._minutes);

						g._updateActiveMinutes();

						g.callEvent("onTimeChange", [ new Date(g._activeDate

								.getTime()) ])

					}

					g._updateVisibleMinutes();

					g._doOnSelectorChange()

				}

			};

			if (this.conf.touch == true) {

				this.rsCont.ontouchstart = this.rsCont.onclick

			}

		}

		this._sel._ta[y] = true

	};

	this._showSelector = function(t, q, u, s, a) {

		if (a === true && this._sel != null && this._isSelectorVisible()

				&& t == this._sel._t) {

			this._hideSelector();

			return

		}

		if (this.conf.skin == "dhx_terrace") {

			q += 12

		}

		if (!this._sel || !this._sel._ta[t]) {

			this._initSelector(t, s)

		}

		if (t != this._sel._t && this._sel._t == "minutes"

				&& this._minutesInterval == 1) {

			this.contTime.firstChild.firstChild.childNodes[3].innerHTML = this

					.getFormatedDate("%i")

		}

		this._sel._x = q;

		this._sel._y = u;

		this._sel.style.visibility = "hidden";

		this._sel.style.display = "";

		this._selCover.style.width = this.base.offsetWidth - 2 + "px";

		this._selCover.style.top = this.contMonth.offsetHeight + "px";

		this._selCover.style.height = this.contDates.offsetHeight

				+ this.contDays.offsetHeight - 1 + "px";

		this._selCover.style.display = "";

		this._sel._t = t;

		this._sel.className = "dhtmlxcalendar_selector_obj dhtmlxcalendar_" + s

				+ (t == "hours" && this.conf.today == true ? "2" : "");

		this._sel.childNodes[0].firstChild.firstChild.childNodes[0].style.display = this._sel.childNodes[0].firstChild.firstChild.childNodes[2].style.display = (t == "year" ? ""

				: "none");

		var r = Math.max(0, q - Math.round(this._sel.offsetWidth / 2));

		if (r + this._sel.offsetWidth > this._sel.parentNode.offsetWidth) {

			r = this._sel.parentNode.offsetWidth - this._sel.offsetWidth

		}

		this._sel.style.left = r + "px";

		if (t == "hours" || t == "minutes") {

			this._sel.style.top = u - this._sel.offsetHeight + "px"

		} else {

			this._sel.style.top = u + "px"

		}

		this._sel.childNodes[1].style.width = this._sel.childNodes[0].offsetWidth

				+ "px";

		this._sel.style.visibility = "visible";

		this._doOnSelectorShow(t)

	};

	this._doOnSelectorShow = function(a) {

		if (a == "month") {

			this._updateActiveMonth()

		}

		if (a == "year") {

			this._updateYearsList(this._activeMonth)

		}

		if (a == "hours") {

			this._updateActiveHours()

		}

		if (a == "minutes") {

			this._updateActiveMinutes()

		}

	};

	this._hideSelector = function(a) {

		if (!this._sel) {

			return

		}

		this._sel.style.display = "none";

		this._sel.style.visible = "hidden";

		this._selCover.style.display = "none";

		if (this._sel._t == "minutes" && this._minutesInterval == 1) {

			this.contTime.firstChild.firstChild.childNodes[3].innerHTML = this

					.getFormatedDate("%i");

			this._unloadSelector("minutes")

		}

	};

	this._isSelectorVisible = function() {

		if (!this._sel) {

			return false

		}

		return (this._sel.style.display != "none")

	};

	this._doOnSelectorChange = function(a) {

		this.callEvent("onChange", [

				new Date(this._activeMonth.getFullYear(), this._activeMonth

						.getMonth(), this._activeDate.getDate(),

						this._activeDate.getHours(), this._activeDate

								.getMinutes(), this._activeDate.getSeconds()),

				a === true ])

	};

	this._clearSelHover = function() {

		if (!this._selHover) {

			return

		}

		this._selHover.className = String(this._selHover.className.replace(

				/dhtmlxcalendar_selector_cell_hover/gi, ""));

		this._selHover = null

	};

	this._unloadSelector = function(r) {

		if (!this._sel) {

			return

		}

		if (!this._sel._ta[r]) {

			return

		}

		if (r == "month") {

			this.msCont.onclick = this.msCont.ontouchstart = null;

			this._msActive = null;

			for ( var q in this._msCells) {

				this._msCells[q]._cell = null;

				this._msCells[q]._month = null;

				this._msCells[q].parentNode.removeChild(this._msCells[q]);

				this._msCells[q] = null

			}

			this._msCells = null;

			while (this.msCont.childNodes.length > 0) {

				this.msCont.removeChild(this.msCont.lastChild)

			}

			this.msCont.parentNode.removeChild(this.msCont);

			this.msCont = null

		}

		if (r == "year") {

			this.ysCont.onclick = this.ysCont.ontouchstart = null;

			for ( var q in this._ysCells) {

				this._ysCells[q]._cell = null;

				this._ysCells[q]._year = null;

				this._ysCells[q].parentNode.removeChild(this._ysCells[q]);

				this._ysCells[q] = null

			}

			this._ysCells = null;

			while (this.ysCont.childNodes.length > 0) {

				this.ysCont.removeChild(this.ysCont.lastChild)

			}

			this.ysCont.parentNode.removeChild(this.ysCont);

			this.ysCont = null

		}

		if (r == "hours") {

			this.hsCont.onclick = this.hsCont.ontouchstart = null;

			this._hsActive = null;

			for ( var q in this._hsCells) {

				this._hsCells[q]._cell = null;

				this._hsCells[q]._hours = null;

				this._hsCells[q].parentNode.removeChild(this._hsCells[q]);

				this._hsCells[q] = null

			}

			this._hsCells = null;

			while (this.hsCont.childNodes.length > 0) {

				this.hsCont.removeChild(this.hsCont.lastChild)

			}

			this.hsCont.parentNode.removeChild(this.hsCont);

			this.hsCont = null

		}

		if (r == "minutes") {

			this.rsCont.onclick = this.rsCont.ontouchstart = null;

			this._rsActive = null;

			for ( var q in this._rsCells) {

				this._rsCells[q]._cell = null;

				this._rsCells[q]._minutes = null;

				this._rsCells[q].parentNode.removeChild(this._rsCells[q]);

				this._rsCells[q] = null

			}

			this._rsCells = null;

			while (this.rsCont.childNodes.length > 0) {

				this.rsCont.removeChild(this.rsCont.lastChild)

			}

			this.rsCont.parentNode.removeChild(this.rsCont);

			this.rsCont = null

		}

		this._sel._ta[r] = null

	};

	this.setMinutesInterval = function(a) {

		if (!(a == 1 || a == 5 || a == 10 || a == 15)) {

			return

		}

		this._minutesInterval = a;

		this._unloadSelector("minutes")

	};

	this._updateActiveMonth = function() {

		if (typeof (this._msActive) != "undefined"

				&& typeof (this._msCells[this._msActive]) != "undefined") {

			this._msCells[this._msActive].className = "dhtmlxcalendar_selector_cell"

		}

		this._msActive = this._activeMonth.getMonth();

		this._msCells[this._msActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"

	};

	this._updateActiveYear = function() {

		var a = this._activeMonth.getFullYear();

		if (this._ysCells[a]) {

			this._ysCells[a].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"

		}

	};

	this._updateYearsList = function(v) {

		for ( var s in this._ysCells) {

			this._ysCells[s] = null;

			delete this._ysCells[s]

		}

		var t = 12 * Math.floor(v.getFullYear() / 12);

		for (var u = 0; u < 4; u++) {

			for (var r = 0; r < 3; r++) {

				this.ysCont.childNodes[u].childNodes[r].innerHTML = t;

				this.ysCont.childNodes[u].childNodes[r]._year = t;

				this.ysCont.childNodes[u].childNodes[r].className = "dhtmlxcalendar_selector_cell";

				this._ysCells[t++] = this.ysCont.childNodes[u].childNodes[r]

			}

		}

		this._updateActiveYear()

	};

	this._scrollYears = function(a) {

		var r = (a < 0 ? this.ysCont.firstChild.firstChild._year

				: this.ysCont.lastChild.lastChild._year)

				+ a;

		var q = new Date(r, this._activeMonth.getMonth(), 1, 0, 0, 0, 0);

		this._updateYearsList(q)

	};

	this._updateActiveHours = function() {

		if (typeof (this._hsActive) != "undefined"

				&& typeof (this._hsCells[this._hsActive]) != "undefined") {

			this._hsCells[this._hsActive].className = "dhtmlxcalendar_selector_cell"

		}

		this._hsActive = this._activeDate.getHours();

		this._hsCells[this._hsActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"

	};

	this._updateVisibleHours = function() {

		this.contTime.firstChild.firstChild.childNodes[1].innerHTML = this

				._fixLength(this._activeDate.getHours(), 2)

	};

	this._updateActiveMinutes = function() {

		if (this._rsActive != null && typeof (this._rsActive) != "undefined"

				&& typeof (this._rsCells[this._rsActive]) != "undefined") {

			this._rsCells[this._rsActive].className = "dhtmlxcalendar_selector_cell"

		}

		if (this._minutesInterval == 1) {

			this._rsActive = (this.getFormatedDate("%i").toString())

					.charAt(this._selectorMode == 1 ? 0 : 1)

		} else {

			this._rsActive = this._activeDate.getMinutes()

		}

		if (typeof (this._rsCells[this._rsActive]) != "undefined") {

			this._rsCells[this._rsActive].className = "dhtmlxcalendar_selector_cell dhtmlxcalendar_selector_cell_active"

		}

	};

	this._updateVisibleMinutes = function(q) {

		var a = this._fixLength(this._activeDate.getMinutes(), 2).toString();

		if (q == true) {

			a = a.charAt(0) + "<span class='dhtmlxcalendar_selected_date'>"

					+ a.charAt(1) + "</span>"

		}

		this.contTime.firstChild.firstChild.childNodes[3].innerHTML = a;

		if (q == true) {

			this.contTime.firstChild.firstChild.childNodes[3].lastChild._par = true

		}

	};

	this._fixLength = function(a, q) {

		while (String(a).length < q) {

			a = "0" + String(a)

		}

		return a

	};

	this._dateFormat = "";

	this._dateFormatRE = null;

	this.setDateFormat = function(t) {

		var s = {};

		if (this._strToDate != null) {

			for ( var q in this.i) {

				if (this.i[q].input != null && this.i[q].input.value.length > 0) {

					var u = this._strToDate(this.i[q].input.value,

							this._dateFormat

									|| this.langData[this.lang].dateformat

									|| "%Y-%m-%d");

					if (u instanceof Date) {

						s[q] = u

					}

				}

			}

		}

		this._dateFormat = t;

		var r = String(this._dateFormat).replace(

				/%[a-zA-Z]+/g,

				function(a) {

					var v = a.replace(/%/, "");

					switch (v) {

					case "n":

					case "h":

					case "j":

					case "g":

					case "G":

						return "\\d{1,2}";

					case "m":

					case "d":

					case "H":

					case "i":

					case "s":

					case "y":

						return "\\d{2}";

					case "Y":

						return "\\d{4}";

					case "M":

						return "("

								+ g.langData[g.lang].monthesSNames.join("|")

										.toLowerCase() + "){1,}";

					case "F":

						return "("

								+ g.langData[g.lang].monthesFNames.join("|")

										.toLowerCase() + "){1,}";

					case "D":

						return "[a-z]{2}";

					case "a":

					case "A":

						return "AM|PM";

					case "u":

						return "\\d{1,6}";

					case "P":

						return "[\\+\\-]\\d{1,2}\\:\\d{1,2}"

					}

					return a

				});

		this._dateFormatRE = new RegExp(r, "i");

		for ( var q in s) {

			this.i[q].input.value = this._dateToStr(s[q])

		}

		s = null

	};

	this.setDateFormat(this.langData[this.lang].dateformat || "%Y-%m-%d");

	this._updateDateStr = function(q) {

		if (!this._dateFormatRE || !q.match(this._dateFormatRE)) {

			return

		}

		if (q == this.getFormatedDate()) {

			return

		}

		var a = this._strToDate(q);

		if (!(a instanceof Date)) {

			return

		}

		if (this.checkEvent("onBeforeChange")) {

			if (!this.callEvent("onBeforeChange", [ new Date(a.getFullYear(), a

					.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a

					.getSeconds()) ])) {

				this._updateInp();

				return

			}

		}

		this._nullDate = false;

		this._activeDate = a;

		this._drawMonth(this._nullDate ? new Date() : this._activeDate);

		this._updateVisibleMinutes();

		this._updateVisibleHours();

		if (this._sel && this._isSelectorVisible()) {

			this._doOnSelectorShow(this._sel._t)

		}

		this._doOnSelectorChange(true)

	};

	this.showMonth = function(a) {

		if (typeof (a) == "string") {

			a = this._strToDate(a)

		}

		if (!(a instanceof Date)) {

			return

		}

		this._drawMonth(a)

	};

	this.setFormatedDate = function(t, u, q, s) {

		var r = this._strToDate(u, t);

		if (s) {

			return r

		}

		this.setDate(r)

	};

	this.getFormatedDate = function(q, a) {

		if (!(a && a instanceof Date)) {

			if (this._nullDate) {

				return ""

			}

			a = new Date(this._activeDate)

		}

		return this._dateToStr(a, q)

	};

	this.getWeekNumber = function(r) {

		if (typeof (r) == "string") {

			r = this._strToDate(r)

		}

		if (!(r instanceof Date)) {

			return "Invalid Date"

		}

		var q = r.getDay();

		if (q === 0) {

			q = 7

		}

		var s = new Date(r.valueOf());

		s.setDate(r.getDate() + (4 - q));

		var a = s.getFullYear();

		var t = Math

				.round((s.getTime() - new Date(a, 0, 1).getTime()) / 86400000);

		return 1 + Math.floor(t / 7)

	};

	this.showWeekNumbers = function() {

		this.base.firstChild.className = "dhtmlxcalendar_wn"

	};

	this.hideWeekNumbers = function() {

		this.base.firstChild.className = ""

	};

	this.show = function(s) {

		if (!s && this._hasParent) {

			this._show();

			return

		}

		if (typeof (s) == "string") {

			var r = document.getElementById(s);

			if (r != null && typeof (r._dhtmlxcalendar_uid) != "undefined"

					&& this.i[r._dhtmlxcalendar_uid] != null) {

				this._show(r._dhtmlxcalendar_uid);

				return

			}

		}

		if (typeof (s) == "object"

				&& typeof (s._dhtmlxcalendar_uid) != "undefined"

				&& this.i[s._dhtmlxcalendar_uid] == s) {

			this._show(s._dhtmlxcalendar_uid);

			return

		}

		if (typeof (s) == "undefined") {

			for ( var q in this.i) {

				if (!s) {

					s = q

				}

			}

		}

		if (!s) {

			return

		}

		this._show(s)

	};

	this.hide = function() {

		if (this._isVisible()) {

			this._hide()

		}

	};

	this.isVisible = function() {

		return this._isVisible()

	};

	this._activeInp = null;

	this.pos = "bottom";

	this.setPosition = function(a, q) {

		this._px = null;

		this._py = null;

		if (a == "right" || a == "bottom") {

			this.pos = a

		} else {

			this.pos = "int";

			if (typeof (a) != "undefined" && !isNaN(a)) {

				this.base.style.left = a + "px";

				this._px = a

			}

			if (typeof (q) != "undefined" && !isNaN(q)) {

				this.base.style.top = q + "px";

				this._py = q

			}

			this._ifrSize()

		}

	};

	this._show = function(v, q) {

		if (q === true && this._activeInp == v && this._isVisible()) {

			this._hide();

			return

		}

		this.base.style.visibility = "hidden";

		this.base.style.display = "";

		if (!v) {

			if (this._px != null && this._py != null) {

				this.base.style.left = this._px + "px";

				this.base.style.top = this._py + "px"

			} else {

				this.base.style.left = "0px";

				this.base.style.top = "0px"

			}

		} else {

			if (this.base.className.indexOf("dhtmlxcalendar_in_input") == -1) {

				this.base.className += " dhtmlxcalendar_in_input"

			}

			var r = (this.i[v].input || this.i[v].button);

			var w = window.dhx4.screenDim();

			var u = {

				top : window.dhx4.absTop(r),

				left : window.dhx4.absLeft(r)

			};

			if (this.pos == "right") {

				this.base.style.left = u.left + r.offsetWidth + "px";

				this.base.style.top = Math.min(u.top, w.bottom

						- this.base.offsetHeight)

						+ "px"

			} else {

				if (this.pos == "bottom") {

					var t = u.top + r.offsetHeight + 1;

					if (t + this.base.offsetHeight > w.bottom) {

						var s = u.top - this.base.offsetHeight;

						if (s >= -20) {

							t = s

						}

					}

					var a = u.left;

					if (a + this.base.offsetWidth > w.right) {

						a = Math.max(0, u.left + r.offsetWidth

								- this.base.offsetWidth)

					}

					this.base.style.left = a + "px";

					this.base.style.top = t + "px"

				} else {

					this.base.style.left = (this._px || 0) + "px";

					this.base.style.top = (this._py || 0) + "px"

				}

			}

			this._activeInp = v;

			r = null

		}

		this._hideSelector();

		this.base.style.visibility = "visible";

		this.base.style.zIndex = window.dhx4.zim.reserve(this.conf.zi);

		this._ifrSize();

		if (this._ifr) {

			this._ifr.style.display = ""

		}

		this.callEvent("onShow", [])

	};

	this._hide = function() {

		if (this._lastHover != null) {

			this._clearDayHover()

		}

		this._hideSelector();

		this.base.style.display = "none";

		window.dhx4.zim.clear(this.conf.zi);

		if (this.base.className.indexOf("dhtmlxcalendar_in_input") >= 0) {

			this.base.className = this.base.className.replace(

					/\s{0,}dhtmlxcalendar_in_input/gi, "")

		}

		this._activeInp = null;

		if (this._ifr) {

			this._ifr.style.display = "none"

		}

		this.callEvent("onHide", [])

	};

	this._isVisible = function() {

		return (this.base.style.display != "none")

	};

	this._rangeActive = false;

	this._rangeFrom = null;

	this._rangeTo = null;

	this._rangeSet = {};

	this.setInsensitiveDays = function(s) {

		var a = this._extractDates(s);

		for (var r = 0; r < a.length; r++) {

			this._rangeSet[new Date(a[r].getFullYear(), a[r].getMonth(), a[r]

					.getDate(), 0, 0, 0, 0).getTime()] = true

		}

		this._drawMonth(this._activeMonth)

	};

	this.clearInsensitiveDays = function() {

		this._clearRangeSet();

		this._drawMonth(this._activeMonth)

	};

	this._holidays = {};

	this.setHolidays = function(s) {

		if (s == null) {

			this._clearHolidays()

		} else {

			if (s != null) {

				var a = this._extractDates(s);

				for (var u = 0; u < a.length; u++) {

					this._holidays[new Date(a[u].getFullYear(),

							a[u].getMonth(), a[u].getDate(), 0, 0, 0, 0)

							.getTime()] = true

				}

			}

		}

		this._drawMonth(this._activeMonth)

	};

	this._extractDates = function(u) {

		if (typeof (u) == "string" || u instanceof Date) {

			u = [ u ]

		}

		var s = [];

		for (var v = 0; v < u.length; v++) {

			if (typeof (u[v]) == "string") {

				var x = u[v].split(",");

				for (var a = 0; a < x.length; a++) {

					s.push(this._strToDate(x[a]))

				}

			} else {

				if (u[v] instanceof Date) {

					s.push(u[v])

				}

			}

		}

		return s

	};

	this._clearRange = function() {

		this._rangeActive = false;

		this._rangeType = null;

		this._rangeFrom = null;

		this._rangeTo = null

	};

	this._clearRangeSet = function() {

		for ( var q in this._rangeSet) {

			this._rangeSet[q] = null;

			delete this._rangeSet[q]

		}

	};

	this._clearHolidays = function() {

		for ( var q in this._holidays) {

			this._holidays[q] = null;

			delete this._holidays[q]

		}

	};

	this._isOutOfRange = function(q) {

		if (this._rangeSet[q] == true) {

			return true

		}

		if (this._rangeActive) {

			if (this._rangeType == "in"

					&& (q < this._rangeFrom || q > this._rangeTo)) {

				return true

			}

			if (this._rangeType == "out"

					&& (q >= this._rangeFrom && q <= this._rangeTo)) {

				return true

			}

			if (this._rangeType == "from" && q < this._rangeFrom) {

				return true

			}

			if (this._rangeType == "to" && q > this._rangeTo) {

				return true

			}

		}

		var a = new Date(q);

		if (this._rangeWeek) {

			if (this._rangeWeekData[a.getDay()] === true) {

				return true

			}

		}

		if (this._rangeMonth) {

			if (this._rangeMonthData[a.getDate()] === true) {

				return true

			}

		}

		if (this._rangeYear) {

			if (this._rangeYearData[a.getMonth() + "_" + a.getDate()] === true) {

				return true

			}

		}

		return false

	};

	this.clearSensitiveRange = function() {

		this._clearRange();

		this._drawMonth(this._activeMonth)

	};

	this.setSensitiveRange = function(s, r, a) {

		var q = false;

		if (s != null && r != null) {

			if (!(s instanceof Date)) {

				s = this._strToDate(s)

			}

			if (!(r instanceof Date)) {

				r = this._strToDate(r)

			}

			if (s.getTime() > r.getTime()) {

				return

			}

			this._rangeFrom = new Date(s.getFullYear(), s.getMonth(), s

					.getDate(), 0, 0, 0, 0).getTime();

			this._rangeTo = new Date(r.getFullYear(), r.getMonth(),

					r.getDate(), 0, 0, 0, 0).getTime();

			this._rangeActive = true;

			this._rangeType = "in";

			q = true

		}

		if (!q && s != null && r == null) {

			if (!(s instanceof Date)) {

				s = this._strToDate(s)

			}

			this._rangeFrom = new Date(s.getFullYear(), s.getMonth(), s

					.getDate(), 0, 0, 0, 0).getTime();

			this._rangeTo = null;

			if (a === true) {

				this._rangeFrom++

			}

			this._rangeActive = true;

			this._rangeType = "from";

			q = true

		}

		if (!q && s == null && r != null) {

			if (!(r instanceof Date)) {

				r = this._strToDate(r)

			}

			this._rangeFrom = null;

			this._rangeTo = new Date(r.getFullYear(), r.getMonth(),

					r.getDate(), 0, 0, 0, 0).getTime();

			if (a === true) {

				this._rangeTo--

			}

			this._rangeActive = true;

			this._rangeType = "to";

			q = true

		}

		if (q) {

			this._drawMonth(this._activeMonth)

		}

	};

	this.setInsensitiveRange = function(q, a) {

		if (q != null && a != null) {

			if (!(q instanceof Date)) {

				q = this._strToDate(q)

			}

			if (!(a instanceof Date)) {

				a = this._strToDate(a)

			}

			if (q.getTime() > a.getTime()) {

				return

			}

			this._rangeFrom = new Date(q.getFullYear(), q.getMonth(), q

					.getDate(), 0, 0, 0, 0).getTime();

			this._rangeTo = new Date(a.getFullYear(), a.getMonth(),

					a.getDate(), 0, 0, 0, 0).getTime();

			this._rangeActive = true;

			this._rangeType = "out";

			this._drawMonth(this._activeMonth);

			return

		}

		if (q != null && a == null) {

			this.setSensitiveRange(null, q, true);

			return

		}

		if (q == null && a != null) {

			this.setSensitiveRange(a, null, true);

			return

		}

	};

	this.disableDays = function(w, v) {

		if (w == "week") {

			if (typeof (v) != "object" && typeof (v.length) == "undefined") {

				v = [ v ]

			}

			if (!this._rangeWeekData) {

				this._rangeWeekData = {}

			}

			for ( var r in this._rangeWeekData) {

				this._rangeWeekData[r] = false;

				delete this._rangeWeekData[r]

			}

			for (var u = 0; u < v.length; u++) {

				this._rangeWeekData[v[u]] = true;

				if (v[u] == 7) {

					this._rangeWeekData[0] = true

				}

			}

			this._rangeWeek = true

		}

		if (w == "month") {

			if (typeof (v) != "object" && typeof (v.length) == "undefined") {

				v = [ v ]

			}

			if (!this._rangeMonthData) {

				this._rangeMonthData = {}

			}

			for ( var r in this._rangeMonthData) {

				this._rangeMonthData[r] = false;

				delete this._rangeMonthData[r]

			}

			for (var u = 0; u < v.length; u++) {

				this._rangeMonthData[v[u]] = true

			}

			this._rangeMonth = true

		}

		if (w == "year") {

			var s = this._extractDates(v);

			if (!this._rangeYearData) {

				this._rangeYearData = {}

			}

			for ( var r in this._rangeYearData) {

				this._rangeYearData[r] = false;

				delete this._rangeYearData[r]

			}

			for (var u = 0; u < s.length; u++) {

				this._rangeYearData[s[u].getMonth() + "_" + s[u].getDate()] = true

			}

			this._rangeYear = true

		}

		this._drawMonth(this._activeMonth)

	};

	this.enableDays = function(a) {

		if (a == "week") {

			this._rangeWeek = false

		}

		if (a == "month") {

			this._rangeMonth = false

		}

		if (a == "year") {

			this._rangeYear = false

		}

		this._drawMonth(this._activeMonth)

	};

	this._tipData = {};

	this._tipTM = null;

	this._tipTMTime = 400;

	this._tipEvs = false;

	this._tipPopup = null;

	this._tipCellDate = null;

	this._tipCellDim = null;

	this.setTooltip = function(s, w, x, a) {

		var u = this._extractDates(s);

		for (var v = 0; v < u.length; v++) {

			var r = new Date(u[v].getFullYear(), u[v].getMonth(), u[v]

					.getDate(), 0, 0, 0, 0).getTime();

			this._tipData[r] = {

				text : w,

				showIcon : x,

				usePopup : a

			}

		}

		this._drawMonth(this._activeMonth)

	};

	this.clearTooltip = function(r) {

		var s = this._extractDates(r);

		for (var u = 0; u < s.length; u++) {

			var a = new Date(s[u].getFullYear(), s[u].getMonth(), s[u]

					.getDate(), 0, 0, 0, 0).getTime();

			this._tipData[a] = null;

			delete this._tipData[a]

		}

		this._drawMonth(this._activeMonth)

	};

	this._initTooltipPopup = function() {

		if (this._tipEvs) {

			return

		}

		this.attachEvent("onMouseOver", function(q) {

			var a = new Date(q.getFullYear(), q.getMonth(), q.getDate(), 0, 0,

					0, 0).getTime();

			if (this._tipData[a] != null) {

				if (this._tipTM) {

					window.clearTimeout(this._tipTM)

				}

				this._tipCellDate = q;

				this._tipCellDim = this.getCellDimension(q);

				this._tipText = this._tipData[a].text;

				this._tipTM = window.setTimeout(this._showTooltipPopup,

						this._tipTMTime)

			}

		});

		this.attachEvent("onMouseOut", this._hideTooltipPopup);

		this._tipEvs = true

	};

	this._showTooltipPopup = function(s, a, t, q, r) {

		if (!g._tipPopup) {

			g._tipPopup = new dhtmlXPopup({

				mode : "top"

			})

		}

		g._tipPopup.attachHTML(g._tipText);

		g._tipPopup.show(g._tipCellDim.x, g._tipCellDim.y, g._tipCellDim.w,

				g._tipCellDim.h);

		g.callEvent("onPopupShow", [ g._tipCellDate ])

	};

	this._hideTooltipPopup = function() {

		if (this._tipTM) {

			window.clearTimeout(this._tipTM)

		}

		if (this._tipPopup != null && this._tipPopup.isVisible()) {

			this._tipPopup.hide();

			this.callEvent("onPopupHide", [ this._tipCellDate ])

		}

	};

	this.getPopup = function() {

		return this._tipPopup

	};

	this.getCellDimension = function(s) {

		if (typeof (s) == "string") {

			s = this._strToDate(s)

		}

		if (!(s instanceof Date)) {

			return null

		}

		var u = new Date(s.getFullYear(), s.getMonth(), s.getDate(), 0, 0, 0, 0)

				.getTime();

		var r = null;

		for (var v = 0; v < this.contDates.childNodes.length; v++) {

			for (var a = 0; a < this.contDates.childNodes[v].childNodes.length; a++) {

				var x = this.contDates.childNodes[v].childNodes[a];

				if (x._date != null && x._date.getTime() == u) {

					r = {

						x : window.dhx4.absLeft(x),

						y : window.dhx4.absTop(x),

						w : x.offsetWidth,

						h : x.offsetHeight

					}

				}

				x = null

			}

		}

		return r

	};

	this._updateFromInput = function(a) {

		if (this._nullInInput && ((a.value).replace(/\s/g, "")).length == 0) {

			if (this.checkEvent("onBeforeChange")) {

				if (!this.callEvent("onBeforeChange", [ null ])) {

					this._updateInp();

					return

				}

			}

			this.setDate(null)

		} else {

			this._updateDateStr(a.value)

		}

		a = null

	};

	this._doOnClick = function(q) {

		q = q || event;

		var a = (q.target || q.srcElement);

		if (a._dhtmlxcalendar_uid && a._dhtmlxcalendar_uid != g._activeInp

				&& g._isVisible() && g._activeInp) {

			g._hide();

			return

		}

		if (!a._dhtmlxcalendar_uid || !g.i[a._dhtmlxcalendar_uid]) {

			if (g._isSelectorVisible()) {

				g._hideSelector()

			} else {

				if (!g._hasParent && g._isVisible()) {

					g._hide()

				}

			}

		}

	};

	this._doOnKeyDown = function(a) {

		a = a || event;

		if (a.keyCode == 27 || a.keyCode == 13) {

			if (g._isSelectorVisible()) {

				g._hideSelector()

			} else {

				if (g._isVisible() && !g._hasParent) {

					g._hide()

				}

			}

		}

	};

	this._doOnInpClick = function(q) {

		q = q || event;

		if (q.type == "touchstart" && q.preventDefault != null) {

			q.preventDefault()

		}

		var a = (q.target || q.srcElement);

		if (!a._dhtmlxcalendar_uid) {

			return

		}

		if (!g._listenerEnabled) {

			g._updateFromInput(a)

		}

		g._show(a._dhtmlxcalendar_uid, true)

	};

	this._doOnInpKeyUp = function(q) {

		q = q || event;

		var a = (q.target || q.srcElement);

		if (q.keyCode == 13 || !a._dhtmlxcalendar_uid) {

			return

		}

		if (!g._listenerEnabled) {

			g._updateFromInput(a)

		}

	};

	this._doOnBtnClick = function(q) {

		q = q || event;

		if (q.type == "touchstart" && q.preventDefault != null) {

			q.preventDefault()

		}

		var a = (q.target || q.srcElement);

		if (!a._dhtmlxcalendar_uid) {

			return

		}

		if (g.i[a._dhtmlxcalendar_uid].input != null) {

			g._updateFromInput(g.i[a._dhtmlxcalendar_uid].input)

		}

		g._show(a._dhtmlxcalendar_uid, true)

	};

	this._doOnUnload = function() {

		if (g && g.unload) {

			g.unload()

		}

	};

	if (typeof (window.addEventListener) == "function") {

		document.body.addEventListener("click", g._doOnClick, false);

		window.addEventListener("keydown", g._doOnKeyDown, false);

		window.addEventListener("unload", g._doOnUnload, false);

		if (this.conf.touch == true) {

			document.body.addEventListener("touchstart", g._doOnClick, false)

		}

	} else {

		document.body.attachEvent("onclick", g._doOnClick);

		document.body.attachEvent("onkeydown", g._doOnKeyDown);

		window.attachEvent("onunload", g._doOnUnload)

	}

	this.attachObj = function(r) {

		var q = window.dhx4.newId();

		if (typeof (r) == "string") {

			this.i[q] = {

				input : document.getElementById(r)

			}

		} else {

			if (typeof (r.tagName) != "undefined") {

				this.i[q] = {

					input : r

				}

			} else {

				if (typeof (r) == "object"

						&& (r.input != null || r.button != null)) {

					this.i[q] = {};

					if (r.input != null) {

						this.i[q].input = (typeof (r.input) == "string" ? document

								.getElementById(r.input)

								: r.input)

					}

					if (r.button != null) {

						this.i[q].button = (typeof (r.button) == "string" ? document

								.getElementById(r.button)

								: r.button)

					}

				}

			}

		}

		this._attachEventsToObject(q);

		return q

	};

	this.detachObj = function(s) {

		var r = null;

		if (this.i[s] != null) {

			r = s

		} else {

			if (typeof (s) == "string") {

				s = document.getElementById(s);

				r = s._dhtmlxcalendar_uid

			} else {

				if (typeof (s.tagName) != "undefined") {

					r = s._dhtmlxcalendar_uid

				} else {

					if (typeof (s) == "object"

							&& (s.input != null || s.button != null)) {

						if (r == null && s.input != null) {

							r = (typeof (s.input) == "string" ? document

									.getElementById(s.input) : s.input)._dhtmlxcalendar_uid

						}

						if (r == null && s.button != null) {

							r = (typeof (s.button) == "string" ? document

									.getElementById(s.button) : s.button)._dhtmlxcalendar_uid

						}

					}

				}

			}

		}

		if (r != null && this.i[r] != null) {

			this._detachEventsFromObject(r);

			for ( var q in this.i[q]) {

				this.i[r][q]._dhtmlxcalendar_uid = null;

				this.i[r][q] = null;

				delete this.i[r][q]

			}

			this.i[r] = null;

			delete this.i[r];

			return true

		}

		return false

	};

	this._attachEventsToObject = function(q) {

		if (this.i[q].button != null) {

			this.i[q].button._dhtmlxcalendar_uid = q;

			if (typeof (window.addEventListener) == "function") {

				this.i[q].button.addEventListener("click", g._doOnBtnClick,

						false);

				if (this.conf.touch == true) {

					this.i[q].button.addEventListener("touchstart",

							g._doOnBtnClick, false)

				}

			} else {

				this.i[q].button.attachEvent("onclick", g._doOnBtnClick)

			}

		} else {

			if (this.i[q].input != null) {

				this.i[q].input._dhtmlxcalendar_uid = q;

				if (typeof (window.addEventListener) == "function") {

					this.i[q].input.addEventListener("click", g._doOnInpClick,

							false);

					this.i[q].input.addEventListener("keyup", g._doOnInpKeyUp,

							false);

					if (this.conf.touch == true) {

						this.i[q].input.addEventListener("touchstart",

								g._doOnInpClick, false)

					}

				} else {

					this.i[q].input.attachEvent("onclick", g._doOnInpClick);

					this.i[q].input.attachEvent("onkeyup", g._doOnInpKeyUp)

				}

			}

		}

	};

	this._detachEventsFromObject = function(q) {

		if (this.i[q].button != null) {

			if (typeof (window.addEventListener) == "function") {

				this.i[q].button.removeEventListener("click", g._doOnBtnClick,

						false);

				if (this.conf.touch == true) {

					this.i[q].button.removeEventListener("touchstart",

							g._doOnBtnClick, false)

				}

			} else {

				this.i[q].button.detachEvent("onclick", g._doOnBtnClick)

			}

		} else {

			if (this.i[q].input != null) {

				if (typeof (window.addEventListener) == "function") {

					this.i[q].input.removeEventListener("click",

							g._doOnInpClick, false);

					this.i[q].input.removeEventListener("keyup",

							g._doOnInpKeyUp, false);

					if (this.conf.touch == true) {

						this.i[q].input.removeEventListener("touchstart",

								g._doOnInpClick, false)

					}

				} else {

					this.i[q].input.detachEvent("onclick", g._doOnInpClick);

					this.i[q].input.detachEvent("onkeyup", g._doOnInpKeyUp)

				}

			}

		}

	};

	this._updateInp = function() {

		if (this.i != null && this._activeInp != null

				&& this.i[this._activeInp] != null

				&& this.i[this._activeInp].input != null) {

			this.i[this._activeInp].input.value = this.getFormatedDate()

		}

	};

	this.enableListener = function(a) {

		if (!a) {

			return

		}

		if (typeof (window.addEventListener) == "function") {

			a.addEventListener("focus", g._listenerEvFocus, false);

			a.addEventListener("blur", g._listenerEvBlur, false)

		} else {

			a.attachEvent("onfocus", g._listenerEvFocus);

			a.attachEvent("onblur", g._listenerEvBlur)

		}

		a = null

	};

	this.disableListener = function(a) {

		if (!a) {

			return

		}

		a._f0 = false;

		if (this._tmListener) {

			window.clearTimeout(this._tmListener)

		}

		if (typeof (window.addEventListener) == "function") {

			a.removeEventListener("focus", g._listenerEvFocus, false);

			a.removeEventListener("blur", g._listenerEvBlur, false)

		} else {

			a.detachEvent("onfocus", g._listenerEvFocus);

			a.detachEvent("onblur", g._listenerEvBlur)

		}

		a = null

	};

	this._startListener = function(a) {

		if (this._tmListener) {

			window.clearTimeout(this._tmListener)

		}

		if (typeof (a._v1) == "undefined") {

			a._v1 = a.value

		}

		if (a._v1 != a.value) {

			this._updateFromInput(a);

			a._v1 = a.value

		}

		if (a._f0) {

			this._tmListener = window.setTimeout(function() {

				g._startListener(a)

			}, 100)

		}

	};

	this._listenerEvFocus = function(q) {

		q = q || event;

		var a = q.target || q.srcElement;

		a._f0 = true;

		g._startListener(a);

		a = null

	};

	this._listenerEvBlur = function(q) {

		q = q || event;

		var a = q.target || q.srcElement;

		a._f0 = false;

		a = null

	};

	for ( var l in this.i) {

		this._attachEventsToObject(l)

	}

	window.dhx4._eventable(this);

	this._evOnArrowClick = function(a) {

		return this.callEvent("onArrowClick", a)

	};

	this._evOnClick = function(a) {

		return this.callEvent("onClick", a)

	};

	this._evOnMouseOut = function(a) {

		return this.callEvent("onMouseOut", a)

	};

	this._evOnMouseOver = function(a) {

		return this.callEvent("onMouseOver", a)

	};

	this.unload = function() {

		this._activeDate = null;

		this._activeDateCell = null;

		this._activeInp = null;

		this._activeMonth = null;

		this._dateFormat = null;

		this._dateFormatRE = null;

		this._lastHover = null;

		if (this._tmListener) {

			window.clearTimeout(this._tmListener)

		}

		this._tmListener = null;

		if (typeof (window.addEventListener) == "function") {

			document.body.removeEventListener("click", g._doOnClick, false);

			window.removeEventListener("keydown", g._doOnKeyDown, false);

			window.removeEventListener("unload", g._doOnUnload, false);

			if (this.conf.touch == true) {

				document.body.removeEventListener("touchstart", g._doOnClick,

						false)

			}

		} else {

			document.body.detachEvent("onclick", g._doOnClick);

			document.body.detachEvent("onkeydown", g._doOnKeyDown);

			window.detachEvent("onunload", g._doOnKeyDown)

		}

		this._doOnClick = null;

		this._doOnKeyDown = null;

		this._doOnUnload = null;

		for ( var q in this.i) {

			this.i[q]._dhtmlxcalendar_uid = null;

			this._detachEventsFromObject(q);

			this.disableListener(this.i[q].input);

			this.i[q] = null;

			delete this.i[q]

		}

		this.i = null;

		this._doOnInpClick = null;

		this._doOnInpKeyUp = null;

		window.dhx4._eventable(this, "clear");

		this.contMonth.onselectstart = null;

		this.contMonth.firstChild.firstChild.onclick = null;

		this.contMonth.firstChild.firstChild.ontouchstart = null;

		this.contMonth.firstChild.firstChild.firstChild.onmouseover = null;

		this.contMonth.firstChild.firstChild.firstChild.onmouseout = null;

		this.contMonth.firstChild.firstChild.lastChild.onmouseover = null;

		this.contMonth.firstChild.firstChild.lastChild.onmouseout = null;

		while (this.contMonth.firstChild.firstChild.childNodes.length > 0) {

			this.contMonth.firstChild.firstChild

					.removeChild(this.contMonth.firstChild.firstChild.lastChild)

		}

		this.contMonth.firstChild

				.removeChild(this.contMonth.firstChild.firstChild);

		this.contMonth.removeChild(this.contMonth.firstChild);

		this.contMonth.parentNode.removeChild(this.contMonth);

		this.contMonth = null;

		while (this.contDays.firstChild.childNodes.length > 0) {

			this.contDays.firstChild

					.removeChild(this.contDays.firstChild.lastChild)

		}

		this.contDays.removeChild(this.contDays.firstChild);

		this.contDays.parentNode.removeChild(this.contDays);

		this.contDays = null;

		this.contDates.onclick = null;

		this.contDates.ontouchstart = null;

		this.contDates.onmouseover = null;

		this.contDates.onmouseout = null;

		while (this.contDates.childNodes.length > 0) {

			while (this.contDates.lastChild.childNodes.length > 0) {

				this.contDates.lastChild.lastChild._css_date = null;

				this.contDates.lastChild.lastChild._css_month = null;

				this.contDates.lastChild.lastChild._css_weekend = null;

				this.contDates.lastChild.lastChild._css_hover = null;

				this.contDates.lastChild.lastChild._date = null;

				this.contDates.lastChild.lastChild._q = null;

				this.contDates.lastChild.lastChild._w = null;

				this.contDates.lastChild

						.removeChild(this.contDates.lastChild.lastChild)

			}

			this.contDates.removeChild(this.contDates.lastChild)

		}

		this.contDates.parentNode.removeChild(this.contDates);

		this.contDates = null;

		this.contTime.firstChild.firstChild.onclick = null;

		this.contTime.firstChild.firstChild.ontouchstart = null;

		while (this.contTime.firstChild.firstChild.childNodes.length > 0) {

			this.contTime.firstChild.firstChild

					.removeChild(this.contTime.firstChild.firstChild.lastChild)

		}

		this.contTime.firstChild

				.removeChild(this.contTime.firstChild.firstChild);

		this.contTime.removeChild(this.contTime.firstChild);

		this.contTime.parentNode.removeChild(this.contTime);

		this.contTime = null;

		this._lastHover = null;

		this._unloadSelector("month");

		this._unloadSelector("year");

		this._unloadSelector("hours");

		this._unloadSelector("minutes");

		if (this._selCover) {

			this._selCover.parentNode.removeChild(this._selCover);

			this._selCover = null

		}

		if (this._sel) {

			for ( var q in this._sel._ta) {

				this._sel._ta[q] = null

			}

			this._sel._ta = null;

			this._sel._t = null;

			this._sel.onmouseover = null;

			this._sel.onmouseout = null;

			while (this._sel.firstChild.firstChild.firstChild.childNodes.length > 0) {

				this._sel.firstChild.firstChild.firstChild.lastChild.onclick = null;

				this._sel.firstChild.firstChild.firstChild.lastChild.onmouseover = null;

				this._sel.firstChild.firstChild.firstChild.lastChild.onmouseout = null;

				this._sel.firstChild.firstChild.firstChild

						.removeChild(this._sel.firstChild.firstChild.firstChild.lastChild)

			}

			this._sel.firstChild.firstChild

					.removeChild(this._sel.firstChild.firstChild.firstChild);

			this._sel.firstChild.removeChild(this._sel.firstChild.firstChild);

			while (this._sel.childNodes.length > 0) {

				this._sel.removeChild(this._sel.lastChild)

			}

			this._sel.parentNode.removeChild(this._sel);

			this._sel = null

		}

		this.base.onclick = null;

		this.base.onmousedown = null;

		this.base.ontouchstart = null;

		this.base.onmouseout = null;

		this.base.parentNode.removeChild(this.base);

		this.base = null;

		this._clearDayHover = null;

		this._clearSelHover = null;

		this._doOnSelectorChange = null;

		this._doOnSelectorShow = null;

		this._drawMonth = null;

		this._fixLength = null;

		this._ifrSize = null;

		this._hide = null;

		this._hideSelector = null;

		this._initSelector = null;

		this._isSelectorVisible = null;

		this._isVisible = null;

		this._scrollYears = null;

		this._show = null;

		this._showSelector = null;

		this._strToDate = null;

		this._updateActiveHours = null;

		this._updateActiveMinutes = null;

		this._updateActiveMonth = null;

		this._updateActiveYear = null;

		this._updateCellStyle = null;

		this._updateDateStr = null;

		this._updateVisibleHours = null;

		this._updateVisibleMinutes = null;

		this._updateYearsList = null;

		this.enableIframe = null;

		this.hide = null;

		this.hideTime = null;

		this.setDate = null;

		this.setDateFormat = null;

		this.setYearsRange = null;

		this.show = null;

		this.showTime = null;

		this.unload = null;

		if (this._tipPopup != null) {

			this._tipPopup.unload();

			this._tipPopup = null

		}

		for ( var q in this) {

			delete this[q]

		}

		q = g = null

	};

	this.setDate(this._activeDate);

	return this

}

dhtmlXCalendarObject.prototype.lang = "en";

dhtmlXCalendarObject.prototype.langData = {

	en : {

		dateformat : "%Y-%m-%d",

		hdrformat : "%F %Y",

		monthesFNames : [ "January", "February", "March", "April", "May",

				"June", "July", "August", "September", "October", "November",

				"December" ],

		monthesSNames : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",

				"Aug", "Sep", "Oct", "Nov", "Dec" ],

		daysFNames : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",

				"Friday", "Saturday" ],

		daysSNames : [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ],

		weekstart : 1,

		weekname : "w",

		today : "Today",

		clear : "Clear"

	}

};

dhtmlXCalendarObject.prototype._buildMonthHdr = function(g) {

	var b = this;

	var e = function(h) {

		return (String(h).length == 1 ? "0" + String(h) : h)

	};

	var a = function(h, j) {

		return "<span class='dhtmlxcalendar_month_label_" + h + "'>" + j

				+ "</span>"

	};

	var c = String(this.langData[this.lang].hdrformat || ("%F %Y")).replace(

			/%[a-z]/gi,

			function(h) {

				switch (h) {

				case "%m":

					return a("month", e(g.getMonth() + 1));

				case "%n":

					return a("month", g.getMonth() + 1);

				case "%M":

					return a("month", b.langData[b.lang].monthesSNames[g

							.getMonth()]);

				case "%F":

					return a("month", b.langData[b.lang].monthesFNames[g

							.getMonth()]);

				case "%y":

					return a("year", e(g.getYear() % 100));

				case "%Y":

					return a("year", g.getFullYear());

				case "%%":

					return "%";

				default:

					return h

				}

			});

	b = e = a = null;

	return c

};

dhtmlXCalendarObject.prototype.enableIframe = function(a) {

	if (a == true) {

		if (!this._ifr) {

			this._ifr = document.createElement("IFRAME");

			this._ifr.frameBorder = 0;

			this._ifr.border = 0;

			this._ifr.setAttribute("src", "javascript:false;");

			this._ifr.className = "dhtmlxcalendar_ifr";

			this._ifr.onload = function() {

				this.onload = null;

				this.contentWindow.document.open("text/html", "replace");

				this.contentWindow.document

						.write("<html><head><style>html,body{width:100%;height:100%;overflow:hidden;margin:0px;}</style></head><body</body></html>")

			};

			this.base.parentNode.insertBefore(this._ifr, this.base);

			this._ifrSize()

		}

	} else {

		if (this._ifr) {

			this._ifr.parentNode.removeChild(this._ifr);

			this._ifr = null

		}

	}

};

dhtmlXCalendarObject.prototype._ifrSize = function() {

	if (this._ifr) {

		this._ifr.style.left = this.base.style.left;

		this._ifr.style.top = this.base.style.top;

		this._ifr.style.width = this.base.offsetWidth + "px";

		this._ifr.style.height = this.base.offsetHeight + "px"

	}

};



dhtmlxCalendarObject = dhtmlXCalendarObject;



dhtmlXCalendarObject.prototype._dateStrings = function() {

	var a = this.langData[this.lang];

	return {

		monthFullName : a.monthesFNames,

		monthShortName : a.monthesSNames,

		dayFullName : a.daysFNames,

		dayShortName : a.daysSNames

	}

};

dhtmlXCalendarObject.prototype._strToDate = function(b, a) {

	return window.dhx4.str2date(b, a || this._dateFormat, this._dateStrings())

};

dhtmlXCalendarObject.prototype._dateToStr = function(b, a) {

	return window.dhx4.date2str(b, a || this._dateFormat, this._dateStrings())

};

window.dhtmlxDblCalendarObject = window.dhtmlXDoubleCalendarObject = window.dhtmlXDoubleCalendar = function(

		b) {

	var a = this;

	this.leftCalendar = new dhtmlXCalendarObject(b);

	this.leftCalendar.hideTime();

	this.rightCalendar = new dhtmlXCalendarObject(b);

	this.rightCalendar.hideTime();

	this.leftCalendar.attachEvent("onClick", function(c) {

		a._updateRange("rightCalendar", c, null);

		a._evOnClick([ "left", c ])

	});

	this.rightCalendar.attachEvent("onClick", function(c) {

		a._updateRange("leftCalendar", null, c);

		a._evOnClick([ "right", c ])

	});

	this.leftCalendar.attachEvent("onBeforeChange", function(c) {

		return a._evOnBeforeChange([ "left", c ])

	});

	this.rightCalendar.attachEvent("onBeforeChange", function(c) {

		return a._evOnBeforeChange([ "right", c ])

	});

	this.show = function() {

		this.leftCalendar.show();

		this.rightCalendar.base.style.marginLeft = this.leftCalendar.base.offsetWidth

				- 1 + "px";

		this.rightCalendar.show()

	};

	this.hide = function() {

		this.leftCalendar.hide();

		this.rightCalendar.hide()

	};

	this.setDateFormat = function(c) {

		this.leftCalendar.setDateFormat(c);

		this.rightCalendar.setDateFormat(c)

	};

	this.setDates = function(e, c) {

		if (e != null) {

			this.leftCalendar.setDate(e)

		}

		if (c != null) {

			this.rightCalendar.setDate(c)

		}

		this._updateRange()

	};

	this._updateRange = function(c, g, e) {

		if (arguments.length == 3) {

			(c == "leftCalendar" ? this.leftCalendar : this.rightCalendar)

					.setSensitiveRange(g, e)

		} else {

			this.leftCalendar.setSensitiveRange(null, this.rightCalendar

					.getDate());

			this.rightCalendar.setSensitiveRange(this.leftCalendar.getDate(),

					null)

		}

	};

	this.getFormatedDate = function() {

		return this.leftCalendar.getFormatedDate.apply(this.leftCalendar,

				arguments)

	};

	this.unload = function() {

		window.dhx4._eventable(this, "clear");

		this.leftCalendar.unload();

		this.rightCalendar.unload();

		this.leftCalendar = this.rightCalendar = null;

		this._updateRange = null;

		this._evOnClick = null;

		this._evOnBeforeChange = null;

		this.show = null;

		this.hide = null;

		this.setDateFormat = null;

		this.setDates = null;

		this.getFormatedDate = null;

		this.unload = null;

		a = null

	};

	this._evOnClick = function(c) {

		return this.callEvent("onClick", c)

	};

	this._evOnBeforeChange = function(c) {

		return this.callEvent("onBeforeChange", c)

	};

	window.dhx4._eventable(this);

	return this

};

function dhtmlXCombo(h, n, c, l, g) {

	var j = this;

	var e = null;

	var o = null;

	if (typeof (h) == "object" && !h.tagName) {

		e = h;

		h = e.parent;

		c = e.width;

		n = e.name;

		l = e.mode;

		o = e.skin

	}

	this.cont = (typeof (h) == "string" ? document.getElementById(h) : h);

	this.conf = {

		skin : null,

		form_name : n || "dhxcombo",

		combo_width : (parseInt(c) || this.cont.offsetWidth || 120)

				- (dhx4.isFF || dhx4.isIE || dhx4.isChrome || dhx4.isOpera ? 2

						: 0),

		combo_image : false,

		combo_focus : false,

		opts_type : (typeof (l) == "string"

				&& typeof (this.modes[l]) != "undefined" ? l : "option"),

		opts_count : 8,

		opts_count_min : 3,

		opts_width : null,

		item_h : null,

		list_zi_id : window.dhx4.newId(),

		allow_free_text : true,

		allow_empty_value : true,

		free_text_empty : false,

		enabled : true,

		btn_left : ((window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8)

				&& typeof (window.addEventListener) == "undefined" ? 1 : 0),

		ro_mode : false,

		ro_text : "",

		ro_tm : null,

		ro_tm_time : 750,

		img_path : "",

		img_def : "",

		img_def_dis : true,

		template : {

			header : true,

			input : "#text#",

			option : "#text#"

		},

		f_func : null,

		f_mode : false,

		f_url : false,

		f_cache : false,

		f_cache_data : {},

		f_dyn : false,

		f_dyn_end : false,

		f_mask : "",

		f_ac : true,

		f_ac_text : "",

		f_server_tm : null,

		f_server_last : "",

		f_loading : false,

		s_tm : null,

		s_time : 200,

		s_mode : "select",

		last_hover : null,

		last_selected : null,

		last_match : null,

		last_text : "",

		last_value : "",

		tm_hover : null,

		tm_confirm_blur : null,

		clear_click : false,

		clear_blur : false,

		clear_bsp : false,

		clear_key : false,

		i_ofs : 23,

		sp : {

			dhx_skyblue : {

				list_ofs : 1,

				hdr_ofs : 1,

				scr_ofs : 1

			},

			dhx_web : {

				list_ofs : 0,

				hdr_ofs : 1,

				scr_ofs : 0

			},

			dhx_terrace : {

				list_ofs : 1,

				hdr_ofs : 1,

				scr_ofs : 1

			},

			material : {

				list_ofs : 0,

				hdr_ofs : 1,

				scr_ofs : 1

			}

		},

		col_w : null

	};

	this.conf.combo_image = (this.modes[this.conf.opts_type].image == true);

	this.t = {};

	this.base = document.createElement("DIV");

	this.base.style.width = this.conf.combo_width + "px";

	this.base.innerHTML = "<input type='text' class='dhxcombo_input' style='width:"

			+ (this.conf.combo_width - (this.conf.i_ofs + 1) - (this.conf.combo_image ? this.conf.i_ofs

					: 0))

			+ "px;"

			+ (this.conf.combo_image ? "margin-left:" + this.conf.i_ofs + "px;"

					: "")

			+ "' autocomplete='off'><input type='hidden' value=''><input type='hidden' value='false'><div class='dhxcombo_select_button'><div class='dhxcombo_select_img'></div></div>"

			+ (this.conf.combo_image ? "<div class='dhxcombo_top_image'>"

					+ this.modes[this.conf.opts_type].getTopImage(null,

							this.conf.enabled) + "</div>" : "");

	this.cont.appendChild(this.base);

	this.list = document.createElement("DIV");

	this.list._listId = window.dhx4.newId();

	this.list.style.display = "none";

	document.body.insertBefore(this.list, document.body.firstChild);

	this._doOnListScroll = function() {

		if (j.conf.s_tm != null) {

			window.clearTimeout(j.conf.s_tm)

		}

		j.conf.s_tm = window.setTimeout(j._doOnListScrollAction, j.conf.s_time)

	};

	this._doOnListScrollAction = function() {

		j.conf.s_tm = null;

		if (j.conf.s_mode == "scroll"

				&& j.list.scrollHeight - j.list.scrollTop - 10 < j.list.clientHeight) {

			j._subloadRequest()

		}

	};

	if (typeof (window.addEventListener) == "function") {

		this.list.addEventListener("scroll", this._doOnListScroll, false)

	} else {

		this.list.attachEvent("onscroll", this._doOnListScroll)

	}

	this.setSkin(o || window.dhx4.skin

			|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

			|| window.dhx4.skinDetect("dhxcombo") || "material");

	this._updateTopImage = function(a) {

		if (!this.conf.combo_image) {

			return

		}

		if (a != null) {

			this.base.lastChild.innerHTML = this.t[a].obj.getTopImage(

					this.t[a].item, this.conf.enabled)

		} else {

			this.base.lastChild.innerHTML = this.modes[this.conf.opts_type]

					.getTopImage(null, this.conf.enabled)

		}

	};

	this._filterOpts = function(y) {

		if (this.conf.f_server_tm) {

			window.clearTimeout(this.conf.f_server_tm)

		}

		var v = String(this.base.firstChild.value).replace(

				new RegExp(this._fixRE(this.conf.f_ac_text) + "$", "i"), "");

		if (this.conf.f_server_last == v.toLowerCase()) {

			this._checkForMatch();

			return

		}

		if (this.conf.f_url != null && this.checkEvent("onDynXLS")) {

			this.conf.f_server_last = v.toLowerCase();

			this.callEvent("onDynXLS", [ v ]);

			return

		}

		if (this.conf.f_url != null) {

			if (v.length == 0) {

				this.conf.f_server_last = v.toLowerCase();

				this.clearAll();

				return

			}

			if (this.conf.f_cache == true && this.conf.f_cache_data[v] != null) {

				this.clearAll();

				this.conf.f_server_last = v.toLowerCase();

				for (var u = 0; u < this.conf.f_cache_data[v].data.length; u++) {

					this.load(this.conf.f_cache_data[v].data[u])

				}

				if (this.conf.f_dyn) {

					this.conf.f_dyn_end = this.conf.f_cache_data[v].dyn_end;

					this.conf.f_mask = this.conf.f_cache_data[v].mask

				}

				if (y !== true) {

					this._showList(true);

					this._checkForMatch()

				}

			} else {

				this.conf.f_server_tm = window

						.setTimeout(

								function() {

									j.conf.f_server_last = v.toLowerCase();

									j.conf.f_mask = v;

									var q = "mask=" + encodeURIComponent(v);

									if (j.conf.f_dyn) {

										q += "&pos=0";

										j.conf.f_dyn_end = false

									}

									var a = function(E) {

										if (j.conf.f_cache) {

											if (!j.conf.f_cache_data[v]) {

												j.conf.f_cache_data[v] = {

													data : [],

													dyn_end : false,

													mask : v

												}

											}

											j.conf.f_cache_data[v].data

													.push(E.xmlDoc.responseXML)

										}

										j.clearAll();

										j.load(E.xmlDoc.responseText);

										var D = (j.base.offsetWidth > 0 && j.base.offsetHeight > 0);

										if (D == true && j.conf.enabled == true

												&& j.conf.combo_focus == true

												&& y !== true) {

											if (j.conf.f_ac

													&& j.conf.f_mode == "start"

													&& j.conf.clear_bsp == false

													&& j.list.firstChild != null) {

												var t = j.list.firstChild._optId;

												var F = String(j.t[t].obj

														.getText(

																j.list.firstChild,

																true));

												if (v == j.base.firstChild.value

														&& String(F)

																.toLowerCase()

																.indexOf(

																		String(

																				v)

																				.toLowerCase()) === 0) {

													j.base.firstChild.value = F;

													j.conf.f_ac_text = F

															.substr(v.length);

													j._selectRange(v.length,

															F.length)

												}

											}

											j._showList(true);

											j._checkForMatch()

										}

										a = null

									};

									if (window.dhx4.ajax.method == "post") {

										window.dhx4.ajax.post(j.conf.f_url, q,

												a)

									} else {

										if (window.dhx4.ajax.method == "get") {

											window.dhx4.ajax

													.get(

															j.conf.f_url

																	+ (String(

																			j.conf.f_url)

																			.indexOf(

																					"?") >= 0 ? "&"

																			: "?")

																	+ q, a)

										}

									}

								}, 200)

			}

		} else {

			this.conf.f_server_last = v.toLowerCase();

			var s = (v.length == 0 ? true : new RegExp(

					(this.conf.f_mode == "start" ? "^" : "") + this._fixRE(v),

					"i"));

			var w = null;

			for ( var z in this.t) {

				var C = false;

				if (s !== true) {

					if (this.conf.f_func != null) {

						var x = this._getOption(this.t[z].item._optId, u);

						C = (this.conf.f_func.apply(window, [ v, x ]) == true)

					} else {

						var A = this.t[z].obj.getText(this.t[z].item, true);

						C = (s.test(A) == true)

					}

				}

				if (s === true || C == true) {

					this.t[z].item.style.display = "";

					if (w == null && v.length > 0) {

						w = String(this.t[z].obj.getText(this.t[z].item, true))

					}

				} else {

					this.t[z].item.style.display = "none"

				}

			}

			if (this.conf.f_ac && this.conf.f_mode == "start"

					&& this.conf.clear_bsp == false && w != null) {

				this.conf.f_ac_text = w.replace(new RegExp("^" + v, "i"), "");

				this.base.firstChild.value = w;

				this._selectRange(this.conf.f_server_last.length,

						this.base.firstChild.value.length)

			}

			if (this.conf.f_mode == "between" && this.conf.clear_bsp == true) {

				this._checkForMatch(true)

			}

			if (y !== true) {

				this._showList(true);

				this._checkForMatch()

			}

		}

	};

	this._searchRO = function(r) {

		if (this.conf.ro_tm) {

			window.clearTimeout(this.conf.ro_tm)

		}

		this.conf.ro_text += r;

		this._showList();

		for (var t = 0; t < this.list.childNodes.length; t++) {

			var a = this.list.childNodes[t]._optId;

			var u = String(this.t[a].obj.getText(this.list.childNodes[t], true))

					.toLowerCase();

			if (u.indexOf(this.conf.ro_text) === 0) {

				this._setSelected(a, true, true);

				this._confirmSelect("script", false);

				break

			}

		}

		this.conf.ro_tm = window.setTimeout(function() {

			j.conf.ro_text = ""

		}, this.conf.ro_tm_time)

	};

	this._fixRE = function(a) {

		return String(a).replace(/[\\\^\$\*\+\?\.\(\)\|\{\}\[\]]/gi, "\\$&")

	};

	this._initObj = function(a) {

		if (typeof (a.template) != "undefined") {

			this.setTemplate(a.template)

		}

		if (a.add != true && this.conf.f_loading != true) {

			this.clearAll(false)

		}

		this.addOption(a.options)

	};

	this._xmlToObj = function(M, u, s) {

		var y = {

			add : false,

			options : []

		};

		var F = (u == true ? M : M.getElementsByTagName("complete"));

		if (F.length > 0) {

			if (window.dhx4.s2b(F[0].getAttribute("add")) == true) {

				y.add = true

			}

			var E = F[0].childNodes;

			for (var C = 0; C < E.length; C++) {

				if (typeof (E[C].tagName) != "undefined") {

					if (String(E[C].tagName).toLowerCase() == "template") {

						var L = {};

						for (var x = 0; x < E[C].childNodes.length; x++) {

							var D = E[C].childNodes[x];

							if (D.tagName != null) {

								var H = D.tagName;

								if (typeof (this.conf.template[H]) != "undefined") {

									L[H] = window.dhx4._xmlNodeValue(D)

								}

								if (H == "columns") {

									for (var J = 0; J < D.childNodes.length; J++) {

										var v = D.childNodes[J];

										if (v.tagName != null

												&& v.tagName == "column") {

											var A = {};

											for ( var K in {

												width : 1,

												css : 1,

												header : 1,

												option : 1

											}) {

												if (v.getAttribute(K) != null) {

													A[K] = v.getAttribute(K)

												}

											}

											for ( var K in {

												header : 1,

												option : 1

											}) {

												var I = v

														.getElementsByTagName(K);

												if (I[0] != null

														&& I[0].firstChild != null) {

													A[K] = window.dhx4

															._xmlNodeValue(I[0])

												}

											}

											if (L.columns == null) {

												L.columns = []

											}

											L.columns.push(A)

										}

										v = null

									}

								}

							}

							D = null

						}

						this.setTemplate(L)

					}

					if (String(E[C].tagName).toLowerCase() == "option") {

						var z = false;

						if (u == true) {

							z = (y.options.length == s)

						} else {

							z = window.dhx4.s2b(E[C].getAttribute("selected"))

						}

						var r = {

							value : E[C].getAttribute("value"),

							text : window.dhx4._xmlNodeValue(E[C]),

							selected : z,

							checked : window.dhx4.s2b(E[C]

									.getAttribute("checked"))

						};

						for ( var K in {

							img : 1,

							img_dis : 1,

							img_src : 1,

							img_src_dis : 1,

							css : 1

						}) {

							if (E[C].getAttribute(K) != null) {

								r[K] = E[C].getAttribute(K)

							}

						}

						for (var x = 0; x < E[C].childNodes.length; x++) {

							if (E[C].childNodes[x].tagName != null

									&& String(E[C].childNodes[x].tagName)

											.toLowerCase() == "text") {

								r.text = {};

								var D = E[C].childNodes[x];

								for (var J = 0; J < D.childNodes.length; J++) {

									if (D.childNodes[J].tagName != null) {

										r.text[D.childNodes[J].tagName] = window.dhx4

												._xmlNodeValue(D.childNodes[J])

									}

								}

							}

						}

						y.options.push(r)

					}

				}

			}

			F = E = null

		}

		return y

	};

	window.dhx4._enableDataLoading(this, "_initObj", "_xmlToObj", "complete", {

		data : true

	});

	window.dhx4._eventable(this);

	this._getNearItem = function(r, q) {

		var a = null;

		while (r != null) {

			r = r[q < 0 ? "previousSibling" : "nextSibling"];

			if (a == null && r != null && r.style.display == ""

					&& r._optId != null) {

				a = r;

				r = null

			}

		}

		return a

	};

	this.setName(this.conf.form_name);

	this._doOnListMouseMove = function(q) {

		q = q || event;

		var a = q.target || q.srcElement;

		while (a != null && a != this) {

			if (typeof (a._optId) != "undefined") {

				if (j.conf.tm_hover) {

					window.clearTimeout(j.conf.tm_hover)

				}

				j._setSelected(a._optId, false, false, true)

			}

			a = a.parentNode

		}

		a = null

	};

	this._doOnListMouseDown = function(a) {

		a = a || event;

		a.cancelBubble = true;

		j.conf.clear_click = true;

		window.setTimeout(function() {

			j.base.firstChild.focus()

		}, 1)

	};

	this._doOnListMouseUp = function(s) {

		s = s || event;

		if (s.button != j.conf.btn_left) {

			return

		}

		var a = s.target || s.srcElement;

		while (a != null && a != this) {

			if (typeof (a._optId) != "undefined") {

				var q = true;

				if (typeof (j.t[a._optId].obj.optionClick) == "function"

						&& j.t[a._optId].obj.optionClick(a, s, j) !== true) {

					q = false

				}

				if (q) {

					j._setSelected(a._optId, null, true);

					j._confirmSelect("click")

				}

			}

			a = a.parentNode

		}

		a = null

	};

	this._doOnListMouseOut = function(a) {

		if (j.conf.tm_hover) {

			window.clearTimeout(j.conf.tm_hover)

		}

		j.conf.tm_hover = window.setTimeout(function() {

			var q = j.conf.last_match || j.conf.last_selected;

			if (j.conf.last_match == null && j.t[q] != null) {

				if (j.base.firstChild.value != j.t[q].obj.getText(j.t[q].item,

						true)) {

					q = null

				}

			}

			j._setSelected(q, null, true, true)

		}, 1)

	};

	this._doOnBaseMouseDown = function(u) {

		if (!j.conf.enabled) {

			return

		}

		j.conf.clear_click = true;

		u = u || event;

		if (u.button != j.conf.btn_left) {

			return

		}

		var q = u.target || u.srcElement;

		if (q != this.firstChild) {

			window.setTimeout(function() {

				j.base.firstChild.focus()

			}, 1);

			var s = q;

			while (s != this && s != null) {

				if (s == this.lastChild) {

					if (typeof (j.modes[j.conf.opts_type].topImageClick) == "function") {

						var r = (j.conf.last_hover || j.conf.last_selected);

						var a = (r != null ? j.t[r].item : null);

						if (j.modes[j.conf.opts_type].topImageClick(a, j) !== true) {

							r = a = null;

							return

						}

					}

					s = null

				} else {

					s = s.parentNode

				}

			}

		}

		if (j._isListVisible()) {

			j._hideList()

		} else {

			if (q != this.firstChild) {

				j.conf.clear_blur = true

			}

			j._showList();

			j._setSelected(j.conf.last_selected, true, true)

		}

		q = null

	};

	this._doOnBodyMouseDown = function() {

		if (j.conf.clear_click) {

			j.conf.clear_click = false;

			return

		}

		j._confirmSelect("blur")

	};

	this._doOnInputFocus = function() {

		j.conf.clear_blur = false;

		if (j.conf.tm_confirm_blur) {

			window.clearTimeout(j.conf.tm_confirm_blur)

		}

		if (j.conf.combo_focus == false) {

			j.conf.combo_focus = true;

			if (j.conf.skin == "material"

					&& j.base.className.match(/dhxcombo_actv/) == null) {

				j.base.className += " dhxcombo_actv"

			}

			j.callEvent("onFocus", [])

		}

	};

	this._doOnInputBlur = function() {

		if (j.conf.clear_blur == true) {

			j.conf.clear_blur = false;

			return

		}

		if (j.conf.tm_confirm_blur) {

			window.clearTimeout(j.conf.tm_confirm_blur)

		}

		j.conf.tm_confirm_blur = window.setTimeout(function() {

			if (j.conf.clear_click == false) {

				j._confirmSelect("blur");

				j.conf.combo_focus = false;

				if (j.conf.skin == "material"

						&& j.base.className.match(/dhxcombo_actv/) != null) {

					j.base.className = j.base.className.replace(

							/\s*dhxcombo_actv/gi, "")

				}

				j.callEvent("onBlur", [])

			}

		}, 20)

	};

	this._doOnInputKeyUp = function(a) {

		a = a || event;

		if (j.conf.f_mode != false) {

			j.conf.clear_bsp = (a.keyCode == 8 || a.keyCode == 46);

			j._filterOpts();

			return

		} else {

			j._checkForMatch()

		}

	};

	this._doOnInputKeyDown = function(a) {

		a = a || event;

		if ((a.keyCode == 38 || a.keyCode == 40) && !a.ctrlKey && !a.shiftKey

				&& !a.altKey) {

			if (a.preventDefault) {

				a.preventDefault()

			} else {

				a.returnValue = false

			}

			a.cancelBubble = true;

			j._keyOnUpDown(a.keyCode == 38 ? -1 : 1)

		}

		if (a.keyCode == 113) {

			if (!j._isListVisible()) {

				j._showList();

				if (j.base.firstChild.value == j.conf.last_text) {

					j._setSelected(j.conf.last_selected, true, true);

					j.base.firstChild.value = j.conf.last_text;

					j.conf.f_server_last = j.base.firstChild.value

							.toLowerCase()

				} else {

					j.conf.f_server_last = j.base.firstChild.value

							.toLowerCase();

					if (j.conf.f_mode == false) {

						j._checkForMatch()

					}

				}

			} else {

			}

		}

		if (a.keyCode == 27) {

			if (a.preventDefault) {

				a.preventDefault()

			} else {

				a.returnValue = false

			}

			a.cancelBubble = true;

			j._cancelSelect()

		}

		if (a.keyCode == 13) {

			if (a.preventDefault) {

				a.preventDefault()

			}

			j._confirmSelect("kbd")

		}

		if (j.conf.ro_mode == true

				&& ((a.keyCode >= 48 && a.keyCode <= 57) || (a.keyCode >= 65 && a.keyCode <= 90))) {

			j._searchRO(String.fromCharCode(a.keyCode).toLowerCase());

			a.cancelBubble = true

		}

		j.conf.clear_key = true;

		j.callEvent("onKeyPressed", [ a.keyCode || a.charCode ])

	};

	this._doOnInputKeyPress = function(a) {

		if (j.conf.clear_key) {

			j.conf.clear_key = false;

			return

		}

		a = a || event;

		j.callEvent("onKeyPressed", [ a.keyCode || a.charCode ])

	};

	this._keyOnUpDown = function(a) {

		var q = null;

		if (this.conf.last_hover) {

			q = this.t[this.conf.last_hover].item

		} else {

			if (this.conf.last_selected) {

				q = this.t[this.conf.last_selected].item

			}

		}

		if (!q && this._getListVisibleCount() == 0) {

			return

		}

		if (q != null && q.style.display != "") {

			q = null

		}

		this._showList();

		if (q != null) {

			if (this.t[q._optId].obj.isSelected(q)) {

				q = this._getNearItem(q, a)

			}

		} else {

			q = this.list.firstChild;

			if (q.style.display != "") {

				q = this._getNearItem(q, 1)

			}

		}

		if (q == null) {

			return

		}

		this._setSelected(q._optId, true, true);

		if (this.conf.f_mode == false) {

			this.base.firstChild.value = this.t[q._optId].obj.getText(q, true)

		} else {

			var r = String(this.t[q._optId].obj.getText(q, true));

			if (this.conf.f_mode == "start" && this.conf.f_ac == true) {

				if (r.toLowerCase().indexOf(this.conf.f_server_last) === 0) {

					this.conf.f_ac_text = r.substring(

							this.conf.f_server_last.length, r.length);

					this.base.firstChild.value = r;

					this._selectRange(this.conf.f_server_last.length,

							this.base.firstChild.value.length)

				} else {

					this.base.firstChild.value = r;

					this.conf.f_server_last = this.base.firstChild.value

							.toLowerCase();

					this._selectRange(0, this.base.firstChild.value.length)

				}

			} else {

				this.base.firstChild.value = r;

				this.conf.f_server_last = this.base.firstChild.value

						.toLowerCase()

			}

		}

		q = null

	};

	this.conf.evs_nodes = [ {

		node : document.body,

		evs : {

			mousedown : "_doOnBodyMouseDown"

		}

	}, {

		node : this.base,

		evs : {

			mousedown : "_doOnBaseMouseDown"

		}

	}, {

		node : this.base.firstChild,

		evs : {

			keyup : "_doOnInputKeyUp",

			keydown : "_doOnInputKeyDown",

			keypress : "_doOnInputKeyPress",

			focus : "_doOnInputFocus",

			blur : "_doOnInputBlur"

		}

	}, {

		node : this.list,

		evs : {

			mousemove : "_doOnListMouseMove",

			mousedown : "_doOnListMouseDown",

			mouseup : "_doOnListMouseUp",

			mouseout : "_doOnListMouseOut"

		}

	} ];

	for (var b = 0; b < this.conf.evs_nodes.length; b++) {

		for ( var m in this.conf.evs_nodes[b].evs) {

			if (typeof (window.addEventListener) == "function") {

				this.conf.evs_nodes[b].node.addEventListener(m,

						this[this.conf.evs_nodes[b].evs[m]], false)

			} else {

				this.conf.evs_nodes[b].node.attachEvent("on" + m,

						this[this.conf.evs_nodes[b].evs[m]])

			}

		}

	}

	this.unload = function() {

		this.clearAll();

		this.t = null;

		for (var s = 0; s < this.conf.evs_nodes.length; s++) {

			for ( var r in this.conf.evs_nodes[s].evs) {

				if (typeof (window.addEventListener) == "function") {

					this.conf.evs_nodes[s].node.removeEventListener(r,

							this[this.conf.evs_nodes[s].evs[r]], false)

				} else {

					this.conf.evs_nodes[s].node.detachEvent("on" + r,

							this[this.conf.evs_nodes[s].evs[r]])

				}

				this.conf.evs_nodes[s].evs[r] = null;

				delete this.conf.evs_nodes[s].evs[r]

			}

			this.conf.evs_nodes[s].node = null;

			this.conf.evs_nodes[s].evs = null;

			delete this.conf.evs_nodes[s].node;

			delete this.conf.evs_nodes[s].evs;

			this.conf.evs_nodes[s] = null

		}

		window.dhx4._eventable(this, "clear");

		window.dhx4._enableDataLoading(this, null, null, null, "clear");

		this._mcDetachHeader();

		this.DOMelem_input = this.DOMelem_button = this.DOMlist = this.DOMelem = this.DOMParent = null;

		for ( var r in this.conf) {

			this.conf[r] = null;

			delete this.conf[r]

		}

		this.conf = null;

		if (typeof (window.addEventListener) == "function") {

			this.list

					.removeEventListener("scroll", this._doOnListScroll, false)

		} else {

			this.list.detachEvent("onscroll", this._doOnListScroll)

		}

		this.base.parentNode.removeChild(this.base);

		this.list.parentNode.removeChild(this.list);

		this.base = this.list = this.cont = null;

		this.modes = null;

		for ( var r in this) {

			if (typeof (this[r]) == "function") {

				this[r] = null

			}

		}

		j = null

	};

	this.DOMelem_input = this.base.firstChild;

	this.DOMelem_button = this.base.childNodes[this.base.childNodes.length

			- (this.conf.combo_image ? 2 : 1)];

	this.DOMlist = this.list;

	this.DOMelem = this.base;

	this.DOMParent = h;

	h = null;

	if (e != null) {

		if (e.filter != null) {

			if (typeof (e.filter) == "string") {

				this.enableFilteringMode(true, e.filter, window.dhx4

						.s2b(e.filter_cache), window.dhx4

						.s2b(e.filter_sub_load))

			} else {

				this.enableFilteringMode(true)

			}

		}

		if (e.image_path != null) {

			this.setImagePath(e.image_path)

		}

		if (e.default_image != null || e.default_image_dis != null) {

			this.setDefaultImage(e.default_image, e.default_image_dis)

		}

		if (e.items || e.options) {

			this.addOption(e.items || e.options)

		}

		if (e.xml || e.json) {

			this.load(e.xml || e.json)

		}

		if (typeof (e.readonly) != "undefined") {

			this.readonly(e.readonly)

		}

		e = null

	}

	return this

}

function dhtmlXComboFromSelect(c) {

	if (typeof (c) == "string") {

		c = document.getElementById(c)

	}

	var b = c.offsetWidth;

	var n = c.getAttribute("name") || null;

	var e = document.createElement("SPAN");

	c.parentNode.insertBefore(e, c);

	var h = c.getAttribute("mode") || c.getAttribute("opt_type") || "option";

	var g = new dhtmlXCombo(e, n, b, h);

	e = null;

	var l = c.getAttribute("imagePath");

	if (l) {

		g.setImagePath(l)

	}

	var m = c.getAttribute("defaultImage");

	var j = c.getAttribute("defaultImageDis");

	if (window.dhx4.s2b(j) == true) {

		j = true

	}

	if (m != null || j != null) {

		g.setDefaultImage(m, j)

	}

	var a = g._xmlToObj([ c ], true, c.selectedIndex);

	if (a.options.length > 0) {

		g.addOption(a.options)

	}

	a = null;

	c.parentNode.removeChild(c);

	c = null;

	return g

}

dhtmlXCombo.prototype.setName = function(a) {

	this.conf.form_name = a;

	this.base.childNodes[1].name = a;

	this.base.childNodes[2].name = a.replace(/(\[.*)?$/, "_new_value$1")

};

dhtmlXCombo.prototype.readonly = function(a) {

	if (window.dhx4.s2b(a)) {

		this.base.firstChild.setAttribute("readOnly", "true");

		this.conf.ro_mode = true

	} else {

		this.base.firstChild.removeAttribute("readOnly");

		this.conf.ro_mode = false

	}

};

dhtmlXCombo.prototype.setPlaceholder = function(a) {

	if (typeof (a) == "undefined" || a == null) {

		a = ""

	}

	this.base.firstChild.setAttribute("placeholder", String(a))

};

dhtmlXCombo.prototype.setTemplate = function(c) {

	for ( var b in c) {

		if (typeof (this.conf.template[b]) != "undefined") {

			if (b == "header") {

				this.conf.template[b] = window.dhx4.s2b(c[b])

			} else {

				this.conf.template[b] = String(c[b])

			}

		}

	}

	if (c.columns != null) {

		this._mcMakeTemplate(c.columns)

	} else {

		this._mcDetachHeader()

	}

	for ( var b in this.t) {

		this.t[b].obj.setText(this.t[b].item, this.t[b].item._conf.text)

	}

	this._confirmSelect("template")

};

dhtmlXCombo.prototype.setSkin = function(a) {

	if (a == this.conf.skin) {

		return

	}

	this.conf.skin = a;

	this.base.className = "dhxcombo_" + this.conf.skin

			+ (this.conf.enabled ? "" : " dhxcombo_disabled");

	this.list.className = "dhxcombolist_" + this.conf.skin

			+ (this.hdr != null ? " dhxcombolist_multicolumn" : "");

	if (this.hdr != null) {

		this.hdr.className = "dhxcombolist_" + this.conf.skin

				+ " dhxcombolist_hdr"

	}

	this.conf.i_ofs = (a == "material" ? 26 : 23);

	this._adjustBase()

};

dhtmlXCombo.prototype.getInput = function() {

	return this.base.firstChild

};

dhtmlXCombo.prototype.getButton = function() {

	return this.base.childNodes[this.base.childNodes.length

			- (this.conf.combo_image ? 2 : 1)]

};

dhtmlXCombo.prototype.getList = function() {

	return this.list

};

dhtmlXCombo.prototype.getBase = function() {

	return this.base

};

dhtmlXCombo.prototype.getParent = function() {

	return this.DOMParent

};

dhtmlXCombo.prototype.forEachOption = function(a) {

	for (var b = 0; b < this.list.childNodes.length; b++) {

		a.apply(window, [ this._getOption(this.list.childNodes[b]._optId, b) ])

	}

};

dhtmlXCombo.prototype.setFocus = function() {

	if (this.conf.enabled) {

		this.base.firstChild.focus()

	}

};

dhtmlXCombo.prototype.setFontSize = function(a, b) {

	if (a != null) {

		this.base.firstChild.style.fontSize = a

	}

	if (b != null) {

		this.list.style.fontSize = b

	}

};

dhtmlXCombo.prototype.getOption = function(g) {

	var h = null;

	var c = null;

	for (var e = 0; e < this.list.childNodes.length; e++) {

		if (h == null) {

			var b = this.list.childNodes[e]._optId;

			if (this.t[b].obj.getValue(this.t[b].item) == g) {

				h = b;

				c = e

			}

		}

	}

	return (h == null ? null : this._getOption(h, c))

};

dhtmlXCombo.prototype.getOptionByIndex = function(a) {

	if (a < 0) {

		return null

	}

	if (this.list.childNodes[a] == null) {

		return null

	}

	return this._getOption(this.list.childNodes[a]._optId, a)

};

dhtmlXCombo.prototype.getOptionByLabel = function(g) {

	var h = null;

	var c = null;

	for (var e = 0; e < this.list.childNodes.length; e++) {

		if (h == null) {

			var b = this.list.childNodes[e]._optId;

			if (this.t[b].obj.getText(this.t[b].item, true) == g) {

				h = b;

				c = e

			}

		}

	}

	return (h == null ? null : this._getOption(h, c))

};

dhtmlXCombo.prototype.getSelectedIndex = function() {

	return this._getOptionProp(this.conf.last_selected, "index", -1)

};

dhtmlXCombo.prototype.getSelectedText = function() {

	return this._getOptionProp(this.conf.last_selected, "text", "")

};

dhtmlXCombo.prototype.getSelectedValue = function() {

	return this._getOptionProp(this.conf.temp_selected

			|| this.conf.last_selected, "value", null)

};

dhtmlXCombo.prototype.getActualValue = function() {

	return this.base.childNodes[1].value

};

dhtmlXCombo.prototype.getComboText = function() {

	return this.base.childNodes[0].value

};

dhtmlXCombo.prototype.getIndexByValue = function(b) {

	var a = this.getOption(b);

	return (a != null ? a.index : -1)

};

dhtmlXCombo.prototype.setComboText = function(a) {

	if (this.conf.allow_free_text != true) {

		return

	}

	this.unSelectOption();

	this.conf.last_text = this.base.firstChild.value = a;

	this.conf.f_server_last = this.base.firstChild.value.toLowerCase()

};

dhtmlXCombo.prototype.setComboValue = function(b) {

	var a = this.getOption(b);

	if (a != null) {

		this.selectOption(a.index)

	} else {

		this.conf.last_value = b;

		this.base.childNodes[1].value = this.conf.last_value;

		this.base.childNodes[2].value = "true"

	}

};

dhtmlXCombo.prototype.selectOption = function(b, c, a) {

	if (b < 0 || b >= this.list.childNodes.length) {

		return

	}

	var e = this.list.childNodes[b]._optId;

	this._setSelected(e, this._isListVisible(), true);

	this._confirmSelect("script")

};

dhtmlXCombo.prototype.unSelectOption = function() {

	if (this.conf.last_hover != null) {

		this.t[this.conf.last_hover].obj.setSelected(

				this.t[this.conf.last_hover].item, false);

		this.conf.last_hover = null

	}

	this.base.firstChild.value = "";

	if (this.conf.f_mode != false) {

		this._filterOpts(true)

	}

	this._hideList();

	this._updateTopImage(null);

	this._confirmSelect("script")

};

dhtmlXCombo.prototype.confirmValue = function() {

	this._confirmSelect("script")

};

dhtmlXCombo.prototype.enable = function(a) {

	a = (typeof (a) == "undefined" ? true : window.dhx4.s2b(a));

	if (this.conf.enabled == a) {

		return

	}

	this.conf.enabled = a;

	if (a) {

		this.base.className = "dhxcombo_" + this.conf.skin;

		this.base.firstChild.removeAttribute("disabled")

	} else {

		this._hideList();

		this.base.className = "dhxcombo_" + this.conf.skin

				+ " dhxcombo_disabled";

		this.base.firstChild.setAttribute("disabled", "true")

	}

	this._updateTopImage(this.conf.last_selected)

};

dhtmlXCombo.prototype.disable = function(a) {

	a = (typeof (a) == "undefined" ? true : window.dhx4.s2b(a));

	this.enable(!a)

};

dhtmlXCombo.prototype.isEnabled = function() {

	return (this.conf.enabled == true)

};

dhtmlXCombo.prototype.show = function(a) {

	if (typeof (a) == "undefined") {

		a = true

	} else {

		a = window.dhx4.s2b(a)

	}

	this.base.style.display = (a == true ? "" : "none")

};

dhtmlXCombo.prototype.hide = function(a) {

	if (typeof (a) == "undefined") {

		a = true

	}

	this.show(!a)

};

dhtmlXCombo.prototype.isVisible = function() {

	return (this.base.style.display == "")

};

dhtmlXCombo.prototype.setFilterHandler = function(a) {

	if (typeof (a) == "function") {

		this.conf.f_func = a;

		this.conf.f_mode = true;

		this.conf.f_dyn = this.conf.f_cache = this.conf.f_url = null

	} else {

		if (typeof (a) == "string" && typeof (window[a]) == "function") {

			this.conf.f_func = window[a];

			this.conf.f_mode = true;

			this.conf.f_dyn = this.conf.f_cache = this.conf.f_url = null

		} else {

			this.conf.f_func = null

		}

	}

};

dhtmlXCombo.prototype.enableFilteringMode = function(e, b, a, c) {

	if (e == true || e == "between") {

		this.conf.f_mode = (e == true ? "start" : "between");

		if (b) {

			this.conf.f_url = b;

			this.conf.f_cache = window.dhx4.s2b(a);

			this.conf.f_dyn = window.dhx4.s2b(c)

		} else {

			this.conf.f_url = null;

			this.conf.f_cache = false;

			this.conf.f_dyn = false

		}

	} else {

		this.conf.f_mode = false;

		this.conf.f_url = null;

		this.conf.f_cache = false;

		this.conf.f_dyn = false

	}

};

dhtmlXCombo.prototype.filter = function(c, a) {

	for (var e = 0; e < this.list.childNodes.length; e++) {

		var b = c.apply(window, [ this._getOption(

				this.list.childNodes[e]._optId, e) ]);

		this.list.childNodes[e].style.display = (b === true ? "" : "none")

	}

	if (typeof (a) == "undefined" || a == true) {

		this._showList(true)

	}

};

dhtmlXCombo.prototype.sort = function(c) {

	var a = [];

	for (var b = 0; b < this.list.childNodes.length; b++) {

		var e = this.list.childNodes[b]._optId;

		a.push([ e, this._getOption(e, b) ])

	}

	if (c == "asc" || c == "desc") {

		k = true;

		a.sort(function(h, g) {

			h = h[1].text_option.toLowerCase();

			g = g[1].text_option.toLowerCase();

			var j = (c == "asc" ? 1 : -1);

			return (h > g ? j : -1 * j)

		})

	} else {

		if (typeof (c) == "function" || typeof (window[c]) == "function") {

			if (typeof (window[c]) == "function") {

				c = window[c]

			}

			a.sort(function(h, g) {

				return c.apply(window, [ h[1], g[1] ])

			})

		}

	}

	while (this.list.childNodes.length > 0) {

		this.list.removeChild(this.list.lastChild)

	}

	for (var b = 0; b < a.length; b++) {

		this.list.appendChild(this.t[a[b][0]].item)

	}

};

dhtmlXCombo.prototype.enableAutocomplete = function(a) {

	if (typeof (a) == "undefined") {

		a = true

	} else {

		a = window.dhx4.s2b(a)

	}

	this.conf.f_ac = a

};

dhtmlXCombo.prototype.disableAutocomplete = function(a) {

	if (typeof (a) == "undefined") {

		a = true

	} else {

		a = window.dhx4.s2b(a)

	}

	this.enableAutocomplete(!a)

};

dhtmlXCombo.prototype.allowFreeText = function(b, a) {

	this.conf.allow_free_text = (typeof (b) == "undefined" ? true : window.dhx4

			.s2b(b));

	this.conf.free_text_empty = (typeof (a) == "undefined" ? false

			: window.dhx4.s2b(a))

};

dhtmlXCombo.prototype._checkForMatch = function(e) {

	var a = window.dhx4.trim(this.base.firstChild.value).toLowerCase();

	var g = null;

	var b = this.list.firstChild;

	while (b != null) {

		if (b.style.display == "" && b._optId != null) {

			var c = window.dhx4.trim(this.t[b._optId].obj.getText(b, true))

					.toLowerCase();

			if (a == c) {

				g = b._optId;

				b = null

			}

		}

		if (b != null) {

			b = b.nextSibling

		}

	}

	if (this.conf.last_match == null) {

		if (g != null) {

			this._setSelected(g, true, true);

			this.conf.last_match = g

		} else {

			if (this.conf.f_mode != "between" || e == true) {

				this._setSelected(null, true, true);

				this.conf.last_match = null

			}

		}

	} else {

		if (g != null) {

			if (g != this.conf.last_match) {

				this._setSelected(g, true, true);

				this.conf.last_match = g

			}

		} else {

			this._setSelected(null, true, true);

			this.conf.last_match = null

		}

	}

};

dhtmlXCombo.prototype._selectRange = function(b, a) {

	if (this.conf.combo_focus == true) {

		window.dhx4.selectTextRange(this.base.firstChild, b, a)

	}

};

dhtmlXCombo.prototype.openSelect = function() {

	if (!this._isListVisible()) {

		this._showList()

	}

};

dhtmlXCombo.prototype.closeAll = function() {

	this._hideList()

};

dhtmlXCombo.prototype._showList = function(a) {

	if (this._getListVisibleCount() == 0) {

		if (a && this._isListVisible()) {

			this._hideList()

		}

		return

	}

	if (this._isListVisible()) {

		this._checkListHeight();

		return

	}

	this.list.style.zIndex = window.dhx4.zim.reserve(this.conf.list_zi_id);

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.zIndex = Number(this.list.style.zIndex) + 1

	}

	this.list.style.visibility = "hidden";

	this.list.style.display = "";

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.visibility = this.list.style.visibility;

		this.hdr.style.display = this.list.style.display

	}

	var b = (this.hdr != null && this.conf.template.header == true ? this.hdr.offsetHeight

			: 0);

	this.list.style.width = Math.max(this.conf.opts_width || this.conf.col_w

			|| 0, this.conf.combo_width)

			+ "px";

	this.list.style.top = window.dhx4.absTop(this.base) + b

			+ this.base.offsetHeight - 1 + "px";

	this.list.style.left = window.dhx4.absLeft(this.base) + "px";

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.width = this.list.style.width;

		this.hdr.style.left = this.list.style.left;

		this.hdr.style.top = parseInt(this.list.style.top) - b + "px"

	}

	this._checkListHeight();

	this.list.style.visibility = "visible";

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.visibility = "visible"

	}

	this.callEvent("onOpen", [])

};

dhtmlXCombo.prototype._hideList = function() {

	if (!this._isListVisible()) {

		return

	}

	window.dhx4.zim.clear(this.conf.list_zi_id);

	this.list.style.display = "none";

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.display = "none"

	}

	this.conf.clear_click = false;

	this.callEvent("onClose", [])

};

dhtmlXCombo.prototype._isListVisible = function() {

	return (this.list.style.display == "")

};

dhtmlXCombo.prototype._getListVisibleCount = function() {

	var a = 0;

	for (var b = 0; b < this.list.childNodes.length; b++) {

		a += (this.list.childNodes[b].style.display == "" ? 1 : 0)

	}

	return a

};

dhtmlXCombo.prototype._checkListHeight = function() {

	if (!this._isListVisible()) {

		return

	}

	if (this.conf.item_h == null) {

		var n = this.list.firstChild;

		while (n != null) {

			if (n.style.display == "") {

				this.conf.item_h = n.offsetHeight + (this.hdr != null ? -1 : 0);

				n = null

			} else {

				n = n.nextSibling

			}

		}

		n = null

	}

	var o = window.dhx4.screenDim();

	var j = window.dhx4.absTop(this.base);

	var b = this.base.offsetHeight;

	var a = (this.hdr != null && this.conf.template.header == true ? this.hdr.offsetHeight

			: 0);

	var c = Math.max(0, Math.floor((j - a - o.top) / this.conf.item_h));

	var m = Math

			.max(0, Math.floor((o.bottom - (j + b + a)) / this.conf.item_h));

	var q = this._getListVisibleCount();

	if (m < Math.min(this.conf.opts_count_min, q) && c > m) {

		m = null

	}

	var l = Math.min((m == null ? c : m), this.conf.opts_count, q);

	var e = (l < q ? (l * this.conf.item_h) + "px" : "");

	var g = this.conf.sp[this.conf.skin][this.hdr != null

			&& this.conf.template.header == true ? "hdr_ofs" : "list_ofs"];

	this.list.style.height = e;

	this.list.style.top = (m == null ? j - this.list.offsetHeight + g : j + b

			+ a - g)

			+ "px";

	if (this.hdr != null && this.conf.template.header == true) {

		this.hdr.style.top = (m == null ? j - a - this.list.offsetHeight + g

				: j + b - g)

				+ "px"

	}

};

dhtmlXCombo.prototype._scrollToItem = function(g) {

	var e = this.t[g].item.offsetTop;

	var c = e + this.t[g].item.offsetHeight;

	var b = this.list.scrollTop;

	var a = b + this.list.clientHeight;

	if (e < b) {

		this.list.scrollTop = e

				+ (this.hdr != null && this.conf.template.header == true ? 1

						: 0)

	} else {

		if (c > a) {

			this.list.scrollTop = c

					- this.list.clientHeight

					+ (this.hdr != null && this.conf.template.header == true ? -this.conf.sp[this.conf.skin].scr_ofs

							: 0)

		}

	}

};

dhtmlXCombo.prototype._setSelected = function(e, c, b, a) {

	this.conf.temp_selected = null;

	if (b) {

		this._updateTopImage(e)

	}

	if (e != null && this.conf.last_hover == e) {

		if (c) {

			this._scrollToItem(e)

		}

		return

	}

	if (this.conf.last_hover != null) {

		this.t[this.conf.last_hover].obj.setSelected(

				this.t[this.conf.last_hover].item, false);

		this.conf.last_hover = null;

		if (e == null) {

			this.callEvent("onSelectionChange", [])

		}

	}

	if (e != null) {

		this.t[e].obj.setSelected(this.t[e].item, true);

		this.conf.last_hover = e;

		if (a != true) {

			this.conf.temp_selected = e;

			this.callEvent("onSelectionChange", [])

		}

		if (this.conf.s_mode == "select"

				&& this.t[e].item == this.t[e].item.parentNode.lastChild) {

			this._subloadRequest()

		}

		if (c) {

			this._scrollToItem(e)

		}

	}

};

dhtmlXCombo.prototype._subloadRequest = function() {

	if (this.conf.f_url != null && this.conf.f_dyn == true

			&& this.conf.f_dyn_end == false) {

		var c = "mask=" + encodeURIComponent(this.conf.f_mask) + "&pos="

				+ this.list.childNodes.length;

		var a = this;

		var b = function(g) {

			if (a.conf.f_cache) {

				a.conf.f_cache_data[a.conf.f_mask].data

						.push(g.xmlDoc.responseXML)

			}

			var e = a.list.childNodes.length;

			a.conf.f_loading = true;

			a.load(g.xmlDoc.responseXML);

			a.conf.f_loading = false;

			if (e == a.list.childNodes.length) {

				a.conf.f_dyn_end = true;

				if (a.conf.f_cache) {

					a.conf.f_cache_data[a.conf.f_mask].dyn_end = true

				}

			}

			b = a = null

		};

		if (window.dhx4.ajax.method == "post") {

			window.dhx4.ajax.post(this.conf.f_url, c, b)

		} else {

			if (window.dhx4.ajax.method == "get") {

				window.dhx4.ajax.get(this.conf.f_url

						+ (String(this.conf.f_url).indexOf("?") >= 0 ? "&"

								: "?") + c, b)

			}

		}

	}

};

dhtmlXCombo.prototype.addOption = function(h, j, b, a, e) {

	var c = null;

	if (!(h instanceof Array)) {

		var l = this._renderOption({

			value : h,

			text : j,

			css : b,

			img : a

		});

		if (c == null && window.dhx4.s2b(e) == true) {

			c = l

		}

	} else {

		for (var g = 0; g < h.length; g++) {

			if (typeof (h[g]) == "undefined") {

				continue

			}

			if (h[g] instanceof Array) {

				l = this._renderOption({

					value : h[g][0],

					text : h[g][1],

					css : h[g][2],

					img : h[g][3]

				});

				if (c == null && window.dhx4.s2b(h[g][4]) == true) {

					c = l

				}

			} else {

				var l = this._renderOption(h[g]);

				if (c == null && window.dhx4.s2b(h[g].selected) == true) {

					c = l

				}

			}

		}

	}

	if (c != null) {

		this._setSelected(c, this._isListVisible(), true);

		this._confirmSelect("onInit")

	}

};

dhtmlXCombo.prototype.updateOption = function(a, c, b, e) {

	var g = this._getOptionId(a);

	if (g == null) {

		return

	}

	this.t[g].obj.update(this.t[g].item, {

		value : c,

		text : b,

		css : e

	});

	if (this.conf.last_selected == g) {

		this.conf.last_text = this.base.firstChild.value = this.t[g].obj

				.getText(this.t[g].item, true);

		this.conf.f_server_last = this.base.firstChild.value.toLowerCase()

	}

};

dhtmlXCombo.prototype.deleteOption = function(e) {

	for ( var b in this.t) {

		var c = this.t[b].obj.getValue(this.t[b].item);

		if (c == e) {

			this._removeOption(b)

		}

	}

	if (this._isListVisible()) {

		this._showList(true)

	}

};

dhtmlXCombo.prototype.clearAll = function(b) {

	b = (typeof (b) == "undefined" ? true : window.dhx4.s2b(b));

	for ( var c in this.t) {

		this._removeOption(c)

	}

	if (this.conf.tm_hover) {

		window.clearTimeout(this.conf.tm_hover)

	}

	this.conf.last_hover = null;

	this.conf.last_selected = null;

	this.list.scrollTop = 0;

	if (b == true) {

		this._hideList()

	}

};

dhtmlXCombo.prototype._renderOption = function(e) {

	var g = window.dhx4.newId();

	var c = document.createElement("DIV");

	c._optId = g;

	c._tpl = this.conf.template;

	if (typeof (e.img) == "undefined" && typeof (e.img_src) != "undefined") {

		e.img = e.img_src;

		delete e.img_src

	}

	if (typeof (e.img_dis) == "undefined"

			&& typeof (e.img_src_dis) != "undefined") {

		e.img_dis = e.img_src_dis;

		delete e.img_src_dis

	}

	e.img_path = this.conf.img_path;

	e.img_def = this.conf.img_def;

	e.img_def_dis = this.conf.img_def_dis;

	this.list.appendChild(c);

	var b = (this._isListVisible() && window.dhx4.isFF == true);

	if (b == true) {

		var a = this.list.scrollTop;

		this.list.scrollTop -= 1

	}

	if (this.hdr != null) {

		e.multicol = true

	}

	this.t[c._optId] = {

		obj : this.modes[this.conf.opts_type].render(c, e),

		item : c,

		conf : {

			type : this.conf.opts_type

		}

	};

	c = null;

	if (b == true) {

		this.list.scrollTop += 1

	}

	return g

};

dhtmlXCombo.prototype._removeOption = function(a) {

	this.t[a].obj.destruct(this.t[a].item);

	this.t[a].obj = null;

	this.t[a].item.parentNode.removeChild(this.t[a].item);

	this.t[a].item = null;

	this.t[a].conf = null;

	this.t[a] = null;

	delete this.t[a];

	if (this.conf.last_hover == a) {

		this.conf.last_hover = null

	}

	if (this.conf.last_selected == a) {

		this.conf.last_selected = null;

		this._confirmSelect("onDelete")

	}

};

dhtmlXCombo.prototype._confirmSelect = function(c, a) {

	var b = false;

	if (typeof (a) == "undefined") {

		a = true

	}

	if (this.conf.f_server_tm) {

		window.clearTimeout(this.conf.f_server_tm)

	}

	if (this.conf.last_hover != null) {

		b = b

				|| (this.conf.last_value != this

						._getOptionValue(this.conf.last_hover));

		this.conf.last_match = this.conf.last_selected = this.conf.last_hover;

		this.conf.last_value = this._getOptionValue(this.conf.last_selected);

		this.conf.last_text = this.base.firstChild.value = this.t[this.conf.last_selected].obj

				.getText(this.t[this.conf.last_selected].item, true);

		this.conf.f_server_last = this.base.firstChild.value.toLowerCase();

		this.base.childNodes[1].value = this.conf.last_value;

		this.base.childNodes[2].value = "false"

	} else {

		if (this.conf.allow_free_text

				|| (this.base.firstChild.value == "" && this.conf.allow_empty_value)) {

			b = b || (this.conf.last_text != this.base.firstChild.value);

			this.conf.last_match = this.conf.last_value = this.conf.last_selected = null;

			this.conf.last_text = this.base.firstChild.value;

			this.conf.f_server_last = this.base.firstChild.value.toLowerCase();

			this.base.childNodes[1].value = this.conf.last_text;

			this.base.childNodes[2].value = "true"

		} else {

			if (c != "template") {

				this._cancelSelect(true);

				this._updateTopImage(this.conf.last_selected);

				return

			}

		}

	}

	if (this.conf.f_ac && this.conf.f_mode == "start") {

		this.conf.f_ac_text = "";

		if (c != "blur") {

			this._selectRange(this.base.firstChild.value.length,

					this.base.firstChild.value.length)

		}

	}

	if (a) {

		this._hideList()

	}

	if (b == true && c != "onInit" && c != "onDelete") {

		this.callEvent("onSelectionChange", []);

		this.callEvent("onChange",

				[ this.conf.last_value, this.conf.last_text ])

	}

};

dhtmlXCombo.prototype._cancelSelect = function(a) {

	this._hideList();

	if (a == true && this.conf.allow_free_text == false

			&& this.conf.free_text_empty == true) {

		this.conf.f_server_last = this.conf.last_match = this.conf.last_value = this.conf.last_selected = null;

		this.base.childNodes[1].value = this.conf.last_text = this.base.firstChild.value = "";

		this.base.childNodes[2].value = "false"

	} else {

		this.base.firstChild.value = this.conf.last_text

	}

	if (this.conf.f_mode != false) {

		this._filterOpts(true)

	}

};

dhtmlXCombo.prototype._getOption = function(j, e) {

	if (!this.t[j]) {

		return null

	}

	if (typeof (e) == "undefined") {

		e = -1

	}

	if (e < 0) {

		for (var h = 0; h < this.list.childNodes.length; h++) {

			if (e < 0 && this.list.childNodes[h]._optId == j) {

				e = h

			}

		}

	}

	var g = {

		value : this.t[j].obj.getValue(this.t[j].item),

		text : this.t[j].obj.getText(this.t[j].item),

		text_input : this.t[j].obj.getText(this.t[j].item, true),

		text_option : this.t[j].obj.getText(this.t[j].item, null, true),

		css : this.t[j].obj.getCss(this.t[j].item),

		selected : (j == this.conf.last_selected),

		index : e

	};

	if (typeof (this.t[j].obj.getExtraData) == "function") {

		var c = this.t[j].obj.getExtraData(this.t[j].item);

		for ( var b in c) {

			if (typeof (g[b]) == "undefined") {

				g[b] = c[b]

			}

		}

	}

	return g

};

dhtmlXCombo.prototype._getOptionProp = function(e, c, b) {

	if (e != null) {

		var a = this._getOption(e);

		if (a != null) {

			return a[c]

		}

	}

	return b

};

dhtmlXCombo.prototype._getOptionId = function(b) {

	var e = null;

	for (var a = 0; a < this.list.childNodes.length; a++) {

		if (e == null) {

			var c = this.list.childNodes[a]._optId;

			if (b == this.t[c].obj.getValue(this.t[c].item)) {

				e = c

			}

		}

	}

	return e

};

dhtmlXCombo.prototype._getOptionValue = function(a) {

	return this._getOptionProp(a, "value", null)

};

dhtmlXCombo.prototype.setSize = function(a) {

	this.conf.combo_width = parseInt(a)

			- (dhx4.isFF || dhx4.isIE || dhx4.isChrome || dhx4.isOpera ? 2 : 0);

	this.base.style.width = Math.max(0, this.conf.combo_width) + "px";

	this._adjustBase();

	if (this._isListVisible()) {

		this._hideList();

		this._showList()

	}

};

dhtmlXCombo.prototype._adjustBase = function() {

	this.base.firstChild.style.width = Math.max(0, (this.conf.combo_width

			- (this.conf.i_ofs + 1) - (this.conf.combo_image ? this.conf.i_ofs

			: 0)))

			+ "px";

	this.base.firstChild.style.marginLeft = (this.conf.combo_image ? this.conf.i_ofs

			+ "px"

			: "0px")

};

dhtmlXCombo.prototype.setOptionWidth = function(a) {

	this.conf.opts_width = (parseInt(a) || null)

};

dhtmlXCombo.prototype.setOptionIndex = function(c, a) {

	if (isNaN(a) || a < 0) {

		return

	}

	var e = this.getOption(c);

	if (e == null) {

		return

	}

	if (a == e.index) {

		return

	}

	var b = this.list.childNodes[e.index];

	b.parentNode.removeChild(b);

	if (this.list.childNodes[a] != null) {

		this.list.insertBefore(b, this.list.childNodes[a])

	} else {

		this.list.appendChild(b)

	}

	b = null

};

dhtmlXCombo.prototype.getOptionsCount = function() {

	return this.list.childNodes.length

};

dhtmlXCombo.prototype._mcMakeTemplate = function(m) {

	var g = "";

	var e = "";

	this.conf.col_w = 0;

	for (var j = 0; j < m.length; j++) {

		var a = Number(parseInt(m[j].width) || 50);

		var c = (m[j].css || "");

		var l = (j == 0 && window.dhx4.isIE6 == true ? "_first" : "");

		e += "<div class='dhxcombo_cell" + l + " " + c + "' style='width:" + a

				+ "px;'><div class='dhxcombo_cell_text'>"

				+ (m[j].option || "&nbsp;") + "</div></div>";

		g += "<div class='dhxcombo_hdrcell" + l + " " + c + "' style='width:"

				+ a + "px;'><div class='dhxcombo_hdrcell_text'>"

				+ (m[j].header || "&nbsp;") + "</div></div>";

		this.conf.col_w += a + 1

	}

	var a = 500;

	var b = document.createElement("DIV");

	b.style.position = "absolute";

	b.style.top = "10px";

	b.style.left = -a * 2 + "px";

	b.style.width = a + "px";

	b.style.height = "50px";

	b.style.overflowY = "scroll";

	b.innerHTML = "<div>&nbsp;</div>";

	document.body.appendChild(b);

	this.conf.col_w += a - b.firstChild.offsetWidth + 10;

	b.parentNode.removeChild(b);

	b = null;

	this.conf.template.option = e;

	this._mcAttachHeader(g);

	this.list.className += " dhxcombolist_multicolumn"

};

dhtmlXCombo.prototype._mcAttachHeader = function(a) {

	if (this.hdr == null) {

		this.hdr = document.createElement("DIV");

		this.hdr.className = "dhxcombolist_" + this.conf.skin

				+ " dhxcombolist_hdr";

		this.hdr.style.display = "none";

		this.list.parentNode.insertBefore(this.hdr, this.list);

		if (typeof (window.addEventListener) == "function") {

			this.hdr.addEventListener("mousedown", this._doOnListMouseDown,

					false)

		} else {

			this.hdr.attachEvent("onmousedown", this._doOnListMouseDown)

		}

		if (this.conf.opts_type == "checkbox" && this.conf.combo_image == true) {

			this.conf.combo_image = false;

			if (this.base.lastChild.className.match(/dhxcombo_top_image/) != null) {

				this.base.removeChild(this.base.lastChild)

			}

			this._adjustBase()

		}

	}

	this.hdr.innerHTML = "<div class='dhxcombo_hdrtext'>" + a + "</div>"

};

dhtmlXCombo.prototype._mcDetachHeader = function() {

	if (this.hdr != null) {

		if (typeof (window.addEventListener) == "function") {

			this.hdr.removeEventListener("mousedown", this._doOnListMouseDown,

					false)

		} else {

			this.hdr.detachEvent("onmousedown", this._doOnListMouseDown)

		}

		this.hdr.parentNode.removeChild(this.hdr);

		this.hdr = null

	}

	this.conf.col_w = null;

	this.conf.item_h = null

};

dhtmlXCombo.prototype.modes = {};

dhtmlXCombo.prototype.doWithItem = function(a, j, g, c) {

	var h = (a >= 0 && a < this.list.childNodes.length ? this.list.childNodes[a]._optId

			: null);

	if (h == null) {

		return null

	}

	if (typeof (this.t[h].obj[j]) != "function") {

		return null

	}

	var e = [ this.t[h].item ];

	for (var b = 2; b < arguments.length; b++) {

		e.push(arguments[b])

	}

	return this.t[h].obj[j].apply(this.t[h].obj, e)

};

function dhtmlXComboExtend(e, c) {

	for ( var b in dhtmlXCombo.prototype.modes[c]) {

		if (typeof (dhtmlXCombo.prototype.modes[e][b]) == "undefined") {

			dhtmlXCombo.prototype.modes[e][b] = dhtmlXCombo.prototype.modes[c][b]

		}

	}

}

dhtmlXCombo.prototype.modes.option = {

	image : false,

	html : false,

	option_css : "dhxcombo_option_text",

	render : function(a, b) {

		a._conf = {

			value : b.value,

			css : ""

		};

		a.className = "dhxcombo_option";

		a.innerHTML = "<div class='" + this.option_css + "'>&nbsp;</div>";

		if (b.css != null) {

			a.lastChild.style.cssText = b.css;

			a._conf.css = b.css

		}

		this.setText(a, b.text);

		return this

	},

	destruct : function(a) {

		a._conf = null

	},

	update : function(a, b) {

		a._conf.value = b.value;

		a._conf.css = b.css;

		a.lastChild.style.cssText = b.css;

		this.setText(a, b.text)

	},

	setText : function(c, e, b) {

		c._conf.text = e;

		var a = (typeof (e) == "object" ? window.dhx4.template(c._tpl.option,

				this.replaceHtml(c._conf.text, b), true) : window.dhx4

				.trim(this.replaceHtml(c._conf.text, b) || ""));

		c.lastChild.innerHTML = (a.length == 0 ? "&nbsp;" : a)

	},

	getText : function(c, a, b) {

		if (window.dhx4.s2b(a) && typeof (c._conf.text) == "object") {

			return window.dhx4.template(c._tpl.input, c._conf.text, true)

		}

		if (window.dhx4.s2b(b) && typeof (c._conf.text) == "object") {

			return window.dhx4.template(c._tpl.option, c._conf.text, true)

		}

		return c._conf.text

	},

	getValue : function(a) {

		return a._conf.value

	},

	getCss : function(a) {

		return a._conf.css

	},

	setSelected : function(a, b) {

		a.className = "dhxcombo_option"

				+ (b ? " dhxcombo_option_selected" : "")

	},

	isSelected : function(a) {

		return String(a.className).indexOf("dhxcombo_option_selected") >= 0

	},

	getExtraData : function(a) {

		return {

			type : "option"

		}

	},

	replaceHtml : function(g, e) {

		if (this.html == true) {

			return g

		}

		if (typeof (e) == "undefined" || e == null) {

			e = {}

		}

		if (typeof (g) == "object") {

			var c = {};

			for ( var b in g) {

				c[b] = (e[b] == true ? g[b] : this.replaceHtml(g[b]))

			}

		} else {

			var c = (g || "").replace(/[\<\>\&\s]/g, function(a) {

				switch (a) {

				case "<":

					return "&lt;";

				case ">":

					return "&gt;";

				case "&":

					return "&amp;";

				case " ":

					return "&nbsp;"

				}

				return a

			})

		}

		return c

	}

};

dhtmlXCombo.prototype.modes.checkbox = {

	image : true,

	html : false,

	image_css : "dhxcombo_checkbox dhxcombo_chbx_#state#",

	option_css : "dhxcombo_option_text dhxcombo_option_text_chbx",

	render : function(b, c) {

		if (this.image_css_regexp == null) {

			this.image_css_regexp = new RegExp(this.image_css.replace(

					"#state#", "\\d*"))

		}

		b._conf = {

			value : c.value,

			css : "",

			checked : window.dhx4.s2b(c.checked)

		};

		b.className = "dhxcombo_option";

		var a = {};

		if (c.multicol == true) {

			c.text.checkbox = "<div class='"

					+ String(this.image_css).replace("#state#",

							(b._conf.checked ? "1" : "0")) + "'></div>&nbsp;";

			a.checkbox = true;

			b.innerHTML = "<div class='"

					+ dhtmlXCombo.prototype.modes.option.option_css

					+ "'></div>"

		} else {

			b.innerHTML = "<div class='"

					+ String(this.image_css).replace("#state#",

							(b._conf.checked ? "1" : "0"))

					+ "'></div><div class='" + this.option_css

					+ "'>&nbsp;</div>"

		}

		if (c.css != null) {

			b.lastChild.style.cssText += c.css;

			b._conf.css = c.css

		}

		this.setText(b, c.text, a);

		return this

	},

	setChecked : function(b, c) {

		b._conf.checked = window.dhx4.s2b(c);

		var a = String(this.image_css).replace("#state#",

				(b._conf.checked ? "1" : "0"));

		this._changeChbxCss(b.childNodes, a)

	},

	_changeChbxCss : function(a, b) {

		for (var c = 0; c < a.length; c++) {

			if (a[c].tagName != null && a[c].className != null

					&& a[c].className.match(this.image_css_regexp) != null) {

				a[c].className = b

			} else {

				if (a[c].childNodes.length > 0) {

					this._changeChbxCss(a[c].childNodes, b)

				}

			}

		}

	},

	isChecked : function(a) {

		return (a._conf.checked == true)

	},

	getExtraData : function(a) {

		return {

			type : "checkbox",

			checked : a._conf.checked

		}

	},

	optionClick : function(g, e, h) {

		var c = true;

		var b = (e.target || e.srcElement);

		while (c == true && b != null && b != g && b.className != null) {

			if (b.className.match(this.image_css_regexp) != null) {

				var a = [ g._conf.value, !g._conf.checked ];

				if (h.callEvent("onBeforeCheck", a) === true) {

					this.setChecked(g, !this.isChecked(g));

					h.callEvent("onCheck", a)

				}

				c = false;

				a = null

			} else {

				b = b.parentNode

			}

		}

		b = h = g = null;

		return c

	},

	getTopImage : function(b, a) {

		return ""

	},

	topImageClick : function(a, b) {

		return true

	}

};

dhtmlXComboExtend("checkbox", "option");

dhtmlXCombo.prototype.setChecked = function(a, b) {

	this.doWithItem(a, "setChecked", b)

};

dhtmlXCombo.prototype.getChecked = function(a) {

	var b = [];

	for (var c = 0; c < this.list.childNodes.length; c++) {

		if (this.isChecked(c)) {

			b.push(this._getOptionProp(this.list.childNodes[c]._optId, "value",

					""))

		}

	}

	return b

};

dhtmlXCombo.prototype.isChecked = function(a) {

	return this.doWithItem(a, "isChecked")

};

dhtmlXCombo.prototype.modes.image = {

	image : true,

	html : false,

	image_css : "dhxcombo_image",

	option_css : "dhxcombo_option_text dhxcombo_option_text_image",

	render : function(a, b) {

		a._conf = {

			value : b.value,

			css : ""

		};

		a.className = "dhxcombo_option";

		a.innerHTML = "<div class='" + this.image_css + "'></div><div class='"

				+ this.option_css + "'>&nbsp;</div>";

		if (b.css != null) {

			a.lastChild.style.cssText += b.css;

			a._conf.css = b.css

		}

		this.setText(a, b.text);

		this

				.setImage(a, b.img, b.img_dis, b.img_path, b.img_def,

						b.img_def_dis);

		return this

	},

	update : function(a, b) {

		a._conf.value = b.value;

		a._conf.css = b.css;

		a.lastChild.style.cssText = b.css;

		this.setText(a, b.text);

		this

				.setImage(a, b.img, b.img_dis, b.img_path, b.img_def,

						b.img_def_dis)

	},

	setImage : function(c, a, g, h, e, b) {

		if (a != null && a.length > 0) {

			a = h + a

		} else {

			if (e != null && e.length > 0) {

				a = h + e

			} else {

				a = null

			}

		}

		if (g != null && g.length > 0) {

			g = h + g

		} else {

			if (b != null && b.length > 0) {

				g = h + b

			} else {

				if (b == true) {

					g = a

				} else {

					g = null

				}

			}

		}

		c._conf.img = a;

		c._conf.img_dis = g;

		c.firstChild.style.backgroundImage = (a != null ? "url(" + a + ")"

				: "none")

	},

	getExtraData : function(a) {

		return {

			type : "image"

		}

	},

	getTopImage : function(e, c) {

		var b = (c ? "img" : "img_dis");

		if (e != null && e._conf[b] != null) {

			return "<div class='" + this.image_css

					+ "' style='background-image:url(" + e._conf[b]

					+ ");'></div>"

		}

		return ""

	}

};

dhtmlXComboExtend("image", "option");

dhtmlXCombo.prototype.setDefaultImage = function(a, b) {

	if (a != null) {

		this.conf.img_def = a

	}

	if (b != null) {

		this.conf.img_def_dis = b

	}

};

dhtmlXCombo.prototype.setImagePath = function(a) {

	this.conf.img_path = a

};

function dhtmlXEditor(c, e) {

	var b = this;

	this.conf = {

		content : "",

		contentHTML : "",

		resizeTM : null,

		resizeTMTime : 100,

		roMode : false,

		toolbar : false,

		iconsPath : "",

		evs : [ "focus", "blur", "keydown", "keyup", "keypress", "mouseup",

				"mousedown", "click", "touchend" ],

		iOSfix : (navigator.userAgent.match(/Mobile/gi) != null

				&& navigator.userAgent.match(/iPad/gi) != null && navigator.userAgent

				.match(/AppleWebKit/gi) != null),

		extra_css : "",

		font : {

			family : "Tahoma",

			size : "12px",

			color : "black"

		}

	};

	this._doOnFocusChanged = null;

	this._doOnAccess = null;

	if (typeof (c) == "object" && c != null && c.tagName == null) {

		e = c.skin;

		if (c.content != null) {

			this.conf.content = c.content

		}

		if (c.contentHTML != null) {

			this.conf.contentHTML = c.contentHTML

		}

		if (c.iconsPath != null) {

			this.conf.iconsPath = c.iconsPath

		}

		if (c.extraCss != null) {

			this.conf.extra_css = c.extraCss

		}

		if (c.toolbar != null) {

			this.conf.toolbar = window.dhx4.s2b(c.toolbar)

		}

		if (c.onFocusChanged != null) {

			this._doOnFocusChanged = c.onFocusChanged

		}

		if (c.onAccess != null) {

			this._doOnAccess = c.onAccess

		}

		c = c.parent

	}

	this.conf.skin = (e || window.dhx4.skin

			|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

			|| window.dhx4.skinDetect("dhxeditor") || "material");

	if (typeof (c) == "string") {

		c = document.getElementById(c)

	}

	this.base = c;

	this.base.className += " dhxeditor_" + this.conf.skin;

	while (this.base.childNodes.length > 0) {

		this.base.removeChild(this.base.childNodes[0])

	}

	var g = (window.dhx4.isIE ? this.base.currentStyle.position

			: (window.getComputedStyle != null ? window.getComputedStyle(

					this.base, null).getPropertyValue("position") : ""));

	if (!(g == "relative" || g == "absolute")) {

		this.base.style.position = "relative"

	}

	this.cell = new dhtmlXEditorCell(window.dhx4.newId(), this);

	this.base.appendChild(this.cell.cell);

	this.cBlock = document.createElement("DIV");

	this.cBlock.className = "dhxcont_content_blocker";

	this.cBlock.style.display = "none";

	this.base.appendChild(this.cBlock);

	this.editor = document.createElement("IFRAME");

	this.editor.className = "dhxeditor_mainiframe";

	this.editor.frameBorder = 0;

	if (window.dhx4.isOpera) {

		this.editor.scrolling = "yes"

	}

	this.setSizes();

	var a = this.editor;

	if (typeof (window.addEventListener) != "undefined") {

		a.onload = function() {

			for (var h = 0; h < b.conf.evs.length; h++) {

				a.contentWindow.addEventListener(b.conf.evs[h], b._ev, false)

			}

		}

	} else {

		a.onreadystatechange = function(h) {

			if (typeof (a.readyState) != "undefined"

					&& a.readyState == "complete") {

				try {

					for (var j = 0; j < b.conf.evs.length; j++) {

						a.contentWindow.document.body.attachEvent("on"

								+ b.conf.evs[j], b._ev)

					}

				} catch (l) {

				}

			}

		}

	}

	this._ev = function(j) {

		j = j || event;

		var h = j.type;

		if (b.conf.iOSfix == true && h == "touchend") {

			b.editor.contentWindow.focus();

			return

		}

		b.callEvent("onAccess", [ h, j ]);

		if (typeof (b._doOnAccess) == "function") {

			b._doOnAccess(h, j)

		} else {

			if (typeof (b._doOnAccess) == "string"

					&& typeof (window[b._doOnAccess]) == "function") {

				window[b._doOnAccess](h, j)

			}

		}

	};

	this._focus = function() {

		if (window.dhx4.isIE) {

			this.editor.contentWindow.document.body.focus()

		} else {

			this.editor.contentWindow.focus()

		}

	};

	this.cell.attachObject(this.editor);

	this.edWin = this.editor.contentWindow;

	this.edDoc = this.edWin.document;

	this._prepareContent = function(l, n) {

		var j = "";

		if (l === true && this.getContent != null) {

			j = this.getContent()

		}

		var h = this.editor.contentWindow.document;

		h.open("text/html", "replace");

		if (window.dhx4.isOpera) {

			h

					.write("<html><head>"

							+ this.conf.extra_css

							+ "<style> html, body { overflow:auto;-webkit-overflow-scrolling: touch; padding:0px; height:100%; margin:0px; background-color:#ffffff; "

							+ this._fontConf() + "} </style></head><body "

							+ (n !== true ? "contenteditable='true'" : "")

							+ " tabindex='0'></body></html>")

		} else {

			if (window.dhx4.isKHTML) {

				h

						.write("<html><head>"

								+ this.conf.extra_css

								+ "<style> html {overflow-x: auto;-webkit-overflow-scrolling: touch; overflow-y: auto;} body { overflow: auto; overflow-y: scroll;} html,body { padding:0px; height:100%; margin:0px; background-color:#ffffff; "

								+ this._fontConf() + "} </style></head><body "

								+ (n !== true ? "contenteditable='true'" : "")

								+ " tabindex='0'></body></html>")

			} else {

				if (window.dhx4.isIE) {

					h

							.write("<html><head>"

									+ this.conf.extra_css

									+ "<style> html {overflow-y: auto;} body {overflow-y: scroll;-webkit-overflow-scrolling: touch;} html,body { overflow-x: auto; padding:0px; height:100%; margin:0px; background-color: #ffffff; outline: none; "

									+ this._fontConf()

									+ "} </style></head><body "

									+ (n !== true ? "contenteditable='true'"

											: "")

									+ " tabindex='0'></body></html>")

				} else {

					h

							.write("<html><head>"

									+ this.conf.extra_css

									+ "<style> html,body { overflow-x: auto; overflow-y:-webkit-overflow-scrolling: touch; scroll; padding:0px; height:100%; margin:0px; background-color:#ffffff; "

									+ this._fontConf()

									+ "} </style></head><body "

									+ (n !== true ? "contenteditable='true'"

											: "")

									+ " tabindex='0'></body></html>")

				}

			}

		}

		h.close();

		if (window.dhx4.isIE) {

			h.contentEditable = (n !== true)

		} else {

			h.designMode = (n !== true ? "On" : "Off")

		}

		if (window.dhx4.isFF) {

			try {

				h.execCommand("useCSS", false, true)

			} catch (m) {

			}

		}

		if (l === true && this.setContent != null) {

			this.setContent(j)

		}

	};

	this._prepareContent();

	this._doOnResize = function() {

		window.clearTimeout(b.conf.resizeTM);

		b.conf.resizeTM = window.setTimeout(function() {

			if (b.setSizes) {

				b.setSizes()

			}

		}, b.conf.resizeTMTime)

	};

	this._runCommand = function(l, n) {

		if (this.conf.roMode === true) {

			return

		}

		if (arguments.length < 2) {

			n = null

		}

		if (window.dhx4.isIE) {

			this.edWin.focus()

		}

		try {

			var j = this.editor.contentWindow.document;

			j.execCommand(l, false, n)

		} catch (m) {

		}

		if (window.dhx4.isIE) {

			this.edWin.focus();

			var h = this;

			window.setTimeout(function() {

				h.edWin.focus();

				h = null

			}, 1)

		}

	};

	this.applyBold = function() {

		this._runCommand("Bold")

	};

	this.applyItalic = function() {

		this._runCommand("Italic")

	};

	this.applyUnderscore = function() {

		this._runCommand("Underline")

	};

	this.clearFormatting = function() {

		this._runCommand("RemoveFormat");

		var h = this.getContent();

		h = h.replace(/<\/?h\d>/gi, "");

		this.setContent(h)

	};

	this._doOnClick = function(l) {

		var j = l || window.event;

		var h = j.target || j.srcElement;

		b._showInfo(h)

	};

	this._doOnMouseDown = function(l) {

		var j = l || window.event;

		var h = j.target || j.srcElement;

		b._showInfo(h)

	};

	this._doOnKeyUp = function(m) {

		var l = m || window.event;

		var h = l.keyCode;

		var j = l.target || l.srcElement;

		if ({

			37 : 1,

			38 : 1,

			39 : 1,

			40 : 1,

			13 : 1

		}[h] == 1) {

			b._showInfo(j)

		}

	};

	this._getParentByTag = function(h, l) {

		l = l.toLowerCase();

		var j = h;

		do {

			if (l == "" || j.nodeName.toLowerCase() == l) {

				return j

			}

		} while (j = j.parentNode);

		return h

	};

	this._isStyleProperty = function(j, m, h, l) {

		m = m.toLowerCase();

		var o = j;

		do {

			if ((o.nodeName.toLowerCase() == m) && (o.style[h] == l)) {

				return true

			}

		} while (o = o.parentNode);

		return false

	};

	this._setStyleProperty = function(h, l) {

		this.style[l] = false;

		var j = this._getParentByTag(h, l);

		if (j && (j.tagName.toLowerCase() == l)) {

			this.style[l] = true

		}

		if (l == "del"

				&& this._getParentByTag(h, "strike")

				&& this._getParentByTag(h, "strike").tagName.toLowerCase() == "strike") {

			this.style.del = true

		}

	};

	this._showInfo = function(j) {

		var j = (this._getSelectionBounds().end) ? this._getSelectionBounds().end

				: j;

		if (!j || !this._setStyleProperty) {

			return

		}

		try {

			if (this.edWin.getComputedStyle) {

				var h = this.edWin.getComputedStyle(j, null);

				var l = ((h.getPropertyValue("font-weight") == 401) ? 700 : h

						.getPropertyValue("font-weight"));

				this.style = {

					fontStyle : h.getPropertyValue("font-style"),

					fontSize : h.getPropertyValue("font-size"),

					textDecoration : h.getPropertyValue("text-decoration"),

					fontWeight : l,

					fontFamily : h.getPropertyValue("font-family"),

					textAlign : h.getPropertyValue("text-align")

				};

				if (window.dhx4.isKHTML) {

					this.style.fontStyle = h.getPropertyValue("font-style");

					this.style.vAlign = h.getPropertyValue("vertical-align");

					this.style.del = this._isStyleProperty(j, "span",

							"textDecoration", "line-through");

					this.style.u = this._isStyleProperty(j, "span",

							"textDecoration", "underline")

				}

			} else {

				var h = j.currentStyle;

				this.style = {

					fontStyle : h.fontStyle,

					fontSize : h.fontSize,

					textDecoration : h.textDecoration,

					fontWeight : h.fontWeight,

					fontFamily : h.fontFamily,

					textAlign : h.textAlign

				}

			}

			this._setStyleProperty(j, "h1");

			this._setStyleProperty(j, "h2");

			this._setStyleProperty(j, "h3");

			this._setStyleProperty(j, "h4");

			if (!window.dhx4.isKHTML) {

				this._setStyleProperty(j, "del");

				this._setStyleProperty(j, "sub");

				this._setStyleProperty(j, "sup");

				this._setStyleProperty(j, "u")

			}

			this.callEvent("onFocusChanged", [ this.style, h ])

		} catch (m) {

			return null

		}

	};

	this._getSelectionBounds = function() {

		var n, l, q, j;

		if (this.edWin.getSelection) {

			var o = this.edWin.getSelection();

			if (window.dhx4.isEdge && o.rangeCount == 0) {

				return {

					root : null,

					start : null,

					end : null

				}

			}

			n = o.getRangeAt(o.rangeCount - 1);

			q = n.startContainer;

			j = n.endContainer;

			l = n.commonAncestorContainer;

			if (q.nodeName == "#text") {

				l = l.parentNode

			}

			if (q.nodeName == "#text") {

				q = q.parentNode

			}

			if (q.nodeName.toLowerCase() == "body") {

				q = q.firstChild

			}

			if (j.nodeName == "#text") {

				j = j.parentNode

			}

			if (j.nodeName.toLowerCase() == "body") {

				j = j.lastChild

			}

			if (q == j) {

				l = q

			}

			return {

				root : l,

				start : q,

				end : j

			}

		} else {

			if (this.edWin.document.selection) {

				n = this.edDoc.selection.createRange();

				if (!n.duplicate) {

					return null

				}

				l = n.parentElement();

				var m = n.duplicate();

				var h = n.duplicate();

				m.collapse(true);

				h.moveToElementText(m.parentElement());

				h.setEndPoint("EndToStart", m);

				q = m.parentElement();

				m = n.duplicate();

				h = n.duplicate();

				h.collapse(false);

				m.moveToElementText(h.parentElement());

				m.setEndPoint("StartToEnd", h);

				j = h.parentElement();

				if (q.nodeName.toLowerCase() == "body") {

					q = q.firstChild

				}

				if (j.nodeName.toLowerCase() == "body") {

					j = j.lastChild

				}

				if (q == j) {

					l = q

				}

				return {

					root : l,

					start : q,

					end : j

				}

			}

		}

		return null

	};

	this.getContent = function() {

		if (!this.edDoc.body) {

			return ""

		} else {

			if (window.dhx4.isFF || window.dhx4.isChrome) {

				return this.editor.contentWindow.document.body.innerHTML

						.replace(/<\/{0,}br\/{0,}>\s{0,}$/gi, "")

			}

			if (window.dhx4.isIE && this.edDoc.body.innerText.length == 0) {

				return ""

			}

			return this.edDoc.body.innerHTML

		}

	};

	this.setContent = function(l) {

		l = l || "";

		if (this.edDoc.body) {

			var j = false;

			if (window.dhx4.isFF) {

				var h = navigator.userAgent.match(/Firefox\/(\d*)/);

				j = (h != null && h[1] < 28)

			}

			if (j) {

				if (typeof (this.conf.ffTest) == "undefined") {

					this.editor.contentWindow.document.body.innerHTML = "";

					this._runCommand("InsertHTML", "test");

					this.conf.ffTest = (this.editor.contentWindow.document.body.innerHTML.length > 0)

				}

				if (this.conf.ffTest) {

					this.editor.contentWindow.document.body.innerHTML = l

				} else {

					this.editor.contentWindow.document.body.innerHTML = "";

					if (l.length == 0) {

						l = " "

					}

					this._runCommand("InsertHTML", l)

				}

			} else {

				this.editor.contentWindow.document.body.innerHTML = l

			}

			this.callEvent("onContentSet", [])

		} else {

			if (!this.conf.firstLoadEv) {

				this.conf.firstLoadEv = true;

				this.conf.firstLoadData = l;

				this._onFirstLoad = function() {

					b.setContent(b.conf.firstLoadData);

					if (typeof (window.addEventListener) == "function") {

						b.edWin.removeEventListener("load", b._onFirstLoad,

								false)

					} else {

						b.edWin.detachEvent("onload", b._onFirstLoad)

					}

					b.conf.firstLoadData = null;

					b.conf.firstLoadEv = false;

					b._onFirstLoad = null

				};

				if (typeof (window.addEventListener) == "function") {

					this.edWin.addEventListener("load", this._onFirstLoad,

							false)

				} else {

					this.edWin.attachEvent("onload", this._onFirstLoad)

				}

			}

		}

	};

	this.setContentHTML = function(h) {

		window.dhx4.ajax.get(h, function(j) {

			if (j.xmlDoc.responseText != null) {

				b.setContent(j.xmlDoc.responseText)

			}

		})

	};

	window.dhx4._eventable(this);

	this.attachEvent("onFocusChanged", function(h) {

		if (typeof (this._doOnFocusChanged) == "function") {

			this._doOnFocusChanged(h)

		} else {

			if (typeof (this._doOnFocusChanged) == "string"

					&& typeof (window[this._doOnFocusChanged]) == "function") {

				window[this._doOnFocusChanged](h)

			}

		}

	});

	if (typeof (window.addEventListener) == "function") {

		window.addEventListener("resize", this._doOnResize, false);

		this.edDoc.addEventListener("click", this._doOnClick, false);

		this.edDoc.addEventListener("keyup", this._doOnKeyUp, false);

		if (window.dhx4.isOpera) {

			this.edDoc

					.addEventListener("mousedown", this._doOnMouseDown, false)

		}

	} else {

		window.attachEvent("onresize", this._doOnResize);

		this.edDoc.attachEvent("onclick", this._doOnClick);

		this.edDoc.attachEvent("onkeyup", this._doOnKeyUp)

	}

	this.unload = function() {

		if (typeof (window.addEventListener) == "function") {

			window.removeEventListener("resize", this._doOnResize, false);

			this.edDoc.removeEventListener("click", this._doOnClick, false);

			this.edDoc.removeEventListener("keyup", this._doOnKeyUp, false);

			if (window.dhx4.isOpera) {

				this.edDoc.removeEventListener("mousedown",

						this._doOnMouseDown, false)

			}

			for (var h = 0; h < b.conf.evs.length; h++) {

				a.contentWindow

						.removeEventListener(b.conf.evs[h], b._ev, false)

			}

			if (this.tb != null && this.conf.iOSfix == true) {

				this.tb.cont.removeEventListener("touchend", this._doOnIOSFix,

						false);

				this._doOnIOSFix = null

			}

		} else {

			window.detachEvent("onresize", this._doOnResize, false);

			this.edDoc.detachEvent("onclick", this._doOnClick);

			this.edDoc.detachEvent("onkeyup", this._doOnKeyUp);

			for (var h = 0; h < b.conf.evs.length; h++) {

				a.contentWindow.document.body.detachEvent("on" + b.conf.evs[h],

						b._ev)

			}

		}

		this._doOnAccess = null;

		this._doOnFocusChanged = null;

		if (typeof (window.addEventListener) == "function") {

			this.editor.onload = null

		} else {

			this.editor.onreadystatechange = null

		}

		this.editor.parentNode.removeChild(this.editor);

		this.editor = null;

		this.edDoc = null;

		this.edWin = null;

		this.cell._unload();

		this.cell = null;

		this.tb = null;

		window.dhx4._eventable(this, "clear");

		this.cBlock.parentNode.removeChild(this.cBlock);

		this.cBlock = null;

		this.base.className = String(this.base.className).replace(

				new RegExp("\\s{0,}dhxeditor_" + this.conf.skin), "");

		while (this.base.childNodes.length > 0) {

			this.base.removeChild(this.base.childNodes[0])

		}

		this.base = null;

		this._doOnClick = null;

		this._doOnKeyUp = null;

		this._doOnMouseDown = null;

		this._ev = null;

		this._focus = null;

		this._prepareContent = null;

		this._doOnResize = null;

		this.setIconsPath = null;

		this.init = null;

		this.setSizes = null;

		this._runCommand = null;

		this.applyBold = null;

		this.applyItalic = null;

		this.applyUnderscore = null;

		this.clearFormatting = null;

		this._showInfo = null;

		this._getSelectionBounds = null;

		this.getContent = null;

		this.setContent = null;

		this.setContentHTML = null;

		this.setReadonly = null;

		this.isReadonly = null;

		this.unload = null;

		b = a = null

	};

	if (this.conf.toolbar == true && typeof (this.attachToolbar) == "function"

			&& typeof (window.dhtmlXToolbarObject) == "function") {

		this.attachToolbar(this.conf.iconsPath);

		if (this.conf.iOSfix == true) {

			this._doOnIOSFix = function() {

				b.editor.contentWindow.focus()

			};

			this.tb.cont.addEventListener("touchend", this._doOnIOSFix, false)

		}

	}

	this.setIconsPath = function(h) {

		this.conf.iconsPath = h

	};

	if (this.conf.content.length > 0) {

		this.setContent(this.conf.content);

		this.conf.content = ""

	} else {

		if (this.conf.contentHTML.length > 0) {

			this.setContentHTML(this.conf.contentHTML);

			this.conf.contentHTML = ""

		}

	}

	return this

}

dhtmlXEditor.prototype.setSizes = function() {

	this.cell._setSize(0, 0, this.base.clientWidth, this.base.clientHeight);

	if (this.editor != null) {

		this.editor.style.left = "5px";

		this.editor.style.width = this.base.clientWidth - 5 + "px"

	}

};

dhtmlXEditor.prototype.setReadonly = function(a) {

	this.conf.roMode = (a === true);

	this._prepareContent(true, this.conf.roMode);

	this.cBlock.style.display = (this.conf.roMode ? "" : "none")

};

dhtmlXEditor.prototype.isReadonly = function(a) {

	return (this.conf.roMode || false)

};

dhtmlXEditor.prototype.setSkin = function(a) {

	this.base.className = String(this.base.className).replace(

			new RegExp("dhxeditor_" + this.conf.skin), "dhxeditor_" + a);

	this.conf.skin = this.cell.conf.skin = a;

	if (this.tb) {

		this.cell.detachToolbar(a);

		this.tb = null;

		this.attachToolbar()

	}

	this.setSizes()

};

dhtmlXEditor.prototype._fontConf = function() {

	if (this.conf.skin == "") {

		var a = {

			family : this.conf.font.family,

			size : this.conf.font.size,

			color : this.conf.font.color

		}

	} else {

		var a = {

			family : "Roboto, Arial, Helvetica",

			size : "14px",

			color : "#404040"

		}

	}

	return window.dhx4.template(

			"font-size: #size#; font-family: #family#; color: #color#;", a)

};

window.dhtmlXEditorCell = function(c, a) {

	dhtmlXCellObject.apply(this, [ c, "_editor" ]);

	var b = this;

	this.editor = a;

	this.conf.skin = this.editor.conf.skin;

	this.attachEvent("_onCellUnload", function() {

		this._stbUnload();

		this.editor = null;

		b = null

	});

	this._stbInit();

	return this

};

dhtmlXEditorCell.prototype = new dhtmlXCellObject();

dhtmlXEditorCell.prototype._stbInit = function() {

	var h = this;

	var g = document.createElement("DIV");

	g.className = "dhx_cell_stb"

			+ (dhx4.isIE6 || dhx4.isIE7 || dhx4.isIE8 ? ""

					: " dhx_cell_stb_shadow");

	this.cell.insertBefore(g, this.cell.childNodes[this.conf.idx.cont]);

	g.onselectstart = function(a) {

		a = a || event;

		a.cancelBubble = true;

		if (a.preventDefault) {

			a.preventDefault()

		} else {

			a.returnValue = false

		}

		return false

	};

	var e = {

		bold : "applyBold",

		italic : "applyItalic",

		underline : "applyUnderscore",

		clearformat : "clearFormatting"

	};

	for ( var c in e) {

		var b = document.createElement("A");

		b.href = "javascript:void(0);";

		b.tabIndex = -1;

		g.appendChild(b);

		b.onmousedown = b.onclick = function(a) {

			a = a || event;

			if (a.preventDefault) {

				a.preventDefault()

			} else {

				a.returnValue = false

			}

			return false

		};

		var j = document.createElement("DIV");

		j.className = "dhx_cell_stb_button btn_" + c;

		j._actv = c.charAt(0);

		j._cmd = e[c];

		b.appendChild(j);

		j.onclick = function(a) {

			a = a || event;

			if (a.preventDefault) {

				a.preventDefault()

			} else {

				a.returnValue = false

			}

			return false

		};

		j.onmousedown = function(a) {

			a = a || event;

			if (a.preventDefault) {

				a.preventDefault()

			} else {

				a.returnValue = false

			}

			h.editor[this._cmd]();

			h.editor.callEvent("onToolbarClick", [ this._actv ])

		};

		j = b = null

	}

	g = null;

	this._stbUnload = function() {

		var a = this.cell.childNodes[this.conf.idx.stb];

		a.onselectstart = null;

		while (a.childNodes.length > 0) {

			a.lastChild.onmousedown = a.lastChild.onclick = null;

			a.lastChild.firstChild.onmousedown = a.lastChild.firstChild.onclick = null;

			a.lastChild.firstChild._actv = a.lastChild.firstChild._cmd = null;

			a.lastChild.removeChild(a.lastChild.firstChild);

			a.removeChild(a.lastChild)

		}

		a.parentNode.removeChild(a);

		a = h = null;

		this.conf.idx_data.stb = this.conf.ofs_nodes.t._getStbHeight = null;

		delete this.conf.ofs_nodes.t._getStbHeight;

		delete this.conf.idx_data.stb;

		this._updateIdx()

	};

	this.conf.stb_visible = true;

	this.conf.ofs_nodes.t._getStbHeight = "func";

	this.conf.idx_data.stb = "dhx_cell_stb";

	this._updateIdx()

};

dhtmlXEditorCell.prototype._stbHide = function() {

	this.cell.childNodes[this.conf.idx.stb].style.display = "none";

	this.conf.stb_visible = false

};

dhtmlXEditorCell.prototype._getStbHeight = function() {

	if (this.conf.stb_visible == true && this.conf.skin == "material") {

		if (this.conf.stb_height == null) {

			this.conf.stb_height = window.dhx4

					.readFromCss("dhxeditor_material stb_height_detect",

							"scrollHeight",

							"<div class='dhx_cell_editor'><div class='dhx_cell_stb'></div></div>")

		}

		return this.conf.stb_height

	}

	return this.cell.childNodes[this.conf.idx.stb].offsetHeight

};

dhtmlXCellObject.prototype.attachEditor = function(a) {

	this.callEvent("_onBeforeContentAttach", [ "editor" ]);

	var c = document.createElement("DIV");

	c.style.width = "100%";

	c.style.height = "100%";

	c.style.position = "relative";

	c.style.overflow = "hidden";

	this._attachObject(c);

	if (!(typeof (a) == "object" && a != null)) {

		a = {}

	}

	a.parent = c;

	this.dataType = "editor";

	this.dataObj = new dhtmlXEditor(a);

	c = null;

	a.parent = null;

	a = null;

	if (typeof (window.dhtmlXPortalCell) == "function"

			&& this instanceof window.dhtmlXPortalCell) {

		if (this.portal.conf.editor_ev == null) {

			var e = this.portal.attachEvent("onBeforeDrag", function(g) {

				if (this.cdata[g].dataType == "editor") {

					this.cdata[g].conf.editor_cont = this.cdata[g].dataObj

							.getContent()

				}

				return true

			});

			var b = this.portal.attachEvent("onDrop", function(g) {

				if (this.cdata[g].dataType == "editor") {

					this.cdata[g].dataObj

							.setContent(this.cdata[g].conf.editor_cont);

					this.cdata[g].dataObj._prepareContent(true);

					this.cdata[g].conf.editor_cont = null

				}

			});

			this.portal.conf.editor_ev = [ e, b ]

		}

		this.conf.editor_ev = this

				.attachEvent(

						"_onBeforeContentDetach",

						function() {

							this.detachEvent(this.conf.editor_ev);

							this.conf.editor_ev = null;

							if (this instanceof window.dhtmlXPortalCell) {

								var h = false;

								for ( var g in this.portal.cdata) {

									if (this.portal.cdata[g] != this

											&& this.portal.cdata[g].dataType == "editor") {

										h = true

									}

								}

								if (h == false) {

									for (var j = 0; j < this.portal.conf.editor_ev.length; j++) {

										this.portal

												.detachEvent(this.portal.conf.editor_ev[j])

									}

									this.portal.conf.editor_ev = null

								}

							}

						})

	}

	this.callEvent("_onContentAttach", []);

	return this.dataObj

};

dhtmlXEditor.prototype.attachToolbar = function(b) {

	if (this.tb != null) {

		return

	}

	if (b != null) {

		this.conf.iconsPath = b

	}

	this.cell._stbHide();

	this.tb = this.cell.attachToolbar({

		icons_path : this.conf.iconsPath + "/dhxeditor_"

				+ String(this.conf.skin).replace(/^dhx_/, "") + "/",

		skin : this.conf.skin

	});

	this.setSizes();

	var g = (this.conf.skin == "material" ? "png" : "gif");

	this._availFonts = new Array("Arial", "Arial Narrow", "Comic Sans MS",

			"Courier", "Georgia", "Impact", "Tahoma", "Times New Roman",

			"Verdana");

	this._initFont = this._availFonts[0];

	this._xmlFonts = "";

	for (var j = 0; j < this._availFonts.length; j++) {

		var e = String(this._availFonts[j]).replace(/\s/g, "_");

		this._xmlFonts += '<item type="button" id="applyFontFamily:'

				+ e

				+ '"><itemText><![CDATA[<img src="'

				+ this.tb.imagePath

				+ "font_"

				+ String(e).toLowerCase()

				+ "."

				+ g

				+ '" border="0" style="/*margin-top:1px;margin-bottom:1px;*/width:110px;height:16px;">]]></itemText></item>'

	}

	this._availSizes = {

		"1" : "8pt",

		"2" : "10pt",

		"3" : "12pt",

		"4" : "14pt",

		"5" : "18pt",

		"6" : "24pt",

		"7" : "36pt"

	};

	this._xmlSizes = "";

	for ( var c in this._availSizes) {

		this._xmlSizes += '<item type="button" id="applyFontSize:' + c + ":"

				+ this._availSizes[c] + '" text="' + this._availSizes[c]

				+ '"/>'

	}

	this.tbXML = '<toolbar><item id="applyH1" type="buttonTwoState" img="h1.'

			+ g

			+ '" imgdis="h4_dis.'

			+ g

			+ '" title="H1"/><item id="applyH2" type="buttonTwoState" img="h2.'

			+ g

			+ '" imgdis="h4_dis.'

			+ g

			+ '" title="H2"/><item id="applyH3" type="buttonTwoState" img="h3.'

			+ g

			+ '" imgdis="h4_dis.'

			+ g

			+ '" title="H3"/><item id="applyH4" type="buttonTwoState" img="h4.'

			+ g

			+ '" imgdis="h4_dis.'

			+ g

			+ '" title="H4"/><item id="separ01" type="separator"/><item id="applyBold" type="buttonTwoState" img="bold.'

			+ g

			+ '" imgdis="bold_dis.'

			+ g

			+ '" title="Bold Text"/><item id="applyItalic" type="buttonTwoState" img="italic.'

			+ g

			+ '" imgdis="italic_dis.'

			+ g

			+ '" title="Italic Text"/><item id="applyUnderscore" type="buttonTwoState" img="underline.'

			+ g

			+ '" imgdis="underline_dis.'

			+ g

			+ '" title="Underscore Text"/><item id="applyStrikethrough" type="buttonTwoState" img="strike.'

			+ g

			+ '" imgdis="strike_dis.'

			+ g

			+ '" title="Strikethrough Text"/><item id="separ02" type="separator"/><item id="alignLeft" type="buttonTwoState" img="align_left.'

			+ g

			+ '" imgdis="align_left_dis.'

			+ g

			+ '" title="Left Alignment"/><item id="alignCenter" type="buttonTwoState" img="align_center.'

			+ g

			+ '" imgdis="align_center_dis.'

			+ g

			+ '" title="Center Alignment"/><item id="alignRight" type="buttonTwoState" img="align_right.'

			+ g

			+ '" imgdis="align_right_dis.'

			+ g

			+ '" title="Right Alignment"/><item id="alignJustify" type="buttonTwoState" img="align_justify.'

			+ g

			+ '" title="Justified Alignment"/><item id="separ03" type="separator"/><item id="applySub" type="buttonTwoState" img="script_sub.'

			+ g

			+ '" imgdis="script_sub.'

			+ g

			+ '" title="Subscript"/><item id="applySuper" type="buttonTwoState" img="script_super.'

			+ g

			+ '" imgdis="script_super_dis.'

			+ g

			+ '" title="Superscript"/><item id="separ04" type="separator"/><item id="createNumList" type="button" img="list_number.'

			+ g

			+ '" imgdis="list_number_dis.'

			+ g

			+ '" title="Number List"/><item id="createBulList" type="button" img="list_bullet.'

			+ g

			+ '" imgdis="list_bullet_dis.'

			+ g

			+ '" title="Bullet List"/><item id="separ05" type="separator"/><item id="increaseIndent" type="button" img="indent_inc.'

			+ g

			+ '" imgdis="indent_inc_dis.'

			+ g

			+ '" title="Increase Indent"/><item id="decreaseIndent" type="button" img="indent_dec.'

			+ g

			+ '" imgdis="indent_dec_dis.'

			+ g

			+ '" title="Decrease Indent"/><item id="separ06" type="separator"/><item id="clearFormatting" type="button" img="clear.'

			+ g + '" title="Clear Formatting"/></toolbar>';

	this.tb.loadStruct(this.tbXML);

	this._checkAlign = function(a) {

		this.tb.setItemState("alignCenter", false);

		this.tb.setItemState("alignRight", false);

		this.tb.setItemState("alignJustify", false);

		this.tb.setItemState("alignLeft", false);

		if (a) {

			this.tb.setItemState(a, true)

		}

	};

	this._checkH = function(a) {

		this.tb.setItemState("applyH1", false);

		this.tb.setItemState("applyH2", false);

		this.tb.setItemState("applyH3", false);

		this.tb.setItemState("applyH4", false);

		if (a) {

			this.tb.setItemState(a, true)

		}

	};

	this._doOnFocusChanged = function(m) {

		if (!m.h1 && !m.h2 && !m.h3 && !m.h4) {

			var a = (String(m.fontWeight).search(/bold/i) != -1)

					|| (Number(m.fontWeight) >= 700);

			this.tb.setItemState("applyBold", a)

		} else {

			this.tb.setItemState("applyBold", false)

		}

		var l = "alignLeft";

		if (String(m.textAlign).search(/center/) != -1) {

			l = "alignCenter"

		}

		if (String(m.textAlign).search(/right/) != -1) {

			l = "alignRight"

		}

		if (String(m.textAlign).search(/justify/) != -1) {

			l = "alignJustify"

		}

		this.tb.setItemState(l, true);

		this._checkAlign(l);

		this.tb.setItemState("applyH1", m.h1);

		this.tb.setItemState("applyH2", m.h2);

		this.tb.setItemState("applyH3", m.h3);

		this.tb.setItemState("applyH4", m.h4);

		if (window._KHTMLrv) {

			m.sub = (m.vAlign == "sub");

			m.sup = (m.vAlign == "super")

		}

		this.tb.setItemState("applyItalic", (m.fontStyle == "italic"));

		this.tb.setItemState("applyStrikethrough", m.del);

		this.tb.setItemState("applySub", m.sub);

		this.tb.setItemState("applySuper", m.sup);

		this.tb.setItemState("applyUnderscore", m.u)

	};

	this._doOnToolbarClick = function(l) {

		var a = String(l).split(":");

		if (this[a[0]] != null) {

			if (typeof (this[a[0]]) == "function") {

				this[a[0]](a[1]);

				this.callEvent("onToolbarClick", [ l ])

			}

		}

	};

	this._doOnStateChange = function(l, a) {

		this[l]();

		switch (l) {

		case "alignLeft":

		case "alignCenter":

		case "alignRight":

		case "alignJustify":

			this._checkAlign(l);

			break;

		case "applyH1":

		case "applyH2":

		case "applyH3":

		case "applyH4":

			this._checkH(l);

			break

		}

		this.callEvent("onToolbarClick", [ l ])

	};

	this._doOnBeforeStateChange = function(l, a) {

		if ((l == "alignLeft" || l == "alignCenter" || l == "alignRight" || l == "alignJustify")

				&& a == true) {

			return false

		}

		return true

	};

	var h = this;

	this.tb.attachEvent("onClick", function(a) {

		h._doOnToolbarClick(a)

	});

	this.tb.attachEvent("onStateChange", function(l, a) {

		h._doOnStateChange(l, a)

	});

	this.tb.attachEvent("onBeforeStateChange", function(l, a) {

		return h._doOnBeforeStateChange(l, a)

	});

	this.applyBold = function() {

		this._runCommand("Bold")

	};

	this.applyItalic = function() {

		this._runCommand("Italic")

	};

	this.applyUnderscore = function() {

		this._runCommand("Underline")

	};

	this.applyStrikethrough = function() {

		this._runCommand("StrikeThrough")

	};

	this.alignLeft = function() {

		this._runCommand("JustifyLeft")

	};

	this.alignRight = function() {

		this._runCommand("JustifyRight")

	};

	this.alignCenter = function() {

		this._runCommand("JustifyCenter")

	};

	this.alignJustify = function() {

		this._runCommand("JustifyFull")

	};

	this.applySub = function() {

		this._runCommand("Subscript")

	};

	this.applySuper = function() {

		this._runCommand("Superscript")

	};

	this.applyH1 = function() {

		this._runCommand("FormatBlock", "<H1>")

	};

	this.applyH2 = function() {

		this._runCommand("FormatBlock", "<H2>")

	};

	this.applyH3 = function() {

		this._runCommand("FormatBlock", "<H3>")

	};

	this.applyH4 = function() {

		this._runCommand("FormatBlock", "<H4>")

	};

	this.createNumList = function() {

		this._runCommand("InsertOrderedList")

	};

	this.createBulList = function() {

		this._runCommand("InsertUnorderedList")

	};

	this.increaseIndent = function() {

		this._runCommand("Indent")

	};

	this.decreaseIndent = function() {

		this._runCommand("Outdent")

	};

	this.clearFormatting = function() {

		this._runCommand("RemoveFormat");

		this.tb.setItemState("applyBold", false);

		this.tb.setItemState("applyItalic", false);

		this.tb.setItemState("applyStrikethrough", false);

		this.tb.setItemState("applySub", false);

		this.tb.setItemState("applySuper", false);

		this.tb.setItemState("applyUnderscore", false);

		var a = this.getContent();

		a = a.replace(/<\/?h\d>/gi, "");

		this.setContent(a)

	}

};

dhtmlx.Group = {

	_init : function() {

		dhtmlx.assert(this.data, "DataStore required for grouping");

		this.data.attachEvent("onStoreLoad", dhtmlx.bind(function() {

			if (this._settings.group) {

				this.group(this._settings.group, false)

			}

		}, this));

		this.attachEvent("onBeforeRender", dhtmlx.bind(function(a) {

			if (this._settings.sort) {

				a.block();

				a.sort(this._settings.sort);

				a.unblock()

			}

		}, this));

		this.data.attachEvent("onClearAll", dhtmlx.bind(function() {

			this.data._not_grouped_order = this.data._not_grouped_pull = null

		}, this));

		this.attachEvent("onBeforeSort", dhtmlx.bind(function() {

			this._settings.sort = null

		}, this))

	},

	_init_group_data_event : function(b, a) {

		b.attachEvent("onClearAll", dhtmlx.bind(function() {

			this.ungroup(false);

			this.block();

			this.clearAll();

			this.unblock()

		}, a))

	},

	sum : function(b, a) {

		b = dhtmlx.Template.setter(b);

		a = a || this.data;

		var c = 0;

		a.each(function(e) {

			c += b(e) * 1

		});

		return c

	},

	min : function(c, b) {

		c = dhtmlx.Template.setter(c);

		b = b || this.data;

		var a = Infinity;

		b.each(function(e) {

			if (c(e) * 1 < a) {

				a = c(e) * 1

			}

		});

		return a * 1

	},

	max : function(c, b) {

		c = dhtmlx.Template.setter(c);

		b = b || this.data;

		var a = -Infinity;

		b.each(function(e) {

			if (c(e) * 1 > a) {

				a = c(e) * 1

			}

		});

		return a

	},

	_split_data_by : function(h) {

		var l = function(o, n) {

			o = dhtmlx.Template.setter(o);

			return o(n[0])

		};

		var m = dhtmlx.Template.setter(h.by);

		if (!h.map[m]) {

			h.map[m] = [ m, l ]

		}

		var c = {};

		var j = [];

		this.data.each(function(n) {

			var o = m(n);

			if (!c[o]) {

				j.push({

					id : o

				});

				c[o] = dhtmlx.toArray()

			}

			c[o].push(n)

		});

		for ( var a in h.map) {

			var g = (h.map[a][1] || l);

			if (typeof g != "function") {

				g = this[g]

			}

			for (var e = 0; e < j.length; e++) {

				j[e][a] = g.call(this, h.map[a][0], c[j[e].id])

			}

		}

		this.data._not_grouped_order = this.data.order;

		this.data._not_grouped_pull = this.data.pull;

		this.data.order = dhtmlx.toArray();

		this.data.pull = {};

		for (var e = 0; e < j.length; e++) {

			var b = this.data.id(j[e]);

			this.data.pull[b] = j[e];

			this.data.order.push(b)

		}

		this.callEvent("onStoreUpdated", [])

	},

	group : function(a, b) {

		this.ungroup(false);

		this._split_data_by(a);

		if (b !== false) {

			this.data.callEvent("onStoreUpdated", [])

		}

	},

	ungroup : function(a) {

		if (this.data._not_grouped_order) {

			this.data.order = this.data._not_grouped_order;

			this.data.pull = this.data._not_grouped_pull;

			this.data._not_grouped_pull = this.data._not_grouped_order = null

		}

		if (a !== false) {

			this.data.callEvent("onStoreUpdated", [])

		}

	},

	group_setter : function(a) {

		dhtmlx.assert(typeof a == "object", "Incorrect group value");

		dhtmlx.assert(a.by, "group.by is mandatory");

		dhtmlx.assert(a.map, "group.map is mandatory");

		return a

	},

	sort_setter : function(a) {

		if (typeof a != "object") {

			a = {

				by : a

			}

		}

		this._mergeSettings(a, {

			as : "string",

			dir : "asc"

		});

		return a

	}

};

dhtmlx.Date = {

	Locale : {

		month_full : [ "January", "February", "March", "April", "May", "June",

				"July", "August", "September", "October", "November",

				"December" ],

		month_short : [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",

				"Sep", "Oct", "Nov", "Dec" ],

		day_full : [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",

				"Friday", "Saturday" ],

		day_short : [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]

	},

	date_part : function(a) {

		a.setHours(0);

		a.setMinutes(0);

		a.setSeconds(0);

		a.setMilliseconds(0);

		return a

	},

	time_part : function(a) {

		return (a.valueOf() / 1000 - a.getTimezoneOffset() * 60) % 86400

	},

	week_start : function(b) {

		var a = b.getDay();

		if (this.config.start_on_monday) {

			if (a === 0) {

				a = 6

			} else {

				a--

			}

		}

		return this.date_part(this.add(b, -1 * a, "day"))

	},

	month_start : function(a) {

		a.setDate(1);

		return this.date_part(a)

	},

	year_start : function(a) {

		a.setMonth(0);

		return this.month_start(a)

	},

	day_start : function(a) {

		return this.date_part(a)

	},

	add : function(b, c, e) {

		var a = new Date(b.valueOf());

		switch (e) {

		case "day":

			a.setDate(a.getDate() + c);

			break;

		case "week":

			a.setDate(a.getDate() + 7 * c);

			break;

		case "month":

			a.setMonth(a.getMonth() + c);

			break;

		case "year":

			a.setYear(a.getFullYear() + c);

			break;

		case "hour":

			a.setHours(a.getHours() + c);

			break;

		case "minute":

			a.setMinutes(a.getMinutes() + c);

			break;

		default:

			return dhtmlx.Date["add_" + e](b, c, e)

		}

		return a

	},

	to_fixed : function(a) {

		if (a < 10) {

			return "0" + a

		}

		return a

	},

	copy : function(a) {

		return new Date(a.valueOf())

	},

	date_to_str : function(b, a) {

		b = b

				.replace(

						/%[a-zA-Z]/g,

						function(c) {

							switch (c) {

							case "%d":

								return '"+dhtmlx.Date.to_fixed(date.getDate())+"';

							case "%m":

								return '"+dhtmlx.Date.to_fixed((date.getMonth()+1))+"';

							case "%j":

								return '"+date.getDate()+"';

							case "%n":

								return '"+(date.getMonth()+1)+"';

							case "%y":

								return '"+dhtmlx.Date.to_fixed(date.getFullYear()%100)+"';

							case "%Y":

								return '"+date.getFullYear()+"';

							case "%D":

								return '"+dhtmlx.Date.Locale.day_short[date.getDay()]+"';

							case "%l":

								return '"+dhtmlx.Date.Locale.day_full[date.getDay()]+"';

							case "%M":

								return '"+dhtmlx.Date.Locale.month_short[date.getMonth()]+"';

							case "%F":

								return '"+dhtmlx.Date.Locale.month_full[date.getMonth()]+"';

							case "%h":

								return '"+dhtmlx.Date.to_fixed((date.getHours()+11)%12+1)+"';

							case "%g":

								return '"+((date.getHours()+11)%12+1)+"';

							case "%G":

								return '"+date.getHours()+"';

							case "%H":

								return '"+dhtmlx.Date.to_fixed(date.getHours())+"';

							case "%i":

								return '"+dhtmlx.Date.to_fixed(date.getMinutes())+"';

							case "%a":

								return '"+(date.getHours()>11?"pm":"am")+"';

							case "%A":

								return '"+(date.getHours()>11?"PM":"AM")+"';

							case "%s":

								return '"+dhtmlx.Date.to_fixed(date.getSeconds())+"';

							case "%W":

								return '"+dhtmlx.Date.to_fixed(dhtmlx.Date.getISOWeek(date))+"';

							default:

								return c

							}

						});

		if (a) {

			b = b.replace(/date\.get/g, "date.getUTC")

		}

		return new Function("date", 'return "' + b + '";')

	},

	str_to_date : function(g, c) {

		var h = "var temp=date.split(/[^0-9a-zA-Z]+/g);";

		var a = g.match(/%[a-zA-Z]/g);

		for (var b = 0; b < a.length; b++) {

			switch (a[b]) {

			case "%j":

			case "%d":

				h += "set[2]=temp[" + b + "]||1;";

				break;

			case "%n":

			case "%m":

				h += "set[1]=(temp[" + b + "]||1)-1;";

				break;

			case "%y":

				h += "set[0]=temp[" + b + "]*1+(temp[" + b + "]>50?1900:2000);";

				break;

			case "%g":

			case "%G":

			case "%h":

			case "%H":

				h += "set[3]=temp[" + b + "]||0;";

				break;

			case "%i":

				h += "set[4]=temp[" + b + "]||0;";

				break;

			case "%Y":

				h += "set[0]=temp[" + b + "]||0;";

				break;

			case "%a":

			case "%A":

				h += "set[3]=set[3]%12+((temp[" + b

						+ "]||'').toLowerCase()=='am'?0:12);";

				break;

			case "%s":

				h += "set[5]=temp[" + b + "]||0;";

				break

			}

		}

		var e = "set[0],set[1],set[2],set[3],set[4],set[5]";

		if (c) {

			e = " Date.UTC(" + e + ")"

		}

		return new Function("date", "var set=[0,0,1,0,0,0]; " + h

				+ " return new Date(" + e + ");")

	},

	getISOWeek : function(c) {

		if (!c) {

			return false

		}

		var b = c.getDay();

		if (b === 0) {

			b = 7

		}

		var e = new Date(c.valueOf());

		e.setDate(c.getDate() + (4 - b));

		var a = e.getFullYear();

		var h = Math

				.floor((e.getTime() - new Date(a, 0, 1).getTime()) / 86400000);

		var g = 1 + Math.floor(h / 7);

		return g

	},

	getUTCISOWeek : function(a) {

		return this.getISOWeek(a)

	}

};

dhtmlx.math = {};

dhtmlx.math._toHex = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A",

		"B", "C", "D", "E", "F" ];

dhtmlx.math.toHex = function(b, a) {

	b = parseInt(b, 10);

	str = "";

	while (b > 0) {

		str = this._toHex[b % 16] + str;

		b = Math.floor(b / 16)

	}

	while (str.length < a) {

		str = "0" + str

	}

	return str

};

dhtmlx.math.hexToDec = function(a) {

	return parseInt(a, 16)

};

dhtmlx.math.toRgb = function(c) {

	var h, e, a, j;

	if (typeof (c) != "string") {

		h = c[0];

		e = c[1];

		a = c[2]

	} else {

		if (c.indexOf("rgb") != -1) {

			j = c.substr(c.indexOf("(") + 1,

					c.lastIndexOf(")") - c.indexOf("(") - 1).split(",");

			h = j[0];

			e = j[1];

			a = j[2]

		} else {

			if (c.substr(0, 1) == "#") {

				c = c.substr(1)

			}

			h = this.hexToDec(c.substr(0, 2));

			e = this.hexToDec(c.substr(2, 2));

			a = this.hexToDec(c.substr(4, 2))

		}

	}

	h = (parseInt(h, 10) || 0);

	e = (parseInt(e, 10) || 0);

	a = (parseInt(a, 10) || 0);

	if (h < 0 || h > 255) {

		h = 0

	}

	if (e < 0 || e > 255) {

		e = 0

	}

	if (a < 0 || a > 255) {

		a = 0

	}

	return [ h, e, a ]

};

dhtmlx.math.hsvToRgb = function(l, x, u) {

	var j, n, e, c, w, a, m, o;

	j = Math.floor((l / 60)) % 6;

	n = l / 60 - j;

	e = u * (1 - x);

	c = u * (1 - n * x);

	w = u * (1 - (1 - n) * x);

	a = 0;

	m = 0;

	o = 0;

	switch (j) {

	case 0:

		a = u;

		m = w;

		o = e;

		break;

	case 1:

		a = c;

		m = u;

		o = e;

		break;

	case 2:

		a = e;

		m = u;

		o = w;

		break;

	case 3:

		a = e;

		m = c;

		o = u;

		break;

	case 4:

		a = w;

		m = e;

		o = u;

		break;

	case 5:

		a = u;

		m = e;

		o = c;

		break

	}

	a = Math.floor(a * 255);

	m = Math.floor(m * 255);

	o = Math.floor(o * 255);

	return [ a, m, o ]

};

dhtmlx.math.rgbToHsv = function(c, m, n) {

	var j, e, o, a, q, u, l, t;

	j = c / 255;

	e = m / 255;

	o = n / 255;

	var a = Math.min(j, e, o);

	var q = Math.max(j, e, o);

	l = 0;

	u = q == 0 ? 0 : (1 - a / q);

	t = q;

	if (q == a) {

		l = 0

	} else {

		if (q == j && e >= o) {

			l = 60 * (e - o) / (q - a) + 0

		} else {

			if (q == j && e < o) {

				l = 60 * (e - o) / (q - a) + 360

			} else {

				if (q == e) {

					l = 60 * (o - j) / (q - a) + 120

				} else {

					if (q == o) {

						l = 60 * (j - e) / (q - a) + 240

					}

				}

			}

		}

	}

	return [ l, u, t ]

};

if (!dhtmlx.presets) {

	dhtmlx.presets = {}

}

dhtmlx.presets.chart = {

	simple : {

		item : {

			borderColor : "#ffffff",

			color : "#2b7100",

			shadow : false,

			borderWidth : 2

		},

		line : {

			color : "#8ecf03",

			width : 2

		}

	},

	plot : {

		color : "#1293f8",

		item : {

			borderColor : "#636363",

			borderWidth : 1,

			color : "#ffffff",

			type : "r",

			shadow : false

		},

		line : {

			color : "#1293f8",

			width : 2

		}

	},

	diamond : {

		color : "#b64040",

		item : {

			borderColor : "#b64040",

			color : "#b64040",

			type : "d",

			radius : 3,

			shadow : true

		},

		line : {

			color : "#ff9000",

			width : 2

		}

	},

	point : {

		color : "#fe5916",

		disableLines : true,

		fill : false,

		disableItems : false,

		item : {

			color : "#feb916",

			borderColor : "#fe5916",

			radius : 2,

			borderWidth : 1,

			type : "r"

		},

		alpha : 1

	},

	line : {

		line : {

			color : "#3399ff",

			width : 2

		},

		item : {

			color : "#ffffff",

			borderColor : "#3399ff",

			radius : 2,

			borderWidth : 2,

			type : "d"

		},

		fill : false,

		disableItems : false,

		disableLines : false,

		alpha : 1

	},

	area : {

		fill : "#3399ff",

		line : {

			color : "#3399ff",

			width : 1

		},

		disableItems : true,

		alpha : 0.2,

		disableLines : false

	},

	round : {

		item : {

			radius : 3,

			borderColor : "#3f83ff",

			borderWidth : 1,

			color : "#3f83ff",

			type : "r",

			shadow : false,

			alpha : 0.6

		}

	},

	square : {

		item : {

			radius : 3,

			borderColor : "#447900",

			borderWidth : 2,

			color : "#69ba00",

			type : "s",

			shadow : false,

			alpha : 1

		}

	},

	column : {

		color : "RAINBOW",

		gradient : false,

		width : 45,

		radius : 0,

		alpha : 1,

		border : true

	},

	stick : {

		width : 5,

		gradient : false,

		color : "#67b5c9",

		radius : 2,

		alpha : 1,

		border : false

	},

	alpha : {

		color : "#b9a8f9",

		width : 70,

		gradient : "falling",

		radius : 0,

		alpha : 0.5,

		border : true

	}

};

dhtmlx.ui.Map = function(a) {

	this.name = "Map";

	this._id = "map_" + dhtmlx.uid();

	this._key = a;

	this._map = [];

	this._areas = []

};

dhtmlx.ui.Map.prototype = {

	addRect : function(c, b, a) {

		this._areas.push({

			index : a,

			points : b

		});

		this._createMapArea(c, "RECT", b, a)

	},

	addPoly : function(c, b, a) {

		this._createMapArea(c, "POLY", b, a)

	},

	_createMapArea : function(g, b, e, c) {

		var a = "";

		if (arguments.length == 4) {

			a = "userdata='" + c + "'"

		}

		this._map.push("<area " + this._key + "='" + g + "' shape='" + b

				+ "' coords='" + e.join() + "' " + a + "></area>")

	},

	addSector : function(a, n, m, j, g, c, e, h) {

		var l = [];

		l.push(j);

		l.push(Math.floor(g * e));

		for (var b = n; b < m; b += Math.PI / 18) {

			l.push(Math.floor(j + c * Math.cos(b)));

			l.push(Math.floor((g + c * Math.sin(b)) * e))

		}

		l.push(Math.floor(j + c * Math.cos(m)));

		l.push(Math.floor((g + c * Math.sin(m)) * e));

		l.push(j);

		l.push(Math.floor(g * e));

		return this.addPoly(a, l, h)

	},

	render : function(a) {

		var c = dhtmlx.html.create("DIV");

		c.style.cssText = "position:absolute; width:100%; height:100%; top:0px; left:0px;";

		a.appendChild(c);

		var b = dhtmlx._isIE ? ""

				: "src='data:image/gif;base64,R0lGODlhEgASAIAAAP///////yH5BAUUAAEALAAAAAASABIAAAIPjI+py+0Po5y02ouz3pwXADs='";

		c.innerHTML = "<map id='" + this._id + "' name='" + this._id + "'>"

				+ this._map.join("\n") + "</map><img " + b

				+ " class='dhx_map_img' usemap='#" + this._id

				+ "' onmousedown='return false;'>";

		a._htmlmap = c;

		this._map = []

	}

};

dhtmlx.chart = {};

dhtmlx.chart.scatter = {

	pvt_render_scatter : function(n, h, m, l, j, a) {

		if (!this._settings.xValue) {

			return dhtmlx.log("warning", "Undefined propery: xValue")

		}

		var c = this._getLimits();

		var g = this._getLimits("h", "xValue");

		if (!j) {

			if (!this.canvases.x) {

				this.canvases.x = new dhtmlx.ui.Canvas(this._obj, "axis_x")

			}

			if (!this.canvases.y) {

				this.canvases.y = new dhtmlx.ui.Canvas(this._obj, "axis_y")

			}

			this._drawYAxis(this.canvases.y.getCanvas(), h, m, l, c.min, c.max);

			this

					._drawHXAxis(this.canvases.x.getCanvas(), h, m, l, g.min,

							g.max)

		}

		c = {

			min : this._settings.yAxis.start,

			max : this._settings.yAxis.end

		};

		g = {

			min : this._settings.xAxis.start,

			max : this._settings.xAxis.end

		};

		var b = this._getScatterParams(n, h, m, l, g, c);

		this._mapStart = m;

		for (var e = 0; e < h.length; e++) {

			this._drawScatterItem(n, a, m, l, b, g, c, h[e], j)

		}

	},

	_getScatterParams : function(a, e, c, b, j, h) {

		var g = {};

		g.totalHeight = b.y - c.y;

		g.totalWidth = b.x - c.x;

		this._calcScatterUnit(g, j.min, j.max, g.totalWidth, "X");

		this._calcScatterUnit(g, h.min, h.max, g.totalHeight, "Y");

		return g

	},

	_drawScatterItem : function(o, a, m, l, c, g, e, h, j) {

		var b = this._calculateScatterItemPosition(c, l, m, g, h, "X");

		var n = this._calculateScatterItemPosition(c, m, l, e, h, "Y");

		this._drawItem(o, b, n, h, this._settings.label.call(this, h), j, a)

	},

	_calculateScatterItemPosition : function(c, l, j, a, g, b) {

		var n = this._settings[b == "X" ? "xValue" : "value"].call(this, g);

		var e = c["valueFactor" + b];

		var o = (parseFloat(n || 0) - a.min) * e;

		var m = c["unit" + b];

		var h = j[b.toLowerCase()] - (b == "X" ? (-1) : 1) * Math.floor(m * o);

		if (o < 0) {

			h = j[b.toLowerCase()]

		}

		if (n > a.max) {

			h = l[b.toLowerCase()]

		}

		if (n < a.min) {

			h = j[b.toLowerCase()]

		}

		return h

	},

	_calcScatterUnit : function(h, c, a, b, e) {

		var g = this._getRelativeValue(c, a);

		e = (e || "");

		h["relValue" + e] = g[0];

		h["valueFactor" + e] = g[1];

		h["unit" + e] = (h["relValue" + e] ? b / h["relValue" + e] : 10)

	}

};

dhtmlx.chart.radar = {

	pvt_render_radar : function(b, e, a, h, c, g) {

		this._renderRadarChart(b, e, a, h, c, g)

	},

	_renderRadarChart : function(r, g, o, n, m, a) {

		if (!g.length) {

			return

		}

		var j = this._getPieParameters(o, n);

		var l = (this._settings.radius ? this._settings.radius : j.radius);

		var b = (this._settings.x ? this._settings.x : j.x);

		var q = (this._settings.y ? this._settings.y : j.y);

		var c = [];

		for (var e = 0; e < g.length; e++) {

			c.push(1)

		}

		var h = this._getRatios(c, g.length);

		this._mapStart = o;

		if (!m) {

			this._drawRadarAxises(h, b, q, l, g)

		}

		this._drawRadarData(r, h, b, q, l, g, m, a)

	},

	_drawRadarData : function(v, q, l, j, g, J, w, I) {

		var u, s, H, E, z, D, e, c, A, F, C, r, b, t, n, m, a, o, h;

		H = this._settings;

		z = H.yAxis.start;

		D = H.yAxis.end;

		h = this._getRelativeValue(z, D);

		r = h[0];

		o = (r ? g / r : g / 2);

		a = h[1];

		b = -Math.PI / 2;

		u = s = b;

		A = [];

		c = 0;

		for (E = 0; E < J.length; E++) {

			if (!m) {

				t = H.value(J[E]);

				n = (parseFloat(t || 0) - z) * a

			} else {

				n = m

			}

			F = Math.floor(o * n);

			t = H.value((E != (J.length - 1)) ? J[E + 1] : J[0]);

			m = (parseFloat(t || 0) - z) * a;

			C = Math.floor(o * m);

			u = s;

			s = ((E != (J.length - 1)) ? (b + q[E] - 0.0001) : b);

			e = (c || this._getPositionByAngle(u, l, j, F));

			c = this._getPositionByAngle(s, l, j, C);

			A.push(e)

		}

		if (H.fill) {

			this._fillRadarChart(v, A, J)

		}

		if (!H.disableLines) {

			this._strokeRadarChart(v, A, J)

		}

		if (!H.disableItems) {

			this._drawRadarItemMarkers(v, A, J, w, I)

		}

		A = null

	},

	_drawRadarItemMarkers : function(a, c, g, e, h) {

		for (var b = 0; b < c.length; b++) {

			this._drawItem(a, c[b].x, c[b].y, g[b], this._settings.label.call(

					this, g), e, h)

		}

	},

	_fillRadarChart : function(a, e, h) {

		var g, c;

		a.globalAlpha = this._settings.alpha.call(this, {});

		a.beginPath();

		for (var b = 0; b < e.length; b++) {

			a.fillStyle = this._settings.fill.call(this, h[b]);

			g = e[b];

			c = (e[b + 1] || e[0]);

			if (!b) {

				a.moveTo(g.x, g.y)

			}

			a.lineTo(c.x, c.y)

		}

		a.fill();

		a.globalAlpha = 1

	},

	_strokeRadarChart : function(a, e, h) {

		var g, c;

		for (var b = 0; b < e.length; b++) {

			g = e[b];

			c = (e[b + 1] || e[0]);

			this._drawLine(a, g.x, g.y, c.x, c.y, this._settings.line.color

					.call(this, h[b]), this._settings.line.width)

		}

	},

	_drawRadarAxises : function(v, t, s, l, L) {

		var a = this._settings.yAxis;

		var e = this._settings.xAxis;

		var m = a.start;

		var h = a.end;

		var o = a.step;

		var w = {};

		var K = this._configYAxis;

		if (typeof K.step == "undefined" || typeof K.start == "undefined"

				|| typeof K.end == "undefined") {

			var q = this._getLimits();

			w = this._calculateScale(q.min, q.max);

			m = w.start;

			h = w.end;

			o = w.step;

			a.end = h;

			a.start = m

		}

		var E = [];

		var I, H, z;

		var J = 0;

		var b = l * o / (h - m);

		var r, u;

		if (o < 1) {

			r = Math.min(this._log10(o), (m <= 0 ? 0 : this._log10(m)));

			u = Math.pow(10, -r)

		}

		var F = [];

		if (!this.canvases.scale) {

			this.canvases.scale = new dhtmlx.ui.Canvas(this._obj, "radar_scale")

		}

		var D = this.canvases.scale.getCanvas();

		for (I = h; I >= m; I -= o) {

			if (w.fixNum) {

				I = parseFloat((new Number(I)).toFixed(w.fixNum))

			}

			E.push(Math.floor(J * b) + 0.5);

			if (u) {

				I = Math.round(I * u) / u

			}

			var n = s - l + E[E.length - 1];

			this.canvases.scale.renderTextAt("middle", "left", t, n, a

					.template(I.toString()), "dhx_axis_item_y dhx_radar");

			if (v.length < 2) {

				this._drawScaleSector(D, "arc", t, s, l - E[E.length - 1],

						-Math.PI / 2, 3 * Math.PI / 2, I);

				return

			}

			var g = -Math.PI / 2;

			var C = g;

			var A;

			for (H = 0; H < v.length; H++) {

				if (I == h) {

					F.push(C)

				}

				A = g + v[H] - 0.0001;

				this._drawScaleSector(D, (K.lineShape || "line"), t, s, l

						- E[E.length - 1], C, A, I, H, L[I]);

				C = A

			}

			J++

		}

		for (I = 0; I < F.length; I++) {

			z = this._getPositionByAngle(F[I], t, s, l);

			if (e.lines.call(this, L[I], I)) {

				this._drawLine(D, t, s, z.x, z.y, (e ? e.lineColor.call(this,

						L[I]) : "#cfcfcf"), 1)

			}

			this._drawRadarScaleLabel(D, t, s, l, F[I], (e ? e.template.call(

					this, L[I]) : "&nbsp;"))

		}

	},

	_drawScaleSector : function(r, h, q, n, g, b, a, e, c) {

		var o, m;

		if (g < 0) {

			return false

		}

		o = this._getPositionByAngle(b, q, n, g);

		m = this._getPositionByAngle(a, q, n, g);

		var l = this._settings.yAxis;

		if (l.bg) {

			r.beginPath();

			r.moveTo(q, n);

			if (h == "arc") {

				r.arc(q, n, g, b, a, false)

			} else {

				r.lineTo(o.x, o.y);

				r.lineTo(m.x, m.y)

			}

			r.fillStyle = l.bg(e, c);

			r.moveTo(q, n);

			r.fill();

			r.closePath()

		}

		if (l.lines.call(this, e)) {

			r.lineWidth = 1;

			r.beginPath();

			if (h == "arc") {

				r.arc(q, n, g, b, a, false)

			} else {

				r.moveTo(o.x, o.y);

				r.lineTo(m.x, m.y)

			}

			r.strokeStyle = l.lineColor.call(this, e);

			r.stroke()

		}

	},

	_drawRadarScaleLabel : function(u, m, j, b, l, q) {

		var s = this.canvases.scale.renderText(0, 0, q, "dhx_axis_radar_title",

				1);

		var c = s.scrollWidth;

		var o = s.offsetHeight;

		var n = 0.001;

		var h = this._getPositionByAngle(l, m, j, b + 5);

		var g = 0, e = 0;

		if (l < 0 || l > Math.PI) {

			e = -o

		}

		if (l > Math.PI / 2) {

			g = -c

		}

		if (Math.abs(l + Math.PI / 2) < n || Math.abs(l - Math.PI / 2) < n) {

			g = -c / 2

		} else {

			if (Math.abs(l) < n || Math.abs(l - Math.PI) < n) {

				e = -o / 2

			}

		}

		s.style.top = h.y + e + "px";

		s.style.left = h.x + g + "px";

		s.style.width = c + "px";

		s.style.whiteSpace = "nowrap"

	}

};

dhtmlx.chart.area = {

	pvt_render_area : function(l, z, g, e, m, w) {

		var o, v, q, n, h, u, j, y, x, t, s, b, r, a, c;

		u = this._calculateLineParams(l, z, g, e, m);

		v = this._settings;

		n = (v.eventRadius || Math.floor(u.cellWidth / 2));

		if (z.length) {

			j = [];

			t = (!v.offset ? g.x : g.x + u.cellWidth * 0.5);

			for (q = 0; q < z.length; q++) {

				h = z[q];

				x = this._getPointY(h, g, e, u);

				r = t + u.cellWidth * q;

				if (x) {

					a = (typeof x == "object" ? x.y0 : x);

					if (q && this._settings.fixOverflow) {

						y = this._getPointY(z[q - 1], g, e, u);

						if (y.out && y.out == x.out) {

							continue

						}

						s = u.cellWidth * (q - 1) - 0.5 + t;

						b = (typeof y == "object" ? y.y0 : y);

						if (y.out) {

							c = (y.out == "min" ? e.y : g.y);

							j.push([ this._calcOverflowX(s, r, b, a, c), c ])

						}

						if (x.out) {

							c = (x.out == "min" ? e.y : g.y);

							j.push([ this._calcOverflowX(s, r, b, a, c), c ]);

							if (q == (z.length - 1) && c == g.y) {

								j.push([ r, g.y ])

							}

						}

					}

					if (!x.out) {

						j.push([ r, a ]);

						w.addRect(h.id, [ r - n - g.x, a - n - g.y,

								r + n - g.x, a + n - g.y ], m)

					}

					if (!v.yAxis) {

						o = (!v.offset && (q == z.length - 1) ? "left"

								: "center");

						this.canvases[m].renderTextAt(false, o, r, a

								- v.labelOffset, v.label(h))

					}

				}

			}

			if (j.length) {

				j.push([ r, e.y ]);

				j.push([ j[0][0], e.y ])

			}

			l.globalAlpha = this._settings.alpha.call(this, z[0]);

			l.fillStyle = this._settings.color.call(this, z[0]);

			l.beginPath();

			this._path(l, j);

			l.fill();

			if (v.border) {

				l.lineWidth = v.borderWidth || 1;

				if (v.borderColor) {

					l.strokeStyle = v.borderColor.call(this, z[0])

				} else {

					this._setBorderStyles(l, l.fillStyle)

				}

				l.beginPath();

				this._path(l, j);

				l.stroke()

			}

			l.lineWidth = 1;

			l.globalAlpha = 1

		}

	}

};

dhtmlx.chart.stackedArea = {

	pvt_render_stackedArea : function(n, C, b, a, o, z) {

		var E, D, s, w, u, t, g, r, h, v, m, e, c, l;

		v = this._calculateLineParams(n, C, b, a, o);

		w = this._settings;

		r = (w.eventRadius || Math.floor(v.cellWidth / 2));

		if (C.length) {

			m = [];

			l = [];

			e = (!w.offset ? b.x : b.x + v.cellWidth * 0.5);

			var A = function(j, x) {

				return o ? (C[j].$startY ? x - a.y + C[j].$startY : 0) : x

			};

			var q = function(j, H, F) {

				var y = (F.y - H.y) / (F.x - H.x);

				return y * j + H.y - y * H.x

			};

			for (u = 0; u < C.length; u++) {

				h = C[u];

				if (!u) {

					c = A(u, a.y);

					m.push([ e, c ])

				} else {

					e += v.cellWidth

				}

				c = A(u, this._getPointY(h, b, a, v));

				l.push((isNaN(c) && !u) ? (C[u].$startY || a.y) : c);

				if (c) {

					m.push([ e, c ]);

					z.addRect(h.id, [ e - r - b.x, c - r - b.y, e + r - b.x,

							c + r - b.y ], o);

					if (!w.yAxis) {

						s = (!w.offset && g ? "left" : "center");

						this.canvases[o].renderTextAt(false, s, e, c

								- w.labelOffset, w.label(h))

					}

				}

			}

			m.push([ e, A(u - 1, a.y) ]);

			if (o) {

				for (u = C.length - 2; u > 0; u--) {

					e -= v.cellWidth;

					c = C[u].$startY;

					if (c) {

						m.push([ e, c ])

					}

				}

			}

			m.push([ m[0][0], m[0][1] ]);

			n.globalAlpha = this._settings.alpha.call(this, C[0]);

			n.fillStyle = this._settings.color.call(this, C[0]);

			n.beginPath();

			this._path(n, m);

			n.fill();

			for (u = 0; u < C.length; u++) {

				c = l[u];

				if (!c) {

					if (u == C.length - 1) {

						c = C[u].$startY

					}

					for (t = u + 1; t < C.length; t++) {

						if (l[t]) {

							E = {

								x : b.x,

								y : l[0]

							};

							D = {

								x : (b.x + v.cellWidth * t),

								y : l[t]

							};

							c = q(b.x + v.cellWidth * u, E, D);

							break

						}

					}

				}

				C[u].$startY = c

			}

		}

	}

};

dhtmlx.chart.spline = {

	pvt_render_spline : function(n, D, e, c, o, C) {

		var A, r, m, q, z, l, h, u, t, s, g, b, a;

		z = this._calculateLineParams(n, D, e, c, o);

		A = this._settings;

		this._mapStart = e;

		m = [];

		if (D.length) {

			u = (A.offset ? e.x + z.cellWidth * 0.5 : e.x);

			for (r = 0; r < D.length; r++) {

				g = this._getPointY(D[r], e, c, z);

				if (g) {

					h = ((!r) ? u : z.cellWidth * r - 0.5 + u);

					m.push({

						x : h,

						y : g,

						index : r

					})

				}

			}

			l = this._getSplineParameters(m);

			for (r = 0; r < m.length; r++) {

				t = m[r].x;

				b = m[r].y;

				if (r < m.length - 1) {

					s = m[r + 1].x;

					a = m[r + 1].y;

					for (q = t; q < s; q++) {

						var w = this._getSplineYPoint(q, t, r, l.a, l.b, l.c,

								l.d);

						if (w < e.y) {

							w = e.y

						}

						if (w > c.y) {

							w = c.y

						}

						var v = this._getSplineYPoint(q + 1, t, r, l.a, l.b,

								l.c, l.d);

						if (v < e.y) {

							v = e.y

						}

						if (v > c.y) {

							v = c.y

						}

						this._drawLine(n, q, w, q + 1, v, A.line.color(D[r]),

								A.line.width)

					}

					this._drawLine(n, s - 1, this._getSplineYPoint(q, t, r,

							l.a, l.b, l.c, l.d), s, a, A.line.color(D[r]),

							A.line.width)

				}

				this._drawItem(n, t, b, D[m[r].index], A.label(D[m[r].index]),

						o, C)

			}

		}

	},

	_getSplineParameters : function(w) {

		var j, y, x, z, t, r, q, o, l = [], g = [], e = w.length;

		for (j = 0; j < e - 1; j++) {

			l[j] = w[j + 1].x - w[j].x;

			g[j] = (w[j + 1].y - w[j].y) / l[j]

		}

		y = [];

		x = [];

		y[0] = 0;

		y[1] = 2 * (l[0] + l[1]);

		x[0] = 0;

		x[1] = 6 * (g[1] - g[0]);

		for (j = 2; j < e - 1; j++) {

			y[j] = 2 * (l[j - 1] + l[j]) - l[j - 1] * l[j - 1] / y[j - 1];

			x[j] = 6 * (g[j] - g[j - 1]) - l[j - 1] * x[j - 1] / y[j - 1]

		}

		z = [];

		z[e - 1] = z[0] = 0;

		for (j = e - 2; j >= 1; j--) {

			z[j] = (x[j] - l[j] * z[j + 1]) / y[j]

		}

		t = [];

		r = [];

		q = [];

		o = [];

		for (j = 0; j < e - 1; j++) {

			t[j] = w[j].y;

			r[j] = -l[j] * z[j + 1] / 6 - l[j] * z[j] / 3

					+ (w[j + 1].y - w[j].y) / l[j];

			q[j] = z[j] / 2;

			o[j] = (z[j + 1] - z[j]) / (6 * l[j])

		}

		return {

			a : t,

			b : r,

			c : q,

			d : o

		}

	},

	_getSplineYPoint : function(g, j, l, h, e, n, m) {

		return h[l] + (g - j) * (e[l] + (g - j) * (n[l] + (g - j) * m[l]))

	}

};

dhtmlx.chart.barH = {

	pvt_render_barH : function(x, L, j, h, y, K) {

		var q, s, A, z, a, D, n, I, t, J, b, v, l, E, u, g, w, r, H, e, o;

		A = (h.y - j.y) / L.length;

		n = this._getLimits("h");

		I = n.max;

		t = n.min;

		g = h.x - j.x;

		o = !!this._settings.yAxis;

		if (!y) {

			this._drawHScales(x, L, j, h, t, I, A)

		}

		if (o) {

			I = parseFloat(this._settings.xAxis.end);

			t = parseFloat(this._settings.xAxis.start)

		}

		E = this._getRelativeValue(t, I);

		v = E[0];

		b = E[1];

		r = (v ? g / v : 10);

		if (!o) {

			u = 10;

			r = (v ? (g - u) / v : 10)

		}

		s = parseInt(this._settings.width, 10);

		var F = this._series.length;

		var m = this._settings.seriesMargin;

		var c = this._settings.seriesPadding;

		if (this._series && (s * F + c + (F > 2 ? m * F : 0) > A)) {

			s = A / F - c - (F > 2 ? m : 0)

		}

		q = (A - s * F - m * (F - 1)) / 2;

		if (this._settings.border) {

			s = parseInt(s, 10);

			q = parseInt(q, 10)

		}

		l = (typeof this._settings.radius != "undefined" ? parseInt(

				this._settings.radius, 10) : Math.round(s / 5));

		J = false;

		a = this._settings.gradient;

		if (a && typeof (a) != "function") {

			J = a;

			a = false

		} else {

			if (a) {

				a = x.createLinearGradient(j.x, j.y, h.x, j.y);

				this._settings.gradient(a)

			}

		}

		if (!o) {

			this._drawLine(x, j.x - 0.5, j.y, j.x - 0.5, h.y, "#000000", 1)

		}

		for (D = 0; D < L.length; D++) {

			w = parseFloat(this._settings.value(L[D] || 0));

			if (w > I) {

				w = I

			}

			w -= t;

			w *= b;

			H = j.x;

			e = j.y + q + (F > 2 ? m * y : 0) + parseInt(D * A, 10) + s * y;

			if ((w < 0 && this._settings.origin == "auto")

					|| (this._settings.xAxis && w === 0 && !(this._settings.origin != "auto" && this._settings.origin > t))) {

				this.canvases[y].renderTextAt("middle", "right", H + 10, e + s

						/ 2 + q, this._settings.label(L[D]));

				continue

			}

			if (w < 0 && this._settings.origin != "auto"

					&& this._settings.origin > t) {

				w = 0

			}

			if (!o) {

				w += u / r

			}

			z = a || this._settings.color.call(this, L[D]);

			if (this._settings.border) {

				this._drawBarHBorder(x, H, e, s, t, l, r, w, z)

			}

			x.globalAlpha = this._settings.alpha.call(this, L[D]);

			var C = this._drawBarH(x, h, H, e, s, t, l, r, w, z, a, J);

			if (J != false) {

				this._drawBarHGradient(x, H, e, s, t, l, r, w, z, J)

			}

			x.globalAlpha = 1;

			if (C[3] == e) {

				this.canvases[y].renderTextAt("middle", "left", C[0] - 5, C[3]

						+ Math.floor(s / 2), this._settings.label(L[D]));

				K.addRect(L[D].id, [ C[0] - j.x, C[3] - j.y, C[2] - j.x,

						C[3] + s - j.y ], y)

			} else {

				this.canvases[y].renderTextAt("middle", false, C[2] + 5, C[1]

						+ Math.floor(s / 2), this._settings.label(L[D]));

				K.addRect(L[D].id, [ C[0] - j.x, e - j.y, C[2] - j.x,

						C[3] - j.y ], y)

			}

		}

	},

	_setBarHPoints : function(t, e, r, u, j, s, q, h, g) {

		var b = 0;

		if (j > s * q) {

			var o = (j - s * q) / j;

			b = -Math.asin(o) + Math.PI / 2

		}

		t.moveTo(e, r + h);

		var c = e + s * q - j - (j ? 0 : h);

		if (j < s * q) {

			t.lineTo(c, r + h)

		}

		var n = r + j;

		if (j && j > 0) {

			t.arc(c, n, j - h, -Math.PI / 2 + b, 0, false)

		}

		var m = r + u - j - (j ? 0 : h);

		var a = c + j - (j ? h : 0);

		t.lineTo(a, m);

		if (j && j > 0) {

			t.arc(c, m, j - h, 0, Math.PI / 2 - b, false)

		}

		var l = r + u - h;

		t.lineTo(e, l);

		if (!g) {

			t.lineTo(e, r + h)

		}

		return [ a, l ]

	},

	_drawHScales : function(c, j, h, g, l, b, e) {

		var a = 0;

		if (this._settings.xAxis) {

			if (!this.canvases.x) {

				this.canvases.x = new dhtmlx.ui.Canvas(this._obj)

			}

			a = this._drawHXAxis(this.canvases.x.getCanvas(), j, h, g, l, b)

		}

		if (this._settings.yAxis) {

			if (!this.canvases.y) {

				this.canvases.y = new dhtmlx.ui.Canvas(this._obj)

			}

			this._drawHYAxis(this.canvases.y.getCanvas(), j, h, g, e, a)

		}

	},

	_drawHYAxis : function(q, g, m, j, c, a) {

		if (!this._settings.yAxis) {

			return

		}

		var h;

		var b = parseInt((a ? a : m.x), 10) - 0.5;

		var n = j.y + 0.5;

		var l = m.y;

		this._drawLine(q, b, n, b, l, this._settings.yAxis.color, 1);

		for (var e = 0; e < g.length; e++) {

			var o = ((this._settings.origin != "auto")

					&& (this._settings.view == "barH") && (parseFloat(this._settings

					.value(g[e])) < this._settings.origin));

			h = l + c / 2 + e * c;

			this.canvases.y.renderTextAt("middle", (o ? false : "left"),

					(o ? b + 5 : b - 5), h,

					this._settings.yAxis.template(g[e]), "dhx_axis_item_y",

					(o ? 0 : b - 10));

			if (this._settings.yAxis.lines.call(this, g[e])) {

				this._drawLine(q, m.x, h, j.x, h,

						this._settings.yAxis.lineColor.call(this, g[e]), 1)

			}

		}

		this._drawLine(q, m.x + 0.5, l + 0.5, j.x, l + 0.5,

				this._settings.yAxis.lineColor.call(this, {}), 1);

		this._setYAxisTitle(m, j)

	},

	_drawHXAxis : function(u, z, h, g, l, j) {

		var m;

		var s = {};

		var b = this._settings.xAxis;

		if (!b) {

			return

		}

		var e = g.y + 0.5;

		var x = h.x - 0.5;

		var w = g.x - 0.5;

		var r = h.x;

		this._drawLine(u, x, e, w, e, b.color, 1);

		if (b.step) {

			m = parseFloat(b.step)

		}

		if (typeof this._configXAxis.step == "undefined"

				|| typeof this._configXAxis.start == "undefined"

				|| typeof this._configXAxis.end == "undefined") {

			s = this._calculateScale(l, j);

			l = s.start;

			j = s.end;

			m = s.step;

			this._settings.xAxis.end = j;

			this._settings.xAxis.start = l;

			this._settings.xAxis.step = m

		}

		if (m === 0) {

			return

		}

		var a = (w - x) * m / (j - l);

		var y = 0;

		for (var v = l; v <= j; v += m) {

			if (s.fixNum) {

				v = parseFloat((new Number(v)).toFixed(s.fixNum))

			}

			var t = Math.floor(x + y * a) + 0.5;

			if (!(v == l && this._settings.origin == "auto")

					&& b.lines.call(this, v)) {

				this._drawLine(u, t, e, t, h.y, this._settings.xAxis.lineColor

						.call(this, v), 1)

			}

			if (v == this._settings.origin) {

				r = t + 1

			}

			var n = v;

			if (m < 1) {

				var o = Math.min(this._log10(m), (l <= 0 ? 0 : this._log10(l)));

				var q = Math.pow(10, -o);

				n = Math.round(v * q) / q

			}

			this.canvases.x.renderTextAt(false, true, t, e + 2, b.template(n

					.toString()), "dhx_axis_item_x");

			y++

		}

		this.canvases.x.renderTextAt(true, false, x, g.y

				+ this._settings.padding.bottom - 3,

				this._settings.xAxis.title, "dhx_axis_title_x", g.x - h.x);

		if (!b.lines.call(this, {})) {

			this._drawLine(u, x, h.y - 0.5, w, h.y - 0.5,

					this._settings.xAxis.color, 0.2)

		}

		return r

	},

	_correctBarHParams : function(l, g, c, h, j, m, e) {

		var a = this._settings.yAxis;

		var b = g;

		if (!!a && this._settings.origin != "auto"

				&& (this._settings.origin > e)) {

			g += (this._settings.origin - e) * j;

			b = g;

			h = h - (this._settings.origin - e);

			if (h < 0) {

				h *= (-1);

				l.translate(g, c + m);

				l.rotate(Math.PI);

				g = 0.5;

				c = 0

			}

			g += 0.5

		}

		return {

			value : h,

			x0 : g,

			y0 : c,

			start : b

		}

	},

	_drawBarH : function(r, g, w, e, m, n, h, l, q, s, a, j) {

		var t;

		r.save();

		var o = this._correctBarHParams(r, w, e, q, l, m, n);

		r.fillStyle = s;

		r.beginPath();

		if (l * o.value > 0) {

			t = this._setBarHPoints(r, o.x0, o.y0, m, h, l, o.value,

					(this._settings.border ? 1 : 0));

			if (a && !j) {

				r.lineTo(g.x, o.y0 + (this._settings.border ? 1 : 0))

			}

		} else {

			t = [ o.x0, o.y0 + 1 ]

		}

		r.fill();

		r.restore();

		var c = o.y0;

		var b = (o.y0 != e ? e : t[1]);

		var v = (o.y0 != e ? (o.start - t[0]) : o.start);

		var u = (o.y0 != e ? o.start : t[0]);

		return [ v, c, u, b ]

	},

	_drawBarHBorder : function(m, b, j, n, g, e, l, h, c) {

		m.save();

		var a = this._correctBarHParams(m, b, j, h, l, n, g);

		m.beginPath();

		this._setBorderStyles(m, c);

		m.globalAlpha = 0.9;

		if (l * a.value > 0) {

			this._setBarHPoints(m, a.x0, a.y0, n, e, l, a.value,

					m.lineWidth / 2, 1)

		}

		m.stroke();

		m.restore()

	},

	_drawBarHGradient : function(o, c, m, q, j, h, n, l, e, a) {

		o.save();

		var b = this._correctBarHParams(o, c, m, l, n, q, j);

		var g = this._setBarGradient(o, b.x0, b.y0 + q, b.x0 + n * b.value,

				b.y0, a, e, "x");

		o.fillStyle = g.gradient;

		o.beginPath();

		if (n * b.value > 0) {

			this._setBarHPoints(o, b.x0, b.y0 + g.offset, q - g.offset * 2, h,

					n, b.value, g.offset)

		}

		o.fill();

		o.globalAlpha = 1;

		o.restore()

	}

};

dhtmlx.assert(dhtmlx.chart.barH);

dhtmlx.chart.stackedBarH = {

	pvt_render_stackedBarH : function(x, L, g, e, y, K) {

		var J, s;

		var b;

		var t;

		var v = e.x - g.x;

		var l = !!this._settings.yAxis;

		var j = this._getStackedLimits(L);

		J = j.max;

		s = j.min;

		var A = Math.floor((e.y - g.y) / L.length);

		if (!y) {

			this._drawHScales(x, L, g, e, s, J, A)

		}

		if (l) {

			J = parseFloat(this._settings.xAxis.end);

			s = parseFloat(this._settings.xAxis.start)

		}

		var F = this._getRelativeValue(s, J);

		t = F[0];

		b = F[1];

		var q = (t ? v / t : 10);

		if (!l) {

			var u = 10;

			q = (t ? (v - u) / t : 10)

		}

		var r = parseInt(this._settings.width, 10);

		if ((r + 4) > A) {

			r = A - 4

		}

		var m = (A - r) / 2;

		var h = 0;

		var n = false;

		var a = this._settings.gradient;

		if (a) {

			n = true

		}

		if (!l) {

			this._drawLine(x, g.x - 0.5, g.y, g.x - 0.5, e.y, "#000000", 1)

		}

		var I = 0;

		var E = 0;

		for (D = 0; D < this._series.length; D++) {

			if (D == y) {

				E = I

			}

			if (this._series[D].view == "stackedBarH") {

				I++

			}

		}

		for (var D = 0; D < L.length; D++) {

			if (!E) {

				L[D].$startX = g.x

			}

			var w = parseFloat(this._settings.value(L[D] || 0));

			if (w > J) {

				w = J

			}

			w -= s;

			w *= b;

			var H = g.x;

			var c = g.y + m + D * A;

			if (!E) {

				L[D].$startX = H

			} else {

				H = L[D].$startX

			}

			if (w < 0 || (this._settings.yAxis && w === 0)) {

				this.canvases.y.renderTextAt("middle", true, H + 10, c + r / 2,

						this._settings.label(L[D]));

				continue

			}

			if (!l) {

				w += u / q

			}

			var z = this._settings.color.call(this, L[D]);

			x.globalAlpha = this._settings.alpha.call(this, L[D]);

			x.fillStyle = this._settings.color.call(this, L[D]);

			x.beginPath();

			var C = this._setBarHPoints(x, H, c, r, h, q, w,

					(this._settings.border ? 1 : 0));

			if (a && !n) {

				x.lineTo(g.x + v, c + (this._settings.border ? 1 : 0))

			}

			x.fill();

			if (n != false) {

				var o = this._setBarGradient(x, H, c + r, H, c, n, z, "x");

				x.fillStyle = o.gradient;

				x.beginPath();

				C = this._setBarHPoints(x, H, c, r, h, q, w, 0);

				x.fill()

			}

			if (this._settings.border) {

				this._drawBarHBorder(x, H, c, r, s, h, q, w, z)

			}

			x.globalAlpha = 1;

			this.canvases[y].renderTextAt("middle", true, L[D].$startX

					+ (C[0] - L[D].$startX) / 2 - 1, c + (C[1] - c) / 2,

					this._settings.label(L[D]));

			K.addRect(L[D].id, [ L[D].$startX - g.x, c - g.y, C[0] - g.x,

					C[1] - g.y ], y);

			L[D].$startX = C[0]

		}

	}

};

dhtmlx.chart.stackedBar = {

	pvt_render_stackedBar : function(y, N, h, g, z, L) {

		var I, u, a, H, e;

		var b;

		var v;

		var K = this._settings;

		var w = g.y - h.y;

		var l = !!K.yAxis;

		var J = !!K.xAxis;

		var j = this._getStackedLimits(N);

		var M = (K.origin === 0);

		I = j.max;

		u = j.min;

		if (!N.length) {

			return

		}

		var C = (g.x - h.x) / N.length;

		if (!z) {

			a = this._drawScales(N, h, g, u, I, C)

		}

		if (l) {

			I = parseFloat(K.yAxis.end);

			u = parseFloat(K.yAxis.start)

		}

		var F = this._getRelativeValue(u, I);

		v = F[0];

		b = F[1];

		var s = (v ? w / v : 10);

		var t = parseInt(K.width, 10);

		if (t + 4 > C) {

			t = C - 4

		}

		var m = Math.floor((C - t) / 2);

		var o = (K.gradient ? K.gradient : false);

		if (!J) {

			this._drawLine(y, h.x, g.y + 0.5, g.x, g.y + 0.5, "#000000", 1)

		}

		for (var E = 0; E < N.length; E++) {

			var x = parseFloat(K.value(N[E] || 0));

			if (this._logScaleCalc) {

				x = this._log10(x)

			}

			H = h.x + m + E * C;

			var n = M && x < 0;

			if (!z) {

				e = a - 1;

				N[E].$startY = e;

				if (M) {

					if (n) {

						e = a + 1

					}

					N[E].$startYN = a + 1

				}

			} else {

				e = n ? N[E].$startYN : N[E].$startY

			}

			if (!x) {

				continue

			}

			if (!z && !M) {

				x -= u

			}

			x *= b;

			if (e < (h.y + 1)) {

				continue

			}

			if (K.yAxis && x === 0) {

				this.canvases.y.renderTextAt(true, true, H + Math.floor(t / 2),

						e, this._settings.label(N[E]));

				continue

			}

			var A = this._settings.color.call(this, N[E]);

			var r = Math.abs(e - (M ? (g.y + u * s) : g.y)) < 3;

			y.globalAlpha = K.alpha.call(this, N[E]);

			y.fillStyle = y.strokeStyle = K.color.call(this, N[E]);

			y.beginPath();

			var c = e - s * x + (r ? (n ? -1 : 1) : 0);

			var D = this._setStakedBarPoints(y, H - (K.border ? 0.5 : 0), e, t

					+ (K.border ? 0.5 : 0), c, 0, h.y);

			y.fill();

			y.stroke();

			if (o) {

				y.save();

				var q = this._setBarGradient(y, H, e, H + t, D[1], o, A, "y");

				y.fillStyle = q.gradient;

				y.beginPath();

				D = this._setStakedBarPoints(y, H + q.offset, e, t - q.offset

						* 2, c, (K.border ? 1 : 0), h.y);

				y.fill();

				y.restore()

			}

			if (K.border) {

				y.save();

				if (typeof K.border == "string") {

					y.strokeStyle = K.border

				} else {

					this._setBorderStyles(y, A)

				}

				y.beginPath();

				this._setStakedBarPoints(y, H - 0.5, parseInt(e, 10) + 0.5,

						t + 1, parseInt(c, 10) + 0.5, 0, h.y, r);

				y.stroke();

				y.restore()

			}

			y.globalAlpha = 1;

			this.canvases[z].renderTextAt(false, true, H + Math.floor(t / 2),

					(D[1] + (e - D[1]) / 2) - 7, this._settings.label(N[E]));

			L.addRect(N[E].id, [ H - h.x, D[1] - h.y, D[0] - h.x,

					N[E][n ? "$startYN" : "$startY"] - h.y ], z);

			N[E][n ? "$startYN" : "$startY"] = D[1]

		}

	},

	_setStakedBarPoints : function(n, b, l, o, j, e, c, g) {

		n.moveTo(b, l);

		if (j < c) {

			j = c

		}

		n.lineTo(b, j);

		var a = b + o;

		var h = j;

		n.lineTo(a, h);

		var m = b + o;

		n.lineTo(m, l);

		if (!g) {

			n.lineTo(b, l)

		}

		return [ m, h ]

	}

};

dhtmlx.chart.line = {

	pvt_render_line : function(j, w, g, e, l, u) {

		var t, m, h, r, q, o, n, b, a, c, v, s;

		r = this._calculateLineParams(j, w, g, e, l);

		t = this._settings;

		if (w.length) {

			q = (t.offset ? g.x + r.cellWidth * 0.5 : g.x);

			h = [];

			for (m = 0; m < w.length; m++) {

				s = this._getPointY(w[m], g, e, r);

				if (s) {

					n = ((!m) ? q : r.cellWidth * m - 0.5 + q);

					a = (typeof s == "object" ? s.y0 : s);

					if (m && this._settings.fixOverflow) {

						v = this._getPointY(w[m - 1], g, e, r);

						if (v.out && v.out == s.out) {

							continue

						}

						o = r.cellWidth * (m - 1) - 0.5 + q;

						b = (typeof v == "object" ? v.y0 : v);

						if (v.out) {

							c = (v.out == "min" ? e.y : g.y);

							h.push({

								x : this._calcOverflowX(o, n, b, a, c),

								y : c

							})

						}

						if (s.out) {

							c = (s.out == "min" ? e.y : g.y);

							h.push({

								x : this._calcOverflowX(o, n, b, a, c),

								y : c

							})

						}

					}

					if (!s.out) {

						h.push({

							x : n,

							y : s,

							index : m

						})

					}

				}

			}

			this._mapStart = g;

			for (m = 1; m <= h.length; m++) {

				o = h[m - 1].x;

				b = h[m - 1].y;

				if (m < h.length) {

					n = h[m].x;

					a = h[m].y;

					this._drawLine(j, o, b, n, a, t.line.color.call(this,

							w[m - 1]), t.line.width);

					if (t.line && t.line.shadow) {

						j.globalAlpha = 0.3;

						this

								._drawLine(j, o + 2, b + t.line.width + 8,

										n + 2, a + t.line.width + 8, "#eeeeee",

										t.line.width + 3);

						j.globalAlpha = 1

					}

				}

				if (typeof h[m - 1].index != "undefined") {

					this._drawItem(j, o, b, w[h[m - 1].index], t

							.label(w[h[m - 1].index]), l, u, g)

				}

			}

		}

	},

	_calcOverflowX : function(b, a, e, c, g) {

		return b + (g - e) * (a - b) / (c - e)

	},

	_drawItem : function(r, c, q, m, o, n, b) {

		var e = this._settings.item;

		var l = parseInt(e.radius.call(this, m), 10) || 0;

		var j = this._mapStart;

		if (l) {

			r.save();

			if (e.shadow) {

				r.lineWidth = 1;

				r.strokeStyle = "#bdbdbd";

				r.fillStyle = "#bdbdbd";

				var a = [ 0.1, 0.2, 0.3 ];

				for (var h = (a.length - 1); h >= 0; h--) {

					r.globalAlpha = a[h];

					r.strokeStyle = "#d0d0d0";

					r.beginPath();

					this._strokeChartItem(r, c, q + 2 * l / 3, l + h + 1,

							e.type);

					r.stroke()

				}

				r.beginPath();

				r.globalAlpha = 0.3;

				r.fillStyle = "#bdbdbd";

				this._strokeChartItem(r, c, q + 2 * l / 3, l + 1, e.type);

				r.fill()

			}

			r.restore();

			if (e.type == "image" && e.src) {

				this._drawImage(r, c - l, q - l, e.src, l * 2, l * 2)

			} else {

				r.lineWidth = e.borderWidth;

				r.fillStyle = e.color.call(this, m);

				r.strokeStyle = e.borderColor.call(this, m);

				r.globalAlpha = e.alpha.call(this, m);

				r.beginPath();

				this._strokeChartItem(r, c, q, l + 1, e.type);

				r.fill();

				r.stroke();

				r.globalAlpha = 1

			}

		}

		if (o) {

			this.canvases[n].renderTextAt(false, true, c, q - l

					- this._settings.labelOffset, this._settings.label.call(

					this, m))

		}

		var g = (this._settings.eventRadius || l + 1);

		b.addRect(m.id, [ c - g - j.x, q - g - j.y, c + g - j.x, q + g - j.y ],

				n)

	},

	_drawImage : function(c, b, l, h, e, a) {

		var g = document.createElement("img");

		g.style.display = "none";

		g.style.width = e + "px";

		g.style.height = a + "px";

		document.body.appendChild(g);

		g.src = h;

		var j = function() {

			c.drawImage(g, b, l)

		};

		if (g.complete) {

			j(g)

		} else {

			g.onload = j

		}

	},

	_strokeChartItem : function(a, b, g, e, c) {

		var h = [];

		b = parseInt(b, 10);

		g = parseInt(g, 10);

		if (c && (c == "square" || c == "s")) {

			e *= Math.sqrt(2) / 2;

			h = [ [ b - e - a.lineWidth / 2, g - e ], [ b + e, g - e ],

					[ b + e, g + e ], [ b - e, g + e ], [ b - e, g - e ] ]

		} else {

			if (c && (c == "diamond" || c == "d")) {

				var j = (a.lineWidth > 1 ? a.lineWidth * Math.sqrt(2) / 4 : 0);

				h = [ [ b, g - e ], [ b + e, g ], [ b, g + e ], [ b - e, g ],

						[ b + j, g - e - j ] ]

			} else {

				if (c && (c == "triangle" || c == "t")) {

					h = [ [ b, g - e ],

							[ b + Math.sqrt(3) * e / 2, g + e / 2 ],

							[ b - Math.sqrt(3) * e / 2, g + e / 2 ],

							[ b, g - e ] ]

				} else {

					h = [ [ b, g, e, 0, Math.PI * 2, true ] ]

				}

			}

		}

		this._path(a, h)

	},

	_getPointY : function(c, l, h, a) {

		var j = a.minValue;

		var e = a.maxValue;

		var n = a.unit;

		var b = a.valueFactor;

		var m = this._settings.value(c);

		var o = (parseFloat(m || 0) - j) * b;

		if (!this._settings.yAxis) {

			o += a.startValue / n

		}

		var g = h.y - n * o;

		if (this._settings.fixOverflow

				&& (this._settings.view == "line" || this._settings.view == "area")) {

			if (m > e) {

				g = {

					y : l.y,

					y0 : g,

					out : "max"

				}

			} else {

				if (o < 0 || m < j) {

					g = {

						y : h.y,

						y0 : g,

						out : "min"

					}

				}

			}

		} else {

			if (m > e) {

				g = l.y

			}

			if (o < 0 || m < j) {

				g = h.y

			}

		}

		return g

	},

	_calculateLineParams : function(m, e, j, h, g) {

		var b = {};

		var n;

		b.totalHeight = h.y - j.y;

		b.cellWidth = (h.x - j.x)

				/ ((!this._settings.offset) ? (e.length - 1) : e.length);

		var c = !!this._settings.yAxis;

		var a = (this._settings.view.indexOf("stacked") != -1 ? this

				._getStackedLimits(e) : this._getLimits());

		b.maxValue = a.max;

		b.minValue = a.min;

		if (!g) {

			this._drawScales(e, j, h, b.minValue, b.maxValue, b.cellWidth)

		}

		if (c) {

			b.maxValue = parseFloat(this._settings.yAxis.end);

			b.minValue = parseFloat(this._settings.yAxis.start)

		}

		var l = this._getRelativeValue(b.minValue, b.maxValue);

		n = l[0];

		b.valueFactor = l[1];

		b.unit = (n ? b.totalHeight / n : 10);

		b.startValue = 0;

		if (!c) {

			b.startValue = 10;

			if (b.unit != b.totalHeight) {

				b.unit = (n ? (b.totalHeight - b.startValue) / n : 10)

			}

		}

		return b

	}

};

dhtmlx.chart.bar = {

	pvt_render_bar : function(x, N, h, g, y, M) {

		var s, A, E, m, K, t, u, b, F, v, r, J, n, L = g.y - h.y;

		n = !!this._settings.yAxis;

		J = !!this._settings.xAxis;

		m = this._getLimits();

		K = m.max;

		t = m.min;

		A = (g.x - h.x) / N.length;

		if (!y && !(this._settings.origin != "auto" && !n)) {

			this._drawScales(N, h, g, t, K, A)

		}

		if (n) {

			K = parseFloat(this._settings.yAxis.end);

			t = parseFloat(this._settings.yAxis.start)

		}

		F = this._getRelativeValue(t, K);

		u = F[0];

		b = F[1];

		r = (u ? L / u : u);

		if (!n && !(this._settings.origin != "auto" && J)) {

			v = 10;

			r = (u ? (L - v) / u : v)

		}

		if (!y && (this._settings.origin != "auto" && !n)

				&& this._settings.origin > t) {

			this._drawXAxis(x, N, h, g, A, g.y - r

					* (this._settings.origin - t))

		}

		s = parseInt(this._settings.width, 10);

		var I = 0;

		var D = 0;

		for (E = 0; E < this._series.length; E++) {

			if (E == y) {

				D = I

			}

			if (this._series[E].view == "bar") {

				I++

			}

		}

		var l = this._settings.seriesMargin;

		var e = this._settings.seriesPadding;

		if (this._series && (s * I + e + (I > 2 ? l * I : 0) > A)) {

			s = A / I - e - (I > 2 ? l : 0)

		}

		var o = (A - s * I - l * (I - 1)) / 2;

		if (this._settings.border) {

			s = parseInt(s, 10);

			o = parseInt(o, 10)

		}

		var j = (typeof this._settings.radius != "undefined" ? parseInt(

				this._settings.radius, 10) : Math.round(s / 5));

		var q = false;

		var a = this._settings.gradient;

		if (a && typeof (a) != "function") {

			q = a;

			a = false

		} else {

			if (a) {

				a = x.createLinearGradient(0, g.y, 0, h.y);

				this._settings.gradient(a)

			}

		}

		if (!J) {

			this._drawLine(x, h.x, g.y + 0.5, g.x, g.y + 0.5, "#000000", 1)

		}

		for (E = 0; E < N.length; E++) {

			var w = parseFloat(this._settings.value(N[E]) || 0);

			if (isNaN(w)) {

				continue

			}

			if (w > K) {

				w = K

			}

			w -= t;

			w *= b;

			var H = h.x + o + (I > 2 ? l * D : 0) + E * A + s * D;

			var c = g.y;

			if (w < 0

					|| (this._settings.yAxis && w === 0 && !(this._settings.origin != "auto" && this._settings.origin > t))) {

				this.canvases[y].renderTextAt(true, true,

						H + Math.floor(s / 2), c, this._settings.label(N[E]));

				continue

			}

			if (!n && !(this._settings.origin != "auto" && J)) {

				w += v / r

			}

			var z = a || this._settings.color.call(this, N[E]);

			x.globalAlpha = this._settings.alpha.call(this, N[E]);

			var C = this._drawBar(x, h, H, c, s, t, j, r, w, z, a, q);

			if (q) {

				this._drawBarGradient(x, H, c, s, t, j, r, w, z, q)

			}

			if (this._settings.border) {

				this._drawBarBorder(x, H, c, s, t, j, r, w, z)

			}

			x.globalAlpha = 1;

			if (C[0] != H) {

				this.canvases[y].renderTextAt(false, true, H

						+ Math.floor(s / 2), C[1], this._settings.label(N[E]))

			} else {

				this.canvases[y]

						.renderTextAt(true, true, H + Math.floor(s / 2), C[3],

								this._settings.label(N[E]))

			}

			M.addRect(N[E].id, [ H - h.x, C[3] - h.y, C[2] - h.x, C[1] - h.y ],

					y)

		}

	},

	_correctBarParams : function(l, g, c, h, j, m, e) {

		var a = this._settings.xAxis;

		var b = c;

		if (!!a && this._settings.origin != "auto"

				&& (this._settings.origin > e)) {

			c -= (this._settings.origin - e) * j;

			b = c;

			h = h - (this._settings.origin - e);

			if (h < 0) {

				h *= (-1);

				l.translate(g + m, c);

				l.rotate(Math.PI);

				g = 0;

				c = 0

			}

			c -= 0.5

		}

		return {

			value : h,

			x0 : g,

			y0 : c,

			start : b

		}

	},

	_drawBar : function(r, g, w, e, m, n, h, l, q, s, a, j) {

		var t;

		r.save();

		r.fillStyle = s;

		var o = this._correctBarParams(r, w, e, q, l, m, n);

		if (l * o.value > 0) {

			t = this._setBarPoints(r, o.x0, o.y0, m, h, l, o.value,

					(this._settings.border ? 1 : 0))

		} else {

			t = [ o.x0, o.y0 ]

		}

		if (a && !j) {

			r.lineTo(o.x0 + (this._settings.border ? 1 : 0), g.y)

		}

		r.fill();

		r.restore();

		var v = o.x0;

		var u = (o.x0 != w ? w + t[0] : t[0]);

		var c = (o.x0 != w ? (o.start - t[1] - o.y0) : o.y0);

		var b = (o.x0 != w ? o.start - o.y0 : t[1]);

		return [ v, c, u, b ]

	},

	_drawBarBorder : function(m, b, j, n, g, e, l, h, c) {

		var a;

		m.save();

		a = this._correctBarParams(m, b, j, h, l, n, g);

		this._setBorderStyles(m, c);

		if (l * a.value > 0) {

			this._setBarPoints(m, a.x0, a.y0, n, e, l, a.value,

					m.lineWidth / 2, 1)

		}

		m.stroke();

		m.restore()

	},

	_drawBarGradient : function(q, e, n, r, l, j, o, m, g, b) {

		q.save();

		var c = this._correctBarParams(q, e, n, m, o, r, l);

		var h = this._setBarGradient(q, c.x0, c.y0, c.x0 + r, c.y0 - o

				* c.value + 2, b, g, "y");

		var a = this._settings.border ? 1 : 0;

		q.fillStyle = h.gradient;

		if (o * c.value > 0) {

			this._setBarPoints(q, c.x0 + h.offset, c.y0, r - h.offset * 2, j,

					o, c.value, h.offset + a)

		}

		q.fill();

		q.restore()

	},

	_setBarPoints : function(t, e, q, u, l, r, o, g, j) {

		t.beginPath();

		var b = 0;

		if (l > r * o) {

			var h = (l - r * o) / l;

			if (h <= 1 && h >= -1) {

				b = -Math.acos(h) + Math.PI / 2

			}

		}

		t.moveTo(e + g, q);

		var n = q - Math.floor(r * o) + l + (l ? 0 : g);

		if (l < r * o) {

			t.lineTo(e + g, n)

		}

		var c = e + l;

		if (l && l > 0) {

			t.arc(c, n, l - g, -Math.PI + b, -Math.PI / 2, false)

		}

		var a = e + u - l - g;

		var m = n - l + (l ? g : 0);

		t.lineTo(a, m);

		if (l && l > 0) {

			t.arc(a, n, l - g, -Math.PI / 2, 0 - b, false)

		}

		var s = e + u - g;

		t.lineTo(s, q);

		if (!j) {

			t.lineTo(e + g, q)

		}

		return [ s, m ]

	}

};

dhtmlx.chart.pie = {

	pvt_render_pie : function(b, e, a, h, c, g) {

		this._renderPie(b, e, a, h, 1, g, c)

	},

	_renderPie : function(q, A, g, e, y, z, r) {

		if (!A.length) {

			return

		}

		var s = this._getPieParameters(g, e);

		var j = (this._settings.radius ? this._settings.radius : s.radius);

		if (j < 0) {

			return

		}

		var a = this._getValues(A);

		var h = this._getTotalValue(a);

		var l = this._getRatios(a, h);

		var x = (this._settings.x ? this._settings.x : s.x);

		var c = (this._settings.y ? this._settings.y : s.y);

		if (y == 1 && this._settings.shadow) {

			this._addShadow(q, x, c, j)

		}

		c = c / y;

		var o = -Math.PI / 2;

		var n;

		var u = [];

		q.scale(1, y);

		if (this._settings.gradient) {

			var w = (y != 1 ? x + j / 3 : x);

			var b = (y != 1 ? c + j / 3 : c);

			this._showRadialGradient(q, x, c, j, w, b)

		}

		if (this._settings.labelLines) {

			this._labelMargins = this._getLabelMargins(l, j)

		}

		for (var v = 0; v < A.length; v++) {

			if (!a[v]) {

				continue

			}

			q.strokeStyle = (A.length == 1 ? this._settings.color.call(this,

					A[v]) : this._settings.lineColor.call(this, A[v]));

			q.beginPath();

			q.moveTo(x, c);

			u.push(o);

			n = -Math.PI / 2 + l[v] - 0.0001;

			q.arc(x, c, j, o, n, false);

			q.lineTo(x, c);

			var t = this._settings.color.call(this, A[v]);

			q.fillStyle = t;

			q.fill();

			if (this._settings.pieInnerText) {

				this._drawSectorLabel(x, c, 5 * j / 6, o, n, y, this._settings

						.pieInnerText(A[v], h), true)

			}

			if (this._settings.label) {

				this._drawSectorLabel(x, c, j, o, n, y, this._settings

						.label(A[v]), 0,

						(this._labelMargins ? this._labelMargins[v] : {}), q)

			}

			if (y != 1) {

				this._createLowerSector(q, x, c, o, n, j, true);

				q.fillStyle = "#000000";

				q.globalAlpha = 0.2;

				this._createLowerSector(q, x, c, o, n, j, false);

				q.globalAlpha = 1;

				q.fillStyle = t

			}

			z.addSector(A[v].id, o, n, x - g.x, c - g.y / y, j, y, r);

			o = n

		}

		q.globalAlpha = 0.8;

		var m;

		if (u.length > 1) {

			for (v = 0; v < u.length; v++) {

				m = this._getPositionByAngle(u[v], x, c, j);

				this._drawLine(q, x, c, m.x, m.y, this._settings.lineColor

						.call(this, A[v]), 2)

			}

		}

		if (y == 1) {

			q.lineWidth = 2;

			q.strokeStyle = "#ffffff";

			q.beginPath();

			q.arc(x, c, j + 1, 0, 2 * Math.PI, false);

			q.stroke()

		}

		q.globalAlpha = 1;

		q.scale(1, 1 / y)

	},

	_getLabelMargins : function(t, h) {

		var z, y, F, E, a = [], u = [];

		var J = {

			1 : [ 0 ]

		};

		for (F = 1; F < t.length; F++) {

			z = -Math.PI

					/ 2

					+ (F > 1 ? (t[F - 1] - (t[F - 1] - t[F - 2]) / 2)

							: t[F - 1] / 2);

			y = -Math.PI / 2 + t[F] - (t[F] - t[F - 1]) / 2;

			var g = Math.cos(y);

			var w = Math.sin(y);

			var l = Math.cos(z);

			var x = Math.sin(z);

			var A = Math.round((h + 8) * Math.abs(Math.sin(y) - Math.sin(z)));

			var o = (g < 0 ? (w < 0 ? 4 : 3) : (w < 0 ? 1 : 2));

			var s = (l < 0 ? (x < 0 ? 4 : 3) : (x < 0 ? 1 : 2));

			if (!J[o]) {

				J[o] = []

			}

			J[o].push(s == o ? A : 0)

		}

		var C = [];

		var I = 0;

		for ( var v in J) {

			var e = 0;

			var b = J[v].length;

			var n = 0;

			var m = 0;

			if (v == 1 || v == 3) {

				E = v - 1;

				var H = 0;

				while (E > 0) {

					if (J[E]) {

						H += J[E].length

					}

					E--

				}

				C[H + J[v].length - 1] = {

					y : 0,

					x : 0

				};

				var E = J[v].length - 2;

				while (E >= 0) {

					if ((n || E) && J[v][E + 1] - n < 18) {

						n += 18 - J[v][E + 1]

					} else {

						n = 0

					}

					C[H + E] = {

						y : n * (v == 1 ? -1 : 1)

					};

					E--

				}

				for (var D = C.length - J[v].length; D < C.length; D++) {

					if (C[D]["y"] != 0) {

						m += 6;

						C[D]["x"] = m

					} else {

						C[D]["x"] = 0;

						m = 0

					}

				}

			} else {

				var E = 1;

				C.push({

					y : 0,

					x : 0

				});

				while (E < J[v].length) {

					if (J[v][E] - n < 18) {

						n += 18 - J[v][E]

					} else {

						n = 0

					}

					C.push({

						y : n * (v == 4 ? -1 : 1)

					});

					E++

				}

				for (var D = C.length - 1; D >= C.length - J[v].length; D--) {

					if (C[D]["y"] != 0) {

						m += 8;

						C[D]["x"] = m

					} else {

						m = 0;

						C[D]["x"] = 0

					}

				}

			}

		}

		return C

	},

	_getValues : function(c) {

		var a = [];

		for (var b = 0; b < c.length; b++) {

			a.push(parseFloat(this._settings.value(c[b]) || 0))

		}

		return a

	},

	_getTotalValue : function(a) {

		var c = 0;

		for (var b = 0; b < a.length; b++) {

			c += a[b]

		}

		return c

	},

	_getRatios : function(b, a) {

		var h;

		var g = [];

		var e = 0;

		a = a || this._getTotalValue(b);

		for (var c = 0; c < b.length; c++) {

			h = b[c];

			g[c] = Math.PI * 2 * (a ? ((h + e) / a) : (1 / b.length));

			e += h

		}

		return g

	},

	_getPieParameters : function(j, g) {

		var e = g.x - j.x;

		var b = g.y - j.y;

		var c = j.x + e / 2;

		var h = j.y + b / 2;

		var a = Math.min(e / 2, b / 2);

		return {

			x : c,

			y : h,

			radius : a

		}

	},

	_createLowerSector : function(e, g, j, c, a, h, b) {

		e.lineWidth = 1;

		if (!((c <= 0 && a >= 0) || (c >= 0 && a <= Math.PI) || (Math.abs(c

				- Math.PI) > 0.003

				&& c <= Math.PI && a >= Math.PI))) {

			return

		}

		if (c <= 0 && a >= 0) {

			c = 0;

			b = false;

			this._drawSectorLine(e, g, j, h, c, a)

		}

		if (c <= Math.PI && a >= Math.PI) {

			a = Math.PI;

			b = false;

			this._drawSectorLine(e, g, j, h, c, a)

		}

		var l = (this._settings.height || Math.floor(h / 4))

				/ this._settings.cant;

		e.beginPath();

		e.arc(g, j, h, c, a, false);

		e.lineTo(g + h * Math.cos(a), j + h * Math.sin(a) + l);

		e.arc(g, j + l, h, a, c, true);

		e.lineTo(g + h * Math.cos(c), j + h * Math.sin(c));

		e.fill();

		if (b) {

			e.stroke()

		}

	},

	_drawSectorLine : function(c, e, h, g, b, a) {

		c.beginPath();

		c.arc(e, h, g, b, a, false);

		c.stroke()

	},

	_addShadow : function(b, a, h, e) {

		b.globalAlpha = 0.5;

		var g = [ "#c4c4c4", "#c6c6c6", "#cacaca", "#dcdcdc", "#dddddd",

				"#e0e0e0", "#eeeeee", "#f5f5f5", "#f8f8f8" ];

		for (var c = g.length - 1; c > -1; c--) {

			b.beginPath();

			b.fillStyle = g[c];

			b.arc(a + 1, h + 1, e + c, 0, Math.PI * 2, true);

			b.fill()

		}

		b.globalAlpha = 1

	},

	_getGrayGradient : function(a) {

		a.addColorStop(0, "#ffffff");

		a.addColorStop(0.7, "#7a7a7a");

		a.addColorStop(1, "#000000");

		return a

	},

	_showRadialGradient : function(c, b, j, a, e, g) {

		c.beginPath();

		var h;

		if (typeof this._settings.gradient != "function") {

			h = c.createRadialGradient(e, g, a / 4, b, j, a);

			h = this._getGrayGradient(h)

		} else {

			h = this._settings.gradient(h)

		}

		c.fillStyle = h;

		c.arc(b, j, a, 0, Math.PI * 2, true);

		c.fill();

		c.globalAlpha = 0.7

	},

	_drawSectorLabel : function(J, e, j, A, z, K, v, a, w, D) {

		var u = this.canvases[0].renderText(0, 0, v, 0, 1);

		if (!u) {

			return

		}

		var L = u.scrollWidth;

		u.style.width = L + "px";

		if (L > J) {

			L = J

		}

		var C = (z - A < 0.2 ? 4 : 8);

		if (a) {

			C = L / 1.8

		}

		var h = A + (z - A) / 2;

		var g = j;

		j = (a ? 5 * j / 6 : j + this._settings.labelOffset);

		j = j - (C - 8) / 2;

		var o = -C;

		var n = -8;

		var E = "right";

		if (h >= Math.PI / 2 && h < Math.PI || h <= 3 * Math.PI / 2

				&& h >= Math.PI) {

			o = -L - o;

			E = "left"

		}

		var l = 0;

		if (!a && K < 1 && (h > 0 && h < Math.PI)) {

			l = (this._settings.height || Math.floor(j / 4)) / K

		}

		var q = (e + Math.floor(j + l) * Math.sin(h)) * K + n;

		var r = J + Math.floor(j + C / 2) * Math.cos(h) + o;

		var m = (z < Math.PI / 2 + 0.01);

		var s = (A < Math.PI / 2);

		if (s && m) {

			r = Math.max(r, J + 3)

		} else {

			if (!s && !m) {

				r = Math.min(r, J - L)

			} else {

				if (!a

						&& !this._settings.labelLines

						&& (h >= Math.PI / 2 && h < Math.PI || h <= 3 * Math.PI / 2

								&& h >= Math.PI)) {

					r += L / 3

				}

			}

		}

		if (this._settings.labelLines && !a) {

			var F = Math.abs((Math.abs(w || 0) + Math.abs(g * Math.sin(h)))

					/ Math.sin(h));

			if (w.y) {

				q += w.y

			}

			if (E == "left") {

				r -= w.x

			} else {

				r += w.x

			}

			D.beginPath();

			D.strokeStyle = "#555";

			var I = J + g * Math.cos(h);

			var c = e + g * Math.sin(h);

			D.moveTo(I, c);

			var H = r - (E == "left" ? o - 8 : 2);

			var b = q;

			if (E == "left" && H > I) {

				H = I - Math.abs(b - c + 16) / Math.tan(h - Math.PI);

				b = b + 16;

				if (h < Math.PI) {

					b -= 8

				}

			} else {

				b += 8

			}

			D.lineTo(H, b);

			D.lineTo(H + (E == "left" ? -5 : 5), b);

			D.stroke();

			q = b - 8;

			r = H + o + (E == "left" ? -15 : 15)

		}

		u.style.top = q + "px";

		u.style.left = r + "px";

		u.style.width = L + "px";

		u.style.textAlign = E;

		u.style.whiteSpace = "nowrap"

	}

};

dhtmlx.chart.pie3D = {

	pvt_render_pie3D : function(b, e, a, h, c, g) {

		this._renderPie(b, e, a, h, this._settings.cant, g)

	}

};

dhtmlx.chart.donut = {

	pvt_render_donut : function(q, g, n, m, j, b) {

		if (!g.length) {

			return

		}

		this._renderPie(q, g, n, m, 1, b);

		var e = this._settings;

		var h = this._getPieParameters(n, m);

		var a = (e.radius ? e.radius : h.radius);

		var l = ((e.innerRadius && (e.innerRadius < a)) ? e.innerRadius : a / 3);

		var c = (e.x ? e.x : h.x);

		var o = (e.y ? e.y : h.y);

		q.fillStyle = "#ffffff";

		q.beginPath();

		q.arc(c, o, l, 0, Math.PI * 2, true);

		q.fill()

	}

};

dhtmlx.DataDriver.dhtmlxgrid = {

	_grid_getter : "_get_cell_value",

	toObject : function(a) {

		this._grid = a;

		return a

	},

	getRecords : function(a) {

		return a.rowsBuffer

	},

	getDetails : function(c) {

		var a = {};

		for (var b = 0; b < this._grid.getColumnsNum(); b++) {

			a["data" + b] = this._grid[this._grid_getter](c, b)

		}

		return a

	},

	getInfo : function(a) {

		return {

			_size : 0,

			_from : 0

		}

	}

};

dhtmlx.ui.Canvas = function(b, c, g) {

	this._canvas_labels = [];

	this._canvas_name = c;

	this._obj = b;

	var e = b.offsetWidth * (window.devicePixelRatio || 1);

	var a = b.offsetHeight * (window.devicePixelRatio || 1);

	var g = g || "";

	g += ";width:" + b.offsetWidth + "px;height:" + b.offsetHeight + "px;";

	this._prepareCanvas(c, g, e, a)

};

dhtmlx.ui.Canvas.prototype = {

	_prepareCanvas : function(b, e, c, a) {

		this._canvas = dhtmlx.html.create("canvas", {

			width : c,

			height : a,

			canvas_id : b,

			style : (e || "")

		});

		this._obj.appendChild(this._canvas);

		if (!this._canvas.getContext) {

			if (dhtmlx._isIE) {

				dhtmlx.require("thirdparty/excanvas/excanvas.js");

				G_vmlCanvasManager.init_(document);

				G_vmlCanvasManager.initElement(this._canvas)

			} else {

				dhtmlx.error("Canvas is not supported in the current browser")

			}

		}

		return this._canvas

	},

	getCanvas : function(b) {

		var a = (this._canvas || this._prepareCanvas()).getContext(b || "2d");

		if (!this._dhtmlxDevicePixelRatio) {

			this._dhtmlxDevicePixelRatio = true;

			a.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)

		}

		return a

	},

	_resizeCanvas : function() {

		if (this._canvas) {

			var a = this._canvas.parentNode.offsetWidth;

			var b = this._canvas.parentNode.offsetHeight;

			this._canvas.setAttribute("width", a

					* (window.devicePixelRatio || 1));

			this._canvas.setAttribute("height", b

					* (window.devicePixelRatio || 1));

			this._canvas.style.width = a + "px";

			this._canvas.style.height = b + "px";

			this._dhtmlxDevicePixelRatio = false

		}

	},

	renderText : function(a, h, g, e, b) {

		if (!g) {

			return

		}

		var c = dhtmlx.html.create("DIV", {

			"class" : "dhx_canvas_text" + (e ? (" " + e) : ""),

			style : "left:" + a + "px; top:" + h + "px;"

		}, g);

		this._obj.appendChild(c);

		this._canvas_labels.push(c);

		if (b) {

			c.style.width = b + "px"

		}

		return c

	},

	renderTextAt : function(g, m, a, l, e, j, b) {

		var h = this.renderText.call(this, a, l, e, j, b);

		if (h) {

			if (g) {

				if (g == "middle") {

					h.style.top = parseInt(l - h.offsetHeight / 2, 10) + "px"

				} else {

					h.style.top = l - h.offsetHeight + "px"

				}

			}

			if (m) {

				if (m == "left") {

					h.style.left = a - h.offsetWidth + "px"

				} else {

					h.style.left = parseInt(a - h.offsetWidth / 2, 10) + "px"

				}

			}

		}

		return h

	},

	clearCanvas : function(a) {

		var b = [], c;

		for (c = 0; c < this._canvas_labels.length; c++) {

			this._obj.removeChild(this._canvas_labels[c])

		}

		this._canvas_labels = [];

		if (!a && this._obj._htmlmap) {

			b = this._getMapAreas();

			while (b.length) {

				b[0].parentNode.removeChild(b[0]);

				b.splice(0, 1)

			}

			b = null;

			if (!this._obj._htmlmap.getElementsByTagName("AREA").length) {

				this._obj._htmlmap.parentNode.removeChild(this._obj._htmlmap);

				this._obj._htmlmap = null

			}

		}

		this.getCanvas().clearRect(0, 0, this._canvas.width,

				this._canvas.height)

	},

	toggleCanvas : function() {

		this._toggleCanvas(this._canvas.style.display == "none")

	},

	showCanvas : function() {

		this._toggleCanvas(true)

	},

	hideCanvas : function() {

		this._toggleCanvas(false)

	},

	_toggleCanvas : function(a) {

		var b, c;

		for (c = 0; c < this._canvas_labels.length; c++) {

			this._canvas_labels[c].style.display = (a ? "" : "none")

		}

		if (this._obj._htmlmap) {

			b = this._getMapAreas();

			for (c = 0; c < b.length; c++) {

				if (a) {

					b[c].removeAttribute("disabled")

				} else {

					b[c].setAttribute("disabled", "true")

				}

			}

		}

		this._canvas.style.display = (a ? "" : "none")

	},

	_getMapAreas : function() {

		var c = [], a, b;

		a = this._obj._htmlmap.getElementsByTagName("AREA");

		for (b = 0; b < a.length; b++) {

			if (a[b].getAttribute("userdata") == this._canvas_name) {

				c.push(a[b])

			}

		}

		return c

	}

};

dhtmlXChart = function(a) {

	this.name = "Chart";

	if (dhtmlx.assert_enabled()) {

		this._assert()

	}

	dhtmlx.extend(this, dhtmlx.Settings);

	this._parseContainer(a, "dhx_chart");

	dhtmlx.extend(this, dhtmlx.AtomDataLoader);

	dhtmlx.extend(this, dhtmlx.DataLoader);

	this.data.provideApi(this, true);

	dhtmlx.extend(this, dhtmlx.EventSystem);

	dhtmlx.extend(this, dhtmlx.MouseEvents);

	dhtmlx.destructors.push(this);

	dhtmlx.extend(this, dhtmlx.Group);

	dhtmlx.extend(this, dhtmlx.AutoTooltip);

	for ( var b in dhtmlx.chart) {

		dhtmlx.extend(this, dhtmlx.chart[b])

	}

	if (a.preset) {

		this.definePreset(a)

	}

	this._parseSettings(a, this.defaults);

	this._series = [ this._settings ];

	this.data.attachEvent("onStoreUpdated", dhtmlx.bind(function() {

		this.render()

	}, this));

	this.attachEvent("onLocateData", this._switchSerie)

};

dhtmlXChart.prototype = {

	_id : "dhx_area_id",

	on_click : {

		dhx_chart_legend_item : function(j, l, h) {

			var g = h.getAttribute("series_id");

			if (this.callEvent("onLegendClick", [ j, g, h ])) {

				var c = this._settings;

				var b = c.legend.values;

				var a = (b && (typeof b[g].toggle != "undefined")) ? b[g].toggle

						: c.legend.toggle;

				if ((typeof g != "undefined") && this._series.length > 1) {

					if (a) {

						if (h.className.indexOf("hidden") != -1) {

							this.showSeries(g)

						} else {

							this.hideSeries(g)

						}

					}

				}

			}

		}

	},

	on_dblclick : {},

	on_mouse_move : {},

	destructor : function() {

		dhtmlx.Destruction.destructor.apply(this, arguments);

		if (this.canvases) {

			for ( var a in this.canvases) {

				this.canvases[a]._obj = null;

				this.canvases[a] = null

			}

			this.canvases = null

		}

		if (this.legendObj) {

			this.legendObj.innerHTML = "";

			this.legendObj = null

		}

		if (this.config.tooltip) {

			this.config.tooltip._obj = null;

			this.config.tooltip._dataobj = null

		}

	},

	bind : function() {

		dhtmlx.BaseBind.legacyBind.apply(this, arguments)

	},

	sync : function() {

		dhtmlx.BaseBind.legacySync.apply(this, arguments)

	},

	resize : function() {

		for ( var a in this.canvases) {

			this.canvases[a]._resizeCanvas()

		}

		this.render()

	},

	view_setter : function(a) {

		if (!dhtmlx.chart[a]) {

			dhtmlx.error("Chart type extension is not loaded: " + a)

		}

		if (typeof this._settings.offset == "undefined") {

			this._settings.offset = !(a == "area" || a == "stackedArea")

		}

		if (a == "radar" && !this._settings.yAxis) {

			this.define("yAxis", {})

		}

		if (a == "scatter") {

			if (!this._settings.yAxis) {

				this.define("yAxis", {})

			}

			if (!this._settings.xAxis) {

				this.define("xAxis", {})

			}

		}

		return a

	},

	clearCanvas : function() {

		if (this.canvases && typeof this.canvases == "object") {

			for ( var a in this.canvases) {

				this.canvases[a].clearCanvas()

			}

		}

	},

	render : function() {

		var c, b, e, g, a;

		if (!this.callEvent("onBeforeRender", [ this.data ])) {

			return

		}

		if (this.canvases && typeof this.canvases == "object") {

			for (b in this.canvases) {

				this.canvases[b].clearCanvas()

			}

		} else {

			this.canvases = {}

		}

		if (this._settings.legend) {

			if (!this.canvases.legend) {

				this.canvases.legend = new dhtmlx.ui.Canvas(this._obj, "legend")

			}

			this._drawLegend(this.data.getRange(), this._obj.offsetWidth)

		}

		c = this._getChartBounds(this._obj.offsetWidth, this._obj.offsetHeight);

		this._map = g = new dhtmlx.ui.Map(this._id);

		a = this._settings;

		e = this._getChartData();

		for (b = 0; b < this._series.length; b++) {

			this._settings = this._series[b];

			if (!this.canvases[b]) {

				this.canvases[b] = new dhtmlx.ui.Canvas(this._obj, b,

						"z-index:" + (2 + b))

			}

			this["pvt_render_" + this._settings.view](this.canvases[b]

					.getCanvas(), e, c.start, c.end, b, g)

		}

		g.render(this._obj);

		this._obj.lastChild.style.zIndex = 1000;

		this._applyBounds(this._obj.lastChild, c);

		this.callEvent("onAfterRender", []);

		this._settings = a

	},

	_applyBounds : function(c, b) {

		var a = {};

		a.left = b.start.x;

		a.top = b.start.y;

		a.width = b.end.x - b.start.x;

		a.height = b.end.y - b.start.y;

		for ( var e in a) {

			c.style[e] = a[e] + "px"

		}

	},

	_getChartData : function() {

		var e, j, c, g, h, n, a, l, m, b;

		g = this.data.getRange();

		e = (this._settings.view.toLowerCase().indexOf("barh") != -1 ? "yAxis"

				: "xAxis");

		j = this._settings[e];

		if (j && j.units && (typeof j.units == "object")) {

			c = j.units;

			l = [];

			if (typeof c.start != "undefined" && typeof c.end != "undefined"

					&& typeof c.next != "undefined") {

				a = c.start;

				while (a <= c.end) {

					l.push(a);

					a = c.next.call(this, a)

				}

			} else {

				if (Object.prototype.toString.call(c) === "[object Array]") {

					l = c

				}

			}

			n = [];

			if (l.length) {

				m = j.value;

				b = {};

				for (h = 0; h < g.length; h++) {

					b[m(g[h])] = h

				}

				for (h = 0; h < l.length; h++) {

					if (typeof b[l[h]] != "undefined") {

						g[b[l[h]]].$unit = l[h];

						n.push(g[b[l[h]]])

					} else {

						n.push({

							$unit : l[h]

						})

					}

				}

			}

			return n

		}

		return g

	},

	value_setter : dhtmlx.Template.obj_setter,

	xValue_setter : dhtmlx.Template.obj_setter,

	yValue_setter : function(a) {

		this.define("value", a)

	},

	alpha_setter : dhtmlx.Template.obj_setter,

	label_setter : dhtmlx.Template.obj_setter,

	lineColor_setter : dhtmlx.Template.obj_setter,

	borderColor_setter : dhtmlx.Template.obj_setter,

	pieInnerText_setter : dhtmlx.Template.obj_setter,

	gradient_setter : function(a) {

		if ((typeof (a) != "function") && a && (a === true)) {

			a = "light"

		}

		return a

	},

	colormap : {

		RAINBOW : function(a) {

			var b = Math.floor(this.indexById(a.id) / this.dataCount() * 1536);

			if (b == 1536) {

				b -= 1

			}

			return this._rainbow[Math.floor(b / 256)](b % 256)

		}

	},

	color_setter : function(a) {

		return this.colormap[a] || dhtmlx.Template.obj_setter(a)

	},

	fill_setter : function(a) {

		return ((!a || a == 0) ? false : dhtmlx.Template.obj_setter(a))

	},

	definePreset : function(a) {

		this.define("preset", a.preset);

		delete a.preset

	},

	preset_setter : function(h) {

		var e, c, g;

		this.defaults = dhtmlx.extend({}, this.defaults);

		if (typeof dhtmlx.presets.chart[h] == "object") {

			g = dhtmlx.presets.chart[h];

			for (e in g) {

				if (typeof g[e] == "object") {

					if (!this.defaults[e]

							|| typeof this.defaults[e] != "object") {

						this.defaults[e] = dhtmlx.extend({}, g[e])

					} else {

						this.defaults[e] = dhtmlx.extend({}, this.defaults[e]);

						for (c in g[e]) {

							this.defaults[e][c] = g[e][c]

						}

					}

				} else {

					this.defaults[e] = g[e]

				}

			}

			return h

		}

		return false

	},

	legend_setter : function(a) {

		if (!a) {

			if (this.legendObj) {

				this.legendObj.innerHTML = "";

				this.legendObj = null

			}

			return false

		}

		if (typeof (a) != "object") {

			a = {

				template : a

			}

		}

		this._mergeSettings(a,

				{

					width : 150,

					height : 18,

					layout : "y",

					align : "left",

					valign : "bottom",

					template : "",

					toggle : (this._settings.view.toLowerCase().indexOf(

							"stacked") != -1 ? "" : "hide"),

					marker : {

						type : "square",

						width : 15,

						height : 15,

						radius : 3

					},

					margin : 4,

					padding : 3

				});

		a.template = dhtmlx.Template.setter(a.template);

		return a

	},

	defaults : {

		color : "RAINBOW",

		alpha : "1",

		label : false,

		value : "{obj.value}",

		padding : {},

		view : "pie",

		lineColor : "#ffffff",

		cant : 0.5,

		width : 30,

		labelWidth : 100,

		line : {

			width : 2,

			color : "#1293f8"

		},

		seriesMargin : 1,

		seriesPadding : 4,

		item : {

			radius : 3,

			borderColor : "#636363",

			borderWidth : 1,

			color : "#ffffff",

			alpha : 1,

			type : "r",

			shadow : false

		},

		shadow : true,

		gradient : false,

		border : true,

		labelOffset : 20,

		origin : "auto"

	},

	item_setter : function(a) {

		if (typeof (a) != "object") {

			a = {

				color : a,

				borderColor : a

			}

		}

		this._mergeSettings(a, dhtmlx.extend({}, this.defaults.item));

		var c = [ "alpha", "borderColor", "color", "radius" ];

		for (var b = 0; b < c.length; b++) {

			a[c[b]] = dhtmlx.Template.setter(a[c[b]])

		}

		return a

	},

	line_setter : function(a) {

		if (typeof (a) != "object") {

			a = {

				color : a

			}

		}

		dhtmlx.extend(this.defaults.line, a);

		a = dhtmlx.extend({}, this.defaults.line);

		a.color = dhtmlx.Template.setter(a.color);

		return a

	},

	padding_setter : function(a) {

		if (typeof (a) != "object") {

			a = {

				left : a,

				right : a,

				top : a,

				bottom : a

			}

		}

		this._mergeSettings(a, {

			left : 50,

			right : 20,

			top : 35,

			bottom : 40

		});

		return a

	},

	xAxis_setter : function(a) {

		if (!a) {

			return false

		}

		if (typeof (a) != "object") {

			a = {

				template : a

			}

		}

		if (!a.value) {

			a.value = a.template

		}

		this._mergeSettings(a, {

			title : "",

			color : "#000000",

			lineColor : "#cfcfcf",

			template : "{obj}",

			value : "{obj}",

			lines : true

		});

		var b = [ "lineColor", "template", "lines", "value" ];

		this._converToTemplate(b, a);

		this._configXAxis = dhtmlx.extend({}, a);

		return a

	},

	yAxis_setter : function(a) {

		if (!a) {

			return false

		}

		this._mergeSettings(a, {

			title : "",

			color : "#000000",

			lineColor : "#cfcfcf",

			template : "{obj}",

			lines : true,

			bg : "#ffffff"

		});

		var b = [ "lineColor", "template", "lines", "bg" ];

		this._converToTemplate(b, a);

		this._configYAxis = dhtmlx.extend({}, a);

		return a

	},

	_converToTemplate : function(a, b) {

		for (var c = 0; c < a.length; c++) {

			b[a[c]] = dhtmlx.Template.setter(b[a[c]])

		}

	},

	_drawScales : function(g, e, c, j, a, b) {

		var h = 0;

		if (this._settings.yAxis) {

			if (!this.canvases.y) {

				this.canvases.y = new dhtmlx.ui.Canvas(this._obj, "axis_y")

			}

			h = this._drawYAxis(this.canvases.y.getCanvas(), g, e, c, j, a)

		}

		if (this._settings.xAxis) {

			if (!this.canvases.x) {

				this.canvases.x = new dhtmlx.ui.Canvas(this._obj, "axis_x")

			}

			this._drawXAxis(this.canvases.x.getCanvas(), g, e, c, b, h)

		}

		return h

	},

	_drawXAxis : function(s, h, q, o, e, n) {

		var c = q.x - 0.5;

		var r = parseInt((n ? n : o.y), 10) + 0.5;

		var b = o.x;

		var j;

		var a = true;

		var l = (this._settings.origin === 0 && this._settings.view == "stackedBar") ? o.y + 0.5

				: r;

		for (var g = 0; g < h.length; g++) {

			if (this._settings.offset === true) {

				j = c + e / 2 + g * e

			} else {

				j = (g == h.length - 1) ? o.x : c + g * e;

				a = !!g

			}

			j = Math.ceil(j) - 0.5;

			var m = ((this._settings.origin != "auto")

					&& (this._settings.view == "bar") && (parseFloat(this._settings

					.value(h[g])) < this._settings.origin));

			this._drawXAxisLabel(j, l, h[g], a, m);

			if ((this._settings.offset || g)

					&& this._settings.xAxis.lines.call(this, h[g])) {

				this._drawXAxisLine(s, j, o.y, q.y, h[g])

			}

		}

		this.canvases.x.renderTextAt(true, false, c, o.y

				+ this._settings.padding.bottom - 3,

				this._settings.xAxis.title, "dhx_axis_title_x", o.x - q.x);

		this._drawLine(s, c, r, b, r, this._settings.xAxis.color, 1);

		if (!this._settings.xAxis.lines.call(this, {})

				|| !this._settings.offset) {

			return

		}

		this._drawLine(s, b + 0.5, o.y, b + 0.5, q.y + 0.5,

				this._settings.xAxis.color, 0.2)

	},

	_drawYAxis : function(t, y, h, g, l, j) {

		var m;

		var r = {};

		if (!this._settings.yAxis) {

			return

		}

		var v = h.x - 0.5;

		var e = g.y;

		var b = h.y;

		var s = g.y;

		if (this._settings.yAxis.step) {

			m = parseFloat(this._settings.yAxis.step)

		}

		if (typeof this._configYAxis.step == "undefined"

				|| typeof this._configYAxis.start == "undefined"

				|| typeof this._configYAxis.end == "undefined") {

			r = this._calculateScale(l, j);

			l = r.start;

			j = r.end;

			m = r.step;

			this._settings.yAxis.end = j;

			this._settings.yAxis.start = l

		}

		this._setYAxisTitle(h, g);

		if (m === 0) {

			j = l;

			m = 1

		}

		var a = (j == l ? e - b : (e - b) * m / (j - l));

		var w = 0;

		for (var u = l; u <= j; u += m) {

			if (r.fixNum) {

				u = parseFloat((new Number(u)).toFixed(r.fixNum))

			}

			var x = Math.floor(e - w * a) + 0.5;

			if (!(u == l && this._settings.origin == "auto")

					&& this._settings.yAxis.lines.call(this, u)) {

				this._drawLine(t, v, x, g.x, x, this._settings.yAxis.lineColor

						.call(this, u), 1)

			}

			if (u == this._settings.origin) {

				s = x

			}

			var n = u;

			if (m < 1) {

				var o = Math.min(this._log10(m), (l <= 0 ? 0 : this._log10(l)));

				var q = Math.pow(10, -o);

				n = Math.round(u * q) / q;

				u = n

			}

			this.canvases.y.renderText(0, x - 5, this._settings.yAxis

					.template(n.toString()), "dhx_axis_item_y", h.x - 5);

			w++

		}

		this._drawLine(t, v, e + 1, v, b, this._settings.yAxis.color, 1);

		return s

	},

	_setYAxisTitle : function(c, b) {

		var a = "dhx_axis_title_y"

				+ (dhtmlx._isIE && dhtmlx._isIE != 9 ? " dhx_ie_filter" : "");

		var e = this.canvases.y.renderTextAt("middle", false, 0, parseInt(

				(b.y - c.y) / 2 + c.y, 10), this._settings.yAxis.title, a);

		if (e) {

			e.style.left = (dhtmlx.env.transform ? (e.offsetHeight - e.offsetWidth) / 2

					: 0)

					+ "px"

		}

	},

	_calculateScale : function(n, b) {

		if (this._settings.origin != "auto" && this._settings.origin < n) {

			n = this._settings.origin

		}

		var g, e, j;

		g = ((b - n) / 8) || 1;

		var c = Math.floor(this._log10(g));

		var a = Math.pow(10, c);

		var h = g / a;

		h = (h > 5 ? 10 : 5);

		g = parseInt(h, 10) * a;

		if (g > Math.abs(n)) {

			e = (n < 0 ? -g : 0)

		} else {

			var o = Math.abs(n);

			var m = Math.floor(this._log10(o));

			var l = o / Math.pow(10, m);

			e = Math.ceil(l * 10) / 10 * Math.pow(10, m) - g;

			if (o > 1 && g > 0.1) {

				e = Math.ceil(e)

			}

			while (n < 0 ? e <= n : e >= n) {

				e -= g

			}

			if (n < 0) {

				e = -e - 2 * g

			}

		}

		j = e;

		while (j < b) {

			j += g;

			j = parseFloat((new Number(j)).toFixed(Math.abs(c)))

		}

		return {

			start : e,

			end : j,

			step : g,

			fixNum : Math.abs(c)

		}

	},

	_getLimits : function(b, j) {

		var l, h;

		var g = ((arguments.length && b == "h") ? this._configXAxis

				: this._configYAxis);

		j = j || "value";

		if (g && (typeof g.end != "undefined")

				&& (typeof g.start != "undefined") && g.step) {

			l = parseFloat(g.end);

			h = parseFloat(g.start)

		} else {

			l = this.max(this._series[0][j]);

			h = (g && (typeof g.start != "undefined")) ? parseFloat(g.start)

					: this.min(this._series[0][j]);

			if (this._series.length > 1) {

				for (var e = 1; e < this._series.length; e++) {

					var a = this.max(this._series[e][j]);

					var c = this.min(this._series[e][j]);

					if (a > l) {

						l = a

					}

					if (c < h) {

						h = c

					}

				}

			}

		}

		return {

			max : l,

			min : h

		}

	},

	_log10 : function(b) {

		var a = "log";

		return Math.floor((Math[a](b) / Math.LN10))

	},

	_drawXAxisLabel : function(b, h, g, a, e) {

		if (!this._settings.xAxis) {

			return

		}

		var c = this.canvases.x.renderTextAt(e, a, b, h - (e ? 2 : 0),

				this._settings.xAxis.template(g));

		if (c) {

			c.className += " dhx_axis_item_x"

		}

	},

	_drawXAxisLine : function(b, a, e, c, g) {

		if (!this._settings.xAxis || !this._settings.xAxis.lines) {

			return

		}

		this._drawLine(b, a, e, a, c, this._settings.xAxis.lineColor.call(this,

				g), 1)

	},

	_drawLine : function(a, e, j, c, g, b, h) {

		a.strokeStyle = b;

		a.lineWidth = h;

		a.beginPath();

		a.moveTo(e, j);

		a.lineTo(c, g);

		a.stroke();

		a.lineWidth = 1

	},

	_getRelativeValue : function(e, g) {

		var c, a;

		var b = 1;

		if (g != e) {

			c = g - e

		} else {

			c = e

		}

		return [ c, b ]

	},

	_rainbow : [ function(a) {

		return "#FF" + dhtmlx.math.toHex(a / 2, 2) + "00"

	}, function(a) {

		return "#FF" + dhtmlx.math.toHex(a / 2 + 128, 2) + "00"

	}, function(a) {

		return "#" + dhtmlx.math.toHex(255 - a, 2) + "FF00"

	}, function(a) {

		return "#00FF" + dhtmlx.math.toHex(a, 2)

	}, function(a) {

		return "#00" + dhtmlx.math.toHex(255 - a, 2) + "FF"

	}, function(a) {

		return "#" + dhtmlx.math.toHex(a, 2) + "00FF"

	} ],

	addSeries : function(b) {

		var a = this._settings;

		this._settings = dhtmlx.extend({}, a);

		this._parseSettings(b, {});

		this._series.push(this._settings);

		this._settings = a

	},

	_switchSerie : function(h, a, g) {

		var c;

		this._active_serie = (this._series.length == 1 ? a

				.getAttribute("userdata") : this._getActiveSeries(g));

		if (!this._series[this._active_serie]) {

			return

		}

		for (var b = 0; b < this._series.length; b++) {

			c = this._series[b].tooltip;

			if (c) {

				c.disable()

			}

		}

		if (!a.getAttribute("disabled")) {

			c = this._series[this._active_serie].tooltip;

			if (c) {

				c.enable()

			}

		}

	},

	_getActiveSeries : function(h) {

		var m, b, g, c, l, o, n, j;

		b = this._map._areas;

		c = dhtmlx.html.offset(this._obj._htmlmap);

		l = dhtmlx.html.pos(h);

		n = l.x - c.x;

		j = l.y - c.y;

		for (g = 0; g < b.length; g++) {

			m = b[g].points;

			if (n <= m[2] && n >= m[0] && j <= m[3] && j >= m[1]) {

				if (o) {

					if (b[g].index > o.index) {

						o = b[g]

					}

				} else {

					o = b[g]

				}

			}

		}

		return o ? o.index : 0

	},

	hideSeries : function(a) {

		this.canvases[a].hideCanvas();

		if (this._settings.legend.values && this._settings.legend.values[a]) {

			this._settings.legend.values[a].$hidden = true

		}

		this._drawLegend()

	},

	showSeries : function(a) {

		this.canvases[a].showCanvas();

		if (this._settings.legend.values && this._settings.legend.values[a]) {

			delete this._settings.legend.values[a].$hidden

		}

		this._drawLegend()

	},

	_changeColorSV : function(b, g, a) {

		var e, c;

		c = dhtmlx.math.toRgb(b);

		e = dhtmlx.math.rgbToHsv(c[0], c[1], c[2]);

		e[1] *= g;

		e[2] *= a;

		return "rgb(" + dhtmlx.math.hsvToRgb(e[0], e[1], e[2]) + ")"

	},

	_setBorderStyles : function(a, b) {

		var e, c;

		c = dhtmlx.math.toRgb(b);

		e = dhtmlx.math.rgbToHsv(c[0], c[1], c[2]);

		e[2] /= 2;

		b = "rgb(" + dhtmlx.math.hsvToRgb(e[0], e[1], e[2]) + ")";

		a.strokeStyle = b;

		if (a.globalAlpha == 1) {

			a.globalAlpha = 0.9

		}

	},

	_drawLegend : function(g, b) {

		var h, o, u, q, j, r, a, m = 0, l = 0, t, n, e, s;

		g = g || [];

		b = b || this._obj.offsetWidth;

		t = this.canvases.legend.getCanvas();

		o = this._settings.legend;

		a = (this._settings.legend.layout != "x" ? "width:" + o.width + "px"

				: "");

		if (this.legendObj) {

			this.legendObj.innerHTML = "";

			this.legendObj.parentNode.removeChild(this.legendObj)

		}

		this.canvases.legend.clearCanvas(true);

		u = dhtmlx.html.create("DIV", {

			"class" : "dhx_chart_legend",

			style : "left:" + m + "px; top:" + l + "px;" + a

		}, "");

		if (o.padding) {

			u.style.padding = o.padding + "px"

		}

		this.legendObj = u;

		this._obj.appendChild(u);

		j = [];

		if (!o.values) {

			for (h = 0; h < g.length; h++) {

				j.push(this._drawLegendText(u, o.template(g[h])))

			}

		} else {

			for (h = 0; h < o.values.length; h++) {

				j

						.push(this

								._drawLegendText(

										u,

										o.values[h].text,

										(typeof o.values[h].id != "undefined" ? typeof o.values[h].id

												: h), o.values[h].$hidden))

			}

		}

		r = u.offsetWidth;

		q = u.offsetHeight;

		if (r < this._obj.offsetWidth) {

			if (o.layout == "x" && o.align == "center") {

				m = (this._obj.offsetWidth - r) / 2

			}

			if (o.align == "right") {

				m = this._obj.offsetWidth - r

			}

			if (o.margin && o.align != "center") {

				m += (o.align == "left" ? 1 : -1) * o.margin

			}

		}

		if (q < this._obj.offsetHeight) {

			if (o.valign == "middle" && o.align != "center" && o.layout != "x") {

				l = (this._obj.offsetHeight - q) / 2

			} else {

				if (o.valign == "bottom") {

					l = this._obj.offsetHeight - q

				}

			}

			if (o.margin && o.valign != "middle") {

				l += (o.valign == "top" ? 1 : -1) * o.margin

			}

		}

		u.style.left = m + "px";

		u.style.top = l + "px";

		t.save();

		for (h = 0; h < j.length; h++) {

			s = j[h];

			if (o.values && o.values[h].$hidden) {

				e = true;

				n = (o.values[h].disableColor ? o.values[h].disableColor

						: "#d9d9d9")

			} else {

				e = false;

				n = (o.values ? o.values[h].color : this._settings.color.call(

						this, g[h]))

			}

			var c = (o.marker.position == "right" ? s.offsetWidth

					- o.marker.width : 0);

			this._drawLegendMarker(t, s.offsetLeft + m + c, s.offsetTop + l, n,

					s.offsetHeight, e, h)

		}

		t.restore();

		j = null

	},

	_drawLegendText : function(a, h, b, g) {

		var e = "";

		var c = this._settings.legend;

		if (c.layout == "x") {

			e = "float:left;"

		}

		var l = c.marker.position;

		var j = dhtmlx.html.create("DIV", {

			style : e + "padding-" + (l && l == "right" ? "right" : "left")

					+ ":" + (10 + c.marker.width) + "px",

			"class" : "dhx_chart_legend_item" + (g ? " hidden" : "")

		}, h);

		if (arguments.length > 2) {

			j.setAttribute("series_id", b)

		}

		a.appendChild(j);

		return j

	},

	_drawLegendMarker : function(u, q, o, g, t, h, l) {

		var b = [];

		var j = this._settings.legend.marker;

		var s = this._settings.legend.values;

		var n = (s && s[l].markerType ? s[l].markerType : j.type);

		if (g) {

			u.fillStyle = g;

			u.strokeStyle = this._getDarkenColor(g, 0.75)

		}

		u.beginPath();

		if (n == "round" || !j.radius) {

			u.lineWidth = j.height;

			u.lineCap = n;

			q += u.lineWidth / 2 + 5;

			o += t / 2;

			u.moveTo(q, o);

			var a = q + j.width - j.height + 1;

			u.lineTo(a, o)

		} else {

			if (n == "item") {

				if (this._settings.line && this._settings.view != "scatter"

						&& !this._settings.disableLines) {

					u.beginPath();

					u.lineWidth = this._series[l].line.width;

					u.strokeStyle = h ? g : this._series[l].line.color.call(

							this, {});

					var c = q + 5;

					var r = o + t / 2;

					u.moveTo(c, r);

					var a = c + j.width;

					u.lineTo(a, r);

					u.stroke()

				}

				var e = this._series[l].item;

				var m = parseInt(e.radius.call(this, {}), 10) || 0;

				if (m) {

					if (e.type == "image" && e.src) {

						this._drawImage(u, q + 5, o + j.height / 2 - 5, e.src,

								m * 2, m * 2);

						return

					} else {

						u.beginPath();

						if (h) {

							u.lineWidth = e.borderWidth;

							u.strokeStyle = g;

							u.fillStyle = g

						} else {

							u.lineWidth = e.borderWidth;

							u.fillStyle = e.color.call(this, {});

							u.strokeStyle = e.borderColor.call(this, {});

							u.globalAlpha = e.alpha.call(this, {})

						}

						u.beginPath();

						q += j.width / 2 + 5;

						o += t / 2;

						this._strokeChartItem(u, q, o, m + 1, e.type);

						u.fill();

						u.stroke()

					}

				}

				u.globalAlpha = 1

			} else {

				u.lineWidth = 1;

				q += 5;

				o += parseInt(t / 2 - j.height / 2, 10);

				b = [

						[ q + j.radius, o + j.radius, j.radius, Math.PI,

								3 * Math.PI / 2, false ],

						[ q + j.width - j.radius, o ],

						[ q + j.width - j.radius, o + j.radius, j.radius,

								-Math.PI / 2, 0, false ],

						[ q + j.width, o + j.height - j.radius ],

						[ q + j.width - j.radius, o + j.height - j.radius,

								j.radius, 0, Math.PI / 2, false ],

						[ q + j.radius, o + j.height ],

						[ q + j.radius, o + j.height - j.radius, j.radius,

								Math.PI / 2, Math.PI, false ],

						[ q, o + j.radius ] ];

				this._path(u, b)

			}

		}

		u.stroke();

		u.fill()

	},

	_getDarkenColor : function(a, e) {

		var c, b;

		b = dhtmlx.math.toRgb(a);

		c = dhtmlx.math.rgbToHsv(b[0], b[1], b[2]);

		c[2] = c[2] * e;

		return "rgb(" + dhtmlx.math.hsvToRgb(c[0], c[1], c[2]) + ")"

	},

	_getChartBounds : function(a, j) {

		var m, c, l, b;

		m = this._settings.padding.left;

		c = this._settings.padding.top;

		l = a - this._settings.padding.right;

		b = j - this._settings.padding.bottom;

		if (this._settings.legend) {

			var g = this._settings.legend;

			var h = this._settings.legend.width;

			var e = this._settings.legend.height;

			if (g.layout == "x") {

				if (g.valign == "center") {

					if (g.align == "right") {

						l -= h

					} else {

						if (g.align == "left") {

							m += h

						}

					}

				} else {

					if (g.valign == "bottom") {

						b -= e

					} else {

						c += e

					}

				}

			} else {

				if (g.align == "right") {

					l -= h

				} else {

					if (g.align == "left") {

						m += h

					}

				}

			}

		}

		return {

			start : {

				x : m,

				y : c

			},

			end : {

				x : l,

				y : b

			}

		}

	},

	_getStackedLimits : function(g) {

		var b, a, h, e, c;

		if (this._settings.yAxis

				&& (typeof this._settings.yAxis.end != "undefined")

				&& (typeof this._settings.yAxis.start != "undefined")

				&& this._settings.yAxis.step) {

			h = parseFloat(this._settings.yAxis.end);

			e = parseFloat(this._settings.yAxis.start)

		} else {

			for (b = 0; b < g.length; b++) {

				g[b].$sum = 0;

				g[b].$min = Infinity;

				for (a = 0; a < this._series.length; a++) {

					c = parseFloat(this._series[a].value(g[b]) || 0);

					if (isNaN(c)) {

						continue

					}

					if (this._series[a].view.toLowerCase().indexOf("stacked") != -1) {

						g[b].$sum += c

					}

					if (c < g[b].$min) {

						g[b].$min = c

					}

				}

			}

			h = -Infinity;

			e = Infinity;

			for (b = 0; b < g.length; b++) {

				if (g[b].$sum > h) {

					h = g[b].$sum

				}

				if (g[b].$min < e) {

					e = g[b].$min

				}

			}

			if (e > 0) {

				e = 0

			}

		}

		return {

			max : h,

			min : e

		}

	},

	_setBarGradient : function(s, b, o, a, m, l, e, c) {

		var n, g, j, h, r, q;

		if (l == "light") {

			if (c == "x") {

				n = s.createLinearGradient(b, o, a, o)

			} else {

				n = s.createLinearGradient(b, o, b, m)

			}

			q = [ [ 0, "#FFFFFF" ], [ 0.9, e ], [ 1, e ] ];

			g = 2

		} else {

			if (l == "falling" || l == "rising") {

				if (c == "x") {

					n = s.createLinearGradient(b, o, a, o)

				} else {

					n = s.createLinearGradient(b, o, b, m)

				}

				j = dhtmlx.math.toRgb(e);

				h = dhtmlx.math.rgbToHsv(j[0], j[1], j[2]);

				h[1] *= 1 / 2;

				r = "rgb(" + dhtmlx.math.hsvToRgb(h[0], h[1], h[2]) + ")";

				if (l == "falling") {

					q = [ [ 0, r ], [ 0.7, e ], [ 1, e ] ]

				} else {

					if (l == "rising") {

						q = [ [ 0, e ], [ 0.3, e ], [ 1, r ] ]

					}

				}

				g = 0

			} else {

				s.globalAlpha = 0.37;

				g = 0;

				if (c == "x") {

					n = s.createLinearGradient(b, m, b, o)

				} else {

					n = s.createLinearGradient(b, o, a, o)

				}

				q = [ [ 0, "#9d9d9d" ], [ 0.3, "#e8e8e8" ],

						[ 0.45, "#ffffff" ], [ 0.55, "#ffffff" ],

						[ 0.7, "#e8e8e8" ], [ 1, "#9d9d9d" ] ]

			}

		}

		this._gradient(n, q);

		return {

			gradient : n,

			offset : g

		}

	},

	_getPositionByAngle : function(c, b, g, e) {

		c *= (-1);

		b = b + Math.cos(c) * e;

		g = g - Math.sin(c) * e;

		return {

			x : b,

			y : g

		}

	},

	_gradient : function(c, b) {

		for (var a = 0; a < b.length; a++) {

			c.addColorStop(b[a][0], b[a][1])

		}

	},

	_path : function(a, c) {

		var b, e;

		for (b = 0; b < c.length; b++) {

			e = (b ? "lineTo" : "moveTo");

			if (c[b].length > 2) {

				e = "arc"

			}

			a[e].apply(a, c[b])

		}

	},

	_circle : function(b, a, e, c) {

		b.arc(a, e, c, Math.PI * 2, true)

	},

	_addMapRect : function(e, g, a, c, b) {

		e.addRect(g,

				[ a[0].x - c.x, a[0].y - c.y, a[1].x - c.x, a[1].y - c.y ], b)

	}

};

dhtmlx.compat("layout");

if (typeof (window.dhtmlXCellObject) != "undefined") {

	dhtmlXCellObject.prototype.attachChart = function(a) {

		this.callEvent("_onBeforeContentAttach", [ "chart" ]);

		var b = document.createElement("DIV");

		b.id = "dhxChartObj_" + window.dhx4.newId();

		b.style.width = "100%";

		b.style.height = "100%";

		document.body.appendChild(b);

		this._attachObject(b);

		a.container = b.id;

		this.dataType = "chart";

		this.dataObj = new dhtmlXChart(a);

		if (!this.dataObj.setSizes) {

			this.dataObj.setSizes = function() {

				if (this.resize) {

					this.resize()

				} else {

					this.render()

				}

			}

		}

		return this.dataObj

	}

}

dhtmlx.ui.pager = function(a) {

	this.name = "Pager";

	if (dhtmlx.assert_enabled()) {

		this._assert()

	}

	dhtmlx.extend(this, dhtmlx.Settings);

	this._parseContainer(a, "dhx_pager");

	dhtmlx.extend(this, dhtmlx.EventSystem);

	dhtmlx.extend(this, dhtmlx.SingleRender);

	dhtmlx.extend(this, dhtmlx.MouseEvents);

	this._parseSettings(a, {

		size : 10,

		page : -1,

		group : 5,

		count : 0,

		type : "default"

	});

	this.data = this._settings;

	this.refresh()

};

dhtmlx.ui.pager.prototype = {

	_id : "dhx_p_id",

	on_click : {

		dhx_pager_item : function(a, b) {

			this.select(b)

		}

	},

	select : function(a) {

		switch (a) {

		case "next":

			a = this._settings.page + 1;

			break;

		case "prev":

			a = this._settings.page - 1;

			break;

		case "first":

			a = 0;

			break;

		case "last":

			a = this._settings.limit - 1;

			break;

		default:

			break

		}

		if (a < 0) {

			a = 0

		}

		if (a >= this.data.limit) {

			a = this.data.limit - 1

		}

		if (this.callEvent("onBeforePageChange", [ this._settings.page, a ])) {

			this.data.page = a * 1;

			this.refresh();

			this.callEvent("onAfterPageChange", [ a ])

		}

	},

	types : {

		"default" : {

			template : dhtmlx.Template.fromHTML("{common.pages()}"),

			pages : function(c) {

				var b = "";

				if (c.page == -1) {

					return ""

				}

				c.min = c.page - Math.round((c.group - 1) / 2);

				c.max = c.min + c.group - 1;

				if (c.min < 0) {

					c.max += c.min * (-1);

					c.min = 0

				}

				if (c.max >= c.limit) {

					c.min -= Math.min(c.min, c.max - c.limit + 1);

					c.max = c.limit - 1

				}

				for (var a = (c.min || 0); a <= c.max; a++) {

					b += this.button({

						id : a,

						index : (a + 1),

						selected : (a == c.page ? "_selected" : "")

					})

				}

				return b

			},

			page : function(a) {

				return a.page + 1

			},

			first : function() {

				return this.button({

					id : "first",

					index : " &lt;&lt; ",

					selected : ""

				})

			},

			last : function() {

				return this.button({

					id : "last",

					index : " &gt;&gt; ",

					selected : ""

				})

			},

			prev : function() {

				return this.button({

					id : "prev",

					index : "&lt;",

					selected : ""

				})

			},

			next : function() {

				return this.button({

					id : "next",

					index : "&gt;",

					selected : ""

				})

			},

			button : dhtmlx.Template

					.fromHTML("<div dhx_p_id='{obj.id}' class='dhx_pager_item{obj.selected}'>{obj.index}</div>")

		}

	},

	refresh : function() {

		var a = this._settings;

		a.limit = Math.ceil(a.count / a.size);

		if (a.limit && a.limit != a.old_limit) {

			a.page = Math.min(a.limit - 1, a.page)

		}

		var b = a.page;

		if (b != -1 && (b != a.old_page) || (a.limit != a.old_limit)) {

			this.render();

			this.callEvent("onRefresh", []);

			a.old_limit = a.limit;

			a.old_page = a.page

		}

	},

	template_item_start : dhtmlx.Template.fromHTML("<div>"),

	template_item_end : dhtmlx.Template.fromHTML("</div>")

};

dhtmlx.DataProcessor = {

	_dp_init : function(b) {

		var a = "_methods";

		b[a] = [ "setItemStyle", "", "changeId", "remove" ];

		this.attachEvent("onAfterAdd", function(c) {

			b.setUpdated(c, true, "inserted")

		});

		this.data.attachEvent("onStoreLoad", dhtmlx.bind(function(e, c) {

			if (e.getUserData) {

				e.getUserData(c, this._userdata)

			}

		}, this));

		this.attachEvent("onBeforeDelete", function(e) {

			if (b._silent_mode) {

				return true

			}

			var c = b.getState(e);

			if (c == "inserted") {

				b.setUpdated(e, false);

				return true

			}

			if (c == "deleted") {

				return false

			}

			if (c == "true_deleted") {

				return true

			}

			b.setUpdated(e, true, "deleted");

			return false

		});

		this.attachEvent("onAfterEditStop", function(c) {

			b.setUpdated(c, true, "updated")

		});

		this.attachEvent("onBindUpdate", function(c) {

			window.setTimeout(function() {

				b.setUpdated(c.id, true, "updated")

			}, 1)

		});

		a = "_getRowData";

		b[a] = function(j, c) {

			var g = this.obj.data.get(j);

			var h = {};

			for ( var e in g) {

				if (e.indexOf("_") === 0) {

					continue

				}

				h[e] = g[e]

			}

			return h

		};

		a = "_clearUpdateFlag";

		b[a] = function() {

		};

		this._userdata = {};

		b.attachEvent("insertCallback", this._dp_callback);

		b.attachEvent("updateCallback", this._dp_callback);

		b.attachEvent("deleteCallback", function(c, e) {

			this.obj.setUserData(e, this.action_param, "true_deleted");

			this.obj.remove(e)

		});

		dhtmlx.compat("dataProcessor", b)

	},

	_dp_callback : function(a, b) {

		this.obj.data.set(b, dhtmlx.DataDriver.xml.getDetails(a.firstChild));

		this.obj.data.refresh(b)

	},

	setItemStyle : function(c, a) {

		var b = this._locateHTML(c);

		if (b) {

			b.style.cssText += ";" + a

		}

	},

	changeId : function(b, a) {

		this.data.changeId(b, a);

		this.refresh()

	},

	setUserData : function(c, a, b) {

		if (c) {

			this.data.get(c)[a] = b

		} else {

			this._userdata[a] = b

		}

	},

	getUserData : function(b, a) {

		return b ? this.data.get(b)[a] : this._userdata[a]

	}

};

(function() {

	var a = "_dp_init";

	dhtmlx.DataProcessor[a] = dhtmlx.DataProcessor._dp_init

})();

dhtmlx.compat.dnd = function() {

	if (window.dhtmlDragAndDropObject) {

		var l = "_dragged";

		var e = dhtmlDragAndDropObject.prototype.checkLanding;

		dhtmlDragAndDropObject.prototype.checkLanding = function(n, o, m) {

			e.apply(this, arguments);

			if (!m) {

				var q = dhtmlx.DragControl._drag_context = dhtmlx.DragControl._drag_context

						|| {};

				if (!q.from) {

					q.from = this.dragStartObject

				}

				dhtmlx.DragControl._checkLand(n, o, true)

			}

		};

		var b = dhtmlDragAndDropObject.prototype.stopDrag;

		dhtmlDragAndDropObject.prototype.stopDrag = function(o, m, n) {

			if (!n) {

				if (dhtmlx.DragControl._last) {

					dhtmlx.DragControl._active = j.dragStartNode;

					dhtmlx.DragControl._stopDrag(o, true)

				}

			}

			b.apply(this, arguments)

		};

		var j = new dhtmlDragAndDropObject();

		var g = dhtmlx.DragControl._startDrag;

		dhtmlx.DragControl._startDrag = function() {

			g.apply(this, arguments);

			var q = dhtmlx.DragControl._drag_context;

			if (!q) {

				return

			}

			var o = [];

			var n = [];

			for (var m = 0; m < q.source.length; m++) {

				o[m] = {

					idd : q.source[m]

				};

				n.push(q.source[m])

			}

			j.dragStartNode = {

				parentNode : {},

				parentObject : {

					idd : o,

					id : (n.length == 1 ? n[0] : n),

					treeNod : {

						object : q.from

					}

				}

			};

			j.dragStartNode.parentObject.treeNod[l] = o;

			j.dragStartObject = q.from

		};

		var h = dhtmlx.DragControl._checkLand;

		dhtmlx.DragControl._checkLand = function(n, o, m) {

			h.apply(this, arguments);

			if (!this._last && !m) {

				n = j.checkLanding(n, o, true)

			}

		};

		var a = dhtmlx.DragControl._stopDrag;

		dhtmlx.DragControl._stopDrag = function(n, m) {

			a.apply(this, arguments);

			if (j.lastLanding && !m) {

				j.stopDrag(n, false, true)

			}

		};

		var c = dhtmlx.DragControl.getMaster;

		dhtmlx.DragControl.getMaster = function(n) {

			var o = null;

			if (n) {

				o = c.apply(this, arguments)

			}

			if (!o) {

				o = j.dragStartObject;

				var q = [];

				var r = o[l];

				for (var m = 0; m < r.length; m++) {

					q.push(r[m].idd || r[m].id)

				}

				dhtmlx.DragControl._drag_context.source = q

			}

			return o

		}

	}

};

dhtmlx.DataMove = {

	_init : function() {

		dhtmlx

				.assert(this.data,

						"DataMove :: Component doesn't have DataStore")

	},

	copy : function(b, g, a, e) {

		var c = this.get(b);

		if (!c) {

			dhtmlx.log("Warning", "Incorrect ID in DataMove::copy");

			return

		}

		if (a) {

			dhtmlx.assert(a.externalData,

					"DataMove :: External object doesn't support operation");

			c = a.externalData(c)

		}

		a = a || this;

		return a.add(a.externalData(c, e), g)

	},

	move : function(c, j, b, h) {

		if (c instanceof Array) {

			for (var e = 0; e < c.length; e++) {

				var a = (b || this).indexById(this.move(c[e], j, b, c[e]));

				if (c[e + 1]) {

					j = a + (this.indexById(c[e + 1]) < a ? 0 : 1)

				}

			}

			return

		}

		nid = c;

		if (j < 0) {

			dhtmlx.log("Info",

					"DataMove::move - moving outside of bounds is ignored");

			return

		}

		var g = this.get(c);

		if (!g) {

			dhtmlx.log("Warning", "Incorrect ID in DataMove::move");

			return

		}

		if (!b || b == this) {

			this.data.move(this.indexById(c), j)

		} else {

			dhtmlx.assert(b.externalData,

					"DataMove :: External object doesn't support operation");

			nid = b.add(b.externalData(g, h), j);

			this.remove(c)

		}

		return nid

	},

	moveUp : function(b, a) {

		return this.move(b, this.indexById(b) - (a || 1))

	},

	moveDown : function(b, a) {

		return this.moveUp(b, (a || 1) * -1)

	},

	moveTop : function(a) {

		return this.move(a, 0)

	},

	moveBottom : function(a) {

		return this.move(a, this.data.dataCount() - 1)

	},

	externalData : function(a, c) {

		var b = dhtmlx.extend({}, a);

		b.id = c || dhtmlx.uid();

		b.$selected = b.$template = null;

		return b

	}

};

dhtmlx.DragControl = {

	_drag_masters : dhtmlx.toArray([ "dummy" ]),

	addDrop : function(b, c, a) {

		b = dhtmlx.toNode(b);

		b.dhx_drop = this._getCtrl(c);

		if (a) {

			b.dhx_master = true

		}

	},

	_getCtrl : function(b) {

		b = b || dhtmlx.DragControl;

		var a = this._drag_masters.find(b);

		if (a < 0) {

			a = this._drag_masters.length;

			this._drag_masters.push(b)

		}

		return a

	},

	addDrag : function(a, b) {

		a = dhtmlx.toNode(a);

		a.dhx_drag = this._getCtrl(b);

		dhtmlx.event(a, "mousedown", this._preStart, a)

	},

	_preStart : function(a) {

		if (dhtmlx.DragControl._active) {

			dhtmlx.DragControl._preStartFalse();

			dhtmlx.DragControl.destroyDrag()

		}

		dhtmlx.DragControl._active = this;

		dhtmlx.DragControl._start_pos = {

			x : a.pageX,

			y : a.pageY

		};

		dhtmlx.DragControl._dhx_drag_mm = dhtmlx.event(document.body,

				"mousemove", dhtmlx.DragControl._startDrag);

		dhtmlx.DragControl._dhx_drag_mu = dhtmlx.event(document.body,

				"mouseup", dhtmlx.DragControl._preStartFalse);

		dhtmlx.DragControl._dhx_drag_sc = dhtmlx.event(this, "scroll",

				dhtmlx.DragControl._preStartFalse);

		a.cancelBubble = true;

		return false

	},

	_preStartFalse : function(a) {

		dhtmlx.DragControl._dhx_drag_mm = dhtmlx

				.eventRemove(dhtmlx.DragControl._dhx_drag_mm);

		dhtmlx.DragControl._dhx_drag_mu = dhtmlx

				.eventRemove(dhtmlx.DragControl._dhx_drag_mu);

		dhtmlx.DragControl._dhx_drag_sc = dhtmlx

				.eventRemove(dhtmlx.DragControl._dhx_drag_sc)

	},

	_startDrag : function(a) {

		var b = {

			x : a.pageX,

			y : a.pageY

		};

		if (Math.abs(b.x - dhtmlx.DragControl._start_pos.x) < 5

				&& Math.abs(b.y - dhtmlx.DragControl._start_pos.y) < 5) {

			return

		}

		dhtmlx.DragControl._preStartFalse();

		if (!dhtmlx.DragControl.createDrag(a)) {

			return

		}

		dhtmlx.DragControl.sendSignal("start");

		dhtmlx.DragControl._dhx_drag_mm = dhtmlx.event(document.body,

				"mousemove", dhtmlx.DragControl._moveDrag);

		dhtmlx.DragControl._dhx_drag_mu = dhtmlx.event(document.body,

				"mouseup", dhtmlx.DragControl._stopDrag);

		dhtmlx.DragControl._moveDrag(a)

	},

	_stopDrag : function(a) {

		dhtmlx.DragControl._dhx_drag_mm = dhtmlx

				.eventRemove(dhtmlx.DragControl._dhx_drag_mm);

		dhtmlx.DragControl._dhx_drag_mu = dhtmlx

				.eventRemove(dhtmlx.DragControl._dhx_drag_mu);

		if (dhtmlx.DragControl._last) {

			dhtmlx.DragControl.onDrop(dhtmlx.DragControl._active,

					dhtmlx.DragControl._last, this._landing, a);

			dhtmlx.DragControl.onDragOut(dhtmlx.DragControl._active,

					dhtmlx.DragControl._last, null, a)

		}

		dhtmlx.DragControl.destroyDrag();

		dhtmlx.DragControl.sendSignal("stop")

	},

	_moveDrag : function(a) {

		var b = dhtmlx.html.pos(a);

		dhtmlx.DragControl._html.style.top = b.y + dhtmlx.DragControl.top

				+ "px";

		dhtmlx.DragControl._html.style.left = b.x + dhtmlx.DragControl.left

				+ "px";

		if (dhtmlx.DragControl._skip) {

			dhtmlx.DragControl._skip = false

		} else {

			dhtmlx.DragControl._checkLand((a.srcElement || a.target), a)

		}

		a.cancelBubble = true;

		return false

	},

	_checkLand : function(a, b) {

		while (a && a.tagName != "BODY") {

			if (a.dhx_drop) {

				if (this._last && (this._last != a || a.dhx_master)) {

					this.onDragOut(this._active, this._last, a, b)

				}

				if (!this._last || this._last != a || a.dhx_master) {

					this._last = null;

					this._landing = this.onDragIn(dhtmlx.DragControl._active,

							a, b);

					if (this._landing) {

						this._last = a

					}

					return

				}

				return

			}

			a = a.parentNode

		}

		if (this._last) {

			this._last = this._landing = this.onDragOut(this._active,

					this._last, null, b)

		}

	},

	sendSignal : function(a) {

		dhtmlx.DragControl.active = (a == "start")

	},

	getMaster : function(a) {

		return this._drag_masters[a.dhx_drag || a.dhx_drop]

	},

	getContext : function(a) {

		return this._drag_context

	},

	createDrag : function(h) {

		var c = dhtmlx.DragControl._active;

		var g = this._drag_masters[c.dhx_drag];

		var b;

		if (g.onDragCreate) {

			b = g.onDragCreate(c, h);

			b.style.position = "absolute";

			b.style.zIndex = dhtmlx.zIndex.drag;

			b.onmousemove = dhtmlx.DragControl._skip_mark

		} else {

			var j = dhtmlx.DragControl.onDrag(c, h);

			if (!j) {

				return false

			}

			var b = document.createElement("DIV");

			b.innerHTML = j;

			b.className = "dhx_drag_zone";

			b.onmousemove = dhtmlx.DragControl._skip_mark;

			document.body.appendChild(b)

		}

		dhtmlx.DragControl._html = b;

		return true

	},

	_skip_mark : function() {

		dhtmlx.DragControl._skip = true

	},

	destroyDrag : function() {

		var b = dhtmlx.DragControl._active;

		var c = this._drag_masters[b.dhx_drag];

		if (c && c.onDragDestroy) {

			c.onDragDestroy(b, dhtmlx.DragControl._html)

		} else {

			dhtmlx.html.remove(dhtmlx.DragControl._html)

		}

		dhtmlx.DragControl._landing = dhtmlx.DragControl._active = dhtmlx.DragControl._last = dhtmlx.DragControl._html = null

	},

	top : 5,

	left : 5,

	onDragIn : function(c, b, g) {

		var a = this._drag_masters[b.dhx_drop];

		if (a.onDragIn && a != this) {

			return a.onDragIn(c, b, g)

		}

		b.className = b.className + " dhx_drop_zone";

		return b

	},

	onDragOut : function(c, b, h, g) {

		var a = this._drag_masters[b.dhx_drop];

		if (a.onDragOut && a != this) {

			return a.onDragOut(c, b, h, g)

		}

		b.className = b.className.replace("dhx_drop_zone", "");

		return null

	},

	onDrop : function(c, b, h, g) {

		var a = this._drag_masters[b.dhx_drop];

		dhtmlx.DragControl._drag_context.from = dhtmlx.DragControl.getMaster(c);

		if (a.onDrop && a != this) {

			return a.onDrop(c, b, h, g)

		}

		b.appendChild(c)

	},

	onDrag : function(b, c) {

		var a = this._drag_masters[b.dhx_drag];

		if (a.onDrag && a != this) {

			return a.onDrag(b, c)

		}

		dhtmlx.DragControl._drag_context = {

			source : b,

			from : b

		};

		return "<div style='" + b.style.cssText + "'>" + b.innerHTML + "</div>"

	}

};

dhtmlx.DragItem = {

	_init : function() {

		dhtmlx.assert(this.move,

				"DragItem :: Component doesn't have DataMove interface");

		dhtmlx.assert(this.locate,

				"DragItem :: Component doesn't have RenderStack interface");

		dhtmlx.assert(dhtmlx.DragControl,

				"DragItem :: DragControl is not included");

		if (!this._settings || this._settings.drag) {

			dhtmlx.DragItem._initHandlers(this)

		} else {

			if (this._settings) {

				this.drag_setter = function(a) {

					if (a) {

						this._initHandlers(this);

						delete this.drag_setter

					}

					return a

				}

			}

		}

		if (this.dragMarker) {

			this.attachEvent("onBeforeDragIn", this.dragMarker);

			this.attachEvent("onDragOut", this.dragMarker)

		}

	},

	_initHandlers : function(a) {

		dhtmlx.DragControl.addDrop(a._obj, a, true);

		dhtmlx.DragControl.addDrag(a._obj, a)

	},

	onDragIn : function(g, c, h) {

		var l = this.locate(h) || null;

		var b = dhtmlx.DragControl._drag_context;

		var j = dhtmlx.DragControl.getMaster(g);

		var a = (this._locateHTML(l) || this._obj);

		if (a == dhtmlx.DragControl._landing) {

			return a

		}

		b.target = l;

		b.to = j;

		if (!this.callEvent("onBeforeDragIn", [ b, h ])) {

			b.id = null;

			return null

		}

		dhtmlx.html.addCss(a, "dhx_drag_over");

		return a

	},

	onDragOut : function(g, c, l, h) {

		var j = this.locate(h) || null;

		if (l != this._dataobj) {

			j = null

		}

		var b = (this._locateHTML(j) || (l ? dhtmlx.DragControl.getMaster(l)._obj

				: window.undefined));

		if (b == dhtmlx.DragControl._landing) {

			return null

		}

		var a = dhtmlx.DragControl._drag_context;

		dhtmlx.html.removeCss(dhtmlx.DragControl._landing, "dhx_drag_over");

		a.target = a.to = null;

		this.callEvent("onDragOut", [ a, h ]);

		return null

	},

	onDrop : function(c, b, h, g) {

		var a = dhtmlx.DragControl._drag_context;

		a.to = this;

		a.index = a.target ? this.indexById(a.target) : this.dataCount();

		a.new_id = dhtmlx.uid();

		if (!this.callEvent("onBeforeDrop", [ a, g ])) {

			return

		}

		if (a.from == a.to) {

			this.move(a.source, a.index)

		} else {

			if (a.from) {

				a.from.move(a.source, a.index, a.to, a.new_id)

			} else {

				dhtmlx.error("Unsopported d-n-d combination")

			}

		}

		this.callEvent("onAfterDrop", [ a, g ])

	},

	onDrag : function(c, h) {

		var j = this.locate(h);

		var g = [ j ];

		if (j) {

			if (this.getSelected) {

				var b = this.getSelected();

				if (dhtmlx.PowerArray.find.call(b, j) != -1) {

					g = b

				}

			}

			var a = dhtmlx.DragControl._drag_context = {

				source : g,

				start : j

			};

			a.from = this;

			if (this.callEvent("onBeforeDrag", [ a, h ])) {

				return a.html || this._toHTML(this.get(j))

			}

		}

		return null

	}

};

dhtmlx.EditAbility = {

	_init : function(a) {

		this._edit_id = null;

		this._edit_bind = null;

		dhtmlx.assert(this.data,

				"EditAbility :: Component doesn't have DataStore");

		dhtmlx.assert(this._locateHTML,

				"EditAbility :: Component doesn't have RenderStack");

		this.attachEvent("onEditKeyPress", function(c, e, b) {

			if (c == 13 && !b) {

				this.stopEdit()

			} else {

				if (c == 27) {

					this.stopEdit(true)

				}

			}

		});

		this.attachEvent("onBeforeRender", function() {

			this.stopEdit()

		})

	},

	isEdit : function() {

		return this._edit_id

	},

	edit : function(b) {

		if (this.stopEdit(false, b)) {

			if (!this.callEvent("onBeforeEditStart", [ b ])) {

				return

			}

			var a = this.data.get(b);

			if (a.$template) {

				return

			}

			a.$template = "edit";

			this.data.refresh(b);

			this._edit_id = b;

			this._save_binding(b);

			this._edit_bind(true, a);

			this.callEvent("onAfterEditStart", [ b ])

		}

	},

	stopEdit : function(c, g) {

		if (!this._edit_id) {

			return true

		}

		if (this._edit_id == g) {

			return false

		}

		var a = {};

		if (!c) {

			this._edit_bind(false, a)

		} else {

			a = null

		}

		if (!this.callEvent("onBeforeEditStop", [ this._edit_id, a ])) {

			return false

		}

		var b = this.data.get(this._edit_id);

		b.$template = null;

		if (!c) {

			this._edit_bind(false, b)

		}

		var e = this._edit_id;

		this._edit_bind = this._edit_id = null;

		this.data.refresh(e);

		this.callEvent("onAfterEditStop", [ e, a ]);

		return true

	},

	_save_binding : function(l) {

		var a = this._locateHTML(l);

		var c = "";

		var h = "";

		var g = [];

		if (a) {

			var e = a.getElementsByTagName("*");

			var j = "";

			for (var b = 0; b < e.length; b++) {

				if (e[b].nodeType == 1 && (j = e[b].getAttribute("bind"))) {

					c += "els[" + g.length + "].value=" + j + ";";

					h += j + "=els[" + g.length + "].value;";

					g.push(e[b]);

					e[b].className += " dhx_allow_selection";

					e[b].onselectstart = this._block_native

				}

			}

			e = null

		}

		c = Function("obj", "els", c);

		h = Function("obj", "els", h);

		this._edit_bind = function(n, m) {

			if (n) {

				c(m, g);

				if (g.length && g[0].select) {

					g[0].select()

				}

			} else {

				h(m, g)

			}

		}

	},

	_block_native : function(a) {

		(a || event).cancelBubble = true;

		return true

	}

};

dhtmlx.SelectionModel = {

	_init : function() {

		this._selected = dhtmlx.toArray();

		dhtmlx.assert(this.data,

				"SelectionModel :: Component doesn't have DataStore");

		this.data.attachEvent("onStoreUpdated", dhtmlx.bind(this._data_updated,

				this));

		this.data.attachEvent("onStoreLoad", dhtmlx.bind(this._data_loaded,

				this));

		this.data.attachEvent("onAfterFilter", dhtmlx.bind(this._data_filtered,

				this));

		this.data

				.attachEvent("onIdChange", dhtmlx.bind(this._id_changed, this))

	},

	_id_changed : function(c, a) {

		for (var b = this._selected.length - 1; b >= 0; b--) {

			if (this._selected[b] == c) {

				this._selected[b] = a

			}

		}

	},

	_data_filtered : function() {

		for (var a = this._selected.length - 1; a >= 0; a--) {

			if (this.data.indexById(this._selected[a]) < 0) {

				var c = this._selected[a];

				var b = this.item(c);

				if (b) {

					delete b.$selected

				}

				this._selected.splice(a, 1);

				this.callEvent("onSelectChange", [ c ])

			}

		}

	},

	_data_updated : function(c, b, a) {

		if (a == "delete") {

			this._selected.remove(c)

		} else {

			if (!this.data.dataCount() && !this.data._filter_order) {

				this._selected = dhtmlx.toArray()

			}

		}

	},

	_data_loaded : function() {

		if (this._settings.select) {

			this.data.each(function(a) {

				if (a.$selected) {

					this.select(a.id)

				}

			}, this)

		}

	},

	_select_mark : function(c, b, a) {

		if (!a && !this.callEvent("onBeforeSelect", [ c, b ])) {

			return false

		}

		this.data.item(c).$selected = b;

		if (a) {

			a.push(c)

		} else {

			if (b) {

				this._selected.push(c)

			} else {

				this._selected.remove(c)

			}

			this._refresh_selection(c)

		}

		return true

	},

	select : function(e, c, a) {

		if (!e) {

			return this.selectAll()

		}

		if (e instanceof Array) {

			for (var b = 0; b < e.length; b++) {

				this.select(e[b], c, a)

			}

			return

		}

		if (!this.data.exists(e)) {

			dhtmlx.error("Incorrect id in select command: " + e);

			return

		}

		if (a && this._selected.length) {

			return this.selectAll(this._selected[this._selected.length - 1], e)

		}

		if (!c && (this._selected.length != 1 || this._selected[0] != e)) {

			this._silent_selection = true;

			this.unselectAll();

			this._silent_selection = false

		}

		if (this.isSelected(e)) {

			if (c) {

				this.unselect(e)

			}

			return

		}

		if (this._select_mark(e, true)) {

			this.callEvent("onAfterSelect", [ e ])

		}

	},

	unselect : function(a) {

		if (!a) {

			return this.unselectAll()

		}

		if (!this.isSelected(a)) {

			return

		}

		this._select_mark(a, false)

	},

	selectAll : function(e, c) {

		var a;

		var b = [];

		if (e || c) {

			a = this.data.getRange(e || null, c || null)

		} else {

			a = this.data.getRange()

		}

		a.each(function(g) {

			var h = this.data.item(g.id);

			if (!h.$selected) {

				this._selected.push(g.id);

				this._select_mark(g.id, true, b)

			}

			return g.id

		}, this);

		this._refresh_selection(b)

	},

	unselectAll : function() {

		var a = [];

		this._selected.each(function(b) {

			this._select_mark(b, false, a)

		}, this);

		this._selected = dhtmlx.toArray();

		this._refresh_selection(a)

	},

	isSelected : function(a) {

		return this._selected.find(a) != -1

	},

	getSelected : function(a) {

		switch (this._selected.length) {

		case 0:

			return a ? [] : "";

		case 1:

			return a ? [ this._selected[0] ] : this._selected[0];

		default:

			return ([].concat(this._selected))

		}

	},

	_is_mass_selection : function(a) {

		return a.length > 100 || a.length > this.data.dataCount / 2

	},

	_refresh_selection : function(b) {

		if (typeof b != "object") {

			b = [ b ]

		}

		if (!b.length) {

			return

		}

		if (this._is_mass_selection(b)) {

			this.data.refresh()

		} else {

			for (var a = 0; a < b.length; a++) {

				this.render(b[a], this.data.item(b[a]), "update")

			}

		}

		if (!this._silent_selection) {

			this.callEvent("onSelectChange", [ b ])

		}

	}

};

dhtmlx.RenderStack = {

	_init : function() {

		dhtmlx.assert(this.data,

				"RenderStack :: Component doesn't have DataStore");

		dhtmlx.assert(dhtmlx.Template,

				"dhtmlx.Template :: dhtmlx.Template is not accessible");

		this._html = document.createElement("DIV")

	},

	_toHTML : function(a) {

		dhtmlx.assert((!a.$template || this.type["template_" + a.$template]),

				"RenderStack :: Unknown template: " + a.$template);

		this.callEvent("onItemRender", [ a ]);

		return this.type._item_start(a, this.type)

				+ (a.$template ? this.type["template_" + a.$template]

						: this.type.template)(a, this.type)

				+ this.type._item_end

	},

	_toHTMLObject : function(a) {

		this._html.innerHTML = this._toHTML(a);

		return this._html.firstChild

	},

	_locateHTML : function(a) {

		if (this._htmlmap) {

			return this._htmlmap[a]

		}

		this._htmlmap = {};

		var c = this._dataobj.childNodes;

		for (var b = 0; b < c.length; b++) {

			var e = c[b].getAttribute(this._id);

			if (e) {

				this._htmlmap[e] = c[b]

			}

		}

		return this._locateHTML(a)

	},

	locate : function(a) {

		return dhtmlx.html.locate(a, this._id)

	},

	show : function(b) {

		var a = this._locateHTML(b);

		if (a) {

			this._dataobj.scrollTop = a.offsetTop - this._dataobj.offsetTop

		}

	},

	render : function(h, e, c, g) {

		if (h) {

			var a = this._locateHTML(h);

			switch (c) {

			case "update":

				if (!a) {

					return

				}

				var b = this._htmlmap[h] = this._toHTMLObject(e);

				dhtmlx.html.insertBefore(b, a);

				dhtmlx.html.remove(a);

				break;

			case "delete":

				if (!a) {

					return

				}

				dhtmlx.html.remove(a);

				delete this._htmlmap[h];

				break;

			case "add":

				var b = this._htmlmap[h] = this._toHTMLObject(e);

				dhtmlx.html.insertBefore(b,

						this._locateHTML(this.data.next(h)), this._dataobj);

				break;

			case "move":

				this.render(h, e, "delete");

				this.render(h, e, "add");

				break;

			default:

				dhtmlx.error("Unknown render command: " + c);

				break

			}

		} else {

			if (this.callEvent("onBeforeRender", [ this.data ])) {

				this._dataobj.innerHTML = this.data.getRange().map(

						this._toHTML, this).join("");

				this._htmlmap = null

			}

		}

		this.callEvent("onAfterRender", [])

	},

	pager_setter : function(b) {

		this.attachEvent("onBeforeRender", function() {

			var e = this._settings.pager._settings;

			if (e.page == -1) {

				return false

			}

			this.data.min = e.page * e.size;

			this.data.max = (e.page + 1) * e.size - 1;

			return true

		});

		var a = new dhtmlx.ui.pager(b);

		var c = dhtmlx.bind(function() {

			this.data.refresh()

		}, this);

		a.attachEvent("onRefresh", c);

		this.data.attachEvent("onStoreUpdated", function(g) {

			var e = this.dataCount();

			if (e != a._settings.count) {

				a._settings.count = e;

				if (a._settings.page == -1) {

					a._settings.page = 0

				}

				a.refresh()

			}

		});

		return a

	},

	height_setter : function(a) {

		if (a == "auto") {

			this.attachEvent("onAfterRender", this._correct_height);

			dhtmlx.event(window, "resize", dhtmlx.bind(this._correct_height,

					this))

		}

		return a

	},

	_correct_height : function() {

		this._dataobj.style.overflow = "hidden";

		this._dataobj.style.height = "1px";

		var a = this._dataobj.scrollHeight;

		this._dataobj.style.height = a + "px";

		if (dhtmlx._isFF) {

			var b = this._dataobj.scrollHeight;

			if (b != a) {

				this._dataobj.style.height = b + "px"

			}

		}

		this._obj.style.height = this._dataobj.style.height

	},

	_getDimension : function() {

		var a = this.type;

		var b = (a.border || 0) + (a.padding || 0) * 2 + (a.margin || 0) * 2;

		return {

			x : a.width + b,

			y : a.height + b

		}

	},

	x_count_setter : function(b) {

		var c = this._getDimension();

		var a = dhtmlx.$customScroll ? 0 : 18;

		this._dataobj.style.width = c.x * b

				+ (this._settings.height != "auto" ? a : 0) + "px";

		return b

	},

	y_count_setter : function(a) {

		var b = this._getDimension();

		this._dataobj.style.height = b.y * a + "px";

		return a

	}

};

dhtmlx.VirtualRenderStack = {

	_init : function() {

		dhtmlx.assert(this.render,

				"VirtualRenderStack :: Object must use RenderStack first");

		this._htmlmap = {};

		this._dataobj.style.overflowY = "scroll";

		dhtmlx.event(this._dataobj, "scroll", dhtmlx.bind(

				this._render_visible_rows, this));

		dhtmlx.event(window, "resize", dhtmlx.bind(function() {

			this.render()

		}, this));

		this.data._unrendered_area = [];

		this.data.getIndexRange = this._getIndexRange

	},

	_locateHTML : function(a) {

		return this._htmlmap[a]

	},

	show : function(c) {

		range = this._getVisibleRange();

		var b = this.data.indexById(c);

		var a = Math.floor(b / range._dx) * range._y;

		this._dataobj.scrollTop = a

	},

	_getIndexRange : function(g, e) {

		if (e !== 0) {

			e = Math.min((e || Infinity), this.dataCount() - 1)

		}

		var a = dhtmlx.toArray();

		for (var b = (g || 0); b <= e; b++) {

			var c = this.item(this.order[b]);

			if (this.order.length > b) {

				if (!c) {

					this.order[b] = dhtmlx.uid();

					c = {

						id : this.order[b],

						$template : "loading"

					};

					this._unrendered_area.push(this.order[b])

				} else {

					if (c.$template == "loading") {

						this._unrendered_area.push(this.order[b])

					}

				}

				a.push(c)

			}

		}

		return a

	},

	render : function(h, e, c, g) {

		if (h) {

			var a = this._locateHTML(h);

			switch (c) {

			case "update":

				if (!a) {

					return

				}

				var b = this._htmlmap[h] = this._toHTMLObject(e);

				dhtmlx.html.insertBefore(b, a);

				dhtmlx.html.remove(a);

				break;

			default:

				this._render_delayed();

				break

			}

		} else {

			if (this.callEvent("onBeforeRender", [ this.data ])) {

				this._htmlmap = {};

				this._render_visible_rows(null, true);

				this._wait_for_render = false;

				this.callEvent("onAfterRender", [])

			}

		}

	},

	_render_delayed : function() {

		if (this._wait_for_render) {

			return

		}

		this._wait_for_render = true;

		window.setTimeout(dhtmlx.bind(function() {

			this.render()

		}, this), 1)

	},

	_create_placeholder : function(a) {

		var b = document.createElement("DIV");

		b.className = "dhxdataview_placeholder";

		b.style.cssText = "height:" + a + "px; width:100%; overflow:hidden;";

		return b

	},

	_render_visible_rows : function(x, A) {

		this.data._unrendered_area = [];

		var w = this._getVisibleRange();

		if (!this._dataobj.firstChild || A) {

			this._dataobj.innerHTML = "";

			this._dataobj.appendChild(this._create_placeholder(w._max));

			this._htmlrows = [ this._dataobj.firstChild ]

		}

		var g = Math.max(w._from, 0);

		var v = (this.data.max || this.data.max === 0) ? this.data.max

				: Infinity;

		while (g <= w._height) {

			while (this._htmlrows[g] && this._htmlrows[g]._filled

					&& g <= w._height) {

				g++

			}

			if (g > w._height) {

				break

			}

			var m = g;

			while (!this._htmlrows[m]) {

				m--

			}

			var a = this._htmlrows[m];

			var c = g * w._dx + (this.data.min || 0);

			if (c > v) {

				break

			}

			var j = Math.min(c + w._dx - 1, v);

			var o = this._create_placeholder(w._y);

			var l = this.data.getIndexRange(c, j);

			if (!l.length) {

				break

			}

			o.innerHTML = l.map(this._toHTML, this).join("");

			for (var s = 0; s < l.length; s++) {

				this._htmlmap[this.data.idByIndex(c + s)] = o.childNodes[s]

			}

			var u = parseInt(a.style.height, 10);

			var z = (g - m) * w._y;

			var r = (u - z - w._y);

			dhtmlx.html.insertBefore(o, z ? a.nextSibling : a, this._dataobj);

			this._htmlrows[g] = o;

			o._filled = true;

			if (z <= 0 && r > 0) {

				a.style.height = r + "px";

				this._htmlrows[g + 1] = a

			} else {

				if (z < 0) {

					dhtmlx.html.remove(a)

				} else {

					a.style.height = z + "px"

				}

				if (r > 0) {

					var n = this._htmlrows[g + 1] = this._create_placeholder(r);

					dhtmlx.html.insertBefore(n, o.nextSibling, this._dataobj)

				}

			}

			g++

		}

		if (this.data._unrendered_area.length) {

			var q = this.indexById(this.data._unrendered_area[0]);

			var b = this.indexById(this.data._unrendered_area.pop()) + 1;

			if (b > q) {

				if (!this.callEvent("onDataRequest", [ q, b - q ])) {

					return false

				}

				dhtmlx.assert(this.data.feed, "Data feed is missed");

				this.data.feed.call(this, q, b - q)

			}

		}

		if (dhtmlx._isIE) {

			var y = this._getVisibleRange();

			if (y._from != w._from) {

				this._render_visible_rows()

			}

		}

	},

	_getVisibleRange : function() {

		var b = dhtmlx.$customScroll ? 0 : 18;

		var j = this._dataobj.scrollTop;

		var a = this._dataobj.scrollWidth;

		var l = this._dataobj.offsetHeight;

		var n = this.type;

		var e = this._getDimension();

		var o = Math.floor(a / e.x) || 1;

		var c = Math.floor(j / e.y);

		var m = Math.ceil((l + j) / e.y) - 1;

		var g = this.data.max ? (this.data.max - this.data.min) : this.data

				.dataCount();

		var h = Math.ceil(g / o) * e.y;

		return {

			_from : c,

			_height : m,

			_top : j,

			_max : h,

			_y : e.y,

			_dx : o

		}

	}

};

dhtmlXDataView = function(a) {

	this.name = "DataView";

	if (dhtmlx.assert_enabled()) {

		this._assert()

	}

	dhtmlx.extend(this, dhtmlx.Settings);

	this._parseContainer(a, "dhx_dataview");

	dhtmlx.extend(this, dhtmlx.AtomDataLoader);

	dhtmlx.extend(this, dhtmlx.DataLoader);

	dhtmlx.extend(this, dhtmlx.EventSystem);

	dhtmlx.extend(this, dhtmlx.RenderStack);

	dhtmlx.extend(this, dhtmlx.SelectionModel);

	dhtmlx.extend(this, dhtmlx.MouseEvents);

	dhtmlx.extend(this, dhtmlx.KeyEvents);

	dhtmlx.extend(this, dhtmlx.EditAbility);

	dhtmlx.extend(this, dhtmlx.DataMove);

	dhtmlx.extend(this, dhtmlx.DragItem);

	dhtmlx.extend(this, dhtmlx.DataProcessor);

	dhtmlx.extend(this, dhtmlx.AutoTooltip);

	dhtmlx.extend(this, dhtmlx.Destruction);

	this.data.attachEvent("onStoreUpdated", dhtmlx.bind(function() {

		this.render.apply(this, arguments)

	}, this));

	this._parseSettings(a, {

		drag : false,

		edit : false,

		select : "multiselect",

		type : "default"

	});

	if (this._settings.height != "auto" && !this._settings.renderAll) {

		dhtmlx.extend(this, dhtmlx.VirtualRenderStack)

	}

	this.data.provideApi(this, true);

	if (this.config.autowidth) {

		this.attachEvent("onBeforeRender", function() {

			this.type.width = Math.floor((this._dataobj.scrollWidth)

					/ (this.config.autowidth * 1 || 1))

					- this.type.padding

					* 2

					- this.type.margin

					* 2

					- this.type.border * 2;

			this.type._item_start = dhtmlx.Template.fromHTML(this

					.template_item_start(this.type));

			this.type._item_end = this.template_item_end(this.type)

		});

		dhtmlx.event(window, "resize", function() {

			this.refresh()

		}, this)

	}

	if (dhtmlx.$customScroll) {

		dhtmlx.CustomScroll.enable(this)

	}

};

dhtmlXDataView.prototype = {

	bind : function() {

		dhtmlx.BaseBind.legacyBind.apply(this, arguments)

	},

	sync : function() {

		dhtmlx.BaseBind.legacySync.apply(this, arguments)

	},

	dragMarker : function(c, g) {

		var e = this._locateHTML(c.target);

		if (this.type.drag_marker) {

			if (this._drag_marker) {

				this._drag_marker.style.backgroundImage = "";

				this._drag_marker.style.backgroundRepeat = ""

			}

			if (e) {

				e.style.backgroundImage = "url(" + (dhtmlx.image_path || "")

						+ this.type.drag_marker + ")";

				e.style.backgroundRepeat = "no-repeat";

				this._drag_marker = e

			}

		}

		if (e && this._settings.auto_scroll) {

			var a = e.offsetTop;

			var h = e.offsetHeight;

			var b = this._obj.scrollTop;

			var j = this._obj.offsetHeight;

			if (a - h >= 0 && a - h * 0.75 < b) {

				b = Math.max(a - h, 0)

			} else {

				if (a + h / 0.75 > b + j) {

					b = b + h

				}

			}

			this._obj.scrollTop = b

		}

		return true

	},

	_id : "dhx_f_id",

	on_click : {

		dhx_dataview_item : function(a, b) {

			if (this.stopEdit(false, b)) {

				if (this._settings.select) {

					if (this._settings.select == "multiselect") {

						this.select(b, a.ctrlKey || a.metaKey, a.shiftKey)

					} else {

						this.select(b)

					}

				}

			}

		}

	},

	on_dblclick : {

		dhx_dataview_item : function(a, b) {

			if (this._settings.edit) {

				this.edit(b)

			}

		}

	},

	on_mouse_move : {},

	types : {

		"default" : {

			css : "default",

			template : dhtmlx.Template

					.fromHTML("<div style='padding:10px; white-space:nowrap; overflow:hidden;'>{obj.text}</div>"),

			template_edit : dhtmlx.Template

					.fromHTML("<div style='padding:10px; white-space:nowrap; overflow:hidden;'><textarea style='width:100%; height:100%;' bind='obj.text'></textarea></div>"),

			template_loading : dhtmlx.Template

					.fromHTML("<div style='padding:10px; white-space:nowrap; overflow:hidden;'>Loading...</div>"),

			width : 210,

			height : 115,

			margin : 0,

			padding : 10,

			border : 1

		}

	},

	template_item_start : dhtmlx.Template

			.fromHTML("<div dhx_f_id='{-obj.id}' class='dhx_dataview_item dhx_dataview_{obj.css}_item{-obj.$selected?_selected:}' style='width:{obj.width}px; height:{obj.height}px; padding:{obj.padding}px; margin:{obj.margin}px; float:left; overflow:hidden;'>"),

	template_item_end : dhtmlx.Template.fromHTML("</div>")

};

dhtmlx.compat("layout");

if (typeof (window.dhtmlXCellObject) != "undefined") {

	dhtmlXCellObject.prototype.attachDataView = function(a) {

		this.callEvent("_onBeforeContentAttach", [ "dataview" ]);

		var b = document.createElement("DIV");

		b.style.width = "100%";

		b.style.height = "100%";

		b.style.position = "relative";

		b.style.overflow = "hidden";

		this._attachObject(b);

		if (typeof (a) == "undefined") {

			a = {}

		}

		b.id = "DataViewObject_" + new Date().getTime();

		a.container = b.id;

		a.skin = this.conf.skin;

		this.dataType = "dataview";

		this.dataObj = new dhtmlXDataView(a);

		this.dataObj.setSizes = function() {

			this.render()

		};

		b = null;

		this.callEvent("_onContentAttach", []);

		return this.dataObj

	}

}

var globalActiveDHTMLGridObject;

String.prototype._dhx_trim = function() {

	return this.replace(/&nbsp;/g, " ").replace(/(^[ \t]*)|([ \t]*$)/g, "")

};

function dhtmlxArray(a) {

	return dhtmlx.extend((a || new Array()), dhtmlxArray._master)

}

dhtmlxArray._master = {

	_dhx_find : function(b) {

		for (var a = 0; a < this.length; a++) {

			if (b == this[a]) {

				return a

			}

		}

		return -1

	},

	_dhx_insertAt : function(c, b) {

		this[this.length] = null;

		for (var a = this.length - 1; a >= c; a--) {

			this[a] = this[a - 1]

		}

		this[c] = b

	},

	_dhx_removeAt : function(a) {

		this.splice(a, 1)

	},

	_dhx_swapItems : function(a, c) {

		var b = this[a];

		this[a] = this[c];

		this[c] = b

	}

};

function dhtmlXGridObject(id) {

	if (dhtmlxEvent.initTouch) {

		dhtmlxEvent.initTouch()

	}

	if (_isIE) {

		try {

			document.execCommand("BackgroundImageCache", false, true)

		} catch (e) {

		}

	}

	if (id) {

		if (typeof (id) == "object") {

			this.entBox = id;

			if (!this.entBox.id) {

				this.entBox.id = "cgrid2_" + this.uid()

			}

		} else {

			this.entBox = document.getElementById(id)

		}

	} else {

		this.entBox = document.createElement("DIV");

		this.entBox.id = "cgrid2_" + this.uid()

	}

	this.entBox.innerHTML = "";

	dhx4._eventable(this);

	var self = this;

	this._RaSeCol = [];

	this._wcorr = 0;

	this.fontWidth = 7;

	this.cell = null;

	this.row = null;

	this.iconURL = "";

	this.editor = null;

	this._f2kE = true;

	this._dclE = true;

	this.combos = new Array(0);

	this.defVal = new Array(0);

	this.rowsAr = {};

	this.rowsBuffer = dhtmlxArray();

	this.rowsCol = dhtmlxArray();

	this._data_cache = {};

	this._ecache = {};

	this._ud_enabled = true;

	this.xmlLoader = this.doLoadDetails;

	this._maskArr = [];

	this.selectedRows = dhtmlxArray();

	this.UserData = {};

	this._sizeFix = this._borderFix = 0;

	this.entBox.className += " gridbox";

	this.entBox.style.width = this.entBox.getAttribute("width")

			|| (window.getComputedStyle ? (this.entBox.style.width || window

					.getComputedStyle(this.entBox, null)["width"])

					: (this.entBox.currentStyle ? this.entBox.currentStyle.width

							: this.entBox.style.width || 0)) || "100%";

	this.entBox.style.height = this.entBox.getAttribute("height")

			|| (window.getComputedStyle ? (this.entBox.style.height || window

					.getComputedStyle(this.entBox, null)["height"])

					: (this.entBox.currentStyle ? this.entBox.currentStyle.height

							: this.entBox.style.height || 0)) || "100%";

	this.entBox.style.cursor = "default";

	this.entBox.onselectstart = function() {

		return false

	};

	var t_creator = function(name) {

		var t = document.createElement("TABLE");

		t.cellSpacing = t.cellPadding = 0;

		t.style.cssText = "width:100%;table-layout:fixed;";

		t.className = name.substr(2);

		return t

	};

	this.obj = t_creator("c_obj");

	this.hdr = t_creator("c_hdr");

	this.hdr.style.marginRight = "20px";

	this.hdr.style.paddingRight = "20px";

	this.objBox = document.createElement("DIV");

	this.objBox.style.width = "100%";

	this.objBox.style.overflow = "auto";

	this.objBox.appendChild(this.obj);

	this.objBox.className = "objbox";

	if (dhtmlx.$customScroll) {

		dhtmlx.CustomScroll.enable(this)

	}

	this.hdrBox = document.createElement("DIV");

	this.hdrBox.style.width = "100%";

	this.hdrBox.style.height = "25px";

	this.hdrBox.style.overflow = "hidden";

	this.hdrBox.className = "xhdr";

	this.preloadImagesAr = new Array(0);

	this.sortImg = document.createElement("DIV");

	this.sortImg.style.display = "none";

	this.hdrBox.appendChild(this.sortImg);

	this.hdrBox.appendChild(this.hdr);

	this.hdrBox.style.position = "relative";

	this.entBox.appendChild(this.hdrBox);

	this.entBox.appendChild(this.objBox);

	this.entBox.grid = this;

	this.objBox.grid = this;

	this.hdrBox.grid = this;

	this.obj.grid = this;

	this.hdr.grid = this;

	this.cellWidthPX = [];

	this.cellWidthPC = [];

	this.cellWidthType = this.entBox.cellwidthtype || "px";

	this.delim = this.entBox.delimiter || ",";

	this._csvDelim = ",";

	this.hdrLabels = [];

	this.columnIds = [];

	this.columnColor = [];

	this._hrrar = [];

	this.cellType = dhtmlxArray();

	this.cellAlign = [];

	this.initCellWidth = [];

	this.fldSort = [];

	this._srdh = (_isIE && (document.compatMode != "BackCompat") ? 22 : 20);

	this.imgURL = window.dhx_globalImgPath || "";

	this.isActive = false;

	this.isEditable = true;

	this.useImagesInHeader = false;

	this.pagingOn = false;

	this.rowsBufferOutSize = 0;

	dhtmlxEvent(window, "unload", function() {

		try {

			if (self.destructor) {

				self.destructor()

			}

		} catch (e) {

		}

	});

	this.setSkin = function(name) {

		this._srdh = window.dhx4.readFromCss("dhxgrid_rh_" + name) + 4;

		this.skin_name = name;

		if (this._imgURL) {

			this.setImagePath(this._imgURL)

		}

		var classname = this.entBox.className.split(" gridbox")[0];

		this.entBox.className = classname + " gridbox gridbox_" + name

				+ (_isIE ? " isIE" : " isModern");

		this.skin_h_correction = 0;

		this.enableAlterCss("ev_" + name, "odd_" + name, this.isTreeGrid());

		this._fixAlterCss();

		switch (name) {

		case "dhx_terrace":

		case "material":

			this._srdh = 33;

			this.forceDivInHeader = true;

			break;

		case "dhx_web":

		case "material":

			this.forceDivInHeader = true;

			this._srdh = 31;

			break;

		case "dhx_skyblue":

			this.forceDivInHeader = true;

			break

		}

		if (_isIE && this.hdr) {

			var d = this.hdr.parentNode;

			d.removeChild(this.hdr);

			d.appendChild(this.hdr)

		}

		this.setSizes()

	};

	if (_isIE) {

		this.preventIECaching(true)

	}

	if (window.dhtmlDragAndDropObject) {

		this.dragger = new dhtmlDragAndDropObject()

	}

	this._doOnScroll = function(e, mode) {

		this.callEvent("onScroll", [ this.objBox.scrollLeft,

				this.objBox.scrollTop ]);

		this.doOnScroll(e, mode)

	};

	this.doOnScroll = function(e, mode) {

		var box = this.hdrBox;

		box._try_header_sync = true;

		setTimeout(function() {

			box._try_header_sync = false

		}, 2000);

		this.hdrBox.scrollLeft = this.objBox.scrollLeft;

		if (this.ftr) {

			this.ftr.parentNode.scrollLeft = this.objBox.scrollLeft

		}

		if (mode) {

			return

		}

		if (this._srnd) {

			if (this._dLoadTimer) {

				window.clearTimeout(this._dLoadTimer)

			}

			this._dLoadTimer = window.setTimeout(function() {

				if (self._update_srnd_view) {

					self._update_srnd_view()

				}

			}, 100)

		}

	};

	this.attachToObject = function(obj) {

		obj.appendChild(this.globalBox ? this.globalBox : this.entBox);

		this.setSizes()

	};

	this.init = function(fl) {

		if ((this.isTreeGrid()) && (!this._h2)) {

			this._h2 = this._createHierarchy();

			if ((this._fake) && (!this._realfake)) {

				this._fake._h2 = this._h2

			}

			this._tgc = {

				imgURL : null

			}

		}

		if (!this._hstyles) {

			return

		}

		if (!this.skin_name) {

			this.setSkin(window.dhx4.skin

					|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

					|| window.dhx4.skinDetect("dhxgrid") || "material")

		}

		this.editStop();

		this.lastClicked = null;

		this.resized = null;

		this.fldSorted = this.r_fldSorted = null;

		this.cellWidthPX = [];

		this.cellWidthPC = [];

		if (this.hdr.rows.length > 0) {

			var temp = this.xmlFileUrl;

			this.clearAll(true);

			this.xmlFileUrl = temp

		}

		var hdrRow = this.hdr.insertRow(0);

		for (var i = 0; i < this.hdrLabels.length; i++) {

			hdrRow.appendChild(document.createElement("TH"));

			hdrRow.childNodes[i]._cellIndex = i;

			hdrRow.childNodes[i].style.height = "0px"

		}

		if (_isIE && _isIE < 8

				&& document.body.style.msTouchAction == this.undefined) {

			hdrRow.style.position = "absolute"

		} else {

			hdrRow.style.height = "auto"

		}

		var hdrRow = this.hdr.insertRow(_isKHTML ? 2 : 1);

		hdrRow._childIndexes = new Array();

		var col_ex = 0;

		for (var i = 0; i < this.hdrLabels.length; i++) {

			hdrRow._childIndexes[i] = i - col_ex;

			if ((this.hdrLabels[i] == this.splitSign) && (i != 0)) {

				if (_isKHTML) {

					hdrRow.insertCell(i - col_ex)

				}

				hdrRow.cells[i - col_ex - 1].colSpan = (hdrRow.cells[i - col_ex

						- 1].colSpan || 1) + 1;

				hdrRow.childNodes[i - col_ex - 1]._cellIndex++;

				col_ex++;

				hdrRow._childIndexes[i] = i - col_ex;

				continue

			}

			hdrRow.insertCell(i - col_ex);

			hdrRow.childNodes[i - col_ex]._cellIndex = i;

			hdrRow.childNodes[i - col_ex]._cellIndexS = i;

			this.setColumnLabel(i, this.hdrLabels[i])

		}

		if (col_ex == 0) {

			hdrRow._childIndexes = null

		}

		this._cCount = this.hdrLabels.length;

		if (_isIE) {

			window.setTimeout(function() {

				if (self.setSizes) {

					self.setSizes()

				}

			}, 1)

		}

		if (!this.obj.firstChild) {

			this.obj.appendChild(document.createElement("TBODY"))

		}

		var tar = this.obj.firstChild;

		if (!tar.firstChild) {

			tar.appendChild(document.createElement("TR"));

			tar = tar.firstChild;

			if (_isIE && _isIE < 8

					&& document.body.style.msTouchAction == this.undefined) {

				tar.style.position = "absolute"

			} else {

				tar.style.height = "auto"

			}

			for (var i = 0; i < this.hdrLabels.length; i++) {

				tar.appendChild(document.createElement("TH"));

				tar.childNodes[i].style.height = "0px"

			}

		}

		this._c_order = null;

		if (this.multiLine != true) {

			this.obj.className += " row20px"

		}

		this.sortImg.style.position = "absolute";

		this.sortImg.style.display = "none";

		this.sortImg.className = "dhxgrid_sort_desc";

		this.sortImg.defLeft = 0;

		if (this.noHeader) {

			this.hdrBox.style.display = "none"

		} else {

			this.noHeader = false

		}

		if (this._ivizcol) {

			this.setColHidden()

		}

		this.attachHeader();

		this.attachHeader(0, 0, "_aFoot");

		this.setSizes();

		if (fl) {

			this.parseXML()

		}

		this.obj.scrollTop = 0;

		if (this.dragAndDropOff) {

			this.dragger.addDragLanding(this.entBox, this)

		}

		if (this._initDrF) {

			this._initD()

		}

		dhx4.callEvent("onGridCreated", [ this ])

	};

	this.setColumnSizes = function(gridWidth) {

		var summ = 0;

		var fcols = [];

		var fix = 0;

		for (var i = 0; i < this._cCount; i++) {

			if ((this.initCellWidth[i] == "*") && !this._hrrar[i]) {

				this._awdth = false;

				fcols.push(i);

				continue

			}

			if (this.cellWidthType == "%") {

				if (typeof this.cellWidthPC[i] == "undefined") {

					this.cellWidthPC[i] = this.initCellWidth[i]

				}

				var cwidth = (gridWidth * this.cellWidthPC[i] / 100) || 0;

				if (fix > 0.5) {

					cwidth++;

					fix--

				}

				var rwidth = this.cellWidthPX[i] = Math.floor(cwidth);

				var fix = fix + cwidth - rwidth

			} else {

				if (typeof this.cellWidthPX[i] == "undefined") {

					this.cellWidthPX[i] = this.initCellWidth[i]

				}

			}

			if (!this._hrrar[i]) {

				summ += this.cellWidthPX[i] * 1

			}

		}

		if (fcols.length) {

			var ms = Math.floor((gridWidth - summ) / fcols.length);

			if (ms < 0) {

				ms = 1

			}

			for (var i = 0; i < fcols.length; i++) {

				var next = Math.max(

						(this._drsclmW ? (this._drsclmW[fcols[i]] || 0) : 0),

						ms);

				this.cellWidthPX[fcols[i]] = next;

				summ += next

			}

			if (gridWidth > summ) {

				var last = fcols[fcols.length - 1];

				this.cellWidthPX[last] = this.cellWidthPX[last]

						+ (gridWidth - summ);

				summ = gridWidth

			}

			this._setAutoResize()

		}

		this.obj.style.width = summ + "px";

		this.hdr.style.width = summ + "px";

		if (this.ftr) {

			this.ftr.style.width = summ + "px"

		}

		this.chngCellWidth();

		return summ

	};

	this.setSizes = function() {

		if ((!this.hdr.rows[0])) {

			return

		}

		var quirks = this.quirks = (_isIE && document.compatMode == "BackCompat");

		var outerBorder = (this.entBox.offsetWidth - this.entBox.clientWidth) / 2;

		if (!this.dontSetSizes) {

			if (this.globalBox) {

				if (!this.globalBox.clientWidth) {

					return

				}

				var ow = this.globalBox.clientWidth;

				var splitOuterBorder = (this.globalBox.offsetWidth - ow) / 2;

				if (this._delta_x && !this._realfake) {

					this.globalBox.style.width = this._delta_x;

					this.globalBox.style.boxSizing = "border-box";

					var owu = this.globalBox.clientWidth;

					this.entBox.style.width = Math.max(0,

							(owu + (quirks ? splitOuterBorder * 2 : 0))

									- this._fake.entBox.clientWidth)

							+ "px";

					if (owu != this._lastTimeSplitWidth) {

						this._fake._correctSplit(this._fake.entBox.clientWidth);

						this._lastTimeSplitWidth = owu

					}

				}

				if (this._delta_y && !this._realfake) {

					this.globalBox.style.height = this._delta_y;

					this.entBox.style.overflow = this._fake.entBox.style.overflow = "hidden";

					this.entBox.style.height = this._fake.entBox.style.height = this.globalBox.clientHeight

							+ (quirks ? splitOuterBorder * 2 : 0) + "px"

				}

			} else {

				if (this._delta_x) {

					if (this.entBox.parentNode

							&& this.entBox.parentNode.tagName == "TD") {

						this.entBox.style.width = "1px";

						this.entBox.style.width = parseInt(this._delta_x)

								* this.entBox.parentNode.clientWidth / 100

								- outerBorder * 2 + "px"

					} else {

						this.entBox.style.width = this._delta_x

					}

				}

				if (this._delta_y) {

					this.entBox.style.height = this._delta_y

				}

			}

		}

		window.clearTimeout(this._sizeTime);

		if (!this.entBox.offsetWidth

				&& (!this.globalBox || !this.globalBox.offsetWidth)) {

			this._sizeTime = window.setTimeout(function() {

				if (self.setSizes) {

					self.setSizes()

				}

			}, 250);

			return

		}

		var border_x = ((!this._wthB)

				&& ((this.entBox.cmp || this._delta_x)

						&& ((this.skin_name || "").indexOf("dhx") == 0 || this.skin_name == "material") && !quirks) ? 2

				: 0);

		var border_y = ((!this._wthB)

				&& ((this.entBox.cmp || this._delta_y)

						&& ((this.skin_name || "").indexOf("dhx") == 0 || this.skin_name == "material") && !quirks) ? 2

				: 0);

		if (this._sizeFix) {

			border_x -= this._sizeFix;

			border_y -= this._sizeFix

		}

		var isVScroll = this.parentGrid ? false

				: (this.objBox.scrollHeight > this.objBox.offsetHeight);

		var scrfix = dhtmlx.$customScroll ? 0 : 18;

		var gridWidth = this.entBox.clientWidth - (this.skin_h_correction || 0)

				* (quirks ? 0 : 1) - border_x;

		var gridWidthActive = this.entBox.clientWidth

				- (this.skin_h_correction || 0) - border_x;

		var gridHeight = this.entBox.clientHeight - border_y;

		var summ = this.setColumnSizes(gridWidthActive

				- (isVScroll ? scrfix : 0) - (this._correction_x || 0));

		var isHScroll = this.parentGrid ? false

				: ((this.objBox.scrollWidth > this.objBox.offsetWidth) || (this.objBox.style.overflowX == "scroll"));

		var headerHeight = this.hdr.clientHeight;

		var footerHeight = this.ftr ? this.ftr.clientHeight : 0;

		var newWidth = gridWidth;

		var newHeight = gridHeight - headerHeight - footerHeight;

		if (this._awdth && this._awdth[0] && this._awdth[1] == 99999) {

			isHScroll = 0

		}

		if (this._ahgr) {

			if (this._ahgrMA) {

				newHeight = this.entBox.parentNode.clientHeight - headerHeight

						- footerHeight

			} else {

				newHeight = this.obj.offsetHeight + (isHScroll ? scrfix : 0)

						+ (this._correction_y || 0)

			}

			if (this._ahgrM) {

				if (this._ahgrF) {

					newHeight = Math.min(this._ahgrM, newHeight + headerHeight

							+ footerHeight)

							- headerHeight - footerHeight

				} else {

					newHeight = Math.min(this._ahgrM, newHeight)

				}

			}

			if (isVScroll

					&& newHeight >= this.obj.scrollHeight

							+ (isHScroll ? scrfix : 0)) {

				isVScroll = false;

				this

						.setColumnSizes(gridWidthActive

								- (this._correction_x || 0))

			}

		}

		if ((this._awdth) && (this._awdth[0])) {

			if (this.cellWidthType == "%") {

				this.cellWidthType = "px"

			}

			if (this._fake) {

				summ += this._fake.entBox.clientWidth

			}

			var newWidth = Math.min(Math.max(summ + (isVScroll ? scrfix : 0),

					this._awdth[2]), this._awdth[1])

					+ (this._correction_x || 0);

			this.objBox.style.overflowX = (!isVScroll && this.objBox.scrollWidth <= newWidth) ? "hidden"

					: "auto";

			if (this._fake) {

				newWidth -= this._fake.entBox.clientWidth

			}

		}

		newHeight = Math.max(0, newHeight);

		this._ff_size_delta = (this._ff_size_delta == 0.1) ? 0.2 : 0.1;

		if (!_isFF) {

			this._ff_size_delta = 0

		}

		if (!this.dontSetSizes) {

			this.entBox.style.width = Math.max(0, newWidth + (quirks ? 2 : 0)

					* outerBorder + this._ff_size_delta)

					+ "px";

			this.entBox.style.height = newHeight + (quirks ? 2 : 0)

					* outerBorder + headerHeight + footerHeight + "px"

		}

		this.objBox.style.height = newHeight + ((quirks && !isVScroll) ? 2 : 0)

				* outerBorder + "px";

		this.hdrBox.style.height = headerHeight + "px";

		if (newHeight != gridHeight) {

			this.doOnScroll(0, !this._srnd)

		}

		var ext = this["setSizes_" + this.skin_name];

		if (ext) {

			ext.call(this)

		}

		this.setSortImgPos();

		if (headerHeight != this.hdr.clientHeight && this._ahgr) {

			this.setSizes()

		}

		this.callEvent("onSetSizes", [])

	};

	this.chngCellWidth = function() {

		if ((_isOpera) && (this.ftr)) {

			this.ftr.width = this.objBox.scrollWidth + "px"

		}

		var l = this._cCount;

		for (var i = 0; i < l; i++) {

			this.hdr.rows[0].cells[i].style.width = this.cellWidthPX[i] + "px";

			this.obj.rows[0].childNodes[i].style.width = this.cellWidthPX[i]

					+ "px";

			if (this.ftr) {

				this.ftr.rows[0].cells[i].style.width = this.cellWidthPX[i]

						+ "px"

			}

		}

	};

	this.setDelimiter = function(delim) {

		this.delim = delim

	};

	this.setInitWidthsP = function(wp) {

		this.cellWidthType = "%";

		this.initCellWidth = wp.split(this.delim.replace(/px/gi, ""));

		if (!arguments[1]) {

			this._setAutoResize()

		}

	};

	this._setAutoResize = function() {

		if (this._realfake) {

			return

		}

		var el = window;

		var self = this;

		dhtmlxEvent(window, "resize", function() {

			window.clearTimeout(self._resize_timer);

			if (self._setAutoResize) {

				self._resize_timer = window.setTimeout(function() {

					if (self.setSizes) {

						self.setSizes()

					}

					if (self._fake) {

						self._fake._correctSplit()

					}

				}, 100)

			}

		});

		this._setAutoResize = function() {

		}

	};

	this.setInitWidths = function(wp) {

		this.cellWidthType = "px";

		this.initCellWidth = wp.split(this.delim);

		if (_isFF) {

			for (var i = 0; i < this.initCellWidth.length; i++) {

				if (this.initCellWidth[i] != "*") {

					this.initCellWidth[i] = parseInt(this.initCellWidth[i])

				}

			}

		}

	};

	this.enableMultiline = function(state) {

		this.multiLine = dhx4.s2b(state)

	};

	this.enableMultiselect = function(state) {

		this.selMultiRows = dhx4.s2b(state)

	};

	this.setImagePath = function(path) {

		path = path.replace(/imgs\/dhxgrid_[a-z]*\/$/, "imgs/");

		this._imgURL = path;

		this.imgURL = path + "dhxgrid_"

				+ (this.skin_name || "dhx_skyblue").replace("dhx_", "") + "/";

		this.iconTree = this.imgURL + "tree/"

	};

	this.setImagesPath = this.setImagePath;

	this.setIconPath = function(path) {

		this.iconURL = path

	};

	this.setIconsPath = this.setIconPath;

	this.changeCursorState = function(ev) {

		var el = ev.target || ev.srcElement;

		if (el.tagName != "TD") {

			el = this.getFirstParentOfType(el, "TD")

		}

		if (!el) {

			return

		}

		if ((el.tagName == "TD") && (this._drsclmn)

				&& (!this._drsclmn[el._cellIndex])) {

			return el.style.cursor = "default"

		}

		var check = (ev.layerX || 0)

				+ (((!_isIE) && (ev.target.tagName == "DIV")) ? el.offsetLeft

						: 0);

		if ((el.offsetWidth - (ev.offsetX || (parseInt(this.getPosition(el,

				this.hdrBox)) - check)

				* -1)) < (_isOpera ? 20 : 10)) {

			el.style.cursor = "E-resize"

		} else {

			el.style.cursor = "default"

		}

		if (_isOpera) {

			this.hdrBox.scrollLeft = this.objBox.scrollLeft

		}

	};

	this.startColResize = function(ev) {

		if (this.resized) {

			this.stopColResize()

		}

		this.resized = null;

		var el = ev.target || ev.srcElement;

		if (el.tagName != "TD") {

			el = this.getFirstParentOfType(el, "TD")

		}

		var x = ev.clientX;

		var tabW = this.hdr.offsetWidth;

		var startW = parseInt(el.offsetWidth);

		if (el.tagName == "TD" && el.style.cursor != "default") {

			if ((this._drsclmn) && (!this._drsclmn[el._cellIndex])) {

				return

			}

			self._old_d_mm = document.body.onmousemove;

			self._old_d_mu = document.body.onmouseup;

			document.body.onmousemove = function(e) {

				if (self) {

					self.doColResize(e || window.event, el, startW, x, tabW)

				}

			};

			document.body.onmouseup = function() {

				if (self) {

					self.stopColResize()

				}

			}

		}

	};

	this.stopColResize = function() {

		document.body.onmousemove = self._old_d_mm || "";

		document.body.onmouseup = self._old_d_mu || "";

		this.setSizes();

		this.doOnScroll(0, 1);

		this.callEvent("onResizeEnd", [ this ])

	};

	this.doColResize = function(ev, el, startW, x, tabW) {

		el.style.cursor = "E-resize";

		this.resized = el;

		var fcolW = startW + (ev.clientX - x);

		var wtabW = tabW + (ev.clientX - x);

		if (!(this.callEvent("onResize", [ el._cellIndex, fcolW, this ]))) {

			return

		}

		if (_isIE) {

			this.objBox.scrollLeft = this.hdrBox.scrollLeft

		}

		var result = false;

		if (el.colSpan > 1) {

			var a_sizes = new Array();

			for (var i = 0; i < el.colSpan; i++) {

				a_sizes[i] = Math

						.round(fcolW

								* this.hdr.rows[0].childNodes[el._cellIndexS

										+ i].offsetWidth / el.offsetWidth)

			}

			for (var i = 0; i < el.colSpan; i++) {

				result = this._setColumnSizeR(el._cellIndexS + i * 1,

						a_sizes[i])

			}

		} else {

			result = this._setColumnSizeR(el._cellIndex, fcolW)

		}

		this.doOnScroll(0, 1);

		this.setSizes();

		if (this._fake && this._awdth) {

			this._fake._correctSplit()

		}

		return result

	};

	this._setColumnSizeR = function(ind, fcolW) {

		if (fcolW > ((this._drsclmW && !this._notresize) ? (this._drsclmW[ind] || 10)

				: 10)) {

			this.obj.rows[0].childNodes[ind].style.width = fcolW + "px";

			this.hdr.rows[0].childNodes[ind].style.width = fcolW + "px";

			if (this.ftr) {

				this.ftr.rows[0].childNodes[ind].style.width = fcolW + "px"

			}

			if (this.cellWidthType == "px") {

				this.cellWidthPX[ind] = fcolW

			} else {

				var gridWidth = parseInt(this.entBox.offsetWidth);

				if (this.objBox.scrollHeight > this.objBox.offsetHeight) {

					gridWidth -= 17

				}

				var pcWidth = Math.round(fcolW / gridWidth * 100);

				this.cellWidthPC[ind] = pcWidth

			}

			if (this.sortImg.style.display != "none") {

				this.setSortImgPos()

			}

		} else {

			return false

		}

	};

	this.setSortImgState = function(state, ind, order, row) {

		order = (order || "asc").toLowerCase();

		if (!dhx4.s2b(state)) {

			this.sortImg.style.display = "none";

			if (this.r_fldSorted) {

				this.r_fldSorted.className = ""

			}

			this.fldSorted = this.r_fldSorted = null;

			return

		}

		if (order == "asc") {

			this.sortImg.className = "dhxgrid_sort_asc"

		} else {

			this.sortImg.className = "dhxgrid_sort_desc"

		}

		this.sortImg.style.display = "";

		this.fldSorted = this.hdr.rows[0].childNodes[ind];

		var r = this.hdr.rows[row || 1];

		if (!r) {

			return

		}

		for (var i = 0; i < r.childNodes.length; i++) {

			if (r.childNodes[i]._cellIndexS == ind) {

				this.r_fldSorted = r.childNodes[i];

				return this.setSortImgPos()

			}

		}

		return this.setSortImgState(state, ind, order, (row || 1) + 1)

	};

	this.setSortImgPos = function(ind, mode, hRowInd, el) {

		if (this._hrrar

				&& this._hrrar[this.r_fldSorted ? this.r_fldSorted._cellIndex

						: ind]) {

			return

		}

		if (this.ar_fldSorted) {

			this.ar_fldSorted.className = ""

		}

		if (!el) {

			if (!ind) {

				var el = this.r_fldSorted

			} else {

				var el = this.hdr.rows[hRowInd || 0].cells[ind]

			}

		}

		if (el != null) {

			var pos = this.getPosition(el, this.hdrBox);

			var wdth = el.offsetWidth;

			this.ar_fldSorted = el;

			el.className = this.sortImg.className + "_col";

			this.sortImg.style.left = Number(pos[0] + wdth - 13) + "px";

			this.sortImg.defLeft = parseInt(this.sortImg.style.left);

			this.sortImg.style.top = Number(pos[1] + 5) + "px";

			if ((!this.useImagesInHeader) && (!mode)) {

				this.sortImg.style.display = "inline"

			}

			this.sortImg.style.left = this.sortImg.defLeft + "px"

		}

	};

	this.setActive = function(fl) {

		if (arguments.length == 0) {

			var fl = true

		}

		if (fl == true) {

			if (globalActiveDHTMLGridObject

					&& (globalActiveDHTMLGridObject != this)) {

				globalActiveDHTMLGridObject.editStop();

				globalActiveDHTMLGridObject.callEvent("onBlur",

						[ globalActiveDHTMLGridObject ])

			}

			globalActiveDHTMLGridObject = this;

			this.isActive = true

		} else {

			this.isActive = false;

			this.callEvent("onBlur", [ this ])

		}

	};

	this._doClick = function(ev) {

		var selMethod = 0;

		var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target,

				"TD");

		if (!el || !el.parentNode || !el.parentNode.idd) {

			return

		}

		var fl = true;

		if (this.markedCells) {

			var markMethod = 0;

			if (ev.shiftKey || ev.metaKey) {

				markMethod = 1

			}

			if (ev.ctrlKey) {

				markMethod = 2

			}

			this.doMark(el, markMethod);

			return true

		}

		if (this.selMultiRows != false) {

			if (ev.shiftKey && this.row != null && this.selectedRows.length) {

				selMethod = 1

			}

			if (ev.ctrlKey || ev.metaKey) {

				selMethod = 2

			}

		}

		return this.doClick(el, fl, selMethod, false)

	};

	this._doContClick = function(ev) {

		var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target,

				"TD");

		if ((!el) || (typeof (el.parentNode.idd) == "undefined")) {

			this.callEvent("onEmptyClick", [ ev ]);

			return true

		}

		if (ev.button == 2 || (_isMacOS && ev.ctrlKey)) {

			if (!this.callEvent("onRightClick", [ el.parentNode.idd,

					el._cellIndex, ev ])) {

				var z = function(e) {

					(e || event).cancelBubble = true;

					return false

				};

				(ev.srcElement || ev.target).oncontextmenu = z;

				return z(ev)

			}

			if (this._ctmndx) {

				if (!(this.callEvent("onBeforeContextMenu", [

						el.parentNode.idd, el._cellIndex, this ]))) {

					return true

				}

				if (_isIE) {

					ev.srcElement.oncontextmenu = function() {

						event.cancelBubble = true;

						return false

					}

				}

				if (this._ctmndx.showContextMenu) {

					var dEl0 = window.document.documentElement;

					var dEl1 = window.document.body;

					var corrector = new Array(

							(dEl0.scrollLeft || dEl1.scrollLeft),

							(dEl0.scrollTop || dEl1.scrollTop));

					if (_isIE) {

						var x = ev.clientX + corrector[0];

						var y = ev.clientY + corrector[1]

					} else {

						var x = ev.pageX;

						var y = ev.pageY

					}

					this._ctmndx.showContextMenu(x - 1, y - 1);

					this.contextID = this._ctmndx.contextMenuZoneId = el.parentNode.idd

							+ "_" + el._cellIndex;

					this._ctmndx._skip_hide = true

				} else {

					el.contextMenuId = el.parentNode.idd + "_" + el._cellIndex;

					el.contextMenu = this._ctmndx;

					el.a = this._ctmndx._contextStart;

					el.a(el, ev);

					el.a = null

				}

				ev.cancelBubble = true;

				return false

			}

		} else {

			if (this._ctmndx) {

				if (this._ctmndx.hideContextMenu) {

					this._ctmndx.hideContextMenu()

				} else {

					this._ctmndx._contextEnd()

				}

			}

		}

		return true

	};

	this.doClick = function(el, fl, selMethod, show) {

		if (!this.selMultiRows) {

			selMethod = 0

		}

		var psid = this.row ? this.row.idd : 0;

		this.setActive(true);

		if (!selMethod) {

			selMethod = 0

		}

		if (this.cell != null) {

			this.cell.className = this.cell.className.replace(

					/[ \t]*cellselected/g, "")

		}

		if (el.tagName == "TD") {

			if (this.checkEvent("onSelectStateChanged")) {

				var initial = this.getSelectedId()

			}

			var prow = this.row;

			if (selMethod == 1) {

				var elRowIndex = this.rowsCol._dhx_find(el.parentNode);

				var lcRowIndex = this.rowsCol._dhx_find(this.lastClicked);

				if (elRowIndex > lcRowIndex) {

					var strt = lcRowIndex;

					var end = elRowIndex

				} else {

					var strt = elRowIndex;

					var end = lcRowIndex

				}

				for (var i = 0; i < this.rowsCol.length; i++) {

					if ((i >= strt && i <= end)) {

						if (this.rowsCol[i] && (!this.rowsCol[i]._sRow)) {

							if (!this.rowsCol[i].idd) {

								continue

							}

							if (this.rowsCol[i].className

									.indexOf("rowselected") == -1

									&& (this.callEvent("onBeforeSelect", [

											this.rowsCol[i].idd, psid,

											el._cellIndex ]))) {

								this.rowsCol[i].className += " rowselected";

								this.selectedRows[this.selectedRows.length] = this.rowsCol[i]

							}

						} else {

							this.clearSelection();

							return this.doClick(el, fl, 0, show)

						}

					}

				}

			} else {

				if (selMethod == 2) {

					if (el.parentNode.className.indexOf("rowselected") != -1) {

						el.parentNode.className = el.parentNode.className

								.replace(/[ \t]*rowselected/g, "");

						this.selectedRows._dhx_removeAt(this.selectedRows

								._dhx_find(el.parentNode));

						var skipRowSelection = true;

						show = false

					}

				}

			}

			this.editStop();

			if (typeof (el.parentNode.idd) == "undefined") {

				return true

			}

			if ((!skipRowSelection) && (!el.parentNode._sRow)) {

				if (this.callEvent("onBeforeSelect", [ el.parentNode.idd, psid,

						el._cellIndex ])) {

					if (this.getSelectedRowId() != el.parentNode.idd) {

						if (selMethod == 0) {

							this.clearSelection()

						}

						this.cell = el;

						if ((prow == el.parentNode) && (this._chRRS)) {

							fl = false

						}

						this.row = el.parentNode;

						this.row.className += " rowselected";

						if (this.selectedRows._dhx_find(this.row) == -1) {

							this.selectedRows[this.selectedRows.length] = this.row

						}

					} else {

						this.cell = el;

						this.row = el.parentNode

					}

				} else {

					fl = false

				}

			}

			if (this.cell

					&& this.cell.parentNode.className.indexOf("rowselected") != -1) {

				this.cell.className = this.cell.className.replace(

						/[ \t]*cellselected/g, "")

						+ " cellselected"

			}

			if (selMethod != 1) {

				if (!this.row) {

					return

				}

			}

			this.lastClicked = el.parentNode;

			var rid = this.row.idd;

			var cid = this.cell;

			if (fl && typeof (rid) != "undefined" && cid && !skipRowSelection) {

				self.onRowSelectTime = setTimeout(function() {

					if (self.callEvent) {

						self.callEvent("onRowSelect", [ rid, cid._cellIndex ])

					}

				}, 100)

			} else {

				this.callEvent("onRowSelectRSOnly", [ rid ])

			}

			if (this.checkEvent("onSelectStateChanged")) {

				var afinal = this.getSelectedId();

				if (initial != afinal) {

					this.callEvent("onSelectStateChanged", [ afinal, initial ])

				}

			}

			if (skipRowSelection) {

				return false

			}

		}

		this.isActive = true;

		if (show !== false && this.cell && this.cell.parentNode.idd) {

			this.moveToVisible(this.cell)

		}

	};

	this.selectAll = function() {

		this.clearSelection();

		var coll = this.rowsBuffer;

		if (this.pagingOn) {

			coll = this.rowsCol

		}

		for (var i = 0; i < coll.length; i++) {

			this.render_row(i).className += " rowselected"

		}

		this.selectedRows = dhtmlxArray([].concat(coll));

		if (this.selectedRows.length) {

			this.row = this.selectedRows[0];

			this.cell = this.row.cells[0]

		}

		if ((this._fake) && (!this._realfake)) {

			this._fake.selectAll()

		}

	};

	this.selectCell = function(r, cInd, fl, preserve, edit, show) {

		if (!fl) {

			fl = false

		}

		if (typeof (r) != "object") {

			r = this.render_row(r)

		}

		if (!r || r == -1) {

			return null

		}

		if (r._childIndexes) {

			var c = r.childNodes[r._childIndexes[cInd]]

		} else {

			var c = r.childNodes[cInd]

		}

		if (!c) {

			c = r.childNodes[0]

		}

		if (!this.markedCells) {

			if (preserve) {

				this.doClick(c, fl, 3, show)

			} else {

				this.doClick(c, fl, 0, show)

			}

		} else {

			this.doMark(c, preserve ? 2 : 0)

		}

		if (edit) {

			this.editCell()

		}

	};

	this.moveToVisible = function(cell_obj, onlyVScroll) {

		if (this.pagingOn) {

			var newPage = Math.floor(this.getRowIndex(cell_obj.parentNode.idd)

					/ this.rowsBufferOutSize) + 1;

			if (newPage != this.currentPage) {

				this.changePage(newPage)

			}

		}

		try {

			if (cell_obj.offsetHeight) {

				var distance = cell_obj.offsetLeft + cell_obj.offsetWidth + 20;

				var scrollLeft = 0;

				if (distance > (this.objBox.offsetWidth + this.objBox.scrollLeft)) {

					if (cell_obj.offsetLeft > this.objBox.scrollLeft) {

						scrollLeft = cell_obj.offsetLeft

								- (this.objBox.offsetWidth - cell_obj.offsetWidth)

								+ 5

					}

				} else {

					if (cell_obj.offsetLeft < this.objBox.scrollLeft) {

						distance -= cell_obj.offsetWidth * 2 / 3;

						if (distance < this.objBox.scrollLeft) {

							scrollLeft = cell_obj.offsetLeft - 5

						}

					}

				}

				if ((scrollLeft) && (!onlyVScroll)) {

					this.objBox.scrollLeft = scrollLeft

				}

			}

			if (!cell_obj.offsetHeight) {

				var mask = this._realfake ? this._fake.rowsAr[cell_obj.parentNode.idd]

						: cell_obj.parentNode;

				distance = this.rowsBuffer._dhx_find(mask) * this._srdh

			} else {

				distance = cell_obj.offsetTop

			}

			var distancemax = distance + cell_obj.offsetHeight + 38;

			if (distancemax > (this.objBox.offsetHeight + this.objBox.scrollTop)) {

				var scrollTop = distance

			} else {

				if (distance < this.objBox.scrollTop) {

					var scrollTop = distance - 5

				}

			}

			if (scrollTop) {

				this.objBox.scrollTop = scrollTop

			}

		} catch (er) {

		}

	};

	this.editCell = function() {

		if (this.editor && this.cell == this.editor.cell) {

			return

		}

		this.editStop();

		if ((this.isEditable != true) || (!this.cell)) {

			return false

		}

		var c = this.cell;

		if (c.parentNode._locked) {

			return false

		}

		this.editor = this.cells4(c);

		if (this.editor != null) {

			if (this.editor.isDisabled()) {

				this.editor = null;

				return false

			}

			if (this.callEvent("onEditCell", [ 0, this.row.idd,

					this.cell._cellIndex ]) != false

					&& this.editor.edit) {

				this._Opera_stop = (new Date).valueOf();

				c.className += " editable";

				this.editor.edit();

				this.callEvent("onEditCell", [ 1, this.row.idd,

						this.cell._cellIndex ])

			} else {

				this.editor = null

			}

		}

	};

	this.editStop = function(mode) {

		if (_isOpera) {

			if (this._Opera_stop) {

				if ((this._Opera_stop * 1 + 50) > (new Date).valueOf()) {

					return

				}

				this._Opera_stop = null

			}

		}

		if (this.editor && this.editor != null) {

			this.editor.cell.className = this.editor.cell.className.replace(

					"editable", "");

			if (mode) {

				var t = this.editor.val;

				this.editor.detach();

				this.editor.setValue(t);

				this.editor = null;

				this.callEvent("onEditCancel", [ this.row.idd,

						this.cell._cellIndex, t ]);

				return

			}

			if (this.editor.detach()) {

				this.cell.wasChanged = true

			}

			var g = this.editor;

			if (g == null) {

				return

			}

			this.editor = null;

			var z = this.callEvent("onEditCell", [ 2, this.row.idd,

					this.cell._cellIndex, g.getValue(), g.val ]);

			if ((typeof (z) == "string") || (typeof (z) == "number")) {

				g[g.setImage ? "setLabel" : "setValue"](z)

			} else {

				if (!z) {

					g[g.setImage ? "setLabel" : "setValue"](g.val)

				}

			}

			if (this._ahgr && this.multiLine) {

				this.setSizes()

			}

		}

	};

	this._nextRowCell = function(row, dir, pos) {

		row = this._nextRow((this._groups ? this.rowsCol : this.rowsBuffer)

				._dhx_find(row), dir);

		if (!row) {

			return null

		}

		return row.childNodes[row._childIndexes ? row._childIndexes[pos] : pos]

	};

	this._getNextCell = function(acell, dir, i) {

		acell = acell || this.cell;

		var arow = acell.parentNode;

		if (this._tabOrder) {

			i = this._tabOrder[acell._cellIndex];

			if (typeof i != "undefined") {

				if (i < 0) {

					acell = this._nextRowCell(arow, dir, Math.abs(i) - 1)

				} else {

					acell = arow.childNodes[i]

				}

			}

		} else {

			var i = acell._cellIndex + dir;

			if (i >= 0 && i < this._cCount) {

				if (arow._childIndexes) {

					i = arow._childIndexes[acell._cellIndex] + dir

				}

				acell = arow.childNodes[i]

			} else {

				acell = this._nextRowCell(arow, dir, (dir == 1 ? 0

						: (this._cCount - 1)))

			}

		}

		if (!acell) {

			if ((dir == 1) && this.tabEnd) {

				this.tabEnd.focus();

				this.tabEnd.focus();

				this.setActive(false)

			}

			if ((dir == -1) && this.tabStart) {

				this.tabStart.focus();

				this.tabStart.focus();

				this.setActive(false)

			}

			return null

		}

		if (acell.style.display != "none"

				&& (!this.smartTabOrder || !this.cells(acell.parentNode.idd,

						acell._cellIndex).isDisabled())) {

			return acell

		}

		return this._getNextCell(acell, dir)

	};

	this._nextRow = function(ind, dir) {

		var r = this.render_row(ind + dir);

		if (!r || r == -1) {

			return null

		}

		if (r && r.style.display == "none") {

			return this._nextRow(ind + dir, dir)

		}

		return r

	};

	this.scrollPage = function(dir) {

		if (!this.rowsBuffer.length) {

			return

		}

		var master = this._realfake ? this._fake : this;

		var new_ind = Math.floor((master._r_select

				|| this.getRowIndex(this.row.idd) || 0)

				+ (dir) * this.objBox.offsetHeight / (this._srdh || 20));

		if (new_ind < 0) {

			new_ind = 0

		}

		if (new_ind >= this.rowsBuffer.length) {

			new_ind = this.rowsBuffer.length - 1

		}

		if (this._srnd && !this.rowsBuffer[new_ind]) {

			this.objBox.scrollTop += Math.floor((dir)

					* this.objBox.offsetHeight / (this._srdh || 20))

					* (this._srdh || 20);

			if (this._fake) {

				this._fake.objBox.scrollTop = this.objBox.scrollTop

			}

			master._r_select = new_ind

		} else {

			this.selectCell(new_ind, this.cell._cellIndex, true, false, false,

					(this.multiLine || this._srnd));

			if (!this.multiLine && !this._srnd && !this._realfake) {

				this.objBox.scrollTop = this.getRowById(this.getRowId(new_ind)).offsetTop;

				if (this._fake) {

					this._fake.objBox.scrollTop = this.objBox.scrollTop

				}

			}

			master._r_select = null

		}

	};

	this.doKey = function(ev) {

		if (!ev) {

			return true

		}

		if ((ev.target || ev.srcElement).value !== window.undefined) {

			var zx = (ev.target || ev.srcElement);

			if (zx.className != "dhxcombo_input"

					&& zx.className != "dhx_tab_ignore"

					&& ((!zx.parentNode) || (zx.parentNode.className

							.indexOf("editable") == -1))) {

				return true

			}

		}

		if ((globalActiveDHTMLGridObject)

				&& (this != globalActiveDHTMLGridObject)) {

			return globalActiveDHTMLGridObject.doKey(ev)

		}

		if (this.isActive == false) {

			return true

		}

		if (this._htkebl) {

			return true

		}

		if (!this.callEvent("onKeyPress", [ ev.keyCode, ev.ctrlKey,

				ev.shiftKey, ev ])) {

			return false

		}

		var code = "k" + ev.keyCode + "_" + (ev.ctrlKey ? 1 : 0) + "_"

				+ (ev.shiftKey ? 1 : 0);

		if (this.cell) {

			if (this._key_events[code]) {

				if (false === this._key_events[code].call(this)) {

					return true

				}

				if (ev.preventDefault) {

					ev.preventDefault()

				}

				ev.cancelBubble = true;

				return false

			}

			if (this._key_events.k_other) {

				this._key_events.k_other.call(this, ev)

			}

		}

		return true

	};

	this.selectRow = function(r, fl, preserve, show) {

		if (typeof (r) != "object") {

			r = this.render_row(r)

		}

		this.selectCell(r, 0, fl, preserve, false, show)

	};

	this.wasDblClicked = function(ev) {

		var el = this.getFirstParentOfType(_isIE ? ev.srcElement : ev.target,

				"TD");

		if (el) {

			var rowId = el.parentNode.idd;

			return this.callEvent("onRowDblClicked",

					[ rowId, el._cellIndex, ev ])

		}

	};

	this._onHeaderClick = function(e, el) {

		var that = this.grid;

		el = el

				|| that.getFirstParentOfType(_isIE ? event.srcElement

						: e.target, "TD");

		if (this.grid.resized == null) {

			if (!(this.grid.callEvent("onHeaderClick", [ el._cellIndexS,

					(e || window.event) ]))) {

				return false

			}

			that.sortField(el._cellIndexS, false, el)

		}

		this.grid.resized = null

	};

	this.deleteSelectedRows = function() {

		var num = this.selectedRows.length;

		if (num == 0) {

			return

		}

		var tmpAr = this.selectedRows;

		this.selectedRows = dhtmlxArray();

		for (var i = num - 1; i >= 0; i--) {

			var node = tmpAr[i];

			if (!this.deleteRow(node.idd, node)) {

				this.selectedRows[this.selectedRows.length] = node

			} else {

				if (node == this.row) {

					var ind = i

				}

			}

		}

		if (ind) {

			try {

				if (ind + 1 > this.rowsCol.length) {

					ind--

				}

				this.selectCell(ind, 0, true)

			} catch (er) {

				this.row = null;

				this.cell = null

			}

		}

	};

	this.getSelectedRowId = function() {

		var selAr = new Array(0);

		var uni = {};

		for (var i = 0; i < this.selectedRows.length; i++) {

			var id = this.selectedRows[i].idd;

			if (uni[id]) {

				continue

			}

			selAr[selAr.length] = id;

			uni[id] = true

		}

		if (selAr.length == 0) {

			return null

		} else {

			return selAr.join(this.delim)

		}

	};

	this.getSelectedCellIndex = function() {

		if (this.cell != null) {

			return this.cell._cellIndex

		} else {

			return -1

		}

	};

	this.getColWidth = function(ind) {

		return parseInt(this.cellWidthPX[ind])

	};

	this.setColWidth = function(ind, value) {

		if (value == "*") {

			this.initCellWidth[ind] = "*"

		} else {

			if (this._hrrar[ind]) {

				return

			}

			if (this.cellWidthType == "px") {

				this.cellWidthPX[ind] = parseInt(value)

			} else {

				this.cellWidthPC[ind] = parseInt(value)

			}

		}

		this.setSizes()

	};

	this.getRowIndex = function(row_id) {

		for (var i = 0; i < this.rowsBuffer.length; i++) {

			if (this.rowsBuffer[i] && this.rowsBuffer[i].idd == row_id) {

				return i

			}

		}

		return -1

	};

	this.getRowId = function(ind) {

		return this.rowsBuffer[ind] ? this.rowsBuffer[ind].idd : this.undefined

	};

	this.setRowId = function(ind, row_id) {

		this.changeRowId(this.getRowId(ind), row_id)

	};

	this.changeRowId = function(oldRowId, newRowId) {

		if (oldRowId == newRowId) {

			return

		}

		var row = this.rowsAr[oldRowId];

		row.idd = newRowId;

		if (this.UserData[oldRowId]) {

			this.UserData[newRowId] = this.UserData[oldRowId];

			this.UserData[oldRowId] = null

		}

		if (this._h2 && this._h2.get[oldRowId]) {

			this._h2.get[newRowId] = this._h2.get[oldRowId];

			this._h2.get[newRowId].id = newRowId;

			delete this._h2.get[oldRowId]

		}

		this.rowsAr[oldRowId] = null;

		this.rowsAr[newRowId] = row;

		for (var i = 0; i < row.childNodes.length; i++) {

			if (row.childNodes[i]._code) {

				row.childNodes[i]._code = this._compileSCL(

						row.childNodes[i]._val, row.childNodes[i])

			}

		}

		if (this._mat_links && this._mat_links[oldRowId]) {

			var a = this._mat_links[oldRowId];

			delete this._mat_links[oldRowId];

			for ( var c in a) {

				for (var i = 0; i < a[c].length; i++) {

					this._compileSCL(a[c][i].original, a[c][i])

				}

			}

		}

		this.callEvent("onRowIdChange", [ oldRowId, newRowId ])

	};

	this.setColumnIds = function(ids) {

		this.columnIds = ids.split(this.delim)

	};

	this.setColumnId = function(ind, id) {

		this.columnIds[ind] = id

	};

	this.getColIndexById = function(id) {

		for (var i = 0; i < this.columnIds.length; i++) {

			if (this.columnIds[i] == id) {

				return i

			}

		}

	};

	this.getColumnId = function(cin) {

		return this.columnIds[cin]

	};

	this.getColumnLabel = function(cin, ind, hdr, raw) {

		var z = (hdr || this.hdr).rows[(ind || 0) + 1];

		for (var i = 0; i < z.cells.length; i++) {

			if (z.cells[i]._cellIndexS == cin) {

				return raw ? z.cells[i].firstChild.innerHTML

						: (_isIE ? z.cells[i].innerText

								: z.cells[i].textContent)

			}

		}

		return ""

	};

	this.getColLabel = this.getColumnLabel;

	this.getFooterLabel = function(cin, ind, raw) {

		return this.getColumnLabel(cin, ind, this.ftr, raw)

	};

	this.setRowTextBold = function(row_id) {

		var r = this.getRowById(row_id);

		if (r) {

			r.style.fontWeight = "bold"

		}

	};

	this.setRowTextStyle = function(row_id, styleString) {

		var r = this.getRowById(row_id);

		if (!r) {

			return

		}

		for (var i = 0; i < r.childNodes.length; i++) {

			var pfix = r.childNodes[i]._attrs.style || "";

			if ((this._hrrar) && (this._hrrar[i])) {

				pfix = "display:none;"

			}

			if (_isIE) {

				r.childNodes[i].style.cssText = pfix + "width:"

						+ r.childNodes[i].style.width + ";" + styleString

			} else {

				r.childNodes[i].style.cssText = pfix + "width:"

						+ r.childNodes[i].style.width + ";" + styleString

			}

		}

	};

	this.setRowColor = function(row_id, color) {

		var r = this.getRowById(row_id);

		for (var i = 0; i < r.childNodes.length; i++) {

			r.childNodes[i].bgColor = color

		}

	};

	this.setCellTextStyle = function(row_id, ind, styleString) {

		var r = this.getRowById(row_id);

		if (!r) {

			return

		}

		var cell = r.childNodes[r._childIndexes ? r._childIndexes[ind] : ind];

		if (!cell) {

			return

		}

		var pfix = "";

		if ((this._hrrar) && (this._hrrar[ind])) {

			pfix = "display:none;"

		}

		if (_isIE) {

			cell.style.cssText = pfix + "width:" + cell.style.width + ";"

					+ styleString

		} else {

			cell.style.cssText = pfix + "width:" + cell.style.width + ";"

					+ styleString

		}

	};

	this.setRowTextNormal = function(row_id) {

		var r = this.getRowById(row_id);

		if (r) {

			r.style.fontWeight = "normal"

		}

	};

	this.doesRowExist = function(row_id) {

		if (this.getRowById(row_id) != null) {

			return true

		} else {

			return false

		}

	};

	this.getColumnsNum = function() {

		return this._cCount

	};

	this.moveRowUp = function(row_id) {

		var r = this.getRowById(row_id);

		if (this.isTreeGrid()) {

			return this.moveRowUDTG(row_id, -1)

		}

		var rInd = this.rowsCol._dhx_find(r);

		if ((r.previousSibling) && (rInd != 0)) {

			r.parentNode.insertBefore(r, r.previousSibling);

			this.rowsCol._dhx_swapItems(rInd, rInd - 1);

			this.setSizes();

			var bInd = this.rowsBuffer._dhx_find(r);

			this.rowsBuffer._dhx_swapItems(bInd, bInd - 1);

			if (this._cssEven) {

				this._fixAlterCss(rInd - 1)

			}

		}

	};

	this.moveRowDown = function(row_id) {

		var r = this.getRowById(row_id);

		if (this.isTreeGrid()) {

			return this.moveRowUDTG(row_id, 1)

		}

		var rInd = this.rowsCol._dhx_find(r);

		if (r.nextSibling) {

			this.rowsCol._dhx_swapItems(rInd, rInd + 1);

			if (r.nextSibling.nextSibling) {

				r.parentNode.insertBefore(r, r.nextSibling.nextSibling)

			} else {

				r.parentNode.appendChild(r)

			}

			this.setSizes();

			var bInd = this.rowsBuffer._dhx_find(r);

			this.rowsBuffer._dhx_swapItems(bInd, bInd + 1);

			if (this._cssEven) {

				this._fixAlterCss(rInd)

			}

		}

	};

	this.getCombo = function(col_ind) {

		if (!this.combos[col_ind]) {

			this.combos[col_ind] = new dhtmlXGridComboObject()

		}

		return this.combos[col_ind]

	};

	this.setUserData = function(row_id, name, value) {

		if (!row_id) {

			row_id = "gridglobaluserdata"

		}

		if (!this.UserData[row_id]) {

			this.UserData[row_id] = new Hashtable()

		}

		this.UserData[row_id].put(name, value)

	};

	this.getUserData = function(row_id, name) {

		if (!row_id) {

			row_id = "gridglobaluserdata"

		}

		this.getRowById(row_id);

		var z = this.UserData[row_id];

		return (z ? z.get(name) : "")

	};

	this.setEditable = function(fl) {

		this.isEditable = dhx4.s2b(fl)

	};

	this.selectRowById = function(row_id, multiFL, show, call) {

		if (!call) {

			call = false

		}

		this.selectCell(this.getRowById(row_id), 0, call, multiFL, false, show)

	};

	this.clearSelection = function() {

		this.editStop();

		for (var i = 0; i < this.selectedRows.length; i++) {

			var r = this.rowsAr[this.selectedRows[i].idd];

			if (r) {

				r.className = r.className.replace(/[ \t]*rowselected/g, "")

			}

		}

		this.selectedRows = dhtmlxArray();

		this.row = null;

		if (this.cell != null) {

			this.cell.className = this.cell.className.replace(

					/[ \t]*cellselected/g, "");

			this.cell = null

		}

		this.callEvent("onSelectionCleared", [])

	};

	this.copyRowContent = function(from_row_id, to_row_id) {

		var frRow = this.getRowById(from_row_id);

		if (!this.isTreeGrid()) {

			for (var i = 0; i < frRow.cells.length; i++) {

				this.cells(to_row_id, i).setValue(

						this.cells(from_row_id, i).getValue())

			}

		} else {

			this._copyTreeGridRowContent(frRow, from_row_id, to_row_id)

		}

		if (!_isIE) {

			this.getRowById(from_row_id).cells[0].height = frRow.cells[0].offsetHeight

		}

	};

	this.setFooterLabel = function(c, label, ind) {

		return this.setColumnLabel(c, label, ind, this.ftr)

	};

	this.setColumnLabel = function(c, label, ind, hdr) {

		var z = (hdr || this.hdr).rows[ind || 1];

		var col = (z._childIndexes ? z._childIndexes[c] : c);

		if (!z.cells[col]) {

			return

		}

		if (!this.useImagesInHeader) {

			var hdrHTML = "<div class='hdrcell'>";

			if (label.indexOf("img:[") != -1) {

				var imUrl = label.replace(/.*\[([^>]+)\].*/, "$1");

				label = label.substr(label.indexOf("]") + 1, label.length);

				hdrHTML += "<img width='18px' height='18px' align='absmiddle' src='"

						+ imUrl + "' hspace='2'>"

			}

			hdrHTML += label;

			hdrHTML += "</div>";

			z.cells[col].innerHTML = hdrHTML;

			if (this._hstyles[c]) {

				z.cells[col].style.cssText = this._hstyles[c]

			}

		} else {

			z.cells[col].style.textAlign = "left";

			z.cells[col].innerHTML = "<img src='" + label + "'>";

			var a = new Image();

			a.src = "" + label.replace(/(\.[a-z]+)/, ".des$1");

			this.preloadImagesAr[this.preloadImagesAr.length] = a;

			var b = new Image();

			b.src = "" + label.replace(/(\.[a-z]+)/, ".asc$1");

			this.preloadImagesAr[this.preloadImagesAr.length] = b

		}

		if ((label || "").indexOf("#") != -1) {

			var t = label.match(/(^|{)#([^}]+)(}|$)/);

			if (t) {

				var tn = "_in_header_" + t[2];

				if (this[tn]) {

					this[tn]((this.forceDivInHeader ? z.cells[col].firstChild

							: z.cells[col]), col, label.split(t[0]))

				}

			}

		}

	};

	this.setColLabel = function(a, b, ind, c) {

		return this.setColumnLabel(a, b, (ind || 0) + 1, c)

	};

	this.clearAll = function(header) {

		if (!this.obj.rows[0]) {

			return

		}

		if (this._h2) {

			this._h2 = this._createHierarchy();

			if (this._fake) {

				if (this._realfake) {

					this._h2 = this._fake._h2

				} else {

					this._fake._h2 = this._h2

				}

			}

		}

		this.limit = this._limitC = 0;

		this.editStop(true);

		if (this._dLoadTimer) {

			window.clearTimeout(this._dLoadTimer)

		}

		if (this._dload) {

			this.objBox.scrollTop = 0;

			this.limit = this._limitC || 0;

			this._initDrF = true

		}

		var len = this.rowsCol.length;

		len = this.obj.rows.length;

		for (var i = len - 1; i > 0; i--) {

			var t_r = this.obj.rows[i];

			t_r.parentNode.removeChild(t_r)

		}

		if (header) {

			this._master_row = null;

			this.obj.rows[0].parentNode.removeChild(this.obj.rows[0]);

			for (var i = this.hdr.rows.length - 1; i >= 0; i--) {

				var t_r = this.hdr.rows[i];

				t_r.parentNode.removeChild(t_r)

			}

			if (this.ftr) {

				this.ftr.parentNode.removeChild(this.ftr);

				this.ftr = null

			}

			this._aHead = this.ftr = this.cellWidth = this._aFoot = null;

			this.cellType = dhtmlxArray();

			this._hrrar = [];

			this.columnIds = [];

			this.combos = [];

			this._strangeParams = [];

			this.defVal = [];

			this._ivizcol = null

		}

		this.row = null;

		this.cell = null;

		this.rowsCol = dhtmlxArray();

		this.rowsAr = {};

		this._RaSeCol = [];

		this.rowsBuffer = dhtmlxArray();

		this.UserData = [];

		this.selectedRows = dhtmlxArray();

		if (this.pagingOn || this._srnd) {

			this.xmlFileUrl = ""

		}

		if (this.pagingOn) {

			this.changePage(1)

		}

		if (this._contextCallTimer) {

			window.clearTimeout(this._contextCallTimer)

		}

		if (this._sst) {

			this.enableStableSorting(true)

		}

		this._fillers = this.undefined;

		this.setSortImgState(false);

		this.setSizes();

		this.callEvent("onClearAll", [])

	};

	this.sortField = function(ind, repeatFl, r_el) {

		if (this.getRowsNum() == 0) {

			return false

		}

		var el = this.hdr.rows[0].cells[ind];

		if (!el) {

			return

		}

		if (el.tagName == "TH" && (this.fldSort.length - 1) >= el._cellIndex

				&& this.fldSort[el._cellIndex] != "na") {

			var data = this.getSortingState();

			var sortType = (data[0] == ind && data[1] == "asc") ? "des" : "asc";

			if (!this.callEvent("onBeforeSorting", [ ind, this.fldSort[ind],

					sortType ])) {

				return

			}

			this.sortImg.className = "dhxgrid_sort_"

					+ (sortType == "asc" ? "asc" : "desc");

			if (this.useImagesInHeader) {

				var cel = this.hdr.rows[1].cells[el._cellIndex].firstChild;

				if (this.fldSorted != null) {

					var celT = this.hdr.rows[1].cells[this.fldSorted._cellIndex].firstChild;

					celT.src = celT.src.replace(/(\.asc\.)|(\.des\.)/, ".")

				}

				cel.src = cel.src.replace(/(\.[a-z]+)$/, "." + sortType + "$1")

			}

			this.sortRows(el._cellIndex, this.fldSort[el._cellIndex], sortType);

			this.fldSorted = el;

			if (r_el && r_el.tagName.toLowerCase() != "th") {

				this.r_fldSorted = r_el

			}

			var c = this.hdr.rows[1];

			var c = r_el.parentNode;

			var real_el = c._childIndexes ? c._childIndexes[el._cellIndex]

					: el._cellIndex;

			this.setSortImgPos(false, false, false, r_el)

		}

	};

	this.setCustomSorting = function(func, col) {

		if (!this._customSorts) {

			this._customSorts = new Array()

		}

		this._customSorts[col] = (typeof (func) == "string") ? eval(func)

				: func;

		this.fldSort[col] = "cus"

	};

	this.enableHeaderImages = function(fl) {

		this.useImagesInHeader = fl

	};

	this.setHeader = function(hdrStr, splitSign, styles) {

		if (typeof (hdrStr) != "object") {

			var arLab = this._eSplit(hdrStr)

		} else {

			arLab = [].concat(hdrStr)

		}

		var arWdth = new Array(0);

		var arTyp = new dhtmlxArray(0);

		var arAlg = new Array(0);

		var arVAlg = new Array(0);

		var arSrt = new Array(0);

		for (var i = 0; i < arLab.length; i++) {

			arWdth[arWdth.length] = Math.round(100 / arLab.length);

			arTyp[arTyp.length] = "ed";

			arAlg[arAlg.length] = "left";

			arVAlg[arVAlg.length] = "middle";

			arSrt[arSrt.length] = "na"

		}

		this.splitSign = splitSign || "#cspan";

		this.hdrLabels = arLab;

		this.cellWidth = arWdth;

		if (!this.initCellWidth.length) {

			this.setInitWidthsP(arWdth.join(this.delim), true)

		}

		this.cellType = arTyp;

		this.cellAlign = arAlg;

		this.cellVAlign = arVAlg;

		this.fldSort = arSrt;

		this._hstyles = styles || []

	};

	this._eSplit = function(str) {

		if (![].push) {

			return str.split(this.delim)

		}

		var a = "r" + (new Date()).valueOf();

		var z = this.delim.replace(/([\|\+\*\^])/g, "\\$1");

		return (str || "").replace(RegExp(z, "g"), a).replace(

				RegExp("\\\\" + a, "g"), this.delim).split(a)

	};

	this.getColType = function(cInd) {

		return this.cellType[cInd]

	};

	this.getColTypeById = function(cID) {

		return this.cellType[this.getColIndexById(cID)]

	};

	this.setColTypes = function(typeStr) {

		this.cellType = dhtmlxArray(typeStr.split(this.delim));

		this._strangeParams = new Array();

		for (var i = 0; i < this.cellType.length; i++) {

			if ((this.cellType[i].indexOf("[") != -1)) {

				var z = this.cellType[i].split(/[\[\]]+/g);

				this.cellType[i] = z[0];

				this.defVal[i] = z[1];

				if (z[1].indexOf("=") == 0) {

					this.cellType[i] = "math";

					this._strangeParams[i] = z[0]

				}

			}

			if (!window["eXcell_" + this.cellType[i]]) {

				dhx4.callEvent("onConfigurationError", [

						"Incorrect cell type: " + this.cellType[i], this,

						this.cellType[i] ])

			}

		}

	};

	this.setColSorting = function(sortStr) {

		this.fldSort = sortStr.split(this.delim);

		var check = {

			str : 1,

			"int" : 1,

			date : 1

		};

		for (var i = 0; i < this.fldSort.length; i++) {

			if ((!check[this.fldSort[i]])

					&& (typeof (window[this.fldSort[i]]) == "function")) {

				if (!this._customSorts) {

					this._customSorts = new Array()

				}

				this._customSorts[i] = window[this.fldSort[i]];

				this.fldSort[i] = "cus"

			}

		}

	};

	this.setColAlign = function(alStr) {

		this.cellAlign = alStr.split(this.delim);

		for (var i = 0; i < this.cellAlign.length; i++) {

			this.cellAlign[i] = this.cellAlign[i]._dhx_trim()

		}

	};

	this.setColVAlign = function(valStr) {

		this.cellVAlign = valStr.split(this.delim)

	};

	this.setNoHeader = function(fl) {

		this.noHeader = dhx4.s2b(fl)

	};

	this.showRow = function(rowID) {

		this.getRowById(rowID);

		if (this._h2) {

			this.openItem(this._h2.get[rowID].parent.id)

		}

		var c = this.getRowById(rowID).childNodes[0];

		while (c && c.style.display == "none") {

			c = c.nextSibling

		}

		if (c) {

			this.moveToVisible(c, true)

		}

	};

	this.setStyle = function(ss_header, ss_grid, ss_selCell, ss_selRow) {

		this.ssModifier = [ ss_header, ss_grid, ss_selCell, ss_selCell,

				ss_selRow ];

		var prefs = [

				"#" + this.entBox.id + " table.hdr td",

				"#" + this.entBox.id + " table.obj td",

				"#" + this.entBox.id

						+ " table.obj tr.rowselected td.cellselected",

				"#" + this.entBox.id + " table.obj td.cellselected",

				"#" + this.entBox.id + " table.obj tr.rowselected td" ];

		var index = 0;

		while (!_isIE) {

			try {

				var temp = document.styleSheets[index].cssRules.length

			} catch (e) {

				index++;

				continue

			}

			break

		}

		for (var i = 0; i < prefs.length; i++) {

			if (this.ssModifier[i]) {

				if (_isIE) {

					document.styleSheets[0].addRule(prefs[i],

							this.ssModifier[i])

				} else {

					document.styleSheets[index].insertRule(prefs[i]

							+ (" { " + this.ssModifier[i] + " }"),

							document.styleSheets[index].cssRules.length)

				}

			}

		}

	};

	this.setColumnColor = function(clr) {

		this.columnColor = clr.split(this.delim)

	};

	this.enableAlterCss = function(cssE, cssU, perLevel, levelUnique) {

		if (cssE || cssU) {

			this.attachEvent("onGridReconstructed", function() {

				this._fixAlterCss();

				if (this._fake) {

					this._fake._fixAlterCss()

				}

			})

		}

		this._cssSP = perLevel;

		this._cssSU = levelUnique;

		this._cssEven = cssE;

		this._cssUnEven = cssU

	};

	this._fixAlterCss = function(ind) {

		if (this._h2 && (this._cssSP || this._cssSU)) {

			return this._fixAlterCssTGR(ind)

		}

		if (!this._cssEven && !this._cssUnEven) {

			return

		}

		ind = ind || 0;

		var j = ind;

		for (var i = ind; i < this.rowsCol.length; i++) {

			if (!this.rowsCol[i]) {

				continue

			}

			if (this.rowsCol[i].style.display != "none") {

				if (this.rowsCol[i]._cntr) {

					j = 1;

					continue

				}

				if (this.rowsCol[i].className.indexOf("rowselected") != -1) {

					if (j % 2 == 1) {

						this.rowsCol[i].className = this._cssUnEven

								+ " rowselected "

								+ (this.rowsCol[i]._css || "")

					} else {

						this.rowsCol[i].className = this._cssEven

								+ " rowselected "

								+ (this.rowsCol[i]._css || "")

					}

				} else {

					if (j % 2 == 1) {

						this.rowsCol[i].className = this._cssUnEven + " "

								+ (this.rowsCol[i]._css || "")

					} else {

						this.rowsCol[i].className = this._cssEven + " "

								+ (this.rowsCol[i]._css || "")

					}

				}

				j++

			}

		}

	};

	this.clearChangedState = function(clear_added) {

		for (var i = 0; i < this.rowsCol.length; i++) {

			var row = this.rowsCol[i];

			if (row && row.childNodes) {

				var cols = row.childNodes.length;

				for (var j = 0; j < cols; j++) {

					row.childNodes[j].wasChanged = false

				}

				if (clear_added) {

					row._added = false

				}

			}

		}

	};

	this.getChangedRows = function(and_added) {

		var res = new Array();

		this.forEachRow(function(id) {

			var row = this.rowsAr[id];

			if (row.tagName != "TR") {

				return

			}

			var cols = row.childNodes.length;

			if (and_added && row._added) {

				res[res.length] = row.idd

			} else {

				for (var j = 0; j < cols; j++) {

					if (row.childNodes[j].wasChanged) {

						res[res.length] = row.idd;

						break

					}

				}

			}

		});

		return res.join(this.delim)

	};

	this._sUDa = false;

	this._sAll = false;

	this.setSerializationLevel = function(userData, fullXML, config,

			changedAttr, onlyChanged, asCDATA) {

		this._sUDa = userData;

		this._sAll = fullXML;

		this._sConfig = config;

		this._chAttr = changedAttr;

		this._onlChAttr = onlyChanged;

		this._asCDATA = asCDATA

	};

	this.setSerializableColumns = function(list) {

		if (!list) {

			this._srClmn = null;

			return

		}

		this._srClmn = (list || "").split(",");

		for (var i = 0; i < this._srClmn.length; i++) {

			this._srClmn[i] = dhx4.s2b(this._srClmn[i])

		}

	};

	this._serialise = function(rCol, inner, closed) {

		this.editStop();

		var out = [];

		var close = "</" + this.xml.s_row + ">";

		if (this.isTreeGrid()) {

			this._h2.forEachChildF(0, function(el) {

				var temp = this._serializeRow(this.render_row_tree(-1, el.id));

				out.push(temp);

				if (temp) {

					return true

				} else {

					return false

				}

			}, this, function() {

				out.push(close)

			})

		} else {

			for (var i = 0; i < this.rowsBuffer.length; i++) {

				if (this.rowsBuffer[i]) {

					if (this._chAttr && this.rowsBuffer[i]._locator) {

						continue

					}

					var temp = this._serializeRow(this.render_row(i));

					out.push(temp);

					if (temp) {

						out.push(close)

					}

				}

			}

		}

		return [ out.join("") ]

	};

	this._serializeRow = function(r, i) {

		var out = [];

		var ra = this.xml.row_attrs;

		var ca = this.xml.cell_attrs;

		out.push("<" + this.xml.s_row);

		out.push(" id='" + r.idd + "'");

		if ((this._sAll) && this.selectedRows._dhx_find(r) != -1) {

			out.push(" selected='1'")

		}

		if (this._h2 && this._h2.get[r.idd].state == "minus") {

			out.push(" open='1'")

		}

		if (ra.length) {

			for (var i = 0; i < ra.length; i++) {

				out.push(" " + ra[i] + "='" + r._attrs[ra[i]] + "'")

			}

		}

		out.push(">");

		if (this._sUDa && this.UserData[r.idd]) {

			keysAr = this.UserData[r.idd].getKeys();

			for (var ii = 0; ii < keysAr.length; ii++) {

				var subkey = keysAr[ii];

				if (subkey.indexOf("__") !== 0) {

					out.push("<userdata name='" + subkey + "'>"

							+ (this._asCDATA ? "<![CDATA[" : "")

							+ this.UserData[r.idd].get(subkey)

							+ (this._asCDATA ? "]]>" : "") + "</userdata>")

				}

			}

		}

		var changeFl = false;

		for (var jj = 0; jj < this._cCount; jj++) {

			if ((!this._srClmn) || (this._srClmn[jj])) {

				var zx = this.cells3(r, jj);

				out.push("<cell");

				if (ca.length) {

					for (var i = 0; i < ca.length; i++) {

						out.push(" " + ca[i] + "='" + zx.cell._attrs[ca[i]]

								+ "'")

					}

				}

				zxVal = zx[this._agetm]();

				if (this._asCDATA) {

					zxVal = "<![CDATA[" + zxVal + "]]>"

				}

				if ((this._ecspn) && (zx.cell.colSpan) && zx.cell.colSpan > 1) {

					out.push(' colspan="' + zx.cell.colSpan + '" ')

				}

				if (this._chAttr) {

					if (zx.wasChanged()) {

						out.push(' changed="1"');

						changeFl = true

					}

				} else {

					if ((this._onlChAttr) && (zx.wasChanged())) {

						changeFl = true

					}

				}

				if (this._sAll && this.cellType[jj] == "tree") {

					out.push((this._h2 ? (" image='"

							+ this._h2.get[r.idd].image + "'") : "")

							+ ">" + zxVal + "</cell>")

				} else {

					out.push(">" + zxVal + "</cell>")

				}

				if ((this._ecspn) && (zx.cell.colSpan)) {

					for (var u = 0; u < zx.cell.colSpan - 1; u++) {

						out.push("<cell/>");

						jj++

					}

				}

			}

		}

		if ((this._onlChAttr) && (!changeFl) && (!r._added)) {

			return ""

		}

		return out.join("")

	};

	this._serialiseConfig = function() {

		var out = "<head>";

		for (var i = 0; i < this.hdr.rows[0].cells.length; i++) {

			if (this._srClmn && !this._srClmn[i]) {

				continue

			}

			var sort = this.fldSort[i];

			if (sort == "cus") {

				sort = this._customSorts[i].toString();

				sort = sort.replace(/function[\ ]*/, "")

						.replace(/\([^\f]*/, "")

			}

			out += "<column width='"

					+ this.getColWidth(i)

					+ "' align='"

					+ this.cellAlign[i]

					+ "' type='"

					+ this.cellType[i]

					+ "' sort='"

					+ (sort || "na")

					+ "' color='"

					+ (this.columnColor[i] || "")

					+ "'"

					+ (this.columnIds[i] ? (" id='" + this.columnIds[i] + "'")

							: "") + ">";

			if (this._asCDATA) {

				out += "<![CDATA[" + this.getColumnLabel(i) + "]]>"

			} else {

				out += this.getColumnLabel(i)

			}

			var z = this.getCombo(i);

			if (z) {

				for (var j = 0; j < z.keys.length; j++) {

					out += "<option value='" + z.keys[j] + "'>" + z.values[j]

							+ "</option>"

				}

			}

			out += "</column>"

		}

		return out += "</head>"

	};

	this.serialize = function() {

		var out = '<?xml version="1.0"?><rows>';

		if (this._mathSerialization) {

			this._agetm = "getMathValue"

		} else {

			this._agetm = "getValue"

		}

		if (this._sUDa && this.UserData.gridglobaluserdata) {

			var keysAr = this.UserData.gridglobaluserdata.getKeys();

			for (var i = 0; i < keysAr.length; i++) {

				out += "<userdata name='" + keysAr[i] + "'>"

						+ this.UserData.gridglobaluserdata.get(keysAr[i])

						+ "</userdata>"

			}

		}

		if (this._sConfig) {

			out += this._serialiseConfig()

		}

		out += this._serialise();

		out += "</rows>";

		return out

	};

	this.getPosition = function(oNode, pNode) {

		if (!pNode) {

			var pos = dhx4.getOffset(oNode);

			return [ pos.left, pos.top ]

		}

		pNode = pNode || document.body;

		var oCurrentNode = oNode;

		var iLeft = 0;

		var iTop = 0;

		while ((oCurrentNode) && (oCurrentNode != pNode)) {

			iLeft += oCurrentNode.offsetLeft - oCurrentNode.scrollLeft;

			iTop += oCurrentNode.offsetTop - oCurrentNode.scrollTop;

			oCurrentNode = oCurrentNode.offsetParent

		}

		if (pNode == document.body) {

			if (_isIE) {

				iTop += document.body.offsetTop

						|| document.documentElement.offsetTop;

				iLeft += document.body.offsetLeft

						|| document.documentElement.offsetLeft

			} else {

				if (!_isFF) {

					iLeft += document.body.offsetLeft;

					iTop += document.body.offsetTop

				}

			}

		}

		return [ iLeft, iTop ]

	};

	this.getFirstParentOfType = function(obj, tag) {

		while (obj && obj.tagName != tag && obj.tagName != "BODY") {

			obj = obj.parentNode

		}

		return obj

	};

	this.objBox.onscroll = function() {

		this.grid._doOnScroll()

	};

	this.hdrBox.onscroll = function() {

		if (this._try_header_sync) {

			return

		}

		this._try_header_sync = true;

		if (Math.abs(this.grid.objBox.scrollLeft - this.scrollLeft) > 1) {

			this.grid.objBox.scrollLeft = this.scrollLeft

		}

		this._try_header_sync = false

	};

	if ((!_isOpera) || (_OperaRv > 8.5)) {

		this.hdr.onmousemove = function(e) {

			this.grid.changeCursorState(e || window.event)

		};

		this.hdr.onmousedown = function(e) {

			return this.grid.startColResize(e || window.event)

		}

	}

	this.obj.onmousemove = this._drawTooltip;

	this.objBox.onclick = function(e) {

		e = e || event;

		e.cancelBubble = true;

		this.firstChild.grid.setActive(true);

		window.dhx4.callEvent("_onGridClick", [ e, this.firstChild.grid ])

	};

	this.obj.onclick = function(e) {

		if (this.grid._doClick(e || window.event) !== false) {

			if (this.grid._sclE) {

				this.grid.editCell(e || window.event)

			} else {

				this.grid.editStop()

			}

		}

		e = e || event;

		e.cancelBubble = true;

		window.dhx4.callEvent("_onGridClick", [ e, this.grid ])

	};

	if (_isMacOS) {

		this.entBox.oncontextmenu = function(e) {

			e.cancelBubble = true;

			if (e.preventDefault) {

				e.preventDefault()

			} else {

				e.returnValue = false

			}

			var that = this.grid;

			if (that._realfake) {

				that = that._fake

			}

			return that._doContClick(e || window.event)

		}

	} else {

		this.entBox.onmousedown = function(e) {

			return this.grid._doContClick(e || window.event)

		};

		this.entBox.oncontextmenu = function(e) {

			if (this.grid._ctmndx) {

				(e || event).cancelBubble = true

			}

			return !this.grid._ctmndx

		}

	}

	this.obj.ondblclick = function(e) {

		if (!this.grid.wasDblClicked(e || window.event)) {

			return false

		}

		if (this.grid._dclE) {

			var row = this.grid.getFirstParentOfType((_isIE ? event.srcElement

					: e.target), "TR");

			if (row == this.grid.row) {

				this.grid.editCell(e || window.event)

			}

		}

		(e || event).cancelBubble = true;

		if (_isOpera) {

			return false

		}

	};

	this.hdr.onclick = this._onHeaderClick;

	this.sortImg.onclick = function() {

		self._onHeaderClick.apply({

			grid : self

		}, [ null, self.r_fldSorted ])

	};

	this.hdr.ondblclick = this._onHeaderDblClick;

	if (!document.body._dhtmlxgrid_onkeydown) {

		dhtmlxEvent(document, "keydown", function(e) {

			if (globalActiveDHTMLGridObject) {

				return globalActiveDHTMLGridObject.doKey(e || window.event)

			}

		});

		document.body._dhtmlxgrid_onkeydown = true

	}

	dhtmlxEvent(document.body, "click", function() {

		if (self.editStop) {

			self.editStop()

		}

		if (self.isActive) {

			self.setActive(false)

		}

	});

	if (this.entBox.style.height.toString().indexOf("%") != -1) {

		this._delta_y = this.entBox.style.height

	}

	if (this.entBox.style.width.toString().indexOf("%") != -1) {

		this._delta_x = this.entBox.style.width

	}

	if (this._delta_x || this._delta_y) {

		this._setAutoResize()

	}

	this.setColHidden = this.setColumnsVisibility;

	this.enableCollSpan = this.enableColSpan;

	this.setMultiselect = this.enableMultiselect;

	this.setMultiLine = this.enableMultiline;

	this.deleteSelectedItem = this.deleteSelectedRows;

	this.getSelectedId = this.getSelectedRowId;

	this.getHeaderCol = this.getColumnLabel;

	this.isItemExists = this.doesRowExist;

	this.getColumnCount = this.getColumnsNum;

	this.setSelectedRow = this.selectRowById;

	this.setHeaderCol = this.setColumnLabel;

	this.preventIECashing = this.preventIECaching;

	this.enableAutoHeigth = this.enableAutoHeight;

	this.getUID = this.uid;

	if (dhtmlx.image_path) {

		this.setImagePath(dhtmlx.image_path)

	}

	if (dhtmlx.skin) {

		this.setSkin(dhtmlx.skin)

	}

	return this

}

dhtmlXGridObject.prototype = {

	getRowAttribute : function(b, a) {

		return this.getRowById(b)._attrs[a]

	},

	setRowAttribute : function(c, a, b) {

		this.getRowById(c)._attrs[a] = b

	},

	isTreeGrid : function() {

		return (this.cellType._dhx_find("tree") != -1)

	},

	setRowHidden : function(h, c) {

		var b = dhx4.s2b(c);

		var g = this.getRowById(h);

		if (!g) {

			return

		}

		if (g.expand === "") {

			this.collapseKids(g)

		}

		if ((c) && (g.style.display != "none")) {

			g.style.display = "none";

			var e = this.selectedRows._dhx_find(g);

			if (e != -1) {

				g.className = g.className.replace("rowselected", "");

				for (var a = 0; a < g.childNodes.length; a++) {

					g.childNodes[a].className = g.childNodes[a].className

							.replace(/cellselected/g, "")

				}

				this.selectedRows._dhx_removeAt(e)

			}

			this.callEvent("onGridReconstructed", [])

		}

		if ((!c) && (g.style.display == "none")) {

			g.style.display = "";

			this.callEvent("onGridReconstructed", [])

		}

		this.callEvent("onRowHide", [ h, c ]);

		this.setSizes()

	},

	setColumnHidden : function(c, b) {

		if (!this.hdr.rows.length) {

			if (!this._ivizcol) {

				this._ivizcol = []

			}

			return this._ivizcol[c] = b

		}

		if ((this.fldSorted) && (this.fldSorted.cellIndex == c) && (b)) {

			this.sortImg.style.display = "none"

		}

		var a = dhx4.s2b(b);

		if (a) {

			if (!this._hrrar) {

				this._hrrar = new Array()

			} else {

				if (this._hrrar[c]) {

					return

				}

			}

			this._hrrar[c] = "display:none;";

			this._hideShowColumn(c, "none")

		} else {

			if ((!this._hrrar) || (!this._hrrar[c])) {

				return

			}

			this._hrrar[c] = "";

			this._hideShowColumn(c, "")

		}

		if ((this.fldSorted) && (this.fldSorted.cellIndex == c) && (!b)) {

			this.sortImg.style.display = "inline"

		}

		this.setSortImgPos();

		this.callEvent("onColumnHidden", [ c, b ])

	},

	isColumnHidden : function(a) {

		if ((this._hrrar) && (this._hrrar[a])) {

			return true

		}

		return false

	},

	setColumnsVisibility : function(b) {

		if (b) {

			this._ivizcol = b.split(this.delim)

		}

		if (this.hdr.rows.length && this._ivizcol) {

			for (var a = 0; a < this._ivizcol.length; a++) {

				this.setColumnHidden(a, this._ivizcol[a])

			}

		}

	},

	_fixHiddenRowsAll : function(m, c, a, b, h) {

		h = h || "_cellIndex";

		var l = m.rows.length;

		for (var g = 0; g < l; g++) {

			var n = m.rows[g].childNodes;

			if (n.length != this._cCount) {

				for (var e = 0; e < n.length; e++) {

					if (n[e][h] == c) {

						n[e].style[a] = b;

						break

					}

				}

			} else {

				n[c].style[a] = b

			}

		}

	},

	_hideShowColumn : function(g, e) {

		var a = g;

		if (this.hdr.rows[1] && (this.hdr.rows[1]._childIndexes)

				&& (this.hdr.rows[1]._childIndexes[g] != g)) {

			a = this.hdr.rows[1]._childIndexes[g]

		}

		if (e == "none") {

			this.hdr.rows[0].cells[g]._oldWidth = this.hdr.rows[0].cells[g].style.width

					|| (this.initCellWidth[g] + "px");

			this.hdr.rows[0].cells[g]._oldWidthP = this.cellWidthPC[g];

			this.obj.rows[0].cells[g].style.width = "0px";

			var b = {

				rows : [ this.obj.rows[0] ]

			};

			this.forEachRow(function(h) {

				if (this.rowsAr[h].tagName == "TR") {

					b.rows.push(this.rowsAr[h])

				}

			});

			this._fixHiddenRowsAll(b, g, "display", "none");

			if (this.isTreeGrid()) {

				this._fixHiddenRowsAllTG(g, "none")

			}

			if ((_isOpera && _OperaRv < 9) || _isKHTML || (_isFF)) {

				this._fixHiddenRowsAll(this.hdr, g, "display", "none",

						"_cellIndexS")

			}

			if (this.ftr) {

				this._fixHiddenRowsAll(this.ftr.childNodes[0], g, "display",

						"none")

			}

			this._fixHiddenRowsAll(this.hdr, g, "whiteSpace", "nowrap",

					"_cellIndexS");

			if (!this.cellWidthPX.length && !this.cellWidthPC.length) {

				this.cellWidthPX = [].concat(this.initCellWidth)

			}

			if (this.cellWidthPX[g]) {

				this.cellWidthPX[g] = 0

			}

			if (this.cellWidthPC[g]) {

				this.cellWidthPC[g] = 0

			}

		} else {

			if (this.hdr.rows[0].cells[g]._oldWidth) {

				var c = this.hdr.rows[0].cells[g];

				if (_isOpera || _isKHTML || (_isFF)) {

					this._fixHiddenRowsAll(this.hdr, g, "display", "",

							"_cellIndexS")

				}

				if (this.ftr) {

					this._fixHiddenRowsAll(this.ftr.childNodes[0], g,

							"display", "")

				}

				var b = {

					rows : [ this.obj.rows[0] ]

				};

				this.forEachRow(function(h) {

					if (this.rowsAr[h].tagName == "TR") {

						b.rows.push(this.rowsAr[h])

					}

				});

				this._fixHiddenRowsAll(b, g, "display", "");

				if (this.isTreeGrid()) {

					this._fixHiddenRowsAllTG(g, "")

				}

				this._fixHiddenRowsAll(this.hdr, g, "whiteSpace", "normal",

						"_cellIndexS");

				if (c._oldWidthP) {

					this.cellWidthPC[g] = c._oldWidthP

				}

				if (c._oldWidth) {

					this.cellWidthPX[g] = parseInt(c._oldWidth)

				}

			}

		}

		if (!e && this._realfake) {

			this.setColumnSizes(this.entBox.clientWidth)

		}

		this.setSizes();

		if ((!_isIE) && (!_isFF)) {

			this.obj.border = 1;

			this.obj.border = 0

		}

	},

	enableColSpan : function(a) {

		this._ecspn = dhx4.s2b(a)

	},

	enableRowsHover : function(b, a) {

		this._unsetRowHover(false, true);

		this._hvrCss = a;

		if (dhx4.s2b(b)) {

			if (!this._elmnh) {

				this.obj._honmousemove = this.obj.onmousemove;

				this.obj.onmousemove = this._setRowHover;

				if (_isIE) {

					this.obj.onmouseleave = this._unsetRowHover

				} else {

					this.obj.onmouseout = this._unsetRowHover

				}

				this._elmnh = true

			}

		} else {

			if (this._elmnh) {

				this.obj.onmousemove = this.obj._honmousemove;

				if (_isIE) {

					this.obj.onmouseleave = null

				} else {

					this.obj.onmouseout = null

				}

				this._elmnh = false

			}

		}

	},

	enableEditEvents : function(b, c, a) {

		this._sclE = dhx4.s2b(b);

		this._dclE = dhx4.s2b(c);

		this._f2kE = dhx4.s2b(a)

	},

	enableLightMouseNavigation : function(a) {

		if (dhx4.s2b(a)) {

			if (!this._elmn) {

				this.entBox._onclick = this.entBox.onclick;

				this.entBox.onclick = function() {

					return true

				};

				this.obj._onclick = this.obj.onclick;

				this.obj.onclick = function(b) {

					var g = this.grid.getFirstParentOfType(b ? b.target

							: event.srcElement, "TD");

					if (!g) {

						return

					}

					this.grid.editStop();

					this.grid.doClick(g);

					this.grid.editCell();

					(b || event).cancelBubble = true

				};

				this.obj._onmousemove = this.obj.onmousemove;

				this.obj.onmousemove = this._autoMoveSelect;

				this._elmn = true

			}

		} else {

			if (this._elmn) {

				this.entBox.onclick = this.entBox._onclick;

				this.obj.onclick = this.obj._onclick;

				this.obj.onmousemove = this.obj._onmousemove;

				this._elmn = false

			}

		}

	},

	_unsetRowHover : function(b, g) {

		if (g) {

			that = this

		} else {

			that = this.grid

		}

		if ((that._lahRw) && (that._lahRw != g)) {

			for (var a = 0; a < that._lahRw.childNodes.length; a++) {

				that._lahRw.childNodes[a].className = that._lahRw.childNodes[a].className

						.replace(that._hvrCss, "")

			}

			that._lahRw = null

		}

	},

	_setRowHover : function(b) {

		var g = this.grid.getFirstParentOfType(b ? b.target : event.srcElement,

				"TD");

		if (g && g.parentNode != this.grid._lahRw) {

			this.grid._unsetRowHover(0, g);

			g = g.parentNode;

			if (!g.idd || g.idd == "__filler__") {

				return

			}

			for (var a = 0; a < g.childNodes.length; a++) {

				g.childNodes[a].className += " " + this.grid._hvrCss

			}

			this.grid._lahRw = g

		}

		this._honmousemove(b)

	},

	_autoMoveSelect : function(a) {

		if (!this.grid.editor) {

			var b = this.grid.getFirstParentOfType(a ? a.target

					: event.srcElement, "TD");

			if (b.parentNode.idd) {

				this.grid.doClick(b, true, 0)

			}

		}

		this._onmousemove(a)

	},

	enableDistributedParsing : function(c, a, b) {

		if (dhx4.s2b(c)) {

			this._ads_count = a || 10;

			this._ads_time = b || 250

		} else {

			this._ads_count = 0

		}

	},

	destructor : function() {

		this.editStop(true);

		if (this._sizeTime) {

			this._sizeTime = window.clearTimeout(this._sizeTime)

		}

		this.entBox.className = (this.entBox.className || "").replace(

				/gridbox.*/, "");

		if (this.formInputs) {

			for (var c = 0; c < this.formInputs.length; c++) {

				this.parentForm.removeChild(this.formInputs[c])

			}

		}

		var b;

		for (var c = 0; c < this.rowsCol.length; c++) {

			if (this.rowsCol[c]) {

				this.rowsCol[c].grid = null

			}

		}

		for (c in this.rowsAr) {

			if (this.rowsAr[c]) {

				this.rowsAr[c] = null

			}

		}

		this.rowsCol = new dhtmlxArray();

		this.rowsAr = {};

		this.entBox.innerHTML = "";

		var e = function() {

		};

		this.entBox.onclick = this.entBox.onmousedown = this.entBox.onbeforeactivate = this.entBox.onbeforedeactivate = this.entBox.onbeforedeactivate = this.entBox.onselectstart = e;

		this.setSizes = this._update_srnd_view = this.callEvent = e;

		this.entBox.grid = this.objBox.grid = this.hdrBox.grid = this.obj.grid = this.hdr.grid = null;

		if (this._fake) {

			this.globalBox.innerHTML = "";

			this._fake.setSizes = this._fake._update_srnd_view = this._fake.callEvent = e;

			this.globalBox.onclick = this.globalBox.onmousedown = this.globalBox.onbeforeactivate = this.globalBox.onbeforedeactivate = this.globalBox.onbeforedeactivate = this.globalBox.onselectstart = e

		}

		for (b in this) {

			if ((this[b]) && (this[b].m_obj)) {

				this[b].m_obj = null

			}

			this[b] = null

		}

		if (this == globalActiveDHTMLGridObject) {

			globalActiveDHTMLGridObject = null

		}

		return null

	},

	getSortingState : function() {

		var a = new Array();

		if (this.fldSorted) {

			a[0] = this.fldSorted._cellIndex;

			a[1] = (this.sortImg.className == "dhxgrid_sort_desc" ? "des"

					: "asc")

		}

		return a

	},

	enableAutoHeight : function(c, b, a) {

		this._ahgr = dhx4.s2b(c);

		this._ahgrF = dhx4.s2b(a);

		this._ahgrM = b || null;

		if (arguments.length == 1) {

			this.objBox.style.overflowY = c ? "hidden" : "auto"

		}

		if (b == "auto") {

			this._ahgrM = null;

			this._ahgrMA = true;

			this._setAutoResize()

		}

	},

	enableStableSorting : function(a) {

		this._sst = dhx4.s2b(a);

		this.rowsCol.stablesort = function(h) {

			var g = this.length - 1;

			for (var e = 0; e < this.length - 1; e++) {

				for (var c = 0; c < g; c++) {

					if (h(this[c], this[c + 1]) > 0) {

						var b = this[c];

						this[c] = this[c + 1];

						this[c + 1] = b

					}

				}

				g--

			}

		}

	},

	enableKeyboardSupport : function(a) {

		this._htkebl = !dhx4.s2b(a)

	},

	enableContextMenu : function(a) {

		this._ctmndx = a

	},

	setScrollbarWidthCorrection : function(a) {

	},

	enableTooltips : function(b) {

		this._enbTts = b.split(",");

		for (var a = 0; a < this._enbTts.length; a++) {

			this._enbTts[a] = dhx4.s2b(this._enbTts[a])

		}

	},

	enableResizing : function(b) {

		this._drsclmn = b.split(",");

		for (var a = 0; a < this._drsclmn.length; a++) {

			this._drsclmn[a] = dhx4.s2b(this._drsclmn[a])

		}

	},

	setColumnMinWidth : function(a, b) {

		if (arguments.length == 2) {

			if (!this._drsclmW) {

				this._drsclmW = new Array()

			}

			this._drsclmW[b] = a

		} else {

			this._drsclmW = a.split(",")

		}

	},

	enableCellIds : function(a) {

		this._enbCid = dhx4.s2b(a)

	},

	lockRow : function(a, c) {

		var b = this.getRowById(a);

		if (b) {

			b._locked = dhx4.s2b(c);

			if ((this.cell) && (this.cell.parentNode.idd == a)) {

				this.editStop()

			}

		}

	},

	_getRowArray : function(g) {

		var e = new Array();

		for (var c = 0; c < g.childNodes.length; c++) {

			var b = this.cells3(g, c);

			e[c] = b.getValue()

		}

		return e

	},

	setDateFormat : function(b, a) {

		this._dtmask = b;

		this._dtmask_inc = a

	},

	setNumberFormat : function(l, c, g, j) {

		var e = l.replace(/[^0\,\.]*/g, "");

		var a = e.indexOf(".");

		if (a > -1) {

			a = e.length - a - 1

		}

		var b = e.indexOf(",");

		if (b > -1) {

			b = e.length - a - 2 - b

		}

		if (typeof g != "string") {

			g = this.i18n.decimal_separator

		}

		if (typeof j != "string") {

			j = this.i18n.group_separator

		}

		var m = l.split(e)[0];

		var h = l.split(e)[1];

		this._maskArr[c] = [ a, b, m, h, g, j ]

	},

	_aplNFb : function(g, e) {

		var b = this._maskArr[e];

		if (!b) {

			return g

		}

		var c = parseFloat(g.toString().replace(/[^0-9]*/g, ""));

		if (g.toString().substr(0, 1) == "-") {

			c = c * -1

		}

		if (b[0] > 0) {

			c = c / Math.pow(10, b[0])

		}

		return c

	},

	_aplNF : function(h, g) {

		var b = this._maskArr[g];

		if (!b) {

			return h

		}

		var l = (parseFloat(h) < 0 ? "-" : "") + b[2];

		h = Math.abs(

				Math.round(parseFloat(h) * Math.pow(10, b[0] > 0 ? b[0] : 0)))

				.toString();

		h = (h.length < b[0] ? Math.pow(10, b[0] + 1 - h.length).toString()

				.substr(1, b[0] + 1)

				+ h.toString() : h).split("").reverse();

		h[b[0]] = (h[b[0]] || "0") + b[4];

		if (b[1] > 0) {

			for (var e = (b[0] > 0 ? 0 : 1) + b[0] + b[1]; e < h.length; e += b[1]) {

				h[e] += b[5]

			}

		}

		return l + h.reverse().join("") + b[3]

	},

	_launchCommands : function(a) {

		for (var e = 0; e < a.length; e++) {

			var c = new Array();

			for (var b = 0; b < a[e].childNodes.length; b++) {

				if (a[e].childNodes[b].nodeType == 1) {

					c[c.length] = a[e].childNodes[b].firstChild.data

				}

			}

			this[a[e].getAttribute("command")].apply(this, c)

		}

	},

	_parseHead : function(g) {

		var e = dhx4.ajax.xpath("./head", g);

		if (e.length) {

			var h = dhx4.ajax.xpath("./column", e[0]);

			var l = dhx4.ajax.xpath("./settings", e[0]);

			var x = "setInitWidths";

			var t = false;

			if (l[0]) {

				for (var m = 0; m < l[0].childNodes.length; m++) {

					switch (l[0].childNodes[m].tagName) {

					case "colwidth":

						if (l[0].childNodes[m].firstChild

								&& l[0].childNodes[m].firstChild.data == "%") {

							x = "setInitWidthsP"

						}

						break;

					case "splitat":

						t = (l[0].childNodes[m].firstChild ? l[0].childNodes[m].firstChild.data

								: false);

						break

					}

				}

			}

			this._launchCommands(dhx4.ajax.xpath("./beforeInit/call", e[0]));

			if (h.length > 0) {

				if (this.hdr.rows.length > 0) {

					this.clearAll(true)

				}

				var a = [ [], [], [], [], [], [], [], [], [] ];

				var r = [ "", "width", "type", "align", "sort", "color",

						"format", "hidden", "id" ];

				var q = [ "", x, "setColTypes", "setColAlign", "setColSorting",

						"setColumnColor", "", "", "setColumnIds" ];

				for (var w = 0; w < h.length; w++) {

					for (var v = 1; v < r.length; v++) {

						a[v].push(h[w].getAttribute(r[v]))

					}

					a[0].push((h[w].firstChild ? h[w].firstChild.data : "")

							.replace(/^\s*((\s\S)*.+)\s*$/gi, "$1"))

				}

				this.setHeader(a[0]);

				for (var w = 0; w < q.length; w++) {

					if (q[w]) {

						this[q[w]](a[w].join(this.delim))

					}

				}

				for (var w = 0; w < h.length; w++) {

					if ((this.cellType[w].indexOf("co") == 0)

							|| (this.cellType[w] == "clist")) {

						var n = dhx4.ajax.xpath("./option", h[w]);

						if (n.length) {

							var u = new Array();

							if (this.cellType[w] == "clist") {

								for (var v = 0; v < n.length; v++) {

									u[u.length] = n[v].firstChild ? n[v].firstChild.data

											: ""

								}

								this.registerCList(w, u)

							} else {

								var y = this.getCombo(w);

								for (var v = 0; v < n.length; v++) {

									y

											.put(

													n[v].getAttribute("value"),

													n[v].firstChild ? n[v].firstChild.data

															: "")

								}

							}

						}

					} else {

						if (a[6][w]) {

							if ((this.cellType[w].toLowerCase().indexOf(

									"calendar") != -1)

									|| (this.fldSort[w] == "date")) {

								this.setDateFormat(a[6][w])

							} else {

								this.setNumberFormat(a[6][w], w)

							}

						}

					}

				}

				this.init();

				var c = a[7].join(this.delim);

				if (this.setColHidden && c.replace(/,/g, "") != "") {

					this.setColHidden(c)

				}

				if ((t) && (this.splitAt)) {

					this.splitAt(t)

				}

			}

			this._launchCommands(dhx4.ajax.xpath("./afterInit/call", e[0]))

		}

		var b = dhx4.ajax.xpath("//rows/userdata", g);

		if (b.length > 0) {

			if (!this.UserData.gridglobaluserdata) {

				this.UserData.gridglobaluserdata = new Hashtable()

			}

			for (var v = 0; v < b.length; v++) {

				var z = "";

				for (var o = 0; o < b[v].childNodes.length; o++) {

					z += b[v].childNodes[o].nodeValue

				}

				this.UserData.gridglobaluserdata.put(b[v].getAttribute("name"),

						z)

			}

		}

	},

	getCheckedRows : function(a) {

		var b = new Array();

		this.forEachRowA(function(e) {

			var c = this.cells(e, a);

			if (c.changeState && c.getValue() != 0) {

				b.push(e)

			}

		}, true);

		return b.join(",")

	},

	checkAll : function() {

		var b = arguments.length ? arguments[0] : 1;

		for (var a = 0; a < this.getColumnsNum(); a++) {

			if (this.getColType(a) == "ch") {

				this.setCheckedRows(a, b)

			}

		}

	},

	uncheckAll : function() {

		this.checkAll(0)

	},

	setCheckedRows : function(b, a) {

		this.forEachRowA(function(c) {

			if (this.cells(c, b).isCheckbox()) {

				this.cells(c, b).setValue(a)

			}

		})

	},

	_drawTooltip : function(h) {

		var j = this.grid.getFirstParentOfType(h ? h.target : event.srcElement,

				"TD");

		if (!j || ((this.grid.editor) && (this.grid.editor.cell == j))) {

			return true

		}

		var g = j.parentNode;

		if (!g.idd || g.idd == "__filler__") {

			return

		}

		var b = (h ? h.target : event.srcElement);

		if (g.idd == window.unknown) {

			return true

		}

		if (!this.grid.callEvent("onMouseOver", [ g.idd, j._cellIndex,

				(h || window.event) ])) {

			return true

		}

		if ((this.grid._enbTts) && (!this.grid._enbTts[j._cellIndex])) {

			if (b.title) {

				b.title = ""

			}

			return true

		}

		if (j._cellIndex >= this.grid._cCount) {

			return

		}

		var a = this.grid.cells3(g, j._cellIndex);

		if (!a || !a.cell || !a.cell._attrs) {

			return

		}

		if (b._title) {

			a.cell.title = ""

		}

		if (!a.cell._attrs.title) {

			b._title = true

		}

		if (a) {

			b.title = a.cell._attrs.title

					|| (a.getTitle ? a.getTitle() : (a.getValue() || "")

							.toString().replace(/<[^>]*>/gi, ""))

		}

		return true

	},

	enableCellWidthCorrection : function(a) {

		if (_isFF) {

			this._wcorr = parseInt(a)

		}

	},

	getAllRowIds : function(c) {

		var a = [];

		for (var b = 0; b < this.rowsBuffer.length; b++) {

			if (this.rowsBuffer[b]) {

				a.push(this.rowsBuffer[b].idd)

			}

		}

		return a.join(c || this.delim)

	},

	getAllItemIds : function() {

		return this.getAllRowIds()

	},

	setColspan : function(b, u, e) {

		if (!this._ecspn) {

			return

		}

		var a = this.getRowById(b);

		if ((a._childIndexes) && (a.childNodes[a._childIndexes[u]])) {

			var l = a._childIndexes[u];

			var g = a.childNodes[l];

			var h = g.colSpan;

			g.colSpan = 1;

			if ((h) && (h != 1)) {

				for (var q = 1; q < h; q++) {

					var t = document.createElement("TD");

					if (g.nextSibling) {

						a.insertBefore(t, g.nextSibling)

					} else {

						a.appendChild(t)

					}

					a._childIndexes[u + q] = l + q;

					t._cellIndex = u + q;

					t.style.textAlign = this.cellAlign[q];

					t.style.verticalAlign = this.cellVAlign[q];

					g = t;

					this.cells3(a, u + q).setValue("")

				}

			}

			for (var s = u * 1 + 1 * h; s < a._childIndexes.length; s++) {

				a._childIndexes[s] += (h - 1) * 1

			}

		}

		if ((e) && (e > 1)) {

			if (a._childIndexes) {

				var l = a._childIndexes[u]

			} else {

				var l = u;

				a._childIndexes = new Array();

				for (var s = 0; s < a.childNodes.length; s++) {

					a._childIndexes[s] = s

				}

			}

			a.childNodes[l].colSpan = e;

			for (var s = 1; s < e; s++) {

				a._childIndexes[a.childNodes[l + 1]._cellIndex] = l;

				a.removeChild(a.childNodes[l + 1])

			}

			var o = a.childNodes[a._childIndexes[u]]._cellIndex;

			for (var s = o * 1 + 1 * e; s < a._childIndexes.length; s++) {

				a._childIndexes[s] -= (e - 1)

			}

		}

	},

	preventIECaching : function(a) {

		dhx4.ajax.cache = !a

	},

	enableColumnAutoSize : function(a) {

		this._eCAS = dhx4.s2b(a)

	},

	_onHeaderDblClick : function(c) {

		var b = this.grid;

		var a = b.getFirstParentOfType(_isIE ? event.srcElement : c.target,

				"TD");

		if (!b._eCAS) {

			return false

		}

		b.adjustColumnSize(a._cellIndexS)

	},

	adjustColumnSize : function(o, c) {

		if (this._hrrar && this._hrrar[o]) {

			return

		}

		this._notresize = true;

		var e = 0;

		this._setColumnSizeR(o, 20);

		for (var h = 1; h < this.hdr.rows.length; h++) {

			var s = this.hdr.rows[h];

			s = s.childNodes[(s._childIndexes) ? s._childIndexes[o] : o];

			if ((s) && ((!s.colSpan) || (s.colSpan < 2)) && s._cellIndex == o) {

				if ((s.childNodes[0])

						&& (s.childNodes[0].className == "hdrcell")) {

					s = s.childNodes[0]

				}

				e = Math.max(e, s.scrollWidth)

			}

		}

		var g = this.obj.rows.length;

		var r = 0;

		var u = this.cellType._dhx_find("tree");

		var q = document.createElement("DIV");

		q.className = "dhx_grid_adjust";

		q.style.cssText = "width:auto;height:auto;visibility:hidden; position:absolute; top:0px; left:0px; overflow:hidden; white-space:nowrap;";

		document.body.appendChild(q);

		for (var n = 1; n < g; n++) {

			var t = this.obj.rows[n];

			var b = o;

			if (!this.rowsAr[t.idd]) {

				continue

			}

			if (t._childIndexes) {

				if (t._childIndexes[o] == t._childIndexes[o + 1]) {

					continue

				}

				b = t._childIndexes[o]

			}

			if (!t.childNodes[b] || t.childNodes[b]._cellIndex != o) {

				continue

			}

			q.innerHTML = (t.childNodes[b].innerText

					|| t.childNodes[b].textContent || "");

			r = q.offsetWidth;

			if (this._h2 && o == u) {

				r += this._h2.get[t.idd].level * 22

			}

			if (r > e) {

				e = r

			}

		}

		document.body.removeChild(q);

		e += 20 + (c || 0);

		this._setColumnSizeR(o, e);

		this._notresize = false;

		this.setSizes()

	},

	detachHeader : function(a, c) {

		c = c || this.hdr;

		var b = c.rows[a + 1];

		if (b) {

			b.parentNode.removeChild(b)

		}

		this.setSizes()

	},

	detachFooter : function(a) {

		this.detachHeader(a, this.ftr)

	},

	attachHeader : function(a, e, b) {

		if (typeof (a) == "string") {

			a = this._eSplit(a)

		}

		if (typeof (e) == "string") {

			e = e.split(this.delim)

		}

		b = b || "_aHead";

		if (this.hdr.rows.length) {

			if (a) {

				this._createHRow([ a, e ],

						this[(b == "_aHead") ? "hdr" : "ftr"])

			} else {

				if (this[b]) {

					for (var c = 0; c < this[b].length; c++) {

						this.attachHeader.apply(this, this[b][c])

					}

				}

			}

		} else {

			if (!this[b]) {

				this[b] = new Array()

			}

			this[b][this[b].length] = [ a, e, b ]

		}

	},

	_createHRow : function(c, o) {

		if (!o) {

			if (this.entBox.style.position != "absolute") {

				this.entBox.style.position = "relative"

			}

			var l = document.createElement("DIV");

			l.className = "c_ftr".substr(2);

			this.entBox.appendChild(l);

			var s = document.createElement("TABLE");

			s.cellPadding = s.cellSpacing = 0;

			if (!_isIE || _isIE == 8) {

				s.width = "100%";

				s.style.paddingRight = "20px"

			}

			s.style.marginRight = "20px";

			s.style.tableLayout = "fixed";

			l.appendChild(s);

			s.appendChild(document.createElement("TBODY"));

			this.ftr = o = s;

			var h = s.insertRow(0);

			var a = ((this.hdrLabels.length <= 1) ? c[0].length

					: this.hdrLabels.length);

			for (var e = 0; e < a; e++) {

				h.appendChild(document.createElement("TH"));

				h.childNodes[e]._cellIndex = e

			}

			if (_isIE && _isIE < 8) {

				h.style.position = "absolute"

			} else {

				h.style.height = "auto"

			}

		}

		var g = c[1];

		var l = document.createElement("TR");

		o.rows[0].parentNode.appendChild(l);

		for (var e = 0; e < c[0].length; e++) {

			if (c[0][e] == "#cspan") {

				var m = l.cells[l.cells.length - 1];

				m.colSpan = (m.colSpan || 1) + 1;

				continue

			}

			if ((c[0][e] == "#rspan") && (o.rows.length > 1)) {

				var v = o.rows.length - 2;

				var u = false;

				var m = null;

				while (!u) {

					var m = o.rows[v];

					for (var b = 0; b < m.cells.length; b++) {

						if (m.cells[b]._cellIndex == e) {

							u = b + 1;

							break

						}

					}

					v--

				}

				m = m.cells[u - 1];

				m.rowSpan = (m.rowSpan || 1) + 1;

				continue

			}

			var n = document.createElement("TD");

			n._cellIndex = n._cellIndexS = e;

			if (this._hrrar && this._hrrar[e] && !_isIE) {

				n.style.display = "none"

			}

			if (typeof c[0][e] == "object") {

				n.appendChild(c[0][e])

			} else {

				if (this.forceDivInHeader) {

					n.innerHTML = "<div class='hdrcell'>"

							+ (c[0][e] || "&nbsp;") + "</div>"

				} else {

					n.innerHTML = (c[0][e] || "&nbsp;")

				}

				if ((c[0][e] || "").indexOf("#") != -1) {

					var s = c[0][e].match(/(^|{)#([^}]+)(}|$)/);

					if (s) {

						var q = "_in_header_" + s[2];

						if (this[q]) {

							this[q]((this.forceDivInHeader ? n.firstChild : n),

									e, c[0][e].split(s[0]))

						}

					}

				}

			}

			if (g) {

				n.style.cssText = g[e]

			}

			l.appendChild(n)

		}

		var r = o;

		if (_isKHTML) {

			if (o._kTimer) {

				window.clearTimeout(o._kTimer)

			}

			o._kTimer = window.setTimeout(function() {

				o.rows[1].style.display = "none";

				window.setTimeout(function() {

					o.rows[1].style.display = ""

				}, 1)

			}, 500)

		}

	},

	attachFooter : function(a, b) {

		this.attachHeader(a, b, "_aFoot")

	},

	setCellExcellType : function(c, a, b) {

		this.changeCellType(this.getRowById(c), a, b)

	},

	getCellExcellType : function(b, a) {

		var e = this.getRowById(b);

		var c = this.cells3(e, a);

		return c.cell._cellType || this.cellType[a]

	},

	changeCellType : function(c, e, b) {

		b = b || this.cellType[e];

		var g = this.cells3(c, e);

		var a = g.getValue();

		g.cell._cellType = b;

		var g = this.cells3(c, e);

		g.setValue(a)

	},

	setRowExcellType : function(c, b) {

		var e = this.rowsAr[c];

		for (var a = 0; a < e.childNodes.length; a++) {

			this.changeCellType(e, a, b)

		}

	},

	setColumnExcellType : function(a, c) {

		for (var b = 0; b < this.rowsBuffer.length; b++) {

			if (this.rowsBuffer[b] && this.rowsBuffer[b].tagName == "TR") {

				this.changeCellType(this.rowsBuffer[b], a, c)

			}

		}

		if (this.cellType[a] == "math") {

			this._strangeParams[b] = c

		} else {

			this.cellType[a] = c

		}

	},

	forEachRow : function(c) {

		for ( var b in this.rowsAr) {

			if (this.rowsAr[b] && this.rowsAr[b].idd) {

				c.apply(this, [ this.rowsAr[b].idd ])

			}

		}

	},

	forEachRowA : function(c) {

		for (var b = 0; b < this.rowsBuffer.length; b++) {

			if (this.rowsBuffer[b]) {

				c.call(this, this.render_row(b).idd)

			}

		}

	},

	forEachCell : function(c, b) {

		var e = this.getRowById(c);

		if (!e) {

			return

		}

		for (var a = 0; a < this._cCount; a++) {

			b(this.cells3(e, a), a)

		}

	},

	enableAutoWidth : function(c, a, b) {

		this._awdth = [ dhx4.s2b(c), parseInt(a || 99999), parseInt(b || 0) ];

		if (arguments.length == 1) {

			this.objBox.style.overflowX = c ? "hidden" : "auto"

		}

	},

	updateFromXML : function(a, e, b, c) {

		if (typeof e == "undefined") {

			e = true

		}

		this._refresh_mode = [ true, e, b ];

		this.load(a, c)

	},

	_refreshFromXML : function(e) {

		if (this._f_rowsBuffer) {

			this.filterBy(0, "")

		}

		reset = false;

		if (window.eXcell_tree) {

			eXcell_tree.prototype.setValueX = eXcell_tree.prototype.setValue;

			eXcell_tree.prototype.setValue = function(s) {

				var q = this.grid._h2.get[this.cell.parentNode.idd];

				if (q && this.cell.parentNode.valTag) {

					this.setLabel(s)

				} else {

					this.setValueX(s)

				}

			}

		}

		var o = this.cellType._dhx_find("tree");

		var h = dhx4.ajax.xmltop("rows", e);

		var g = h.getAttribute("parent") || 0;

		var l = {};

		if (this._refresh_mode[2]) {

			if (o != -1) {

				this._h2.forEachChild(g, function(q) {

					l[q.id] = true

				}, this)

			} else {

				this.forEachRow(function(q) {

					l[q] = true

				})

			}

		}

		var n = dhx4.ajax.xpath("//row", h);

		for (var c = 0; c < n.length; c++) {

			var m = n[c];

			var a = m.getAttribute("id");

			l[a] = false;

			var g = m.parentNode.getAttribute("id") || g;

			if (this.rowsAr[a] && this.rowsAr[a].tagName != "TR") {

				if (this._h2) {

					this._h2.get[a].buff.data = m

				} else {

					this.rowsBuffer[this.getRowIndex(a)].data = m

				}

				this.rowsAr[a] = m

			} else {

				if (this.rowsAr[a]) {

					this._process_xml_row(this.rowsAr[a], m, -1);

					this._postRowProcessing(this.rowsAr[a], true);

					if (this._fake && this._fake.rowsAr[a]) {

						this._fake

								._process_xml_row(this._fake.rowsAr[a], m, -1)

					}

				} else {

					if (this._refresh_mode[1]) {

						var j = {

							idd : a,

							data : m,

							_parser : this._process_xml_row,

							_locator : this._get_xml_data

						};

						var b = this.rowsBuffer.length;

						if (this._refresh_mode[1] == "top") {

							this.rowsBuffer.unshift(j);

							b = 0

						} else {

							this.rowsBuffer.push(j)

						}

						if (this._h2) {

							reset = true;

							(this._h2

									.add(

											a,

											(m.parentNode.getAttribute("id") || m.parentNode

													.getAttribute("parent")))).buff = this.rowsBuffer[this.rowsBuffer.length - 1]

						} else {

							if (this._srnd) {

								reset = true

							}

						}

						this.rowsAr[a] = m;

						m = this.render_row(b);

						this._insertRowAt(m, b ? -1 : 0)

					}

				}

			}

		}

		if (this._refresh_mode[2]) {

			for (a in l) {

				if (l[a] && this.rowsAr[a]) {

					this.deleteRow(a)

				}

			}

		}

		this._refresh_mode = null;

		if (window.eXcell_tree) {

			eXcell_tree.prototype.setValue = eXcell_tree.prototype.setValueX

		}

		if (reset) {

			if (this._h2) {

				this._renderSort()

			} else {

				this.render_dataset()

			}

		}

		if (this._f_rowsBuffer) {

			this._f_rowsBuffer = null;

			this.filterByAll()

		}

	},

	getCustomCombo : function(c, b) {

		var a = this.cells(c, b).cell;

		if (!a._combo) {

			a._combo = new dhtmlXGridComboObject()

		}

		return a._combo

	},

	setTabOrder : function(b) {

		var e = b.split(this.delim);

		this._tabOrder = [];

		var a = this._cCount || b.length;

		for (var c = 0; c < a; c++) {

			e[c] = {

				c : parseInt(e[c]),

				ind : c

			}

		}

		e.sort(function(h, g) {

			return (h.c > g.c ? 1 : -1)

		});

		for (var c = 0; c < a; c++) {

			if (!e[c + 1] || (typeof e[c].c == "undefined")) {

				this._tabOrder[e[c].ind] = (e[0].ind + 1) * -1

			} else {

				this._tabOrder[e[c].ind] = e[c + 1].ind

			}

		}

	},

	i18n : {

		loading : "Loading",

		decimal_separator : ".",

		group_separator : ","

	},

	_key_events : {

		k13_1_0 : function() {

			var a = this.rowsCol._dhx_find(this.row);

			this.selectCell(this.rowsCol[a + 1], this.cell._cellIndex, true)

		},

		k13_0_1 : function() {

			var a = this.rowsCol._dhx_find(this.row);

			this.selectCell(this.rowsCol[a - 1], this.cell._cellIndex, true)

		},

		k13_0_0 : function() {

			this.editStop();

			this.callEvent("onEnter", [ (this.row ? this.row.idd : null),

					(this.cell ? this.cell._cellIndex : null) ]);

			this._still_active = true

		},

		k9_0_0 : function() {

			this.editStop();

			if (!this.callEvent("onTab", [ true ])) {

				return true

			}

			var a = this._getNextCell(null, 1);

			if (a) {

				this.selectCell(a.parentNode, a._cellIndex,

						(this.row != a.parentNode), false, true);

				this._still_active = true

			}

		},

		k9_0_1 : function() {

			this.editStop();

			if (!this.callEvent("onTab", [ false ])) {

				return false

			}

			var a = this._getNextCell(null, -1);

			if (a) {

				this.selectCell(a.parentNode, a._cellIndex,

						(this.row != a.parentNode), false, true);

				this._still_active = true

			}

		},

		k113_0_0 : function() {

			if (this._f2kE) {

				this.editCell()

			}

		},

		k32_0_0 : function() {

			var a = this.cells4(this.cell);

			if (!a.changeState || (a.changeState() === false)) {

				return false

			}

		},

		k27_0_0 : function() {

			this.editStop(true)

		},

		k33_0_0 : function() {

			if (this.pagingOn) {

				this.changePage(this.currentPage - 1)

			} else {

				this.scrollPage(-1)

			}

		},

		k34_0_0 : function() {

			if (this.pagingOn) {

				this.changePage(this.currentPage + 1)

			} else {

				this.scrollPage(1)

			}

		},

		k37_0_0 : function() {

			if (!this.editor && this.isTreeGrid()) {

				this.collapseKids(this.row)

			} else {

				return false

			}

		},

		k39_0_0 : function() {

			if (!this.editor && this.isTreeGrid()) {

				this.expandKids(this.row)

			} else {

				return false

			}

		},

		k40_0_0 : function() {

			var b = this._realfake ? this._fake : this;

			if (this.editor && this.editor.combo) {

				this.editor.shiftNext()

			} else {

				if (!this.row.idd) {

					return

				}

				var a = Math.max((b._r_select || 0), this

						.getRowIndex(this.row.idd));

				var c = this._nextRow(a, 1);

				if (c) {

					b._r_select = null;

					this.selectCell(c, this.cell._cellIndex, true);

					if (b.pagingOn) {

						b.showRow(c.idd)

					}

				} else {

					if (!this.callEvent("onLastRow", [])) {

						return false

					}

					this._key_events.k34_0_0.apply(this, []);

					if (this.pagingOn && this.rowsCol[a + 1]) {

						this.selectCell(a + 1, 0, true)

					}

				}

			}

			this._still_active = true

		},

		k38_0_0 : function() {

			var b = this._realfake ? this._fake : this;

			if (this.editor && this.editor.combo) {

				this.editor.shiftPrev()

			} else {

				if (!this.row.idd) {

					return

				}

				var a = this.getRowIndex(this.row.idd) + 1;

				if (a != -1 && (!this.pagingOn || (a != 1))) {

					var c = this._nextRow(a - 1, -1);

					this.selectCell(c, this.cell._cellIndex, true);

					if (b.pagingOn && c) {

						b.showRow(c.idd)

					}

				} else {

					this._key_events.k33_0_0.apply(this, [])

				}

			}

			this._still_active = true

		}

	},

	_build_master_row : function() {

		var c = document.createElement("DIV");

		var b = [ "<table><tr>" ];

		for (var a = 0; a < this._cCount; a++) {

			b.push("<td></td>")

		}

		b.push("</tr></table>");

		c.innerHTML = b.join("");

		this._master_row = c.firstChild.rows[0]

	},

	_prepareRow : function(a) {

		if (!this._master_row) {

			this._build_master_row()

		}

		var c = this._master_row.cloneNode(true);

		for (var b = 0; b < c.childNodes.length; b++) {

			c.childNodes[b]._cellIndex = b;

			if (this._enbCid) {

				c.childNodes[b].id = "c_" + a + "_" + b

			}

			if (this.dragAndDropOff) {

				this.dragger.addDraggableItem(c.childNodes[b], this)

			}

		}

		c.idd = a;

		c.grid = this;

		return c

	},

	_process_jsarray_row : function(b, c) {

		b._attrs = {};

		for (var a = 0; a < b.childNodes.length; a++) {

			b.childNodes[a]._attrs = {}

		}

		this._fillRow(b, (this._c_order ? this._swapColumns(c) : c));

		return b

	},

	_get_jsarray_data : function(b, a) {

		return b[a]

	},

	_process_json_row : function(a, b) {

		b = this._c_order ? this._swapColumns(b.data) : b.data;

		return this._process_some_row(a, b)

	},

	_process_some_row : function(b, c) {

		b._attrs = {};

		for (var a = 0; a < b.childNodes.length; a++) {

			b.childNodes[a]._attrs = {}

		}

		this._fillRow(b, c);

		return b

	},

	_get_json_data : function(b, a) {

		return b.data[a]

	},

	_process_js_row : function(c, e) {

		var a = [];

		for (var b = 0; b < this.columnIds.length; b++) {

			a[b] = e[this.columnIds[b]];

			if (!a[b] && a[b] !== 0) {

				a[b] = ""

			}

		}

		this._process_some_row(c, a);

		c._attrs = e;

		return c

	},

	_get_js_data : function(b, a) {

		return b[this.columnIds[a]]

	},

	_process_csv_row : function(b, c) {

		b._attrs = {};

		for (var a = 0; a < b.childNodes.length; a++) {

			b.childNodes[a]._attrs = {}

		}

		this._fillRow(b, (this._c_order ? this._swapColumns(c

				.split(this.csv.cell)) : c.split(this.csv.cell)));

		return b

	},

	_get_csv_data : function(b, a) {

		return b.split(this.csv.cell)[a]

	},

	_process_store_row : function(g, e) {

		var a = [];

		for (var c = 0; c < this.columnIds.length; c++) {

			a[c] = e[this.columnIds[c]]

		}

		for (var b = 0; b < g.childNodes.length; b++) {

			g.childNodes[b]._attrs = {}

		}

		g._attrs = e;

		this._fillRow(g, a)

	},

	_process_xml_row : function(a, h) {

		var q = dhx4.ajax.xpath(this.xml.cell, h);

		var n = [];

		a._attrs = this._xml_attrs(h);

		if (this._ud_enabled) {

			var o = dhx4.ajax.xpath("./userdata", h);

			for (var g = o.length - 1; g >= 0; g--) {

				var m = "";

				for (var c = 0; c < o[g].childNodes.length; c++) {

					m += o[g].childNodes[c].nodeValue

				}

				this.setUserData(a.idd, o[g].getAttribute("name"), m)

			}

		}

		for (var c = 0; c < q.length; c++) {

			var e = q[this._c_order ? this._c_order[c] : c];

			if (!e) {

				continue

			}

			var b = a._childIndexes ? a._childIndexes[c] : c;

			var l = e.getAttribute("type");

			if (a.childNodes[b]) {

				if (l) {

					a.childNodes[b]._cellType = l

				}

				a.childNodes[b]._attrs = this._xml_attrs(e)

			}

			if (!e.getAttribute("xmlcontent")) {

				if (e.firstChild) {

					e = e.firstChild.wholeText || e.firstChild.data

				} else {

					e = ""

				}

			}

			n.push(e)

		}

		for (c < q.length; c < a.childNodes.length; c++) {

			a.childNodes[c]._attrs = {}

		}

		if (a.parentNode && a.parentNode.tagName == "row") {

			a._attrs.parent = a.parentNode.getAttribute("idd")

		}

		this._fillRow(a, n);

		return a

	},

	_get_xml_data : function(b, a) {

		b = b.firstChild;

		while (true) {

			if (!b) {

				return ""

			}

			if (b.tagName == "cell") {

				a--

			}

			if (a < 0) {

				break

			}

			b = b.nextSibling

		}

		return (b.firstChild ? b.firstChild.data : "")

	},

	_fillRow : function(e, h) {

		if (this.editor && this.editor.parentNode

				&& this.editor.parentNode.idd == e.idd) {

			this.editStop()

		}

		for (var b = 0; b < e.childNodes.length; b++) {

			if ((b < h.length) || (this.defVal[b])) {

				var c = e.childNodes[b]._cellIndex;

				var g = h[c];

				var a = this.cells4(e.childNodes[b]);

				if ((this.defVal[c])

						&& ((g == "") || (typeof (g) == "undefined"))) {

					g = this.defVal[c]

				}

				if (a) {

					a.setValue(g)

				}

			} else {

				e.childNodes[b].innerHTML = "&nbsp;";

				e.childNodes[b]._clearCell = true

			}

		}

		return e

	},

	_postRowProcessing : function(h, l) {

		if (h._attrs["class"]) {

			h._css = h.className = h._attrs["class"]

		}

		if (h._attrs.locked) {

			h._locked = true

		}

		if (h._attrs.bgColor) {

			h.bgColor = h._attrs.bgColor

		}

		var j = 0;

		for (var b = 0; b < h.childNodes.length; b++) {

			var m = h.childNodes[b];

			var g = m._cellIndex;

			var e = m._attrs.style || h._attrs.style;

			if (e) {

				m.style.cssText += ";" + e

			}

			if (m._attrs["class"]) {

				m.className = m._attrs["class"]

			}

			e = m._attrs.align || this.cellAlign[g];

			if (e) {

				m.align = e

			}

			m.vAlign = m._attrs.valign || this.cellVAlign[g];

			var a = m._attrs.bgColor || this.columnColor[g];

			if (a) {

				m.bgColor = a

			}

			if (m._attrs.colspan && !l) {

				this.setColspan(h.idd, b + j, m._attrs.colspan);

				j += (m._attrs.colspan - 1)

			}

			if (this._hrrar && this._hrrar[g] && !l) {

				m.style.display = "none"

			}

		}

		this.callEvent("onRowCreated", [ h.idd, h, null ])

	},

	load : function(a, c, b) {

		this.callEvent("onXLS", [ this ]);

		if (arguments.length == 2 && typeof c != "function") {

			b = c;

			c = null

		}

		this._last_load_type = b = b || this._last_load_type || "xml";

		if (!this.xmlFileUrl) {

			this.xmlFileUrl = a

		}

		this._data_type = b;

		this.xmlLoader = this.doLoadDetails;

		var e = this;

		this.xmlLoader = function(g) {

			if (!e.callEvent) {

				return

			}

			e["_process_" + b](g.xmlDoc);

			if (!e._contextCallTimer) {

				e.callEvent("onXLE", [ e, 0, 0, g.xmlDoc, b ])

			}

			if (c) {

				c();

				c = null

			}

		};

		return dhx4.ajax.get(a, this.xmlLoader)

	},

	loadXMLString : function(b, a) {

		if (window.console && window.console.info) {

			window.console

					.info("loadXMLString was deprecated",

							"http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")

		}

		this.parse({

			responseXML : dhx4.ajax.parse(b)

		}, a, "xml")

	},

	loadXML : function(a, b) {

		if (window.console && window.console.info) {

			window.console

					.info("loadXML was deprecated",

							"http://docs.dhtmlx.com/migration__index.html#migrationfrom43to44")

		}

		this.load(a, b, "xml")

	},

	parse : function(c, b, a) {

		if (arguments.length == 2 && typeof b != "function") {

			a = b;

			b = null

		}

		this._last_load_type = a = a || this._last_load_type || "xml";

		this._data_type = a;

		if (a == "xml" && typeof c == "string") {

			c = {

				responseXML : dhx4.ajax.parse(c)

			}

		}

		this["_process_" + a](c);

		if (!this._contextCallTimer) {

			this.callEvent("onXLE", [ this, 0, 0, c, a ])

		}

		if (b) {

			b()

		}

	},

	xml : {

		top : "rows",

		row : "./row",

		cell : "./cell",

		s_row : "row",

		s_cell : "cell",

		row_attrs : [],

		cell_attrs : []

	},

	csv : {

		row : "\n",

		cell : ","

	},

	_xml_attrs : function(b) {

		var c = {};

		if (b.attributes.length) {

			for (var a = 0; a < b.attributes.length; a++) {

				c[b.attributes[a].name] = b.attributes[a].value

			}

		}

		return c

	},

	_process_xml : function(n) {

		if (this._refresh_mode) {

			return this._refreshFromXML(n)

		}

		this._parsing = true;

		var j = dhx4.ajax.xmltop(this.xml.top, n);

		if (j.tagName != this.xml.top) {

			return

		}

		var m = j.getAttribute("dhx_security");

		if (m) {

			dhtmlx.security_key = m

		}

		this._parseHead(j);

		var o = dhx4.ajax.xpath(this.xml.row, j);

		var g = parseInt(j.getAttribute("pos") || 0);

		var l = parseInt(j.getAttribute("total_count") || 0);

		if (!this.pagingOn) {

			var l = Math.min(l, 32000000 / this._srdh)

		}

		var e = false;

		if (l && l != this.rowsBuffer.length) {

			if (!this.rowsBuffer[l - 1]) {

				if (this.rowsBuffer.length) {

					e = true

				}

				this.rowsBuffer[l - 1] = null

			}

			if (l < this.rowsBuffer.length) {

				this.rowsBuffer.splice(l, this.rowsBuffer.length - l);

				e = true

			}

		}

		if (this.isTreeGrid()) {

			return this._process_tree_xml(j)

		}

		for (var b = 0; b < o.length; b++) {

			if (this.rowsBuffer[b + g]) {

				continue

			}

			var a = o[b].getAttribute("id") || (b + g + 1);

			this.rowsBuffer[b + g] = {

				idd : a,

				data : o[b],

				_parser : this._process_xml_row,

				_locator : this._get_xml_data

			};

			this.rowsAr[a] = o[b]

		}

		this.callEvent("onDataReady", []);

		if (e && this._srnd) {

			var c = this.objBox.scrollTop;

			this._reset_view();

			this.objBox.scrollTop = c

		} else {

			this.render_dataset()

		}

		this._parsing = false

	},

	_process_jsarray : function(data) {

		this._parsing = true;

		data = data.responseText || data;

		if (typeof data == "string") {

			eval("dhtmlx.temp=" + data + ";");

			data = dhtmlx.temp

		}

		for (var i = 0; i < data.length; i++) {

			var id = i + 1;

			this.rowsBuffer.push({

				idd : id,

				data : data[i],

				_parser : this._process_jsarray_row,

				_locator : this._get_jsarray_data

			});

			this.rowsAr[id] = data[i]

		}

		this.render_dataset();

		this._parsing = false

	},

	_process_csv : function(e) {

		this._parsing = true;

		e = e.responseText || e;

		e = e.replace(/\r/g, "");

		e = e.split(this.csv.row);

		if (this._csvHdr) {

			this.clearAll();

			var c = e.splice(0, 1)[0].split(this.csv.cell);

			if (!this._csvAID) {

				c.splice(0, 1)

			}

			this.setHeader(c.join(this.delim));

			this.init()

		}

		for (var b = 0; b < e.length; b++) {

			if (!e[b] && b == e.length - 1) {

				continue

			}

			if (this._csvAID) {

				var g = b + 1;

				this.rowsBuffer.push({

					idd : g,

					data : e[b],

					_parser : this._process_csv_row,

					_locator : this._get_csv_data

				})

			} else {

				var a = e[b].split(this.csv.cell);

				var g = a.splice(0, 1)[0];

				this.rowsBuffer.push({

					idd : g,

					data : a,

					_parser : this._process_jsarray_row,

					_locator : this._get_jsarray_data

				})

			}

			this.rowsAr[g] = e[b]

		}

		this.render_dataset();

		this._parsing = false

	},

	_process_js : function(a) {

		return this._process_json(a, "js")

	},

	_process_json : function(data, mode) {

		this._parsing = true;

		var data = data.responseText || data;

		if (typeof data == "string") {

			eval("dhtmlx.temp=" + data + ";");

			data = dhtmlx.temp

		}

		if (mode == "js") {

			if (data.data) {

				data = data.data

			}

			for (var i = 0; i < data.length; i++) {

				var row = data[i];

				var id = row.id || (i + 1);

				this.rowsBuffer.push({

					idd : id,

					data : row,

					_parser : this._process_js_row,

					_locator : this._get_js_data

				});

				this.rowsAr[id] = data[i]

			}

		} else {

			if (data.rows) {

				for (var i = 0; i < data.rows.length; i++) {

					var id = data.rows[i].id;

					this.rowsBuffer.push({

						idd : id,

						data : data.rows[i],

						_parser : this._process_json_row,

						_locator : this._get_json_data

					});

					this.rowsAr[id] = data.rows[i]

				}

			}

		}

		if (data.dhx_security) {

			dhtmlx.security_key = data.dhx_security

		}

		this.callEvent("onDataReady", []);

		this.render_dataset();

		this._parsing = false

	},

	render_dataset : function(e, m) {

		if (this._srnd) {

			if (this._fillers) {

				return this._update_srnd_view()

			}

			m = Math.min((this._get_view_size() + (this._srnd_pr || 0)),

					this.rowsBuffer.length)

		}

		if (this.pagingOn) {

			e = Math.max((e || 0), (this.currentPage - 1)

					* this.rowsBufferOutSize);

			m = Math.min(this.currentPage * this.rowsBufferOutSize,

					this.rowsBuffer.length)

		} else {

			e = e || 0;

			m = m || this.rowsBuffer.length

		}

		for (var g = e; g < m; g++) {

			var a = this.render_row(g);

			if (a == -1) {

				if (this.xmlFileUrl) {

					if (this.callEvent("onDynXLS", [ g,

							(this._dpref ? this._dpref : (m - g)) ])) {

						this.load(this.xmlFileUrl + dhtmlx.url(this.xmlFileUrl)

								+ "posStart=" + g + "&count="

								+ (this._dpref ? this._dpref : (m - g)),

								this._data_type)

					}

				}

				m = g;

				break

			}

			if (!a.parentNode || !a.parentNode.tagName) {

				this._insertRowAt(a, g);

				if (a._attrs.selected || a._attrs.select) {

					this.selectRow(a, a._attrs.call ? true : false, true);

					a._attrs.selected = a._attrs.select = null

				}

			}

			if (this._ads_count && g - e == this._ads_count) {

				var l = this;

				this._context_parsing = this._context_parsing || this._parsing;

				return this._contextCallTimer = window.setTimeout(function() {

					l._contextCallTimer = null;

					l.render_dataset(g, m);

					if (!l._contextCallTimer) {

						if (l._context_parsing) {

							l.callEvent("onXLE", [])

						} else {

							l._fixAlterCss()

						}

						l._context_parsing = false

					}

				}, this._ads_time)

			}

		}

		if (this._ads_count && g == m) {

			this.callEvent("onDistributedEnd", [])

		}

		if (this._srnd && !this._fillers) {

			var b = this.rowsBuffer.length - m;

			this._fillers = [];

			if (this._fake && !this._realfake) {

				this._fake._fillers = []

			}

			var c = Math.round(990000 / this._srdh);

			while (b > 0) {

				var h = (_isIE || window._FFrv) ? Math.min(b, c) : b;

				var j = this._add_filler(m, h);

				if (j) {

					this._fillers.push(j)

				}

				b -= h;

				m += h

			}

		}

		this.setSizes()

	},

	render_row : function(b) {

		if (!this.rowsBuffer[b]) {

			return -1

		}

		if (this.rowsBuffer[b]._parser) {

			var a = this.rowsBuffer[b];

			if (this.rowsAr[a.idd] && this.rowsAr[a.idd].tagName == "TR") {

				return this.rowsBuffer[b] = this.rowsAr[a.idd]

			}

			var c = this._prepareRow(a.idd);

			this.rowsBuffer[b] = c;

			this.rowsAr[a.idd] = c;

			a._parser.call(this, c, a.data);

			this._postRowProcessing(c);

			return c

		}

		return this.rowsBuffer[b]

	},

	_get_cell_value : function(b, a, c) {

		if (b._locator) {

			if (this._c_order) {

				a = this._c_order[a]

			}

			return b._locator.call(this, b.data, a)

		}

		return this.cells3(b, a)[c ? c : "getValue"]()

	},

	sortRows : function(c, h, b) {

		this.editStop();

		b = (b || "asc").toLowerCase();

		h = (h || this.fldSort[c]);

		c = c || 0;

		if (this.isTreeGrid()) {

			this.sortTreeRows(c, h, b)

		} else {

			var a = {};

			var g = this.cellType[c];

			var j = "getValue";

			if (g == "link") {

				j = "getContent"

			}

			if (g == "dhxCalendar" || g == "dhxCalendarA") {

				j = "getDate"

			}

			if (g == "co" || g == "coro") {

				j = "getText"

			}

			for (var e = 0; e < this.rowsBuffer.length; e++) {

				a[this.rowsBuffer[e].idd] = this._get_cell_value(

						this.rowsBuffer[e], c, j)

			}

			this._sortRows(c, h, b, a)

		}

		this.callEvent("onAfterSorting", [ c, h, b ])

	},

	_sortCore : function(c, h, b, a, g) {

		var e = "sort";

		if (this._sst) {

			g.stablesort = this.rowsCol.stablesort;

			e = "stablesort"

		}

		if (h.length > 4) {

			h = window[h]

		}

		if (h == "cus") {

			var j = this._customSorts[c];

			g[e](function(m, l) {

				return j(a[m.idd], a[l.idd], b, m.idd, l.idd)

			})

		} else {

			if (typeof (h) == "function") {

				g[e](function(m, l) {

					return h(a[m.idd], a[l.idd], b, m.idd, l.idd)

				})

			} else {

				if (h == "str") {

					g[e](function(m, l) {

						if (b == "asc") {

							return a[m.idd] > a[l.idd] ? 1

									: (a[m.idd] < a[l.idd] ? -1 : 0)

						} else {

							return a[m.idd] < a[l.idd] ? 1

									: (a[m.idd] > a[l.idd] ? -1 : 0)

						}

					})

				} else {

					if (h == "int") {

						g[e](function(n, m) {

							var l = parseFloat(a[n.idd]);

							l = isNaN(l) ? -99999999999999 : l;

							var o = parseFloat(a[m.idd]);

							o = isNaN(o) ? -99999999999999 : o;

							if (b == "asc") {

								return l - o

							} else {

								return o - l

							}

						})

					} else {

						if (h == "date") {

							g[e](function(n, m) {

								var l = Date.parse(a[n.idd])

										|| (Date.parse("01/01/1900"));

								var o = Date.parse(a[m.idd])

										|| (Date.parse("01/01/1900"));

								if (b == "asc") {

									return l - o

								} else {

									return o - l

								}

							})

						}

					}

				}

			}

		}

	},

	_sortRows : function(c, e, b, a) {

		this._sortCore(c, e, b, a, this.rowsBuffer);

		this._reset_view();

		this.callEvent("onGridReconstructed", [])

	},

	_reset_view : function(c) {

		if (!this.obj.rows[0]) {

			return

		}

		if (this._lahRw) {

			this._unsetRowHover(0, true)

		}

		this.callEvent("onResetView", []);

		var a = this.obj.rows[0].parentNode;

		var e = a.removeChild(a.childNodes[0], true);

		if (_isKHTML) {

			for (var b = a.parentNode.childNodes.length - 1; b >= 0; b--) {

				if (a.parentNode.childNodes[b].tagName == "TR") {

					a.parentNode.removeChild(a.parentNode.childNodes[b], true)

				}

			}

		} else {

			if (_isIE) {

				for (var b = a.childNodes.length - 1; b >= 0; b--) {

					a.childNodes[b].removeNode(true)

				}

			} else {

				a.innerHTML = ""

			}

		}

		a.appendChild(e);

		this.rowsCol = dhtmlxArray();

		if (this._sst) {

			this.enableStableSorting(true)

		}

		this._fillers = this.undefined;

		if (!c) {

			if (_isIE && this._srnd) {

				this.render_dataset()

			} else {

				this.render_dataset()

			}

		}

	},

	deleteRow : function(b, e) {

		if (!e) {

			e = this.getRowById(b)

		}

		if (!e) {

			return

		}

		this.editStop();

		if (!this._realfake) {

			if (this.callEvent("onBeforeRowDeleted", [ b ]) == false) {

				return false

			}

		}

		var a = 0;

		if (this.cellType._dhx_find("tree") != -1 && !this._realfake) {

			a = this._h2.get[b].parent.id;

			this._removeTrGrRow(e)

		} else {

			if (e.parentNode) {

				e.parentNode.removeChild(e)

			}

			var h = this.rowsCol._dhx_find(e);

			if (h != -1) {

				this.rowsCol._dhx_removeAt(h)

			}

			for (var c = 0; c < this.rowsBuffer.length; c++) {

				if (this.rowsBuffer[c] && this.rowsBuffer[c].idd == b) {

					this.rowsBuffer._dhx_removeAt(c);

					h = c;

					break

				}

			}

		}

		this.rowsAr[b] = null;

		for (var c = 0; c < this.selectedRows.length; c++) {

			if (this.selectedRows[c].idd == b) {

				this.selectedRows._dhx_removeAt(c)

			}

		}

		if (this._srnd) {

			for (var c = 0; c < this._fillers.length; c++) {

				var g = this._fillers[c];

				if (!g) {

					continue

				}

				if (g[0] >= h) {

					this._update_fillers(c, 0, -1)

				} else {

					if (g[0] + g[1] > h) {

						this._update_fillers(c, -1, 0)

					}

				}

			}

			this._update_srnd_view()

		}

		if (this.pagingOn) {

			this.changePage()

		}

		if (!this._realfake) {

			this.callEvent("onAfterRowDeleted", [ b, a ])

		}

		this.callEvent("onGridReconstructed", []);

		if (this._ahgr) {

			this.setSizes()

		}

		return true

	},

	_addRow : function(h, l, b) {

		if (b == -1 || typeof b == "undefined") {

			b = this.rowsBuffer.length

		}

		if (typeof l == "string") {

			l = l.split(this.delim)

		}

		var m = this._prepareRow(h);

		m._attrs = {};

		for (var c = 0; c < m.childNodes.length; c++) {

			m.childNodes[c]._attrs = {}

		}

		this.rowsAr[m.idd] = m;

		if (this._h2) {

			this._h2.get[m.idd].buff = m

		}

		this._fillRow(m, l);

		this._postRowProcessing(m);

		if (this._skipInsert) {

			this._skipInsert = false;

			return this.rowsAr[m.idd] = m

		}

		if (this.pagingOn) {

			this.rowsBuffer._dhx_insertAt(b, m);

			this.rowsAr[m.idd] = m;

			return m

		}

		if (this._fillers) {

			this.rowsCol._dhx_insertAt(b, null);

			this.rowsBuffer._dhx_insertAt(b, m);

			if (this._fake) {

				this._fake.rowsCol._dhx_insertAt(b, null)

			}

			this.rowsAr[m.idd] = m;

			var n = false;

			for (var e = 0; e < this._fillers.length; e++) {

				var g = this._fillers[e];

				if (g && g[0] <= b && (g[0] + g[1]) >= b) {

					g[1] = g[1] + 1;

					var a = g[2].firstChild.style.height = parseInt(g[2].firstChild.style.height)

							+ this._srdh + "px";

					n = true;

					if (this._fake) {

						this._fake._fillers[e][1]++;

						this._fake._fillers[e][2].firstChild.style.height = a

					}

				}

				if (g && g[0] > b) {

					g[0] = g[0] + 1;

					if (this._fake) {

						this._fake._fillers[e][0]++

					}

				}

			}

			if (!n) {

				this._fillers.push(this._add_filler(b, 1, (b == 0 ? {

					parentNode : this.obj.rows[0].parentNode,

					nextSibling : (this.rowsCol[1])

				} : this.rowsCol[b - 1])))

			}

			return m

		}

		this.rowsBuffer._dhx_insertAt(b, m);

		return this._insertRowAt(m, b)

	},

	addRow : function(a, e, c) {

		var b = this._addRow(a, e, c);

		if (!this.dragContext) {

			this.callEvent("onRowAdded", [ a ])

		}

		if (this.pagingOn) {

			this.changePage(this.currentPage)

		}

		if (this._srnd) {

			this._update_srnd_view()

		}

		b._added = true;

		if (this._srnd && !this._fillers) {

			this._fillers = []

		}

		if (this._ahgr) {

			this.setSizes()

		}

		this.callEvent("onGridReconstructed", []);

		return b

	},

	_insertRowAt : function(c, e, b) {

		this.rowsAr[c.idd] = c;

		if (this._skipInsert) {

			this._skipInsert = false;

			return c

		}

		if ((e < 0) || ((!e) && (parseInt(e) !== 0))) {

			e = this.rowsCol.length

		} else {

			if (e > this.rowsCol.length) {

				e = this.rowsCol.length

			}

		}

		if (this._cssEven) {

			var a = c.className.replace(this._cssUnEven, "");

			if ((this._cssSP ? this.getLevel(c.idd) : e) % 2 == 1) {

				c.className = a

						+ " "

						+ this._cssUnEven

						+ (this._cssSU ? (" " + this._cssUnEven + "_" + this

								.getLevel(c.idd)) : "")

			} else {

				c.className = a

						+ " "

						+ this._cssEven

						+ (this._cssSU ? (" " + this._cssEven + "_" + this

								.getLevel(c.idd)) : "")

			}

		}

		if (!b) {

			if ((e == (this.obj.rows.length - 1)) || (!this.rowsCol[e])) {

				if (_isKHTML) {

					this.obj.appendChild(c)

				} else {

					this.obj.firstChild.appendChild(c)

				}

			} else {

				this.rowsCol[e].parentNode.insertBefore(c, this.rowsCol[e])

			}

		}

		this.rowsCol._dhx_insertAt(e, c);

		this.callEvent("onRowInserted", [ c, e ]);

		return c

	},

	getRowById : function(c) {

		var b = this.rowsAr[c];

		if (b) {

			if (b.tagName != "TR") {

				for (var a = 0; a < this.rowsBuffer.length; a++) {

					if (this.rowsBuffer[a] && this.rowsBuffer[a].idd == c) {

						return this.render_row(a)

					}

				}

				if (this._h2) {

					return this.render_row(null, b.idd)

				}

			}

			return b

		}

		return null

	},

	cellById : function(b, a) {

		return this.cells(b, a)

	},

	cells : function(e, b) {

		if (arguments.length == 0) {

			return this.cells4(this.cell)

		} else {

			var g = this.getRowById(e)

		}

		var a = (g._childIndexes ? g.childNodes[g._childIndexes[b]]

				: g.childNodes[b]);

		if (!a && g._childIndexes) {

			a = g.firstChild || {}

		}

		return this.cells4(a)

	},

	cellByIndex : function(b, a) {

		return this.cells2(b, a)

	},

	cells2 : function(e, b) {

		var g = this.render_row(e);

		var a = (g._childIndexes ? g.childNodes[g._childIndexes[b]]

				: g.childNodes[b]);

		if (!a && g._childIndexes) {

			a = g.firstChild || {}

		}

		return this.cells4(a)

	},

	cells3 : function(c, b) {

		var a = (c._childIndexes ? c.childNodes[c._childIndexes[b]]

				: c.childNodes[b]);

		return this.cells4(a)

	},

	cells4 : function(a) {

		var b = window["eXcell_" + (a._cellType || this.cellType[a._cellIndex])];

		if (b) {

			return new b(a)

		}

	},

	cells5 : function(a, c) {

		var c = c || (a._cellType || this.cellType[a._cellIndex]);

		if (!this._ecache[c]) {

			if (!window["eXcell_" + c]) {

				var b = eXcell_ro

			} else {

				var b = window["eXcell_" + c]

			}

			this._ecache[c] = new b(a)

		}

		this._ecache[c].cell = a;

		return this._ecache[c]

	},

	dma : function(a) {

		if (!this._ecache) {

			this._ecache = {}

		}

		if (a && !this._dma) {

			this._dma = this.cells4;

			this.cells4 = this.cells5

		} else {

			if (!a && this._dma) {

				this.cells4 = this._dma;

				this._dma = null

			}

		}

	},

	getRowsNum : function() {

		return this.rowsBuffer.length

	},

	enableEditTabOnly : function(a) {

		if (arguments.length > 0) {

			this.smartTabOrder = dhx4.s2b(a)

		} else {

			this.smartTabOrder = true

		}

	},

	setExternalTabOrder : function(g, a) {

		var b = this;

		this.tabStart = (typeof (g) == "object") ? g : document

				.getElementById(g);

		var c = this.tabStart.onkeydown;

		this.tabStart.onkeydown = function(j) {

			if (c) {

				c.call(this, j)

			}

			var h = (j || window.event);

			if (h.keyCode == 9 && !h.shiftKey) {

				h.cancelBubble = true;

				b.selectCell(0, 0, 0, 0, 1);

				if (b.smartTabOrder && b.cells2(0, 0).isDisabled()) {

					b._key_events.k9_0_0.call(b)

				}

				this.blur();

				return false

			}

		};

		if (_isOpera) {

			this.tabStart.onkeypress = this.tabStart.onkeydown

		}

		this.tabEnd = (typeof (a) == "object") ? a : document.getElementById(a);

		var e = this.tabEnd.onkeydown;

		this.tabEnd.onkeydown = this.tabEnd.onkeypress = function(j) {

			if (e) {

				e.call(this, j)

			}

			var h = (j || window.event);

			if (h.keyCode == 9 && h.shiftKey) {

				h.cancelBubble = true;

				b.selectCell((b.getRowsNum() - 1), (b.getColumnCount() - 1), 0,

						0, 1);

				if (b.smartTabOrder

						&& b.cells2((b.getRowsNum() - 1),

								(b.getColumnCount() - 1)).isDisabled()) {

					b._key_events.k9_0_1.call(b)

				}

				this.blur();

				return false

			}

		};

		if (_isOpera) {

			this.tabEnd.onkeypress = this.tabEnd.onkeydown

		}

	},

	uid : function() {

		if (!this._ui_seed) {

			this._ui_seed = (new Date()).valueOf()

		}

		return this._ui_seed++

	},

	setIconset : function(a) {

		this.iconset = a

	},

	clearAndLoad : function() {

		if (this._last_load_request) {

			var b = this._last_load_request.xmlDoc;

			if (b.readyState != 4) {

				try {

					b.onreadystatechange = function() {

					};

					b.abort()

				} catch (c) {

				}

			}

		}

		var a = this._pgn_skin;

		this._pgn_skin = null;

		this.clearAll();

		this._pgn_skin = a;

		this._last_load_request = this.load.apply(this, arguments)

	},

	getStateOfView : function() {

		if (this.pagingOn) {

			var e = (this.currentPage - 1) * this.rowsBufferOutSize;

			return [

					this.currentPage,

					e,

					Math

							.min(e + this.rowsBufferOutSize,

									this.rowsBuffer.length),

					this.rowsBuffer.length ]

		}

		var b = Math.floor(this.objBox.scrollTop / this._srdh);

		var a = Math.ceil(parseInt(this.objBox.offsetHeight) / this._srdh);

		if (this.multiLine) {

			var c = this.objBox.scrollTop;

			b = 0;

			while (c >= 0) {

				c -= this.rowsCol[b] ? this.rowsCol[b].offsetHeight

						: this._srdh;

				b++

			}

			b--;

			c += this.objBox.offsetHeight;

			a = 0;

			while (c >= 0) {

				c -= this.rowsCol[b + a] ? this.rowsCol[b + a].offsetHeight

						: this._srdh;

				a++

			}

		}

		return [ b, a, this.rowsBuffer.length ]

	}

};

(function() {

	function e(j, l) {

		this[j] = l

	}

	function h(j, l) {

		this[j].call(this, l)

	}

	function c(j, l) {

		this[j].call(this, l.join(this.delim))

	}

	function a(j, n) {

		for (var m = 0; m < n.length; m++) {

			if (typeof n[m] == "object") {

				var o = this.getCombo(m);

				for ( var l in n[m]) {

					o.put(l, n[m][l])

				}

			}

		}

	}

	function g(l, t, o) {

		var v = 1;

		var s = [];

		function u(x, w, y) {

			if (!s[w]) {

				s[w] = []

			}

			if (typeof y == "object") {

				y.toString = function() {

					return this.text

				}

			}

			s[w][x] = y

		}

		for (var q = 0; q < t.length; q++) {

			if (typeof (t[q]) == "object" && t[q].length) {

				for (var n = 0; n < t[q].length; n++) {

					u(q, n, t[q][n])

				}

			} else {

				u(q, 0, t[q])

			}

		}

		for (var q = 0; q < s.length; q++) {

			for (var n = 0; n < s[0].length; n++) {

				var r = s[q][n];

				s[q][n] = (r || "").toString() || "&nbsp;";

				if (r && r.colspan) {

					for (var m = 1; m < r.colspan; m++) {

						u(n + m, q, "#cspan")

					}

				}

				if (r && r.rowspan) {

					for (var m = 1; m < r.rowspan; m++) {

						u(n, q + m, "#rspan")

					}

				}

			}

		}

		this.setHeader(s[0]);

		for (var q = 1; q < s.length; q++) {

			this.attachHeader(s[q])

		}

	}

	var b = [ {

		name : "label",

		def : "&nbsp;",

		operation : "setHeader",

		type : g

	}, {

		name : "id",

		def : "",

		operation : "columnIds",

		type : e

	}, {

		name : "width",

		def : "*",

		operation : "setInitWidths",

		type : c

	}, {

		name : "align",

		def : "left",

		operation : "cellAlign",

		type : e

	}, {

		name : "valign",

		def : "middle",

		operation : "cellVAlign",

		type : e

	}, {

		name : "sort",

		def : "na",

		operation : "fldSort",

		type : e

	}, {

		name : "type",

		def : "ro",

		operation : "setColTypes",

		type : c

	}, {

		name : "options",

		def : "",

		operation : "",

		type : a

	} ];

	dhtmlx.extend_api("dhtmlXGridObject", {

		_init : function(j) {

			return [ j.parent ]

		},

		image_path : "setImagePath",

		columns : "columns",

		rows : "rows",

		headers : "headers",

		skin : "setSkin",

		smart_rendering : "enableSmartRendering",

		css : "enableAlterCss",

		auto_height : "enableAutoHeight",

		save_hidden : "enableAutoHiddenColumnsSaving",

		save_cookie : "enableAutoSaving",

		save_size : "enableAutoSizeSaving",

		auto_width : "enableAutoWidth",

		block_selection : "enableBlockSelection",

		csv_id : "enableCSVAutoID",

		csv_header : "enableCSVHeader",

		cell_ids : "enableCellIds",

		colspan : "enableColSpan",

		column_move : "enableColumnMove",

		context_menu : "enableContextMenu",

		distributed : "enableDistributedParsing",

		drag : "enableDragAndDrop",

		drag_order : "enableDragOrder",

		tabulation : "enableEditTabOnly",

		header_images : "enableHeaderImages",

		header_menu : "enableHeaderMenu",

		keymap : "enableKeyboardSupport",

		mouse_navigation : "enableLightMouseNavigation",

		markers : "enableMarkedCells",

		math_editing : "enableMathEditing",

		math_serialization : "enableMathSerialization",

		drag_copy : "enableMercyDrag",

		multiline : "enableMultiline",

		multiselect : "enableMultiselect",

		save_column_order : "enableOrderSaving",

		hover : "enableRowsHover",

		rowspan : "enableRowspan",

		smart : "enableSmartRendering",

		save_sorting : "enableSortingSaving",

		stable_sorting : "enableStableSorting",

		undo : "enableUndoRedo",

		csv_cell : "setCSVDelimiter",

		date_format : "setDateFormat",

		drag_behavior : "setDragBehavior",

		editable : "setEditable",

		without_header : "setNoHeader",

		submit_changed : "submitOnlyChanged",

		submit_serialization : "submitSerialization",

		submit_selected : "submitOnlySelected",

		submit_id : "submitOnlyRowID",

		xml : "load"

	}, {

		columns : function(q) {

			for (var l = 0; l < b.length; l++) {

				var o = [];

				for (var m = 0; m < q.length; m++) {

					o[m] = q[m][b[l].name] || b[l].def

				}

				var n = b[l].type || h;

				n.call(this, b[l].operation, o, q)

			}

			this.init()

		},

		rows : function(j) {

		},

		headers : function(l) {

			for (var j = 0; j < l.length; j++) {

				this.attachHeader(l[j])

			}

		}

	})

})();

dhtmlXGridObject.prototype._dp_init = function(a) {

	a.attachEvent("insertCallback", function(b, e) {

		if (this.obj._h2) {

			this.obj.addRow(e, c, null, parent)

		} else {

			this.obj.addRow(e, [], 0)

		}

		var c = this.obj.getRowById(e);

		if (c) {

			this.obj._process_xml_row(c, b.firstChild);

			this.obj._postRowProcessing(c)

		}

	});

	a.attachEvent("updateCallback", function(b, e) {

		var c = this.obj.getRowById(e);

		if (c) {

			this.obj._process_xml_row(c, b.firstChild);

			this.obj._postRowProcessing(c)

		}

	});

	a.attachEvent("deleteCallback", function(b, c) {

		this.obj.setUserData(c, this.action_param, "true_deleted");

		this.obj.deleteRow(c)

	});

	a._methods = [ "setRowTextStyle", "setCellTextStyle", "changeRowId",

			"deleteRow" ];

	this.attachEvent("onEditCell", function(e, g, c) {

		if (a._columns && !a._columns[c]) {

			return true

		}

		var b = this.cells(g, c);

		if (e == 1) {

			if (b.isCheckbox()) {

				a.setUpdated(g, true)

			}

		} else {

			if (e == 2) {

				if (b.wasChanged()) {

					a.setUpdated(g, true)

				}

			}

		}

		return true

	});

	this.attachEvent("onRowPaste", function(b) {

		a.setUpdated(b, true)

	});

	this.attachEvent("onUndo", function(b) {

		a.setUpdated(b, true)

	});

	this.attachEvent("onRowIdChange", function(e, b) {

		var c = a.findRow(e);

		if (c < a.updatedRows.length) {

			a.updatedRows[c] = b

		}

	});

	this.attachEvent("onSelectStateChanged", function(b) {

		if (a.updateMode == "row") {

			a.sendData()

		}

		return true

	});

	this.attachEvent("onEnter", function(c, b) {

		if (a.updateMode == "row") {

			a.sendData()

		}

		return true

	});

	this.attachEvent("onBeforeRowDeleted", function(b) {

		if (a._silent_mode || (!this.rowsAr[b])) {

			return true

		}

		if (this.dragContext && a.dnd) {

			window.setTimeout(function() {

				a.setUpdated(b, true)

			}, 1);

			return true

		}

		var c = a.getState(b);

		if (this._h2) {

			this._h2.forEachChild(b, function(e) {

				a.setUpdated(e.id, false);

				a.markRow(e.id, true, "deleted")

			}, this)

		}

		if (c == "inserted") {

			a.set_invalid(b, false);

			a.setUpdated(b, false);

			return true

		}

		if (c == "deleted") {

			return false

		}

		if (c == "true_deleted") {

			a.setUpdated(b, false);

			return true

		}

		a.setUpdated(b, true, "deleted");

		return false

	});

	this.attachEvent("onBindUpdate", function(c, b, e) {

		a.setUpdated(e, true)

	});

	this.attachEvent("onRowAdded", function(b) {

		if (this.dragContext && a.dnd) {

			return true

		}

		a.setUpdated(b, true, "inserted");

		return true

	});

	a._getRowData = function(e, q) {

		var l = {};

		l.gr_id = e;

		if (this.obj.isTreeGrid()) {

			l.gr_pid = this.obj.getParentId(e)

		}

		var b = this.obj.getRowById(e);

		for (var m = 0; m < this.obj._cCount; m++) {

			if (this.obj._c_order) {

				var n = this.obj._c_order[m]

			} else {

				var n = m

			}

			var o = this.obj.cells(b.idd, m);

			if (this._changed && !o.wasChanged()) {

				continue

			}

			if (this._endnm) {

				l[this.obj.getColumnId(m)] = o.getValue()

			} else {

				l["c" + n] = o.getValue()

			}

		}

		var g = this.obj.UserData[e];

		if (g) {

			for (var h = 0; h < g.keys.length; h++) {

				if (g.keys[h] && g.keys[h].indexOf("__") != 0) {

					l[g.keys[h]] = g.values[h]

				}

			}

		}

		var g = this.obj.UserData.gridglobaluserdata;

		if (g) {

			for (var h = 0; h < g.keys.length; h++) {

				l[g.keys[h]] = g.values[h]

			}

		}

		return l

	};

	a._clearUpdateFlag = function(c) {

		var e = this.obj.getRowById(c);

		if (e) {

			for (var b = 0; b < this.obj._cCount; b++) {

				this.obj.cells(c, b).cell.wasChanged = false

			}

		}

	};

	a.checkBeforeUpdate = function(h) {

		var g = true;

		var b = [];

		for (var e = 0; e < this.obj._cCount; e++) {

			if (this.mandatoryFields[e]) {

				var c = this.mandatoryFields[e].call(this.obj, this.obj.cells(

						h, e).getValue(), h, e);

				if (typeof c == "string") {

					this.messages.push(c);

					g = false

				} else {

					g &= c;

					b[e] = !c

				}

			}

		}

		if (!g) {

			this.set_invalid(h, "invalid", b);

			this.setUpdated(h, false)

		}

		return g

	}

};

dhx4.attachEvent("onGridCreated", function(b) {

	b._con_f_used = [].concat(b._con_f_used);

	dhtmlXGridObject.prototype._con_f_used = [];

	if (b._was_created_once) {

		return

	}

	b._was_created_once = true;

	var a = function(h) {

		h = h.replace(/(\?|\&)connector[^\f]*/g, "");

		return h + (h.indexOf("?") != -1 ? "&" : "?") + "connector=true"

				+ (this.hdr.rows.length > 0 ? "&dhx_no_header=1" : "")

	};

	var g = function(h) {

		return a.call(this, h) + (this._connector_sorting || "")

				+ (this._connector_filter || "")

	};

	var e = function(j, l, h) {

		this._connector_sorting = "&dhx_sort[" + l + "]=" + h;

		return g.call(this, j)

	};

	var c = function(j, h, m) {

		var n = [];

		for (var l = 0; l < h.length; l++) {

			n[l] = "dhx_filter[" + h[l] + "]=" + encodeURIComponent(m[l])

		}

		this._connector_filter = "&" + n.join("&");

		return g.call(this, j)

	};

	b.attachEvent("onCollectValues", function(h) {

		if (this._con_f_used[h]) {

			if (typeof (this._con_f_used[h]) == "object") {

				return this._con_f_used[h]

			} else {

				return false

			}

		}

		return true

	});

	b.attachEvent("onDynXLS", function() {

		if (this.xmlFileUrl) {

			this.xmlFileUrl = g.call(this, this.xmlFileUrl)

		}

		return true

	});

	b.attachEvent("onBeforeSorting", function(m, l, j) {

		if (l == "connector") {

			var h = this;

			this.clearAndLoad(e.call(this, this.xmlFileUrl, m, j), function() {

				h.setSortImgState(true, m, j)

			});

			return false

		}

		return true

	});

	b.attachEvent("onFilterStart", function(j, h) {

		if (this._con_f_used.length) {

			var m = this.getSortingState();

			var l = this;

			this.clearAndLoad(c.call(this, this.xmlFileUrl, j, h));

			if (m.length) {

				l.setSortImgState(true, m[0], m[1])

			}

			return false

		}

		return true

	})

});

dhtmlXGridObject.prototype._con_f_used = [];

dhtmlXGridObject.prototype._in_header_connector_text_filter = function(b, a) {

	if (!this._con_f_used[a]) {

		this._con_f_used[a] = 1

	}

	return this._in_header_text_filter(b, a)

};

dhtmlXGridObject.prototype._in_header_connector_select_filter = function(b, a) {

	if (!this._con_f_used[a]) {

		this._con_f_used[a] = 2

	}

	return this._in_header_select_filter(b, a)

};

if (!dhtmlXGridObject.prototype.load_connector) {

	dhtmlXGridObject.prototype.load_connector = dhtmlXGridObject.prototype.load;

	dhtmlXGridObject.prototype.load = function(b, g, e) {

		if (!this._colls_loaded && this.cellType) {

			var a = [];

			for (var c = 0; c < this.cellType.length; c++) {

				if (this.cellType[c].indexOf("co") == 0

						|| this.cellType[c].indexOf("clist") == 0

						|| this._con_f_used[c] == 2) {

					a.push(c)

				}

			}

			if (a.length) {

				arguments[0] += (arguments[0].indexOf("?") != -1 ? "&" : "?")

						+ "connector=true&dhx_colls=" + a.join(",")

			}

		}

		return this.load_connector.apply(this, arguments)

	};

	dhtmlXGridObject.prototype._parseHead_connector = dhtmlXGridObject.prototype._parseHead;

	dhtmlXGridObject.prototype._parseHead = function(b, s, o) {

		this._parseHead_connector.apply(this, arguments);

		if (!this._colls_loaded) {

			var q = dhx4.ajax.xpath("./coll_options", arguments[0]);

			for (var l = 0; l < q.length; l++) {

				var n = q[l].getAttribute("for");

				var r = [];

				var e = null;

				if (this.cellType[n] == "combo") {

					e = this.getColumnCombo(n)

				} else {

					if (this.cellType[n].indexOf("co") == 0) {

						e = this.getCombo(n)

					}

				}

				var h = dhx4.ajax.xpath("./item", q[l]);

				var a = [];

				for (var g = 0; g < h.length; g++) {

					var c = h[g].getAttribute("value");

					if (e) {

						var m = h[g].getAttribute("label") || c;

						if (e.addOption) {

							a.push([ c, m ])

						} else {

							e.put(c, m)

						}

						r[r.length] = m

					} else {

						r[r.length] = c

					}

				}

				if (a.length) {

					if (e) {

						e.addOption(a)

					}

				} else {

					if (r.length && !e) {

						if (this.registerCList) {

							this.registerCList(n * 1, r)

						}

					}

				}

				if (this._con_f_used[n * 1]) {

					this._con_f_used[n * 1] = r

				}

			}

			this._colls_loaded = true

		}

	}

}

dhtmlXGridObject.prototype.getRowData = function(g) {

	var b = {};

	var a = this.getColumnsNum();

	for (var c = 0; c < a; c++) {

		var e = this.getColumnId(c);

		if (e) {

			b[e] = this.cells(g, c).getValue()

		}

	}

	return b

};

dhtmlXGridObject.prototype.setRowData = function(g, c) {

	var a = this.getColumnsNum();

	for (var b = 0; b < a; b++) {

		var e = this.getColumnId(b);

		if (e && c.hasOwnProperty(e)) {

			this.cells(g, b).setValue(c[e])

		}

	}

};

function dhtmlXGridCellObject(a) {

	this.destructor = function() {

		this.cell.obj = null;

		this.cell = null;

		this.grid = null;

		this.base = null;

		return null

	};

	this.cell = a;

	this.getValue = function() {

		if ((this.cell.textContent)

				&& (this.cell.textContent.tagName == "TEXTAREA")) {

			return this.cell.textContent.value

		} else {

			return this.cell.innerHTML._dhx_trim()

		}

	};

	this.getMathValue = function() {

		if (this.cell.original) {

			return this.cell.original

		} else {

			return this.getValue()

		}

	};

	this.getFont = function() {

		arOut = new Array(3);

		if (this.cell.style.fontFamily) {

			arOut[0] = this.cell.style.fontFamily

		}

		if (this.cell.style.fontWeight == "bold"

				|| this.cell.parentNode.style.fontWeight == "bold") {

			arOut[1] = "bold"

		}

		if (this.cell.style.fontStyle == "italic"

				|| this.cell.parentNode.style.fontWeight == "italic") {

			arOut[1] += "italic"

		}

		if (this.cell.style.fontSize) {

			arOut[2] = this.cell.style.fontSize

		} else {

			arOut[2] = ""

		}

		return arOut.join("-")

	};

	this.getTextColor = function() {

		if (this.cell.style.color) {

			return this.cell.style.color

		} else {

			return "#000000"

		}

	};

	this.getBgColor = function() {

		return this.cell.style.backgroundColor || "#FFFFFF"

	};

	this.getHorAlign = function() {

		if (this.cell.style.textAlign) {

			return this.cell.style.textAlign

		} else {

			if (this.cell.style.textAlign) {

				return this.cell.style.textAlign

			} else {

				return "left"

			}

		}

	};

	this.getWidth = function() {

		return this.cell.scrollWidth

	};

	this.setFont = function(b) {

		fntAr = b.split("-");

		this.cell.style.fontFamily = fntAr[0];

		this.cell.style.fontSize = fntAr[fntAr.length - 1];

		if (fntAr.length == 3) {

			if (/bold/.test(fntAr[1])) {

				this.cell.style.fontWeight = "bold"

			}

			if (/italic/.test(fntAr[1])) {

				this.cell.style.fontStyle = "italic"

			}

			if (/underline/.test(fntAr[1])) {

				this.cell.style.textDecoration = "underline"

			}

		}

	};

	this.setTextColor = function(b) {

		this.cell.style.color = b

	};

	this.setBgColor = function(b) {

		if (b == "") {

			b = null

		}

		this.cell.style.background = b

	};

	this.setHorAlign = function(b) {

		if (b.length == 1) {

			if (b == "c") {

				this.cell.style.textAlign = "center"

			} else {

				if (b == "l") {

					this.cell.style.textAlign = "left"

				} else {

					this.cell.style.textAlign = "right"

				}

			}

		} else {

			this.cell.style.textAlign = b

		}

	};

	this.wasChanged = function() {

		if (this.cell.wasChanged) {

			return true

		} else {

			return false

		}

	};

	this.isCheckbox = function() {

		var b = this.cell.firstChild;

		if (b && b.tagName == "INPUT") {

			type = b.type;

			if (type == "radio" || type == "checkbox") {

				return true

			} else {

				return false

			}

		} else {

			return false

		}

	};

	this.isChecked = function() {

		if (this.isCheckbox()) {

			return this.cell.firstChild.checked

		}

	};

	this.isDisabled = function() {

		return this.cell._disabled

	};

	this.setChecked = function(b) {

		if (this.isCheckbox()) {

			if (b != "true" && b != 1) {

				b = false

			}

			this.cell.firstChild.checked = b

		}

	};

	this.setDisabled = function(b) {

		if (b != "true" && b != 1) {

			b = false

		}

		if (this.isCheckbox()) {

			this.cell.firstChild.disabled = b;

			if (this.disabledF) {

				this.disabledF(b)

			}

		}

		this.cell._disabled = b

	}

}

dhtmlXGridCellObject.prototype = {

	getAttribute : function(a) {

		return this.cell._attrs[a]

	},

	setAttribute : function(a, b) {

		this.cell._attrs[a] = b

	},

	getInput : function() {

		if (this.obj

				&& (this.obj.tagName == "INPUT" || this.obj.tagName == "TEXTAREA")) {

			return this.obj

		}

		var a = (this.obj || this.cell).getElementsByTagName("TEXTAREA");

		if (!a.length) {

			a = (this.obj || this.cell).getElementsByTagName("INPUT")

		}

		return a[0]

	}

};

dhtmlXGridCellObject.prototype.setValue = function(a) {

	if ((typeof (a) != "number") && (!a || a.toString()._dhx_trim() == "")) {

		a = "&nbsp;";

		this.cell._clearCell = true

	} else {

		this.cell._clearCell = false

	}

	this.setCValue(a)

};

dhtmlXGridCellObject.prototype.getTitle = function() {

	return (_isIE ? this.cell.innerText : this.cell.textContent)

};

dhtmlXGridCellObject.prototype.setCValue = function(b, a) {

	this.cell.innerHTML = b;

	this.grid.callEvent("onCellChanged", [ this.cell.parentNode.idd,

			this.cell._cellIndex, (arguments.length > 1 ? a : b) ])

};

dhtmlXGridCellObject.prototype.setCTxtValue = function(a) {

	this.cell.innerHTML = "";

	this.cell.appendChild(document.createTextNode(a));

	this.grid.callEvent("onCellChanged", [ this.cell.parentNode.idd,

			this.cell._cellIndex, a ])

};

dhtmlXGridCellObject.prototype.setLabel = function(a) {

	this.cell.innerHTML = a

};

dhtmlXGridCellObject.prototype.getMath = function() {

	if (this._val) {

		return this.val

	} else {

		return this.getValue()

	}

};

function eXcell() {

	this.obj = null;

	this.val = null;

	this.changeState = function() {

		return false

	};

	this.edit = function() {

		this.val = this.getValue()

	};

	this.detach = function() {

		return false

	};

	this.getPosition = function(e) {

		var a = e;

		var c = 0;

		var b = 0;

		while (a.tagName != "BODY") {

			c += a.offsetLeft;

			b += a.offsetTop;

			a = a.offsetParent

		}

		return new Array(c, b)

	}

}

eXcell.prototype = new dhtmlXGridCellObject;

function eXcell_ed(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.edit = function() {

		this.cell.atag = (!this.grid.multiLine) ? "INPUT" : "TEXTAREA";

		this.val = this.getValue();

		this.obj = document.createElement(this.cell.atag);

		this.obj.setAttribute("autocomplete", "off");

		this.obj.style.height = (this.cell.offsetHeight - (this.grid.multiLine ? 9

				: 4))

				+ "px";

		this.obj.className = "dhx_combo_edit";

		this.obj.wrap = "soft";

		this.obj.style.textAlign = this.cell.style.textAlign;

		this.obj.onclick = function(b) {

			(b || event).cancelBubble = true

		};

		this.obj.onmousedown = function(b) {

			(b || event).cancelBubble = true

		};

		this.obj.value = this.val;

		this.cell.innerHTML = "";

		this.cell.appendChild(this.obj);

		this.obj.onselectstart = function(b) {

			if (!b) {

				b = event

			}

			b.cancelBubble = true;

			return true

		};

		if (_isIE) {

			this.obj.focus();

			this.obj.blur()

		}

		this.obj.focus()

	};

	this.getValue = function() {

		if ((this.cell.firstChild)

				&& ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag))) {

			return this.cell.firstChild.value

		}

		if (this.cell._clearCell) {

			return ""

		}

		return this.cell.innerHTML.toString()._dhx_trim()

	};

	this.detach = function() {

		this.setValue(this.obj.value);

		return this.val != this.getValue()

	}

}

eXcell_ed.prototype = new eXcell;

function eXcell_edtxt(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.getValue = function() {

		if ((this.cell.firstChild)

				&& ((this.cell.atag) && (this.cell.firstChild.tagName == this.cell.atag))) {

			return this.cell.firstChild.value

		}

		if (this.cell._clearCell) {

			return ""

		}

		return (_isIE ? this.cell.innerText : this.cell.textContent)

	};

	this.setValue = function(b) {

		if (!b || b.toString()._dhx_trim() == "") {

			b = " ";

			this.cell._clearCell = true

		} else {

			this.cell._clearCell = false

		}

		this.setCTxtValue(b)

	}

}

eXcell_edtxt.prototype = new eXcell_ed;

function eXcell_edn(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.getValue = function() {

		if ((this.cell.firstChild)

				&& (this.cell.firstChild.tagName == "TEXTAREA")) {

			return this.cell.firstChild.value

		}

		if (this.cell._clearCell) {

			return ""

		}

		return this.cell._orig_value

				|| this.grid._aplNFb(

						this.cell.innerHTML.toString()._dhx_trim(),

						this.cell._cellIndex)

	};

	this.detach = function() {

		var b = this.obj.value;

		this.setValue(b);

		return this.val != this.getValue()

	}

}

eXcell_edn.prototype = new eXcell_ed;

eXcell_edn.prototype.setValue = function(a) {

	if (!a || a.toString()._dhx_trim() == "") {

		this.cell._clearCell = true;

		return this.setCValue("&nbsp;", 0)

	} else {

		this.cell._clearCell = false;

		this.cell._orig_value = a

	}

	this.setCValue(this.grid._aplNF(a, this.cell._cellIndex), a)

};

function eXcell_ch(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.disabledF = function(b) {

		if ((b == true) || (b == 1)) {

			this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0.",

					"item_chk0_dis.").replace("item_chk1.", "item_chk1_dis.")

		} else {

			this.cell.innerHTML = this.cell.innerHTML.replace("item_chk0_dis.",

					"item_chk0.").replace("item_chk1_dis.", "item_chk1.")

		}

	};

	this.changeState = function(b) {

		if (b === true && !this.grid.isActive) {

			if (window.globalActiveDHTMLGridObject != null

					&& window.globalActiveDHTMLGridObject != this.grid

					&& window.globalActiveDHTMLGridObject.isActive) {

				window.globalActiveDHTMLGridObject.setActive(false)

			}

			this.grid.setActive(true)

		}

		if ((!this.grid.isEditable) || (this.cell.parentNode._locked)

				|| (this.isDisabled())) {

			return

		}

		if (this.grid.callEvent("onEditCell", [ 0, this.cell.parentNode.idd,

				this.cell._cellIndex ])) {

			this.val = this.getValue();

			if (this.val == "1") {

				this.setValue("0")

			} else {

				this.setValue("1")

			}

			this.cell.wasChanged = true;

			this.grid.callEvent("onEditCell", [ 1, this.cell.parentNode.idd,

					this.cell._cellIndex ]);

			this.grid.callEvent("onCheckbox", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ]);

			this.grid.callEvent("onCheck", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ])

		} else {

			this.editor = null

		}

	};

	this.getValue = function() {

		return this.cell.chstate ? this.cell.chstate.toString() : "0"

	};

	this.isCheckbox = function() {

		return true

	};

	this.isChecked = function() {

		if (this.getValue() == "1") {

			return true

		} else {

			return false

		}

	};

	this.setChecked = function(b) {

		this.setValue(b.toString())

	};

	this.detach = function() {

		return this.val != this.getValue()

	};

	this.edit = null

}

eXcell_ch.prototype = new eXcell;

eXcell_ch.prototype.setValue = function(b) {

	this.cell.style.verticalAlign = "middle";

	if (b) {

		b = b.toString()._dhx_trim();

		if ((b == "false") || (b == "0")) {

			b = ""

		}

	}

	if (b) {

		b = "1";

		this.cell.chstate = "1"

	} else {

		b = "0";

		this.cell.chstate = "0"

	}

	var a = this;

	this.cell.setAttribute("excell", "ch");

	this

			.setCValue(

					"<img src='"

							+ this.grid.imgURL

							+ "item_chk"

							+ b

							+ ".gif' onclick='new eXcell_ch(this.parentNode).changeState(true); (arguments[0]||event).cancelBubble=true; '>",

					this.cell.chstate)

};

function eXcell_ra(a) {

	this.base = eXcell_ch;

	this.base(a);

	this.grid = a.parentNode.grid;

	this.disabledF = function(b) {

		if ((b == true) || (b == 1)) {

			this.cell.innerHTML = this.cell.innerHTML.replace("radio_chk0.",

					"radio_chk0_dis.")

					.replace("radio_chk1.", "radio_chk1_dis.")

		} else {

			this.cell.innerHTML = this.cell.innerHTML.replace(

					"radio_chk0_dis.", "radio_chk0.").replace(

					"radio_chk1_dis.", "radio_chk1.")

		}

	};

	this.changeState = function(b) {

		if (b === false && this.getValue() == 1) {

			return

		}

		if ((!this.grid.isEditable) || (this.cell.parentNode._locked)

				|| (this.isDisabled())) {

			return

		}

		if (this.grid.callEvent("onEditCell", [ 0, this.cell.parentNode.idd,

				this.cell._cellIndex ]) != false) {

			this.val = this.getValue();

			if (this.val == "1") {

				this.setValue("0")

			} else {

				this.setValue("1")

			}

			this.cell.wasChanged = true;

			this.grid.callEvent("onEditCell", [ 1, this.cell.parentNode.idd,

					this.cell._cellIndex ]);

			this.grid.callEvent("onCheckbox", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ]);

			this.grid.callEvent("onCheck", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ])

		} else {

			this.editor = null

		}

	};

	this.edit = null

}

eXcell_ra.prototype = new eXcell_ch;

eXcell_ra.prototype.setValue = function(b) {

	this.cell.style.verticalAlign = "middle";

	if (b) {

		b = b.toString()._dhx_trim();

		if ((b == "false") || (b == "0")) {

			b = ""

		}

	}

	if (b) {

		if (!this.grid._RaSeCol) {

			this.grid._RaSeCol = []

		}

		if (this.grid._RaSeCol[this.cell._cellIndex]) {

			var c = this.grid._RaSeCol[this.cell._cellIndex];

			if (this.grid.rowsAr[c]) {

				var a = this.grid.cells(c, this.cell._cellIndex);

				a.setValue("0");

				if (this.grid.rowsAr[a.cell.parentNode.idd]) {

					this.grid.callEvent("onEditCell", [ 1,

							a.cell.parentNode.idd, a.cell._cellIndex ])

				}

			}

		}

		this.grid._RaSeCol[this.cell._cellIndex] = this.cell.parentNode.idd;

		b = "1";

		this.cell.chstate = "1"

	} else {

		b = "0";

		this.cell.chstate = "0"

	}

	this.cell.setAttribute("excell", "ra");

	this

			.setCValue(

					"<img src='"

							+ this.grid.imgURL

							+ "radio_chk"

							+ b

							+ ".gif' onclick='new eXcell_ra(this.parentNode).changeState(false);'>",

					this.cell.chstate)

};

function eXcell_txt(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.edit = function() {

		this.val = this.getValue();

		this.obj = document.createElement("TEXTAREA");

		this.obj.className = "dhx_textarea";

		this.obj.onclick = function(g) {

			(g || event).cancelBubble = true

		};

		var b = this.grid.getPosition(this.cell);

		this.obj.value = this.val;

		this.obj.style.display = "";

		this.obj.style.textAlign = this.cell.style.textAlign;

		document.body.appendChild(this.obj);

		if (_isOpera) {

			this.obj.onkeypress = function(e) {

				if (e.keyCode == 9 || e.keyCode == 27) {

					return false

				}

			}

		}

		this.obj.onkeydown = function(h) {

			var g = (h || event);

			if (g.keyCode == 9 || g.keyCode == 27) {

				globalActiveDHTMLGridObject.entBox.focus();

				globalActiveDHTMLGridObject.doKey({

					keyCode : g.keyCode,

					shiftKey : g.shiftKey,

					srcElement : "0"

				});

				return false

			}

		};

		this.obj.style.left = b[0] + "px";

		this.obj.style.top = b[1] + this.cell.offsetHeight + "px";

		if (this.cell.offsetWidth < 200) {

			var c = 200

		} else {

			var c = this.cell.offsetWidth

		}

		this.obj.style.width = c + 16 + "px";

		if (_isIE) {

			this.obj.select();

			this.obj.value = this.obj.value

		}

		this.obj.focus()

	};

	this.detach = function() {

		var b = "";

		b = this.obj.value;

		if (b == "") {

			this.cell._clearCell = true

		} else {

			this.cell._clearCell = false

		}

		this.setValue(b);

		document.body.removeChild(this.obj);

		this.obj = null;

		return this.val != this.getValue()

	};

	this.getValue = function() {

		if (this.obj) {

			return this.obj.value

		}

		if (this.cell._clearCell) {

			return ""

		}

		if (typeof this.cell._brval != "undefined") {

			return this.cell._brval

		}

		if ((!this.grid.multiLine)) {

			return this.cell._brval || this.cell.innerHTML

		} else {

			return this.cell._brval

					|| this.cell.innerHTML.replace(/<br[^>]*>/gi, "\n")

							._dhx_trim()

		}

	}

}

eXcell_txt.prototype = new eXcell;

function eXcell_txttxt(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.getValue = function() {

		if ((this.cell.firstChild)

				&& (this.cell.firstChild.tagName == "TEXTAREA")) {

			return this.cell.firstChild.value

		}

		if (this.cell._clearCell) {

			return ""

		}

		if ((!this.grid.multiLine) && this.cell._brval) {

			return this.cell._brval

		}

		return (_isIE ? this.cell.innerText : this.cell.textContent)

	};

	this.setValue = function(b) {

		this.cell._brval = b;

		if (!b || b.toString()._dhx_trim() == "") {

			b = " ";

			this.cell._clearCell = true

		} else {

			this.cell._clearCell = false

		}

		this.setCTxtValue(b)

	}

}

eXcell_txttxt.prototype = new eXcell_txt;

eXcell_txt.prototype.setValue = function(a) {

	this.cell._brval = a;

	if (!a || a.toString()._dhx_trim() == "") {

		a = "&nbsp;";

		this.cell._clearCell = true

	} else {

		this.cell._clearCell = false

	}

	if ((!this.grid.multiLine) || this.cell._clearCell) {

		this.setCValue(a, this.cell._brval)

	} else {

		this.setCValue(a.replace(/\n/g, "<br/>"), a)

	}

};

function eXcell_co(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		this.combo = (this.cell._combo || this.grid

				.getCombo(this.cell._cellIndex));

		this.editable = true

	}

	this.shiftNext = function() {

		var b = this.list.options[this.list.selectedIndex + 1];

		if (b) {

			b.selected = true

		}

		this.obj.value = this.list.options[this.list.selectedIndex].text;

		return true

	};

	this.shiftPrev = function() {

		if (this.list.selectedIndex != 0) {

			var b = this.list.options[this.list.selectedIndex - 1];

			if (b) {

				b.selected = true

			}

			this.obj.value = this.list.options[this.list.selectedIndex].text

		}

		return true

	};

	this.edit = function() {

		this.val = this.getValue();

		this.text = this.getText()._dhx_trim();

		var e = this.grid.getPosition(this.cell);

		this.obj = document.createElement("TEXTAREA");

		this.obj.className = "dhx_combo_edit";

		this.obj.style.height = (this.cell.offsetHeight - (this.grid.multiLine ? 9

				: 4))

				+ "px";

		this.obj.wrap = "soft";

		this.obj.style.textAlign = this.cell.style.textAlign;

		this.obj.onclick = function(m) {

			(m || event).cancelBubble = true

		};

		this.obj.onmousedown = function(m) {

			(m || event).cancelBubble = true

		};

		this.obj.value = this.text;

		this.obj.onselectstart = function(m) {

			if (!m) {

				m = event

			}

			m.cancelBubble = true;

			return true

		};

		var h = this;

		this.obj.onkeyup = function(o) {

			var n = (o || event).keyCode;

			if (n == 38 || n == 40 || n == 9) {

				return

			}

			var q = this.readonly ? String.fromCharCode(n) : this.value;

			var r = h.list.options;

			for (var m = 0; m < r.length; m++) {

				if (r[m].text.indexOf(q) == 0) {

					return r[m].selected = true

				}

			}

		};

		this.list = document.createElement("SELECT");

		this.list.className = "dhx_combo_select";

		this.list.style.width = this.cell.offsetWidth + "px";

		this.list.style.left = e[0] + "px";

		this.list.style.top = e[1] + this.cell.offsetHeight + "px";

		this.list.onclick = function(o) {

			var n = o || window.event;

			var m = n.target || n.srcElement;

			if (m.tagName == "OPTION") {

				m = m.parentNode

			}

			h.editable = false;

			h.grid.editStop();

			n.cancelBubble = true

		};

		var b = this.combo.getKeys();

		var g = false;

		var l = 0;

		for (var c = 0; c < b.length; c++) {

			var j = this.combo.get(b[c]);

			this.list.options[this.list.options.length] = new Option(j, b[c]);

			if (b[c] == this.val) {

				l = this.list.options.length - 1;

				g = true

			}

		}

		if (g == false) {

			this.list.options[this.list.options.length] = new Option(this.text,

					this.val === null ? "" : this.val);

			l = this.list.options.length - 1

		}

		document.body.appendChild(this.list);

		this.list.size = "6";

		this.cstate = 1;

		if (this.editable) {

			this.cell.innerHTML = ""

		} else {

			this.obj.style.width = "0px";

			this.obj.style.height = "0px"

		}

		this.cell.appendChild(this.obj);

		this.list.options[l].selected = true;

		if (this.editable) {

			this.obj.focus();

			this.obj.focus()

		}

		if (!this.editable) {

			this.obj.style.visibility = "hidden";

			this.obj.style.position = "absolute";

			this.list.focus();

			this.list.onkeydown = function(m) {

				m = m || window.event;

				h.grid.setActive(true);

				if (m.keyCode < 30) {

					return h.grid.doKey({

						target : h.cell,

						keyCode : m.keyCode,

						shiftKey : m.shiftKey,

						ctrlKey : m.ctrlKey

					})

				}

			}

		}

	};

	this.getValue = function() {

		return ((this.cell.combo_value == window.undefined) ? ""

				: this.cell.combo_value)

	};

	this.detach = function() {

		if (this.val != this.getValue()) {

			this.cell.wasChanged = true

		}

		if (this.list.parentNode != null) {

			if (this.editable) {

				var b = this.list.options[this.list.selectedIndex];

				if (b && b.text == this.obj.value) {

					this.setValue(this.list.value)

				} else {

					var c = (this.cell._combo || this.grid

							.getCombo(this.cell._cellIndex));

					var e = c.values._dhx_find(this.obj.value);

					if (e != -1) {

						this.setValue(c.keys[e])

					} else {

						this.setValue(this.cell.combo_value = this.obj.value)

					}

				}

			} else {

				this.setValue(this.list.value)

			}

		}

		if (this.list.parentNode) {

			this.list.parentNode.removeChild(this.list)

		}

		if (this.obj.parentNode) {

			this.obj.parentNode.removeChild(this.obj)

		}

		return this.val != this.getValue()

	}

}

eXcell_co.prototype = new eXcell;

eXcell_co.prototype.getText = function() {

	return this.cell.innerHTML

};

eXcell_co.prototype.setValue = function(e) {

	if (typeof (e) == "object") {

		var c = dhx4.ajax.xpath("./option", e);

		if (c.length) {

			this.cell._combo = new dhtmlXGridComboObject()

		}

		for (var b = 0; b < c.length; b++) {

			this.cell._combo.put(c[b].getAttribute("value"),

					c[b].firstChild ? c[b].firstChild.data : "")

		}

		e = e.firstChild.data

	}

	if ((e || "").toString()._dhx_trim() == "") {

		e = null

	}

	this.cell.combo_value = e;

	if (e !== null) {

		var a = (this.cell._combo || this.grid.getCombo(this.cell._cellIndex))

				.get(e);

		this.setCValue(a === null ? e : a, e)

	} else {

		this.setCValue("&nbsp;", e)

	}

};

function eXcell_coro(a) {

	this.base = eXcell_co;

	this.base(a);

	this.editable = false

}

eXcell_coro.prototype = new eXcell_co;

function eXcell_cotxt(a) {

	this.base = eXcell_co;

	this.base(a)

}

eXcell_cotxt.prototype = new eXcell_co;

eXcell_cotxt.prototype.getText = function() {

	return (_isIE ? this.cell.innerText : this.cell.textContent)

};

eXcell_cotxt.prototype.setValue = function(c) {

	if (typeof (c) == "object") {

		var b = dhx4.ajax.xpath("./option", c);

		if (b.length) {

			this.cell._combo = new dhtmlXGridComboObject()

		}

		for (var a = 0; a < b.length; a++) {

			this.cell._combo.put(b[a].getAttribute("value"),

					b[a].firstChild ? b[a].firstChild.data : "")

		}

		c = c.firstChild.data

	}

	if ((c || "").toString()._dhx_trim() == "") {

		c = null

	}

	if (c !== null) {

		this.setCTxtValue((this.cell._combo || this.grid

				.getCombo(this.cell._cellIndex)).get(c)

				|| c, c)

	} else {

		this.setCTxtValue(" ", c)

	}

	this.cell.combo_value = c

};

function eXcell_corotxt(a) {

	this.base = eXcell_co;

	this.base(a);

	this.editable = false

}

eXcell_corotxt.prototype = new eXcell_cotxt;

function eXcell_cp(a) {

	try {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	} catch (b) {

	}

	this.edit = function() {

		this.val = this.getValue();

		this.obj = document.createElement("SPAN");

		this.obj.style.border = "1px solid black";

		this.obj.style.position = "absolute";

		var c = this.grid.getPosition(this.cell);

		this.colorPanel(4, this.obj);

		document.body.appendChild(this.obj);

		this.obj.style.left = c[0] + "px";

		this.obj.style.zIndex = 1000;

		this.obj.style.top = c[1] + this.cell.offsetHeight + "px"

	};

	this.toolDNum = function(c) {

		if (c.length == 1) {

			c = "0" + c

		}

		return c

	};

	this.colorPanel = function(q, u) {

		var m = document.createElement("TABLE");

		u.appendChild(m);

		m.cellSpacing = 0;

		m.editor_obj = this;

		m.style.cursor = "default";

		m.onclick = function(r) {

			var n = r || window.event;

			var c = n.target || n.srcElement;

			var j = c.parentNode.parentNode.parentNode.editor_obj;

			if (j) {

				j.setValue(c._bg);

				j.grid.editStop()

			}

		};

		var h = 256 / q;

		for (var l = 0; l <= (256 / h); l++) {

			var e = m.insertRow(l);

			for (var o = 0; o <= (256 / h); o++) {

				for (var g = 0; g <= (256 / h); g++) {

					R = new Number(h * l) - (l == 0 ? 0 : 1);

					G = new Number(h * o) - (o == 0 ? 0 : 1);

					B = new Number(h * g) - (g == 0 ? 0 : 1);

					var t = this.toolDNum(R.toString(16)) + ""

							+ this.toolDNum(G.toString(16)) + ""

							+ this.toolDNum(B.toString(16));

					var s = e.insertCell(o);

					s.width = "10px";

					s.innerHTML = "&nbsp;";

					s.title = t.toUpperCase();

					s.style.backgroundColor = "#" + t;

					s._bg = "#" + t;

					if (this.val != null

							&& "#" + t.toUpperCase() == this.val.toUpperCase()) {

						s.style.border = "2px solid white"

					}

				}

			}

		}

	};

	this.getValue = function() {

		return this.cell.firstChild._bg || ""

	};

	this.getRed = function() {

		return Number(parseInt(this.getValue().substr(1, 2), 16))

	};

	this.getGreen = function() {

		return Number(parseInt(this.getValue().substr(3, 2), 16))

	};

	this.getBlue = function() {

		return Number(parseInt(this.getValue().substr(5, 2), 16))

	};

	this.detach = function() {

		if (this.obj.offsetParent != null) {

			document.body.removeChild(this.obj)

		}

		return this.val != this.getValue()

	}

}

eXcell_cp.prototype = new eXcell;

eXcell_cp.prototype.setValue = function(a) {

	this.setCValue("<div style='width:100%;height:"

			+ ((this.grid.multiLine ? "100%" : 23)) + ";background-color:"

			+ (a || "") + ";border:0px;'>&nbsp;</div>", a);

	this.cell.firstChild._bg = a

};

function eXcell_img(a) {

	try {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	} catch (b) {

	}

	this.getValue = function() {

		if (this.cell.firstChild.tagName == "IMG") {

			return this.cell.firstChild.src

					+ (this.cell.titFl != null ? "^" + this.cell._brval : "")

		} else {

			if (this.cell.firstChild.tagName == "A") {

				var c = this.cell.firstChild.firstChild.src

						+ (this.cell.titFl != null ? "^" + this.cell._brval

								: "");

				c += "^" + this.cell.lnk;

				if (this.cell.trg) {

					c += "^" + this.cell.trg

				}

				return c

			}

		}

	};

	this.isDisabled = function() {

		return true

	}

}

eXcell_img.prototype = new eXcell;

eXcell_img.prototype.getTitle = function() {

	return this.cell._brval

};

eXcell_img.prototype.setValue = function(c) {

	var b = c;

	if ((c || "").indexOf("^") != -1) {

		var a = c.split("^");

		c = a[0];

		b = this.cell._attrs.title || a[1];

		if (a.length > 2) {

			this.cell.lnk = a[2];

			if (a[3]) {

				this.cell.trg = a[3]

			}

		}

		this.cell.titFl = "1"

	}

	if (!this.grid.multiLine) {

		this.setCValue("<img src='" + this.grid.iconURL + (c || "")._dhx_trim()

				+ "' border='0' style='max-height:" + (this.grid._srdh - 4)

				+ "px'>", c)

	} else {

		this.setCValue("<img src='" + this.grid.iconURL + (c || "")._dhx_trim()

				+ "' border='0'>", c)

	}

	if (this.cell.lnk) {

		this.cell.innerHTML = "<a href='" + this.cell.lnk + "' target='"

				+ this.cell.trg + "'>" + this.cell.innerHTML + "</a>"

	}

	this.cell._brval = b

};

function eXcell_icon(a) {

	this.base = eXcell_ed;

	this.base(a);

	try {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	} catch (b) {

	}

	this.setValue = function(c) {

		this.cell._raw_value = c;

		this.setCValue('<div class="dhx_grid_icon"><i class="fa fa-'

				+ c.toString()._dhx_trim() + '"></i></div>')

	};

	this.getValue = function() {

		return this.cell._raw_value

	};

	this.isDisabled = function() {

		return true

	}

}

eXcell_icon.prototype = new eXcell_ed;

function eXcell_price(a) {

	this.base = eXcell_ed;

	this.base(a);

	this.getValue = function() {

		if (this.cell.childNodes.length > 1) {

			return this.cell.childNodes[1].innerHTML.toString()._dhx_trim()

		} else {

			return "0"

		}

	}

}

eXcell_price.prototype = new eXcell_ed;

eXcell_price.prototype.setValue = function(b) {

	if (isNaN(parseFloat(b))) {

		b = this.val || 0

	}

	var a = "green";

	if (b < 0) {

		a = "red"

	}

	this.setCValue("<span>$</span><span style='padding-right:2px;color:" + a

			+ ";'>" + b + "</span>", b)

};

function eXcell_dyn(a) {

	this.base = eXcell_ed;

	this.base(a);

	this.getValue = function() {

		if (!this.cell.firstChild.childNodes[1]) {

			return ""

		}

		var c = this.cell.firstChild.childNodes[1].innerHTML.toString()

				._dhx_trim();

		var b = this.grid._aplNFb(c, this.cell._cellIndex);

		if (isNaN(Number(b))) {

			return c

		}

		return b

	}

}

eXcell_dyn.prototype = new eXcell_ed;

eXcell_dyn.prototype.getValue = function() {

	var a = eXcell_ed.prototype.getValue.call(this);

	return

};

eXcell_dyn.prototype.setValue = function(c) {

	if (!c || isNaN(Number(c))) {

		if (c !== "") {

			c = 0

		}

	} else {

		if (c > 0) {

			var b = "green";

			var a = "dyn_up.gif"

		} else {

			if (c == 0) {

				var b = "black";

				var a = "dyn_.gif"

			} else {

				var b = "red";

				var a = "dyn_down.gif"

			}

		}

		c = this.grid._aplNF(c, this.cell._cellIndex)

	}

	this.setCValue("<div class='grid_cell_dyn'><img src='" + this.grid.imgURL

			+ "" + a + "'><span style='color:" + b + ";'>" + c

			+ "</span></div>", c)

};

function eXcell_ro(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.edit = function() {

	};

	this.isDisabled = function() {

		return true

	};

	this.getValue = function() {

		return this.cell._clearCell ? "" : this.cell.innerHTML.toString()

				._dhx_trim()

	}

}

eXcell_ro.prototype = new eXcell;

window.eXcell_hidden = function(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid

	}

	this.edit = function() {

	};

	this.isDisabled = function() {

		return true

	};

	this.getValue = function() {

		return this.cell.val

	}

};

eXcell_hidden.prototype = new eXcell;

eXcell_hidden.prototype.setValue = function(a) {

	this.cell.val = a

};

function eXcell_ron(a) {

	this.cell = a;

	this.grid = this.cell.parentNode.grid;

	this.edit = function() {

	};

	this.isDisabled = function() {

		return true

	};

	this.getValue = function() {

		return this.cell._clearCell ? "" : this.cell._orig_value

				|| this.grid._aplNFb(

						this.cell.innerHTML.toString()._dhx_trim(),

						this.cell._cellIndex).toString()

	}

}

eXcell_ron.prototype = new eXcell;

eXcell_ron.prototype.setValue = function(a) {

	if (a === 0) {

	} else {

		if (!a || a.toString()._dhx_trim() == "") {

			this.setCValue("&nbsp;");

			return this.cell._clearCell = true

		}

	}

	this.cell._orig_value = a;

	this.cell._clearCell = false;

	this.setCValue(a ? this.grid._aplNF(a, this.cell._cellIndex) : "0")

};

function eXcell_rotxt(a) {

	this.cell = a;

	this.grid = this.cell.parentNode.grid;

	this.edit = function() {

	};

	this.isDisabled = function() {

		return true

	};

	this.setValue = function(b) {

		if (!b) {

			b = " ";

			this.cell._clearCell = true

		} else {

			this.cell._clearCell = false

		}

		this.setCTxtValue(b)

	};

	this.getValue = function() {

		if (this.cell._clearCell) {

			return ""

		}

		return (_isIE ? this.cell.innerText : this.cell.textContent)

	}

}

eXcell_rotxt.prototype = new eXcell;

function dhtmlXGridComboObject() {

	this.keys = new dhtmlxArray();

	this.values = new dhtmlxArray();

	this.put = function(b, c) {

		for (var a = 0; a < this.keys.length; a++) {

			if (this.keys[a] == b) {

				this.values[a] = c;

				return true

			}

		}

		this.values[this.values.length] = c;

		this.keys[this.keys.length] = b

	};

	this.get = function(b) {

		for (var a = 0; a < this.keys.length; a++) {

			if (this.keys[a] == b) {

				return this.values[a]

			}

		}

		return null

	};

	this.clear = function() {

		this.keys = new dhtmlxArray();

		this.values = new dhtmlxArray()

	};

	this.remove = function(b) {

		for (var a = 0; a < this.keys.length; a++) {

			if (this.keys[a] == b) {

				this.keys._dhx_removeAt(a);

				this.values._dhx_removeAt(a);

				return true

			}

		}

	};

	this.size = function() {

		var a = 0;

		for (var b = 0; b < this.keys.length; b++) {

			if (this.keys[b] != null) {

				a++

			}

		}

		return a

	};

	this.getKeys = function() {

		var a = new Array(0);

		for (var b = 0; b < this.keys.length; b++) {

			if (this.keys[b] != null) {

				a[a.length] = this.keys[b]

			}

		}

		return a

	};

	this.save = function() {

		this._save = new Array();

		for (var a = 0; a < this.keys.length; a++) {

			this._save[a] = [ this.keys[a], this.values[a] ]

		}

	};

	this.restore = function() {

		if (this._save) {

			this.keys[a] = new Array();

			this.values[a] = new Array();

			for (var a = 0; a < this._save.length; a++) {

				this.keys[a] = this._save[a][0];

				this.values[a] = this._save[a][1]

			}

		}

	};

	return this

}

function Hashtable() {

	this.keys = new dhtmlxArray();

	this.values = new dhtmlxArray();

	return this

}

Hashtable.prototype = new dhtmlXGridComboObject;

if (typeof (window.dhtmlXCellObject) != "undefined") {

	dhtmlXCellObject.prototype.attachGrid = function(a) {

		this.callEvent("_onBeforeContentAttach", [ "grid" ]);

		var b = document.createElement("DIV");

		b.style.width = "100%";

		b.style.height = "100%";

		b.style.position = "relative";

		b.style.overflow = "hidden";

		this._attachObject(b);

		this.dataType = "grid";

		if (a && typeof a === "object" && !a.tagName) {

			a.parent = b;

			b = a

		}

		this.dataObj = new dhtmlXGridObject(b);

		this.dataObj.setSkin(this.conf.skin);

		if (typeof (window.dhtmlXTabBarCell) == "function"

				&& this instanceof window.dhtmlXTabBarCell

				&& navigator.userAgent.match(/7[\.\d]* mobile/gi) != null

				&& navigator.userAgent.match(/AppleWebKit/gi) != null) {

			this.dataObj.objBox.style.webkitOverflowScrolling = "auto"

		}

		if (this.conf.skin == "material"

				&& typeof (window.dhtmlXLayoutCell) == "function"

				&& this instanceof window.dhtmlXLayoutCell) {

			this.cell.childNodes[this.conf.idx.cont].style.overflow = "hidden"

		}

		if (this.conf.skin == "dhx_skyblue"

				&& typeof (window.dhtmlXWindowsCell) == "function"

				&& this instanceof window.dhtmlXWindowsCell) {

			this.dataObj.entBox.style.border = "1px solid #a4bed4";

			this.dataObj._sizeFix = 0

		} else {

			this.dataObj.entBox.style.border = "0px solid white";

			this.dataObj._sizeFix = 2

		}

		b = null;

		this.callEvent("_onContentAttach", []);

		return this.dataObj

	}

}

dhtmlXGridObject.prototype.enableDragAndDrop = function(a) {

	if (a == "temporary_disabled") {

		this.dADTempOff = false;

		a = true

	} else {

		this.dADTempOff = true

	}

	this.dragAndDropOff = dhx4.s2b(a);

	this._drag_validate = true;

	if (a) {

		this.objBox.ondragstart = function(b) {

			(b || event).cancelBubble = true;

			return false

		}

	}

};

dhtmlXGridObject.prototype.setDragBehavior = function(a) {

	this.dadmodec = this.dadmodefix = 0;

	switch (a) {

	case "child":

		this.dadmode = 0;

		this._sbmod = false;

		break;

	case "sibling":

		this.dadmode = 1;

		this._sbmod = false;

		break;

	case "sibling-next":

		this.dadmode = 1;

		this._sbmod = true;

		break;

	case "complex":

		this.dadmode = 2;

		this._sbmod = false;

		break;

	case "complex-next":

		this.dadmode = 2;

		this._sbmod = true;

		break

	}

};

dhtmlXGridObject.prototype.enableDragOrder = function(a) {

	this._dndorder = dhx4.s2b(a)

};

dhtmlXGridObject.prototype._checkParent = function(e, b) {

	var c = this._h2.get[e.idd].parent;

	if (!c.parent) {

		return

	}

	for (var a = 0; a < b.length; a++) {

		if (b[a] == c.id) {

			return true

		}

	}

	return this._checkParent(this.rowsAr[c.id], b)

};

dhtmlXGridObject.prototype._createDragNode = function(c, g) {

	this.editStop();

	if (window.dhtmlDragAndDrop.dragNode) {

		return null

	}

	if (!this.dADTempOff) {

		return null

	}

	c.parentObject = new Object();

	c.parentObject.treeNod = this;

	var m = this.callEvent("onBeforeDrag",

			[ c.parentNode.idd, c._cellIndex, g ]);

	if (!m) {

		return null

	}

	var h = new Array();

	h = this.getSelectedId();

	h = (((h) && (h != "")) ? h.split(this.delim) : []);

	var j = false;

	for (var b = 0; b < h.length; b++) {

		if (h[b] == c.parentNode.idd) {

			j = true

		}

	}

	if (!j) {

		this.selectRow(this.rowsAr[c.parentNode.idd], false, g.ctrlKey, false);

		if (!g.ctrlKey) {

			h = []

		}

		h[this.selMultiRows ? h.length : 0] = c.parentNode.idd

	}

	if (this.isTreeGrid()) {

		for (var b = h.length - 1; b >= 0; b--) {

			if (this._checkParent(this.rowsAr[h[b]], h)) {

				h.splice(b, 1)

			}

		}

	}

	var n = this;

	if (h.length && this._dndorder) {

		h.sort(function(o, e) {

			return (n.rowsAr[o].rowIndex > n.rowsAr[e].rowIndex ? 1 : -1)

		})

	}

	var a = this.getFirstParentOfType(_isIE ? g.srcElement : g.target, "TD");

	if (a) {

		this._dndExtra = a._cellIndex

	}

	this._dragged = new Array();

	for (var b = 0; b < h.length; b++) {

		if (this.rowsAr[h[b]]) {

			this._dragged[this._dragged.length] = this.rowsAr[h[b]];

			this.rowsAr[h[b]].treeNod = this

		}

	}

	c.parentObject.parentNode = c.parentNode;

	var l = document.createElement("div");

	l.innerHTML = (m !== true ? m : this.rowToDragElement(c.parentNode.idd));

	l.style.position = "absolute";

	l.className = "dragSpanDiv";

	return l

};

dhtmlXGridObject.prototype._createSdrgc = function() {

	this._sdrgc = document.createElement("DIV");

	this._sdrgc.innerHTML = "&nbsp;";

	this._sdrgc.className = "gridDragLine";

	this.objBox.appendChild(this._sdrgc)

};

function dragContext(x, w, v, u, t, s, q, r, o, n, g) {

	this.source = x || "grid";

	this.target = w || "grid";

	this.mode = v || "move";

	this.dropmode = u || "child";

	this.sid = t || 0;

	this.tid = s;

	this.sobj = q || null;

	this.tobj = r || null;

	this.sExtra = o || null;

	this.tExtra = n || null;

	this.before = g || false;

	return this

}

dragContext.prototype.valid = function() {

	if (this.sobj != this.tobj) {

		return true

	}

	if (this.sid == this.tid) {

		return false

	}

	if (this.target == "treeGrid") {

		var a = this.tid;

		while (a = this.tobj.getParentId(a)) {

			if (this.sid == a) {

				return false

			}

		}

	}

	return true

};

dragContext.prototype.close = function() {

	this.sobj = null;

	this.tobj = null

};

dragContext.prototype.copy = function() {

	return new dragContext(this.source, this.target, this.mode, this.dropmode,

			this.sid, this.tid, this.sobj, this.tobj, this.sExtra, this.tExtra,

			this.before)

};

dragContext.prototype.set = function(e, c) {

	this[e] = c;

	return this

};

dragContext.prototype.uid = function(e, c) {

	this.nid = this.sid;

	while (this.tobj.rowsAr[this.nid]) {

		this.nid = this.nid + ((new Date()).valueOf())

	}

	return this

};

dragContext.prototype.data = function() {

	if (this.sobj == this.tobj) {

		return this.sobj._getRowArray(this.sobj.rowsAr[this.sid])

	}

	if (this.source == "tree") {

		return this.tobj.treeToGridElement(this.sobj, this.sid, this.tid)

	} else {

		return this.tobj.gridToGrid(this.sid, this.sobj, this.tobj)

	}

};

dragContext.prototype.attrs = function() {

	if (this.source == "tree") {

		return {}

	} else {

		return this.sobj.rowsAr[this.sid]._attrs

	}

};

dragContext.prototype.childs = function() {

	if (this.source == "treeGrid") {

		return this.sobj._h2.get[this.sid]._xml_await ? this.sobj._h2.get[this.sid].has_kids

				: null

	}

	return null

};

dragContext.prototype.pid = function() {

	if (!this.tid) {

		return 0

	}

	if (!this.tobj._h2) {

		return 0

	}

	if (this.target == "treeGrid") {

		if (this.dropmode == "child") {

			return this.tid

		} else {

			var b = this.tobj.rowsAr[this.tid];

			var a = this.tobj._h2.get[b.idd].parent.id;

			if ((this.alfa) && (this.tobj._sbmod) && (b.nextSibling)) {

				var c = this.tobj._h2.get[b.nextSibling.idd].parent.id;

				if (c == this.tid) {

					return this.tid

				}

				if (c != a) {

					return c

				}

			}

			return a

		}

	}

};

dragContext.prototype.ind = function() {

	if (this.tid == window.unknown) {

		return this.tobj.rowsBuffer.length

	}

	if (this.target == "treeGrid") {

		if (this.dropmode == "child") {

			this.tobj.openItem(this.tid)

		} else {

			this.tobj.openItem(this.tobj.getParentId(this.tid))

		}

	}

	var a = this.tobj.rowsBuffer._dhx_find(this.tobj.rowsAr[this.tid]);

	if ((this.alfa) && (this.tobj._sbmod) && (this.dropmode == "sibling")) {

		var b = this.tobj.rowsAr[this.tid];

		if ((b.nextSibling)

				&& (this._h2.get[b.nextSibling.idd].parent.id == this.tid)) {

			return a + 1

		}

	}

	return (a + 1 + ((this.target == "treeGrid" && a >= 0 && this.tobj._h2.get[this.tobj.rowsBuffer[a].idd].state == "minus") ? this.tobj

			._getOpenLenght(this.tobj.rowsBuffer[a].idd, 0)

			: 0))

};

dragContext.prototype.img = function() {

	if ((this.target != "grid") && (this.sobj._h2)) {

		return this.sobj.getItemImage(this.sid)

	} else {

		return null

	}

};

dragContext.prototype.slist = function() {

	var b = new Array();

	for (var a = 0; a < this.sid.length; a++) {

		b[b.length] = this.sid[a][(this.source == "tree") ? "id" : "idd"]

	}

	return b.join(",")

};

dhtmlXGridObject.prototype._drag = function(o, g, n, q) {

	if (this._realfake) {

		return this._fake._drag()

	}

	var m = (this.lastLanding);

	if (this._autoOpenTimer) {

		window.clearTimeout(this._autoOpenTimer)

	}

	var e = n.parentNode;

	var b = o.parentObject;

	if (!e.idd) {

		e.grid = this;

		this.dadmodefix = 0

	}

	var l = new dragContext(0, 0, 0,

			((e.grid.dadmode == 1 || e.grid.dadmodec) ? "sibling" : "child"));

	if (b && b.childNodes) {

		l.set("source", "tree").set("sobj", b.treeNod).set("sid",

				l.sobj._dragged)

	} else {

		if (!b) {

			return true

		}

		if (b.treeNod.isTreeGrid && b.treeNod.isTreeGrid()) {

			l.set("source", "treeGrid")

		}

		l.set("sobj", b.treeNod).set("sid", l.sobj._dragged)

	}

	if (e.grid.isTreeGrid()) {

		l.set("target", "treeGrid")

	} else {

		l.set("dropmode", "sibling")

	}

	l.set("tobj", e.grid).set("tid", e.idd);

	if (((l.tobj.dadmode == 2) && (l.tobj.dadmodec == 1))

			&& (l.tobj.dadmodefix < 0)) {

		if (l.tobj.obj.rows[1].idd != l.tid) {

			l.tid = e.previousSibling.idd

		} else {

			if (this._h2 && l.tid) {

				l.before = true

			} else {

				l.tid = 0

			}

		}

	}

	var a = this.getFirstParentOfType(q, "TD");

	if (a) {

		l.set("tExtra", a._cellIndex)

	}

	if (a) {

		l.set("sExtra", l.sobj._dndExtra)

	}

	if (l.sobj.dpcpy) {

		l.set("mode", "copy")

	}

	if (l.tobj._realfake) {

		l.tobj = l.tobj._fake

	}

	if (l.sobj._realfake) {

		l.sobj = l.sobj._fake

	}

	l.tobj._clearMove();

	if (b && b.treeNod && b.treeNod._nonTrivialRow) {

		b.treeNod._nonTrivialRow(this, l.tid, l.dropmode, b)

	} else {

		l.tobj.dragContext = l;

		if (!l.tobj.callEvent("onDrag", [ l.slist(), l.tid, l.sobj, l.tobj,

				l.sExtra, l.tExtra ])) {

			return l.tobj.dragContext = null

		}

		var r = new Array();

		if (typeof (l.sid) == "object") {

			var j = l.copy();

			for (var h = 0; h < l.sid.length; h++) {

				if (!j.set("alfa", (!h)).set("sid",

						l.sid[h][(l.source == "tree" ? "id" : "idd")]).valid()) {

					continue

				}

				j.tobj._dragRoutine(j);

				if (j.target == "treeGrid" && j.dropmode == "child") {

					j.tobj.openItem(j.tid)

				}

				r[r.length] = j.nid;

				j.set("dropmode", "sibling").set("tid", j.nid)

			}

			j.close()

		} else {

			l.tobj._dragRoutine(l)

		}

		if (l.tobj.laterLink) {

			l.tobj.laterLink()

		}

		l.tobj.callEvent("onDrop", [ l.slist(), l.tid, r.join(","), l.sobj,

				l.tobj, l.sExtra, l.tExtra ])

	}

	l.tobj.dragContext = null;

	l.close()

};

dhtmlXGridObject.prototype._dragRoutine = function(q) {

	if ((q.sobj == q.tobj) && (q.source == "grid") && (q.mode == "move")

			&& !this._fake) {

		if (q.sobj._dndProblematic) {

			return

		}

		var n = q.sobj.rowsAr[q.sid];

		var o = q.sobj.rowsCol._dhx_find(n);

		q.sobj.rowsCol._dhx_removeAt(q.sobj.rowsCol._dhx_find(n));

		q.sobj.rowsBuffer._dhx_removeAt(q.sobj.rowsBuffer._dhx_find(n));

		q.sobj.rowsBuffer._dhx_insertAt(q.ind(), n);

		if (q.tobj._fake) {

			q.tobj._fake.rowsCol._dhx_removeAt(o);

			var r = q.tobj._fake.rowsAr[q.sid];

			r.parentNode.removeChild(r)

		}

		q.sobj

				._insertRowAt(

						n,

						q.ind()

								- (this.pagingOn ? ((this.currentPage - 1) * this.rowsBufferOutSize)

										: 0));

		q.nid = q.sid;

		q.sobj.callEvent("onGridReconstructed", []);

		return

	}

	var m;

	if (this._h2 && typeof q.tid != "undefined" && q.dropmode == "sibling"

			&& (this._sbmod || q.tid)) {

		if (q.before) {

			m = q.uid().tobj.addRowBefore(q.nid, q.data(), q.tid, q.img(), q

					.childs())

		} else {

			if (q.alfa && this._sbmod && this._h2.get[q.tid].childs.length) {

				this.openItem(q.tid);

				m = q.uid().tobj.addRowBefore(q.nid, q.data(),

						this._h2.get[q.tid].childs[0].id, q.img(), q.childs())

			} else {

				m = q.uid().tobj.addRowAfter(q.nid, q.data(), q.tid, q.img(), q

						.childs())

			}

		}

	} else {

		m = q.uid().tobj.addRow(q.nid, q.data(), q.ind(), q.pid(), q.img(), q

				.childs())

	}

	m._attrs = q.attrs();

	if (q.source == "tree") {

		this.callEvent("onRowAdded", [ q.nid ]);

		var a = q.sobj._globalIdStorageFind(q.sid);

		if (a.childsCount) {

			var h = q.copy().set("tid", q.nid).set("dropmode",

					q.target == "grid" ? "sibling" : "child");

			for (var e = 0; e < a.childsCount; e++) {

				q.tobj._dragRoutine(h.set("sid", a.childNodes[e].id));

				if (q.mode == "move") {

					e--

				}

			}

			h.close()

		}

	} else {

		q.tobj._copyUserData(q);

		this.callEvent("onRowAdded", [ q.nid ]);

		if ((q.source == "treeGrid")) {

			if (q.sobj == q.tobj) {

				m._xml = q.sobj.rowsAr[q.sid]._xml

			}

			var g = q.sobj._h2.get[q.sid];

			if ((g) && (g.childs.length)) {

				var h = q.copy().set("tid", q.nid);

				if (q.target == "grid") {

					h.set("dropmode", "sibling")

				} else {

					if (!h.tobj.kidsXmlFile) {

						h.tobj.openItem(q.tid)

					}

					h.set("dropmode", "child")

				}

				var b = g.childs.length;

				if (!h.tobj.kidsXmlFile) {

					for (var e = 0; e < b; e++) {

						q.sobj.render_row_tree(null, g.childs[e].id);

						q.tobj._dragRoutine(h.set("sid", g.childs[e].id));

						if (b != g.childs.length) {

							e--;

							b = g.childs.length

						}

					}

				}

				h.close()

			}

		}

	}

	if (q.mode == "move") {

		q.sobj[(q.source == "tree") ? "deleteItem" : "deleteRow"](q.sid);

		if ((q.sobj == q.tobj) && (!q.tobj.rowsAr[q.sid])) {

			q.tobj.changeRowId(q.nid, q.sid);

			q.nid = q.sid

		}

	}

};

dhtmlXGridObject.prototype.gridToGrid = function(e, a, c) {

	var g = new Array();

	for (var b = 0; b < a.hdr.rows[0].cells.length; b++) {

		g[b] = a.cells(e, b).getValue()

	}

	return g

};

dhtmlXGridObject.prototype.checkParentLine = function(a, b) {

	if ((!this._h2) || (!b) || (!a)) {

		return false

	}

	if (a.id == b) {

		return true

	} else {

		return this.checkParentLine(a.parent, b)

	}

};

dhtmlXGridObject.prototype._dragIn = function(h, e, b, j) {

	if (!this.dADTempOff) {

		return 0

	}

	var a = this.isTreeGrid();

	var g = e.parentNode.idd ? e.parentNode : e.parentObject;

	if (this._drag_validate) {

		if (h.parentNode == e.parentNode) {

			return 0

		}

		if ((a)

				&& (this == g.grid)

				&& ((this.checkParentLine(this._h2.get[h.parentNode.idd],

						e.parentNode.idd)))) {

			return 0

		}

	}

	if (!this.callEvent("onDragIn", [ g.idd || g.id, h.parentNode.idd,

			g.grid || g.treeNod, (h.grid || h.parentNode.grid) ])) {

		return this._setMove(h, b, j, true)

	}

	this._setMove(h, b, j);

	if ((a) && (h.parentNode.expand != "")) {

		var c = this;

		this._autoOpenTimer = window.setTimeout(function() {

			c._autoOpenItem(null, c);

			c = null

		}, 1000);

		this._autoOpenId = h.parentNode.idd

	} else {

		if (this._autoOpenTimer) {

			window.clearTimeout(this._autoOpenTimer)

		}

	}

	return h

};

dhtmlXGridObject.prototype._autoOpenItem = function(a, b) {

	b.openItem(b._autoOpenId)

};

dhtmlXGridObject.prototype._dragOut = function(b) {

	this._clearMove();

	var a = b.parentNode.parentObject ? b.parentObject.id : b.parentNode.idd;

	this.callEvent("onDragOut", [ a ]);

	if (this._autoOpenTimer) {

		window.clearTimeout(this._autoOpenTimer)

	}

};

dhtmlXGridObject.prototype._setMove = function(h, b, l, g) {

	if (!h.parentNode.idd) {

		return

	}

	var c = dhx4.absTop(h);

	var a = dhx4.absTop(this.objBox);

	if ((c - a) > (parseInt(this.objBox.offsetHeight) - 50)) {

		this.objBox.scrollTop = parseInt(this.objBox.scrollTop) + 20

	}

	if ((c - a + parseInt(this.objBox.scrollTop)) < (parseInt(this.objBox.scrollTop) + 30)) {

		this.objBox.scrollTop = parseInt(this.objBox.scrollTop) - 20

	}

	if (g) {

		return 0

	}

	if (this.dadmode == 2) {

		var j = l

				- c

				+ (document.body.scrollTop || document.documentElement.scrollTop)

				- 2 - h.offsetHeight / 2;

		if ((Math.abs(j) - h.offsetHeight / 6) > 0) {

			this.dadmodec = 1;

			if (j < 0) {

				this.dadmodefix = -1

			} else {

				this.dadmodefix = 1

			}

		} else {

			this.dadmodec = 0

		}

	} else {

		this.dadmodec = this.dadmode

	}

	if (this.dadmodec) {

		if (!this._sdrgc) {

			this._createSdrgc()

		}

		this._sdrgc.style.display = "block";

		this._sdrgc.style.top = c - a + parseInt(this.objBox.scrollTop)

				+ ((this.dadmodefix >= 0) ? h.offsetHeight : 0) + "px"

	} else {

		this._llSelD = h;

		if (h.parentNode.tagName == "TR") {

			for (var e = 0; e < h.parentNode.childNodes.length; e++) {

				var j = h.parentNode.childNodes[e];

				j._bgCol = j.style.backgroundColor;

				j.style.backgroundColor = "#FFCCCC"

			}

		}

	}

};

dhtmlXGridObject.prototype._clearMove = function() {

	if (this._sdrgc) {

		this._sdrgc.style.display = "none"

	}

	if ((this._llSelD) && (this._llSelD.parentNode.tagName == "TR")) {

		var b = this._llSelD.parentNode.childNodes;

		for (var a = 0; a < b.length; a++) {

			b[a].style.backgroundColor = b[a]._bgCol

		}

	}

	this._llSelD = null

};

dhtmlXGridObject.prototype.rowToDragElement = function(a) {

	var b = this.cells(a, 0).getValue();

	return b

};

dhtmlXGridObject.prototype._copyUserData = function(e) {

	if (!e.tobj.UserData[e.nid] || e.tobj != e.sobj) {

		e.tobj.UserData[e.nid] = new Hashtable()

	} else {

		return

	}

	var b = e.sobj.UserData[e.sid];

	var a = e.tobj.UserData[e.nid];

	if (b) {

		a.keys = a.keys.concat(b.keys);

		a.values = a.values.concat(b.values)

	}

};

dhtmlXGridObject.prototype.moveRow = function(c, e, a, b) {

	switch (e) {

	case "row_sibling":

		this.moveRowTo(c, a, "move", "sibling", this, b);

		break;

	case "up":

		this.moveRowUp(c);

		break;

	case "down":

		this.moveRowDown(c);

		break

	}

};

dhtmlXGridObject.prototype._nonTrivialNode = function(o, n, j, l, c) {

	if ((o.callEvent) && (!c)) {

		if (!o.callEvent("onDrag", [ l.idd, n.id, (j ? j.id : null), this, o ])) {

			return false

		}

	}

	var m = l.idd;

	var a = m;

	while (o._idpull[a]) {

		a += (new Date()).getMilliseconds().toString()

	}

	var g = (this.isTreeGrid() ? this.getItemImage(m) : "");

	if (j) {

		for (e = 0; e < n.childsCount; e++) {

			if (n.childNodes[e] == j) {

				break

			}

		}

		if (e != 0) {

			j = n.childNodes[e - 1]

		} else {

			st = "TOP";

			j = ""

		}

	}

	var b = o._attachChildNode(n, a, this.gridToTreeElement(o, a, m), "", g, g,

			g, "", "", j);

	if (this._h2) {

		var h = this._h2.get[m];

		if (h.childs.length) {

			for (var e = 0; e < h.childs.length; e++) {

				this._nonTrivialNode(o, b, 0, this.rowsAr[h.childs[e].id], 1);

				if (!this.dpcpy) {

					e--

				}

			}

		}

	}

	if (!this.dpcpy) {

		this.deleteRow(m)

	}

	if ((o.callEvent) && (!c)) {

		o.callEvent("onDrop", [ a, n.id, (j ? j.id : null), this, o ])

	}

};

dhtmlXGridObject.prototype.gridToTreeElement = function(b, c, a) {

	return this.cells(a, 0).getValue()

};

dhtmlXGridObject.prototype.treeToGridElement = function(e, g, a) {

	var b = new Array();

	var h = this.cellType._dhx_find("tree");

	if (h == -1) {

		h = 0

	}

	for (var c = 0; c < this.getColumnCount(); c++) {

		b[b.length] = (c != h) ? (e.getUserData(g, this.getColumnId(c)) || "")

				: e.getItemText(g)

	}

	return b

};

dhtmlXGridObject.prototype.moveRowTo = function(e, b, j, h, a, g) {

	var l = new dragContext((a || this).isTreeGrid() ? "treeGrid" : "grid",

			(g || this).isTreeGrid() ? "treeGrid" : "grid", j, h || "sibling",

			e, b, a || this, g || this);

	l.tobj._dragRoutine(l);

	l.close();

	return l.nid

};

dhtmlXGridObject.prototype.enableMercyDrag = function(a) {

	this.dpcpy = dhx4.s2b(a)

};

dhtmlXGridObject.prototype.toPDF = function(e, n, s, q, l, x) {

	var g = {

		row : (this.getSelectedRowId() || "").split(this.delim),

		col : this.getSelectedCellIndex()

	};

	if (g.row === null || g.col === -1) {

		g = false

	} else {

		if (g.row) {

			for (var t = 0; t < g.row.length; t++) {

				if (g.row[t]) {

					var b = this.cells(g.row[t], g.col).cell;

					b.parentNode.className = b.parentNode.className.replace(

							" rowselected", "");

					b.className = b.className.replace(" cellselected", "");

					g.row[t] = b

				}

			}

		} else {

			g = false

		}

	}

	n = n || "color";

	var u = n == "full_color";

	var a = this;

	a._asCDATA = true;

	if (typeof (x) === "undefined") {

		this.target = ' target="_blank"'

	} else {

		this.target = x

	}

	eXcell_ch.prototype.getContent = function() {

		return this.getValue()

	};

	eXcell_ra.prototype.getContent = function() {

		return this.getValue()

	};

	function w(A) {

		var I = [];

		for (var F = 1; F < a.hdr.rows.length; F++) {

			I[F] = [];

			for (var E = 0; E < a._cCount; E++) {

				var K = a.hdr.rows[F].childNodes[E];

				if (!I[F][E]) {

					I[F][E] = [ 0, 0 ]

				}

				if (K) {

					I[F][K._cellIndexS] = [ K.colSpan, K.rowSpan ]

				}

			}

		}

		var H = "<rows profile='" + A + "'";

		if (s) {

			H += " header='" + s + "'"

		}

		if (q) {

			H += " footer='" + q + "'"

		}

		H += "><head>"

				+ a._serialiseExportConfig(I).replace(/^<head/, "<columns")

						.replace(/head>$/, "columns>");

		for (var F = 2; F < a.hdr.rows.length; F++) {

			var y = 0;

			var N = a.hdr.rows[F];

			var J = "";

			for (var E = 0; E < a._cCount; E++) {

				if ((a._srClmn && !a._srClmn[E])

						|| (a._hrrar[E] && (!a._fake || E >= a._fake.hdrLabels.length))) {

					y++;

					continue

				}

				var M = I[F][E];

				var L = ((M[0] && M[0] > 1) ? ' colspan="' + M[0] + '" ' : "");

				if (M[1] && M[1] > 1) {

					L += ' rowspan="' + M[1] + '" ';

					y = -1

				}

				var z = "";

				var D = N;

				if (a._fake && E < a._fake._cCount) {

					D = a._fake.hdr.rows[F]

				}

				for (var C = 0; C < D.cells.length; C++) {

					if (D.cells[C]._cellIndexS == E) {

						if (D.cells[C].getElementsByTagName("SELECT").length) {

							z = ""

						} else {

							z = _isIE ? D.cells[C].innerText

									: D.cells[C].textContent

						}

						z = z.replace(/[ \n\r\t\xA0]+/, " ");

						break

					}

				}

				if (!z || z == " ") {

					y++

				}

				J += "<column" + L + "><![CDATA[" + z + "]]></column>"

			}

			if (y != a._cCount) {

				H += "\n<columns>" + J + "</columns>"

			}

		}

		H += "</head>\n";

		H += m();

		return H

	}

	function c() {

		var y = [];

		if (l) {

			for (var z = 0; z < l.length; z++) {

				y.push(r(a.getRowIndex(l[z])))

			}

		} else {

			for (var z = 0; z < a.getRowsNum(); z++) {

				y.push(r(z))

			}

		}

		return y.join("\n")

	}

	function m() {

		var A = [ "<foot>" ];

		if (!a.ftr) {

			return ""

		}

		for (var C = 1; C < a.ftr.rows.length; C++) {

			A.push("<columns>");

			var F = a.ftr.rows[C];

			for (var z = 0; z < a._cCount; z++) {

				if (a._srClmn && !a._srClmn[z]) {

					continue

				}

				if (a._hrrar[z] && (!a._fake || z >= a._fake.hdrLabels.length)) {

					continue

				}

				for (var y = 0; y < F.cells.length; y++) {

					var E = "";

					var D = "";

					if (F.cells[y]._cellIndexS == z) {

						E = _isIE ? F.cells[y].innerText

								: F.cells[y].textContent;

						E = E.replace(/[ \n\r\t\xA0]+/, " ");

						if (F.cells[y].colSpan && F.cells[y].colSpan != 1) {

							D = " colspan='" + F.cells[y].colSpan + "' "

						}

						if (F.cells[y].rowSpan && F.cells[y].rowSpan != 1) {

							D = " rowspan='" + F.cells[y].rowSpan + "' "

						}

						break

					}

				}

				A.push("<column" + D + "><![CDATA[" + E + "]]></column>")

			}

			A.push("</columns>")

		}

		A.push("</foot>");

		return A.join("\n")

	}

	function j(z, y) {

		return (window.getComputedStyle ? (window.getComputedStyle(z, null)[y])

				: (z.currentStyle ? z.currentStyle[y] : null))

				|| ""

	}

	function r(C) {

		if (!a.rowsBuffer[C]) {

			return ""

		}

		var y = a.render_row(C);

		if (y.style.display == "none") {

			return ""

		}

		var z = a.isTreeGrid() ? ' level="' + a.getLevel(y.idd) + '"' : "";

		var H = "<row" + z + ">";

		for (var E = 0; E < a._cCount; E++) {

			if (((!a._srClmn) || (a._srClmn[E]))

					&& (!a._hrrar[E] || (a._fake && E < a._fake.hdrLabels.length))) {

				var L = a.cells(y.idd, E);

				if (u) {

					var D = j(L.cell, "color");

					var K = j(L.cell, "backgroundColor");

					var J = j(L.cell, "font-weight") || j(L.cell, "fontWeight");

					var F = j(L.cell, "font-style") || j(L.cell, "fontStyle");

					var I = j(L.cell, "text-align") || j(L.cell, "textAlign");

					var A = j(L.cell, "font-family") || j(L.cell, "fontFamily");

					if (K == "transparent" || K == "rgba(0, 0, 0, 0)") {

						K = "rgb(255,255,255)"

					}

					H += "<cell bgColor='" + K + "' textColor='" + D

							+ "' bold='" + J + "' italic='" + F + "' align='"

							+ I + "' font='" + A + "'>"

				} else {

					H += "<cell>"

				}

				H += "<![CDATA["

						+ (L.getContent ? L.getContent() : L.getTitle())

						+ "]]></cell>"

			}

		}

		return H + "</row>"

	}

	function o() {

		var y = "</rows>";

		return y

	}

	var v = document.createElement("div");

	v.style.display = "none";

	document.body.appendChild(v);

	var h = "form_" + a.uid();

	v.innerHTML = '<form id="'

			+ h

			+ '" method="post" action="'

			+ e

			+ '" accept-charset="utf-8"  enctype="application/x-www-form-urlencoded"'

			+ this.target

			+ '><input type="hidden" name="grid_xml" id="grid_xml"/> </form>';

	document.getElementById(h).firstChild.value = encodeURIComponent(w(n)

			.replace("\u2013", "-")

			+ c() + o());

	document.getElementById(h).submit();

	v.parentNode.removeChild(v);

	a = null;

	if (g && g.row.length) {

		for (var t = 0; t < g.row.length; t++) {

			g.row[t].parentNode.className += " rowselected";

			if (g.row.length == 1) {

				g.row[t].className += " cellselected"

			}

		}

	}

	g = null

};

dhtmlXGridObject.prototype._serialiseExportConfig = function(h) {

	function g(j) {

		if (typeof (j) !== "string") {

			return j

		}

		j = j.replace(/&/g, "&amp;");

		j = j.replace(/"/g, "&quot;");

		j = j.replace(/'/g, "&apos;");

		j = j.replace(/</g, "&lt;");

		j = j.replace(/>/g, "&gt;");

		return j

	}

	var b = "<head>";

	for (var c = 0; c < this.hdr.rows[0].cells.length; c++) {

		if (this._srClmn && !this._srClmn[c]) {

			continue

		}

		if (this._hrrar[c] && (!this._fake || c >= this._fake.hdrLabels.length)) {

			continue

		}

		var e = this.fldSort[c];

		if (e == "cus") {

			e = this._customSorts[c].toString();

			e = e.replace(/function[\ ]*/, "").replace(/\([^\f]*/, "")

		}

		var n = h[1][c];

		var l = ((n[1] && n[1] > 1) ? ' rowspan="' + n[1] + '" ' : "")

				+ ((n[0] && n[0] > 1) ? ' colspan="' + n[0] + '" ' : "");

		b += "<column "

				+ l

				+ " width='"

				+ this.getColWidth(c)

				+ "' align='"

				+ this.cellAlign[c]

				+ "' type='"

				+ this.cellType[c]

				+ "' hidden='"

				+ ((this.isColumnHidden && this.isColumnHidden(c)) ? "true"

						: "false")

				+ "' sort='"

				+ (e || "na")

				+ "' color='"

				+ (this.columnColor[c] || "")

				+ "'"

				+ (this.columnIds[c] ? (" id='" + this.columnIds[c] + "'") : "")

				+ ">";

		if (this._asCDATA) {

			b += "<![CDATA[" + this.getColumnLabel(c) + "]]>"

		} else {

			b += this.getColumnLabel(c)

		}

		var m = this.combos[c] ? this.getCombo(c) : null;

		if (m) {

			for (var a = 0; a < m.keys.length; a++) {

				b += "<option value='" + g(m.keys[a]) + "'><![CDATA["

						+ m.values[a] + "]]></option>"

			}

		}

		b += "</column>"

	}

	return b += "</head>"

};

if (window.eXcell_sub_row_grid) {

	window.eXcell_sub_row_grid.prototype.getContent = function() {

		return ""

	}

}

dhtmlXGridObject.prototype.toExcel = function(a, e, j, h, b) {

	if (!document.getElementById("ifr")) {

		var g = document.createElement("iframe");

		g.style.display = "none";

		g.setAttribute("name", "dhx_export_iframe");

		g.setAttribute("src", "");

		g.setAttribute("id", "dhx_export_iframe");

		document.body.appendChild(g)

	}

	var c = ' target="dhx_export_iframe"';

	this.toPDF(a, e, j, h, b, c)

};

dhtmlXGridObject.prototype.filterBy = function(c, e, b) {

	if (this.isTreeGrid()) {

		return this.filterTreeBy(c, e, b)

	}

	if (this._f_rowsBuffer) {

		if (!b) {

			this.rowsBuffer = dhtmlxArray([].concat(this._f_rowsBuffer));

			if (this._fake) {

				this._fake.rowsBuffer = this.rowsBuffer

			}

		}

	} else {

		this._f_rowsBuffer = [].concat(this.rowsBuffer)

	}

	if (!this.rowsBuffer.length) {

		return

	}

	var g = true;

	this.dma(true);

	if (typeof (c) == "object") {

		for (var a = 0; a < e.length; a++) {

			this._filterA(c[a], e[a])

		}

	} else {

		this._filterA(c, e)

	}

	this.dma(false);

	if (this.pagingOn

			&& this.rowsBuffer.length / this.rowsBufferOutSize < (this.currentPage - 1)) {

		this.changePage(0)

	}

	this._reset_view();

	this.callEvent("onGridReconstructed", [])

};

dhtmlXGridObject.prototype._filterA = function(b, c) {

	if (c == "") {

		return

	}

	var e = true;

	if (typeof (c) == "function") {

		e = false

	} else {

		c = (c || "").toString().toLowerCase()

	}

	if (!this.rowsBuffer.length) {

		return

	}

	for (var a = this.rowsBuffer.length - 1; a >= 0; a--) {

		if (e ? (this._get_cell_value(this.rowsBuffer[a], b).toString()

				.toLowerCase().indexOf(c) == -1) : (!c

				.call(this, this._get_cell_value(this.rowsBuffer[a], b),

						this.rowsBuffer[a].idd))) {

			this.rowsBuffer.splice(a, 1)

		}

	}

};

dhtmlXGridObject.prototype.getFilterElement = function(a) {

	if (!this.filters) {

		return

	}

	for (var b = 0; b < this.filters.length; b++) {

		if (this.filters[b][1] == a) {

			return (this.filters[b][0].combo || this.filters[b][0])

		}

	}

	return null

};

dhtmlXGridObject.prototype.collectValues = function(e) {

	var r = this.dhxevs.data.oncollectvalues;

	if (r) {

		var n = true;

		for ( var o in r) {

			var u = r[o].call(this, e);

			if (u !== true) {

				n = u || n

			}

		}

		if (n !== true) {

			return n

		}

	}

	if (this.isTreeGrid()) {

		return this.collectTreeValues(e)

	}

	this.dma(true);

	this._build_m_order();

	e = this._m_order ? this._m_order[e] : e;

	var l = {};

	var h = [];

	var b = this._f_rowsBuffer || this.rowsBuffer;

	for (var g = 0; g < b.length; g++) {

		var a = this._get_cell_value(b[g], e);

		if (a

				&& (!b[g]._childIndexes || b[g]._childIndexes[e] != b[g]._childIndexes[e - 1])) {

			l[a] = true

		}

	}

	this.dma(false);

	var m = (this.combos[e] || (this._col_combos && this._col_combos[e] ? this._col_combos[e]

			: ((this._sub_trees && this._sub_trees[e]) ? this._sub_trees[e][0]

					: false)));

	for ( var j in l) {

		if (l[j] === true) {

			if (m) {

				if (m.get && m.get(j)) {

					j = m.get(j)

				} else {

					if (m.getOption && m.getOption(j)) {

						j = m.getOption(j).text

					} else {

						if (m.getItemText) {

							var q = m.getItemText(j);

							var s = this._sub_trees[e][1] = this._sub_trees[e][1]

									|| {};

							s[q] = j;

							j = q

						}

					}

				}

			}

			h.push(j)

		}

	}

	return h.sort()

};

dhtmlXGridObject.prototype._build_m_order = function() {

	if (this._c_order) {

		this._m_order = [];

		for (var a = 0; a < this._c_order.length; a++) {

			this._m_order[this._c_order[a]] = a

		}

	}

};

dhtmlXGridObject.prototype.filterByAll = function() {

	var e = [];

	var c = [];

	this._build_m_order();

	for (var g = 0; g < this.filters.length; g++) {

		var j = this._m_order ? this._m_order[this.filters[g][1]]

				: this.filters[g][1];

		if (j >= this._cCount) {

			continue

		}

		c.push(j);

		var l = this.filters[g][0].old_value = this.filters[g][0].value;

		if (this.filters[g][0]._filter) {

			l = this.filters[g][0]._filter()

		}

		var h;

		if (typeof l != "function"

				&& (h = (this.combos[j] || ((this._col_combos && this._col_combos[j]) ? this._col_combos[j]

						: ((this._sub_trees && this._sub_trees[j]) ? this._sub_trees[j][1]

								: false))))) {

			if (h.values) {

				j = h.values._dhx_find(l);

				l = (j == -1) ? l : h.keys[j]

			} else {

				if (h.getOptionByLabel) {

					l = (h.getOptionByLabel(l) ? h.getOptionByLabel(l).value

							: l)

				} else {

					l = h[l]

				}

			}

		}

		e.push(l)

	}

	if (!this.callEvent("onFilterStart", [ c, e ])) {

		return

	}

	this.filterBy(c, e);

	if (this._cssEven) {

		this._fixAlterCss()

	}

	this.callEvent("onFilterEnd", [ this.filters ]);

	if (this._f_rowsBuffer

			&& this.rowsBuffer.length == this._f_rowsBuffer.length) {

		this._f_rowsBuffer = null

	}

};

dhtmlXGridObject.prototype.makeFilter = function(g, c, b) {

	if (!this.filters) {

		this.filters = []

	}

	if (typeof (g) != "object") {

		g = document.getElementById(g)

	}

	if (!g) {

		return

	}

	var a = this;

	if (!g.style.width) {

		g.style.width = "90%"

	}

	if (g.tagName == "SELECT") {

		this.filters.push([ g, c ]);

		this._loadSelectOptins(g, c);

		g.onchange = function() {

			a.filterByAll()

		};

		if (_isIE) {

			g.style.marginTop = "1px"

		}

		this.attachEvent("onEditCell", function(j, h, l) {

			this._build_m_order();

			if (j == 2 && this.filters

					&& (this._m_order ? (l == this._m_order[c]) : (l == c))) {

				this._loadSelectOptins(g, c)

			}

			return true

		})

	} else {

		if (g.tagName == "INPUT") {

			this.filters.push([ g, c ]);

			g.old_value = g.value = "";

			g.onkeydown = function() {

				if (this._timer) {

					window.clearTimeout(this._timer)

				}

				this._timer = window.setTimeout(function() {

					if (g.value != g.old_value) {

						a.filterByAll();

						g.old_value = g.value

					}

				}, 500)

			}

		} else {

			if (g.tagName == "DIV") {

				this.filters.push([ g, c ]);

				g.style.padding = "0px";

				g.style.margin = "0px";

				if (!window.dhx_globalImgPath) {

					window.dhx_globalImgPath = this.imgURL

				}

				var e = new dhtmlXCombo(g, "_filter", "90%");

				e.filterSelfA = e.filterSelf;

				e.filterSelf = function() {

					if (this.getSelectedIndex() == 0) {

						this.setComboText("")

					}

					this.filterSelfA.apply(this, arguments);

					this.optionsArr[0].hide(false)

				};

				e.enableFilteringMode(true);

				g.combo = e;

				g.value = "";

				this._loadComboOptins(g, c);

				e.attachEvent("onChange", function() {

					g.value = e.getSelectedValue();

					if (g.value === null) {

						g.value = ""

					}

					a.filterByAll()

				})

			}

		}

	}

	if (g.parentNode) {

		g.parentNode.className += " filter"

	}

	this._filters_ready()

};

dhtmlXGridObject.prototype.findCell = function(h, l, e, g) {

	var g = g || (function(m, j) {

		return j.toString().toLowerCase().indexOf(m) != -1

	});

	if (g === true) {

		g = function(m, j) {

			return j.toString().toLowerCase() == m

		}

	}

	var c = new Array();

	h = h.toString().toLowerCase();

	if (typeof e != "number") {

		e = e ? 1 : 0

	}

	if (!this.rowsBuffer.length) {

		return c

	}

	for (var b = (l || 0); b < this._cCount; b++) {

		if (this._h2) {

			this._h2.forEachChild(0, function(j) {

				if (e && c.length == e) {

					return c

				}

				if (g(h, this._get_cell_value(j.buff, b))) {

					c.push([ j.id, b ])

				}

			}, this)

		} else {

			for (var a = 0; a < this.rowsBuffer.length; a++) {

				if (g(h, this._get_cell_value(this.rowsBuffer[a], b))) {

					c.push([ this.rowsBuffer[a].idd, b ]);

					if (e && c.length == e) {

						return c

					}

				}

			}

		}

		if (typeof (l) != "undefined") {

			return c

		}

	}

	return c

};

dhtmlXGridObject.prototype.makeSearch = function(e, c, a) {

	if (typeof (e) != "object") {

		e = document.getElementById(e)

	}

	if (!e) {

		return

	}

	var b = this;

	if (e.tagName == "INPUT") {

		e.onkeypress = function() {

			if (this._timer) {

				window.clearTimeout(this._timer)

			}

			this._timer = window.setTimeout(function() {

				if (e.value == "") {

					return

				}

				var g = b.findCell(e.value, c, true, a);

				if (g.length) {

					if (b._h2) {

						b.openItem(g[0][0])

					}

					b.selectCell(b.getRowIndex(g[0][0]), (c || 0))

				}

			}, 500)

		}

	}

	if (e.parentNode) {

		e.parentNode.className += " filter"

	}

};

dhtmlXGridObject.prototype._loadSelectOptins = function(g, j) {

	var a = this.collectValues(j);

	var b = g.value;

	g.innerHTML = "";

	g.options[0] = new Option("", "");

	var h = this._filter_tr ? this._filter_tr[j] : null;

	for (var e = 0; e < a.length; e++) {

		g.options[g.options.length] = new Option(h ? h(a[e]) : a[e], a[e])

	}

	g.value = b

};

dhtmlXGridObject.prototype.setSelectFilterLabel = function(b, a) {

	if (!this._filter_tr) {

		this._filter_tr = []

	}

	this._filter_tr[b] = a

};

dhtmlXGridObject.prototype._loadComboOptins = function(e, h) {

	if (!e.combo) {

		return

	}

	var a = this.collectValues(h);

	e.combo.clearAll();

	var g = [ [ "", "" ] ];

	for (var b = 0; b < a.length; b++) {

		g.push([ a[b], a[b] ])

	}

	e.combo.addOption(g)

};

dhtmlXGridObject.prototype.refreshFilters = function() {

	if (!this.filters) {

		return

	}

	for (var a = 0; a < this.filters.length; a++) {

		switch (this.filters[a][0].tagName.toLowerCase()) {

		case "input":

			break;

		case "select":

			this._loadSelectOptins.apply(this, this.filters[a]);

			break;

		case "div":

			this._loadComboOptins.apply(this, this.filters[a]);

			break

		}

	}

};

dhtmlXGridObject.prototype._filters_ready = function(b, a) {

	this.attachEvent("onXLE", this.refreshFilters);

	this.attachEvent("onSyncApply", this.refreshFilters);

	this.attachEvent("onRowCreated", function(g, e) {

		if (this._f_rowsBuffer) {

			for (var c = 0; c < this._f_rowsBuffer.length; c++) {

				if (this._f_rowsBuffer[c].idd == g) {

					return this._f_rowsBuffer[c] = e

				}

			}

		}

	});

	this.attachEvent("onClearAll", function() {

		this._f_rowsBuffer = null;

		if (!this.hdr.rows.length) {

			this.filters = []

		}

	});

	this.attachEvent("onSetSizes", this._filters_resize_combo);

	this.attachEvent("onResize", this._filters_resize_combo);

	this._filters_ready = function() {

	}

};

dhtmlXGridObject.prototype._filters_resize_combo = function() {

	if (!this.filters) {

		return

	}

	for (var a = 0; a < this.filters.length; a++) {

		if (this.filters[a][0].combo != null) {

			this.filters[a][0].combo.setSize(Math

					.round(this.filters[a][0].offsetWidth * 90 / 100))

		}

	}

	return true

};

dhtmlXGridObject.prototype._in_header_text_filter = function(b, a) {

	b.innerHTML = "<input type='text'>";

	b.onclick = b.onmousedown = function(c) {

		(c || event).cancelBubble = true;

		return true

	};

	b.onselectstart = function() {

		return (event.cancelBubble = true)

	};

	this.makeFilter(b.firstChild, a)

};

dhtmlXGridObject.prototype._in_header_text_filter_inc = function(b, a) {

	b.innerHTML = "<input type='text'>";

	b.onclick = b.onmousedown = function(c) {

		(c || event).cancelBubble = true;

		return true

	};

	b.onselectstart = function() {

		return (event.cancelBubble = true)

	};

	this.makeFilter(b.firstChild, a);

	b.firstChild._filter = function() {

		if (b.firstChild.value == "") {

			return ""

		}

		return function(c) {

			return (c.toString().toLowerCase().indexOf(

					b.firstChild.value.toLowerCase()) == 0)

		}

	};

	this._filters_ready()

};

dhtmlXGridObject.prototype._in_header_select_filter = function(b, a) {

	b.innerHTML = "<select></select>";

	b.onclick = function(c) {

		(c || event).cancelBubble = true;

		return false

	};

	this.makeFilter(b.firstChild, a)

};

dhtmlXGridObject.prototype._in_header_select_filter_strict = function(c, b) {

	c.innerHTML = "<select style='width:90%; font-size:8pt; font-family:Tahoma;'></select>";

	c.onclick = function(g) {

		(g || event).cancelBubble = true;

		return false

	};

	this.makeFilter(c.firstChild, b);

	var a = this.combos;

	c.firstChild._filter = function() {

		var e = c.firstChild.value;

		if (!e) {

			return ""

		}

		if (a[b]) {

			e = a[b].keys[a[b].values._dhx_find(e)]

		}

		e = e.toLowerCase();

		return function(g) {

			return (g.toString().toLowerCase() == e)

		}

	};

	this._filters_ready()

};

dhtmlXGridObject.prototype._in_header_combo_filter = function(b, a) {

	b.innerHTML = "<div style='width:100%; padding-left:2px; overflow:hidden; ' class='combo'></div>";

	b.onselectstart = function() {

		return (event.cancelBubble = true)

	};

	b.onclick = b.onmousedown = function(c) {

		(c || event).cancelBubble = true;

		return true

	};

	this.makeFilter(b.firstChild, a)

};

dhtmlXGridObject.prototype._search_common = function(b, a) {

	b.innerHTML = "<input type='text' style='width:90%; '>";

	b.onclick = b.onmousedown = function(c) {

		(c || event).cancelBubble = true;

		return true

	};

	b.onselectstart = function() {

		return (event.cancelBubble = true)

	}

};

dhtmlXGridObject.prototype._in_header_text_search = function(c, b, a) {

	this._search_common(c, b);

	this.makeSearch(c.firstChild, b)

};

dhtmlXGridObject.prototype._in_header_text_search_strict = function(b, a) {

	this._search_common(b, a);

	this.makeSearch(b.firstChild, a, true)

};

dhtmlXGridObject.prototype._in_header_numeric_filter = function(b, a) {

	this._in_header_text_filter.call(this, b, a);

	b.firstChild._filter = function() {

		var c = this.value;

		var g;

		var j = "==";

		var e = parseFloat(c.replace("=", ""));

		var h = null;

		if (c) {

			if (c.indexOf("..") != -1) {

				c = c.split("..");

				e = parseFloat(c[0]);

				h = parseFloat(c[1]);

				return function(l) {

					if (l >= e && l <= h) {

						return true

					}

					return false

				}

			}

			g = c.match(/>=|<=|>|</);

			if (g) {

				j = g[0];

				e = parseFloat(c.replace(j, ""))

			}

			return Function("v", " if (v " + j + " " + e

					+ " ) return true; return false;")

		}

		return ""

	}

};

dhtmlXGridObject.prototype._in_header_master_checkbox = function(e, b, g) {

	e.innerHTML = g[0] + "<input type='checkbox' />" + g[1];

	var a = this;

	e.getElementsByTagName("input")[0].onclick = function(h) {

		a._build_m_order();

		var c = a._m_order ? a._m_order[b] : b;

		var l = this.checked ? 1 : 0;

		a.forEachRowA(function(m) {

			var j = this.cells(m, c);

			if (j.isCheckbox() && !j.isDisabled()) {

				j.setValue(l);

				j.cell.wasChanged = true

			}

			this.callEvent("onEditCell", [ 1, m, c, l ]);

			this.callEvent("onCheckbox", [ m, c, l ]);

			this.callEvent("onCheck", [ m, c, l ])

		});

		(h || event).cancelBubble = true

	}

};

dhtmlXGridObject.prototype._in_header_stat_total = function(b, a, g) {

	var e = function() {

		var m = 0;

		this._build_m_order();

		var l = this._m_order ? this._m_order[a] : a;

		for (var h = 0; h < this.rowsBuffer.length; h++) {

			var c = parseFloat(this._get_cell_value(this.rowsBuffer[h], l));

			m += isNaN(c) ? 0 : c

		}

		return this._maskArr[l] ? this._aplNF(m, l)

				: (Math.round(m * 100) / 100)

	};

	this._stat_in_header(b, e, a, g, g)

};

dhtmlXGridObject.prototype._in_header_stat_multi_total = function(g, e, m) {

	var l = m[1].split(":");

	m[1] = "";

	for (var b = 0; b < l.length; b++) {

		l[b] = parseInt(l[b])

	}

	var h = function() {

		var q = 0;

		for (var o = 0; o < this.rowsBuffer.length; o++) {

			var n = 1;

			for (var c = 0; c < l.length; c++) {

				n *= parseFloat(this._get_cell_value(this.rowsBuffer[o], l[c]))

			}

			q += isNaN(n) ? 0 : n

		}

		return this._maskArr[e] ? this._aplNF(q, e)

				: (Math.round(q * 100) / 100)

	};

	var a = [];

	for (var j = 0; j < l.length; j++) {

		a[l[j]] = true

	}

	this._stat_in_header(g, h, a, m, m)

};

dhtmlXGridObject.prototype._in_header_stat_max = function(b, a, g) {

	var e = function() {

		this._build_m_order();

		var h = this._m_order ? this._m_order[a] : a;

		var l = -999999999;

		if (this.getRowsNum() == 0) {

			return "&nbsp;"

		}

		for (var c = 0; c < this.rowsBuffer.length; c++) {

			l = Math.max(l, parseFloat(this._get_cell_value(this.rowsBuffer[c],

					h)))

		}

		return this._maskArr[a] ? this._aplNF(l, a) : l

	};

	this._stat_in_header(b, e, a, g)

};

dhtmlXGridObject.prototype._in_header_stat_min = function(b, a, g) {

	var e = function() {

		this._build_m_order();

		var h = this._m_order ? this._m_order[a] : a;

		var l = 999999999;

		if (this.getRowsNum() == 0) {

			return "&nbsp;"

		}

		for (var c = 0; c < this.rowsBuffer.length; c++) {

			l = Math.min(l, parseFloat(this._get_cell_value(this.rowsBuffer[c],

					h)))

		}

		return this._maskArr[a] ? this._aplNF(l, a) : l

	};

	this._stat_in_header(b, e, a, g)

};

dhtmlXGridObject.prototype._in_header_stat_average = function(b, a, g) {

	var e = function() {

		this._build_m_order();

		var l = this._m_order ? this._m_order[a] : a;

		var n = 0;

		var m = 0;

		if (this.getRowsNum() == 0) {

			return "&nbsp;"

		}

		for (var h = 0; h < this.rowsBuffer.length; h++) {

			var c = parseFloat(this._get_cell_value(this.rowsBuffer[h], l));

			if (!isNaN(c)) {

				n += c;

				m++

			}

		}

		return this._maskArr[a] ? this._aplNF(n / m, a) : (Math.round(n / m

				* 100) / 100)

	};

	this._stat_in_header(b, e, a, g)

};

dhtmlXGridObject.prototype._in_header_stat_count = function(b, a, g) {

	var e = function() {

		return this.getRowsNum()

	};

	this._stat_in_header(b, e, a, g)

};

dhtmlXGridObject.prototype._stat_in_header = function(b, e, a, j) {

	var g = this;

	var h = function() {

		this.dma(true);

		b.innerHTML = (j[0] ? j[0] : "") + e.call(this) + (j[1] ? j[1] : "");

		this.dma(false);

		this.callEvent("onStatReady", [])

	};

	if (!this._stat_events) {

		this._stat_events = [];

		this.attachEvent("onClearAll", function() {

			if (!this.hdr.rows[1]) {

				for (var l = 0; l < this._stat_events.length; l++) {

					for (var c = 0; c < 4; c++) {

						this.detachEvent(this._stat_events[l][c])

					}

				}

				this._stat_events = []

			}

		})

	}

	this._stat_events.push([ this.attachEvent("onGridReconstructed", h),

			this.attachEvent("onXLE", h), this.attachEvent("onFilterEnd", h),

			this.attachEvent("onEditCell", function(c, m, l) {

				if (c == 2 && (l == a || (a && a[l]))) {

					h.call(this)

				}

				return true

			}) ]);

	b.innerHTML = ""

};

dhtmlXGridObject.prototype.loadCSVFile = function(b, a) {

	this.load(b, a, "csv")

};

dhtmlXGridObject.prototype.enableCSVAutoID = function(a) {

	this._csvAID = dhx4.s2b(a)

};

dhtmlXGridObject.prototype.enableCSVHeader = function(a) {

	this._csvHdr = dhx4.s2b(a)

};

dhtmlXGridObject.prototype.setCSVDelimiter = function(a) {

	this.csv.cell = a

};

dhtmlXGridObject.prototype._csvAID = true;

dhtmlXGridObject.prototype.loadCSVString = function(a) {

	this.parse(a, "csv")

};

dhtmlXGridObject.prototype.serializeToCSV = function(m) {

	this.editStop();

	if (this._mathSerialization) {

		this._agetm = "getMathValue"

	} else {

		if (this._strictText || m) {

			this._agetm = "getTitle"

		} else {

			this._agetm = "getValue"

		}

	}

	var h = [];

	if (this._csvHdr) {

		for (var g = 1; g < this.hdr.rows.length; g++) {

			var b = [];

			for (var l = 0; l < this._cCount; l++) {

				if ((!this._srClmn) || (this._srClmn[l])) {

					b.push(this.getColumnLabel(l, g - 1))

				}

			}

			h.push(this.csvParser.str(b, this.csv.cell, this.csv.row))

		}

	}

	var l = 0;

	var e = this.rowsBuffer.length;

	for (l; l < e; l++) {

		var c = this._serializeRowToCVS(null, l);

		if (c != "") {

			h.push(c)

		}

	}

	return this.csvParser.block(h, this.csv.row)

};

dhtmlXGridObject.prototype._serializeRowToCVS = function(a, m, c, j) {

	var l = new Array();

	if (!a) {

		a = this.render_row(m);

		if (this._fake && !this._fake.rowsAr[a.idd]) {

			this._fake.render_row(m)

		}

	}

	if (!this._csvAID) {

		l[l.length] = a.idd

	}

	c = c || 0;

	j = j || this._cCount;

	var o = false;

	var e = c;

	while (a.childNodes[c]._cellIndex > e && c) {

		c--

	}

	for (var n = c; e < j; n++) {

		if (!a.childNodes[n]) {

			break

		}

		var b = a.childNodes[n]._cellIndex;

		if (((!this._srClmn) || (this._srClmn[b]))

				&& (!this._serialize_visible || !this._hrrar[b])) {

			var g = a.childNodes[n];

			var h = this.cells(a.idd, b);

			while (e != b) {

				e++;

				l.push("");

				if (e >= j) {

					break

				}

			}

			if (e >= j) {

				break

			}

			e++;

			if (h.cell) {

				zxVal = h[this._agetm]()

			} else {

				zxVal = ""

			}

			if ((this._chAttr) && (h.wasChanged())) {

				o = true

			}

			l[l.length] = ((zxVal === null) ? "" : zxVal);

			if (this._ecspn && g.colSpan && g.colSpan > 1) {

				g = g.colSpan - 1;

				for (var q = 0; q < g; q++) {

					l[l.length] = "";

					e++

				}

			}

		} else {

			e++

		}

	}

	if ((this._onlChAttr) && (!o)) {

		return ""

	}

	return this.csvParser.str(l, this.csv.cell, this.csv.row)

};

dhtmlXGridObject.prototype.toClipBoard = function(a) {

	if (window.clipboardData) {

		window.clipboardData.setData("Text", a)

	} else {

		(new Clipboard()).copy(a)

	}

};

dhtmlXGridObject.prototype.fromClipBoard = function() {

	if (window.clipboardData) {

		return window.clipboardData.getData("Text")

	} else {

		return (new Clipboard()).paste()

	}

};

dhtmlXGridObject.prototype.cellToClipboard = function(c, b) {

	if ((!c) || (!b && b !== 0)) {

		if (!this.selectedRows[0]) {

			return

		}

		c = this.selectedRows[0].idd;

		b = this.cell._cellIndex

	}

	var a = this.cells(c, b);

	this.toClipBoard(((a.getLabel ? a.getLabel() : a.getValue()) || "")

			.toString())

};

dhtmlXGridObject.prototype.updateCellFromClipboard = function(c, b) {

	if ((!c) || (!b)) {

		if (!this.selectedRows[0]) {

			return

		}

		c = this.selectedRows[0].idd;

		b = this.cell._cellIndex

	}

	var a = this.cells(c, b);

	a[a.setImage ? "setLabel" : "setValue"](this.fromClipBoard())

};

dhtmlXGridObject.prototype.rowToClipboard = function(e) {

	var a = "";

	if (this._mathSerialization) {

		this._agetm = "getMathValue"

	} else {

		if (this._strictText) {

			this._agetm = "getTitle"

		} else {

			this._agetm = "getValue"

		}

	}

	this._serialize_visible = !this._fake;

	if (e) {

		a = this._serializeRowToCVS(this.getRowById(e))

	} else {

		var c = [];

		for (var b = 0; b < this.selectedRows.length; b++) {

			c[c.length] = this._serializeRowToCVS(this.selectedRows[b]);

			a = this.csvParser.block(c, this.csv.row)

		}

	}

	this._serialize_visible = false;

	this.toClipBoard(a)

};

dhtmlXGridObject.prototype.updateRowFromClipboard = function(g) {

	var a = this.fromClipBoard();

	if (!a) {

		return

	}

	if (g) {

		var e = this.getRowById(g)

	} else {

		var e = this.selectedRows[0]

	}

	if (!e) {

		return

	}

	var h = this.csvParser;

	a = h.unblock(a, this.csv.cell, this.csv.row)[0];

	if (!this._csvAID) {

		a.splice(0, 1)

	}

	for (var c = 0; c < a.length; c++) {

		var b = this.cells3(e, c);

		b[b.setImage ? "setLabel" : "setValue"](a[c])

	}

};

dhtmlXGridObject.prototype.csvParser = {

	block : function(a, b) {

		return a.join(b)

	},

	unblock : function(h, a, g) {

		var e = (h || "").split(g);

		for (var b = 0; b < e.length; b++) {

			e[b] = (e[b] || "").split(a)

		}

		var c = e.length - 1;

		if (e[c].length == 1 && e[c][0] == "") {

			e.splice(c, 1)

		}

		return e

	},

	str : function(b, a, c) {

		return b.join(a)

	}

};

dhtmlXGridObject.prototype.csvExtParser = {

	_quote : RegExp('"', "g"),

	_quote_esc : RegExp('""', "g"),

	block : function(a, b) {

		return a.join(b)

	},

	unblock : function(l, o, r) {

		var c = [ [] ];

		var b = 0;

		if (!l) {

			return c

		}

		var m = /^[ ]*"/;

		var j = /"[ ]*$/;

		var a = new RegExp(".*" + r + ".*$");

		var g = l.split(o);

		for (var e = 0; e < g.length; e++) {

			if (g[e].match(m)) {

				var q = g[e].replace(m, "");

				while (!g[e].match(j)) {

					e++;

					q += g[e]

				}

				c[b].push(q.replace(j, "").replace(this._quote_esc, '"'))

			} else {

				if (g[e].match(a)) {

					var h = g[e].indexOf(r);

					c[b].push(g[e].substr(0, h));

					b++;

					c[b] = [];

					g[e] = g[e].substr(h + 1);

					e--

				} else {

					if (g[e] || e != g.length - 1) {

						c[b].push(g[e])

					}

				}

			}

		}

		var n = c.length - 1;

		if (n > 0 && !c[n].length) {

			c.splice(n, 1)

		}

		return c

	},

	str : function(c, a, e) {

		for (var b = 0; b < c.length; b++) {

			c[b] = '"' + c[b].replace(this._quote, '""') + '"'

		}

		return c.join(a)

	}

};

dhtmlXGridObject.prototype.addRowFromClipboard = function() {

	var a = this.fromClipBoard();

	if (!a) {

		return

	}

	var c = this.csvParser.unblock(a, this.csv.cell, this.csv.row);

	for (var b = 0; b < c.length; b++) {

		if (c[b]) {

			a = c[b];

			if (!a.length) {

				continue

			}

			if (this._csvAID) {

				this.addRow(this.getRowsNum() + 2, a)

			} else {

				if (this.rowsAr[a[0]]) {

					a[0] = this.uid()

				}

				this.addRow(a[0], a.slice(1))

			}

		}

	}

};

dhtmlXGridObject.prototype.gridToClipboard = function() {

	this.toClipBoard(this.serializeToCSV())

};

dhtmlXGridObject.prototype.gridFromClipboard = function() {

	var a = this.fromClipBoard();

	if (!a) {

		return

	}

	this.loadCSVString(a)

};

dhtmlXGridObject.prototype.getXLS = function(h) {

	if (!this.xslform) {

		this.xslform = document.createElement("FORM");

		this.xslform.action = (h || "") + "xls.php";

		this.xslform.method = "post";

		this.xslform.target = (_isIE ? "_blank" : "");

		document.body.appendChild(this.xslform);

		var g = document.createElement("INPUT");

		g.type = "hidden";

		g.name = "csv";

		this.xslform.appendChild(g);

		var e = document.createElement("INPUT");

		e.type = "hidden";

		e.name = "csv_header";

		this.xslform.appendChild(e)

	}

	var j = this.serializeToCSV();

	this.xslform.childNodes[0].value = j;

	var c = [];

	var a = this._cCount;

	for (var b = 0; b < a; b++) {

		c.push(this.getHeaderCol(b))

	}

	c = c.join(",");

	this.xslform.childNodes[1].value = c;

	this.xslform.submit()

};

dhtmlXGridObject.prototype.printView = function(s, b) {

	var o = "<style>TD { font-family:Arial; text-align:center; padding-left:2px;padding-right:2px; } \n td.filter input, td.filter select { display:none; }	\n  </style>";

	var z = null;

	if (this._fake) {

		z = [].concat(this._hrrar);

		for (var y = 0; y < this._fake._cCount; y++) {

			this._hrrar[y] = null

		}

	}

	var n = document.location.port;

	var q = document.location.hostname;

	o += "<base  href='"

			+ (document.location.protocol + "//" + q + (n ? (":" + n) : "") + document.location.pathname)

			+ "'></base>";

	if (!this.parentGrid) {

		o += (s || "")

	}

	o += '<table width="100%" border="2px" cellpadding="0" cellspacing="0">';

	var r = Math.max(this.rowsBuffer.length, this.rowsCol.length);

	var m = this._cCount;

	var t = this._printWidth();

	o += '<tr class="header_row_1">';

	for (var y = 0; y < m; y++) {

		if (this._hrrar && this._hrrar[y]) {

			continue

		}

		var g = this.hdr.rows[1].cells[this.hdr.rows[1]._childIndexes ? this.hdr.rows[1]._childIndexes[parseInt(y)]

				: y];

		var a = (g.colSpan || 1);

		var E = (g.rowSpan || 1);

		for (var x = 1; x < a; x++) {

			t[y] += t[x]

		}

		o += '<td rowspan="' + E + '" width="' + t[y]

				+ '%" style="background-color:lightgrey;" colspan="' + a + '">'

				+ this.getHeaderCol(y) + "</td>";

		y += a - 1

	}

	o += "</tr>";

	for (var y = 2; y < this.hdr.rows.length; y++) {

		if (_isIE) {

			o += "<tr style='background-color:lightgrey' class='header_row_"

					+ y + "'>";

			var e = this.hdr.rows[y].childNodes;

			for (var x = 0; x < e.length; x++) {

				if (!this._hrrar || !this._hrrar[e[x]._cellIndex]) {

					o += e[x].outerHTML

				}

			}

			o += "</tr>"

		} else {

			o += "<tr class='header_row_" + y

					+ "' style='background-color:lightgrey'>"

					+ (this._fake ? this._fake.hdr.rows[y].innerHTML : "")

					+ this.hdr.rows[y].innerHTML + "</tr>"

		}

	}

	for (var y = 0; y < r; y++) {

		o += "<tr>";

		if (this.rowsCol[y] && this.rowsCol[y]._cntr) {

			o += this.rowsCol[y].innerHTML.replace(/<img[^>]*>/gi, "")

					+ "</tr>";

			continue

		}

		if (this.rowsCol[y] && this.rowsCol[y].style.display == "none") {

			continue

		}

		var l;

		if (this.rowsCol[y]) {

			l = this.rowsCol[y].idd

		} else {

			if (this.rowsBuffer[y]) {

				l = this.rowsBuffer[y].idd

			} else {

				continue

			}

		}

		for (var x = 0; x < m; x++) {

			if (this._hrrar && this._hrrar[x]) {

				continue

			}

			if (this.rowsAr[l] && this.rowsAr[l].tagName == "TR") {

				var D = this.cells(l, x);

				if (D._setState) {

					var u = ""

				} else {

					if (D.getContent) {

						u = D.getContent()

					} else {

						if (D.getImage || D.combo) {

							var u = D.cell.innerHTML

						} else {

							var u = D.getValue()

						}

					}

				}

			} else {

				var u = this._get_cell_value(this.rowsBuffer[y], x)

			}

			var v = this.columnColor[x] ? "background-color:"

					+ this.columnColor[x] + ";" : "";

			var w = this.cellAlign[x] ? "text-align:" + this.cellAlign[x] + ";"

					: "";

			var A = D.getAttribute("colspan");

			o += '<td style="' + v + w + '" '

					+ (A ? 'colSpan="' + A + '"' : "") + ">"

					+ (u === "" ? "&nbsp;" : u) + "</td>";

			if (A) {

				x += A - 1

			}

		}

		o += "</tr>";

		if (this.rowsCol[y] && this.rowsCol[y]._expanded) {

			var h = this.cells4(this.rowsCol[y]._expanded.ctrl);

			if (h.getSubGrid) {

				o += '<tr><td colspan="' + m + '">'

						+ h.getSubGrid().printView() + "</td></tr>"

			} else {

				o += '<tr><td colspan="' + m + '">'

						+ this.rowsCol[y]._expanded.innerHTML + "</td></tr>"

			}

		}

	}

	if (this.ftr) {

		for (var y = 1; y < this.ftr.childNodes[0].rows.length; y++) {

			o += "<tr style='background-color:lightgrey'>"

					+ ((this._fake) ? this._fake.ftr.childNodes[0].rows[y].innerHTML

							: "") + this.ftr.childNodes[0].rows[y].innerHTML

					+ "</tr>"

		}

	}

	o += "</table>";

	if (this.parentGrid) {

		return o

	}

	o += (b || "");

	var C = window.open("", "_blank");

	C.document.write(o);

	C.document

			.write("<script>window.onerror=function(){return true;}<\/script>");

	C.document.close();

	if (this._fake) {

		this._hrrar = z

	}

};

dhtmlXGridObject.prototype._printWidth = function() {

	var g = [];

	var e = 0;

	for (var c = 0; c < this._cCount; c++) {

		var a = this.getColWidth(c);

		g.push(a);

		e += a

	}

	var j = [];

	var b = 0;

	for (var c = 0; c < g.length; c++) {

		var h = Math.floor((g[c] / e) * 100);

		b += h;

		j.push(h)

	}

	j[j.length - 1] += 100 - b;

	return j

};

dhtmlXGridObject.prototype.enableBlockSelection = function(c) {

	if (typeof this._bs_mode == "undefined") {

		var a = this;

		this.obj.onmousedown = function(g) {

			if (a._bs_mode) {

				a._OnSelectionStart((g || event), this)

			}

			return true

		};

		this._CSVRowDelimiter = this.csv.row;

		this.attachEvent("onResize", function() {

			a._HideSelection();

			return true

		});

		this.attachEvent("onGridReconstructed", function() {

			a._HideSelection();

			return true

		});

		this.attachEvent("onFilterEnd", this._HideSelection)

	}

	if (c === false) {

		this._bs_mode = false;

		return this._HideSelection()

	} else {

		this._bs_mode = true

	}

	if (!window.dhx4.isIPad) {

		var b = this._clip_area = document.createElement("textarea");

		b.className = "dhx_tab_ignore";

		b.style.cssText = "position:absolute; width:1px; height:1px; overflow:hidden; color:transparent; background-color:transparent; bottom:1px; right:1px; border:none;";

		b.onkeydown = function(g) {

			g = g || event;

			if (g.keyCode == 86 && (g.ctrlKey || g.metaKey)) {

				a.pasteBlockFromClipboard()

			}

		};

		document.body.insertBefore(this._clip_area, document.body.firstChild);

		dhtmlxEvent(this.entBox, "click", function() {

			if (!a.editor && a._clip_area) {

				a._clip_area.select()

			}

		})

	}

};

dhtmlXGridObject.prototype.forceLabelSelection = function(a) {

	this._strictText = dhx4.s2b(a)

};

dhtmlXGridObject.prototype.selectBlock = function(e, c, b, a) {

	c = this.getRowIndex(c);

	a = this.getRowIndex(a);

	this._CreateSelection(c, e);

	this._selectionArea = this._RedrawSelectionPos(this.cells2(c, e).cell, this

			.cells2(a, b).cell);

	this._ShowSelection()

};

dhtmlXGridObject.prototype._OnSelectionStart = function(c, e) {

	var b = this;

	if (c.button == 2) {

		return

	}

	var g = c.srcElement || c.target;

	if (this.editor) {

		if (g.tagName && (g.tagName == "INPUT" || g.tagName == "TEXTAREA")) {

			return

		}

		this.editStop()

	}

	b.setActive(true);

	var j = this.getPosition(this.obj);

	var a = c.clientX

			- j[0]

			+ (document.body.scrollLeft || (document.documentElement ? document.documentElement.scrollLeft

					: 0));

	var h = c.clientY

			- j[1]

			+ (document.body.scrollTop || (document.documentElement ? document.documentElement.scrollTop

					: 0));

	this._CreateSelection(a - 4, h - 4);

	if (g == this._selectionObj) {

		this._HideSelection();

		this._startSelectionCell = null

	} else {

		while (g && (!g.tagName || g.tagName.toLowerCase() != "td")) {

			g = g.parentNode

		}

		this._startSelectionCell = g

	}

	if (this._startSelectionCell) {

		if (!this.callEvent("onBeforeBlockSelected", [

				this._startSelectionCell.parentNode.idd,

				this._startSelectionCell._cellIndex ])) {

			return this._startSelectionCell = null

		}

	}

	this.obj.onmousedown = null;

	this.obj[_isIE ? "onmouseleave" : "onmouseout"] = function(l) {

		if (b._blsTimer) {

			window.clearTimeout(b._blsTimer)

		}

	};

	this.obj.onmmold = this.obj.onmousemove;

	this._init_pos = [ a, h ];

	this._selectionObj.onmousemove = this.obj.onmousemove = function(l) {

		l = l || c;

		if (l.preventDefault) {

			l.preventDefault()

		} else {

			l.returnValue = false

		}

		b._OnSelectionMove(l)

	};

	this._oldDMP = document.body.onmouseup;

	document.body.onmouseup = function(l) {

		l = l || c;

		b._OnSelectionStop(l, this);

		return true

	};

	this.callEvent("onBeforeBlockSelection", []);

	document.body.onselectstart = function() {

		return false

	}

};

dhtmlXGridObject.prototype._getCellByPos = function(a, e) {

	a = a;

	if (this._fake) {

		a += this._fake.objBox.scrollWidth

	}

	e = e;

	var b = 0;

	for (var c = 0; c < this.obj.rows.length; c++) {

		e -= this.obj.rows[c].offsetHeight;

		if (e <= 0) {

			b = this.obj.rows[c];

			break

		}

	}

	if (!b || !b.idd) {

		return null

	}

	for (var c = 0; c < this._cCount; c++) {

		a -= this.getColWidth(c);

		if (a <= 0) {

			while (true) {

				if (b._childIndexes

						&& b._childIndexes[c + 1] == b._childIndexes[c]) {

					b = b.previousSibling

				} else {

					return this.cells(b.idd, c).cell

				}

			}

		}

	}

	return null

};

dhtmlXGridObject.prototype._OnSelectionMove = function(g) {

	var v = this;

	this._ShowSelection();

	var q = this.getPosition(this.obj);

	var l = g.clientX

			- q[0]

			+ (document.body.scrollLeft || (document.documentElement ? document.documentElement.scrollLeft

					: 0));

	var j = g.clientY

			- q[1]

			+ (document.body.scrollTop || (document.documentElement ? document.documentElement.scrollTop

					: 0));

	if ((Math.abs(this._init_pos[0] - l) < 5)

			&& (Math.abs(this._init_pos[1] - j) < 5)) {

		return this._HideSelection()

	}

	var s = this._endSelectionCell;

	if (this._startSelectionCell == null) {

		this._endSelectionCell = this._startSelectionCell = this

				.getFirstParentOfType(g.srcElement || g.target, "TD")

	} else {

		if (g.srcElement || g.target) {

			if ((g.srcElement || g.target).className == "dhtmlxGrid_selection") {

				this._endSelectionCell = (this._getCellByPos(l, j) || this._endSelectionCell)

			} else {

				var u = this.getFirstParentOfType(g.srcElement || g.target,

						"TD");

				if (u.parentNode.idd) {

					this._endSelectionCell = u

				}

			}

		}

	}

	if (this._endSelectionCell) {

		if (!this.callEvent("onBeforeBlockSelected", [

				this._endSelectionCell.parentNode.idd,

				this._endSelectionCell._cellIndex ])) {

			this._endSelectionCell = s

		}

	}

	var h = this.objBox.scrollLeft + this.objBox.clientWidth;

	var c = this.objBox.scrollTop + this.objBox.clientHeight;

	var n = this.objBox.scrollLeft;

	var m = this.objBox.scrollTop;

	var e = false;

	if (this._blsTimer) {

		window.clearTimeout(this._blsTimer)

	}

	if (l + 20 >= h) {

		this.objBox.scrollLeft = this.objBox.scrollLeft + 20;

		e = true

	} else {

		if (l - 20 < n) {

			this.objBox.scrollLeft = this.objBox.scrollLeft - 20;

			e = true

		}

	}

	if (j + 20 >= c && !this._realfake) {

		this.objBox.scrollTop = this.objBox.scrollTop + 20;

		e = true

	} else {

		if (j - 20 < m && !this._realfake) {

			this.objBox.scrollTop = this.objBox.scrollTop - 20;

			e = true

		}

	}

	this._selectionArea = this._RedrawSelectionPos(this._startSelectionCell,

			this._endSelectionCell);

	if (e) {

		var r = g.clientX;

		var o = g.clientY;

		this._blsTimer = window.setTimeout(function() {

			v._OnSelectionMove({

				clientX : r,

				clientY : o

			})

		}, 100)

	}

};

dhtmlXGridObject.prototype._OnSelectionStop = function(b) {

	var a = this;

	if (this._blsTimer) {

		window.clearTimeout(this._blsTimer)

	}

	this.obj.onmousedown = function(g) {

		if (a._bs_mode) {

			a._OnSelectionStart((g || b), this)

		}

		return true

	};

	this.obj.onmousemove = this.obj.onmmold || null;

	this._selectionObj.onmousemove = null;

	document.body.onmouseup = this._oldDMP || null;

	if (parseInt(this._selectionObj.style.width) < 2

			&& parseInt(this._selectionObj.style.height) < 2) {

		this._HideSelection()

	} else {

		var c = this.getFirstParentOfType(b.srcElement || b.target, "TD");

		if ((!c) || (!c.parentNode.idd)) {

			c = this._endSelectionCell

		}

		while (c && (!c.tagName || c.tagName.toLowerCase() != "td")) {

			c = c.parentNode

		}

		if (!c) {

			return this._HideSelection()

		}

		this._stopSelectionCell = c;

		this._selectionArea = this._RedrawSelectionPos(

				this._startSelectionCell, this._stopSelectionCell);

		this.callEvent("onBlockSelected", [])

	}

	document.body.onselectstart = function() {

	}

};

dhtmlXGridObject.prototype._RedrawSelectionPos = function(q, j) {

	if (q.parentNode.grid != j.parentNode.grid) {

		return this._selectionArea

	}

	var n = {};

	n.LeftTopCol = q._cellIndex;

	n.LeftTopRow = this.getRowIndex(q.parentNode.idd);

	n.RightBottomCol = j._cellIndex;

	n.RightBottomRow = this.getRowIndex(j.parentNode.idd);

	var e = q.offsetWidth;

	var c = q.offsetHeight;

	q = this.getPosition(q, this.obj);

	var r = j.offsetWidth;

	var l = j.offsetHeight;

	j = this.getPosition(j, this.obj);

	if (q[0] < j[0]) {

		var g = q[0];

		var h = j[0] + r

	} else {

		var m = n.RightBottomCol;

		n.RightBottomCol = n.LeftTopCol;

		n.LeftTopCol = m;

		var g = j[0];

		var h = q[0] + e

	}

	if (q[1] < j[1]) {

		var o = q[1];

		var a = j[1] + l

	} else {

		var m = n.RightBottomRow;

		n.RightBottomRow = n.LeftTopRow;

		n.LeftTopRow = m;

		var o = j[1];

		var a = q[1] + c

	}

	var s = h - g;

	var b = a - o;

	this._selectionObj.style.left = g + "px";

	this._selectionObj.style.top = o + "px";

	this._selectionObj.style.width = s + "px";

	this._selectionObj.style.height = b + "px";

	return n

};

dhtmlXGridObject.prototype._CreateSelection = function(a, c) {

	if (this._selectionObj == null) {

		var b = document.createElement("div");

		b.style.position = "absolute";

		b.style.display = "none";

		b.className = "dhtmlxGrid_selection";

		this._selectionObj = b;

		this._selectionObj.onmousedown = function(g) {

			g = g || event;

			if (g.button == 2 || (_isMacOS && g.ctrlKey)) {

				return this.parentNode.grid.callEvent("onBlockRightClick", [

						"BLOCK", g ])

			}

		};

		this._selectionObj.oncontextmenu = function(g) {

			(g || event).cancelBubble = true;

			return false

		};

		this.objBox.appendChild(this._selectionObj)

	}

	this._selectionObj.style.width = "0px";

	this._selectionObj.style.height = "0px";

	this._selectionObj.style.left = a + "px";

	this._selectionObj.style.top = c + "px";

	this._selectionObj.startX = a;

	this._selectionObj.startY = c

};

dhtmlXGridObject.prototype._ShowSelection = function() {

	if (this._selectionObj) {

		this._selectionObj.style.display = ""

	}

};

dhtmlXGridObject.prototype._HideSelection = function() {

	if (this._selectionObj) {

		this._selectionObj.style.display = "none"

	}

	this._selectionArea = null;

	if (this._clip_area) {

		this._clip_area.value = "";

		this._clip_area.blur()

	}

};

dhtmlXGridObject.prototype.copyBlockToClipboard = function() {

	if (!this._clip_area) {

		return

	}

	if (this._selectionArea != null) {

		var c = new Array();

		if (this._mathSerialization) {

			this._agetm = "getMathValue"

		} else {

			if (this._strictText) {

				this._agetm = "getTitle"

			} else {

				this._agetm = "getValue"

			}

		}

		this._serialize_visible = true;

		for (var a = this._selectionArea.LeftTopRow; a <= this._selectionArea.RightBottomRow; a++) {

			var b = this._serializeRowToCVS(this.rowsBuffer[a], null,

					this._selectionArea.LeftTopCol,

					this._selectionArea.RightBottomCol + 1);

			if (!this._csvAID) {

				c[c.length] = b.substr(b.indexOf(this.csv.cell) + 1)

			} else {

				c[c.length] = b

			}

		}

		c = c.join(this._CSVRowDelimiter);

		this._clip_area.value = c;

		this._clip_area.select();

		this._serialize_visible = false

	}

};

dhtmlXGridObject.prototype.pasteBlockFromClipboard = function() {

	if (!this._clip_area) {

		return

	}

	this._clip_area.select();

	var a = this;

	window.setTimeout(function() {

		a._pasteBlockFromClipboard();

		a = null

	}, 1)

};

dhtmlXGridObject.prototype._pasteBlockFromClipboard = function() {

	var h = this._clip_area.value;

	if (!h) {

		return

	}

	if (this._selectionArea != null) {

		var t = this._selectionArea.LeftTopRow;

		var a = this._selectionArea.LeftTopCol

	} else {

		if (this.cell != null && !this.editor) {

			var t = this.getRowIndex(this.cell.parentNode.idd);

			var a = this.cell._cellIndex

		} else {

			return false

		}

	}

	h = this.csvParser.unblock(h, this.csv.cell, this.csv.row);

	var m = t + h.length;

	var r = a + h[0].length;

	if (r > this._cCount) {

		r = this._cCount

	}

	var e = 0;

	for (var o = t; o < m; o++) {

		var u = this.render_row(o);

		if (u == -1) {

			continue

		}

		var c = 0;

		for (var g = a; g < r; g++) {

			if (this._hrrar[g] && !this._fake) {

				r = Math.min(r + 1, this._cCount);

				continue

			}

			var q = this.cells3(u, g);

			if (q.isDisabled()) {

				c++;

				continue

			}

			if (this._onEditUndoRedo) {

				this._onEditUndoRedo(2, u.idd, g, h[e][c], q.getValue())

			}

			if (q.combo) {

				var s = q.combo.values;

				for (var b = 0; b < s.length; b++) {

					if (h[e][c] == s[b]) {

						q.setValue(q.combo.keys[b]);

						s = null;

						break

					}

				}

				if (s != null && q.editable) {

					q.setValue(h[e][c++])

				} else {

					c++

				}

			} else {

				q[q.setImage ? "setLabel" : "setValue"](h[e][c++])

			}

			q.cell.wasChanged = true

		}

		this.callEvent("onRowPaste", [ u.idd ]);

		e++

	}

};

dhtmlXGridObject.prototype.getSelectedBlock = function() {

	if (this._selectionArea) {

		return this._selectionArea

	} else {

		if (this.getSelectedRowId() !== null) {

			return {

				LeftTopRow : this.getSelectedRowId(),

				LeftTopCol : this.getSelectedCellIndex(),

				RightBottomRow : this.getSelectedRowId(),

				RightBottomCol : this.getSelectedCellIndex()

			}

		} else {

			return null

		}

	}

};

dhtmlXGridObject.prototype.enableSmartRendering = function(c, b, a) {

	if (arguments.length > 2) {

		if (b && !this.rowsBuffer[b - 1]) {

			this.rowsBuffer[b - 1] = 0

		}

		b = a

	}

	this._srnd = dhx4.s2b(c);

	this._srdh = this._srdh || 20;

	this._dpref = b || 0

};

dhtmlXGridObject.prototype.enablePreRendering = function(a) {

	this._srnd_pr = parseInt(a || 50)

};

dhtmlXGridObject.prototype.forceFullLoading = function(a, g) {

	for (var c = 0; c < this.rowsBuffer.length; c++) {

		if (!this.rowsBuffer[c]) {

			var e = a || (this.rowsBuffer.length - c);

			if (this.callEvent("onDynXLS", [ c, e ])) {

				var b = this;

				this.load(this.xmlFileUrl + dhtmlx.url(this.xmlFileUrl)

						+ "posStart=" + c + "&count=" + e, function() {

					window.setTimeout(function() {

						b.forceFullLoading(a, g)

					}, 100)

				}, this._data_type)

			}

			return

		}

	}

	if (g) {

		g.call(this)

	}

};

dhtmlXGridObject.prototype.setAwaitedRowHeight = function(a) {

	this._srdh = parseInt(a)

};

dhtmlXGridObject.prototype._get_view_size = function() {

	return Math.floor(parseInt(this.entBox.offsetHeight) / this._srdh) + 2

};

dhtmlXGridObject.prototype._add_filler = function(j, a, b, e) {

	if (!a) {

		return null

	}

	var h = "__filler__";

	var g = this._prepareRow(h);

	g.firstChild.style.width = "1px";

	g.firstChild.style.borderWidth = g.firstChild.style.padding = g.firstChild.style.margin = "0px";

	for (var c = 1; c < g.childNodes.length; c++) {

		g.childNodes[c].style.display = "none"

	}

	g.firstChild.style.height = a * this._srdh + "px";

	b = b || this.rowsCol[j];

	if (b && b.nextSibling) {

		b.parentNode.insertBefore(g, b.nextSibling)

	} else {

		if (_isKHTML) {

			this.obj.appendChild(g)

		} else {

			this.obj.rows[0].parentNode.appendChild(g)

		}

	}

	this.callEvent("onAddFiller", [ j, a, g, b, e ]);

	return [ j, a, g ]

};

dhtmlXGridObject.prototype._update_srnd_view = function() {

	var h = Math.floor(this.objBox.scrollTop / this._srdh);

	var b = h + this._get_view_size();

	if (this.multiLine) {

		var l = this.objBox.scrollTop;

		h = 0;

		while (l > 0) {

			l -= this.rowsCol[h] ? this.rowsCol[h].offsetHeight : this._srdh;

			h++

		}

		b = h + this._get_view_size();

		if (h > 0) {

			h--

		}

	}

	b += (this._srnd_pr || 0);

	if (b > this.rowsBuffer.length) {

		b = this.rowsBuffer.length

	}

	for (var e = h; e < b; e++) {

		if (!this.rowsCol[e]) {

			var g = this._add_from_buffer(e);

			if (g == -1) {

				if (this.xmlFileUrl) {

					if (this._dpref && this.rowsBuffer[b - 1]) {

						var c = this._dpref ? this._dpref : (b - e);

						var a = Math.max(0, Math.min(e, b - this._dpref));

						this._current_load = [ a, b - a ]

					} else {

						this._current_load = [ e,

								(this._dpref ? this._dpref : (b - e)) ]

					}

					if (this.callEvent("onDynXLS", this._current_load)) {

						this.load(this.xmlFileUrl + dhtmlx.url(this.xmlFileUrl)

								+ "posStart=" + this._current_load[0]

								+ "&count=" + this._current_load[1],

								this._data_type)

					}

				}

				return

			} else {

				if (this._tgle) {

					this._updateLine(this._h2.get[this.rowsBuffer[e].idd],

							this.rowsBuffer[e]);

					this._updateParentLine(

							this._h2.get[this.rowsBuffer[e].idd],

							this.rowsBuffer[e])

				}

				if (e && e == (this._realfake ? this._fake : this)["_r_select"]) {

					this.selectCell(e, this.cell ? this.cell._cellIndex : 0,

							true)

				}

			}

		}

	}

	if (this._fake && !this._realfake && this.multiLine) {

		this._fake.objBox.scrollTop = this.objBox.scrollTop

	}

};

dhtmlXGridObject.prototype._add_from_buffer = function(e) {

	var g = this.render_row(e);

	if (g == -1) {

		return -1

	}

	if (g._attrs.selected || g._attrs.select) {

		this.selectRow(g, false, true);

		g._attrs.selected = g._attrs.select = null

	}

	if (!this._cssSP) {

		if (this._cssEven && e % 2 == 0) {

			g.className = this._cssEven

					+ ((g.className.indexOf("rowselected") != -1) ? " rowselected "

							: " ") + (g._css || "")

		} else {

			if (this._cssUnEven && e % 2 == 1) {

				g.className = this._cssUnEven

						+ ((g.className.indexOf("rowselected") != -1) ? " rowselected "

								: " ") + (g._css || "")

			}

		}

	} else {

		if (this._h2) {

			var a = this._h2.get[g.idd];

			g.className += " "

					+ ((a.level % 2) ? (this._cssUnEven + " " + this._cssUnEven)

							: (this._cssEven + " " + this._cssEven)) + "_"

					+ a.level + (this.rowsAr[a.id]._css || "")

		}

	}

	for (var b = 0; b < this._fillers.length; b++) {

		var c = this._fillers[b];

		if (c && c[0] <= e && (c[0] + c[1]) > e) {

			var h = e - c[0];

			if (h == 0) {

				this._insert_before(e, g, c[2]);

				this._update_fillers(b, -1, 1)

			} else {

				if (h == c[1] - 1) {

					this._insert_after(e, g, c[2]);

					this._update_fillers(b, -1, 0)

				} else {

					this._fillers.push(this._add_filler(e + 1, c[1] - h - 1,

							c[2], 1));

					this._insert_after(e, g, c[2]);

					this._update_fillers(b, -c[1] + h, 0)

				}

			}

			return

		}

	}

};

dhtmlXGridObject.prototype._update_fillers = function(c, a, e) {

	var b = this._fillers[c];

	b[1] = b[1] + a;

	b[0] = b[0] + e;

	if (!b[1]) {

		this.callEvent("onRemoveFiller", [ b[2] ]);

		b[2].parentNode.removeChild(b[2]);

		this._fillers.splice(c, 1)

	} else {

		b[2].firstChild.style.height = parseFloat(b[2].firstChild.style.height)

				+ a * this._srdh + "px";

		this.callEvent("onUpdateFiller", [ b[2] ])

	}

};

dhtmlXGridObject.prototype._insert_before = function(b, c, a) {

	a.parentNode.insertBefore(c, a);

	this.rowsCol[b] = c;

	this.callEvent("onRowInserted", [ c, null, a, "before" ])

};

dhtmlXGridObject.prototype._insert_after = function(b, c, a) {

	if (a.nextSibling) {

		a.parentNode.insertBefore(c, a.nextSibling)

	} else {

		a.parentNode.appendChild(c)

	}

	this.rowsCol[b] = c;

	this.callEvent("onRowInserted", [ c, null, a, "after" ])

};

if (typeof (window.dhtmlxValidation) != "undefined") {

	dhtmlxValidation.trackInput = function(c, e, b, a) {

		dhtmlxEvent(c, "keyup", function(g) {

			if (dhtmlxValidation._timer) {

				window.clearTimeout(dhtmlxValidation._timer);

				dhtmlxValidation._timer = null

			}

			dhtmlxValidation._timer = window.setTimeout(function() {

				if (!dhtmlxValidation.checkInput(c, e)) {

					if (!b || b(c, c.value, e)) {

						c.className += " dhtmlx_live_validation_error"

					}

				} else {

					c.className = c.className.replace(

							/[ ]*dhtmlx_live_validation_error/g, "");

					if (a) {

						a(c, c.value, e)

					}

				}

			}, 250)

		})

	};

	dhtmlxValidation.checkInput = function(a, b) {

		return dhtmlxValidation.checkValue(a.value, b)

	};

	dhtmlxValidation.checkValue = function(c, e) {

		if (typeof e == "string") {

			e = e.split(",")

		}

		var a = true;

		for (var b = 0; b < e.length; b++) {

			if (!this["is" + e[b]]) {

				alert("Incorrect validation rule: " + e[b])

			} else {

				a = a && this["is" + e[b]](c)

			}

		}

		return a

	}

}

dhtmlXGridObject.prototype.enableValidation = function(b, a) {

	b = dhx4.s2b(b);

	if (b) {

		this._validators = {

			data : []

		}

	} else {

		this._validators = false

	}

	if (arguments.length > 1) {

		this._validators._live = a

	}

	if (!this._validators._event) {

		this._validators._event = this.attachEvent("onEditCell",

				this.validationEvent)

	}

};

dhtmlXGridObject.prototype.setColValidators = function(a) {

	if (!this._validators) {

		this.enableValidation(true)

	}

	if (typeof a == "string") {

		a = a.split(this.delim)

	}

	this._validators.data = a

};

dhtmlXGridObject.prototype.validationEvent = function(h, b, e, c, l) {

	var m = this._validators;

	if (!m) {

		return true

	}

	var j = (m.data[e] || this.cells(b, e).getAttribute("validate")) || "";

	if (h == 1 && j) {

		var g = this.editor || (this._fake || {}).editor;

		if (!g) {

			return true

		}

		g.cell.className = g.cell.className.replace(

				/[ ]*dhtmlx_validation_error/g, "");

		if (m._live) {

			var a = this;

			dhtmlxValidation.trackInput(g.getInput(), j, function(n, o, q) {

				return a.callEvent("onLiveValidationError", [ b, e, o, n, q ])

			},

					function(n, o, q) {

						return a.callEvent("onLiveValidationCorrect", [ b, e,

								o, n, q ])

					})

		}

	}

	if (h == 2) {

		this.validateCell(b, e, j, c)

	}

	return true

};

dhtmlXGridObject.prototype.validateCell = function(j, g, h, e) {

	h = h

			|| (this._validators.data[g] || this.cells(j, g).getAttribute(

					"validate"));

	e = e || this.cells(j, g).getValue();

	if (!h) {

		return

	}

	var b = this.cells(j, g).cell;

	var a = true;

	if (typeof h == "string") {

		h = h.split(this.delim)

	}

	for (var c = 0; c < h.length; c++) {

		if (!dhtmlxValidation.checkValue(e, h[c])) {

			if (this.callEvent("onValidationError", [ j, g, e, h[c] ])) {

				b.className += " dhtmlx_validation_error"

			}

			a = false

		}

	}

	if (a) {

		this.callEvent("onValidationCorrect", [ j, g, e, h ]);

		b.className = b.className.replace(/[ ]*dhtmlx_validation_error/g, "")

	}

	return a

};

function eXcell_stree(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		if (!this.grid._sub_trees) {

			return

		}

		this._sub = this.grid._sub_trees[a._cellIndex];

		if (!this._sub) {

			return

		}

		this._sub = this._sub[0]

	}

	this.getValue = function() {

		return this.cell._val

	};

	this.setValue = function(b) {

		this.cell._val = b;

		b = this._sub.getItemText(this.cell._val);

		this.setCValue((b || "&nbsp;"), b)

	};

	this.edit = function() {

		this._sub.parentObject.style.display = "block";

		var c = this.grid.getPosition(this.cell);

		this._sub.parentObject.style.top = c[1] + "px";

		this._sub.parentObject.style.left = c[0] + "px";

		this._sub.parentObject.style.position = "absolute";

		var b = this.grid.editStop;

		this.grid.editStop = function() {

		};

		this.grid.editStop = b

	};

	this.detach = function() {

		this._sub.parentObject.style.display = "none";

		if (this.grid._sub_id != null) {

			var b = this.cell._val;

			this.setValue(this._sub.getSelectedItemId());

			this.grid._sub_id = null;

			return this.cell._val != b

		}

	}

}

eXcell_stree.prototype = new eXcell;

dhtmlXGridObject.prototype.setSubTree = function(a, b) {

	if (!this._sub_trees) {

		this._sub_trees = []

	}

	this._sub_trees[b] = [ a ];

	a.parentObject.style.display = "none";

	var c = this;

	a.parentObject.onclick = function(e) {

		(e || window.event).cancelBubble = true;

		return false

	};

	a.ev_onDblClick = null;

	a.attachEvent("onDblClick", function(e) {

		c._sub_id = e;

		c.editStop();

		return true

	});

	a._chRRS = true

};

function eXcell_link(a) {

	this.cell = a;

	this.grid = this.cell.parentNode.grid;

	this.isDisabled = function() {

		return true

	};

	this.edit = function() {

	};

	this.getValue = function() {

		if (this.cell.firstChild.getAttribute) {

			var b = this.cell.firstChild.getAttribute("target");

			return this.cell.firstChild.innerHTML + "^"

					+ this.cell.firstChild.getAttribute("href")

					+ (b ? ("^" + b) : "")

		} else {

			return ""

		}

	};

	this.setValue = function(c) {

		if ((typeof (c) != "number") && (!c || c.toString()._dhx_trim() == "")) {

			this.setCValue("&nbsp;", b);

			return (this.cell._clearCell = true)

		}

		var b = c.split("^");

		if (b.length == 1) {

			b[1] = ""

		} else {

			if (b.length > 1) {

				b[1] = "href='" + b[1] + "'";

				if (b.length == 3) {

					b[1] += " target='" + b[2] + "'"

				} else {

					b[1] += " target='_blank'"

				}

			}

		}

		this.setCValue("<a " + b[1]

				+ " onclick='(_isIE?event:arguments[0]).cancelBubble = true;'>"

				+ b[0] + "</a>", b)

	}

}

eXcell_link.prototype = new eXcell;

eXcell_link.prototype.getTitle = function() {

	var a = this.cell.firstChild;

	return ((a && a.tagName) ? a.getAttribute("href") : "")

};

eXcell_link.prototype.getContent = function() {

	var a = this.cell.firstChild;

	return ((a && a.tagName) ? a.innerHTML : "")

};

function eXcell_grid(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		if (!this.grid._sub_grids) {

			return

		}

		this._sub = this.grid._sub_grids[a._cellIndex];

		if (!this._sub) {

			return

		}

		this._sindex = this._sub[1];

		this._sub = this._sub[0]

	}

	this.getValue = function() {

		return this.cell.val

	};

	this.setValue = function(b) {

		this.cell.val = b;

		if (this._sub.getRowById(b)) {

			b = this._sub.cells(b, this._sindex);

			if (b) {

				b = b.getValue()

			} else {

				b = ""

			}

		}

		this.setCValue((b || "&nbsp;"), b)

	};

	this.edit = function() {

		this.val = this.cell.val;

		this._sub.entBox.style.display = "block";

		var c = this.grid.getPosition(this.cell);

		this._sub.entBox.style.top = c[1] + "px";

		this._sub.entBox.style.left = c[0] + "px";

		this._sub.entBox.style.position = "absolute";

		this._sub.setSizes();

		var b = this.grid.editStop;

		this.grid.editStop = function() {

		};

		if (this._sub.getRowById(this.cell.val)) {

			this._sub.setSelectedRow(this.cell.val)

		}

		this._sub.setActive(true);

		this.grid.editStop = b

	};

	this.detach = function() {

		var b = this.cell.val;

		this._sub.entBox.style.display = "none";

		if (this._sub.getSelectedId() === null) {

			return false

		}

		this.setValue(this._sub.getSelectedId());

		this.grid.setActive(true);

		return this.cell.val != b

	}

}

eXcell_grid.prototype = new eXcell;

dhtmlXGridObject.prototype.setSubGrid = function(b, a, e) {

	if (!this._sub_grids) {

		this._sub_grids = []

	}

	this._sub_grids[a] = [ b, e ];

	b.entBox.style.display = "none";

	var c = this;

	b.entBox.onclick = function(g) {

		(g || window.event).cancelBubble = true;

		return false

	};

	b.attachEvent("onRowSelect", function(g) {

		c.editStop();

		return true

	});

	b._chRRS = false

};

function eXcell_dhxCalendar(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		if (!this.grid._grid_calendarA) {

			var c = this.grid._grid_calendarA = new dhtmlxCalendarObject();

			this.grid.callEvent("onDhxCalendarCreated", [ c ]);

			var b = this.grid;

			c.attachEvent("onClick", function() {

				this._last_operation_calendar = true;

				window.setTimeout(function() {

					b.editStop()

				}, 1);

				return true

			});

			var e = function(g) {

				(g || event).cancelBubble = true

			};

			dhtmlxEvent(c.base, "click", e);

			c = null

		}

	}

}

eXcell_dhxCalendar.prototype = new eXcell;

eXcell_dhxCalendar.prototype.edit = function() {

	var b = this.grid.getPosition(this.cell);

	this.grid._grid_calendarA._show(false, false);

	var c = 0;

	if (!window.innerHeight

			|| (b[1] + this.grid._grid_calendarA.base.offsetHeight

					+ this.cell.offsetHeight < window.innerHeight)) {

		c = b[1] + this.cell.offsetHeight

	} else {

		c = b[1] - (this.grid._grid_calendarA.base.offsetHeight)

	}

	var e = b[0];

	if (window.innerWidth

			&& (e + this.grid._grid_calendarA.base.clientWidth

					+ this.cell.offsetWidth > window.innerWidth)) {

		e = window.innerWidth - this.grid._grid_calendarA.base.clientWidth

	}

	this.grid._grid_calendarA.setPosition(e, c);

	this.grid._grid_calendarA._last_operation_calendar = false;

	this.grid.callEvent("onCalendarShow", [ this.grid._grid_calendarA,

			this.cell.parentNode.idd, this.cell._cellIndex ]);

	this.cell._cediton = true;

	this.val = this.cell.val;

	this._val = this.cell.innerHTML;

	var a = this.grid._grid_calendarA.draw;

	this.grid._grid_calendarA.draw = function() {

	};

	this.grid._grid_calendarA.setDateFormat((this.grid._dtmask || "%d/%m/%Y"));

	this.grid._grid_calendarA.setDate(this.val || (new Date()));

	this.grid._grid_calendarA.draw = a

};

eXcell_dhxCalendar.prototype.getDate = function() {

	if (this.cell.val) {

		return this.cell.val

	}

	return null

};

eXcell_dhxCalendar.prototype.getValue = function() {

	if (this.cell._clearCell) {

		return ""

	}

	if (this.grid._dtmask_inc && this.cell.val) {

		return this.grid._grid_calendarA.getFormatedDate(this.grid._dtmask_inc,

				this.cell.val).toString()

	}

	return this.cell.innerHTML.toString()._dhx_trim()

};

eXcell_dhxCalendar.prototype.detach = function() {

	if (!this.grid._grid_calendarA) {

		return

	}

	this.grid._grid_calendarA.hide();

	if (this.cell._cediton) {

		this.cell._cediton = false

	} else {

		return

	}

	if (this.grid._grid_calendarA._last_operation_calendar) {

		var c = this.grid._grid_calendarA

				.getFormatedDate((this.grid._dtmask || "%d/%m/%Y"));

		var b = this.grid._grid_calendarA.getDate();

		this.cell.val = new Date(b);

		this.setCValue(c, b);

		this.cell._clearCell = !c;

		var a = this.val;

		this.val = this._val;

		return (this.cell.val.valueOf() != (a || "").valueOf())

	}

	return false

};

eXcell_dhxCalendar.prototype.setValue = function(a) {

	if (a && typeof a == "object") {

		this.cell.val = a;

		this.cell._clearCell = false;

		this

				.setCValue(this.grid._grid_calendarA.getFormatedDate(

						(this.grid._dtmask || "%d/%m/%Y"), a).toString(),

						this.cell.val);

		return

	}

	if (!a || a.toString()._dhx_trim() == "") {

		a = "&nbsp";

		this.cell._clearCell = true;

		this.cell.val = ""

	} else {

		this.cell._clearCell = false;

		this.cell.val = new Date(this.grid._grid_calendarA.setFormatedDate(

				(this.grid._dtmask_inc || this.grid._dtmask || "%d/%m/%Y"), a

						.toString(), null, true));

		if (this.grid._dtmask_inc) {

			a = this.grid._grid_calendarA.getFormatedDate(

					(this.grid._dtmask || "%d/%m/%Y"), this.cell.val)

		}

	}

	if ((this.cell.val == "NaN") || (this.cell.val == "Invalid Date")) {

		this.cell._clearCell = true;

		this.cell.val = new Date();

		this.setCValue("&nbsp;", 0)

	} else {

		this.setCValue((a || "").toString(), this.cell.val)

	}

};

function eXcell_dhxCalendarA(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		if (!this.grid._grid_calendarA) {

			var c = this.grid._grid_calendarA = new dhtmlxCalendarObject();

			this.grid.callEvent("onDhxCalendarCreated", [ c ]);

			var b = this.grid;

			c.attachEvent("onClick", function() {

				this._last_operation_calendar = true;

				window.setTimeout(function() {

					b.editStop()

				}, 1);

				return true

			});

			var e = function(g) {

				(g || event).cancelBubble = true

			};

			dhtmlxEvent(c.base, "click", e)

		}

	}

}

eXcell_dhxCalendarA.prototype = new eXcell;

eXcell_dhxCalendarA.prototype.edit = function() {

	var b = this.grid.getPosition(this.cell);

	this.grid._grid_calendarA._show(false, false);

	this.grid._grid_calendarA.setPosition(b[0] * 1 + this.cell.offsetWidth,

			b[1] * 1);

	this.grid.callEvent("onCalendarShow", [ this.grid._grid_calendarA,

			this.cell.parentNode.idd, this.cell._cellIndex ]);

	this.grid._grid_calendarA._last_operation_calendar = false;

	this.cell._cediton = true;

	this.val = this.cell.val;

	this._val = this.cell.innerHTML;

	var a = this.grid._grid_calendarA.draw;

	this.grid._grid_calendarA.draw = function() {

	};

	this.grid._grid_calendarA.setDateFormat((this.grid._dtmask || "%d/%m/%Y"));

	this.grid._grid_calendarA.setDate(this.val);

	this.grid._grid_calendarA.draw = a;

	this.cell.atag = ((!this.grid.multiLine) && (_isKHTML || _isMacOS || _isFF)) ? "INPUT"

			: "TEXTAREA";

	this.obj = document.createElement(this.cell.atag);

	this.obj.style.height = (this.cell.offsetHeight - 4) + "px";

	this.obj.className = "dhx_combo_edit";

	this.obj.wrap = "soft";

	this.obj.style.textAlign = this.cell.align;

	this.obj.onclick = function(c) {

		(c || event).cancelBubble = true

	};

	this.obj.onmousedown = function(c) {

		(c || event).cancelBubble = true

	};

	this.obj.value = this.getValue();

	this.cell.innerHTML = "";

	this.cell.appendChild(this.obj);

	if (window.dhx4.isIE) {

		this.obj.style.overflow = "visible";

		if ((this.grid.multiLine) && (this.obj.offsetHeight >= 18)

				&& (this.obj.offsetHeight < 40)) {

			this.obj.style.height = "36px";

			this.obj.style.overflow = "scroll"

		}

	}

	this.obj.onselectstart = function(c) {

		if (!c) {

			c = event

		}

		c.cancelBubble = true;

		return true

	};

	this.obj.focus();

	this.obj.focus()

};

eXcell_dhxCalendarA.prototype.getDate = function() {

	if (this.cell.val) {

		return this.cell.val

	}

	return null

};

eXcell_dhxCalendarA.prototype.getValue = function() {

	if (this.cell._clearCell) {

		return ""

	}

	if (this.grid._dtmask_inc && this.cell.val) {

		return this.grid._grid_calendarA.getFormatedDate(this.grid._dtmask_inc,

				this.cell.val).toString()

	}

	return this.cell.innerHTML.toString()._dhx_trim()

};

eXcell_dhxCalendarA.prototype.detach = function() {

	if (!this.grid._grid_calendarA) {

		return

	}

	this.grid._grid_calendarA.hide();

	if (this.cell._cediton) {

		this.cell._cediton = false

	} else {

		return

	}

	if (this.grid._grid_calendarA._last_operation_calendar) {

		this.grid._grid_calendarA._last_operation_calendar = false;

		var c = this.grid._grid_calendarA.getFormatedDate(this.grid._dtmask

				|| "%d/%m/%Y");

		var b = this.grid._grid_calendarA.getDate();

		this.cell.val = new Date(b);

		this.setCValue(c, b);

		this.cell._clearCell = !c;

		var a = this.val;

		this.val = this._val;

		return (this.cell.val.valueOf() != (a || "").valueOf())

	}

	this.setValue(this.obj.value);

	var a = this.val;

	this.val = this._val;

	return (this.cell.val.valueOf() != (a || "").valueOf())

};

eXcell_dhxCalendarA.prototype.setValue = function(a) {

	if (a && typeof a == "object") {

		this.cell.val = a;

		this.cell._clearCell = false;

		this

				.setCValue(this.grid._grid_calendarA.getFormatedDate(

						(this.grid._dtmask || "%d/%m/%Y"), a).toString(),

						this.cell.val);

		return

	}

	if (!a || a.toString()._dhx_trim() == "") {

		a = "&nbsp";

		this.cell._clearCell = true;

		this.cell.val = ""

	} else {

		this.cell._clearCell = false;

		this.cell.val = new Date(this.grid._grid_calendarA.setFormatedDate(

				(this.grid._dtmask_inc || this.grid._dtmask || "%d/%m/%Y"), a

						.toString(), null, true));

		if (this.grid._dtmask_inc) {

			a = this.grid._grid_calendarA.getFormatedDate(

					(this.grid._dtmask || "%d/%m/%Y"), this.cell.val)

		}

	}

	if ((this.cell.val == "NaN") || (this.cell.val == "Invalid Date")) {

		this.cell.val = new Date();

		this.cell._clearCell = true;

		this.setCValue("&nbsp;", 0)

	} else {

		this.setCValue((a || "").toString(), this.cell.val)

	}

};

function eXcell_cntr(a) {

	this.cell = a;

	this.grid = this.cell.parentNode.grid;

	if (!this.grid._ex_cntr_ready && !this._realfake) {

		this.grid._ex_cntr_ready = true;

		if (this.grid._h2) {

			this.grid.attachEvent("onOpenEn", function(c) {

				this.resetCounter(a._cellIndex)

			})

		}

		var b = function() {

			var c = this;

			window.setTimeout(function() {

				if (!c.resetCounter) {

					return

				}

				if (c._fake && !c._realfake && a._cellIndex < c._fake._cCount) {

					c._fake.resetCounter(a._cellIndex)

				} else {

					c.resetCounter(a._cellIndex)

				}

			}, 1);

			return true

		};

		this.grid.attachEvent("onBeforeSorting", b);

		this.grid.attachEvent("onFilterEnd", b)

	}

	this.edit = function() {

	};

	this.getValue = function() {

		return this.cell.innerHTML

	};

	this.setValue = function(e) {

		this.cell.style.paddingRight = "2px";

		var c = this.cell;

		window.setTimeout(function() {

			if (!c.parentNode) {

				return

			}

			var g = c.parentNode.rowIndex;

			if (c.parentNode.grid.currentPage || g < 0

					|| c.parentNode.grid._srnd) {

				g = c.parentNode.grid.rowsBuffer._dhx_find(c.parentNode) + 1

			}

			if (g <= 0) {

				return

			}

			c.innerHTML = g;

			if (c.parentNode.grid._fake

					&& c._cellIndex < c.parentNode.grid._fake._cCount

					&& c.parentNode.grid._fake.rowsAr[c.parentNode.idd]) {

				c.parentNode.grid._fake.cells(c.parentNode.idd, c._cellIndex)

						.setCValue(g)

			}

			c = null

		}, 100)

	}

}

dhtmlXGridObject.prototype.resetCounter = function(b) {

	if (this._fake && !this._realfake && b < this._fake._cCount) {

		this._fake.resetCounter(b, this.currentPage)

	}

	var a = arguments[0] || 0;

	if (this.currentPage) {

		a = (this.currentPage - 1) * this.rowsBufferOutSize

	}

	for (a = 0; a < this.rowsBuffer.length; a++) {

		if (this.rowsBuffer[a] && this.rowsBuffer[a].tagName == "TR"

				&& this.rowsAr[this.rowsBuffer[a].idd]) {

			this.rowsAr[this.rowsBuffer[a].idd].childNodes[b].innerHTML = a + 1

		}

	}

};

eXcell_cntr.prototype = new eXcell;

function eXcell_acheck(a) {

	try {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		this.cell.obj = this

	} catch (b) {

	}

	this.changeState = function() {

		if ((!this.grid.isEditable) || (this.cell.parentNode._locked)

				|| (this.isDisabled())) {

			return

		}

		if (this.grid.callEvent("onEditCell", [ 0, this.cell.parentNode.idd,

				this.cell._cellIndex ]) != false) {

			this.val = this.getValue();

			if (this.val == "1") {

				this.setValue("<checkbox state='false'>")

			} else {

				this.setValue("<checkbox state='true'>")

			}

			this.cell.wasChanged = true;

			this.grid.callEvent("onEditCell", [ 1, this.cell.parentNode.idd,

					this.cell._cellIndex ]);

			this.grid.callEvent("onCheck", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ]);

			this.grid.callEvent("onCheckbox", [ this.cell.parentNode.idd,

					this.cell._cellIndex, (this.val != "1") ])

		} else {

			this.editor = null

		}

	};

	this.getValue = function() {

		try {

			return this.cell.chstate.toString()

		} catch (c) {

			return null

		}

	};

	this.isCheckbox = function() {

		return true

	};

	this.isChecked = function() {

		if (this.getValue() == "1") {

			return true

		} else {

			return false

		}

	};

	this.setChecked = function(c) {

		this.setValue(c.toString())

	};

	this.detach = function() {

		return this.val != this.getValue()

	};

	this.drawCurrentState = function() {

		if (this.cell.chstate == 1) {

			return "<div  onclick='(new eXcell_acheck(this.parentNode)).changeState(); (arguments[0]||event).cancelBubble=true;'  style='cursor:pointer; font-weight:bold; text-align:center; '><span style='height:8px; width:8px; background:green; display:inline-block;'></span>&nbsp;Yes</div>"

		} else {

			return "<div  onclick='(new eXcell_acheck(this.parentNode)).changeState(); (arguments[0]||event).cancelBubble=true;' style='cursor:pointer;  text-align:center; '><span style='height:8px; width:8px; background:red; display:inline-block;'></span>&nbsp;No</div>"

		}

	}

}

eXcell_acheck.prototype = new eXcell;

eXcell_acheck.prototype.setValue = function(b) {

	b = (b || "").toString();

	if (b.indexOf("1") != -1 || b.indexOf("true") != -1) {

		b = "1";

		this.cell.chstate = "1"

	} else {

		b = "0";

		this.cell.chstate = "0"

	}

	var a = this;

	this.setCValue(this.drawCurrentState(), this.cell.chstate)

};

function eXcell_context(a) {

	if (a) {

		this.cell = a;

		this.grid = this.cell.parentNode.grid;

		if (!this.grid._sub_context) {

			return

		}

		this._sub = this.grid._sub_context[a._cellIndex];

		if (!this._sub) {

			return

		}

		this._sindex = this._sub[1];

		this._sub = this._sub[0]

	}

	this.getValue = function() {

		return _isIE ? this.cell.innerText : this.cell.textContent

	};

	this.setValue = function(c) {

		this.cell._val = c;

		var b = this._sub.itemPull[this._sub.idPrefix + this.cell._val];

		c = b ? b.title : c;

		this.setCValue((c || "&nbsp;"), c)

	};

	this.edit = function() {

		var c = this.grid.getPosition(this.cell);

		this._sub.showContextMenu(c[0] + this.cell.offsetWidth, c[1]);

		var b = this.grid.editStop;

		this.grid.editStop = function() {

		};

		this.grid.editStop = b

	};

	this.detach = function() {

		if (this.grid._sub_id != null) {

			var b = this.cell._val;

			this.setValue(this.grid._sub_id);

			this.grid._sub_id = null;

			return this.cell._val != b

		}

		this._sub.hideContextMenu()

	}

}

eXcell_context.prototype = new eXcell;

dhtmlXGridObject.prototype.setSubContext = function(a, b, e) {

	var c = this;

	a.attachEvent("onClick", function(h, g) {

		c._sub_id = h;

		c.editStop();

		a.hideContextMenu();

		return true

	});

	if (!this._sub_context) {

		this._sub_context = []

	}

	this._sub_context[b] = [ a, e ];

	a.hideContextMenu()

};

dhtmlXGridObject.prototype._process_json_row = function(g, h) {

	g._attrs = h;

	for (var c = 0; c < g.childNodes.length; c++) {

		g.childNodes[c]._attrs = {}

	}

	if (h.userdata) {

		for ( var b in h.userdata) {

			this.setUserData(g.idd, b, h.userdata[b])

		}

	}

	h = this._c_order ? this._swapColumns(h.data) : h.data;

	for (var e = 0; e < h.length; e++) {

		if (typeof h[e] == "object" && h[e] != null) {

			g.childNodes[e]._attrs = h[e];

			if (h[e].type) {

				g.childNodes[e]._cellType = h[e].type

			}

			h[e] = h[e].value

		}

	}

	this._fillRow(g, h);

	return g

};

dhtmlXGridObject.prototype._process_js_row = function(h, l) {

	h._attrs = l;

	for (var e = 0; e < h.childNodes.length; e++) {

		h.childNodes[e]._attrs = {}

	}

	if (l.userdata) {

		for ( var c in l.userdata) {

			this.setUserData(h.idd, c, l.userdata[c])

		}

	}

	var b = [];

	for (var g = 0; g < this.columnIds.length; g++) {

		b[g] = l[this.columnIds[g]];

		if (typeof b[g] == "object" && b[g] != null) {

			h.childNodes[g]._attrs = b[g];

			if (b[g].type) {

				h.childNodes[g]._cellType = b[g].type

			}

			b[g] = b[g].value

		}

		if (!b[g] && b[g] !== 0) {

			b[g] = ""

		}

	}

	this._fillRow(h, b);

	return h

};

		dhtmlXGridObject.prototype.updateFromJSON = function(a, e, b, c) {

			if (typeof e == "undefined") {

				e = true

			}

			this._refresh_mode = [ true, e, b ];

			this.load(a, c, "json")

		},

		dhtmlXGridObject.prototype._refreshFromJSON = function(c) {

			if (this._f_rowsBuffer) {

				this.filterBy(0, "")

			}

			reset = false;

			if (window.eXcell_tree) {

				eXcell_tree.prototype.setValueX = eXcell_tree.prototype.setValue;

				eXcell_tree.prototype.setValue = function(q) {

					var o = this.grid._h2.get[this.cell.parentNode.idd];

					if (o && this.cell.parentNode.valTag) {

						this.setLabel(q)

					} else {

						this.setValueX(q)

					}

				}

			}

			var n = this.cellType._dhx_find("tree");

			var g = c.parent || 0;

			var j = {};

			if (this._refresh_mode[2]) {

				if (n != -1) {

					this._h2.forEachChild(g, function(o) {

						j[o.id] = true

					}, this)

				} else {

					this.forEachRow(function(o) {

						j[o] = true

					})

				}

			}

			var m = c.rows;

			for (var e = 0; e < m.length; e++) {

				var l = m[e];

				var a = l.id;

				j[a] = false;

				if (this.rowsAr[a] && this.rowsAr[a].tagName != "TR") {

					if (this._h2) {

						this._h2.get[a].buff.data = l

					} else {

						this.rowsBuffer[this.getRowIndex(a)].data = l

					}

					this.rowsAr[a] = l

				} else {

					if (this.rowsAr[a]) {

						this._process_json_row(this.rowsAr[a], l, -1);

						this._postRowProcessing(this.rowsAr[a], true)

					} else {

						if (this._refresh_mode[1]) {

							var h = {

								idd : a,

								data : l,

								_parser : this._process_json_row,

								_locator : this._get_json_data

							};

							var b = this.rowsBuffer.length;

							if (this._refresh_mode[1] == "top") {

								this.rowsBuffer.unshift(h);

								b = 0

							} else {

								this.rowsBuffer.push(h)

							}

							if (this._h2) {

								reset = true;

								(this._h2.add(a, g)).buff = this.rowsBuffer[this.rowsBuffer.length - 1]

							}

							this.rowsAr[a] = l;

							l = this.render_row(b);

							this._insertRowAt(l, b ? -1 : 0)

						}

					}

				}

			}

			if (this._refresh_mode[2]) {

				for (a in j) {

					if (j[a] && this.rowsAr[a]) {

						this.deleteRow(a)

					}

				}

			}

			this._refresh_mode = null;

			if (window.eXcell_tree) {

				eXcell_tree.prototype.setValue = eXcell_tree.prototype.setValueX

			}

			if (reset) {

				this._renderSort()

			}

			if (this._f_rowsBuffer) {

				this._f_rowsBuffer = null;

				this.filterByAll()

			}

		}, dhtmlXGridObject.prototype._process_js = function(a) {

			return this._process_json(a, "js")

		};

dhtmlXGridObject.prototype._parseOptionsJson = function(c) {

	if (c.coll_options) {

		for ( var b in c.coll_options) {

			var g = c.coll_options[b];

			var e = this.getColIndexById(b);

			var h;

			if (this.cellType[e] == "combo") {

				var h = this.getColumnCombo(e);

				h.addOption(g)

			} else {

				if (this.cellType[e].indexOf("co") == 0) {

					var h = this.getCombo(e);

					for (var a = 0; a < g.length; a++) {

						h.put(g[a].value, g[a].label)

					}

				}

			}

		}

		this._colls_loaded = true

	}

};

dhtmlXGridObject.prototype._parseHeadJson = function(q) {

	if (!q.head || !q.head.length) {

		return

	}

	var a = q.head;

	var e = q.settings;

	var l = "setInitWidths";

	var n = false;

	if (e && e.colwidth == "%") {

		l = "setInitWidthsP"

	}

	if (e && e.splitat == "%") {

		n = e.splitat

	}

	if (this.hdr.rows.length > 0) {

		this.clearAll(true)

	}

	var m = [ [], [], [], [], [], [], [] ];

	var o = [ "value", "width", "type", "align", "sort", "hidden", "id" ];

	var s = [ "", l, "setColTypes", "setColAlign", "setColSorting", "",

			"setColumnIds" ];

	for (var h = 0; h < a.length; h++) {

		for (var g = 0; g < o.length; g++) {

			m[g].push(a[h][o[g]])

		}

	}

	this.setHeader(m[0]);

	for (var h = 0; h < s.length; h++) {

		if (s[h]) {

			this[s[h]](m[h].join(this.delim))

		}

	}

	for (var h = 0; h < a.length; h++) {

		var r = a[h].options;

		if (a[h].options) {

			if (this.cellType[h] == "clist") {

				this.registerCList(h, r)

			} else {

				var b = this.getCombo(h);

				for (var g = 0; g < r.length; g++) {

					b.put(r[g].id, r[g].value)

				}

			}

		}

	}

	this.init();

	var c = m[5].join(this.delim);

	if (this.setColHidden && c.replace(/,/g, "") != "") {

		this.setColHidden(c)

	}

	if ((n) && (this.splitAt)) {

		this.splitAt(n)

	}

};

dhtmlXGridObject.prototype._process_json = function(data, mode) {

	this._parsing = true;

	try {

		var data = data.responseText || data;

		if (typeof data == "string") {

			eval("dhtmlx.temp=" + data + ";");

			data = dhtmlx.temp

		}

	} catch (e) {

		dhx4.callEvent("onLoadXMLError", [ "Incorrect JSON",

				(data.xmlDoc || data), this ]);

		data = {

			rows : []

		}

	}

	if (this._refresh_mode) {

		return this._refreshFromJSON(data)

	}

	if (data.head) {

		this._parseHeadJson(data)

	}

	this._parseOptionsJson(data);

	var cr = parseInt(data.pos || 0);

	var total = parseInt(data.total_count || 0);

	var reset = false;

	if (total) {

		if (!this.rowsBuffer[total - 1]) {

			if (this.rowsBuffer.length) {

				reset = true

			}

			this.rowsBuffer[total - 1] = null

		}

		if (total < this.rowsBuffer.length) {

			this.rowsBuffer.splice(total, this.rowsBuffer.length - total);

			reset = true

		}

	}

	var userdata = mode === "js" ? data.userdata : data;

	for ( var key in userdata) {

		if (mode === "js" || key != "rows") {

			this.setUserData("", key, userdata[key])

		}

	}

	if (mode == "js" && data.collections) {

		for ( var colkey in data.collections) {

			var index = this.getColIndexById(colkey);

			var colrecs = data.collections[colkey];

			if (index !== window.undefined) {

				if (this.cellType[index] == "clist") {

					colplaindata = [];

					for (var j = 0; j < colrecs.length; j++) {

						colplaindata.push(colrecs[j].label)

					}

					this.registerCList(index, colplaindata)

				} else {

					var combo = this.getCombo(index);

					for (var j = 0; j < colrecs.length; j++) {

						combo.put(colrecs[j].value, colrecs[j].label)

					}

				}

			}

		}

	}

	if (this.isTreeGrid()) {

		return this._process_tree_json(data, null, null, mode)

	}

	if (mode == "js") {

		if (data.data) {

			data = data.data

		}

		for (var i = 0; i < data.length; i++) {

			if (this.rowsBuffer[i + cr]) {

				continue

			}

			var row = data[i];

			var id = row.id || (i + 1);

			this.rowsBuffer[i + cr] = {

				idd : id,

				data : row,

				_parser : this._process_js_row,

				_locator : this._get_js_data

			};

			this.rowsAr[id] = data[i]

		}

	} else {

		for (var i = 0; i < data.rows.length; i++) {

			if (this.rowsBuffer[i + cr]) {

				continue

			}

			var id = data.rows[i].id;

			this.rowsBuffer[i + cr] = {

				idd : id,

				data : data.rows[i],

				_parser : this._process_json_row,

				_locator : this._get_json_data

			};

			this.rowsAr[id] = data.rows[i]

		}

	}

	this.callEvent("onDataReady", []);

	if (reset && this._srnd) {

		var h = this.objBox.scrollTop;

		this._reset_view();

		this.objBox.scrollTop = h

	} else {

		this.render_dataset()

	}

	this._parsing = false

};

dhtmlXGridObject.prototype._get_json_data = function(b, a) {

	var c = b.data[a];

	if (typeof c == "object") {

		return c ? c.value : ""

	} else {

		return c

	}

};

dhtmlXGridObject.prototype._process_tree_json = function(e, g, b, j) {

	this._parsing = true;

	var a = false;

	if (!g) {

		this.render_row = this.render_row_tree;

		a = true;

		g = e;

		b = g.parent || 0;

		if (b == "0") {

			b = 0

		}

		if (!this._h2) {

			this._h2 = this._createHierarchy()

		}

		if (this._fake) {

			this._fake._h2 = this._h2

		}

	}

	if (j == "js") {

		if (g.data && !b) {

			e = g.data

		}

		if (g.rows) {

			g = g.rows

		}

		for (var c = 0; c < g.length; c++) {

			var l = g[c].id;

			var h = this._h2.add(l, b);

			h.buff = {

				idd : l,

				data : g[c],

				_parser : this._process_js_row,

				_locator : this._get_js_data

			};

			if (g[c].open) {

				h.state = "minus"

			}

			this.rowsAr[l] = h.buff;

			this._process_tree_json(g[c], g[c], l, j)

		}

	} else {

		if (g.rows) {

			for (var c = 0; c < g.rows.length; c++) {

				var l = g.rows[c].id;

				var h = this._h2.add(l, b);

				h.buff = {

					idd : l,

					data : g.rows[c],

					_parser : this._process_json_row,

					_locator : this._get_json_data

				};

				if (g.rows[c].open) {

					h.state = "minus"

				}

				this.rowsAr[l] = h.buff;

				this._process_tree_json(g.rows[c], g.rows[c], l, j)

			}

		}

	}

	if (a) {

		if (b != 0) {

			this._h2.change(b, "state", "minus")

		}

		this._updateTGRState(this._h2.get[b]);

		this._h2_to_buff();

		this.callEvent("onDataReady", []);

		if (b != 0 && (this._srnd || this.pagingOn)) {

			this._renderSort()

		} else {

			this.render_dataset()

		}

		if (this._slowParse === false) {

			this.forEachRow(function(m) {

				this.render_row_tree(0, m)

			})

		}

		this._parsing = false;

		if (b != 0 && !this._srnd) {

			this.callEvent("onOpenEnd", [ b, 1 ])

		}

	}

};

function dhtmlXGridFromTable(obj, init) {

	if (typeof (obj) != "object") {

		obj = document.getElementById(obj)

	}

	var w = document.createElement("DIV");

	w.setAttribute("width",

			obj.getAttribute("gridWidth")

					|| (obj.offsetWidth ? (obj.offsetWidth + "px") : 0)

					|| (window.getComputedStyle ? window.getComputedStyle(obj,

							null)["width"]

							: (obj.currentStyle ? obj.currentStyle.width : 0)));

	w

			.setAttribute("height", obj.getAttribute("gridHeight")

					|| (obj.offsetHeight ? (obj.offsetHeight + "px") : 0)

					|| (window.getComputedStyle ? window.getComputedStyle(obj,

							null)["height"]

							: (obj.currentStyle ? obj.currentStyle.height : 0)));

	w.className = obj.className;

	obj.className = "";

	if (obj.id) {

		w.id = obj.id

	}

	var mr = obj;

	var drag = obj.getAttribute("dragAndDrop");

	mr.parentNode.insertBefore(w, mr);

	var f = mr.getAttribute("name") || ("name_" + (new Date()).valueOf());

	var windowf = new dhtmlXGridObject(w);

	window[f] = windowf;

	var acs = mr.getAttribute("onbeforeinit");

	var acs2 = mr.getAttribute("oninit");

	if (acs) {

		eval(acs)

	}

	windowf

			.setImagePath(windowf.imgURL

					|| (mr.getAttribute("imgpath")

							|| mr.getAttribute("image_path") || ""));

	var skin = mr.getAttribute("skin");

	if (skin) {

		windowf.setSkin(skin)

	}

	if (init) {

		init(windowf)

	}

	var hrow = mr.rows[0];

	var za = [];

	var zb = "";

	var zc = "";

	var zd = "";

	var ze = "";

	for (var i = 0; i < hrow.cells.length; i++) {

		za.push(hrow.cells[i].innerHTML);

		var width = hrow.cells[i].getAttribute("width")

				|| hrow.cells[i].offsetWidth

				|| (window.getComputedStyle ? window.getComputedStyle(

						hrow.cells[i], null)["width"]

						: (hrow.cells[i].currentStyle ? hrow.cells[i].currentStyle.width

								: 0));

		zb += (zb ? "," : "") + (width == "*" ? width : parseInt(width));

		zc += (zc ? "," : "") + (hrow.cells[i].getAttribute("align") || "left");

		zd += (zd ? "," : "") + (hrow.cells[i].getAttribute("type") || "ed");

		ze += (ze ? "," : "") + (hrow.cells[i].getAttribute("sort") || "str");

		var f_a = hrow.cells[i].getAttribute("format");

		if (f_a) {

			if (hrow.cells[i].getAttribute("type").toLowerCase().indexOf(

					"calendar") != -1) {

				windowf._dtmask = f_a

			} else {

				windowf.setNumberFormat(f_a, i)

			}

		}

	}

	windowf.setHeader(za);

	windowf.setInitWidths(zb);

	windowf.setColAlign(zc);

	windowf.setColTypes(zd);

	windowf.setColSorting(ze);

	if (obj.getAttribute("gridHeight") == "auto") {

		windowf.enableAutoHeigth(true)

	}

	if (obj.getAttribute("multiline")) {

		windowf.enableMultiline(true)

	}

	var lmn = mr.getAttribute("lightnavigation");

	if (lmn) {

		windowf.enableLightMouseNavigation(lmn)

	}

	var evr = mr.getAttribute("evenrow");

	var uevr = mr.getAttribute("unevenrow");

	if (evr || uevr) {

		windowf.enableAlterCss(evr, uevr)

	}

	if (drag) {

		windowf.enableDragAndDrop(true)

	}

	windowf.init();

	if (obj.getAttribute("split")) {

		windowf.splitAt(obj.getAttribute("split"))

	}

	windowf.callEvent("onXLS", []);

	windowf._process_inner_html(mr, 1);

	if (acs2) {

		eval(acs2)

	}

	if (obj.parentNode && obj.parentNode.removeChild) {

		obj.parentNode.removeChild(obj)

	}

	windowf.callEvent("onXLE", []);

	return windowf

}

dhtmlXGridObject.prototype._process_html = function(b) {

	if (b.tagName && b.tagName == "TABLE") {

		return this._process_inner_html(b, 0)

	}

	var a = document.createElement("DIV");

	a.innerHTML = b.xmlDoc.responseText;

	var c = a.getElementsByTagName("TABLE")[0];

	this._process_inner_html(c, 0)

};

dhtmlXGridObject.prototype._process_inner_html = function(c, g) {

	var b = c.rows.length;

	for (var a = g; a < b; a++) {

		var e = c.rows[a].getAttribute("id") || a;

		this.rowsBuffer.push({

			idd : e,

			data : c.rows[a],

			_parser : this._process_html_row,

			_locator : this._get_html_data

		})

	}

	this.render_dataset();

	this.setSizes()

};

dhtmlXGridObject.prototype._process_html_row = function(m, g) {

	var l = g.getElementsByTagName("TD");

	var b = [];

	m._attrs = this._xml_attrs(g);

	for (var e = 0; e < l.length; e++) {

		var h = l[e];

		var a = h.getAttribute("type");

		if (m.childNodes[e]) {

			if (a) {

				m.childNodes[e]._cellType = a

			}

			m.childNodes[e]._attrs = this._xml_attrs(l[e])

		}

		if (h.firstChild) {

			b.push(h.innerHTML)

		} else {

			b.push("")

		}

		if (h.colSpan > 1) {

			m.childNodes[e]._attrs.colspan = h.colSpan;

			for (var c = 1; c < h.colSpan; c++) {

				b.push("")

			}

		}

	}

	for (e < l.length; e < m.childNodes.length; e++) {

		m.childNodes[e]._attrs = {}

	}

	this._fillRow(m, (this._c_order ? this._swapColumns(b) : b));

	return m

};

dhtmlXGridObject.prototype._get_html_data = function(b, a) {

	b = b.firstChild;

	while (true) {

		if (!b) {

			return ""

		}

		if (b.tagName == "TD") {

			a--

		}

		if (a < 0) {

			break

		}

		b = b.nextSibling

	}

	return (b.firstChild ? b.firstChild.data : "")

};

dhtmlxEvent(window, "load", function() {

	var c = document.getElementsByTagName("table");

	for (var b = 0; b < c.length; b++) {

		if (c[b].className == "dhtmlxGrid") {

			dhtmlXGridFromTable(c[b])

		}

	}

});

function dhtmlXForm(g, e, h) {

	this.idef = {

		position : "label-left",

		labelWidth : "auto",

		labelHeight : "auto",

		inputWidth : "auto",

		inputHeight : "auto",

		labelAlign : "left",

		noteWidth : "auto",

		offsetTop : 0,

		offsetLeft : 0,

		blockOffset : 20

	};

	this.idef_const = {

		offsetNested : 20

	};

	this.apos_css = {

		"label-left" : "dhxform_item_label_left",

		"label-right" : "dhxform_item_label_right",

		"label-top" : "dhxform_item_label_top",

		"label-bottom" : "dhxform_item_label_bottom",

		absolute : "dhxform_item_absolute"

	};

	this.align_css = {

		left : "dhxform_label_align_left",

		center : "dhxform_label_align_center",

		right : "dhxform_label_align_right"

	};

	var c = this;

	this.setSkin = function(a) {

		this.skin = a;

		this.cont.className = "dhxform_obj_" + this.skin;

		this.cont.style.fontSize = (a == "material" ? "14px"

				: (a == "dhx_terrace" ? "13px" : "12px"));

		this._updateBlocks();

		this.forEachItem(function(l) {

			var j = c.getItemType(l);

			if (typeof (c.items[j]) != "undefined"

					&& typeof (c.items[j].setSkin) == "function") {

				c.doWithItem(l, "setSkin", a)

			}

		})

	};

	this.skin = (h || window.dhx4.skin

			|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

			|| window.dhx4.skinDetect("dhx_form") || "material");

	this.separator = ",";

	this.live_validate = false;

	this._type = "checkbox";

	this._rGroup = "default";

	this._idIndex = {};

	this._indexId = [];

	this.cont = (typeof (g) == "object" ? g : document.getElementById(g));

	if (!g._isNestedForm) {

		this._parentForm = true;

		this.cont.style.fontSize = (this.skin == "material" ? "14px"

				: (this.skin == "dhx_terrace" ? "13px" : "12px"));

		this.cont.className = "dhxform_obj_" + this.skin;

		this.setFontSize = function(a) {

			this.cont.style.fontSize = a;

			this._updateBlocks()

		};

		this.getForm = function() {

			return this

		};

		this.cont.onkeypress = function(j) {

			j = (j || event);

			if (j.keyCode == 13) {

				var a = (j.target || j.srcElement);

				if (typeof (a.tagName) != "undefined"

						&& String(a.tagName).toLowerCase() == "textarea"

						&& !j.ctrlKey) {

					return

				}

				c.callEvent("onEnter", [])

			}

		}

	}

	this.b_index = null;

	this.base = [];

	this._prepare = function(r, s) {

		if (this.b_index == null) {

			this.b_index = 0

		} else {

			this.b_index++

		}

		var l = null;

		var j = null;

		if (s != null) {

			if (s < 0) {

				s = 0

			}

			var n = 0;

			for (var a = 0; a < this.cont.childNodes.length; a++) {

				for (var o = 0; o < this.cont.childNodes[a].childNodes.length; o++) {

					if (j == null

							&& this.cont.childNodes[a].childNodes[o]._isNestedForm != true) {

						if (n == s) {

							l = this.cont.childNodes[a].nextSibling;

							j = this.cont.childNodes[a].childNodes[o]

						}

						n++

					}

				}

			}

		}

		this.base[this.b_index] = document.createElement("DIV");

		this.base[this.b_index].className = "dhxform_base";

		if (typeof (r) != "undefined") {

			this.base[this.b_index].style.cssText += " margin-left:" + r

					+ "px!important;"

		}

		if (l != null) {

			this.cont.insertBefore(this.base[this.b_index], l);

			l = null

		} else {

			this.cont.appendChild(this.base[this.b_index])

		}

		if (j != null) {

			while (j != null) {

				var m = j;

				j = j.nextSibling;

				this.base[this.b_index].appendChild(m);

				m = null

			}

		}

	};

	this.setSizes = function() {

	};

	this._mergeSettings = function(o) {

		var l = -1;

		var m = {

			type : "settings"

		};

		for ( var j in this.idef) {

			m[j] = this.idef[j]

		}

		for (var n = 0; n < o.length; n++) {

			if (typeof (o[n]) != "undefined" && o[n].type == "settings") {

				for ( var j in o[n]) {

					m[j] = o[n][j]

				}

				l = n

			}

		}

		o[l >= 0 ? l : o.length] = m;

		return o

	};

	this._genStr = function(a) {

		var j = "dhxId_";

		var m = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

		for (var l = 0; l < a; l++) {

			j += m.charAt(Math.floor(Math.random() * m.length))

		}

		return j

	};

	this.idPrefix = "dhxForm_" + this._genStr(12) + "_";

	this._rId = (this._parentForm ? this._genStr(12) + "_" : g._rId);

	this.objPull = {};

	this.itemPull = {};

	this._ic = 0;

	this._addItem = function(z, n, t, r, x, A, v) {

		if (this.items[z]._index) {

			this.getForm()._indexId.push(n);

			this.getForm()._idIndex[n] = {

				ind : this.getForm()._indexId.length - 1

			}

		}

		if (!z) {

			z = this._type

		}

		if (z == "list"

				&& x != null

				&& this.itemPull[this.idPrefix + x] != null

				&& typeof (this.itemPull[this.idPrefix + x]._addSubListNode) == "function") {

			var y = this.itemPull[this.idPrefix + x]._addSubListNode()

		} else {

			if (z == "newcolumn") {

				var y = {}

			} else {

				if (this.b_index == null) {

					this._prepare()

				}

				var o = this.base[this.b_index];

				var j = null;

				if (typeof (A) != "undefined" && !isNaN(A) && z != "list") {

					A = Math.max(parseInt(A), 0) + 1;

					for (var D = 0; D < this.cont.childNodes.length; D++) {

						for (var l = 0; l < this.cont.childNodes[D].childNodes.length; l++) {

							if (j == null

									&& this.cont.childNodes[D].childNodes[l]._isNestedForm != true) {

								A--;

								if (A == 0) {

									j = this.cont.childNodes[D].childNodes[l];

									o = this.cont.childNodes[D]

								}

							}

						}

					}

				} else {

					if (z == "list") {

						for ( var C in this.itemPull) {

							if (C == this.idPrefix + n) {

								j = this.itemPull[C].nextSibling;

								if (this.itemPull[C]._listBase != null

										&& this.itemPull[C]._listBase.length > 0) {

									j = this.itemPull[C]._listBase[this.itemPull[C]._listBase.length - 1]

								}

							}

						}

					}

				}

				var y = document.createElement("DIV");

				if (v == true && j != null) {

					j = j.nextSibling

				}

				if (j != null) {

					o.insertBefore(y, j)

				} else {

					o.appendChild(y)

				}

			}

		}

		y._idd = n;

		y._rId = this._rId;

		if (typeof (y.style) != "undefined") {

			if (typeof (t.offsetLeft) == "undefined"

					&& this.idef.offsetLeft > 0) {

				t.offsetLeft = this.idef.offsetLeft

			}

			if (typeof (t.offsetTop) == "undefined" && this.idef.offsetTop > 0) {

				t.offsetTop = this.idef.offsetTop

			}

			var s = "";

			if (typeof (t.offsetLeft) != "undefined") {

				s += " padding-left:" + t.offsetLeft + "px!important;"

			}

			if (typeof (t.offsetTop) != "undefined") {

				s += " padding-top:" + t.offsetTop + "px!important;"

			}

			y.style.cssText += s

		}

		if (z == "block") {

			if (isNaN(t.blockOffset)) {

				t.blockOffset = this.idef.blockOffset

			}

		}

		if (z == "list") {

			if (typeof (y._ofsNested) == "undefined") {

				y._ofsNested = this.idef_const.offsetNested

			}

			if (r != null) {

				y._sId = r

			}

			var u = this.items[z].render(y, this.skin);

			if (!this.itemPull[this.idPrefix + n]._listObj) {

				this.itemPull[this.idPrefix + n]._listObj = []

			}

			if (!this.itemPull[this.idPrefix + n]._list) {

				this.itemPull[this.idPrefix + n]._list = []

			}

			if (!this.itemPull[this.idPrefix + n]._listBase) {

				this.itemPull[this.idPrefix + n]._listBase = []

			}

			(this.itemPull[this.idPrefix + n]._listObj).push(u[0]);

			(this.itemPull[this.idPrefix + n]._list).push(u[1]);

			(this.itemPull[this.idPrefix + n]._listBase).push(y);

			u[1].checkEvent = function(a) {

				return c.checkEvent(a)

			};

			u[1].callEvent = function(a, q) {

				return c.callEvent(a, q)

			};

			u[1].getForm = function() {

				return c.getForm()

			};

			u[1]._initObj(this._mergeSettings(t));

			if (y._inBlcok) {

				y.className += " in_block"

			}

			return u[1]

		}

		if (z == "newcolumn") {

			this._prepare(t.offset, A);

			return

		}

		if (z == "label" && this._ic++ == 0) {

			t._isTopmost = true

		}

		t.position = this.apos_css[(!t.position || !this.apos_css[t.position] ? this.idef.position

				: t.position)];

		y.className = t.position

				+ (typeof (t.className) == "string" ? " " + t.className : "");

		if (!t.labelWidth) {

			t.labelWidth = this.idef.labelWidth

		}

		if (!t.labelHeight) {

			t.labelHeight = this.idef.labelHeight

		}

		if (typeof (t.wrap) != "undefined") {

			t.wrap = window.dhx4.s2b(t.wrap)

		}

		t.labelAlign = (this.align_css[t.labelAlign] ? this.align_css[t.labelAlign]

				: this.align_css[this.idef.labelAlign]);

		t.inputWidth = (t.width ? t.width : (t.inputWidth ? t.inputWidth

				: this.idef.inputWidth));

		if (!t.inputHeight) {

			t.inputHeight = this.idef.inputHeight

		}

		if (typeof (t.note) != "undefined") {

			if (t.note.length != null && t.note[0] != null) {

				t.note = t.note[0]

			}

			if (typeof (t.note.width) == "undefined") {

				t.note.width = this.idef.noteWidth

			}

			if (t.note.width == "auto") {

				t.note.width = t.inputWidth

			}

		}

		y.checkEvent = function(a) {

			return c.checkEvent(a)

		};

		y.callEvent = function(a, q) {

			return c.callEvent(a, q)

		};

		y.getForm = function() {

			return c.getForm()

		};

		y._autoCheck = function(a) {

			c._autoCheck(a)

		};

		if (typeof (t.readonly) == "string") {

			t.readonly = window.dhx4.s2b(t.readonly)

		}

		if (typeof (t.autoStart) == "string") {

			t.autoStart = window.dhx4.s2b(t.autoStart)

		}

		if (typeof (t.autoRemove) == "string") {

			t.autoRemove = window.dhx4.s2b(t.autoRemove)

		}

		if (typeof (t.titleScreen) == "string") {

			t.titleScreen = window.dhx4.s2b(t.titleScreen)

		}

		if (typeof (t.info) == "string") {

			t.info = window.dhx4.s2b(t.info)

		}

		if (typeof (t.hidden) == "string") {

			t.hidden = window.dhx4.s2b(t.hidden)

		}

		if (typeof (t.checked) == "string") {

			t.checked = window.dhx4.s2b(t.checked)

		}

		if (typeof (t.userdata) != "undefined") {

			for ( var C in t.userdata) {

				this.getForm().setUserData(n, C, t.userdata[C])

			}

		}

		if (t.validate) {

			if (typeof (t.validate != "undefined")

					&& (typeof (t.validate) == "function" || typeof (window[t.validate]) == "function")) {

				y._validate = [ t.validate ]

			} else {

				y._validate = String(t.validate).split(this.separator)

			}

		}

		if (typeof (t.required) != "undefined") {

			if (typeof (t.required) == "string") {

				t.required = window.dhx4.s2b(t.required)

			}

			y._required = (t.required == true)

		}

		if (y._required) {

			if (!y._validate) {

				y._validate = []

			}

			var m = false;

			for (l = 0; l < y._validate.length; l++) {

				m = (m || (y._validate[l] == "NotEmpty"))

			}

			if (!m) {

				y._validate.push("NotEmpty")

			}

		}

		y._ll = (t.position == this.apos_css["label-left"] || t.position == this.apos_css["label-top"]);

		this.objPull[this.idPrefix + n] = this.items[z].render(y, t);

		this.itemPull[this.idPrefix + n] = y

	};

	this._initObj = function(n, l) {

		if (typeof (n.data) != "undefined") {

			var o = null;

			if (typeof (l) != "undefined") {

				o = l.match(/(\?|\&)id\=([a-z0-9_\-]*)/i);

				if (o != null && o[0] != null) {

					o = o[0].split("=")[1]

				}

			}

			if (this.callEvent("onBeforeDataLoad", [ o,

					window.dhx4._copyObj(n.data) ]) === true) {

				this.formId = o;

				this._last_load_data = n;

				this.setFormData(n.data);

				this.resetDataProcessor("updated")

			}

			return

		}

		this._prepare();

		for (var m = 0; m < n.length; m++) {

			if (typeof (n[m]) != "undefined" && n[m].type == "settings") {

				for ( var j in n[m]) {

					this.idef[j] = n[m][j]

				}

			}

		}

		for (var m = 0; m < n.length; m++) {

			this._prepareItem(n[m])

		}

		this._autoCheck()

	};

	this._prepareItem = function(n, r, m) {

		var l = (n != null && n.type != null ? n.type : "");

		if (this.items[l]) {

			if (!n.name) {

				n.name = this._genStr(12)

			}

			var q = n.name;

			if (this.objPull[this.idPrefix + q] != null || l == "radio") {

				q = this._genStr(12)

			}

			var o = n;

			o.label = o.label || "";

			o.value = o.value;

			o.checked = window.dhx4.s2b(o.checked);

			o.disabled = window.dhx4.s2b(o.disabled);

			o.name = o.name || this._genStr(12);

			o.options = o.options || [];

			o.rows = o.rows || "none";

			o.uid = this._genStr(12);

			this._addItem(l, q, o, null, null, r, m);

			r = null;

			if (this._parentEnabled === false) {

				this._disableItem(q)

			}

			for (var j = 0; j < o.options.length; j++) {

				if (o.options[j].list != null) {

					if (!o.options[j].value) {

						o.options[j].value = this._genStr()

					}

					var a = this._addItem("list", q, o.options[j].list,

							o.options[j].value, null);

					a._subSelect = true;

					a._subSelectId = o.options[j].value

				}

			}

			if (n.list != null) {

				if (!n.listParent) {

					n.listParent = o.name

				}

				var a = this._addItem("list", q, n.list, null, n.listParent)

			}

		}

	};

	this._xmlSubItems = {

		item : "list",

		option : "options",

		note : "note",

		userdata : "_userdata"

	};

	this._xmlToObject = function(x, j) {

		if (typeof (j) == "undefined") {

			j = true

		}

		if (j) {

			var z = x.getElementsByTagName("items");

			z = (z != null && z[0] != null ? z[0] : null);

			var l = x.getElementsByTagName("data");

			l = (l != null && l[0] != null ? l[0] : null)

		} else {

			z = x

		}

		var u = (j ? [] : {});

		if (z != null) {

			for (var n = 0; n < z.childNodes.length; n++) {

				if (typeof (z.childNodes[n].tagName) != "undefined") {

					var o = z.childNodes[n].tagName;

					if (this._xmlSubItems[o] != null) {

						var r = this._xmlSubItems[o];

						if (typeof (u[r]) == "undefined") {

							u[r] = []

						}

						var v = z.childNodes[n];

						var t = {};

						for (var E = 0; E < v.attributes.length; E++) {

							var A = v.attributes[E].name;

							var y = v.attributes[E].value;

							t[A] = y

						}

						if (r == "note") {

							t.text = v.firstChild.nodeValue

						}

						if (r == "_userdata") {

							t.value = (v.firstChild != null

									&& v.firstChild.nodeValue != null ? v.firstChild.nodeValue

									: "")

						}

						var s = this._xmlToObject(v, false);

						for ( var C in s) {

							if (C == "_userdata") {

								if (!t.userdata) {

									t.userdata = {}

								}

								for (var E = 0; E < s[C].length; E++) {

									t.userdata[s[C][E].name] = s[C][E].value

								}

							} else {

								t[C] = s[C]

							}

						}

						v = null;

						if (j) {

							u.push(t)

						} else {

							u[r].push(t)

						}

					}

				}

			}

		}

		if (l != null) {

			u = {

				data : {}

			};

			for (var n = 0; n < l.childNodes.length; n++) {

				if (typeof (l.childNodes[n].tagName) != "undefined") {

					var m = l.childNodes[n].tagName;

					var D = (l.childNodes[n].firstChild != null ? l.childNodes[n].firstChild.nodeValue

							: "");

					u.data[m] = D

				}

			}

		}

		return u

	};

	this._autoCheck = function(o) {

		if (this._locked === true) {

			o = false

		} else {

			if (typeof (o) == "undefined") {

				o = true

			}

		}

		for ( var m in this.itemPull) {

			var r = (o && (this.itemPull[m]._udis !== true));

			this[r ? "_enableItem" : "_disableItem"](this.itemPull[m]._idd);

			if (this.getForm()._idIndex[this.itemPull[m]._idd] != null) {

				this.getForm()._idIndex[this.itemPull[m]._idd].enabled = r

			}

			var l = (r && (typeof (this.itemPull[m]._checked) == "boolean" ? this.itemPull[m]._checked

					: true));

			if (this.itemPull[m]._list) {

				for (var t = 0; t < this.itemPull[m]._list.length; t++) {

					var s = true;

					if (this.itemPull[m]._list[t]._subSelect == true) {

						s = false;

						var n = this.getItemValue(this.itemPull[m]._idd);

						if (!(typeof (n) == "object" && typeof (n.length) == "number")) {

							n = [ n ]

						}

						for (var j = 0; j < n.length; j++) {

							s = (n[j] == this.itemPull[m]._list[t]._subSelectId)

									|| s

						}

						this.itemPull[m]._listObj[t][s ? "show" : "hide"]

								(this.itemPull[m]._listBase[t])

					}

					this.itemPull[m]._list[t]._autoCheck(l && s)

				}

			}

		}

	};

	this.doWithItem = function(m, j, u, t, s, r) {

		if (typeof (m) == "object") {

			var w = m[0];

			var v = m[1];

			var x = null;

			var o = null;

			for ( var n in this.itemPull) {

				if ((this.itemPull[n]._value == v || v === null)

						&& this.itemPull[n]._group == w) {

					return this.objPull[n][j](this.itemPull[n], u, t, s, r)

				}

				if (this.itemPull[n]._list != null && !o) {

					for (var l = 0; l < this.itemPull[n]._list.length; l++) {

						o = this.itemPull[n]._list[l].doWithItem(m, j, u, t, s)

					}

				}

			}

			if (o != null) {

				return o

			} else {

				if (j == "getType") {

					return this.doWithItem(m[0], "getType")

				}

			}

		} else {

			if (!this.itemPull[this.idPrefix + m]) {

				var o = null;

				for ( var n in this.itemPull) {

					if (this.itemPull[n]._list && !o) {

						for (var l = 0; l < this.itemPull[n]._list.length; l++) {

							if (o == null) {

								o = this.itemPull[n]._list[l].doWithItem(m, j,

										u, t, s, r)

							}

						}

					}

				}

				return o

			} else {

				var y = this.objPull[this.idPrefix + m];

				if (y && y[j]) {

					return y[j](this.itemPull[this.idPrefix + m], u, t, s, r)

				}

			}

		}

	};

	this._removeItem = function(j, a) {

		if (a != null) {

			j = this.doWithItem([ j, a ], "destruct")

		} else {

			this.doWithItem(j, "destruct")

		}

		this._clearItemData(j)

	};

	this._clearItemData = function(m) {

		if (this.itemPull[this.idPrefix + m]) {

			m = this.idPrefix + m;

			try {

				this.objPull[m] = null;

				this.itemPull[m] = null;

				delete this.objPull[m];

				delete this.itemPull[m]

			} catch (l) {

			}

		} else {

			for ( var a in this.itemPull) {

				if (this.itemPull[a]._list) {

					for (var j = 0; j < this.itemPull[a]._list.length; j++) {

						this.itemPull[a]._list[j]._clearItemData(m)

					}

				}

			}

		}

	};

	this.isItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		return this.doWithItem(j, "isExist")

	};

	this.getItemType = function(j, a) {

		j = [ j, (a || null) ];

		return this.doWithItem(j, "getType")

	};

	this.forEachItem = function(l) {

		for ( var j in this.objPull) {

			if (this.objPull[j].t == "radio") {

				l(this.itemPull[j]._group, this.itemPull[j]._value)

			} else {

				l(String(j).replace(this.idPrefix, ""))

			}

			if (this.itemPull[j]._list) {

				for (var m = 0; m < this.itemPull[j]._list.length; m++) {

					this.itemPull[j]._list[m].forEachItem(l)

				}

			}

		}

	};

	this.setItemLabel = function(l, a, j) {

		if (j != null) {

			l = [ l, a ]

		} else {

			j = a

		}

		this.doWithItem(l, "setText", j)

	};

	this.getItemLabel = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		return this.doWithItem(j, "getText")

	};

	this._enableItem = function(a) {

		this.doWithItem(a, "enable")

	};

	this._disableItem = function(a) {

		this.doWithItem(a, "disable")

	};

	this._isItemEnabled = function(a) {

		return this.doWithItem(a, "isEnabled")

	};

	this.checkItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "check");

		this._autoCheck()

	};

	this.uncheckItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "unCheck");

		this._autoCheck()

	};

	this.isItemChecked = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		return this.doWithItem(j, "isChecked")

	};

	this.getCheckedValue = function(a) {

		return this.doWithItem([ a, null ], "getChecked")

	};

	this._getRGroup = function(o, n) {

		for ( var j in this.itemPull) {

			if (this.itemPull[j]._group == o

					&& (n == null || this.itemPull[j]._value == n)) {

				return this.itemPull[j]._idd

			}

			if (this.itemPull[j]._list != null) {

				for (var m = 0; m < this.itemPull[j]._list.length; m++) {

					var l = this.itemPull[j]._list[m]._getRGroup(o, n);

					if (l != null) {

						return l

					}

				}

			}

		}

		return null

	};

	this.setItemValue = function(j, a) {

		this.resetValidateCss(j, a);

		if (this.getItemType(j) == "radio") {

			if (this._getRGroup(j, a) != null) {

				this.checkItem(j, a)

			} else {

				this.uncheckItem(j, this.getCheckedValue(j))

			}

			return null

		}

		return this.doWithItem(j, "setValue", a)

	};

	this.getItemValue = function(j, a) {

		if (this.getItemType(j) == "radio") {

			return this.getCheckedValue(j)

		}

		return this.doWithItem(j, "getValue", a)

	};

	this.updateValues = function() {

		this._updateValues()

	};

	this.showItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "show")

	};

	this.hideItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "hide")

	};

	this.isItemHidden = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		return this.doWithItem(j, "isHidden")

	};

	this.getOptions = function(a) {

		return this.doWithItem(a, "getOptions")

	};

	this.setItemWidth = function(j, a) {

		this.doWithItem(j, "setWidth", a)

	};

	this.getItemWidth = function(a) {

		return this.doWithItem(a, "getWidth")

	};

	this.setItemHeight = function(j, a) {

		this.doWithItem(j, "setHeight", a)

	};

	this.setItemFocus = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "setFocus")

	};

	this._updateValues = function() {

		for ( var j in this.itemPull) {

			if (this.objPull[j]

					&& typeof (this.objPull[j].updateValue) == "function") {

				this.objPull[j].updateValue(this.itemPull[j])

			}

			if (this.itemPull[j]._list) {

				for (var l = 0; l < this.itemPull[j]._list.length; l++) {

					this.itemPull[j]._list[l]._updateValues()

				}

			}

		}

	};

	this._getItemByName = function(n) {

		for ( var j in this.itemPull) {

			if (this.itemPull[j]._idd == n) {

				return this.itemPull[j]

			}

			if (this.itemPull[j]._list != null) {

				for (var m = 0; m < this.itemPull[j]._list.length; m++) {

					var l = this.itemPull[j]._list[m]._getItemByName(n);

					if (l != null) {

						return l

					}

				}

			}

		}

		return null

	};

	this._resetValidateCss = function(a) {

		a.className = (a.className).replace(a._vcss, "");

		a._vcss = null

	};

	this.setValidateCss = function(a, m, l) {

		var j = this._getItemByName(a);

		if (!j) {

			return

		}

		if (j._vcss != null) {

			this._resetValidateCss(j)

		}

		j._vcss = (typeof (l) == "string" ? l : "validate_"

				+ (m === true ? "ok" : "error"));

		j.className += " " + j._vcss

	};

	this.resetValidateCss = function(l) {

		for ( var j in this.itemPull) {

			if (this.itemPull[j]._vcss != null) {

				this._resetValidateCss(this.itemPull[j])

			}

			if (this.itemPull[j]._list != null) {

				for (var m = 0; m < this.itemPull[j]._list.length; m++) {

					this.itemPull[j]._list[m].resetValidateCss()

				}

			}

		}

	};

	this._validateLoop = function(l) {

		for ( var j in this.objPull) {

			l(String(j).replace(this.idPrefix, ""));

			if (this.itemPull[j]._list) {

				for (var m = 0; m < this.itemPull[j]._list.length; m++) {

					this.itemPull[j]._list[m]._validateLoop(l)

				}

			}

		}

	};

	this.validate = function(j) {

		if (this.callEvent("onBeforeValidate", []) == false) {

			return

		}

		var a = true;

		this._validateLoop(function(m, n) {

			var l = c.doWithItem(m, "_validate");

			if (typeof (l) != "boolean") {

				l = true

			}

			a = l && a

		}, true);

		this.callEvent("onAfterValidate", [ a ]);

		return a

	};

	this.validateItem = function(a, j) {

		if (typeof (j) != "undefined") {

			a = [ a, j ]

		}

		return this.doWithItem(a, "_validate")

	};

	this.enableLiveValidation = function(a) {

		this.live_validate = (a == true)

	};

	this.setReadonly = function(j, a) {

		this.doWithItem(j, "setReadonly", a)

	};

	this.isReadonly = function(a) {

		return this.doWithItem(a, "isReadonly")

	};

	this.getFirstActive = function(j) {

		for (var m = 0; m < this._indexId.length; m++) {

			var a = true;

			if (j == true) {

				var l = this.getItemType(this._indexId[m]);

				if (!dhtmlXForm.prototype.items[l].setFocus) {

					a = false

				}

			}

			if (a && this._idIndex[this._indexId[m]].enabled) {

				return this._indexId[m]

			}

		}

		return null

	};

	this.setFocusOnFirstActive = function() {

		var a = this.getFirstActive(true);

		if (a != null) {

			this.setItemFocus(a)

		}

	};

	this.enableItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "userEnable");

		this._autoCheck()

	};

	this.disableItem = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		this.doWithItem(j, "userDisable");

		this._autoCheck()

	};

	this.isItemEnabled = function(j, a) {

		if (a != null) {

			j = [ j, a ]

		}

		return this.doWithItem(j, "isUserEnabled")

	};

	this.clear = function() {

		var j = {};

		this.formId = (new Date()).valueOf();

		this.resetDataProcessor("inserted");

		for ( var l in this.itemPull) {

			var m = this.itemPull[l]._idd;

			if (this.itemPull[l]._type == "ch") {

				this.uncheckItem(m)

			}

			if (this.itemPull[l]._type in {

				ta : 1,

				editor : 1,

				calendar : 1,

				pw : 1,

				hd : 1

			}) {

				this.setItemValue(m, "")

			}

			if (this.itemPull[l]._type == "combo") {

				this.itemPull[l]._apiChange = true;

				var s = this.getCombo(m);

				s.selectOption(0);

				s = null;

				this.itemPull[l]._apiChange = false

			}

			if (this.itemPull[l]._type == "se") {

				var o = this.getOptions(m);

				if (o.length > 0) {

					o[0].selected = true

				}

			}

			if (this.itemPull[l]._type == "ra") {

				var n = this.itemPull[l]._group;

				if (!j[n]) {

					this.checkItem(n, this.doWithItem(m, "_getFirstValue"));

					j[n] = true

				}

			}

			if (this.itemPull[l]._list) {

				for (var r = 0; r < this.itemPull[l]._list.length; r++) {

					this.itemPull[l]._list[r].clear()

				}

			}

			if (this["setFormData_" + this.itemPull[l]._type]) {

				this["setFormData_" + this.itemPull[l]._type](m, "")

			}

		}

		j = null;

		if (this._parentForm) {

			this._autoCheck()

		}

		this.resetValidateCss()

	};

	this.unload = function() {

		window.dhx4._enableDataLoading(this, null, null, null, "clear");

		window.dhx4._eventable(this, "clear");

		for ( var j in this.objPull) {

			this._removeItem(String(j).replace(this.idPrefix, ""))

		}

		if (this._ccTm) {

			window.clearTimeout(this._ccTm)

		}

		this._formLS = null;

		for (var l = 0; l < this.base.length; l++) {

			while (this.base[l].childNodes.length > 0) {

				this.base[l].removeChild(this.base[l].childNodes[0])

			}

			if (this.base[l].parentNode) {

				this.base[l].parentNode.removeChild(this.base[l])

			}

			this.base[l] = null

		}

		this.base = null;

		this.cont.onkeypress = null;

		this.cont.className = "";

		this.cont = null;

		for ( var j in this) {

			this[j] = null

		}

		c = null

	};

	for ( var b in this.items) {

		this.items[b].t = b;

		if (typeof (this.items[b]._index) == "undefined") {

			this.items[b]._index = true

		}

		if (!this.items[b].show) {

			this.items[b].show = function(a) {

				a.style.display = "";

				if (a._listObj) {

					for (var j = 0; j < a._listObj.length; j++) {

						a._listObj[j].show(a._listBase[j])

					}

				}

			}

		}

		if (!this.items[b].hide) {

			this.items[b].hide = function(a) {

				a.style.display = "none";

				if (a._listObj) {

					for (var j = 0; j < a._listObj.length; j++) {

						a._listObj[j].hide(a._listBase[j])

					}

				}

			}

		}

		if (!this.items[b].isHidden) {

			this.items[b].isHidden = function(a) {

				return (a.style.display == "none")

			}

		}

		if (!this.items[b].userEnable) {

			this.items[b].userEnable = function(a) {

				a._udis = false

			}

		}

		if (!this.items[b].userDisable) {

			this.items[b].userDisable = function(a) {

				a._udis = true

			}

		}

		if (!this.items[b].isUserEnabled) {

			this.items[b].isUserEnabled = function(a) {

				return (a._udis !== true)

			}

		}

		if (!this.items[b].getType) {

			this.items[b].getType = function() {

				return this.t

			}

		}

		if (!this.items[b].isExist) {

			this.items[b].isExist = function() {

				return true

			}

		}

		if (!this.items[b]._validate) {

			this.items[b]._validate = function(l) {

				if (!l._validate || !l._enabled) {

					return true

				}

				if (l._type == "ch" || l._type == "ra") {

					var o = (this.isChecked(l) ? this.getValue(l) : 0);

					if (l._type == "ra" && typeof (o) == "undefined") {

						o = 0

					}

				} else {

					var o = this.getValue(l)

				}

				var j = true;

				for (var n = 0; n < l._validate.length; n++) {

					var a = "is" + l._validate[n];

					if ((o == null || o.length == 0) && a != "isNotEmpty"

							&& l._type != "container") {

					} else {

						var m = dhtmlxValidation[a];

						if (l._type == "container" && typeof (m) == "function") {

							m = function() {

								return true

							}

						}

						if (typeof (m) != "function"

								&& typeof (l._validate[n]) == "function") {

							m = l._validate[n]

						}

						if (typeof (m) != "function"

								&& typeof (window[l._validate[n]]) == "function") {

							m = window[l._validate[n]]

						}

						j = ((typeof (m) == "function" ? m(o, l._idd)

								: new RegExp(l._validate[n]).test(o)) && j);

						m = null

					}

				}

				if (!(l.callEvent("onValidate" + (j ? "Success" : "Error"), [

						l._idd, o, j ]) === false)) {

					l.getForm().setValidateCss(l._idd, j)

				}

				return j

			}

		}

	}

	this._locked = false;

	this._doLock = function(j) {

		var a = (j === true ? true : false);

		if (this._locked == a) {

			return

		} else {

			this._locked = a

		}

		this._autoCheck(!this._locked)

	};

	this.lock = function() {

		this._doLock(true)

	};

	this.unlock = function() {

		this._doLock(false)

	};

	this.isLocked = function() {

		return this._locked

	};

	this.setNumberFormat = function(m, j, a, l) {

		return this.doWithItem(m, "setNumberFormat", j, a, l)

	};

	window.dhx4._enableDataLoading(this, "_initObj", "_xmlToObject", "items", {

		struct : true,

		data : true

	});

	window.dhx4._eventable(this);

	this.attachEvent("_onButtonClick", function(a, j) {

		this.callEvent("onButtonClick", [ a, j ])

	});

	this._updateBlocks = function() {

		this.forEachItem(function(a) {

			if (c.getItemType(a) == "block" || c.getItemType(a) == "combo") {

				c.doWithItem(a, "_setCss", c.skin, c.cont.style.fontSize)

			}

		})

	};

	this._isObj = function(a) {

		return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined")

	};

	this._copyObj = function(m) {

		if (this._isObj(m)) {

			var l = {};

			for ( var j in m) {

				if (typeof (m[j]) == "object" && m[j] != null) {

					l[j] = this._copyObj(m[j])

				} else {

					l[j] = m[j]

				}

			}

		} else {

			var l = [];

			for (var j = 0; j < m.length; j++) {

				if (typeof (m[j]) == "object" && m[j] != null) {

					l[j] = this._copyObj(m[j])

				} else {

					l[j] = m[j]

				}

			}

		}

		return l

	};

	if (e != null && typeof (e) == "object") {

		this._initObj(this._copyObj(e))

	}

	if (this._parentForm) {

		this._updateBlocks()

	}

	this._ccActive = false;

	this._ccTm = null;

	return this

}

dhtmlXForm.prototype.getInput = function(a) {

	return this.doWithItem(a, "getInput")

};

dhtmlXForm.prototype.getSelect = function(a) {

	return this.doWithItem(a, "getSelect")

};

dhtmlXForm.prototype.items = {};

dhtmlXForm.prototype.items.checkbox = {

	getInput : function(a) {

		return a.getElementsByTagName("INPUT")[0]

	},

	render : function(a, b) {

		a._type = "ch";

		a._enabled = true;

		a._checked = false;

		a._value = (typeof (b.value) == "undefined" ? null : String(b.value));

		a._ro = (b.readonly == true);

		if (b._autoInputWidth !== false) {

			b.inputWidth = 14

		}

		this.doAddLabel(a, b);

		this.doAddInput(a, b, "INPUT", "TEXT", true, true, "dhxform_textarea");

		a.childNodes[a._ll ? 1 : 0].className += " dhxform_img_node";

		var c = document.createElement("DIV");

		c.className = "dhxform_img chbx0";

		a.appendChild(c);

		if (!isNaN(b.inputLeft)) {

			a.childNodes[a._ll ? 1 : 0].style.left = parseInt(b.inputLeft)

					+ "px"

		}

		if (!isNaN(b.inputTop)) {

			a.childNodes[a._ll ? 1 : 0].style.top = parseInt(b.inputTop) + "px"

		}

		a.childNodes[a._ll ? 1 : 0].appendChild(c);

		a.childNodes[a._ll ? 1 : 0].firstChild.value = String(b.value);

		a._updateImgNode = function(g, h) {

			var e = g.childNodes[g._ll ? 1 : 0].lastChild;

			e.className = (h ? "dhxform_actv_c" : "dhxform_img") + " "

					+ (g._checked ? "chbx1" : "chbx0");

			g = e = null

		};

		a._doOnFocus = function(e) {

			e.getForm().callEvent("onFocus", [ e._idd ])

		};

		a._doOnBlur = function(e) {

			e.getForm().callEvent("onBlur", [ e._idd ])

		};

		a._doOnKeyUpDown = function(g, e) {

			this.callEvent(g, [

					this.childNodes[this._ll ? 0 : 1].childNodes[0], e,

					this._idd ])

		};

		if (b.checked == true) {

			this.check(a)

		}

		if (b.hidden == true) {

			this.hide(a)

		}

		if (b.disabled == true) {

			this.userDisable(a)

		}

		this.doAttachEvents(a);

		return this

	},

	destruct : function(a) {

		a._doOnFocus = a._doOnBlur = a._updateImgNode = null;

		this.doUnloadNestedLists(a);

		this.doDestruct(a)

	},

	doAddLabel : function(b, c) {

		var a = document.createElement("DIV");

		a.className = "dhxform_label " + c.labelAlign;

		if (c.wrap == true) {

			a.style.whiteSpace = "normal"

		}

		if (b._ll) {

			b.insertBefore(a, b.firstChild)

		} else {

			b.appendChild(a)

		}

		if (typeof (c.tooltip) != "undefined") {

			a.title = c.tooltip

		}

		a.innerHTML = "<div class='dhxform_label_nav_link' onfocus='if(this.parentNode.parentNode._updateImgNode)this.parentNode.parentNode._updateImgNode(this.parentNode.parentNode,true);this.parentNode.parentNode._doOnFocus(this.parentNode.parentNode);' onblur='if(this.parentNode.parentNode._updateImgNode)this.parentNode.parentNode._updateImgNode(this.parentNode.parentNode,false);this.parentNode.parentNode._doOnBlur(this.parentNode.parentNode);' onkeypress='var e=event||window.arguments[0];if(e.keyCode==32||e.charCode==32){e.cancelBubble=true;if(e.preventDefault)e.preventDefault();else e.returnValue=false;_dhxForm_doClick(this,\"mousedown\");return false;}' onkeyup='var e=event||window.arguments[0];this.parentNode.parentNode._doOnKeyUpDown(\"onKeyUp\",e);' onkeydown='var e=event||window.arguments[0];this.parentNode.parentNode._doOnKeyUpDown(\"onKeyDown\",e);' "

				+ (window.dhx4.isIPad ? "ontouchstart='var e=event;e.preventDefault();_dhxForm_doClick(this,\"mousedown\");' "

						: "")

				+ "role='link' tabindex='0'>"

				+ c.label

				+ (c.info ? "<span class='dhxform_info'>[?]</span>" : "")

				+ (b._required ? "<span class='dhxform_item_required'>*</span>"

						: "") + "</div>";

		if (!isNaN(c.labelWidth)) {

			a.firstChild.style.width = parseInt(c.labelWidth) + "px"

		}

		if (!isNaN(c.labelHeight)) {

			a.firstChild.style.height = parseInt(c.labelHeight) + "px"

		}

		if (!isNaN(c.labelLeft)) {

			a.style.left = parseInt(c.labelLeft) + "px"

		}

		if (!isNaN(c.labelTop)) {

			a.style.top = parseInt(c.labelTop) + "px"

		}

	},

	doAddInput : function(r, e, b, m, n, g, h) {

		var a = document.createElement("DIV");

		a.className = "dhxform_control";

		if (r._ll) {

			r.appendChild(a)

		} else {

			r.insertBefore(a, r.firstChild)

		}

		var q = document.createElement(b);

		q.className = h;

		q.name = r._idd;

		q._idd = r._idd;

		q.id = e.uid;

		if (typeof (m) == "string") {

			q.type = m

		}

		if (b == "INPUT" || b == "TEXTAREA") {

			q.onkeyup = function(s) {

				s = s || event;

				r.callEvent("onKeyUp", [ this, s, this._idd ])

			};

			q.onkeydown = function(s) {

				s = s || event;

				r.callEvent("onKeyDown", [ this, s, this._idd ])

			}

		}

		if (b == "SELECT" && e.type == "select"

				&& r.getForm().skin == "material") {

			if (window.dhx4.isOpera || window.dhx4.isChrome) {

				q.className += " dhxform_arrow_fix_webkit"

			} else {

				if (window.dhx4.isEdge) {

					q.className += " dhxform_arrow_fix_edge"

				} else {

					if (window.dhx4.isFF) {

						q.className += " dhxform_fix_ff"

					}

				}

			}

		}

		a.appendChild(q);

		if (n) {

			if (!isNaN(e.inputLeft)) {

				a.style.left = parseInt(e.inputLeft) + "px"

			}

			if (!isNaN(e.inputTop)) {

				a.style.top = parseInt(e.inputTop) + "px"

			}

		}

		var o = "";

		var j = false;

		if (g) {

			if (!isNaN(e.inputWidth)) {

				o += "width:" + parseInt(e.inputWidth) + "px;";

				j = true

			}

			if (!isNaN(e.inputHeight)) {

				o += "height:" + parseInt(e.inputHeight) + "px;"

			}

		}

		if (typeof (e.style) == "string") {

			o += e.style

		}

		q.style.cssText = o;

		if (e.maxLength) {

			q.setAttribute("maxLength", e.maxLength)

		}

		if (e.connector) {

			q.setAttribute("connector", e.connector)

		}

		var c = (dhtmlXForm.prototype.items[this.t] != null ? dhtmlXForm.prototype.items[this.t]._dimFix == true

				: false);

		if (j && ({

			input : 1,

			password : 1,

			select : 1,

			multiselect : 1,

			calendar : 1,

			colorpicker : 1

		}[this.t] == 1 || c)) {

			if (dhtmlXForm.prototype.items[this.t]._dim == null) {

				dhtmlXForm.prototype.items[this.t]._dim = r.getForm()

						._checkDim(a, q)

			}

			q.style.width = parseInt(q.style.width)

					- dhtmlXForm.prototype.items[this.t]._dim + "px"

		}

		if (typeof (e.note) == "object") {

			var l = document.createElement("DIV");

			l.className = "dhxform_note";

			l.style.width = (isNaN(e.note.width) ? q.offsetWidth

					: parseInt(e.note.width))

					+ "px";

			l._w = e.note.width;

			l.innerHTML = e.note.text;

			a.appendChild(l);

			l = null

		}

		if (e.readonly) {

			this.setReadonly(r, true)

		}

		if (e.disabled == true) {

			this.userDisable(r)

		}

		if (e.hidden == true && this.t != "combo") {

			this.hide(r)

		}

	},

	doUnloadNestedLists : function(a) {

		if (!a._list) {

			return

		}

		for (var b = 0; b < a._list.length; b++) {

			a._list[b].unload();

			a._list[b] = null;

			a._listObj[b] = null;

			a._listBase[b].parentNode.removeChild(a._listBase[b]);

			a._listBase[b] = null

		}

		a._list = null;

		a._listObj = null;

		a._listBase = null

	},

	doDestruct : function(a) {

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		a._autoCheck = null;

		a._checked = null;

		a._enabled = null;

		a._idd = null;

		a._type = null;

		a._value = null;

		a._group = null;

		a.onselectstart = null;

		a.childNodes[a._ll ? 1 : 0].onmousedown = null;

		a.childNodes[a._ll ? 1 : 0].ontouchstart = null;

		a.childNodes[a._ll ? 0 : 1].onmousedown = null;

		a.childNodes[a._ll ? 0 : 1].ontouchstart = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onfocus = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onblur = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onkeypress = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onkeyup = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onkeydown = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onmousedown = null;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].ontouchstart = null;

		a.childNodes[a._ll ? 0 : 1]

				.removeChild(a.childNodes[a._ll ? 0 : 1].childNodes[0]);

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a.parentNode.removeChild(a);

		a = null

	},

	doAttachEvents : function(b) {

		var a = this;

		b.childNodes[b._ll ? 1 : 0][window.dhx4.isIPad ? "ontouchstart"

				: "onmousedown"] = function(g) {

			g = g || event;

			if (g.preventDefault) {

				g.preventDefault()

			}

			var c = (g.target || g.srcElement);

			if (!this.parentNode._enabled

					|| this.parentNode._ro

					|| (typeof (c.className) != "undefined" && c.className == "dhxform_note")) {

				g.cancelBubble = true;

				if (g.preventDefault) {

					g.preventDefault()

				} else {

					g.returnValue = false

				}

				return false

			}

			a.doClick(this.parentNode)

		};

		b.childNodes[b._ll ? 0 : 1].childNodes[0][window.dhx4.isIPad ? "ontouchstart"

				: "onmousedown"] = function(g) {

			g = g || event;

			if (g.preventDefault) {

				g.preventDefault()

			}

			if (!this.parentNode.parentNode._enabled) {

				g.cancelBubble = true;

				if (g.preventDefault) {

					g.preventDefault()

				} else {

					g.returnValue = false

				}

				return false

			}

			var c = g.target || g.srcElement;

			if (typeof (c.className) != "undefined"

					&& c.className == "dhxform_info") {

				this.parentNode.parentNode.callEvent("onInfo", [

						this.parentNode.parentNode._idd, g ]);

				g.cancelBubble = true;

				if (g.preventDefault) {

					g.preventDefault()

				} else {

					g.returnValue = false

				}

				return false

			}

			a.doClick(this.parentNode.parentNode)

		}

	},

	doClick : function(a) {

		a.childNodes[a._ll ? 0 : 1].childNodes[0].focus();

		if (!a._enabled || a._ro) {

			return

		}

		if (a.checkEvent("onBeforeChange")) {

			if (a.callEvent("onBeforeChange", [ a._idd, a._value, a._checked ]) !== true) {

				return

			}

		}

		this.setChecked(a, !a._checked);

		a._autoCheck();

		a.callEvent("onChange", [ a._idd, a._value, a._checked ])

	},

	doCheckValue : function(a) {

		if (a._checked && a._enabled) {

			a.childNodes[a._ll ? 1 : 0].firstChild.name = String(a._idd);

			a.childNodes[a._ll ? 1 : 0].firstChild.value = this.getValue(a)

		} else {

			a.childNodes[a._ll ? 1 : 0].firstChild.name = "";

			a.childNodes[a._ll ? 1 : 0].firstChild.value = ""

		}

	},

	setChecked : function(a, b) {

		a._checked = (b === true ? true : false);

		a.childNodes[a._ll ? 1 : 0].lastChild.className = a.childNodes[a._ll ? 1

				: 0].lastChild.className.replace(/chbx[0-1]{1}/gi, "")

				+ (a._checked ? " chbx1" : " chbx0");

		this.doCheckValue(a)

	},

	check : function(a) {

		this.setChecked(a, true)

	},

	unCheck : function(a) {

		this.setChecked(a, false)

	},

	isChecked : function(a) {

		return a._checked

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].tabIndex = 0;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].removeAttribute("disabled");

		this.doCheckValue(a)

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false;

		if (a._updateImgNode != null) {

			a._updateImgNode(a, false)

		}

		a.childNodes[a._ll ? 0 : 1].childNodes[0].tabIndex = -1;

		a.childNodes[a._ll ? 0 : 1].childNodes[0].setAttribute("disabled",

				"true");

		this.doCheckValue(a)

	},

	isEnabled : function(a) {

		return a._enabled

	},

	setText : function(a, b) {

		a.childNodes[a._ll ? 0 : 1].childNodes[0].innerHTML = b

				+ (a._required ? "<span class='dhxform_item_required'>*</span>"

						: "")

	},

	getText : function(a) {

		return a.childNodes[a._ll ? 0 : 1].childNodes[0].innerHTML.replace(

				/<span class=\"dhxform_item_required\">[^<]*<\/span>/g, "")

	},

	setValue : function(a, b) {

		this

				.setChecked(

						a,

						(b === true || parseInt(b) == 1 || b == "true" || a._value === b))

	},

	getValue : function(a, b) {

		if (b == "realvalue") {

			return a._value

		}

		return ((typeof (a._value) == "undefined" || a._value == null) ? (a._checked ? 1

				: 0)

				: a._value)

	},

	setReadonly : function(a, b) {

		a._ro = (b === true)

	},

	isReadonly : function(a) {

		return a._ro

	},

	setFocus : function(a) {

		a.childNodes[a._ll ? 0 : 1].childNodes[0].focus()

	}

};

dhtmlXForm.prototype.items.radio = {

	input : {},

	r : {},

	firstValue : {},

	render : function(c, e, b) {

		c._type = "ra";

		c._enabled = true;

		c._checked = false;

		c._group = e.name;

		c._value = e.value;

		c._uid = b;

		c._ro = (e.readonly == true);

		c._rName = c._rId + c._group;

		this.r[c._idd] = c;

		e.inputWidth = 14;

		this.doAddLabel(c, e);

		this.doAddInput(c, e, "INPUT", "TEXT", true, true, "dhxform_textarea");

		c.childNodes[c._ll ? 1 : 0].className += " dhxform_img_node";

		var g = document.createElement("DIV");

		g.className = "dhxform_img rdbt0";

		c.appendChild(g);

		if (!isNaN(e.inputLeft)) {

			c.childNodes[c._ll ? 1 : 0].style.left = parseInt(e.inputLeft)

					+ "px"

		}

		if (!isNaN(e.inputTop)) {

			c.childNodes[c._ll ? 1 : 0].style.top = parseInt(e.inputTop) + "px"

		}

		c.childNodes[c._ll ? 1 : 0].appendChild(g);

		c.childNodes[c._ll ? 1 : 0].firstChild.name = "";

		c.childNodes[c._ll ? 1 : 0].firstChild.value = "";

		c._updateImgNode = function(j, l) {

			var h = j.childNodes[j._ll ? 1 : 0].lastChild;

			h.className = (l ? "dhxform_actv_r" : "dhxform_img") + " "

					+ (j._checked ? "rdbt1" : "rdbt0");

			j = h = null

		};

		c._doOnFocus = function(h) {

			h.getForm().callEvent("onFocus", [ h._group, h._value ])

		};

		c._doOnBlur = function(h) {

			h.getForm().callEvent("onBlur", [ h._group, h._value ])

		};

		c._doOnKeyUpDown = function(j, h) {

			this.callEvent(j, [

					this.childNodes[this._ll ? 0 : 1].childNodes[0], h,

					this._group, this._value ])

		};

		if (this.input[c._rName] == null) {

			var a = document.createElement("INPUT");

			a.type = "HIDDEN";

			a.name = e.name;

			a.firstValue = c._value;

			c.appendChild(a);

			this.input[c._rName] = a

		}

		if (!this.firstValue[c._rName]) {

			this.firstValue[c._rName] = e.value

		}

		if (e.checked == true) {

			this.check(c)

		}

		if (e.hidden == true) {

			this.hide(c)

		}

		if (e.disabled == true) {

			this.userDisable(c)

		}

		this.doAttachEvents(c);

		return this

	},

	destruct : function(e, g) {

		if (e.lastChild == this.input[e._rName]) {

			var c = false;

			for ( var b in this.r) {

				if (!c && this.r[b]._group == e._group

						&& this.r[b]._idd != e._idd) {

					this.r[b].appendChild(this.input[e._rName]);

					c = true

				}

			}

			if (!c) {

				this.input[e._rName].parentNode

						.removeChild(this.input[e._rName]);

				this.input[e._rName] = null;

				this.firstValue[e._rName] = null

			}

		}

		this.r[e._idd] = null;

		delete this.r[e._idd];

		e._doOnFocus = e._doOnBlur = e._updateImgNode = null;

		this.doUnloadNestedLists(e);

		this.doDestruct(e);

		var h = e._idd;

		e = null;

		return h

	},

	doClick : function(b) {

		b.childNodes[b._ll ? 0 : 1].childNodes[0].focus();

		if (!(b._enabled && !b._checked)) {

			return

		}

		if (b._ro) {

			return

		}

		var a = [ b._group, b._value, true ];

		if (b.checkEvent("onBeforeChange")) {

			if (b.callEvent("onBeforeChange", a) !== true) {

				return

			}

		}

		this.setChecked(b, true);

		b.getForm()._autoCheck();

		b.callEvent("onChange", a)

	},

	doCheckValue : function(c) {

		var e = null;

		for ( var b in this.r) {

			if (this.r[b]._checked && this.r[b]._group == c._group

					&& this.r[b]._rId == c._rId) {

				e = this.r[b]._value

			}

		}

		if (e != null && this.r[b]._enabled) {

			this.input[c._rName].name = String(c._group);

			this.input[c._rName].value = e

		} else {

			this.input[c._rName].name = "";

			this.input[c._rName].value = ""

		}

		this.input[c._rName]._value = e

	},

	setChecked : function(g, h) {

		h = (h === true);

		for ( var b in this.r) {

			if (this.r[b]._group == g._group && this.r[b]._rId == g._rId) {

				var e = false;

				if (this.r[b]._idd == g._idd) {

					if (this.r[b]._checked != h) {

						this.r[b]._checked = h;

						e = true

					}

				} else {

					if (this.r[b]._checked) {

						this.r[b]._checked = false;

						e = true

					}

				}

				if (e) {

					var c = this.r[b].childNodes[this.r[b]._ll ? 1 : 0].childNodes[1];

					c.className = c.className.replace(/rdbt[0-1]{1}/gi, "")

							+ (this.r[b]._checked ? " rdbt1" : " rdbt0");

					c = null

				}

			}

		}

		this.doCheckValue(g)

	},

	getChecked : function(a) {

		return this.input[a._rName]._value

	},

	_getFirstValue : function(a) {

		return this.firstValue[a._rName]

	},

	_getId : function(a) {

		return a._idd

	},

	setValue : function(a, b) {

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doDestruct : 1,

		doUnloadNestedLists : 1,

		doAttachEvents : 1,

		check : 1,

		unCheck : 1,

		isChecked : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setText : 1,

		getText : 1,

		getValue : 1,

		setReadonly : 1,

		isReadonly : 1,

		setFocus : 1

	}) {

		dhtmlXForm.prototype.items.radio[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.select = {

	render : function(a, b) {

		a._type = "se";

		a._enabled = true;

		a._value = null;

		a._newValue = null;

		this.doAddLabel(a, b);

		this.doAddInput(a, b, "SELECT", null, true, true, "dhxform_select");

		this.doAttachEvents(a);

		this.doLoadOpts(a, b);

		if (b.connector != null) {

			this.doLoadOptsConnector(a, b.connector)

		}

		if (typeof (b.value) != "undefined" && b.value != null) {

			this.setValue(a, b.value)

		}

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		a._autoCheck = null;

		a._enabled = null;

		a._idd = null;

		a._type = null;

		a._value = null;

		a._newValue = null;

		a.onselectstart = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onclick = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onkeydown = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onchange = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onfocus = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onblur = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onkeyup = null;

		a.childNodes[a._ll ? 1 : 0]

				.removeChild(a.childNodes[a._ll ? 1 : 0].childNodes[0]);

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a.parentNode.removeChild(a);

		a = null

	},

	doAddLabel : function(b, c) {

		var a = document.createElement("DIV");

		a.className = "dhxform_label " + c.labelAlign;

		a.innerHTML = "<label for='"

				+ c.uid

				+ "'>"

				+ c.label

				+ (c.info ? "<span class='dhxform_info'>[?]</span>" : "")

				+ (b._required ? "<span class='dhxform_item_required'>*</span>"

						: "") + "</label>";

		if (c.wrap == true) {

			a.style.whiteSpace = "normal"

		}

		if (typeof (c.tooltip) != "undefined") {

			a.title = c.tooltip

		}

		b.appendChild(a);

		if (typeof (c.label) == "undefined" || c.label == null

				|| c.label.length == 0) {

			a.style.display = "none"

		}

		if (!isNaN(c.labelWidth)) {

			a.style.width = parseInt(c.labelWidth) + "px"

		}

		if (!isNaN(c.labelHeight)) {

			a.style.height = parseInt(c.labelHeight) + "px"

		}

		if (!isNaN(c.labelLeft)) {

			a.style.left = parseInt(c.labelLeft) + "px"

		}

		if (!isNaN(c.labelTop)) {

			a.style.top = parseInt(c.labelTop) + "px"

		}

		if (c.info) {

			a.onclick = function(h) {

				h = h || event;

				var g = h.target || h.srcElement;

				if (typeof (g.className) != "undefined"

						&& g.className == "dhxform_info") {

					this.parentNode.callEvent("onInfo", [ this.parentNode._idd,

							h ]);

					h.cancelBubble = true;

					if (h.preventDefault) {

						h.preventDefault()

					} else {

						h.returnValue = false

					}

					return false

				}

			}

		}

	},

	doAttachEvents : function(c) {

		var a = c.childNodes[c._ll ? 1 : 0].childNodes[0];

		var b = this;

		a.onclick = function() {

			b.doOnChange(this)

		};

		a.onkeydown = function(g) {

			g = g || event;

			b.doOnChange(this);

			this.parentNode.parentNode.callEvent("onKeyDown", [ this, g,

					this.parentNode.parentNode._idd ])

		};

		a.onchange = function() {

			b.doOnChange(this)

		};

		a.onkeyup = function(g) {

			g = g || event;

			this.parentNode.parentNode.callEvent("onKeyUp", [ this, g,

					this.parentNode.parentNode._idd ])

		};

		a = null;

		this.doAttachChangeLS(c)

	},

	doAttachChangeLS : function(b) {

		var a = b.childNodes[b._ll ? 1 : 0].childNodes[0];

		a.onfocus = function() {

			var c = this.parentNode.parentNode;

			c.getForm()._ccActivate(c._idd, this,

					c.getForm().getItemValue(c._idd, true));

			c.getForm().callEvent("onFocus", [ c._idd ]);

			c = null

		};

		a.onblur = function() {

			var c = this.parentNode.parentNode;

			c.getForm()._ccDeactivate(c._idd);

			c.getForm().callEvent("onBlur", [ c._idd ]);

			c = null

		};

		a = null

	},

	doValidate : function(a) {

		if (a.getForm().live_validate) {

			this._validate(a)

		}

	},

	doLoadOpts : function(j, g, m) {

		var l = j.childNodes[j._ll ? 1 : 0].childNodes[0];

		var a = g.options;

		var e = false;

		for (var b = 0; b < a.length; b++) {

			var h = a[b].text || a[b].label;

			if (!h || typeof (h) == "undefined") {

				h = ""

			}

			var c = new Option(h, a[b].value);

			if (typeof (a[b].img_src) == "string") {

				c.setAttribute("img_src", a[b].img_src)

			}

			l.options.add(c);

			if (typeof (a[b].selected) != "undefined"

					&& window.dhx4.s2b(a[b].selected) == true) {

				c.selected = true;

				j._value = a[b].value;

				e = true

			}

			if (typeof (a[b].checked) != "undefined"

					&& window.dhx4.s2b(a[b].checked) == true) {

				c.setAttribute("checked", "1")

			}

			if (typeof (a[b].img) != "undefined") {

				c.setAttribute("img", a[b].img)

			}

			if (typeof (a[b].img_dis) != "undefined") {

				c.setAttribute("img_dis", a[b].img_dis)

			}

			if (typeof (a[b].css) != "undefined") {

				c.setAttribute("css", a[b].css)

			}

		}

		if (!e && l.selectedIndex >= 0) {

			j._value = l.options[l.selectedIndex].value

		}

		if (m === true) {

			j.callEvent("onOptionsLoaded", [ j._idd ])

		}

		this._checkNoteWidth(j)

	},

	doLoadOptsConnector : function(c, a) {

		var b = this;

		c._connector_working = true;

		window.dhx4.ajax

				.get(

						a,

						function(l) {

							var g = l.xmlDoc.responseText;

							if (g.indexOf("{") === 0) {

								var n = JSON.parse(g);

								b.doLoadOpts(c, n, true)

							} else {

								l = l.xmlDoc.responseXML;

								if (l == null) {

									return

								}

								var e = l.getElementsByTagName("data");

								if (e == null || e[0] == null) {

									return

								}

								e = e[0];

								var j = [];

								for (var m = 0; m < e.childNodes.length; m++) {

									if (typeof (e.childNodes[m].tagName) != "undefined"

											&& String(e.childNodes[m].tagName)

													.toLowerCase() == "item") {

										var h = e.childNodes[m];

										j

												.push({

													label : h

															.getAttribute("label"),

													value : h

															.getAttribute("value"),

													selected : (h

															.getAttribute("selected") != null)

												});

										h = null

									}

								}

								b.doLoadOpts(c, {

									options : j

								}, true)

							}

							c._connector_working = false;

							if (c._connector_value != null) {

								b.setValue(c, c._connector_value);

								c._connector_value = null

							}

							b = c = null

						})

	},

	doOnChange : function(c) {

		var a = c.parentNode.parentNode;

		a._newValue = (c.selectedIndex >= 0 ? c.options[c.selectedIndex].value

				: null);

		if (a._newValue != a._value) {

			if (a.checkEvent("onBeforeChange")) {

				if (a.callEvent("onBeforeChange", [ a._idd, a._value,

						a._newValue ]) !== true) {

					for (var b = 0; b < c.options.length; b++) {

						if (c.options[b].value == a._value) {

							c.options[b].selected = true

						}

					}

					return

				}

			}

			a._value = a._newValue;

			a.callEvent("onChange", [ a._idd, a._value ]);

			if (a._type == "se" && a.getForm().live_validate) {

				this._validate(a)

			}

		}

		a._autoCheck()

	},

	setText : function(a, b) {

		if (!b) {

			b = ""

		}

		a.childNodes[a._ll ? 0 : 1].childNodes[0].innerHTML = b

				+ (a._required ? "<span class='dhxform_item_required'>*</span>"

						: "");

		a.childNodes[a._ll ? 0 : 1].style.display = (b.length == 0 || b == null ? "none"

				: "")

	},

	getText : function(a) {

		return a.childNodes[a._ll ? 0 : 1].childNodes[0].innerHTML.replace(

				/<span class=\"dhxform_item_required\">[^<]*<\/span>/g, "")

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].removeAttribute("disabled")

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false;

		a.childNodes[a._ll ? 1 : 0].childNodes[0]

				.setAttribute("disabled", true)

	},

	getOptions : function(a) {

		return a.childNodes[a._ll ? 1 : 0].childNodes[0].options

	},

	setValue : function(b, e) {

		if (b._connector_working) {

			b._connector_value = e;

			return

		}

		var a = this.getOptions(b);

		for (var c = 0; c < a.length; c++) {

			if (a[c].value == e) {

				a[c].selected = true;

				b._value = a[c].value

			}

		}

		if (b._list != null && b._list.length > 0) {

			b.getForm()._autoCheck()

		}

		b.getForm()._ccReload(b._idd, b._value)

	},

	getValue : function(c) {

		var a = -1;

		var b = this.getOptions(c);

		for (var e = 0; e < b.length; e++) {

			if (b[e].selected) {

				a = b[e].value

			}

		}

		return a

	},

	setWidth : function(b, a) {

		b.childNodes[b._ll ? 1 : 0].childNodes[0].style.width = a + "px"

	},

	getSelect : function(a) {

		return a.childNodes[a._ll ? 1 : 0].childNodes[0]

	},

	setFocus : function(a) {

		a.childNodes[a._ll ? 1 : 0].childNodes[0].focus()

	},

	_checkNoteWidth : function(b) {

		var a;

		if (b.childNodes[b._ll ? 1 : 0].childNodes[1] != null) {

			a = b.childNodes[b._ll ? 1 : 0].childNodes[1];

			if (a.className != null

					&& a.className.search(/dhxform_note/gi) >= 0

					&& a._w == "auto") {

				a.style.width = b.childNodes[b._ll ? 1 : 0].childNodes[0].offsetWidth

						+ "px"

			}

		}

		a = null

	}

};

(function() {

	for ( var b in {

		doAddInput : 1,

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.select[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.multiselect = {

	doLoadOpts : function(e, h, j) {

		var b = e.childNodes[e._ll ? 1 : 0].childNodes[0];

		b.multiple = true;

		if (!isNaN(h.size)) {

			b.size = Number(h.size)

		}

		e._value = [];

		e._newValue = [];

		var c = h.options;

		for (var g = 0; g < c.length; g++) {

			var a = new Option(c[g].text || c[g].label, c[g].value);

			b.options.add(a);

			if (c[g].selected == true || c[g].selected == "true") {

				a.selected = true;

				e._value.push(c[g].value)

			}

		}

		if (j === true) {

			e.callEvent("onOptionsLoaded", [ e._idd ])

		}

		this._checkNoteWidth(e)

	},

	doAttachEvents : function(c) {

		var a = c.childNodes[c._ll ? 1 : 0].childNodes[0];

		var b = this;

		a.onfocus = function() {

			b.doOnChange(this);

			var e = this.parentNode.parentNode;

			e.getForm().callEvent("onFocus", [ e._idd ]);

			e = null

		};

		a.onblur = function() {

			b.doOnChange(this);

			var e = this.parentNode.parentNode;

			e.getForm().callEvent("onBlur", [ e._idd ]);

			e = null

		};

		a.onclick = function() {

			b.doOnChange(this);

			var e = this.parentNode.parentNode;

			e._autoCheck();

			e = null

		}

	},

	doOnChange : function(e) {

		var b = e.parentNode.parentNode;

		b._newValue = [];

		for (var c = 0; c < e.options.length; c++) {

			if (e.options[c].selected) {

				b._newValue.push(e.options[c].value)

			}

		}

		if ((b._value).sort().toString() != (b._newValue).sort().toString()) {

			if (b.checkEvent("onBeforeChange")) {

				if (b.callEvent("onBeforeChange", [ b._idd, b._value,

						b._newValue ]) !== true) {

					var a = {};

					for (var c = 0; c < b._value.length; c++) {

						a[b._value[c]] = true

					}

					for (var c = 0; c < e.options.length; c++) {

						e.options[c].selected = (a[e.options[c].value] == true)

					}

					a = null;

					return

				}

			}

			b._value = [];

			for (var c = 0; c < b._newValue.length; c++) {

				b._value.push(b._newValue[c])

			}

			b.callEvent("onChange", [ b._idd, b._value ])

		}

		b._autoCheck()

	},

	setValue : function(c, g) {

		var a = {};

		if (typeof (g) == "string") {

			g = g.split(",")

		}

		if (typeof (g) != "object") {

			g = [ g ]

		}

		for (var e = 0; e < g.length; e++) {

			a[g[e]] = true

		}

		var b = this.getOptions(c);

		for (var e = 0; e < b.length; e++) {

			b[e].selected = (a[b[e].value] == true)

		}

		c._autoCheck()

	},

	getValue : function(c) {

		var a = [];

		var b = this.getOptions(c);

		for (var e = 0; e < b.length; e++) {

			if (b[e].selected) {

				a.push(b[e].value)

			}

		}

		return a

	}

};

(function() {

	for ( var b in dhtmlXForm.prototype.items.select) {

		if (!dhtmlXForm.prototype.items.multiselect[b]) {

			dhtmlXForm.prototype.items.multiselect[b] = dhtmlXForm.prototype.items.select[b]

		}

	}

})();

dhtmlXForm.prototype.items.input = {

	render : function(j, l) {

		var h = (!isNaN(l.rows));

		j._type = "ta";

		j._enabled = true;

		this.doAddLabel(j, l);

		this.doAddInput(j, l, (h ? "TEXTAREA" : "INPUT"), (h ? null : "TEXT"),

				true, true, "dhxform_textarea");

		this.doAttachEvents(j);

		if (h) {

			j.childNodes[j._ll ? 1 : 0].childNodes[0].rows = Number(l.rows)

					+ (window.dhx4.isIE6 ? 1 : 0)

		}

		if (typeof (l.numberFormat) != "undefined") {

			var g, e = null, m = null;

			if (typeof (l.numberFormat) != "string") {

				g = l.numberFormat[0];

				e = l.numberFormat[1] || null;

				m = l.numberFormat[2] || null

			} else {

				g = l.numberFormat;

				if (typeof (l.groupSep) == "string") {

					e = l.groupSep

				}

				if (typeof (l.decSep) == "string") {

					m = l.decSep

				}

			}

			this.setNumberFormat(j, g, e, m, false)

		}

		this.setValue(j, l.value);

		return this

	},

	doAttachEvents : function(c) {

		var b = c.childNodes[c._ll ? 1 : 0].childNodes[0];

		if (typeof (b.tagName) != "undefined" && {

			input : 1,

			textarea : 1,

			select : 1

		}[b.tagName.toLowerCase()] == 1) {

			var a = this;

			b.onfocus = function() {

				var e = this.parentNode.parentNode;

				if (e._df != null) {

					this.value = e._value || ""

				}

				e.getForm()._ccActivate(e._idd, this, this.value);

				e.getForm().callEvent("onFocus", [ e._idd ]);

				e = null

			};

			b.onblur = function() {

				var e = this.parentNode.parentNode;

				e.getForm()._ccDeactivate(e._idd);

				a.updateValue(e, true);

				if (e.getForm().live_validate) {

					a._validate(e)

				}

				e.getForm().callEvent("onBlur", [ e._idd ]);

				e = null

			}

		}

		b = null

	},

	updateValue : function(g, a) {

		var h = g.childNodes[g._ll ? 1 : 0].childNodes[0].value;

		var e = g.getForm();

		var b = (e._ccActive == true && e._formLS != null && e._formLS[g._idd] != null);

		e = null;

		if (!b && g._df != null

				&& h == window.dhx4.template._getFmtValue(g._value, g._df)) {

			return

		}

		if (!a && g._df != null && g._value == h

				&& h == window.dhx4.template._getFmtValue(h, g._df)) {

			return

		}

		var c = this;

		if (g._value != h) {

			if (g.checkEvent("onBeforeChange")) {

				if (g.callEvent("onBeforeChange", [ g._idd, g._value, h ]) !== true) {

					if (g._df != null) {

						c.setValue(g, g._value)

					} else {

						g.childNodes[g._ll ? 1 : 0].childNodes[0].value = g._value

					}

					return

				}

			}

			if (g._df != null && a) {

				c.setValue(g, h)

			} else {

				g._value = h

			}

			g.callEvent("onChange", [ g._idd, h ]);

			return

		}

		if (g._df != null && a) {

			this.setValue(g, g._value)

		}

	},

	setValue : function(c, e) {

		c._value = (typeof (e) != "undefined" && e != null ? e : "");

		var b = (String(c._value) || "");

		var a = c.childNodes[c._ll ? 1 : 0].childNodes[0];

		if (c._df != null) {

			b = window.dhx4.template._getFmtValue(b, c._df)

		}

		if (a.value != b) {

			a.value = b;

			c.getForm()._ccReload(c._idd, b)

		}

		a = null

	},

	getValue : function(a) {

		var b = a.getForm();

		if (b._formLS && b._formLS[a._idd] != null) {

			this.updateValue(a)

		}

		b = null;

		return (typeof (a._value) != "undefined" && a._value != null ? a._value

				: "")

	},

	setReadonly : function(a, b) {

		a._ro = (b === true);

		if (a._ro) {

			a.childNodes[a._ll ? 1 : 0].childNodes[0].setAttribute("readOnly",

					"true")

		} else {

			a.childNodes[a._ll ? 1 : 0].childNodes[0]

					.removeAttribute("readOnly")

		}

	},

	isReadonly : function(a) {

		if (!a._ro) {

			a._ro = false

		}

		return a._ro

	},

	getInput : function(a) {

		return a.childNodes[a._ll ? 1 : 0].childNodes[0]

	},

	setNumberFormat : function(e, g, c, h, b) {

		if (typeof (b) != "boolean") {

			b = true

		}

		if (g == "") {

			e._df = null;

			if (b) {

				this.setValue(e, e._value)

			}

			return true

		}

		if (typeof (g) != "string") {

			return

		}

		var a = window.dhx4.template._parseFmt(g, c, h);

		if (a == false) {

			return false

		} else {

			e._df = a

		}

		if (b) {

			this.setValue(e, e._value)

		}

		return true

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		destruct : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1,

		setFocus : 1

	}) {

		dhtmlXForm.prototype.items.input[b] = dhtmlXForm.prototype.items.select[b]

	}

})();

dhtmlXForm.prototype.items.password = {

	render : function(a, b) {

		a._type = "pw";

		a._enabled = true;

		this.doAddLabel(a, b);

		this.doAddInput(a, b, "INPUT", "PASSWORD", true, true,

				"dhxform_textarea");

		this.doAttachEvents(a);

		this.setValue(a, b.value);

		return this

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doAttachEvents : 1,

		destruct : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		setValue : 1,

		getValue : 1,

		updateValue : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1,

		setReadonly : 1,

		isReadonly : 1,

		setFocus : 1,

		getInput : 1

	}) {

		dhtmlXForm.prototype.items.password[b] = dhtmlXForm.prototype.items.input[b]

	}

})();

dhtmlXForm.prototype.items.file = {

	render : function(c, e) {

		c._type = "fl";

		c._enabled = true;

		this.doAddLabel(c, e);

		this.doAddInput(c, e, "INPUT", "FILE", true, false, "dhxform_textarea");

		var a = c.childNodes[c._ll ? 1 : 0].childNodes[0];

		var b = this;

		a.onfocus = function() {

			var g = this.parentNode.parentNode;

			g.getForm().callEvent("onFocus", [ g._idd ]);

			g = null

		};

		a.onblur = function() {

			var g = this.parentNode.parentNode;

			if (g.getForm().live_validate) {

				b._validate(g)

			}

			g.getForm().callEvent("onBlur", [ g._idd ]);

			g = null

		};

		a = null;

		c.childNodes[c._ll ? 1 : 0].childNodes[0].onchange = function() {

			c.callEvent("onChange", [ c._idd, this.value ])

		};

		return this

	},

	setValue : function() {

	},

	getValue : function(a) {

		return a.childNodes[a._ll ? 1 : 0].childNodes[0].value

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		destruct : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		getInput : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1

	}) {

		dhtmlXForm.prototype.items.file[b] = dhtmlXForm.prototype.items.input[b]

	}

})();

dhtmlXForm.prototype.items.label = {

	_index : false,

	render : function(b, c) {

		b._type = "lb";

		b._enabled = true;

		b._checked = true;

		var a = document.createElement("DIV");

		a.className = "dhxform_txt_label2" + (c._isTopmost ? " topmost" : "");

		a.innerHTML = c.label;

		b.appendChild(a);

		if (c.hidden == true) {

			this.hide(b)

		}

		if (c.disabled == true) {

			this.userDisable(b)

		}

		if (!isNaN(c.labelWidth)) {

			a.style.width = parseInt(c.labelWidth) + "px"

		}

		if (!isNaN(c.labelHeight)) {

			a.style.height = parseInt(c.labelHeight) + "px"

		}

		if (!isNaN(c.labelLeft)) {

			a.style.left = parseInt(c.labelLeft) + "px"

		}

		if (!isNaN(c.labelTop)) {

			a.style.top = parseInt(c.labelTop) + "px"

		}

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		a._autoCheck = null;

		a._enabled = null;

		a._type = null;

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		a.onselectstart = null;

		a.parentNode.removeChild(a);

		a = null

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false

	},

	setText : function(a, b) {

		a.firstChild.innerHTML = b

	},

	getText : function(a) {

		return a.firstChild.innerHTML

	}

};

(function() {

	for ( var b in {

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.label[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.button = {

	render : function(b, c) {

		b._type = "bt";

		b._enabled = true;

		b._name = c.name;

		b.className = String(b.className).replace("item_label_top",

				"item_label_left").replace("item_label_right",

				"item_label_left");

		b._doOnKeyUpDown = function(g, e) {

			this.callEvent(g,

					[ this.childNodes[0].childNodes[0], e, this._idd ])

		};

		b.innerHTML = '<div class="dhxform_btn" role="link" tabindex="0" dir="ltr"><div class="dhxform_btn_txt">'

				+ c.value

				+ '</div><div class="dhxform_btn_filler" disabled="true"></div></div>';

		if (!isNaN(c.width)) {

			var a = Math.max(c.width, 10);

			if (dhtmlXForm.prototype.items[this.t]._dim == null) {

				b.firstChild.style.width = a + "px";

				dhtmlXForm.prototype.items[this.t]._dim = b.getForm()

						._checkDim(b, b.firstChild)

			}

			b.firstChild.style.width = a

					- dhtmlXForm.prototype.items[this.t]._dim + "px";

			b.firstChild.firstChild.className += " dhxform_btn_txt_autowidth"

		}

		if (!isNaN(c.inputLeft)) {

			b.childNodes[0].style.left = parseInt(c.inputLeft) + "px"

		}

		if (!isNaN(c.inputTop)) {

			b.childNodes[0].style.top = parseInt(c.inputTop) + "px"

		}

		if (c.hidden == true) {

			this.hide(b)

		}

		if (c.disabled == true) {

			this.userDisable(b)

		}

		if (typeof (c.tooltip) != "undefined") {

			b.firstChild.title = c.tooltip

		}

		b.onselectstart = function(g) {

			g = g || event;

			g.cancelBubble = true;

			if (g.preventDefault) {

				g.preventDefault()

			} else {

				g.returnValue = false

			}

			return false

		};

		b.firstChild.onselectstart = function(g) {

			g = g || event;

			g.cancelBubble = true;

			if (g.preventDefault) {

				g.preventDefault()

			} else {

				g.returnValue = false

			}

			return false

		};

		b.firstChild.onkeypress = function(g) {

			g = g || event;

			if ((g.keyCode == 32 || g.charCode == 32 || g.keyCode == 13 || g.charCode == 13)

					&& !this.parentNode._busy) {

				this.parentNode._busy = true;

				g.cancelBubble = true;

				if (g.preventDefault) {

					g.preventDefault()

				} else {

					g.returnValue = false

				}

				_dhxForm_doClick(this.childNodes[0], [ "mousedown", "mouseup" ]);

				return false

			}

		};

		b.firstChild.onfocus = function() {

			this.parentNode._doOnFocus(this.parentNode)

		};

		b.firstChild.onblur = function() {

			_dhxForm_doClick(this.childNodes[0], "mouseout");

			this.parentNode._doOnBlur(this.parentNode)

		};

		b.firstChild.onkeyup = function(g) {

			this.parentNode._doOnKeyUpDown("onKeyUp", g || event)

		};

		b.firstChild.onkeydown = function(g) {

			this.parentNode._doOnKeyUpDown("onKeyDown", g || event)

		};

		b.firstChild.onmouseover = function() {

			var e = this.parentNode;

			if (!e._enabled) {

				return

			}

			this._isOver = true;

			this.className = "dhxform_btn dhxform_btn_over";

			e = null

		};

		b.firstChild.onmouseout = function() {

			var e = this.parentNode;

			if (!e._enabled) {

				return

			}

			this.className = "dhxform_btn";

			this._allowClick = false;

			this._pressed = false;

			this._isOver = false;

			e = null

		};

		b.firstChild.ontouchstart = b.firstChild.onmousedown = function(h) {

			h = h || event;

			if (h.type == "touchstart" && h.preventDefault) {

				h.preventDefault()

			}

			if (h.button >= 2) {

				return

			}

			if (this._pressed) {

				return

			}

			var g = this.parentNode;

			if (!g._enabled) {

				return

			}

			this.className = "dhxform_btn dhxform_btn_pressed";

			this._allowClick = true;

			this._pressed = true;

			g = null

		};

		b.firstChild.ontouchend = b.firstChild.onmouseup = function(h) {

			h = h || event;

			if (h.button >= 2) {

				return

			}

			if (!this._pressed) {

				return

			}

			var g = this.parentNode;

			if (!g._enabled) {

				return

			}

			g._busy = false;

			this.className = "dhxform_btn"

					+ (this._isOver ? " dhxform_btn_over" : "");

			if (this._pressed && this._allowClick) {

				g.callEvent("_onButtonClick", [ g._name, g._cmd ])

			}

			this._allowClick = false;

			this._pressed = false;

			g = null

		};

		b._doOnFocus = function(e) {

			e.getForm().callEvent("onFocus", [ e._idd ])

		};

		b._doOnBlur = function(e) {

			e.getForm().callEvent("onBlur", [ e._idd ])

		};

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		a._autoCheck = null;

		a._type = null;

		a._enabled = null;

		a._cmd = null;

		a._name = null;

		a._doOnFocus = null;

		a._doOnBlur = null;

		a._doOnKeyUpDown = null;

		a.onselectstart = null;

		a.firstChild.onselectstart = null;

		a.firstChild.onkeypress = null;

		a.firstChild.ontouchstart = null;

		a.firstChild.ontouchend = null;

		a.firstChild.onfocus = null;

		a.firstChild.onblur = null;

		a.firstChild.onkeyup = null;

		a.firstChild.onkeydown = null;

		a.firstChild.onmouseover = null;

		a.firstChild.onmouseout = null;

		a.firstChild.onmousedown = null;

		a.firstChild.onmouseup = null;

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a.parentNode.removeChild(a);

		a = null

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true;

		a.childNodes[0].removeAttribute("disabled");

		a.childNodes[0].setAttribute("role", "link");

		a.childNodes[0].setAttribute("tabIndex", "0")

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false;

		a.childNodes[0].setAttribute("disabled", "true");

		a.childNodes[0].removeAttribute("role");

		a.childNodes[0].removeAttribute("tabIndex")

	},

	setText : function(a, b) {

		a.childNodes[0].childNodes[0].innerHTML = b

	},

	getText : function(a) {

		return a.childNodes[0].childNodes[0].innerHTML

	},

	setFocus : function(a) {

		a.childNodes[0].focus()

	}

};

(function() {

	for ( var b in {

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.button[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.hidden = {

	_index : false,

	render : function(b, c) {

		b.style.display = "none";

		b._name = c.name;

		b._type = "hd";

		b._enabled = true;

		var a = document.createElement("INPUT");

		a.type = "HIDDEN";

		a.name = c.name;

		a.value = (c.value || "");

		b.appendChild(a);

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a._autoCheck = null;

		a._name = null;

		a._type = null;

		a._enabled = null;

		a.onselectstart = null;

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		a.parentNode.removeChild(a);

		a = null

	},

	enable : function(a) {

		a._enabled = true;

		a.childNodes[0].setAttribute("name", a._name)

	},

	disable : function(a) {

		a._enabled = false;

		a.childNodes[0].removeAttribute("name")

	},

	show : function() {

	},

	hide : function() {

	},

	isHidden : function() {

		return true

	},

	setValue : function(a, b) {

		a.childNodes[0].value = b

	},

	getValue : function(a) {

		return a.childNodes[0].value

	},

	getInput : function(a) {

		return a.childNodes[0]

	}

};

(function() {

	for ( var b in {

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.hidden[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.list = {

	_index : false,

	render : function(a, b) {

		a._type = "list";

		a._enabled = true;

		a._isNestedForm = true;

		a.style.paddingLeft = a._ofsNested + "px";

		a.className = "dhxform_base_nested" + (a._custom_css || "");

		return [ this, new dhtmlXForm(a, null, b) ]

	},

	destruct : function(a) {

	}

};

dhtmlXForm.prototype.items.fieldset = {

	_index : false,

	render : function(b, e) {

		b._type = "fs";

		if (typeof (parseInt(e.inputWidth)) == "number") {

		}

		b._width = e.width;

		b._enabled = true;

		b._checked = true;

		b.className = "fs_" + e.position

				+ (typeof (e.className) == "string" ? " " + e.className : "");

		var c = document.createElement("FIELDSET");

		c.className = "dhxform_fs";

		var g = String(e.labelAlign).replace("align_", "");

		c.innerHTML = "<legend class='fs_legend' align='" + g

				+ "' style='text-align:" + g + "'>" + e.label + "</legend>";

		b.appendChild(c);

		if (!isNaN(e.inputLeft)) {

			c.style.left = parseInt(e.inputLeft) + "px"

		}

		if (!isNaN(e.inputTop)) {

			c.style.top = parseInt(e.inputTop) + "px"

		}

		if (e.inputWidth != "auto") {

			if (!isNaN(e.inputWidth)) {

				c.style.width = parseInt(e.inputWidth) + "px";

				var a = parseInt(c.style.width);

				if (c.offsetWidth > a) {

					c.style.width = a + (a - c.offsetWidth) + "px"

				}

			}

		}

		b._addSubListNode = function() {

			var h = document.createElement("DIV");

			h._custom_css = " dhxform_fs_nested";

			this.childNodes[0].appendChild(h);

			return h

		};

		if (e.hidden == true) {

			this.hide(b)

		}

		if (e.disabled == true) {

			this.userDisable(b)

		}

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		a._checked = null;

		a._enabled = null;

		a._idd = null;

		a._type = null;

		a._width = null;

		a.onselectstart = null;

		a._addSubListNode = null;

		a._autoCheck = null;

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a.parentNode.removeChild(a);

		a = null

	},

	setText : function(a, b) {

		a.childNodes[0].childNodes[0].innerHTML = b

	},

	getText : function(a) {

		return a.childNodes[0].childNodes[0].innerHTML

	},

	enable : function(a) {

		a._enabled = true;

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

	},

	disable : function(a) {

		a._enabled = false;

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

	},

	setWidth : function(b, a) {

		b.childNodes[0].style.width = a + "px";

		b._width = a

	},

	getWidth : function(a) {

		return a._width

	}

};

(function() {

	for ( var b in {

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.fieldset[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.items.block = {

	_index : false,

	render : function(c, e) {

		c._type = "bl";

		c._width = e.width;

		c._enabled = true;

		c._checked = true;

		c.className = "block_" + e.position

				+ (typeof (e.className) == "string" ? " " + e.className : "");

		var a = document.createElement("DIV");

		a.className = "dhxform_obj_" + c.getForm().skin + " dhxform_block";

		a.style.fontSize = c.getForm().cont.style.fontSize;

		if (e.style) {

			a.style.cssText = e.style

		}

		if (typeof (e.id) != "undefined") {

			a.id = e.id

		}

		c.appendChild(a);

		if (!isNaN(e.inputLeft)) {

			a.style.left = parseInt(e.inputLeft) + "px"

		}

		if (!isNaN(e.inputTop)) {

			a.style.top = parseInt(e.inputTop) + "px"

		}

		if (e.inputWidth != "auto") {

			if (!isNaN(e.inputWidth)) {

				a.style.width = parseInt(e.inputWidth) + "px"

			}

		}

		if (!isNaN(e.blockOffset)) {

			c._ofsNested = e.blockOffset

		}

		c._addSubListNode = function() {

			var b = document.createElement("DIV");

			b._inBlcok = true;

			if (typeof (this._ofsNested) != "undefined") {

				b._ofsNested = this._ofsNested

			}

			this.childNodes[0].appendChild(b);

			return b

		};

		if (e.hidden == true) {

			this.hide(c)

		}

		if (e.disabled == true) {

			this.userDisable(c)

		}

		return this

	},

	_setCss : function(a, c, b) {

		a.firstChild.className = "dhxform_obj_" + c + " dhxform_block";

		a.firstChild.style.fontSize = b

	}

};

(function() {

	for ( var b in {

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1,

		getWidth : 1,

		doUnloadNestedLists : 1,

		destruct : 1

	}) {

		dhtmlXForm.prototype.items.block[b] = dhtmlXForm.prototype.items.fieldset[b]

	}

})();

dhtmlXForm.prototype.items.newcolumn = {

	_index : false

};

dhtmlXForm.prototype.items.template = {

	render : function(b, c) {

		var a = (!isNaN(c.rows));

		b._type = "tp";

		b._enabled = true;

		if (c.format != null) {

			if (typeof (c.format) == "function") {

				b.format = c.format

			} else {

				if (typeof (c.format) == "string"

						&& typeof (window[c.format]) == "function") {

					b.format = window[c.format]

				}

			}

		}

		if (b.format == null) {

			b.format = function(e, g) {

				return g

			}

		}

		this.doAddLabel(b, c);

		this.doAddInput(b, c, "DIV", null, true, true, "dhxform_item_template");

		this.setValue(b, c.value || "");

		return this

	},

	destruct : function(a) {

		a.format = null;

		this.d2(a);

		a = null

	},

	setValue : function(a, b) {

		a._value = b;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].innerHTML = a.format(a._idd,

				a._value)

	},

	getValue : function(a) {

		return a._value

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false

	}

};

(function() {

	dhtmlXForm.prototype.items.template.d2 = dhtmlXForm.prototype.items.input.destruct;

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		isEnabled : 1,

		setWidth : 1

	}) {

		dhtmlXForm.prototype.items.template[b] = dhtmlXForm.prototype.items.select[b]

	}

})();

dhtmlXForm.prototype._ulToObject = function(h, m) {

	var j = [];

	for (var b = 0; b < h.childNodes.length; b++) {

		if (String(h.childNodes[b].tagName || "").toLowerCase() == "li") {

			var c = {};

			var r = h.childNodes[b];

			for (var o = 0; o < m.length; o++) {

				if (r.getAttribute(m[o]) != null) {

					c[String(m[o]).replace("ftype", "type")] = r

							.getAttribute(m[o])

				}

			}

			if (!c.label) {

				try {

					c.label = r.firstChild.nodeValue

				} catch (l) {

				}

			}

			var g = r.getElementsByTagName("UL");

			if (g[0] != null) {

				c[(c.type == "select" ? "options" : "list")] = dhtmlXForm.prototype

						._ulToObject(g[0], m)

			}

			for (var o = 0; o < r.childNodes.length; o++) {

				if (String(r.childNodes[o].tagName || "").toLowerCase() == "userdata") {

					if (!c.userdata) {

						c.userdata = {}

					}

					c.userdata[r.childNodes[o].getAttribute("name")] = r.childNodes[o].firstChild.nodeValue

				}

			}

			j[j.length] = c

		}

		if (String(h.childNodes[b].tagName || "").toLowerCase() == "div") {

			var c = {};

			c.type = "label";

			try {

				c.label = h.childNodes[b].firstChild.nodeValue

			} catch (l) {

			}

			j[j.length] = c

		}

	}

	return j

};

dhtmlXForm.prototype.setUserData = function(g, c, e, a) {

	if (typeof (a) != "undefined") {

		var b = this.doWithItem([ g, c ], "_getId");

		if (b != null) {

			g = b;

			c = e;

			e = a

		}

	}

	if (!this._userdata) {

		this._userdata = {}

	}

	this._userdata[g] = (this._userdata[g] || {});

	this._userdata[g][c] = e

};

dhtmlXForm.prototype.getUserData = function(e, c, a) {

	if (typeof (a) != "undefined") {

		var b = this.doWithItem([ e, c ], "_getId");

		if (b != null) {

			e = b;

			c = a

		}

	}

	if (this._userdata != null && typeof (this._userdata[e]) != "undefined"

			&& typeof (this._userdata[e][c]) != "undefined") {

		return this._userdata[e][c]

	}

	return ""

};

dhtmlXForm.prototype.setRTL = function(a) {

	this._rtl = (a === true ? true : false);

	if (this._rtl) {

		if (String(this.cont).search(/dhxform_rtl/gi) < 0) {

			this.cont.className += " dhxform_rtl"

		}

	} else {

		if (String(this.cont).search(/dhxform_rtl/gi) >= 0) {

			this.cont.className = String(this.cont.className).replace(

					/dhxform_rtl/gi, "")

		}

	}

};

_dhxForm_doClick = function(g, b) {

	if (typeof (b) == "object") {

		var a = b[1];

		b = b[0]

	}

	if (document.createEvent) {

		var c = document.createEvent("MouseEvents");

		c.initEvent(b, true, false);

		g.dispatchEvent(c)

	} else {

		if (document.createEventObject) {

			var c = document.createEventObject();

			c.button = 1;

			g.fireEvent("on" + b, c)

		}

	}

	if (a) {

		window.setTimeout(function() {

			_dhxForm_doClick(g, a)

		}, 100)

	}

};

dhtmlXForm.prototype.setFormData = function(c) {

	for ( var b in c) {

		var e = this.getItemType(b);

		switch (e) {

		case "checkbox":

			this[c[b] == true || parseInt(c[b]) == 1 || c[b] == "true"

					|| c[b] == this.getItemValue(b, "realvalue") ? "checkItem"

					: "uncheckItem"](b);

			break;

		case "radio":

			this.checkItem(b, c[b]);

			break;

		case "input":

		case "textarea":

		case "password":

		case "select":

		case "multiselect":

		case "hidden":

		case "template":

		case "combo":

		case "calendar":

		case "colorpicker":

		case "editor":

			this.setItemValue(b, c[b]);

			break;

		default:

			if (this["setFormData_" + e]) {

				this["setFormData_" + e](b, c[b])

			} else {

				if (!this.hId) {

					this.hId = this._genStr(12)

				}

				this.setUserData(this.hId, b, c[b])

			}

			break

		}

	}

};

dhtmlXForm.prototype.getFormData = function(u, j) {

	var c = {};

	var n = this;

	for ( var s in this.itemPull) {

		var m = this.itemPull[s]._idd;

		var v = this.itemPull[s]._type;

		if (v == "ch") {

			c[m] = (this.isItemChecked(m) ? this.getItemValue(m) : 0)

		}

		if (v == "ra" && !c[this.itemPull[s]._group]) {

			c[this.itemPull[s]._group] = this

					.getCheckedValue(this.itemPull[s]._group)

		}

		if (v in {

			se : 1,

			ta : 1,

			pw : 1,

			hd : 1,

			tp : 1,

			fl : 1,

			calendar : 1,

			combo : 1,

			editor : 1,

			colorpicker : 1

		}) {

			c[m] = this.getItemValue(m, u)

		}

		if (this["getFormData_" + v]) {

			c[m] = this["getFormData_" + v](m)

		}

		if (v == "up") {

			var h = this.getItemValue(m);

			for ( var g in h) {

				c[g] = h[g]

			}

		}

		if (this.itemPull[s]._list) {

			for (var e = 0; e < this.itemPull[s]._list.length; e++) {

				var l = this.itemPull[s]._list[e].getFormData(u, j);

				for ( var o in l) {

					c[o] = l[o]

				}

			}

		}

	}

	if (!j && this.hId && this._userdata[this.hId]) {

		for ( var s in this._userdata[this.hId]) {

			if (!c[s]) {

				c[s] = this._userdata[this.hId][s]

			}

		}

	}

	return c

};

dhtmlXForm.prototype.adjustParentSize = function() {

	var h = 0;

	var g = -1;

	for (var j = 0; j < this.base.length; j++) {

		h += this.base[j].firstChild.offsetWidth;

		if (this.base[j].offsetHeight > g) {

			g = this.base[j].offsetHeight

		}

	}

	var c = false;

	try {

		c = (this.cont.parentNode.parentNode.parentNode.parentNode._isCell == true);

		if (c) {

			var a = this.cont.parentNode.parentNode.parentNode.parentNode

		}

	} catch (l) {

	}

	if (c && typeof (a) != "undefined") {

		if (h > 0) {

			a.setWidth(h + 10)

		}

		if (g > 0) {

			a.setHeight(g + a.firstChild.firstChild.offsetHeight + 5)

		}

		c = a = null;

		return

	}

	var b = false;

	try {

		b = (this.cont.parentNode.parentNode.parentNode._isWindow == true);

		if (b) {

			var m = this.cont.parentNode.parentNode;

			if (typeof (m.callEvent) == "function") {

				this.cont.style.display = "none";

				m.callEvent("_setCellSize", [ h + 15, g + 15 ]);

				this.cont.style.display = ""

			}

		}

	} catch (l) {

	}

};

dhtmlXForm.prototype.reset = function() {

	if (this.callEvent("onBeforeReset", [ this.formId, this.getFormData() ])) {

		if (this._last_load_data) {

			this.setFormData(this._last_load_data)

		}

		this.callEvent("onAfterReset", [ this.formId ])

	}

};

dhtmlXForm.prototype.send = function(b, j, l, e) {

	if (typeof j == "function") {

		l = j;

		j = "post"

	} else {

		j = (j == "get" ? "get" : "post")

	}

	if (e !== true && !this.validate()) {

		return

	}

	var h = this.getFormData(true);

	var g = [];

	for ( var c in h) {

		g.push(c + "=" + encodeURIComponent(h[c]))

	}

	var a = function(m) {

		if (l) {

			l.call(this, m, m.xmlDoc.responseText)

		}

	};

	if (j == "get") {

		window.dhx4.ajax.get(b + (b.indexOf("?") == -1 ? "?" : "&")

				+ g.join("&"), a)

	} else {

		window.dhx4.ajax.post(b, g.join("&"), a)

	}

};

dhtmlXForm.prototype.save = function(a, b) {

};

dhtmlXForm.prototype.dummy = function() {

};

dhtmlXForm.prototype._changeFormId = function(b, a) {

	this.formId = a

};

dhtmlXForm.prototype._dp_init = function(a) {

	a._methods = [ "dummy", "dummy", "_changeFormId", "dummy" ];

	a._getRowData = function(e, b) {

		var c = this.obj.getFormData(true);

		c[this.action_param] = this.obj.getUserData(e, this.action_param);

		return c

	};

	a._clearUpdateFlag = function() {

	};

	a.attachEvent("onAfterUpdate",

			function(c, e, g, b) {

				if (e == "inserted" || e == "updated" || e == "error"

						|| e == "invalid") {

					this.obj.resetDataProcessor("updated")

				}

				if (e == "inserted" || e == "updated") {

					this.obj._last_load_data = this.obj.getFormData(true)

				}

				this.obj.callEvent("onAfterSave", [ this.obj.formId, b ]);

				return true

			});

	a.autoUpdate = false;

	a.setTransactionMode("POST", true);

	this.dp = a;

	this.formId = (new Date()).valueOf();

	this.resetDataProcessor("inserted");

	this.save = function() {

		if (!this

				.callEvent("onBeforeSave", [ this.formId, this.getFormData() ])) {

			return

		}

		if (!this.validate()) {

			return

		}

		a.sendData()

	}

};

dhtmlXForm.prototype.resetDataProcessor = function(a) {

	if (!this.dp) {

		return

	}

	this.dp.updatedRows = [];

	this.dp._in_progress = [];

	this.dp.setUpdated(this.formId, true, a)

};

dhtmlXForm.prototype._ccActivate = function(c, a, b) {

	if (!this._formLS) {

		this._formLS = {}

	}

	if (!this._formLS[c]) {

		this._formLS[c] = {

			input : a,

			value : b

		}

	}

	if (!this._ccActive) {

		this._ccActive = true;

		this._ccDo()

	}

	a = null

};

dhtmlXForm.prototype._ccDeactivate = function(a) {

	if (this._ccTm) {

		window.clearTimeout(this._ccTm)

	}

	this._ccActive = false;

	if (this._formLS != null && this._formLS[a] != null) {

		this._formLS[a].input = null;

		this._formLS[a] = null;

		delete this._formLS[a]

	}

};

dhtmlXForm.prototype._ccDo = function() {

	if (this._ccTm) {

		window.clearTimeout(this._ccTm)

	}

	for ( var b in this._formLS) {

		var g = this._formLS[b].input;

		if (String(g.tagName).toLowerCase() == "select") {

			var c = "";

			if (g.selectedIndex >= 0 && g.selectedIndex < g.options.length) {

				c = g.options[g.selectedIndex].value

			}

		} else {

			var c = g.value

		}

		if (c != this._formLS[b].value) {

			this._formLS[b].value = c;

			this.callEvent("onInputChange", [ g._idd, c, this ])

		}

		g = null

	}

	if (this._ccActive) {

		var e = this;

		this._ccTm = window.setTimeout(function() {

			e._ccDo();

			e = null

		}, 100)

	}

};

dhtmlXForm.prototype._ccReload = function(b, a) {

	if (this._formLS && this._formLS[b]) {

		this._formLS[b].value = a

	}

};

dhtmlXForm.prototype._checkDim = function(j, h) {

	var e = document.createElement("DIV");

	e.className = "dhxform_obj_" + this.skin;

	e.style.cssText += (dhx4.isIE6 == true ? "visibility:hidden;"

			: "position:absolute;left:-2000px;top:-1000px;");

	document.body.appendChild(e);

	var g = j.parentNode;

	var b = j.nextSibling;

	e.appendChild(j);

	var c = parseInt(h.style.width);

	var a = (dhx4.isFF || dhx4.isIE || dhx4.isChrome || dhx4.isOpera ? h.offsetWidth

			: h.clientWidth);

	var l = a - c;

	if (b != null) {

		g.insertBefore(j, b)

	} else {

		g.appendChild(j)

	}

	e.parentNode.removeChild(e);

	g = b = e = j = h = null;

	return l

};

(function() {

	var b = [ "ftype", "name", "value", "label", "check", "checked",

			"disabled", "text", "rows", "select", "selected", "width", "style",

			"className", "labelWidth", "labelHeight", "labelLeft", "labelTop",

			"inputWidth", "inputHeight", "inputLeft", "inputTop", "position",

			"size" ];

	dhtmlXForm.prototype.loadStructHTML = function(a) {

		var a = typeof a === "string" ? document.getElementById(a) : a;

		this.loadStruct(this._ulToObject(a, b))

	};

	dhtmlXForm.prototype._autoload = function() {

		var a = document.getElementsByTagName("UL");

		var c = [];

		for (var h = 0; h < a.length; h++) {

			if (a[h].className == "dhtmlxForm") {

				var g = document.createElement("DIV");

				c[c.length] = {

					nodeUL : a[h],

					nodeForm : g,

					data : dhtmlXForm.prototype._ulToObject(a[h], b),

					name : (a[h].getAttribute("name") || null)

				}

			}

		}

		for (var h = 0; h < c.length; h++) {

			c[h].nodeUL.parentNode.insertBefore(c[h].nodeForm, c[h].nodeUL);

			var j = new dhtmlXForm(c[h].nodeForm, c[h].data);

			if (c[h].name !== null) {

				window[c[h].name] = j

			}

			var e = (c[h].nodeUL.getAttribute("oninit") || null);

			c[h].nodeUL.parentNode.removeChild(c[h].nodeUL);

			c[h].nodeUL = null;

			c[h].nodeForm = null;

			c[h].data = null;

			c[h] = null;

			if (e) {

				if (typeof (e) == "function") {

					e()

				} else {

					if (typeof (window[e]) == "function") {

						window[e]()

					}

				}

			}

		}

		if (typeof (window.addEventListener) == "function") {

			window.removeEventListener("load", dhtmlXForm.prototype._autoload,

					false)

		} else {

			window.detachEvent("onload", dhtmlXForm.prototype._autoload)

		}

	};

	if (typeof (window.addEventListener) == "function") {

		window.addEventListener("load", dhtmlXForm.prototype._autoload, false)

	} else {

		window.attachEvent("onload", dhtmlXForm.prototype._autoload)

	}

})();

if (typeof (window.dhtmlXCellObject) != "undefined") {

	dhtmlXCellObject.prototype.attachForm = function(a) {

		this.callEvent("_onBeforeContentAttach", [ "form" ]);

		var b = document.createElement("DIV");

		b.style.width = "100%";

		b.style.height = "100%";

		b.style.position = "relative";

		if (window.dhtmlx && dhtmlx.$customScroll) {

			dhtmlx.CustomScroll.enable(b)

		} else {

			b.style.overflow = "auto"

		}

		this._attachObject(b);

		this.dataType = "form";

		this.dataObj = new dhtmlXForm(b, a, this.conf.skin);

		b = null;

		this.callEvent("_onContentAttach", []);

		return this.dataObj

	}

}

dhtmlXForm.prototype.items.combo = {

	render : function(b, c) {

		b._type = "combo";

		b._enabled = true;

		b._value = null;

		b._newValue = null;

		var e = b.getForm().skin;

		if (typeof (c.inputWidth) != "undefined" && e == "material"

				&& String(c.inputWidth).match(/^\d*$/) != null) {

			c.inputWidth = parseInt(c.inputWidth) + 2

		}

		this.doAddLabel(b, c);

		this.doAddInput(b, c, "SELECT", null, true, true, "dhxform_select");

		this.doAttachEvents(b);

		this.doLoadOpts(b, c);

		b.onselectstart = function(g) {

			return true

		};

		b.childNodes[b._ll ? 1 : 0].childNodes[0].setAttribute("mode",

				c.comboType || "");

		if (c.comboImagePath) {

			b.childNodes[b._ll ? 1 : 0].childNodes[0].setAttribute("imagePath",

					c.comboImagePath)

		}

		if (c.comboDefaultImage) {

			b.childNodes[b._ll ? 1 : 0].childNodes[0].setAttribute(

					"defaultImage", c.comboDefaultImage)

		}

		if (c.comboDefaultImageDis) {

			b.childNodes[b._ll ? 1 : 0].childNodes[0].setAttribute(

					"defaultImageDis", c.comboDefaultImageDis)

		}

		b._combo = new dhtmlXComboFromSelect(

				b.childNodes[b._ll ? 1 : 0].childNodes[0]);

		b._combo.setSkin(e);

		b._combo._currentComboValue = b._combo.getSelectedValue();

		b._combo.getInput().id = c.uid;

		if (e == "material") {

			b._combo.list.className += " dhxform_obj_" + e

		}

		var a = this;

		b._combo.attachEvent("onChange", function() {

			a.doOnChange(this)

		});

		if (c.connector) {

			this.doLoadOptsConnector(b, c.connector)

		}

		if (c.filtering) {

			b._combo.enableFilteringMode(true)

		} else {

			if (c.serverFiltering) {

				b._combo.enableFilteringMode(true, c.serverFiltering,

						c.filterCache, c.filterSubLoad)

			}

		}

		if (c.readonly == true) {

			this.setReadonly(b, true)

		}

		if (c.hidden == true) {

			this.hide(b)

		}

		if (c.style) {

			b._combo.DOMelem_input.style.cssText += c.style

		}

		b._combo.attachEvent("onFocus", function() {

			var g = this.cont.parentNode.parentNode;

			var h = g.getForm();

			if ((h.skin == "dhx_terrace" || h.skin == "material")

					&& this.cont.className.search(/combo_in_focus/) < 0) {

				this.cont.className += " combo_in_focus"

			}

			h.callEvent("onFocus", [ g._idd ]);

			h = g = null

		});

		b._combo.attachEvent("onBlur", function() {

			var g = this.cont.parentNode.parentNode;

			var h = g.getForm();

			if ((h.skin == "dhx_terrace" || h.skin == "material")

					&& this.cont.className.search(/combo_in_focus/) >= 0) {

				this.cont.className = this.cont.className.replace(

						/\s{0,}combo_in_focus/gi, "")

			}

			h.callEvent("onBlur", [ g._idd ]);

			h = g = null

		});

		return this

	},

	destruct : function(a) {

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onchange = null;

		a._combo._currentComboValue = null;

		a._combo.unload();

		a._combo = null;

		a._apiChange = null;

		this.d2(a);

		a = null

	},

	doAttachEvents : function(b) {

		var a = this;

		b.childNodes[b._ll ? 1 : 0].childNodes[0].onchange = function() {

			a.doOnChange(this);

			a.doValidate(this.DOMParent.parentNode.parentNode)

		}

	},

	doValidate : function(a) {

		if (a.getForm().hot_validate) {

			this._validate(a)

		}

	},

	doOnChange : function(b) {

		var a = b.base.parentNode.parentNode.parentNode;

		if (a._apiChange) {

			return

		}

		b._newComboValue = b.getSelectedValue();

		if (b._newComboValue != b._currentComboValue) {

			if (a.checkEvent("onBeforeChange")) {

				if (a.callEvent("onBeforeChange", [ a._idd,

						b._currentComboValue, b._newComboValue ]) !== true) {

					window.setTimeout(function() {

						b.setComboValue(b._currentComboValue)

					}, 1);

					return false

				}

			}

			b._currentComboValue = b._newComboValue;

			a.callEvent("onChange", [ a._idd, b._currentComboValue ])

		}

		a._autoCheck()

	},

	doLoadOptsConnector : function(e, a) {

		var c = this;

		var b = e;

		e._connector_working = true;

		e._apiChange = true;

		e._combo.load(a, function() {

			b.callEvent("onOptionsLoaded", [ b._idd ]);

			b._connector_working = false;

			if (b._connector_value != null) {

				c.setValue(b, b._connector_value);

				b._connector_value = null

			}

			b._apiChange = false;

			c = b = null

		})

	},

	enable : function(a) {

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._enabled = true;

		a._combo.enable()

	},

	disable : function(a) {

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._enabled = false;

		a._combo.disable()

	},

	getCombo : function(a) {

		return a._combo

	},

	setValue : function(a, b) {

		if (a._connector_working) {

			a._connector_value = b;

			return

		}

		a._apiChange = true;

		a._combo.setComboValue(b);

		a._combo._currentComboValue = a._combo.getActualValue();

		a._apiChange = false

	},

	getValue : function(a) {

		return a._combo.getActualValue()

	},

	setWidth : function(b, a) {

		b.childNodes[b._ll ? 1 : 0].childNodes[0].style.width = a + "px"

	},

	setReadonly : function(a, b) {

		if (!a._combo) {

			return

		}

		a._combo_ro = b;

		a._combo.readonly(a._combo_ro)

	},

	isReadonly : function(a, b) {

		return a._combo_ro || false

	},

	setFocus : function(a) {

		if (a._enabled) {

			a._combo.setFocus()

		}

	},

	_setCss : function(a, c, b) {

		a._combo.setFontSize(b, b)

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doLoadOpts : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		isEnabled : 1,

		_checkNoteWidth : 1

	}) {

		dhtmlXForm.prototype.items.combo[b] = dhtmlXForm.prototype.items.select[b]

	}

})();

dhtmlXForm.prototype.items.combo.d2 = dhtmlXForm.prototype.items.select.destruct;

dhtmlXForm.prototype.getCombo = function(a) {

	return this.doWithItem(a, "getCombo")

};

dhtmlXForm.prototype.items.calendar = {

	render : function(c, g) {

		var b = this;

		c._type = "calendar";

		c._enabled = true;

		var h = navigator.userAgent;

		var a = (h.indexOf("MSIE 6.0") >= 0 || h.indexOf("MSIE 7.0") >= 0 || h

				.indexOf("MSIE 8.0") >= 0);

		this.doAddLabel(c, g);

		this.doAddInput(c, g, "INPUT", "TEXT", true, true,

				"dhxform_textarea calendar");

		this.doAttachChangeLS(c);

		if (a) {

			c.childNodes[c._ll ? 1 : 0].childNodes[0].onfocus2 = c.childNodes[c._ll ? 1

					: 0].childNodes[0].onfocus;

			c.childNodes[c._ll ? 1 : 0].childNodes[0].onfocus = function() {

				if (this._skipOnFocus == true) {

					this._skipOnFocus = false;

					return

				}

				this.onfocus2.apply(this, arguments)

			}

		}

		c.childNodes[c._ll ? 1 : 0].childNodes[0]._idd = c._idd;

		c.childNodes[c._ll ? 1 : 0].childNodes[0].onblur = function() {

			var j = this.parentNode.parentNode;

			if (j._c.base._formMouseDown) {

				j._c.base._formMouseDown = false;

				this._skipOnFocus = true;

				this.focus();

				this.value = this.value;

				j = null;

				return true

			}

			var l = j.getForm();

			l._ccDeactivate(j._idd);

			b.checkEnteredValue(this.parentNode.parentNode);

			if (l.live_validate) {

				b._validate(j)

			}

			l.callEvent("onBlur", [ j._idd ]);

			if (!j._c.isVisible()) {

				j._tempValue = null

			}

			l = j = null

		};

		c._f = (g.dateFormat || null);

		c._f0 = (g.serverDateFormat || c._f);

		var e = c.getForm();

		c._c = new dhtmlXCalendarObject(

				c.childNodes[c._ll ? 1 : 0].childNodes[0], g.skin || e.skin

						|| "dhx_skyblue");

		c._c._nullInInput = true;

		c._c.enableListener(c.childNodes[c._ll ? 1 : 0].childNodes[0]);

		if (c._f != null) {

			c._c.setDateFormat(c._f)

		}

		if (!window.dhx4.s2b(g.enableTime)) {

			c._c.hideTime()

		}

		if (window.dhx4.s2b(g.enableTodayButton)) {

			c._c.showToday()

		}

		if (window.dhx4.s2b(g.showWeekNumbers)) {

			c._c.showWeekNumbers()

		}

		if (!isNaN(g.weekStart)) {

			c._c.setWeekStartDay(g.weekStart)

		}

		if (typeof (g.calendarPosition) != "undefined") {

			c._c.setPosition(g.calendarPosition)

		}

		if (g.minutesInterval != null) {

			c._c.setMinutesInterval(g.minutesInterval)

		}

		c._c._itemIdd = c._idd;

		c._c.attachEvent("onBeforeChange",

				function(j) {

					if (c._value != j) {

						if (c.checkEvent("onBeforeChange")) {

							if (c.callEvent("onBeforeChange", [ c._idd,

									c._value, j ]) !== true) {

								return false

							}

						}

						c._tempValue = c._value = j;

						b.setValue(c, j, false);

						c.callEvent("onChange", [ this._itemIdd, c._value ])

					}

					return true

				});

		c._c.attachEvent("onClick", function() {

			c._tempValue = null

		});

		c._c.attachEvent("onHide", function() {

			c._tempValue = null

		});

		if (a) {

			c._c.base.onmousedown = function() {

				this._formMouseDown = true;

				return false

			}

		}

		this.setValue(c, g.value);

		e = null;

		return this

	},

	getCalendar : function(a) {

		return a._c

	},

	setSkin : function(a, b) {

		a._c.setSkin(b)

	},

	setValue : function(b, c, a) {

		if (!c || c == null || typeof (c) == "undefined" || c == "") {

			b._value = null;

			b.childNodes[b._ll ? 1 : 0].childNodes[0].value = ""

		} else {

			b._value = (c instanceof Date ? c : b._c._strToDate(c, b._f0

					|| b._c._dateFormat));

			b.childNodes[b._ll ? 1 : 0].childNodes[0].value = b._c._dateToStr(

					b._value, b._f || b._c._dateFormat)

		}

		if (a !== false) {

			b._c.setDate(b._value)

		}

	},

	getValue : function(b, a) {

		var c = b._tempValue || b._c.getDate();

		if (a === true && c == null) {

			return ""

		}

		return (a === true ? b._c._dateToStr(c, b._f0 || b._c._dateFormat) : c)

	},

	setDateFormat : function(b, a, c) {

		b._f = a;

		b._f0 = (c || b._f);

		b._c.setDateFormat(b._f);

		this.setValue(b, this.getValue(b))

	},

	destruct : function(a) {

		a._c.disableListener(a.childNodes[a._ll ? 1 : 0].childNodes[0]);

		a._c.unload();

		a._c = null;

		try {

			delete a._c

		} catch (b) {

		}

		a._f = null;

		try {

			delete a._f

		} catch (b) {

		}

		a._f0 = null;

		try {

			delete a._f0

		} catch (b) {

		}

		a.childNodes[a._ll ? 1 : 0].childNodes[0]._idd = null;

		a.childNodes[a._ll ? 1 : 0].childNodes[0].onblur = null;

		this.d2(a);

		a = null

	},

	checkEnteredValue : function(a) {

		this.setValue(a, a._c.getDate())

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1,

		setReadonly : 1,

		isReadonly : 1,

		setFocus : 1,

		getInput : 1

	}) {

		dhtmlXForm.prototype.items.calendar[b] = dhtmlXForm.prototype.items.input[b]

	}

})();

dhtmlXForm.prototype.items.calendar.doAttachChangeLS = dhtmlXForm.prototype.items.select.doAttachChangeLS;

dhtmlXForm.prototype.items.calendar.d2 = dhtmlXForm.prototype.items.input.destruct;

dhtmlXForm.prototype.getCalendar = function(a) {

	return this.doWithItem(a, "getCalendar")

};

dhtmlXForm.prototype.setCalendarDateFormat = function(b, a, c) {

	this.doWithItem(b, "setDateFormat", a, c)

};

dhtmlXForm.prototype.items.btn2state = {

	setChecked : function(a, b) {

		a._checked = (b === true ? true : false);

		a.childNodes[a._ll ? 1 : 0].lastChild.className = "dhxform_img "

				+ a._cssName + "_" + (a._checked ? "1" : "0");

		this.doCheckValue(a)

	}

};

(function() {

	for ( var b in dhtmlXForm.prototype.items.checkbox) {

		if (!dhtmlXForm.prototype.items.btn2state[b]) {

			dhtmlXForm.prototype.items.btn2state[b] = dhtmlXForm.prototype.items.checkbox[b]

		}

	}

})();

dhtmlXForm.prototype.items.btn2state.render2 = dhtmlXForm.prototype.items.btn2state.render;

dhtmlXForm.prototype.items.btn2state.render = function(a, b) {

	b._autoInputWidth = false;

	this.render2(a, b);

	a._type = "btn2state";

	a._cssName = (typeof (b.cssName) == "undefined" ? "btn2state" : b.cssName);

	a._updateImgNode = function() {

	};

	a._doOnFocus = function() {

		a.getForm().callEvent("onFocus", [ a._idd ])

	};

	a._doOnBlur = function() {

		a.getForm().callEvent("onBlur", [ a._idd ])

	};

	a._doOnKeyUpDown = function(e, c, g) {

		this.callEvent(e, [ this.childNodes[this._ll ? 0 : 1].childNodes[0], c,

				this._idd ])

	};

	this.setChecked(a, a._checked);

	return this

};

dhtmlXForm.prototype.setFormData_btn2state = function(a, b) {

	this[b == true || parseInt(b) == 1 || b == "true"

			|| b == this.getItemValue(a) ? "checkItem" : "uncheckItem"](a)

};

dhtmlXForm.prototype.getFormData_btn2state = function(a) {

	return (this.isItemChecked(a) ? this.getItemValue(a) : 0)

};

dhtmlXForm.prototype.items.colorpicker = {

	colorpicker : {},

	render : function(c, e) {

		var b = this;

		c._type = "colorpicker";

		c._enabled = true;

		this.doAddLabel(c, e);

		this.doAddInput(c, e, "INPUT", "TEXT", true, true, "dhxform_textarea");

		c._value = (e.value || "");

		c.childNodes[c._ll ? 1 : 0].childNodes[0].value = c._value;

		var a = {

			input : c.childNodes[c._ll ? 1 : 0].childNodes[0],

			custom_colors : (window.dhx4.s2b(e.enableCustomColors) == true),

			skin : c.getForm().skin

		};

		this.colorpicker[c._idd] = new dhtmlXColorPicker(a);

		this.colorpicker[c._idd]._nodes[0].valueColor = null;

		this.colorpicker[c._idd].base.className += " dhtmlxcp_in_form";

		if (typeof (e.customColors) != "undefined") {

			this.colorpicker[c._idd].setCustomColors(e.customColors)

		}

		if (typeof (e.cpPosition) == "string") {

			this.colorpicker[c._idd].setPosition(e.cpPosition)

		}

		this.colorpicker[c._idd]

				.attachEvent(

						"onSelect",

						function(g) {

							if (c._value != g) {

								if (c.checkEvent("onBeforeChange")) {

									if (c.callEvent("onBeforeChange", [ c._idd,

											c._value, g ]) !== true) {

										c.childNodes[c._ll ? 1 : 0].childNodes[0].value = c._value;

										return

									}

								}

								c._value = g;

								b.setValue(c, g);

								c.callEvent("onChange", [ c._idd, c._value ])

							}

						});

		this.colorpicker[c._idd].attachEvent("onHide", function(g) {

			var h = c.childNodes[c._ll ? 1 : 0].childNodes[0];

			if (h.value != c._value) {

				h.value = c._value

			}

			h = null

		});

		c.childNodes[c._ll ? 1 : 0].childNodes[0]._idd = c._idd;

		return this

	},

	getColorPicker : function(a) {

		return this.colorpicker[a._idd]

	},

	destruct : function(a) {

		if (this.colorpicker[a._idd].unload) {

			this.colorpicker[a._idd].unload()

		}

		this.colorpicker[a._idd] = null;

		try {

			delete this.colorpicker[a._idd]

		} catch (b) {

		}

		a.childNodes[a._ll ? 1 : 0].childNodes[0]._idd = null;

		this.d2(a);

		a = null

	},

	setSkin : function(a, b) {

		this.colorpicker[a._idd].setSkin(b)

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		enable : 1,

		disable : 1,

		isEnabled : 1,

		setWidth : 1,

		setReadonly : 1,

		isReadonly : 1,

		setValue : 1,

		getValue : 1,

		updateValue : 1,

		setFocus : 1,

		getInput : 1

	}) {

		dhtmlXForm.prototype.items.colorpicker[b] = dhtmlXForm.prototype.items.input[b]

	}

})();

dhtmlXForm.prototype.items.colorpicker.d2 = dhtmlXForm.prototype.items.input.destruct;

dhtmlXForm.prototype.getColorPicker = function(a) {

	return this.doWithItem(a, "getColorPicker")

};

dhtmlXForm.prototype.items.container = {

	render : function(a, b) {

		a._type = "container";

		a._enabled = true;

		this.doAddLabel(a, b);

		this.doAddInput(a, b, "DIV", null, true, true, "dhxform_container");

		return this

	},

	getContainer : function(a) {

		return a.childNodes[a._ll ? 1 : 0].childNodes[0]

	},

	enable : function(a) {

		a._enabled = true;

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a.callEvent("onEnable", [ a._idd ])

	},

	disable : function(a) {

		a._enabled = false;

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a.callEvent("onDisable", [ a._idd ])

	},

	doAttachEvents : function() {

	},

	setValue : function() {

	},

	getValue : function() {

		return null

	}

};

dhtmlXForm.prototype.getContainer = function(a) {

	return this.doWithItem(a, "getContainer")

};

(function() {

	for ( var b in dhtmlXForm.prototype.items.input) {

		if (!dhtmlXForm.prototype.items.container[b]) {

			dhtmlXForm.prototype.items.container[b] = dhtmlXForm.prototype.items.input[b]

		}

	}

})();

dhtmlXForm.prototype.items.editor = {

	editor : {},

	render : function(c, e) {

		var a = (!isNaN(e.rows));

		c._type = "editor";

		c._enabled = true;

		c._editor_id = c.getForm().idPrefix + c._idd;

		this.doAddLabel(c, e);

		this.doAddInput(c, e, "DIV", null, true, true, "dhxform_item_template");

		c._value = (e.value || "");

		var b = this;

		this.editor[c._editor_id] = new dhtmlXEditor({

			parent : c.childNodes[c._ll ? 1 : 0].childNodes[0],

			content : c._value,

			iconsPath : e.iconsPath,

			toolbar : e.toolbar,

			skin : c.getForm().skin

		});

		this.editor[c._editor_id]

				.attachEvent(

						"onAccess",

						function(h, j) {

							c.callEvent("_onBeforeEditorAccess", []);

							_dhxForm_doClick(document.body, "click");

							if (h == "blur") {

								b.doOnBlur(c, this);

								c.callEvent("onBlur", [ c._idd ]);

								if ({

									dhx_terrace : 1,

									material : 1

								}[c.getForm().skin] == 1) {

									var g = c.childNodes[c._ll ? 1 : 0].className;

									if (g.indexOf("dhxeditor_focus") >= 0) {

										c.childNodes[c._ll ? 1 : 0].className = (g)

												.replace(

														/\s{0,}dhxeditor_focus/gi,

														"")

									}

								}

							} else {

								c.callEvent("onEditorAccess", [ c._idd, h, j,

										this, c.getForm() ]);

								c.callEvent("onFocus", [ c._idd ]);

								if ({

									dhx_terrace : 1,

									material : 1

								}[c.getForm().skin] == 1) {

									var g = c.childNodes[c._ll ? 1 : 0].className;

									if (g.indexOf("dhxeditor_focus") == -1) {

										c.childNodes[c._ll ? 1 : 0].className += " dhxeditor_focus"

									}

								}

							}

						});

		this.editor[c._editor_id].attachEvent("onToolbarClick", function(g) {

			c.callEvent("onEditorToolbarClick",

					[ c._idd, g, this, c.getForm() ])

		});

		if (e.readonly) {

			this.setReadonly(c, true)

		}

		c.childNodes[c._ll ? 0 : 1].childNodes[0].removeAttribute("for");

		c.childNodes[c._ll ? 0 : 1].childNodes[0].onclick = function() {

			b.editor[c._editor_id]._focus()

		};

		return this

	},

	doOnBlur : function(c, b) {

		var a = b.getContent();

		if (c._value != a) {

			if (c.checkEvent("onBeforeChange")) {

				if (c.callEvent("onBeforeChange", [ c._idd, c._value, a ]) !== true) {

					b.setContent(c._value);

					return

				}

			}

			c._value = a;

			c.callEvent("onChange", [ c._idd, a ])

		}

	},

	setValue : function(a, b) {

		if (a._value == b) {

			return

		}

		a._value = b;

		this.editor[a._editor_id].setContent(a._value)

	},

	getValue : function(a) {

		a._value = this.editor[a._editor_id].getContent();

		return a._value

	},

	enable : function(a) {

		if (this.isEnabled(a) != true) {

			this.editor[a._editor_id].setReadonly(false);

			this.doEn(a)

		}

	},

	disable : function(a) {

		if (this.isEnabled(a) == true) {

			this.editor[a._editor_id].setReadonly(true);

			this.doDis(a)

		}

	},

	setReadonly : function(a, b) {

		this.editor[a._editor_id].setReadonly(b)

	},

	getEditor : function(a) {

		return (this.editor[a._editor_id] || null)

	},

	destruct : function(a) {

		a.childNodes[a._ll ? 0 : 1].childNodes[0].onclick = null;

		this.editor[a._editor_id].unload();

		this.editor[a._editor_id] = null;

		this.d2(a);

		a = null

	},

	setFocus : function(a) {

		this.editor[a._editor_id]._focus()

	}

};

(function() {

	for ( var b in {

		doAddLabel : 1,

		doAddInput : 1,

		doUnloadNestedLists : 1,

		setText : 1,

		getText : 1,

		setWidth : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.editor[b] = dhtmlXForm.prototype.items.template[b]

	}

})();

dhtmlXForm.prototype.items.editor.d2 = dhtmlXForm.prototype.items.select.destruct;

dhtmlXForm.prototype.items.editor.doEn = dhtmlXForm.prototype.items.select.enable;

dhtmlXForm.prototype.items.editor.doDis = dhtmlXForm.prototype.items.select.disable;

dhtmlXForm.prototype.getEditor = function(a) {

	return this.doWithItem(a, "getEditor")

};

dhtmlXForm.prototype.items.image = {

	_dimFix : true,

	render : function(g, j) {

		g._type = "image";

		g._enabled = true;

		g._fr_name = "dhxform_image_" + window.dhx4.newId();

		g._url = (typeof (j.url) == "undefined" || j.url == null ? "" : j.url);

		if (j.inputWidth == "auto") {

			j.inputWidth = 120

		}

		if (j.inputHeight == "auto") {

			j.inputHeight = j.inputWidth

		}

		this.doAddLabel(g, j);

		this.doAddInput(g, j, "DIV", null, true, true, "dhxform_image");

		var b = g.childNodes[g._ll ? 1 : 0].childNodes[0];

		b.style.height = parseInt(b.style.height)

				- dhtmlXForm.prototype.items[this.t]._dim + "px";

		var a = (typeof (j.imageWidth) != "undefined" ? parseInt(j.imageWidth)

				: j.inputWidth);

		var c = (typeof (j.imageHeight) != "undefined" ? parseInt(j.imageHeight)

				: j.inputHeight);

		if (c == "auto") {

			c = a

		}

		g._dim = {

			mw : j.inputWidth - this._dim,

			mh : j.inputHeight - this._dim,

			w : a,

			h : c

		};

		b.innerHTML = "<img class='dhxform_image_img' border='0' style='visibility:hidden;'><iframe name='"

				+ g._fr_name

				+ "' style='position: absolute; width:0px; height:0px; top:-10px; left:-10px;' frameBorder='0' border='0'></iframe><div class='dhxform_image_wrap'><form action='"

				+ g._url

				+ "' method='POST' enctype='multipart/form-data' target='"

				+ g._fr_name

				+ "' class='dhxform_image_form'><input type='hidden' name='action' value='uploadImage'><input type='hidden' name='itemId' value='"

				+ g._idd

				+ "'><input type='file' name='file' class='dhxform_image_input'></form>";

		"</div>";

		this.adjustImage(g);

		b.childNodes[2].firstChild.lastChild.onchange = function() {

			g._is_uploading = true;

			this.parentNode.submit();

			this.parentNode.parentNode.className = "dhxform_image_wrap dhxform_image_in_progress";

			this.value = ""

		};

		var e = this;

		if (window.navigator.userAgent.indexOf("MSIE") >= 0) {

			b.childNodes[1].onreadystatechange = function() {

				if (this.readyState == "complete") {

					e.doOnUpload(g)

				}

			}

		} else {

			b.childNodes[1].onload = function() {

				e.doOnUpload(g)

			}

		}

		this._moreClear = function() {

			e = null

		};

		this.setValue(g, j.value || "");

		b = null;

		return this

	},

	destruct : function(b) {

		var a = b.childNodes[b._ll ? 1 : 0].childNodes[0];

		a.childNodes[2].firstChild.lastChild.onchange = null;

		a.childNodes[1].onreadystatechange = null;

		a.childNodes[1].onload = null;

		this._moreClear();

		this.d2(b);

		b = null

	},

	doAttachEvents : function() {

	},

	setValue : function(c, g) {

		c._value = (g == null ? "" : g);

		var b = c._url + (c._url.indexOf("?") >= 0 ? "&" : "?")

				+ "action=loadImage&itemId=" + encodeURIComponent(c._idd)

				+ "&itemValue=" + encodeURIComponent(c._value)

				+ window.dhx4.ajax._dhxr("&");

		var e = c.childNodes[c._ll ? 1 : 0].childNodes[0].firstChild;

		if (e.nextSibling.tagName.toLowerCase() == "img") {

			e.nextSibling.src = b

		} else {

			var a = document.createElement("IMG");

			a.className = "dhxform_image_img";

			a.style.visibility = "hidden";

			a.onload = function() {

				this.style.visibility = "visible";

				this.parentNode.removeChild(this.nextSibling);

				this.onload = this.onerror = null

			};

			a.onerror = function() {

				this.onload.apply(this, arguments);

				this.style.visibility = "hidden"

			};

			e.parentNode.insertBefore(a, e);

			a.src = b;

			a = null;

			this.adjustImage(c)

		}

		e = null

	},

	getValue : function(a) {

		return a._value

	},

	doOnUpload : function(c) {

		if (c._is_uploading == true) {

			var a = c.childNodes[c._ll ? 1 : 0].childNodes[0].lastChild.previousSibling;

			var b = dhx4.s2j(a.contentWindow.document.body.innerHTML);

			if (typeof (b) == "object" && b != null && b.state == true

					&& b.itemId == c._idd) {

				this.setValue(c, b.itemValue, true);

				c.getForm().callEvent("onImageUploadSuccess",

						[ b.itemId, b.itemValue, b.extra ])

			} else {

				c.getForm().callEvent("onImageUploadFail",

						[ c._idd, (b ? b.extra : null) ])

			}

			b = a = null;

			window

					.setTimeout(

							function() {

								c.childNodes[c._ll ? 1 : 0].childNodes[0].lastChild.className = "dhxform_image_wrap";

								c._is_uploading = false

							}, 50)

		}

	},

	adjustImage : function(e) {

		var b = e.childNodes[e._ll ? 1 : 0].childNodes[0].firstChild;

		var a = Math.min(e._dim.mw, e._dim.w);

		var c = Math.min(e._dim.mh, e._dim.h);

		b.style.width = a + "px";

		b.style.height = c + "px";

		b.style.marginLeft = Math.max(0, Math.round(e._dim.mw / 2 - a / 2))

				+ "px";

		b.style.marginTop = Math.max(0, Math.round(e._dim.mh / 2 - c / 2))

				+ "px";

		b = e = null

	}

};

(function() {

	for ( var b in dhtmlXForm.prototype.items.input) {

		if (!dhtmlXForm.prototype.items.image[b]) {

			dhtmlXForm.prototype.items.image[b] = dhtmlXForm.prototype.items.input[b]

		}

	}

})();

dhtmlXForm.prototype.items.image.d2 = dhtmlXForm.prototype.items.input.destruct;

dhtmlXForm.prototype.setFormData_image = function(a, b) {

	this.setItemValue(a, b)

};

dhtmlXForm.prototype.getFormData_image = function(a) {

	return this.getItemValue(a)

};

dhtmlXForm.prototype.items.upload = {

	render : function(b, c) {

		b._type = "up";

		b._enabled = true;

		b._checked = true;

		b.className = c.position

				+ (typeof (c.className) == "string" ? " " + c.className : "");

		var a = document.createElement("DIV");

		b.appendChild(a);

		if (!isNaN(c.inputLeft)) {

			b.style.left = parseInt(c.inputLeft) + "px"

		}

		if (!isNaN(c.inputTop)) {

			b.style.top = parseInt(c.inputTop) + "px"

		}

		if (c.inputWidth != "auto") {

			if (!isNaN(c.inputWidth)) {

				a.style.width = parseInt(c.inputWidth) + "px"

			}

		}

		b._uploader = new dhtmlXFileUploader(a, c.swfPath || "",

				c.swfUrl || "", c.mode || null, c.swfLogs, c.slXap || "",

				c.slUrl || "", c.slLogs || "", c.multiple);

		b._uploader.setURL(c.url || "");

		b._uploader.callEvent = b.callEvent;

		if (typeof (c.autoStart) != "undefined") {

			b._uploader.setAutoStart(c.autoStart)

		}

		if (typeof (c.autoRemove) != "undefined") {

			b._uploader.setAutoRemove(c.autoRemove)

		}

		if (typeof (c.titleScreen) != "undefined") {

			b._uploader.enableTitleScreen(c.titleScreen)

		}

		if (typeof (c.titleText) != "undefined") {

			b._uploader.setTitleText(c.titleText)

		}

		if (c.hidden == true) {

			this.hide(b)

		}

		if (c.disabled == true) {

			this.userDisable(b)

		}

		if (!(c.inputHeight == "auto" || parseInt(c.inputHeight) == NaN)) {

			b._uploader.p_files.style.height = parseInt(c.inputHeight) + "px"

		}

		return this

	},

	destruct : function(a) {

		this.doUnloadNestedLists(a);

		a._uploader.callEvent = function() {

			return true

		};

		a._uploader.unload();

		a._uploader.callEvent = null;

		a._uploader = null;

		a._checked = null;

		a._enabled = null;

		a._idd = null;

		a._type = null;

		a.onselectstart = null;

		a._autoCheck = null;

		a.callEvent = null;

		a.checkEvent = null;

		a.getForm = null;

		while (a.childNodes.length > 0) {

			a.removeChild(a.childNodes[0])

		}

		a.parentNode.removeChild(a);

		a = null

	},

	setText : function(a, b) {

	},

	getText : function(a) {

	},

	enable : function(a) {

		a._enabled = true;

		if (String(a.className).search("disabled") >= 0) {

			a.className = String(a.className).replace(/disabled/gi, "")

		}

		a._uploader.enable()

	},

	disable : function(a) {

		a._enabled = false;

		if (String(a.className).search("disabled") < 0) {

			a.className += " disabled"

		}

		a._uploader.disable()

	},

	setWidth : function(b, a) {

		b.childNodes[0].style.width = a + "px";

		b._width = a

	},

	getWidth : function(a) {

		return a._width || parseInt(a.childNodes[0].style.width)

	},

	setValue : function(a) {

		a._uploader.clear()

	},

	getValue : function(h) {

		var e = h._uploader.getData();

		var g = {};

		var c = 0;

		for ( var b in e) {

			g[h._idd + "_r_" + c] = e[b].realName;

			g[h._idd + "_s_" + c] = e[b].serverName;

			c++

		}

		g[h._idd + "_count"] = c;

		return g

	},

	getUploader : function(a) {

		return a._uploader

	},

	getStatus : function(a) {

		return a._uploader.getStatus()

	}

};

(function() {

	for ( var b in {

		doUnloadNestedLists : 1,

		isEnabled : 1

	}) {

		dhtmlXForm.prototype.items.upload[b] = dhtmlXForm.prototype.items.checkbox[b]

	}

})();

dhtmlXForm.prototype.setFormData_upload = function(a) {

	this.doWithItem(a, "setValue")

};

dhtmlXForm.prototype.getUploader = function(a) {

	return this.doWithItem(a, "getUploader")

};

dhtmlXForm.prototype.getUploaderStatus = function(a) {

	return this.doWithItem(a, "getStatus")

};

function dhtmlXFileUploader(b, l, j, m, q, h, s, g, t) {

	var n = this;

	if (typeof (m) == "string" && typeof (this[m]) == "function") {

		this.engine = m

	} else {

		this.engine = "html4";

		var c = null;

		if (typeof (window.FormData) != "undefined"

				&& typeof (window.XMLHttpRequest) != "undefined") {

			c = new XMLHttpRequest();

			if (typeof (c.upload) == "undefined") {

				c = null

			}

		}

		if (c != null) {

			this.engine = "html5"

		} else {

			if (typeof (window.swfobject) != "undefined" || c === false) {

				var c = swfobject.getFlashPlayerVersion();

				if (c.major >= 10) {

					this.engine = "flash"

				}

			} else {

				this._sl_v = this.getSLVersion();

				if (this._sl_v) {

					this.engine = "sl"

				}

			}

		}

		c = null

	}

	if (typeof (b) == "string") {

		b = document.getElementById(b)

	}

	this._upload_mp = (typeof (t) != "undefined" ? t == true : true);

	this._upload_dnd = true;

	this._swf_file_url = l || "";

	this._swf_upolad_url = j || "";

	this._swf_logs = q;

	this._sl_xap = h;

	this._sl_upload_url = s;

	this._sl_logs = g;

	this.p = document.createElement("DIV");

	this.p.className += " dhx_file_uploader";

	b.appendChild(this.p);

	this.p_files = document.createElement("DIV");

	this.p_files.className = "dhx_upload_files";

	this.p.appendChild(this.p_files);

	this.p_controls = document.createElement("DIV");

	this.p_controls.className = "dhx_upload_controls";

	this.p.appendChild(this.p_controls);

	this._files = {};

	this._items = {};

	this._data = {};

	this._autoStart = false;

	this._autoRemove = false;

	this._titleScreen = true;

	this._enabled = true;

	this._uploaded_count = 0;

	this._initToolbar = function() {

		this.b_opts = {

			info : {

				onclick : null

			},

			browse : {

				onclick : null,

				tooltip : "Browse"

			},

			upload : {

				onclick : function() {

					if (!n._enabled) {

						return

					}

					if (!n._uploading) {

						n._uploadStart()

					}

				},

				tooltip : "Upload"

			},

			cancel : {

				onclick : function() {

					if (!n._enabled) {

						return

					}

					n._uploadStop();

					n._switchButton(false)

				},

				tooltip : "Stop"

			},

			clear : {

				onclick : function() {

					if (!n._enabled) {

						return

					}

					n.clear()

				},

				tooltip : "Clear list"

			}

		};

		this.buttons = {};

		for ( var e in this.b_opts) {

			var u = document.createElement("DIV");

			u.innerHTML = "&nbsp;";

			u.className = "dhx_file_uploader_button button_" + e;

			u.onclick = this.b_opts[e].onclick;

			if (this.b_opts[e].tooltip) {

				u.title = this.b_opts[e].tooltip

			}

			this.p_controls.appendChild(u);

			this.buttons[e] = u;

			u = null

		}

		this.buttons.cancel.style.display = "none"

	};

	this._readableSize = function(u) {

		var e = false;

		var a = [ "b", "Kb", "Mb", "Gb", "Tb", "Pb", "Eb" ];

		for (var v = 0; v < a.length; v++) {

			if (u > 1024) {

				u = u / 1024

			} else {

				if (e === false) {

					e = v

				}

			}

		}

		if (e === false) {

			e = a.length - 1

		}

		return Math.round(u * 100) / 100 + " " + a[e]

	};

	this._beforeAddFileToList = function(a, e) {

		return (this.callEvent("onBeforeFileAdd", [ a, e ]) === true)

	};

	this._addFileToList = function(x, e, v, w, a) {

		this._checkTitleScreen();

		var u = document.createElement("DIV");

		u._idd = x;

		u.className = "dhx_file dhx_file_" + w;

		u.innerHTML = "<div class='dhx_file_param dhx_file_name'>&nbsp;</div><div class='dhx_file_param dhx_file_progress'>"

				+ a

				+ "%</div><div class='dhx_file_param dhx_file_delete' title='Remove from list'>&nbsp;</div>";

		this.p_files.appendChild(u);

		u.childNodes[0].style.width = u.offsetWidth - 127 + "px";

		this._items[x] = u;

		this._updateFileNameSize(x);

		u.childNodes[2].onclick = function() {

			if (!n._enabled) {

				return

			}

			var y = this.parentNode._idd;

			n._removeFileFromQueue(y)

		};

		this.callEvent("onFileAdd", [ e ])

	};

	this._removeFileFromList = function(a) {

		if (!this._items[a]) {

			return

		}

		this._items[a].childNodes[2].onclick = null;

		this._items[a].parentNode.removeChild(this._items[a]);

		this._items[a] = null;

		delete this._items[a];

		if (this._data[a]) {

			this._data[a] = null;

			delete this._data[a]

		}

		this._checkTitleScreen()

	};

	this._updateFileNameSize = function(a) {

		this._items[a].childNodes[0].innerHTML = this._files[a].name

				+ (!isNaN(this._files[a].size) ? " ("

						+ this._readableSize(this._files[a].size) + ")"

						: "&nbsp;");

		this._items[a].childNodes[0].title = this._files[a].name

				+ (!isNaN(this._files[a].size) ? " ("

						+ this._readableSize(this._files[a].size) + ")" : "")

	};

	this._updateFileInList = function(u, e, a) {

		if (!this._items[u]) {

			return

		}

		this._items[u].className = "dhx_file dhx_file_" + e;

		this._updateProgress(u, e, a);

		this._updateFileNameSize(u)

	};

	this._updateProgress = function(u, e, a) {

		if (e == "uploading" && a < 100 && this._progress_type == "loader") {

			this._items[u].childNodes[1].className = "dhx_file_param dhx_file_uploading";

			this._items[u].childNodes[1].innerHTML = "&nbsp;"

		} else {

			this._items[u].childNodes[1].className = "dhx_file_param dhx_file_progress";

			this._items[u].childNodes[1].innerHTML = a + "%"

		}

		this._updateFileNameSize(u)

	};

	this._removeFilesByState = function(u) {

		for ( var e in this._files) {

			if (u === true || this._files[e].state == u) {

				this._removeFileFromQueue(e)

			}

		}

	};

	this._switchButton = function(e) {

		if (e == true) {

			this.buttons.upload.style.display = "none";

			this.buttons.cancel.style.display = ""

		} else {

			var a = this._uploaded_count;

			this.buttons.upload.style.display = "";

			this.buttons.cancel.style.display = "none";

			this._uploaded_count = 0;

			if (a > 0) {

				this.callEvent("onUploadComplete", [ a ])

			}

		}

	};

	this._uploadStart = function() {

		this._switchButton(true);

		if (!this._uploading) {

			for ( var e in this._files) {

				if (this._files[e].state == "fail") {

					this._files[e].state = "added";

					this._updateFileInList(e, "added", 0)

				}

			}

		}

		this._uploading = true;

		var u = false;

		for ( var e in this._files) {

			if (!u && [ this._files[e].state ] == "added") {

				u = true;

				this._files[e].state = "uploading";

				this._updateFileInList(e, "uploading", 0);

				this._doUploadFile(e)

			}

		}

		if (!u) {

			this._uploading = false;

			this._switchButton(false)

		}

	};

	this._onUploadSuccess = function(w, v, u, a) {

		if (typeof (u) != "undefined" && this.engine == "flash") {

			var e = dhx4.s2j(u.data);

			if (e != null && e.state == true && e.name != null) {

				v = e.name;

				if (e.extra != null) {

					a = e.extra

				}

			} else {

				this._onUploadFail(w, (e != null && e.extra != null ? e.extra

						: null));

				return

			}

		}

		this._uploaded_count++;

		this._data[w] = {

			realName : this._files[w].name,

			serverName : v

		};

		this._files[w].state = "uploaded";

		this._updateFileInList(w, "uploaded", 100);

		this.callEvent("onUploadFile", [ this._files[w].name, v, a ]);

		if (this._autoRemove) {

			this._removeFileFromQueue(w)

		}

		if (this._uploading) {

			this._uploadStart()

		}

	};

	this._onUploadFail = function(e, a) {

		this._files[e].state = "fail";

		this._updateFileInList(e, "fail", 0);

		this.callEvent("onUploadFail", [ this._files[e].name, a ]);

		if (this._uploading) {

			this._uploadStart()

		}

	};

	this._onUploadAbort = function(a) {

		this._uploading = false;

		this._files[a].state = "added";

		this._updateFileInList(a, "added", 0);

		this.callEvent("onUploadCancel", [ this._files[a].name ])

	};

	this._checkTitleScreen = function() {

		var u = 0;

		for ( var e in this._files) {

			u++

		}

		if (u == 0 && this.p.className.search("dhx_file_uploader_title") < 0

				&& this._titleScreen) {

			this.p.className += " dhx_file_uploader_title";

			this.buttons.info.innerHTML = this._titleText;

			this.buttons.info.style.width = Math.max(

					this.p_controls.offsetWidth - 134, 0)

					+ "px"

		}

		if ((u > 0 || !this._titleScreen)

				&& this.p.className.search("dhx_file_uploader_title") >= 0) {

			this.p.className = this.p.className.replace(

					/dhx_file_uploader_title/g, "");

			this.buttons.info.innerHTML = ""

		}

	};

	this.callEvent = function() {

	};

	this.upload = function() {

		if (!this._uploading) {

			this._uploadStart()

		}

	};

	this.setAutoStart = function(a) {

		this._autoStart = (a == true)

	};

	this.setAutoRemove = function(a) {

		this._autoRemove = (a == true)

	};

	this.enableTitleScreen = function(a) {

		this._titleScreen = (a == true);

		this._checkTitleScreen()

	};

	this.setTitleText = function(a) {

		this._titleText = a;

		if (this.p.className.search("dhx_file_uploader_title") >= 0) {

			this.buttons.info.innerHTML = this._titleText

		}

	};

	this.setURL = function(a) {

		this._url = a

	};

	this.setSWFURL = function(a) {

		this._swf_upolad_url = a

	};

	this.enable = function() {

		this._enabled = true;

		this.p_files.className = "dhx_upload_files";

		this.p_controls.className = "dhx_upload_controls"

	};

	this.disable = function() {

		this._enabled = false;

		this.p_files.className = "dhx_upload_files dhx_uploader_dis";

		this.p_controls.className = "dhx_upload_controls dhx_uploader_dis"

	};

	this.getStatus = function() {

		var u = 0;

		for ( var e in this._files) {

			if (this._files[e].state != "uploaded") {

				return -1

			}

			u = 1

		}

		return u

	};

	this.getData = function() {

		return this._data

	};

	this.clear = function() {

		if (this.callEvent("onBeforeClear", []) !== true) {

			return

		}

		if (this._uploading) {

			n._uploadStop()

		}

		n._switchButton(false);

		n._removeFilesByState(true);

		this.callEvent("onClear", [])

	};

	this.unload = function() {

		this._removeFilesByState(true);

		this._data = null;

		this._files = null;

		this._items = null;

		this._unloadEngine();

		for ( var e in this.buttons) {

			this.buttons[e].onclick = null;

			this.buttons[e].parentNode.removeChild(this.buttons[e]);

			this.buttons[e] = null;

			delete this.buttons[e]

		}

		this.buttons = null;

		for ( var e in this.b_opts) {

			this.b_opts[e].onclick = null;

			this.b_opts[e] = null;

			delete this.b_opts[e]

		}

		this.b_opts = null;

		this.p_controls.parentNode.removeChild(this.p_controls);

		this.p_files.parentNode.removeChild(this.p_files);

		this.p.className = this.p.className.replace(

				/dhx_file_uploader_title/gi, "").replace(/dhx_file_uploader/gi,

				"");

		for ( var e in this) {

			this[e] = null

		}

		n = e = null

	};

	var o = new this[this.engine]();

	for ( var r in o) {

		this[r] = o[r];

		o[r] = null

	}

	r = o = b = null;

	this._initToolbar();

	this._initEngine();

	this._checkTitleScreen();

	return this

}

dhtmlXFileUploader.prototype.html5 = function() {

};

dhtmlXFileUploader.prototype.html5.prototype = {

	_initEngine : function() {

		var b = this;

		this.buttons.browse.onclick = function() {

			if (b._enabled) {

				b.f.click()

			}

		};

		this._progress_type = "percentage";

		var a = window.navigator.userAgent;

		if (a.match(/Windows/gi) != null && a.match(/AppleWebKit/gi) != null

				&& a.match(/Safari/gi) != null) {

			if (a.match(/Version\/5\.1\.5/gi)) {

				this._upload_mp = false

			}

			if (a.match(/Version\/5\.1[^\.\d{1,}]/gi)) {

				this._upload_dnd = false

			}

			if (a.match(/Version\/5\.1\.1/gi)) {

				this._upload_mp = false;

				this._upload_dnd = false

			}

			if (a.match(/Version\/5\.1\.2/gi)) {

				this._upload_dnd = false

			}

			if (a.match(/Version\/5\.1\.7/gi)) {

				this._upload_mp = false

			}

		}

		this._addFileInput();

		if (this._upload_dnd) {

			this.p.ondragenter = function(c) {

				if (!c.dataTransfer) {

					return

				}

				c.stopPropagation();

				c.preventDefault()

			};

			this.p.ondragover = function(c) {

				if (!c.dataTransfer) {

					return

				}

				c.stopPropagation();

				c.preventDefault()

			};

			this.p.ondrop = function(c) {

				if (!c.dataTransfer) {

					return

				}

				c.stopPropagation();

				c.preventDefault();

				if (b._enabled) {

					b._parseFilesInInput(c.dataTransfer.files)

				}

			};

			this._titleText = "Drag-n-Drop files here or<br>click to select files for upload."

		} else {

			this._titleText = "Click to select files for upload."

		}

	},

	_addFileInput : function() {

		if (this.f != null) {

			this.f.onchange = null;

			this.f.parentNode.removeChild(this.f);

			this.f = null

		}

		var a = this;

		this.f = document.createElement("INPUT");

		this.f.type = "file";

		if (this._upload_mp) {

			this.f.multiple = "1"

		}

		this.f.className = "dhx_uploader_input";

		this.p_controls.appendChild(this.f);

		this.f.onchange = function() {

			a._parseFilesInInput(this.files);

			if (window.dhx4.isOpera) {

				a._addFileInput()

			} else {

				this.value = ""

			}

		}

	},

	_doUploadFile : function(c) {

		var b = this;

		if (!this._loader) {

			this._loader = new XMLHttpRequest();

			this._loader.upload.onprogress = function(g) {

				if (b._files[this._idd].state == "uploading") {

					b._updateFileInList(this._idd, "uploading", Math

							.round(g.loaded * 100 / g.total))

				}

			};

			this._loader.onload = function(h) {

				var g = dhx4.s2j(this.responseText);

				if (typeof (g) == "object" && g != null

						&& typeof (g.state) != "undefined" && g.state == true) {

					b._onUploadSuccess(this.upload._idd, g.name, null, g.extra);

					g = null

				} else {

					b._onUploadFail(this.upload._idd, (g != null

							&& g.extra != null ? g.extra : null))

				}

			};

			this._loader.onerror = function(g) {

				b._onUploadFail(this.upload._idd)

			};

			this._loader.onabort = function(g) {

				b._onUploadAbort(this.upload._idd)

			}

		}

		this._loader.upload._idd = c;

		var a = new FormData();

		a.append("file", this._files[c].file);

		if (this.callEvent("onBeforeFileUpload", [ "html5", this.loader, a ])) {

			this._loader.open("POST", this._url

					+ (String(this._url).indexOf("?") < 0 ? "?" : "&")

					+ "mode=html5" + window.dhx4.ajax._dhxr("&"), true);

			this._loader.setRequestHeader("X-Requested-With", "XMLHttpRequest");

			this._loader.send(a)

		}

	},

	_uploadStop : function() {

		if (!this._uploading || !this._loader) {

			return

		}

		this._loader.abort()

	},

	_parseFilesInInput : function(b) {

		for (var a = 0; a < b.length; a++) {

			this._addFileToQueue(b[a])

		}

	},

	_addFileToQueue : function(a) {

		if (!this._beforeAddFileToList(a.name, a.size)) {

			return

		}

		var b = (a._idd || window.dhx4.newId());

		this._files[b] = {

			file : a,

			name : a.name,

			size : a.size,

			state : "added"

		};

		this._addFileToList(b, a.name, a.size, "added", 0);

		if (this._autoStart && !this._uploading) {

			this._uploadStart(true)

		}

	},

	_removeFileFromQueue : function(e) {

		if (!this._files[e]) {

			return

		}

		var b = this._files[e].name;

		var c = (this._data != null && this._data[e] != null ? this._data[e].serverName

				: null);

		if (this.callEvent("onBeforeFileRemove", [ b, c ]) !== true) {

			return

		}

		var a = false;

		if (this._uploading && e == this._loader.upload._idd

				&& this._files[e].state == "uploading") {

			this._uploadStop();

			a = true

		}

		this._files[e].file = null;

		this._files[e].name = null;

		this._files[e].size = null;

		this._files[e].state = null;

		this._files[e] = null;

		delete this._files[e];

		this._removeFileFromList(e);

		this.callEvent("onFileRemove", [ b, c ]);

		if (a) {

			this._uploadStart()

		}

	},

	_unloadEngine : function() {

		this.buttons.browse.onclick = null;

		this.f.onchange = null;

		this.f.parentNode.removeChild(this.f);

		this.f = null;

		this.p.ondragenter = null;

		this.p.ondragover = null;

		this.p.ondrop = null;

		if (this._loader) {

			this._loader.upload.onprogress = null;

			this._loader.onload = null;

			this._loader.onerror = null;

			this._loader.onabort = null;

			this._loader.upload._idd = null;

			this._loader = null

		}

		this._initEngine = null;

		this._doUploadFile = null;

		this._uploadStop = null;

		this._parseFilesInInput = null;

		this._addFileToQueue = null;

		this._removeFileFromQueue = null;

		this._unloadEngine = null

	}

};

dhtmlXFileUploader.prototype.html4 = function() {

};

dhtmlXFileUploader.prototype.html4.prototype = {

	_initEngine : function() {

		this._addForm();

		this._progress_type = "loader";

		this._titleText = "Click button<br>to select files for upload."

	},

	_addForm : function() {

		var a = this;

		var c = window.dhx4.newId();

		if (!this.k) {

			this.k = document.createElement("DIV");

			this.k.className = "dhx_file_form_cont";

			this.buttons.browse.appendChild(this.k);

			this.fr_name = "dhx_file_" + window.dhx4.newId();

			this.k.innerHTML = '<iframe name="'

					+ this.fr_name

					+ '" style="height:0px;width:0px;" frameBorder="0"></iframe>';

			this.fr = this.k.firstChild;

			if (window.navigator.userAgent.indexOf("MSIE") >= 0) {

				this.fr.onreadystatechange = function() {

					if (this.readyState == "complete") {

						a._onLoad()

					}

				}

			} else {

				this.fr.onload = function() {

					a._onLoad()

				}

			}

		}

		var b = document.createElement("DIV");

		b.innerHTML = "<form method='POST' enctype='multipart/form-data' target='"

				+ this.fr_name

				+ "' class='dhx_file_form' name='dhx_file_form_"

				+ window.dhx4.newId()

				+ "'><input type='hidden' name='mode' value='html4'><input type='hidden' name='uid' value='"

				+ c

				+ "'><input type='file' name='file' class='dhx_file_input'></form>";

		this.k.appendChild(b);

		b.firstChild.lastChild._idd = c;

		b.firstChild.lastChild.onchange = function() {

			if (!a._beforeAddFileToList(this.value, null)) {

				return

			}

			a._addFileToQueue(this);

			this.onchange = null;

			this.parentNode.parentNode.style.display = "none";

			a._addForm()

		};

		b = null

	},

	_onLoad : function() {

		if (this._uploading) {

			var a = dhx4.s2j(this.fr.contentWindow.document.body.innerHTML);

			if (typeof (a) == "object" && a != null) {

				if (typeof (a.state) != "undefined") {

					if (a.state == "cancelled") {

						this._onUploadAbort(this.fr._idd);

						a = null;

						return

					} else {

						if (a.state == true) {

							if (typeof (a.size) != "undefined"

									&& !isNaN(a.size)) {

								this._files[this.fr._idd].size = a.size

							}

							this._onUploadSuccess(this.fr._idd, a.name, null,

									a.extra);

							a = null;

							return

						}

					}

				}

			}

			this._onUploadFail(this.fr._idd,

					(a != null && a.extra != null ? a.extra : null))

		}

	},

	_addFileToQueue : function(b) {

		var a = b.value.match(/[^\\\/]*$/g);

		if (a[0] != null) {

			a = a[0]

		} else {

			a = b.value

		}

		this._files[b._idd] = {

			name : a,

			form : b.parentNode,

			node : b.parentNode.parentNode,

			input : b,

			state : "added"

		};

		this._addFileToList(b._idd, b.value, false, "added", 0);

		if (this._autoStart && !this._uploading) {

			this._uploadStart(true)

		}

	},

	_removeFileFromQueue : function(c) {

		var a = this._files[c].name;

		var b = (this._data != null && this._data[c] != null ? this._data[c].serverName

				: null);

		if (this.callEvent("onBeforeFileRemove", [ a, b ]) !== true) {

			return

		}

		this._files[c].input.onchange = null;

		this._files[c].form.removeChild(this._files[c].input);

		this._files[c].node.removeChild(this._files[c].form);

		this._files[c].node.parentNode.removeChild(this._files[c].node);

		this._files[c].input = null;

		this._files[c].name = null;

		this._files[c].form = null;

		this._files[c].node = null;

		this._files[c].size = null;

		this._files[c].state = null;

		this._files[c] = null;

		delete this._files[c];

		this._removeFileFromList(c);

		this.callEvent("onFileRemove", [ a, b ])

	},

	_doUploadFile : function(a) {

		this.fr._idd = a;

		this._files[a].form.action = this._url;

		this._files[a].form.submit()

	},

	_uploadStop : function() {

		if (!this._uploading) {

			return

		}

		this.fr.contentWindow.location.href = (this._url)

				+ (this._url.indexOf("?") < 0 ? "?" : "&")

				+ "mode=html4&action=cancel" + window.dhx4.ajax._dhxr("&")

	},

	_unloadEngine : function() {

		if (this.k) {

			this.fr_name = null;

			this.fr.onreadystatechange = null;

			this.fr.onload = null;

			this.fr.parentNode.removeChild(this.fr);

			this.fr = null;

			this.k.firstChild.firstChild.lastChild.onchange = null;

			this.k.parentNode.removeChild(this.k);

			this.k = null

		}

		this._initEngine = null;

		this._addForm = null;

		this._onLoad = null;

		this._addFileToQueue = null;

		this._removeFileFromQueue = null;

		this._doUploadFile = null;

		this._uploadStop = null;

		this._unloadEngine = null

	}

};

dhtmlXFileUploader.prototype.flash = function() {

};

dhtmlXFileUploader.prototype.flash.prototype = {

	_initEngine : function() {

		if (window.dhtmlXSWFObjectsPull == null) {

			window.dhtmlXSWFObjectsPull = {

				items : {},

				callEvent : function(g, c, e) {

					return window.dhtmlXSWFObjectsPull.items[g].uploader[c]

							.apply(

									window.dhtmlXSWFObjectsPull.items[g].uploader,

									e)

				}

			}

		}

		var b = this;

		this._swf_obj_id = "dhtmlXFileUploaderSWFObject_" + window.dhx4.newId();

		this._swf_file_url = this._swf_file_url

				+ window.dhx4.ajax._dhxr(this._swf_file_url);

		this.buttons.browse.innerHTML = "<div id='" + this._swf_obj_id

				+ "' style='width:100%;height:100%;'></div>";

		swfobject.embedSWF(this._swf_file_url, this._swf_obj_id, "100%",

				"100%", "9", null, {

					ID : this._swf_obj_id,

					enableLogs : this._swf_logs

				}, {

					wmode : "transparent"

				});

		var a = swfobject.getFlashPlayerVersion();

		this._titleText = "Engine successfuly inited<br>Flash Player: "

				+ a.major + "." + a.minor + "." + a.release;

		this._progress_type = "percentage";

		window.dhtmlXSWFObjectsPull.items[this._swf_obj_id] = {

			id : this._swf_obj_id,

			uploader : this

		}

	},

	_beforeAddFileToQueue : function(a, b) {

		return (this.callEvent("onBeforeFileAdd", [ a, b ]) === true)

	},

	_addFileToQueue : function(e, b, c) {

		if (window.dhx4.isIE) {

			var a = document.createElement("INPUT");

			a.type = "TEXT";

			a.style.position = "absolute";

			a.style.left = "0px";

			a.style.top = window.dhx4.absTop(this.buttons.browse) + "px";

			a.style.width = "10px";

			document.body.appendChild(a);

			a.focus();

			document.body.removeChild(a);

			a = null

		}

		this._files[e] = {

			name : b,

			size : c,

			state : "added"

		};

		this._addFileToList(e, b, c, "added", 0);

		if (this._autoStart && !this._uploading) {

			this._uploadStart(true)

		}

	},

	_removeFileFromQueue : function(e) {

		if (!this._files[e]) {

			return

		}

		var b = this._files[e].name;

		var c = (this._data != null && this._data[e] != null ? this._data[e].serverName

				: null);

		if (this.callEvent("onBeforeFileRemove", [ b, c ]) !== true) {

			return

		}

		var a = false;

		if (this._uploading && this._files[e].state == "uploading") {

			this._uploadStop();

			a = true

		}

		swfobject.getObjectById(this._swf_obj_id).removeFileById(e);

		this._files[e].name = null;

		this._files[e].size = null;

		this._files[e].state = null;

		this._files[e] = null;

		delete this._files[e];

		this._removeFileFromList(e);

		this.callEvent("onFileRemove", [ b, c ]);

		if (a) {

			this._uploadStart()

		}

	},

	_doUploadFile : function(a) {

		swfobject.getObjectById(this._swf_obj_id).upload(a,

				this._swf_upolad_url)

	},

	_uploadStop : function(c) {

		for ( var b in this._files) {

			if (this._files[b].state == "uploading") {

				swfobject.getObjectById(this._swf_obj_id).uploadStop(b)

			}

		}

	},

	_unloadEngine : function() {

		if (window.dhtmlXSWFObjectsPull.items[this._swf_obj_id]) {

			window.dhtmlXSWFObjectsPull.items[this._swf_obj_id].id = null;

			window.dhtmlXSWFObjectsPull.items[this._swf_obj_id].uploader = null;

			window.dhtmlXSWFObjectsPull.items[this._swf_obj_id] = null;

			delete window.dhtmlXSWFObjectsPull.items[this._swf_obj_id]

		}

		this._swf_obj_id = null;

		this._initEngine = null;

		this._addFileToQueue = null;

		this._removeFileFromQueue = null;

		this._doUploadFile = null;

		this._uploadStop = null;

		this._unloadEngine = null

	}

};

dhtmlXFileUploader.prototype.sl = function() {

};

dhtmlXFileUploader.prototype.sl.prototype = {

	_initEngine : function() {

		if (typeof (this._sl_v) == "undefined") {

			this._sl_v = this.getSLVersion()

		}

		if (!window.dhtmlXFileUploaderSLObjects) {

			window.dhtmlXFileUploaderSLObjects = {

				items : {},

				callEvent : function(c, a, b) {

					window.dhtmlXFileUploaderSLObjects.items[c].uploader[a]

							.apply(

									window.dhtmlXFileUploaderSLObjects.items[c].uploader,

									b)

				}

			}

		}

		this._sl_obj_id = "dhtmlXFileUploaderSLObject_" + window.dhx4.newId();

		if (this._sl_v != false) {

			this._titleText = "Engine successfuly inited<br>Silverlight version: "

					+ this._sl_v[0] + "." + this._sl_v[1];

			this.buttons.browse.innerHTML = '<div style="width:100%;height:100%;"><object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="100%" height="100%" id="'

					+ this._sl_obj_id

					+ '"><param name="source" value="'

					+ this._sl_xap

					+ '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="initParams" value="SLID='

					+ this._sl_obj_id

					+ ",LOGS="

					+ this._sl_logs

					+ '"/><param name="minRuntimeVersion" value="5.0"/></object></div>'

		} else {

			this._titleText = "Silverlight plugin not found<br>or version less than 4.0";

			this.buttons.browse.style.cursor = "wait";

			this.buttons.browse.title = ""

		}

		this._progress_type = "percentage";

		window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id] = {

			id : this._sl_obj_id,

			uploader : this

		}

	},

	_addFileToQueue : function(c, a, b) {

		this._files[c] = {

			name : a,

			size : b,

			state : "added"

		};

		this._addFileToList(c, a, b, "added", 0);

		if (this._autoStart && !this._uploading) {

			this._uploadStart(true)

		}

	},

	_removeFileFromQueue : function(b) {

		if (!this._files[b]) {

			return

		}

		var a = false;

		if (this._uploading && this._files[b].state == "uploading") {

			this._uploadStop();

			a = true

		}

		document.getElementById([ this._sl_obj_id ]).Content.a

				.removeFileById(b);

		this._files[b].name = null;

		this._files[b].size = null;

		this._files[b].state = null;

		this._files[b] = null;

		delete this._files[b];

		this._removeFileFromList(b);

		if (a) {

			this._uploadStart()

		}

	},

	_doUploadFile : function(b) {

		var a = this._sl_upload_url.split("?");

		a = (a[1] != null ? "&" + a[1] : "");

		document.getElementById(this._sl_obj_id).Content.a.upload(b,

				this._sl_upload_url, a + "&mode=sl"

						+ window.dhx4.ajax._dhxr("&"))

	},

	_uploadStop : function(c) {

		this._uploading = false;

		for ( var b in this._files) {

			if (this._files[b].state == "uploading") {

				document.getElementById(this._sl_obj_id).Content.a

						.uploadStop(b)

			}

		}

	},

	_unloadEngine : function() {

		if (window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id]) {

			window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].id = null;

			window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id].uploader = null;

			window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id] = null;

			delete window.dhtmlXFileUploaderSLObjects.items[this._sl_obj_id]

		}

		this._sl_obj_id = null;

		this._initEngine = null;

		this._addFileToQueue = null;

		this._removeFileFromQueue = null;

		this._doUploadFile = null;

		this._uploadStop = null;

		this._unloadEngine = null

	}

};

dhtmlXFileUploader.prototype.setSLURL = function(a) {

	this._sl_upload_url = a

};

dhtmlXFileUploader.prototype.getSLVersion = function() {

	var a = false;

	if (window.dhx4.isIE) {

		try {

			var b = new ActiveXObject("AgControl.AgControl");

			if (b != null) {

				var h = 4, g = 0;

				while (b.isVersionSupported([ h, g ].join("."))) {

					a = [ h, g ];

					if (++g > 9) {

						h++;

						g = 0

					}

				}

			}

			b = null

		} catch (c) {

		}

	} else {

		if (navigator.plugins["Silverlight Plug-In"] != null) {

			a = navigator.plugins["Silverlight Plug-In"].description.split(".")

		}

	}

	return a

};

dhtmlXForm.prototype.saveBackup = function() {

	if (!this._backup) {

		this._backup = {};

		this._backupId = new Date().getTime()

	}

	this._backup[++this._backupId] = this.getFormData();

	return this._backupId

};

dhtmlXForm.prototype.restoreBackup = function(a) {

	if (this._backup != null && this._backup[a] != null) {

		this.setFormData(this._backup[a])

	}

};

dhtmlXForm.prototype.clearBackup = function(a) {

	if (this._backup != null && this._backup[a] != null) {

		this._backup[a] = null;

		delete this._backup[a]

	}

};

dhtmlXForm.prototype.addItem = function(c, a, h, e) {

	var b = null;

	if (c instanceof Array) {

		b = c[1];

		c = c[0]

	}

	var g = null;

	if (c != null) {

		var g = this._getParentForm(c, b);

		if (g != null) {

			if (g.item._list == null) {

				if (!a.listParent) {

					a.listParent = g.item._idd

				}

				g.form._addItem("list", g.item._idd, [ a ], null, g.item._idd,

						h, e)

			} else {

				g.item._list[0].addItem(null, a, h, e)

			}

			g.form = g.item = null;

			g = null;

			this._autoCheck();

			return

		}

	}

	this._prepareItem(a, h, e);

	this._autoCheck()

};

dhtmlXForm.prototype.removeItem = function(b, a) {

	this._removeItem(b, a)

};

dhtmlXForm.prototype.removeColumn = function(j, h, e, c) {

	var m = null;

	if (j instanceof Array) {

		m = j[1];

		j = j[0]

	}

	if (j != null) {

		var g = this._getParentForm(j, m);

		if (g != null) {

			if (g.item._list != null && g.item._list[0] != null) {

				g.item._list[0].removeColumn(null, h, e, c)

			}

			g.form = g.item = null;

			g = null

		}

		return

	}

	h = Math.min(Math.max(h, 0), this.cont.childNodes.length - 1);

	if (this.cont.childNodes.length == 1) {

		if (e == true) {

			this._removeItemsInColumn(this.cont.childNodes[h])

		}

	} else {

		if (e == true) {

			this._removeItemsInColumn(this.cont.childNodes[h])

		} else {

			if (!c) {

				var a = h - 1;

				if (a < 0) {

					a = h + 1

				}

			} else {

				var a = h + 1;

				if (a > this.cont.childNodes.length - 1) {

					a = h - 1

				}

			}

			while (this.cont.childNodes[h].childNodes.length > 0) {

				this.cont.childNodes[a]

						.appendChild(this.cont.childNodes[h].childNodes[0])

			}

		}

		var l = [];

		for (var b = 0; b < this.base.length; b++) {

			if (this.cont.childNodes[h] != this.base[b]) {

				l.push(this.base[b])

			}

		}

		this.base = l;

		this.cont.removeChild(this.cont.childNodes[h]);

		this.b_index--;

		l = null

	}

};

dhtmlXForm.prototype.getColumnNode = function(c, b) {

	var e = null;

	var a = null;

	if (c instanceof Array) {

		a = c[1];

		c = c[0]

	}

	if (c != null) {

		var g = this._getParentForm(c, a);

		if (g != null) {

			if (g.item._list != null && g.item._list[0] != null && e == null) {

				e = g.item._list[0].getColumnNode(null, b)

			}

			g.form = g.item = null;

			g = null

		}

		return e

	}

	if (b < 0 || b > this.cont.childNodes.length - 1) {

		return null

	}

	return this.cont.childNodes[b]

};

dhtmlXForm.prototype._removeItemsInColumn = function(e) {

	var a = [];

	for (var c = 0; c < e.childNodes.length; c++) {

		var b = e.childNodes[c];

		if (b._idd != null && b._type != null) {

			a.push([ b._idd, (b._type == "ra" ? b._value : null) ])

		}

		b = null

	}

	for (var c = 0; c < a.length; c++) {

		this.removeItem(a[c][0], a[c][1])

	}

};

dhtmlXForm.prototype._getParentForm = function(h, g) {

	if (this.itemPull[this.idPrefix + h] != null) {

		return {

			form : this,

			item : this.itemPull[this.idPrefix + h]

		}

	}

	for ( var b in this.itemPull) {

		if (this.itemPull[b]._type == "ra" && this.itemPull[b]._group == h

				&& this.itemPull[b]._value == g) {

			return {

				form : this,

				item : this.itemPull[b]

			}

		}

	}

	var e = null;

	for ( var b in this.itemPull) {

		if (!e && this.itemPull[b]._list != null) {

			for (var c = 0; c < this.itemPull[b]._list.length; c++) {

				if (!e) {

					e = this.itemPull[b]._list[c]._getParentForm(h, g)

				}

			}

		}

	}

	return e

};

(function() {

	for ( var b in dhtmlXForm.prototype.items) {

		if (!dhtmlXForm.prototype.items[b]._getItemNode) {

			dhtmlXForm.prototype.items[b]._getItemNode = function(a) {

				return a

			}

		}

	}

})();

dhtmlXForm.prototype._getItemNode = function(b, a) {

	if (a != null) {

		b = [ b, a ]

	}

	return this.doWithItem(b, "_getItemNode")

};

dhtmlXForm.prototype.setRequired = function(l, h, g) {

	if (typeof (g) == "undefined") {

		g = h

	} else {

		l = [ l, h ]

	}

	var c = this._getItemNode(l);

	if (!c) {

		return

	}

	g = window.dhx4.s2b(g);

	c._required = (g == true);

	if (c._required) {

		if (!c._validate) {

			c._validate = []

		}

		var b = false;

		for (var e = 0; e < c._validate.length; e++) {

			b = (c._validate[e] == "NotEmpty" || b)

		}

		if (!b) {

			c._validate.push("NotEmpty")

		}

		var j = c.childNodes[c._ll ? 0 : 1].childNodes[0];

		if (!(j.lastChild && j.lastChild.className && j.lastChild.className

				.search(/required/) >= 0)) {

			var a = document.createElement("SPAN");

			a.className = "dhxform_item_required";

			a.innerHTML = "*";

			j.appendChild(a);

			a = j = null

		}

	} else {

		if (c._validate != null) {

			var b = c._validate;

			c._validate = [];

			for (var e = 0; e < b.length; e++) {

				if (b[e] != "NotEmpty") {

					c._validate.push(b[e])

				}

			}

			if (c._validate.length == 0) {

				c._validate = null

			}

		}

		var j = c.childNodes[c._ll ? 0 : 1].childNodes[0];

		if (j.lastChild && j.lastChild.className

				&& j.lastChild.className.search(/required/) >= 0) {

			j.removeChild(j.lastChild);

			j = null

		}

	}

	this._resetValidateCss(c);

	c = null

};

dhtmlXForm.prototype.setNote = function(g, c, a) {

	if (typeof (a) == "undefined") {

		a = c

	} else {

		g = [ g, c ]

	}

	var b = this._getItemNode(g);

	if (!b) {

		return

	}

	var e = this._getNoteNode(b);

	if (!e) {

		if (!a.width) {

			a.width = b.childNodes[b._ll ? 1 : 0].childNodes[0].offsetWidth

		}

		e = document.createElement("DIV");

		e.className = "dhxform_note";

		if ({

			ch : 1,

			ra : 1

		}[b._type]) {

			b.childNodes[b._ll ? 1 : 0].insertBefore(e, b.childNodes[b._ll ? 1

					: 0].lastChild)

		} else {

			b.childNodes[b._ll ? 1 : 0].appendChild(e)

		}

	}

	e.innerHTML = a.text;

	if (a.width != null) {

		e.style.width = a.width + "px";

		e._w = a.width

	}

	e = null

};

dhtmlXForm.prototype.clearNote = function(e, b) {

	if (typeof (b) != "undefined") {

		e = [ e, b ]

	}

	var a = this._getItemNode(e);

	if (!a) {

		return

	}

	var c = this._getNoteNode(a);

	if (c != null) {

		c.parentNode.removeChild(c);

		c = null

	}

};

dhtmlXForm.prototype._getNoteNode = function(a) {

	var c = null;

	for (var b = 0; b < a.childNodes[a._ll ? 1 : 0].childNodes.length; b++) {

		if (String(a.childNodes[a._ll ? 1 : 0].childNodes[b].className).search(

				/dhxform_note/) >= 0) {

			c = a.childNodes[a._ll ? 1 : 0].childNodes[b]

		}

	}

	a = null;

	return c

};

dhtmlXForm.prototype.setValidation = function(h, e, g) {

	if (typeof (note) == "undefined") {

		g = e

	} else {

		h = [ h, e ]

	}

	var b = this._getItemNode(h);

	if (!b) {

		return

	}

	if (b._validate != null) {

		for (var c = 0; c < b._validate.length; c++) {

			b._validate[c] = null

		}

	}

	b._validate = [];

	if (typeof (g) == "function" || typeof (window[g]) == "function") {

		b._validate = [ g ]

	} else {

		b._validate = String(g).split(this.separator)

	}

	if (b._required) {

		var a = false;

		for (var c = 0; c < b._validate.length; c++) {

			a = (b._validate[c] == "NotEmpty" || a)

		}

		if (!a) {

			b._validate.push("NotEmpty")

		}

	}

	b = null

};

dhtmlXForm.prototype.clearValidation = function(e, c) {

	if (typeof (c) != "undefined") {

		e = [ e, c ]

	}

	var a = this._getItemNode(e);

	if (!a) {

		return

	}

	if (a._validate != null) {

		for (var b = 0; b < a._validate.length; b++) {

			a._validate[b] = null

		}

	}

	a._validate = a._required ? [ "NotEmpty" ] : null;

	a = null

};

dhtmlXForm.prototype.reloadOptions = function(a, h) {

	var b = this.getItemType(a);

	if (!{

		select : 1,

		multiselect : 1,

		combo : 1

	}[b]) {

		return

	}

	if (b == "select" || b == "multiselect") {

		var e = this.getOptions(a);

		while (e.length > 0) {

			e.remove(0)

		}

		e.length = 0;

		e = null;

		if (typeof (h) == "string") {

			this.doWithItem(a, "doLoadOptsConnector", h)

		} else {

			if (h instanceof Array) {

				this.doWithItem(a, "doLoadOpts", {

					options : h

				})

			}

		}

	}

	if (b == "combo") {

		var j = this.getCombo(a);

		j.clearAll();

		j.setComboValue("");

		if (typeof (h) == "string") {

			this.doWithItem(a, "doLoadOptsConnector", h)

		} else {

			if (h instanceof Array) {

				var c = null;

				for (var g = 0; g < h.length; g++) {

					if (window.dhx4.s2b(h[g].selected)) {

						c = h[g].value

					}

				}

				j.addOption(h);

				if (c != null) {

					this.setItemValue(a, c)

				}

				j = null

			}

		}

	}

};

dhtmlXForm.prototype.setTooltip = function(h, g, e) {

	if (typeof (e) == "undefined") {

		e = g

	} else {

		h = [ h, g ]

	}

	var b = this._getItemNode(h);

	if (!b) {

		return

	}

	var a = null;

	if (b.childNodes.length == 1) {

		a = b.childNodes[0]

	} else {

		for (var c = 0; c < b.childNodes.length; c++) {

			if (b.childNodes[c].className != null

					&& b.childNodes[c].className.search("dhxform_label") >= 0) {

				a = b.childNodes[c]

			}

		}

	}

	if (a != null) {

		if (e == null || e.length == 0) {

			a.removeAttribute("title")

		} else {

			a.title = e

		}

	}

	a = null

};

function dhtmlXLayoutObject(c, m, t) {

	var r = null;

	if (c != null && typeof (c) == "object"

			&& typeof (c.tagName) == "undefined" && c._isCell != true) {

		r = {};

		if (c.autosize != null) {

			r.autosize = c.autosize

		}

		if (c.cells != null) {

			r.cells = c.cells

		}

		if (c.pattern != null) {

			m = c.pattern

		}

		if (c.skin != null) {

			t = c.skin

		}

		if (c.offsets != null) {

			r.offsets = c.offsets

		}

		c = c.parent

	}

	this.cdata = {};

	this.conf = {

		skin : (t || window.dhx4.skin

				|| (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null)

				|| window.dhx4.skinDetect("dhxlayout") || "material"),

		css : "dhxlayout",

		hh : 20,

		autosize : "b",

		nextCell : {

			a : "b",

			b : "a"

		},

		inited : false,

		b_size : {

			w : -1,

			h : -1

		}

	};

	if (this.conf.skin == "material") {

		this.conf.hh = window.dhx4

				.readFromCss("dhxlayout_base_material dhxlayout_collapsed_height")

	}

	if (typeof (c) == "object" && c._isCell == true) {

		var l = (typeof (r) != "undefined" && r != null ? r : {});

		if (l.pattern == null && m != null) {

			l.pattern = m

		}

		if (l.skin == null && t != null) {

			l.skin = t

		}

		var h = c.attachLayout(l);

		return h

	}

	window.dhtmlXCellTop.apply(this, [ c, (r == null ? null : r.offsets) ]);

	this.conf.sw = this._detectSW();

	var j = this;

	this._getLayout = function() {

		return this

	};

	this.mainInst = (c._layoutMainInst != null ? c._layoutMainInst : null);

	this._getMainInst = function() {

		if (this.mainInst != null) {

			return this.mainInst._getMainInst()

		}

		return this

	};

	this._init = function(w) {

		var v = (typeof (w) == "string" ? this.tplData[w] : w);

		this.conf.mode = v.mode;

		if (this.conf.mode == "c") {

			this.cdata.a = new dhtmlXLayoutCell("a", this)

		} else {

			this.cdata.a = new dhtmlXLayoutCell("a", this);

			this.cdata.b = new dhtmlXLayoutCell("b", this)

		}

		for ( var u in this.cdata) {

			this.cont.appendChild(this.cdata[u].cell);

			this.cdata[u].conf.init = {

				w : 0.5,

				h : 0.5

			}

		}

		if (this.conf.mode != "c") {

			var q = this._getMainInst();

			if (q.conf.sep_idx == null) {

				q.conf.sep_idx = 1

			} else {

				q.conf.sep_idx++

			}

			this.sep = new dhtmlXLayoutSepObject(this.conf.mode, q.conf.sep_idx);

			this.cont.appendChild(this.sep.sep);

			this.sep._getLayout = function() {

				return j._getLayout()

			};

			q = null

		}

		if (v.cells != null) {

			for ( var u in v.cells) {

				if (v.cells[u].width != null) {

					this.cdata[u].conf.init.w = v.cells[u].width

				}

				if (v.cells[u].height != null) {

					this.cdata[u].conf.init.h = v.cells[u].height

				}

				if (v.cells[u].name != null) {

					this.cdata[u].conf.name = v.cells[u].name;

					this.cdata[u].setText(v.cells[u].name)

				}

				if (v.cells[u].fsize != null) {

					this.cdata[u].conf.fsize = v.cells[u].fsize

				}

			}

		}

		this.setSizes();

		for ( var u in this.cdata) {

			this.cdata[u].conf.init = {}

		}

		if (v.cells != null) {

			for ( var u in v.cells) {

				if (v.cells[u].layout != null) {

					this.cdata[u].dataNested = true;

					this.cdata[u]._layoutMainInst = this;

					this.cdata[u].cell.className += " dhx_cell_nested_layout";

					this.cdata[u].attachLayout({

						pattern : v.cells[u].layout

					});

					this.cdata[u]._layoutMainInst = null

				}

			}

		}

	};

	this.setSizes = function(A, J, E, u) {

		var C = (this.conf.inited == true && this._getMainInst() == this

				&& this.checkEvent("onResizeFinish") == true ? {} : false);

		this._adjustCont();

		var I = this.cont.offsetWidth;

		var y = this.cont.offsetHeight;

		if (this.conf.mode == "c") {

			var a = 0;

			var K = 0;

			var q = I;

			var H = y;

			this.cdata.a._setSize(a, K, q, H, A, E, u);

			this.callEvent("_onSetSizes", []);

			if (C && (!(this.conf.b_size.w == I && this.conf.b_size.h == y))) {

				this._callMainEvent("onResizeFinish", [])

			}

			this.conf.b_size = {

				w : I,

				h : y

			};

			return

		}

		if (typeof (J) == "undefined") {

			var v = (this.conf.mode == "v" ? "w" : "h");

			J = this.conf.autosize;

			if (this.cdata.a.conf.collapsed) {

				J = "b"

			} else {

				if (this.cdata.b.conf.collapsed) {

					J = "a"

				} else {

					if (A == "a" || A == "b") {

						J = this.conf.nextCell[A]

					}

				}

			}

		} else {

		}

		if (this.conf.mode == "v") {

			if (J == "a") {

				if (this.cdata.b.conf.init.w != null) {

					var F = Math.round(I * this.cdata.b.conf.init.w

							- this.conf.sw / 2)

				} else {

					var F = this.cdata.b.conf.size.w

				}

				var D = I - F;

				var z = 0;

				var x = y;

				var a = 0;

				var K = z;

				var q = D - a - this.conf.sw;

				var H = x

			} else {

				var a = 0;

				var K = 0;

				if (this.cdata.a.conf.init.w != null) {

					var q = Math.round(I * this.cdata.a.conf.init.w

							- this.conf.sw / 2)

							- a

				} else {

					var q = this.cdata.a.conf.size.w

				}

				var H = y - K;

				var D = a + q + this.conf.sw;

				var z = K;

				var F = I - D;

				var x = H

			}

			this.cdata.a._setSize(a, K, q, H, A, E, u);

			this.cdata.b._setSize(D, z, F, x, A, E, u);

			this.sep._setSize(a + q, K, this.conf.sw, H)

		} else {

			if (J == "a") {

				if (this.cdata.b.conf.init.h != null) {

					var x = Math.round(y * this.cdata.b.conf.init.h

							- this.conf.sw / 2)

				} else {

					var x = this.cdata.b.conf.size.h

				}

				var D = 0;

				var z = y - x;

				var F = I - D;

				var a = D;

				var K = 0;

				var q = F;

				var H = z - K - this.conf.sw

			} else {

				var a = 0;

				var K = 0;

				var q = I - a;

				if (this.cdata.a.conf.init.h != null) {

					var H = Math.round(y * this.cdata.a.conf.init.h

							- this.conf.sw / 2)

				} else {

					var H = this.cdata.a.conf.size.h

				}

				var D = a;

				var z = K + H + this.conf.sw;

				var F = q;

				var x = y - z

			}

			this.cdata.a._setSize(a, K, q, H, A, E, u);

			this.cdata.b._setSize(D, z, F, x, A, E, u);

			this.sep._setSize(a, K + H, q, this.conf.sw)

		}

		this.callEvent("_onSetSizes", []);

		if (C && (!(this.conf.b_size.w == I && this.conf.b_size.h == y))) {

			this._callMainEvent("onResizeFinish", [])

		}

		this.conf.b_size = {

			w : I,

			h : y

		}

	};

	this._getAvailWidth = function() {

		var x = [];

		for (var A = 0; A < this.conf.as_cells.h.length; A++) {

			var u = this.cells(this.conf.as_cells.h[A]);

			var y = u.layout;

			var v = y.conf.autosize;

			if (u.conf.collapsed) {

				u = y.cdata[y.conf.nextCell[u._idd]];

				v = y.conf.nextCell[v]

			}

			x.push(Math.max(0, u.getWidth() - u._getMinWidth(v)));

			y = u = null

		}

		var z = (x.length > 0 ? Math.min.apply(window, x) : 0);

		return this.cont.offsetWidth - z

	};

	this._getAvailHeight = function() {

		var x = [];

		for (var z = 0; z < this.conf.as_cells.v.length; z++) {

			var u = this.cells(this.conf.as_cells.v[z]);

			var w = u.layout;

			var v = w.conf.autosize;

			if (u.conf.collapsed) {

				u = w.cdata[w.conf.nextCell[u._idd]];

				v = w.conf.nextCell[v]

			}

			x.push(Math.max(0, u.getHeight() - u._getHdrHeight()

					- u._getMinHeight(v)));

			w = u = null

		}

		var y = Math.min.apply(window, x);

		return this.cont.offsetHeight - y

	};

	this.setSkin = function(a) {

		this._setBaseSkin(a);

		this.conf.skin = a

	};

	this.unload = function() {

		this.conf.unloading = true;

		this.mainInst = null;

		this.parentLayout = null;

		if (this.items != null) {

			for (var v = 0; v < this.items.length; v++) {

				this.items[v] = null

			}

			this.items = null

		}

		if (this.dhxWins != null) {

			this.dhxWins.unload();

			this.dhxWins = null

		}

		if (this.sep != null) {

			this.sep._unload();

			this.sep = null

		}

		for ( var u in this.cdata) {

			this.cdata[u]._unload();

			this.cdata[u] = null

		}

		this._unloadTop();

		window.dhx4._eventable(this, "clear");

		for ( var u in this) {

			this[u] = null

		}

		j = null

	};

	this._getWindowMinDimension = function(v) {

		var a = j._getAvailWidth() + 7 + 7;

		var u = j._getAvailHeight() + 7 + 31;

		var q = {

			w : Math.max(a, 200),

			h : Math.max(u, 140)

		};

		v = null;

		return q

	};

	window.dhx4._eventable(this);

	this._callMainEvent = function(q, a) {

		return this.callEvent(q, a)

	};

	this._init(m || "3E");

	var n = this._availAutoSize[m];

	if (n != null) {

		this.conf.pattern = m;

		this.setAutoSize(n.h[n.h.length - 1], n.v[n.v.length - 1])

	}

	if (typeof (window.dhtmlXWindows) == "function" && this.mainInst == null) {

		var e = {

			vp_overflow : (this.conf.fs_mode == true ? false : "auto")

		};

		this.dhxWins = new dhtmlXWindows(e);

		this.dhxWins.setSkin(this.conf.skin)

	}

	this.conf.inited = true;

	if (this == this._getMainInst()) {

		var o = 0;

		this.items = [];

		this.forEachItem(function(a) {

			j.items.push(a);

			a.conf.index = o++

		})

	}

	if (this == this._getMainInst() && r != null) {

		if (r.autosize != null) {

			this.setAutoSize.apply(this, r.autosize)

		}

		if (r.cells != null) {

			for (var b = 0; b < r.cells.length; b++) {

				var g = r.cells[b];

				var s = this.cells(g.id);

				if (g.width) {

					s.setWidth(g.width)

				}

				if (g.height) {

					s.setHeight(g.height)

				}

				if (g.text) {

					s.setText(g.text)

				}

				if (g.collapsed_text) {

					s.setCollapsedText(g.collapsed_text)

				}

				if (g.collapse) {

					s.collapse()

				}

				if (g.fix_size) {

					s.fixSize(g.fix_size[0], g.fix_size[1])

				}

				if (typeof (g.header) != "undefined"

						&& window.dhx4.s2b(g.header) == false) {

					s.hideHeader()

				}

			}

		}

	}

	r = null;

	return this

}

dhtmlXLayoutObject.prototype = new dhtmlXCellTop();

dhtmlXLayoutObject.prototype.cells = function(e) {

	for ( var b in this.cdata) {

		if (this.cdata[b].conf.name == e) {

			return this.cdata[b]

		}

		if (this.cdata[b].dataType == "layout"

				&& this.cdata[b].dataNested == true

				&& this.cdata[b].dataObj != null) {

			var c = this.cdata[b].dataObj.cells(e);

			if (c != null) {

				return c

			}

		}

	}

	return null

};

dhtmlXLayoutObject.prototype.forEachItem = function(e, c) {

	if (typeof (e) != "function") {

		return

	}

	if (typeof (c) == "undefined") {

		c = this

	}

	for ( var b in this.cdata) {

		if (typeof (this.cdata[b].conf.name) != "undefined") {

			e.apply(c, [ this.cdata[b] ])

		}

		if (this.cdata[b].dataType == "layout"

				&& this.cdata[b].dataNested == true

				&& this.cdata[b].dataObj != null) {

			this.cdata[b].dataObj.forEachItem(e, c)

		}

	}

	c = null

};

dhtmlXLayoutObject.prototype._forEachSep = function(e, c) {

	if (typeof (e) != "function") {

		return

	}

	if (typeof (c) == "undefined") {

		c = this

	}

	if (this.sep != null) {

		e.apply(c, [ this.sep ])

	}

	for ( var b in this.cdata) {

		if (this.cdata[b].dataType == "layout"

				&& this.cdata[b].dataNested == true

				&& this.cdata[b].dataObj != null) {

			this.cdata[b].dataObj._forEachSep(e, c)

		}

	}

	c = null

};

dhtmlXLayoutObject.prototype._detectSW = function() {

	if (this._confGlob.sw == null) {

		this._confGlob.sw = {}

	}

	if (this._confGlob.sw[this.conf.skin] == null) {

		this._confGlob.sw[this.conf.skin] = window.dhx4

				.readFromCss("dhxlayout_sep_sw_" + this.conf.skin)

	}

	return this._confGlob.sw[this.conf.skin]

};

dhtmlXLayoutObject.prototype._confGlob = {};

dhtmlXLayoutObject.prototype.listPatterns = function() {

	var c = [];

	for ( var b in this.tplData) {

		c.push(b)

	}

	return c

};

dhtmlXLayoutObject.prototype.listAutoSizes = function() {

	var e = (this.conf.as_cells != null ? (this.conf.as_cells.h).join(";") : "");

	var c = (this.conf.as_cells != null ? (this.conf.as_cells.v).join(";") : "");

	var b = this._availAutoSize[this.conf.pattern].h;

	var a = this._availAutoSize[this.conf.pattern].v;

	return [ e, c, b, a ]

};

dhtmlXLayoutObject.prototype._getCellsNames = function(e) {

	var g = {};

	if (this.cdata[e].conf.name != null) {

		g[this.cdata[e].conf.name] = true

	}

	if (this.cdata[e].dataType == "layout" && this.cdata[e].dataObj != null

			&& this.cdata[e].dataObj.mainInst == this) {

		var b = this.cdata[e].dataObj._getCellsNames("a");

		var h = this.cdata[e].dataObj._getCellsNames("b");

		for ( var c in b) {

			g[c] = b[c]

		}

		for ( var c in h) {

			g[c] = h[c]

		}

	}

	return g

};

dhtmlXLayoutObject.prototype.setAutoSize = function(b, l, n) {

	if (n !== true) {

		var r = this.listAutoSizes();

		if (r[0] == b && r[1] == l) {

			return

		}

		var j = false;

		var h = false;

		for (var c = 0; c < r[2].length; c++) {

			j = j || r[2][c] == b

		}

		for (var c = 0; c < r[3].length; c++) {

			h = h || r[3][c] == l

		}

		if (!j || !h) {

			return

		}

	}

	this.conf.as_cells = {

		h : b.split(";"),

		v : l.split(";")

	};

	var e = (this.conf.mode == "v" ? "h" : "v");

	for ( var o in this.cdata) {

		var g = this._getCellsNames(o);

		var u = false;

		for (var c = 0; c < this.conf.as_cells[e].length; c++) {

			u = u || g[this.conf.as_cells[e][c]]

		}

		if (u) {

			this.conf.autosize = o

		}

		if (this.cdata[o].dataType == "layout" && this.cdata[o].dataObj != null) {

			this.cdata[o].dataObj.setAutoSize(b, l, true)

		}

	}

};

dhtmlXLayoutObject.prototype.tplData = {

	"1C" : {

		mode : "c",

		cells : {

			a : {

				name : "a"

			}

		}

	},

	"2E" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				fsize : {

					v : 1

				}

			},

			b : {

				name : "b",

				fsize : {

					v : 1

				}

			}

		}

	},

	"2U" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				name : "b",

				fsize : {

					h : 1

				}

			}

		}

	},

	"3E" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 3,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							fsize : {

								v : [ 1, 2 ]

							}

						},

						b : {

							name : "c",

							fsize : {

								v : 2

							}

						}

					}

				}

			}

		}

	},

	"3W" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 3,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							name : "c",

							fsize : {

								h : 2

							}

						}

					}

				}

			}

		}

	},

	"3J" : {

		mode : "v",

		cells : {

			a : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							name : "c",

							fsize : {

								h : 1,

								v : 2

							}

						}

					}

				}

			},

			b : {

				name : "b",

				fsize : {

					h : 1

				}

			}

		}

	},

	"3L" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							name : "c",

							fsize : {

								h : 1,

								v : 2

							}

						}

					}

				}

			}

		}

	},

	"3T" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							name : "c",

							fsize : {

								h : 2,

								v : 1

							}

						}

					}

				}

			}

		}

	},

	"3U" : {

		mode : "h",

		cells : {

			a : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							name : "b",

							fsize : {

								h : 2,

								v : 1

							}

						}

					}

				}

			},

			b : {

				name : "c",

				fsize : {

					v : 1

				}

			}

		}

	},

	"4H" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 3,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : [ 1, 2 ],

											v : 3

										}

									},

									b : {

										name : "c",

										fsize : {

											h : [ 1, 2 ],

											v : 3

										}

									}

								}

							}

						},

						b : {

							name : "d",

							fsize : {

								h : 2

							}

						}

					}

				}

			}

		}

	},

	"4I" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 3,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : 3,

											v : [ 1, 2 ]

										}

									},

									b : {

										name : "c",

										fsize : {

											h : 3,

											v : [ 1, 2 ]

										}

									}

								}

							}

						},

						b : {

							name : "d",

							fsize : {

								v : 2

							}

						}

					}

				}

			}

		}

	},

	"4T" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							width : 1 / 3,

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "c",

										fsize : {

											h : [ 2, 3 ],

											v : 1

										}

									},

									b : {

										name : "d",

										fsize : {

											h : 3,

											v : 1

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"4U" : {

		mode : "h",

		cells : {

			a : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "a",

							width : 1 / 3,

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : [ 2, 3 ],

											v : 1

										}

									},

									b : {

										name : "c",

										fsize : {

											h : 3,

											v : 1

										}

									}

								}

							}

						}

					}

				}

			},

			b : {

				name : "d",

				fsize : {

					v : 1

				}

			}

		}

	},

	"4E" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 4,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							height : 1 / 3,

							fsize : {

								v : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										fsize : {

											v : [ 2, 3 ]

										}

									},

									b : {

										name : "d",

										fsize : {

											v : 3

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"4W" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 4,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							width : 1 / 3,

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "c",

										fsize : {

											h : [ 2, 3 ]

										}

									},

									b : {

										name : "d",

										fsize : {

											h : 3

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"4A" : {

		mode : "v",

		cells : {

			a : {

				width : 1 / 3,

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							name : "b",

							fsize : {

								h : 1,

								v : 2

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "c",

							fsize : {

								h : [ 1, 3 ]

							}

						},

						b : {

							name : "d",

							fsize : {

								h : 3

							}

						}

					}

				}

			}

		}

	},

	"4L" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 3,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										fsize : {

											h : 2,

											v : 3

										}

									},

									b : {

										name : "d",

										fsize : {

											h : 2,

											v : 3

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"4J" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 3,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							fsize : {

								v : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "c",

										fsize : {

											h : 3,

											v : 2

										}

									},

									b : {

										name : "d",

										fsize : {

											h : 3,

											v : 2

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"4F" : {

		mode : "h",

		cells : {

			a : {

				height : 1 / 3,

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							name : "b",

							fsize : {

								h : 2,

								v : 1

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "c",

							fsize : {

								v : [ 1, 3 ]

							}

						},

						b : {

							name : "d",

							fsize : {

								v : 3

							}

						}

					}

				}

			}

		}

	},

	"4G" : {

		mode : "v",

		cells : {

			a : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										name : "c",

										fsize : {

											h : 1,

											v : 3

										}

									}

								}

							}

						}

					}

				}

			},

			b : {

				name : "d",

				fsize : {

					h : 1

				}

			}

		}

	},

	"4C" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										name : "d",

										fsize : {

											h : 1,

											v : 3

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"5H" : {

		mode : "v",

		cells : {

			a : {

				width : 1 / 3,

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										height : 1 / 3,

										fsize : {

											h : [ 1, 2 ],

											v : 3

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "c",

													fsize : {

														h : [ 1, 2 ],

														v : [ 3, 4 ]

													}

												},

												b : {

													name : "d",

													fsize : {

														h : [ 1, 2 ],

														v : 4

													}

												}

											}

										}

									}

								}

							}

						},

						b : {

							name : "e",

							fsize : {

								h : 2

							}

						}

					}

				}

			}

		}

	},

	"5I" : {

		mode : "h",

		cells : {

			a : {

				height : 1 / 3,

				name : "a",

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										width : 1 / 3,

										fsize : {

											h : 3,

											v : [ 1, 2 ]

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "c",

													fsize : {

														h : [ 3, 4 ],

														v : [ 1, 2 ]

													}

												},

												b : {

													name : "d",

													fsize : {

														h : 4,

														v : [ 1, 2 ]

													}

												}

											}

										}

									}

								}

							}

						},

						b : {

							name : "e",

							fsize : {

								v : 2

							}

						}

					}

				}

			}

		}

	},

	"5U" : {

		mode : "h",

		cells : {

			a : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "a",

							width : 1 / 4,

							fsize : {

								h : 2,

								v : 1

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										width : 1 / 3,

										fsize : {

											h : [ 2, 3 ],

											v : 1

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "c",

													fsize : {

														h : [ 3, 4 ],

														v : 1

													}

												},

												b : {

													name : "d",

													fsize : {

														h : 4,

														v : 1

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

			},

			b : {

				name : "e",

				fsize : {

					v : 1

				}

			}

		}

	},

	"5E" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 5,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							height : 1 / 4,

							fsize : {

								v : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										height : 1 / 3,

										fsize : {

											v : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "d",

													fsize : {

														v : [ 3, 4 ]

													}

												},

												b : {

													name : "e",

													fsize : {

														v : 4

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

	},

	"5W" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 5,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							width : 1 / 4,

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "c",

										width : 1 / 3,

										fsize : {

											h : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "d",

													fsize : {

														h : [ 3, 4 ]

													}

												},

												b : {

													name : "e",

													fsize : {

														h : 4

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

	},

	"5K" : {

		mode : "v",

		cells : {

			a : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										name : "c",

										fsize : {

											h : 1,

											v : 3

										}

									}

								}

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "d",

							fsize : {

								h : 1,

								v : 4

							}

						},

						b : {

							name : "e",

							fsize : {

								h : 1,

								v : 4

							}

						}

					}

				}

			}

		}

	},

	"5S" : {

		mode : "v",

		cells : {

			a : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							name : "b",

							fsize : {

								h : 1,

								v : 2

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "c",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 3

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "d",

										fsize : {

											h : 1,

											v : [ 3, 2 ]

										}

									},

									b : {

										name : "e",

										fsize : {

											h : 1,

											v : 4

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"5G" : {

		mode : "v",

		cells : {

			a : {

				width : 1 / 3,

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										name : "c",

										fsize : {

											h : 1,

											v : 3

										}

									}

								}

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "d",

							fsize : {

								h : [ 1, 4 ]

							}

						},

						b : {

							name : "e",

							fsize : {

								h : 4

							}

						}

					}

				}

			}

		}

	},

	"5C" : {

		mode : "v",

		cells : {

			a : {

				width : 2 / 3,

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "a",

							fsize : {

								h : 2

							}

						},

						b : {

							name : "b",

							fsize : {

								h : [ 2, 1 ]

							}

						}

					}

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "c",

							height : 1 / 3,

							fsize : {

								h : 1,

								v : 3

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "d",

										fsize : {

											h : 1,

											v : [ 3, 4 ]

										}

									},

									b : {

										name : "e",

										fsize : {

											h : 1,

											v : 4

										}

									}

								}

							}

						}

					}

				}

			}

		}

	},

	"6H" : {

		mode : "v",

		cells : {

			a : {

				width : 1 / 3,

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										height : 1 / 4,

										fsize : {

											h : [ 1, 2 ],

											v : 3

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "c",

													height : 1 / 3,

													fsize : {

														h : [ 1, 2 ],

														v : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "h",

														cells : {

															a : {

																name : "d",

																fsize : {

																	h : [ 1, 2 ],

																	v : [ 4, 5 ]

																}

															},

															b : {

																name : "e",

																fsize : {

																	h : [ 1, 2 ],

																	v : 5

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

						},

						b : {

							name : "f",

							fsize : {

								h : 2

							}

						}

					}

				}

			}

		}

	},

	"6I" : {

		mode : "h",

		cells : {

			a : {

				height : 1 / 3,

				name : "a",

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										width : 1 / 4,

										fsize : {

											h : 3,

											v : [ 1, 2 ]

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "c",

													width : 1 / 3,

													fsize : {

														h : [ 3, 4 ],

														v : [ 1, 2 ]

													}

												},

												b : {

													layout : {

														mode : "v",

														cells : {

															a : {

																name : "d",

																fsize : {

																	h : [ 4, 5 ],

																	v : [ 1, 2 ]

																}

															},

															b : {

																name : "e",

																fsize : {

																	h : 5,

																	v : [ 1, 2 ]

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

						},

						b : {

							name : "f",

							fsize : {

								v : 2

							}

						}

					}

				}

			}

		}

	},

	"6A" : {

		mode : "v",

		cells : {

			a : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							height : 1 / 5,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										height : 1 / 4,

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "c",

													height : 1 / 3,

													fsize : {

														h : 1,

														v : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "h",

														cells : {

															a : {

																name : "d",

																fsize : {

																	h : 1,

																	v : [ 4, 5 ]

																}

															},

															b : {

																name : "e",

																fsize : {

																	h : 1,

																	v : 5

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

			},

			b : {

				name : "f",

				fsize : {

					h : 1

				}

			}

		}

	},

	"6C" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "b",

							height : 1 / 5,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										height : 1 / 4,

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "d",

													height : 1 / 3,

													fsize : {

														h : 1,

														v : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "h",

														cells : {

															a : {

																name : "e",

																fsize : {

																	h : 1,

																	v : [ 4, 5 ]

																}

															},

															b : {

																name : "f",

																fsize : {

																	h : 1,

																	v : 5

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

		}

	},

	"6J" : {

		mode : "v",

		cells : {

			a : {

				width : 1 / 3,

				layout : {

					mode : "h",

					cells : {

						a : {

							name : "a",

							height : 1 / 4,

							fsize : {

								h : 1,

								v : 2

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										height : 1 / 3,

										fsize : {

											h : 1,

											v : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "c",

													fsize : {

														h : 1,

														v : [ 3, 4 ]

													}

												},

												b : {

													name : "d",

													fsize : {

														h : 1,

														v : 4

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

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "e",

							fsize : {

								h : [ 1, 5 ]

							}

						},

						b : {

							name : "f",

							fsize : {

								h : 5

							}

						}

					}

				}

			}

		}

	},

	"6E" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 3,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "c",

										height : 1 / 4,

										fsize : {

											h : 2,

											v : 3

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "d",

													height : 1 / 3,

													fsize : {

														h : 2,

														v : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "h",

														cells : {

															a : {

																name : "e",

																fsize : {

																	h : 2,

																	v : [ 4, 5 ]

																}

															},

															b : {

																name : "f",

																fsize : {

																	h : 2,

																	v : 5

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

		}

	},

	"6W" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 6,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							name : "b",

							width : 1 / 5,

							fsize : {

								h : [ 1, 2 ]

							}

						},

						b : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "c",

										width : 1 / 4,

										fsize : {

											h : [ 2, 3 ]

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "d",

													width : 1 / 3,

													fsize : {

														h : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "v",

														cells : {

															a : {

																name : "e",

																fsize : {

																	h : [ 4, 5 ]

																}

															},

															b : {

																name : "f",

																fsize : {

																	h : 5

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

		}

	},

	"7H" : {

		mode : "v",

		cells : {

			a : {

				name : "a",

				width : 1 / 3,

				fsize : {

					h : 1

				}

			},

			b : {

				layout : {

					mode : "v",

					cells : {

						a : {

							layout : {

								mode : "h",

								cells : {

									a : {

										name : "b",

										height : 1 / 5,

										fsize : {

											h : [ 1, 2 ],

											v : 3

										}

									},

									b : {

										layout : {

											mode : "h",

											cells : {

												a : {

													name : "c",

													height : 1 / 4,

													fsize : {

														h : [ 1, 2 ],

														v : [ 3, 4 ]

													}

												},

												b : {

													layout : {

														mode : "h",

														cells : {

															a : {

																name : "d",

																height : 1 / 3,

																fsize : {

																	h : [ 1, 2 ],

																	v : [ 4, 5 ]

																}

															},

															b : {

																layout : {

																	mode : "h",

																	cells : {

																		a : {

																			name : "e",

																			fsize : {

																				h : [

																						1,

																						2 ],

																				v : [

																						5,

																						6 ]

																			}

																		},

																		b : {

																			name : "f",

																			fsize : {

																				h : [

																						1,

																						2 ],

																				v : 6

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

						},

						b : {

							name : "g",

							fsize : {

								h : 2

							}

						}

					}

				}

			}

		}

	},

	"7I" : {

		mode : "h",

		cells : {

			a : {

				name : "a",

				height : 1 / 3,

				fsize : {

					v : 1

				}

			},

			b : {

				layout : {

					mode : "h",

					cells : {

						a : {

							layout : {

								mode : "v",

								cells : {

									a : {

										name : "b",

										width : 1 / 5,

										fsize : {

											h : 3,

											v : [ 1, 2 ]

										}

									},

									b : {

										layout : {

											mode : "v",

											cells : {

												a : {

													name : "c",

													width : 1 / 4,

													fsize : {

														h : [ 3, 4 ],

														v : [ 1, 2 ]

													}

												},

												b : {

													layout : {

														mode : "v",

														cells : {

															a : {

																name : "d",

																width : 1 / 3,

																fsize : {

																	h : [ 4, 5 ],

																	v : [ 1, 2 ]

																}

															},

															b : {

																layout : {

																	mode : "v",

																	cells : {

																		a : {

																			name : "e",

																			fsize : {

																				h : [

																						5,

																						6 ],

																				v : [

																						1,

																						2 ]

																			}

																		},

																		b : {

																			name : "f",

																			fsize : {

																				h : 6,

																				v : [

																						1,

																						2 ]

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

						},

						b : {

							name : "g",

							fsize : {

								v : 2

							}

						}

					}

				}

			}

		}

	}

};

dhtmlXLayoutObject.prototype._availAutoSize = {

	"1C" : {

		h : [ "a" ],

		v : [ "a" ]

	},

	"2E" : {

		h : [ "a;b" ],

		v : [ "a", "b" ]

	},

	"2U" : {

		h : [ "a", "b" ],

		v : [ "a;b" ]

	},

	"3E" : {

		h : [ "a;b;c" ],

		v : [ "a", "b", "c" ]

	},

	"3W" : {

		h : [ "a", "b", "c" ],

		v : [ "a;b;c" ]

	},

	"3J" : {

		h : [ "a;c", "b" ],

		v : [ "a;b", "b;c" ]

	},

	"3L" : {

		h : [ "a", "b;c" ],

		v : [ "a;b", "a;c" ]

	},

	"3T" : {

		h : [ "a;b", "a;c" ],

		v : [ "a", "b;c" ]

	},

	"3U" : {

		h : [ "a;c", "b;c" ],

		v : [ "a;b", "c" ]

	},

	"4H" : {

		h : [ "a", "b;c", "d" ],

		v : [ "a;b;d", "a;c;d" ]

	},

	"4I" : {

		h : [ "a;b;d", "a;c;d" ],

		v : [ "a", "b;c", "d" ]

	},

	"4T" : {

		h : [ "a;b", "a;c", "a;d" ],

		v : [ "a", "b;c;d" ]

	},

	"4U" : {

		h : [ "a;d", "b;d", "c;d" ],

		v : [ "a;b;c", "d" ]

	},

	"4E" : {

		h : [ "a;b;c;d" ],

		v : [ "a", "b", "c", "d" ]

	},

	"4W" : {

		h : [ "a", "b", "c", "d" ],

		v : [ "a;b;c;d" ]

	},

	"4A" : {

		h : [ "a;b", "c", "d" ],

		v : [ "a;c;d", "b;c;d" ]

	},

	"4L" : {

		h : [ "a", "b", "c;d" ],

		v : [ "a;b;c", "a;b;d" ]

	},

	"4J" : {

		h : [ "a;b;c", "a;b;d" ],

		v : [ "a", "b", "c;d" ]

	},

	"4F" : {

		h : [ "a;c;d", "b;c;d" ],

		v : [ "a;b", "c", "d" ]

	},

	"4G" : {

		h : [ "a;b;c", "d" ],

		v : [ "a;d", "b;d", "c;d" ]

	},

	"4C" : {

		h : [ "a", "b;c;d" ],

		v : [ "a;b", "a;c", "a;d" ]

	},

	"5H" : {

		h : [ "a", "b;c;d", "e" ],

		v : [ "a;b;e", "a;c;e", "a;d;e" ]

	},

	"5I" : {

		h : [ "a;b;e", "a;c;e", "a;d;e" ],

		v : [ "a", "b;c;d", "e" ]

	},

	"5U" : {

		h : [ "a;e", "b;e", "c;e", "d;e" ],

		v : [ "a;b;c;d", "e" ]

	},

	"5E" : {

		h : [ "a;b;c;d;e" ],

		v : [ "a", "b", "c", "d", "e" ]

	},

	"5W" : {

		h : [ "a", "b", "c", "d", "e" ],

		v : [ "a;b;c;d;e" ]

	},

	"5K" : {

		h : [ "a;b;c", "d;e" ],

		v : [ "a;d", "b;d", "c;d", "a;e", "b;e", "c;e" ]

	},

	"5S" : {

		h : [ "a;b", "c;d;e" ],

		v : [ "a;c", "a;d", "a;e", "b;c", "b;d", "b;e" ]

	},

	"5G" : {

		h : [ "a;b;c", "d", "e" ],

		v : [ "a;d;e", "b;d;e", "c;d;e" ]

	},

	"5C" : {

		h : [ "a", "b", "c;d;e" ],

		v : [ "a;b;c", "a;b;d", "a;b;e" ]

	},

	"6H" : {

		h : [ "a", "b;c;d;e", "f" ],

		v : [ "a;b;f", "a;c;f", "a;d;f", "a;e;f" ]

	},

	"6I" : {

		h : [ "a;b;f", "a;c;f", "a;d;f", "a;e;f" ],

		v : [ "a", "b;c;d;e", "f" ]

	},

	"6A" : {

		h : [ "a;b;c;d;e", "f" ],

		v : [ "a;f", "b;f", "c;f", "d;f", "e;f" ]

	},

	"6C" : {

		h : [ "a", "b;c;d;e;f" ],

		v : [ "a;b", "a;c", "a;d", "a;e", "a;f" ]

	},

	"6J" : {

		h : [ "a;b;c;d", "e", "f" ],

		v : [ "a;e;f", "b;e;f", "c;e;f", "d;e;f" ]

	},

	"6E" : {

		h : [ "a", "b", "c;d;e;f" ],

		v : [ "a;b;c", "a;b;d", "a;b;e", "a;b;f" ]

	},

	"6W" : {

		h : [ "a", "b", "c", "d", "e", "f" ],

		v : [ "a;b;c;d;e;f" ]

	},

	"7H" : {

		h : [ "a", "b;c;d;e;f", "g" ],

		v : [ "a;b;g", "a;c;g", "a;d;g", "a;e;g", "a;f;g" ]

	},

	"7I" : {

		h : [ "a;b;g", "a;c;g", "a;d;g", "a;e;g", "a;f;g" ],

		v : [ "a", "b;c;d;e;f", "g" ]

	}

};

function dhtmlXLayoutSepObject(c, a) {

	var b = this;

	this.conf = {

		mode : c,

		idx : a,

		blocked : false,

		locked : false,

		btn_left : ((window.dhx4.isIE6 || window.dhx4.isIE7 || window.dhx4.isIE8)

				&& typeof (window.addEventListener) == "undefined" ? 1 : 0)

	};

	if (window.dhx4.isIE && navigator.userAgent.indexOf("MSIE 7.0") >= 0

			&& navigator.userAgent.indexOf("Trident") >= 0) {

		this.conf.btn_left = 1

	}

	this.sep = document.createElement("DIV");

	this.sep.className = "dhxlayout_sep";

	if (window.dhx4.isIE == true) {

		this.sep.onselectstart = function() {

			return false

		}

	}

	this.sep.className = "dhxlayout_sep dhxlayout_sep_resize_" + this.conf.mode;

	this._setSize = function(e, l, g, j) {

		this.sep.style.left = e + "px";

		this.sep.style.top = l + "px";

		this.sep.style.width = Math.max(g, 0) + "px";

		this.sep.style.height = Math.max(j, 0) + "px"

	};

	this._lockSep = function(e) {

		this.conf.locked = (e == true);

		this._blockSep()

	};

	this._setWH = function(e) {

		var g = this._getLayout();

		g.conf.sw = (e == null ? g._detectSW() : Math

				.max(parseInt(e) || -1, -1));

		g._getMainInst().setSizes();

		g = null

	};

	this._blockSep = function() {

		var e = this._getLayout();

		var g = e.cdata.a.conf.collapsed || e.cdata.b.conf.collapsed

				|| this.conf.locked;

		e = null;

		if (this.conf.blocked == g) {

			return

		}

		this.sep.className = "dhxlayout_sep"

				+ (g ? "" : " dhxlayout_sep_resize_" + this.conf.mode);

		this.conf.blocked = g

	};

	this._beforeResize = function(h) {

		if (this.conf.blocked) {

			return

		}

		if (this.conf.resize != null && this.conf.resize.active == true) {

			return

		}

		if (h.type == window.dhx4.dnd.evs.start) {

			this.sep.className += " dhxlayout_sep_resize_actv";

			var l = (h.pageX || h.touches[0].pageX);

			var j = (h.pageY || h.touches[0].pageY)

		} else {

			if (h.button !== this.conf.btn_left) {

				return

			}

			var l = h.clientX;

			var j = h.clientY

		}

		if (window.dhx4.dnd.p_en == true) {

			window.dhx4.dnd._touchOff()

		}

		var g = this._getLayout();

		this.conf.resize = {

			sx : l,

			sy : j,

			tx : h.layerX,

			ty : h.layerY,

			sep_x : parseInt(this.sep.style.left),

			sep_y : parseInt(this.sep.style.top),

			min_wa : g.cdata.a._getAvailWidth("a"),

			min_wb : g.cdata.b._getAvailWidth("b"),

			min_ha : g.cdata.a._getAvailHeight("a"),

			min_hb : g.cdata.b._getAvailHeight("b")

		};

		this.conf.resize.nx = this.conf.resize.sep_x;

		this.conf.resize.ny = this.conf.resize.sep_y;

		if (typeof (window.addEventListener) == "function") {

			window.addEventListener("mousemove", this._doOnMouseMove, false);

			window.addEventListener("mouseup", this._doOnMouseUp, false);

			window.addEventListener(window.dhx4.dnd.evs.move,

					this._doOnMouseMove, false);

			window.addEventListener(window.dhx4.dnd.evs.end, this._doOnMouseUp,

					false)

		} else {

			document.body.attachEvent("onmousemove", this._doOnMouseMove);

			document.body.attachEvent("onmouseup", this._doOnMouseUp)

		}

		g = null

	};

	this._onResize = function(j) {

		if (!this.conf.resize.active) {

			this._initResizeArea();

			this.conf.resize.active = true

		}

		if (this.conf.mode == "v") {

			var g = (j.type == "mousemove" ? j.clientX

					: (j.pageX || j.touches[0].pageX));

			var h = this.conf.resize.sx - g;

			this.conf.resize.nx = this.conf.resize.sep_x - h;

			if (this.conf.resize.nx > this.conf.resize.sep_x

					+ this.conf.resize.min_wb) {

				this.conf.resize.nx = this.conf.resize.sep_x

						+ this.conf.resize.min_wb

			} else {

				if (this.conf.resize.nx < this.conf.resize.sep_x

						- this.conf.resize.min_wa) {

					this.conf.resize.nx = this.conf.resize.sep_x

							- this.conf.resize.min_wa

				}

			}

			this.r_sep.style.left = this.conf.resize.nx + "px"

		} else {

			var l = (j.type == "mousemove" ? j.clientY

					: (j.pageY || j.touches[0].pageY));

			var h = this.conf.resize.sy - l;

			this.conf.resize.ny = this.conf.resize.sep_y - h;

			if (this.conf.resize.ny > this.conf.resize.sep_y

					+ this.conf.resize.min_hb) {

				this.conf.resize.ny = this.conf.resize.sep_y

						+ this.conf.resize.min_hb

			} else {

				if (this.conf.resize.ny < this.conf.resize.sep_y

						- this.conf.resize.min_ha) {

					this.conf.resize.ny = this.conf.resize.sep_y

							- this.conf.resize.min_ha

				}

			}

			this.r_sep.style.top = this.conf.resize.ny + "px"

		}

	};

	this._afterResize = function(o) {

		if (typeof (window.addEventListener) == "function") {

			window.removeEventListener("mousemove", this._doOnMouseMove, false);

			window.removeEventListener("mouseup", this._doOnMouseUp, false);

			window.removeEventListener(window.dhx4.dnd.evs.move,

					this._doOnMouseMove, false);

			window.removeEventListener(window.dhx4.dnd.evs.end,

					this._doOnMouseUp, false)

		} else {

			document.body.detachEvent("onmousemove", this._doOnMouseMove);

			document.body.detachEvent("onmouseup", this._doOnMouseUp)

		}

		if (!this.conf.resize.active) {

			this.conf.resize = null;

			return

		}

		if (o.type == window.dhx4.dnd.evs.end) {

			this.sep.className = this.sep.className.replace(

					/\s{0,}dhxlayout_sep_resize_actv/gi, "")

		} else {

			if (o.button !== this.conf.btn_left) {

				return

			}

		}

		var l = this._getLayout();

		var h = l._getMainInst();

		var m = (h.checkEvent("onPanelResizeFinish") == true ? {} : false);

		if (m !== false) {

			h.forEachItem(function(e) {

				m[e.conf.name] = {

					w : e.conf.size.w,

					h : e.conf.size.h

				};

				e = null

			})

		}

		var j = this.conf.resize.nx - this.conf.resize.sep_x;

		var g = this.conf.resize.ny - this.conf.resize.sep_y;

		l.cdata.a._setSize(l.cdata.a.conf.size.x, l.cdata.a.conf.size.y,

				l.cdata.a.conf.size.w + j, l.cdata.a.conf.size.h + g, "a");

		l.cdata.b._setSize(l.cdata.b.conf.size.x + j,

				l.cdata.b.conf.size.y + g, l.cdata.b.conf.size.w - j,

				l.cdata.b.conf.size.h - g, "b");

		this._setSize(parseInt(this.r_sep.style.left),

				parseInt(this.r_sep.style.top),

				parseInt(this.r_sep.style.width),

				parseInt(this.r_sep.style.height));

		if (window.dhx4.isIE) {

			var q = this;

			window.setTimeout(function() {

				q._removeResizeArea();

				q = null

			}, 1)

		} else {

			this._removeResizeArea()

		}

		if (m !== false) {

			var n = [];

			h.forEachItem(function(e) {

				var r = m[e.conf.name];

				if (!(r.w == e.conf.size.w && r.h == e.conf.size.h)) {

					n.push(e.conf.name)

				}

				e = null

			});

			h._callMainEvent("onPanelResizeFinish", [ n ])

		}

		h = l = null;

		this.conf.resize.active = false;

		this.conf.resize = null;

		if (window.dhx4.dnd.p_en == true) {

			window.dhx4.dnd._touchOn()

		}

	};

	this._initResizeArea = function() {

		if (this.r_sep == null) {

			this.r_sep = document.createElement("DIV");

			this.r_sep.className = "dhxlayout_resize_sep";

			this.r_sep.style.left = this.sep.style.left;

			this.r_sep.style.top = this.sep.style.top;

			this.r_sep.style.width = this.sep.style.width;

			this.r_sep.style.height = this.sep.style.height;

			this.sep.parentNode.appendChild(this.r_sep);

			if (window.dhx4.isIE) {

				this.r_sep.onselectstart = function() {

					return false

				}

			}

		}

		if (this.r_area == null) {

			this.r_area = document.createElement("DIV");

			this.r_area.className = "dhxlayout_resize_area";

			this.sep.parentNode.appendChild(this.r_area);

			if (window.dhx4.isIE) {

				this.r_area.onselectstart = function() {

					return false

				}

			}

			if (this.conf.mode == "v") {

				var e = parseInt(this.r_sep.style.left)

						- this.conf.resize.min_wa;

				var l = parseInt(this.r_sep.style.top);

				var g = this.conf.resize.min_wa + this.conf.resize.min_wb

						+ parseInt(this.r_sep.style.width);

				var j = parseInt(this.r_sep.style.height)

			} else {

				var e = parseInt(this.r_sep.style.left);

				var l = parseInt(this.r_sep.style.top)

						- this.conf.resize.min_ha;

				var g = parseInt(this.r_sep.style.width);

				var j = this.conf.resize.min_ha + this.conf.resize.min_hb

						+ parseInt(this.r_sep.style.height)

			}

			this.r_area.style.left = e + "px";

			this.r_area.style.top = l + "px";

			if (!dhtmlXLayoutObject.prototype._confGlob.reszieCover) {

				dhtmlXLayoutObject.prototype._confGlob.reszieCover = {};

				this.r_area.style.width = g + "px";




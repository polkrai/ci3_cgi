/*
Product Name: dhtmlxWindows 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
 */

window.dhtmlxAjax = {
	get : function(a, c, b) {
		if (b) {
			return dhx4.ajax.getSync(a)
		} else {
			dhx4.ajax.get(a, c)
		}
	},
	post : function(a, b, d, c) {
		if (c) {
			return dhx4.ajax.postSync(a, b)
		} else {
			dhx4.ajax.post(a, b, d)
		}
	},
	getSync : function(a) {
		return dhx4.ajax.getSync(a)
	},
	postSync : function(a, b) {
		return dhx4.ajax.postSync(a, b)
	}
};
dhtmlXWindows.prototype.enableAutoViewport = function() {
};
dhtmlXWindows.prototype.setImagePath = function() {
};
dhtmlXWindows.prototype.setEffect = function() {
};
dhtmlXWindows.prototype.getEffect = function() {
};
dhtmlXWindowsCell.prototype.setToFullScreen = function() {
};
dhtmlXWindowsCell.prototype.setIcon = function() {
};
dhtmlXWindowsCell.prototype.getIcon = function() {
};
dhtmlXWindowsCell.prototype.restoreIcon = function() {
};
dhtmlXWindowsCell.prototype.clearIcon = function() {
};
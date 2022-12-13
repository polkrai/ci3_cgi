if ($.fn.pagination){
	$.fn.pagination.defaults.beforePageText = 'หน้า';
	$.fn.pagination.defaults.afterPageText = 'จาก {pages}';
	$.fn.pagination.defaults.displayMsg = 'กำลังแสดง {from} ถึง {to} จาก {total} รายการ';
}
if ($.fn.datagrid){
	$.fn.datagrid.defaults.loadMsg = 'กำลังประมวลผลโปรดรอสักครู่ ...';
}
if ($.fn.treegrid && $.fn.datagrid){
	$.fn.treegrid.defaults.loadMsg = $.fn.datagrid.defaults.loadMsg;
}
if ($.messager){
	$.messager.defaults.ok = 'ตกลง';
	$.messager.defaults.cancel = 'ยกเลิก';
}
$.map(['validatebox','textbox','passwordbox','filebox','searchbox',
		'combo','combobox','combogrid','combotree',
		'datebox','datetimebox','numberbox',
		'spinner','numberspinner','timespinner','datetimespinner'], function(plugin){
	if ($.fn[plugin]){
		$.fn[plugin].defaults.missingMessage = 'ต้องระบุข้อมูลในช่องนี้.';
	}
});
if ($.fn.validatebox){
	$.fn.validatebox.defaults.rules.email.message = 'กรุณาใส่ที่อยู่อีเมลที่ถูกต้อง.';
	$.fn.validatebox.defaults.rules.url.message = 'กรุณาใส่ URL ที่ถูกต้อง.';
	$.fn.validatebox.defaults.rules.length.message = 'กรุณาใส่ค่าระหว่าง  {0} ถึง {1}.';
	$.fn.validatebox.defaults.rules.remote.message = 'กรุณาแก้ไขฟิลด์นี้.';
}
if ($.fn.calendar){
	$.fn.calendar.defaults.weeks = ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"];
	$.fn.calendar.defaults.months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
}
if ($.fn.datebox){
	$.fn.datebox.defaults.currentText = 'วันนี้';
	$.fn.datebox.defaults.closeText = 'ยกเลิก';
	$.fn.datebox.defaults.okText = 'ตกลง';
}
if ($.fn.datetimebox && $.fn.datebox){
	$.extend($.fn.datetimebox.defaults,{
		currentText: $.fn.datebox.defaults.currentText,
		closeText: $.fn.datebox.defaults.closeText,
		okText: $.fn.datebox.defaults.okText
	});
}

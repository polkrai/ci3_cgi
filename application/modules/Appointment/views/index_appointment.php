<?php //echo date('Y-m-d');//print_r ($med_stations)?>
<script type="text/javascript">
	var fruits = ["#table-25", "#table-0"];
	var station_id = 0;
</script>
<style>

.well-td {
    min-height: 2px;
    padding: 5px;
    margin-bottom: 5px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    height: 350px;
}

.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
</style>

<?php $row = 3;?>
<?php //$i = 1;?>

<table style="width:100%" cellpadding="5" cellspacing="5" >

	<thead><tr>

	<th style="width: 25%; padding-bottom: 5px; padding-right: 5px;">
		<table id="table-25" class="easyui-datagrid" style="width:100%;height:350px" singleSelect="true" loadMsg="" url="<?php echo site_url("Appointment/load_data_queue_other/25?date_select=") . $this->input->get_post("date_select");?>" title="ยาเดิมส่งมาหลังพบแพทย์" rownumbers="true" method="get" > <!-- pagination="true" pageSize:10 -->
			<thead>
				<tr>
					<th field="time_th" align="center" width="50">เวลา</th>
					<th field="patient_name" width="140">ชื่อ สกุล</th>
					<th field="vn_id" align="center" width="35" formatter="formatIconAdd">นัด</th>
					<th field="appointment_id" align="center" width="35" formatter="formatIconPrint">พิมพ์</th>
				</tr>
			</thead>
		</table>
	</th>

	<th style="width: 25%; padding-bottom: 5px; padding-right: 5px;">
		<table id="table-0" class="easyui-datagrid" style="width:100%;height:350px" singleSelect="true" loadMsg="" url="<?php echo site_url("Appointment/load_data_queue_other/0?date_select=") . $this->input->get_post("date_select");?>" title="หน่วยงานอื่นส่งมาหลังพบแพทย์/ค้นหา" rownumbers="true" method="get" > <!-- pagination="true" pageSize:10 -->
			<thead>
				<tr>
					<th field="time_th" align="center" width="50">เวลา</th>
					<th field="patient_name" width="140">ชื่อ สกุล</th>
					<th field="vn_id" align="center" width="35" formatter="formatIconAdd">นัด</th>
					<th field="appointment_id" align="center" width="35" formatter="formatIconPrint">พิมพ์</th>
				</tr>
			</thead>
		</table>
	</th>

<?php foreach($med_stations as $med_station):?>

	<?php echo ($row == 1)?"<thead><tr>":NULL?>
		<?php $station_name = ($med_station->station_name)?$med_station->station_name:"ไม่ระบุแพทย์";?>
		<?php $fullname = ($med_station->fullname)?$med_station->fullname:"ไม่ระบุแพทย์";?>
		<th style="width: 25%; padding-bottom: 5px; padding-right: 5px;">
			<table id="table-<?php echo $med_station->station_id?>" class="easyui-datagrid" style="width:100%;height:350px" singleSelect="true" loadMsg="" url="<?php echo site_url("Appointment/load_data_queue/{$med_station->station_id}?date_select=") . $this->input->get_post("date_select");?>" title="<?php echo $med_station->station_name;?> <?php echo nbs(3);?> <?php echo $fullname;?>" rownumbers="true" method="get" > <!-- pagination="true" pageSize:10 -->
				<thead>
					<tr>
						<th field="time_th" align="center" width="50">เวลา</th>
						<th field="patient_name" width="140">ชื่อ สกุล</th>
						<th field="vn_id" align="center" width="35" formatter="formatIconAdd">นัด</th>
						<th field="appointment_id" align="center" width="35" formatter="formatIconPrint">พิมพ์</th>
					</tr>
				</thead>
			</table>
		    <script type="text/javascript">
		    	var data_array = '#table-<?php echo $med_station->station_id?>';
				fruits.push(data_array);
		    </script>

		</th>

	<?php
	$row++;
	if ($row > 4){
		echo "</tr></thead> \n";
		$row = 1;
	}

	//$i++;
endforeach;?>

</table>

<script type="text/javascript">

var reload = function() {

	$.each(fruits, function(index, value) {
		$(value).datagrid('reload');
	});

}

setInterval(reload, 60000);

function formatIconAdd(val, row){

	station_id = row.station_id

	return '<a href="javascript:void(0)" onclick="appointmentAdd(\''+val+'\',\''+row.queue_id+'\',\''+row.appointment_id+'\',\''+row.patient_name+'\');"><img src="<?php echo BASE_URL?>assets/img/edit_app.png" style="float:center" /></a>';

}

function formatIconPrint(val, row){

	//alert(isNaN(val))

	if (val == undefined) {

		return '<a href="javascript:void(0)" class="not-active"><img src="<?php echo BASE_URL?>assets/img/printer.png" style="float:center" /></a>';
	}
	else {

		return '<a href="javascript:void(0)" onclick="appointmentPrint(\''+val+'\')"><img src="<?php echo BASE_URL?>assets/img/printer.png" style="float:center" /></a>';
	}
}

function formatIconDel(val, row){

	return '<a href="javascript:void(0)"><img src="<?php echo BASE_URL?>assets/img/del_app.png" style="float:center" /></a>';

}

function formatContactUrl(val,row){

    var url = "contactView.php?id=";

    return '<a href="'+url + row.id+'">'+val+'</a>';
}

function appointmentAdd (vn_id, queue_id, appointment_id, patient_name) {
	//alert(queue_id);
	//var id = appointment_id;
	/*formData = [
				{type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120},
				{type: "block", inputWidth: "auto", offsetTop: 12, list: [
					{type: "input", label: "Login", value: "p_rossi"},
					{type: "password", label: "Password", value: "123"},
					{type: "checkbox", label: "Remember me", checked: true},
					{type: "button", value: "Proceed", offsetLeft: 70, offsetTop: 14}
				]}
			];
	*/
	appointment_id = (appointment_id == undefined || appointment_id == "null") ? -1 : appointment_id;

	dhxWins = new dhtmlXWindows();
	winAppointment = dhxWins.createWindow("winAppointment", 295, 100, "60%", 650);
	winAppointment.setText("บันทึกนัดหมาย");
	winAppointment.button("park").hide();
	winAppointment.button("minmax").hide();
	winAppointment.setModal(true);
	//winAppointment.attachURL('<?php //echo site_url("Appointment/form/")?>' + appointment_id, false, {vn_id:vn_id ,queue_id:queue_id, patient_name:patient_name, date_select:'<?php echo $this->input->get_post('date_select')?>'});
	winAppointment.attachURL('<?php echo site_url("Appointment/form/")?>' + appointment_id + '?vn_id=' + vn_id + '&queue_id=' + queue_id + '&patient_name='+ patient_name +'&date_select=<?php echo $this->input->get_post("date_select")?>');
	//myForm = winAppointment.attachForm(formData, true);
}

function appointmentAddOld (vn_id, queue_id, appointment_id, patient_name) {

	var id = appointment_id;

	if (appointment_id == undefined || appointment_id == "null") {

		id = '-1';
	}

	$('#window-add').window('open');

	$('#window-add').window('refresh', '<?php echo site_url("Appointment/form/")?>' + id + '?vn_id=' + vn_id + '&queue_id=' + queue_id + '&patient_name='+ patient_name +'&date_select=<?php echo $this->input->get_post("date_select")?>');

	//$('#window-add').window('open');
}

function searchHN() {

	var hn  = $('#search_hn').val();
	var date_select = '&date_select=' + $('#datepicker-navbar').val();
	var loadurl = '<?php echo site_url("Appointment/load_data_queue_other/0?hn=")?>' + hn + date_select;

	//alert(loadurl);

	$('#table-0').datagrid({
		url: loadurl
	});
}


function reload_graid () {

	//station_id
	var date_select = '?date_select=<?php echo $this->input->get_post("date_select")?>';
	var loadurl = '<?php echo site_url("Appointment/load_data_queue/")?>' + station_id + date_select;
	
	$('#table-' + station_id).datagrid({
		url: loadurl
	});
}

</script>

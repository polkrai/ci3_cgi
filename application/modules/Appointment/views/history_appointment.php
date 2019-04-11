<?php if (@$header) : ?>
	<div class="page-header">
	    <h2 style="font-size: 26px;"><?php echo $header; ?></h2>
	</div>
<?php endif;?>
<?php $total_all = 0;?>
<?php foreach ($doctors as $doctor) : ?>

	<?php $historys = $this->mdl_appointment->filter_select_doctor($doctor->user_id, $date_select)->get()->result();?>
	
	<table id="table_result" class="table table-striped" style="width: 100%;font-size: 16px;">

		<thead>
			<tr>
				<th colspan="5" style="font-size: 18px;"><?php echo ($doctor->doctorname)?$doctor->doctorname:"ไม่ได้ระบุแพทย์";?></th>
			</tr>
			<tr style="background-color: #eee;">
				<th style="text-align: center;" width="5%">ลำดับ</th>
				<th width="20%">แผนก</th>
				<th width="10%">เวลา</th>
				<th width="10%">HN</th>
	            <th width="20%">ชื่อ - สกุล</th>
	            <th width="30%">คำอธิบาย</th>
				<th style="text-align: center;" width="5%">พิมพ์</th>
			</tr>
		</thead>

		<tbody>
			<?php $i = 1; $total = 0; foreach ($historys as $history) : ?>
			<tr>
				<td align="center"><?php echo $i; ?></td>
				<td><?php echo ($history->com_name)?$history->com_name:"เวชระเบียน";?></td>
				<td><?php echo ($history->appointment_time != "00:00")?$history->appointment_time:"08:30"; ?></td>
	            <td><?php echo $history->hn; ?></td>
	            <td><?php echo $history->patient_name; ?></td>
	            <td><?php echo $history->comment; ?></td>
				<td style="text-align: center;">
					<a href="javascript:void(0)" onclick="appointmentPrint('<?php echo $history->appointment_id?>')"><img src="<?php echo BASE_URL?>assets/img/printer.png" style="float:center" /></a>
					<!-- <a href="javascript:void(0)" onclick="appointmentEdit('<?php echo $history->appointment_id?>', '<?php echo $history->patient_name?>')"><img src="<?php echo BASE_URL?>assets/img/edit_app.png" style="float:center" /></a>
					<a href="javascript:void(0)" onclick="appointmentDel('<?php echo $history->appointment_id?>', '<?php echo $history->appointment_date_en?>')" data-placement="left" data-toggle="confirmation"><img src="<?php //echo BASE_URL?>assets/img/del_app.png" style="float:center" /></a>
					<a href="<?php //echo site_url("Appointment/annul/{$history->appointment_id}?date_select={$history->appointment_date_en}");?>" data-placement="left" data-toggle="confirmation" ><img src="<?php //echo BASE_URL?>assets/img/del_app.png" style="float:center" /></a> -->
				</td>
			</tr>
			<?php $i++; $total++; endforeach; ?>
			<tr>
				<td colspan="6">รวม <?php echo $total;?> คน</td>
			</tr>
		</tbody>
	</table>
	<?php $total_all+= $total;?>
	
<?php endforeach;?>
<span style="font-weight: bold;">รวมทั้งหมด <?php echo $total_all;?> ราย</span>
<br />
<br />
<script>

/*
function appointmentEdit (appointment_id, patient_name) {

	//var id = appointment_id;	
	appointment_id = (appointment_id == undefined || appointment_id == "null") ? -1 : appointment_id;
	
	dhxWins = new dhtmlXWindows();
	//dhxWins.setSkin("terrace");
	winAppointment = dhxWins.createWindow("winAppointment", 325, 100, "50%", 550);
	winAppointment.setText("บันทีกนัดหมาย");
	winAppointment.button("park").hide();
	winAppointment.button("minmax").hide();
	winAppointment.setModal(true);
	//winAppointment.attachURL('<?php //echo site_url("Appointment/form/")?>' + appointment_id, false, {vn_id:vn_id ,queue_id:queue_id, patient_name:patient_name, date_select:'<?php echo $this->input->get_post('date_select')?>'});
	winAppointment.attachURL('<?php echo site_url("Appointment/form/")?>' + appointment_id + '?patient_name=' + patient_name+'&edit=true');
	
	//$("#btn_to_top").trigger("click");
}
*/

function appointmentEditOld (appointment_id, patient_name) {
	
	var id = appointment_id;
	
	if (appointment_id == undefined || appointment_id == "null") {
		
		id = '-1';
	}
	
	$('#window-add').window('open');
	
	$('#window-add').window('refresh', '<?php echo site_url("Appointment/form/")?>' + id + '?patient_name='+ patient_name+'&edit=true');
	
}

function appointmentDel(appointment_id, appointment_date) {	

	alert(appointment_id)

	$.ajax({
		type: 'POST',
		url: '<?php echo site_url('Appointment/annul/');?>' + appointment_id,
		data: {date_select : appointment_date, is_ajax : true},
		beforeSend: function(){			
			waitingDialog.show('กรุณารอสักครู่...');						     
	   	},
	   	success: function(data) {
		   	
		   	if (data == '1') {
				
				get_history(appointment_date);
			}
	        else {
				
				alert(data);
			}
	        
	        waitingDialog.hide();

	    }
 	});
}

</script>
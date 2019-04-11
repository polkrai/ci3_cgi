<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">   
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>นัดหมายผู้ป่วย - ข้อมูลแพทย์ออกตรวจ</title>
    <!-- Latest compiled and minified CSS -->
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/bootstrap-form-validation.css">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="<?php echo BASE_URL?>assets/css/dhtmlx.css">
	
	<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/jquery-1.7.1.min.js" charset="UTF-8"></script>                                        
    <script type="text/javascript" src="<?php echo BASE_URL?>assets/js/bootstrap.min.js" charset="UTF-8"></script>
	<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/bootstrap-validator.min.js" charset="UTF-8"></script> 
    <script type="text/javascript" src="<?php echo BASE_URL?>assets/js/dhtmlx.js" charset="UTF-8"></script>

	<style>
		.center_div{
		    margin: 0 auto;
		    width:95%;
		    padding-top: 15px;
		}

	</style>
</head>
<body>

<div class="container center_div">

	<form id="add-appointment" method="post" action="<?php echo current_full_url()?>" role="form" style="width: 100%;" data-toggle="validator" novalidate="true" >

		<table style="width:99%;font-size: 16px;" border="0">
			<tr>
				<td valign="top" width="15%"><label class="control-label" for="">ชื่อ - สกุล:</label></td>
				<td width="50%">
					<div class="form-group">		
						<span style="font-size: 18px;"><?php echo $this->input->get_post('patient_name')?></span>
					</div>
				</td>
				<td width="35%"><span id="loader"></span></td>
			</tr>

			<tr>
				<td valign="top"><label class="control-label" for="appointment_date">วันที่นัด:</label></td>
				<td>
					<div class="form-group">
						<div class='input-group' style="width:50%;">
							<input type="text" class="form-control" id="appointment_date" name="appointment_date" value="<?php echo $this->mdl_appointment->form_value('appointment_date')?>" required="required" data-error="กรุณาเลือกวันที่นัดหมาย" /> 
							<span class="input-group-addon">
								<span id="calendar_icon" class="glyphicon glyphicon-calendar"></span>
							</span>
						</div>						
					</div>
				</td>
				<td valign="top"><span style="font-size:24px;text-align: center;" id="result_total"></span></td>
			</tr>
			<tr>
				<td valign="top"><label class="control-label" for="appointment_time">เวลา:</label></td>
				<td>
					<div class="form-group">
						<?php $times = array('08:00' => '8:00', '08:30' => '8:30', '09:00' => '9:00', '09:30' => '9:30', '10:00' => '10:00', '10:30' => '10:30', '11:00' => '11:00', '13:00' => '13:00');?> <!-- , '14:00' => '14:00', '14:30' => '14:30'-->
						<?php echo form_dropdown("appointment_time", $times, ($this->mdl_appointment->form_value('appointment_time'))?$this->mdl_appointment->form_value('appointment_time'):'10:00', 'class="form-control" id="appointment_time" style="width:50%" onchange="check_total_time()"');?>
					</div>
				</td>
				<td valign="top"><span style="font-size:24px;text-align: center;" id="result_total_time"></span></td>
			</tr>

			<tr>
				<td valign="top"><label class="control-label" for="user_id">แพทย์ที่นัด:</label></td>
				<td>
					<div class="form-group">
						<?php echo form_dropdown("user_id", $users, ($this->mdl_appointment->form_value('user_id'))?$this->mdl_appointment->form_value('user_id'):@$doctor->user_id, 'class="form-control" id="user_id" style="width:80%" required="required" data-error="กรุณาเลือกแพทย์หนึ่งท่าน"  onchange="check_total_time()"');?>
					</div>
				</td>
				<td></td>
			</tr>

			<tr>
				<td valign="top"><label class="control-label" for="">หมายเหตุ:</label></td>
				<td colspan="2" style="font-size: 14px;">
					<?php $array_option = explode(',', substr($this->mdl_appointment->form_value('select_option'), 1, -1))?>
					<?php //print_r ($array_option); //(substr($this->mdl_appointment->form_value('select_option'), 1, -1))?>
					<?php foreach ($options as $option):?>
						<?php echo form_checkbox('select_option[]', $option->id, (in_array($option->id, $array_option))?TRUE:FALSE);?><?php echo nbs(2)?><?php echo $option->option_name?><br />
					<?php endforeach;?>
				</td>
			</tr>

			<tr>
				<td valign="top"><label class="control-label" for="comment">อื่น ๆ:</label></td>
				<td>
					<div class="form-group">
					<textarea class="form-control" name="comment" rows="2" cols="50" style="width:80%;"><?php echo $this->mdl_appointment->form_value('comment')?></textarea> 
				</div>
				</td>
				<td></td>
			</tr>

			<tr>
				<td valign="top"><label class="control-label" for="component_id">ตรวจพิเศษ:</label></td>
				<td>
					<div class="form-group">
						<select class="form-control" name="component_id" style="width:80%">
							<option value="10">ห้องตรวจแพทย์</option>
							<option value="11">แล็ป</option>
							<option value="19" <?php echo ($this->session->userdata('department_id') == 19)?"selected":NULL?>>จิตวิทยา</option>
							<option value="58" <?php echo ($this->session->userdata('department_id') == 58)?"selected":NULL?>>จิตสังคมบำบัด</option>
							<option value="48" <?php echo ($this->session->userdata('department_id') == 48)?"selected":NULL?>>ฟื้นฟูสมรรถภาพ</option>
						</select>
					</div>
				</td>
				<td></td>
			</tr>

			<tr>
				<td></td>
				<td colspan="2">
					<div class="form-group">         
						<?php if ($this->input->get_post('edit')) : ?>
							<button type="button" id="btn_submit" name="btn_submit" class="btn btn-primary" onclick="submitFormPrint('f')">บันทึก</button>
						<?php else:?>
							<button type="button" id="btn_submit_print_queue" name="btn_submit_print_queue" class="btn btn-primary" style="width:180px;" onclick="submitFormPrintQueue()">บันทึกพิมพ์และยืนยันจ่ายยา</button>
						<?php endif;?>
						<button type="button" id="btn_submit_print" name="btn_submit_print" class="btn btn-primary" onclick="submitFormPrint('t')">บันทึกและพิมพ์</button>
						<button type="button" class="btn btn-primary" onclick="parent.dhxWins.window('winAppointment').close();">ยกเลิก</button>
						<!-- <input class="btn btn-primary" value="Submit" type="submit"> -->
					</div>
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<input type="hidden" id="visit_id" name="visit_id" value="<?php echo $this->input->get_post('vn_id')?>" <?php echo (!$this->input->get_post('vn_id'))?"disabled":NULL?> />
					<input type="hidden" id="patient_id" name="patient_id" value="<?php echo @$doctor->pa_id?>"/>
					<input type="hidden" id="queue_id" name="queue_id" value="<?php echo $this->input->get_post('queue_id')?>" />
					<?php echo form_hidden('com1', 'หลังพบแพทย์');?>
					<?php echo form_hidden('com2', 'ยืนยันจ่ายยา');?>
					<?php echo form_hidden('action', 'เภสัชกรยืนยันรายการสั่งยา');?>
					<?php echo form_hidden('com_id1', '27');?>
					<?php echo form_hidden('com_id2', '16');?>
				</td>
			</tr>
		</table>
	</form>
</div>
<script>    

    function submitFormPrint(is_print){
		
		//if($("#btnFormPrint").hasClass("disabled") == "false"){
    	
			$.ajax({
				type: "POST",
				url: $("#add-appointment").attr('action'),
				data : $("#add-appointment").serialize(),
				success: function(appointment_id) {	

					alert("บันทึกข้อมูลเรียบร้อยแล้ว");

					if (is_print == 't') {
						
						//alert(appointment_id);
						
						parent.appointmentPrint(appointment_id);

						//parent.appointment_print(appointment_id);//document.getElementById("print_appointment").src = '<?php echo site_url("Appointment/print_app/")?>' + appointment_id;	            
					}
					
					parent.dhxWins.window('winAppointment').close();
				}
			});
    	
		//}
    }
    
    function submitFormPrintQueue(){
		
		//if($("#btn_submit_print_queue").hasClass("disabled") == "false"){
    	
			var urlAction = encodeURI($('#add-appointment').attr('action') + '&send_queue=true');
			
			$.ajax({
				type: "POST",	
				url: urlAction,
				data : $("#add-appointment").serialize(),
				success: function(appointment_id) {

					alert("บันทึกข้อมูลเรียบร้อยแล้ว" + appointment_id);

					//parent.waitingDialog.hide();
					
					//parent.reload();
					
					//alert(parent.station_id);
					
					parent.appointmentPrint(appointment_id);

					//parent.document.getElementById("print_appointment").src = '<?php echo site_url("Appointment/print_app/")?>' + appointment_id;          			
					parent.reload_graid();
					
					parent.dhxWins.window('winAppointment').close();
					
				}
			});
		//}
    }
	
	//$("#appointment_date").focus();

	var dhymlxCalendar = new dhtmlXCalendarObject({input: "appointment_date", button: "calendar_icon"});
		dhymlxCalendar.hideTime();
		dhymlxCalendar.showToday();
		dhymlxCalendar.setDateFormat("%Y-%m-%d");
		dhymlxCalendar.setDate('<?php echo ($this->mdl_appointment->form_value('appointment_date'))?$this->mdl_appointment->form_value('appointment_date'):date('Y-m-d')?>');
		dhymlxCalendar.show();
		dhymlxCalendar.loadUserLanguage('th');
		dhymlxCalendar.setWeekStartDay(7);

		dhymlxCalendar.attachEvent("onArrowClick", function(date, nextdate){			
			var day;		
			dhymlxCalendar.setDateFormat("%Y-%m-%d");				
			d = dhymlxCalendar.getDate(true);		
			
			var cd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);						
			var nd = new Date(nextdate.getFullYear(), nextdate.getMonth(), nextdate.getDate(), 0, 0, 0, 0);
			
			if (cd < nd) {		
				day = sum_day(d, 28);
				dhymlxCalendar.setDate(day);
			}
			else {			

				day = wanting_day(d, 28);
				dhymlxCalendar.setDate(day);
			}

			dhtmlx_set_value("appointment_date", day);
		});	
		
		dhymlxCalendar.attachEvent("onChange", function(date){
			
			//alert(1);
			
			check_total_time();
			
			/*parent.waitingDialog.show('กรุณารอสักครู่...', {dialogSize: 'sm'});

			dhymlxCalendar.getFormatedDate("%Y-%m-%d", date);

			var url = '<?php echo site_url("Appointment/check_total_appointment_med/")?>' + dhymlxCalendar.getDate(true) + '/' + $('#user_id').val() + '?appointment_time=' + $('#appointment_time').val();

			$.ajax({
				method: "GET",
				dataType: "json",
				url: url,
				//data: data,
				success: function(json){
					
					//alert(json.sum_date);
					
					if (parseInt(json.sum_date) > 30) {
					
						if ($('.btn-primary').attr('disabled') != 'disabled') {
					
							$('.btn-primary').attr("disabled", "disabled");
						}
					}
					
					if (parseInt(json.sum_date) < 30) {
						
						if ($('.btn-primary').attr('disabled') == 'disabled') {
					
							$('.btn-primary').removeAttr("disabled");
						}
					}
					
					$('#result_total').html(json.sum_date + " ราย");
					
					parent.waitingDialog.hide();

					
				}
			});*/
			
			/*dhx4.ajax.get(url, function(res) {

				var json = dhx4.s2j(res.xmlDoc.responseText);
				
				if (parseInt(json.sum_date) > 30) {
					
					if ($('.btn-primary').attr('disabled') != 'disabled') {
				
						$('.btn-primary').attr("disabled", "disabled");
					}
				}
				
				if (parseInt(json.sum_date) < 30) {
					
					if ($('.btn-primary').attr('disabled') == 'disabled') {
				
						$('.btn-primary').removeAttr("disabled");
					}
				}
				
				$('#result_total').html(json.sum_date + " ราย");
				
				parent.waitingDialog.hide();

			});*/

			/*
			dhx4.ajax.query({
				method:"POST",
				url:"some.php",
				data:"k1=v1&k2=v2",
				async:true,
				callback:function(){
					
				},
				headers:{
					"MyHeader-Name1":"value",
					"MyHeader-Name2":"value"
				}
			});*/

		});
	
	function check_total_time () {
		
		if ($('#user_id').val() == "") {
			
			alert("กรุณาเลือกเจ้าหน้าที่หรือแพทย์ที่นัด");
			
			return false;
		}
		
		parent.waitingDialog.show('กรุณารอสักครู่...', {dialogSize: 'sm'});

		//dhymlxCalendar.getFormatedDate("%Y-%m-%d", date);

		var url = '<?php echo site_url("Appointment/check_total_appointment_med/")?>' + dhymlxCalendar.getDate(true) + '/' + $('#user_id').val() + '?appointment_time=' + $('#appointment_time').val();
		
		$.ajax({
			method: "GET",
			dataType: "json",
			url: url,
			//data: data,
			success: function(json){
				
				//alert(json.sum_date);
				
				if (parseInt(json.sum_time) > 30) {
				
					if ($('.btn-primary').attr('disabled') != 'disabled') {
				
						$('.btn-primary').attr("disabled", "disabled");
					}
				}
				
				if (parseInt(json.sum_time) < 30) {
					
					if ($('.btn-primary').attr('disabled') == 'disabled') {
				
						$('.btn-primary').removeAttr("disabled");
					}
				}
				
				$('#result_total').html(json.sum_date + " ราย");
				$('#result_total_time').html(json.sum_time + " ราย");
				
				parent.waitingDialog.hide();
		
			}
		});
		
		//parent.waitingDialog.show('กรุณารอสักครู่...', {dialogSize: 'sm'});

		//dhymlxCalendar.getFormatedDate("%Y-%m-%d", date);

		/*var url = '<?php echo site_url("Appointment/check_total_appointment_med/")?>' + dhymlxCalendar.getDate(true) + '/' + $('#user_id').val() + '?appointment_time=' + select_time;

		dhx4.ajax.get(url, function(res) {

			var json = dhx4.s2j(res.xmlDoc.responseText);
			
			alert(json.sum_date);
			
			if (parseInt(json.sum_date) > 30) {
				
				if ($('.btn-primary').attr('disabled') != 'disabled') {
			
					$('.btn-primary').attr("disabled", "disabled");
				}
			}
			
			if (parseInt(json.sum_date) < 30) {
				
				if ($('.btn-primary').attr('disabled') == 'disabled') {
			
					$('.btn-primary').removeAttr("disabled");
				}
			}
			
			$('#result_total').html(json.sum_date + " ราย");
			
			//parent.waitingDialog.hide();

		});*/
	}
	
	function sum_day (d, day){	
		var today = new Date(d);
		var newdate = new Date(d);
		newdate.setDate(today.getDate()+day);
		//alert(newdate);
		return newdate;
	}

	function wanting_day (d, day){
		var today = new Date(d);
		var newdate = new Date(d);
		newdate.setDate(today.getDate()-day);		
		return newdate;
	}

	function sum_week () {
		dhymlxCalendar.setDateFormat("%Y-%m-%d");		
		d = dhymlxCalendar.getDate(true);
		var day = sum_day(d, 7);
		dhtmlx_set_value("appointment_date", day);		
		dhymlxCalendar.setDate(day);		
	}

	function wanting_week () {
		dhymlxCalendar.setDateFormat("%Y-%m-%d");		
		d = dhymlxCalendar.getDate(true);
		var day = wanting_day(d, 7);
		dhtmlx_set_value("appointment_date", day);		
		dhymlxCalendar.setDate(day);		
	}
		
	function dhtmlx_set_value(id, date_select) {

		var day   = date_select.getDate();
  		var month = date_select.getMonth();
  		var year  = date_select.getFullYear();

  		day   = (day < 10 ? '0' + day : day);
  		month = ((month+1) < 10 ? '0' + (month+1) : month);

  		date_select = year + '-' + month + '-' + day;

		document.getElementById(id).value = date_select;
	}

</script>
</body>
</html>
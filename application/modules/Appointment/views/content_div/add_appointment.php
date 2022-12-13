<div id="div_add_appointment">
<style>
	label {
	    font-weight: bold;
	    font-size: 16px;

	}

	.textbox-label {
		width: 100px;
		text-align: right;
	}
</style>
<form id="add-appointment" class="easyui-form" method="post" data-options="novalidate:true" action="<?php echo current_full_url()?>"> <!-- enctype="multipart/form-data" -->

        <div style="margin-bottom:20px">
	        <label style="width: 85px;text-align: left; height: 30px; line-height: 30px;" for="patient_name">ชื่อ - สกุล:</label>
	        <span style="font-size: 16px;"><?php echo $this->input->get_post('patient_name')?></span>
	        <!-- <input class="easyui-validatebox" type="text" name="patient_name" style="width:70%;" data-options="required:true" value="<?php echo $this->input->get_post('patient_name')?>" disabled /> -->
    	</div>

        <div style="margin-bottom:20px">
			<label style="width: 85px;text-align: left; height: 30px; line-height: 30px;" for="patient_name">วันที่นัด:</label>
            <input type="text" id="appointment_date" name="appointment_date" style="width:30%;height: 25px;" value="<?php echo date('Y-m-d')?>">
			<span><img id="calendar_icon" src="<?php echo BASE_URL?>assets/img/calendar.png" border="0"></span>
		</div>

        <div style="margin-bottom:20px">
        	<label style="width: 85px;text-align: left; height: 30px; line-height: 30px;" for="appointment_time">เวลา:</label>
        	<?php $times = array('8:30' => '8:30', '9:00' => '9:00', '9:30' => '9:30', '10:00' => '10:00', '10:30' => '10:30', '11:00' => '11:00', '13:00' => '13:00', '13:30' => '13:30')?> <!-- , '14:00' => '14:00', '14:30' => '14:30'-->
            <?php echo form_dropdown("appointment_time", $times, ($this->mdl_appointment->form_value('appointment_time'))?$this->mdl_appointment->form_value('appointment_time'):"10:00", 'class="easyui-combobox" style="width:20%" data-options="required:true,editable:false"');?> <!-- label="เวลา:" -->
        </div>

        <div style="margin-bottom:20px">
        	<?php echo form_dropdown("user_id", $users, ($this->mdl_appointment->form_value('user_id'))?$this->mdl_appointment->form_value('user_id'):$doctor->user_id, 'class="easyui-combobox" data-options="editable:false" label="แพทย์ที่นัด:" style="width:70%"');?>
        </div>

        <div style="margin-bottom:20px">
            <input class="easyui-textbox" name="comment" style="width:70%;height:60px" data-options="label:'หมายเหตุ:',multiline:true" value="<?php echo $this->mdl_appointment->form_value('comment')?>">
        </div>

        <div style="margin-bottom:20px">
            <select class="easyui-combobox" name="component_id" data-options="editable:false" label="ตรวจพิเศษ:" style="width:70%">
	            <option value="10">ห้องตรวจแพทย์</option>
	            <option value="11">แล็ป</option>
	            <option value="19">จิตวิทยา</option>
	            <option value="58">จิตสังคมบำบัด</option>
	            <option value="48">ฟื้นฟูสมรรถภาพ</option>
            </select>
        </div>

         <div style="text-align:left;padding:5px;padding-left:100px;">
         	<?php if ($this->input->get_post('edit')) : ?>
            	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitFormPrint('0')" style="width:60px">บันทึก</a>
            <?php else:?>
            	<a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitFormPrintQueue()" style="width:180px">บันทึกพิมพ์และยืนยันจ่ายยา</a>
            <?php endif;?>
            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="submitFormPrint('1')" style="width:120px">บันทึกและพิมพ์</a>
            <a href="javascript:void(0)" class="easyui-linkbutton" onclick="clearForm()" style="width:60px">ยกเลิก</a>
        </div>
        <input type="hidden" id="visit_id" name="visit_id" value="<?php echo $this->input->get_post('vn_id')?>" <?php echo (!$this->input->get_post('vn_id'))?"disabled":NULL?> />
        <input type="hidden" id="patient_id" name="patient_id" value="<?php echo $doctor->pa_id?>"/>
		<input type="hidden" id="queue_id" name="queue_id" value="<?php echo $this->input->get_post('queue_id')?>" />
		<?php echo form_hidden('com1', 'หลังพบแพทย์');?>
		<?php echo form_hidden('com2', 'ยืนยันจ่ายยา');?>
		<?php echo form_hidden('action', 'เภสัชกรยืนยันรายการสั่งยา');?>
		<?php echo form_hidden('com_id1', '27');?>
		<?php echo form_hidden('com_id2', '16');?>
		<?php echo form_hidden('action_id', '22');?>

    </form>

    <script>

    function submitFormPrint(print){

		//alert ($('#add-appointment').attr('action'));

        $('#add-appointment').form('submit',{
            onSubmit:function(){
                return $(this).form('enableValidation').form('validate');
            },
        });

        $('#add-appointment').form({

            success:function(data){

                $('#window-add').window('close');

                if (print == 1) {

               		$("#print_appointment").attr('src', '<?php echo site_url("Appointment/print_app/")?>' + data);

				}
            }
        });

    }

    function submitFormPrintQueue(){

    	//var datastring = $("#add-appointment").serialize();

    	var urlAction = encodeURI($('#add-appointment').attr('action') + '&send_queue=true');

    	//var dataSerialize = $('#add-appointment').serialize() + '&com1=หลังพบแพทย์&com2=ยืนยันจ่ายยา&action=เภสัชกรยืนยันรายการสั่งยา&com_id1=27&com_id2=16&action_id=22'

    	//alert(dataSerialize)

    	$('#add-appointment').form('submit',{
	    	url: urlAction,
	    	data: $('#add-appointment').serialize() + "&com1=หลังพบแพทย์&com2=ยืนยันจ่ายยา&action=เภสัชกรยืนยันรายการสั่งยา&com_id1=27&com_id2=16&action_id=22",
            onSubmit:function(){

                return $(this).form('enableValidation').form('validate');
            },
            success:function(data){

	            $('#window-add').window('close');

	            $("#print_appointment").attr('src', '<?php echo site_url("Appointment/print_app/")?>' + data);
            }
        });

    }

    function clearForm(){

        $('#add-appointment').form('clear');
        $('#window-add').window('close');
    }

	$("#appointment_date").focus();

	var dhymlxCalendar = new dhtmlXCalendarObject({input: "appointment_date", button: "calendar_icon"});
		dhymlxCalendar.hideTime();
		dhymlxCalendar.showToday();
		dhymlxCalendar.show();
		dhymlxCalendar.loadUserLanguage('th');

</script>
</div>

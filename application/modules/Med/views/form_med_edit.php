<?php $this->load->view('Layout/alerts'); ?>

<form method="post" id="form-cgi" action="<?php echo current_full_url()?>" class="form-horizontal" role="form" >

	<table class="table table-striped">
   		<thead>
   			<tr>
   				<th style="text-align: center;width: 50px;">ลำดับ</th>
   				<th width="30%">วันที่ออกตรวจ</th>
   				<th>ชื่อห้องตรวจ</th>
   				<th>แพทย์</th>
   			</tr>
   		</thead>
   		
   		<?php if (!is_numeric($this->uri->segment(3))):?>
   		
	   		<tbody>
	   		<?php $i=1; foreach($this->mdl_med_station->form_values as $station):?>	
	   			<tr>
	   				<td style="text-align: center;"><?php echo $i?></td>
	   				<td>
		   				<input style="width: 100px;" class="input-medium" data-provide="datepicker" data-date-language="th" type="text" id="check_out_date" name="check_out_date[]" data-date="<?php echo $station->check_out_date?>" value="<?php echo $station->check_out_date?>" />
		   			</td>
	   				<td><?php echo $station->station_name?></td>
	   				<td style="width: 30%;"><?php echo form_dropdown("doctor_id[{$station->med_station_id}]", $users, $station->user_id, 'class="form-control"');?></td>
	   			</tr>
	   		<?php $i++; endforeach;?>
	   		</tbody>
   		
   		<?php else:?>
	   		<tbody>
	   			<tr>
	   				<td style="text-align: center;"><?php echo 1?></td>
	   				<td>
		   				<div class="input-append date datepicker" id="check_out_date" data-date="<?php echo $this->mdl_med_station->form_values['check_out_date']; ?>">
							<input class="span2" style="width: 100px;" type="text" name="check_out_date" value="<?php echo $this->mdl_med_station->form_values['check_out_date']; ?>">
							<span class="add-on"><i class="icon-th"></i></span>
						</div>

		   			</td>
	   				<td>
	   					<?php echo $this->mdl_med_station->form_values['station_name']?>
	   				</td>
	   				<td style="width: 30%;"><?php echo form_dropdown("doctor_id[{$this->mdl_med_station->form_values['med_station_id']}]", $users, $this->mdl_med_station->form_values['user_id'], 'class="form-control"');?></td>
	   			</tr>
	   		</tbody>  		
   		<?php endif;?>
   	
   	</table>
   	
   	
   	<?php //print_r ($this->mdl_med_station->form_values); ?>
   	
   	<?php //echo $this->uri->segment(3); ?>
   	<input type="hidden" id="check_out_date_hidden" name="check_out_date_hidden" value="<?php echo ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):$this->uri->segment(3)?>" />
	<button class="btn btn-primary" id="btn-submit" name="btn_submit" value="1"><i class="icon-ok icon-white"></i> บันทึก</button>
	<button class="btn btn-danger"  id="btn-cancel" name="btn_cancel" value="1"><i class="icon-remove icon-white"></i> ยกเลิก</button>
	
</form>

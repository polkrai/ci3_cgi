<?php $this->load->view('Layout/alerts'); ?>

<form method="post" id="form-cgi" action="<?php echo current_full_url()?>" class="form-horizontal" role="form" >

	<table class="table table-striped">
   		<thead>
   			<tr>
   				<th style="text-align: center;width: 50px;">ลำดับ</th>
   				<th><?php echo nbs(5)?>ชื่อห้องตรวจ</th>
   				<th>แพทย์</th>
   			</tr>
   		</thead>
   		
   		<tbody>
   		<?php $i=1; foreach($stations as $station):?>	
   			<tr>
   				<td style="text-align: center;"><?php echo $i?></td>
   				<td><?php echo nbs(5).$station->station_name?></td>
   				<td style="width: 30%;">
	   				<?php echo form_dropdown("doctor_id[{$station->station_id}]", $users, $this->mdl_model->get_last_date($station->station_id), 'class="form-control" style="font-size:14px;"');?>
	   			</td>
   			</tr>
   		<?php $i++; endforeach;?>
   		</tbody>
   	
   	</table>
   	<?php //print_r ($this->mdl_med_station->form_values); ?>
   	<input type="hidden" id="check_out_date" name="check_out_date" value="<?php echo ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):NULL?>" />
	<button class="btn btn-primary" id="btn-submit" name="btn_submit" value="1"><i class="icon-ok icon-white"></i> บันทึก</button>
	<button class="btn btn-danger"  id="btn-cancel" name="btn_cancel" value="1"><i class="icon-remove icon-white"></i> ยกเลิก</button>
	
</form>

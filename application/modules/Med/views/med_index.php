<?php $this->load->view('Layout/alerts'); ?>

<?php if (@$header) : ?>
	<div class="page-header">
	    <h2 style="font-size: 26px;"><?php echo $header; ?></h2>
	</div>
<?php endif;?>

<table class="table table-striped">
	<thead>
		<tr style="background-color: #eee;">
			<th align="center" width="5%">ลำดับ</th>
			<th width="20%">วันที่ออกตรวจ</th>
            <th width="20%">ห้องตรวจ</th>
			<th>แพทย์</th>
			<th width="10%" align="center">ตัวเลือก</th>
		</tr>
	</thead>

	<tbody>
		<?php $i = ($this->uri->segment(3))?$this->uri->segment(3)+1:1; foreach ($med_queues as $med_queue) : ?>
		<tr>
			<td align="center"><?php echo $i; ?></td>
			<td><?php echo $med_queue->check_out_date_th; ?></td>
            <td><?php echo $med_queue->station_name; ?></td>
			<td><?php echo ($med_queue->fullname)?$med_queue->fullname:"ไม่ระบุแพทย์"; ?></td>
			<td>
				<a href="<?php echo site_url("Appointment/history_to_day/{$med_queue->user_id}?view_index=true&date_select={$med_queue->check_out_date}");?>" title=""><i class="fa fa-eye fa-margin"></i></a>				
				<a href="<?php echo site_url("Med/form_med/{$med_queue->med_station_id}?date_select={$med_queue->check_out_date}&page={$this->uri->segment(3)}"); ?>" title="แก้ไข"><i class="fa fa-edit fa-margin"></i></a>
				<a href="<?php echo site_url("Med/med_deleted/{$med_queue->med_station_id}");?>" data-placement="left" data-toggle="confirmation" title="ยกเลิก"><i class="fa fa-trash-o fa-margin"></i></a>
			</td>
		</tr>
		<?php $i++; endforeach; ?>
	</tbody>

</table>
 
<?php //echo ">>". $this->session->userdata('user_id');?>
<div class="pull-left">
    <?php //echo pager(site_url('Med/index'), 'mdl_med_station'); ?>
</div>
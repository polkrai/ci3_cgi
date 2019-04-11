<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>


<?php //print_r($queues)?>

<p><?php //echo 'admin dashboard text welcome'; ?></p>

<?php //echo $this->session->userdata('full_name')?>

<?php //echo $this->layout->load_view('layout/alerts'); ?>
<?php //echo Modules::run('Layout/layout/load_view', 'layout/alerts'); ?>
<?php $this->load->view('Layout/alerts'); ?>

<table class="table table-striped">

	<thead>
		<tr>
			<th align="center" width="5%">ลำดับ</th>
			<th width="20%">VN</th>
            <th width="20%">HN</th>
			<th>ชื่อ - สกุล</th>
			<th width="15%">คะแนน</th>
			<th width="6%" align="left">ตัวเลือก</th>
		</tr>
	</thead>

	<tbody>
		<?php $i=1; foreach ($queues as $queue) : ?>
		<tr <?php echo ($queue->cgi_score)?"class=\"success\"":NULL?>>
			<td align="center"><?php echo $i; ?></td>
			<td><?php echo $queue->vn; ?></td>
            <td><?php echo $queue->hn; ?></td>
			<td><?php echo $queue->pa_pre_name . $queue->pa_name . ' ' . $queue->pa_lastname; ?></td>
			<td><?php echo $queue->cgi_score; ?></td>
			<td>
				<a class="btn btn-sm btn-success" href="<?php echo site_url("Cgi/cgi_form/{$queue->cgi_id}?vn_id={$queue->vn_id}&hn={$queue->hn}&vn={$queue->vn}&from=index"); ?>" ><i class="fa fa-edit fa-margin"></i> <?php echo ($queue->cgi_id)?"แก้ไข":NULL?>ประเมิณ</a>
			</td>
		</tr>
		<?php $i++; endforeach; ?>
	</tbody>

</table>

<div class="pull-right">
    <?php echo pager(site_url('Cgi/physician'), 'mdl_queue'); ?>
</div>
<?php //$this->session->unset_flashdata('alert_success');?>
<!-- <button id="jsi18n-sample" type="button" class="btn btn-primary"><?php echo 'admin dashboard btn demo'; ?></button> -->


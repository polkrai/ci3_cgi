<style>
	.options {
	    margin: 0;
	}
	
	.btn-group, .btn-group-vertical {
	    display: inline-block;
	    position: relative;
	    vertical-align: middle;
	}
	
	* {
	    box-sizing: border-box;
	}
	
	.btn-sm {
	    border-radius: 3px;
	    font-size: 12px;
	    line-height: 1.5;
	    padding: 5px 10px;
	}
</style>

<form class="navbar-form navbar-left" method="post">

	<div class="form-group">

	  <input type="text" id="txtsearch" name="txtsearch" class="form-control" placeholder="HN" onfocus="this.select()" onclick="this.setSelectionRange(0, this.value.length)" value="<?php echo $this->input->get_post('txtsearch')?>">

	</div>

	<button type="submit" name="btn_submit" class="btn btn-primary" value="1">ค้นหา</button>

</form>

<?php if (isset($patients)):?>

<?php //$this->load->view('Layout/alerts'); ?>

<?php echo Modules::run('Layout/layout/load_view', 'layout/alerts'); ?>

<table class="table table-striped">

	<thead>
		<tr>
			<th align="center" width="5%">ลำดับ</th>
			<th width="15%">วันที่รับบริการ</th>
			<th width="20%">VN</th>
            <th width="20%">HN</th>
			<th>ชื่อ - สกุล</th>
			<th width="6%" align="left">ตัวเลือก</th>
		</tr>
	</thead>

	<tbody>
		<?php $i=1; foreach ($patients as $patient) : ?>
		<tr>
			<td align="center"><?php echo $i; ?></td>
			<td><?php echo date_thai_show($patient->time_add); ?></td>
			<td><?php echo $patient->vn; ?></td>
            <td><?php echo $patient->hn; ?></td>
			<td><?php echo $patient->pa_pre_name . $patient->pa_name . ' ' . $patient->pa_lastname; ?></td>
			<td>
				<div class="options btn-group">
					<a class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"><i class="fa fa-cog"></i> ตัวเลือก</a>
					<ul class="dropdown-menu">
						<li><a href="<?php echo site_url("Cgi/queue_record/{$patient->queue_id}"); ?>"><i class="fa fa-file-text fa-margin"></i> เพิ่มคิว</a></li>
						<li><a href="<?php echo site_url("Cgi/cgi_form?vn_id={$patient->vn_id}&hn={$patient->hn}&vn={$patient->vn}&from=search"); ?>" ><i class="fa fa-edit fa-margin"></i> ประเมิณ</a></li>
						<li><a href="<?php echo site_url("Cgi/histoy?vn_id={$patient->vn_id}&hn={$patient->hn}&vn={$patient->vn}&from=search"); ?>" ><i class="fa fa-eye fa-margin"></i> ประวัติการประเมิณ</a></li>
						<!-- <li><a href="<?php echo site_url('Cgi/delete/'); ?>" onclick="return confirm('delete_record_warning');"><i class="fa fa-trash-o fa-margin"></i> ลบ</a></li> -->
					</ul>
				</div>
			</td>
		</tr>
		<?php $i++; endforeach; ?>
	</tbody>

</table>

<div class="pull-right">
    <?php echo pager(site_url('Cgi/search'), 'mdl_patient'); ?>
</div>

<?php endif;?>

<script>

document.getElementById("txtsearch").focus(); 

</script>
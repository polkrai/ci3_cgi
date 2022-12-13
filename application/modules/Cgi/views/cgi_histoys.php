<div class="container-fluid" style="padding-left:5px;padding-right:5px;">
<?php $this->load->view('Cgi/cgi_header'); ?>
</div>

<?php if (isset($histoys)):?>

<table class="table table-striped">

	<thead>
		<tr>
			<th align="center" width="5%">ลำดับ</th>
			<th width="15%">วันที่รับประเมิณ</th>
			<th width="20%">VN</th>
            <th width="20%">HN</th>
			<th width="5%">คะแนน</th>
			<th>ผู้ประเมิณ</th>
			<th width="6%" align="left">ตัวเลือก</th>
		</tr>
	</thead>

	<tbody>
		<?php $i=1; foreach ($histoys as $histoy) : ?>
		<tr>
			<td align="center"><?php echo $i; ?></td>
			<td><?php echo $histoy->cgi_date; ?></td>
			<td><?php echo $histoy->hn?></td>
            <td><?php echo $histoy->vn?></td>
			<td><?php echo $histoy->cgi_score?></td>
			<td><?php echo $histoy->name?> <?php echo $histoy->lastname?></td>
			<td>
				<div class="options btn-group">
					<a class="btn btn-sm btn-default dropdown-toggle" data-toggle="dropdown" href="#" aria-expanded="false"><i class="fa fa-cog"></i> ตัวเลือก</a>
					<ul class="dropdown-menu">
						<li><a href="<?php echo site_url("Cgi/cgi_form/{$histoy->id}?vn_id={$histoy->vn_id}&hn={$histoy->hn}"); ?>"><i class="fa fa-edit fa-margin"></i> แก้ไข</a></li>
						<li><a href="<?php echo site_url("Cgi/deletes/{$histoy->id}?vn_id={$histoy->vn_id}&hn={$histoy->hn}&vn={$this->input->get_post('vn')}"); ?>" onclick="return confirm('คุณต้องการลบการประเมิณของวันที่ <?php echo $histoy->cgi_date?> ใช่หรือไม่?');" ><i class="fa fa-trash-o fa-margin"></i> ลบ</a></li>
					</ul>
				</div>
			</td>
		</tr>
		<?php $i++; endforeach; ?>
	</tbody>

</table>

<div class="pull-right">
    <?php echo pager(site_url('Cgi/histoy'), 'mdl_cgi'); ?>
</div>

<?php endif;?>
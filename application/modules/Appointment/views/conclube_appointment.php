<?php $this->load->view('Layout/alerts'); ?>

<?php if (@$header) : ?>
	<div class="page-header">
	    <h2 style="font-size: 26px;"><?php echo $header; ?></h2>
	</div>
<?php endif;?>

<table class="table table-striped">
	<thead>
		<tr style="background-color: #eee;">
			<th width="4%">ลำดับ</th>
			<th width="17.2%">แพทย์</th>
			<th width="8.6%">8:00 น.</th>
            <th width="8.6%">8:30 น.</th>
			<th width="8.6%">9:00 น.</th>
			<th width="8.6%">9:30 น.</th>
			<th width="8.6%">10:00 น.</th>
			<th width="8.6%">10:30 น.</th>
			<th width="8.6%">11:00 น.</th>
			<th width="8.6%">13:00 น.</th>
			<th width="10%">รวมแยกแพทย์</th>
		</tr>
	</thead>

	<tbody>
		<?php $tt1=0;$tt2=0;$tt3=0;$tt4=0;$tt5=0;$tt6=0;$tt7=0;$tt8=0;$ttt=0;?>
		<?php $xx=0;$i = 1;foreach ($appointments as $appointment) : ?>
		<tr>
			<td align="center"><?php echo $i; ?></td>
			<td align="left"><?php echo $appointment->doctorname; ?></td>
			<td align="center"><?php echo $t1 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '08:00')->get()->num_rows();?></td>
            <td align="center"><?php echo $t2 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '08:30')->get()->num_rows();?></td>
			<td align="center"><?php echo $t3 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '09:00')->get()->num_rows();?></td>
			<td align="center"><?php echo $t4 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '09:30')->get()->num_rows();?></td>
			<td align="center"><?php echo $t5 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '10:00')->get()->num_rows();?></td>
			<td align="center"><?php echo $t6 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '10:30')->get()->num_rows();?></td>
			<td align="center"><?php echo $t7 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '11:00')->get()->num_rows();?></td>
			<td align="center"><?php echo $t8 = $this->mdl_appointment->filter_select_doctor_time($date_select, $appointment->user_id, '13:00')->get()->num_rows();?></td>
			<td align="center" style="font-size: 18px;font-weight: bold;"><?php echo $xx = $t1+$t2+$t3+$t4+$t5+$t6+$t7+$t8?></td>
		</tr>
		<?php $tt1+=$t1;$tt2+=$t2;$tt3+=$t3;$tt4+=$t4;$tt5+=$t5;$tt6+=$t6;$tt7+=$t7;$tt8+=$t8;?>
		<?php $ttt+=$xx;?>
		<?php $i++; endforeach; ?>
		<tr style="font-size: 18px;font-weight: bold;">
			<td colspan="2" align="right">รวมแยกช่วงเวลา</td>
			<td align="center"><?php echo $tt1?></td>
            <td align="center"><?php echo $tt2?></td>
            <td align="center"><?php echo $tt3?></td>
            <td align="center"><?php echo $tt4?></td>
            <td align="center"><?php echo $tt5?></td>
            <td align="center"><?php echo $tt6?></td>
            <td align="center"><?php echo $tt7?></td>
            <td align="center"><?php echo $tt8?></td>
            <td align="center"><?php echo $ttt?></td>
		</tr>
	</tbody>

</table>
 
<?php //echo ">>". $this->session->userdata('user_id');?>
<div class="pull-left">
    <?php //echo pager(site_url('Med/index'), 'mdl_med_station'); ?>
</div>
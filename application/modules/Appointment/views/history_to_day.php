<?php //print_r($historys);?>

<table class="table table-striped" style="width: 60%;">

	<thead>
		<tr>
			<th style="text-align: center;" width="10%">ลำดับ</th>
			<th width="20%">เวลา</th>
            <th width="30%">ชื่อ - สกุล</th>
            <th width="40%">คำอธิบาย</th>
		</tr>
	</thead>

	<tbody>
		<?php $i = 1; foreach ($historys as $history) : ?>
		<tr>
			<td align="center"><?php echo $i; ?></td>
			<td><?php echo ($history->appointment_time)?$history->appointment_time:"08:30"; ?></td>
            <td><?php echo $history->patient_name; ?></td>
            <td><?php echo $history->comment; ?></td>
		</tr>
		<?php $i++; endforeach; ?>
	</tbody>

</table>
<br />
<br />
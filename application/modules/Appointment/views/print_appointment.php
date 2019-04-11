<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>พิมพ์ใบนัดหมาย</title>

        <link rel="stylesheet" href="<?php echo BASE_URL?>htdocs/themes/admin/css/font.css" type="text/css" />

		<script type="text/javascript" src="<?php echo BASE_URL?>assets/js/jquery-1.12.4.min.js" charset="UTF-8"></script>
	</head>

	<body onload="window.print();window.close();">
	<?php //print_r ($appointment)?>
	<table width="800px" style="padding: 5px;" border="0">
		<thead>
			<tr>
				<th colspan="2" style="text-align: center;"><img src="<?php echo BASE_URL?>assets/img/logo2.png" width="100%" height="60px"/></th>
			</tr>
			<tr>
				<th colspan="2"><h1>ใบนัดหมาย</h1></th>
			</tr>
		</thead>

		<tbody>
			<tr>
				<td class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;HN</td>
				<td><?php echo $appointment->hn?></td>
			</tr>
			<tr>
				<td class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชื่อ - สกุล</td>
				<td><?php echo $appointment->patient_name?></td>
			</tr>
			<tr>
				<td class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;วันที่นัด</td>
				<td><?php echo date_to_thai($appointment->appointment_date_time)?></td>
			</tr>
			<tr>
				<td class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;แพทย์ที่นัด</td>
				<td><?php echo $appointment->doctorname?></td>
			</tr>

			<tr>
				<td class="b" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;หมายเหตุ</td>
				<td valign="top">
				<?php foreach ($options as $option):?>
					- <?php echo $option->option_name?><br />
				<?php endforeach;?>
				</td>
			</tr>
			<?php if ($appointment->comment):?>
			<tr>
				<td class="b" valign="top">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;อื่น ๆ</td>
				<td valign="top" style="white-space: pre;"><?php echo $appointment->comment?></td>
			</tr>
			<?php endif;?>
			<tr>
				<td class="b">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ชื่อผู้นัด</td>
				<td><?php echo $appointment->created_name?></td>
			</tr>
		</tbody>
	</table>

	<?php if ($this->input->get_post('close_page') == "true"):?>
		<script>
			$(document).ready(function(e) {
				window.close();
			});
		</script>
	<?php endif;?>
</body>
</html>

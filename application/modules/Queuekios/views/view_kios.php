<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		
		<style type="text/css">
		* {
		    font-family: "Ubuntu",sans-serif;
		}
	
		.nowrap table {
		    border-collapse: collapse;
		    font-size: 15px;
		}
		
		.nowrap table tbody td:first-child {
		    white-space: normal;
		}
		
		.odd td {
		    background: #f5f5f5 none repeat scroll 0 0;
		}
		
		.nowrap td, .nowrap th, td.nowrap, p.nowrap {
		    white-space: pre;
		}
		
		.nowrap thead td, thead th {
		    background: #eee none repeat scroll 0 0;
		}
		
		.nowrap thead th {
		    padding: 0.2em 0.5em;
		    text-align: center;
		    font-size: 16px;
		    font-weight: bold;
		}
		
		.nowrap td, th {
		    border-color: #bbb;
		    border-width: 0 1px 1px 0;
		    padding: 0.2em 0.3em;
		}
	</style>
		
	</head>
	<body>	
	
	<?php $count_rows = count($rows);?>
	
	<?php if ($count_rows > 0):?>
		<fieldset>
		<legend>คิวจาก Kios</legend>
			<table width="100%" align="center" class="nowrap" cellspacing="0">
				<thead>
				<tr>
					<th width="5%">ลำดับ</th>
					<th width="25%">HN</th>
					<th width="40%">ชื่อ - สกุล</th>
					<th width="20%">หมายเลขคิว</th>
					<th width="10%">#</th>
				</tr>
				</thead>
				<tbody>
				<?php $i=1; foreach($rows as $row):?>
				<tr <?php echo ($i % 2 == 0)?NULL:"class=\"odd\""?> >
			      <td align="center"><?php echo $i?></td>
			      <td><?php echo $row->hn?></td>
			      <td><?php echo "{$row->pa_pre_name}{$row->pa_name} {$row->pa_lastname}";?></td>
			      <td><?php echo $row->queue_number?></td>
			      <td align="center"><button onclick="window.opener.kiosWindowLocation ('/nano/index.php?option=com_rec&act=show&hn=<?php echo "{$row->hn}&kios_id={$row->kios_id}"?>');window.close();">เลือก</button></td>
			    </tr>
			    <?php $i++; endforeach;?>
			  </tbody>
			</table>
		</fieldset>
	<?php endif;?>
	
	</body>
</html>
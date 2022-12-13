<?php //echo date('Y-m-d');//print_r ($med_stations)?>
<style>
	
.well-td {
    min-height: 2px;
    padding: 5px;
    margin-bottom: 5px;
    background-color: #f5f5f5;
    border: 1px solid #e3e3e3;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    height: 350px;
}

</style>

<?php $row = 1;?>

<table style="width:100%" cellpadding="5" cellspacing="5" >

<?php foreach($med_stations as $med_station):?>

	<?php echo ($row == 1)?"<thead><tr>":NULL?>
	
		<th style="width: 33.333333333%; padding-bottom: 5px; padding-right: 5px;">
			
			<div style="width: 100%;font-size: 14px;" class="well-td"><h4 style="font-size: 20px;padding-bottom: 5px;"><?php echo $med_station->station_name .nbs(3). $med_station->fullname?></h4>
			
				<table id="table-<?php echo $med_station->station_id?>"
	               	   data-toggle="table"
	               	   data-height="310"
		               data-url="<?php echo site_url("Appointment/load_data_queue/{$med_station->station_id}")?>">
					<thead>
						<tr>
							<th style="width:10%;" data-sortable="true" data-field="hn">HN</th>
							<th data-field="patient_name">ชื่อ สกุล</th>
							<th style="width:15%;" data-field="vn">ตัวเลือก</th>
						</tr>
					</thead>
				</table>
			
			</div>
			
			<script>
				var tableId = 'table-<?php echo $med_station->station_id?>';
				//alert(tableId)
				$('#' + tableId).bootstrapTable({
					columns: [
						[
		                    {
		                    	title: 'HN',
		                        field: 'hn',
		                        align: 'center',
		                        valign: 'middle'
		                    }, {
		                        title: 'ชื่อ สกุล',
		                        field: 'patient_name',
		                        align: 'left'
		                    }, {
		                        title: 'ตัวเลือก',
		                        field : 'vn',
		                        align: 'center',
		                        formatter: operateFormatter
		                    }
		                ]
		            ]
				});
			</script>
			
		</th>
	
	<?php 	
	$row++;
	if ($row > 3){			
		echo "</tr></thead> \n";		
		$row = 1;
	}


endforeach;?>

</table>

<script>

//alert(2)

function operateFormatter(value, row, index) {
    return [
        '<a class="like" href="javascript:void(0)" title="Like">',
        '<i class="glyphicon glyphicon-heart"></i>',
        '</a>  ',
        '<a class="remove" href="javascript:void(0)" title="Remove">',
        '<i class="glyphicon glyphicon-remove"></i>',
        '</a>'
    ].join('');
}
/*
    function ajaxRequest(params) {

        console.log(params.data);
       
        setTimeout(function () {
            params.success({
                total: 100,
                rows: [{
                    "id": 0,
                    "name": "Item 0",
                    "price": "$0"
                }]
            });
        }, 1000);
    }*/
       
   
</script>

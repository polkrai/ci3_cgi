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

.not-active {
  pointer-events: none;
  cursor: default;
  text-decoration: none;
  color: black;
}
</style>

<?php $row = 1;?>
<?php //$i = 1;?>

<table style="width:100%" cellpadding="5" cellspacing="5" >

<?php foreach($med_stations as $med_station):?>

	<?php echo ($row == 1)?"<thead><tr>":NULL?>
	
		<th style="width: 25%; padding-bottom: 5px; padding-right: 5px;">
			
			<table id="table-<?php echo $med_station->station_id?>" class="easyui-datagrid" style="width:100%;height:350px" singleSelect="true"
				   url="<?php echo site_url("Appointment/load_data_queue/{$med_station->station_id}?date_select=") . $this->input->get_post("date_select");?>" title="<?php echo $med_station->station_name .nbs(3). $med_station->fullname?>" rownumbers="true" method="post" > <!-- pagination="true" pageSize:10 -->
				<thead>
					<tr>
						<th field="hn" width="60">HN</th>
						<th field="patient_name" width="140">ชื่อ สกุล</th>
						<th field="vn_id" align="center" formatter="formatIconAdd">นัด</th>
						<th field="appointment_id" align="center" formatter="formatIconPrint">พิมพ์</th>
					</tr>
				</thead>
			</table>
		    <script type="text/javascript">
		    
		        /*$(function(){
		            $('#table-<?php echo $med_station->station_id?>').datagrid({
		                onLoadSuccess:function(data){
		                    $.messager.show({
		                        title:'Info',
		                        msg:'Load '+data.total+' records successfully'
		                    });
		                }
		            });
		        });
		        
		        function loaddata(){
		            $('#table-<?php echo $med_station->station_id?>').datagrid('load',{
		                total: $('#total').numberbox('getValue')
		            });
		        }*/
		    </script>
			
		</th>
	
	<?php 	
	$row++;
	if ($row > 4){			
		echo "</tr></thead> \n";		
		$row = 1;
	}

	//$i++;
endforeach;?>

</table>

<script type="text/javascript">
		

function formatIconAdd(val, row){

	return '<a href="javascript:void(0)" onclick="appointmentAdd(\''+val+'\',\''+row.patient_name+'\');"><img src="<?php echo BASE_URL?>assets/img/edit_app.png" style="float:center" /></a>';

}

function formatIconPrint(val, row){
	
	//alert(isNaN(val))
	
	if (val == undefined) {

		return '<a href="javascript:void(0)" class="not-active"><img src="<?php echo BASE_URL?>assets/img/printer.png" style="float:center" /></a>';
	}
	else {
	
		return '<a href="javascript:void(0)" onclick="appointmentPrint(\''+val+'\')"><img src="<?php echo BASE_URL?>assets/img/printer.png" style="float:center" /></a>';
	}
}

function formatIconDel(val, row){

	return '<a href="javascript:void(0)"><img src="<?php echo BASE_URL?>assets/img/del_app.png" style="float:center" /></a>';

}

function formatContactUrl(val,row){
	
    var url = "contactView.php?id=";
    
    return '<a href="'+url + row.id+'">'+val+'</a>';
}

function appointmentPrint (appointment_id) {
	
	alert(appointment_id);
	
	$("#print_app").attr('src', '<?php echo site_url("Appointment/print_app/")?>' + appointment_id);

}

function appointmentAdd (vn_id, patient_name) {
	
	//alert(patient_name);
	
	$('#window-add').window('open');
	
	$('#window-add').window('refresh', '<?php echo site_url("Appointment/form/-1?vn_id=")?>' + vn_id + '&date_select=<?php echo $this->input->get_post("date_select")?>');
	
	//$('#window-add').window('open');
}

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

<div id="window-add" class="easyui-window" title="นัดหมายผู้ป่วย" data-options="modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,iconCls:'icon-save'" style="width:40%;height:400px;padding:30px;"></div>
<iframe id="print_app" width="0" height="0"></iframe>
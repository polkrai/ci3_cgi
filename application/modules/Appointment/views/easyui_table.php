    <table id="table-<?php echo $med_station->station_id?>" style="width:700px;height:250px" url="<?php echo site_url("Appointment/load_data_queue/{$med_station->station_id}")?>" singleSelect="true" title="<?php echo $med_station->station_name .nbs(3). $med_station->fullname?>" iconCls="icon-ok" autoRowHeight="false">
        <thead>
            <tr>
                <th field="inv" width="80">HN</th>
                <th field="date" width="120">ชื่อ สกุล</th>
                <th field="name" width="80">ตัวเลือก</th>
            </tr>
        </thead>
    </table>
    <script type="text/javascript">
        $(function(){
            $('#table-' + <?php echo $med_station->station_id?>).datagrid({
                onLoadSuccess:function(data){
                    $.messager.show({
                        title:'Info',
                        msg:'Load '+data.total+' records successfully'
                    });
                }
            });
        });
        
        function loaddata(){
            $('#table-' + <?php echo $med_station->station_id?>).datagrid('load',{
                total: $('#total').numberbox('getValue')
            });
        }
    </script>
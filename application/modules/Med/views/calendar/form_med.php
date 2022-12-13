<div class="col-sm-3 sidebar sidebar-left">
<div class="well">
    <div class="datepicker" id="datepicker-inline" data-date-language="en-th" data-date="<?php echo ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):NULL?>"></div>
    </div>
</div>	

<script type="text/javascript">

/*
$('#datepicker-inline').datepicker({
	language:"th",
	format:"yyyy-mm-dd",
	todayBtn: "linked",
}).on('changeDate', function(e){
	
	alert(e.date.toString());
	//var value = $('#datepicker-inline').datepicker('getFormattedDate');
	//var dateselect = new Date(ev.date.valueOf());
	//$('#check_out_date').val(value)
	alert(value)
});*/
</script>
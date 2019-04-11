<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title><?php echo $page_title; ?> - <?php echo $this->settings->site_name_med; ?></title>
    <meta name="keywords" content="<?php echo $this->settings->meta_keywords; ?>">
    <meta name="description" content="<?php echo $this->settings->meta_description; ?>">

    <?php if (isset($css_files) && is_array($css_files)) : ?>
        <?php foreach ($css_files as $css) : ?>
            <?php if ( ! is_null($css)) : ?>
                <link rel="stylesheet" href="<?php echo $css; ?>"><?php echo "\n"; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    <?php endif; ?>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <style>
    	.highlighted {
		    background-color:yellow;
		}
		.emptyBlock1000 {
		    height:1000px;
		}
		.emptyBlock2000 {
		    height:2000px;
		}
    </style>
    <script type="text/javascript" src="<?php echo BASE_URL?>htdocs/themes/admin/js/search.highlight.js" charset="UTF-8"></script>
</head>
<body>
	
	<?php $date_select = ($this->uri->segment(3))?$this->uri->segment(3):date('Y-m-d');?>

    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only"><?php echo 'สลับการนำทาง'; ?></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo site_url('Med/index?date_select=').date('Y-m-d'); ?>"><b><?php echo $this->settings->site_name_med; ?> </b></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
	            
                <ul class="nav navbar-nav">	
                	<li class="<?php echo (uri_string() == 'Med' OR uri_string() == 'Med/index') ? 'active' : ''; ?>">
                		<a id="form_index_view" href="<?php echo site_url('Med/index?date_select=').$date_select; ?>"><?php echo 'หน้าแรก'; ?></a>
                	</li>  
                	<li class="dropdown <?php echo ($this->router->fetch_method() == 'form_med') ? 'active' : ''; ?>">
	                	<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">บันทึกข้อมูลแพทย์ <span class="caret"></span></a>
		                <ul class="dropdown-menu">
							<li class="<?php echo (uri_string() == 'Med/form_med') ? 'active' : ''; ?>">
								<a id="form_med_add" href="<?php echo site_url('Med/form_med?date_select=').$date_select;?>" ><?php echo 'บันทึกรายชื่อแพทย์ออกตรวจ'; ?></a>
							</li>
							<!-- <li class="<?php echo (uri_string() != 'Med/form_med') ? 'active' : ''; ?>"><a id="form_med_edit" href="<?php echo site_url('Med/form_med/').date('Y-m-d'); ?>" ><?php echo 'แก้ไขรายชื่อแพทย์ออกตรวจ'; ?></a></li> -->
		                </ul>
	                </li>
                	<li class="dropdown <?php echo ($this->router->fetch_class()  == 'Appointment') ? 'active' : ''; ?>">
	                	<a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">นัดหมายผู้ป่วย <span class="caret"></span></a>
		                <ul class="dropdown-menu">
							<li class="<?php echo (uri_string() == 'Appointment/index') ? 'active' : ''; ?>"><a id="form_app_add" href="<?php echo site_url('Appointment/index/') . $date_select; ?>" ><?php echo 'บันทึกนัดหมายผู้ป่วย'; ?></a></li>
							<li class="<?php echo (uri_string() == 'Appointment/') ? 'active' : ''; ?>"><a id="form_app_summary" href="<?php echo site_url('Appointment/summary/') . $date_select; ?>" ><?php echo 'สรุปการบันทึกนัดหมาย'; ?></a></li>
							<li class="<?php echo (uri_string() == 'Appointment/') ? 'active' : ''; ?>"><a id="form_app_his" href="<?php echo site_url('Appointment/history/') . $date_select; ?>" ><?php echo 'สรุปนัดหมายแบบแสดงรายชื่อ'; ?></a></li>
							<li class="<?php echo (uri_string() == 'Appointment/') ? 'active' : ''; ?>"><a id="form_app_con" href="<?php echo site_url('Appointment/conclube/') . $date_select; ?>" ><?php echo 'สรุปนัดหมายแบบแสดงรวมยอด'; ?></a></li>
		                </ul>
	                </li>     
                </ul>
                <form class="navbar-form navbar-left" role="search">
	                	<div class="input-group">
				    	<input style="width: 120px;" type="text" class="form-control" id="datepicker-navbar" placeholder="เลือกวันที่" value="<?php echo (@$_REQUEST['date_select'])?@$_REQUEST['date_select']:$this->uri->segment(3)?>">
						<span class="add-on"><i class="icon-th"></i></span>
						<span class="input-group-addon">
							<span class="glyphicon glyphicon-calendar"></span>
						</span>
						<!--
				    	<span class="input-group-addon">
                        	<span class="glyphicon glyphicon-calendar"></span>
                    	</span> 
                    	-->
				    </div>
			    </form>				
                <?php // Nav bar right ?>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)"><?php echo $this->session->userdata('full_name')?></a></li>
					<li><a href="<?php echo site_url('Sessions/logout'); ?>"><span class="fa fa-power-off"></span> ออกจากระบบ</a></li>
                    <!-- <li><button id="session-logout" type="button" class="btn">ออกจากระบบ</button></li> -->
                </ul>
            </div>
        </div>
    </nav>
    
    <div class="container-fluid theme-showcase" role="main" id="result_html" >

    	<?php if (@$content_left):?>

			<div class="container-fluid">
			    <div class="row">
			        <!-- Action panel -->
			        <?php echo $content_left; ?>
			        
			        <!-- Content -->
			        <div class="col-sm-9 page-container" id="result_html">
						<?php echo $content; ?>
			        </div>
			
			    </div>
			</div>

		<?php else:?>

			<?php if ($page_header) : ?>
			
	        <div class="page-header">
				<h2 style="font-size: 26px;"><?php echo $page_header; ?>
					<?php if (@$form_search):?>
					<?php $this->load->view('Appointment/form_search');?>
					<?php endif;?>
				</h2>
				<!-- <div class="panel-title pull-left">
					<h2 style="font-size: 26px;"><?php echo $page_header; ?></h2>
				</div>	
						
				<div class="panel-title pull-right">
				
					<form class="form-inline">
						<div class="input-group">
							<input type="text" class="form-control" id="search_hn" name="search_hn" placeholder="ค้นหา">
							<div class="input-group-btn">
							  <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
							</div>
						</div>
					</form>
					
				</div>-->
				
				<!--<div class="clearfix"></div>-->
				
	        </div>
			<?php endif;?>

			<?php echo $content; ?>
			<?php echo (@$content_footer)?$content_footer:NULL; ?>

		<?php endif;?>

	</div>
    <?php // Footer ?>
    
    <div id="window-add" class="easyui-window" title="นัดหมายผู้ป่วย" data-options="modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,iconCls:'icon-save'" style="width:50%;height:500px;padding:30px;position:relative;"></div>
	
	<footer class="fixed-bottom" style="background-color: #f5f5f5;bottom: 0;text-align: center;height: 30px;width: 100%;position: fixed;">
      <div class="container">
        <span class="text-muted">
        	 หน้าเว็บแสดงผลใน <strong>{elapsed_time}</strong> วินาที | <?php echo $this->settings->site_name_med; ?> v<?php echo $this->settings->site_version; ?>
        </span>
      </div>
    </footer>

    <?php // Javascript files ?>
    <?php if (isset($js_files) && is_array($js_files)) : ?>
        <?php foreach ($js_files as $js) : ?>
            <?php if ( ! is_null($js)) : ?>
                <?php echo "\n"; ?><script type="text/javascript" src="<?php echo $js; ?>" charset="UTF-8"></script><?php echo "\n"; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    <?php endif; ?>
    <?php if (isset($js_files_i18n) && is_array($js_files_i18n)) : ?>
        <?php foreach ($js_files_i18n as $js) : ?>
            <?php if ( ! is_null($js)) : ?>
                <?php echo "\n"; ?><script type="text/javascript"><?php echo "\n" . $js . "\n"; ?></script><?php echo "\n"; ?>
            <?php endif; ?>
        <?php endforeach; ?>
    <?php endif; ?>

<script type="text/javascript">
	
//alert('<?php echo uri_string()?>');
var fetch_class  = '<?php echo $this->router->fetch_class()?>';
var fetch_method = '<?php echo $this->router->fetch_method()?>';
var datepicker_navbar;
var dhxWins;

function formatDate(date) {

	var monthNames = ["01","02","03","04","05","06","07","08","09","10","11","12"];

  	var day   = date.getDate();
  	var month = date.getMonth();
  	var year  = date.getFullYear();

  return year + '-' + monthNames[month-1] + '-' + day;
}

function get_history(date_select) {
		
	$.ajax({
			type: 'POST',
			url: '<?php echo site_url('Appointment/history/');?>' + date_select,
			dataType : 'html',
			data: {date_select : date_select, is_ajax : true},
			beforeSend: function(){			
				waitingDialog.show('กรุณารอสักครู่...');						     
		   	},
		   	success: function(data) {
			   	
		        $('#result_html').html(data);
		        
		        waitingDialog.hide();

		    }
	 	});
}
	
</script>

<script type="text/javascript">

var explode = function(){
	
  $("div.alert").remove();
  
};

setTimeout(explode, 5000);

$('body').confirmation({
	title : 'คุณแน่ใจที่จะยกเลิกใช่หรือไม่?',
    selector : '[data-toggle="confirmation"]',
    btnOkLabel : 'แน่ใจ',
    btnCancelLabel : 'ยกเลิก'
});

$('#check_out_date').datepicker({
	format: 'yyyy-mm-dd',
	autoclose:true,
	language:'th',
	todayBtn: "linked",
});

setInterval(function(){
	
	var url_check_session = '<?php echo site_url('Sessions/check_session')?>';

	$.get(url_check_session, function(responseText) {
				
		if (responseText == "FALSE") {
			
			window.location = 'http://<?php echo $_SERVER['SERVER_ADDR']?>/nano';
		}
	});
	
}, 60000);

$(function () {	

	var datepicker_navbar = $('#datepicker-navbar').datepicker({
		language:"th",
		format:"yyyy-mm-dd",
		todayBtn: "linked",
		autoclose:true
	}).on('changeDate', function(e){

		var value = $('#datepicker-navbar').datepicker('getFormattedDate');
		
		$('#form_index_view').attr("href", '<?php echo site_url('Med/index?date_select=');?>' + value);
		$('#form_med_add').attr("href", '<?php echo site_url('Med/form_med?date_select=');?>' + value);
		$('#form_med_edit').attr("href",'<?php echo site_url('Med/form_med/');?>' + value);	
		
		$('#form_app_add').attr("href", '<?php echo site_url('Appointment/index/');?>' + value);
		$('#form_app_summary').attr("href", '<?php echo site_url('Appointment/summary/');?>' + value);
		$('#form_app_his').attr("href", '<?php echo site_url('Appointment/history/');?>' + value);
		$('#form_app_con').attr("href", '<?php echo site_url('Appointment/conclube/');?>' + value);
		
		
		if (fetch_class == 'Med' && fetch_method == 'index') {			
			get_ajax_data ('<?php echo site_url('Med/index');?>', value);
		}
		else if (fetch_class == 'Appointment' && fetch_method == 'index') {
			window.location = '<?php echo site_url('Appointment/index/');?>' + value;//'http://<?php echo $_SERVER['SERVER_ADDR']?>/nano';	
			//get_ajax_data ('<?php //echo site_url('Appointment/index');?>', value);
		}
		else if (fetch_class == 'Appointment' && fetch_method == 'summary') {			
			get_ajax_data ('<?php echo site_url('Appointment/summary');?>', value);
		}
		else if (fetch_class == 'Appointment' && fetch_method == 'history') {			
			get_ajax_data ('<?php echo site_url('Appointment/history');?>', value);
		}
		else if (fetch_class == 'Appointment' && fetch_method == 'conclube') {			
			get_ajax_data ('<?php echo site_url('Appointment/conclube');?>', value);
		}
				
	});
});

function get_ajax_data(site_url, jdate) {
		
	$.ajax({
		type: 'POST',
		url: site_url + '/' + jdate,
		data: {date_select: jdate, is_ajax : true},
		beforeSend: function(){			
			waitingDialog.show('กรุณารอสักครู่...');						     
	   	},
	   	success: function(data) {		   	
	        $('#result_html').html(data);	        
	        waitingDialog.hide();
	    }
 	});
}

function appointmentEdit(appointment_id, patient_name) {

	appointment_id = (appointment_id == undefined || appointment_id == "null") ? -1 : appointment_id;
	
	formData = [
				{type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120},
				{type: "block", inputWidth: "auto", offsetTop: 12, list: [
					{type: "input", label: "Login", value: "p_rossi"},
					{type: "password", label: "Password", value: "123"},
					{type: "checkbox", label: "Remember me", checked: true},
					{type: "button", value: "Proceed", offsetLeft: 70, offsetTop: 14}
				]}
			];
	
	dhxWins = new dhtmlXWindows();

	winAppointment = dhxWins.createWindow("winAppointment", 295, 100, "60%", 650);
	winAppointment.setText("บันทีกนัดหมาย");
	winAppointment.button("park").hide();
	winAppointment.button("minmax").hide();
	winAppointment.setModal(true);
	//winAppointment.attachURL('<?php //echo site_url("Appointment/form/")?>' + appointment_id, false, {vn_id:vn_id ,queue_id:queue_id, patient_name:patient_name, date_select:'<?php echo $this->input->get_post('date_select')?>'});
	winAppointment.attachURL('<?php echo site_url("Appointment/form/")?>' + appointment_id + '?patient_name=' + patient_name+'&edit=true');
	//myForm = winAppointment.attachForm(formData, true);
	
	$("#btn_to_top").trigger("click");
}

var viewportwidth = document.documentElement.clientWidth;
var viewportheight = document.documentElement.clientHeight;

var appointmentPrint = function (appointment_id) {
	
	var url = '<?php echo site_url("Appointment/print_app/")?>' + appointment_id;
	
	//alert(url)
	
	if ('<?php echo $this->config->item('print_preview');?>' == "FALSE") {
		
		//$("#print_appointment").attr("src", url);
		
		document.getElementById("print_appointment").src = url;
	}
	else {
		
		window.resizeBy(-300,0);
		window.moveTo(0,0);

		//window.open(url, "_blank", "width=300,left="+(viewportwidth-300)+",top=0");
		
		window.open(url, "_blank", "toolbar=no, scrollbars=yes, resizable=no, left=0, top=0, width=800, height=450");
			
		//window.open(url + '?close_page=true', '_blank');
	}

}

$(function () {
	/*
	$(window).on("scroll", function() {
		
		var scrollHeight = $(document).height();
		var scrollPosition = $(window).height() + $(window).scrollTop();
		
		//alert(scrollPosition);
		
		if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
			// when scroll to bottom of the page
		}
	});*/
	
	$(window).scroll(function() {
		
		var scrollHeight    = $(document).height();		
	    var scrollPosition  = $(window).height() + $(window).scrollTop();
	    
	    var checkDisplayBut = (scrollHeight - scrollPosition) / scrollHeight;
	    
	    if (checkDisplayBut.toFixed(2) <= 0.78) {
		    
		    //alert(checkDisplayBut.toFixed(2) + " < 0.87");
		    
	        $('#btn_to_top').fadeIn();
	    } 
	    else {
		    
	        $('#btn_to_top').fadeOut();
	    }
	});

	$("#btn_to_top").click(function(event) {
		
	    event.preventDefault();
		
	    $("html, body").animate({ scrollTop: 0 }, "slow");
		
	    return false;
	});
});   
	
$("#input_search").keydown(function(event){
	// on Enter
    if(event.keyCode == 13){

        //alert($('#input_search').val());
	    
	    if(!searchHtmlHighlight($('#input_search').val(), 'body', 'highlighted', true)) {
	    	
	        alert("ไม่พบผลลัพธ์");
	    }
	}
});

$("#searchButton").click(function(event) {
	
	//alert($('#input_search').val());
			
    event.preventDefault();
    
    if(!searchHtmlHighlight($('#input_search').val(), 'body', 'highlighted', true)) {
    	
        alert("ไม่พบผลลัพธ์");
    }
	
    //$(".highlighted").removeClass("highlighted").removeClass("match");
    
    //if (searchHighlight($('#input_search').val())) {
	    
        
    //}
    //else {
	    
	    //alert("ไม่พบผลลัพธ์");
    //}
});

</script>
<iframe id="print_appointment" width="0" height="0" src=""></iframe>
<button id="btn_to_top" title="ไปที่ด้านบนสุด">ไปที่ด้านบนสุด</button>
</body>
</html>
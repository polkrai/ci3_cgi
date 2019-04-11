<?php defined('BASEPATH') OR exit('No direct script access allowed');?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" type="image/x-icon" href="/favicon.ico?v=<?php echo $this->settings->site_version; ?>">
	<link rel="icon" type="image/x-icon" href="/favicon.ico?v=<?php echo $this->settings->site_version; ?>">
    <title><?php echo $page_title; ?> - <?php echo $this->settings->site_name; ?></title>

    <?php // CSS files ?>
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
</head>
<body>

    <?php // Fixed navbar ?>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only"><?php echo 'สลับการนำทาง'; ?></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="<?php echo site_url('Cgi/index'); ?>"><?php echo $this->settings->site_name; ?></a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <?php // Nav bar left ?>
                <ul class="nav navbar-nav">	
                    <li class="<?php echo (uri_string() == 'Cgi/search') ? 'active' : ''; ?>"><a href="<?php echo site_url('Cgi/search'); ?>"><?php echo 'ค้นหา'; ?></a></li>
                    <?php if ($this->session->userdata('is_physician')) :?>
					<li class="<?php echo (uri_string() == 'Cgi/physician') ? 'active' : ''; ?>"><a href="<?php echo site_url('Cgi/physician'); ?>"><?php echo 'บันทึกแบบประเมิน'; ?></a></li>
					<?php else :?>
					<li class="<?php echo (uri_string() == 'Cgi' OR uri_string() == 'Cgi/index') ? 'active' : ''; ?>"><a href="<?php echo site_url('Cgi'); ?>"><?php echo 'หน้าแรก'; ?></a></li>
					<?php endif;?>
					<li class="<?php echo (uri_string() == 'Cgi/Report' OR uri_string() == 'Cgi/Report/index') ? 'active' : ''; ?>"><a href="<?php echo site_url('Cgi/Report'); ?>"><?php echo 'รายงาน'; ?></a></li>
                   
                </ul>
                <?php // Nav bar right ?>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="javascript:void(0)"><?php echo $this->session->userdata('full_name')?></a></li>
					<li><a href="<?php echo site_url('Sessions/logout'); ?>"><span class="fa fa-power-off"></span> ออกจากระบบ</a></li>
                    <!-- <li><button id="session-logout" type="button" class="btn">ออกจากระบบ</button></li> -->
                </ul>
            </div>
        </div>
    </nav>

    <?php // Main body ?>
    <div class="container-fluid theme-showcase" role="main">

        <?php if ($page_header) : ?>
        <div class="page-header">
            <h2 style="font-size: 26px;"><?php echo $page_header; ?></h2>
        </div>
		<?php endif;?>
        <?php // System messages ?>
        <?php if ($this->session->flashdata('message')) : ?>
            <div class="alert alert-success alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <?php echo $this->session->flashdata('message'); ?>
            </div>
        <?php elseif ($this->session->flashdata('error')) : ?>
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <?php echo $this->session->flashdata('error'); ?>
            </div>
        <?php elseif (validation_errors()) : ?>
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <?php echo validation_errors(); ?>
            </div>
        <?php elseif ($this->error) : ?>
            <div class="alert alert-danger alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <?php echo $this->error; ?>
            </div>
        <?php endif; ?>

        <?php // Main content ?>
        <?php echo $content; ?>
        
    </div>

    <?php // Footer ?>
    
    <footer class="footer" style="background-color: #f5f5f5;bottom: 0;text-align: center;height: 60px;width: 100%;line-height: 60px;position: absolute;">
      <div class="container">
        <span class="text-muted">
        	 หน้าเว็บแสดงผลใน <strong>{elapsed_time}</strong> วินาที
                | <?php echo $this->settings->site_name; ?> v<?php echo $this->settings->site_version; ?>
        </span>
      </div>
    </footer>
    
    <!-- <footer class="sticky-footer">
        <div class="container">
            <p class="text-muted">
				 หน้าเว็บแสดงผลใน <strong>{elapsed_time}</strong> วินาที
                | <?php echo $this->settings->site_name; ?> v<?php echo $this->settings->site_version; ?>
            </p>
        </div>
    </footer> -->

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

var explode = function(){
	
  $( "div.alert" ).remove();
  
};

setTimeout(explode, 5000);

$('#start_date').datepicker({
	format: 'yyyy-mm-dd',
	autoclose:true,
	language:'th'
});

$('#end_date').datepicker({
	format: 'yyyy-mm-dd',
	autoclose:true,
	language:'th'
});

$('#created_date').datepicker({
	format: 'yyyy-mm-dd',
	autoclose:true,
	language:'th'
});
/*
$('#clinic').multiselect({
	nonSelectedText: 'เลือกคลินิก'
});*/

</script>

</body>
</html>

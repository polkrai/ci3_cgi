
	<title><?php echo $title; ?></title> 
	
</head> 
<body>
	

	<div data-role="page" data-add-back-btn="true">

		<div data-role="header">
			<h1><?php echo @$heading?></h1>
			<a href="/" data-icon="home" class="ui-btn-right">Home</a>
		</div><!-- /header -->

		<div data-role="content">	

			<form action="<?php echo BASE_URL?>index.php/Answers/search"><input type="search" placeholder="Search" name="phrase" x-webkit-speech onwebkitspeechchange="this.form.submit();"></form>	
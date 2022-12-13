<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>FAQs API</title>

<style type="text/css">

body {
 background-color: #fff;
 margin: 40px;
 font-family: Lucida Grande, Verdana, Sans-serif;
 font-size: 14px;
 color: #4F5155;
}

a {
 color: #003399;
 background-color: transparent;
 font-weight: normal;
}

h1 {
 color: #444;
 background-color: transparent;
 border-bottom: 1px solid #D0D0D0;
 font-size: 16px;
 font-weight: bold;
 margin: 24px 0 2px 0;
 padding: 5px 0 6px 0;
}

code {
 font-family: Monaco, Verdana, Sans-serif;
 font-size: 12px;
 background-color: #f9f9f9;
 border: 1px solid #D0D0D0;
 color: #002166;
 display: block;
 margin: 14px 0 14px 0;
 padding: 12px 10px 12px 10px;
}

</style>
</head>
<body>

<h1>Welcome to the experimental FAQs API</h1>

<h1>Formats</h1>

<p>
	The default format returned is <strong>json</strong>, but <strong>xml</strong> and <strong>csv</strong> are also supported. You can specify the format by 
	appending the format extension after the resource, eg getting xml for answers would be "/api/answers.xml" 
	or you can specify format as another query parameter, eg "/api/answers?format=xml"
</p>	

<h1>Methods &amp; Resources</h1>

<h2>Answers</h2>
<pre>URL: <?php echo $website_root ?>/api/answers</pre>

<p>Parameters</p>

<ul>
	<li><strong>topic</strong> This will list Answers for the given topic</li>
	<li><strong>sub_topic</strong> This will list Answers for the given sub-topic (meant to be used with the topic parameter)</li>
	
	<li><strong>id</strong> This FAQ Answer ID</li>
	<li><strong>search</strong> This will provide a keyword search for Answers</li>
</ul>

<h3>Example Calls</h3>
<p>
	<a href="<?php echo $website_root ?>/api/answers?topic=Reference+and+General+Government"><?php echo $website_root ?>/api/answers?topic=Reference+and+General+Government</a>
</p>
<p>
	<a href="<?php echo $website_root ?>/api/answers?topic=Reference+and+General+Government&amp;sub_topic=Agencies"><?php echo $website_root ?>/api/answers?topic=Reference+and+General+Government&amp;sub_topic=Agencies</a>
</p>

<p>
	<a href="<?php echo $website_root ?>/api/answers?id=2139"><?php echo $website_root ?>/api/answers?id=2139</a>
</p>
<p>
	<a href="<?php echo $website_root ?>/api/answers?search=Passports"><?php echo $website_root ?>/api/answers?search=Passports</a>
</p>



<h2>Topics</h2>
<pre>URL: <?php echo $website_root ?>/api/topic</pre>

<p>Parameters</p>

<ul>
	<li><strong>name</strong> List all sub topics for a given topic</li>
	<li><strong>faq_id</strong> List all topics/sub-topics for a given FAQ, specified by the FAQ ID</li>
</ul>



<h3>Example Calls</h3>

<p>
	<a href="<?php echo $website_root ?>/api/topic"><?php echo $website_root ?>/api/topic</a>
</p>
<p>
	<a href="<?php echo $website_root ?>/api/topic?name=Reference+and+General+Government"><?php echo $website_root ?>/api/topic?name=Reference+and+General+Government</a>
</p>

<p>
	<a href="<?php echo $website_root ?>/api/topic?faq_id=2139"><?php echo $website_root ?>/api/topic?faq_id=2139</a>
</p>

	


<?php
if (isset($ganalytics_id)):
?>

	<script type="text/javascript">

	  var _gaq = _gaq || [];
	  _gaq.push(['_setAccount', '<?php echo $ganalytics_id;?>']);
	  _gaq.push(['_trackPageview']);

	  (function() {
	    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	  })();

	</script>


	<?php
	endif;		
	?>

</body>
</html>
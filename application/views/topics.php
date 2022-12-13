<?php include 'header_meta_inc_view.php';?>
  
	<?php

	if(!empty($subtopics[0]['topic'])) $heading = $subtopics[0]['topic'];

	$title = (!empty($heading)) ? $heading : 'FAQs';
	$heading = $title;

	?>


	<?php include 'header_inc_view.php';?>

		
		<?php

		if(!empty($topics)) {		

			echo '<ul data-role="listview" data-inset="true" data-divider-theme="b">';
			echo '<li data-role="list-divider">Topics</li>';


			foreach ($topics as $topic) {


				$url = urlencode($topic['topic']);
				echo '<li><a href="/topics/subtopics?name=' . $url . '">' . $topic['topic'] . '</a></li>';

			}

		echo '</ul>';

		}
		?>		

	
	</div><!-- /content -->

</div><!-- /page -->



    
<?php include 'footer_inc_view.php';?>
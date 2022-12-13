<?php include 'header_meta_inc_view.php';?>
  
	<?php

	if(!empty($subtopics[0]['topic'])) $heading = $subtopics[0]['topic'];

	$title = $heading;

	?>

	<?php include 'header_inc_view.php';?>

		
		<?php


		if(!empty($subtopics)) {		

			echo '<ul data-role="listview" data-inset="true" data-divider-theme="b">';

			echo '<li data-role="list-divider">Sub-topics for ' . $heading . '</li>';

			foreach ($subtopics as $subtopic) {

				if(!empty($subtopic['sub_topic'])) {
				
					$subtopic_url = urlencode($subtopic['sub_topic']);
					$topic_url = urlencode($subtopic['topic']);				
					echo '<li><a href="/answers/topic/?name=' . $topic_url . '&sub_topic=' . $subtopic_url . '">' . $subtopic['sub_topic'] . '</a></li>';
				
					
				}
								
			}

		echo '</ul>';
		
		echo '<a href="/answers/topic?name=' . urlencode($subtopics[0]['topic']) . '" data-theme="b" data-icon="arrow-l" data-role="button">All FAQs for ' . $subtopics[0]['topic'] . '</a>';
		

		}
		?>		

	
	</div><!-- /content -->

</div><!-- /page -->



    
<?php include 'footer_inc_view.php';?>
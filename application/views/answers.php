<?php include 'header_meta_inc_view.php';?>
  
    
<?php

if(!empty($search)) {
	
	$heading = 'Search: ' . $search;
}

else if(!empty($answers[0]['topic'])) {

	$heading = $answers[0]['topic'];
	
	if (!empty($answers[0]['sub_topic'])) $heading = $answers[0]['sub_topic'] . ' &bull; ' . $heading;
}

else if(!empty($answer['question'])) $heading = $answer['question'];


$title = $heading;

?>

<?php include 'header_inc_view.php';?>

		
		<?php


	
		if(!empty($answers)) {		

			echo '<ul data-role="listview" data-inset="true" data-divider-theme="b">';

			echo '<li data-role="list-divider">Entries for ' . $heading . '</li>';

			foreach ($answers as $answer) {

			echo '<li><a href="'.BASE_URL.'index.php/Answers/' . $answer['faq_id'] . '">' . $answer['question'] . '</a></li>';

			}

			echo '</ul>';
			$answer = null;
		}
		
		
	  if(!empty($answer)) {		

	  	echo "<h3>{$answer['question']}</h3>";

		echo '<div class="ui-body ui-body-d ui-corner-all">';
	  	echo $answer['answer_html'];	

		echo '<p style="font-style : italic; color : #ccc">Last Updated: ';
	  	echo date("F j, Y, g:ia", strtotime($answer['last_updated']));	
		echo '</p>';


		echo '</div>';
	


		if(!empty($topics)) {		

			echo '<ul data-role="listview" data-inset="true" data-theme="c" data-divider-theme="b">';
			echo '<li data-role="list-divider">Topics for this Entry</li>';

			foreach ($topics as $topic) {
				
				$heading = $topic['topic'];
				if (!empty($topic['sub_topic'])) $heading = $heading . ' &bull; ' . $topic['sub_topic'];				
				
				$url = '/answers/topic/?name=' . urlencode($topic['topic']);
				if(!empty($topic['sub_topic'])) $url = $url . '&sub_topic=' . urlencode($topic['sub_topic']);				
				

				echo '<li><a href="' . $url . '">' . $heading . '</a></li>';
				
				$url = null;
				$heading = null;

			}

			echo '</ul>';
		}		
		
		
		
		// echo '<a href="/topics/subtopics/?name=' . urlencode($answer['topic']) . '" data-theme="b" data-icon="arrow-l" data-role="button">' . $answer['topic'] . '</a>';
	
	
		}	
		
		if(!empty($error))	{
			
		  	echo "<h3>{$error[0]}</h3>";
				
			
		}
		
		?>		

	
	</div><!-- /content -->

</div><!-- /page -->



    
<?php include 'footer_inc_view.php';?>
<?php
//require APPPATH.'/libraries/REST_Controller.php';

class Api extends REST_Controller {

	public function index_get()
	{
		$data = array();
		
		// See if we have google analytics tracking code
		if($this->config->item('ganalytics_id')) {
			$data['ganalytics_id'] = $this->config->item('ganalytics_id');
		}		
		
		
		if($this->config->item('website_root')) {
			$data['website_root'] = $this->config->item('website_root');
		}	
		
		
		$this->load->view('api_docs', $data);
	}

	public function topic_interlink(&$topics) {
			
		$topics['api_topic'] = $this->config->item('website_root') . '/api/topic?name=' . urlencode($topics['topic']);
		
		if(!empty($topics['sub_topic'])) {
			$topics['api_answers'] = $this->config->item('website_root') . '/api/answers?topic=' . urlencode($topics['topic']) . '&sub_topic=' . urlencode($topics['sub_topic']);
		} else {
			$topics['api_answers'] = $this->config->item('website_root') . '/api/answers?topic=' . urlencode($topics['topic']);		
		}
			
	}


	public function answer_interlink(&$answers) {
			
			
		$answers['api_topic'] = $this->config->item('website_root') . '/api/topic?name=' . urlencode($answers['topic']);
			
		if(!empty($answers['sub_topic'])) {
			$answers['api_answers'] = $this->config->item('website_root') . '/api/answers?topic=' . urlencode($answers['topic']) . '&sub_topic=' . urlencode($answers['sub_topic']);
		}		
			
		$answers['api_answer'] = $this->config->item('website_root') . '/api/answers?id=' . $answers['faq_id'];
			
	}


	
	public function topic_get() {	

		
		
		if($this->input->get('name', TRUE)) {
			$name = $this->input->get('name', TRUE);					
		}
		
		if($this->input->get('faq_id', TRUE)) {
			$faq_id = $this->input->get('faq_id', TRUE);					
		}		
						
		if(!empty($name)) {
								
				$search = array('topic' => $name);
								
				$this->db->select('topic, sub_topic');			
				$this->db->distinct();
				$query = $this->db->get_where('taxonomy', $search);								
			
				$results = $query->result_array();
				
				array_walk($results, array($this, 'topic_interlink'));
			
				if(!empty($results)) {
					return	$this->response($results, 200);
				} else {
					$response = array('error' => "No topic named $taxonomy found");
					return $this->response($response, 400);
				}
		} 
		elseif(!empty($faq_id)) {
		
			$search = array('faq_id' => $faq_id);
							
			$this->db->select('topic, sub_topic');			
			$this->db->distinct();
			$query = $this->db->get_where('taxonomy', $search);								
		
			$results = $query->result_array();
									
			array_walk($results, array($this, 'topic_interlink'));
		
			if(!empty($results)) {
				return	$this->response($results, 200);
			} else {
				$response = array('error' => "No topics for FAQ ID $faq_id found");
				return $this->response($response, 400);
			}		
			
		} 
		else {

			$this->db->select('topic');			
			$this->db->distinct();
			$query = $this->db->get('taxonomy');

			$results = $query->result_array();			
			array_walk($results, array($this, 'topic_interlink'));			
			
			if($query->num_rows() > 0) {
				return	$this->response($results, 200);
			}			
			
		}


	}
	
	
	public function answers_get() {	

		
		
		if($this->input->get('id', TRUE)) {
			$faq_id = $this->input->get('id', TRUE);					
		}
		
		if($this->input->get('search', TRUE)) {
			$search = $this->input->get('search', TRUE);					
		}
		
		if($this->input->get('topic', TRUE)) {
			$topic = $this->input->get('topic', TRUE);					
		}
		
		if($this->input->get('sub_topic', TRUE)) {
			$sub_topic = $this->input->get('sub_topic', TRUE);					
		}
		
		if($this->input->get('answer', TRUE)) {
			$answer = $this->input->get('answer', TRUE);					
		}						
						
		if(!empty($faq_id)) {
								
				$search = array('answers.faq_id' => $faq_id);
				$this->db->select('answers.*, taxonomy.*');							
				$this->db->group_by('answers.faq_id');
				$this->db->join('taxonomy', 'answers.faq_id = taxonomy.faq_id');				
				
				$query = $this->db->get_where('answers', $search);				

				if($query->num_rows() > 0) {
					return	$this->response($query->result_array(), 200);
				} else {
					$response = array('error' => "No topic named $taxonomy found");
					return $this->response($response, 400);
				}
		}
		if(!empty($search)) {
												
				$this->db->like('answers.answer_text', $search);
				$this->db->or_like('answers.answer_html', $search);
				$this->db->select('answers.faq_id, answers.question, taxonomy.*');		
				$this->db->group_by('answers.faq_id');
				$this->db->join('taxonomy', 'answers.faq_id = taxonomy.faq_id');									
				
				$query = $this->db->get('answers'); 

				$results = $query->result_array();

				array_walk($results, array($this, 'answer_interlink'));				


				if($query->num_rows() > 0) {
					return	$this->response($results, 200);
				} else {
					$response = array('error' => "No topic named $taxonomy found");
					return $this->response($response, 400);
				}
		}
		if(!empty($topic)) {
												
						
				if(!empty($answer) && $answer == 'true') {
					$this->db->select('answers.*, taxonomy.*');							
				}
				else {
					$this->db->select('answers.faq_id, answers.question, taxonomy.*');							
				}		
												

				$this->db->group_by('answers.faq_id');
				$this->db->join('taxonomy', 'answers.faq_id = taxonomy.faq_id');				
				
				// $this->db->limit(10);
				
				$search = array('taxonomy.topic' => $topic);
				if(!empty($sub_topic)) $search['taxonomy.sub_topic'] = $sub_topic;
												
				$query = $this->db->get_where('answers', $search);
				
				// echo $this->db->last_query();
				// exit;
				
				$results = $query->result_array();
				
				array_walk($results, array($this, 'answer_interlink'));				
				
				if($query->num_rows() > 0) {
					return	$this->response($results, 200);
				} else {
					$response = array('error' => "No topic named $taxonomy found");
					return $this->response($response, 400);
				}
		}		
		else {

			$this->db->select('question');			
			$this->db->distinct();
			$query = $this->db->get('answers');
					
			
			if($query->num_rows() > 0) {
				return	$this->response($query->result_array(), 200);
			}			
			
		}


	}	
	
	

public function curl_to_json($url) {
	
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
	curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
	$data=curl_exec($ch);
	curl_close($ch);


	return json_decode($data, true);	
	
}


}


?>
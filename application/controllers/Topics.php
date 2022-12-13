<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Topics extends CI_Controller {

	function __construct()
	{
		parent::__construct();
	}

	function index()
	{
		$this->load->helper('url');
		
		$data = array();

		
		// See if we have google analytics tracking code
		if($this->config->item('ganalytics_id')) {
			$data['ganalytics_id'] = $this->config->item('ganalytics_id');
		}		
				
		
		if($this->config->item('website_root')) {
			$data['website_root'] = $this->config->item('website_root');
		}		
			
			
		$url = $this->config->item('website_root') . '/api/topic';	
		
		$topics = $this->curl_to_json($url);

		$data['topics'] = $topics;
		
		$this->load->view('topics', $data);
	}
	

	function subtopics() {
		
		if($this->input->get('name', TRUE)) {
			$topic = $this->input->get('name', TRUE);					
		}	

		

		$url = $this->config->item('website_root') . '/api/topic?name=' . urlencode($topic);	
		
		$subtopics = $this->curl_to_json($url);

		$data['subtopics'] = $subtopics;
		
		//var_dump($data); exit;
		
		// If there are no subtopics for this topic, point directly to the list of all answers for this topic
		if(count($subtopics) == 1 && empty($subtopics[0]['sub_topic'])) {
			$this->load->helper('url');			
			$redirect = $this->config->item('website_root') . '/answers/topic?name=' . urlencode($topic);
			redirect($redirect);	
		}
		else {
			$this->load->view('subtopics', $data);					
		}

	}
	
	
	
	function curl_to_json($url) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		$data=curl_exec($ch);
		curl_close($ch);


		return json_decode($data, true);	

	}	
	
	
	function post_to_json($url, $custom_headers, $body) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);		
		curl_setopt($ch, CURLOPT_HTTPHEADER, $custom_headers);				
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		$data=curl_exec($ch);
		curl_close($ch);
		return json_decode($data, true);	

	}	
	
}
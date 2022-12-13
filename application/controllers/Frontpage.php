<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Frontpage extends CI_Controller {

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
			
		
		$this->load->view('frontpage', $data);
	}
}

/* End of file welcome.php */
/* Location: ./system/application/controllers/welcome.php */
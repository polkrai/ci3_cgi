<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Create extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->helper(array('pages_creator'));
		//$this->load->library('form_validation');
	}

	public function index()
	{
		create_new_page('test', 'Test', 'Test', TRUE);
	}

}
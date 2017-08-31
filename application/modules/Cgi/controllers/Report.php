<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CGI_Controller {

	public function __construct ()
	{
		parent::__construct();
		
		$this->load->model('mdl_cgi');

	}
	
	public function index () {
		      
        $content_data = array();

        $this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('รายงาน');
		
        $data = $this->includes;

        $data['content'] = $this->load->view('cgi_report', $content_data, TRUE);
		
        $this->load->view($this->template, $data);
		
	}
	
}
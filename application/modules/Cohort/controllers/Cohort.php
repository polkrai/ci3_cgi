<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Cohort extends MX_Controller {

	public function __construct() {
		
        parent::__construct();
		
		$this->load->database(); 
        
        $this->load->library('session');

		//$this->load->model(array('mdl_cgi', 'mdl_cgi_clinic', 'mdl_cgi_score', 'mdl_patient', 'mdl_queue', 'mdl_header', 'mdl_icd10'));

	}

	public function index () {

		//if ($this->session->userdata('is_physician')) {

			//redirect('Cgi/physician');
		//}
		//echo 1;

		$data = array();

		$this->load->view('form_cohort', $data);
	}
	
	public function check_insert ($name, $lname) {
		
		$result = $this->db->get_where ('cohort.cohort_ward', array('name' => $name, 'lname' => $lname, 'create_out' => NULL));
		
		if ($result->num_rows() == 0) {
			
			return TRUE;
		}
		else {
		
			return FALSE;
		}
	
	}
	
	public function insert_data () {
	
		$data = array('message' => NULL);

		if ($this->input->post('submit') && !preg_match("/^[ก-ฮ]+$/",$this->input->post('name')) && !preg_match("/^[ก-ฮ]+$/",$this->input->post('lname')) && $this->input->post('area') && $this->input->post('activity') && $this->input->post('tel') && !$this->input->post('check_out')){
		
			if ($this->check_insert($this->input->post('name'), $this->input->post('lname'))) {
			
				$data = array('name' => $this->input->post('name'),
							  'lname' => $this->input->post('lname'),
							  'area' => $this->input->post('area'),
							  'activity' => $this->input->post('activity'),
							  'tel' => $this->input->post('tel'));
							  
				$this->db->insert('cohort.cohort_ward', $data);
				
				$data = array('message' => 'เข้าตึกสำเร็จ');
			}
			else {
				
				$data = array('message' => 'กรุณาออกจากตึกก่อน');
			}
		}
		else if ($this->input->post('submit') && !preg_match("/^[ก-ฮ]+$/",$this->input->post('name')) && !preg_match("/^[ก-ฮ]+$/",$this->input->post('lname')) && $this->input->post('check_out')){
		
			$data = array('create_out' => date('Y-m-d H:i:s'));
			
			$this->db->where ("id = (SELECT MAX(id) FROM cohort.cohort_ward WHERE name = '{$this->input->post('name')}' AND lname = '{$this->input->post('lname')}')", NULL, FALSE);
			$this->db->update('cohort.cohort_ward', $data, array('name' => $this->input->post('name'), 'lname' => $this->input->post('lname')));
			
			$data = array('message' => ' ออกจากตึกสำเร็จ', 'message_int' => 1);
		}

		

		$this->load->view('form_cohort', $data);
	}
}

<?php defined('BASEPATH') OR exit('No direct script access allowed');

class P4p extends MX_Controller {
	
	//var $default_p4p;

	public function __construct () {
	
		parent::__construct();
		
		//$this->default_p4p = $this->load->database('default_p4p', TRUE); 
		
		$this->load->helper(array('url', 'file', 'directory', 'string', 'html', 'asset', 'form', 'uri', 'pager', 'trans'));

		$this->load->library('form_validation');
	}
	
	public function index() {
		
		$data = array();
		
		$data['per_month'] = $options = array(
							 "01"=>"มกราคม",
							 "02"=>"กุมภาพันธ์",
							 "03"=>"มีนาคม",
							 "04"=>"เมษายน",
							 "05"=>"พฤษภาคม",
							 "06"=>"มิถุนายน",
							 "07"=>"กรกฏาคม",
							 "08"=>"สิงหาคม",
							 "09"=>"กันยายน",
							 "10"=>"ตุลาคม",
							 "11"=>"พฤศจิกายน",
							 "12"=>"ธันวาคม"
							);
		
		$d = (date('Y')+543)-6;
						
		for ($i=$d;$i<=($d+10);$i++) {
			
			$year[$i] = $i;
		}
						
		$data['per_year'] = $year;
		
		
		$this->load->view('form_select_mount', $data);
	}
	
	public function select_performant ($person = NULL) {
		
		$person = ($this->input->get_post('person'))?$this->input->get_post('person'):$person;

		$per_month= ($this->input->get_post('per_month'))?$this->input->get_post('per_month'):date('m');
		$per_year = ($this->input->get_post('per_year'))?$this->input->get_post('per_year'):date('Y')+543;
		
		$default_p4p = $this->load->database('default_p4p', TRUE);

		$default_p4p->select ('`per_id`, `per_no`, `person_id`, `office_id`, `title_id`,`minor_id`, `group_id`, `brand_id`, `subone_id`, `per_count`, SUBSTR(`per_date`, 1, 5) AS `per_date`, `per_month`, `per_year`, `job_id`, `shift_id`, `per_check`, `ward_id`');
		
		$query = $default_p4p->get_where ('performant', array ('person_id' => $person, 'per_month' => $per_month, 'per_year' => $per_year));
		
		//echo $sql_insert;exit();
		
		//header("Content-type: application/json; charset=utf-8");
		
		//echo json_encode($query->result_array());
		
		$this->insert_performant($query);
	}
	
	public function insert_performant($query) {
		
		//$per_date = ($this->input->get_post('per_date'))?$this->input->get_post('per_date'):date('d-m-').(date('Y')+543);
	
		$to_year  = ($this->input->get_post('to_year'))?$this->input->get_post('to_year'):date('Y')+543;
		$to_month = ($this->input->get_post('to_month'))?$this->input->get_post('to_month'):date('m');

		$default_p4p = $this->load->database('default_p4p', TRUE);
		
		foreach ($query->result() as $row) {
			
			$per_date_arr = explode('-', $row->per_date);
			
			$per_date = "{$per_date_arr[0]}-{$to_month}-$to_year";
		
			$sql_insert = "INSERT INTO `performant` (`per_id`, `per_no`, `person_id`, `office_id`, `title_id`, `minor_id`, `group_id`, `brand_id`, `subone_id`, `per_count`, `per_date`, `per_month`, `per_year`, `job_id`, `shift_id`, `per_check`, `ward_id`) 
						   VALUES ('{$this->gen_pk($to_year, false)}', 
								   '{$this->gen_pk($to_year)}', 
								   '{$row->person_id}', 
								   '{$row->office_id}',
								   '{$row->title_id}',
								   '{$row->minor_id}', 
								   '{$row->group_id}', 
								   '{$row->brand_id}',
								   '{$row->subone_id}', 
								   '{$row->per_count}', 
								   '{$per_date}',
								   '{$to_month}', 
								   '{$to_year}', 
								   '{$row->job_id}', 
								   '{$row->shift_id}', 
								   '{$row->per_check}', 
								   '{$row->ward_id}')";
			//echo $sql_insert;exit();
						   
			$result = $default_p4p->query($sql_insert);
			
			if ($result) {
				
				//echo $default_p4p->insert_id() . "<br />\n";
				echo $sql_insert . "<br />\n";
		
			}
			else {
				
				echo $sql_insert;exit(); 
			}
		}
		
		                                                                                                                                                                                                                                                                                                                                                           
	}
	
	public function gen_pk ($to_year = NULL, $per_no = true) {
		
		$default_p4p = $this->load->database('default_p4p', TRUE);

		$default_p4p->select ('per_no, MAX(per_no) + 1 AS max_per_no');
		$default_p4p->group_by ('per_no');
		$default_p4p->order_by ('per_no', 'DESC');
		
		$query = $default_p4p->get('performant', 1);
		
		$row = $query->row();
		
		$per_no_sum = $row->max_per_no + 1;
		
		if ($per_no) {
			
			return $per_no_sum;
		}
		else {
			
			return $per_no_sum . "-" . $to_year;
		}
	}

}

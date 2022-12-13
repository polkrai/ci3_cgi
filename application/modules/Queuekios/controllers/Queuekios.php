<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Queuekios extends CI_Controller {

	public function __construct ()
	{
		parent::__construct();
		
		$this->load->database();
		
		$this->load->library(array('session'));

		$this->load->model(array('mdl_queuekios'));

	}

	public function index ($date_select = NULL) {

		echo $this->input->get_post ('cid');
	}

	public function form_kios ($queuekios_id = NULL) {


		if ($this->mdl_queuekios->run_validation()) {

			$last_id = $this->mdl_queuekios->save($queuekios_id);

			echo $last_id;

			exit();

        }

        $this->load->view('form_kios');
	}

	public function view_kios ($queuekios_id = NULL) {

		$data['rows'] = $this->mdl_queuekios->get()->result();

		$this->load->view('view_kios', $data);
	}
	
	public function get_remed () {

		$hn = $this->input->get_post ('hn');
		
		$query = $this->db->get_where('medrec.nano_patient', array('hn' => $hn));
		
		$row = $query->row(); 
		
		$fields = "pa_id={$row->id}&id_sess=" . $this->session->userdata('id_sess');
		
		$curl = curl_init();
		
		curl_setopt($curl, CURLOPT_URL, "http://{$_SERVER['SERVER_NAME']}/jitavej/order/checkremed");
	
		curl_setopt($curl, CURLOPT_POST, 1);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		curl_setopt($curl, CURLOPT_POSTFIELDS, $fields);
		
		echo $response = curl_exec($curl);

		curl_close($curl);
		
	}

}

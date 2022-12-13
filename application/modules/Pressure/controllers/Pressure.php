<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Pressure extends CI_Controller {


	public function __construct ()
	{
		parent::__construct();
		
		$this->load->database();
		
		$this->load->library('format');
		
		$this->load->helper('url','file','form');

	}
	
	public function get_hn ($patient_id) {
	
		if(strlen($patient_id) == '13') {
			
			$this->db->select ('visit.vn, visit.hn');
			$this->db->join ('medrec.nano_patient AS patient', 'patient.id = visit.id_patient');
			$this->db->order_by ('visit.id DESC');
			$this->db->limit ('1');
			$result = $this->db->get_where ('medrec.nano_visit AS visit', array('patient.pa_people_number' => $patient_id));
		}
		else {
		
			$this->db->select ('visit.vn, visit.hn');
			$this->db->join ('medrec.nano_patient AS patient', 'patient.id = visit.id_patient');
			$this->db->order_by ('visit.id DESC');
			$this->db->limit ('1');

			$result = $this->db->get_where ('medrec.nano_visit AS visit', array('visit.hn' => $patient_id));
		}
		
		return $result->row();
	}
	
	public function form ($id = NULL) {
		
		$date_update = date('Y-m-d');
		
		$json = file_get_contents('php://input');
		
		$decode_data = json_decode($json);
		
		//echo $decode_data->results[1]->value;exit();
		
		$data_return = $this->get_hn($decode_data->patient_id);

		$sql_check = "SELECT auto_id FROM filter.mi_filter WHERE hn = '{$data_return->hn}' AND vn = '$data_return->vn'";
		
		//echo $sql_check;exit();

		$query = $this->db->query($sql_check);

		$result = FALSE;

		$data_sys = array('hn'		  => $data_return->hn,
						  'vn'		  => $data_return->vn,
						  'diag_date' => $date_update,			
						  'hr'		  => $decode_data->results[1]->value,
						  'pressure'  => "{$decode_data->results[0]->value}/{$decode_data->results[2]->value}",
						  'systolic'  => $decode_data->results[0]->value,
						  'diastolic' => $decode_data->results[2]->value);

		$data_bmi = array('hn'		  => $data_return->hn,
						  'vn'		  => $data_return->vn,
						  'diag_date' => $date_update,
						  'weight'	  => $decode_data->results[1]->value,
						  'height'    => $decode_data->results[2]->value,
						  'bmi'       => $decode_data->results[0]->value);
		
		if ($decode_data->results[0]->name == "SYSTOLIC") {
		
			if ($query->num_rows() == 0) {
						  
				$this->db->insert('filter.mi_filter', $data_sys);

				//$result = $this->db->insert_id();
			
				$result = TRUE;
			}
			else {

				$this->db->where ('hn', $data_return->hn);
				$this->db->where ("to_char(date_insert, 'YYYY-MM-DD') = '{$date_update}'");
				$this->db->where ("auto_id IN(SELECT MAX(auto_id) FROM filter.mi_filter WHERE hn = '{$data_return->hn}')");
				
				$result = $this->db->update('filter.mi_filter', $data_sys);
			}
			
		}

		if ($decode_data->results[0]->name == "BMI") {
			
			if ($query->num_rows() == 0) {
						  
				$this->db->insert('filter.mi_filter', $data_bmi);
			}
			else {

				$this->db->where ('hn', $data_return->hn);
				$this->db->where ("to_char(date_insert, 'YYYY-MM-DD') = '{$date_update}'");
				$this->db->where ("auto_id IN(SELECT MAX(auto_id) FROM filter.mi_filter WHERE hn = '{$data_return->hn}')");
				
				$result = $this->db->update('filter.mi_filter', $data_bmi);
			}
		}
		
		//echo $result;
		
		$data_return = array();
		
		if ($result OR $result == '1') {
		
			//header('Content-Type: application/json');
			
			$data_return['statusCode'] = '200';
		
			echo json_encode($data_return);
		}
		else {
		
			//header('Content-Type: application/json');
			
			$data_return['statusCode'] = '500';
		
			echo json_encode($data_return);
		}
	}
	
	/**
     * Get All Data from this method.
     *
     * @return Response
    */
	public function index_get($id = 0)
	{
        if(!empty($id)){
		
            $data = $this->db->get_where("filter.mi_filter", array('id' => $id))->row_array();
        }
		else{
		
            $data = $this->db->get_where("filter.mi_filter", array('deleted' => 'false'))->result();
        }
     
        $this->response($data, REST_Controller::HTTP_OK);
	}
      
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function index_post()
    {
        $input = $this->input->post();
		
        $this->db->insert('filter.mi_filter', $input);
     
        $this->response(array('Item created successfully.'), REST_Controller::HTTP_OK);
    } 
     
    /**
     * Get All Data from this method.
     *
     * @return Response
    */
    public function index_put($id)
    {
        $input = $this->put();
        $this->db->update('filter.mi_filter', $input, array('id'=>$id));
     
        $this->response(array('Item updated successfully.'), REST_Controller::HTTP_OK);
    }

     

    /**

     * Get All Data from this method.

     *

     * @return Response

    */

    public function index_delete($id)
    {

        $this->db->update('filter.mi_filter', array('deleted' => 'true'), array('id' => $id));

        $this->response(array('Filter deleted successfully.'), REST_Controller::HTTP_OK);

    }
}
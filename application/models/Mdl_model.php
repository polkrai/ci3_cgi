<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Mdl_model extends MY_Model {
	
	function __construct() {
		
        parent::__construct();

    }

	public function get_last_date($station_id) {
    			
		$this->db->select('check_out_date');
		$this->db->where('deleted', 'f');
		$this->db->order_by('check_out_date DESC');
		$this->db->limit(1);
		
		$query = $this->db->get('med.neural_med_station');
		
        $row = $query->row(); 
        
        $this->db->select('station_id, doctor_id');
        $this->db->where('check_out_date', $row->check_out_date);
        $this->db->where('station_id', $station_id);
		$this->db->where('deleted', 'f');
		//$this->db->order_by('id ASC');
		
		$rows = $this->db->get('med.neural_med_station');
		
		if ($rows->num_rows() > 0) {
			
			$data = $rows->row();
			
			return $data->doctor_id;
		}
		else {
			return NULL;
		}
        
    }
    
    public function check_med_station($check_out_date, $station_id, $doctor=NULL) {
    	
    	$query = $this->db->get_where('med.neural_med_station', array('check_out_date' => $check_out_date, 'station_id' => $station_id, 'deleted' => 'f'));
    	
    	if ($query->num_rows() == 0) {
			
			return TRUE;
		}
		else {
			
			return FALSE;
		}
    }
    
}
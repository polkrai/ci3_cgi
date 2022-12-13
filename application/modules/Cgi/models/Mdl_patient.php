<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Mdl_Patient extends Response_Model { 
	
	public $table = 'medrec.nano_patient';
	
    public $primary_key = 'medrec.nano_patient.id';

	public function __construct()
    {
        parent::__construct();
        
        $this->total_rows = $this->filter_select()->get()->num_rows();
    }

	public function default_select()
    {
        $this->db->select('medrec.nano_patient.*, nano_visit.id AS vn_id, nano_visit.vn, nano_visit.time_add, nano_queue.id AS queue_id, nano_queue.cgi_record');
    }

    public function default_join()
    {
        $this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id_patient = nano_patient.id');
        $this->db->join('jvkk.nano_queue AS nano_queue', 'nano_queue.vn_id = nano_visit.id');
    }
    
    public function default_order_by()
    {
        $this->db->order_by('nano_visit.id DESC');
    }
    
    public function default_limit()
    {
        //$this->db->limit(1);
    }
 
    public function filter_select()
    {
        $findme = ' ';
		$pos 	= strpos($this->input->get_post('txtsearch'), $findme);
        
        if ($pos === FALSE) {
        	
        	$this->filter_or_where('medrec.nano_patient.hn', $this->input->get_post('txtsearch'));
        	
        	$this->filter_or_where('medrec.nano_patient.pa_name', $this->input->get_post('txtsearch'));
		}
		else {
			
			$txtsearch_arr = explode(" ", $this->input->get_post('txtsearch'));
			
			$this->filter_where('medrec.nano_patient.pa_name', $txtsearch_arr[0]);
			
			$this->filter_where('medrec.nano_patient.pa_lastname', $txtsearch_arr[1]);
		}
        
        
        return $this;
    }
}
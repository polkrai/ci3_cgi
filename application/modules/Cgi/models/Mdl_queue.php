<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Queue extends Response_Model { 
	
	public $table = 'jvkk.nano_queue';
	
    public $primary_key = 'jvkk.nano_queue.id';

    public function __construct()
    {
        parent::__construct();
        
        $this->total_rows = $this->filter_select()->get()->num_rows();
    }

	public function default_select() {
		
        $this->db->select('jvkk.nano_queue.id AS queue_id, jvkk.nano_queue.cgi_record, nano_visit.id AS vn_id, nano_visit.vn, nano_visit.hn, nano_patient.*');
    }
    
    public function default_join()
    {
        $this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id = nano_queue.vn_id');
        $this->db->join('medrec.nano_patient AS nano_patient', 'nano_patient.id = nano_visit.id_patient');
        //$this->db->join('med.cgi AS cgi', 'cgi.vn_id = nano_queue.vn_id', 'left');
    }

    public function default_order_by()
    {
        $this->db->order_by('jvkk.nano_queue.id ASC');
    }
    
    public function default_group_by()
    {
        //$this->db->group_by('jvkk.nano_queue.id ASC');
    }
    
    public function validation_rules()
    {
        return array(
        	'cgi_record'     => array(
                'field' => 'cgi_record'
            )
        );
    }
    
    public function filter_select()
    {
        //$this->filter_where('jvkk.nano_queue.cgi_record', TRUE);
        $this->filter_where('nano_visit.time_add >=', date('Y-m-d') . ' 00:00:00');
		$this->filter_where('nano_visit.time_add <=', date('Y-m-d') . ' 23:59:59');       
        
        return $this;
    }

    public function filter_select_station ()
    {
    	$this->filter_where('jvkk.nano_queue.com_id2', '10');
        $this->filter_where('jvkk.nano_queue.station_id2', $this->session->userdata('station_id'));
        $this->filter_where('jvkk.nano_queue.cgi_record', TRUE);       
        
        return $this;
    }
    
    
    public function record($id = NULL, $db_array = NULL)
    {
        $id = parent::save($id, array('cgi_record' => 't'));
        
        $this->session->set_flashdata('alert_success', 'Successfully Changed');

		return $id;
    }
    
    public function delete($id = NULL, $db_array = NULL)
    {
        $id = parent::save($id, array('cgi_record' => 'f'));
        
        $this->session->set_flashdata('alert_success', 'Successfully Changed');

		return $id;
    }

}
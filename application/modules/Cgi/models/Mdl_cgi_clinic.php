<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Cgi_Clinic extends Response_Model { 
	
	public $table = 'med.cgi_clinic';
	
    public $primary_key = 'med.cgi_clinic.id';

    public function __construct()
    {
        parent::__construct();
    }

	public function default_select() {
		
        $this->db->select('med.cgi_clinic.id, med.cgi_clinic.clinic_name', FALSE);
    }

    public function default_order_by()
    {
        $this->db->order_by('med.cgi_clinic.id ASC');
    }
    
    public function validation_rules()
    {
        return array(
            'clinic_name'      => array(
                'field' => 'clinic_name',
                'label' => 'คลินิก',
                'rules' => 'required'
            )
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();
		
	    $db_array['created_by'] = '486';

	    return $db_array;
	}

 
}
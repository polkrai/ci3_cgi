<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Mdl_Icd10 extends Response_Model { 
	
	public $table = 'med.neural_order_icd10';
	
    public $primary_key = 'med.neural_order_icd10.id';

	public function __construct()
    {
        parent::__construct();
    }
    
    public function default_select()
    {
        $this->db->select("med.neural_order_icd10.code, med.neural_order_icd10.priority");
    }
    
    public function default_join()
    {
        //$this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id_patient = nano_patient.id');
    }
    
    public function default_group_by()
    {
        //$this->db->limit(1);
        $this->db->group_by(array("code", "priority")); 
    }
    
    public function filter_select($vn_id)
    {
        $this->filter_where('med.neural_order_icd10.visit_id', $vn_id);   
        
        return $this;
    }
    
    public function filter_priority($priority)
    {
        $this->filter_where('med.neural_order_icd10.priority <', $priority);      
        
        return $this;
    }
    
    public function free_result_query()
    {        
        return $this->free_result();
    }
}
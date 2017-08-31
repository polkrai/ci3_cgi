<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

class Mdl_Header extends Response_Model { 
	
	public $table = 'medrec.nano_patient';
	
    public $primary_key = 'medrec.nano_patient.id';

	public function __construct()
    {
        parent::__construct();
    }
    
    public function default_select()
    {
        $this->db->select("medrec.nano_patient.*, to_char(medrec.nano_patient.pa_birthdate, 'DD/MM/YYYY') AS birthdate, nano_visit.id AS vn_id, nano_visit.vn, nano_visit.time_add");
    }
    
    public function default_join()
    {
        $this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id_patient = nano_patient.id');
    }
    
    public function default_limit()
    {
        $this->db->limit(1);
    }
    
    public function filter_select($hn)
    {
        $this->filter_where('medrec.nano_patient.hn', $hn, TRUE);    
        
        return $this;
    }
}
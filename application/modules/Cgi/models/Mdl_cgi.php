<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Cgi extends Response_Model { 
	
	public $table = 'med.cgi';
	
    public $primary_key = 'med.cgi.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
<<<<<<< HEAD
        $this->db->select("cgi.*, to_char(cgi.created_date, 'DD/MM/YYYY') AS cgi_date, cgi_clinic.clinic_name, nano_visit.vn");
=======
        $this->db->select("cgi.*, to_char(cgi.created_date, 'DD/MM/YYYY') AS cgi_date, cgi_clinic.clinic_name, nano_visit.vn, users.name, users.lastname");
>>>>>>> 13a7918... first commit
    }
	
	 public function default_join()
    {
<<<<<<< HEAD
        $this->db->join('med.cgi_clinic AS cgi_clinic', 'cgi_clinic.id = cgi.clinic', 'left');
		$this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id = cgi.vn_id');
=======
        $this->db->join('med.cgi_clinic AS cgi_clinic', 'cgi_clinic.id = cgi.clinic1', 'left');
		$this->db->join('medrec.nano_visit AS nano_visit', 'nano_visit.id = cgi.vn_id');
		$this->db->join('jvkk.nano_user AS users', 'users.id = cgi.created_by');
>>>>>>> 13a7918... first commit
    }

    public function default_order_by()
    {
        $this->db->order_by('med.cgi.id ASC');
    }
    
    public function validation_rules()
    {
        return array(
            'vn_id'     => array(
                'field' => 'vn_id'
            ),
            'hn'      	=> array(
                'field' => 'hn'
            ),
            'cgi_score'     => array(
                'field' => 'cgi_score',
                'label' => trans('score'),
                'rules' => 'required'
            ),
<<<<<<< HEAD
            'clinic'      => array(
                'field' => 'clinic',
=======
            'clinic1'      => array(
                'field' => 'clinic1',
>>>>>>> 13a7918... first commit
                'label' => trans('clinic'),
                //'rules' => 'required'
            ),
            'created_date' => array(
                'field' => 'created_date',
                'label' => 'วันที่บันทึก',
                'rules' => 'required'
            )
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();
<<<<<<< HEAD
=======
	    
	    //$db_array['clinic1'] = $_POST['clinic'][0];
	    //$db_array['clinic2'] = $_POST['clinic'][1];
>>>>>>> 13a7918... first commit

	    $db_array['created_by'] = $this->session->userdata('user_id');

	    return $db_array;
	}

	public function delete($id = NULL, $db_array = NULL)
    {
        $id = parent::save($id, $db_array);

		return $id;
    }
    
    public function save($id = NULL, $db_array = NULL)
    {
    	if ($id) {
	    	
	    	$db_array = parent::db_array();
<<<<<<< HEAD
=======
	    	
	    	//$db_array['clinic1'] = $_POST['clinic'][0];
	    	//$db_array['clinic2'] = $_POST['clinic'][1];
>>>>>>> 13a7918... first commit

    		$db_array['updated_by'] 	= $this->session->userdata('user_id');
    		$db_array['updated_date'] 	= date('Y-m-d H:i:s');
    	}
    	
        $id = parent::save($id, $db_array);

		return $id;
    }
	
<<<<<<< HEAD
	 public function filter_select($hn)
=======
	public function filter_select($hn)
>>>>>>> 13a7918... first commit
    {
        $this->filter_where('cgi.hn', $hn);
		$this->filter_where('cgi.deleted', 'f');   
        
        return $this;
    }
	
}
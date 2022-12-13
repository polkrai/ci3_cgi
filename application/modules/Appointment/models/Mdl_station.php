<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Station extends Response_Model { 
	
	public $table = 'med.neural_station';
	
    public $primary_key = 'med.neural_station.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("neural_station.id AS station_id, neural_station.name AS station_name, neural_station.ip");
    }

    public function default_order_by()
    {
        $this->db->order_by('med.neural_station.id ASC');
    }
    
    public function validation_rules()
    {
        return array(
            'name'     => array(
                'field' => 'name',
                'label' => 'ชื่อห้องตรวจ',
                'rules' => 'required'
            ),           
            'ip' => array(
                'field' => 'ip',
                'label' => 'ไอพี่',
                'rules' => 'required'
            ),
            'opd'      => array(
                'field' => 'opd',
                'label' => 'ห้องตรวจผู้ป่วยนอก',
                'rules' => 'required'
            ),
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();

	    //$db_array['created_by'] = $this->session->userdata('user_id');

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
	    	
	    	//$db_array['clinic1'] = $_POST['clinic'][0];
	    	//$db_array['clinic2'] = $_POST['clinic'][1];

    		//$db_array['updated_by'] 	= $this->session->userdata('user_id');
    		//$db_array['updated_date'] 	= date('Y-m-d H:i:s');
    	}
    	
        $id = parent::save($id, $db_array);

		return $id;
    }
	
	public function filter_select($opd=NULL)
    {	    
		$this->filter_where('neural_station.opd', $opd);   
        
        return $this;
    }
	
}
<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Med extends Response_Model { 
	
	public $table = 'med.neural_med_station';
	
    public $primary_key = 'med.neural_med_station.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("neural_med_station.id AS med_station_id, to_char(neural_med_station.check_out_date, 'DD-MM-YYYY') AS check_out_date, users.id AS user_id, users.title || users.name || ' ' || users.lastname AS fullname, station.id AS station_id, station.name AS station_name");
    }
	
	public function default_join()
    {
        $this->db->join('med.neural_station AS station', 'station.id = neural_med_station.station_id');
		$this->db->join('jvkk.nano_user AS users', 'users.id = neural_med_station.doctor_id');
    }

    public function default_order_by()
    {
        $this->db->order_by('med.neural_med_station.id ASC');
    }
    
    public function validation_rules()
    {
        return array(
            'check_out_date'     => array(
                'field' => 'check_out_date',
                'label' => 'วันที่ออกตรวจ',
                'rules' => 'required'
            ),
            'station_id'      => array(
                'field' => 'station_id',
                'label' => 'ห้องตรวจ',
                'rules' => 'required'
            ),
            'doctor_id' => array(
                'field' => 'doctor_id',
                'label' => 'แพทย์',
                'rules' => 'required'
            )
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();

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
	    	
	    	//$db_array['clinic1'] = $_POST['clinic'][0];
	    	//$db_array['clinic2'] = $_POST['clinic'][1];

    		$db_array['updated_by'] 	= $this->session->userdata('user_id');
    		$db_array['updated_date'] 	= date('Y-m-d H:i:s');
    	}
    	
        $id = parent::save($id, $db_array);

		return $id;
    }
	
	public function filter_select($date=NULL)
    {
	    if ($date == NULL) {
		    
		    $data = date('Y-m-d');
	    }
	    
        $this->filter_where('neural_med_station.check_out_date', $date);
		$this->filter_where('neural_med_station.deleted', 'f');   
        
        return $this;
    }
	
}
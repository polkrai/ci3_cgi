<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Option extends Response_Model { 
	
	public $table = 'frontmed.option';
	
    public $primary_key = 'frontmed.option.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("option.id, option.option_name");
    }
	
	public function default_join()
    {
		//$this->db->join('frontmed.neural_appointmentป AS appointment', 'option.id = ANY (appointment.select_option)', 'left');
    }
    
    public function default_group_by()
    {
        //$this->db->group_by('nano_queue.vn_id, nano_queue.vn, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname, nano_queue.station_id2, appointment.id');
    }
    
    public function default_order_by()
    {
        $this->db->order_by('option.id ASC');
    }

	public function validation_rules()
    {
        return array(
            'option_name'     => array(
                'field' => 'option_name'
            )
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();

	    return $db_array;
	}
    
    public function save($id = NULL, $db_array = NULL)
    {
	    $id = parent::save($id, $db_array);

		return $id;
    }
    
    public function filter_select_option($appointment_id=NULL)
    {
    	if ($appointment_id) {	
		
			$sql = "SELECT option.id, option.option_name 
					FROM frontmed.option
					LEFT JOIN frontmed.neural_appointment AS appointment ON option.id = ANY (appointment.select_option) 
					WHERE appointment.id = '{$appointment_id}'
					AND frontmed.option.deleted = 'f' 
					ORDER BY option.id ASC"; //'appointment.id', $appointment_id);
					
			$query = $this->db->query($sql);
			
			return $query;
		}
		
        $this->filter_where('frontmed.option.deleted', 'f');
        
        return $this;
    }
    
    
}
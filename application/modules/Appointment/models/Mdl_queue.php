<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Queue extends Response_Model { 
	
	public $table = 'jvkk.nano_queue';
	
    public $primary_key = 'jvkk.nano_queue.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("nano_queue.vn_id, nano_queue.vn, patient.hn, patient.pa_pre_name || patient.pa_name || ' ' || patient.pa_lastname AS patient_name, nano_queue.station_id2, appointment.id AS appointment_id");
    }
	
	public function default_join()
    {
    	$this->db->join('medrec.nano_visit AS visit', 'visit.id = nano_queue.vn_id');
        $this->db->join('medrec.nano_patient AS patient', 'patient.id = visit.id_patient');
		$this->db->join('frontmed.neural_appointment AS appointment', 'appointment.visit_id = visit.id', 'left');
    }
    
    public function default_group_by()
    {
        $this->db->group_by('nano_queue.vn_id, nano_queue.vn, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname, nano_queue.station_id2, appointment.id');
    }
    
    public function default_order_by()
    {
        $this->db->order_by('nano_queue.vn ASC');
    }

	public function validation_rules()
    {
        return array(
            'com1'     => array(
                'field' => 'com1'
            ),
            /*'user1'      => array(
                'field' => 'user1'
            ),*/
            'action' => array(
                'field' => 'action'
            ),
            'com2'     => array(
                'field' => 'com2'
            ),
            'com_id1' => array(
                'field' => 'com_id1',
                'rules' => 'required'
            ),
            'com_id2' => array(
                'field' => 'com_id2',
                'rules' => 'required'
            )/*,
            'action_id' => array(
                'field' => 'action_id',
                'rules' => 'required'
            )*/
        );
    }
    
    public function db_array() {
    	
	    $db_array = parent::db_array();
	    
	    $db_array['com1'] 		= "หลังพบแพทย์";
		$db_array['com2'] 		= "ยืนยันจ่ายยา";
		$db_array['user1'] 		= $this->session->userdata('user_id');
		$db_array['action'] 	= "เภสัชกรยืนยันรายการสั่งยา";
		$db_array['user2'] 		= NULL;
		$db_array['com_id1'] 	= "27";
		$db_array['com_id2'] 	= "16";
		$db_array['action_id'] 	= "22";
		$db_array['time_send'] 	= date('Y-m-d H:i:s');
		$db_array['time_receive'] = NULL;


	    return $db_array;
	}
    
    public function save($id = NULL, $db_array = NULL)
    {
	    $id = parent::save($id, $db_array);

		return $id;
    }
    
    public function filter_select($station_id=NULL, $date)
    {
        $this->filter_where('to_char(nano_queue.date_add, \'YYYY-MM-DD\') = ', $date); //com_id1			
		$this->filter_where('nano_queue.com_id1', '10');
		$this->filter_where('nano_queue.com_id2', '27');
		$this->filter_where('nano_queue.action_id', '26');
		$this->filter_where('nano_queue.station_id', $station_id);
        
        return $this;
    }
    
    
}
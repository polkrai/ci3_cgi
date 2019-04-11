<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Queue_Log extends Response_Model { 
	
	public $table = 'jvkk.nano_queue_log';
	
    public $primary_key = 'jvkk.nano_queue_log.id';

    public function __construct()
    {
        parent::__construct();
    }	
	
	public function default_select() {
		
        $this->db->select("nano_queue_log.vn_id, nano_queue_log.vn, to_char(nano_queue_log.time_send, 'HH24:MI') AS time_th, patient.hn, patient.pa_pre_name || patient.pa_name || ' ' || patient.pa_lastname AS patient_name, nano_queue_log.station_id, appointment.id AS appointment_id, nano_queue_log.nano_queue_id AS queue_id");
    }
	
	public function default_join()
    {
    	$this->db->join('medrec.nano_visit AS visit', 'visit.vn = nano_queue_log.vn');
        $this->db->join('medrec.nano_patient AS patient', 'patient.id = visit.id_patient');
		$this->db->join('frontmed.neural_appointment AS appointment', 'appointment.visit_id = visit.id', 'left');
    }
    
    public function default_group_by()
    {
        $this->db->group_by('nano_queue_log.vn_id, nano_queue_log.vn, time_th, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname, nano_queue_log.station_id, appointment.id, nano_queue_log.nano_queue_id');
    }
    
    public function default_order_by()
    {
        $this->db->order_by('time_th ASC');
    }
    
    public function filter_select($station_id=NULL, $date)
    {
        $this->filter_where('to_char(nano_queue_log.date_add, \'YYYY-MM-DD\') = ', $date); //com_id1			
		$this->filter_where('nano_queue_log.com_id1', '10');
		$this->filter_where('nano_queue_log.com_id2', '27');
		$this->filter_where('nano_queue_log.action_id', '26');
		$this->filter_where('nano_queue_log.station_id', $station_id);
        
        return $this;
    }
    
    
}
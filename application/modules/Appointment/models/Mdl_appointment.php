<?php (defined('BASEPATH')) OR exit('No direct script access allowed');

class Mdl_Appointment extends Response_Model {

	public $table = 'frontmed.neural_appointment';

    public $primary_key = 'neural_appointment.id';

    public $date_created_field  = 'created_date';

    public $date_modified_field = 'update_date';

    public function __construct()
    {
        parent::__construct();
    }

	public function default_select() {

        $this->db->select("neural_appointment.id AS appointment_id, to_char(appointment_date, 'YYYY-MM-DD') AS appointment_date, comment, to_char(appointment_date, 'YYYY-MM-DD') ||  ' ' || to_char(neural_appointment.appointment_time, 'HH24:MI') AS appointment_date_time, to_char(appointment_date, 'DD/MM/YYYY') AS appointment_date_th, , to_char(appointment_date, 'YYYY-MM-DD') AS appointment_date_en, to_char(neural_appointment.appointment_time, 'HH24:MI') AS appointment_time, neural_appointment.user_id, users.title || users.name || ' ' || users.lastname AS doctorname, select_option, patient.hn, patient.pa_pre_name || patient.pa_name || ' ' || patient.pa_lastname AS patient_name, users_created.title || users_created.name || ' ' || users_created.lastname AS created_name, components.com_name");
    }

	public function default_join()
    {
        $this->db->join('medrec.nano_patient AS patient', 'patient.id = neural_appointment.patient_id', 'left');
		$this->db->join('jvkk.nano_user AS users_created', 'users_created.id = neural_appointment.created_by', 'left');
		$this->db->join('jvkk.nano_components AS components', 'components.id = neural_appointment.component_id', 'left');
		$this->db->join('jvkk.nano_user AS users', 'users.id = neural_appointment.user_id', 'left');
    }

    public function default_order_by()
    {
        $this->db->order_by('neural_appointment.user_id, neural_appointment.appointment_time ASC');
    }

    public function default_group_by()
    {
        $this->db->group_by('neural_appointment.id, neural_appointment.comment, appointment_date, neural_appointment.appointment_time, neural_appointment.user_id, neural_appointment.select_option, doctorname, hn, patient_name, created_name, components.com_name');
    }

    public function validation_rules()
    {
        return array(
            'patient_id'    => array(
                'field' => 'patient_id'
            ),
            'user_id'      	=> array(
                'field' => 'user_id'
            ),
            'appointment_date'     => array(
                'field' => 'appointment_date',
                'label' => 'วันที่นัดหมาย',
                'rules' => 'required'
            ),
            'comment'      => array(
                'field' => 'comment'
            ),
            'visit_id' => array(
                'field' => 'visit_id',
            ),
            'component_id'      => array(
                'field' => 'component_id',
                'label' => 'แผนกที่นัด',
            ),
            'special_id' => array(
                'field' => 'special_id',
                'label' => 'รหัสพิเศษ',
            ),
            'appointment_time' => array(
                'field' => 'appointment_time',
                'label' => 'เวลานัดหมาย',
            ),
            'select_option' => array(
                'field' => 'select_option',
                'label' => 'คำที่พบบ่อย',
            )
        );
    }

    public function db_array() {

	    $db_array = parent::db_array();

	    $db_array['update_by'] = $this->session->userdata('user_id');

	    return $db_array;
	}

	public function deleted($id = NULL, $db_array = NULL)
    {
    	//$db_array = parent::db_array();

    	$db_array['deleted'] 	  = 't';
    	$db_array['deleted_date'] = date ('Y-m-d H:i:s');
    	$db_array['deleted_by']   = $this->session->userdata('user_id');

        $id = parent::deleted($id, $db_array);

		return $id;
    }

    public function save($id = NULL, $db_array = NULL)
    {
    	$select_option = NULL;

    	if ($this->input->post('select_option')) {

    		$select_option.= "'{";

	    	foreach ($this->input->post('select_option') as $key => $value) {

				if ($value) {

					$select_option.= "{$value},";
				}
			}

			$select_option = substr($select_option, 0, -1);

			$select_option.= "}'";
		}
		else {
		
			$select_option.= "NULL";
		}

    	if ($id == NULL) {

			$sql = "INSERT INTO frontmed.neural_appointment (id, appointment_date, appointment_time, user_id, comment, component_id, visit_id, patient_id, created_by, select_option)
					SELECT (id + 1) AS last_id,
					'{$this->input->post('appointment_date')}',
					'{$this->input->post('appointment_time')}',
					'{$this->input->post('user_id')}',
					'{$this->input->post('comment')}',
					'{$this->input->post('component_id')}',
					'{$this->input->post('visit_id')}',
					'{$this->input->post('patient_id')}',
					'{$this->session->userdata('user_id')}',
					$select_option
					FROM frontmed.neural_appointment ORDER BY id DESC LIMIT 1 RETURNING id AS last_id";

			$query = $this->db->query($sql);

			$row = $query->row();

			return $row->last_id;

    	}
		else {

			$db_array = parent::db_array();

            $db_array['created_by']    = $this->session->userdata('user_id');
			
			if ($this->input->post('select_option')) {
			
				$db_array['select_option'] = substr($select_option, 1, -1);
			}

			$id = parent::save($id, $db_array);

			return $id;
		}

    }

	public function filter_select($date=NULL)
    {
        $this->filter_where('to_char(neural_appointment.appointment_date, \'YYYY-MM-DD\') = ', $date);
		$this->filter_where('neural_appointment.deleted', 'f');

        return $this;
    }

	public function filter_select_date($date=NULL)
    {
        $this->filter_where('to_char(neural_appointment.neural_appointment_date, \'YYYY-MM-DD\') = ', $date);
		$this->filter_where('neural_appointment.neural_appointment_time IS NOT NULL');
		$this->filter_where('neural_appointment.deleted', 'f');

        return $this;
    }

    public function filter_select_doctor_time($date=NULL, $user_id=NULL, $time=NULL){

        $this->filter_where('to_char(neural_appointment.appointment_date, \'YYYY-MM-DD\') = ', $date);
        $this->filter_where('neural_appointment.user_id', $user_id);
		$this->filter_where('neural_appointment.appointment_time IS NOT NULL');


        if ($time == "08:30") {

	        $this->filter_where('neural_appointment.deleted', 'f')->where("(to_char(neural_appointment.appointment_time, 'HH24:MI') = '{$time}' OR to_char(neural_appointment.appointment_time, 'HH24:MI') = '00:00')");
        }
        else {

	        $this->filter_where('neural_appointment.deleted', 'f')->where("to_char(neural_appointment.appointment_time, 'HH24:MI') = '{$time}'");
        }

        return $this;

    }

    public function filter_select_doctor($doctor_id=NULL, $date=NULL)
    {
    	$this->filter_where('neural_appointment.user_id', $doctor_id);

    	if ($date != NULL) {

			$this->filter_where('to_char(neural_appointment.appointment_date, \'YYYY-MM-DD\') = ', $date);
		}

        return $this;
    }

    public function filter_select_doctor_created_date($doctor_id=NULL, $date=NULL)
    {
        $this->filter_where('neural_appointment.user_id', $doctor_id);

        if ($date != NULL) {

            $this->filter_where('to_char(neural_appointment.created_date, \'YYYY-MM-DD\') = ', $date);
        }

        return $this;
    }

    public function filter_select_id($appointment_id=NULL)
    {
    	$this->filter_where('neural_appointment.id', $appointment_id);
    	$this->filter_where('neural_appointment.deleted', 'f');

        return $this;
    }

    public function get_doctor_appointment_date($date_select=NULL) {

	    $this->db->select ("appointment.user_id, users.title || users.name || ' ' || users.lastname AS doctorname");
	    $this->db->join('jvkk.nano_user AS users', 'users.id = appointment.user_id');
	    $this->db->where('to_char(appointment.appointment_date, \'YYYY-MM-DD\') = ', $date_select);
	    $this->db->where('appointment.deleted', 'f');
	    $this->db->group_by('appointment.user_id, doctorname');
	    $this->db->order_by('appointment.user_id');

	    $query = $this->db->get('frontmed.neural_appointment AS appointment');

	    return $query->result();

    }

    public function get_doctor_appointment_date_total($date_select=NULL, $doctor_id=NULL, $time_select=NULL) {
	    
	    if ($time_select == "08:30") {
		    
		    $time_select = "00:00', '{$time_select}";
	    }
	    
	    $sql = "SELECT CASE
	                		WHEN total_date.sum_date IS NULL THEN '0'
							ELSE total_date.sum_date
						END AS sum_date,
					CASE
	                		WHEN total_time.sum_time IS NULL THEN '0'
							ELSE total_time.sum_time
						END AS sum_time
				FROM frontmed.neural_appointment AS appointment
				INNER JOIN (SELECT user_id, COUNT (appointment_date) AS sum_date FROM frontmed.neural_appointment WHERE to_char(appointment_date, 'YYYY-MM-DD') = '{$date_select}' AND user_id = '{$doctor_id}' AND deleted = 'f' GROUP BY user_id) AS total_date ON (total_date.user_id = appointment.user_id)
				LEFT JOIN (SELECT user_id, COUNT (appointment_time) AS sum_time FROM frontmed.neural_appointment WHERE to_char(appointment_date, 'YYYY-MM-DD') = '{$date_select}' AND to_char(appointment_time, 'HH24:MI') IN ('{$time_select}') AND user_id = '{$doctor_id}' AND deleted = 'f' GROUP BY user_id) AS total_time ON (total_time.user_id = appointment.user_id)
				GROUP BY total_date.sum_date, total_time.sum_time";
		
		return $this->db->query($sql, TRUE);

    }
}

<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Appointment extends Med_Controller {


	public function __construct ()
	{
		parent::__construct();

		$this->load->model(array('mdl_appointment', 'mdl_option', 'mdl_med_station', 'mdl_station', 'mdl_users'));

		//modules::load('med/mdl_med_station');
	}

	private function _init ($date_select = NULL) {

		//$date_check = ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d');

		if($this->mdl_med_station->filter_select($date_select)->get()->num_rows() === 0) {

			$this->session->set_flashdata('alert_error','ต้องบันทึกข้อมูลแพทย์ออกตรวจก่อน');

			redirect("Med/form_med?date_select={$date_select}");
		}

	}

	public function index ($date_select = NULL) {

		$date_select = ($date_select)?$date_select:date('Y-m-d');

		$this->_init ($date_select);

		$content_data = array();

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('บันทึกนัดหมายผู้ป่วยวันที่ '  . date_to_thai($date_select, false));

		$this->mdl_med_station->filter_select($date_select)->get();

		$content_data = array('med_stations' => $this->mdl_med_station->result(), 'form_search' => 'search_hn');

        $data = $this->includes;

        $data['content'] = $this->load->view('index_appointment', $content_data, TRUE);

        if ($this->input->get_post('is_ajax')) {

			$this->load->view('index_appointment', $data);
		}
		else {

			$this->load->view($this->template, $data);
		}
	}

	public function form ($appointment_id = NULL) {

		$this->load->model(array('mdl_queue'));

		$vn_id = $this->input->get_post('vn_id');

		$queue_id = $this->input->post('queue_id');

		$appointment_id = ($appointment_id == '-1')?NULL:$appointment_id;// = uri_assoc('appointment_id');

		if ($this->input->get('send_queue') == "true" AND $this->mdl_queue->run_validation() AND $queue_id !== NULL) {

			$queue_id = $this->mdl_queue->save($queue_id);

			//echo $queue_id;exit();
		}

		if ($this->mdl_appointment->run_validation()) {

			$last_id = $this->mdl_appointment->save($appointment_id);

			echo $last_id;

			exit();

        }

		if (!$_POST AND $appointment_id != '-1') {

			if (!$this->mdl_appointment->prep_form($appointment_id)) {

				show_404();
				//exit();
			}
		}


		$data = array();

		$users  = $this->mdl_users->filter_select_user($this->session->userdata('group_id'))->get();

		$option = $this->mdl_option->filter_select_option()->get();

		if ($vn_id) {

			$sql = "SELECT orders.id, orders.user_id, visit.id_patient AS pa_id
					FROM medrec.nano_visit AS visit
					LEFT JOIN med.neural_order AS orders ON (orders.vn_id = visit.id)
					WHERE visit.id = '{$vn_id}'
					AND orders.order_type = 'drug'
					AND orders.deleted = 'f'
					ORDER BY orders.id DESC LIMIT 1";

			$query = $this->db->query($sql);

			$data = array('appointment_id' => $appointment_id,
						  'users'  => $this->mdl_users->user_dropdown($users->result()),
						  'options'=> $option->result(),
						  'doctor' => $query->row());
		}
		else {

			$query = $this->db->query("SELECT neural_appointment.*, patient_id AS pa_id FROM frontmed.neural_appointment WHERE id = '{$appointment_id}' AND deleted = 'f'");

			$data = array('appointment_id' => $appointment_id,
						  'users'  => $this->mdl_users->user_dropdown($users->result()),
						  'options'=> $option->result(),
					      'doctor' => $query->row());

		}

		$this->load->view('_add_appointment', $data);
	}

	public function history ($date_select = NULL) {

		$content_data = array();

		$date_select = ($date_select)?$date_select:date('Y-m-d');

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('ผู้ป่วยที่นัดหมายมาวันที่ ' . date_to_thai($date_select, false));

		$this->db->select ("neural_appointment.user_id, doctors.title || doctors.name || ' ' || doctors.lastname AS doctorname");
		$this->db->join('jvkk.nano_user AS doctors', 'doctors.id = neural_appointment.user_id', 'left');
		$this->db->where('to_char(neural_appointment.appointment_date, \'YYYY-MM-DD\') = ', $date_select);
		$this->db->where('neural_appointment.deleted', 'f');
		$this->db->where('doctors.group_id', $this->session->userdata('group_id'));

		if($this->session->userdata('department_id') != '') {

			$this->db->where('neural_appointment.component_id', $this->session->userdata('department_id'));

		}

		//$this->db->or_where('doctors.department_id', $this->session->userdata('department_id'));
		$this->db->group_by('neural_appointment.user_id, doctors.title, doctors.name, doctors.lastname');
		$this->db->order_by('neural_appointment.user_id');

		$query = $this->db->get('frontmed.neural_appointment');

        $data = $this->includes;

        $content_data = array('doctors' 	=> $query->result(),
							  'date_select' => $date_select,
							  'form_search' => 'search_highlight');

		$data['content'] = $this->load->view('history_appointment', $content_data, TRUE);

        if ($this->input->get_post('is_ajax')) {

        	$data['header'] = "ผู้ป่วยที่นัดหมายมาวันที่ " . date_to_thai($date_select, false);

			$this->load->view('history_appointment', $data);
		}
		else {

			$this->load->view($this->template, $data);
		}

	}

	public function summary ($date = NULL) {

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('สรุปการบันทึกนัดหมายประจำวันที่ ' . date_to_thai($date, false));

		$this->db->select ("neural_appointment.user_id, doctors.title || doctors.name || ' ' || doctors.lastname AS doctorname");
		$this->db->join('jvkk.nano_user AS doctors', 'doctors.id = neural_appointment.user_id', 'left');
		$this->db->where('to_char(neural_appointment.created_date, \'YYYY-MM-DD\') = ', $date);
		$this->db->where('neural_appointment.deleted', 'f');
		$this->db->where('doctors.group_id', $this->session->userdata('group_id'));

		if($this->session->userdata('department_id') != '') {

			$this->db->where('neural_appointment.component_id', $this->session->userdata('department_id'));
			//$this->db->or_where('doctors.group_id', $this->session->userdata('group_id'));

		}

		//$this->db->or_where('doctors.department_id', $this->session->userdata('department_id'));
		$this->db->group_by('neural_appointment.user_id, doctors.title, doctors.name, doctors.lastname');
		$this->db->order_by('neural_appointment.user_id');

		$query = $this->db->get('frontmed.neural_appointment');

		$data = $this->includes;

		$content_data = array('doctors' 	=> $query->result(),
							  'date_select' => $date,
							  'form_search' => 'search_highlight');

        $data['content'] = $this->load->view('summary_appointment', $content_data, TRUE);

        if ($this->input->get_post('is_ajax')) {

	        //echo ">>" . $this->session->userdata('department_id');

        	$data['header'] = "สรุปการบันทึกนัดหมายประจำวันที่ " . date_to_thai($date, false);

			$this->load->view('summary_appointment', $data);
		}
		else {

			$this->load->view($this->template, $data);
		}
	}

	public function conclube ($date_select = NULL) {

		$content_data = array();

		//$date_select = ($date_select)?$date_select:date('Y-m-d');

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('สรุปนัดหมายแสดงรวมยอดประจำวันที่ ' . date_to_thai($date_select, false));

		//$this->mdl_med_station->filter_select_date($date_select)->get();

		$content_data = array('appointments' => $this->mdl_appointment->get_doctor_appointment_date($date_select),
							  'date_select'  => $date_select);

		$data = $this->includes;

        //$data['content_left'] = $this->load->view('med/calendar/calendar_app', $content_data, TRUE);

        $data['content'] = $this->load->view('conclube_appointment', $content_data, TRUE);

        if ($this->input->get_post('is_ajax')) {

        	$data['header'] = "สรุปนัดหมายแสดงรวมยอดประจำวันที่ " . date_to_thai($date_select, false);

			$this->load->view('conclube_appointment', $data);
		}
		else {

			$this->load->view($this->template, $data);
		}
	}

	public function history_to_day ($doctor_id = NULL) {

		$doctor_id   = ($this->input->get_post('view_index'))?$doctor_id:$this->session->userdata('user_id');
		$date_select = ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d');

		$content_data = array();

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('ผู้ป่วยที่นัดหมาย');

		$this->mdl_appointment->filter_select_doctor($doctor_id); //$this->session->userdata('user_id')

		$this->mdl_appointment->filter_select($date_select)->get();

		$content_data = array('historys' => $this->mdl_appointment->result());

        $data = $this->includes;

		$data['content'] = $this->load->view('history_to_day', $content_data, TRUE);

        if ($this->input->get_post('is_ajax')) {

			$this->load->view('history_to_day', $data);
		}
		else {

			$this->load->view($this->template, $data);
		}

	}

	public function load_data_queue_other ($com_id1 = NULL) {

		$result  = array();

		$this->load->model(array('mdl_queue_log'));

		//$query = $this->mdl_queue_log->filter_select($station_id, ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d'))->get();

		$date_select = ($this->input->get_post('date_select') AND $this->input->get_post('date_select') != "")?$this->input->get_post('date_select'):date('Y-m-d');

		$sql = "SELECT log.vn_id, log.vn, to_char(log.date_add, 'HH24:MI') AS time_th, patient.hn, patient.pa_pre_name || patient.pa_name || ' ' || patient.pa_lastname AS patient_name, log.station_id, appointment.id AS appointment_id, log.nano_queue_id AS queue_id
				FROM jvkk.nano_queue_log AS log
				INNER JOIN medrec.nano_visit AS visit ON visit.vn = log.vn
				INNER JOIN medrec.nano_patient AS patient ON patient.id = visit.id_patient
				INNER JOIN (SELECT vn, MAX(id) AS max_id FROM jvkk.nano_queue_log WHERE to_char(date_add, 'YYYY-MM-DD') = '{$date_select}' GROUP BY vn) AS queue_max ON (queue_max.max_id=log.id)
				LEFT JOIN frontmed.neural_appointment AS appointment ON appointment.visit_id = visit.id
				WHERE log.com_id2 IN ('27', '19') ";
		$sql.=	($com_id1 != 0)?"AND log.com_id1 = '{$com_id1}' ":"AND log.com_id1 IN (2, 11, 14, 19, 27, 46, 48, 49, 58) ";
		$sql.=	($this->input->get_post('hn'))?"OR visit.hn = '{$this->input->get_post('hn')}' ":NULL;
		$sql.= 	"GROUP BY log.vn_id, log.vn, log.date_add, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname, log.station_id, appointment.id, log.nano_queue_id
				 ORDER BY time_th ASC";

		$query = $this->db->query($sql, TRUE);

		$result['total'] = $query->num_rows();

		$result['rows'] = $query->result_array();

		header('Content-Type: application/json');

		echo json_encode($result);
	}

	public function load_data_queue ($station_id = NULL) {

		$result  = array();

		$this->load->model(array('mdl_queue_log'));

		//$query = $this->mdl_queue_log->filter_select($station_id, ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d'))->get();

		$date_select = ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d');

		$sql = "SELECT log.vn_id, log.vn, to_char(log.date_add, 'HH24:MI') AS time_th, patient.hn, patient.pa_pre_name || patient.pa_name || ' ' || patient.pa_lastname AS patient_name, log.station_id, appointment.id AS appointment_id, log.nano_queue_id AS queue_id
				FROM jvkk.nano_queue_log AS log
				INNER JOIN medrec.nano_visit AS visit ON visit.vn = log.vn
				INNER JOIN medrec.nano_patient AS patient ON patient.id = visit.id_patient
				INNER JOIN (SELECT vn, MAX(id) AS max_id FROM jvkk.nano_queue_log WHERE to_char(date_add, 'YYYY-MM-DD') = '{$date_select}' AND station_id IS NOT NULL GROUP BY vn) AS queue_max ON (queue_max.max_id=log.id)
				LEFT JOIN frontmed.neural_appointment AS appointment ON appointment.visit_id = visit.id
				WHERE log.com_id1 = '10' AND log.com_id2 = '27' AND log.station_id = '{$station_id}'
				GROUP BY log.vn_id, log.vn, log.date_add, patient.hn, patient.pa_pre_name, patient.pa_name, patient.pa_lastname, log.station_id, appointment.id, log.nano_queue_id
				ORDER BY time_th ASC";

		$query = $this->db->query($sql, TRUE);

		$result['total'] = $query->num_rows();

		$result['rows'] = $query->result_array();

		header('Content-Type: application/json');

		echo json_encode($result);
	}

	public function print_app ($appointment_id = NULL) {

		$data = array();

		$query = $this->mdl_appointment->filter_select_id($appointment_id)->get();
		$option = $this->mdl_option->filter_select_option($appointment_id);

		$data['appointment'] = $query->row();
		$data['options'] 	 = $option->result();

		$this->load->view('print_appointment', $data);
	}

	public function send_queue ($appointment_id = NULL) {

		$data = array();

		$query = $this->mdl_appointment->filter_select_id($appointment_id)->get();

		$data['appointment'] = $query->row();

		$this->load->view('print_appointment', $data);
	}

	public function annul($appointment_id) {

		$date_select = $this->input->get_post('date_select');

        if($this->mdl_appointment->deleted($appointment_id)) {

			//echo 1;
			redirect("Appointment/history/{$date_select}");
		}

        //redirect('Med/index');
	}

	function check_total_appointment_med ($date=NULL, $doctor_id=NULL) {

		$result = $this->mdl_appointment->get_doctor_appointment_date_total($date, $doctor_id, $this->input->get_post('appointment_time'));

		//$data['result'] = $result->result_array();

		header('Content-Type: application/json');
		
		if ($result->num_rows() > 0) {
			
			echo json_encode($result->row());
		}
		else {
			
			echo "{\"sum_date\":\"0\",\"sum_time\":\"0\"}";
		}

		
	}


	function copy_med_station () {

		$sql = "INSERT INTO frontmed.neural_appointment (id, appointment_date, appointment_time, user_id, comment, component_id, visit_id, patient_id, created_by)
				SELECT
    				(id + 1) AS last_id, '2018-11-30', '10:00', '576', '', '10', '1818177', '133483', '232'
				FROM
    				frontmed.neural_appointment
				ORDER BY id DESC LIMIT 1";


		$sql = "INSERT INTO med.neural_med_station (check_out_date, station_id, doctor_id, created_by )
				SELECT
    				check_out_date + INTERVAL '1 day', station_id, doctor_id, created_by
				FROM
    				med.neural_med_station
				WHERE
					check_out_date = '2018-11-28'";
	}
}

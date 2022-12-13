<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Cgi extends CGI_Controller {

	public function __construct ()
	{
		parent::__construct();

		$this->load->model(array('mdl_cgi', 'mdl_cgi_clinic', 'mdl_cgi_score', 'mdl_patient', 'mdl_queue', 'mdl_header', 'mdl_icd10'));

	}

	public function index ($page = 0) {

		//if ($this->session->userdata('is_physician')) {

			//redirect('Cgi/physician');
		//}

		$content_data = array();

		$this->add_js_theme("dashboard_i18n.js", TRUE)->set_title('รายชื่อผู้ป่วยรอการประเมิณ CGI');

		$this->mdl_queue->filter_select()->paginate(site_url('cgi/index'), $page);

		$content_data = array('queues' => $this->mdl_queue->result());

        $data = $this->includes;

        $data['content'] = $this->load->view('cgi_index', $content_data, TRUE);

        $this->load->view($this->template, $data);
	}

	public function physician ($page = 0) {

		$content_data = array();

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('รายชื่อผู้ป่วยรอการประเมิณ CGI');

		$this->mdl_queue->paginate(site_url('cgi/physician'), $page);

		$this->mdl_queue->filter_select_station()->get();

		$content_data = array('queues' => $this->mdl_queue->result());

        $data = $this->includes;

		$data['content'] = $this->load->view('cgi_physician', $content_data, TRUE);

        $this->load->view($this->template, $data);
	}

	public function queue_record ($id=NULL) {

		$this->mdl_queue->record($id);

		redirect('Cgi/index');
	}

	public function queue_canceled ($id=NULL) {

		$this->mdl_queue->delete($id);

		redirect('Cgi/index');
	}

	public function search ($page=0) {

		$this->load->helper('date');

		$this->set_title("ค้นหา");

		$content_data = array();

		if ($this->input->get_post('btn_submit') AND $this->input->get_post('txtsearch')) {

			$this->mdl_patient->filter_select()->paginate(site_url('Cgi/search'), $page);

			$content_data = array('patients' => $this->mdl_patient->result());
		}

        $data = $this->includes;

        $data['content'] = $this->load->view('cgi_search', $content_data, TRUE);

        $this->load->view($this->template, $data);
	}

	public function cgi_form ($id = NULL) {

		if ($this->input->post('btn_cancel')) {

			redirect('Cgi/index');
		}

        if ($this->mdl_cgi->run_validation()) {

	        //print_r ($_POST['clinic']);

	        //exit();

        	$id = $this->mdl_cgi->save($id);

        	if ($this->input->get_post('from') == "index") {

				redirect("Cgi/index/{$this->input->get_post('page')}");
			}
        	else {

				redirect("Cgi/search?txtsearch={$this->input->post('hn')}&btn_submit=1");
			}

        }

		if ($id AND !$this->input->post('btn_submit')) {

			//echo $id;exit();

			if (!$this->mdl_cgi->prep_form($id)) {

				show_404();
			}

		}

		$this->mdl_header->filter_select($this->input->get_post('hn'));

		$content_data = array('clinics' => $this->mdl_cgi_clinic->get()->result(),
							  'scores' 	=> $this->mdl_cgi_score->get()->result(),
							  'headers' => $this->mdl_header->get()->row(),

							);

		// setup page header data
        $this->set_title("บันทึกแบบประเมิน CGI");

        $data = $this->includes;

		//echo $this->template;

		$data['content'] = $this->load->view('cgi_form', $content_data, TRUE);

		$this->load->view($this->template, $data);

    }

	public function histoy ($page = 0) {

		$this->load->helper('date');

		$content_data = array();

		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('ประวัติการประเมิณ CGI');

		$this->mdl_cgi->filter_select($this->input->get_post('hn'))->paginate(site_url('cgi/histoy'), $page);

		//$this->mdl_cgi->filter_select($this->input->get_post('hn'))->get();

		$this->mdl_header->filter_select($this->input->get_post('hn'));

		$content_data = array('histoys'  => $this->mdl_cgi->result(),
							  'headers' => $this->mdl_header->get()->row(),);

        $data = $this->includes;

		$data['content'] = $this->load->view('cgi_histoys', $content_data, TRUE);

        $this->load->view($this->template, $data);

	}

	public function deletes ($histoy_id = NULL) {

		$this->mdl_cgi->deleted($histoy_id, array('deleted' => 't'));

		redirect("Cgi/histoy?vn_id={$this->input->get_post('vn_id')}&hn={$this->input->get_post('hn')}&vn={$this->input->get_post('vn')}&from=search");
	}
}
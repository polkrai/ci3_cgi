<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Med extends Med_Controller {

	public function __construct ()
	{
		parent::__construct();
		
		$this->load->model(array('mdl_med_station', 'mdl_station', 'mdl_users'));
	
	}
	
	public function index ($page = 0) {
		
		$content_data = array();

		$date_select = ($this->input->get_post('date_select'))?$this->input->get_post('date_select'):date('Y-m-d');
		
		$this->add_js_theme( "dashboard_i18n.js", TRUE)->set_title('รายชื่อแพทย์ออกตรวจประจำวันที่ ' . date_to_thai($date_select, false));
		
		$this->mdl_med_station->filter_select($date_select)->get();//->paginate(site_url('Med/index'), $page);
		
		$content_data = array('med_queues' => $this->mdl_med_station->result());
		
        $data = $this->includes;
        
        //$data['content_left'] = $this->load->view('calendar/index', $content_data, TRUE);

        $data['content'] = $this->load->view('med_index', $content_data, TRUE);
        
        if ($this->input->get_post('is_ajax')) {

        	$data['header'] = "รายชื่อแพทย์ออกตรวจประจำวันที่ " . date_to_thai($date_select, false);
			
			$this->load->view('med_index', $data);
		}
		else {
			
			$this->load->view($this->template, $data);
		}
	}
	
	public function form_med ($date = NULL) {
	
		
		if ($this->input->post('btn_cancel')) {
			
			redirect('Med/index');
		}
			  		
		if ($this->mdl_med_station->run_validation('validation_rules')) {	
			
			if ($date) {
				
				foreach ($_POST['doctor_id'] as $id => $value) {
					
					//$db_array['doctor_id'] = $value;
					
					$this->mdl_med_station->save($id);
				}
				
			}
			else {				
			
				foreach ($_POST['doctor_id'] as $key => $value) {
					
					$db_array['check_out_date'] = $this->input->post('check_out_date');
					$db_array['station_id'] 	= $key;
					$db_array['doctor_id']  	= $value;
					$db_array['created_by']  	= $this->session->userdata('user_id');
					
					if (!empty($value)) {
						
						if ($this->mdl_model->check_med_station($this->input->post('check_out_date'), $key)){
							
							$this->mdl_med_station->save(NULL, $db_array);
						}					
					}
				}
				
			}
			
			 redirect('Med/index');
        	
        }
        
		
		if ($date AND !$this->input->post('btn_submit')) {
				
			//echo $id;exit();
			
			if (is_numeric($date)) {
				
				if (!$this->mdl_med_station->prep_form($date)) {
				
					show_404();
				}
				
			}
			else {
				
				if (!$this->mdl_med_station->date_prep_form($date)) {
				
					show_404();
				}
			}
			

		}
			
		$content_data = array();

		if ($date){
			
			$this->set_title('แก้ไขข้อมูลแพทย์ออกตรวจประจำวันที่ ' . date_to_thai($date, false));
		}
		else {
			
			$this->set_title('บันทึกข้อมูลแพทย์ออกตรวจประจำวันที่ ' . date_to_thai($this->input->get_post('date_select'), false));
		}
		
		$this->mdl_station->filter_select('t')->get();
		
		$this->mdl_users->filter_select()->get();
		
		$content_data = array('stations' => $this->mdl_station->result(),
						      'users'	 => $this->mdl_users->user_dropdown($this->mdl_users->result()),);
		
		$data = $this->includes;
       
        $data['content'] = $this->load->view(($date)?'form_med_edit':'form_med', $content_data, TRUE);
		
		$this->load->view($this->template, $data);
	}
	
	public function med_deleted($id) {
        	
        $this->mdl_med_station->delete($id);
        
        redirect('Med/index');
    }
    
    public function get_ajax () {
	    
	    
    }
	
}
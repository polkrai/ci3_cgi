<div class="container-fluid" style="padding-left:5px;padding-right:5px;">
<?php $this->load->view('Cgi/cgi_header'); ?>
</div>

<div class="row marketing" style="margin-left: -2px;">

	<div class="col-lg-6">

		<fieldset class="scheduler-border" style="background-color:#f8f8f8;font-size: 16px;color: #07c;">
		    <legend class="scheduler-border">CGI - Severity of illness (CGI-S)</legend>
		        <p>1 normal, not at all ill</p>
		        <p>2 borderline mentally ill</p>
		        <p>3 mildly ill</p>
		        <p>4 moderately ill</p>
		        <p>5 markedly ill</p>
		        <p>6 severely ill</p>
		        <p>7 among the most extremely ill patients</p>
		</fieldset>

	</div>
	<div class="col-lg-6">

		<form method="post" id="form-cgi" action="<?php echo current_full_url()?>" style="width:80%;" >

			<?php //$this->layout->load_view('layout/alerts'); ?>

			<div class="form-group">
				<label for="created_date">วันที่บันทึก:</label>
				<br />
				<div class="input-group" id="datetimepicker" style="width: 220px;">
					<input type='text' class="form-control" id="created_date" name="created_date" value="<?php echo ($this->mdl_cgi->form_value('created_date'))?$this->mdl_cgi->form_value('created_date'):date('Y-m-d')?>" style="height: 30px;" required />
					<span class="input-group-addon">
						<span class="glyphicon glyphicon-calendar"></span>
					</span>
				</div>
			</div>

			<div class="form-group">
				<label for="clinic1">คลินิก:</label>
				<br />
				<select id="clinic1" name="clinic1" style="border: 1px solid #cccccc;box-shadow: 0 1px 1px rgba(0, 0, 0, 0.075) inset;height: 30px;width: 220px;" required >
					<?php foreach ($clinics as $clinic) :?>
					<option value="<?php echo $clinic->id?>" <?php echo ($this->mdl_cgi->form_value('clinic1') == $clinic->id)?"selected":NULL?>><?php echo $clinic->clinic_name?></option>
					<?php endforeach;?>
				</select>
				<!-- <input type="text" class="form-control" id="clinic" name="clinic"> -->
		    </div>

			<div class="form-group">
		      <label for="cgi_score">คะแนน cgi:</label>
		      <br />
			  <select class="selectpicker" id="cgi_score" name="cgi_score" oninvalid="this.setCustomValidity('คะแนน cgi ไม่ควรเป็นค่าว่าง')" required>
				<option value="">เลือกคะแนน</option>
				<?php foreach ($scores as $score) :?>
				<option value="<?php echo $score->id?>" <?php echo ($this->mdl_cgi->form_value('cgi_score') == $score->id)?"selected":NULL?>><?php echo $score->id?></option>
				<?php endforeach;?>
			  </select>
		      <!-- <input type="text" class="form-control" id="cgi_score" name="cgi_score" style="width:50px;" value="<?php echo $this->mdl_cgi->form_value('cgi_score'); ?>"> -->
		    </div>

			<br />
		    <!-- <div class="checkbox">
		      <label><input type="checkbox" name="remember"> Remember me</label>
		    </div> -->

			<button class="btn btn-primary" id="btn-submit" name="btn_submit" value="1"><i class="icon-ok icon-white"></i> บันทึก</button>
			<button class="btn btn-danger"  id="btn-cancel" name="btn_cancel" value="1"><i class="icon-remove icon-white"></i> ยกเลิก</button>

			<input type="hidden" name="vn_id" value="<?php echo $this->input->get_post('vn_id')?>" />
			<input type="hidden" name="hn" value="<?php echo $this->input->get_post('hn')?>" />

		</form>
	</div>
</div>
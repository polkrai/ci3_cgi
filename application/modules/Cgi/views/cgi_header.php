<fieldset class="scheduler-border" style="background-color:#f8f8f8;">

	<legend class="scheduler-border">ข้อมูลทั่วไปผู้ป่วย</legend>
		    	
	<form class="form-inline navbar-left" style="font-size: 16px; color: #101094">
	
		<div class="input-container">
	     <div class="inline-content">
	        <label style="width: 80px;text-align: right;">ชื่อ - สกุล :</label>
			<label style="width: 300px;font-weight: bold;text-align: left;"><?php echo $headers->pa_pre_name . $headers->pa_name ?>  <?php echo $headers->pa_lastname ?></label>
			<label style="width: 80px;text-align: right;">HN :</label>
			<label style="width: 80px;font-weight: bold;"><?php echo $headers->hn?></label>
		</div>
	   </div>
		
		<div class="form-group">
			<label style="width: 80px;text-align: right;">เพศ :</label>
			<label style="width: 50px;font-weight: bold;text-align: right;"><?php echo ($headers->pa_sex == 1)?"ชาย":"หญิง"?></label>
		</div>
		
		<div class="form-group">
			<label style="width: 120px;">วัน/เดือน/ปี เกิด :</label>
			<label style="width: 100px;font-weight: bold;"><?php echo $headers->birthdate?></label>
		</div> 
		<div class="form-group">
		
			<?php $priority = array('โรคหลัก', 'โรคร่วม', 'โรคแทรก');?>
		
			<?php $this->mdl_icd10->filter_select($this->input->get_post('vn_id'))?>
			
			<label style="width: 150px;">รหัสวินิจฉัย (ICD-10) :</label>
			<?php $this->mdl_icd10->filter_priority('4')?>
			<?php $rows = $this->mdl_icd10->get()->result()?>
			<?php $i=0; foreach ($rows as $row) :?>		
			<label style="width: 65px;font-style: italic;text-align: right;"><?php echo $priority[$i]?></label>	
			<label style="width: 40px;font-weight: bold;"><?php echo $row->code?></label>
			<?php $i++; endforeach;?>
		</div>
		
	</form>
	
</fieldset>
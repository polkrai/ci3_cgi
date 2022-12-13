	    	
<form class="form-inline navbar-left" style="color: #101094; width:100%;" method="post">

	<div class="form-group" style="width: 350px;">
		<label style="width:100px;text-align: right;">เริ่มจากวันที่ :</label>
		<div class="input-group" id="datetimepicker">
			<input type='text' class="form-control" id="start_date" name="start_date" required />
			<span class="input-group-addon">
				<span class="glyphicon glyphicon-calendar"></span>
			</span>
		</div>
	</div>
	
	<div class="form-group" style="width: 350px;">
		<label style="width: 100px;text-align: right;">ถึงมจากวันที่ :</label>
		<div class="input-group" id="datetimepicker">
			<input type='text' class="form-control" id="end_date" name="end_date" required />
			<span class="input-group-addon">
				<span class="glyphicon glyphicon-calendar"></span>
			</span>
		</div>
	</div>
	
	<button type="submit" name="btn_submit" class="btn btn-success" value="1">ค้นหา</button>

</form>


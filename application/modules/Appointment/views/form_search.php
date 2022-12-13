<?php if ($form_search === "search_hn"): ?>

	<form id="formsearch" action="" method="post" class="form-inline" style="float: right;" data-toggle="validator" novalidate="true">
		<div class="form-group">
			<input type="text" class="form-control" id="search_hn" name="search_hn" onfocus="this.select();" placeholder="ค้นหา HN" style="width: 160px;" required="required" data-error="ช่องนี้ไม่ควรเป็นค่าว่าง"/>
		</div>
		<button type="button" class="btn btn-default btn-sm" id="bth_search" onclick="searchHN();">ค้นหา</button>
	</form>
	
<?php elseif ($form_search === "search_highlight"):?>

	<form id="formsearch_highlight" class="form-inline" style="float: right;" data-toggle="validator">
		
		<div class="form-group">
			<!-- <label class="sr-only" for="input_search">ค้นหา</label> -->
	        <input type="text" class="form-control textSearchvalue_h" id="input_search" name="input_search" placeholder="ค้นหา" style="width: 160px;" required="required" data-error="ช่องนี้ไม่ควรเป็นค่าว่าง" onfocus="this.select()"/> <!-- onfocus="this.select();" -->
	    </div>
	    <!-- <a href="javascript:void(0)" id="searchButton" class="btn btn-default btn-sm" role="button">ค้นหา</a> -->
		<button type="button" id="searchButton" class="btn btn-default btn-sm">ค้นหา</button> <!-- onclick="search_highlight();"
	    <!-- <a href="javascript:void(0)" id="next_h" class="btn btn-default btn-sm" role="button">ถัดไป</a> -->
		<!-- <button type="button" id="next_h" class="btn btn-default btn-sm">ถัดไป</button> -->
	    <!-- <a href="javascript:void(0)" id="previous_h" class="btn btn-default btn-sm" role="button">ก่อนหน้า</a> -->
		<!-- <button type="button" id="previous_h" class="btn btn-default btn-sm">ก่อนหน้า</button> -->
	    
	</form>
	
<?php endif;?>
<!--
<div class="searchContend_h">
	<div class="ui-grid-c">
	    <div class="ui-block-a">
	        <input name="text-12" id="text-12" value="" type="text" class="textSearchvalue_h">
	    </div>
	    <div class="ui-block-b"> 
		    <a href="#" data-role="button" data-corners="false" data-inline="true" class="searchButtonClickText_h">Search</a>
	
	    </div>
	    <div class="ui-block-c"> <a href="#" data-role="button" data-corners="false" data-inline="true" class="next_h">Next</a>
	
	    </div>
	    <div class="ui-block-d"> 
		    <a href="#" data-role="button" data-corners="false" data-inline="true" class="previous_h">Previous</a>			
	    </div>
	</div>
</div> 
-->
<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

//require APPPATH.'/libraries/REST_Controller.php';

class Scraper extends REST_Controller {

	public function __construct()
	{
		parent::__construct();
	}

	public function index()
	{
		$this->load->helper('url');
		
		$data = array();

		
		// See if we have google analytics tracking code
		if($this->config->item('ganalytics_id')) {
			$data['ganalytics_id'] = $this->config->item('ganalytics_id');
		}		
		
		
		$this->load->view('scrape', $data);
	}
	
	
	public function scrape_get() {

		$url  			= $this->config->item('faq_source_url');
		$xml_file_path 	= $this->config->item('xml_file_path');

		// make sure we have up to date xml, otherwise, get a new copy
		//$this->get_xml($url, $xml_file_path);

		$records = $this->save_records($xml_file_path);
		
		return	$this->response($records, 200);
	
	}
	
	
	
	public function get_xml($url, $xml_file_path) {

		//TODO
		// Check to see if we already have the file and only download again if older than 24 hours. 

		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		
		$data = curl_exec($ch);
		
		curl_close($ch);
		
		file_put_contents($xml_file_path, $data);
		
		return true;

	}		
	
	
	public function save_records($xml_file_path) {
		
			// Specify configuration for Tidy
			$config = array(
			           'indent'         => true,
			           'output-xhtml'   => false,
			           'output-html'   => true,	
					   'show-warnings'	=> false,
					   'show-body-only' => true,
			           'wrap'           => 200);


			$count = 1;


			$XMLReader = new XMLReader;	
			$XMLReader->open($xml_file_path);

			// Move to the first "[item name]" node in the file.
			while ($XMLReader->read() && $XMLReader->name !== "Row");


			// Now that we're at the right depth, hop to the next "[item name]" until the end of tree/file.
			while ($XMLReader->name === "Row") {
				
				// For testing - append to where clause above to limit output:  && $count < 200
				
				// Skip the first row since it's just column headings
				if ($count > 1) {


					$xml = null;
					$xml = $XMLReader->readOuterXML();					
					$xml = $this->insert_cdata($xml);

					$xml_validate = $this->check_xml($xml);

					if ($xml_validate === true) {

						$node = new SimpleXMLElement($xml);

						$record = null;
						//if($count > 5) exit;

						$record['url'] 			= (string)$node->Item[0];

						$record['faq_id']			= substr($record['url'], strpos($record['url'], '?p_faq_id=') + 10);

						$record['question'] 	= (string)$node->Item[1];
						//$record['answer'] 		= (string)$node->Item[2];  


						$search = array('<![CDATA[', ']]>', '<BR>', '</LI>', '</P>', '</UL>', '&nbsp;');
						$replace = array('', '', " \n", "</LI> \n", "</P> \n\n", "</UL> \n\n", ' ');


						$answer = (string)$node->Item[2];
						$answer = html_entity_decode($answer);										
						$answer_clean 				= str_replace($search, $replace, $answer);
						$record['answer_text'] 		= strip_tags($answer_clean);                

						$tidy = new tidy;
						$tidy->parseString($answer_clean, $config, 'utf8');
						$tidy->cleanRepair();

						$record['answer_html'] = $tidy->value;		



						$record['ranking'] 		= (string)$node->Item[3];                        
						$record['last_updated'] = (string)$node->Item[4];
					
						$record['last_updated'] = ($record['last_updated']) ? date(DATE_ATOM, strtotime($record['last_updated'])) : null;
						//$record['last_updated'] = ($record['last_updated']) ? strtotime($record['last_updated']) : null;					
						//$today = date("Y-m-d H:i:s");

						$record['topic'] 		= (string)$node->Item[5];                        
						$record['sub_topic'] 	= (string)$node->Item[6];

						// Set empty strings as null
						array_walk($record, array($this,'check_null'));

						// OpenCalais API Calls 
						if (isset($this->config->item('enable_calais')) && $this->config->item('enable_calais') === true) {
							
							$record = $this->calais_tags($record);
												
						}
										
						$this->process_record($record);
					
					} 
					else {
						return $xml_validate;
					}					
					
				}

				// Skip to the next node of interest.
				$XMLReader->next("Row");
				$count++;
			}

			return array('success' => "Imported $count records");

	}
	
	
	
	
	
	
	
	public function process_record($record) {



		if($record['topic'] || $record['subtopic']) {

			$taxonomy = array('faq_id' => $record['faq_id'], 
							  'topic'  => $record['topic'], 
							  'sub_topic' => $record['sub_topic']);

			$this->db->insert('taxonomy', $taxonomy);		
			
			// unset once saved
			unset($record['topic']);
			unset($record['sub_topic']);			
			
		}

		if($record['question']) {

			// Save tag and subtopic
			// unset once saved
			//unset($record['calais_tag']);
			//unset($record['calais_topic']);

			$this->db->insert('answers', $record);		
		}

	}	
	
	
	
	
	public function check_null(&$value) {
		$value = (empty($value)) ? null : $value;
	}	
	
	
	
	
	
	public function insert_cdata($xml) {

		$start = array();
		$position = 0;
		while($position = strpos($xml, '<Item>', $position+1)) {
			$start[] = $position+1;
		}
		
		while($position = strpos($xml, '</Item>', $position+1)) {
			$end[] = $position+1;
		}		
		
		if(isset($start[1]) && ($start[1] > ($start[0] + 6))) {
			
			$length = ($end[1] + 6) - $start[1];
			$encoded = substr($xml, $start[1], $length);
			$decoded = html_entity_decode(htmlspecialchars($encoded, ENT_NOQUOTES, 'UTF-8', false), ENT_QUOTES, 'UTF-8');

			$xml = str_replace($encoded, $decoded, $xml);

			// recalculate start tags now that we modified the source	
			$start = array();
			$position = 0;		
			while($position = strpos($xml, '<Item>', $position+1)) {
				$start[] = $position+1;
			}			

		}
				

		if(isset($start[2]) && ($start[2] > ($start[1] + 6))) {

			$xml = $this->str_insert('<![CDATA[', $xml, $start[2]+5);

			// recalculate end tag position now that we've modified the source
			$position = 0;	
			$end = array();
			while($position = strpos($xml, '</Item>', $position+1)) {
				$end[] = $position+1;
			}						

			$xml = $this->str_insert(']]>', $xml, $end[2]-1);			

			// these were still catching the parser for some reason
			$search = array('&amp;nbsp;', '&nbsp;');
			$xml = str_replace($search, ' ', $xml);

		}

		return $xml;	

	}
	
	
	
	
	public function check_xml($xml){
	    libxml_use_internal_errors(true);

	    $doc = new DOMDocument('1.0', 'utf-8');
	    $doc->loadXML($xml);

	    $errors = libxml_get_errors();

	    if(empty($errors)){
	        return true;
	    }

	    $error = $errors[0];
	    if($error->level < 3){
	        return true;
	    }

	    $explodedxml = explode("r", $xml);
	    $badxml = $explodedxml[($error->line)-1];

	    $message = $error->message . ' at line ' . $error->line . '. Bad XML: ' . htmlentities($badxml);
	    return array('source' => $xml, 'error' => $message);
	}	
	

	public function calais_tags($record) {
		
				
		$apikey = $this->config->item('open_calais_api');
		$calais_header = array("x-calais-licenseID: $apikey",
						 'content-type: TEXT/RAW',
						 'outputformat: Application/JSON',
						 'enableMetadataType: SocialTags');		
		
		$calais = $this->post_to_json('http://api.opencalais.com/tag/rs/enrich', $calais_header, $record['answer_text']);
	
		$social_tag = array();
		$topic = array();						
	
		foreach ($calais as $key => $metadata) {

			if(!empty($metadata['_typeGroup'])) {
			
				if($metadata['_typeGroup'] == 'topics') {
					$topic[] = array('category' => $metadata['category'], 
									 'name' => $metadata['categoryName'], 
									 'score' => $metadata['score']);
				}
		
				if($metadata['_typeGroup'] == 'socialTag') {
					$social_tag[] = array('id' => $metadata['socialTag'], 
									 'name' => $metadata['name'], 
									'importance' => $metadata['importance']);
				}				
			}			
		
		}
	
		if(!empty($social_tag)) $record['calais_tag'] = $social_tag;
		if(!empty($topic)) $record['calais_topic'] = $topic;		
		
		return $record;
	}


	public function str_insert($insertstring, $intostring, $offset) {
	   $part1 = substr($intostring, 0, $offset);
	   $part2 = substr($intostring, $offset);

	   $part1 = $part1 . $insertstring;
	   $whole = $part1 . $part2;
	   return $whole;
	}	
	
	
	
	public function curl_to_json($url) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		$data=curl_exec($ch);
		curl_close($ch);


		return json_decode($data, true);	

	}	
	
	
	public function post_to_json($url, $custom_headers, $body) {

		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $body);		
		curl_setopt($ch, CURLOPT_HTTPHEADER, $custom_headers);				
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
		$data=curl_exec($ch);
		curl_close($ch);
		return json_decode($data, true);	

	}	
	
}
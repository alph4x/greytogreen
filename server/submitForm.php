<?php 

// require('db_connect.php');
require_once("includes/db_connect.php");
require_once("../PaytmKit/lib/config_paytm.php");
require_once("../PaytmKit/lib/encdec_paytm.php");





function postValidate()	{	//validates post params - checks if all required params are set
	$field_names = array("fname", "lname", "email", "numtrees", "totalprice");
	for($i = 0; $i < sizeof($field_names); $i++)	{
		if(!isset($_POST[$field_names[$i]]))	{
			echo "Error! : " . $field_names[$i]."\n" ;

		}
	}
	echo "validated";
}

function processRequest($conn)	{
	echo "Connected Successfully\n";
	postValidate();
	$name = $_POST['fname'] . " " . $_POST['lname'];
	$email = $_POST['email'];
	$order_id = time() + $email;
	$order_id = md5($order_id);
	$numtrees = $_POST['numtrees'];
	$totalprice = $_POST['totalprice'];
	$sql = "INSERT INTO `users`(`order_id`, `name`, `email`, `number_trees`, `total_price`) VALUES ('{$order_id}', '{$name}','{$email}',{$numtrees}, {$totalprice})";


	if ($conn->query($sql) === TRUE) {
	    echo "\nNew record created successfully\n";
	    return $order_id;

	} else {
	    echo "\nError: " . $sql . "<br>" . $conn->error . "\n";
	    die("Insert query error!");
	    return "0";
	}


}

$conn = OpenCon();


$ORDER_ID = processRequest($conn);

$checkSum = "";
$paramList = array();

// Create an array having all required parameters for creating checksum.
$paramList["MID"] = PAYTM_MERCHANT_MID;
$paramList["ORDER_ID"] = $ORDER_ID;
$paramList["CUST_ID"] = $_POST['email'];
$paramList["INDUSTRY_TYPE_ID"] = "Retail";
$paramList["CHANNEL_ID"] = "WEB";
$paramList["TXN_AMOUNT"] = $_POST['totalprice'];
$paramList["WEBSITE"] = PAYTM_MERCHANT_WEBSITE;


$paramList["CALLBACK_URL"] = "http://127.0.0.1:8080/gtg/server/paytmResponse.php";
// $paramList["MSISDN"] = $MSISDN; //Mobile number of customer
$paramList["EMAIL"] = $_POST['email']; //Email ID of customer	
// $paramList["VERIFIED_BY"] = "EMAIL"; //
// $paramList["IS_USER_VERIFIED"] = "YES"; //



//Here checksum string will return by getChecksumFromArray() function.
$checkSum = getChecksumFromArray($paramList,PAYTM_MERCHANT_KEY);





CloseCon($conn);



	
 ?>


 <html>
<head>
<title>Merchant Check Out Page</title>
</head>
<body>
	<center><h1>Please do not refresh this page...</h1></center>
		<form method="post" action="<?php echo PAYTM_TXN_URL ?>" name="f1">
		<table border="1">
			<tbody>
			<?php
			foreach($paramList as $name => $value) {
				echo '<input type="hidden" name="' . $name .'" value="' . $value . '">';
			}
			?>
			<input type="hidden" name="CHECKSUMHASH" value="<?php echo $checkSum ?>">
			</tbody>
		</table>
		<script type="text/javascript">
			document.f1.submit();
		</script>
	</form>
</body>
</html>
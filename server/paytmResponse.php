<?php
header("Pragma: no-cache");
header("Cache-Control: no-cache");
header("Expires: 0");

// following files need to be included
require_once("includes/db_connect.php");
require_once("../PaytmKit/lib/config_paytm.php");
require_once("../PaytmKit/lib/encdec_paytm.php");

$paytmChecksum = "";
$paramList = array();
$isValidChecksum = "FALSE";

$paramList = $_POST;
$paytmChecksum = isset($_POST["CHECKSUMHASH"]) ? $_POST["CHECKSUMHASH"] : ""; //Sent by Paytm pg

//Verify all parameters received from Paytm pg to your application. Like MID received from paytm pg is same as your application’s MID, TXN_AMOUNT and ORDER_ID are same as what was sent by you to Paytm PG for initiating transaction etc.
$isValidChecksum = verifychecksum_e($paramList, PAYTM_MERCHANT_KEY, $paytmChecksum); //will return TRUE or FALSE string.

$conn = OpenCon();

$ORDERID = $_POST['ORDERID'];


if($isValidChecksum == "TRUE") {
	echo "<b>Checksum matched and following are the transaction details:</b>" . "<br/>";
	if ($_POST["STATUS"] == "TXN_SUCCESS") {
		echo "<b>Transaction status is success</b>" . "<br/>";
		//Process your transaction here as success transaction.
		//Verify amount & order id received from Payment gateway with your application's order id and amount.

		$res = 1;

	}
	else {
		echo "<b>Transaction status is failure</b>" . "<br/>";
		$res = 0;
	}


	$sql = "UPDATE `users` SET `response`= {$res} WHERE `order_id` = '$ORDERID'";

	if ($conn->query($sql) === TRUE) {
	    echo "\nresponse updated successfully\n";

	} else {
	    echo "\nError: " . $sql . "<br>" . $conn->error . "\n";
	    // die("Insert query error!");
	}


	if (isset($_POST) && count($_POST) > 0 )
	{ 
		foreach($_POST as $paramName => $paramValue) {
				echo "<br/>" . $paramName . " = " . $paramValue;
		}
	}
	

}
else {
	echo "<b>Checksum mismatched.</b>";
	//Process transaction as suspicious.
}

function processVariables($str)	{
	// echo $_POST[$str];

	if(isset($_POST[$str]))	{
		$z = $_POST[$str];
		return "'$z'";
	}
	else 	{
		echo "<br> proceess prob".$str ." <br>";
		return "NULL";
	}
}





$sql = "INSERT INTO `transactions`(`ORDERID`, `TXNID`, `TXNAMOUNT`, `STATUS`, `RESPCODE`, `RESPMSG`, `PAYMENTMODE`, `TXNDATE`, `BANKTXNID`, `CHECKSUM_MATCHED`) VALUES ('$ORDERID',". processVariables("TXNID") .",". processVariables("TXNAMOUNT") .",". processVariables("STATUS") .",". processVariables("RESPCODE") .",". processVariables("RESPMSG") .",". processVariables("PAYMENTMODE") .",". processVariables("TXNDATE") .",". processVariables("BANKTXNID") .",'$isValidChecksum')";

echo "<br>";
echo $sql;
echo "<br>";


	if ($conn->query($sql) === TRUE) {
	    echo "\nNew record created successfully\n";

	} else {
	    echo "\nError: " . $sql . "<br>" . $conn->error . "\n";
	    // die("Insert query error!");
	}

	header("Location: http://127.0.0.1:8080/gtg/thankyou.html"); 

CloseCon($conn);



?>
<?php
	define ( 'DATA_FILE' , "data_sensor.json");

	if ( isset($_GET['clear']) ) {
		file_put_contents(DATA_FILE, "{}");
		$data = "";
		header('Location: '.$_SERVER['PHP_SELF']);
	}
	else {
		$data = json_encode( json_decode( file_get_contents(DATA_FILE) ), JSON_PRETTY_PRINT );
	}
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>ThingPark AS Demo</title>
		<style type="text/css">
			body, html {
				padding: 10px 10px 10px 10px;
				background-color: #FFFFFF;
				font-family: Verdana, sans-serif;
				font-size: 11pt;
				text-align: left;
			}
		</style>
	</head>
	<body>
		<a href="index.php">Home</a>
		<h1>ThingPark AS Demo</h1>
		<p>The last sensor message with meta data:</p>
		<pre><?php echo $data; ?></pre>
		<a 
			href="<?php echo $_SERVER['PHP_SELF'].'?clear=1'; ?>" 
			onclick="return confirm('Please confirm that you want to clear.');"
		>
			Clear
		</a>
	</body>
</html>

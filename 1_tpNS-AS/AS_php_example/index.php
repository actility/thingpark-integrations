<?php
	$url_base = 'http://'.$_SERVER['SERVER_NAME'] . dirname($_SERVER['REQUEST_URI']) . '/';
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
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
	<head>
	<body>
		<h1>ThingPark AS Demo</h1>
		<h2>For all types of sensors:</h2>
		<ul>
			<li>
				Application Server API: <u><?php echo $url_base; ?>api_sensor.php</u>
			</li>
			<li>Received Message (latest):
				<a href="view_data_sensor.php">
					<?php echo $url_base; ?>view_data_sensor.php
				</a>
			</li>
		</ul>
	</body>
</html>

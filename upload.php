<?php
// This code will move the image file to the images/ directory, with the uploaded file name. 
// Do not use this code in production, it's basically just a giant security hole. 


if (isset($_FILES['image']) && isset($_POST['altText'])) {
    $path = 'images/';
    $imagePath = $path . $_FILES['image']['name'];
    if (move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
        // You must return a JSON response with a type=success and the image URL    
        $response = new stdClass();
        $response->type == 'success';
        $response->imageUrl = $imagePath;
        $response->altText = $_POST['altText'];
        print json_encode($response);
    } else {
        // If something goes wrong, report that, too
        $response = new stdClass();
        $response->type == 'error';
        $response->message = 'Couldn\'t move the uploaded file';
        print json_encode($response);
    }
} else {
    $response = new stdClass();
    $response->type == 'error';
    $response->message = 'Missing image or alt text';
    print json_encode($response);
}
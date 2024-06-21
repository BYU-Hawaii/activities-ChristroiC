<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $comments = htmlspecialchars($_POST['comments']);
    $rating = htmlspecialchars($_POST['rating']);

    // Format the feedback entry
    $feedback_entry = "Submission Date: " . date("Y-m-d H:i:s") . "\n";
    $feedback_entry .= "Name: $name\n";
    $feedback_entry .= "Email: $email\n";
    $feedback_entry .= "Comments: $comments\n";
    $feedback_entry .= "Rating: $rating\n\n";

    // Specify the path to the feedback.txt file
    $file_path = "feedback.txt";

    // Check if the file exists, if not, create it
    if (!file_exists($file_path)) {
        $file = fopen($file_path, "w"); // Create new file
        fclose($file);
    }

    // Open the file in append mode
    $file = fopen($file_path, "a");

    if ($file) {
        fwrite($file, $feedback_entry);
        fclose($file);
        echo "Thank you for your feedback!";
    } else {
        echo "Unable to open the file.";
    }
} else {
    echo "Invalid request.";
}
?>

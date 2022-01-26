<?php
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $company_name = $_POST['company_name'];
    $email = $_POST['email'];
    $job_title = $_POST['job_title'];
    $date = $_POST['date'];
    $attendees = $_POST['attendees'];
    $address = $_POST['address'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $zip = $_POST['zip'];
    $message = $_POST['message'];

    $email_from = 'Message rockaraoke.com';
    $email_subject = "New Message from rockaraoke.com";
    $email_body = "First Name: $first_name.\n".
                    "Last Name: $last_name.\n".
                    "Company Name: $company_name.\n".
                    "Email: $email.\n".
                    "Job Title: $job_title.\n".
                    "Date: $date.\n".
                    "Attendees: $attendees.\n".
                    "Address: $address.\n".
                    "City: $city.\n".
                    "State: $state.\n".
                    "Zip: $zip.\n".
                    "Message: $message.\n";
    $to ="info@rockaraoke.com";
    $headers = "From: $email_from \r\n";
    $headers .= "Reply-To: $email \r\n";

    mail($to,$email_subject,$email_body,$headers);
    header("Location: ../thanks.html");
?>
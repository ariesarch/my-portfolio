<?php
class RestaurantReservationSystem
{
    private $restaurants = [];
    private $current_date = 1; // Initialize current date to 1

    // Function to add a restaurant to the system
    public function addRestaurant($restaurant_id, $contact_info, $reservation_period, $min_people, $max_people, $business_hours)
    {
        $this->restaurants[$restaurant_id] = [
            'contact_info' => $contact_info,
            'reservation_period' => $reservation_period,
            'min_people' => $min_people,
            'max_people' => $max_people,
            'business_hours' => $business_hours,
            'reservations' => [] // Initialize reservations for this restaurant
        ];
    }
    function calculateReservationPeriod($A, $B, $reservationDate)
    {
        // Calculate the starting date of the acceptable reservation period
        $startingDate = $reservationDate - $A;

        // Calculate the ending date of the acceptable reservation period
        $endingDate = $reservationDate - $B;

        // Return the starting and ending dates as an array
        return [$startingDate, $endingDate];
    }

    // Function to handle a reservation request
    public function handleReservationRequest($reservation_id, $user_id, $restaurant_id, $date, $time, $num_people)
    {
        // Check if the restaurant exists
        if (!isset($this->restaurants[$restaurant_id])) {
            echo "Error: No such restaurant\n";
            return;
        }

        // Retrieve restaurant information
        $restaurant = $this->restaurants[$restaurant_id];
        $reservation_period_start = $restaurant['reservation_period'][0];
        $reservation_period_end = $restaurant['reservation_period'][1];
        $min_people = $restaurant['min_people'];
        $max_people = $restaurant['max_people'];

        // Calculate the earliest and latest reservation dates allowed
        $reservationPeriod = $this->calculateReservationPeriod($reservation_period_start, $reservation_period_end, $date);
        // Check if the current date is within the reservation period
        if (!in_array($this->current_date, $reservationPeriod)) {
            echo "Error: Outside of reservation period\n";
            return;
        }

        // Check if the time falls within business hours
        $business_hours = $restaurant['business_hours'][$date - 1];
        $time_within_hours = false;
        $reservation_time = strtotime($time);
        // echo "Reserve Time: {$time} \n";
        // print_r($business_hours);
        // foreach ($business_hours as $key=>$hours) {
        //     $start_time = strtotime($hours[0]);
        //     $end_time = strtotime($hours[1]);
        //     echo "Start Time: {$start_time} \n";
        //     echo "End Time: {$end_time} \n";
        //     echo "hours: \n";
        //     print_r($hours);
        //     if ($reservation_time >= $start_time && $reservation_time < $end_time) {
        //         $time_within_hours = true;
        //         break;
        //     }
        // }
        // echo "BusinessHours: \n";
        // print_r($restaurant['business_hours']);
        $start_time = strtotime($business_hours[0]);
        $end_time = strtotime($business_hours[1]);
        if ($reservation_time >= $start_time && $reservation_time < $end_time) {
            $time_within_hours = true;
        }

        if (!$time_within_hours) {
            echo "Error: Outside of business hours\n";
            return;
        }

        // Check if the number of people falls within the allowed range
        if ($num_people < $min_people || $num_people > $max_people) {
            echo "Error: Too many or too few people\n";
            return;
        }
        // Register reservation
        $reservationData = ['id' => $reservation_id, 'user_id' => $user_id, 'date' => $date, 'time' => $time, 'people' => $num_people, 'status' => 'Pending'];
        $this->restaurants[$restaurant_id]['reservations'][$reservation_id] = $reservationData;
        // echo "Prepared reservation: \n";
        // print_r($reservationData);
        // echo "Updated restaurant \n";
        // print_r($this->restaurants[$restaurant_id]); // Print the updated restaurant

        // Reservation request is valid, notify the restaurant
        echo "to:$restaurant_id Received a reservation request: $reservation_id $user_id $date $time $num_people\n";
    }

    // Function to confirm a reservation request
    public function confirmReservation($restaurantID, $reservationID)
    {
        // Check if the restaurant exists
        if (!isset($this->restaurants[$restaurantID])) {
            printf("Error: No such restaurant\n");
            return;
        }
        // echo "Restaurant ID param: {$restaurantID} \n";
        // echo "Reservation ID param: {$reservationID} \n";
        // print_r($this->restaurants[$restaurantID]);
        // Check if the reservation ID exists for the specified restaurant
        if (!isset($this->restaurants[$restaurantID]['reservations'][$reservationID])) {
            printf("Error: No such reservation ID\n");
            return;
        }

        // Get the reservation request
        $reservation = $this->restaurants[$restaurantID]['reservations'][$reservationID];
        // echo "Confirm for {$reservationID} \n";
        // print_r($reservation);
        // Check if the reservation request is already confirmed
        if ($reservation['status'] === "Confirmed") {
            printf("Error: Already confirmed\n");
            return;
        }

        // Confirm the reservation request
        $this->restaurants[$restaurantID]['reservations'][$reservationID]['status'] = "Confirmed";
        // printf("to:%s %s has been confirmed\n", $reservationID, $restaurantID);
        printf("to:%s %s has been confirmed\n", $reservation['user_id'], $reservationID); // Print the correct user ID
    }
    public function handleNextDay()
    {
        $this->current_date++;
        foreach ($this->restaurants as $restaurant_id => $restaurant_data) {
            ksort($restaurant_data['reservations']);
            foreach ($restaurant_data['reservations'] as $reservation_id => $reservation_data) {
                if ($reservation_data['status'] == 'Pending') {
                    $validPeriod = $this->calculateReservationPeriod($restaurant_data['reservation_period'][0], $restaurant_data['reservation_period'][1], $reservation_data['date']);
                    if (!in_array($this->current_date, $validPeriod)) {
                        echo "to:{$reservation_data['user_id']} {$reservation_id} has been auto-rejected\n";
                        unset($this->restaurants[$restaurant_id]['reservations'][$reservation_id]);
                        // return;
                    }
                }
            }
        }
        // echo "Updated reservations \n";
        // print_r($this->restaurants[$restaurant_id]);
    }
    // Function to remove a restaurant
    public function removeRestaurant($restaurantID)
    {
        // Check if the restaurant exists
        if (!isset($this->restaurants[$restaurantID])) {
            printf("Error: No such restaurant\n");
            return;
        }

        // Remove the restaurant
        unset($this->restaurants[$restaurantID]);
        // printf("Restaurant %s has been removed\n", $restaurantID);
    }
}

// Sample input
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST s3iv5 Joe Mac 4 15:30 4\nCONFIRM Mac s3iv5\nCONFIRM Mac s3iv5\n";
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\n";
// NEXT_DAY2.in
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n-\n-\n-\n15:00-16:00\n-\n-\n-\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY";
// REMOVE-2.in
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST aaa Joe Mac 4 15:30 2\nREMOVE Mac\nREMOVE Mac";

// Explode input into lines
// $lines = explode("\n", $input);

// // Create a new instance of RestaurantReservationSystem
// $system = new RestaurantReservationSystem();

// // Parse restaurant information
// $restaurant_info = explode(" ", $lines[1]);
// $restaurant_id = $restaurant_info[0];
// $contact_info = $restaurant_info[1];
// $reservation_period = [$restaurant_info[2], $restaurant_info[3]];
// $min_people = $restaurant_info[4];
// $max_people = $restaurant_info[5];
// $business_hours = [];
// for ($i = 2; $i <= 8; $i++) {
//     $hours = explode("-", $lines[$i]);
//     // print_r($hours);
//     // echo "Start--- {$hours[0]} \n";
//     // echo "end--- {$hours[1]} \n";
//     $business_hours[] = [$hours[0], $hours[1]]; // Add the start and end times as an array
// }
// // print_r($business_hours);

// // Add restaurant to the system
// $system->addRestaurant($restaurant_id, $contact_info, $reservation_period, $min_people, $max_people, $business_hours);

// Parse and handle queries
// for ($i = 9; $i < count($lines) - 1; $i++) {
//     $query = explode(" ", $lines[$i]);
//     if ($query[0] == "REQUEST") {
//         // echo "RID Param:" . $query[1] . "\n";
//         // echo "UID Param:" . $query[2] . "\n";
//         // echo "RESID Param:" . $query[3] . "\n";
//         // echo "Date Param:" . $query[4] . "\n";
//         // echo "Time Param:" . $query[5] . "\n";
//         $system->handleReservationRequest($query[1], $query[2], $query[3], $query[4], $query[5], $query[6]);
//     } elseif ($query[0] == "CONFIRM") {
//         $system->confirmReservation($query[1], $query[2]); // Use index 2 for restaurant ID
//     }else if($query[0]== "NEXT_DAY") {
//         $system->handleNextDay();
//     }else if($query[0]== "REMOVE") {
//         $system->removeRestaurant($query[1]);
//     }
// }

function main($array, $system)
{
    // Explode input into lines
    $lines = $array;

    // Create a new instance of RestaurantReservationSystem


    // Parse restaurant information
    $restaurant_info = explode(" ", $lines[1]);
    $restaurant_id = $restaurant_info[0];
    $contact_info = $restaurant_info[1];
    $reservation_period = [$restaurant_info[2], $restaurant_info[3]];
    $min_people = $restaurant_info[4];
    $max_people = $restaurant_info[5];
    $business_hours = [];
    for ($i = 2; $i <= 8; $i++) {
        $hours = explode("-", $lines[$i]);
        // print_r($hours);
        // echo "Start--- {$hours[0]} \n";
        // echo "end--- {$hours[1]} \n";
        $business_hours[] = [$hours[0], $hours[1]]; // Add the start and end times as an array
    }
    // print_r($business_hours);

    // Add restaurant to the system
    $system->addRestaurant($restaurant_id, $contact_info, $reservation_period, $min_people, $max_people, $business_hours);

    // Parse and handle queries
    // for ($i = 9; $i < count($lines) - 1; $i++) {
    //     $query = explode(" ", $lines[$i]);
    //     if ($query[0] == "REQUEST") {
    //         // echo "RID Param:" . $query[1] . "\n";
    //         // echo "UID Param:" . $query[2] . "\n";
    //         // echo "RESID Param:" . $query[3] . "\n";
    //         // echo "Date Param:" . $query[4] . "\n";
    //         // echo "Time Param:" . $query[5] . "\n";
    //         $system->handleReservationRequest($query[1], $query[2], $query[3], $query[4], $query[5], $query[6]);
    //     } elseif ($query[0] == "CONFIRM") {
    //         echo "Entering to confirm with RID {$query[1]} and RSID {$query[1]}";
    //         $system->confirmReservation($query[1], $query[2]); // Use index 2 for restaurant ID
    //     }else if($query[0]== "NEXT_DAY") {
    //         $system->handleNextDay();
    //     }else if($query[0]== "REMOVE") {
    //         $system->removeRestaurant($query[1]);
    //     }
    // }
    $queries = array_slice($lines, 9);
    $index = 0;
    // echo "Queries: \n";
    // print_r($queries);
    while ($index < count($queries)) {
        $query = explode(" ", $queries[$index]);
        if ($query[0] == "REQUEST") {
            $system->handleReservationRequest($query[1], $query[2], $query[3], $query[4], $query[5], $query[6]);
        } elseif ($query[0] == "CONFIRM") {
            // echo "Entering to confirm with RID {$query[1]} and RSID {$query[1]}";
            $system->confirmReservation($query[1], $query[2]); // Use index 2 for restaurant ID
        } else if ($query[0] == "NEXT_DAY") {
            $system->handleNextDay();
        } else if ($query[0] == "REMOVE") {
            $system->removeRestaurant($query[1]);
        }
        $index++;
    }
}

$array = array();
while (true) {
    $stdin = fgets(STDIN);
    if ($stdin == "") {
        break;
    }
    $array[] = rtrim($stdin);
}
$system = new RestaurantReservationSystem();
main($array, $system);

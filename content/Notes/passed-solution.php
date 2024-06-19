<?php
class RestaurantReservationSystem
{
    public $restaurants = [];
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
    function calculateReservationPeriod($max_date, $min_date, $date)
    {
        // Calculate the starting date of the acceptable reservation period
        $range_start = $date - $max_date;

        // Calculate the ending date of the acceptable reservation period
        $range_end = $date - $min_date;

        // Return the starting and ending dates as an array
        // return [$startingDate, $endingDate];
        if ($this->current_date >= $range_start && $this->current_date <= $range_end) {
            // echo "$this->current_date falls within the range [$range_start, $range_end] \n";
            return true;
        } else {
            // echo "$this->current_date does not fall within the range [$range_start, $range_end] \n";
            return false;
        }
    }
    private function checkValidBusinessHour($business_hours, $reserve_time)
    {
        $reserve_timestamp = strtotime($reserve_time);
        // print_r($business_hours);
        foreach ($business_hours as $period) {
            $start_timestamp = strtotime($period['start']);
            $end_timestamp = strtotime($period['end']);
            if ($reserve_timestamp >= $start_timestamp && $reserve_timestamp <= $end_timestamp) {
                return true;
            }
        }
        return false;
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
        $validReserveDays = $this->calculateReservationPeriod($reservation_period_start, $reservation_period_end, $date);
        // Check if the current date is within the reservation period
        // echo "Current Date: {$this->current_date} \n";
        // echo "Start perios: {$reservation_period_start} \n";
        // echo "End perios: {$reservation_period_end} \n";
        // echo "Reserve Date: {$date} \n";
        // echo "Reserve Time: {$time} \n";
        // print_r($validReserveDays);
        // print_r($restaurant);
        if (!$validReserveDays) {
            echo "Error: Outside of reservation period\n";
            return;
        }

        // Check if the time falls within business hours
        // $business_hours = $restaurant['business_hours'][$date - 1];
        // $business_hours = $restaurant['business_hours'][$this->current_date-1];
        $reserve_day_index = ($date - 1) % 7; // Calculate the index of the reserve day (0 for Monday, 1 for Tuesday, ..., 6 for Sunday)
        $business_hours = $restaurant['business_hours'][$reserve_day_index];
        // echo "Business Hours: \n";
        // print_r($business_hours);
        $time_within_hours = $this->checkValidBusinessHour($business_hours, $time);
        // echo "Valid TIme:? {$time_within_hours} \n";
        // $time_within_hours = false;
        // $reservation_time = strtotime($time);
        // $start_time = strtotime($business_hours[0]);
        // $end_time = strtotime($business_hours[1]);
        // if ($reservation_time >= $start_time && $reservation_time < $end_time) {
        //     $time_within_hours = true;
        // }

        if (!$time_within_hours) {
            echo "Error: Closed\n";
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

        // Reservation request is valid, notify the restaurant
        echo "to:$restaurant_id Received a reservation request: $reservation_id $user_id $date $time $num_people\n";
    }

    // Function to confirm a reservation request
    public function confirmReservation($restaurantID, $reservationID)
    {
        // Check if the restaurant exists
        // if (!isset($this->restaurants[$restaurantID])) {
        //     printf("Error: No such restaurant\n");
        //     return;
        // }
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
        if ($reservation['status'] === "Rejected") {
            printf("Error: Already rejected\n");
            return;
        }
        if ($reservation['status'] === "Confirmed") {
            printf("Error: Already confirmed\n");
            return;
        }
        if ($reservation['status'] === "Cancelled") {
            printf("Error: Already cancelled\n");
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
                    if (!$validPeriod) {
                        echo "to:{$reservation_data['user_id']} {$reservation_id} has been auto-rejected\n";
                        // unset($this->restaurants[$restaurant_id]['reservations'][$reservation_id]);
                        $this->restaurants[$restaurant_id]['reservations'][$reservation_id]['status'] = "Rejected";
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
    }
    // Function to stop reservation process
    public function handleStopReservation($restaurant_id, $suspend_date, $time_range)
    {
        if (!isset($this->restaurants[$restaurant_id])) {
            printf("Error: No such restaurant\n");
            return;
        }
        $restaurant = $this->restaurants[$restaurant_id];
        if ($suspend_date < $this->current_date) {
            printf("Error: Specify a date today or after today\n");
            return;
        }
        $reservation_period_end = $restaurant['reservation_period'][1];
        // echo "SID from STOP: {$restaurant_id} \n";
        // echo "SuspendDate from STOP: {$suspend_date} \n";
        // echo "reservation_period_end from STOP: {$reservation_period_end} \n";
        // echo "CurrentDate from STOP: {$this->current_date} \n";
        if ($suspend_date < $this->current_date + $reservation_period_end) {
            printf("Error: Cannot make a reservation already due to being outside the reservation period\n");
            return;
        }
    }
    public function handleRejectReservation($restaurant_id, $reservation_id)
    {
        // echo "SID: {$restaurant_id} \n";
        // echo "RID: {$reservation_id} \n";
        if (!isset($this->restaurants[$restaurant_id]['reservations'][$reservation_id])) {
            printf("Error: No such reservation ID\n");
            return;
        }
        $reservation = $this->restaurants[$restaurant_id]['reservations'][$reservation_id];
        // print_r($reservation);
        if ($reservation['status'] === "Rejected") {
            printf("Error: Already rejected\n");
            return;
        }
        if ($reservation['status'] === "Confirmed") {
            printf("Error: Already confirmed\n");
            return;
        }
        if ($reservation['status'] === "Cancelled") {
            printf("Error: Already cancelled\n");
            return;
        }
        if ($reservation['date'] < $this->current_date) {
            printf("Error: Past reservation\n");
            return;
        }

        // Confirm the reject request
        $this->restaurants[$restaurant_id]['reservations'][$restaurant_id]['status'] = "Rejected";
        // printf("to:%s %s has been confirmed\n", $restaurant_id, $restaurantID);
        printf("to:%s %s has been rejected\n", $reservation['user_id'], $reservation_id);
    }
    public function handleCancelReservation($user_id, $reservation_id)
    {
        $reservation = null;
        $restaurantID = null;
        foreach ($this->restaurants as $resKey => $restaurant) {
            foreach ($restaurant['reservations'] as $key => $reservation) {
                if ($key == $reservation_id) {
                    $reservation = $reservation;
                    $restaurantID = $resKey;
                }
            }
        }
        if (!$reservation || $reservation['user_id'] != $user_id) {
            printf("Error: Not found\n");
            return;
        }
        if ($reservation['status'] === "Rejected") {
            printf("Error: Already rejected\n");
            return;
        }
        if ($reservation['status'] === "Cancelled") {
            printf("Error: Already cancelled\n");
            return;
        }
        // Confirm the reject request
        $this->restaurants[$restaurantID]['reservations'][$reservation['id']]['status'] = "Cancelled";
        // printf("to:%s %s has been confirmed\n", $restaurant_id, $restaurantID);
        printf("to:%s %s has been cancelled\n", $restaurantID, $reservation['id']);
    }
}
function initiateRestaurant($restaurant_info, $system, $business_hours, $queries)
{
    $restaurant_id = $restaurant_info[0];
    $contact_info = $restaurant_info[1];
    $reservation_period = [$restaurant_info[2], $restaurant_info[3]];
    $min_people = $restaurant_info[4];
    $max_people = $restaurant_info[5];

    // Add restaurant to the system
    $system->addRestaurant($restaurant_id, $contact_info, $reservation_period, $min_people, $max_people, $business_hours);

    if (!count($queries)) return;
    $index = 0;
    while ($index < count($queries)) {
        $query = explode(" ", $queries[$index]);
        if ($query[0] == "REQUEST") {
            // echo "SID to REQUEST: {$query[3]} \n";
            $system->handleReservationRequest($query[1], $query[2], $query[3], $query[4], $query[5], $query[6]);
        } elseif ($query[0] == "CONFIRM") {
            // echo "Entering to confirm with RID {$query[1]} and RSID {$query[1]}";
            // echo "CONFIRM request:\n";
            $system->confirmReservation($query[1], $query[2]); // Use index 2 for restaurant ID
        } else if ($query[0] == "NEXT_DAY") {
            // echo "NEXT_DAY request: \n";
            $system->handleNextDay();
        } else if ($query[0] == "REMOVE") {
            $system->removeRestaurant($query[1]);
        } else if ($query[0] == "LIST") {
            // echo "LIST request: \n";
            $system->addRestaurant($restaurant_id, $contact_info, $reservation_period, $min_people, $max_people, $business_hours);
        } else if ($query[0] == "STOP") {
            // echo "STOP request: \n";
            $system->handleStopReservation($query[1], $query[2], $query[3]);
        } else if ($query[0] == "REJECT") {
            // echo "REJECT request: \n";
            $system->handleRejectReservation($query[1], $query[2]);
        } else {
            $system->handleCancelReservation($query[1], $query[2]);
        }
        $index++;
    }
}
function main($array, $system)
{
    // $system = new RestaurantReservationSystem();
    // Explode input into lines
    $lines = $array;
    if ($lines[0] == 1) {
        // Parse restaurant information
        $restaurant_info = explode(" ", $lines[1]);
        $business_hours = [];
        for ($i = 2; $i <= 8; $i++) {
            // $hours = explode("-", $lines[$i]);
            // $business_hours[] = [$hours[0], $hours[1]]; // Add the start and end times as an array
            $hours = explode(" ", $lines[$i]);
            $hour_per_day = [];
            foreach ($hours as $hour) {
                $hour_array = explode("-", $hour);
                array_push($hour_per_day, ['start' => $hour_array[0], 'end' => $hour_array[1]]);
            }
            $business_hours[] = $hour_per_day;
        }
        // print_r($business_hours);
        $queries = array_slice($lines, 9);
        initiateRestaurant($restaurant_info, $system, $business_hours, $queries);
    } else {
        array_shift($lines);
        $modified_array = [];
        $temp_key = '';
        foreach ($lines as $item) {
            if (strpos($item, 'contact@') !== false) {
                $temp_key = $item;
                $modified_array[$temp_key] = [];
            } else {
                $modified_array[$temp_key][] = $item;
            }
        }
        // print_r($modified_array);
        foreach ($modified_array as $key => $values) {
            $restaurant_info = explode(" ", $key);
            // print_r($values);
            $business_hours = [];
            for ($i = 0; $i <= 6; $i++) {
                // $hours = explode("-", $values[$i]);
                // $business_hours[] = [$hours[0], $hours[1]]; // Add the start and end times as an array
                $hours = explode(" ", $values[$i]);
                $hour_per_day = [];
                foreach ($hours as $hour) {
                    $hour_array = explode("-", $hour);
                    // print_r($hour_array);
                    array_push($hour_per_day, ['start' => $hour_array[0], 'end' => $hour_array[1]]);
                }
                $business_hours[] = $hour_per_day;
            }
            $queries = array_slice($values, 7);
            initiateRestaurant($restaurant_info, $system, $business_hours, $queries);
        }
    }
    // print_r($system->restaurants);
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
// main($array, $system);
// Confirm1-2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST s3iv5 Joe Mac 4 15:30 4\nCONFIRM Mac s3iv5\nCONFIRM Mac s3iv5\n";
// Next_Day2-2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\n";
// NEXT_DAY2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n-\n-\n-\n15:00-16:00\n-\n-\n-\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY";

// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n-\n-\n-\n15:00-16:00\n-\n-\n-\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY";
// Just Two from all
// $input = "2\nssbelyo contact@ulcqp.xyz 6 2 5 7\n07:32-13:37\n-\n00:08-07:12 07:49-08:01 22:09-22:20\n00:06-01:42 04:27-06:52 12:09-22:05\n01:21-01:55 02:13-02:52 05:21-07:29 10:04-17:14\n15:37-18:09\n00:58-01:40 07:40-08:45 12:19-15:41 19:46-19:54\nssqteaj contact@adozl.xyz 5 3 7 9\n04:06-04:34 06:36-10:36\n21:58-22:44\n-\n02:21-07:22 07:32-15:54 17:49-18:02 20:09-23:18\n02:08-12:55\n01:05-14:54\n00:29-02:33 10:04-20:00\nNEXT_DAY\nCONFIRM aajjo czuvq\nLIST";
// Just Three from all
// $input = "2\nssbelyo contact@ulcqp.xyz 6 2 5 7\n07:32-13:37\n-\n00:08-07:12 07:49-08:01 22:09-22:20\n00:06-01:42 04:27-06:52 12:09-22:05\n01:21-01:55 02:13-02:52 05:21-07:29 10:04-17:14\n15:37-18:09\n00:58-01:40 07:40-08:45 12:19-15:41 19:46-19:54\nssqteaj contact@adozl.xyz 5 3 7 9\n04:06-04:34 06:36-10:36\n21:58-22:44\n-\n02:21-07:22 07:32-15:54 17:49-18:02 20:09-23:18\n02:08-12:55\n01:05-14:54\n00:29-02:33 10:04-20:00\nNEXT_DAY\nCONFIRM aajjo czuvq\nLIST\nssafuyd contact@kpwff.xyz 7 2 9 10\n08:10-10:16 13:31-20:07\n00:34-05:04 13:14-14:15\n02:35-04:36 10:36-18:16\n00:09-01:13 02:28-18:16\n00:21-02:52 07:58-10:33 10:37-13:21 15:01-19:25\n08:29-14:23\n00:39-01:18 10:18-12:32 14:54-15:28 16:40-17:36\nREQUEST rrysjmo uuxcqgo ssqteaj 6 10:19 7\nSTOP ssqteaj 6 05:41-18:45\nLIST";

// All
$input = "2\nssbelyo contact@ulcqp.xyz 6 2 5 7\n07:32-13:37\n-\n00:08-07:12 07:49-08:01 22:09-22:20\n00:06-01:42 04:27-06:52 12:09-22:05\n01:21-01:55 02:13-02:52 05:21-07:29 10:04-17:14\n15:37-18:09\n00:58-01:40 07:40-08:45 12:19-15:41 19:46-19:54\nssqteaj contact@adozl.xyz 5 3 7 9\n04:06-04:34 06:36-10:36\n21:58-22:44\n-\n02:21-07:22 07:32-15:54 17:49-18:02 20:09-23:18\n02:08-12:55\n01:05-14:54\n00:29-02:33 10:04-20:00\nNEXT_DAY\nCONFIRM aajjo czuvq\nLIST\nssafuyd contact@kpwff.xyz 7 2 9 10\n08:10-10:16 13:31-20:07\n00:34-05:04 13:14-14:15\n02:35-04:36 10:36-18:16\n00:09-01:13 02:28-18:16\n00:21-02:52 07:58-10:33 10:37-13:21 15:01-19:25\n08:29-14:23\n00:39-01:18 10:18-12:32 14:54-15:28 16:40-17:36\nREQUEST rrysjmo uuxcqgo ssqteaj 6 10:19 7\nSTOP ssqteaj 6 05:41-18:45\nLIST\nssgljcj contact@brmji.xyz 8 7 5 6\n02:44-09:39 14:21-18:39\n03:56-05:29 08:23-11:01 12:29-15:43 19:39-21:55\n00:47-03:44 10:33-12:27 15:56-19:16\n01:11-16:54 16:58-20:45\n-\n-\n01:06-05:53 06:27-11:17 15:33-18:30 22:04-23:34\nSTOP ssbelyo 3 04:11-11:22\nREJECT ssqteaj rrysjmo\nNEXT_DAY\nCONFIRM kqisk zkggp\nREQUEST rrwbynf uukxxvo ssafuyd 10 14:07 10\nSTOP ssbelyo 6 03:59-05:18\nSTOP ssbelyo 6 06:08-19:16\nCONFIRM ssafuyd rrwbynf\nCANCEL uukxxvo rrwbynf";
$lines = explode("\n", $input);
main($lines, $system);

<?php

namespace Track;

ini_set("memory_limit", -1);
interface ReservationServiceInterface
{
    public function sendReservationRequest(string $reservationId, string $userId, string $restaurantId, int $reservationDate, string $reserveTime, int $numPeople): void;
    public function cancelReservationRequest(string $userId, string $reservationId): void;
    public function confirmReservationRequest(string $restaurantId, string $reservationId): void;
    public function rejectReservationRequest(string $restaurantId, string $reservationId): void;
    public function stopReservationPeriod(string $restaurantId, int $suspendDate, string $timeRange): void;
}

class ReservationService implements ReservationServiceInterface
{
    private $system;

    public function __construct(System $system)
    {
        $this->system = $system;
    }

    public function sendReservationRequest(string $reservationId, string $userId, string $restaurantId, int $reservationDate, string $reserveTime, int $numPeople): void
    {
        $this->system->sendReservationRequest($reservationId, $userId, $restaurantId, $reservationDate, $reserveTime, $numPeople);
    }

    public function cancelReservationRequest(string $userId, string $reservationId): void
    {
        $this->system->cancelReservationRequest($userId, $reservationId);
    }
    public function confirmReservationRequest(string $restaurantId, string $reservationId): void
    {
        $this->system->confirmReservationRequest($restaurantId, $reservationId);
    }

    public function rejectReservationRequest(string $restaurantId, string $reservationId): void
    {
        $this->system->rejectReservationRequest($restaurantId, $reservationId);
    }

    public function stopReservationPeriod(string $restaurantId, int $suspendDate, string $timeRange): void
    {
        $this->system->stopReservationPeriod($restaurantId, $suspendDate, $timeRange);
    }
}

class User
{
    private string $userId;
    private $reservationService;

    public function __construct(string $userId, ReservationServiceInterface $reservationService)
    {
        $this->userId = $userId;
        $this->reservationService = $reservationService;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }

    public function sendReservationRequest(string $reservationId, string $restaurantId, int $reservationDate, string $reserveTime, int $numPeople): void
    {
        // Send reservation request to the specified restaurant
        $this->reservationService->sendReservationRequest($reservationId, $this->userId, $restaurantId, $reservationDate, $reserveTime, $numPeople);
    }
    public function cancelReservationRequest(string $reservationId): void
    {
        $this->reservationService->cancelReservationRequest($this->userId, $reservationId);
    }
}

class Restaurant
{
    private string $restaurantId = '';
    private string $contactInfo = '';
    /**
     *
     * @var  array<int> $reservationPeriod
     */
    private array $reservationPeriod = [];
    private int $minPeople = 0;
    private int $maxPeople = 0;
    /**
     *
     * @var  array<array<array<string>>> $businessHours
     */
    private array $businessHours = [];
    /**
     *
     * @var  array<array<array<int|string>>> $suspendedTimeRanges
     */
    private $suspendedTimeRanges = [];

    private ReservationServiceInterface $reservationService;
    /**
     *
     * @param  array<array<array<string>>> $businessHours
     * @param array<string> $restaurantData
     */
    public function __construct(array $restaurantData, array $businessHours, ReservationServiceInterface $reservationService)
    {
        $this->restaurantId = $restaurantData[0];
        $this->contactInfo = $restaurantData[1];
        $this->reservationPeriod = [(int)$restaurantData[2], (int)$restaurantData[3]];
        $this->minPeople = (int)$restaurantData[4];
        $this->maxPeople = (int)$restaurantData[5];
        $this->businessHours = $businessHours;
        $this->reservationService = $reservationService;
        $i = 0;
        while ($i <= 6) {
            $this->suspendedTimeRanges[$i] = [];
            $i++;
        }
    }
    /**
     *
     * @param  array<array<array<string>>> $businessHours
     * @param array<string> $restaurantData
     */
    public function createRestaurant(array $restaurantData, array $businessHours): void
    {
        $this->restaurantId = $restaurantData[0];
        $this->contactInfo = $restaurantData[1];
        $this->reservationPeriod = [(int)$restaurantData[2], (int)$restaurantData[3]];
        $this->minPeople = (int)$restaurantData[4];
        $this->maxPeople = (int)$restaurantData[5];
        $this->businessHours = $businessHours;
    }
    public function setReservationService(ReservationServiceInterface $reservationService): void
    {
        $this->reservationService = $reservationService;
    }
    // Add getters and setters for other properties as needed
    public function getRestaurantId(): string
    {
        return $this->restaurantId;
    }
    /**
     *
     * @return  array<int>
     */
    public function getReservationPeriod(): array
    {
        return $this->reservationPeriod;
    }
    /**
     *
     * @return  array<array<array<string>>> 
     */
    public function getBusinessHours(): array
    {
        return $this->businessHours;
    }

    public function getMinPeople(): int
    {
        return $this->minPeople;
    }

    public function getMaxPeople(): int
    {
        return $this->maxPeople;
    }
    /**
     *
     * @return  array<array<array<int|string>>> $suspendedTimeRanges
     */
    public function getSuspendedTimeRanges(): array
    {
        return $this->suspendedTimeRanges;
    }
    // Some util functions
    // Check if the reservation request is within the reservation period of the restaurant
    public function isWithinReservationPeriod(int $reservationDate, int $currentDate): bool
    {
        // Calculate the starting date of the acceptable reservation period
        $rangeStart = $reservationDate - $this->reservationPeriod[0];
        // Calculate the ending date of the acceptable reservation period
        $rangeEnd = $reservationDate - $this->reservationPeriod[1];
        // Return the starting and ending dates as an array
        if ($currentDate >= $rangeStart && $currentDate <= $rangeEnd) {
            return true;
        } else {
            return false;
        }
    }
    public function isWithinBusinessHour(int $reserveDayIndex, string $reserveTime): bool
    {
        $reserveTimestamp = strtotime($reserveTime);
        foreach ($this->businessHours[$reserveDayIndex] as $period) {
            $startTimestamp = strtotime($period['start']);
            $endTimestamp = strtotime($period['end']);
            if ($reserveTimestamp >= $startTimestamp && $reserveTimestamp <= $endTimestamp) {
                return true;
            }
        }
        return false;
    }
    public function isWithinTemporyClose(int $reserveDayIndex, string $reserveTime): bool
    {
        $reserveTimestamp = strtotime($reserveTime);
        foreach ($this->suspendedTimeRanges[$reserveDayIndex] as $range) {
            $closingTimeStart = strtotime((string)$range['start']);
            $closingTime = strtotime((string)$range['end']);
            if ($reserveTimestamp >= $closingTimeStart && $reserveTimestamp <= $closingTime) {
                return false;
            }
        }
        return true;
    }
    // Query functions
    public function confirmReservationRequest(string $restaurantId, string $reservationId): void
    {
        // Confirm the specified reservation request
        $this->reservationService->confirmReservationRequest($restaurantId, $reservationId);
    }

    public function rejectReservationRequest(string $restaurantId, string $reservationId): void
    {
        // Reject the specified reservation request
        $this->reservationService->rejectReservationRequest($restaurantId, $reservationId);
    }

    public function stopReservationPeriod(string $restaurantId, int $suspendDate, string $timeRange): void
    {
        // Temporarily stop receiving reservation requests for the specified susp$suspendDate and time range
        $this->reservationService->stopReservationPeriod($restaurantId, $suspendDate, $timeRange);
    }

    public function addSuspendedTimeRange(int $reserveDayIndex, string $timeRange): void
    {
        $hourArray = explode("-", $timeRange);
        $startTime = (int)$hourArray[0]; // Convert to integer
        $endTime = (int)$hourArray[1]; // Convert to integer

        // Check if the time range overlaps with existing suspended time ranges
        foreach ($this->suspendedTimeRanges[$reserveDayIndex] as $range) {
            $existingStartTime = (int)$range['start']; // Convert to integer
            $existingEndTime = (int)$range['end']; // Convert to integer
            if ($this->timeRangeOverlaps($startTime, $endTime, $existingStartTime, $existingEndTime)) {
                // Overlapping time range, handle as needed (e.g., throw an exception)
                throw new Exception("Error: Overlapping time range");
            }
        }
        // Add the new time range
        $this->suspendedTimeRanges[$reserveDayIndex][] = ['start' => $startTime, 'end' => $endTime];
    }

    private function timeRangeOverlaps(int $start1, int $end1, int $start2, int $end2): bool
    {
        return ($start1 < $end2) && ($end1 > $start2);
    }
}

class ReservationRequest
{
    const STATUS_PENDING = 'Pending';
    const STATUS_REJECTED = 'Rejected';
    const STATUS_CONFIRMED = 'Confirmed';
    const STATUS_CANCELLED = 'Cancelled';

    private string $reservationId;
    private string $userId;
    private string $restaurantId;
    private int $date;
    private string $time;
    private int $numPeople;
    private string $status;

    public function __construct(string $reservationId, string $userId, string $restaurantId, int $date, string $time, int $numPeople)
    {
        $this->reservationId = $reservationId;
        $this->userId = $userId;
        $this->restaurantId = $restaurantId;
        $this->date = $date;
        $this->time = $time;
        $this->numPeople = $numPeople;
        $this->status = "Pending";
    }

    public function getReservationId(): string
    {
        return $this->reservationId;
    }

    public function getStatus(): string
    {
        return $this->status;
    }

    public function getRestaurantId(): string
    {
        return $this->restaurantId;
    }

    public function getUserId(): string
    {
        return $this->userId;
    }
    public function getDate(): int
    {
        return $this->date;
    }
    public function updateStatus(string $newStatus): void
    {
        // $this->status = $newStatus;
        if ($newStatus === self::STATUS_PENDING || $newStatus === self::STATUS_REJECTED || $newStatus === self::STATUS_CONFIRMED || $newStatus === self::STATUS_CANCELLED) {
            $this->status = $newStatus;
        } else {
            throw new Exception('Invalid status type.');
        }
    }

    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    public function isConfirmed(): bool
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    public function isCancelled(): bool
    {
        return $this->status === self::STATUS_CANCELLED;
    }
}

class System
{
    /** 
     *  @var array<Restaurant> $restaurants
     */
    private array $restaurants = [];
    public int $currentDate = 1;
    /** 
     *  @var array<string,ReservationRequest> $reservationRequests
     */
    private array $reservationRequests = [];
    /**
     *
     * @return  array<mixed> $inputArray
     */
    public function getRestaurants(): array
    {
        return $this->restaurants;
    }

    public function setRestaurant(Restaurant $restaurant): void
    {
        $this->restaurants[$restaurant->getRestaurantId()] = $restaurant;
    }
    private function getRestaurantById(string $restaurantId): Restaurant|null
    {
        return $this->restaurants[$restaurantId] ?? null;
    }

    // Proceed Queries
    public function sendReservationRequest(string $reservationId, string $userId, string $restaurantId, int $reservationDate, string $reserveTime, int $numPeople): void
    {
        $selectedRestaurant = $this->getRestaurantById($restaurantId);

        if ($selectedRestaurant == null) {
            echo "Error: No such restaurant\n";
            return;
        }

        $validReserveDays = $selectedRestaurant->isWithinReservationPeriod($reservationDate, $this->currentDate);
        if (!$validReserveDays) {
            echo "Error: Outside of reservation period\n";
            return;
        }
        // Realworld day to be index of business days
        $reserveDayIndex = ($reservationDate - 1) % 7;
        $isValidBusinessHour = $selectedRestaurant->isWithinBusinessHour($reserveDayIndex, $reserveTime);
        if (!$isValidBusinessHour) {
            echo "Error: Closed\n";
            return;
        }
        $minPeople = $selectedRestaurant->getMinPeople();
        $maxPeople = $selectedRestaurant->getMaxPeople();
        // Check if the number of people falls within the allowed range
        if ($numPeople < $minPeople || $numPeople > $maxPeople) {
            echo "Error: Too many or too few people\n";
            return;
        }
        $isWithinTemporyClose = $selectedRestaurant->isWithinTemporyClose($reserveDayIndex, $reserveTime);
        if (!$isWithinTemporyClose) {
            echo "Error: Reservations temporarily closed\n";
            return;
        }
        // Create a new ReservationRequest object
        $reservationRequest = new ReservationRequest($reservationId, $userId, $restaurantId, $reservationDate, $reserveTime, $numPeople);

        // Store the reservation request using its ID as the key
        $this->reservationRequests[$reservationId] = $reservationRequest;
        // Reservation request is valid, notify the restaurant
        echo "to:$restaurantId Received a reservation request: $reservationId $userId $reservationDate $reserveTime $numPeople\n";
        return;
    }
    public function cancelReservationRequest(string $userId, string $reservationId): void
    {
        if (!array_key_exists($reservationId, $this->reservationRequests) || $this->reservationRequests[$reservationId]->getUserId() !== $userId) {
            echo "Error: No such reservation ID\n";
            return;
        }
        $selectedReservation = $this->reservationRequests[$reservationId];

        if (!($this->getRestaurants())) {
            echo "Error: No such restaurant\n";
            return;
        }
        if ($selectedReservation->isRejected()) {
            echo "Error: Already rejected\n";
            return;
        }

        if ($selectedReservation->isCancelled()) {
            echo "Error: Already cancelled\n";
            return;
        }

        if ($selectedReservation->getDate() < $this->currentDate) {
            echo "Error: Past reservation\n";
            return;
        }
        $selectedReservation->updateStatus("Cancelled");
        echo "to:{$selectedReservation->getRestaurantId()} {$reservationId} has been cancelled\n";
        return;
    }
    public function confirmReservationRequest(string $restaurantId, string $reservationId): void
    {
        // Confirm the specified reservation request
        if (!array_key_exists($reservationId, $this->reservationRequests) || $restaurantId !== $this->reservationRequests[$reservationId]->getRestaurantId()) {
            echo "Error: No such reservation ID\n";
            return;
        }
        $selectedReservation = $this->reservationRequests[$reservationId];
        if ($selectedReservation->isRejected()) {
            echo "Error: Already rejected\n";
            return;
        }

        if ($selectedReservation->isConfirmed()) {
            echo "Error: Already confirmed\n";
            return;
        }

        if ($selectedReservation->isCancelled()) {
            echo "Error: Already cancelled\n";
            return;
        }
        $selectedReservation->updateStatus("Confirmed");
        echo "to:{$selectedReservation->getUserId()} {$selectedReservation->getReservationId()} has been confirmed\n";
        return;
    }

    public function rejectReservationRequest(string $restaurantId, string $reservationId): void
    {

        if (!array_key_exists($reservationId, $this->reservationRequests) || $this->reservationRequests[$reservationId]->getRestaurantId() != $restaurantId) {
            echo "Error: No such reservation ID\n";
            return;
        }
        $selectedReservation = $this->reservationRequests[$reservationId];
        if ($selectedReservation->isRejected()) {
            echo "Error: Already rejected\n";
            return;
        }

        if ($selectedReservation->isConfirmed()) {
            echo "Error: Already confirmed\n";
            return;
        }

        if ($selectedReservation->isCancelled()) {
            echo "Error: Already cancelled\n";
            return;
        }
        $selectedReservation->updateStatus('Rejected');
        echo "to:{$selectedReservation->getUserId()} {$reservationId} has been rejected\n";
        return;
    }

    public function stopReservationPeriod(string $restaurantId, int $suspendDate, string $timeRange): void
    {
        // Temporarily stop receiving reservation requests for the specified date and time range
        if (!isset($this->restaurants[$restaurantId])) {
            echo "Error: No such restaurant\n";
            return;
        }
        $restaurant = $this->restaurants[$restaurantId];
        if ($suspendDate < $this->currentDate) {
            echo "Error: Specify a date today or after today\n";
            return;
        }
        $periodDeadline = $restaurant->getReservationPeriod()[1];
        if ($suspendDate < $this->currentDate + $periodDeadline) {
            echo "Error: Cannot make a reservation already due to being outside the reservation period\n";
            return;
        }
        $reserveDayIndex = ($suspendDate - 1) % 7;
        $restaurant->addSuspendedTimeRange($reserveDayIndex, $timeRange);
        return;
    }
    public function moveToNextBusinessDay(): void
    {
        // Move the system to the next business day and handle pending reservation requests that have expired
        $this->currentDate++;
        $pendingRequests = array_filter($this->reservationRequests, function ($request) {
            return $request->getStatus() === 'Pending';
        });
        if (!count($pendingRequests)) return;
        ksort($pendingRequests);
        foreach ($pendingRequests as $pendingRequest) {
            $selectedRestaurant = $this->getRestaurantById($pendingRequest->getRestaurantId());
            if ($selectedRestaurant == null) return;
            $validPeriod = $selectedRestaurant->isWithinReservationPeriod($pendingRequest->getDate(), $this->currentDate);
            if (!$validPeriod) {
                $pendingRequest->updateStatus('Rejected');
                echo "to:{$pendingRequest->getUserId()} {$pendingRequest->getReservationId()} has been auto-rejected\n";
            }
        }
    }

    // Remove the restaurant from the system
    public function removeRestaurant(string $restaurantId): void
    {
        $selectedRestaurant = $this->getRestaurantById($restaurantId);
        if ($selectedRestaurant == null) {
            echo "Error: No such restaurant\n";
            return;
        }
        unset($this->restaurants[$restaurantId]);
        return;
    }
}


/**
 * @param array<mixed> $inputArray
 * @return array<int, array<int, array<string, string>>>
 */

function prepareBusinessHour(int $startPoint, int $endPoint, array $inputArray): array
{
    $businessHours = [];
    for ($i = $startPoint; $i <= $endPoint; $i++) {
        $hours = explode(" ", $inputArray[$i]);
        $hourPerDay = [];
        foreach ($hours as $hour) {
            $hourArray = explode("-", $hour);
            array_push($hourPerDay, ['start' => $hourArray[0], 'end' => $hourArray[1]]);
        }
        $businessHours[] = $hourPerDay;
    }
    return $businessHours;
}

/**
 *
 * @param  array<mixed> $inputArray
 */
function main(array $inputArray): void
{
    $initialRestaurant = array_shift($inputArray);
    $tempKey = '';
    $modifiedArray = [];
    foreach ($inputArray as $value) {
        if (strpos($value, 'contact@') !== false) { // Check if the restaurant count is less than 2
            $tempKey = $value;
            $modifiedArray[$tempKey] = [];
        } else {
            $modifiedArray[$tempKey][] = $value;
        }
    }
    $system = new System();
    $reservationService = new ReservationService($system);
    $restaurantCount = 0; // Initialize a counter to keep track of the number of restaurants processed
    foreach ($modifiedArray as $key => $value) {
        $restaurantInfo = explode(" ", $key);
        $businessHours = prepareBusinessHour(0, 6, $value);
        $queries = array_slice($value, 7);
        $restaurant = new Restaurant($restaurantInfo, $businessHours, $reservationService);
        if ($restaurantCount < $initialRestaurant) {
            $system->setRestaurant($restaurant);
        }
        $restaurantCount++;
        if (count($queries)) {
            $index = 0;
            while ($index < count($queries)) {
                $query = explode(" ", $queries[$index]);
                processQuery($query, $restaurant, $system, $reservationService);
                $index++;
            }
        }
    }
}

function processQuery(array $query, Restaurant $restaurant, System $system, ReservationService $reservationService): void
{
    switch ($query[0]) {
        case "REQUEST":
            $user = new User($query[2], $reservationService);
            $user->sendReservationRequest($query[1], $query[3], (int)$query[4], $query[5], (int)$query[6]);
            break;
        case "CONFIRM":
            $restaurant->confirmReservationRequest($query[1], $query[2]);
            break;
        case "NEXT_DAY":
            $system->moveToNextBusinessDay();
            break;
        case "REMOVE":
            $system->removeRestaurant($query[1]);
            break;
        case "LIST":
            $system->setRestaurant($restaurant);
            break;
        case "CANCEL":
            $user = new User($query[1], $reservationService);
            $user->cancelReservationRequest($query[2]);
            break;
        case "STOP":
            $restaurant->stopReservationPeriod($query[1], (int)$query[2], $query[3]);
            break;
        case "REJECT":
            $restaurant->rejectReservationRequest($query[1], $query[2]);
            break;
        default:
            // Handle unknown query
            break;
    }
}
$inputArray = array();
while (true) {
    $stdin = fgets(STDIN);
    if ($stdin == "") {
        break;
    }
    $inputArray[] = rtrim($stdin);
}

main($inputArray);


// CONFIRM-1-2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST s3iv5 Joe Mac 4 15:30 4\nCONFIRM Mac s3iv5\nCONFIRM Mac s3iv5";
// NEXT_DAY2-2-basic
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\n";
// NEXT_DAY2-2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n-\n-\n-\n15:00-16:00\n-\n-\n-\nREQUEST bbb Joe Mac 4 15:30 2\nREQUEST aaa Joe Mac 4 15:30 2\nREQUEST ccc Joe Mac 4 15:30 2\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY\nNEXT_DAY\n";
// REMOVE1-2
// $input = "1\nMac contact@mac.x.yz 3 2 2 8\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\n00:00-24:00\nREQUEST aaa Joe Mac 4 15:30 2\nREMOVE Mac\nREMOVE Mac\n";
// Just Two from all
// $input = "2\nssbelyo contact@ulcqp.xyz 6 2 5 7\n07:32-13:37\n-\n00:08-07:12 07:49-08:01 22:09-22:20\n00:06-01:42 04:27-06:52 12:09-22:05\n01:21-01:55 02:13-02:52 05:21-07:29 10:04-17:14\n15:37-18:09\n00:58-01:40 07:40-08:45 12:19-15:41 19:46-19:54\nssqteaj contact@adozl.xyz 5 3 7 9\n04:06-04:34 06:36-10:36\n21:58-22:44\n-\n02:21-07:22 07:32-15:54 17:49-18:02 20:09-23:18\n02:08-12:55\n01:05-14:54\n00:29-02:33 10:04-20:00\nNEXT_DAY\nCONFIRM aajjo czuvq\nLIST";
// All
// $input = "2\nssbelyo contact@ulcqp.xyz 6 2 5 7\n07:32-13:37\n-\n00:08-07:12 07:49-08:01 22:09-22:20\n00:06-01:42 04:27-06:52 12:09-22:05\n01:21-01:55 02:13-02:52 05:21-07:29 10:04-17:14\n15:37-18:09\n00:58-01:40 07:40-08:45 12:19-15:41 19:46-19:54\nssqteaj contact@adozl.xyz 5 3 7 9\n04:06-04:34 06:36-10:36\n21:58-22:44\n-\n02:21-07:22 07:32-15:54 17:49-18:02 20:09-23:18\n02:08-12:55\n01:05-14:54\n00:29-02:33 10:04-20:00\nNEXT_DAY\nCONFIRM aajjo czuvq\nLIST\nssafuyd contact@kpwff.xyz 7 2 9 10\n08:10-10:16 13:31-20:07\n00:34-05:04 13:14-14:15\n02:35-04:36 10:36-18:16\n00:09-01:13 02:28-18:16\n00:21-02:52 07:58-10:33 10:37-13:21 15:01-19:25\n08:29-14:23\n00:39-01:18 10:18-12:32 14:54-15:28 16:40-17:36\nREQUEST rrysjmo uuxcqgo ssqteaj 6 10:19 7\nSTOP ssqteaj 6 05:41-18:45\nLIST\nssgljcj contact@brmji.xyz 8 7 5 6\n02:44-09:39 14:21-18:39\n03:56-05:29 08:23-11:01 12:29-15:43 19:39-21:55\n00:47-03:44 10:33-12:27 15:56-19:16\n01:11-16:54 16:58-20:45\n-\n-\n01:06-05:53 06:27-11:17 15:33-18:30 22:04-23:34\nSTOP ssbelyo 3 04:11-11:22\nREJECT ssqteaj rrysjmo\nNEXT_DAY\nCONFIRM kqisk zkggp\nREQUEST rrwbynf uukxxvo ssafuyd 10 14:07 10\nSTOP ssbelyo 6 03:59-05:18\nSTOP ssbelyo 6 06:08-19:16\nCONFIRM ssafuyd rrwbynf\nCANCEL uukxxvo rrwbynf";
// $inputArray = explode("\n", $input);
// main($inputArray);

### Explaination 


## Interfaces and Classes:

ReservationServiceInterface: Defines methods for sending, canceling, confirming, and rejecting reservation requests, as well as stopping reservation periods.

## ReservationService: 
Implements the ReservationServiceInterface. It interacts with the System to handle reservation requests.

## User: 
Represents a user who can send and cancel reservation requests.

## Restaurant: 
Represents a restaurant with properties such as ID, contact information, reservation periods, business hours, and suspended time ranges. It interacts with the ReservationService.

## ReservationRequest: 
Represents a reservation request with details like ID, user ID, restaurant ID, date, time, number of people, and status.

## System: 
Manages restaurants, reservation requests, and business logic for handling requests. It can send, cancel, confirm, and reject reservation requests, stop reservation periods, and move to the next business day.

## Functions:
### prepareBusinessHour: 
Parses business hours from input data into a structured array.

### main:
Entry point of the program. Parses input data, creates restaurant and reservation service instances, and processes queries.

### processQuery: 
Handles various types of queries like sending reservation requests, confirming/rejecting requests, moving to the next day, removing restaurants, listing restaurants, canceling reservations, stopping reservation periods, and rejecting reservation requests.

## Execution:
The main function is called with the input data, which triggers the parsing of commands and their execution.

Overall, this PHP code simulates a system for managing restaurant reservations efficiently, allowing users to make, confirm, cancel, and reject reservations, while handling various edge cases and error scenarios.

## Review
```JavaScript 
To provide a detailed analysis of your code and suggest improvements based on the principles you mentioned (performance, SOLID, best practices, separation of concerns, and OOP), let's break down your code into these categories:

Performance:

Your code seems to focus more on functionality rather than performance optimizations. However, there are some areas where you could consider performance improvements:
Avoid redundant calculations: For example, in the isWithinReservationPeriod method of the Restaurant class, consider caching the result of calculations if they are repeatedly used.
Optimize loops: Some loops could potentially be optimized to reduce unnecessary iterations, such as in the addSuspendedTimeRange method of the Restaurant class.
Use efficient data structures: Depending on your application's requirements, consider using more efficient data structures where appropriate, especially for large datasets.
SOLID Principles:

Single Responsibility Principle (SRP): Most classes seem to have a clear and single responsibility, such as System, Restaurant, User, etc. However, there might be some methods that could be refactored to adhere more strictly to SRP.
Open/Closed Principle (OCP): Your code allows for extensions (e.g., adding new types of restaurants or users) without modification of existing code, which aligns with OCP.
Liskov Substitution Principle (LSP): There are no obvious violations of LSP in your code.
Interface Segregation Principle (ISP): Your ReservationServiceInterface seems to be relatively cohesive and does not contain unnecessary methods.
Best Practices:

Readability and Maintainability: Overall, your code is relatively readable, but there are areas where improvements could be made:
Use meaningful variable and method names to enhance code readability.
Consider adding comments or docstrings to clarify the purpose of complex methods or classes.
Error Handling: Ensure robust error handling throughout your code to handle unexpected scenarios gracefully and provide informative error messages to users.
Consistency: Ensure consistency in coding style, naming conventions, and formatting across your codebase.
Separation of Concerns:

Your code appears to separate concerns reasonably well, with distinct classes for different entities (e.g., System, Restaurant, User, etc.). However, there are areas where you could further improve separation:
Consider moving some utility functions to separate helper classes or utility modules to keep class responsibilities focused.
Object-Oriented Programming (OOP):

Your code follows OOP principles by encapsulating behavior within objects and using classes and interfaces effectively to model real-world entities and interactions.
Overall, your code demonstrates a solid understanding of OOP principles and best practices. To further improve it, you could focus on enhancing performance, ensuring strict adherence to SOLID principles, and refining separation of concerns where necessary. Additionally, consider incorporating unit tests to validate the correctness and robustness of your code.
```
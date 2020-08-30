# `BACKEND API`

## Table of Contents

 - [Technologies Used](#technologies-used)
 - [How To Run](#how-to-run)
 - [An endpoint to book a ticket using a user’s name, phone number, and timings](#An-endpoint-to-book-a-ticket-using-a-user’s-name,-phone-number,-and-timings)
 - [An endpoint to view all the tickets for a particular time(StartTime and EndTime)](#An-endpoint-to-view-all-the-tickets-for-a-particular-time(StartTime-and-EndTime))
 - [An endpoint to view the user’s details based on the ticket id](#An-endpoint-to-view-the-user’s-details-based-on-the-ticket-id)
 - [An endpoint to delete a particular ticket](#An-endpoint-to-delete-a-particular-ticket)
 - [An endpoint to update a ticket timing](#An-endpoint-to-update-a-ticket-timing)

## `Technologies Used`

 - NodeJS
 - ExpressJS
 - MongoDB

 -- In MongoDB database we have 2 collection 

 -- Ticket Collection 
    ![Screenshot from 2020-08-31 00-44-55](https://user-images.githubusercontent.com/54509179/91667630-af8f2c80-eb23-11ea-9b0c-3ef376c8bc8e.png)
  
 -- Slot Collection
 ![Screenshot from 2020-08-31 00-45-19](https://user-images.githubusercontent.com/54509179/91667637-b7e76780-eb23-11ea-9a4c-1a9c03d58afc.png)



### `Ticket is automatically expired after 8 hours of StartTime of ticket using TTL index in mongodb.`


## `How To Run`

#### `1. Clone this repository`

#### `2. Run npm install in terminal`

#### `3. Server will Start at http://localhost:4000/`

#### `4. For tickets go to http://localhost:4000/ticket`

#### `5. For slots go to http://localhost:4000/slots`
__________________________

## `An endpoint to book a ticket using a user’s name, phone number, and timings.`

#### `1. Select Time for your Ticket`
You have to select Time slot from image given below having StartTime and EndTime.<br>
By default each TimeSlot has 20 No. of Seats .

![Screenshot from 2020-08-30 23-27-15](https://user-images.githubusercontent.com/54509179/91666258-ead82e00-eb18-11ea-91ea-891943b9973e.png)

#### `2. Post Request in Postman`
Add User details having Username , phoneNo , SlotID(you have choosen from above image) and expiry date is automatically generated according to StartTime.

![Screenshot from 2020-08-30 23-44-29](https://user-images.githubusercontent.com/54509179/91666501-e0b72f00-eb1a-11ea-9435-d168051ef4f5.png)


#### `3. Seat is also decreases of that particular time`

See SlotID of 8 

![Screenshot from 2020-08-30 23-47-37](https://user-images.githubusercontent.com/54509179/91666546-41df0280-eb1b-11ea-825b-080fcfa42129.png)


#### `4. Ticket Details`
After adding ticket details it looks like this

![Screenshot from 2020-08-30 23-49-04](https://user-images.githubusercontent.com/54509179/91666565-6fc44700-eb1b-11ea-820b-56a3e66fc322.png)

_____________________

## `An endpoint to view all the tickets for a particular time(StartTime and EndTime).`

Insert query of StartTime and EndTime into url for getting data of particular time.

#### `1. Time Slot`

Choose Any time means both StartTime and EndTime

![Screenshot from 2020-08-30 23-54-45](https://user-images.githubusercontent.com/54509179/91666664-3809cf00-eb1c-11ea-9bc5-f72140b944fd.png)

#### `2. Tickets of Particular Time`

StartTime = 2020-08-30T14:00:00.000Z & EndTime = 2020-08-30T22:00:00.000Z

![Screenshot from 2020-08-30 23-57-52](https://user-images.githubusercontent.com/54509179/91666713-b36b8080-eb1c-11ea-8bc3-49f6056a7242.png)


____________________

##  `An endpoint to view the user’s details based on the ticket id.`

Insert TicketID into url for getting data of that Ticket ID.

TicketID of 24

![Screenshot from 2020-08-30 23-52-09](https://user-images.githubusercontent.com/54509179/91666613-dd707300-eb1b-11ea-9d00-6d1359b65f7b.png)

_____________________________________________

## `An endpoint to delete a particular ticket.`

#### `1. Before Deleting a Ticket of 17 id `

Ticket image

![Screenshot from 2020-08-30 23-49-04](https://user-images.githubusercontent.com/54509179/91666565-6fc44700-eb1b-11ea-820b-56a3e66fc322.png)

Slot Image (See SlotID of 7)

![Screenshot from 2020-08-30 23-54-45](https://user-images.githubusercontent.com/54509179/91666664-3809cf00-eb1c-11ea-9bc5-f72140b944fd.png)

#### `2. Delete Request in Postman.`

![Screenshot from 2020-08-31 00-03-14](https://user-images.githubusercontent.com/54509179/91666795-69cf6580-eb1d-11ea-8305-726e3de78626.png)


#### `3. After Deleting a Ticket of 17 id `

17 id of Ticket got deleted as you can see in image below.

![Screenshot from 2020-08-31 00-04-33](https://user-images.githubusercontent.com/54509179/91666808-96837d00-eb1d-11ea-9812-dd665f2d6832.png)


No. of seats of that time slot (SlotID = 7) is also increases.

![Screenshot from 2020-08-31 00-05-27](https://user-images.githubusercontent.com/54509179/91666834-c6cb1b80-eb1d-11ea-84db-5fa6ba68c897.png)
_________________

## `An endpoint to update a ticket timing.`

#### `We will update ticket timing of ticket id 13 and change time using SlotID`

#### `1. Before Updating a Ticket Time`

![Screenshot from 2020-08-31 00-09-05](https://user-images.githubusercontent.com/54509179/91666892-39d49200-eb1e-11ea-99d2-f95807b54d18.png)

#### `2. Choose new Time Slot`

Choose new TimeSlot from image given below.

![Screenshot from 2020-08-31 00-05-27](https://user-images.githubusercontent.com/54509179/91666834-c6cb1b80-eb1d-11ea-84db-5fa6ba68c897.png)

#### `3. PUT Request in Postman`

![Screenshot from 2020-08-31 00-12-03](https://user-images.githubusercontent.com/54509179/91666936-a485cd80-eb1e-11ea-8b11-0ba4b3a5a527.png)


#### `4. No of seats also changes`

![Screenshot from 2020-08-31 00-16-02](https://user-images.githubusercontent.com/54509179/91667016-31c92200-eb1f-11ea-9dc2-3ff069339810.png)

#### `5. After Updating a Ticket Time using TicketID and New Ticket timing`

![Screenshot from 2020-08-31 00-13-24](https://user-images.githubusercontent.com/54509179/91666956-d4cd6c00-eb1e-11ea-8c0e-3c0a9a678b84.png)






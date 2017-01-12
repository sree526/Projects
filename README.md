The system designed is a 3 tier application that functions as AmazonFresh market place.This application consists of different types of objects such as Admin, Customers , Farmers, Products, Trucks, Billings and Trips. To access the AmazonFresh market system, customer 
must log in with his email and password and if customer wants to login as farmer he must
select farmer and provide his email and password to login into the system. 

		Farmer can add products , update his profile, delete added product, update added product and he can also upload a video. Customer can view products, view particular farmer products, search farmer products, search a particular product, delete his account, place an order, view his orders. Admin is the the main administrator of the system. The 
admin has various functionalities like to view all customers, farmers, products. He can also
approve the requests, view revenue details per day, view bill details, view graphs of rides, 
change delivery status of order etc. 

		To improve system performance and scalability, we have implemented connection pooling and redis caching. Also we have used RabbitMQ for asynchronous message transfer. 
 

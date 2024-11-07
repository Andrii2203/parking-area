I wrote a project that will calculate the cost of parking a car.
The parking rate is $1.15 on weekdays, and 30% more on weekends. It is also possible to choose other currencies such as Euro and Polish Zloty.

I made a separate function in which you can add these currencies in one place and you don't have to worry that when adding a new currency you will forget to add something.

All calculations are done on the server side using the RavenDB database, for the server part I used Express.js.

The application does not have the ability to select a parking space, this space is created for you, and you do not need to select it.

The application has the ability to edit data in case you entered something wrong except for the parking space.

Importantn - **The site will be fully functional when the server is started**
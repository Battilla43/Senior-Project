# Senior-Project
Flood control sensor - data visualization
These files are part of an entire 7 person group project. These files were done by me in JavaScript. The entirety of the project is an app that displays a map of sensors built by our client that are around bodies of water around Tennessee. Our app is able to display historical data of the sensors that shows water elevation. This app can also display a 3d render of an area selected by the user. 

mongo_schema.js file displays the schemas I created for our MongoDB server. These schemas interact with user info, sensor info, what user is watching each sensor, and tiff data (all our data is pulled from tiff files).

The floodAlert.js file is the root for our email system. This will send a message off when the threshold of the sensor they signed up for is surpassed by the water elevation. 
It connects to our MongoDB server and sends an email uing nodemailer to every user in the list. 

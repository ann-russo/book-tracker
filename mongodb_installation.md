How to install and execute mongodb:

1) Download MongoDB community server: https://www.mongodb.com/try/download/community
2) Rename the downloaded folder to 'mongodb'
3) MOve the folder to /Users/$YOURUSERNAME/
4) Create a new folder 'mongodb-data'
5) Download Studio 3T

Next, download Studio 3T and start a new connection:
1) Download here: https://studio3t.com/download-studio3t-free and install
2) Start a new connection
3) Option 'Manually configure my connection settings'
4) Connection name: 'Local MongoDB Database'
5) Server: localhost, Port: 27017
6) Test the connection
7) If ok, save and connect

Switch to IntelliJ:
1) In terminal 1, enter this command to start connection:
   /Users/$YOURUSERNAME/mongodb/bin/mongod --dbpath=/Users/$YOURUSERNAME/mongodb-data
   (location of mongodb folder - location of mongodb-data folder)
   KEEP THIS TERMINAL RUNNING!
2) In another terminal 2, start mongodb.js: node mongodb.js
3) This should create the database and make an entry in it

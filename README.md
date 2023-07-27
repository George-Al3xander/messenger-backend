# MessengerAPI  documentation

##  /users route

### REGISTER A NEW USER
To register a new user use _ _apilink_ _/users POST request.

Your request must contain JSON.stringify body with next required parametrs: 
1. name: {first: _your first name_, last: _your last name_ }
2. username
3. password

### LOGIN TO API
To login a user use _ _apilink_ _/users/login POST request.

Your request must contain JSON.stringify body with next required parametrs: 
1. username
2. password

You'll get your security token, which you'll need to acces to all of the API`s functionality.

### SEARCH FOR A SPECIFIC USER

To login a user use _ _apilink_ _/users/search?seachKey=_your search key_ GET request.

That request requires Authorization header with your access token:
"Authorization": "Bearer _your token_"

Script search for users by nickname, so you'll get the list of users with most mathing nicknames to your search key.

##  /messages route

### SEND A MESSAGE
To send a new message use _ _apilink_ _/message/_your id_ POST request.

That request requires Authorization header with your access token:
"Authorization": "Bearer _your token_"

Your request must contain JSON.stringify body with next required parametrs: 
1. roomId - room's ID inside whats message was sent
2. text - content of the message

### EDIT A MESSAGE
To edit a certain message use _ _apilink_ _/message/_your id_/_message id_ PUT request.

That request requires Authorization header with your access token:
"Authorization": "Bearer _your token_"

Your request must contain JSON.stringify body with next required parametrs: 
1. messageId - ID of that message
2. text - new content of the message

### DELETE A MESSAGE

To delete a certain message use _ _apilink_ _/message/_your id_/_message id_ DELETE request.

That request requires Authorization header with your access token:
"Authorization": "Bearer _your token_"

Your request must contain JSON.stringify body with next required parametrs: 
1. messageId - ID of that message


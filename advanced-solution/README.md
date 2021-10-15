Solution 2 (Advanced notifications provider)
Advanced notification service verifies users twice - first using e-mail, then using debot. This allows it to connect multiple transports to deliver notifications such as e-mail, http, telegram and other in any numbers. This approach provides better scalability and flexibility.
In practice this means that a domain owner can connect his application to this notification service and all the users of the application can get their own notifications privately.
Description of General Architecture

https://github.com/radianceteam/http-notification-query-provider/blob/main/Sol2Architect.jpg 

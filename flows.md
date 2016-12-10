Registration
    User clicks login link in nav or navigates via URL to Login Page
        Login Page
        Single Facebook button that redirects to Facebook for login
    Login Callback
        Add user
    Set JWT encoded access token from Facebook as a cookie
    Redirect to account dashboard
    Modal that asks, do you want to buy tickets or sell tickets?
        Click on "Sell tickets"
            POST => /events
            Create venue with initial value of   status = 'pending'
            Show message that their account will be reviewed soon
        Click on "Buy tickets"
            Show message that account setup is done
Login
    User clicks login link in nav or navigates via URL to Login Page
        Login Page (maybe not needed, could just redirect to Facebook on clicking Login link)
        Single Facebook button that redirects to Facebook for login
    Set JWT encoded access token from Facebook as a cookie
    Redirect to the page they were on
Account (sellers and buyers)
    GET => /users
    Show account info (name, shows attended)
    If user.venue
        If user.venue.status === 'ready' show Account Dashboard Link
        If user.venue.status === 'pending' show message that we will review it soon
    If !user.venue
        Don't show account dashboard link
    
Dashboard (only sellers)
    GET => /users/dashboard
        Show list of future Facebook events
            Redirect to /newevent/{fb_id}
            Click event to start create event flow
        Show list of future and past events created 
            Links to user facing event
            Show edit button if it is their own event
New Event (only sellers)
    Get facebook event id from url
    GET => events/fb/{id}
        Retrieves Facebook event with pictures and Facebook info (people going, comments, etc)
    Autofill new event form with Facebook data (allow it to be easily changed)
    POST => /events
        Create event
    Redirect to Dashboard and show success message
Event
    GET => events/{id}
        Retrieves event stored in db
        Wishlist (not mvp)
            Also make a call to facebook that gets the following:
                Number of people attending from facebook
                Facebook friends that are attending event
                Facebook event comments
Purchase tickets
    Select number of tickets
    Checkout with stripe
    Receive token from stripe on frontend
    Send token to backend
        POST => /events/{id}/purchase
        Send token to stripe from backend to see if payment info is successful
    On success, redirect back to event page with success message
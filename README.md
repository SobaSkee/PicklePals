# Development notes
## Running the app
(have the pre reqs like node and git)
- **npm i**
- **npm run dev**

## Copy and paste the env keys
- create .env.local file
- create .env file
- paste the keys if you're a contributor
- reload the app <br>
- now you can test out authentication by signing up or signing in, then go to clerk.com dashboard, in the users tab, to see the account you logged in with

## Test prisma and mongodb
- open another terminal in VSCode
- run **npx prisma studio** to start which allows us to visualize the handling of data to interact with mongodb
- it should be on something like localhost:5555 so navigate to that url
- once on here we can try adding a dummy user (you might already see one named john)
- put in an example email and name and save changes
- now navigate to localhost:3000/users we should see that user rendered into the array of Users
- go to mongodb and check the collections for picklepals and you should see the user you added in the user collection

## Test clerk webhooks using ngrok because clerk api can't reach our locally hosted app
- create a ngrok account and copy the auth token <br>
- download ngrok here: https://ngrok.com/downloads <br>
- run the ngrok command to add auth your token (its on the setup page): **ngrok config add-authtoken <your-auth-token>**
- run the ngrok command to test our locally hosted app on our ngrok domain: **ngrok http --url=evolving-wombat-adapted.ngrok-free.app 3000**
- now you can try visiting our app that has been forwarded to this domain (it should look exactly like the local version): **https://evolving-wombat-adapted.ngrok-free.app**
- to test out clerk webhook, go to clerk dashboard and scroll down until you see webhooks on the left sidebar
- click the endpoint and click the testing tab
- select user.created event type and send the example
- we should see this dummy payload in our mongodb and on prisma studio now if it was sent properly
- you can also test if it automatically adds a user to database when signing up, just remove your account from the clerk project in the users tab, sign up again on our locally hosted website, and it should automatically add the account you signed up with to our database (check on clerk, prisma studio, or mongodb)

  Note: all ngrok commands can be found here: https://dashboard.ngrok.com/get-started/setup/

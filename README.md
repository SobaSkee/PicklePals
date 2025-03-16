# Development notes
## Running the app
(have the pre reqs like node and git)
- npm i <br>
- npm run dev

## Copy and paste the env keys
- create .env.local file <br>
- create .env file <br>
- paste the keys if you're a contributor <br>
- reload the app <br>
- now you can test out authentication by signing up or signing in, then go to clerk.com dashboard to see the account you logged in with

## Test prisma and mongodb
- open another terminal in VSCode <br>
- run npx prisma studio to start which allows us to visualize the handling of data to interact with mongodb <br>
- it should be on something like localhost:5555 so navigate to that url <br>
- once on here we can try adding a dummy user (you might already see one named john) <br>
- put in an example email and name and save changes <br>
- now going to the landing page we should see that user rendered into the array of Users
- go to mongodb and check the collections for picklepals and you should see the user you added in the user collection

## Test clerk webhooks using ngrok because clerk api can't reach our locally hosted app
- create a ngrok account and copy the auth token <br>
- download ngrok here: https://ngrok.com/downloads <br>
- run the ngrok command to add auth your token (its on the setup page): https://dashboard.ngrok.com/get-started/setup <br>
- run the ngrok command to test our locally hosted app on our ngrok domain: ngrok http --url=evolving-wombat-adapted.ngrok-free.app 3000
- now you can try visiting our app that has been forwarded to this domain (it should look exactly like the local version): https://evolving-wombat-adapted.ngrok-free.app
- to test out clerk webhook, go to clerk dashboard and scroll down until you see webhooks on the left sidebar
- click the endpoint and click testing
- select user.created event type and send the example
- we should see this dummy payload in our mongodb and on prisma studio now if it was sent properly

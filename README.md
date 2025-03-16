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
- now you can test out authentication and see sign up/sign in of a new user by going to clerk.com dashboard

## Test prisma and mongodb
- open another terminal in VSCode <br>
- run npx prisma studio to start which allows us to visualize the handling od data to interact with mongodb <br>
- it should be on something like localhost:5555 so navigate to that url <br>
- once on here we can try adding a dummy user (you might already see one named john) <br>
- put in an example email and name and save changes <br>
- now going to the landing page we should see that user rendered into the array of Users

## Test clerk webhooks using ngrok because clerk api can't reach our locally hosted app
- create a ngrok account and copy the auth token <br>
- download ngrok here: https://ngrok.com/downloads <br>
- run the ngrok command to add auth your token (its on the setup page): https://dashboard.ngrok.com/get-started/setup <br>
- run the ngrok command to test our locally hosted app on our ngrok domain: ngrok http --url=evolving-wombat-adapted.ngrok-free.app 3000

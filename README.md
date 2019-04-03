# Banking demo app

Series of banking demo application APIs within Heroku for testing & demoing Maker

# Creating a worker:

```
export AWS_ACCESS_KEY_ID=""
export AWS_SECRET_ACCESS_KEY=""
export AWS_SESSION_TOKEN=""
export AWS_REGION=""

node workers/recentTransaction.js > workers/recentTransaction.json
sb-cli create-worker --verbose --file=workers/recentTransaction.json 

```

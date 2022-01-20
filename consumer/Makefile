publish:
	pact-broker publish --consumer-app-version=10 --broker-base-url="http://localhost" pact/pacts --tag master
can-i-deploy:
	pact-broker can-i-deploy --broker-base-url="http://localhost" --pacticipant MyConsumer --version 10 --to dev
tag:
	pact-broker create-version-tag --broker-base-url="http://localhost" --pacticipant MyConsumer --version 8 --tag dev

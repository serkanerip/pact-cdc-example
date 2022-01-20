package main

import (
	"log"
	"testing"

	"github.com/pact-foundation/pact-go/dsl"
	"github.com/pact-foundation/pact-go/types"
)

func TestVerifyConsumer(t *testing.T) {
	go startServer()
	pact := dsl.Pact{
		Provider: "MyProvider",
		Consumer: "MyConsumer",
	}

	// consumerTag := "master"
	//pactUrl := fmt.Sprintf("%s/%s", "http://localhost/pacts/provider/MyProvider/consumer/MyConsumer/latest", consumerTag)
	//pactUrl := "http://localhost/pacts/provider/MyProvider/consumer/MyConsumer/latest"
	// localURL := "/Users/serkan.erip/workspace/kata/pact-kata/consumer/pact/pacts/myconsumer-myprovider.json"
	_, err := pact.VerifyProvider(t, types.VerifyRequest{
		ProviderBaseURL: "http://localhost:8000",
		ProviderVersion: "8",
		BrokerURL:       "http://localhost",
		//PactURLs:                   []string{pactUrl},
		Tags:                       []string{"master"},
		PublishVerificationResults: true,
		FailIfNoPactsFound:         true,
		StateHandlers: map[string]types.StateHandler{
			"Server is healthy": func() error {
				log.Println("state handler for server is healthy")
				return nil
			},
		},
	})

	if err != nil {
		t.Fatal(err)
	}
}

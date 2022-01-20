package main

import (
	"encoding/json"
	"log"
	"net/http"
)

func main() {

	startServer()
}

type HealthResponse struct {
	Status string `json:"status"`
	Since  string `json:"since"`
	Foo    string `json:"foo"`
}

type User struct {
	Name     string `json:"name"`
	Age      int    `json:"age"`
	Lastname string `json:"lastname"`
}

type Post struct {
	Title string `json:"title"`
	Body  string `json:"body"`
}

func startServer() {
	http.HandleFunc("/health", func(writer http.ResponseWriter, request *http.Request) {
		marshal, _ := json.Marshal(HealthResponse{Status: "up", Since: "32 hours", Foo: "bar"})

		writer.Header().Add("Content-Type", "application/json")
		writer.Write(marshal)
	})

	http.HandleFunc("/users", func(writer http.ResponseWriter, request *http.Request) {
		users := []User{{Age: 18, Name: "Ayşe"}}
		marshal, _ := json.Marshal(users)

		writer.Header().Add("Content-Type", "application/json")
		writer.Write(marshal)
	})

	http.HandleFunc("/posts", func(writer http.ResponseWriter, request *http.Request) {
		posts := []Post{{Title: "Lorem Ipsum", Body: "Lorem ipsum dolar sit amet."}}
		marshal, _ := json.Marshal(posts)

		writer.Header().Add("Content-Type", "application/json")
		writer.Write(marshal)
	})

	http.HandleFunc("/ping", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Add("Content-Type", "application/json")
		writer.Write([]byte(`"{"msg": "pong"}"`))
	})

	http.HandleFunc("/pong", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Add("Content-Type", "application/json")
		writer.Write([]byte(`{"msg": "ping"}`))
	})

	log.Fatal(http.ListenAndServe(":8000", nil))
}

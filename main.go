package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Todo struct {
	ID        primitive.ObjectID   `json:"id,omitempty" bson:"_id,omitempty"`
	Completed bool   `json:"completed"`
	Body      string `json:"body"`
}

var collection *mongo.Collection

func main() {
	if os.Getenv("ENV") != "production" {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error Loading .env:", err)
	}
}

	MONGODB_URI := os.Getenv("MONGODB_URI")

	clientOptions := options.Client().ApplyURI(MONGODB_URI)

	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connection Success")

	collection = client.Database("golang_db").Collection("todos")

	app := fiber.New()
	app.Use(cors.New(cors.Config{
	AllowOrigins: "*",
	AllowHeaders: "Origin, Content-Type, Accept",
}))
 if os.Getenv("ENV")=="production"{
	app.Static("/","./client/dist")
 }
	app.Get("/api/todos", getTodos)
	app.Post("/api/todos", createTodo)
	app.Put("/api/todos/:id", updateTodo)
	app.Delete("/api/todos/:id", deleteTodo)

	port := os.Getenv("PORT")
	log.Fatal(app.Listen("0.0.0.0:" + port))
}

func createTodo(c *fiber.Ctx) error {
	todo:= new(Todo)
	if err:= c.BodyParser(todo);
	err!=nil{
		return err
	}
	if todo.Body==""{
		return c.Status(400).JSON(fiber.Map{"error":"Todo body cannot be empty"})
	}
	todo.ID = primitive.NewObjectID()

	_, err := collection.InsertOne(context.Background(), todo)
	if err != nil {
		return err
	}
	return c.Status(201).JSON(todo)
}

func getTodos(c *fiber.Ctx) error {
	var todos []Todo

	cursor, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		return err
	}
	defer cursor.Close(context.Background())

	for cursor.Next(context.Background()) {
		var todo Todo
		if err := cursor.Decode(&todo); err != nil {
			return err
		}
		todos = append(todos, todo)
	}

	return c.JSON(todos)
}
func updateTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	var updateData Todo
	if err := c.BodyParser(&updateData); err != nil {
		return err
	}

	update := bson.M{
		"$set": bson.M{
			"body":      updateData.Body,
			"completed": updateData.Completed,
		},
	}

	result, err := collection.UpdateOne(
		context.Background(),
		bson.M{"_id": objectID},
		update,
	)

	if err != nil {
		return err
	}

	if result.MatchedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	var updatedTodo Todo
	err = collection.FindOne(context.Background(), bson.M{"_id": objectID}).Decode(&updatedTodo)
	if err != nil {
		return err
	}

	return c.JSON(updatedTodo)
}

func deleteTodo(c *fiber.Ctx) error {
	id := c.Params("id")

	objectID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"error": "Invalid todo ID"})
	}

	result, err := collection.DeleteOne(
		context.Background(),
		bson.M{"_id": objectID},
	)

	if err != nil {
		return err
	}

	if result.DeletedCount == 0 {
		return c.Status(404).JSON(fiber.Map{"error": "Todo not found"})
	}

	return c.JSON(fiber.Map{"message": "Todo deleted successfully"})
}
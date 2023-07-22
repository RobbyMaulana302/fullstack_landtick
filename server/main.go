package main

import (
	"LANDTICK_BACKEND/database"
	"LANDTICK_BACKEND/pkg/mysql"
	"LANDTICK_BACKEND/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	godotenv.Load()

	e := echo.New()

	// used for conecting database
	mysql.DatabaseInit()
	database.RunMigration()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PATCH, echo.DELETE},
		AllowHeaders: []string{"X-Requested-With", "Content-Type", "Authorization"},
	}))

	var port = os.Getenv("PORT")

	// used for group route
	routes.RouteInit(e.Group("/api/v1"))

	e.Logger.Fatal(e.Start(":" + port))
}

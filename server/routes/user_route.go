package routes

import (
	"LANDTICK_BACKEND/handlers"
	"LANDTICK_BACKEND/pkg/midleware"
	"LANDTICK_BACKEND/pkg/mysql"
	"LANDTICK_BACKEND/repositories"

	"github.com/labstack/echo/v4"
)

// this function to used for users route /users
func UserRoutes(e *echo.Group) {
	userRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerUser(userRepository)

	e.GET("/users", h.FindUsers)
	e.GET("/user/:id", midleware.Auth(h.GetUser))
	e.PATCH("/user", midleware.Auth(h.UpdateUser))
	e.DELETE("/user/:id", midleware.Auth(h.Delete))
}

package routes

import (
	"LANDTICK_BACKEND/handlers"
	"LANDTICK_BACKEND/pkg/midleware"
	"LANDTICK_BACKEND/pkg/mysql"
	"LANDTICK_BACKEND/repositories"

	"github.com/labstack/echo/v4"
)

func AuthRoutes(e *echo.Group) {
	r := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerAuth(r)

	e.POST("/register", h.Register)
	e.POST("/login", h.Login)
	e.GET("/auth", midleware.Auth(h.CheckAuth))
}

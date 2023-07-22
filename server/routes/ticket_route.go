package routes

import (
	"LANDTICK_BACKEND/handlers"
	"LANDTICK_BACKEND/pkg/midleware"
	"LANDTICK_BACKEND/pkg/mysql"
	"LANDTICK_BACKEND/repositories"

	"github.com/labstack/echo/v4"
)

func TicketRoutes(e *echo.Group) {
	ticketRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerTicket(ticketRepository)

	e.GET("/filter", h.FilterTickets)
	e.GET("/tickets", h.FindTicket)
	e.GET("/ticket/my-ticket", midleware.Auth(h.GetMyTicket))
	e.POST("/ticket", midleware.Auth(h.CreateTicket))
}

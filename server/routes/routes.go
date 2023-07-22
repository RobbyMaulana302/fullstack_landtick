package routes

import (
	"github.com/labstack/echo/v4"
)

// this function to collection route has been created
func RouteInit(e *echo.Group) {
	UserRoutes(e)
	AuthRoutes(e)
	TransactionRoutes(e)
	TicketRoutes(e)
}

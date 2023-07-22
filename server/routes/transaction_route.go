package routes

import (
	"LANDTICK_BACKEND/handlers"
	"LANDTICK_BACKEND/pkg/midleware"
	"LANDTICK_BACKEND/pkg/mysql"
	"LANDTICK_BACKEND/repositories"

	"github.com/labstack/echo/v4"
)

func TransactionRoutes(e *echo.Group) {
	userRepository := repositories.MakeRepository(mysql.DB)
	h := handlers.HandlerTransaction(userRepository)

	e.GET("/transactions", midleware.Auth(h.FindTransactions))
	e.GET("/transaction/:id", midleware.Auth(h.GetTransaction))
	e.POST("/transaction", midleware.Auth(h.CreateTransaction))
	e.DELETE("/transaction/:id", midleware.Auth(h.DeleteTransaction))
	e.GET("/getpayment/:id", h.GetPayment)
	e.POST("/notification", h.Notification)

}

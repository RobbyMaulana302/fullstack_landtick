package dtotransaction

import (
	"LANDTICK_BACKEND/models"
)

type TransactionRequest struct {
	TicketID int    `json:"ticket_id" form:"ticket_id" validate:"required"`
	Status   string `json:"status"`
}

type TransactionResponse struct {
	ID       int                   `json:"id"`
	UserID   int                   `json:"user_id"`
	User     models.UserResponse   `json:"user" gorm:"foreignKey:UserID"`
	TicketID int                   `json:"ticket_id"`
	Ticket   models.TicketResponse `json:"ticket" gorm:"foreignKey:UserID"`
	Status   string                `json:"status"`
}

package models

import (
	"time"
)

type Transaction struct {
	ID        int       `json:"id" gorm:"primaryKey"`
	UserID    int       `json:"user_id" gorm:"type: int(20); foreignKey:UserID"`
	User      User      `json:"user" gorm:"foreignKey:UserID"`
	TicketID  int       `json:"ticket_id" gorm:"type: int(20)"`
	Ticket    Ticket    `json:"ticket" gorm:"foreignKey:TicketID"`
	Status    string    `json:"status"`
	CreatedAd time.Time `json:"-"`
	UpdateAd  time.Time `json:"-"`
}

type TransactionResponse struct {
	ID       int            `json:"id"`
	UserID   int            `json:"user_id"`
	User     UserResponse   `json:"user" gorm:"foreignKey:UserID"`
	TicketID int            `json:"ticketid"`
	Ticket   TicketResponse `json:"ticket" gorm:"foreignKey:TicketID"`
	Status   string
}

func (TransactionResponse) TableName() string {
	return "transaction"
}

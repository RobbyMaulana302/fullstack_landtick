package models

import (
	"time"
)

type Ticket struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	NameTrain          string    `json:"name_train" gorm:"type: varchar(255)"`
	TypeTrain          string    `json:"type_train" gorm:"type: varchar(255)"`
	StartDate          time.Time `json:"start_date" gorm:"date"`
	StartStation       string    `json:"start_station" gorm:"type: varchar(255)"`
	StartTime          string    `json:"start_time" gorm:"type: varchar(255)"`
	DestinationStation string    `json:"destination_station" gorm:"type: varchar(255)"`
	ArivalTime         string    `json:"arival_time" gorm:"type: varchar(255)"`
	Price              int       `json:"price" gorm:"type: int(20)"`
	Qty                int       `json:"qty" gorm:"type: int(20)"`
	CreatedAd          time.Time `json:"-"`
	UpdateAd           time.Time `json:"-"`
}

type TicketResponse struct {
	ID                 int       `json:"id" gorm:"primaryKey"`
	NameTrain          string    `json:"name_train"`
	TypeTrain          string    `json:"type_train"`
	StartDate          time.Time `json:"start_date"`
	StartStation       string    `json:"start_station"`
	StartTime          string    `json:"start_time"`
	DestinationStation string    `json:"destination_station"`
	ArivalTime         string    `json:"arival_time"`
	Price              int       `json:"price"`
	Qty                int       `json:"qty"`
}

func (TicketResponse) TableName() string {
	return "tickets"
}

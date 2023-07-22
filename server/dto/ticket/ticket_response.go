package dtoticket

import "time"

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

type TicketRequest struct {
	NameTrain          string `json:"name_train" form:"name_train" validate:"required"`
	TypeTrain          string `json:"type_train" form:"type_train" validate:"required"`
	StartDate          string `json:"start_date" form:"start_date" validate:"required"`
	StartStation       string `json:"start_station" form:"start_station" validate:"required"`
	StartTime          string `json:"start_time" form:"start_time" validate:"required"`
	DestinationStation string `json:"destination_station" form:"destination_station" validate:"required"`
	ArivalTime         string `json:"arival_time" form:"arival_time" validate:"required"`
	Price              string `json:"price" form:"price" validate:"required"`
	Qty                string `json:"qty" form:"qty" validate:"required"`
}

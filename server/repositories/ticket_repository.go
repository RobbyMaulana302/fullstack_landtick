package repositories

import "LANDTICK_BACKEND/models"

type Ticket interface {
	FindTicket() ([]models.Ticket, error)
	CreateTicket(ticket models.Ticket) (models.Ticket, error)
	FilterTickets(startStation string, destinationStation string) ([]models.Ticket, error)
	GetMyTicket(ID int) ([]models.Transaction, error)
}

func (r *repository) FindTicket() ([]models.Ticket, error) {
	var ticket []models.Ticket
	err := r.db.Find(&ticket).Error

	return ticket, err
}

func (r repository) GetMyTicket(ID int) ([]models.Transaction, error) {
	var ticket []models.Transaction
	err := r.db.Where("user_id =?", ID).Preload("User").Preload("Ticket").Find(&ticket).Error

	return ticket, err
}

func (r repository) FilterTickets(startStation string, destinationStation string) ([]models.Ticket, error) {
	var tickets []models.Ticket
	err := r.db.Where("start_station =?", startStation).Where("destination_station =?", destinationStation).Find(&tickets).Error

	return tickets, err
}

func (r *repository) CreateTicket(ticket models.Ticket) (models.Ticket, error) {
	err := r.db.Create(&ticket).Error

	return ticket, err
}

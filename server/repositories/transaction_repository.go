package repositories

import (
	"LANDTICK_BACKEND/models"
	"fmt"
)

type Transaction interface {
	FindTransactions() ([]models.Transaction, error)
	GetTransaction(ID int) (models.Transaction, error)
	CreateTransaction(transaction models.Transaction) (models.Transaction, error)
	UpdateTransaction(status string, ID int) (models.Transaction, error)
	DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error)
}

func (r *repository) FindTransactions() ([]models.Transaction, error) {
	var transactions []models.Transaction
	err := r.db.Preload("User").Preload("Ticket").Find(&transactions).Error

	return transactions, err
}

func (r *repository) GetTransaction(ID int) (models.Transaction, error) {
	var transaction models.Transaction
	err := r.db.Preload("User").Preload("Ticket").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) CreateTransaction(transaction models.Transaction) (models.Transaction, error) {
	var data models.Transaction
	err := r.db.Create(&transaction).Where("user_id = ? AND ticket_id = ?", transaction.UserID, transaction.TicketID).Order("id DESC").Preload("Ticket").Preload("User").First(&data).Error

	return data, err
}

func (r *repository) DeleteTransaction(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Delete(&transaction, ID).Scan(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(status string, ID int) (models.Transaction, error) {
	var transaction models.Transaction
	fmt.Println(status)

	r.db.First(&transaction, ID)

	if status != transaction.Status && status == "success" {
		r.db.First(&transaction, transaction.ID)
	}

	transaction.Status = status
	err := r.db.Save(&transaction).Error

	return transaction, err
}

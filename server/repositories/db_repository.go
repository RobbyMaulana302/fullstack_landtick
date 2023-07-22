package repositories

import (
	"gorm.io/gorm"
)

// this struct for sotring conection database
type repository struct {
	db *gorm.DB
}

// this function to used for bring conection database
func MakeRepository(db *gorm.DB) *repository {
	return &repository{db}
}

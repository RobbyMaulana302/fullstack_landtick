package database

import (
	"LANDTICK_BACKEND/models"
	"LANDTICK_BACKEND/pkg/mysql"
	"fmt"
)

// this function used for migration models to automaticly create table on database
func RunMigration() {
	err := mysql.DB.AutoMigrate(
		&models.User{},
		&models.Ticket{},
		&models.Transaction{},
	)
	if err != nil {
		fmt.Println(err)
	}
}

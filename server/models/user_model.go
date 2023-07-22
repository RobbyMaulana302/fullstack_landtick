package models

import (
	"time"
)

// this struct is model user
type User struct {
	ID          int       `json:"id"`
	FullName    string    `json:"fullname" gorm:"type: varchar(255)"`
	UserName    string    `json:"username" gorm:"type: varchar(255)"`
	Email       string    `json:"email" gorm:"type: varchar(255)"`
	Password    string    `json:"-" gorm:"type: varchar(255)"`
	Role        string    `json:"role" gorm:"type: varchar(255)"`
	PhoneNumber string    `json:"phone_number" gorm:"type: varchar(255)"`
	Gender      string    `json:"gender" gorm:"type: varchar(255)"`
	Address     string    `json:"address" gorm:"type: varchar(255)"`
	CreatedAd   time.Time `json:"-"`
	UpdateAd    time.Time `json:"-"`
}

type UserResponse struct {
	Id          int    `json:"id"`
	FullName    string `json:"fullName"`
	UserName    string `json:"userName"`
	Email       string `json:"email"`
	PhoneNumber string `json:"phone_number"`
	Gender      string `json:"gender"`
	Address     string `json:"address"`
}

type UserTransactionResponse struct {
	ID       int    `json:"-"`
	FullName string `json:"fullName"`
	UserName string `json:"userName"`
	Email    string `json:"email"`
}

func (UserResponse) TableName() string {
	return "users"
}

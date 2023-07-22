package repositories

import (
	"LANDTICK_BACKEND/models"
)

type AuthRepository interface {
	Register(user models.User) (models.User, error)
	Login(username string) (models.User, error)
	CheckAuth(ID int, userRole string) (models.User, error)
}

func (r *repository) Register(user models.User) (models.User, error) {
	err := r.db.Create(&user).Error

	return user, err
}

func (r *repository) Login(username string) (models.User, error) {
	var user models.User
	err := r.db.Where("user_name=?", username).First(&user).Error

	return user, err
}

func (r *repository) CheckAuth(ID int, userRole string) (models.User, error) {
	var user models.User
	err := r.db.Where("role = ?", userRole).First(&user, ID).Error

	return user, err
}

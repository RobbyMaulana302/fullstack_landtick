package handlers

import (
	dtoresult "LANDTICK_BACKEND/dto/result"
	dtouser "LANDTICK_BACKEND/dto/users"
	"LANDTICK_BACKEND/models"
	"LANDTICK_BACKEND/repositories"
	"fmt"
	"net/http"
	"strconv"

	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

// this struct for conect to contract from repostories has been created
type handlerUser struct {
	UserRepository repositories.User
}

type JsonUser struct {
	DataUsers interface{} `json:"user"`
}

// this function or method to used for logic function
func HandlerUser(UserRepository repositories.User) *handlerUser {
	return &handlerUser{UserRepository}
}

// this fucntion to used get query repostiry and logic will be called
func (h *handlerUser) FindUsers(c echo.Context) error {
	users, err := h.UserRepository.FindUsers()
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonUser{
			DataUsers: users,
		},
	})
}

func (h *handlerUser) GetUser(c echo.Context) error {
	user_id, _ := strconv.Atoi(c.Param("id"))
	user, err := h.UserRepository.GetUser(user_id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonUser{
			DataUsers: convertUserResponse(user),
		},
	})
}

func (h *handlerUser) UpdateUser(c echo.Context) error {
	request := new(dtouser.UserUpdateRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	userLogin := c.Get("userLogin")
	user_id := userLogin.(jwt.MapClaims)["id"].(float64)

	fmt.Println(user_id)
	user, err := h.UserRepository.GetUser(int(user_id))
	fmt.Println(user)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	if request.FullName != "" {
		user.FullName = request.FullName
	}

	if request.UserName != "" {
		user.UserName = request.UserName
	}

	if request.Email != "" {
		user.Email = request.Email
	}

	if request.Password != "" {
		user.Password = request.Password
	}

	if request.PhoneNumber != "" {
		user.PhoneNumber = request.PhoneNumber
	}

	if request.Address != "" {
		user.Address = request.Address
	}

	dataUpdate, err := h.UserRepository.UpdateUser(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonUser{
			DataUsers: convertUserResponse(dataUpdate),
		},
	})
}

func (h *handlerUser) Delete(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	user, err := h.UserRepository.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	deleteUser, err := h.UserRepository.DeleteUser(user, id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonUser{
			DataUsers: convertUserResponse(deleteUser),
		},
	})
}

func convertUserResponse(convert models.User) dtouser.UserResponse {
	return dtouser.UserResponse{
		ID:          convert.ID,
		FullName:    convert.FullName,
		UserName:    convert.UserName,
		Email:       convert.Email,
		Password:    convert.Password,
		Role:        convert.Role,
		PhoneNumber: convert.PhoneNumber,
		Gender:      convert.Gender,
		Address:     convert.Address,
	}
}

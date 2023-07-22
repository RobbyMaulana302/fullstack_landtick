package handlers

import (
	dtoauth "LANDTICK_BACKEND/dto/auth"
	dtoresult "LANDTICK_BACKEND/dto/result"
	"LANDTICK_BACKEND/models"
	"LANDTICK_BACKEND/pkg/bcrypt"
	jwttoken "LANDTICK_BACKEND/pkg/jwt"
	"LANDTICK_BACKEND/repositories"
	"log"
	"net/http"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerAuth struct {
	AuthRepository repositories.AuthRepository
}

type JsonAuth struct {
	DataUser interface{} `json:"user"`
}

func HandlerAuth(AuthRepository repositories.AuthRepository) *handlerAuth {
	return &handlerAuth{AuthRepository}
}

func (h *handlerAuth) Register(c echo.Context) error {
	request := new(dtoauth.AuthRequest)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	password, err := bcrypt.HashingPassword(request.Password)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	user := models.User{
		FullName:    request.FullName,
		UserName:    request.UserName,
		Email:       request.Email,
		Password:    password,
		Role:        "customer",
		PhoneNumber: request.PhoneNumber,
		Gender:      request.Gender,
		Address:     request.Address,
		CreatedAd:   time.Now(),
		UpdateAd:    time.Now(),
	}

	register, err := h.AuthRepository.Register(user)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{
			Status:  "Errro",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonAuth{
			DataUser: register,
		},
	})
}

func (h *handlerAuth) Login(c echo.Context) error {
	request := new(dtoauth.AuthLogin)
	if err := c.Bind(request); err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	user := models.User{
		UserName: request.Username,
		Password: request.Password,
	}

	user, err := h.AuthRepository.Login(user.UserName)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})
	}

	passwordValid := bcrypt.CheckPasswordHash(request.Password, user.Password)
	if !passwordValid {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{
			Status:  "Error",
			Message: "wrong email or password",
		})
	}

	claims := jwt.MapClaims{}
	claims["id"] = user.ID
	claims["role"] = user.Role
	claims["exp"] = time.Now().Add(time.Hour * 2).Unix()

	token, errGenerateToken := jwttoken.GenerateToken(&claims)
	if errGenerateToken != nil {
		log.Println(errGenerateToken)
		return echo.NewHTTPError(http.StatusUnauthorized)
	}

	loginResponse := dtoauth.LoginResponse{
		FullName:    user.FullName,
		UserName:    user.UserName,
		Email:       user.Email,
		Password:    user.Password,
		Role:        user.Role,
		PhoneNumber: user.PhoneNumber,
		Gender:      user.Gender,
		Address:     user.Address,
		Token:       token,
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonAuth{
			DataUser: loginResponse,
		},
	})
}

func (h *handlerAuth) CheckAuth(c echo.Context) error {
	userLogin := c.Get("userLogin")
	userId := userLogin.(jwt.MapClaims)["id"].(float64)
	userRole := userLogin.(jwt.MapClaims)["role"].(string)

	user, _ := h.AuthRepository.CheckAuth(int(userId), userRole)

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonAuth{
			DataUser: user,
		},
	})
}

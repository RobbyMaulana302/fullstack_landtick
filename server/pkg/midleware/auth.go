package midleware

import (
	dtoresult "LANDTICK_BACKEND/dto/result"
	jwttoken "LANDTICK_BACKEND/pkg/jwt"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

type Result struct {
	Code    int         `json:"code"`
	Data    interface{} `json:"data"`
	Message string      `json:"message"`
}

func Auth(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		token := c.Request().Header.Get("Authorization")

		if token == "" {
			return c.JSON(http.StatusUnauthorized, dtoresult.ErrorResult{Status: "Error", Message: "unauthorized"})
		}

		token = strings.Split(token, " ")[1]
		claims, err := jwttoken.DecodeToken(token)

		if err != nil {
			return c.JSON(http.StatusUnauthorized, dtoresult.ErrorResult{Status: "Error", Message: "unauthorized"})
		}

		c.Set("userLogin", claims)
		return next(c)
	}
}

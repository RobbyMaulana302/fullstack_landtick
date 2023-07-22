package handlers

import (
	dtoresult "LANDTICK_BACKEND/dto/result"
	dtoticket "LANDTICK_BACKEND/dto/ticket"
	"LANDTICK_BACKEND/models"
	"LANDTICK_BACKEND/repositories"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
)

type handlerTicket struct {
	TicketRepository repositories.Ticket
}

type JsonTicket struct {
	DataTicket interface{} `json:"ticket"`
}

func HandlerTicket(TicketRepository repositories.Ticket) *handlerTicket {
	return &handlerTicket{TicketRepository}
}

func (h *handlerTicket) FindTicket(c echo.Context) error {
	ticket, err := h.TicketRepository.FindTicket()
	if err != nil {
		return c.JSON(400, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})

	}

	return c.JSON(200, dtoresult.SuccessResult{
		Status: "Error",
		Data: JsonTicket{
			DataTicket: ticket,
		},
	})

}

func (h *handlerTicket) GetMyTicket(c echo.Context) error {
	claims := c.Get("userLogin")
	id := claims.(jwt.MapClaims)["id"].(float64)
	userID := int(id)

	ticket, err := h.TicketRepository.GetMyTicket(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	fmt.Println(ticket)

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data:   ticket,
	})
}

func (h *handlerTicket) FilterTickets(c echo.Context) error {
	startStation := c.QueryParam("startStation")
	destinationStation := c.QueryParam("destinationStation")

	ticket, err := h.TicketRepository.FilterTickets(startStation, destinationStation)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonTicket{
			DataTicket: ticket,
		}})

}

func (h *handlerTicket) CreateTicket(c echo.Context) error {
	request := new(dtoticket.TicketRequest)

	fmt.Println(request)
	if err := c.Bind(request); err != nil {
		fmt.Println("disini")
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	validation := validator.New()
	err := validation.Struct(request)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	price, _ := strconv.Atoi(request.Price)
	qty, _ := strconv.Atoi(request.Qty)

	formatStartDate, _ := time.Parse("2006-01-02", request.StartDate)

	ticketResponse := models.Ticket{
		NameTrain:          request.NameTrain,
		TypeTrain:          request.TypeTrain,
		StartDate:          formatStartDate,
		StartStation:       request.StartStation,
		StartTime:          request.StartTime,
		DestinationStation: request.DestinationStation,
		ArivalTime:         request.ArivalTime,
		Price:              price,
		Qty:                qty,
		CreatedAd:          time.Now(),
		UpdateAd:           time.Now(),
	}

	fmt.Println(ticketResponse)

	data, err := h.TicketRepository.CreateTicket(ticketResponse)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonTicket{
			DataTicket: data,
		},
	})
}

package handlers

import (
	dtoresult "LANDTICK_BACKEND/dto/result"
	dtotransaction "LANDTICK_BACKEND/dto/transaction"
	"LANDTICK_BACKEND/models"
	"LANDTICK_BACKEND/repositories"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/golang-jwt/jwt/v4"
	"github.com/labstack/echo/v4"
	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
	"gopkg.in/gomail.v2"
)

type handlerTransaction struct {
	TransactionRepository repositories.Transaction
}

type JsonTransaction struct {
	DataTransaction interface{} `json:"transaction"`
}

func HandlerTransaction(TransactionhRepository repositories.Transaction) *handlerTransaction {
	return &handlerTransaction{TransactionhRepository}
}

func (h *handlerTransaction) FindTransactions(c echo.Context) error {
	transaction, err := h.TransactionRepository.FindTransactions()
	fmt.Println(transaction)
	if err != nil {
		return c.JSON(400, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error(),
		})

	}

	return c.JSON(200, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonUser{
			DataUsers: transaction,
		},
	})

}

func (h *handlerTransaction) GetTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{
			Status:  "Error",
			Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonTransaction{
			DataTransaction: transaction,
		}})
}

func (h *handlerTransaction) CreateTransaction(c echo.Context) error {
	request := new(dtotransaction.TransactionRequest)
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

	userLogin := c.Get("userLogin")
	user_id := userLogin.(jwt.MapClaims)["id"].(float64)

	var transactionIsMatch = false
	var transactionID int
	for !transactionIsMatch {
		transactionID = int(time.Now().Unix())
		transactionData, _ := h.TransactionRepository.GetTransaction(transactionID)
		if transactionData.ID == 0 {
			transactionIsMatch = true
		}
	}

	transaction := models.Transaction{
		ID:       transactionID,
		UserID:   int(user_id),
		TicketID: request.TicketID,
		Status:   "pending",
		UpdateAd: time.Now(),
	}

	createTransaction, err := h.TransactionRepository.CreateTransaction(transaction)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{
			Status:  "Errro",
			Message: err.Error(),
		})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{
		Status: "Success",
		Data: JsonTransaction{
			DataTransaction: createTransaction,
		},
	})
}

func (h *handlerTransaction) DeleteTransaction(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))

	product, err := h.TransactionRepository.GetTransaction(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	data, err := h.TransactionRepository.DeleteTransaction(product, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{Status: "Success", Data: data})
}

// GetPayment
func (h *handlerTransaction) GetPayment(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	transaction, err := h.TransactionRepository.GetTransaction(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	// 1. Initiate Snap client
	var s = snap.Client{}
	s.New(os.Getenv("SERVER_KEY"), midtrans.Sandbox)
	// Use to midtrans.Production if you want Production Environment (accept real transaction).

	// 2. Initiate Snap request param
	req := &snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
			OrderID:  strconv.Itoa(transaction.ID),
			GrossAmt: int64(transaction.Ticket.Price),
		},
		CreditCard: &snap.CreditCardDetails{
			Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
			FName: transaction.User.FullName,
			Email: transaction.User.Email,
		},
	}

	// 3. Execute request create Snap transaction to Midtrans Snap API
	snapResp, _ := s.CreateTransaction(req)

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{Status: "Success", Data: snapResp})
}

// Notification
func (h *handlerTransaction) Notification(c echo.Context) error {
	var notificationPayload map[string]interface{}

	if err := c.Bind(&notificationPayload); err != nil {
		return c.JSON(http.StatusBadRequest, dtoresult.ErrorResult{Status: "Error", Message: err.Error()})
	}

	transactionStatus := notificationPayload["transaction_status"].(string)
	fraudStatus := notificationPayload["fraud_status"].(string)
	orderId := notificationPayload["order_id"].(string)

	order_Id, _ := strconv.Atoi(orderId)

	transaction, _ := h.TransactionRepository.GetTransaction(order_Id)
	// user, _ := h.UserRepository.GetUser(order_Id)
	if transactionStatus == "capture" {
		if fraudStatus == "challenge" {
			h.TransactionRepository.UpdateTransaction("pending", order_Id)
		} else if fraudStatus == "accept" {

			SendMail("success", transaction)
			h.TransactionRepository.UpdateTransaction("success", order_Id)
		}
	} else if transactionStatus == "settlement" {

		SendMail("success", transaction)
		h.TransactionRepository.UpdateTransaction("success", order_Id)
	} else if transactionStatus == "deny" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "cancel" || transactionStatus == "expire" {
		h.TransactionRepository.UpdateTransaction("failed", order_Id)
	} else if transactionStatus == "pending" {
		h.TransactionRepository.UpdateTransaction("pending", order_Id)
	}

	return c.JSON(http.StatusOK, dtoresult.SuccessResult{Status: "Success", Data: notificationPayload})

}

func SendMail(status string, transaction models.Transaction) {
	if status != transaction.Status && (status == "success") {

		var CONFIG_SMTP_HOST = "smtp.gmail.com"
		var CONFIG_SMTP_PORT = 587
		var CONFIG_SENDER_NAME = "LandTick <robbym6999@gmail.com>"
		var CONFIG_AUTH_EMAIL = os.Getenv("EMAIL_SYSTEM")
		var CONFIG_AUTH_PASSWORD = os.Getenv("PASSWORD_SYSTEM")

		var ticket = strconv.Itoa(transaction.ID)
		var price = strconv.Itoa(transaction.Ticket.Price)

		mailer := gomail.NewMessage()
		mailer.SetHeader("From", CONFIG_SENDER_NAME)
		mailer.SetHeader("To", transaction.User.Email)
		mailer.SetHeader("Subject", "Transaction Status")
		mailer.SetBody("text/html", fmt.Sprintf(`<!DOCTYPE html>
    <html lang="en">
      <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
      <style>
        h1 {
        color: brown;
        }
      </style>
      </head>
      <body>
      <h2>Product payment :</h2>
      <ul style="list-style-type:none;">
        <li>Name : %s</li>
        <li>Total payment: Rp.%s</li>
        <li>Status : <b>%s</b></li>
      </ul>
      </body>
    </html>`, ticket, price, status))

		dialer := gomail.NewDialer(
			CONFIG_SMTP_HOST,
			CONFIG_SMTP_PORT,
			CONFIG_AUTH_EMAIL,
			CONFIG_AUTH_PASSWORD,
		)

		err := dialer.DialAndSend(mailer)
		if err != nil {
			log.Fatal(err.Error())
		}

		log.Println("Mail sent! to " + transaction.User.Email)
	}
}

// func converTransactionResponse(u models.Transaction) dtotransaction.TransactionResponse {
// 	return dtotransaction.TransactionResponse{
// 		ID:       u.ID,
// 		UserID:   u.UserID,
// 		User:     u.User,
// 		TicketID: u.TicketID,
// 		Ticket:   u.Ticket,
// 		Status:   u.Status,
// 	}
// }

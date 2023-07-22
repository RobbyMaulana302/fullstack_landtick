package dtouser

// this struct to used for data response when client getting data
type UserResponse struct {
	ID          int    `json:"id"`
	FullName    string `json:"fullname"`
	UserName    string `json:"username"`
	Email       string `json:"email"`
	Password    string `json:"-"`
	Role        string `json:"role"`
	PhoneNumber string `json:"phone_number"`
	Gender      string `json:"gender"`
	Address     string `json:"address"`
}

type UserUpdateRequest struct {
	FullName    string `json:"fullname" form:"fullname"`
	UserName    string `json:"username" form:"username"`
	Email       string `json:"email" form:"email"`
	Password    string `json:"-" form:"password"`
	PhoneNumber string `json:"phone_number" form:"phone_number"`
	Address     string `json:"address" form:"address"`
}

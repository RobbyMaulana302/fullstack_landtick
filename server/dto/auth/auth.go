package dtoauth

type AuthRequest struct {
	FullName    string `json:"fullname" form:"fullname" validate:"required"`
	UserName    string `json:"username" form:"username" validate:"required"`
	Email       string `json:"email" form:"email" validate:"required"`
	Password    string `json:"password"  form:"password" validate:"required"`
	PhoneNumber string `json:"phone_number" form:"phone_number" validate:"required"`
	Gender      string `json:"gender" form:"gender" validate:"required"`
	Address     string `json:"address" form:"address" validate:"required"`
}

type AuthLogin struct {
	Username string `json:"username" validate:"required" form:"username"`
	Password string `json:"password" validate:"required" form:"password"`
}

type LoginResponse struct {
	FullName    string `json:"fullName"`
	UserName    string `json:"userName"`
	Email       string `json:"email"`
	Password    string `json:"-"`
	Role        string `json:"role"`
	PhoneNumber string `json:"phone_number"`
	Gender      string `json:"gender"`
	Address     string `json:"address"`
	Token       string `json:"token"`
}

package dtoresult

// this struct to show if client success get data
type SuccessResult struct {
	Status string      `json:"status"`
	Data   interface{} `json:"data"`
}

// this struct to show if client Unsuccess get data
type ErrorResult struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

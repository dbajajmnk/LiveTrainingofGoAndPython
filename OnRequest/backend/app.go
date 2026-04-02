package main

import (
	"github.com/gin-gonic/gin"
)

type LoginRequest struct {
	Name  string `json:"name"`
	Email string `json:"email"`
	Phone string `json:"phone"`
}

func main() {
	r := gin.Default()
	handler("/ping/:id", r)
	r.Run(":8080")
}

// func handler(route string, r *gin.Engine) {

//		r.GET(route, func(c *gin.Context) {
//			//query := c.Query("q")
//			pathParam := c.Param("id")
//			c.JSON(200, gin.H{
//				"status":  "success",
//				"message": pathParam,
//			})
//		})
//	}
func handler(route string, r *gin.Engine) {

	var req LoginRequest

	r.POST(route, func(c *gin.Context) {
		//query := c.Query("q")
		//pathParam := c.Param("id")
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(400, gin.H{
				"error": "invalid request body",
			})
			return
		}

		c.JSON(200, gin.H{
			"status":  "success",
			"message": req.Email,
		})
	})
}

package main

import (
	"time"
	"github.com/gin-gonic/gin"
	"github.com/dgrijalva/jwt-go"
	
)

var SECRET = []byte("secret")

func main() {
	r := gin.Default()

	r.POST("/login", func(c *gin.Context) {
		var u struct{ User, Pass string }
		c.BindJSON(&u)
		if u.User=="admin" && u.Pass=="1234" {
			t,_:=jwt.NewWithClaims(jwt.SigningMethodHS256,jwt.MapClaims{
				"user": u.User, "exp": time.Now().Add(time.Hour).Unix(),
			}).SignedString(SECRET)
			c.JSON(200, gin.H{"token": t})
			return
		}
		c.JSON(401, "Invalid")
	})

	auth := func(c *gin.Context){
		h:=c.GetHeader("Authorization")
		if h==""{c.AbortWithStatus(403); return}
		t,_:=jwt.Parse(h[len("Bearer "):],func(*jwt.Token)(interface{},error){return SECRET,nil})
		if cT,ok:=t.Claims.(jwt.MapClaims);ok && t.Valid{c.Set("user",cT["user"]);c.Next()} else {c.AbortWithStatus(403)}
	}

	r.GET("/protected", auth, func(c *gin.Context){
		c.JSON(200, gin.H{"msg":"Protected","user":c.MustGet("user")})
	})

	r.Run(":8081")
}
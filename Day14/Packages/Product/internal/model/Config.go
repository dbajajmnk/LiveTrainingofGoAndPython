package model

type Config struct {
	app          App
	serverConfig ServerConfig
}
type App struct {
	name string
}
type ServerConfig struct {
	Url  string
	Port string
}

package main

import "testing"

func TestAdd(t *testing.T) {
	got := Add(10, 20)
	expected := 30
	if got != expected {
		t.Errorf("got->Add(10,20)= %d, expected %d", got, expected)
	}
}

func TestSubtract(t *testing.T) {
	got := Subtract(20, 10)
	expected := 10
	if got != expected {
		t.Errorf("got->Subtract(20,10)= %d, expected %d", got, expected)
	}
}

func TestMulti(t *testing.T) {
	got := Multi(10, 20)
	expected := 200
	if got != expected {
		t.Errorf("got->Multi(10,20)= %d, expected %d", got, expected)
	}
}

func TestDivide(t *testing.T) {
	got := Divide(20, 10)
	expected := 2
	if got != expected {
		t.Errorf("got->Divide(20,10)= %d, expected %d", got, expected)
	}
}

func TestMod(t *testing.T) {
	got := Mod(20, 10)
	expected := 0
	if got != expected {
		t.Errorf("got->Mod(20,10)= %d, expected %d", got, expected)
	}
}

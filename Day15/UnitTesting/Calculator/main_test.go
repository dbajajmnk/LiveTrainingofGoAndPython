package main

import "testing"

func TestAdd(t *testing.T) {
	got := Add(10, 20)
	expected := 30
	if got != expected {
		t.Errorf("Add(10,20)=%d and Expected=%d", got, expected)
	}

}

func TestMulti(t *testing.T) {
	got := Multi(10, 20)
	expected := 200
	if got != expected {
		t.Errorf("Multi(10,20)=%d and Expected=%d", got, expected)
	}

}
func TestDivide(t *testing.T) {
	got := Divide(20, 10)
	expected := 2
	if got != expected {
		t.Errorf("Divide(10,20)=%d and Expected=%d", got, expected)
	}

}
func TestSubtract(t *testing.T) {
	got := Subtract(50, 20)
	expected := 30
	if got != expected {
		t.Errorf("SubTract(10,20)=%d and Expected=%d", got, expected)
	}

}
func TestMode(t *testing.T) {
	got := Mode(63, 20)
	expected := 3
	if got != expected {
		t.Errorf("Mode(10,20)=%d and Expected=%d", got, expected)
	}

}

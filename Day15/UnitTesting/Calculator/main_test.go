package main
import "testing"

func TestAdd(t *testing.T)  {
	got:= Add(10,20)
	expected:=30

	if got != expected {
		t.Errorf("Add(10,20)=%d and Expectation = %d", got, expected)
	}
	
}

func TestSubstract(t *testing.T)  {
	got:= Substract(30,20)
	expected:=10

	if got != expected {
		t.Errorf("Sub(30,20)=%d and Expectation = %d", got, expected)
	}
	
}


func TestMulti(t *testing.T)  {
	got:= Multi(30,20)
	expected:=600

	if got != expected {
		t.Errorf("Sub(30,20)=%d and Expectation = %d", got, expected)
	}
	
}

func TestDivide(t *testing.T)  {
	got:= Divide(200,20)
	expected:=10

	if got != expected {
		t.Errorf("Sub(200,20)=%d and Expectation = %d", got, expected)
	}
	
}

func TestMode(t *testing.T)  {
	got:= Mode(20,20)
	expected:=0

	if got != expected {
		t.Errorf("Sub(20,20)=%d and Expectation = %d", got, expected)
	}
	
}
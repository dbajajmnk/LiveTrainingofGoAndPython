package main

import (
	"testing"
)

func TestSumWithFormula(t *testing.T) {
	got := SumWithFormula(10)
	expected := 55
	if got != expected {
		t.Errorf("SumWithFormula(10) got %d, expected %d", got, expected)
	}

}

func TestSumWithLoop(t *testing.T) {
	got := SumWithLoop(10)
	expected := 55
	if got != expected {
		t.Errorf("SumWithLoop(10) got = %d Expected=%d", got, expected)
	}
}


func BenchmarkSumWithLoop(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SumWithLoop(10)
	}
}

func BenchmarkSumWithFormula(b *testing.B) {
	for i := 0; i < b.N; i++ {
		SumWithFormula(10)
	}
}
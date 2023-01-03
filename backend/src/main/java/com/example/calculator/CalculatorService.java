package com.example.calculator;

import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class CalculatorService {

    final double MAX = (2 - Math.pow(2.0, -52.0)) * Math.pow(2, 1023);
    public String eval(String op, String first, String second) {
        String output = "";
        switch (op) {
            case "+":
                output = add(first, second);
                break;
            case "-":
                output = subtract(first, second);
                break;
            case "x":
                output = multiply(first, second);
                break;
            case "divide":
                output = divide(first, second);
                break;
            case "frac":
                output = fraction(first);
                break;
            case "sqr":
                output = sqr(first);
                break;
            case "sqrt":
                output = sqrt(first);
                break;
            case "percent":
                output = percent(first, second);
                break;
            case "neg":
                output = negate(first);
        }
        return output;
    }

    public String add(String first, String second) {
        String output = String.valueOf(Double.parseDouble(first) + Double.parseDouble(second));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String subtract(String first, String second) {
        String output = String.valueOf(Double.parseDouble(first) - Double.parseDouble(second));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String multiply(String first, String second) {
        String output = String.valueOf(Double.parseDouble(first) * Double.parseDouble(second));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String divide(String first, String second) {
        String output = "";
        if (Objects.equals(second, "0")) {
            return null;
        } else {
            output = String.valueOf(Double.parseDouble(first) / Double.parseDouble(second));
        }
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }
    public String fraction(String operand){
        String output = "";
        if (Objects.equals(operand, "0")) {
            return null;
        } else {
            output = String.valueOf(1 / Double.parseDouble(operand));
        }
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String sqr(String operand) {
        String output = String.valueOf(Double.parseDouble(operand) * Double.parseDouble(operand));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String sqrt(String operand) {
        String output = "";
        if (Double.parseDouble(operand) < 0) {
            return null;
        } else {
            output = String.valueOf(Math.sqrt(Double.parseDouble(operand)));
        }
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String percent(String first, String second) {
        String output = String.valueOf(Double.parseDouble(first) * (Double.parseDouble(second)/100));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }

    public String negate(String operand) {
        String output = String.valueOf(-1 * Double.parseDouble(operand));
        if(Math.abs(Double.parseDouble(output)) > MAX){
            return null;
        }
        return output;
    }
}

package com.example.calculator;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CalculatorController {
    @PostMapping(value = "/operation/{op}/{first}/{second}")
    public String handler(@PathVariable("op") String operator, @PathVariable("first") String firstOp, @PathVariable("second") String secondOp) {
        final CalculatorService calculator = new CalculatorService();
        return calculator.eval(operator, firstOp, secondOp);


    }
}

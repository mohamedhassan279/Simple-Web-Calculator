import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { CalculatorService } from './calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'calculator';
  curisBin = false;
  history = ""
  main: string = "0"
  firstbin: string = "0"
  secondbin: string = "0"
  firstun: string = "0"
  secondun: string = "0"
  binaryop: string = "";
  unaryop: string = "";
  unaryop1: string = ""
  unaryop2: string = ""
  multipleClick = false;
  isOpClicked = false;
  isUnaryClicked = false;
  isDotClicked = false;
  isEqClicked = false;
  isfirst = true;
  errorflag = false;
  succssive = false;

  constructor(private myservice: CalculatorService) { }

  sendExpression(op: string, first: string, second: string) {
    this.myservice.evaluateOp(op, first, second).subscribe({
      next: (x) => {
        if (x == null) {
          this.errorflag = true;
          if (op == "divide" || op == "frac")
            this.main = "Cannot divide by zero";
          else if (op == "sqrt") {
            this.main = "Invalid input"
          }
          else {
            this.main = "Overflow";
          }
        }
        else {
          if (!this.curisBin) {
            this.firstbin = x;
          }
          this.main = x;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  succssiveSendExpression(firstop: string, secondop: string, first: string, second: string) {
    this.myservice.evaluateOp(firstop, first, second).subscribe({
      next: (x) => {
        if (x == null) {
          this.errorflag = true;
          if (firstop == "divide" || firstop == "frac")
            this.main = "Cannot divide by zero";
          else if (firstop == "sqrt") {
            this.main = "Invalid input"
          }
          else {
            this.main = "Overflow";
          }
        }
        else {
          this.firstbin = x;
          this.main = x;
          this.secondbin = x;
          this.binaryop = secondop;
          this.history = this.firstbin + " ";
          if (this.binaryop == "divide") {
            this.history += "÷";
          }
          else {
            this.history += this.binaryop;
          }
          this.succssive = true;
        }
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    })
  }

  pressNum(num: string) {
    if (this.errorflag) {
      this.clear();
      return;
    }
    if (this.isEqClicked) {
      this.history = "";
      this.main = "0";
    }
    if (this.multipleClick || this.isUnaryClicked) {
      this.main = num;
      this.isUnaryClicked = false;
    }
    else {
      if (this.main.length == 16) {
        return;
      }
      if (num == ".") {
        if (!this.isDotClicked) {
          this.isDotClicked = true;
          this.main += num;
        }
      }
      else if (this.main == "0") {
        this.main = num;
      }
      else {
        this.main += num;
      }
    }
    this.multipleClick = false;
    this.isEqClicked = false;
    this.succssive = false;
  }

  pressOp(operator: string) {
    this.curisBin = true;

    if (this.errorflag) {
      this.clear();
      return;
    }
    if (this.multipleClick) {
      this.binaryop = operator;
      this.history = this.history.substring(0, this.history.length - 1);
      if (operator == "divide") {
        this.history += "÷";
      }
      else {
        this.history += this.binaryop;
      }
    }
    else if (this.isOpClicked) {
      if (!this.succssive || this.unaryop != "") {
        this.unaryop1 = "";
        this.unaryop2 = "";
        this.succssiveSendExpression(this.binaryop, operator, this.firstbin, this.main);
      }
    }
    else {
      this.binaryop = operator;
      if (this.isEqClicked) {
        this.binaryop = operator;
        if (this.isDotClicked) {
          this.main = String(Number(this.main));
        }
        this.history = this.main + " ";
        if (operator == "divide") {
          this.history += "÷";
        }
        else {
          this.history += this.binaryop;
        }
      }
      if (this.unaryop1 != "") {
        if (operator == "divide") {
          this.history += " ÷";
        }
        else {
          this.history += " " + this.binaryop;
        }
      }
      else {
        this.isfirst = false;
        this.firstbin = this.main;
        if (this.isDotClicked) {
          this.main = String(Number(this.main));
        }
        if (operator == "divide") {
          this.history = this.main + " ÷";
        }
        else {
          this.history = this.main + " " + this.binaryop;
        }
      }

    }
    this.multipleClick = true;
    this.isOpClicked = true;
    this.isEqClicked = false;
    this.isDotClicked = false;
    this.unaryop1 = "";
    this.isUnaryClicked = false;
    this.curisBin = true;
  }

  unary(operator: string) {
    if (this.errorflag) {
      this.clear();
      return;
    }
    if (this.isDotClicked) {
      this.main = String(Number(this.main));
    }
    switch (operator) {
      case 'percent':
        console.log(this.binaryop);
        if (this.binaryop == "") {
          this.firstun = "0";
          this.secondun = this.main;
        }
        else {
          this.firstun = this.firstbin;
          this.secondun = this.main;
        }
        this.isUnaryClicked = true;
        this.unaryop = operator;
        this.sendExpression(operator, this.firstun, this.secondun);
        return;
      case 'frac':
        if (!this.isUnaryClicked) {
          this.isUnaryClicked = true;
          if (!this.isfirst) {
            this.unaryop2 = '1/(' + this.main + ')';
            this.history += this.unaryop2;
          }
          else {
            this.isfirst = false;
            this.unaryop1 += '1/(' + this.main + ')';
            this.history = this.unaryop1;
          }
        }
        else {
          if (this.unaryop1 != "") {
            let tmp: string = this.unaryop1;
            this.unaryop1 = '1/(' + this.unaryop1 + ')';
            this.history = this.history.replace(tmp, this.unaryop1);
          }
          else {
            let tmp: string = this.unaryop2;
            this.unaryop2 = '1/(' + this.unaryop2 + ')';
            this.history = this.history.replace(tmp, this.unaryop2);
          }
        }
        break;
      case 'sqr':
        if (!this.isUnaryClicked) {
          this.isUnaryClicked = true;
          if (!this.isfirst) {
            this.unaryop2 = 'sqr(' + this.main + ')';
            this.history += this.unaryop2;
          }
          else {
            this.isfirst = false;
            this.unaryop1 += 'sqr(' + this.main + ')';
            this.history = this.unaryop1;
          }
        }
        else {
          if (this.unaryop1 != "") {
            let tmp: string = this.unaryop1;
            this.unaryop1 = 'sqr(' + this.unaryop1 + ')';
            this.history = this.history.replace(tmp, this.unaryop1);
          }
          else {
            let tmp: string = this.unaryop2;
            this.unaryop2 = 'sqr(' + this.unaryop2 + ')';
            this.history = this.history.replace(tmp, this.unaryop2);
          }
        }
        break;
      case 'sqrt':
        if (!this.isUnaryClicked) {
          this.isUnaryClicked = true;
          if (!this.isfirst) {
            this.unaryop2 = '√(' + this.main + ')';
            this.history += this.unaryop2;
          }
          else {
            this.isfirst = false;
            this.unaryop1 += '√(' + this.main + ')';
            this.history = this.unaryop1;
          }
        }
        else {
          if (this.unaryop1 != "") {
            let tmp: string = this.unaryop1;
            this.unaryop1 = '√(' + this.unaryop1 + ')';
            this.history = this.history.replace(tmp, this.unaryop1);
          }
          else {
            let tmp: string = this.unaryop2;
            this.unaryop2 = '√(' + this.unaryop2 + ')';
            this.history = this.history.replace(tmp, this.unaryop2);
          }
        }
        break;
      case "neg":
        if (!this.isUnaryClicked) {
          this.isUnaryClicked = true;
          if (!this.isfirst) {
            this.unaryop2 = 'negate(' + this.main + ')';
            this.history += this.unaryop2;
          }
          else {
            this.isfirst = false;
            this.unaryop1 += 'negate(' + this.main + ')';
            this.history = this.unaryop1;
          }
        }
        else {
          if (this.unaryop1 != "") {
            let tmp: string = this.unaryop1;
            this.unaryop1 = 'negate(' + this.unaryop1 + ')';
            this.history = this.history.replace(tmp, this.unaryop1);
          }
          else {
            let tmp: string = this.unaryop2;
            this.unaryop2 = 'negate(' + this.unaryop2 + ')';
            this.history = this.history.replace(tmp, this.unaryop2);
          }
        }
        break;
    }
    this.isUnaryClicked = true;
    this.multipleClick = false;
    this.unaryop = operator;
    this.firstun = this.main;
    this.secondun = this.firstun;
    this.sendExpression(this.unaryop, this.firstun, this.secondun);
  }
  pressEq() {
    if (this.errorflag) {
      this.clear();
      return;
    }
    if (!this.isEqClicked) {
      this.isEqClicked = true;
      if (this.binaryop == "") {
        if (this.isDotClicked) {
          this.main = String(Number(this.main));
        }
        this.history += this.main + " =";
      }

      else if (this.unaryop2 != "" || this.unaryop1 != "") {
        this.history += " =";
        this.secondbin = this.main;
        this.sendExpression(this.binaryop, this.firstbin, this.secondbin);
      }
      else {
        this.secondbin = this.main;
        if (this.isDotClicked) {
          this.main = String(Number(this.main));
        }
        this.history += " " + this.main + " =";
        this.sendExpression(this.binaryop, this.firstbin, this.secondbin);
      }
      this.isOpClicked = false;
      this.multipleClick = false;
      this.isUnaryClicked = false;
      this.unaryop1 = "";
      this.unaryop2 = "";
    }
  }

  clearEntry() {
    this.curisBin = false;
    this.history = ""
    this.main = "0"
    this.firstbin = "0"
    this.secondbin = "0"
    this.firstun = ""
    this.secondun = ""
    this.binaryop = "";
    this.unaryop = "";
    this.unaryop1 = "";
    this.unaryop2 = "";
    this.multipleClick = false;
    this.isOpClicked = false;
    this.isUnaryClicked = false;
    this.isDotClicked = false;
    this.isEqClicked = false;
    this.isfirst = true;
    this.errorflag = false;
    this.succssive = false;
  }
  backspace() {
    if (this.errorflag) {
      this.clear();
      return;
    }
    if (this.main.charAt(this.main.length - 1) == '.') {
      this.isDotClicked = false;
    }
    if (this.main.length == 1) {
      this.main = "0";
    }
    else {
      this.main = this.main.substring(0, this.main.length - 1);
    }
  }
  clear() {
    this.curisBin = false;
    this.history = ""
    this.main = "0"
    this.firstbin = "0"
    this.secondbin = "0"
    this.firstun = ""
    this.secondun = ""
    this.binaryop = "";
    this.unaryop = "";
    this.unaryop1 = "";
    this.unaryop2 = "";
    this.multipleClick = false;
    this.isOpClicked = false;
    this.isUnaryClicked = false;
    this.isDotClicked = false;
    this.isEqClicked = false;
    this.isfirst = true;
    this.errorflag = false;
    this.succssive = false;
  }
}
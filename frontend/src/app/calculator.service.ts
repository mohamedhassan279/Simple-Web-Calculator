import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class CalculatorService {
    constructor(private http: HttpClient) {}

    public evaluateOp(op: string, first: string, second: string): Observable<string> {
        return this.http.post<string>(`http://localhost:9090/operation/${op}/${first}/${second}`, JSON);
    }
}

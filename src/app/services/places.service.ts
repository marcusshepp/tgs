import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface GoogleReview {
    author_name: string;
    profile_photo_url: string;
    rating: number;
    relative_time_description: string;
    text: string;
    time: number;
}

export interface GooglePlacesResponse {
    result: {
        reviews: GoogleReview[];
    };
    status: string;
}

@Injectable({
    providedIn: 'root',
})
export class GoogleReviewsService {
    private apiUrl = environment.apiUrl + '/google-places';

    constructor(private http: HttpClient) {}

    getReviews(): Observable<GoogleReview[]> {
        return this.http
            .get<GooglePlacesResponse>(this.apiUrl, { })
            .pipe(
                map((response) => {
                    if (
                        response &&
                        response.result &&
                        response.result.reviews
                    ) {
                        return response.result.reviews
                            .sort((a, b) => b.time - a.time)
                            .slice(0, 5);
                    }
                    return [];
                }),
                catchError((error) => {
                    console.error('Error fetching reviews:', error);
                    return of([]);
                })
            );
    }
}

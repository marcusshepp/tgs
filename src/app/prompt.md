Project Path: meet-us

Source Tree:

```
meet-us
├── meet-us.component.scss
├── meet-us.component.html
├── meet-us.component.ts
└── feedback
    ├── meet-us.component.scss
    ├── meet-us.component.html
    └── meet-us.component.ts

```

`/home/marcusshep/p/tgs/src/app/meet-us/meet-us.component.html`:

```html
<p>meet-us works!</p>

```

`/home/marcusshep/p/tgs/src/app/meet-us/meet-us.component.ts`:

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-meet-us',
  standalone: true,
  imports: [],
  templateUrl: './meet-us.component.html',
  styleUrl: './meet-us.component.scss'
})
export class MeetUsComponent {

}

```

`/home/marcusshep/p/tgs/src/app/meet-us/feedback/meet-us.component.scss`:

```scss
.form-control:focus,
.form-select:focus {
    border-color: #ff6b35;
    box-shadow: 0 0 0 0.25rem rgba(255, 107, 53, 0.25);
}

.btn-primary {
    background-color: #ff6b35;
    border-color: #ff6b35;
}

.btn-primary:hover {
    background-color: #e85a2c;
    border-color: #e85a2c;
}

textarea.form-control {
    width: 100%;
    padding: 15px 20px;
    margin-bottom: 25px;
    border-radius: 8px;
    border: 1px solid #d4dcff;
    color: var(--text);
    font-family: var(--body-font);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px;
}

.contact-form {
    margin: 30px;
}

@media (min-width: 1200px) {
    .contact-form-thumb img {
        max-width: 100%;
        height: auto;
    }
}

@media (max-width: 1200px) {
    .contact-form-thumb img {
        max-width: 80%;
        height: auto;
    }
}

```

`/home/marcusshep/p/tgs/src/app/meet-us/feedback/meet-us.component.html`:

```html
<div class="breadcumb-section">
    <div class="breadcumb-wrapper truck-9">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="breadcumb-content"></div>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="contact-form style2 p-4">
    <h2 class="mb-4">Feedback</h2>
    <form class="row g-3" action="#">
        <div class="col-md-6">
            <input type="text" placeholder="Full Name" class="form-control" />
        </div>
        <div class="col-md-6">
            <input
                type="email"
                placeholder="Email Address"
                class="form-control"
            />
        </div>
        <app-stars (ratingChange)="onRatingChange($event)"></app-stars>
        <div class="col-12">
            <textarea
                id="message"
                class="form-control"
                placeholder="Tell us what you liked about our services"
                rows="5"
            ></textarea>
        </div>
        <div class="col-12 form-group mb-0">
            <button class="btn btn-primary w-100">
                Submit Feedback
                <i class="fa-sharp fa-regular fa-arrow-right-long ms-2"></i>
            </button>
        </div>
    </form>
</div>

```

`/home/marcusshep/p/tgs/src/app/meet-us/feedback/meet-us.component.ts`:

```ts
import { Component } from '@angular/core';

@Component({
    selector: 'app-meet-us',
    standalone: true,
    templateUrl: './meet-us.component.html',
    styleUrl: './meet-us.component.scss',
})
export class MeetUsComponent {
    public onRatingChange(rating: number): void {
        console.log(`New rating for ${rating}`);
    }
}

```
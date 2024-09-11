import {AfterViewInit, Component, OnInit} from '@angular/core';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit, AfterViewInit {
  title = 'event-front';

  events: Event[] = [
    { name: 'Athens Marathon', location: 'Athens, Greece', date: 'November 12, 2023', time: '9:00 AM', price: 150, category: 'Sports & Fitness' },
    { name: 'Berlin Art Week', location: 'Berlin, Germany', date: 'September 11, 2023', time: '10:00 AM', price: 20, category: 'Art & Culture' },
    { name: 'Lollapalooza Chicago', location: 'Grant Park, Chicago', date: 'August 2, 2024', time: '12:00 PM', price: 350, category: 'Music' },
    { name: 'Web Summit 2024', location: 'Lisbon, Portugal', date: 'November 4, 2024', time: '9:00 AM', price: 900, category: 'Technology' },
    { name: 'Cannes Film Festival', location: 'Cannes, France', date: 'May 14, 2024', time: '10:00 AM', price: 500, category: 'Art & Culture' },
    { name: 'Bla Bla conf', location: 'Agadir, Morocco', date: 'March 8, 2024', time: '12:00 PM', price: 750, category: 'Technology' },
    { name: 'Tokyo Marathon', location: 'Tokyo, Japan', date: 'March 3, 2024', time: '7:00 AM', price: 250, category: 'Sports & Fitness' },
    { name: 'TEDx Conference', location: 'New York, USA', date: 'April 6, 2024', time: '10:00 AM', price: 300, category: 'Science & Education' },
    { name: 'Tomorrowland', location: 'Boom, Belgium', date: 'July 19, 2024', time: '2:00 PM', price: 500, category: 'Music' },
    { name: 'Wimbledon Finals', location: 'London, UK', date: 'July 14, 2024', time: '3:00 PM', price: 1200, category: 'Sports & Fitness' },
    { name: 'Glastonbury Festival', location: 'Somerset, UK', date: 'June 26, 2024', time: '11:00 AM', price: 300, category: 'Music' },
    { name: 'Paris Fashion Week', location: 'Paris, France', date: 'February 26, 2024', time: '9:00 AM', price: 2000, category: 'Art & Culture' },
    { name: 'Harvard Business Conference', location: 'Boston, USA', date: 'October 17, 2023', time: '9:00 AM', price: 1000, category: 'Business & Career' },
    { name: 'Oktoberfest', location: 'Munich, Germany', date: 'September 16, 2024', time: '10:00 AM', price: 100, category: 'Social Activities' },
    { name: 'Dubai Expo 2024', location: 'Dubai, UAE', date: 'January 1, 2024', time: '9:00 AM', price: 50, category: 'Technology' },
    { name: 'New York City Marathon', location: 'New York, USA', date: 'November 5, 2023', time: '8:00 AM', price: 350, category: 'Sports & Fitness' },
    { name: 'Burning Man', location: 'Black Rock City, Nevada', date: 'August 25, 2024', time: '12:00 PM', price: 400, category: 'Social Activities' },
    { name: 'Coachella', location: 'Indio, California', date: 'April 12, 2024', time: '11:00 AM', price: 450, category: 'Music' },
    { name: 'Geneva International Motor Show', location: 'Geneva, Switzerland', date: 'March 5, 2024', time: '9:00 AM', price: 60, category: 'Technology' },
    { name: 'Edinburgh Fringe Festival', location: 'Edinburgh, UK', date: 'August 2, 2024', time: '10:00 AM', price: 40, category: 'Art & Culture' },
    { name: 'World Economic Forum', location: 'Davos, Switzerland', date: 'January 15, 2024', time: '9:00 AM', price: 2500, category: 'Business & Career' },
    { name: 'Formula 1 Monaco Grand Prix', location: 'Monte Carlo, Monaco', date: 'May 26, 2024', time: '2:00 PM', price: 800, category: 'Sports & Fitness' },
    { name: 'Vienna Opera Ball', location: 'Vienna, Austria', date: 'February 8, 2024', time: '7:00 PM', price: 1000, category: 'Art & Culture' },
    { name: 'Nobel Prize Ceremony', location: 'Stockholm, Sweden', date: 'December 10, 2023', time: '5:00 PM', price: 1500, category: 'Science & Education' },
    { name: 'Comic-Con International', location: 'San Diego, California', date: 'July 18, 2024', time: '9:00 AM', price: 200, category: 'Games' },
  ];

  categories = [
    { name: 'Social Activities', selected: false },
    { name: 'Art & Culture', selected: false },
    { name: 'Community & Environment', selected: false },
    { name: 'Business & Career', selected: false },
    { name: 'Language', selected: false },
    { name: 'Games', selected: false },
    { name: 'Political Organizations', selected: false },
    { name: 'Music', selected: false },
    { name: 'Religion & Spirituality', selected: false },
    { name: 'Health & Wellness', selected: false },
    { name: 'Science & Education', selected: false },
    { name: 'Support & Coaching', selected: false },
    { name: 'Sports & Fitness', selected: false },
    { name: 'Technology', selected: false },
    { name: 'Travel', selected: false }
  ];

  filteredEvents: Event[] = [...this.events];
  paginatedEvents: Event[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  totalPages: number = 1;

  // Add minPrice and maxPrice variables
  minPrice: number = 0;
  maxPrice: number = 5000;


  isModalOpen: boolean = false;
  selectedEvent!: Event;
  protected readonly Math = Math;

  ngOnInit() {
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.paginateEvents();
  }

  ngAfterViewInit() {
    flatpickr('#datepicker', {
      mode: 'range',
      dateFormat: 'd-m-Y',
      defaultDate: 'today',
    });

    this.paginateEvents(); // Initialize pagination
  }

  onSearch() {
    console.log("Search button clicked!");
  }

  // Apply Filters Logic
  applyFilters() {
    const selectedCategories = this.categories
      .filter(category => category.selected)
      .map(category => category.name);

    this.filteredEvents = this.events.filter(event => {
        const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const priceMatch = event.price >= this.minPrice && event.price <= this.maxPrice;

        return categoryMatch && priceMatch;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.paginateEvents();
  }

  paginateEvents() {
    const start: number = (this.currentPage - 1) * this.pageSize;
    const end: number = start + this.pageSize;
    this.paginatedEvents = this.filteredEvents.slice(start, end);
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
  }

  updatePageSize(event: any) {
    this.pageSize = Number(event.target.value);
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredEvents.length / this.pageSize);
    this.paginateEvents();
  }

  getPagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.paginateEvents();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateEvents();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateEvents();
    }
  }

  openBookTicketModal(event: Event) {
    this.selectedEvent = event;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmBooking() {
    console.log("Confirmed booking for:", this.selectedEvent.name);
    this.isModalOpen = false;
  }

  onPriceChange(event: any) {
    console.log('Price filter applied:', event.target.value);
  }
}

interface Event {
  name: string;
  location: string;
  date: string;
  time: string;
  price: number;
  category: string;
}

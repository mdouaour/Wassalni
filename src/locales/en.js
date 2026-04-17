const en = {
  translation: {
    // ── App / common ──────────────────────────────────────────
    appName: 'WASALNI',
    appSlogan: 'Algerian Ride Sharing',
    loading: 'Loading',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    clear: 'Clear',
    goHome: 'Go Home',
    anonymous: 'Anonymous',

    // ── Navigation ────────────────────────────────────────────
    nav: {
      findRides: 'Find Rides',
      offerRide: 'Offer Ride',
      myBookings: 'My Bookings',
      profile: 'Profile',
      signOut: 'Sign Out',
      login: 'Login',
      signUp: 'Sign Up',
    },

    // ── Footer ────────────────────────────────────────────────
    footer: {
      tagline: 'Travel together, save together.',
    },

    // ── Language switcher ─────────────────────────────────────
    language: {
      label: 'Language',
      en: 'EN',
      fr: 'FR',
    },

    // ── Home page ─────────────────────────────────────────────
    home: {
      hero_title: 'Share Rides Across',
      hero_subtitle:
        'WASALNI connects drivers with empty seats to passengers going the same way. Save money, reduce traffic, and travel together.',
      findRide: '🔍 Find a Ride',
      offerRide: '🚗 Offer a Ride',
      signUpFree: '📝 Sign Up Free',
      howItWorks: 'How It Works',
      search: 'Search',
      searchDesc: 'Enter your destination and find available rides',
      book: 'Book',
      bookDesc: 'Reserve a seat with one click and coordinate with the driver',
      travel: 'Travel',
      travelDesc: 'Share the ride, split the cost, and enjoy the journey',
      wilayasCovered: 'Wilayas Covered',
      available: 'Available',
      free: 'Free',
      toUse: 'To Use',
    },

    // ── Auth ──────────────────────────────────────────────────
    auth: {
      welcomeBack: 'Welcome Back',
      signInSubtitle: 'Sign in to your WASALNI account',
      email: 'Email',
      password: 'Password',
      signIn: 'Sign In',
      noAccount: "Don't have an account?",
      createAccount: 'Create Account',
      createAccountSubtitle: 'Join WASALNI and start sharing rides',
      fullName: 'Full Name',
      confirmPassword: 'Confirm Password',
      alreadyAccount: 'Already have an account?',
      // validation
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      invalidEmail: 'Invalid email format',
      passwordRequired: 'Password is required',
      passwordMinLength: 'Password must be at least 6 characters',
      passwordMismatch: 'Passwords do not match',
    },

    // ── Ride list page ────────────────────────────────────────
    rideList: {
      title: 'Find a Ride',
      subtitle: 'Search available rides across Algeria',
      ridesFound_one: '{{count}} ride found',
      ridesFound_other: '{{count}} rides found',
      noRidesTitle: 'No rides found',
      noRidesMessage: 'Try adjusting your search filters or check back later for new rides.',
    },

    // ── Ride search form ──────────────────────────────────────
    rideSearch: {
      from: 'From',
      to: 'To',
      date: 'Date',
      maxPrice: 'Max Price (DA)',
      anyCity: 'Any city',
      anyPrice: 'Any price',
      searchButton: '🔍 Search Rides',
    },

    // ── Ride card ─────────────────────────────────────────────
    rideCard: {
      seat_one: '{{count}} seat left',
      seat_other: '{{count}} seats left',
    },

    // ── Ride detail page ──────────────────────────────────────
    rideDetail: {
      backToRides: '← Back to rides',
      date: 'Date',
      time: 'Time',
      pricePerSeat: 'Price per seat',
      availableSeats: 'Available seats',
      notes: 'Notes',
      driver: 'Driver',
      reviews_one: '{{count}} review',
      reviews_other: '{{count}} reviews',
      bookButton: '📱 Book This Ride',
      fullyBooked: 'This ride is fully booked',
      bookedSuccess: 'Ride booked successfully! Check your',
      bookings: 'bookings',
      thisIsYourRide: 'This is your ride',
      driverReviews: 'Driver Reviews',
      rateDriver: '⭐ Rate Driver',
      rideNotFound: 'Ride not found',
    },

    // ── Create ride page ──────────────────────────────────────
    createRide: {
      title: 'Offer a Ride',
      subtitle: 'Share your empty seats with fellow travelers',
      departureCity: 'Departure City *',
      destinationCity: 'Destination City *',
      departureDateTime: 'Departure Date & Time *',
      pricePerSeat: 'Price per Seat (DA) *',
      availableSeats: 'Available Seats *',
      seatsPlaceholder: '1-8',
      notes: 'Notes (optional)',
      notesPlaceholder: 'e.g. Pick-up point, luggage space, smoking policy...',
      publish: '🚗 Publish Ride',
      // validation
      departureCityRequired: 'Departure city is required',
      destinationCityRequired: 'Destination city is required',
      differentCities: 'Destination must be different from departure',
      departureTimeRequired: 'Departure time is required',
      departureTimeFuture: 'Departure time must be in the future',
      validPrice: 'Valid price is required',
      seatsRange: 'Seats must be between 1 and 8',
    },

    // ── Bookings page ─────────────────────────────────────────
    bookings: {
      title: 'My Bookings',
      subtitle: 'Manage your ride reservations',
      noBookingsTitle: 'No bookings yet',
      noBookingsMessage: "You haven't booked any rides. Search for available rides to get started.",
      findRides: 'Find Rides',
    },

    // ── Booking card ──────────────────────────────────────────
    bookingCard: {
      at: 'at',
      driver: 'Driver',
      cancelBooking: 'Cancel Booking',
      status: {
        pending: 'pending',
        confirmed: 'confirmed',
        cancelled: 'cancelled',
        completed: 'completed',
      },
    },

    // ── Profile page ──────────────────────────────────────────
    profile: {
      tabs: {
        info: 'Info',
        rides: 'Rides',
        reviews: 'Reviews',
      },
      name: 'Name',
      email: 'Email',
      role: 'Role',
      noRidesYet: 'No rides published yet.',
      becomeDriverPrompt: 'Want to offer rides? Become a driver to publish trips.',
      becomeDriver: '🚗 Become a Driver',
    },

    // ── Rating ────────────────────────────────────────────────
    rating: {
      rating: 'Rating',
      comment: 'Comment (optional)',
      commentPlaceholder: 'Share your experience...',
      submit: 'Submit Rating',
      noRatings: 'No ratings yet.',
      selectRating: 'Please select a rating',
    },

    // ── 404 page ──────────────────────────────────────────────
    notFound: {
      title: 'Page Not Found',
      message: "The page you're looking for doesn't exist or has been moved.",
    },

    // ── City selector ─────────────────────────────────────────
    city: {
      select: 'Select a city',
    },
  },
};

export default en;

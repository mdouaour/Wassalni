const fr = {
  translation: {
    // ── App / common ──────────────────────────────────────────
    appName: 'WASALNI',
    appSlogan: 'Covoiturage Algérien',
    loading: 'Chargement',
    save: 'Enregistrer',
    cancel: 'Annuler',
    edit: 'Modifier',
    clear: 'Effacer',
    goHome: 'Accueil',
    anonymous: 'Anonyme',

    // ── Navigation ────────────────────────────────────────────
    nav: {
      findRides: 'Trouver un trajet',
      offerRide: 'Proposer un trajet',
      myBookings: 'Mes réservations',
      profile: 'Profil',
      signOut: 'Se déconnecter',
      login: 'Connexion',
      signUp: "S'inscrire",
    },

    // ── Footer ────────────────────────────────────────────────
    footer: {
      tagline: 'Voyagez ensemble, économisez ensemble.',
    },

    // ── Language switcher ─────────────────────────────────────
    language: {
      label: 'Langue',
      en: 'EN',
      fr: 'FR',
    },

    // ── Home page ─────────────────────────────────────────────
    home: {
      hero_title: 'Partagez des trajets en',
      hero_subtitle:
        "WASALNI met en relation les conducteurs avec des places libres et les passagers qui font le même chemin. Économisez de l'argent, réduisez le trafic et voyagez ensemble.",
      findRide: '🔍 Trouver un trajet',
      offerRide: '🚗 Proposer un trajet',
      signUpFree: "📝 S'inscrire gratuitement",
      howItWorks: 'Comment ça marche',
      search: 'Rechercher',
      searchDesc: 'Entrez votre destination et trouvez les trajets disponibles',
      book: 'Réserver',
      bookDesc: 'Réservez une place en un clic et coordonnez-vous avec le conducteur',
      travel: 'Voyager',
      travelDesc: 'Partagez le trajet, divisez les frais et profitez du voyage',
      wilayasCovered: 'Wilayas couvertes',
      available: 'Disponible',
      free: 'Gratuit',
      toUse: "À utiliser",
    },

    // ── Auth ──────────────────────────────────────────────────
    auth: {
      welcomeBack: 'Bon retour',
      signInSubtitle: 'Connectez-vous à votre compte WASALNI',
      email: 'E-mail',
      password: 'Mot de passe',
      signIn: 'Se connecter',
      noAccount: "Vous n'avez pas de compte ?",
      createAccount: 'Créer un compte',
      createAccountSubtitle: 'Rejoignez WASALNI et commencez à partager des trajets',
      fullName: 'Nom complet',
      confirmPassword: 'Confirmer le mot de passe',
      alreadyAccount: 'Vous avez déjà un compte ?',
      // validation
      nameRequired: 'Le nom est obligatoire',
      emailRequired: "L'e-mail est obligatoire",
      invalidEmail: "Format d'e-mail invalide",
      passwordRequired: 'Le mot de passe est obligatoire',
      passwordMinLength: 'Le mot de passe doit comporter au moins 6 caractères',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
    },

    // ── Ride list page ────────────────────────────────────────
    rideList: {
      title: 'Trouver un trajet',
      subtitle: 'Recherchez les trajets disponibles en Algérie',
      ridesFound_one: '{{count}} trajet trouvé',
      ridesFound_other: '{{count}} trajets trouvés',
      noRidesTitle: 'Aucun trajet trouvé',
      noRidesMessage:
        'Essayez de modifier vos filtres ou revenez plus tard pour de nouveaux trajets.',
    },

    // ── Ride search form ──────────────────────────────────────
    rideSearch: {
      from: 'Départ',
      to: 'Arrivée',
      date: 'Date',
      maxPrice: 'Prix max (DA)',
      anyCity: 'Toute ville',
      anyPrice: 'Tout prix',
      searchButton: '🔍 Rechercher',
    },

    // ── Ride card ─────────────────────────────────────────────
    rideCard: {
      seat_one: '{{count}} place restante',
      seat_other: '{{count}} places restantes',
    },

    // ── Ride detail page ──────────────────────────────────────
    rideDetail: {
      backToRides: '← Retour aux trajets',
      date: 'Date',
      time: 'Heure',
      pricePerSeat: 'Prix par place',
      availableSeats: 'Places disponibles',
      notes: 'Remarques',
      driver: 'Conducteur',
      reviews_one: '{{count}} avis',
      reviews_other: '{{count}} avis',
      bookButton: '📱 Réserver ce trajet',
      fullyBooked: 'Ce trajet est complet',
      bookedSuccess: 'Trajet réservé avec succès ! Consultez vos',
      bookings: 'réservations',
      thisIsYourRide: 'Ceci est votre trajet',
      driverReviews: 'Avis sur le conducteur',
      rateDriver: '⭐ Évaluer le conducteur',
      rideNotFound: 'Trajet introuvable',
    },

    // ── Create ride page ──────────────────────────────────────
    createRide: {
      title: 'Proposer un trajet',
      subtitle: "Partagez vos places libres avec d'autres voyageurs",
      departureCity: 'Ville de départ *',
      destinationCity: "Ville d'arrivée *",
      departureDateTime: 'Date et heure de départ *',
      pricePerSeat: 'Prix par place (DA) *',
      availableSeats: 'Places disponibles *',
      seatsPlaceholder: '1-8',
      notes: 'Remarques (optionnel)',
      notesPlaceholder: 'ex. Point de ramassage, espace bagages, politique fumeur...',
      publish: '🚗 Publier le trajet',
      // validation
      departureCityRequired: 'La ville de départ est obligatoire',
      destinationCityRequired: "La ville d'arrivée est obligatoire",
      differentCities: "La destination doit être différente du départ",
      departureTimeRequired: "L'heure de départ est obligatoire",
      departureTimeFuture: "L'heure de départ doit être dans le futur",
      validPrice: 'Un prix valide est requis',
      seatsRange: 'Le nombre de places doit être entre 1 et 8',
    },

    // ── Bookings page ─────────────────────────────────────────
    bookings: {
      title: 'Mes réservations',
      subtitle: 'Gérez vos réservations de trajet',
      noBookingsTitle: 'Aucune réservation',
      noBookingsMessage:
        "Vous n'avez réservé aucun trajet. Recherchez des trajets disponibles pour commencer.",
      findRides: 'Trouver un trajet',
    },

    // ── Booking card ──────────────────────────────────────────
    bookingCard: {
      at: 'à',
      driver: 'Conducteur',
      cancelBooking: 'Annuler la réservation',
      status: {
        pending: 'en attente',
        confirmed: 'confirmé',
        cancelled: 'annulé',
        completed: 'terminé',
      },
    },

    // ── Profile page ──────────────────────────────────────────
    profile: {
      tabs: {
        info: 'Infos',
        rides: 'Trajets',
        reviews: 'Avis',
      },
      name: 'Nom',
      email: 'E-mail',
      role: 'Rôle',
      noRidesYet: 'Aucun trajet publié pour le moment.',
      becomeDriverPrompt: 'Vous souhaitez proposer des trajets ? Devenez conducteur.',
      becomeDriver: '🚗 Devenir conducteur',
    },

    // ── Rating ────────────────────────────────────────────────
    rating: {
      rating: 'Note',
      comment: 'Commentaire (optionnel)',
      commentPlaceholder: 'Partagez votre expérience...',
      submit: "Soumettre l'avis",
      noRatings: 'Aucun avis pour le moment.',
      selectRating: 'Veuillez sélectionner une note',
    },

    // ── 404 page ──────────────────────────────────────────────
    notFound: {
      title: 'Page introuvable',
      message: "La page que vous recherchez n'existe pas ou a été déplacée.",
    },

    // ── City selector ─────────────────────────────────────────
    city: {
      select: 'Choisir une ville',
    },
  },
};

export default fr;

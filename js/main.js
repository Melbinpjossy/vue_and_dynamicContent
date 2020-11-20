// todo => use a key to track the current video, or just pass the video in as a ref to the function and grab its source

Vue.component('player', {
  props: ['movie'],

  template: `
  <div>
    <h3 class="movie-title">{{ movie.videotitle }}</h3>
    <video :src="'video/' + movie.vidsource" controls autoplay></video>
    <div class="movie-details">
      <p>{{ movie.videodescription }}</p>
    </div>
  </div>
  `
})


var vm = new Vue({
  el: "#app",

  data: {

    // mock up the user - this will eventually come from the database UMS (user management system)
    user: {
      isLoggedIn: true,
      settings: {}
    },

    // this data would also come from the database, but we'll just mock it up for now
    videodata: [
      { name: "Mini Cooper 3 Door", thumb: "miniCooper_s.jpg", vidsource: "mini_door3.mp4", description: "It’s the original icon, reborn and reimagined for modern motoring. The MINI 3 door builds on 60+ years of timeless MINI design, but comes equipped with a whole host of 21st century tech features and practical touches to cater to your every need. Distinct by design and urban by nature, it’s made to stand out as you explore new corners of your city. And with its ultra-nimble go-kart feel, you’re sure to find something exciting around every turn" },
      { name: "Mini Cooper 2012", thumb: "miniCooper_2012.png", vidsource: "mini_2012.mp4", description: "A subtle redesign grew the Mini Cooper slightly and bumped horsepower to 118. The Cooper S received a 1.6-liter turbocharged engine with 172 hp. Both models now offered six-speed manual or six-speed automatic transmissions. Convertibles were not built on the redesigned platform until 2009, when a new John Cooper Works edition was added. A 2011 refresh brought new bumpers, taillights, foglight placement and a small horsepower increase. The coupe rolled out in 2012." },
      { name: "Mini Cooper 2006", thumb: "miniCooper_2006.png", vidsource: "mini_2006.mp4", description: "The base Mini Cooper launched with a 115-hp, 1.6-liter four-cylinder engine available with a five-speed manual or continuously variable automatic transmission. The Cooper S had a supercharged 1.6-liter with 163 hp and a six-speed manual transmission only. A convertible debuted in 2005." }
    ],

    movie: {
    videotitle: "video title goes here",
    vidsource: "",
    videodescription: "video description here"
    },

    showDetails: false
  },

  created: function() {
    // run a fetch call and get the user data
    console.log('created lifecycle hook fired here, go get user data')
    this.getUserData();
  },

  methods: {
    getUserData() {
      // do a fetch call here and get the user fro db
      const url = './includes/index.php?getUser=1';

      fetch(url) // get data from the DB
      .then(res => res.json()) // translate JSON from DB to plain object
      .then(data => { // use the plain data object (the user)
        console.log(data); // log it to the concole (testing)

        // put our DB data into Vue
        this.user.settings = data[0];
      })
      .catch((error) => console.error(error))
    },

    setUserPrefs() {
      // this is the preferences control, hit the api when ready ( or use a component)
      console.log('set user prefs here');
    },

    userLogin() {
      // call the login route, or load the login component
      console.log('do login/ logout on click');

      // this is a ternary statement -> shorthand for if/else
      // the expression evaluates to true or false - if it's true, set the value equal to
      // the left of the colon. if it;s false set the value equal to the right.
      this.user.isLoggedIn = (this.user.isLoggedIn) ? false : true;
    },

    showMovieDetails({name, vidsource, description}) {
      // console.log('show these details: ', movie);

      this.movie.videotitle = name;
      this.movie.vidsource = vidsource;
      this.movie.videodescription = description;

      // make the movie details show up
      this.showDetails = true;
    }
  }
});

// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const Club = require('./models/club');
const User = require('./models/user');

// Connect to the database
connect();

// Model a collection of SLU clubs and theme houses
const clubs = [
  new Club({_id: 'The Hub',
            category: 'Theme House',
            introduction: 'The Hub shares with the community all forms of electronic entertainment, from gaming-oriented events to showings of cult movies and television. The Hub\'s events celebrate "nerd" culture.',
            meetingTime: 'Sunday 7pm',
            meetingLocation: 'House Common Room, 1st Lincoln St.',
            comingEvent: 'Watch the movie “Mulan” together',
            officerList: ['Rita', 'Lilly', 'Jacky', 'Meaghan'],
            memberList: ['Rita', 'Kevin', 'Taeyun'],
            pastEvent: 'Haunted House','Gaming Night'}),
  new Club({_id: 'American Chemical Society',
            category: 'SLU Club',
            introduction: 'To facilitate interest in chemistry through general meetings, educational outreach, and departmental events. To support and recognize students within the chemistry department through actions such as, but not limited to, hosting major/minor declaration events, hosting Chymist honorary society inductions, and financially assisting chemistry students in their attempts to share their research. To cultivate relationships with other departments, especially within the sciences, by collaboration with other student organizations within those departments to host events at the university or in the greater St. Lawrence Community.',
            meetingTime: '6pm',
            meetingLocation: 'Johnson 309',
            comingEvent: 'There Are No Upcoming Events',
            officerList: ['Victoria', 'Dhimiter Cobani', 'Samuel Tartakoff'],
            memberList: ['Victoria', 'Kevin', 'Cole'],
            pastEvent: 'Review sessions for General Chemistry'}),
  new Club({_id: 'Graceful Movements',
            category: 'SLU Club',
            introduction: 'We are a family that dances different styles of dance (mostly hip-hop/jazz) and aim to provide diversity in the arts. All are welcomed, we do hold dance auditions. Therefore, our purpose is to give students a chance to explore the elegance and gracefulness of art expressed through various styles of dance from different cultures and bond over the love of dance and performance.',
            meetingTime: 'Tuesdays 4-5:30pm and Sundays 1-3pm',
            meetingLocation: 'Griffiths 40',
            comingEvent: 'Spring Dance Concert',
            officerList: ['Meiting Li'],
            memberList: ['Rita', 'Kevin', 'Colby', 'Cole'],
            pastEvent: 'Fall Dance Concert'}),
  new Club({_id: 'L.I.G.H.T. House',
            category: 'Theme House',
            introduction: 'The L.I.G.H.T. house stands to light a path promoting a healthy lifestyle for individuals and the community in both local and global arenas centered around the ideas of balance and awareness of self. We will provide information and activities that promote self-awareness for St. Lawrence students and the Canton community. In doing so this will hopefully raise awareness of our lifestyle choices and their impact on the environment and health of our peers. The L.I.G.H.T. House is located across from 13 University and a few houses down from 25 College.',
            meetingTime: 'TBD',
            meetingLocation: '17 College St. Canton, NY',
            comingEvent: 'Morning yoga on Monday',
            officerList: ['Taeyun'],
            memberList: ['Coco', 'Taeyun', 'Jack', 'Victoria'],
            pastEvent: 'Making candles'})
];


// Model a collection of users
const users = [
  new User({_id: 'Victoria'}),
  new User({_id: 'Rita'}),
  new User({_id: 'Taeyun'})
];



// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(clubs.map(club => club.save())))
  .then(() => Promise.all(users.map(user => user.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));

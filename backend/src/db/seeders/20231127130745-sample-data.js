const db = require('../models');
const Users = db.users;

const Activities = db.activities;

const Contacts = db.contacts;

const Leads = db.leads;

const Metrics = db.metrics;

const Notes = db.notes;

const ActivitiesData = [
  {
    scheduled_at: new Date('2023-08-10'),

    description:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    scheduled_at: new Date('2023-04-24'),

    description: 'That is why you fail.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    scheduled_at: new Date('2023-10-29'),

    description:
      'Like fire across the galaxy the Clone Wars spread. In league with the wicked Count Dooku, more and more planets slip. Against this threat, upon the Jedi Knights falls the duty to lead the newly formed army of the Republic. And as the heat of war grows, so, to, grows the prowess of one most gifted student of the Force.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    scheduled_at: new Date('2023-08-21'),

    description:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ContactsData = [
  {
    first_name: "Goin' hog huntin'",

    last_name: "Y'all never listen to me",

    email: 'pablo.satterfield@boehm.io',

    phone: '(922) 637-0756 x794',

    // type code here for "relation_many" field
  },

  {
    first_name: 'I want my 5$ back',

    last_name: 'Standby',

    email: 'quinn.raynor@hackett.co',

    phone: '(873) 503-5282 x5749',

    // type code here for "relation_many" field
  },

  {
    first_name: "That Barbala couldn't fly his way out of a wet paper bag",

    last_name: 'Texas!',

    email: 'vella@feeney.com',

    phone: '741-989-7467 x93464',

    // type code here for "relation_many" field
  },

  {
    first_name: 'I tell you what',

    last_name: "It's around here somewhere",

    email: 'ronald_okeefe@miller-torphy.io',

    phone: '(305) 311-6992',

    // type code here for "relation_many" field
  },
];

const LeadsData = [
  {
    name: 'Euclid',

    status: 'qualified',

    category: 'non-profit',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Max von Laue',

    status: 'qualified',

    category: 'government',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'John von Neumann',

    status: 'new',

    category: 'non-profit',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },

  {
    name: 'Linus Pauling',

    status: 'lost',

    category: 'individual',

    // type code here for "relation_many" field

    // type code here for "relation_one" field
  },
];

const MetricsData = [
  {
    name: 'Gertrude Belle Elion',

    value: 88.55,

    recorded_at: new Date('2023-09-18'),
  },

  {
    name: 'Murray Gell-Mann',

    value: 34.27,

    recorded_at: new Date('2023-01-22'),
  },

  {
    name: 'Ludwig Boltzmann',

    value: 93.76,

    recorded_at: new Date('2023-12-24'),
  },

  {
    name: 'Paul Dirac',

    value: 23.93,

    recorded_at: new Date('2023-11-15'),
  },
];

const NotesData = [
  {
    date: new Date('2023-08-20'),

    content: 'Difficult to see. Always in motion is the future...',
  },

  {
    date: new Date('2023-08-21'),

    content:
      'Death is a natural part of life. Rejoice for those around you who transform into the Force. Mourn them do not. Miss them do not. Attachment leads to jealously. The shadow of greed, that is.',
  },

  {
    date: new Date('2023-07-05'),

    content: 'Adventure. Excitement. A Jedi craves not these things.',
  },

  {
    date: new Date('2023-05-15'),

    content:
      'Through the Force, things you will see. Other places. The future - the past. Old friends long gone.',
  },
];

async function associateActivityWithLead() {
  const relatedLead0 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setLead) {
    await Activity0.setLead(relatedLead0);
  }

  const relatedLead1 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setLead) {
    await Activity1.setLead(relatedLead1);
  }

  const relatedLead2 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setLead) {
    await Activity2.setLead(relatedLead2);
  }

  const relatedLead3 = await Leads.findOne({
    offset: Math.floor(Math.random() * (await Leads.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setLead) {
    await Activity3.setLead(relatedLead3);
  }
}

async function associateActivityWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity0 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Activity0?.setUser) {
    await Activity0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity1 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Activity1?.setUser) {
    await Activity1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity2 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Activity2?.setUser) {
    await Activity2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Activity3 = await Activities.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Activity3?.setUser) {
    await Activity3.setUser(relatedUser3);
  }
}

// Similar logic for "relation_many"

// Similar logic for "relation_many"

async function associateLeadWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead0 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Lead0?.setUser) {
    await Lead0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead1 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Lead1?.setUser) {
    await Lead1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead2 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Lead2?.setUser) {
    await Lead2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Lead3 = await Leads.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Lead3?.setUser) {
    await Lead3.setUser(relatedUser3);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Activities.bulkCreate(ActivitiesData);

    await Contacts.bulkCreate(ContactsData);

    await Leads.bulkCreate(LeadsData);

    await Metrics.bulkCreate(MetricsData);

    await Notes.bulkCreate(NotesData);

    await associateActivityWithLead();

    await associateActivityWithUser();

    // Similar logic for "relation_many"

    // Similar logic for "relation_many"

    await associateLeadWithUser();
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('activities', null, {});

    await queryInterface.bulkDelete('contacts', null, {});

    await queryInterface.bulkDelete('leads', null, {});

    await queryInterface.bulkDelete('metrics', null, {});

    await queryInterface.bulkDelete('notes', null, {});
  },
};

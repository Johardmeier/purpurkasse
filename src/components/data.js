let items= [
  { id: 1, name: 'von der Lenzerheide', forename: 'Rahel Maria',
    reservations: {
      adults: 5,
      children: 3,
      date: '2018-6-12T04:55:44',
      means: 'tel',
      contact: '076 364 58 50',
      remarks:''
    },
    collected: {
      adults: [
        {
          count:0,
          price:0,
          tarif:''
        }
      ],
      children: [
        {
          count:0,
          price:0,
          tarif:''
        }
      ],
      remarks:''
    },
    open: {
      adults: {
        count:0,
        details: [
          {
          }
        ]
      },
      children: {
        count:0
      },
      remarks: ''
    }
  },
  { id: 2, name: 'Meier', forename: 'Rahel Mara', reservations: {adults: 1, children: 1, date: '2018-5-12T04:55:44', means: 'web', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 3, name: 'Müller', forename: 'Franziska', reservations: {adults: 2, children: 2, date: '2018-7-12T04:55:44', means: 'mail', contact: 'jo.hardmeier@stage-solutions.com',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 4, name: 'Maler', forename: 'Markus', reservations: {adults: 3, children: 1, date: '2018-7-7T04:55:44', means: 'pers', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 5, name: 'Bichsel', forename: 'Peter', reservations: {adults: 1, children: 4, date: '2018-7-11T04:55:44', means: 'other', contact: '',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 6, name: 'von der Lenzerheide', forename: 'Rahel Maria', reservations: {adults: 5, children: 3, date: '2018-6-12T04:55:44', means: 'tel', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 7, name: 'Meier', forename: 'Rahel Maria', reservations: {adults: 1, children: 1, date: '2018-5-12T04:55:44', means: 'web', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 8, name: 'Müller', forename: 'Franziska', reservations: {adults: 2, children: 2, date: '2018-7-12T04:55:44', means: 'mail', contact: 'jo.hardmeier@stage-solutions.com',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 9, name: 'Maler', forename: 'Markus', reservations: {adults: 3, children: 1, date: '2018-7-7T04:55:44', means: 'pers', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 10, name: 'Bichsel', forename: 'Peter', reservations: {adults: 1, children: 4, date: '2018-7-11T04:55:44', means: 'other', contact: '',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 11, name: 'von der Lenzerheide', forename: 'Rahel Maria', reservations: {adults: 5, children: 3, date: '2018-6-12T04:55:44', means: 'tel', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 12, name: 'Meier', forename: 'Rahel Maria', reservations: {adults: 1, children: 1, date: '2018-5-12T04:55:44', means: 'web', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 13, name: 'Müller', forename: 'Franziska', reservations: {adults: 2, children: 2, date: '2018-7-12T04:55:44', means: 'mail', contact: 'jo.hardmeier@stage-solutions.com',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 14, name: 'Maler', forename: 'Markus', reservations: {adults: 3, children: 1, date: '2018-7-7T04:55:44', means: 'pers', contact: '076 364 58 50',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
  { id: 15, name: 'Bichsel', forename: 'Peter', reservations: {adults: 1, children: 4, date: '2018-7-11T04:55:44', means: 'other', contact: '',remarks:''}, collected:{adults:[{count:0,price:0,tarif:''}],children:[{count:0,price:0,tarif:''}],remarks:''},open:{adults:{count:0,details:[{}]},children:{count:0},remarks:''}},
]

export default items
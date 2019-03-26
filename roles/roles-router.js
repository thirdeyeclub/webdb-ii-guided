const router = require('express').Router();
const knex = require('knex');

const knexConfig ={
  client: 'sqlite3',
  useNullAsDefault: true,
  connection:{
    filename: './data/roles.db3'
  },
 // debug:true,
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
  db('roles')
  .then(roles =>{res.status(200).json(roles)})
  .catch(error =>{res.status(500).json(error)})
  // get the roles from the database
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  const roleId = req.params;
  db('roles')
  .where({id: roleId})
  .first()
  .then(role=>{res.status(200).json(role);})
  .catch(error=>{res.status(500).json(error);})

});

router.post('/', (req, res) => {
  // add a role to the database
  db('roles').insert(req.body)
  .then(ids=>{
      const id = ids[0]
      db('roles')
      .where({id: roleId})
      .first()
      .then(role=>{res.status(200).json(role);})
  }).catch(error=>{res.status(500).json(error);})
});

router.put('/:id', (req, res) => {
  // update roles
  db('roles').where({id: req.params.id})
  .update(req.body)
  .then(count =>{if(count > 0){
    res.status(200).json(count);
  }else{
    res.status(404).json({'Record not fount'});
  }})
});

router.delete('/:id', (req, res) => {
db('roles').where({id: req.params.id}).del().then(count =>{if(count > 0){
  res.status(200).json(count);
}else{
  res.status(404).json({'Record not fount'});
}})
});

module.exports = router;

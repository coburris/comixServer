const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
let Comic = require('../db.js').import('../models/comic');
const validateSession = require('../middleware/validate-session');



/* Test Endpoint */
router.get('/hello', function(req, res) {
  res.send(
    '<h1>Reached the comicController welcome route.</h1>'
     + '<p> I can put html here  and it renders fine. Interesting.</p>'
  )
});


/**********************
 *** CREATE COMIC ***
 **********************/
router.post('/', validateSession, function(req,res) {
  console.log("******** GOT HERE IN COMIC POST ENDPOINT *********");
  console.log("Here is the data from the request")
  console.log(req.body);
  const comicEntry = {
    issue_id: req.body.issue_id,
    issue_name: req.body.issue_name,
    issue_number: req.body.issue_number,
    cover_date: req.body.cover_date,
    volume_name: req.body.volume_name,
    volume_id: req.body.volume_id,
    story_arcs: req.body.story_arcs,
    publisher: req.body.publisher,
    teams: req.body.teams,
    description: req.body.description,
    characters: req.body.characters,
    original_image_url: req.body.original_image_url,
    thumb_image_url: req.body.thumb_image_url,
    small_image_url: req.body.small_image_url,
    api_detail_url: req.body.api_detail_url,
    owner: req.user.id,
    status: req.body.status
  }
  console.log("Here is the data goingto the middleware")
  console.log(comicEntry)

  Comic.create(comicEntry)
  .then(function comicCreateSuccess(comic_data){
    return res.status(200).json(comic_data);
  })
  .catch(function comicCreateFail(err){
    return res.status(500).json({error: err, message: 'Comic creation failed'});
  });

});

/*****************************
 *** GET COMICS BY USER ID ***
 ****************************/
router.get('/', validateSession, function(req, res){
  Comic.findAll({
    where:{
      owner: req.user.id
    }
  })
  .then(logs => res.status(200).json(logs))
  .catch(err => res.status(500).json({error: err}))
});

/**********************
 *** DELETE COMIC *****
 **********************/

router.delete("/delete/:id", validateSession, function(req, res) {
  const query = {where: {id: req.params.id, owner: req.user.id}}

  Comic.destroy(query)
  .then(() => res.status(200).json({message: "Death Ray Deployment Success! Comic DELETED!"}))
  .catch((err) => res.status(500).json({error: err}));
});

 /**********************
 *** UPDATE COMIC ***
 **********************/

router.put('/:id', validateSession, (req,res) => {
  console.log(req.body.status)
  const updateEntry = {
    status: req.body.status,
    issue_name: req.body.issue_name,
    volume_name: req.body.volume_name,
    issue_number: req.body.issue_number,
    publisher: req.body.publisher,
    cover_date: req.body.cover_date,
    characters: req.body.characters,
    teams: req.body.teams,
    story_arcs: req.body.story_arcs,
    description: req.body.description
  };
  const query = {
    where: {
      id: req.params.id,
      owner: req.user.id
    }};

    Comic.update(updateEntry, query)
    .then((comic) => res.status(200).json(comic))
    .catch((err) => res.status(500).json({ error: err}));
})

module.exports = router
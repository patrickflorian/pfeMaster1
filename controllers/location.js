const models = require('../models');

exports.home = function(req, res, next) {
    res.render('home', { title: 'Express', user: req.user });
  }

  exports.submit_location = function(req, res, next) {
    console.log(req.body)
    return models.Location.create({
      classroom: req.body.classroom,
      description: req.body.description,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    }).then(location => {
      res.json(location);
      /* res.render('location/locations', {title: 'Express', locations: locations}); */
    })
  }

  exports.show_locations = function(req, res, next) {
    models.Location.findAll().then(locations => {
      res.json(locations);
      /* res.render('location/locations', {title: 'Express', locations: locations}); */
    })
  }

  exports.show_location = function(req, res, next) {
    return models.Location.findOne({
      where : {
        id :req.params.location_id
      }
    }).then(location => {
      res.json(location);
      // res.render('location/location', {location: location});
    })
  }

  exports.show_edit_location = function(req, res, next) {
    return models.Location.findOne({
      where : {
        id :req.params.location_id
      }
    }).then(location => {
      res.json(location);
      // res.render('location/edit_location', {location: location});
    })
  }

  exports.edit_location = function(req, res, next) {
    req.params.location_id
    req.body.classroom
    req.body.description
    req.body.longitude
    req.body.latitude

    return models.Location.update({
      classroom: req.body.classroom,
      description: req.body.description,
      longitude: req.body.longitude,
      latitude: req.body.latitude
    }, {
      where: {
        id: req.params.location_id
      }
    }).then(result => {
      if(result==1){
        models.Location.findOne({where:{id:req.params.location_id}}).then((user)=>{
          console.log(user)
          res.json( user);
       });
       
      }else res.status(304);  
    });
  }

  exports.delete_location = function(req, res, next) {
    return models.Location.destroy({
      where: {
        id: req.params.location_id
      }
    }).then(result => {
      res.redirect('/api/locations');
    })
  }

  exports.delete_location_json = function(req, res, next) {
    return models.Location.destroy({
      where: {
        id: req.params.location_id
      }
    }).then(result => {
      res.send({msg:"Success"});
    })
  }
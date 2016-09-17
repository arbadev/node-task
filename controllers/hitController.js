var hitModel = require('../models/hitModel.js');
var mongoose = require('mongoose');
var assert = require('assert')
mongoose.Promise = require('bluebird');

/**
* hitController.js
*
* @description :: Server-side logic for managing hits.
*/
module.exports = {

  /**
  * hitController.list()
  */
  list: function (req, res) {
    console.log('hitController.list');
    const query = hitModel.find();
    assert.equal(query.exec().constructor, require('bluebird'));
    const promise = query.exec();

    promise.then(hits => {
      return res.status(201).json(hits);
    })
    .catch(error => {
      console.log.error('error ', error)
    });

    return promise;
  },

  /**
  * hitController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    hitModel.findOne({_id: id}, function (err, hit) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting hit.',
          error: err
        });
      }
      if (!hit) {
        return res.status(404).json({
          message: 'No such hit'
        });
      }
      return res.json(hit);
    });
  },

  /**
  * hitController.create()
  */
  create: function (req, res) {
    console.log('hitController.create');
    var hit = new hitModel({
    });

    console.log('before hit');

    hit.save();
    return res.status(201).json(hit);
    console.log('after hit');

  },

  /**
  * hitController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    hitModel.findOne({_id: id}, function (err, hit) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting hit',
          error: err
        });
      }
      if (!hit) {
        return res.status(404).json({
          message: 'No such hit'
        });
      }

      hit.created_at = req.body.created_at ? req.body.created_at : hit.created_at;
      hit.save(function (err, hit) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating hit.',
            error: err
          });
        }

        return res.json(hit);
      });
    });
  },

  /**
  * hitController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    hitModel.findByIdAndRemove(id, function (err, hit) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the hit.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
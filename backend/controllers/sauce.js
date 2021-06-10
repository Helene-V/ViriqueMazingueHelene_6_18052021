const Sauce = require('../models/Sauce');
const fs = require('fs'); // Package file system ; modifier et supprimer les fichiers (image)

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
      likes:0, 
      dislikes:0,
      usersLiked:[],
      usersDisliked:[]
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; //[1] = retourne le nom du fichier
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
};

exports.likeOrDislike = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
      .then (sauce => {
        switch (req.body.like) {
          case 1: 
            if (!sauce.usersLiked.includes(req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, 
                              { $inc: { likes: +1 }, 
                                $push: { usersLiked:req.body.userId },
                                        _id: req.params.id })                            
              .then(()=> res.status(201).json({ message : 'like ajouté avec succès' }))
              .catch(error => res.status(404).json({ error })
              )
            }
            break;
          case -1: 
          if (!sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id },
                            { $inc: { dislikes: +1 }, 
                              $push: { usersDisliked:req.body.userId },
                                      _id: req.params.id })                            
            .then(()=> res.status(201).json({ message : 'like supprimé avec succès' }))
            .catch(error => res.status(404).json({ error })
            )
          }
            break;
          case 0: 
            if (sauce.usersLiked.includes(req.body.userId)) { //ici
              Sauce.updateOne({ _id: req.params.id }, 
                { $inc: { likes: -1 },
                  $pull: { usersLiked:req.body.userId },
                          _id: req.params.id })                          
              .then(()=> res.status(201).json({ message : 'modification effectuée' }))
              .catch(error => res.status(404).json({ error })
              )
            } else if(sauce.usersDisliked.includes(req.body.userId)) {
              Sauce.updateOne({ _id: req.params.id }, 
                { $inc: { dislikes: -1 },
                  $pull: { usersDisliked:req.body.userId },
                          _id: req.params.id })                           
              .then(()=> res.status(201).json({ message : 'modification effectuée' }))
              .catch(error => res.status(404).json({ error })
              )
            }
              break;
            default:
              console.log('switch default');
              throw new Error({ message: 'Problème'});
        }
      })
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema ({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },  //default: 0
    dislikes: { type: Number, required: false }, //default: 0
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('Sauce', sauceSchema);

/* **** HTML ****
      <div class="likes">
        <i [ngClass]="{ 'fas liked': liked, 'far': !liked, 'disabled': disliked }" class="like fa-thumbs-up fa-lg" (click)="onLike()"></i>
        <span>{{ sauce.likes }}</span>
      </div>
      <div class="dislikes">
        <i [ngClass]="{ 'fas disliked': disliked, 'far': !disliked, 'disabled': liked }" class="dislike fa-thumbs-down fa-lg" (click)="onDislike()"></i>
        <span>{{ sauce.dislikes }}</span>
      </div>
*/

/* **** NOTE **** 
Définit le statut "j'aime" pour userID fourni.
Si j'aime = 1, l'utilisateur aime la sauce.
Si j'aime = 0, l'utilisateur annule ce qu'il aime ou ce qu'il n'aime pas.
Si j'aime = -1, l'utilisateur n'aime pas la sauce.
L'identifiant de l'utilisateur doit être ajouté ou supprimé du tableau approprié, en gardant une trace de ses préférences et en
l'empêchant d'aimer ou de ne pas aimer lamême sauce plusieurs fois.
Nombre total de "j'aime" et de "je n'aime pas" à mettre à jour avec chaque "j'aime".*/

/* **** SWITCH CASE **** 
https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/switch
https://www.w3schools.com/js/js_switch.asp

const likeOrDislike
const like =
const dislike =
Il faut pusher []

switch(likeOrDislike) {
  case -1: 
    console.log("je like");
    break;
  case 1: 
    console.log("je dislike");
    break;
  case 0:
    console.log("annule le like ou dislike")
    break;
}
*/

module.exports = mongoose.model('Sauce', sauceSchema);

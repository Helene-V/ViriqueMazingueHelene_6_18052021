const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema ({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, required: false },
    dislikes: { type: Number, required: false },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
});

module.exports = mongoose.model('Sauce', sauceSchema);

/*    <div class="like-buttons" *ngIf="!likePending">
      <div class="likes">
        <i [ngClass]="{ 'fas liked': liked, 'far': !liked, 'disabled': disliked }" class="like fa-thumbs-up fa-lg" (click)="onLike()"></i>
        <span>{{ sauce.likes }}</span>
      </div>
      <div class="dislikes">
        <i [ngClass]="{ 'fas disliked': disliked, 'far': !disliked, 'disabled': liked }" class="dislike fa-thumbs-down fa-lg" (click)="onDislike()"></i>
        <span>{{ sauce.dislikes }}</span>
      </div>
    </div>
    <div class="like-pending" *ngIf="likePending">
      <mat-spinner class="white-spinner"></mat-spinner>
    </div>
    <div class="control-buttons">
      <button mat-raised-button (click)="onBack()">BACK</button>
      <button mat-raised-button color="primary" (click)="onModify()" *ngIf="userId === sauce.userId">MODIFY</button>
      <button mat-raised-button color="warn" (click)="onDelete()" *ngIf="userId === sauce.userId">DELETE</button>
    </div>
  </div>
</div>*/

module.exports = mongoose.model('Sauce', sauceSchema);

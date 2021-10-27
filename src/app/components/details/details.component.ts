import { HttpService } from './../../services/http.service';
import { Game } from './../../models';
import { GaugeModule } from 'angular-gauge';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit,OnDestroy {

  constructor(
    private activatedRoute:ActivatedRoute,
    private httpService:HttpService
  ) { }

  gameRating:number = 0;
  gameId:string;
  game:Game;
  routeSub:Subscription;
  gameSub:Subscription;


  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params:Params)=>{
      this.gameId = params['id'];
      this.getGameDetails(this.gameId);
    })
  }


  getColor(value:number):string{
    if(value>75){
      return '#5ee432';
    }
    else if(value>50){
      return '#fffa50';
    }
    else if(value>30){
      return '#f7aa38';
    }
    else{
      return '#ef4665'
    }
  }

  getGameDetails(id:string){
    this.gameSub = this.httpService
    .getGameDetails(id)
    .subscribe((gameResp:Game)=>{
      this.game = gameResp;

      setTimeout(()=>{
        this.gameRating = this.game.metacritic;
      },1000);
    })
  }


  ngOnDestroy(){
    if(this.gameSub){
      this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }

}

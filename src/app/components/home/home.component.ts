import { HttpService } from './../../services/http.service';
import { Game, APIResponse } from './../../models';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy {

  public sort:string;
  public games:Array<Game>;
  public gameSub:Subscription;
  public routeSub:Subscription;

  constructor(
    private httpService:HttpService,
    private activatedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.routeSub=this.activatedRoute.params.subscribe((params:Params)=>{
      if(params['game-search']){
        this.searchGames('metacrit',params['game-search']);
      }
      else{
        this.searchGames('metacrit');
      }
    })
  }


  searchGames(sort:string,search?:string){
    this.gameSub=this.httpService.getGameList(sort,search)
    .subscribe((gameList:APIResponse<Game>)=>{
      this.games = gameList.results;
      console.log(gameList);
    })
  }

  openGameDetails(id:string){
    this.router.navigate(['details',id]);
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

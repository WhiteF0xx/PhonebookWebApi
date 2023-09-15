// import { Component,OnInit,Inject  } from '@angular/core';
// import { Action, ContactDialogReturn, Contacts } from '../Library/MainLibrary'
// import {MAT_DIALOG_DATA,MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material/dialog'
// import { ContactService } from '../Services/contacts.service';
// import { Subject } from 'rxjs';
// import { GroupService } from '../Services/group.service';
// import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
// import { EditCreateSongComponent } from '../edit-create-song/edit-create-song.component';
// import { ToastrService } from 'ngx-toastr';
// @Component({
//   selector: 'app-song-list-dialog',
//   templateUrl: './song-list-dialog.component.html',
//   styleUrls: ['./song-list-dialog.component.css']
// })
// export class SongListDialogComponent implements OnInit {
//   public contact: Contacts = null;
//   public title : string = '';
//   public dialogCfg :MatDialogConfig;
//   //declarations for datatables plugin
//   public dataTableOptions : DataTables.Settings={};
//   public dtTrigger : Subject<any> = new Subject<any>();

//   constructor(private contactSrv: ContactService,private songSrv : SongService,@Inject(MAT_DIALOG_DATA) public data:any,dialogRef :MatDialogRef<SongListDialogComponent>,public dialog:MatDialog,private toast:ToastrService) {
//   }
//   public buildDialogCfg()
//   {
//     this.dialogCfg = new MatDialogConfig();
//     this.dialogCfg.disableClose = true;
//     this.dialogCfg.autoFocus = true;
//     this.dialogCfg.hasBackdrop = true;
//     this.dialogCfg.enterAnimationDuration='1000ms';
//     this.dialogCfg.exitAnimationDuration = '1000ms';
//     this.dialogCfg.width = '40%';
//   }
//   ngOnInit(): void {
//     this.dataTableOptions={
//       pagingType : 'full_numbers',
//       pageLength : 10,
//       lengthMenu : [10,15,25,50],
//       columnDefs: [
//         { orderable: false, targets: 0 },
//         { orderable: false, targets: 3 },
//       ]
//     };
//     this.contact = new Contacts();
//     this.contact.id = this.data.id;
//     let dlg=this.groupSrv.getApiGroupsByID(this.group.id).subscribe((data)=>{
//       this.group = data;
//       if (this.group.songs.length >0)
//         setTimeout(()=>{this.dtTrigger.next(this.group.songs);});
//       else
//         this.group.songs = null;
//     },(error)=>{},
//        ()=>{dlg.unsubscribe();});
//   }

//   public onDeleteAdress(_song:Song)
//   {
//     this.buildDialogCfg();
//     this.dialogCfg.data = {Title : "Delete Adress with :", id : _song.id , songName : _song.songName ,action : "song" };
//     const dialogRef = this.dialog.open(DeleteDialogComponent,this.dialogCfg);
//    let dlg = dialogRef.afterClosed().subscribe((dialogResponse)=>{
//       if (dialogResponse === 'yes')
//       {
//          let dlg1= this.songSrv.deleteSong(_song.id).subscribe((returnData)=>{
//           if (returnData != null)
//           {
//             this.group.songs.splice(0);
//             this.group.songs = returnData;
//           }
//           else
//             this.group.songs = null;
//             this.toast.warning("You have successfully Deleted a record",'Delete Waring',{timeOut: 5000,positionClass : 'toast-bottom-right',});
//           },(error)=>{},
//             ()=>{dlg1.unsubscribe();});
//       }
//     },(error)=>{},
//       ()=>{dlg.unsubscribe()});
//     ;
// }
//   public onEditSong(_group:Group,_mode:string,_songID:number=0)
//   {
//     this.buildDialogCfg();
//     this.dialogCfg.data = { id: _songID , groupName : _group.groupName , groupID : _group.id};
//     const dialogRef = this.dialog.open(EditCreateSongComponent,this.dialogCfg);
//     let dlg = dialogRef.afterClosed().subscribe((returnData)=>{
//       var tmp : SongDialogReturn = returnData;
//       if (tmp.action === Action.UPDATE)
//       { 
//         let song =  new Song();
//         song.groupId = tmp.groupId;
//         song.id = tmp.id;
//         song.songName = tmp.songName;
//         song.songURL = tmp.songURL;
//        let dlg2= this.songSrv.updateSong(song).subscribe((returnData)=>{
//             this.group.songs.splice(0);
//             this.group.songs = returnData;
//             this.toast.success("You have successfully Updated a record",'Update Info',{timeOut: 5000,positionClass : 'toast-bottom-right',});
//         },
//         (error) => {},
//         ()=>{
//             dlg2.unsubscribe();
//         });
//       }
//     },(error)=>{},
//       ()=>{dlg.unsubscribe();});
//   }
// }

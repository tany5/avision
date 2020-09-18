import { Component, OnInit } from '@angular/core';
import { AskdoubtsService } from './askdoubts.service';
import { FormBuilder,FormGroup,Validators, NgForm  } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { EncrDecrServiceService } from 'src/app/encr-decr-service.service';
declare var jQuery: any;

@Component({
  selector: 'app-askdoubts',
  templateUrl: './askdoubts.component.html',
  styleUrls: ['./askdoubts.component.scss']
})
export class AskdoubtsComponent implements OnInit {
  subeject:any
  sub_id: any;
  chapter: Object;
  doubtAlldata: any;
  doubt_submit_form: FormGroup;
  comment_form: FormGroup;
  user_id: any
  commentDoubtdata: any;
  commentDoubtname: any;
  commentDoubtname_short: any;
  commentDoubtdate: any;
  commentDoubttitle: any;
  commentDoubtdesc: any;
  commentDoubtcount: any;
  showComment: boolean=false;
  comments_arr: any;
  user_name: any;
  user_name_firstChar: any;
  doubt_id:any
  prodId: any;
  urlEncryptId: any;
  
  constructor(private askdoubtservice: AskdoubtsService,private formbuilder: FormBuilder,private route: ActivatedRoute,private EncrDecr: EncrDecrServiceService) {
    this.route.parent.params.subscribe(
      (params: Params) => {
        this.prodId = params['prodId']         
        this.urlEncryptId = this.prodId
        var decrypted = this.EncrDecr.get('123456$#@$^@1ERF', this.prodId)
        this.prodId = decrypted       
      })
    this.doubt_submit_form = this.formbuilder.group({
      doubtType: ['',Validators.required],
      subject: ['',Validators.required],
      chapter: ['',Validators.required],
      doubtTitile: ['',Validators.required],
      doubtDesc: ['',Validators.required],
      userId: ['']
    })
    this.comment_form = this.formbuilder.group({
      commentDesc: ['',Validators.required],
      doubt_id: ['']
    })
    this.user_id = localStorage.getItem('currentUserId');
      this.askdoubtservice.getAllSubject().subscribe(

        (res) => {
          this.subeject = res;
          console.log(this.subeject)
        }
      )
      this.askdoubtservice.getAllDoubt(this.prodId).subscribe(
        (data) => {
          this.doubtAlldata = data['dbt_arr'];
          console.log(this.doubtAlldata);
        }
      )

      this.askdoubtservice.getUserName(this.user_id).subscribe(
        (data) => {
          if(data['status'] == 200){

			  		this.user_name = data['user_arr'][0].user_name;
			  		this.user_name_firstChar = data['user_arr'][0].firstChar;
			  		console.log(this.user_name);
			  	}
			  	
        }
      )
   }

  ngOnInit(): void {
  }

  getSubjectId(id){
    this.sub_id = id;
    this.askdoubtservice.getAllChapter(this.sub_id).subscribe(
      (res) => {
        this.chapter = res
        console.log(this.chapter)
        if(id == '0'){
          this.askdoubtservice.getAllDoubt(this.prodId).subscribe(
            (data) => {
              this.doubtAlldata = data['dbt_arr'];
              console.log(this.doubtAlldata);
            }
          )
        }
      }
    )
  }

  getChapterId(id){
    if(id == '0'){
      this.askdoubtservice.getAllDoubt(this.prodId).subscribe(
        (data) => {
          this.doubtAlldata = data['dbt_arr'];
          console.log(this.doubtAlldata);
        }
      )
    }else{
      this.askdoubtservice.getfilteredDoubt(this.sub_id,id,this.prodId).subscribe(
        (res) => {
          this.doubtAlldata = res['dbt_arr'];
          console.log(this.doubtAlldata);
        }
      )
    }
    
  }

  doubtCategory(doubtId){
    if(doubtId==3){
      this.askdoubtservice.getAllSubject().subscribe(

        (res) => {
          this.subeject = res;
          console.log(this.subeject)
        }
      )
      jQuery("#mag").show();
      jQuery("#mag2").show();
        
      
    }
    else{
      jQuery("#mag").hide();
      jQuery("#mag2").hide();
    }
  }

  ondoubtSubmit(doubt_submit_form){
    console.log(doubt_submit_form.value.doubtType,doubt_submit_form.value.subject,doubt_submit_form.value.chapter,doubt_submit_form.value.doubtTitile,doubt_submit_form.value.doubtDesc,doubt_submit_form.value.userId);
    this.askdoubtservice.postDoubt(doubt_submit_form.value.doubtType,doubt_submit_form.value.subject,doubt_submit_form.value.chapter,doubt_submit_form.value.doubtTitile,doubt_submit_form.value.doubtDesc,doubt_submit_form.value.userId,this.prodId).subscribe(
      (res) => {
        console.log(res)
        location.reload();
        jQuery("#doubts_Modal").modal('hide');
        this.askdoubtservice.getAllDoubt(this.prodId).subscribe(
          (data) => {
            this.doubtAlldata = data['dbt_arr'];
            console.log(this.doubtAlldata);
          }
        )
      },
      (error) => {
        console.log(error)
      }
    )
  }

  commentEvent(id){
    var doubt_id = id
    this.doubt_id = id
    this.askdoubtservice.getDoubtForComment(id).subscribe(
      (res) => {
        console.log(res)
        this.commentDoubtdata = res['dbt_arr'];
        this.commentDoubtname = this.commentDoubtdata[0].user_name;
        this.commentDoubtname_short = this.commentDoubtdata[0].first_char;
        this.commentDoubtdate = this.commentDoubtdata[0].date_msg;
        this.commentDoubttitle = this.commentDoubtdata[0].doubt_title;
        this.commentDoubtdesc = this.commentDoubtdata[0].doubt_desc;
        this.commentDoubtcount = this.commentDoubtdata[0].comment_count;
        this.askdoubtservice.getCommentForDoubt(doubt_id).subscribe(
          (comment) => {
            console.log(comment);
            if(comment['status'] == 200){
              this.showComment = true;
              this.comments_arr = comment['comment_arr'];
              this.commentDoubtcount = this.comments_arr.length;
            }else{
              this.showComment = false;
              this.comments_arr = [];
            }
          }
            
        )
      }
    )
    jQuery('body').find('.doubts_comment_div').show();
    jQuery('body').find('.feeds_post_user').hide();
    jQuery('body').find('.doubts_heading').hide();
  }

  Onback(){
    jQuery('body').find('.doubts_comment_div').hide();
    jQuery('body').find('.feeds_post_user').show();
    jQuery('body').find('.doubts_heading').show();
    this.askdoubtservice.getAllDoubt(this.prodId).subscribe(
      (data) => {
        this.doubtAlldata = data['dbt_arr'];
        console.log(this.doubtAlldata);
      }
    )
  }

  oncommentSubmit(comment_form){

    this.askdoubtservice.postcomment(comment_form.value.commentDesc,this.doubt_id,this.user_id).subscribe(
      (res) => {
        console.log(res)
        this.askdoubtservice.getCommentForDoubt(this.doubt_id).subscribe(
          (comment) => {
            console.log(comment);
            jQuery('body').find('#commentDesc').val('');
            if(comment['status'] == 200){
              this.showComment = true;
              this.comments_arr = comment['comment_arr'];
              this.commentDoubtcount = this.comments_arr.length;
            }else{
              this.showComment = false;
              this.comments_arr = [];
            }
          }
            
        )
      }
    )
  }

  OnCancel(){
    jQuery('body').find('#commentDesc').val('');
  }

  

}

import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {faShoePrints} from '@fortawesome/free-solid-svg-icons';
import {faAngry, faNewspaper} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-logo-manage',
  templateUrl: './logo-manage.component.html',
  styleUrls: ['./logo-manage.component.css']
})
export class LogoManageComponent implements OnInit {
  /*********fontawesome************/
  faAngry = faAngry;
  faNewspaper = faNewspaper;
  faShoePrints = faShoePrints;
  /********************************/
  logoImg: any; // logo路径
  backImg: any; // background路径
  imgData: FormData = new FormData(); // 上传图片数据
  constructor(private  sanitizer: DomSanitizer) {
    this.backImg = '/assets/img/horse.jpeg';
    this.logoImg = '/assets/img/horse.jpeg';
  }

  ngOnInit() {
  }

  onchangeSelectFile(event) {
    const file = event.target.files[0];
    console.log(file.name);
    // this.imgData.append('file', file); // 图片数据保存
    // this.imgUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)); // 图片数据转换为预览URL
    // $('#filename').html(file.name); // 显示上传图片名
    if (event.target.id === 'file1') {
      console.log(event);
      this.imgData.append('logo', event.target.files[0]);
      this.logoImg = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      $('#filename1').html(event.target.value);
    }
    if (event.target.id === 'file2') {
      this.imgData.append('backgroud', event.target.files[0]);
      this.backImg = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      $('#filename2').html(event.target.value);
    }
  }

  /**
   * 删除
   * @param logo
   */
  deleteLogo(logo) {
  }

  /**
   * 编辑
   * @param logo
   */
  updateLogo(logo) {
    console.log(logo);
    $('#browsefile').click();
  }
}

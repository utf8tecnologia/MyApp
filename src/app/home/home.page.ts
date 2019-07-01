import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [
    Camera // <- declarar o service/provider aqui
  ]
})
export class HomePage {

  photos: any[];

  constructor(
              private iab: InAppBrowser,
              private camera: Camera,
              private file: File
  ) { }

  abrir() {
    const browser = this.iab.create('http://utf8.com.br', '_blank', 'location=yes');
    browser.show();
  }

  baterFoto() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      const filename = imageData.substring(imageData.lastIndexOf('/') + 1);
      const path = imageData.substring(imageData.lastIndexOf('/') + 1);
      this.file.readAsDataURL(path,filename).then((base64data) => {
        this.photos.push(base64data);
      });
      }, (err) => {
      // Handle error
     }
     );

  }
}

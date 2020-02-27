import { environment } from 'src/environments/environment';
import { UploadFileService } from './../upload-file.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styles: []
})
export class UploadFileComponent implements OnInit {

  files: Set<File>;
  progress = 0;
  constructor(private service: UploadFileService) { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
    // document.getElementById('customFileLabel').innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('customFileLabel').innerHTML = fileNames.join(', ');

    this.progress = 0;
  }
  onUpload() {
    if (this.files && this.files.size > 0) {
        this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress(progress => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'));
        // tslint:disable-next-line: ban-types
        // .subscribe((event: HttpEvent<Object>) => {
        //   if (event.type === HttpEventType.Response) {
        //     console.log('Upload Concluído');
        //   } else if (event.type === HttpEventType.UploadProgress) {
        //       const percentDone = Math.round((event.loaded * 100) / event.total);
        //       console.log('progresso', percentDone);
        //       this.progress = percentDone;
        //   }
        // });
    }
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExel')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'Contas.xlsx');

    });
  }

  onDownloadPdf() {
    this.service.download(environment.BASE_URL + '/donloadPdf')
    .subscribe((res: any) => {
      this.service.handleFile(res, 'Curriculo.pdf');

    });
  }
}

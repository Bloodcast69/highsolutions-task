import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-post-modal',
  templateUrl: './add-new-post-modal.component.html',
  styleUrls: ['./add-new-post-modal.component.scss']
})
export class AddNewPostModalComponent {
  @ViewChild('fileInput') public fileInput: ElementRef<HTMLInputElement>;
  public form: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    author: new FormControl('', Validators.required),
    image: new FormControl(null, Validators.required),
  });

  constructor(private dialogRef: MatDialogRef<AddNewPostModalComponent>) {
  }

  public addNewPost(): void {
    const formData: FormData = new FormData();
    formData.append('title', this.form.get('title').value);
    formData.append('author', this.form.get('author').value);
    const fileReader: FileReader = new FileReader();
    fileReader.onload = () => {
      formData.append('image', (fileReader.result as string).replace(/^data:.+;base64,/, ''));
      this.dialogRef.close(formData);
    };
    fileReader.readAsDataURL(this.fileInput.nativeElement.files[0]);
  }
}

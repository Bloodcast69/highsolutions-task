import {Component, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../shared/api.service';
import {IPostRequest, IPostResponse} from '../shared/interfaces/post.interface';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {AddNewPostModalComponent} from '../shared/components/add-new-post-modal/add-new-post-modal.component';
import {filter} from 'rxjs/operators';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @ViewChild(MatPaginator) public paginator: MatPaginator;

  public displayedColumns: string[] = ['id', 'author', 'title', 'image'];
  public dataSource: MatTableDataSource<IPostResponse>;

  constructor(
    private apiService: ApiService,
    private matDialog: MatDialog,
    private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.getLatestPosts();
  }

  public launchNewPostModal(): void {
    const dialogRef = this.matDialog.open(AddNewPostModalComponent);
    dialogRef
      .afterClosed()
      .pipe(filter((el) => !!el))
      .subscribe((value: FormData) => {
        this.apiService
          .addPost(value)
          .subscribe(() => this.getLatestPosts());
      });
  }

  public getSanitizedImageUrl(base64Image: string): SafeResourceUrl {
    if (base64Image && base64Image.includes('data:image/png;base64')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
    } else if (base64Image) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${base64Image}`);
    }
  }

  private getLatestPosts(): void {
    this.apiService
      .getPosts()
      .subscribe((value) => {
        this.dataSource = new MatTableDataSource<IPostResponse>(value);
        this.dataSource.paginator = this.paginator;
      });
  }
}

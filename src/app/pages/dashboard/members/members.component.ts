import { Component, OnInit } from '@angular/core';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import Member from "../../../types/Member";
import {MemberService} from "../../../core/services/member.service";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    UpperCasePipe
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit {
  public members: Member[] = [];
  public currentPage = 0;
  public pageSize = 6;
  public totalElements = 0;
  public totalPages = 0;
  public loading = false;

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.initializePage();
  }

  private initializePage(): void {
    this.loading = true;
    this.memberService.getPage({
      page: this.currentPage,
      size: this.pageSize,
      sort: 'lastName,asc'
    }).subscribe({
      next: (response) => {
        this.members = response.content;
        this.totalElements = response.page.totalElements;
        this.totalPages = response.page.totalPages;
        this.currentPage = response.page.number;
        this.pageSize = response.page.size;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading members:', error);
        this.loading = false;
      }
    });
  }

  public onPageChange(page: number): void {
    this.currentPage = page;
    this.initializePage();
  }

  public onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.currentPage = 0; // Reset to first page
    this.initializePage();
  }
}
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MemberService } from '../../../../core/services/member.service';
import {NgForOf, NgIf} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import ErrorHandler from '../../../../helpers/errorHandler';
import Member from '../../../../types/Member';

@Component({
  selector: 'app-member-update',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink
  ],
  templateUrl: './member-update.component.html',
  styleUrl: './member-update.component.css'
})
export class MemberUpdateComponent {
  @Output() initializePage = new EventEmitter<void>();
  memberForm: FormGroup;
  serverErrors: { [key: string]: string[] } = {};
  editedMember: Member | null;

  private router: Router;
  private fb: FormBuilder;
  private memberService: MemberService;

  constructor(fb: FormBuilder, memberService: MemberService, router: Router) {
    this.router = router;
    this.fb = fb;
    this.memberService = memberService;

    this.memberForm = this.fb.group({
      username: ['', Validators.required],
      password: [''],
      role: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      cin: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nationality: ['', Validators.required],
      licenseExpirationDate: ['', Validators.required],
    });

    this.editedMember = null;
    this.getEditedMember();
  }

  getEditedMember(): void {
    const username = decodeURIComponent(this.router.url.split('/').pop() || '');

    this.memberService.findByUsername(username).subscribe({
      next: (member) => {
        this.editedMember = member;
        this.memberForm.patchValue(member);
      },
      error: (error) => {
        console.error('Error fetching member:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.memberForm.valid) {
      const formValue = this.memberForm.value;

      const member: Member = {
        ...formValue,
        licenseExpirationDate: new Date(formValue.licenseExpirationDate).toISOString()
      };

      const username = decodeURIComponent(this.router.url.split('/').pop() || '');
      this.memberService.updateByUsername(username, member).subscribe({
        next: () => {
          // Handle success
          this.serverErrors = {};
          this.initializePage.emit();
          this.memberForm.reset();
          this.router.navigate(['/dashboard/members']).then(() =>
            Swal.fire({
              toast: true,
              icon: 'success',
              title: 'Member updated',
              text: 'The member has been updated successfully',
              showConfirmButton: false,
              timer: 2500,
              position: 'top-end'
            })
          );
        },
        error: (error) => {
          console.error('Error updating member:', error);
          if (error && error.error) {
            this.serverErrors = ErrorHandler.handleServerErrors(error.error);
          }
        }
      });
    }
  }
}

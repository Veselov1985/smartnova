import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalsComponent } from './terminals.component';

import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';



describe('TerminalsComponent', () => {
  let component: TerminalsComponent;
  let fixture: ComponentFixture<TerminalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TerminalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

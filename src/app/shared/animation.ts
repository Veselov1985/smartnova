import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  trigger('routeAnimation', [
    state('*',
      style({
        opacity: 1,
        transform: 'translateX(0)'
      })
    ),
    transition(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-100%)'
      }),
      animate('0.2s ease-in')
    ]),
    transition(':leave', [
      animate('0.5s ease-out', style({
        opacity: 0,
        transform: 'translateY(100%)'
      }))
    ])
  ]);

  export const triggerPanelState: AnimationEntryMetadata =
  trigger('panelState', [
    state('inactive', style({
      display: 'none',
      opacity: 0
    })),
    state('active', style({
      display: 'block',
    })),
    transition('inactive => active', animate('250ms ease-in')),
    transition('active => inactive', animate('150ms ease-out'))
  ]);

  export const triggerMultifilterState: AnimationEntryMetadata =
  trigger('multifilterState', [
    state('inactive', style({
      transform: 'translateX(110%)'
    })),
    state('active', style({
      transform: 'translateX(0)'
    })),
    transition('inactive => active', animate('250ms ease-in')),
    transition('active => inactive', animate('150ms ease-out'))
  ]);

  export const triggerConfigState: AnimationEntryMetadata =
  trigger('configState', [
    state('inactive', style({
      transform: 'translateX(-110%)'
    })),
    state('active', style({
      transform: 'translateX(0)'
    })),
    transition('inactive => active', animate('250ms ease-in')),
    transition('active => inactive', animate('250ms ease-out'))
  ]);

  export const triggerUserPanelState: AnimationEntryMetadata =
  trigger('userPanelAnimation', [
    state('inactive', style({
      transform: 'translateX(0)'
    })),
    state('active', style({
      transform: 'translateX(-100%)'
    })),
    transition('inactive => active', animate('250ms ease-in')),
    transition('active => inactive', animate('250ms ease-out'))
  ]);

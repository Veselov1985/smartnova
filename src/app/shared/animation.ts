import { animate, state, style, trigger } from '@angular/animations';
import { query, animateChild, transition } from '@angular/animations';

// Component transition animations
export const slideInDownAnimation =
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

  export const nestedPanelState = transition('* => *', [
    query('@*', animateChild(), {optional: true})
  ]);

  export const triggerPanelState =
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

  export const triggerMultifilterState =
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

  export const triggerConfigState =
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

  export const triggerUserPanelState =
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

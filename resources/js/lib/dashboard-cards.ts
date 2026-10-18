import type * as React from 'react';

/**
 * Dashboard cards from packages (window.Sunrice.registerDashboardCard):
 * Sunrice::addDashboardCard('commerce-sales', …) on the server, and the
 * admin script registers the component under the same name. It receives
 * the props the card's callback returned.
 */
export type DashboardCardComponent = React.ComponentType<Record<string, unknown>>;

const cards: Record<string, DashboardCardComponent> = {};

export function registerDashboardCard(name: string, component: DashboardCardComponent): void {
    cards[name] = component;
}

export function registeredDashboardCard(name: string): DashboardCardComponent | undefined {
    return cards[name];
}

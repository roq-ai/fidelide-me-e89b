const mapping: Record<string, string> = {
  customers: 'customer',
  prizes: 'prize',
  retailers: 'retailer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

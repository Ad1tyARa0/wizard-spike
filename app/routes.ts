import { type RouteConfig } from '@react-router/dev/routes';
import { hydrogenRoutes } from '@shopify/hydrogen';
import { routeManifest } from './route-manifest';

export default hydrogenRoutes([...routeManifest]) satisfies RouteConfig;

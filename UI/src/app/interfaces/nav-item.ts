export interface NavItem {
  path?: string;
  hasIcon: boolean;
  name: string;
  icon?: string;
  hasChildren?: boolean;
  children?: NavItem[];
}

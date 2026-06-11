import {

  /* Dashboard */
  LayoutDashboard,
  BarChart3,
  PieChart,
  TrendingUp,

  /* Users */
  Users,
  User,
  UserPlus,
  UserCheck,
  UserX,
  UserCog,
  ContactRound,

  /* Security */
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  KeyRound,

  /* Organization */
  Building2,
  Building,
  Globe,
  Network,
  Briefcase,
  FolderKanban,

  /* Navigation */
  Compass,
  Menu,
  PanelLeft,
  Route,

  /* Modules */
  Boxes,
  Box,
  LayoutGrid,
  Grid3X3,

  /* Settings */
  Settings,
  Settings2,
  SlidersHorizontal,

  /* Actions */
  Plus,
  Pencil,
  Trash2,
  Save,
  RefreshCw,
  Search,
  Filter,
  Download,
  Upload,

  /* Common */
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown,

  /* Status */
  CheckCircle2,
  XCircle,
  AlertTriangle,

  /* Audit */
  History,
  FileText,

  /* Profile */
  CircleUserRound,

  /* ERP Core */
  Database,
  Server,
  Layers3,

  /* Sales */
  ShoppingCart,
  Receipt,

  /* Purchase */
  Truck,

  /* Inventory */
  Package,
  Warehouse,
  ScanBarcode,

  /* Finance */
  DollarSign,
  CreditCard,
  Banknote,
  Calculator,
  CircleDollarSign,

  /* HR */
  Calendar,
  Clock,

  /* Manufacturing */
  Factory,

  /* Projects */
  BriefcaseBusiness,
  ClipboardList,

  /* Communication */
  Bell,
  Mail,

  /* Pricing */
  Tag,
  BadgePercent,

  /* Monitoring */
  MonitorCog

} from 'lucide-angular';

export const ICONS = {

  /* Dashboard */
  dashboard: LayoutDashboard,
  analytics: BarChart3,
  reports: PieChart,
  trends: TrendingUp,

  /* Users */
  users: Users,
  user: User,
  createUser: UserPlus,
  activeUsers: UserCheck,
  inactiveUsers: UserX,
  profile: CircleUserRound,

  /* Security */
  roles: Shield,
  security: Shield,
  roleProfiles: ShieldCheck,
  permissions: Lock,
  rolePermissions: KeyRound,
  securityAlert: ShieldAlert,

  /* Organization */
  organization: Building2,
  company: Building,

  workspaces: Briefcase,
  workspace: Briefcase,

  domains: Globe,
  domain: Globe,

  roleDomains: Network,
  userWorkspaces: FolderKanban,

  /* Modules */
  modules: Boxes,
  module: Box,

  subModules: LayoutGrid,
  subModule: LayoutGrid,

  moduleProfiles: Grid3X3,

  /* Navigation */
  navigation: Compass,
  sidebar: PanelLeft,
  menu: Menu,
  routes: Route,

  /* Settings */
  configuration: Settings,
  settings: Settings,
  advancedSettings: Settings2,
  preferences: SlidersHorizontal,

  /* Audit */
  audit: History,
  logs: FileText,

  /* ERP Core */
  database: Database,
  server: Server,
  layers: Layers3,

  /* Actions */
  create: Plus,
  add: Plus,
  plus: Plus,

  edit: Pencil,
  update: Pencil,

  delete: Trash2,
  remove: Trash2,
  trash: Trash2,

  save: Save,

  refresh: RefreshCw,

  search: Search,

  filter: Filter,

  export: Download,
  download: Download,

  import: Upload,
  upload: Upload,

  /* Navigation Buttons */
  back: ArrowLeft,

  next: ChevronRight,
  chevronRight: ChevronRight,

  previous: ChevronLeft,

  expand: ChevronDown,

  /* Status */
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,

  /* =====================
     SALES
  ===================== */

  sales: ShoppingCart,
  quotation: FileText,
  salesOrder: ClipboardList,
  invoice: Receipt,
  customer: ContactRound,

  /* =====================
     PURCHASE
  ===================== */

  purchase: ShoppingCart,
  purchaseOrder: ClipboardList,
  supplier: Truck,

  /* =====================
     INVENTORY
  ===================== */

  inventory: Warehouse,
  warehouse: Warehouse,
  product: Package,
  stock: ScanBarcode,

  /* =====================
     FINANCE
  ===================== */

  finance: DollarSign,
  accounts: Calculator,
  payments: CreditCard,
  bank: Banknote,
  cashFlow: CircleDollarSign,

  /* =====================
     HRMS
  ===================== */

  hr: UserCog,
  employees: Users,
  employee: User,
  attendance: Clock,
  leave: Calendar,
  payroll: DollarSign,

  /* =====================
     CRM
  ===================== */

  crm: ContactRound,
  lead: UserPlus,
  customers: ContactRound,

  /* =====================
     MANUFACTURING
  ===================== */

  manufacturing: Factory,
  production: Factory,
  bom: Layers3,

  /* =====================
     PROJECTS
  ===================== */

  projects: BriefcaseBusiness,
  tasks: ClipboardList,

  /* =====================
     COMMUNICATION
  ===================== */

  notifications: Bell,
  mail: Mail,

  /* =====================
     PRICING
  ===================== */

  tags: Tag,
  discount: BadgePercent,

  /* =====================
     MONITORING
  ===================== */

  monitoring: MonitorCog
};
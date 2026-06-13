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
  CircleUserRound,

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
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  ChevronDown,

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
  Copy,

  /* Password */
  Eye,
  EyeOff,

  /* Status */
  CheckCircle2,
  XCircle,
  AlertTriangle,

  /* Audit */
  History,
  FileText,

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
  MonitorCog,
} from 'lucide-angular';

export const ICONS = {
  /* ======================
     PASSWORD
  ====================== */

  eye: Eye,
  eyeOff: EyeOff,

  /* ======================
     DASHBOARD
  ====================== */

  dashboard: LayoutDashboard,
  analytics: BarChart3,
  reports: PieChart,
  trends: TrendingUp,
  chevronRight: ChevronRight,
  /* ======================
     USERS
  ====================== */

  users: Users,
  user: User,
  createUser: UserPlus,
  activeUsers: UserCheck,
  inactiveUsers: UserX,
  employee: User,
  employees: Users,
  profile: CircleUserRound,
  customer: ContactRound,

  /* ======================
     SECURITY
  ====================== */

  roles: Shield,
  security: Shield,
  roleProfiles: ShieldCheck,
  permissions: Lock,
  rolePermissions: KeyRound,
  securityAlert: ShieldAlert,

  /* ======================
     ORGANIZATION
  ====================== */

  organization: Building2,
  company: Building,

  workspace: Briefcase,
  workspaces: Briefcase,

  domain: Globe,
  domains: Globe,

  roleDomains: Network,
  userWorkspaces: FolderKanban,

  /* ======================
     MODULES
  ====================== */

  module: Box,
  modules: Boxes,

  subModule: LayoutGrid,
  subModules: LayoutGrid,

  moduleProfile: Grid3X3,
  moduleProfiles: Grid3X3,

  /* ======================
     NAVIGATION
  ====================== */

  navigation: Compass,
  sidebar: PanelLeft,
  menu: Menu,
  routes: Route,

  back: ArrowLeft,
  next: ChevronRight,
  previous: ChevronLeft,
  expand: ChevronDown,

  /* ======================
     SETTINGS
  ====================== */

  settings: Settings,
  configuration: Settings,
  advancedSettings: Settings2,
  preferences: SlidersHorizontal,

  /* ======================
     ACTIONS
  ====================== */

  plus: Plus,
  add: Plus,
  create: Plus,

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

  copy: Copy,

  /* ======================
     STATUS
  ====================== */

  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,

  /* ======================
     AUDIT
  ====================== */

  audit: History,
  logs: FileText,

  /* ======================
     ERP CORE
  ====================== */

  database: Database,
  server: Server,
  layers: Layers3,

  /* ======================
     SALES
  ====================== */

  sales: ShoppingCart,
  quotation: FileText,
  salesOrder: ClipboardList,
  invoice: Receipt,
  customers: ContactRound,

  /* ======================
     PURCHASE
  ====================== */

  purchase: ShoppingCart,
  purchaseOrder: ClipboardList,
  supplier: Truck,

  /* ======================
     INVENTORY
  ====================== */

  inventory: Warehouse,
  warehouse: Warehouse,
  product: Package,
  stock: ScanBarcode,

  /* ======================
     FINANCE
  ====================== */

  finance: DollarSign,
  accounts: Calculator,
  payments: CreditCard,
  bank: Banknote,
  cashFlow: CircleDollarSign,

  /* ======================
     HRMS
  ====================== */

  hr: UserCog,
  attendance: Clock,
  leave: Calendar,
  payroll: DollarSign,

  /* ======================
     CRM
  ====================== */

  crm: ContactRound,
  lead: UserPlus,

  /* ======================
     MANUFACTURING
  ====================== */

  manufacturing: Factory,
  production: Factory,
  bom: Layers3,

  /* ======================
     PROJECTS
  ====================== */

  projects: BriefcaseBusiness,
  tasks: ClipboardList,

  /* ======================
     COMMUNICATION
  ====================== */

  notifications: Bell,
  mail: Mail,

  /* ======================
     PRICING
  ====================== */

  tags: Tag,
  discount: BadgePercent,

  /* ======================
     MONITORING
  ====================== */

  monitoring: MonitorCog,
};

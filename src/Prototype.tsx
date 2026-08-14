import { useState, type ComponentType, type ReactNode } from "react";
import {
  FlowStack,
  KeyboardInput,
  KeyboardTextarea,
  MobileScroll,
  useMobileDevice,
  type FlowControls,
  type FlowScreen,
} from "./mobile";
import {
  IconArrowLeft,
  IconArrowsExchange,
  IconBed,
  IconBell,
  IconBuildingCommunity,
  IconChartBar,
  IconCheck,
  IconChecklist,
  IconChevronRight,
  IconCircleCheck,
  IconClipboardCheck,
  IconClock,
  IconClipboardList,
  IconDoorExit,
  IconHeart,
  IconHome,
  IconInfoCircle,
  IconKey,
  IconLayoutDashboard,
  IconMessageCircle,
  IconMoon,
  IconPackage,
  IconPhone,
  IconPlayerPlay,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconTool,
  IconUser,
  IconUserPlus,
  IconUserCheck,
  IconUsers,
  IconX,
} from "@tabler/icons-react";
import dormBuildingUrl from "./assets/dorm-building-v3.png";

const HEADER_HEIGHT = 52;
const TAB_BAR_HEIGHT = 58;
const FORM_FOOTER_HEIGHT = 88;

const STUDENT = {
  name: "林晓彤",
  studentId: "2024085201",
  dorm: "3号楼 520室",
  roommates: 2,
};

const TODAY = "2026年8月12日 星期三";

const NOTICES = [
  {
    id: "n1",
    title: "关于暑期留校申请的通知",
    date: "08-10",
    body: "根据学校暑假工作安排，暑期留校的同学请于 8 月 20 日前在「我的申请」中提交留校申请，经辅导员审批通过后统一汇总至宿管中心。逾期未提交的，默认按离校处理，请同学们相互转告。",
  },
  {
    id: "n2",
    title: "本周五宿舍安全大检查",
    date: "08-11",
    body: "本周五（8 月 14 日）21:00 起，宿管中心将联合学生会对各楼栋开展安全卫生大检查。检查内容包括违规电器、消防通道、阳台杂物与卫生状况。请同学们提前整理房间，不合格寝室将按《宿舍管理条例》通报整改。",
  },
];

const REPAIR_TYPES = ["水电维修", "家具设施", "门窗锁具", "网络通讯", "其他"];

type ServiceItem = {
  id: string;
  name: string;
  icon: ComponentType<{ size?: number; stroke?: number }>;
  bg: string;
  action?: "report";
};

const SERVICES: ServiceItem[] = [
  { id: "s1", name: "报修服务", icon: IconTool, bg: "#EAF3FD", action: "report" },
  { id: "s2", name: "入住退宿", icon: IconDoorExit, bg: "#E7F7EE" },
  { id: "s3", name: "调宿申请", icon: IconArrowsExchange, bg: "#FFF3E5" },
  { id: "s4", name: "查寝打卡", icon: IconClipboardCheck, bg: "#EEF0FF" },
  { id: "s5", name: "访客登记", icon: IconUserPlus, bg: "#FDEFF2" },
  { id: "s6", name: "晚归申请", icon: IconMoon, bg: "#EAF7FB" },
  { id: "s7", name: "公告通知", icon: IconBell, bg: "#F5F0FF" },
  { id: "s8", name: "维修进度", icon: IconTool, bg: "#FFF7E0" },
];

const MESSAGES = [
  {
    id: "m1",
    icon: IconTool,
    bg: "#EAF3FD",
    title: "报修工单已接单",
    time: "今天 10:24",
    desc: "维修师傅王师傅已接单，预计 11:30 前到达 3号楼 520 室。",
  },
  {
    id: "m2",
    icon: IconCheck,
    bg: "#E7F7EE",
    title: "晚归申请已通过",
    time: "昨天 22:05",
    desc: "辅导员已批准你的晚归申请，请于 23:30 前刷脸回寝。",
  },
  {
    id: "m3",
    icon: IconBell,
    bg: "#F5F0FF",
    title: "新公告：宿舍安全大检查",
    time: "昨天 09:30",
    desc: "本周五 21:00 将开展宿舍安全卫生大检查，请提前整理。",
  },
  {
    id: "m4",
    icon: IconBuildingCommunity,
    bg: "#EEF0FF",
    title: "欢迎使用晨曦宿舍",
    time: "08-01",
    desc: "晨曦大学宿舍管理系统已上线，你的宿舍信息已同步。",
  },
  {
    id: "m5",
    icon: IconCircleCheck,
    bg: "#E7F7EE",
    title: "报修工单已完工",
    time: "今天 09:12",
    desc: "你的报修已完工，请确认维修质量并评价。",
  },
  {
    id: "m6",
    icon: IconArrowsExchange,
    bg: "#EEF0FF",
    title: "调宿申请已通过",
    time: "昨天 15:40",
    desc: "你的调宿申请已通过，请在 3 日内到宿管中心办理。",
  },
  {
    id: "m7",
    icon: IconUserPlus,
    bg: "#FDEFF2",
    title: "访客登记提醒",
    time: "昨天 19:02",
    desc: "访客已完成登记，请在 22:00 前离楼。",
  },
  {
    id: "m8",
    icon: IconSettings,
    bg: "#F0F4F9",
    title: "系统维护通知",
    time: "08-10",
    desc: "本周日凌晨 02:00-04:00 系统维护，期间门禁正常使用。",
  },
];

const TAB_ITEMS = [
  { id: "home", label: "首页", icon: IconHome },
  { id: "services", label: "服务", icon: IconHeart },
  { id: "messages", label: "消息", icon: IconMessageCircle },
  { id: "profile", label: "我的", icon: IconUser },
];

const MANAGER_TAB_ITEMS = [
  { id: "workbench", label: "工作台", icon: IconLayoutDashboard },
  { id: "check", label: "查寝", icon: IconClipboardCheck },
  { id: "orders", label: "工单", icon: IconTool },
  { id: "mprofile", label: "我的", icon: IconUser },
];

type TabItem = {
  id: string;
  label: string;
  icon: ComponentType<{ size?: number; stroke?: number }>;
};

const MANAGER = {
  name: "王秀兰",
  role: "3号楼 · 宿管员",
};

const MAINTENANCE = {
  name: "李建国",
  role: "维修组 · 水电/家具",
};

const MT_TAB_ITEMS = [
  { id: "mtworkbench", label: "工作台", icon: IconLayoutDashboard },
  { id: "mtorders", label: "工单", icon: IconClipboardList },
  { id: "mtprofile", label: "我的", icon: IconUser },
];

const FLOORS = ["1F", "2F", "3F", "4F", "5F", "6F"];

function checkRoomsForFloor(floor: string) {
  const floorNum = parseInt(floor, 10);
  const pattern = [4, 3, 4, 2, 4, 4, 3, 4, 2, 4, 3, 4];
  return Array.from({ length: 12 }, (_, index) => ({
    id: String(floorNum * 100 + 20 + index),
    residents: 4,
    present: pattern[index],
  }));
}

const WORK_ORDERS = [
  {
    id: "WO-20260812-001",
    room: "3号楼 520室",
    type: "花洒漏水",
    status: "处理中",
    time: "今天 09:40",
    assignee: "王师傅",
    desc: "浴室花洒持续漏水，水压偏大，需更换软管。",
  },
  {
    id: "WO-20260812-002",
    room: "3号楼 421室",
    type: "灯管不亮",
    status: "待接单",
    time: "今天 10:02",
    assignee: "待分配",
    desc: "寝室日光灯管闪烁后完全不亮，怀疑镇流器故障。",
  },
  {
    id: "WO-20260812-003",
    room: "3号楼 512室",
    type: "空调不制冷",
    status: "待接单",
    time: "今天 10:18",
    assignee: "待分配",
    desc: "空调开启后无冷风，已影响学生正常休息。",
  },
  {
    id: "WO-20260812-004",
    room: "3号楼 218室",
    type: "插座松动",
    status: "待接单",
    time: "今天 10:35",
    assignee: "待分配",
    desc: "书桌插座松动，插拔时有火花，存在安全隐患。",
  },
  {
    id: "WO-20260812-005",
    room: "3号楼 618室",
    type: "马桶堵塞",
    status: "待接单",
    time: "今天 10:52",
    assignee: "待分配",
    desc: "卫生间马桶冲水不畅，存在堵塞。",
  },
  {
    id: "WO-20260812-006",
    room: "3号楼 302室",
    type: "空调异响",
    status: "处理中",
    time: "今天 11:05",
    assignee: "王师傅",
    desc: "空调运行时有异响，已上门检修中。",
  },
  {
    id: "WO-20260812-007",
    room: "3号楼 425室",
    type: "窗帘脱落",
    status: "处理中",
    time: "今天 11:20",
    assignee: "李师傅",
    desc: "阳台窗帘轨道脱落，正在处理。",
  },
  {
    id: "WO-20260811-019",
    room: "3号楼 511室",
    type: "水龙头滴水",
    status: "已完成",
    time: "昨天 17:30",
    assignee: "王师傅",
    desc: "水龙头阀芯更换完成，测试正常。",
  },
  {
    id: "WO-20260811-018",
    room: "3号楼 318室",
    type: "门锁损坏",
    status: "已完成",
    time: "昨天 15:20",
    assignee: "李师傅",
    desc: "门锁把手松动，已更换锁芯并测试正常。",
  },
];

const CHECKOUTS = [
  {
    id: "c1",
    name: "张雨桐",
    studentId: "2024085120",
    room: "3号楼 521室",
    time: "今天 08:20",
  },
  {
    id: "c2",
    name: "王一帆",
    studentId: "2024085099",
    room: "3号楼 418室",
    time: "昨天 16:45",
  },
  {
    id: "c3",
    name: "刘思远",
    studentId: "2024085032",
    room: "3号楼 316室",
    time: "今天 09:05",
  },
  {
    id: "c4",
    name: "赵雪晴",
    studentId: "2024085077",
    room: "3号楼 620室",
    time: "昨天 20:12",
  },
  {
    id: "c5",
    name: "孙浩然",
    studentId: "2024085188",
    room: "3号楼 512室",
    time: "今天 10:12",
  },
  {
    id: "c6",
    name: "吴梦琪",
    studentId: "2024085231",
    room: "2号楼 402室",
    time: "今天 09:40",
  },
];

const COUNSELOR = {
  name: "陈静",
  role: "辅导员 · 计算机学院",
};

const ADMIN = {
  name: "赵建军",
  role: "系统管理员 · 后勤管理处",
};

const COUNSELOR_TAB_ITEMS = [
  { id: "cworkbench", label: "工作台", icon: IconLayoutDashboard },
  { id: "capprovals", label: "审批", icon: IconUserCheck },
  { id: "ccheck", label: "查寝", icon: IconClipboardCheck },
  { id: "cprofile", label: "我的", icon: IconUser },
];

const ADMIN_TAB_ITEMS = [
  { id: "astats", label: "统计", icon: IconChartBar },
  { id: "abuildings", label: "楼栋", icon: IconBuildingCommunity },
  { id: "aalloc", label: "分配", icon: IconUserPlus },
  { id: "aaccounts", label: "账号", icon: IconShieldCheck },
  { id: "aprofile", label: "我的", icon: IconUser },
];

const BUILDINGS = [
  { id: "b1", name: "1号楼", floors: 6, rooms: 60, occupied: 228, beds: 240 },
  { id: "b2", name: "2号楼", floors: 6, rooms: 60, occupied: 231, beds: 240 },
  { id: "b3", name: "3号楼", floors: 6, rooms: 60, occupied: 214, beds: 240 },
  { id: "b4", name: "4号楼", floors: 5, rooms: 50, occupied: 186, beds: 200 },
  { id: "b5", name: "5号楼", floors: 5, rooms: 50, occupied: 96, beds: 200 },
];

const PENDING_STUDENTS = [
  { id: "p1", name: "许子墨", studentId: "2025081205", major: "计算机学院" },
  { id: "p2", name: "沈佳怡", studentId: "2025081210", major: "外国语学院" },
  { id: "p3", name: "唐一帆", studentId: "2025081217", major: "机械工程学院" },
  { id: "p4", name: "顾晨曦", studentId: "2025081223", major: "经济管理学院" },
];

const ACCOUNTS = [
  { id: "ac1", name: "王秀兰", role: "宿管员", scope: "3号楼", status: "启用" },
  { id: "ac2", name: "刘阿姨", role: "宿管员", scope: "1号楼", status: "启用" },
  { id: "ac3", name: "李建国", role: "维修师傅", scope: "3号楼", status: "启用" },
  { id: "ac4", name: "陈静", role: "辅导员", scope: "计算机学院", status: "启用" },
  { id: "ac5", name: "张伟", role: "宿管员", scope: "4号楼", status: "停用" },
  { id: "ac6", name: "孙晓峰", role: "维修师傅", scope: "2号楼", status: "启用" },
];

const CSTUDENTS = [
  { id: "st1", name: "林晓彤", studentId: "2024085201", room: "3号楼 520室", status: "在寝" },
  { id: "st2", name: "王一帆", studentId: "2024085099", room: "3号楼 418室", status: "在寝" },
  { id: "st3", name: "刘思远", studentId: "2024085032", room: "3号楼 316室", status: "在寝" },
  { id: "st4", name: "赵雪晴", studentId: "2024085077", room: "3号楼 620室", status: "离校" },
  { id: "st5", name: "陈宇轩", studentId: "2025081201", room: "3号楼 521室", status: "在寝" },
  { id: "st6", name: "张雨桐", studentId: "2024085120", room: "3号楼 521室", status: "在寝" },
  { id: "st7", name: "李佳琪", studentId: "2024085140", room: "2号楼 401室", status: "在寝" },
  { id: "st8", name: "周子涵", studentId: "2024085166", room: "1号楼 205室", status: "在寝" },
  { id: "st9", name: "孙浩然", studentId: "2024085188", room: "3号楼 512室", status: "在寝" },
  { id: "st10", name: "吴梦琪", studentId: "2024085231", room: "2号楼 402室", status: "在寝" },
  { id: "st11", name: "郑子轩", studentId: "2024085264", room: "1号楼 206室", status: "离校" },
  { id: "st12", name: "何雨欣", studentId: "2024085310", room: "3号楼 620室", status: "在寝" },
  { id: "st13", name: "高翔", studentId: "2024085342", room: "2号楼 403室", status: "在寝" },
  { id: "st14", name: "罗婉婷", studentId: "2024085375", room: "1号楼 207室", status: "在寝" },
];

const APPROVALS = [
  {
    id: "a1",
    type: "晚归申请",
    icon: IconMoon,
    bg: "#EAF7FB",
    student: "王一帆",
    room: "3号楼 418室",
    time: "今天 21:30",
    status: "待审批",
    desc: "因实习加班，申请今晚 23:30 前回寝。",
  },
  {
    id: "a2",
    type: "离校申请",
    icon: IconDoorExit,
    bg: "#FFF3E5",
    student: "赵雪晴",
    room: "3号楼 620室",
    time: "今天 18:00",
    status: "待审批",
    desc: "申请周末回家探亲，周日晚 20:00 前返校。",
  },
  {
    id: "a3",
    type: "调宿申请",
    icon: IconArrowsExchange,
    bg: "#EEF0FF",
    student: "刘思远",
    room: "3号楼 316室 → 318室",
    time: "昨天 14:20",
    status: "待审批",
    desc: "因室友作息差异较大，申请调换至 318 室。",
  },
  {
    id: "a4",
    type: "晚归申请",
    icon: IconMoon,
    bg: "#EAF7FB",
    student: "林晓彤",
    room: "3号楼 520室",
    time: "08-11 22:10",
    status: "已通过",
    desc: "图书馆闭馆后返寝，申请 23:00 前回寝。",
  },
  {
    id: "a5",
    type: "晚归申请",
    icon: IconMoon,
    bg: "#EAF7FB",
    student: "陈宇轩",
    room: "3号楼 521室",
    time: "今天 22:05",
    status: "待审批",
    desc: "参加社团活动，申请 23:30 前回寝。",
  },
  {
    id: "a6",
    type: "离校申请",
    icon: IconDoorExit,
    bg: "#FFF3E5",
    student: "张雨桐",
    room: "3号楼 521室",
    time: "今天 19:30",
    status: "待审批",
    desc: "周末回家探亲，周日晚 20:00 前返校。",
  },
  {
    id: "a7",
    type: "调宿申请",
    icon: IconArrowsExchange,
    bg: "#EEF0FF",
    student: "李佳琪",
    room: "2号楼 401室 → 405室",
    time: "昨天 10:15",
    status: "已通过",
    desc: "与室友协商一致，申请调换至 405 室。",
  },
  {
    id: "a8",
    type: "晚归申请",
    icon: IconMoon,
    bg: "#EAF7FB",
    student: "周子涵",
    room: "1号楼 205室",
    time: "08-10 21:40",
    status: "已驳回",
    desc: "未提前报备，审批未通过。",
  },
];

const CHECK_RESULTS = [
  {
    id: "cr1",
    building: "3号楼",
    floor: "5F",
    date: "08-12 21:00",
    normal: 22,
    issue: 2,
    submittedBy: "王秀兰",
    issues: ["521室 在寝 3/4", "523室 在寝 2/4"],
  },
  {
    id: "cr2",
    building: "3号楼",
    floor: "3F",
    date: "08-11 21:00",
    normal: 20,
    issue: 0,
    submittedBy: "王秀兰",
    issues: [],
  },
  {
    id: "cr3",
    building: "2号楼",
    floor: "4F",
    date: "08-10 21:00",
    normal: 24,
    issue: 1,
    submittedBy: "刘阿姨",
    issues: ["418室 在寝 2/4"],
  },
  {
    id: "cr4",
    building: "3号楼",
    floor: "6F",
    date: "08-09 21:00",
    normal: 23,
    issue: 1,
    submittedBy: "王秀兰",
    issues: ["620室 在寝 2/4"],
  },
  {
    id: "cr5",
    building: "1号楼",
    floor: "2F",
    date: "08-08 21:00",
    normal: 18,
    issue: 0,
    submittedBy: "刘阿姨",
    issues: [],
  },
  {
    id: "cr6",
    building: "2号楼",
    floor: "4F",
    date: "08-07 21:00",
    normal: 24,
    issue: 2,
    submittedBy: "刘阿姨",
    issues: ["401室 在寝 3/4", "403室 在寝 2/4"],
  },
  {
    id: "cr7",
    building: "3号楼",
    floor: "1F",
    date: "08-06 21:00",
    normal: 20,
    issue: 0,
    submittedBy: "王秀兰",
    issues: [],
  },
];

function bottomPad(platform: "ios" | "android") {
  return platform === "ios" ? 34 : 8;
}

function greeting() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return "早上好";
  if (hour >= 11 && hour < 13) return "中午好";
  if (hour >= 13 && hour < 18) return "下午好";
  return "晚上好";
}

function EmptyState({ text = "暂无相关内容" }: { text?: string }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-icon">
        <IconSearch size={26} stroke={1.5} />
      </span>
      <p className="empty-state-title">{text}</p>
      <p className="empty-state-sub">换个关键词试试，或清空筛选条件</p>
    </div>
  );
}

function SearchBarInput({
  value,
  onChange,
  placeholder,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  label: string;
}) {
  return (
    <div className="search-bar search-bar-input">
      <IconSearch size={18} stroke={1.8} />
      <KeyboardInput
        aria-label={label}
        className="search-bar-field"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      {value.length > 0 && (
        <button
          type="button"
          className="search-bar-clear"
          aria-label="清空搜索"
          onClick={() => onChange("")}
        >
          <IconX size={14} stroke={2} />
        </button>
      )}
    </div>
  );
}

function formFooterHeight(tabFooterHeight: number) {
  return FORM_FOOTER_HEIGHT + (tabFooterHeight - TAB_BAR_HEIGHT);
}

function screenHeader(title: string, opts?: { back?: boolean }) {
  return (flow: FlowControls): ReactNode => (
    <header className="app-header">
      {opts?.back && flow.canGoBack ? (
        <button type="button" className="header-back" aria-label="返回" onClick={() => flow.pop()}>
          <IconArrowLeft size={22} stroke={1.8} />
        </button>
      ) : (
        <span className="header-side-spacer" aria-hidden="true" />
      )}
      <h1 className="header-title">{title}</h1>
      <span className="header-side-spacer" aria-hidden="true" />
    </header>
  );
}

function TabBar({
  flow,
  active,
  items,
  onSelect,
}: {
  flow: FlowControls;
  active: string;
  items: TabItem[];
  onSelect: (id: string, footerHeight: number) => void;
}) {
  const { device } = useMobileDevice();
  const tabFooterHeight = TAB_BAR_HEIGHT + bottomPad(device.platform);

  return (
    <nav className="tab-bar" aria-label="底部导航">
      {items.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === active;
        return (
          <button
            key={tab.id}
            type="button"
            className={`tab-item${isActive ? " active" : ""}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              if (!isActive) onSelect(tab.id, tabFooterHeight);
            }}
          >
            <Icon size={22} stroke={1.6} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function tabFooter(active: string, footerHeight: number) {
  return {
    footer: (flow: FlowControls) => (
      <TabBar
        flow={flow}
        active={active}
        items={TAB_ITEMS}
        onSelect={(id, height) => flow.replace(tabScreen(id, height))}
      />
    ),
    footerHeight,
  };
}

function managerTabFooter(active: string, footerHeight: number) {
  return {
    footer: (flow: FlowControls) => (
      <TabBar
        flow={flow}
        active={active}
        items={MANAGER_TAB_ITEMS}
        onSelect={(id, height) => flow.replace(managerTabScreen(id, height))}
      />
    ),
    footerHeight,
  };
}

function maintenanceTabFooter(active: string, footerHeight: number) {
  return {
    footer: (flow: FlowControls) => (
      <TabBar
        flow={flow}
        active={active}
        items={MT_TAB_ITEMS}
        onSelect={(id, height) => flow.replace(maintenanceTabScreen(id, height))}
      />
    ),
    footerHeight,
  };
}

function counselorTabFooter(active: string, footerHeight: number) {
  return {
    footer: (flow: FlowControls) => (
      <TabBar
        flow={flow}
        active={active}
        items={COUNSELOR_TAB_ITEMS}
        onSelect={(id, height) => flow.replace(counselorTabScreen(id, height))}
      />
    ),
    footerHeight,
  };
}

function adminTabFooter(active: string, footerHeight: number) {
  return {
    footer: (flow: FlowControls) => (
      <TabBar
        flow={flow}
        active={active}
        items={ADMIN_TAB_ITEMS}
        onSelect={(id, height) => flow.replace(adminTabScreen(id, height))}
      />
    ),
    footerHeight,
  };
}

function HomeContent({ flow, tabFooterHeight }: { flow: FlowControls; tabFooterHeight: number }) {
  return (
    <main className="home-content with-tab-footer" data-testid="home-screen">
      <section className="home-hero">
        <div className="hero-illustration">
          <img src={dormBuildingUrl} alt="" draggable={false} />
        </div>
        <p className="hero-greeting">
          {greeting()}，{STUDENT.name}
        </p>
        <p className="hero-date">{TODAY}</p>
      </section>

      <section className="home-cards">
        <article className="card room-card">
          <div className="room-card-top">
            <span className="room-icon">
              <IconBuildingCommunity size={22} stroke={1.7} />
            </span>
            <div className="room-meta">
              <p className="room-title">{STUDENT.dorm}</p>
              <p className="room-sub">室友 {STUDENT.roommates} 人</p>
            </div>
          </div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => flow.push(reportScreen(tabFooterHeight))}
          >
            我要报修
          </button>
        </article>

        <article className="card notice-card">
          <div className="card-title-row">
            <h2 className="card-title">最新公告</h2>
          </div>
          {NOTICES.map((notice) => (
            <button
              key={notice.id}
              type="button"
              className="notice-row"
              onClick={() => flow.push(noticeScreen(notice.id))}
            >
              <span className="notice-title">{notice.title}</span>
            </button>
          ))}
        </article>
      </section>
    </main>
  );
}

function homeScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "home",
    ...tabFooter("home", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen home-screen">
        <HomeContent flow={flow} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function ReportForm() {
  const [type, setType] = useState(REPAIR_TYPES[0]);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <main className="report-content" data-testid="report-screen">
      <div className="form-group">
        <span className="form-label">故障类型</span>
        <div className="chip-grid" role="group" aria-label="故障类型">
          {REPAIR_TYPES.map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${type === item ? " selected" : ""}`}
              aria-pressed={type === item}
              onClick={() => setType(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">楼栋房间</span>
        <div className="readonly-field">
          <IconBuildingCommunity size={18} stroke={1.7} />
          <span>{STUDENT.dorm}</span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="report-desc">
          问题描述
        </label>
        <KeyboardTextarea
          id="report-desc"
          className="form-textarea"
          rows={6}
          placeholder="请简单描述故障情况，例如：浴室花洒持续漏水"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="report-phone">
          联系电话
        </label>
        <KeyboardInput
          id="report-phone"
          className="form-input"
          type="tel"
          placeholder="请输入联系电话"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
        />
      </div>

    </main>
  );
}

function reportScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "report",
    header: screenHeader("我要报修", { back: true }),
    headerHeight: HEADER_HEIGHT,
    footer: (flow) => (
      <div className="form-footer">
        <p className="form-footer-hint">
          <IconInfoCircle size={14} stroke={1.8} />
          提交后维修师傅将在 1 小时内接单
        </p>
        <button
          type="button"
          className="primary-btn footer-btn"
          onClick={() => flow.push(successScreen(tabFooterHeight))}
        >
          <IconCircleCheck size={20} stroke={1.9} />
          提交报修
        </button>
      </div>
    ),
    footerHeight: formFooterHeight(tabFooterHeight),
    render: () => (
      <MobileScroll className="app-screen">
        <ReportForm />
      </MobileScroll>
    ),
  };
}

function successScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "report-success",
    header: screenHeader("报修结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="report-success-screen">
          <span className="success-icon">
            <IconCircleCheck size={64} stroke={1.4} />
          </span>
          <h2 className="success-title">报修提交成功</h2>
          <p className="success-sub">工单号 CX-20260812-0736</p>
          <p className="success-desc">
            维修师傅将在 1 小时内接单
            <br />
            请保持电话畅通，随时查看维修进度
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(homeScreen(tabFooterHeight))}
          >
            返回首页
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function noticeScreen(noticeId: string): FlowScreen {
  const notice = NOTICES.find((item) => item.id === noticeId) ?? NOTICES[0];
  return {
    id: `notice-${notice.id}`,
    header: screenHeader("公告详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: () => (
      <MobileScroll className="app-screen">
        <main className="notice-detail" data-testid="notice-detail-screen">
          <h1 className="notice-detail-title">{notice.title}</h1>
          <p className="notice-detail-meta">
            <IconClock size={14} stroke={1.8} />
            2026-{notice.date} · 宿管中心
          </p>
          <p className="notice-detail-body">{notice.body}</p>
        </main>
      </MobileScroll>
    ),
  };
}

function servicesScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "services",
    header: screenHeader("服务"),
    headerHeight: HEADER_HEIGHT,
    ...tabFooter("services", tabFooterHeight),
    render: (flow) => <ServicesContent flow={flow} tabFooterHeight={tabFooterHeight} />,
  };
}

function ServicesContent({
  flow,
  tabFooterHeight,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
}) {
  const [keyword, setKeyword] = useState("");
  const keywordTrimmed = keyword.trim().toLowerCase();
  const services = keywordTrimmed
    ? SERVICES.filter((service) => service.name.toLowerCase().includes(keywordTrimmed))
    : SERVICES;

  return (
    <MobileScroll className="app-screen">
      <main className="services-content with-tab-footer" data-testid="services-screen">
        <SearchBarInput
          label="搜索服务"
          placeholder="搜索服务，如：报修、查寝、调宿"
          value={keyword}
          onChange={setKeyword}
        />
        {services.length === 0 ? (
          <div className="card empty-state-card">
            <EmptyState text="未找到相关服务" />
          </div>
        ) : (
          <section className="service-grid" aria-label="服务列表">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  type="button"
                  className="service-tile"
                  onClick={() => {
                    if (service.action === "report") flow.push(reportScreen(tabFooterHeight));
                  }}
                >
                  <span className="service-icon" style={{ background: service.bg }}>
                    <Icon size={22} stroke={1.7} />
                  </span>
                  <span className="service-name">{service.name}</span>
                </button>
              );
            })}
          </section>
        )}
      </main>
    </MobileScroll>
  );
}

function messagesScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "messages",
    header: screenHeader("消息"),
    headerHeight: HEADER_HEIGHT,
    ...tabFooter("messages", tabFooterHeight),
    render: () => (
      <MobileScroll className="app-screen">
        <main className="messages-content with-tab-footer" data-testid="messages-screen">
          <section className="card message-list" aria-label="消息列表">
            {MESSAGES.map((message) => {
              const Icon = message.icon;
              return (
                <div key={message.id} className="message-row">
                  <span className="message-icon" style={{ background: message.bg }}>
                    <Icon size={20} stroke={1.7} />
                  </span>
                  <div className="message-body">
                    <div className="message-head">
                      <span className="message-title">{message.title}</span>
                      <span className="message-time">{message.time}</span>
                    </div>
                    <p className="message-desc">{message.desc}</p>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function profileScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "profile",
    header: screenHeader("我的"),
    headerHeight: HEADER_HEIGHT,
    ...tabFooter("profile", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="profile-content with-tab-footer" data-testid="profile-screen">
          <section className="card profile-card">
            <span className="avatar">林</span>
            <div className="profile-meta">
              <p className="profile-name">{STUDENT.name}</p>
              <p className="profile-sub">
                学号 {STUDENT.studentId} · {STUDENT.dorm}
              </p>
            </div>
          </section>

          <section className="card detail-card profile-info-card">
            <div className="detail-row">
              <span className="detail-label">学院</span>
              <span className="detail-value">计算机学院</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">入学年份</span>
              <span className="detail-value">2024</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">辅导员</span>
              <span className="detail-value">陈静</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">宿舍类型</span>
              <span className="detail-value">上床下桌 4 人间</span>
            </div>
          </section>
          <p className="profile-footer">晨曦大学 · 宿舍管理系统</p>
        </main>
      </MobileScroll>
    ),
  };
}

function managerHomeScreen(tabFooterHeight: number): FlowScreen {
  const building3 = BUILDINGS.find((item) => item.name === "3号楼") ?? BUILDINGS[2];
  const todayRepairs = WORK_ORDERS.filter((order) => order.time.startsWith("今天")).length;
  return {
    id: "mworkbench",
    ...managerTabFooter("workbench", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="home-content with-tab-footer" data-testid="mgr-workbench-screen">
          <section className="home-hero mgr-hero">
            <p className="mgr-greeting">
              {greeting()}，{MANAGER.name}
            </p>
            <p className="mgr-date">
              {TODAY} · {MANAGER.role}
            </p>
          </section>

          <section className="home-cards">
            <article className="card mgr-stats">
              <div className="stat-item">
                <strong>{building3.occupied}</strong>
                <span>在住</span>
              </div>
              <div className="stat-item">
                <strong>{building3.beds - building3.occupied}</strong>
                <span>空床</span>
              </div>
              <div className="stat-item">
                <strong>{todayRepairs}</strong>
                <span>今日报修</span>
              </div>
            </article>

            <button
              type="button"
              className="primary-btn mgr-cta"
              onClick={() => flow.replace(checkTabScreen(tabFooterHeight))}
            >
              <IconClipboardCheck size={20} stroke={1.9} />
              开始查寝
            </button>

            <article className="card mgr-todo">
              <h2 className="card-title">今日待办</h2>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.push(moveInScreen(tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-blue">
                  <IconBed size={20} stroke={1.7} />
                </span>
                <span className="menu-label">待入住办理</span>
                <span className="todo-count">{PENDING_STUDENTS.length} 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.push(checkoutScreen(tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-orange">
                  <IconDoorExit size={20} stroke={1.7} />
                </span>
                <span className="menu-label">待退宿确认</span>
                <span className="todo-count">{CHECKOUTS.length} 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(ordersScreen(tabFooterHeight, "处理中"))}
              >
                <span className="menu-icon menu-icon-green">
                  <IconTool size={20} stroke={1.7} />
                </span>
                <span className="menu-label">维修中工单</span>
                <span className="todo-count">3 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
            </article>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function CheckoutList({
  flow,
  tabFooterHeight,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
}) {
  return (
    <main className="checkout-content" data-testid="checkout-screen">
      <p className="checkout-tip">
        <IconInfoCircle size={14} stroke={1.8} />
        确认前请核对学生信息与退宿申请
      </p>
      <section className="card checkout-list" aria-label="退宿申请列表">
        {CHECKOUTS.map((item) => (
          <div key={item.id} className="checkout-row">
            <span className="avatar checkout-avatar">{item.name.charAt(0)}</span>
            <div className="checkout-info">
              <div className="checkout-head">
                <p className="checkout-name">{item.name}</p>
                <span className="status-chip status-orange">待退宿</span>
              </div>
              <p className="checkout-sub">
                <IconBuildingCommunity size={13} stroke={1.8} />
                {item.studentId} · {item.room}
              </p>
              <p className="checkout-time">
                <IconClock size={13} stroke={1.8} />
                申请时间 {item.time}
              </p>
            </div>
            <button
              type="button"
              className="checkout-btn"
              onClick={() => flow.push(checkoutResultScreen(item, tabFooterHeight))}
            >
              <IconCircleCheck size={14} stroke={2} />
              确认退宿
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

function checkoutScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "checkout",
    header: screenHeader("退宿确认", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <CheckoutList flow={flow} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function checkoutResultScreen(
  item: (typeof CHECKOUTS)[number],
  tabFooterHeight: number,
): FlowScreen {
  return {
    id: `checkout-result-${item.id}`,
    header: screenHeader("办理结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="checkout-result-screen">
          <span className="success-icon">
            <IconCircleCheck size={64} stroke={1.4} />
          </span>
          <h2 className="success-title">退宿办理成功</h2>
          <p className="success-sub">
            {item.name} · {item.room}
          </p>
          <p className="success-desc">
            床位已释放 · 门禁已关闭
            <br />
            相关押金与水电费用已清零
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(managerHomeScreen(tabFooterHeight))}
          >
            返回工作台
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function CheckForm({
  flow,
  tabFooterHeight,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
}) {
  const [floor, setFloor] = useState("5F");
  const [statuses, setStatuses] = useState<Record<string, "ok" | "issue">>({});
  const rooms = checkRoomsForFloor(floor);
  const issueCount = rooms.filter((room) => statuses[room.id] === "issue").length;

  return (
    <main className="check-content with-tab-footer" data-testid="check-screen">
      <div className="list-head-sticky">
        <div className="form-group">
          <span className="form-label">楼栋</span>
          <div className="readonly-field">
            <IconBuildingCommunity size={18} stroke={1.7} />
            <span>3号楼</span>
          </div>
        </div>

        <div className="form-group">
          <span className="form-label">楼层</span>
          <div className="chip-grid" role="group" aria-label="楼层">
            {FLOORS.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip${floor === item ? " selected" : ""}`}
                aria-pressed={floor === item}
                onClick={() => setFloor(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">寝室查寝 · {floor}</span>
        <section className="card check-list" aria-label="寝室列表">
          {rooms.map((room) => {
            const status = statuses[room.id] ?? "ok";
            return (
              <div key={room.id} className="check-room">
                <div className="check-room-info">
                  <span className="check-room-no">{room.id}室</span>
                  <span className="check-room-people">
                    在寝 {room.present}/{room.residents}
                  </span>
                </div>
                <div className="check-room-actions">
                  <button
                    type="button"
                    className={`mini-chip${status === "ok" ? " selected" : ""}`}
                    aria-pressed={status === "ok"}
                    onClick={() => setStatuses((prev) => ({ ...prev, [room.id]: "ok" }))}
                  >
                    正常
                  </button>
                  <button
                    type="button"
                    className={`mini-chip danger${status === "issue" ? " selected" : ""}`}
                    aria-pressed={status === "issue"}
                    onClick={() => setStatuses((prev) => ({ ...prev, [room.id]: "issue" }))}
                  >
                    异常
                  </button>
                </div>
              </div>
            );
          })}
        </section>
        {issueCount > 0 && <p className="check-summary">已标记异常 {issueCount} 间</p>}
      </div>

      <p className="form-hint-note check-hint">
        <IconInfoCircle size={14} stroke={1.8} />
        提交后自动同步至楼栋台账
      </p>
      <button
        type="button"
        className="primary-btn check-submit"
        onClick={() =>
          flow.push(checkResultScreen({ floor, rooms, statuses }, tabFooterHeight))
        }
      >
        <IconClipboardCheck size={20} stroke={1.9} />
        提交查寝
      </button>
    </main>
  );
}

function checkTabScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "check",
    header: screenHeader("查寝打卡"),
    headerHeight: HEADER_HEIGHT,
    ...managerTabFooter("check", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <CheckForm flow={flow} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

type CheckResultPayload = {
  floor: string;
  rooms: ReturnType<typeof checkRoomsForFloor>;
  statuses: Record<string, "ok" | "issue">;
};

function checkResultScreen(payload: CheckResultPayload, tabFooterHeight: number): FlowScreen {
  const total = payload.rooms.length;
  const issueRooms = payload.rooms.filter((room) => payload.statuses[room.id] === "issue");
  const normal = total - issueRooms.length;

  return {
    id: "check-result",
    header: screenHeader("查寝结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="check-result-screen">
          <span className="success-icon">
            <IconClipboardCheck size={64} stroke={1.4} />
          </span>
          <h2 className="success-title">查寝已提交</h2>
          <p className="success-sub">
            3号楼 {payload.floor} · {total} 间寝室
          </p>
          <p className="success-desc">
            本次共查 {total} 间，正常 {normal} · 异常 {issueRooms.length}
            <br />
            {issueRooms.length > 0
              ? `异常寝室：${issueRooms.map((room) => `${room.id}室`).join("、")}，已同步至台账`
              : "查寝结果已同步至楼栋台账"}
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(managerHomeScreen(tabFooterHeight))}
          >
            返回工作台
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function MoveInForm({
  flow,
  tabFooterHeight,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
}) {
  const [keyword, setKeyword] = useState("");
  const [found, setFound] = useState<(typeof PENDING_STUDENTS)[number] | null>(null);
  const [noMatch, setNoMatch] = useState(false);
  const [building, setBuilding] = useState("3号楼");
  const [room, setRoom] = useState("521室");

  const searchStudent = () => {
    const kw = keyword.trim();
    const match = PENDING_STUDENTS.find(
      (student) => student.name.includes(kw) || student.studentId.includes(kw),
    );
    if (match) {
      setFound(match);
      setNoMatch(false);
    } else {
      setFound(null);
      setNoMatch(true);
    }
  };

  return (
    <main className="report-content" data-testid="movein-screen">
      <div className="form-group">
        <label className="form-label" htmlFor="movein-search">
          学生学号 / 姓名
        </label>
        <div className="search-row">
          <KeyboardInput
            id="movein-search"
            className="form-input search-input"
            placeholder="如：2025081205 或 许子墨"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
          />
          <button
            type="button"
            className="search-btn"
            aria-label="查询学生"
            disabled={keyword.trim().length === 0}
            onClick={searchStudent}
          >
            <IconSearch size={18} stroke={1.9} />
          </button>
        </div>
        {keyword.length > 0 && !found && (
          <p className="form-hint-note search-hint">
            <IconInfoCircle size={14} stroke={1.8} />
            {noMatch ? "未找到该学生，请核对学号或姓名" : "输入后点击查询按钮查找学生"}
          </p>
        )}
      </div>

      {!found ? (
        <p className="form-hint-note">
          <IconInfoCircle size={14} stroke={1.8} />
         输入学号或姓名查询学生后分配床位
        </p>
      ) : (
        <>
          <div className="form-group">
            <span className="form-label">学生信息</span>
            <section className="card student-result">
              <span className="avatar avatar-sm">{found.name.charAt(0)}</span>
              <div className="student-meta">
                <p className="student-name">{found.name}</p>
                <p className="student-sub">
                  {found.studentId} · {found.major}
                </p>
              </div>
              <span className="status-chip status-blue">待分配</span>
            </section>
          </div>

          <div className="form-group">
            <span className="form-label">分配楼栋</span>
            <div className="chip-grid" role="group" aria-label="分配楼栋">
              {["1号楼", "2号楼", "3号楼"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip${building === item ? " selected" : ""}`}
                  aria-pressed={building === item}
                  onClick={() => setBuilding(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <span className="form-label">分配房间</span>
            <div className="chip-grid" role="group" aria-label="分配房间">
              {["521室", "525室", "526室", "527室"].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`chip${room === item ? " selected" : ""}`}
                  aria-pressed={room === item}
                  onClick={() => setRoom(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="primary-btn movein-submit"
            onClick={() => flow.push(moveInResultScreen(found, building, room, tabFooterHeight))}
          >
            <IconBed size={20} stroke={1.9} />
            确认办理入住
          </button>
        </>
      )}
    </main>
  );
}

function moveInScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "movein",
    header: screenHeader("入住办理", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <MoveInForm flow={flow} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function moveInResultScreen(
  student: (typeof PENDING_STUDENTS)[number],
  building: string,
  room: string,
  tabFooterHeight: number,
): FlowScreen {
  return {
    id: "movein-result",
    header: screenHeader("办理结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="movein-result-screen">
          <span className="success-icon">
            <IconCircleCheck size={64} stroke={1.4} />
          </span>
          <h2 className="success-title">入住办理成功</h2>
          <p className="success-sub">
            {student.name} · {building} {room}
          </p>
          <p className="success-desc">
            床位已分配 · 门禁已开通
            <br />
            请通知学生前往入住并完成登记
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(managerHomeScreen(tabFooterHeight))}
          >
            返回工作台
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function OrdersList({
  flow,
  tabFooterHeight,
  initialFilter,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
  initialFilter?: string;
}) {
  const [filter, setFilter] = useState(initialFilter ?? "全部");
  const filters = ["全部", "待接单", "处理中", "已完成"];
  const orders = filter === "全部" ? WORK_ORDERS : WORK_ORDERS.filter((o) => o.status === filter);

  return (
    <main className="orders-content with-tab-footer" data-testid="orders-screen">
      <div className="list-head-sticky">
        <div className="filter-chips" role="group" aria-label="工单筛选">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${filter === item ? " selected" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <section className="card order-list" aria-label="工单列表">
        {orders.length === 0 ? (
          <EmptyState text="暂无该状态的工单" />
        ) : (
          orders.map((order) => (
            <button
              key={order.id}
              type="button"
              className="order-row"
              onClick={() => flow.push(orderDetailScreen(order.id, tabFooterHeight))}
            >
              <div className="order-head">
                <span className="order-room">{order.room}</span>
                <span className={`status-chip status-${statusTone(order.status)}`}>
                  {order.status}
                </span>
              </div>
              <p className="order-type">
                {order.type} · {order.assignee}
              </p>
              <p className="order-time">
                {order.id} · {order.time}
              </p>
            </button>
          ))
        )}
      </section>
    </main>
  );
}

function statusTone(status: string) {
  if (status === "已完成") return "green";
  if (status === "处理中") return "blue";
  return "orange";
}

function ordersScreen(tabFooterHeight: number, initialFilter?: string): FlowScreen {
  return {
    id: "orders",
    header: screenHeader("维修工单"),
    headerHeight: HEADER_HEIGHT,
    ...managerTabFooter("orders", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <OrdersList
          flow={flow}
          tabFooterHeight={tabFooterHeight}
          initialFilter={initialFilter}
        />
      </MobileScroll>
    ),
  };
}

function orderDetailScreen(orderId: string, tabFooterHeight: number): FlowScreen {
  const order = WORK_ORDERS.find((item) => item.id === orderId) ?? WORK_ORDERS[0];
  const steps = ["提交报修", "维修接单", "维修完成"];
  const stepIndex = order.status === "已完成" ? 2 : order.status === "处理中" ? 1 : 0;

  return {
    id: `order-${order.id}`,
    header: screenHeader("工单详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    footer: () => (
      <div className="form-footer">
        <button type="button" className="primary-btn footer-btn">
          <IconPhone size={20} stroke={1.9} />
          {order.status === "待接单" ? "指派维修师傅" : "联系维修师傅"}
        </button>
      </div>
    ),
    footerHeight: formFooterHeight(tabFooterHeight),
    render: () => (
      <MobileScroll className="app-screen">
        <main className="order-detail" data-testid="order-detail-screen">
          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">工单号</span>
              <span className="detail-value">{order.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">房间</span>
              <span className="detail-value">{order.room}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">故障类型</span>
              <span className="detail-value">{order.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">维修师傅</span>
              <span className="detail-value">{order.assignee}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">状态</span>
              <span className={`status-chip status-${statusTone(order.status)}`}>{order.status}</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">问题描述</span>
              <span className="detail-value">{order.desc}</span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">进度跟踪</h2>
            <ol className="timeline">
              {steps.map((step, index) => (
                <li key={step} className={index <= stepIndex ? "done" : ""}>
                  {step}
                  <time>
                    {index === 0 ? order.time : index === 1 && order.status !== "待接单" ? "今天 10:02" : ""}
                  </time>
                </li>
              ))}
            </ol>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function managerProfileScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "mprofile",
    header: screenHeader("我的"),
    headerHeight: HEADER_HEIGHT,
    ...managerTabFooter("mprofile", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="profile-content with-tab-footer" data-testid="mgr-profile-screen">
          <section className="card profile-card">
            <span className="avatar">王</span>
            <div className="profile-meta">
              <p className="profile-name">{MANAGER.name}</p>
              <p className="profile-sub">{MANAGER.role}</p>
            </div>
          </section>

          <section className="card detail-card profile-info-card">
            <div className="detail-row">
              <span className="detail-label">工号</span>
              <span className="detail-value">M-0012</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">岗位</span>
              <span className="detail-value">宿管员</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">负责楼栋</span>
              <span className="detail-value">3号楼</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">入职年份</span>
              <span className="detail-value">2021</span>
            </div>
          </section>
          <p className="profile-footer">晨曦大学 · 宿舍管理系统</p>
        </main>
      </MobileScroll>
    ),
  };
}

function maintenanceHomeScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "mtworkbench",
    ...maintenanceTabFooter("mtworkbench", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="home-content with-tab-footer mt-home" data-testid="mt-workbench-screen">
          <section className="home-hero mgr-hero">
            <p className="mgr-greeting">
              {greeting()}，{MAINTENANCE.name}
            </p>
            <p className="mgr-date">
              {TODAY} · {MAINTENANCE.role}
            </p>
          </section>

          <section className="home-cards">
            <article className="card mgr-stats">
              <div className="stat-item">
                <strong>7</strong>
                <span>今日工单</span>
              </div>
              <div className="stat-item">
                <strong>4</strong>
                <span>待接单</span>
              </div>
              <div className="stat-item">
                <strong>3</strong>
                <span>处理中</span>
              </div>
            </article>

            <button
              type="button"
              className="primary-btn mgr-cta"
              onClick={() => flow.replace(mtOrdersScreen(tabFooterHeight, "待接单"))}
            >
              <IconPlayerPlay size={20} stroke={1.9} />
              去接单大厅
            </button>

            <article className="card mgr-todo">
              <h2 className="card-title">今日待办</h2>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(mtOrdersScreen(tabFooterHeight, "处理中"))}
              >
                <span className="menu-icon menu-icon-blue">
                  <IconTool size={20} stroke={1.7} />
                </span>
                <span className="menu-label">处理中工单</span>
                <span className="todo-count">3 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(mtOrdersScreen(tabFooterHeight, "已完成"))}
              >
                <span className="menu-icon menu-icon-purple">
                  <IconCircleCheck size={20} stroke={1.7} />
                </span>
                <span className="menu-label">今日已完成</span>
                <span className="todo-count">3 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
            </article>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function MaintenanceOrders({
  flow,
  tabFooterHeight,
  initialFilter,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
  initialFilter?: string;
}) {
  const [filter, setFilter] = useState(initialFilter ?? "全部");
  const filters = ["全部", "待接单", "处理中", "已完成"];
  const orders = filter === "全部" ? WORK_ORDERS : WORK_ORDERS.filter((o) => o.status === filter);

  return (
    <main className="orders-content with-tab-footer" data-testid="mt-orders-screen">
      <div className="list-head-sticky">
        <div className="filter-chips" role="group" aria-label="工单筛选">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${filter === item ? " selected" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <section className="card order-list" aria-label="工单列表">
        {orders.map((order) => (
          <button
            key={order.id}
            type="button"
            className="order-row"
            onClick={() => flow.push(mtOrderDetailScreen(order.id, tabFooterHeight))}
          >
            <div className="order-head">
              <span className="order-room">{order.room}</span>
              <span className={`status-chip status-${statusTone(order.status)}`}>{order.status}</span>
            </div>
            <p className="order-type">
              {order.type} · {order.assignee}
            </p>
            <p className="order-time">
              {order.id} · {order.time}
            </p>
          </button>
        ))}
      </section>
    </main>
  );
}

function mtOrdersScreen(tabFooterHeight: number, initialFilter?: string): FlowScreen {
  return {
    id: "mtorders",
    header: screenHeader("我的工单"),
    headerHeight: HEADER_HEIGHT,
    ...maintenanceTabFooter("mtorders", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <MaintenanceOrders
          flow={flow}
          tabFooterHeight={tabFooterHeight}
          initialFilter={initialFilter}
        />
      </MobileScroll>
    ),
  };
}

function mtOrderDetailScreen(orderId: string, tabFooterHeight: number): FlowScreen {
  const order = WORK_ORDERS.find((item) => item.id === orderId) ?? WORK_ORDERS[0];
  const steps = ["提交报修", "维修接单", "维修完成"];
  const stepIndex = order.status === "已完成" ? 2 : order.status === "处理中" ? 1 : 0;

  return {
    id: `mt-order-${order.id}`,
    header: screenHeader("工单详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    footer: (flow) => (
      <div className="form-footer">
        {order.status === "待接单" ? (
          <button
            type="button"
            className="primary-btn footer-btn"
            onClick={() => flow.push(mtAcceptSuccessScreen(tabFooterHeight))}
          >
            <IconPlayerPlay size={20} stroke={1.9} />
            立即接单
          </button>
        ) : order.status === "处理中" ? (
          <button
            type="button"
            className="primary-btn footer-btn"
            onClick={() => flow.push(mtFinishScreen(order.id, tabFooterHeight))}
          >
            <IconChecklist size={20} stroke={1.9} />
            上报完工
          </button>
        ) : (
          <button type="button" className="secondary-btn footer-btn" disabled>
            <IconCircleCheck size={20} stroke={1.9} />
            工单已完成
          </button>
        )}
      </div>
    ),
    footerHeight: formFooterHeight(tabFooterHeight),
    render: () => (
      <MobileScroll className="app-screen">
        <main className="order-detail" data-testid="mt-order-detail-screen">
          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">工单号</span>
              <span className="detail-value">{order.id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">房间</span>
              <span className="detail-value">{order.room}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">故障类型</span>
              <span className="detail-value">{order.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">报修时间</span>
              <span className="detail-value">{order.time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">状态</span>
              <span className={`status-chip status-${statusTone(order.status)}`}>{order.status}</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">问题描述</span>
              <span className="detail-value">{order.desc}</span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">进度跟踪</h2>
            <ol className="timeline">
              {steps.map((step, index) => (
                <li key={step} className={index <= stepIndex ? "done" : ""}>
                  {step}
                  <time>
                    {index === 0 ? order.time : index === 1 && order.status !== "待接单" ? "今天 10:02" : ""}
                  </time>
                </li>
              ))}
            </ol>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function mtAcceptSuccessScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "mt-accept-success",
    header: screenHeader("接单结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="mt-accept-success-screen">
          <span className="success-icon">
            <IconPlayerPlay size={60} stroke={1.4} />
          </span>
          <h2 className="success-title">接单成功</h2>
          <p className="success-sub">WO-20260812-001 · 3号楼 520室</p>
          <p className="success-desc">
            请尽快联系学生并上门处理
            <br />
            处理完成后记得上报完工
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(maintenanceTabScreen("mtorders", tabFooterHeight))}
          >
            返回工单列表
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function MtFinishForm({
  flow,
  orderId,
  tabFooterHeight,
}: {
  flow: FlowControls;
  orderId: string;
  tabFooterHeight: number;
}) {
  const order = WORK_ORDERS.find((item) => item.id === orderId) ?? WORK_ORDERS[0];
  const [summary, setSummary] = useState("");
  const [part, setPart] = useState("无配件");

  return (
    <main className="report-content mt-finish-content" data-testid="mt-finish-screen">
      <div className="form-group">
        <span className="form-label">工单信息</span>
        <div className="readonly-field">
          <IconBuildingCommunity size={18} stroke={1.7} />
          <span>
            {order.room} · {order.type}
          </span>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="mt-summary">
          维修说明
        </label>
        <KeyboardTextarea
          id="mt-summary"
          className="form-textarea"
          rows={5}
          placeholder="请填写处理过程与结果，例如：更换花洒软管并测试正常"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">更换配件</span>
        <div className="chip-grid" role="group" aria-label="更换配件">
          {["无配件", "软管", "灯管", "锁芯", "其他"].map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${part === item ? " selected" : ""}`}
              aria-pressed={part === item}
              onClick={() => setPart(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="primary-btn movein-submit"
        onClick={() => flow.push(mtFinishSuccessScreen(orderId, tabFooterHeight))}
      >
        <IconChecklist size={20} stroke={1.9} />
        确认完工
      </button>
    </main>
  );
}

function mtFinishScreen(orderId: string, tabFooterHeight: number): FlowScreen {
  return {
    id: "mt-finish",
    header: screenHeader("上报完工", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <MtFinishForm flow={flow} orderId={orderId} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function mtFinishSuccessScreen(orderId: string, tabFooterHeight: number): FlowScreen {
  const order = WORK_ORDERS.find((item) => item.id === orderId) ?? WORK_ORDERS[0];
  return {
    id: "mt-finish-success",
    header: screenHeader("完工结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="mt-finish-success-screen">
          <span className="success-icon">
            <IconCircleCheck size={64} stroke={1.4} />
          </span>
          <h2 className="success-title">完工已上报</h2>
          <p className="success-sub">{order.id} · {order.room}</p>
          <p className="success-desc">
            等待学生确认后自动归档
            <br />
            如需补充说明可联系宿管员
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(maintenanceTabScreen("mtorders", tabFooterHeight))}
          >
            返回工单列表
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function maintenanceProfileScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "mtprofile",
    header: screenHeader("我的"),
    headerHeight: HEADER_HEIGHT,
    ...maintenanceTabFooter("mtprofile", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="profile-content with-tab-footer" data-testid="mt-profile-screen">
          <section className="card profile-card">
            <span className="avatar">李</span>
            <div className="profile-meta">
              <p className="profile-name">{MAINTENANCE.name}</p>
              <p className="profile-sub">{MAINTENANCE.role}</p>
            </div>
          </section>

          <section className="card detail-card profile-info-card">
            <div className="detail-row">
              <span className="detail-label">工号</span>
              <span className="detail-value">W-0087</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">岗位</span>
              <span className="detail-value">维修师傅</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">技能范围</span>
              <span className="detail-value">水电 / 家具</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">负责楼栋</span>
              <span className="detail-value">3号楼</span>
            </div>
          </section>
          <p className="profile-footer">晨曦大学 · 宿舍管理系统</p>
        </main>
      </MobileScroll>
    ),
  };
}

function CounselorStudents({
  flow,
  tabFooterHeight,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
}) {
  const [building, setBuilding] = useState("全部");
  const [keyword, setKeyword] = useState("");
  const buildings = ["全部", "1号楼", "2号楼", "3号楼"];
  const keywordTrimmed = keyword.trim().toLowerCase();
  const students = CSTUDENTS.filter(
    (student) =>
      (building === "全部" || student.room.startsWith(building)) &&
      (keywordTrimmed.length === 0 ||
        student.name.toLowerCase().includes(keywordTrimmed) ||
        student.studentId.includes(keywordTrimmed)),
  );

  return (
    <main className="orders-content with-tab-footer" data-testid="counselor-students-screen">
      <div className="list-head-sticky">
        <SearchBarInput
          label="搜索学生"
          placeholder="搜索学号或姓名"
          value={keyword}
          onChange={setKeyword}
        />
        <div className="filter-chips" role="group" aria-label="楼栋筛选">
          {buildings.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${building === item ? " selected" : ""}`}
              aria-pressed={building === item}
              onClick={() => setBuilding(item)}
            >
              {item}
            </button>
          ))}
        </div>
        {keywordTrimmed.length > 0 && (
          <p className="search-result-count">找到 {students.length} 名学生</p>
        )}
      </div>
      <section className="card checkout-list" aria-label="学生列表">
        {students.length === 0 ? (
          <EmptyState text="未找到匹配的学生" />
        ) : (
          students.map((student) => (
            <button
              key={student.id}
              type="button"
              className="checkout-row student-row"
              onClick={() => flow.push(studentDetailScreen(student.id))}
            >
              <span className="avatar checkout-avatar">{student.name.charAt(0)}</span>
              <div className="checkout-info">
                <div className="checkout-head">
                  <p className="checkout-name">{student.name}</p>
                  <span
                    className={`status-chip ${student.status === "在寝" ? "status-green" : "status-gray"}`}
                  >
                    {student.status}
                  </span>
                </div>
                <p className="checkout-sub">{student.studentId}</p>
                <p className="checkout-time">
                  <IconBuildingCommunity size={13} stroke={1.8} />
                  {student.room}
                </p>
              </div>
              <IconChevronRight size={18} stroke={1.7} className="row-chevron" />
            </button>
          ))
        )}
      </section>
    </main>
  );
}

function studentDetailScreen(studentId: string): FlowScreen {
  const student = CSTUDENTS.find((item) => item.id === studentId) ?? CSTUDENTS[0];
  return {
    id: `student-${student.id}`,
    header: screenHeader("学生详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: () => (
      <MobileScroll className="app-screen">
        <main className="student-detail" data-testid="student-detail-screen">
          <section className="card profile-card student-profile-card">
            <span className="avatar">{student.name.charAt(0)}</span>
            <div className="profile-meta">
              <p className="profile-name">{student.name}</p>
              <p className="profile-sub">{student.studentId} · 计算机学院</p>
            </div>
            <span
              className={`status-chip ${student.status === "在寝" ? "status-green" : "status-gray"}`}
            >
              {student.status}
            </span>
          </section>

          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">宿舍</span>
              <span className="detail-value">{student.room}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">入住时间</span>
              <span className="detail-value">2024-09-01</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">晚归记录</span>
              <span className="detail-value">本月 0 次</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">宿舍状态</span>
              <span className="detail-value">{student.status}</span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">最近动态</h2>
            <div className="detail-row">
              <span className="detail-label">08-12</span>
              <span className="detail-value">查寝正常 · 在寝</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">08-11</span>
              <span className="detail-value">晚归申请已通过</span>
            </div>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function approvalTone(status: string) {
  if (status === "已通过") return "green";
  if (status === "已驳回") return "gray";
  return "orange";
}

function CounselorApprovals({
  flow,
  tabFooterHeight,
  initialFilter,
}: {
  flow: FlowControls;
  tabFooterHeight: number;
  initialFilter?: string;
}) {
  const [filter, setFilter] = useState(initialFilter ?? "全部");
  const filters = ["全部", "待审批", "已通过", "已驳回"];
  const list = filter === "全部" ? APPROVALS : APPROVALS.filter((a) => a.status === filter);

  return (
    <main className="orders-content with-tab-footer" data-testid="counselor-approvals-screen">
      <div className="list-head-sticky">
        <div className="filter-chips" role="group" aria-label="审批筛选">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip${filter === item ? " selected" : ""}`}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <section className="card message-list" aria-label="申请列表">
        {list.length === 0 ? (
          <EmptyState text="暂无该状态的申请" />
        ) : (
          list.map((approval) => {
            const Icon = approval.icon;
            return (
              <button
                key={approval.id}
                type="button"
                className="appr-row"
                onClick={() => flow.push(approvalDetailScreen(approval.id, tabFooterHeight))}
              >
                <span className="message-icon" style={{ background: approval.bg }}>
                  <Icon size={20} stroke={1.7} />
                </span>
                <span className="message-body">
                  <span className="message-head">
                    <span className="message-title">
                      {approval.type} · {approval.student}
                    </span>
                    <span className={`status-chip status-${approvalTone(approval.status)}`}>
                      {approval.status}
                    </span>
                  </span>
                  <span className="message-desc">
                    {approval.room} · {approval.time}
                  </span>
                </span>
                <IconChevronRight size={18} stroke={1.7} className="row-chevron" />
              </button>
            );
          })
        )}
      </section>
    </main>
  );
}

function approvalDetailScreen(approvalId: string, tabFooterHeight: number): FlowScreen {
  const approval = APPROVALS.find((item) => item.id === approvalId) ?? APPROVALS[0];
  const pending = approval.status === "待审批";

  return {
    id: `approval-${approval.id}`,
    header: screenHeader("申请详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    footer: pending
      ? (flow) => (
          <div className="form-footer form-footer-split">
            <button
              type="button"
              className="secondary-btn footer-btn"
              onClick={() => flow.push(approvalResultScreen(approval.id, "驳回", tabFooterHeight))}
            >
              <IconX size={18} stroke={1.9} />
              驳回
            </button>
            <button
              type="button"
              className="primary-btn footer-btn"
              onClick={() => flow.push(approvalResultScreen(approval.id, "通过", tabFooterHeight))}
            >
              <IconCheck size={18} stroke={2} />
              通过
            </button>
          </div>
        )
      : () => (
          <div className="form-footer">
            <button type="button" className="secondary-btn footer-btn" disabled>
              <IconCheck size={18} stroke={2} />
              已{approval.status === "已通过" ? "通过" : "驳回"}
            </button>
          </div>
        ),
    footerHeight: formFooterHeight(tabFooterHeight),
    render: () => (
      <MobileScroll className="app-screen">
        <main className="order-detail" data-testid="approval-detail-screen">
          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">申请类型</span>
              <span className="detail-value">{approval.type}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">学生</span>
              <span className="detail-value">{approval.student}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">宿舍</span>
              <span className="detail-value">{approval.room}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">申请时间</span>
              <span className="detail-value">{approval.time}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">状态</span>
              <span className={`status-chip status-${approvalTone(approval.status)}`}>
                {approval.status}
              </span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">事由</span>
              <span className="detail-value">{approval.desc}</span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">说明</h2>
            <p className="approval-note">请核实学生情况后审批，审批结果将即时通知学生本人。</p>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function approvalResultScreen(approvalId: string, decision: string, tabFooterHeight: number): FlowScreen {
  const approval = APPROVALS.find((item) => item.id === approvalId) ?? APPROVALS[0];
  const approved = decision === "通过";

  return {
    id: `approval-result-${approval.id}-${decision}`,
    header: screenHeader("审批结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="approval-result-screen">
          <span className="success-icon">
            {approved ? (
              <IconCheck size={64} stroke={1.5} />
            ) : (
              <IconX size={64} stroke={1.5} />
            )}
          </span>
          <h2 className="success-title">审批{approved ? "通过" : "驳回"}</h2>
          <p className="success-sub">
            {approval.type} · {approval.student}
          </p>
          <p className="success-desc">
            已通知学生审批结果
            <br />
            如需修改可前往审批记录查看
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(counselorTabScreen("capprovals", tabFooterHeight))}
          >
            返回审批列表
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function counselorCheckScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "ccheck",
    header: screenHeader("查寝结果"),
    headerHeight: HEADER_HEIGHT,
    ...counselorTabFooter("ccheck", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="orders-content with-tab-footer" data-testid="counselor-check-screen">
          <section className="card order-list" aria-label="查寝记录">
            {CHECK_RESULTS.map((item) => (
              <button
                key={item.id}
                type="button"
                className="order-row"
                onClick={() => flow.push(checkDetailScreen(item.id))}
              >
                <div className="order-head">
                  <span className="order-room">
                    {item.building} {item.floor} 查寝
                  </span>
                  <span
                    className={`status-chip ${item.issue > 0 ? "status-orange" : "status-green"}`}
                  >
                    正常 {item.normal} · 异常 {item.issue}
                  </span>
                </div>
                <p className="order-type">
                  {item.date} · 提交人 {item.submittedBy}
                </p>
                <p className="order-time">点击查看寝室明细</p>
              </button>
            ))}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function checkDetailScreen(checkId: string): FlowScreen {
  const item = CHECK_RESULTS.find((record) => record.id === checkId) ?? CHECK_RESULTS[0];
  const total = item.normal + item.issue;

  return {
    id: `check-${item.id}`,
    header: screenHeader("查寝详情", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: () => (
      <MobileScroll className="app-screen">
        <main className="order-detail" data-testid="check-detail-screen">
          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">楼栋</span>
              <span className="detail-value">
                {item.building} {item.floor}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label">查寝时间</span>
              <span className="detail-value">{item.date}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">提交人</span>
              <span className="detail-value">{item.submittedBy}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">结果</span>
              <span className="detail-value">
                正常 {item.normal} · 异常 {item.issue}
              </span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">异常率</span>
              <span className="detail-value">
                {item.issue > 0 ? `${Math.round((item.issue / total) * 100)}%` : "0%"}
              </span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">异常寝室</h2>
            {item.issues.length === 0 ? (
              <p className="empty-note">本次查寝全部正常</p>
            ) : (
              item.issues.map((issue) => (
                <div key={issue} className="detail-row">
                  <span className="detail-label">寝室</span>
                  <span className="detail-value">{issue}</span>
                </div>
              ))
            )}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function counselorStudentsScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "cstudents",
    header: screenHeader("学生住宿"),
    headerHeight: HEADER_HEIGHT,
    ...counselorTabFooter("cstudents", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <CounselorStudents flow={flow} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function counselorApprovalsScreen(tabFooterHeight: number, initialFilter?: string): FlowScreen {
  return {
    id: "capprovals",
    header: screenHeader("申请审批"),
    headerHeight: HEADER_HEIGHT,
    ...counselorTabFooter("capprovals", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <CounselorApprovals
          flow={flow}
          tabFooterHeight={tabFooterHeight}
          initialFilter={initialFilter}
        />
      </MobileScroll>
    ),
  };
}

function counselorProfileScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "cprofile",
    header: screenHeader("我的"),
    headerHeight: HEADER_HEIGHT,
    ...counselorTabFooter("cprofile", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="profile-content with-tab-footer" data-testid="counselor-profile-screen">
          <section className="card profile-card">
            <span className="avatar">陈</span>
            <div className="profile-meta">
              <p className="profile-name">{COUNSELOR.name}</p>
              <p className="profile-sub">{COUNSELOR.role}</p>
            </div>
          </section>

          <section className="card detail-card profile-info-card">
            <div className="detail-row">
              <span className="detail-label">工号</span>
              <span className="detail-value">C-0031</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">岗位</span>
              <span className="detail-value">辅导员</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">所属学院</span>
              <span className="detail-value">计算机学院</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">负责年级</span>
              <span className="detail-value">2024 级</span>
            </div>
          </section>
          <p className="profile-footer">晨曦大学 · 宿舍管理系统</p>
        </main>
      </MobileScroll>
    ),
  };
}

function counselorHomeScreen(tabFooterHeight: number): FlowScreen {
  const inDorm = CSTUDENTS.filter((student) => student.status === "在寝").length;
  const pendingApprovals = APPROVALS.filter((approval) => approval.status === "待审批").length;
  return {
    id: "cworkbench",
    ...counselorTabFooter("cworkbench", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="home-content with-tab-footer" data-testid="counselor-workbench-screen">
          <section className="home-hero mgr-hero">
            <p className="mgr-greeting">
              {greeting()}，{COUNSELOR.name}
            </p>
            <p className="mgr-date">
              {TODAY} · {COUNSELOR.role}
            </p>
          </section>

          <section className="home-cards">
            <article className="card mgr-stats">
              <div className="stat-item">
                <strong>{CSTUDENTS.length}</strong>
                <span>负责学生</span>
              </div>
              <div className="stat-item">
                <strong>{inDorm}</strong>
                <span>在寝</span>
              </div>
              <div className="stat-item">
                <strong>{pendingApprovals}</strong>
                <span>待审批</span>
              </div>
            </article>

            <article className="card mgr-todo">
              <h2 className="card-title">快捷入口</h2>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(counselorStudentsScreen(tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-blue">
                  <IconUsers size={20} stroke={1.7} />
                </span>
                <span className="menu-label">学生住宿</span>
                <span className="todo-count">{CSTUDENTS.length} 人</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(counselorApprovalsScreen(tabFooterHeight, "待审批"))}
              >
                <span className="menu-icon menu-icon-orange">
                  <IconUserCheck size={20} stroke={1.7} />
                </span>
                <span className="menu-label">待审批申请</span>
                <span className="todo-count">{pendingApprovals} 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(counselorCheckScreen(tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-green">
                  <IconClipboardCheck size={20} stroke={1.7} />
                </span>
                <span className="menu-label">查寝结果</span>
                <span className="todo-count">{CHECK_RESULTS.length} 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
            </article>

            <article className="card admin-occ">
              <h2 className="card-title">最近动态</h2>
              {APPROVALS.slice(0, 3).map((approval) => (
                <button
                  key={approval.id}
                  type="button"
                  className="appr-row"
                  onClick={() => flow.push(approvalDetailScreen(approval.id, tabFooterHeight))}
                >
                  <span className="message-icon" style={{ background: approval.bg }}>
                    <IconMoon size={18} stroke={1.7} />
                  </span>
                  <span className="message-body">
                    <span className="message-head">
                      <span className="message-title">
                        {approval.student} · {approval.type}
                      </span>
                      <span
                        className={`status-chip status-${approvalTone(approval.status)}`}
                      >
                        {approval.status}
                      </span>
                    </span>
                    <span className="message-desc">
                      {approval.room} · {approval.time}
                    </span>
                  </span>
                  <IconChevronRight size={18} stroke={1.7} className="row-chevron" />
                </button>
              ))}
            </article>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function counselorTabScreen(tab: string, tabFooterHeight: number): FlowScreen {
  if (tab === "cworkbench") return counselorHomeScreen(tabFooterHeight);
  if (tab === "capprovals") return counselorApprovalsScreen(tabFooterHeight);
  if (tab === "ccheck") return counselorCheckScreen(tabFooterHeight);
  if (tab === "cprofile") return counselorProfileScreen(tabFooterHeight);
  return counselorStudentsScreen(tabFooterHeight);
}

function adminHomeScreen(tabFooterHeight: number): FlowScreen {
  const disabledAccounts = ACCOUNTS.filter((account) => account.status === "停用").length;
  return {
    id: "astats",
    ...adminTabFooter("astats", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="home-content with-tab-footer" data-testid="admin-stats-screen">
          <section className="home-hero mgr-hero">
            <p className="mgr-greeting">
              {greeting()}，{ADMIN.name}
            </p>
            <p className="mgr-date">
              {TODAY} · {ADMIN.role}
            </p>
          </section>

          <section className="home-cards">
            <article className="card admin-stat-grid">
              <div className="admin-stat-item">
                <strong>5</strong>
                <span>楼栋</span>
              </div>
              <div className="admin-stat-item">
                <strong>1120</strong>
                <span>总床位</span>
              </div>
              <div className="admin-stat-item">
                <strong>955</strong>
                <span>在住</span>
              </div>
              <div className="admin-stat-item">
                <strong>7</strong>
                <span>今日报修</span>
              </div>
            </article>

            <article className="card mgr-todo">
              <h2 className="card-title">今日概览</h2>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(adminTabScreen("aalloc", tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-orange">
                  <IconUserPlus size={20} stroke={1.7} />
                </span>
                <span className="menu-label">待分配学生</span>
                <span className="todo-count">{PENDING_STUDENTS.length} 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button
                type="button"
                className="todo-row"
                onClick={() => flow.replace(adminTabScreen("aaccounts", tabFooterHeight))}
              >
                <span className="menu-icon menu-icon-gray">
                  <IconShieldCheck size={20} stroke={1.7} />
                </span>
                <span className="menu-label">停用账号</span>
                <span className="todo-count">{disabledAccounts} 个</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button type="button" className="todo-row">
                <span className="menu-icon menu-icon-blue">
                  <IconTool size={20} stroke={1.7} />
                </span>
                <span className="menu-label">维修中工单</span>
                <span className="todo-count">3 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
              <button type="button" className="todo-row">
                <span className="menu-icon menu-icon-green">
                  <IconBed size={20} stroke={1.7} />
                </span>
                <span className="menu-label">待退宿确认</span>
                <span className="todo-count">6 条</span>
                <IconChevronRight size={18} stroke={1.7} />
              </button>
            </article>

            <article className="card admin-occ">
              <h2 className="card-title">楼栋入住率</h2>
              {BUILDINGS.map((building) => {
                const rate = Math.round((building.occupied / building.beds) * 100);
                return (
                  <button
                    key={building.id}
                    type="button"
                    className="occ-row"
                    onClick={() => flow.push(buildingDetailScreen(building.id))}
                  >
                    <span className="occ-name">{building.name}</span>
                    <span className="occ-track">
                      <span className="occ-fill" style={{ width: `${rate}%` }} />
                    </span>
                    <span className="occ-num">{rate}%</span>
                  </button>
                );
              })}
            </article>
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function adminBuildingsScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "abuildings",
    header: screenHeader("楼栋管理"),
    headerHeight: HEADER_HEIGHT,
    ...adminTabFooter("abuildings", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="orders-content with-tab-footer" data-testid="admin-buildings-screen">
          <section className="card order-list" aria-label="楼栋列表">
            {BUILDINGS.map((building) => {
              const rate = Math.round((building.occupied / building.beds) * 100);
              return (
                <button
                  key={building.id}
                  type="button"
                  className="order-row"
                  onClick={() => flow.push(buildingDetailScreen(building.id))}
                >
                  <div className="order-head">
                    <span className="order-room">{building.name}</span>
                    <span
                      className={`status-chip ${rate >= 90 ? "status-green" : "status-blue"}`}
                    >
                      入住率 {rate}%
                    </span>
                  </div>
                  <p className="order-type">
                    {building.floors} 层 · {building.rooms} 间 · {building.occupied}/
                    {building.beds} 床位
                  </p>
                  <span className="occ-track">
                    <span className="occ-fill" style={{ width: `${rate}%` }} />
                  </span>
                </button>
              );
            })}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function buildingDetailScreen(buildingId: string): FlowScreen {
  const building = BUILDINGS.find((item) => item.id === buildingId) ?? BUILDINGS[0];
  const rate = Math.round((building.occupied / building.beds) * 100);
  const roomsPerFloor = Math.round(building.rooms / building.floors);
  const floors = Array.from({ length: building.floors }, (_, index) => {
    const base = Math.floor(building.occupied / building.floors);
    const occupied = index < building.occupied % building.floors ? base + 1 : base;
    return { floor: `${index + 1}F`, rooms: roomsPerFloor, occupied };
  });

  return {
    id: `building-${building.id}`,
    header: screenHeader(`${building.name}详情`, { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: () => (
      <MobileScroll className="app-screen">
        <main className="order-detail" data-testid="building-detail-screen">
          <section className="card detail-card">
            <div className="detail-row">
              <span className="detail-label">楼层</span>
              <span className="detail-value">{building.floors} 层</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">房间</span>
              <span className="detail-value">{building.rooms} 间</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">床位</span>
              <span className="detail-value">
                {building.occupied}/{building.beds} 已住
              </span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">入住率</span>
              <span className="detail-value">{rate}%</span>
            </div>
          </section>

          <section className="card detail-card">
            <h2 className="card-title">楼层床位</h2>
            {floors.map((floor) => (
              <div key={floor.floor} className="detail-row">
                <span className="detail-label">{floor.floor}</span>
                <span className="detail-value">
                  {floor.rooms} 间 · 已住 {floor.occupied}/{floor.rooms * 4} 床位
                </span>
              </div>
            ))}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function adminAllocationScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "aalloc",
    header: screenHeader("待分配名单"),
    headerHeight: HEADER_HEIGHT,
    ...adminTabFooter("aalloc", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="orders-content with-tab-footer" data-testid="admin-allocation-screen">
          <section className="card checkout-list" aria-label="待分配学生">
            {PENDING_STUDENTS.map((student) => (
              <div key={student.id} className="checkout-row">
                <span className="avatar checkout-avatar">{student.name.charAt(0)}</span>
                <div className="checkout-info">
                  <div className="checkout-head">
                    <p className="checkout-name">{student.name}</p>
                    <span className="status-chip status-orange">待分配</span>
                  </div>
                  <p className="checkout-sub">
                    {student.studentId} · {student.major}
                  </p>
                </div>
                <button
                  type="button"
                  className="checkout-btn"
                  onClick={() => flow.push(allocationFormScreen(student.id, tabFooterHeight))}
                >
                  <IconBed size={14} stroke={2} />
                  分配
                </button>
              </div>
            ))}
          </section>
        </main>
      </MobileScroll>
    ),
  };
}

function AllocationForm({
  flow,
  student,
  tabFooterHeight,
}: {
  flow: FlowControls;
  student: (typeof PENDING_STUDENTS)[number];
  tabFooterHeight: number;
}) {
  const [building, setBuilding] = useState("3号楼");
  const [room, setRoom] = useState("521室");

  return (
    <main className="report-content" data-testid="allocation-form-screen">
      <div className="form-group">
        <span className="form-label">学生信息</span>
        <section className="card student-result">
          <span className="avatar avatar-sm">{student.name.charAt(0)}</span>
          <div className="student-meta">
            <p className="student-name">{student.name}</p>
            <p className="student-sub">
              {student.studentId} · {student.major} · 未分配宿舍
            </p>
          </div>
          <span className="status-chip status-orange">待分配</span>
        </section>
      </div>

      <div className="form-group">
        <span className="form-label">分配楼栋</span>
        <div className="chip-grid" role="group" aria-label="分配楼栋">
          {["1号楼", "2号楼", "3号楼"].map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${building === item ? " selected" : ""}`}
              aria-pressed={building === item}
              onClick={() => setBuilding(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="form-group">
        <span className="form-label">分配房间</span>
        <div className="chip-grid" role="group" aria-label="分配房间">
          {["521室", "525室", "526室", "527室"].map((item) => (
            <button
              key={item}
              type="button"
              className={`chip${room === item ? " selected" : ""}`}
              aria-pressed={room === item}
              onClick={() => setRoom(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="primary-btn movein-submit"
        onClick={() => flow.push(allocationSuccessScreen(student, building, room, tabFooterHeight))}
      >
        <IconBed size={20} stroke={1.9} />
        确认分配
      </button>
    </main>
  );
}

function allocationFormScreen(studentId: string, tabFooterHeight: number): FlowScreen {
  const student = PENDING_STUDENTS.find((item) => item.id === studentId) ?? PENDING_STUDENTS[0];
  return {
    id: `allocation-${student.id}`,
    header: screenHeader("宿舍分配", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <AllocationForm flow={flow} student={student} tabFooterHeight={tabFooterHeight} />
      </MobileScroll>
    ),
  };
}

function allocationSuccessScreen(
  student: (typeof PENDING_STUDENTS)[number],
  building: string,
  room: string,
  tabFooterHeight: number,
): FlowScreen {
  return {
    id: `allocation-result-${student.id}`,
    header: screenHeader("分配结果", { back: true }),
    headerHeight: HEADER_HEIGHT,
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="success-content" data-testid="allocation-result-screen">
          <span className="success-icon">
            <IconBed size={60} stroke={1.4} />
          </span>
          <h2 className="success-title">分配成功</h2>
          <p className="success-sub">
            {student.name} · {building} {room}
          </p>
          <p className="success-desc">
            已写入宿舍台账
            <br />
            门禁开通后将通知学生
          </p>
          <button
            type="button"
            className="primary-btn success-btn"
            onClick={() => flow.replace(adminAllocationScreen(tabFooterHeight))}
          >
            返回分配名单
          </button>
        </main>
      </MobileScroll>
    ),
  };
}

function adminAccountsScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "aaccounts",
    header: screenHeader("账号权限"),
    headerHeight: HEADER_HEIGHT,
    ...adminTabFooter("aaccounts", tabFooterHeight),
    render: () => <AdminAccountsContent />,
  };
}

function AdminAccountsContent() {
  const [keyword, setKeyword] = useState("");
  const keywordTrimmed = keyword.trim().toLowerCase();
  const accounts = keywordTrimmed
    ? ACCOUNTS.filter(
        (account) =>
          account.name.toLowerCase().includes(keywordTrimmed) ||
          account.role.includes(keywordTrimmed) ||
          account.scope.includes(keywordTrimmed),
      )
    : ACCOUNTS;

  return (
    <MobileScroll className="app-screen">
      <main className="orders-content with-tab-footer" data-testid="admin-accounts-screen">
        <div className="list-head-sticky">
          <SearchBarInput
            label="搜索账号"
            placeholder="搜索账号、角色或楼栋"
            value={keyword}
            onChange={setKeyword}
          />
          {keywordTrimmed.length > 0 && (
            <p className="search-result-count">找到 {accounts.length} 个账号</p>
          )}
        </div>
        <section className="card checkout-list" aria-label="账号列表">
          {accounts.length === 0 ? (
            <EmptyState text="未找到匹配的账号" />
          ) : (
            accounts.map((account) => (
              <div key={account.id} className="checkout-row">
                <span className="avatar checkout-avatar">{account.name.charAt(0)}</span>
                <div className="checkout-info">
                  <div className="checkout-head">
                    <p className="checkout-name">{account.name}</p>
                    <span
                      className={`status-chip ${account.status === "启用" ? "status-green" : "status-gray"}`}
                    >
                      {account.status}
                    </span>
                  </div>
                  <p className="checkout-sub">
                    {account.role} · {account.scope}
                  </p>
                </div>
                <IconKey size={18} stroke={1.7} className="row-chevron" />
              </div>
            ))
          )}
        </section>
        <p className="empty-note">权限由后勤管理处统一维护，如需调整请联系管理员。</p>
      </main>
    </MobileScroll>
  );
}

function adminProfileScreen(tabFooterHeight: number): FlowScreen {
  return {
    id: "aprofile",
    header: screenHeader("我的"),
    headerHeight: HEADER_HEIGHT,
    ...adminTabFooter("aprofile", tabFooterHeight),
    render: (flow) => (
      <MobileScroll className="app-screen">
        <main className="profile-content with-tab-footer" data-testid="admin-profile-screen">
          <section className="card profile-card">
            <span className="avatar">赵</span>
            <div className="profile-meta">
              <p className="profile-name">{ADMIN.name}</p>
              <p className="profile-sub">{ADMIN.role}</p>
            </div>
          </section>

          <section className="card detail-card profile-info-card">
            <div className="detail-row">
              <span className="detail-label">工号</span>
              <span className="detail-value">A-0001</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">岗位</span>
              <span className="detail-value">系统管理员</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">所属部门</span>
              <span className="detail-value">后勤管理处</span>
            </div>
            <div className="detail-row detail-row-last">
              <span className="detail-label">账号状态</span>
              <span className="detail-value">启用</span>
            </div>
          </section>
          <p className="profile-footer">晨曦大学 · 宿舍管理系统</p>
        </main>
      </MobileScroll>
    ),
  };
}

function adminTabScreen(tab: string, tabFooterHeight: number): FlowScreen {
  if (tab === "abuildings") return adminBuildingsScreen(tabFooterHeight);
  if (tab === "aalloc") return adminAllocationScreen(tabFooterHeight);
  if (tab === "aaccounts") return adminAccountsScreen(tabFooterHeight);
  if (tab === "aprofile") return adminProfileScreen(tabFooterHeight);
  return adminHomeScreen(tabFooterHeight);
}

function tabScreen(tab: string, tabFooterHeight: number): FlowScreen {
  if (tab === "services") return servicesScreen(tabFooterHeight);
  if (tab === "messages") return messagesScreen(tabFooterHeight);
  if (tab === "profile") return profileScreen(tabFooterHeight);
  return homeScreen(tabFooterHeight);
}

function managerTabScreen(tab: string, tabFooterHeight: number): FlowScreen {
  if (tab === "check") return checkTabScreen(tabFooterHeight);
  if (tab === "orders") return ordersScreen(tabFooterHeight);
  if (tab === "mprofile") return managerProfileScreen(tabFooterHeight);
  return managerHomeScreen(tabFooterHeight);
}

function maintenanceTabScreen(tab: string, tabFooterHeight: number): FlowScreen {
  if (tab === "mtorders") return mtOrdersScreen(tabFooterHeight);
  if (tab === "mtprofile") return maintenanceProfileScreen(tabFooterHeight);
  return maintenanceHomeScreen(tabFooterHeight);
}

function roleFromPath() {
  const path = window.location.pathname.replace(/\/+$/, "");
  if (path === "/manager") return "manager";
  if (path === "/maintenance") return "maintenance";
  if (path === "/counselor") return "counselor";
  if (path === "/admin") return "admin";
  return "student";
}

export default function Prototype() {
  const { device } = useMobileDevice();
  const tabFooterHeight = TAB_BAR_HEIGHT + bottomPad(device.platform);
  const role = roleFromPath();
  const initial =
    role === "manager"
      ? managerHomeScreen(tabFooterHeight)
      : role === "maintenance"
        ? maintenanceHomeScreen(tabFooterHeight)
        : role === "counselor"
          ? counselorHomeScreen(tabFooterHeight)
          : role === "admin"
            ? adminHomeScreen(tabFooterHeight)
            : homeScreen(tabFooterHeight);

  return (
    <>
      <FlowStack initial={initial} />
      {device.platform === "ios" && <div className="ios-safe-mask" aria-hidden="true" />}
    </>
  );
}

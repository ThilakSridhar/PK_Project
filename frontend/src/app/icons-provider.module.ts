import { NgModule } from "@angular/core";
import { NZ_ICONS, NzIconModule } from "ng-zorro-antd/icon";

import {
  AppstoreOutline,
  BookOutline,
  CheckSquareOutline,
  ClockCircleOutline,
  ContactsOutline,
  CrownOutline,
  DownloadOutline,
  FieldTimeOutline,
  HomeOutline,
  LockOutline,
  MailOutline,
  PieChartOutline,
  PlusOutline,
  PrinterOutline,
  SettingOutline,
  TeamOutline,
  UserOutline,
  SwapOutline,
  SnippetsOutline,
  DatabaseOutline,
  LogoutOutline,
  FileDoneOutline,
} from "@ant-design/icons-angular/icons";

const icons = [
  AppstoreOutline,
  BookOutline,
  CheckSquareOutline,
  ClockCircleOutline,
  ContactsOutline,
  CrownOutline,
  DownloadOutline,
  FieldTimeOutline,
  HomeOutline,
  LockOutline,
  MailOutline,
  PieChartOutline,
  PlusOutline,
  PrinterOutline,
  SettingOutline,
  TeamOutline,
  UserOutline,
  SwapOutline,
  SnippetsOutline,
  DatabaseOutline,
  LogoutOutline,
  FileDoneOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}

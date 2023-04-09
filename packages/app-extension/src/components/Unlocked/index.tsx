import { BalancesIcon, MessageBubbleIcon } from "@coral-xyz/react-common";
import { useBootstrapFast } from "@coral-xyz/recoil";
import { useCustomTheme } from "@coral-xyz/themes";

import { Spotlight } from "../../spotlight/Spotlight";
import { Tab } from "../common/Layout/Navigators/Tab";
import { Router } from "../common/Layout/Router";
import { WithTabs } from "../common/Layout/Tab";
import { NotificationIconWithBadge } from "../common/NotificationIconWithBadge";
import { WalletDrawerProvider } from "../common/WalletList";

import { AvatarPopoverButton } from "./Settings/AvatarPopover";
import { ApproveTransactionRequest } from "./ApproveTransactionRequest";
import { PrimaryPubkeySelector } from "./PrimaryPubkeySelector";
import { WithVersion } from "./WithVersion";

//
// The main nav persistent stack.
//
export function Unlocked() {
  useBootstrapFast();
  const newLayout = true;
  return (
    <WithVersion>
      {newLayout ? <_UnlockedNewLayout /> : <_Unlocked />}
    </WithVersion>
  );
}

function _Unlocked() {
  return (
    <WalletDrawerProvider>
      <Spotlight />
      <WithTabs>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          <Router />
          <ApproveTransactionRequest />
          <PrimaryPubkeySelector />
        </div>
      </WithTabs>
    </WalletDrawerProvider>
  );
}

function _UnlockedNewLayout() {
  return (
    <Tab.Navigator
      initialRouteName="wallet"
      options={({ route }: any) => ({
        tabBarIcon: ({ focused }: { focused: boolean }) => {
          switch (route.name) {
            case "wallet":
              return <WalletTabIcon focused={focused} />;
            case "notifications":
              return <NotificationsTabIcon focused={focused} />;
            case "messages":
              return <ChatTabIcon focused={focused} />;
            case "profile":
              return <ProfileTabIcon focused={focused} />;
            default:
              return <WalletTabIcon focused={focused} />;
          }
        },
        tabBarActiveTintColor: "",
        tabBarInactiveTintColor: "",
      })}
    >
      <Tab.Screen name="wallet" component={WalletNavigator} />
      <Tab.Screen name="notifications" component={NotificationsNavigator} />
      <Tab.Screen name="messages" component={ChatNavigator} />
      <Tab.Screen name="profile" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

function WalletNavigator() {
  return <div>WALLET HERE</div>;
}

function NotificationsNavigator() {
  return <div>NOTIFICATIONS HERE</div>;
}

function ChatNavigator() {
  return <div>CHAT HERE</div>;
}

function ProfileNavigator() {
  return <div>PROFILE HERE </div>;
}

function WalletTabIcon({ focused }: { focused: boolean }) {
  const theme = useCustomTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <BalancesIcon
        fill={
          focused ? theme.custom.colors.brandColor : theme.custom.colors.icon
        }
        style={{
          width: "20px",
          height: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}

function NotificationsTabIcon({ focused }: { focused: boolean }) {
  const theme = useCustomTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <NotificationIconWithBadge
        style={{
          color: focused
            ? theme.custom.colors.brandColor
            : theme.custom.colors.icon,
          backgroundColor: "transparent",
          borderRadius: "12px",
          width: "26px",
          height: "26px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}

function ChatTabIcon({ focused }: { focused: boolean }) {
  const theme = useCustomTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <MessageBubbleIcon
        fill={
          focused ? theme.custom.colors.brandColor : theme.custom.colors.icon
        }
        style={{
          width: "20px",
          height: "20px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}

function ProfileTabIcon({ focused }: { focused: boolean }) {
  const theme = useCustomTheme();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <AvatarPopoverButton
        buttonStyle={{
          width: "32px",
          height: "32px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        imgStyle={{
          width: "30px",
          height: "30px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      />
    </div>
  );
}

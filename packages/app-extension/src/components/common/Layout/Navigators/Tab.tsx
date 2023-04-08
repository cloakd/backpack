import React, { useContext, useState } from "react";
import { useCustomTheme } from "@coral-xyz/themes";
import { Box } from "@mui/material";

const View = (props: any) => <div {...props} />;

export const Tab = {
  Navigator,
  Screen,
  Icon,
};

function Navigator({
  children,
  style,
  top,
  disableScroll,
  options,
  initialRouteName,
}: {
  children: any;
  style?: React.CSSProperties;
  top?: boolean;
  disableScroll?: boolean;
  options?: TabsOptions;
  initialRouteName?: string;
}) {
  const isArray = children && children.length !== undefined;
  const childrenArray = isArray ? children : [children];
  const initialTab = !children
    ? null
    : initialRouteName || childrenArray[0].props.name;
  return (
    <TabProvider initialTab={initialTab} options={options}>
      {top ? (
        <View
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabBar tabScreens={childrenArray} style={style} />
          <TabContent
            tabScreens={childrenArray}
            disableScroll={disableScroll}
          />
        </View>
      ) : (
        <View
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TabContent
            tabScreens={childrenArray}
            disableScroll={disableScroll}
          />
          <TabBar tabScreens={childrenArray} style={style} />
        </View>
      )}
    </TabProvider>
  );
}

function Screen({ name, component }: TabProps) {
  // eslint-disable-next-line
  return <></>;
}

function TabContent({ tabScreens, disableScroll }: any) {
  const { activeTab } = useTabContext();
  const screen = tabScreens.find((t: any) => t.props.name === activeTab);
  const inner = (
    <View
      style={{
        flex: 1,
        height: "100%",
      }}
    >
      {screen.props.component()}
    </View>
  );
  return inner;
}

function TabBar({ tabScreens, style }: any) {
  const theme = useCustomTheme();
  const { activeTab, options, setActiveTab } = useTabContext();
  return (
    <View
      style={{
        display: "flex",
        width: "100%",
        backgroundColor: theme.custom.colors.nav,
        height: "64px",
        borderTop: `solid 1pt ${theme.custom.colors.border}`,
        ...style,
      }}
    >
      {tabScreens.map((screen: any) => {
        const routedOptions = options({ route: { name: screen.props.name } });
        const focused = activeTab === screen.props.name;
        const color = focused
          ? routedOptions.tabBarActiveTintColor
          : routedOptions.tabBarInactiveTintColor;
        return (
          <Box
            key={screen.props.name}
            style={{
              padding: 0,
              height: "100%",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              background: "transparent",
              borderRadius: 0,
              position: "relative",
              ...routedOptions.tabBarStyle,
            }}
            sx={{
              "&:hover": {
                cursor: "pointer",
              },
            }}
            onClick={() => setActiveTab(screen.props.name)}
          >
            <View style={{ width: "100%", height: "100%" }}>
              {routedOptions.tabBarIcon({ focused })}
            </View>
            <View
              style={{
                position: "absolute",
                height: "2px",
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: color,
              }}
             />
          </Box>
        );
      })}
    </View>
  );
}

type TabProps = {
  component: () => React.ReactNode;
  name: string;
  disableLabel?: boolean;
};

type TabsOptions = ({ route }: any) => RoutedTabsOptions;

type RoutedTabsOptions = {
  tabBarIcon: ({ focused }: { focused: boolean }) => React.ReactNode;
  tabBarActiveTintColor: string;
  tabBarInactiveTintColor: string;
  tabBarStyle?: React.CSSProperties;
};

type TabContext = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  options: TabsOptions;
};

const _TabContext = React.createContext<TabContext | null>(null);

function TabProvider({ initialTab, options, children }: any) {
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <_TabContext.Provider
      value={{
        activeTab,
        setActiveTab,
        options,
      }}
    >
      {children}
    </_TabContext.Provider>
  );
}

export function useTabContext(): TabContext {
  const ctx = useContext(_TabContext);
  if (ctx === null) {
    throw new Error("Context not available");
  }
  return ctx;
}

function Icon({ element }: any) {
  return (
    <View
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          width: "25px",
          height: "25px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {element}
      </View>
    </View>
  );
}
